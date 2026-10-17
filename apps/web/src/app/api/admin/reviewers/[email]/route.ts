import { AppError } from '@medlearn/core';
import { createAdminRepository } from '@medlearn/db';
import { ReviewerUpdate } from '@medlearn/schemas';

import { noContent, ok, parseJson, withRoute } from '@/server/route';
import { getSessionDb, requireUserId } from '@/server/session';

/** The email in the address, whether or not it arrives still encoded. */
function emailOf(segment: string): string {
  try {
    return decodeURIComponent(segment).toLowerCase();
  } catch {
    return segment.toLowerCase();
  }
}

/** The signed-in admin's repository; anyone else is turned away. */
async function adminOnly() {
  const db = await getSessionDb();
  await requireUserId(db);
  const admin = createAdminRepository(db);
  if (!(await admin.isAdmin())) {
    throw new AppError('FORBIDDEN', 'Only admins can manage the review team');
  }
  return admin;
}

/** An admin changes what qualifies a reviewer. */
export const PATCH = withRoute<{ email: string }>(
  'PATCH /api/admin/reviewers/[email]',
  async (request, { log }, { email }) => {
    const { qualification } = await parseJson(request, ReviewerUpdate);
    const reviewer = emailOf(email);
    if (!(await (await adminOnly()).updateReviewer(reviewer, qualification))) {
      throw new AppError('NOT_FOUND', 'Not on the review team');
    }
    log.info({ reviewer }, 'reviewer updated');
    return ok({ saved: true });
  },
);

/** An admin takes someone off the review team; their past reviews stay in the history. */
export const DELETE = withRoute<{ email: string }>(
  'DELETE /api/admin/reviewers/[email]',
  async (_request, { log }, { email }) => {
    const reviewer = emailOf(email);
    if (!(await (await adminOnly()).removeReviewer(reviewer))) {
      throw new AppError('NOT_FOUND', 'Not on the review team');
    }
    log.info({ reviewer }, 'reviewer removed');
    return noContent();
  },
);
