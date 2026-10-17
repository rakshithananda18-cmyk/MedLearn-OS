import { createAdminRepository, createReviewsRepository } from '@medlearn/db';
import type { Metadata } from 'next';
import { connection } from 'next/server';

import { TOPICS } from '@/content/topics';
import { AdminOnly } from '@/features/admin/AdminOnly';
import { AdminView, type ReviewProgress } from '@/features/admin/AdminView';
import { reviewState } from '@/features/review/state';
import { Screen } from '@/features/shell/Screen';
import { topicReviewDigest } from '@/server/review-digest';
import { getSessionDb } from '@/server/session';

export const metadata: Metadata = { title: 'Admin | MedLearn OS' };

/** The admins' page: the review team, what qualifies each reviewer, and every change to it. */
export default async function AdminPage() {
  await connection();
  const db = await getSessionDb();
  const admin = createAdminRepository(db);
  if (!(await admin.isAdmin())) {
    return (
      <Screen>
        <AdminOnly />
      </Screen>
    );
  }
  const [reviewers, changes, statuses] = await Promise.all([
    admin.reviewers(),
    admin.changes(),
    createReviewsRepository(db).statuses(),
  ]);
  const latest = new Map(statuses.map((status) => [status.topicSlug, status]));
  const progress: ReviewProgress = { approved: 0, changesAsked: 0, recheck: 0, notReviewed: 0 };
  for (const topic of TOPICS) {
    const state = reviewState(topic.version, latest.get(topic.slug), topicReviewDigest(topic));
    if (state === 'approved') progress.approved += 1;
    else if (state === 'changes-requested') progress.changesAsked += 1;
    else if (state === 'needs-recheck') progress.recheck += 1;
    else progress.notReviewed += 1;
  }
  return (
    <Screen>
      <AdminView reviewers={reviewers} changes={changes} progress={progress} />
    </Screen>
  );
}
