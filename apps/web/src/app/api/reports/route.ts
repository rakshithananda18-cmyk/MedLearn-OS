import { AppError } from '@medlearn/core';
import { createReportsRepository } from '@medlearn/db';
import { ContentReportInput } from '@medlearn/schemas';

import { getTopic } from '@/content/topics';
import { ok, parseJson, withRoute } from '@/server/route';
import { getSessionDb } from '@/server/session';

/** A student reports a problem with a topic. The note is never logged; it may be personal. */
export const POST = withRoute('POST /api/reports', async (request, { log }) => {
  const report = await parseJson(request, ContentReportInput);
  if (!getTopic(report.topicSlug)) throw new AppError('NOT_FOUND', 'Unknown topic');

  await createReportsRepository(await getSessionDb()).create(report);
  log.info({ topicSlug: report.topicSlug, kind: report.kind }, 'content issue reported');
  return ok({ received: true }, { status: 201 });
});
