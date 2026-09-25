import { AppError } from '@medlearn/core';

import type { DbClient } from './client';

export const HEALTH_TIMEOUT_MS = 2000;

/**
 * Throws when the database cannot answer a trivial query. Fails fast: the client's
 * automatic retries (1s, 2s, 4s backoff) are right for reads but wrong for a health check.
 */
export async function checkDatabase(db: DbClient): Promise<void> {
  const { error } = await db
    .from('subjects')
    .select('id', { count: 'exact', head: true })
    .retry(false)
    .abortSignal(AbortSignal.timeout(HEALTH_TIMEOUT_MS));
  if (error) throw new AppError('INTERNAL', 'Database is unreachable', { cause: error });
}
