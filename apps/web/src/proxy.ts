import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

import { getAccessList, isAllowed } from './server/access';
import { getDbConfig } from './server/env';
import { REQUEST_ID_HEADER, resolveRequestId } from './server/request-id';

// Reachable without signing in when the app is private: signing in itself, the health check, the
// offline screen and what installing the app needs. None of them show learning content.
const PUBLIC_PATHS = [
  /^\/account$/,
  /^\/api\/account(\/|$)/,
  /^\/api\/health$/,
  /^\/offline$/,
  /^\/manifest\.webmanifest$/,
  /^\/sw\.js$/,
  /^\/icons\//,
  /^\/(icon\.svg|apple-icon\.png)$/,
];

type Cookie = { name: string; value: string; options?: Record<string, unknown> };

/**
 * With an access list set, only people on it get past this point: pages send everyone else to
 * the sign-in screen and the API answers 401. Refreshed session cookies are passed on. Returns the
 * cookies to set, or the response that turns the visitor away.
 */
async function checkAccess(request: NextRequest): Promise<Cookie[] | NextResponse> {
  const list = getAccessList();
  const { pathname } = request.nextUrl;
  if (list === null || PUBLIC_PATHS.some((path) => path.test(pathname))) return [];

  const refreshed: Cookie[] = [];
  const { url, key } = getDbConfig();
  const db = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookies) => {
        for (const cookie of cookies) {
          request.cookies.set(cookie.name, cookie.value);
          refreshed.push(cookie);
        }
      },
    },
  });
  const { data } = await db.auth.getClaims();
  const claims = data?.claims;
  if (claims && !claims.is_anonymous && isAllowed(list, claims.email)) return refreshed;

  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Sign in with an invited email.' } },
      { status: 401 },
    );
  }
  return NextResponse.redirect(new URL('/account', request.url));
}

/**
 * Stamps every request and response with a request id so logs and error screens can be matched,
 * and keeps a private app private (see checkAccess).
 */
export async function proxy(request: NextRequest) {
  const requestId = resolveRequestId(request.headers.get(REQUEST_ID_HEADER));
  const access = await checkAccess(request);
  if (access instanceof NextResponse) {
    access.headers.set(REQUEST_ID_HEADER, requestId);
    return access;
  }

  // Built after the check so refreshed session cookies reach the page or route.
  const headers = new Headers(request.headers);
  headers.set(REQUEST_ID_HEADER, requestId);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set(REQUEST_ID_HEADER, requestId);
  for (const { name, value, options } of access) response.cookies.set(name, value, options);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
