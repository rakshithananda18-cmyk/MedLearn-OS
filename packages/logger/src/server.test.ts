import { describe, expect, it } from 'vitest';

import { REDACTED } from './redact';
import { createLogger, hashUserId } from './server';

function capture() {
  const lines: Record<string, unknown>[] = [];
  const destination = { write: (line: string) => void lines.push(JSON.parse(line)) };
  return { lines, destination };
}

describe('createLogger', () => {
  it('writes structured JSON with service, level label and ISO time', () => {
    const { lines, destination } = capture();
    createLogger({ service: 'web', destination }).info({ route: '/api/health' }, 'ok');

    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatchObject({
      service: 'web',
      level: 'info',
      route: '/api/health',
      msg: 'ok',
    });
    expect(Date.parse(String(lines[0]?.time))).not.toBeNaN();
  });

  it('filters entries below the configured level', () => {
    const { lines, destination } = capture();
    const log = createLogger({ service: 'web', level: 'warn', destination });
    log.info('hidden');
    log.warn('shown');
    expect(lines.map((line) => line.msg)).toEqual(['shown']);
  });

  it('redacts sensitive fields in log objects and child bindings', () => {
    const { lines, destination } = capture();
    const child = createLogger({ service: 'web', destination }).child({ email: 'a@b.in' });
    child.info({ user: { phone: '9999999999' } }, 'signup');
    expect(lines[0]).toMatchObject({ email: REDACTED, user: { phone: REDACTED } });
  });

  it('redacts bindings of grandchild loggers too', () => {
    const { lines, destination } = capture();
    const root = createLogger({ service: 'web', destination });
    root.child({ requestId: 'r1' }).child({ Phone: '9999999999' }).info('nested');
    expect(lines[0]).toMatchObject({ requestId: 'r1', Phone: REDACTED });
  });

  it('serialises errors with message and stack', () => {
    const { lines, destination } = capture();
    createLogger({ service: 'web', destination }).error({ err: new Error('db down') }, 'failed');
    expect(lines[0]?.err).toMatchObject({ message: 'db down', type: 'Error' });
  });
});

describe('hashUserId', () => {
  it('is stable for the same id and salt', () => {
    expect(hashUserId('user-1', 'salt')).toBe(hashUserId('user-1', 'salt'));
  });

  it('differs across salts and never contains the id', () => {
    const hash = hashUserId('user-1', 'salt');
    expect(hash).not.toBe(hashUserId('user-1', 'other-salt'));
    expect(hash).not.toContain('user-1');
    expect(hash).toMatch(/^[0-9a-f]{16}$/);
  });
});
