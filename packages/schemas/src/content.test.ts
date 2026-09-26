import { describe, expect, it } from 'vitest';

import { Topic } from './content';

const base = {
  slug: 'sample',
  subjectSlug: 'anatomy',
  title: 'Sample',
  summary: 'x',
  estimatedMinutes: 5,
  reviewed: false,
  visual: {
    kind: 'path',
    diagram: {
      width: 100,
      height: 100,
      nodes: [
        { id: 'a', label: 'A', name: 'A', x: 10, y: 10 },
        { id: 'b', label: 'B', name: 'B', x: 50, y: 50 },
      ],
      edges: [{ from: 'a', to: 'b' }],
    },
    lesions: [],
  },
  lesson: [{ id: 'one', title: 'One', body: 'x', focus: ['a'] }],
  questions: [
    {
      id: 'q',
      prompt: 'x',
      options: [
        { id: 'y', text: 'Y' },
        { id: 'n', text: 'N' },
      ],
      answerId: 'y',
      explanation: 'x',
    },
  ],
  cards: [{ id: 'c', front: 'f', back: 'b' }],
};

describe('Topic', () => {
  it('accepts consistent content', () => {
    expect(Topic.safeParse(base).success).toBe(true);
  });

  it('rejects references to diagram nodes that do not exist', () => {
    const broken = { ...base, lesson: [{ id: 'one', title: 'One', body: 'x', focus: ['ghost'] }] };
    const result = Topic.safeParse(broken);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe('Unknown diagram node "ghost"');
  });

  it('checks drill steps against the diagram and defaults to no drill', () => {
    const parsed = Topic.parse(base);
    expect(parsed.visual.kind === 'path' && parsed.visual.drill).toEqual([]);
    const broken = {
      ...base,
      visual: {
        ...base.visual,
        drill: [{ id: 'roots', title: 'Roots', hint: 'x', nodeIds: ['ghost'] }],
      },
    };
    expect(Topic.safeParse(broken).success).toBe(false);
  });

  it('accepts a curve topic whose steps set blood conditions', () => {
    const curve = {
      ...base,
      visual: { kind: 'oxygen-curve' },
      lesson: [{ id: 'acid', title: 'Acid', body: 'x', conditions: { ph: 7.2 } }],
    };
    expect(Topic.parse(curve).lesson[0]?.focus).toEqual([]);
    const outOfRange = { ...curve, lesson: [{ ...curve.lesson[0], conditions: { ph: 9 } }] };
    expect(Topic.safeParse(outOfRange).success).toBe(false);
  });

  it('rejects a question whose answer is not one of its options', () => {
    const broken = { ...base, questions: [{ ...base.questions[0], answerId: 'maybe' }] };
    expect(Topic.safeParse(broken).success).toBe(false);
  });
});
