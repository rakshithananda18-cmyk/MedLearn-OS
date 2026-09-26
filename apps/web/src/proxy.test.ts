import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { proxy } from './proxy';
import { REQUEST_ID_HEADER } from './server/request-id';

// The session check reads the signed-in user's token claims; tests choose who is signed in.
const session = vi.hoisted(() => ({ claims: null as Record<string, unknown> | null }));
vi.mock('@supabase/ssr', () => ({
  createServerClient: () => ({
    auth: { getClaims: async () => ({ data: session.claims ? { claims: session.claims } : null }) },
  }),
}));

const request = (path: string) => new NextRequest(`http://localhost${path}`);

beforeEach(() => {
  vi.stubEnv('SUPABASE_URL', 'http://127.0.0.1:54321');
  vi.stubEnv('SUPABASE_ANON_KEY', 'test-key');
  session.claims = null;
});
afterEach(() => vi.unstubAllEnvs());

describe('proxy', () => {
  it('adds a request id to the response and forwards it to the route', async () => {
    const response = await proxy(request('/today'));
    const requestId = response.headers.get(REQUEST_ID_HEADER);
    expect(requestId).toMatch(/^[0-9a-f-]{36}$/);
    expect(response.headers.get(`x-middleware-request-${REQUEST_ID_HEADER}`)).toBe(requestId);
  });

  it('keeps a well-formed incoming request id', async () => {
    const incoming = new NextRequest('http://localhost/today', {
      headers: { [REQUEST_ID_HEADER]: 'edge-12345678' },
    });
    expect((await proxy(incoming)).headers.get(REQUEST_ID_HEADER)).toBe('edge-12345678');
  });

  it('lets everyone in when there is no access list', async () => {
    vi.stubEnv('ACCESS_EMAILS', '');
    expect((await proxy(request('/today'))).status).toBe(200);
  });
});

describe('proxy with an access list', () => {
  beforeEach(() => vi.stubEnv('ACCESS_EMAILS', 'asha@example.com, Ravi@Example.com'));

  it('sends visitors to sign in and answers the API with 401', async () => {
    const page = await proxy(request('/learn/brachial-plexus'));
    expect(page.status).toBe(307);
    expect(page.headers.get('location')).toBe('http://localhost/account');
    expect(page.headers.get(REQUEST_ID_HEADER)).toBeTruthy();

    const api = await proxy(request('/api/progress'));
    expect(api.status).toBe(401);
    expect((await api.json()).error.code).toBe('UNAUTHORIZED');
  });

  it('keeps signing in, installing and the health check reachable', async () => {
    for (const path of ['/account', '/api/account/sign-in', '/api/health', '/offline', '/sw.js']) {
      expect((await proxy(request(path))).status, path).toBe(200);
    }
  });

  it('lets invited people in, whatever the case of their email', async () => {
    session.claims = { email: 'ravi@example.com', is_anonymous: false };
    expect((await proxy(request('/today'))).status).toBe(200);
  });

  it('turns away anonymous sessions and emails not on the list', async () => {
    session.claims = { email: 'asha@example.com', is_anonymous: true };
    expect((await proxy(request('/today'))).status).toBe(307);
    session.claims = { email: 'stranger@example.com', is_anonymous: false };
    expect((await proxy(request('/api/progress'))).status).toBe(401);
  });
});
