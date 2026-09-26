import { describe, expect, it } from 'vitest';

import { scheduleReview } from './review';
import {
  buildTodayPlan,
  dayKey,
  daysBetween,
  dueCardIds,
  EMPTY_PROGRESS,
  type LearnerProgress,
  openQuestionIds,
  type PlannableTopic,
  type StudyProfile,
} from './today';

const NOW = new Date('2026-09-26T09:00:00.000Z');
const TODAY = dayKey(NOW);

const topics: PlannableTopic[] = [
  {
    slug: 'plexus',
    title: 'Brachial plexus',
    estimatedMinutes: 15,
    questionIds: ['q1', 'q2'],
    cardIds: ['c1', 'c2'],
    drillMinutes: 10,
  },
  {
    slug: 'axilla',
    title: 'Axilla',
    estimatedMinutes: 12,
    questionIds: ['q3'],
    cardIds: ['c3'],
    drillMinutes: null,
  },
];

const after = (progress: Partial<LearnerProgress>): LearnerProgress => ({
  ...EMPTY_PROGRESS,
  ...progress,
});

const profile = (overrides: Partial<StudyProfile>): StudyProfile => ({
  year: 1,
  examDate: null,
  dailyMinutes: 20,
  adult: true,
  ...overrides,
});

const daysFromNow = (days: number) => new Date(NOW.getTime() + days * 86_400_000);
const kinds = (progress: LearnerProgress, topicList = topics) =>
  buildTodayPlan(topicList, progress, NOW).items.map((item) => item.kind);

describe('buildTodayPlan: normal days', () => {
  it('starts a new learner on the first topic in teaching order', () => {
    const plan = buildTodayPlan(topics, EMPTY_PROGRESS, NOW);
    expect(plan.mode).toBe('normal');
    expect(plan.dailyMinutes).toBe(20);
    expect(plan.items).toEqual([
      { kind: 'learn', topicSlug: 'plexus', title: 'Brachial plexus', minutes: 15 },
    ]);
  });

  it('after a lesson: reviews first, then the next topic, then practice', () => {
    const { items } = buildTodayPlan(topics, after({ completedLessons: ['plexus'] }), NOW);
    expect(items.map((item) => item.kind)).toEqual(['review', 'learn', 'practice']);
    expect(items[0]).toEqual({ kind: 'review', count: 2, minutes: 1 });
    expect(items[1]).toMatchObject({ kind: 'learn', topicSlug: 'axilla' });
    expect(items[2]).toMatchObject({ kind: 'practice', topicSlug: 'plexus', count: 2 });
  });

  it('fits the day: the diagram drill waits when the daily minutes are used up', () => {
    expect(kinds(after({ completedLessons: ['plexus'] }))).not.toContain('drill');
    const roomy = after({ completedLessons: ['plexus'], profile: profile({ dailyMinutes: 45 }) });
    expect(kinds(roomy)).toEqual(['review', 'learn', 'practice', 'drill']);
  });

  it('always offers at least the first step, even when it is longer than the day', () => {
    const short = after({ profile: profile({ dailyMinutes: 10 }) });
    expect(kinds(short)).toEqual(['learn']);
  });

  it('drops reviewed cards until they are due again, and finished drills for good', () => {
    const reviews = {
      c1: scheduleReview(undefined, 'good', NOW),
      c2: scheduleReview(undefined, 'easy', NOW),
    };
    const progress = after({
      completedLessons: ['plexus'],
      completedDrills: ['plexus'],
      reviews,
      profile: profile({ dailyMinutes: 45 }),
    });
    expect(kinds(progress)).toEqual(['learn', 'practice']);
  });

  it('is empty when everything is done and nothing is due', () => {
    const reviews = Object.fromEntries(
      ['c1', 'c2', 'c3'].map((id) => [id, scheduleReview(undefined, 'easy', NOW)]),
    );
    const progress = after({
      completedLessons: ['plexus', 'axilla'],
      completedDrills: ['plexus'],
      correctAnswers: ['q1', 'q2', 'q3'],
      reviews,
    });
    expect(buildTodayPlan(topics, progress, NOW).items).toEqual([]);
  });
});

