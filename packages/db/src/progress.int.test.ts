import type { LearnerProgressInput } from '@medlearn/schemas';
import { describe, expect, it } from 'vitest';

import { createDbClient } from './client';
import { createProgressRepository } from './progress';
import { createReportsRepository } from './reports';

// Runs against the local Supabase stack, signing in as fresh anonymous learners.
const config = { url: process.env.SUPABASE_URL ?? '', key: process.env.SUPABASE_ANON_KEY ?? '' };

async function learner() {
  const db = createDbClient(config);
  const { data, error } = await db.auth.signInAnonymously();
  if (error || !data.user) throw error ?? new Error('No user');
  return { db, userId: data.user.id };
}

const progress = (updatedAt: string): LearnerProgressInput => ({
  profile: { year: 1, examDate: null, dailyMinutes: 20, adult: true },
  completedLessons: ['brachial-plexus'],
  completedDrills: [],
  correctAnswers: [],
  mistakes: [],
  reviews: {},
  lastActiveAt: updatedAt,
  catchUpAcceptedOn: null,
  notes: { 'brachial-plexus': { text: 'C5 to T1', updatedAt } },
  updatedAt,
});

describe('progress repository (local database)', () => {
  it("saves and loads a learner's own progress", async () => {
    const { db, userId } = await learner();
    const repository = createProgressRepository(db);
    expect(await repository.load(userId)).toBeNull();
    expect(await repository.save(userId, progress('2026-09-27T09:00:00.000Z'))).toBe('saved');
    const saved = await repository.load(userId);
    expect(saved?.updatedAt).toBe('2026-09-27T09:00:00.000Z');
    expect(saved?.progress.completedLessons).toEqual(['brachial-plexus']);
  });

  it('keeps the newer copy when an older one arrives', async () => {
    const { db, userId } = await learner();
    const repository = createProgressRepository(db);
    await repository.save(userId, progress('2026-09-27T10:00:00.000Z'));
    expect(await repository.save(userId, progress('2026-09-27T09:00:00.000Z'))).toBe('stale');
  });

  it("never shows one learner's progress to another", async () => {
    const first = await learner();
    await createProgressRepository(first.db).save(
      first.userId,
      progress('2026-09-27T09:00:00.000Z'),
    );
    const second = await learner();
    expect(await createProgressRepository(second.db).load(first.userId)).toBeNull();
  });
});

describe('reports repository (local database)', () => {
  it('accepts a report from a visitor without an account', async () => {
    const visitor = createDbClient(config);
    await expect(
      createReportsRepository(visitor).create({
        topicSlug: 'brachial-plexus',
        contentVersion: '0.1.0',
        kind: 'unclear',
        note: 'Step 3 is hard to follow',
      }),
    ).resolves.toBeUndefined();
  });
});
