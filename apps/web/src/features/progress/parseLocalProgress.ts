import {
  type DayActivity,
  EMPTY_PROGRESS,
  type LearnerProgress,
  type ReviewState,
  type StudyProfile,
} from '@medlearn/core';
import { NOTE_MAX_LENGTH } from '@medlearn/schemas/limits';

// Device storage is untrusted. Keep this synchronous, small parser separate from the Zod API
// schema so every page that reads progress does not download the server-side schema library.
const MAX_ITEMS = 5000;
const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const isId = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0 && value.length <= 120;
const safeEntries = <T>(value: Record<string, T>): [string, T][] =>
  Object.entries(value).filter(([key]) => key !== '__proto__');
const isIdList = (value: unknown, max = MAX_ITEMS): value is string[] =>
  Array.isArray(value) && value.length <= max && value.every(isId);
const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);
const nonnegative = (value: unknown): value is number => isNumber(value) && value >= 0;
const count = (value: unknown): value is number => nonnegative(value) && Number.isInteger(value);

function isDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isIsoTime(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-]\d{2}:\d{2})$/.exec(
    value,
  );
  if (!match || !isDate(match[1])) return false;
  const [, , hour, minute, second, offset = ''] = match;
  if (Number(hour) > 23 || Number(minute) > 59 || Number(second) > 59) return false;
  if (offset !== 'Z' && (Number(offset.slice(1, 3)) > 23 || Number(offset.slice(4)) > 59)) {
    return false;
  }
  return Number.isFinite(Date.parse(value));
}

const nullable = <T>(value: unknown, valid: (value: unknown) => value is T): value is T | null =>
  value === null || valid(value);

function isRecordOf<T>(
  value: unknown,
  max: number,
  keyValid: (key: unknown) => key is string,
  valueValid: (entry: unknown) => entry is T,
): value is Record<string, T> {
  if (!isObject(value)) return false;
  const entries = safeEntries(value);
  return (
    entries.length <= max && entries.every(([key, entry]) => keyValid(key) && valueValid(entry))
  );
}

function isProfile(value: unknown): value is StudyProfile {
  return (
    isObject(value) &&
    [1, 2, 3, 4].includes(value.year as number) &&
    nullable(value.examDate, isDate) &&
    count(value.dailyMinutes) &&
    value.dailyMinutes >= 5 &&
    value.dailyMinutes <= 240 &&
    typeof value.adult === 'boolean' &&
    (value.books === undefined || isIdList(value.books, 50))
  );
}

function isReview(value: unknown): value is ReviewState {
  return (
    isObject(value) &&
    isIsoTime(value.due) &&
    nonnegative(value.stability) &&
    isNumber(value.difficulty) &&
    nonnegative(value.elapsed_days) &&
    nonnegative(value.scheduled_days) &&
    count(value.learning_steps) &&
    count(value.reps) &&
    count(value.lapses) &&
    count(value.state) &&
    value.state <= 3 &&
    (value.last_review === undefined || isIsoTime(value.last_review))
  );
}

function isNote(value: unknown): value is { text: string; updatedAt: string } {
  return (
    isObject(value) &&
    typeof value.text === 'string' &&
    value.text.length <= NOTE_MAX_LENGTH &&
    isIsoTime(value.updatedAt)
  );
}

function isDayActivity(value: unknown): value is DayActivity {
  return (
    isObject(value) &&
    nonnegative(value.minutes) &&
    value.minutes <= 1440 &&
    isIdList(value.lessons, 200) &&
    isIdList(value.drills, 200) &&
    count(value.answered) &&
    count(value.reviewed)
  );
}

/** Accepts older saved progress with missing notes/activity; rejects malformed consumed fields. */
export function parseLocalProgress(value: unknown): LearnerProgress | null {
  if (!isObject(value)) return null;
  const data = { ...EMPTY_PROGRESS, ...value };
  if (
    !nullable(data.profile, isProfile) ||
    !isIdList(data.completedLessons) ||
    !isIdList(data.completedDrills) ||
    !isIdList(data.correctAnswers) ||
    !isIdList(data.mistakes) ||
    !isRecordOf(data.reviews, MAX_ITEMS, isId, isReview) ||
    !nullable(data.lastActiveAt, isIsoTime) ||
    !nullable(data.catchUpAcceptedOn, isDate) ||
    !isRecordOf(data.notes, MAX_ITEMS, isId, isNote) ||
    !isRecordOf(data.activity, 400, isDate, isDayActivity) ||
    !nullable(data.updatedAt, isIsoTime)
  ) {
    return null;
  }
  // As with the API schema, discard unknown fields instead of carrying arbitrary storage data
  // into later sync requests. Keep optional legacy fields optional.
  return {
    profile:
      data.profile === null
        ? null
        : {
            year: data.profile.year,
            examDate: data.profile.examDate,
            dailyMinutes: data.profile.dailyMinutes,
            adult: data.profile.adult,
            ...(data.profile.books === undefined ? {} : { books: [...data.profile.books] }),
          },
    completedLessons: [...data.completedLessons],
    completedDrills: [...data.completedDrills],
    correctAnswers: [...data.correctAnswers],
    mistakes: [...data.mistakes],
    reviews: Object.fromEntries(
      safeEntries(data.reviews).map(([id, review]) => [
        id,
        {
          due: review.due,
          stability: review.stability,
          difficulty: review.difficulty,
          elapsed_days: review.elapsed_days,
          scheduled_days: review.scheduled_days,
          learning_steps: review.learning_steps,
          reps: review.reps,
          lapses: review.lapses,
          state: review.state,
          ...(review.last_review === undefined ? {} : { last_review: review.last_review }),
        },
      ]),
    ),
    lastActiveAt: data.lastActiveAt,
    catchUpAcceptedOn: data.catchUpAcceptedOn,
    notes: Object.fromEntries(
      safeEntries(data.notes).map(([id, note]) => [
        id,
        { text: note.text, updatedAt: note.updatedAt },
      ]),
    ),
    activity: Object.fromEntries(
      safeEntries(data.activity).map(([date, day]) => [
        date,
        {
          minutes: day.minutes,
          lessons: [...day.lessons],
          drills: [...day.drills],
          answered: day.answered,
          reviewed: day.reviewed,
        },
      ]),
    ),
    updatedAt: data.updatedAt,
  };
}
