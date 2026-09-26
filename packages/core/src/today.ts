import { isDue, type ReviewState } from './review';

export type MbbsYear = 1 | 2 | 3 | 4;

/** What the student told us at onboarding. */
export interface StudyProfile {
  year: MbbsYear;
  /** Next university or internal exam as a local date (YYYY-MM-DD), when known. */
  examDate: string | null;
  dailyMinutes: number;
  /** Confirmed 18 or older; under-18 progress stays on the phone until a parent agrees. */
  adult: boolean;
}

/** What the learner has done so far (stored on the device in the prototype). */
export interface LearnerProgress {
  profile: StudyProfile | null;
  completedLessons: string[];
  completedDrills: string[];
  correctAnswers: string[];
  /** Questions answered wrong at least once; each becomes a recall card. */
  mistakes: string[];
  reviews: Record<string, ReviewState>;
  /** Last time the student studied anything (ISO time); drives the catch-up plan. */
  lastActiveAt: string | null;
  /** Local date (YYYY-MM-DD) on which the student accepted a catch-up plan. */
  catchUpAcceptedOn: string | null;
  /** Last change (ISO time); the newer copy wins when the device and the server differ. */
  updatedAt: string | null;
}

export const EMPTY_PROGRESS: LearnerProgress = {
  profile: null,
  completedLessons: [],
  completedDrills: [],
  correctAnswers: [],
  mistakes: [],
  reviews: {},
  lastActiveAt: null,
  catchUpAcceptedOn: null,
  updatedAt: null,
};

/** The parts of a topic the planner needs. */
export interface PlannableTopic {
  slug: string;
  title: string;
  estimatedMinutes: number;
  questionIds: string[];
  cardIds: string[];
  /** Length of the exam diagram drill, or null when the topic has none. */
  drillMinutes: number | null;
}

export type TodayItem =
  | { kind: 'review'; count: number; minutes: number }
  | { kind: 'learn'; topicSlug: string; title: string; minutes: number }
  | { kind: 'practice'; topicSlug: string; title: string; count: number; minutes: number }
  | { kind: 'drill'; topicSlug: string; title: string; minutes: number };

/** Normal days; catch-up after missed days; exam mode as the exam approaches. */
export type TodayMode = 'normal' | 'catch-up' | 'exam';

export interface TodayPlan {
  mode: TodayMode;
  items: TodayItem[];
  dailyMinutes: number;
  /** Whole days until the exam when one is set and still ahead (0 means today). */
  examInDays: number | null;
  /** Full days without any study before today. */
  missedDays: number;
  /** Due cards held back so today never shows more than one day's load. */
  heldBackReviews: number;
  /** Further days needed to clear the held-back cards at today's pace. */
  catchUpDays: number;
}

export const DEFAULT_DAILY_MINUTES = 20;
export const CATCH_UP_AFTER_MISSED_DAYS = 3;
export const EXAM_WINDOW_DAYS = 30;

const MAX_ITEMS = 5;
const MIN_REVIEW_CAP = 5;
// Reviews may take up to half of the daily minutes; the rest goes to learning and practice.
const REVIEW_SHARE = 0.5;
const SECONDS_PER_CARD = 30;
const MINUTES_PER_QUESTION = 1;
const DAY_MS = 86_400_000;

/** The local calendar date as YYYY-MM-DD. */
export function dayKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Whole calendar days between two YYYY-MM-DD dates; unaffected by daylight saving. */
export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS);
}

/** The recall card made from a question the student got wrong. */
export function mistakeCardId(questionId: string): string {
  return `mistake-${questionId}`;
}

/** Every recall card of a topic: its own cards plus cards made from missed questions. */
export function topicCardIds(topic: PlannableTopic, progress: LearnerProgress): string[] {
  const missed = topic.questionIds.filter((id) => progress.mistakes.includes(id));
  return [...topic.cardIds, ...missed.map(mistakeCardId)];
}

/** Recall cards from finished lessons that are due now. Cards unlock when their lesson is done. */
export function dueCardIds(
  topics: PlannableTopic[],
  progress: LearnerProgress,
  now: Date,
): string[] {
  return topics
    .filter((topic) => progress.completedLessons.includes(topic.slug))
    .flatMap((topic) => topicCardIds(topic, progress))
    .filter((id) => isDue(progress.reviews[id], now));
}

