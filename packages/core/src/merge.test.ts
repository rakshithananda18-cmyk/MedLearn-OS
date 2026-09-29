import { describe, expect, it } from 'vitest';

import { mergeProgress } from './merge';
import { scheduleReview } from './review';
import { EMPTY_PROGRESS, type LearnerProgress } from './today';

const NOW = new Date('2026-09-27T12:00:00.000Z');
const EARLY = new Date('2026-09-20T09:00:00.000Z');
const LATE = new Date('2026-09-26T09:00:00.000Z');
const progress = (change: Partial<LearnerProgress>): LearnerProgress => ({
  ...EMPTY_PROGRESS,
  ...change,
});

describe('mergeProgress', () => {
  it('keeps everything learned on the phone and in the account', () => {
    const phone = progress({
      completedLessons: ['brachial-plexus'],
      correctAnswers: ['q1'],
      mistakes: ['q2'],
      lastActiveAt: LATE.toISOString(),
    });
    const account = progress({
      profile: { year: 1, examDate: null, dailyMinutes: 30, adult: true },
      completedLessons: ['oxygen-curve', 'brachial-plexus'],
      completedDrills: ['brachial-plexus'],
      correctAnswers: ['q3'],
      lastActiveAt: EARLY.toISOString(),
    });
    const merged = mergeProgress(phone, account, NOW);
    expect(merged.completedLessons.sort()).toEqual(['brachial-plexus', 'oxygen-curve']);
    expect(merged.completedDrills).toEqual(['brachial-plexus']);
    expect(merged.correctAnswers.sort()).toEqual(['q1', 'q3']);
    expect(merged.mistakes).toEqual(['q2']);
    expect(merged.profile?.dailyMinutes).toBe(30);
    expect(merged.lastActiveAt).toBe(LATE.toISOString());
    expect(merged.updatedAt).toBe(NOW.toISOString());
  });

  it('keeps the most recent review of each card', () => {
    const older = scheduleReview(undefined, 'again', EARLY);
    const newer = scheduleReview(undefined, 'easy', LATE);
    const phone = progress({ reviews: { c1: older, c2: newer } });
    const account = progress({ reviews: { c1: newer, c2: older, c3: older } });
    const merged = mergeProgress(phone, account, NOW);
    expect(merged.reviews).toEqual({ c1: newer, c2: newer, c3: older });
  });

  it('keeps the most recent note on each topic, including a cleared one', () => {
    const phone = progress({
      notes: {
        'brachial-plexus': { text: 'Upper trunk: Erb', updatedAt: LATE.toISOString() },
        'oxygen-curve': { text: '', updatedAt: LATE.toISOString() },
      },
    });
    const account = progress({
      notes: {
        'brachial-plexus': { text: 'old', updatedAt: EARLY.toISOString() },
        'oxygen-curve': { text: 'P50 27', updatedAt: EARLY.toISOString() },
        'cardiac-cycle': { text: 'from another phone', updatedAt: EARLY.toISOString() },
      },
    });
    expect(mergeProgress(phone, account, NOW).notes).toEqual({
      'brachial-plexus': { text: 'Upper trunk: Erb', updatedAt: LATE.toISOString() },
      'oxygen-curve': { text: '', updatedAt: LATE.toISOString() },
      'cardiac-cycle': { text: 'from another phone', updatedAt: EARLY.toISOString() },
    });
  });

  it('falls back to the phone profile when the account has none', () => {
    const phone = progress({ profile: { year: 2, examDate: null, dailyMinutes: 20, adult: true } });
    expect(mergeProgress(phone, EMPTY_PROGRESS, NOW).profile?.year).toBe(2);
  });

  it('joins goals by id, keeping topics gone over on either side', () => {
    const goal = {
      id: 'g1',
      kind: 'test' as const,
      title: 'Class test',
      topics: ['a', 'b', 'c'],
      date: '2026-10-01',
      done: ['a'],
      createdAt: EARLY.toISOString(),
    };
    const phone = progress({ goals: [goal, { ...goal, id: 'g2', done: [] }] });
    const account = progress({ goals: [{ ...goal, done: ['b'] }] });
    const merged = mergeProgress(phone, account, NOW);
    expect(merged.goals.map((item) => [item.id, item.done])).toEqual([
      ['g1', ['b', 'a']],
      ['g2', []],
    ]);
  });
});
