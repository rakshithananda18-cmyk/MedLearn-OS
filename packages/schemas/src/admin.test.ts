import { describe, expect, it } from 'vitest';

import { ReviewerInput } from './admin';

describe('ReviewerInput', () => {
  it('keeps emails in lower case and trims the qualification', () => {
    expect(
      ReviewerInput.parse({ email: 'Tutor@Example.com', qualification: '  MD Anatomy ' }),
    ).toEqual({ email: 'tutor@example.com', qualification: 'MD Anatomy' });
  });

  it('needs a real email and a qualification', () => {
    expect(ReviewerInput.safeParse({ email: 'nope', qualification: 'MBBS' }).success).toBe(false);
    expect(ReviewerInput.safeParse({ email: 'a@b.com', qualification: ' ' }).success).toBe(false);
    expect(
      ReviewerInput.safeParse({ email: 'a@b.com', qualification: 'x'.repeat(201) }).success,
    ).toBe(false);
  });
});