/** Questions not yet answered correctly, from finished lessons. */
export function openQuestionIds(topic: PlannableTopic, progress: LearnerProgress): string[] {
  if (!progress.completedLessons.includes(topic.slug)) return [];
  return topic.questionIds.filter((id) => !progress.correctAnswers.includes(id));
}

function modeFor(examInDays: number | null, missedDays: number): TodayMode {
  if (examInDays !== null && examInDays <= EXAM_WINDOW_DAYS) return 'exam';
  if (missedDays >= CATCH_UP_AFTER_MISSED_DAYS) return 'catch-up';
  return 'normal';
}

/** Keeps the plan to one day: at most five items within the daily minutes. The first always fits. */
function fitToDay(items: TodayItem[], dailyMinutes: number): TodayItem[] {
  const plan: TodayItem[] = [];
  let minutes = 0;
  for (const item of items) {
    if (plan.length === MAX_ITEMS) break;
    if (plan.length > 0 && minutes + item.minutes > dailyMinutes) continue;
    plan.push(item);
    minutes += item.minutes;
  }
  return plan;
}

/**
 * The Today engine. Normal days: due reviews, the next new topic, then practice. After three or
 * more missed days the plan protects what was learned first (reviews and practice before new
 * topics). Within 30 days of an exam, diagram drills lead. Reviews are always capped, so a long
 * gap never produces a huge overdue pile.
 */
export function buildTodayPlan(
  topics: PlannableTopic[],
  progress: LearnerProgress,
  now: Date,
): TodayPlan {
  const today = dayKey(now);
  const dailyMinutes = progress.profile?.dailyMinutes ?? DEFAULT_DAILY_MINUTES;
  const examDate = progress.profile?.examDate;
  const untilExam = examDate ? daysBetween(today, examDate) : null;
  const examInDays = untilExam !== null && untilExam >= 0 ? untilExam : null;
  const missedDays = progress.lastActiveAt
    ? Math.max(0, daysBetween(dayKey(new Date(progress.lastActiveAt)), today) - 1)
    : 0;
  const mode = modeFor(examInDays, missedDays);

  const due = dueCardIds(topics, progress, now).length;
  const reviewCap = Math.max(
    MIN_REVIEW_CAP,
    Math.floor((dailyMinutes * REVIEW_SHARE * 60) / SECONDS_PER_CARD),
  );
  const reviewCount = Math.min(due, reviewCap);
  const heldBackReviews = due - reviewCount;

  const review: TodayItem[] =
    reviewCount > 0
      ? [
          {
            kind: 'review',
            count: reviewCount,
            minutes: Math.ceil((reviewCount * SECONDS_PER_CARD) / 60),
          },
        ]
      : [];

  const next = topics.find((topic) => !progress.completedLessons.includes(topic.slug));
  const learn: TodayItem[] = next
    ? [{ kind: 'learn', topicSlug: next.slug, title: next.title, minutes: next.estimatedMinutes }]
    : [];

  const practice: TodayItem[] = topics.flatMap((topic) => {
    const open = openQuestionIds(topic, progress).length;
    return open > 0
      ? [
          {
            kind: 'practice' as const,
            topicSlug: topic.slug,
            title: topic.title,
            count: open,
            minutes: open * MINUTES_PER_QUESTION,
          },
        ]
      : [];
  });

  const drills: TodayItem[] = topics.flatMap((topic) =>
    topic.drillMinutes !== null &&
    progress.completedLessons.includes(topic.slug) &&
    !progress.completedDrills.includes(topic.slug)
      ? [
          {
            kind: 'drill' as const,
            topicSlug: topic.slug,
            title: topic.title,
            minutes: topic.drillMinutes,
          },
        ]
      : [],
  );

  const ordered =
    mode === 'exam'
      ? [...drills, ...review, ...practice, ...learn]
      : mode === 'catch-up'
        ? [...review, ...practice, ...learn, ...drills]
        : [...review, ...learn, ...practice, ...drills];

  return {
    mode,
    items: fitToDay(ordered, dailyMinutes),
    dailyMinutes,
    examInDays,
    missedDays,
    heldBackReviews,
    catchUpDays: Math.ceil(heldBackReviews / reviewCap),
  };
}
