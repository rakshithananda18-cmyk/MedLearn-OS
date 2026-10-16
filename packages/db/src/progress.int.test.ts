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
  activity: {
    '2026-09-28': {
      minutes: 15,
      lessons: ['brachial-plexus'],
      drills: [],
      answered: 2,
      reviewed: 0,
    },
  },
  goals: [],
  removedGoals: [],
  revisits: {},
  completedRevisits: [],
  updatedAt,
});

describe('progress repository (local database)', () => {
  it("saves and loads a learner's own progress", async () => {
    const { db, userId } = await learner();
    const repository = createProgressRepository(db);
    expect(await repository.load(userId)).toBeNull();
    expect(await repository.save(userId, progress('2026-09-27T09:00:00.000Z'))).toBe('saved');
    const saved = await repository.load(userId);
    expect(Date.parse(saved?.updatedAt ?? '')).toBe(Date.parse('2026-09-27T09:00:00.000Z'));
    expect(saved?.progress.completedLessons).toEqual(['brachial-plexus']);
  });

  it('keeps the newer copy when an older one arrives', async () => {
    const { db, userId } = await learner();
    const repository = createProgressRepository(db);
    await repository.save(userId, progress('2026-09-27T10:00:00.000Z'));
    expect(await repository.save(userId, progress('2026-09-27T09:00:00.000Z'))).toBe('stale');
  });

  it('round-trips the exact database version when a client saved microseconds', async () => {
    const { db, userId } = await learner();
    const repository = createProgressRepository(db);
    await repository.save(userId, progress('2026-09-28T08:00:00.123456Z'), null);
    const current = await repository.load(userId);
    expect(current?.updatedAt).toContain('.123456');
    expect(
      await repository.save(userId, progress('2026-09-28T08:00:00.124Z'), current?.updatedAt),
    ).toBe('saved');
  });

  it('allows only one concurrent writer for the same loaded version', async () => {
    const { db, userId } = await learner();
    const repository = createProgressRepository(db);
    const base = '2026-09-28T09:00:00.000Z';
    expect(await repository.save(userId, progress(base), null)).toBe('saved');
    const copies = [
      { ...progress('2026-09-28T09:01:00.000Z'), completedLessons: ['oxygen-curve'] },
      { ...progress('2026-09-28T09:02:00.000Z'), completedLessons: ['brachial-plexus'] },
    ];
    const results = await Promise.all(copies.map((copy) => repository.save(userId, copy, base)));
    expect(results.toSorted()).toEqual(['saved', 'stale']);
    const saved = await repository.load(userId);
    expect(saved?.progress).toEqual(copies[results.indexOf('saved')]);
  });

  it('treats an absent base as insert-only and a missing existing base as stale', async () => {
    const { db, userId } = await learner();
    const repository = createProgressRepository(db);
    const base = '2026-09-28T10:00:00.000Z';
    expect(await repository.save(userId, progress(base), base)).toBe('stale');
    const results = await Promise.all([
      repository.save(userId, progress(base), null),
      repository.save(userId, progress('2026-09-28T10:01:00.000Z'), null),
    ]);
    expect(results.toSorted()).toEqual(['saved', 'stale']);
  });

  it('rejects older and different same-version payloads but permits identical retries', async () => {
    const { db, userId } = await learner();
    const repository = createProgressRepository(db);
    const base = '2026-09-28T11:00:00.000Z';
    const original = progress(base);
    expect(await repository.save(userId, original, null)).toBe('saved');
    expect(await repository.save(userId, original, base)).toBe('saved');
    expect(await repository.save(userId, original)).toBe('saved');
    const different = { ...original, completedLessons: ['oxygen-curve'] };
    expect(await repository.save(userId, different, base)).toBe('stale');
    expect(await repository.save(userId, different)).toBe('stale');
    expect(await repository.save(userId, progress('2026-09-28T10:00:00.000Z'), base)).toBe('stale');
    expect((await repository.load(userId))?.progress).toEqual(original);
  });

  it('cannot use the save function to overwrite another learner', async () => {
    const first = await learner();
    const original = progress('2026-09-28T12:00:00.000Z');
    await createProgressRepository(first.db).save(first.userId, original, null);
    const second = await learner();
    const repository = createProgressRepository(second.db);
    expect(
      await repository.save(first.userId, progress('2026-09-28T13:00:00.000Z'), original.updatedAt),
    ).toBe('stale');
    await expect(
      repository.save(first.userId, progress('2026-09-28T13:00:00.000Z'), null),
    ).rejects.toThrow('Failed to save progress');
    expect((await createProgressRepository(first.db).load(first.userId))?.progress).toEqual(
      original,
    );
  });

  it('preserves removals when an old client saves a newer snapshot without marker fields', async () => {
    const { db, userId } = await learner();
    const repository = createProgressRepository(db);
    const initial = {
      ...progress('2026-10-16T08:00:00.000Z'),
      removedGoals: ['goal-old'],
      completedRevisits: ['axilla'],
    };
    expect(await repository.save(userId, initial, null)).toBe('saved');
    const legacy: Partial<LearnerProgressInput> = { ...progress('2026-10-16T09:00:00.000Z') };
    delete legacy.removedGoals;
    delete legacy.completedRevisits;
    const oldClient = {
      ...legacy,
      goals: [
        {
          id: 'goal-old',
          kind: 'test',
          title: 'Removed plan',
          topics: ['axilla'],
          date: '2026-10-20',
          done: [],
          createdAt: '2026-10-01T08:00:00.000Z',
        },
        {
          id: 'goal-other',
          kind: 'test',
          title: 'Keep plan',
          topics: ['plexus'],
          date: '2026-10-20',
          done: [],
          createdAt: '2026-10-01T08:00:00.000Z',
        },
      ],
      revisits: { axilla: { step: 2, due: '2026-10-16' }, plexus: { step: 0, due: '2026-10-17' } },
      correctAnswers: ['offline-answer'],
    };
    // Calling the RPC without parsing models an installed client that does not know the fields.
    for (const p_check_version of [false, true]) {
      const { data, error } = await db.rpc('save_learner_progress', {
        p_user_id: userId,
        p_progress: oldClient,
        p_updated_at: oldClient.updatedAt ?? '',
        p_check_version,
        p_expected_updated_at: (await repository.load(userId))?.updatedAt,
      });
      expect(error).toBeNull();
      expect(data).toBe(true);
    }
    const saved = (await repository.load(userId))?.progress;
    expect(saved?.removedGoals).toEqual(['goal-old']);
    expect(saved?.completedRevisits).toEqual(['axilla']);
    expect(saved?.goals.map((goal) => goal.id)).toEqual(['goal-other']);
    expect(saved?.revisits).toEqual({ plexus: { step: 0, due: '2026-10-17' } });
    expect(saved?.correctAnswers).toEqual(['offline-answer']);
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

  it('loads and preserves released terminal revisit rows when an old client saves again', async () => {
    const { db, userId } = await learner();
    const repository = createProgressRepository(db);
    const legacy = {
      ...progress('2026-10-17T08:00:00.000Z'),
      removedGoals: ['removed-main-goal'],
      revisits: { axilla: { step: 3, due: '9999-12-31' } },
    };
    expect(
      (
        await db
          .from('learner_progress')
          .insert({ user_id: userId, progress: legacy, updated_at: legacy.updatedAt ?? '' })
      ).error,
    ).toBeNull();
    const loaded = (await repository.load(userId))?.progress;
    expect(loaded?.completedRevisits).toEqual(['axilla']);
    expect(loaded?.revisits).toEqual({});
    const newer = {
      ...progress('2026-10-17T09:00:00.000Z'),
      revisits: { axilla: { step: 0, due: '2026-10-18' } },
    };
    expect(
      (
        await db.rpc('save_learner_progress', {
          p_user_id: userId,
          p_progress: newer,
          p_updated_at: newer.updatedAt ?? '',
        })
      ).error,
    ).toBeNull();
    expect((await repository.load(userId))?.progress).toMatchObject({
      removedGoals: ['removed-main-goal'],
      completedRevisits: ['axilla'],
      revisits: {},
    });
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
