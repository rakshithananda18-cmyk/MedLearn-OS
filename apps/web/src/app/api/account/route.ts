import type { AccountStatus } from '@medlearn/schemas';

import { ok, withRoute } from '@/server/route';
import { getSessionDb } from '@/server/session';

/** Who is signed in on this phone, or null when there is no session at all. */
export const GET = withRoute('GET /api/account', async () => {
  const { data } = await (await getSessionDb()).auth.getUser();
  const status: AccountStatus | null = data.user
    ? { email: data.user.email || null, anonymous: data.user.is_anonymous ?? false }
    : null;
  return ok(status);
});
