import { isAppError } from '@medlearn/core';
import { describe, expect, it } from 'vitest';

import { getDbConfig, getLogLevel } from './env';

describe('getDbConfig', () => {
  it('returns url and key from the environment', () => {
    expect(
      getDbConfig({ SUPABASE_URL: 'http://127.0.0.1:54321', SUPABASE_ANON_KEY: 'public-key' }),
    ).toEqual({ url: 'http://127.0.0.1:54321', key: 'public-key' });
  });

  it('names missing variables without echoing any values', () => {
    const error = (() => {
      try {
        getDbConfig({ SUPABASE_URL: 'not a url', SECRET: 'do-not-print' });
      } catch (caught) {
        return caught;
      }
    })();
    expect(isAppError(error)).toBe(true);
    const message = (error as Error).message;
    expect(message).toContain('SUPABASE_URL');
    expect(message).toContain('SUPABASE_ANON_KEY');
    expect(message).not.toContain('not a url');
  });
});

describe('getLogLevel', () => {
  it('accepts known levels', () => {
    expect(getLogLevel({ LOG_LEVEL: 'debug' })).toBe('debug');
  });

  it('falls back to info', () => {
    expect(getLogLevel({})).toBe('info');
    expect(getLogLevel({ LOG_LEVEL: 'verbose' })).toBe('info');
  });
});
