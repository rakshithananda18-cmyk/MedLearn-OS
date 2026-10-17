import { createAdminRepository, createReviewsRepository } from '@medlearn/db';
import type { AccountStatus } from '@medlearn/schemas';

import { ok, withRoute } from '@/server/route';
import { getSessionDb } from '@/server/session';

/** Who is signed in on this phone, or null when there is no session at all. */
export const GET = withRoute('GET /api/account', async () => {
  const db = await getSessionDb();
  const { data } = await db.auth.getUser();
  if (!data.user) return ok(null);
  const anonymous = data.user.is_anonymous ?? false;
  const status: AccountStatus = {
    email: data.user.email || null,
    anonymous,
    ...(!anonymous && (await createReviewsRepository(db).isReviewer()) && { reviewer: true }),
    ...(!anonymous && (await createAdminRepository(db).isAdmin()) && { admin: true }),
  };
  return ok(status);
});
