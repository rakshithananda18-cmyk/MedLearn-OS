import type { DbClient } from '@medlearn/db';
import { describe, expect, it, vi } from 'vitest';

import { getSessionUser, getUserId } from './session';

const client = (user: { id: string } | null, error: { name: string } | null = null) =>
  ({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user }, error }) },
  }) as unknown as DbClient;

describe('verified session', () => {
  it('identifies a visitor without a session', async () => {
    expect(await getSessionUser(client(null, { name: 'AuthSessionMissingError' }))).toBeNull();
    expect(await getUserId(client(null))).toBeNull();
  });

  it('keeps the authenticated identity', async () => {
    expect(await getUserId(client({ id: 'learner' }))).toBe('learner');
  });

  it('does not describe an account-service failure as a signed-out device', async () => {
    await expect(
      getSessionUser(client(null, { name: 'AuthRetryableFetchError' })),
    ).rejects.toMatchObject({
      code: 'UNAVAILABLE',
      status: 503,
    });
  });
});
