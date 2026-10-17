import { z } from 'zod';

import { NAME_MAX_LENGTH, NOTE_MAX_LENGTH } from './limits';

// Validates learner progress at the API boundary. The limits keep one learner's row small.
const MAX_ITEMS = 5000;
const ItemId = z.string().min(1).max(120);
const IdList = z.array(ItemId).max(MAX_ITEMS);
const IsoTime = z.iso.datetime({ offset: true });
const LocalDate = z.iso.date();

/** One spaced-repetition card (FSRS), as stored. */
export const StoredReviewState = z.object({
  due: IsoTime,
  stability: z.number().nonnegative(),
  difficulty: z.number(),
  elapsed_days: z.number().nonnegative(),
  scheduled_days: z.number().nonnegative(),
  learning_steps: z.number().int().nonnegative(),
  reps: z.number().int().nonnegative(),
  lapses: z.number().int().nonnegative(),
  state: z.number().int().min(0).max(3),
  last_review: IsoTime.optional(),
});

export const StudyProfileInput = z.object({
  year: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  examDate: LocalDate.nullable(),
  dailyMinutes: z.number().int().min(5).max(240),
  /** Confirmed 18 or older; only adults' progress leaves the phone before parental consent. */
  adult: z.boolean(),
  books: z.array(ItemId).max(50).optional(),
  /** What the student likes to be called: their initials and greeting. */
  name: z.string().trim().min(1).max(NAME_MAX_LENGTH).optional(),
});

/** One day of study activity, as stored. */
const DayActivity = z.object({
  minutes: z.number().nonnegative().max(1440),
  lessons: IdList.max(200),
  drills: IdList.max(200),
  answered: z.number().int().nonnegative(),
  reviewed: z.number().int().nonnegative(),
});

/** A class test to prepare for, or topics to revisit or learn by a date. */
const StudyGoalInput = z.object({
  id: ItemId,
  kind: z.enum(['test', 'revisit', 'learn']),
  title: z.string().min(1).max(80),
  topics: z.array(ItemId).min(1).max(200),
  date: LocalDate,
  // Missing from goals that start at once (all goals planned before courses could wait).
  from: LocalDate.optional(),
  done: z.array(ItemId).max(200),
  createdAt: IsoTime,
});

export const LearnerProgressInput = z
  .object({
    profile: StudyProfileInput.nullable(),
    completedLessons: IdList,
    completedDrills: IdList,
    correctAnswers: IdList,
    mistakes: IdList,
    reviews: z
      .record(ItemId, StoredReviewState)
      .refine((reviews) => Object.keys(reviews).length <= MAX_ITEMS, 'Too many reviews'),
    lastActiveAt: IsoTime.nullable(),
    catchUpAcceptedOn: LocalDate.nullable(),
    // Missing from progress saved before notes existed.
    notes: z
      .record(ItemId, z.object({ text: z.string().max(NOTE_MAX_LENGTH), updatedAt: IsoTime }))
      .refine((notes) => Object.keys(notes).length <= MAX_ITEMS, 'Too many notes')
      .default({}),
    // Missing from progress saved before activity was kept.
    activity: z
      .record(LocalDate, DayActivity)
      .refine((days) => Object.keys(days).length <= 400, 'Too many days')
      .default({}),
    // Missing from progress saved before class tests and revisits could be planned.
    goals: z.array(StudyGoalInput).max(100).default([]),
    // Durable remove/completion markers. Never expire these while older devices can reconnect.
    removedGoals: IdList.default([]),
    /** Compatibility with progress emitted before the removal marker name was reconciled. */
    deletedGoalIds: IdList.optional(),
    // Missing from progress saved before spaced revisits of learnt topics.
    revisits: z
      .record(ItemId, z.object({ step: z.number().int().min(0).max(10), due: LocalDate }))
      .refine((revisits) => Object.keys(revisits).length <= MAX_ITEMS, 'Too many revisits')
      .default({}),
    completedRevisits: IdList.default([]),
    updatedAt: IsoTime.nullable(),
  })
  .transform(({ deletedGoalIds, ...progress }, ctx) => {
    const removedGoals = [...new Set([...progress.removedGoals, ...(deletedGoalIds ?? [])])];
    // Released clients store completion as step 3 / due 9999-12-31; canonical clients use markers.
    const completedRevisits = [
      ...new Set([
        ...progress.completedRevisits,
        ...Object.entries(progress.revisits)
          .filter(([, revisit]) => revisit.step >= 3)
          .map(([slug]) => slug),
      ]),
    ];
    if (removedGoals.length > MAX_ITEMS || completedRevisits.length > MAX_ITEMS) {
      ctx.addIssue({ code: 'custom', message: 'Too many durable removal markers' });
      return z.NEVER;
    }
    return {
      ...progress,
      removedGoals,
      completedRevisits,
      goals: progress.goals.filter((goal) => !removedGoals.includes(goal.id)),
      revisits: Object.fromEntries(
        Object.entries(progress.revisits).filter(([slug]) => !completedRevisits.includes(slug)),
      ),
    };
  });
export type LearnerProgressInput = z.infer<typeof LearnerProgressInput>;

/** Progress as the server holds it. */
export const SavedProgress = z.object({
  progress: LearnerProgressInput,
  updatedAt: IsoTime,
});
export type SavedProgress = z.infer<typeof SavedProgress>;

export const ReportKind = z.enum(['factual-error', 'unclear', 'typo', 'visual', 'other']);
export type ReportKind = z.infer<typeof ReportKind>;

/** A content problem reported by a student. */
export const ContentReportInput = z.object({
  topicSlug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  contentVersion: z.string().regex(/^\d+\.\d+\.\d+$/),
  kind: ReportKind,
  note: z.string().trim().max(1000).optional(),
});
export type ContentReportInput = z.infer<typeof ContentReportInput>;