describe('buildTodayPlan: catch-up after missed days', () => {
  const manyCards: PlannableTopic[] = [
    {
      ...(topics[0] as PlannableTopic),
      cardIds: Array.from({ length: 40 }, (_, index) => `card-${index}`),
    },
  ];

  it('switches to catch-up after three missed days, protecting learned work first', () => {
    const progress = after({
      completedLessons: ['plexus'],
      lastActiveAt: daysFromNow(-4).toISOString(),
    });
    const plan = buildTodayPlan([...topics], progress, NOW);
    expect(plan.mode).toBe('catch-up');
    expect(plan.missedDays).toBe(3);
    expect(plan.items.map((item) => item.kind)).toEqual(['review', 'practice', 'learn']);
  });

  it('stays normal after one or two missed days', () => {
    const progress = after({ lastActiveAt: daysFromNow(-3).toISOString() });
    const plan = buildTodayPlan(topics, progress, NOW);
    expect(plan.missedDays).toBe(2);
    expect(plan.mode).toBe('normal');
  });

  it('never shows more than one day of reviews and spreads the rest over the next days', () => {
    const progress = after({
      completedLessons: ['plexus'],
      lastActiveAt: daysFromNow(-10).toISOString(),
    });
    const plan = buildTodayPlan(manyCards, progress, NOW);
    expect(plan.items[0]).toEqual({ kind: 'review', count: 20, minutes: 10 });
    expect(plan.heldBackReviews).toBe(20);
    expect(plan.catchUpDays).toBe(1);
  });
});

describe('buildTodayPlan: exam mode', () => {
  it('leads with diagram drills within 30 days of the exam', () => {
    const progress = after({
      completedLessons: ['plexus'],
      profile: profile({ examDate: dayKey(daysFromNow(12)) }),
    });
    const plan = buildTodayPlan(topics, progress, NOW);
    expect(plan.mode).toBe('exam');
    expect(plan.examInDays).toBe(12);
    expect(plan.items[0]).toMatchObject({ kind: 'drill', topicSlug: 'plexus', minutes: 10 });
  });

  it('counts the exam but stays in normal mode when it is further away', () => {
    const progress = after({ profile: profile({ examDate: dayKey(daysFromNow(60)) }) });
    const plan = buildTodayPlan(topics, progress, NOW);
    expect(plan.examInDays).toBe(60);
    expect(plan.mode).toBe('normal');
  });

  it('ignores an exam date that has passed', () => {
    const progress = after({ profile: profile({ examDate: dayKey(daysFromNow(-1)) }) });
    expect(buildTodayPlan(topics, progress, NOW).examInDays).toBeNull();
  });
});

describe('calendar helpers', () => {
  it('count whole local days', () => {
    expect(daysBetween('2026-09-26', '2026-10-06')).toBe(10);
    expect(daysBetween('2026-03-28', '2026-03-30')).toBe(2);
    expect(dayKey(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(TODAY).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('dueCardIds and openQuestionIds', () => {
  it('only unlock cards and questions after the lesson is finished', () => {
    expect(dueCardIds(topics, EMPTY_PROGRESS, NOW)).toEqual([]);
    expect(openQuestionIds(topics[0] as PlannableTopic, EMPTY_PROGRESS)).toEqual([]);
  });

  it('add a recall card for every missed question of a finished lesson', () => {
    const progress = after({ completedLessons: ['plexus'], mistakes: ['q2', 'q3'] });
    expect(dueCardIds(topics, progress, NOW)).toEqual(['c1', 'c2', 'mistake-q2']);
  });

  it('leave out questions already answered correctly', () => {
    const progress = after({ completedLessons: ['plexus'], correctAnswers: ['q1'] });
    expect(openQuestionIds(topics[0] as PlannableTopic, progress)).toEqual(['q2']);
  });
});
