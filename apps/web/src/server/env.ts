import { AppError } from '@medlearn/core';
import type { DbConfig } from '@medlearn/db';
import { LogLevel } from '@medlearn/schemas';
import { z } from 'zod';

const DbEnv = z.object({
  SUPABASE_URL: z.url(),
  SUPABASE_ANON_KEY: z.string().min(1),
});

type Env = Record<string, string | undefined>;

/** Database settings from the environment; names the missing variables, never their values. */
export function getDbConfig(env: Env = process.env): DbConfig {
  const result = DbEnv.safeParse(env);
  if (!result.success) {
    const names = [...new Set(result.error.issues.map((issue) => issue.path.join('.')))];
    throw new AppError('INTERNAL', `Invalid or missing environment variables: ${names.join(', ')}`);
  }
  return { url: result.data.SUPABASE_URL, key: result.data.SUPABASE_ANON_KEY };
}

/** Log level from the environment, falling back to `info` for unknown values. */
export function getLogLevel(env: Env = process.env): LogLevel {
  return LogLevel.catch('info').parse(env.LOG_LEVEL);
}
