import { AppError } from '@medlearn/core';
import type { ContentReportInput } from '@medlearn/schemas';

import type { DbClient } from './client';

/** Content issues reported by students; readable only by the review team's tools. */
export function createReportsRepository(db: DbClient) {
  return {
    async create(report: ContentReportInput): Promise<void> {
      // No `.select()`: students may add reports but never read them back.
      const { error } = await db.from('content_reports').insert({
        topic_slug: report.topicSlug,
        content_version: report.contentVersion,
        kind: report.kind,
        note: report.note ? report.note : null,
      });
      if (error) throw new AppError('INTERNAL', 'Failed to save the report', { cause: error });
    },
  };
}

export type ReportsRepository = ReturnType<typeof createReportsRepository>;
