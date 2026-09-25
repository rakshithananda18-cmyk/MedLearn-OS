import type { LogLevel } from '@medlearn/schemas';

export type { LogLevel };

export const LEVEL_ORDER = { debug: 10, info: 20, warn: 30, error: 40 } as const satisfies Record<
  LogLevel,
  number
>;

export function isEnabled(level: LogLevel, minLevel: LogLevel): boolean {
  return LEVEL_ORDER[level] >= LEVEL_ORDER[minLevel];
}
