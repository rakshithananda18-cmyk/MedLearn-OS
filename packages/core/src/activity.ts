import { dayKey, daysBetween } from './today';

/** What a student did on one day: time studied and what was finished. */
export interface DayActivity {
  /** Approximate minutes studied (lesson and drill lengths, a minute a question, half per card). */
  minutes: number;
  /** Lessons finished that day, by topic slug. */
  lessons: string[];
  /** Exam diagram drills finished that day, by topic slug. */
  drills: string[];
  answered: number;
  reviewed: number;
}

/** Study activity by local date (YYYY-MM-DD); only the last few weeks are kept. */
export type Activity = Record<string, DayActivity>;

export type ActivityEvent =
  | { kind: 'lesson' | 'drill'; topicSlug: string; minutes: number }
  | { kind: 'answer' }
  | { kind: 'review' };

export const ACTIVITY_DAYS = 60;
const MINUTES_PER_ANSWER = 1;
const MINUTES_PER_REVIEW = 0.5;

const EMPTY_DAY: DayActivity = { minutes: 0, lessons: [], drills: [], answered: 0, reviewed: 0 };

const addOnce = (list: string[], item: string) => (list.includes(item) ? list : [...list, item]);

function recent(activity: Activity, today: string): Activity {
  return Object.fromEntries(
    Object.entries(activity).filter(([day]) => daysBetween(day, today) < ACTIVITY_DAYS),
  );
}

function withEvent(day: DayActivity, event: ActivityEvent): DayActivity {
  switch (event.kind) {
    case 'lesson':
      return {
        ...day,
        minutes: day.minutes + event.minutes,
        lessons: addOnce(day.lessons, event.topicSlug),
      };
    case 'drill':
      return {
        ...day,
        minutes: day.minutes + event.minutes,
        drills: addOnce(day.drills, event.topicSlug),
      };
    case 'answer':
      return { ...day, minutes: day.minutes + MINUTES_PER_ANSWER, answered: day.answered + 1 };
    case 'review':
      return { ...day, minutes: day.minutes + MINUTES_PER_REVIEW, reviewed: day.reviewed + 1 };
  }
}

/** Records a study action on the day it happened, and forgets days past the window. */
export function logActivity(activity: Activity, event: ActivityEvent, now: Date): Activity {
  const today = dayKey(now);
  return recent({ ...activity, [today]: withEvent(activity[today] ?? EMPTY_DAY, event) }, today);
}

/** What was done today (nothing yet: an empty day). */
export function dayOf(activity: Activity, now: Date): DayActivity {
  return activity[dayKey(now)] ?? EMPTY_DAY;
}

const studied = (activity: Activity, day: string) => (activity[day]?.minutes ?? 0) > 0;

function shift(day: string, days: number): string {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Days in a row with some study, up to today; a day not yet studied does not break it. */
export function currentStreak(activity: Activity, now: Date): number {
  let day = dayKey(now);
  if (!studied(activity, day)) day = shift(day, -1);
  let count = 0;
  while (studied(activity, day)) {
    count += 1;
    day = shift(day, -1);
  }
  return count;
}

/** The longest run of study days still on record. */
export function bestStreak(activity: Activity): number {
  const days = Object.keys(activity)
    .filter((day) => studied(activity, day))
    .sort((a, b) => a.localeCompare(b));
  let best = 0;
  let run = 0;
  let previous: string | null = null;
  for (const day of days) {
    run = previous !== null && daysBetween(previous, day) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    previous = day;
  }
  return best;
}

/** Minutes studied on each of the last `count` days, oldest first, ending today. */
export function lastDays(
  activity: Activity,
  now: Date,
  count = 7,
): Array<{ day: string; minutes: number }> {
  const today = dayKey(now);
  return Array.from({ length: count }, (_, index) => {
    const day = shift(today, index - count + 1);
    return { day, minutes: activity[day]?.minutes ?? 0 };
  });
}

const union = (a: string[], b: string[]) => [...new Set([...a, ...b])];

/** Activity from two devices: each day keeps the most of each count and every item done. */
export function mergeActivity(a: Activity, b: Activity): Activity {
  const merged: Activity = { ...a };
  for (const [day, theirs] of Object.entries(b)) {
    const mine = merged[day];
    merged[day] = mine
      ? {
          minutes: Math.max(mine.minutes, theirs.minutes),
          lessons: union(mine.lessons, theirs.lessons),
          drills: union(mine.drills, theirs.drills),
          answered: Math.max(mine.answered, theirs.answered),
          reviewed: Math.max(mine.reviewed, theirs.reviewed),
        }
      : theirs;
  }
  return merged;
}
