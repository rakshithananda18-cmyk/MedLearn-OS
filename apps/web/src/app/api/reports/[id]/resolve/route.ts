import { AppError } from '@medlearn/core';
import { createReviewsRepository } from '@medlearn/db';

import { noContent, withRoute } from '@/server/route';
import { getSessionDb, requireUserId } from '@/server/session';

/** A reviewer marks a student's report as dealt with. */
export const POST = withRoute<{ id: string }>(
  'POST /api/reports/[id]/resolve',
  async (_request, { log }, { id }) => {
    const reportId = Number(id);
    if (!Number.isInteger(reportId) || reportId < 1) {
      throw new AppError('VALIDATION_FAILED', 'Unknown report');
    }
    const db = await getSessionDb();
    const reviewerId = await requireUserId(db);
    const reviews = createReviewsRepository(db);
    if (!(await reviews.isReviewer())) {
      throw new AppError('FORBIDDEN', 'Only reviewers can resolve reports');
    }
    if (!(await reviews.resolveReport(reportId, reviewerId))) {
      throw new AppError('NOT_FOUND', 'Unknown report');
    }
    log.info({ reportId }, 'report resolved');
    return noContent();
  },
);
