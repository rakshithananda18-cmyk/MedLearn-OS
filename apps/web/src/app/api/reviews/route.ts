import { AppError } from '@medlearn/core';
import { createReviewsRepository } from '@medlearn/db';
import { ReviewInput } from '@medlearn/schemas';

import { getTopic } from '@/content/topics';
import { topicReviewDigest } from '@/server/review-digest';
import { ok, parseJson, withRoute } from '@/server/route';
import { getSessionDb, requireUserId } from '@/server/session';

/**
 * Every topic's latest review outcome. Read fresh on each request, so a topic shows as checked the
 * moment a reviewer approves it.
 */
export const GET = withRoute('GET /api/reviews', async () => {
  const outcomes = await createReviewsRepository(await getSessionDb()).statuses();
  const statuses = outcomes.map((status) => {
    const topic = getTopic(status.topicSlug);
    return {
      ...status,
      currentContent: Boolean(topic && status.contentDigest === topicReviewDigest(topic)),
    };
  });
  return ok({ statuses }, { headers: { 'cache-control': 'no-store' } });
});

/** A reviewer approves a topic version or asks for changes. */
export const POST = withRoute('POST /api/reviews', async (request, { log }) => {
  const review = await parseJson(request, ReviewInput);
  const topic = getTopic(review.topicSlug);
  if (!topic) throw new AppError('NOT_FOUND', 'Unknown topic');
  // A review is of what students see now; an older copy open in another tab is turned away.
  if (
    topic.version !== review.contentVersion ||
    topicReviewDigest(topic) !== review.contentDigest
  ) {
    throw new AppError('CONFLICT', 'This topic has changed since you opened it. Reload it.');
  }
  const db = await getSessionDb();
  const reviewerId = await requireUserId(db);
  const reviews = createReviewsRepository(db);
  if (!(await reviews.isReviewer())) throw new AppError('FORBIDDEN', 'Only reviewers can review');

  await reviews.create(review, reviewerId);
  log.info(
    { topicSlug: review.topicSlug, version: review.contentVersion, decision: review.decision },
    'topic reviewed',
  );
  return ok({ saved: true }, { status: 201 });
});
