import { describe, expect, it } from 'vitest';

import { topicMastery } from './mastery';
import { scheduleReview } from './review';
import { EMPTY_PROGRESS, type LearnerProgress, type PlannableTopic } from './today';

const NOW = new Date('2026-09-26T09:00:00.000Z');
const topic: PlannableTopic = {
  slug: 'plexus',
  title: 'Brachial plexus',
  estimatedMinutes: 15,
  questionIds: ['q1', 'q2'],
  cardIds: ['c1', 'c2'],
  drillMinutes: 10,
};
const after = (progress: Partial<LearnerProgress>): LearnerProgress => ({
  ...EMPTY_PROGRESS,
  ...progress,
});

describe('topicMastery', () => {
  it('is zero until the lesson is done', () => {
    expect(topicMastery(topic, after({ correctAnswers: ['q1'] }), NOW)).toMatchObject({
      percent: 0,
      lessonDone: false,
      dueCards: 0,
    });
  });

  it('counts the lesson, practice and recall equally', () => {
    const progress = after({
      completedLessons: ['plexus'],
      correctAnswers: ['q1'],
      reviews: { c1: scheduleReview(undefined, 'easy', NOW) },
    });
    expect(topicMastery(topic, progress, NOW)).toMatchObject({
      percent: 67,
      questionsCorrect: 1,
      cardsReviewed: 1,
      cardsTotal: 2,
      dueCards: 1,
    });
  });

  it('turns missed questions into cards and flags them until recalled', () => {
    const missed = after({ completedLessons: ['plexus'], mistakes: ['q2'] });
    expect(topicMastery(topic, missed, NOW)).toMatchObject({ cardsTotal: 3, weakSpots: 1 });

    const recalled = after({
      completedLessons: ['plexus'],
      mistakes: ['q2'],
      reviews: { 'mistake-q2': scheduleReview(undefined, 'easy', NOW) },
    });
    expect(topicMastery(topic, recalled, NOW).weakSpots).toBe(0);
  });

  it('reaches 100 when everything is done', () => {
    const reviews = Object.fromEntries(
      ['c1', 'c2'].map((id) => [id, scheduleReview(undefined, 'easy', NOW)]),
    );
    const progress = after({
      completedLessons: ['plexus'],
      correctAnswers: ['q1', 'q2'],
      reviews,
    });
    expect(topicMastery(topic, progress, NOW).percent).toBe(100);
  });
});
