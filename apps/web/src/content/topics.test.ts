import { Topic } from '@medlearn/schemas';
import { pillSize } from '@medlearn/visuals';
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
    const drills = TOPICS.map(hasDrill);
    expect(drills).toEqual([true, false, true, true, true, false]);
    expect(PLANNABLE_TOPICS.map((topic) => topic.drillMinutes)).toEqual(
      drills.map((drill) => (drill ? DRILL_MINUTES : null)),
    );
  });

  it('lays out every diagram label inside the diagram, without overlaps', () => {
    for (const topic of TOPICS) {
      if (topic.visual.kind !== 'path') continue;
      const { width, height, nodes } = topic.visual.diagram;
      const boxes = nodes.map((node) => {
        const size = pillSize(node.label);
        return {
          id: node.id,
          left: node.x - size.width / 2,
          right: node.x + size.width / 2,
          top: node.y - size.height / 2,
          bottom: node.y + size.height / 2,
        };
      });
      for (const [index, box] of boxes.entries()) {
        const where = `${topic.slug}: ${box.id}`;
        expect(box.left >= 0 && box.right <= width, `${where} fits across`).toBe(true);
        expect(box.top >= 0 && box.bottom <= height, `${where} fits down`).toBe(true);
        for (const other of boxes.slice(index + 1)) {
          const overlaps =
            box.left < other.right &&
            other.left < box.right &&
            box.top < other.bottom &&
            other.top < box.bottom;
          expect(overlaps, `${where} overlaps ${other.id}`).toBe(false);
        }
      }
    }
  });
});
