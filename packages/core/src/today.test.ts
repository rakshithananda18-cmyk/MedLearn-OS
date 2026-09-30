import { describe, expect, it } from 'vitest';

import { scheduleReview } from './review';
import {
  addDays,
  buildTodayPlan,
  dayKey,
  daysBetween,
  dueCardIds,
  EMPTY_PROGRESS,
  firstRevisit,
  goalToday,
  type LearnerProgress,
  nextRevisit,
  openQuestionIds,
  type PlannableTopic,
  type StudyGoal,
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

describe('goals: class tests and revisits', () => {
  const goal = (change: Partial<StudyGoal>): StudyGoal => ({
    id: 'g1',
    kind: 'test',
    title: 'Class test',
    topics: ['plexus', 'axilla', 'arm', 'forearm'],
    date: '2026-09-28',
    done: [],
    createdAt: NOW.toISOString(),
    ...change,
  });

  it('spread a test over the days before it, and a revisit over its last day too', () => {
    // The test is in two days: two topics a day, finishing the day before.
    expect(goalToday(goal({}), TODAY)).toEqual({ daysLeft: 2, topics: ['plexus', 'axilla'] });
    // A revisit by the same day has three days: two topics today, then one a day.
    expect(goalToday(goal({ kind: 'revisit' }), TODAY).topics).toEqual(['plexus', 'axilla']);
    expect(goalToday(goal({ kind: 'revisit', done: ['plexus'] }), TODAY).topics).toEqual([
      'axilla',
    ]);
  });

  it('put everything left on a test that is today, and nothing once it has passed or is done', () => {
    expect(goalToday(goal({ date: TODAY }), TODAY).topics).toHaveLength(4);
    expect(goalToday(goal({ date: '2026-09-25' }), TODAY).topics).toEqual([]);
    const all = ['plexus', 'axilla', 'arm', 'forearm'];
    expect(goalToday(goal({ done: all }), TODAY).topics).toEqual([]);
  });

  it('come into Today after due reviews, even beyond the daily minutes', () => {
    const progress = after({
      profile: profile({ dailyMinutes: 10 }),
      goals: [goal({ topics: ['plexus', 'axilla'], date: '2026-09-27' })],
    });
    const plan = buildTodayPlan(topics, progress, NOW);
    expect(plan.items.map((item) => item.kind)).toEqual(['goal', 'goal']);
    expect(plan.items[0]).toMatchObject({
      goalId: 'g1',
      goalTitle: 'Class test',
      topicSlug: 'plexus',
      minutes: 3,
    });
  });
});

describe('spaced revisits of learnt topics', () => {
  it('start the day after the lesson, then stretch to a week and a month while they go well', () => {
    expect(firstRevisit('2026-09-26')).toEqual({ step: 0, due: '2026-09-27' });
    expect(nextRevisit({ step: 0, due: '2026-09-27' }, 0.8, '2026-09-27')).toEqual({
      step: 1,
      due: '2026-10-04',
    });
    expect(nextRevisit({ step: 1, due: '2026-10-04' }, 1, '2026-10-04')).toEqual({
      step: 2,
      due: '2026-11-03',
    });
    // The last one done well ends them; a poor one comes back tomorrow at the same step.
    expect(nextRevisit({ step: 2, due: '2026-11-03' }, 0.9, '2026-11-03')).toBeNull();
    expect(nextRevisit({ step: 1, due: '2026-10-04' }, 0.4, '2026-10-04')).toEqual({
      step: 1,
      due: '2026-10-05',
    });
    expect(addDays('2026-03-28', 2)).toBe('2026-03-30');
  });

  it('come into Today when due, two at most, after reviews', () => {
    const progress = after({
      completedLessons: ['plexus', 'axilla'],
      correctAnswers: ['q1', 'q2', 'q3'],
      reviews: Object.fromEntries(
        ['c1', 'c2', 'c3'].map((id) => [id, scheduleReview(undefined, 'easy', NOW)]),
      ),
      revisits: {
        plexus: { step: 0, due: TODAY },
        axilla: { step: 1, due: addDays(TODAY, 3) },
      },
    });
    const plan = buildTodayPlan(topics, progress, NOW);
    expect(plan.items.filter((item) => item.kind === 'revisit')).toEqual([
      { kind: 'revisit', topicSlug: 'plexus', title: 'Brachial plexus', minutes: 3, step: 0 },
    ]);
  });
});

describe('exam phases', () => {
  const inDays = (days: number) =>
    buildTodayPlan(
      topics,
      after({
        profile: profile({ examDate: addDays(TODAY, days) }),
        completedLessons: ['plexus'],
      }),
      NOW,
    );

  it('name the stretch before the exam, and stop new topics in the last week', () => {
    expect([20, 10, 5, 1, 0].map((days) => inDays(days).examPhase)).toEqual([
      'cover',
      'consolidate',
      'sharpen',
      'light',
      'light',
    ]);
    expect(inDays(5).items.some((item) => item.kind === 'learn')).toBe(false);
    expect(inDays(1).items.every((item) => item.kind === 'review' || item.kind === 'goal')).toBe(
      true,
    );
    expect(inDays(40).examPhase).toBeNull();
  });
});
