import { createHmac } from 'node:crypto';

import pino, { type DestinationStream, type Logger as PinoLogger, type LoggerOptions } from 'pino';
import pinoPretty from 'pino-pretty';

import type { LogLevel } from './levels';
import { redact } from './redact';

export type Logger = PinoLogger;
export type { LogLevel };
export { REDACTED, SENSITIVE_KEYS } from './redact';

export interface ServerLoggerOptions {
  service: string;
  level?: LogLevel;
  /** Human-readable output for local development. */
  pretty?: boolean;
  /** Custom output stream (used by tests). */
  destination?: DestinationStream;
}

/** Structured JSON logger for server code. Sensitive keys are redacted at any depth. */
export function createLogger({
  service,
  level = 'info',
  pretty = false,
  destination,
}: ServerLoggerOptions): Logger {
  const options: LoggerOptions = {
    level,
    base: { service },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label }),
      bindings: (bindings) => redact(bindings),
      log: (object) => redact(object),
    },
  };
  if (destination) return redactChildBindings(pino(options, destination));
  if (pretty) return redactChildBindings(pino(options, pinoPretty({ colorize: true, sync: true })));
  return redactChildBindings(pino(options));
}

// pino runs `formatters.bindings` for the root logger only, so child bindings are redacted here.
// Children inherit this wrapper through pino's prototype chain; `this` is the parent logger.
function redactChildBindings(root: Logger): Logger {
  const pinoChild = root.child;
  root.child = function child(this: Logger, bindings, childOptions) {
    return pinoChild.call(this, redact(bindings), childOptions);
  } as Logger['child'];
  return root;
}

/** Stable, non-reversible id for correlating a user's logs without storing who they are. */
export function hashUserId(userId: string, salt: string): string {
  return createHmac('sha256', salt).update(userId).digest('hex').slice(0, 16);
}
