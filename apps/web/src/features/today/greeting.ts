export type PartOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

/** The part of the day an hour (0 to 23, the student's own clock) falls in. */
export function partOfDay(hour: number): PartOfDay {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}

const HELLO: Record<PartOfDay, string> = {
  morning: 'Good morning',
  afternoon: 'Good afternoon',
  evening: 'Good evening',
  night: 'Still up',
};

/** "Good evening, Asha", or without a name until the student gives one. */
export function greeting(part: PartOfDay, name: string | undefined): string {
  const first = name?.trim().split(/\s+/)[0];
  return first ? `${HELLO[part]}, ${first}` : HELLO[part];
}

/** What suits the hour, when no exam is near to set the order. */
export const DAY_TIP: Record<PartOfDay, string> = {
  morning: 'A fresh start: a good time for something new.',
  afternoon: 'Practise what you have learned so far today.',
  evening: 'Evening suits recall and drawing: settle the day’s work.',
  night: 'It is late: a few recall cards, then sleep. Sleep is when memory settles.',
};
