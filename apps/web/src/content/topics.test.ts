import { describe, expect, it } from 'vitest';

import { getTopic, PLANNABLE_TOPICS, TOPICS } from './topics';

describe('bundled content', () => {
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
});
