import { beforeAll, describe, expect, it, vi } from 'vitest';

import { GET as getProgress, PUT as putProgress } from './progress/route';
import { POST as report } from './reports/route';
import { POST as startSession } from './session/route';

// Route handlers against the local Supabase stack, with the browser's cookies kept in memory.
const jar = vi.hoisted(() => new Map<string, string>());
vi.mock('next/headers', () => ({
  cookies: async () => ({
    getAll: () => [...jar].map(([name, value]) => ({ name, value })),
    set: (name: string, value: string) => (value ? jar.set(name, value) : jar.delete(name)),
  }),
}));

const url = (path: string) => `http://localhost${path}`;
const json = (method: string, body: unknown) =>
  new Request(url('/api'), {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

const progress = (updatedAt: string, adult = true) => ({
  profile: { year: 1, examDate: null, dailyMinutes: 20, adult },
  completedLessons: ['brachial-plexus'],
  completedDrills: [],
  correctAnswers: [],
  mistakes: ['bp-q2'],
  reviews: {},
  lastActiveAt: updatedAt,
  catchUpAcceptedOn: null,
  updatedAt,
});

describe('progress sync API', () => {
  it('needs a session before progress can be saved', async () => {
    const response = await putProgress(
      json('PUT', { progress: progress('2026-09-27T09:00:00.000Z') }),
    );
    expect(response.status).toBe(401);
  });

  describe('with an anonymous session', () => {
    beforeAll(async () => {
      jar.clear();
      const first = await startSession(new Request(url('/api/session'), { method: 'POST' }));
      expect(first.status).toBe(201);
    });

    it('keeps an existing session instead of starting another', async () => {
      const again = await startSession(new Request(url('/api/session'), { method: 'POST' }));
      expect(await again.json()).toEqual({ data: { started: false } });
    });

    it('starts empty, then returns what was saved', async () => {
      expect(await (await getProgress(new Request(url('/api/progress')))).json()).toEqual({
        data: null,
      });
      const saved = await putProgress(
        json('PUT', { progress: progress('2026-09-27T09:00:00.000Z') }),
      );
      expect(saved.status).toBe(200);
      const body = await (await getProgress(new Request(url('/api/progress')))).json();
      expect(body.data.progress.mistakes).toEqual(['bp-q2']);
    });

    it('refuses an older copy and a student under 18', async () => {
      const older = await putProgress(
        json('PUT', { progress: progress('2026-09-27T08:00:00.000Z') }),
      );
      expect(older.status).toBe(409);
      const minor = await putProgress(
        json('PUT', { progress: progress('2026-09-27T10:00:00.000Z', false) }),
      );
      expect(minor.status).toBe(403);
    });

    it('checks the loaded version even when an incoming timestamp is newer', async () => {
      const current = await (await getProgress(new Request(url('/api/progress')))).json();
      const expectedUpdatedAt = current.data.updatedAt;
      const saved = await putProgress(
        json('PUT', {
          progress: progress('2026-09-28T09:00:00.000Z'),
          expectedUpdatedAt,
        }),
      );
      expect(saved.status).toBe(200);
      const stale = await putProgress(
        json('PUT', {
          progress: progress('2026-09-28T10:00:00.000Z'),
          expectedUpdatedAt,
        }),
      );
      expect(stale.status).toBe(409);
      const absent = await putProgress(
        json('PUT', {
          progress: progress('2026-09-28T11:00:00.000Z'),
          expectedUpdatedAt: null,
        }),
      );
      expect(absent.status).toBe(409);
      const invalid = await putProgress(
        json('PUT', {
          progress: progress('2026-09-28T11:00:00.000Z'),
          expectedUpdatedAt: 'yesterday',
        }),
      );
      expect(invalid.status).toBe(400);
      const after = await (await getProgress(new Request(url('/api/progress')))).json();
      expect(Date.parse(after.data.updatedAt)).toBe(Date.parse('2026-09-28T09:00:00.000Z'));
    });

    it('validates what it stores', async () => {
      const response = await putProgress(json('PUT', { progress: { completedLessons: 'all' } }));
      expect(response.status).toBe(400);
    });
  });
});

describe('POST /api/reports', () => {
  const body = { topicSlug: 'brachial-plexus', contentVersion: '0.1.0', kind: 'typo' };

  it('stores a report from anyone', async () => {
    jar.clear();
    const response = await report(json('POST', { ...body, note: 'Spelling in step 2' }));
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ data: { received: true } });
  });

  it('rejects unknown topics and kinds', async () => {
    expect((await report(json('POST', { ...body, topicSlug: 'spleen' }))).status).toBe(404);
    expect((await report(json('POST', { ...body, kind: 'rant' }))).status).toBe(400);
  });
});
