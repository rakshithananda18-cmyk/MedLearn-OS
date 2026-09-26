import { isDue, type ReviewState } from './review';

/** What the learner has done so far (stored on the device in the prototype). */
export interface LearnerProgress {
  completedLessons: string[];
  correctAnswers: string[];
  reviews: Record<string, ReviewState>;
}

export const EMPTY_PROGRESS: LearnerProgress = {
  completedLessons: [],
  correctAnswers: [],
  reviews: {},
};

/** The parts of a topic the planner needs. */
export interface PlannableTopic {
  slug: string;
  title: string;
  estimatedMinutes: number;
  questionIds: string[];
  cardIds: string[];
}

export type TodayItem =
  | { kind: 'review'; count: number; minutes: number }
  | { kind: 'learn'; topicSlug: string; title: string; minutes: number }
  | { kind: 'practice'; topicSlug: string; title: string; count: number; minutes: number };

const SECONDS_PER_CARD = 30;
const MINUTES_PER_QUESTION = 1;

/** Recall cards from finished lessons that are due now. Cards unlock when their lesson is done. */
export function dueCardIds(
  topics: PlannableTopic[],
  progress: LearnerProgress,
  now: Date,
): string[] {
  return topics
    .filter((topic) => progress.completedLessons.includes(topic.slug))
    .flatMap((topic) => topic.cardIds)
    .filter((id) => isDue(progress.reviews[id], now));
}

/** Questions not yet answered correctly, from finished lessons. */
export function openQuestionIds(topic: PlannableTopic, progress: LearnerProgress): string[] {
  if (!progress.completedLessons.includes(topic.slug)) return [];
  return topic.questionIds.filter((id) => !progress.correctAnswers.includes(id));
}

/**
 * The Today engine: due reviews first (they protect what was already learned), then the next
 * new topic in teaching order, then practice on finished topics.
 */
export function buildTodayPlan(
  topics: PlannableTopic[],
  progress: LearnerProgress,
  now: Date,
): TodayItem[] {
  const items: TodayItem[] = [];

  const due = dueCardIds(topics, progress, now).length;
  if (due > 0) {
    items.push({ kind: 'review', count: due, minutes: Math.ceil((due * SECONDS_PER_CARD) / 60) });
  }

  const next = topics.find((topic) => !progress.completedLessons.includes(topic.slug));
  if (next) {
    items.push({
      kind: 'learn',
      topicSlug: next.slug,
      title: next.title,
      minutes: next.estimatedMinutes,
    });
  }

  for (const topic of topics) {
    const open = openQuestionIds(topic, progress).length;
    if (open > 0) {
      items.push({
        kind: 'practice',
        topicSlug: topic.slug,
        title: topic.title,
        count: open,
        minutes: open * MINUTES_PER_QUESTION,
      });
    }
  }
  return items;
}
