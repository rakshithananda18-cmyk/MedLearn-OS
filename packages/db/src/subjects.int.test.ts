import { isAppError } from '@medlearn/core';
import { describe, expect, it } from 'vitest';

import { createDbClient } from './client';
import { checkDatabase, HEALTH_TIMEOUT_MS } from './health';
import { createSubjectsRepository } from './subjects';

// Runs against the local Supabase stack with seed data (`pnpm bootstrap`).
const db = createDbClient({
  url: process.env.SUPABASE_URL ?? '',
  key: process.env.SUPABASE_ANON_KEY ?? '',
});

describe('subjects repository (local database)', () => {
  it('lists seeded subjects in teaching order', async () => {
    const subjects = await createSubjectsRepository(db).list();
    expect(subjects.map((subject) => subject.slug)).toEqual([
      'anatomy',
      'physiology',
      'biochemistry',
    ]);
  });

  it('passes the health check', async () => {
    await expect(checkDatabase(db)).resolves.toBeUndefined();
  });

  it('reports an unreachable database quickly, as an INTERNAL AppError', async () => {
    const offline = createDbClient({ url: 'http://127.0.0.1:1', key: 'invalid' });
    const started = Date.now();
    const error = await checkDatabase(offline).catch((caught: unknown) => caught);
    expect(isAppError(error) && error.code).toBe('INTERNAL');
    // No retry backoff: a health check must answer well within its own timeout.
    expect(Date.now() - started).toBeLessThan(HEALTH_TIMEOUT_MS + 500);
  });
});
