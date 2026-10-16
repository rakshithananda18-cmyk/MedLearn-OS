import { describe, expect, it } from 'vitest';

import { ReviewInput } from './reviews';

const all = { pages: true, facts: true, questions: true, visuals: true };
const base = { topicSlug: 'brachial-plexus', contentVersion: '0.1.0' };

describe('ReviewInput', () => {
  it('approves only with every check ticked', () => {
    expect(ReviewInput.safeParse({ ...base, decision: 'approved', checks: all }).success).toBe(
      true,
    );
    const partial = ReviewInput.safeParse({
      ...base,
      decision: 'approved',
      checks: { ...all, visuals: false },
    });
    expect(partial.success).toBe(false);
  });

  it('asks for changes only with a note saying what', () => {
    const none = { ...all, facts: false };
    expect(
      ReviewInput.safeParse({ ...base, decision: 'changes-requested', checks: none }).success,
    ).toBe(false);
    const withNote = ReviewInput.parse({
      ...base,
      decision: 'changes-requested',
      checks: none,
      note: '  C8 is missing  ',
    });
    expect(withNote.note).toBe('C8 is missing');
  });
});
