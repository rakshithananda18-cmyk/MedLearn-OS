import { AppError } from '@medlearn/core';
import { createAdminRepository } from '@medlearn/db';
import { ReviewerInput } from '@medlearn/schemas';

import { ok, parseJson, withRoute } from '@/server/route';
import { getSessionDb, requireUserId } from '@/server/session';

/** An admin adds someone to the review team, with what qualifies them. */
export const POST = withRoute('POST /api/admin/reviewers', async (request, { log }) => {
  const reviewer = await parseJson(request, ReviewerInput);
  const db = await getSessionDb();
  await requireUserId(db);
  const admin = createAdminRepository(db);
  if (!(await admin.isAdmin())) {
    throw new AppError('FORBIDDEN', 'Only admins can manage the review team');
  }
  await admin.addReviewer(reviewer);
  log.info({ reviewer: reviewer.email }, 'reviewer added');
  return ok({ saved: true }, { status: 201 });
});
