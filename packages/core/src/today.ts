import type { Activity } from './activity';
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
  /** The standard books this student follows (book ids); missing until they choose. */
  books?: string[];
}

/**
 * A plan the student asked for between the daily ones: a class test to prepare for, or topics to
 * revisit by a date. Today spreads its topics over the days left.
 */
export interface StudyGoal {
  id: string;
  kind: 'test' | 'revisit';
  title: string;
  /** Topic slugs, in the order to go over them. */
  topics: string[];
  /** The test day, or the day to have revisited them by (YYYY-MM-DD). */
  date: string;
  /** Topics already gone over for this goal. */
  done: string[];
  /** When it was asked for (ISO time). */
  createdAt: string;
}

/** A student's own note on a topic. A cleared note stays, empty, so clearing it syncs too. */
export interface TopicNote {
  text: string;
  /** When it last changed (ISO time); the newer note wins when phone and account differ. */
  updatedAt: string;
}

/** What the learner has done so far (kept on the phone, and in the account for adults). */
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
  /** Notes by topic slug. */
  notes: Record<string, TopicNote>;
  /** What was studied on each recent day: streaks, the daily ring and the plan's ticks. */
  activity: Activity;
  /** Class tests and revisits the student asked for. */
  goals: StudyGoal[];
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
  notes: {},
  activity: {},
  goals: [],
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
  | { kind: 'drill'; topicSlug: string; title: string; minutes: number }
  | {
      kind: 'goal';
      goalId: string;
      goalTitle: string;
      topicSlug: string;
      title: string;
      minutes: number;
    };

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

/**
 * A goal's pace: whole days until its date, and the topics to go over today to finish in time.
 * A test is prepared on the days before it (on the day itself only when it is today); a revisit
 * may use its last day too. Nothing is due once the date has passed or every topic is done.
 */
export function goalToday(goal: StudyGoal, today: string): { daysLeft: number; topics: string[] } {
  const daysLeft = daysBetween(today, goal.date);
  const remaining = goal.topics.filter((slug) => !goal.done.includes(slug));
  if (daysLeft < 0 || remaining.length === 0) return { daysLeft, topics: [] };
  const studyDays = goal.kind === 'test' ? Math.max(1, daysLeft) : daysLeft + 1;
  return { daysLeft, topics: remaining.slice(0, Math.ceil(remaining.length / studyDays)) };
}

/** Minutes to go over a topic again: its questions, then its recall cards. */
function revisitMinutes(topic: PlannableTopic): number {
  return Math.max(
    3,
    topic.questionIds.length * MINUTES_PER_QUESTION +
      Math.ceil((topic.cardIds.length * SECONDS_PER_CARD) / 60),
  );
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

/**
 * Keeps the plan to one day: at most five items within the daily minutes. The first always fits,
 * and so does what a goal needs today: the student asked for it, with a date to meet.
 */
function fitToDay(items: TodayItem[], dailyMinutes: number): TodayItem[] {
  const plan: TodayItem[] = [];
  let minutes = 0;
  for (const item of items) {
    if (plan.length === MAX_ITEMS) break;
    if (plan.length > 0 && item.kind !== 'goal' && minutes + item.minutes > dailyMinutes) continue;
    plan.push(item);
    minutes += item.minutes;
  }
  return plan;
}

/**
 * The Today engine. Normal days: due reviews, today's share of any class test or revisit the
 * student asked for, the next new topic, then practice. After three or
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

  const goals: TodayItem[] = progress.goals.flatMap((goal) =>
    goalToday(goal, today).topics.flatMap((slug) => {
      const topic = topics.find((item) => item.slug === slug);
      return topic
        ? [
            {
              kind: 'goal' as const,
              goalId: goal.id,
              goalTitle: goal.title,
              topicSlug: slug,
              title: topic.title,
              minutes: revisitMinutes(topic),
            },
          ]
        : [];
    }),
  );

  const ordered =
    mode === 'exam'
      ? [...drills, ...goals, ...review, ...practice, ...learn]
      : mode === 'catch-up'
        ? [...review, ...goals, ...practice, ...learn, ...drills]
        : [...review, ...goals, ...learn, ...practice, ...drills];

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
