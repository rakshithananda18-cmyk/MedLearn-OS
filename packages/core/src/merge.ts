import type { ReviewState } from './review';
import type { LearnerProgress } from './today';

const union = (a: string[], b: string[]) => [...new Set([...a, ...b])];

const reviewedAt = (review: ReviewState) => Date.parse(review.last_review ?? review.due);

const later = (a: string | null, b: string | null) => {
  if (!a) return b;
  if (!b) return a;
  return Date.parse(a) >= Date.parse(b) ? a : b;
};

/**
 * Combines this phone's progress with an account's saved progress when a student signs in, so
 * nothing learned on either side is lost: lists are joined, each card keeps its most recent
 * review, and the account's profile wins.
 */
export function mergeProgress(
  local: LearnerProgress,
  account: LearnerProgress,
  now: Date,
): LearnerProgress {
  const reviews = { ...local.reviews };
  for (const [id, review] of Object.entries(account.reviews)) {
    const mine = reviews[id];
    if (!mine || reviewedAt(review) > reviewedAt(mine)) reviews[id] = review;
  }
  return {
    profile: account.profile ?? local.profile,
    completedLessons: union(account.completedLessons, local.completedLessons),
    completedDrills: union(account.completedDrills, local.completedDrills),
    correctAnswers: union(account.correctAnswers, local.correctAnswers),
    mistakes: union(account.mistakes, local.mistakes),
    reviews,
    lastActiveAt: later(account.lastActiveAt, local.lastActiveAt),
    catchUpAcceptedOn: account.catchUpAcceptedOn ?? local.catchUpAcceptedOn,
    updatedAt: now.toISOString(),
  };
}
