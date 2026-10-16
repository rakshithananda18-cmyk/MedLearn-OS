import { createReviewsRepository } from '@medlearn/db';
import type { Metadata } from 'next';
import { connection } from 'next/server';

import { TOPICS } from '@/content/topics';
import { type BoardTopic, ReviewBoard } from '@/features/review/ReviewBoard';
import { ReviewersOnly } from '@/features/review/ReviewersOnly';
import { ReviewRefresh } from '@/features/review/ReviewRefresh';
import { reviewState } from '@/features/review/state';
import { Screen } from '@/features/shell/Screen';
import { topicReviewDigest } from '@/server/review-digest';
import { getSessionDb } from '@/server/session';

export const metadata: Metadata = { title: 'Review | MedLearn OS' };

/** The review team's board: every topic, where it stands, and what students reported. */
export default async function ReviewPage() {
  await connection();
  const reviews = createReviewsRepository(await getSessionDb());
  if (!(await reviews.isReviewer())) {
    return (
      <Screen>
        <ReviewersOnly />
      </Screen>
    );
  }
  const [statuses, reports] = await Promise.all([reviews.statuses(), reviews.reports()]);
  const latest = new Map(statuses.map((status) => [status.topicSlug, status]));
  const topics: BoardTopic[] = TOPICS.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    version: topic.version,
    chapter: topic.readIn[0]?.chapter ?? 'Other',
    state: reviewState(topic.version, latest.get(topic.slug), topicReviewDigest(topic)),
    openReports: reports.filter((report) => report.topicSlug === topic.slug && !report.resolvedAt)
      .length,
  }));
  return (
    <Screen>
      <ReviewRefresh />
      <ReviewBoard topics={topics} />
    </Screen>
  );
}
