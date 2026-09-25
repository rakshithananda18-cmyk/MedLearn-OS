import { describe, expect, it } from 'vitest';

import { redact, REDACTED } from './redact';

describe('redact', () => {
  it('replaces sensitive keys case-insensitively', () => {
    expect(redact({ Email: 'a@b.in', PHONE: '9999999999', topic: 'brachial-plexus' })).toEqual({
      Email: REDACTED,
      PHONE: REDACTED,
      topic: 'brachial-plexus',
    });
  });

  it('redacts nested objects and arrays', () => {
    const input = { user: { fullName: 'A Student', year: 1 }, attempts: [{ otp: '1234' }] };
    expect(redact(input)).toEqual({
      user: { fullName: REDACTED, year: 1 },
      attempts: [{ otp: REDACTED }],
    });
  });

  it('keeps errors and other class instances intact', () => {
    const err = new Error('boom');
    expect(redact({ err }).err).toBe(err);
  });

  it('does not mutate the input', () => {
    const input = { token: 'secret' };
    redact(input);
    expect(input.token).toBe('secret');
  });
});
