import { type Card, createEmptyCard, fsrs, Rating } from 'ts-fsrs';

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

/** An FSRS card as stored on the device or server: dates as ISO strings, plain JSON. */
export type ReviewState = Omit<Card, 'due' | 'last_review'> & { due: string; last_review?: string };

const scheduler = fsrs();

const GRADE = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
} as const;

function toStored({ due, last_review, ...rest }: Card): ReviewState {
  return {
    ...rest,
    due: due.toISOString(),
    ...(last_review ? { last_review: last_review.toISOString() } : {}),
  };
}

function fromStored({ due, last_review, ...rest }: ReviewState): Card {
  return {
    ...rest,
    due: new Date(due),
    ...(last_review ? { last_review: new Date(last_review) } : {}),
  };
}

/** Schedules the next review of a card after the student rates how well they recalled it. */
export function scheduleReview(
  state: ReviewState | undefined,
  rating: ReviewRating,
  now: Date,
): ReviewState {
  const card = state ? fromStored(state) : createEmptyCard(now);
  return toStored(scheduler.next(card, now, GRADE[rating]).card);
}

/** A card never reviewed is due immediately. */
export function isDue(state: ReviewState | undefined, now: Date): boolean {
  return !state || new Date(state.due).getTime() <= now.getTime();
}
