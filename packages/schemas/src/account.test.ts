import { describe, expect, it } from 'vitest';

import { AccountCredentials } from './account';

describe('AccountCredentials', () => {
  it('accepts an email and a password of at least 8 characters', () => {
    expect(
      AccountCredentials.safeParse({ email: 'student@example.com', password: 'eight888' }).success,
    ).toBe(true);
  });

  it('rejects a malformed email and a short or overlong password', () => {
    expect(AccountCredentials.safeParse({ email: 'nope', password: 'eight888' }).success).toBe(
      false,
    );
    expect(
      AccountCredentials.safeParse({ email: 'a@example.com', password: 'short' }).success,
    ).toBe(false);
    expect(
      AccountCredentials.safeParse({ email: 'a@example.com', password: 'x'.repeat(73) }).success,
    ).toBe(false);
  });
});
