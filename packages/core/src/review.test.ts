import { describe, expect, it } from 'vitest';

import { isDue, scheduleReview } from './review';

const NOW = new Date('2026-09-26T09:00:00.000Z');
const DAY = 24 * 60 * 60 * 1000;

describe('scheduleReview', () => {
  it('schedules a new card into the future and stores plain JSON', () => {
    const state = scheduleReview(undefined, 'good', NOW);
    expect(new Date(state.due).getTime()).toBeGreaterThan(NOW.getTime());
    expect(state.reps).toBe(1);
    expect(JSON.parse(JSON.stringify(state))).toEqual(state);
  });

  it('brings a forgotten card back sooner than a remembered one', () => {
    const again = scheduleReview(undefined, 'again', NOW);
    const easy = scheduleReview(undefined, 'easy', NOW);
    expect(new Date(again.due).getTime()).toBeLessThan(new Date(easy.due).getTime());
  });

  it('spaces successful reviews further apart each time', () => {
    const first = scheduleReview(undefined, 'good', NOW);
    const firstGap = new Date(first.due).getTime() - NOW.getTime();
    const later = new Date(first.due);
    const second = scheduleReview(first, 'good', later);
    const secondGap = new Date(second.due).getTime() - later.getTime();
    expect(secondGap).toBeGreaterThan(firstGap);
  });

  it('counts a lapse when a learned card is forgotten', () => {
    let state = scheduleReview(undefined, 'good', NOW);
    state = scheduleReview(state, 'good', new Date(NOW.getTime() + 3 * DAY));
    const forgotten = scheduleReview(state, 'again', new Date(NOW.getTime() + 20 * DAY));
    expect(forgotten.lapses).toBe(1);
  });
});

describe('isDue', () => {
  it('treats never-reviewed cards as due', () => {
    expect(isDue(undefined, NOW)).toBe(true);
  });

  it('compares the due date with now', () => {
    const state = scheduleReview(undefined, 'easy', NOW);
    expect(isDue(state, NOW)).toBe(false);
    expect(isDue(state, new Date(new Date(state.due).getTime() + 1))).toBe(true);
  });
});
