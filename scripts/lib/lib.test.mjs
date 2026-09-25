import { describe, expect, it, vi } from 'vitest';

import { toShellCommand, waitFor } from './cli.mjs';
import { upsertEnvText } from './env-file.mjs';

describe('toShellCommand', () => {
  it('leaves plain arguments unquoted', () => {
    expect(toShellCommand('pnpm', ['exec', 'supabase', 'status', '-o', 'json'])).toBe(
      'pnpm exec supabase status -o json',
    );
  });

  it('quotes arguments with spaces or shell characters', () => {
    expect(toShellCommand('pnpm', ['exec', 'x', 'C:/Dev Workspace/a b', 'a&b'])).toBe(
      'pnpm exec x "C:/Dev Workspace/a b" "a&b"',
    );
  });

  it('refuses double quotes, which cmd.exe cannot escape portably', () => {
    expect(() => toShellCommand('echo', ['say "hi"'])).toThrow('double quote');
  });
});

describe('upsertEnvText', () => {
  it('replaces existing keys and keeps other lines', () => {
    const text = '# comment\nSUPABASE_URL=old\nCUSTOM=mine\n';
    expect(upsertEnvText(text, { SUPABASE_URL: 'http://127.0.0.1:54321' })).toBe(
      '# comment\nSUPABASE_URL=http://127.0.0.1:54321\nCUSTOM=mine\n',
    );
  });

  it('appends missing keys', () => {
    expect(upsertEnvText('A=1\n', { B: '2' })).toBe('A=1\nB=2\n');
  });

  it('does not treat a key as a prefix of another key', () => {
    expect(upsertEnvText('LOG_LEVEL_X=1\n', { LOG_LEVEL: 'warn' })).toBe(
      'LOG_LEVEL_X=1\nLOG_LEVEL=warn\n',
    );
  });

  it('writes values containing $ literally', () => {
    expect(upsertEnvText('KEY=old\n', { KEY: 'a$&b' })).toBe('KEY=a$&b\n');
  });
});

describe('waitFor', () => {
  it('resolves true as soon as the check passes', async () => {
    const check = vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    await expect(waitFor(check, { timeoutMs: 1000, intervalMs: 1 })).resolves.toBe(true);
    expect(check).toHaveBeenCalledTimes(2);
  });

  it('resolves false after the timeout', async () => {
    await expect(waitFor(() => false, { timeoutMs: 20, intervalMs: 5 })).resolves.toBe(false);
  });
});
