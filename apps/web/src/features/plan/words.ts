import { revisitMinutes, type StudyGoal } from '@medlearn/core';

import type { TopicSummary } from '@/content/topics';

// How plans are worded and timed on screen.

export const KIND_NAME: Record<StudyGoal['kind'], string> = {
  learn: 'Learn',
  test: 'Class test',
  revisit: 'Revisit',
};

/** Weekdays from Monday, as the plan's week strip and day choices show them (0 is Sunday). */
export const WEEKDAYS = [
  { day: 1, short: 'Mon' },
  { day: 2, short: 'Tue' },
  { day: 3, short: 'Wed' },
  { day: 4, short: 'Thu' },
  { day: 5, short: 'Fri' },
  { day: 6, short: 'Sat' },
  { day: 0, short: 'Sun' },
] as const;

const DAY = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
const DATE = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' });

/** A local date (YYYY-MM-DD) as students say it: "Fri, 23 Oct". */
export const dayName = (day: string) => DAY.format(new Date(`${day}T12:00:00`));
/** Just the date: "23 Oct". */
export const dateName = (day: string) => DATE.format(new Date(`${day}T12:00:00`));

/** Minutes as hours and minutes: "45 min", "6 h 10 min". */
export function minutesText(minutes: number): string {
  const rounded = Math.round(minutes);
  const hours = Math.floor(rounded / 60);
  const rest = rounded % 60;
  if (hours === 0) return `${rest} min`;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

/** How long a topic takes in a plan: its lesson to learn it, its questions and cards to go over it. */
export function topicMinutes(goal: Pick<StudyGoal, 'kind'>, topic: TopicSummary | undefined) {
  if (!topic) return 0;
  return goal.kind === 'learn' ? topic.estimatedMinutes : revisitMinutes(topic);
}

/** Where a plan's topic opens: its lesson to learn it, its questions to go over it. */
export function topicHref(goal: Pick<StudyGoal, 'kind' | 'id'>, slug: string): string {
  return goal.kind === 'learn'
    ? `/learn/${slug}/lesson`
    : `/practice?goal=${goal.id}&topic=${slug}`;
}
