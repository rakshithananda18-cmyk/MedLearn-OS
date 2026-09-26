import { z } from 'zod';

export const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;
export const LogLevel = z.enum(LOG_LEVELS);
export type LogLevel = z.infer<typeof LogLevel>;

/** A log entry sent from the browser to `/api/log`. */
export const ClientLogEntry = z.object({
  level: LogLevel,
  message: z.string().min(1).max(2000),
  time: z.iso.datetime(),
  path: z.string().max(500).optional(),
  requestId: z.string().max(100).optional(),
  context: z.record(z.string(), z.unknown()).optional(),
});
export type ClientLogEntry = z.infer<typeof ClientLogEntry>;

export const ClientLogBatch = z.object({
  entries: z.array(ClientLogEntry).min(1).max(50),
});
export type ClientLogBatch = z.infer<typeof ClientLogBatch>;
