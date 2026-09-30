import { mergeActivity } from './activity';
import type { ReviewState } from './review';
import type { LearnerProgress, StudyGoal } from './today';

const union = (a: string[], b: string[]) => [...new Set([...a, ...b])];

const reviewedAt = (review: ReviewState) => Date.parse(review.last_review ?? review.due);

const later = (a: string | null, b: string | null) => {
  if (!a) return b;
  if (!b) return a;
  return Date.parse(a) >= Date.parse(b) ? a : b;
};

/** Each topic keeps the revisit further along (the later one when both are on the same step). */
function mergeRevisits(
  local: LearnerProgress['revisits'],
  account: LearnerProgress['revisits'],
): LearnerProgress['revisits'] {
  const merged = { ...local };
  for (const [slug, revisit] of Object.entries(account)) {
    const mine = merged[slug];
    if (
      !mine ||
      revisit.step > mine.step ||
      (revisit.step === mine.step && revisit.due > mine.due)
    ) {
      merged[slug] = revisit;
    }
  }
  return merged;
}

/**
 * Combines this phone's progress with an account's saved progress when a student signs in, so
 * nothing learned on either side is lost: lists are joined, each card keeps its most recent
 * review, each topic keeps its most recent note, and the account's profile wins.
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
  // Goals are joined by id; a topic gone over on either side counts as done.
  const goals = new Map<string, StudyGoal>(local.goals.map((goal) => [goal.id, goal]));
  for (const goal of account.goals) {
    const mine = goals.get(goal.id);
    goals.set(goal.id, mine ? { ...goal, done: union(goal.done, mine.done) } : goal);
  }
  const notes = { ...local.notes };
  for (const [slug, note] of Object.entries(account.notes)) {
    const mine = notes[slug];
    if (!mine || Date.parse(note.updatedAt) > Date.parse(mine.updatedAt)) notes[slug] = note;
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
    notes,
    activity: mergeActivity(local.activity, account.activity),
    goals: [...goals.values()],
    revisits: mergeRevisits(local.revisits, account.revisits),
    updatedAt: now.toISOString(),
  };
}
