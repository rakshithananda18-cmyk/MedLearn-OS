import { describe, expect, it } from 'vitest';

import { scheduleReview } from './review';
import {
  buildTodayPlan,
  dueCardIds,
  EMPTY_PROGRESS,
  type LearnerProgress,
  openQuestionIds,
  type PlannableTopic,
} from './today';

const NOW = new Date('2026-09-26T09:00:00.000Z');

const topics: PlannableTopic[] = [
  {
    slug: 'plexus',
    title: 'Brachial plexus',
    estimatedMinutes: 15,
    questionIds: ['q1', 'q2'],
    cardIds: ['c1', 'c2'],
  },
  { slug: 'axilla', title: 'Axilla', estimatedMinutes: 12, questionIds: ['q3'], cardIds: ['c3'] },
];

const after = (progress: Partial<LearnerProgress>): LearnerProgress => ({
  ...EMPTY_PROGRESS,
  ...progress,
});

describe('buildTodayPlan', () => {
  it('starts a new learner on the first topic in teaching order', () => {
    expect(buildTodayPlan(topics, EMPTY_PROGRESS, NOW)).toEqual([
      { kind: 'learn', topicSlug: 'plexus', title: 'Brachial plexus', minutes: 15 },
    ]);
  });

  it('after a lesson: reviews first, then the next topic, then practice', () => {
    const plan = buildTodayPlan(topics, after({ completedLessons: ['plexus'] }), NOW);
    expect(plan.map((item) => item.kind)).toEqual(['review', 'learn', 'practice']);
    expect(plan[0]).toEqual({ kind: 'review', count: 2, minutes: 1 });
    expect(plan[1]).toMatchObject({ kind: 'learn', topicSlug: 'axilla' });
    expect(plan[2]).toMatchObject({ kind: 'practice', topicSlug: 'plexus', count: 2 });
  });

  it('drops reviewed cards until they are due again', () => {
    const reviews = {
      c1: scheduleReview(undefined, 'good', NOW),
      c2: scheduleReview(undefined, 'easy', NOW),
    };
    const plan = buildTodayPlan(topics, after({ completedLessons: ['plexus'], reviews }), NOW);
    expect(plan.some((item) => item.kind === 'review')).toBe(false);
  });

  it('is empty when everything is done and nothing is due', () => {
    const reviews = Object.fromEntries(
      ['c1', 'c2', 'c3'].map((id) => [id, scheduleReview(undefined, 'easy', NOW)]),
    );
    const progress = after({
      completedLessons: ['plexus', 'axilla'],
      correctAnswers: ['q1', 'q2', 'q3'],
      reviews,
    });
    expect(buildTodayPlan(topics, progress, NOW)).toEqual([]);
  });
});

describe('dueCardIds and openQuestionIds', () => {
  it('only unlock cards and questions after the lesson is finished', () => {
    expect(dueCardIds(topics, EMPTY_PROGRESS, NOW)).toEqual([]);
    expect(openQuestionIds(topics[0] as PlannableTopic, EMPTY_PROGRESS)).toEqual([]);
  });

  it('leave out questions already answered correctly', () => {
    const progress = after({ completedLessons: ['plexus'], correctAnswers: ['q1'] });
    expect(openQuestionIds(topics[0] as PlannableTopic, progress)).toEqual(['q2']);
  });
});
