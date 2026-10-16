import { describe, expect, it } from 'vitest';

import { brachialPlexus } from '@/content/brachial-plexus';
import assets from '@/content/review-assets.json';
import { TOPICS } from '@/content/topics';

import { canonical, topicReviewDigest } from './review-digest';

describe('topic review evidence', () => {
  it('covers every shipped topic without exposing missing asset evidence', () => {
    for (const topic of TOPICS) expect(topicReviewDigest(topic)).toMatch(/^[a-f0-9]{64}$/);
  });

  it('invalidates an unchanged version after teaching text, answers, labels or file bytes change', () => {
    const original = topicReviewDigest(brachialPlexus);
    const changed = structuredClone(brachialPlexus);
    const step = changed.lesson[0];
    const question = changed.questions[0];
    if (!step || !question) throw new Error('Test topic needs a lesson and a question');
    step.body += ' Corrected.';
    expect(changed.version).toBe(brachialPlexus.version);
    expect(topicReviewDigest(changed)).not.toBe(original);
    question.answerId = 'different-answer';
    expect(topicReviewDigest(changed)).not.toBe(
      topicReviewDigest({ ...changed, questions: brachialPlexus.questions }),
    );
    const model = brachialPlexus.visual.kind === 'path' ? brachialPlexus.visual.model3d : null;
    if (!model) throw new Error('Test topic needs visual evidence');
    const file = model.src.split('?')[0] ?? model.src;
    expect(topicReviewDigest(brachialPlexus, { ...assets, [file]: '0'.repeat(64) })).not.toBe(
      original,
    );
    expect(() => topicReviewDigest(brachialPlexus, {})).toThrow(/missing/);
  });

  it('serializes object keys predictably while keeping the teaching sequence', () => {
    expect(canonical({ b: 2, a: 1 })).toBe(canonical({ a: 1, b: 2 }));
    expect(canonical([1, 2])).not.toBe(canonical([2, 1]));
  });
});
