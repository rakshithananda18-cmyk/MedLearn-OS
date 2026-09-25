import { ClientLogBatch } from '@medlearn/schemas';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type BrowserLoggerOptions, createBrowserLogger } from './browser';
import { REDACTED } from './redact';

const FIXED_TIME = new Date('2026-09-25T10:00:00.000Z');

function setup(overrides: Partial<BrowserLoggerOptions> = {}) {
  const sent: ClientLogBatch[] = [];
  const logger = createBrowserLogger({
    endpoint: '/api/log',
    transport: (_endpoint, body) => void sent.push(ClientLogBatch.parse(JSON.parse(body))),
    now: () => FIXED_TIME,
    currentPath: () => '/today',
    ...overrides,
  });
  return { logger, sent };
}

describe('createBrowserLogger', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('sends only warn and error by default', () => {
    const { logger, sent } = setup();
    logger.info('ignored');
    logger.warn('slow lesson load');
    logger.flush();
    expect(sent).toEqual([
      {
        entries: [
          {
            level: 'warn',
            message: 'slow lesson load',
            time: FIXED_TIME.toISOString(),
            path: '/today',
          },
        ],
      },
    ]);
  });

  it('flushes when the batch is full', () => {
    const { logger, sent } = setup({ batchSize: 2 });
    logger.error('one');
    expect(sent).toHaveLength(0);
    logger.error('two');
    expect(sent).toHaveLength(1);
    expect(sent[0]?.entries).toHaveLength(2);
  });

  it('flushes after the interval', () => {
    const { logger, sent } = setup({ flushIntervalMs: 1000 });
    logger.error('later');
    vi.advanceTimersByTime(999);
    expect(sent).toHaveLength(0);
    vi.advanceTimersByTime(1);
    expect(sent).toHaveLength(1);
  });

  it('redacts context and truncates long messages', () => {
    const { logger, sent } = setup();
    logger.error('x'.repeat(5000), { email: 'a@b.in', topic: 'jaundice' });
    logger.flush();
    const entry = sent[0]?.entries[0];
    expect(entry?.message).toHaveLength(2000);
    expect(entry?.context).toEqual({ email: REDACTED, topic: 'jaundice' });
  });

  it('does nothing on flush when the queue is empty', () => {
    const { logger, sent } = setup();
    logger.flush();
    expect(sent).toHaveLength(0);
  });

  it('prints to the console instead of sending in development', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { logger, sent } = setup({ toConsole: true });
    logger.warn('dev only', { token: 't' });
    logger.flush();
    expect(sent).toHaveLength(0);
    expect(spy).toHaveBeenCalledWith('[warn] dev only', { token: REDACTED });
    spy.mockRestore();
  });
});

describe('default transport', () => {
  afterEach(() => vi.unstubAllGlobals());

  const send = () => {
    const logger = createBrowserLogger({ endpoint: '/api/log', batchSize: 1 });
    logger.error('lost connection');
  };

  it('uses sendBeacon when the browser accepts it', () => {
    const sendBeacon = vi.fn(() => true);
    const fetchSpy = vi.fn();
    vi.stubGlobal('navigator', { sendBeacon });
    vi.stubGlobal('fetch', fetchSpy);

    send();

    expect(sendBeacon).toHaveBeenCalledWith('/api/log', expect.any(Blob));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('falls back to a keepalive fetch when sendBeacon is unavailable or refuses', () => {
    const fetchSpy = vi.fn(() => Promise.resolve(new Response(null, { status: 204 })));
    vi.stubGlobal('navigator', { sendBeacon: vi.fn(() => false) });
    vi.stubGlobal('fetch', fetchSpy);

    send();

    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/log',
      expect.objectContaining({ method: 'POST', keepalive: true }),
    );
  });

  it('never throws when sending fails', async () => {
    vi.stubGlobal('navigator', {});
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('offline'))),
    );
    expect(send).not.toThrow();
    await Promise.resolve();
  });
});
