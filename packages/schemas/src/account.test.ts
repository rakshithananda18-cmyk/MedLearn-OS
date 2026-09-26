import { describe, expect, it } from 'vitest';

import { AccountCredentials, EmailCode, NewPassword } from './account';

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

describe('EmailCode and NewPassword', () => {
  it('take a 6-digit code, and a new password for a reset', () => {
    expect(EmailCode.safeParse({ email: 'a@example.com', code: '042917' }).success).toBe(true);
    expect(
      NewPassword.safeParse({ email: 'a@example.com', code: '042917', password: 'eight888' })
        .success,
    ).toBe(true);
  });

  it('reject a code that is not exactly six digits', () => {
    for (const code of ['42917', '0429170', '04a917', ' 042917']) {
      expect(EmailCode.safeParse({ email: 'a@example.com', code }).success).toBe(false);
    }
  });
});
