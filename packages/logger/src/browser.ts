import type { ClientLogBatch, ClientLogEntry } from '@medlearn/schemas';

import { isEnabled, type LogLevel } from './levels';
import { redact } from './redact';

export type { LogLevel };
type Context = Record<string, unknown>;
type Transport = (endpoint: string, body: string) => void;

export interface BrowserLogger {
  debug(message: string, context?: Context): void;
  info(message: string, context?: Context): void;
  warn(message: string, context?: Context): void;
  error(message: string, context?: Context): void;
  /** Sends queued entries now (call on `pagehide`). */
  flush(): void;
}

export interface BrowserLoggerOptions {
  /** Server endpoint that receives batches, e.g. `/api/log`. */
  endpoint: string;
  /** Print to the developer console instead of sending (local development). */
  toConsole?: boolean;
  /** Lowest level sent to the server. */
  minLevel?: LogLevel;
  batchSize?: number;
  flushIntervalMs?: number;
  transport?: Transport;
  now?: () => Date;
  currentPath?: () => string | undefined;
}

const MAX_MESSAGE = 2000;
const MAX_PATH = 500;

const beaconTransport: Transport = (endpoint, body) => {
  const blob = new Blob([body], { type: 'application/json' });
  if (typeof navigator !== 'undefined' && navigator.sendBeacon?.(endpoint, blob)) return;
  void fetch(endpoint, {
    method: 'POST',
    body,
    headers: { 'content-type': 'application/json' },
    keepalive: true,
  }).catch(() => undefined);
};

function writeToConsole(level: LogLevel, message: string, context?: Context): void {
  // The console is the intended output of the development logger.
  // eslint-disable-next-line no-console
  console[level](`[${level}] ${message}`, ...(context ? [context] : []));
}

export function createBrowserLogger({
  endpoint,
  toConsole = false,
  minLevel = 'warn',
  batchSize = 10,
  flushIntervalMs = 5000,
  transport = beaconTransport,
  now = () => new Date(),
  currentPath = () => (typeof location === 'undefined' ? undefined : location.pathname),
}: BrowserLoggerOptions): BrowserLogger {
  let queue: ClientLogEntry[] = [];
  let timer: ReturnType<typeof setTimeout> | undefined;

  function flush(): void {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
    if (queue.length === 0) return;
    const batch: ClientLogBatch = { entries: queue };
    queue = [];
    transport(endpoint, JSON.stringify(batch));
  }

  function log(level: LogLevel, message: string, context?: Context): void {
    const safeContext = context ? redact(context) : undefined;
    if (toConsole) {
      writeToConsole(level, message, safeContext);
      return;
    }
    if (!isEnabled(level, minLevel)) return;

    const path = currentPath()?.slice(0, MAX_PATH);
    queue.push({
      level,
      message: message.slice(0, MAX_MESSAGE),
      time: now().toISOString(),
      ...(path ? { path } : {}),
      ...(safeContext ? { context: safeContext } : {}),
    });
    if (queue.length >= batchSize) flush();
    else timer ??= setTimeout(flush, flushIntervalMs);
  }

  return {
    debug: (message, context) => log('debug', message, context),
    info: (message, context) => log('info', message, context),
    warn: (message, context) => log('warn', message, context),
    error: (message, context) => log('error', message, context),
    flush,
  };
}
