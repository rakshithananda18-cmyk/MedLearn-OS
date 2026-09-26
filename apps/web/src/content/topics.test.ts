import { Topic } from '@medlearn/schemas';
import { describe, expect, it } from 'vitest';

import { DRILL_MINUTES, getTopic, hasDrill, PLANNABLE_TOPICS, TOPICS } from './topics';

describe('bundled content', () => {
  it('matches the Topic schema exactly, with no defaults left to fill in', () => {
    for (const topic of TOPICS) expect(Topic.parse(topic)).toEqual(topic);
  });

  it('loads the sample topic, marked as not medically reviewed', () => {
    const topic = getTopic('brachial-plexus');
    expect(topic?.reviewed).toBe(false);
    expect(getTopic('missing')).toBeUndefined();
  });

  it('uses unique ids so progress never mixes up questions or cards', () => {
    const ids = TOPICS.flatMap((topic) => [
      ...topic.questions.map((question) => question.id),
      ...topic.cards.map((card) => card.id),
    ]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives the planner every question and card', () => {
    const [topic] = TOPICS;
    const [plannable] = PLANNABLE_TOPICS;
    expect(plannable?.questionIds).toHaveLength(topic?.questions.length ?? -1);
    expect(plannable?.cardIds).toHaveLength(topic?.cards.length ?? -1);
  });

  it('offers the exam diagram drill only for topics with a diagram to build', () => {
    expect(TOPICS.map(hasDrill)).toEqual([true, false]);
    expect(PLANNABLE_TOPICS.map((topic) => topic.drillMinutes)).toEqual([DRILL_MINUTES, null]);
  });
});
