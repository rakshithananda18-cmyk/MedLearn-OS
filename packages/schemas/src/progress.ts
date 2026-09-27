import { z } from 'zod';

import { NOTE_MAX_LENGTH } from './limits';

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
});

export const LearnerProgressInput = z.object({
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
  updatedAt: IsoTime.nullable(),
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
