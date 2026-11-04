import { beforeEach, describe, expect, it, vi } from 'vitest';

import { configureLocalEnv } from './local-env.mjs';

const state = vi.hoisted(() => ({ status: {}, write: vi.fn() }));
vi.mock('./cli.mjs', () => ({
  capture: () => JSON.stringify(state.status),
  fail: (message) => {
    throw new Error(message);
  },
}));
vi.mock('./env-file.mjs', () => ({ upsertEnvFile: state.write }));
beforeEach(() => vi.clearAllMocks());

describe('local connection settings', () => {
  it('refreshes the app and test mailbox without resetting any database', () => {
    state.status = {
      API_URL: 'http://127.0.0.1:54321',
      ANON_KEY: 'test-public-key',
      INBUCKET_URL: 'http://127.0.0.1:54324',
    };
    expect(configureLocalEnv()).toEqual({ url: state.status.API_URL });
    expect(state.write).toHaveBeenCalledWith('apps/web/.env.local', {
      SUPABASE_URL: state.status.API_URL,
      SUPABASE_ANON_KEY: 'test-public-key',
    });
    expect(state.write).toHaveBeenCalledWith(
      '.env.test.local',
      expect.objectContaining({ MAILPIT_URL: state.status.INBUCKET_URL }),
    );
  });

  it('leaves existing settings intact when a running connection cannot be read', () => {
    state.status = {};
    expect(() => configureLocalEnv()).toThrow('Could not read');
    expect(state.write).not.toHaveBeenCalled();
  });
});
