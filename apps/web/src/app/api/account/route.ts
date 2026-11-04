import { createAdminRepository, createReviewsRepository } from '@medlearn/db';
import type { AccountStatus } from '@medlearn/schemas';

import { ok, withRoute } from '@/server/route';
import { getSessionDb, getSessionUser } from '@/server/session';

/** Who is signed in on this phone, or null when there is no session at all. */
export const GET = withRoute('GET /api/account', async () => {
  const db = await getSessionDb();
  const user = await getSessionUser(db);
  if (!user) return ok(null);
  const anonymous = user.is_anonymous ?? false;
  const status: AccountStatus = {
    email: user.email || null,
    anonymous,
    ...(!anonymous && (await createReviewsRepository(db).isReviewer()) && { reviewer: true }),
    ...(!anonymous && (await createAdminRepository(db).isAdmin()) && { admin: true }),
  };
  return ok(status);
});
