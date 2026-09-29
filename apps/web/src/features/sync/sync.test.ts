// @vitest-environment jsdom
import { EMPTY_PROGRESS, type LearnerProgress } from '@medlearn/core';
import type { SavedProgress } from '@medlearn/schemas';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  completeLesson,
  readProgress,
  replaceProgress,
  resetProgress,
  saveNote,
} from '@/features/progress/store';

import {
  adoptAccountProgress,
  flushProgressSync,
  newerCopy,
  pauseProgressSync,
  restoreProgress,
  startProgressSync,
} from './sync';

beforeAll(() => import('@medlearn/schemas'));

const EARLY = '2026-09-27T09:00:00.000Z';
const LATE = '2030-01-01T00:00:00.000Z';
const adult = { year: 1 as const, examDate: null, dailyMinutes: 20, adult: true };
const copy = (changes: Partial<LearnerProgress> = {}): LearnerProgress => ({
  ...EMPTY_PROGRESS,
  profile: adult,
  updatedAt: EARLY,
  ...changes,
});
const stored = (progress: LearnerProgress): SavedProgress => ({
  progress,
  updatedAt: progress.updatedAt ?? EARLY,
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe('newerCopy', () => {
  it('selects the most recent profile and restores a fresh device', () => {
    expect(newerCopy(copy({ updatedAt: LATE }), copy())).toBe('local');
    expect(newerCopy(copy(), copy({ updatedAt: LATE }))).toBe('server');
    expect(newerCopy(copy(), copy())).toBe('same');
    expect(newerCopy(EMPTY_PROGRESS, copy())).toBe('server');
    expect(newerCopy(copy(), null)).toBe('local');
    expect(newerCopy(EMPTY_PROGRESS, null)).toBe('same');
  });
});

describe('progress sync', () => {
  let saved: SavedProgress | null;
  let stop: (() => void) | undefined;
  const fetchMock = vi.fn(async (url: string, init?: RequestInit): Promise<Response> => {
    if (url === '/api/session') return Response.json({ data: { started: true } });
    if (init?.method !== 'PUT') return Response.json({ data: saved });
    const body = JSON.parse(String(init.body)) as {
      progress: LearnerProgress;
      expectedUpdatedAt: string | null;
    };
    if (body.expectedUpdatedAt !== (saved?.updatedAt ?? null)) {
      return new Response(null, { status: 409 });
    }
    saved = stored(body.progress);
    return Response.json({ data: { saved: true } });
  });

  const defaultFetch = fetchMock.getMockImplementation();
  if (!defaultFetch) throw new Error('Missing fetch implementation');

  beforeEach(() => {
    fetchMock.mockReset().mockImplementation(defaultFetch);
    vi.useFakeTimers();
    resetProgress();
    replaceProgress(copy());
    saved = stored(copy({ completedLessons: ['brachial-plexus'], updatedAt: LATE }));
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => {
    stop?.();
    stop = undefined;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    fetchMock.mockClear();
    resetProgress();
    vi.useRealTimers();
  });

  const puts = () => fetchMock.mock.calls.filter(([, init]) => init?.method === 'PUT');

  it('restores saved work, uploads later learning, and does not churn identical snapshots', async () => {
    stop = startProgressSync();
    await flushProgressSync();
    expect(readProgress().completedLessons).toEqual(['brachial-plexus']);
    expect(puts()).toHaveLength(0);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/session',
      expect.objectContaining({ method: 'POST' }),
    );

    completeLesson('oxygen-haemoglobin-curve');
    await vi.advanceTimersByTimeAsync(1000);
    await flushProgressSync();
    expect(saved?.progress.completedLessons.slice().sort()).toEqual([
      'brachial-plexus',
      'oxygen-haemoglobin-curve',
    ]);
    expect(Date.parse(saved?.updatedAt ?? '')).toBeGreaterThan(Date.parse(LATE));
    const count = puts().length;
    globalThis.dispatchEvent(new Event('online'));
    await flushProgressSync();
    expect(puts()).toHaveLength(count);
  });

  it('joins distinct offline work, keeps newer notes, and preserves a cleared note', async () => {
    const later = '2030-01-02T00:00:00.000Z';
    replaceProgress(
      copy({
        completedLessons: ['oxygen-haemoglobin-curve'],
        notes: { topic: { text: '', updatedAt: later } },
        updatedAt: later,
      }),
    );
    saved = stored(
      copy({
        completedLessons: ['brachial-plexus'],
        notes: { topic: { text: 'old note', updatedAt: LATE } },
        updatedAt: LATE,
      }),
    );
    stop = startProgressSync();
    await flushProgressSync();
    expect(saved?.progress.completedLessons.slice().sort()).toEqual([
      'brachial-plexus',
      'oxygen-haemoglobin-curve',
    ]);
    expect(saved?.progress.notes.topic?.text).toBe('');
    expect(readProgress()).toEqual(saved?.progress);
  });

  it('preserves activity from both devices and keeps reconnects idempotent', async () => {
    const day = { minutes: 15, lessons: ['local'], drills: [], answered: 2, reviewed: 1 };
    replaceProgress(
      copy({
        activity: { '2026-09-28': day },
      }),
    );
    saved = stored(
      copy({
        activity: {
          '2026-09-27': { ...day, lessons: ['earlier'] },
          '2026-09-28': { ...day, lessons: ['remote'], drills: ['remote'], reviewed: 3 },
        },
        updatedAt: LATE,
      }),
    );
    stop = startProgressSync();
    await flushProgressSync();
    expect(saved?.progress.activity['2026-09-27']?.lessons).toEqual(['earlier']);
    expect(saved?.progress.activity['2026-09-28']).toEqual({
      minutes: 15,
      lessons: ['local', 'remote'],
      drills: ['remote'],
      answered: 2,
      reviewed: 3,
    });
    const writes = puts().length;
    globalThis.dispatchEvent(new Event('online'));
    await flushProgressSync();
    expect(puts()).toHaveLength(writes);
  });

  it('does not write a new snapshot just because activity lists have a different order', async () => {
    const day = { minutes: 15, lessons: ['first', 'second'], drills: [], answered: 2, reviewed: 1 };
    replaceProgress(
      copy({
        activity: { '2026-09-28': { ...day, lessons: ['second', 'first'] } },
      }),
    );
    saved = stored(copy({ activity: { '2026-09-28': day }, updatedAt: LATE }));
    stop = startProgressSync();
    await flushProgressSync();
    expect(puts()).toHaveLength(0);
  });

  it('treats all ID collections as unchanged when devices store them in different orders', async () => {
    const day = {
      minutes: 15,
      lessons: ['lesson-10', 'lesson-2'],
      drills: ['drill-10', 'drill-2'],
      answered: 2,
      reviewed: 1,
    };
    const remote = copy({
      completedLessons: ['lesson-10', 'lesson-2'],
      completedDrills: ['drill-10', 'drill-2'],
      correctAnswers: ['answer-10', 'answer-2'],
      mistakes: ['mistake-10', 'mistake-2'],
      activity: { '2026-09-28': day },
    });
    replaceProgress(
      copy({
        completedLessons: [...remote.completedLessons].reverse(),
        completedDrills: [...remote.completedDrills].reverse(),
        correctAnswers: [...remote.correctAnswers].reverse(),
        mistakes: [...remote.mistakes].reverse(),
        activity: {
          '2026-09-28': {
            ...day,
            lessons: [...day.lessons].reverse(),
            drills: [...day.drills].reverse(),
          },
        },
        updatedAt: LATE,
      }),
    );
    saved = stored(remote);
    stop = startProgressSync();
    await flushProgressSync();
    expect(puts()).toHaveLength(0);
    expect(readProgress()).toEqual(remote);
  });

  it('merges a competing save before retrying with the new database version', async () => {
    replaceProgress(copy({ completedLessons: ['local-lesson'] }));
    const normalFetch = defaultFetch;
    let conflicted = false;
    fetchMock.mockImplementation(async (url, init) => {
      if (init?.method === 'PUT' && !conflicted) {
        conflicted = true;
        saved = stored(
          copy({ completedLessons: ['remote-lesson'], updatedAt: '2031-01-01T00:00:00.000Z' }),
        );
        return new Response(null, { status: 409 });
      }
      return normalFetch(url, init);
    });
    stop = startProgressSync();
    await flushProgressSync();
    expect(saved?.progress.completedLessons.sort()).toEqual([
      'brachial-plexus',
      'local-lesson',
      'remote-lesson',
    ]);
    expect(puts()).toHaveLength(2);
    expect(JSON.parse(String(puts()[1]?.[1]?.body)).expectedUpdatedAt).toBe(
      '2031-01-01T00:00:00.000Z',
    );
    fetchMock.mockImplementation(normalFetch);
  });

  it('sends the exact database version token, including fractional precision and offset', async () => {
    saved = {
      progress: copy({ completedLessons: ['remote-lesson'] }),
      updatedAt: '2026-09-27T09:00:00.123456+00:00',
    };
    replaceProgress(copy({ completedLessons: ['local-lesson'] }));
    stop = startProgressSync();
    await flushProgressSync();
    expect(JSON.parse(String(puts()[0]?.[1]?.body)).expectedUpdatedAt).toBe(
      '2026-09-27T09:00:00.123456+00:00',
    );
    expect(saved?.progress.completedLessons.slice().sort()).toEqual([
      'local-lesson',
      'remote-lesson',
    ]);
  });

  it('bounds conflict retries and leaves unsaved work on the phone', async () => {
    replaceProgress(copy({ completedLessons: ['offline-lesson'] }));
    const normalFetch = defaultFetch;
    fetchMock.mockImplementation((url, init) =>
      init?.method === 'PUT'
        ? Promise.resolve(new Response(null, { status: 409 }))
        : normalFetch(url, init),
    );
    stop = startProgressSync();
    await expect(flushProgressSync()).rejects.toThrow('another device');
    expect(puts()).toHaveLength(3);
    await vi.advanceTimersByTimeAsync(30_000);
    expect(puts()).toHaveLength(3);
    expect(readProgress().completedLessons).toContain('offline-lesson');
    fetchMock.mockImplementation(normalFetch);
  });

  it('serializes uploads and flushes changes made during an earlier upload', async () => {
    replaceProgress(copy({ completedLessons: ['first'] }));
    const normalFetch = defaultFetch;
    const pending = deferred<Response>();
    let first = true;
    fetchMock.mockImplementation(async (url, init) => {
      const response = await normalFetch(url, init);
      if (init?.method === 'PUT' && first) {
        first = false;
        return pending.promise;
      }
      return response;
    });
    stop = startProgressSync();
    await vi.waitFor(() => expect(puts()).toHaveLength(1));
    completeLesson('second');
    const flushed = flushProgressSync();
    await vi.advanceTimersByTimeAsync(2000);
    expect(puts()).toHaveLength(1);
    pending.resolve(Response.json({ data: { saved: true } }));
    await flushed;
    expect(saved?.progress.completedLessons).toContain('second');
    expect(puts()).toHaveLength(2);
    fetchMock.mockImplementation(normalFetch);
  });

  it('retries offline work after reconnecting', async () => {
    stop = startProgressSync();
    await flushProgressSync();
    const normalFetch = defaultFetch;
    fetchMock.mockImplementationOnce(() => Promise.reject(new TypeError('Failed to fetch')));
    completeLesson('offline-lesson');
    await vi.advanceTimersByTimeAsync(1000);
    expect(readProgress().completedLessons).toContain('offline-lesson');
    fetchMock.mockImplementation(normalFetch);
    globalThis.dispatchEvent(new Event('online'));
    await flushProgressSync();
    expect(saved?.progress.completedLessons).toContain('offline-lesson');
  });

  it('ignores an old pull after stopping, even if the transport ignores abort', async () => {
    const pending = deferred<Response>();
    const normalFetch = defaultFetch;
    fetchMock.mockImplementation((url, init) =>
      url === '/api/progress' ? pending.promise : normalFetch(url, init),
    );
    stop = startProgressSync();
    await vi.waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith('/api/progress', expect.anything()),
    );
    stop();
    resetProgress();
    pending.resolve(Response.json({ data: saved }));
    await vi.advanceTimersByTimeAsync(0);
    expect(readProgress()).toEqual(EMPTY_PROGRESS);
    expect(puts()).toHaveLength(0);
    fetchMock.mockImplementation(normalFetch);
  });

  it('does not overwrite a new local setup when a restore arrives late', async () => {
    resetProgress();
    const pending = deferred<Response>();
    fetchMock.mockReturnValueOnce(pending.promise);
    const restoring = restoreProgress();
    replaceProgress(copy({ profile: { ...adult, adult: false } }));
    pending.resolve(Response.json({ data: saved }));
    await restoring;
    expect(readProgress().profile?.adult).toBe(false);
  });

  it('does not restore progress after clearing the device', async () => {
    resetProgress();
    const pending = deferred<Response>();
    fetchMock.mockReturnValueOnce(pending.promise);
    const restoring = restoreProgress();
    resetProgress();
    pending.resolve(Response.json({ data: saved }));
    await restoring;
    expect(readProgress()).toEqual(EMPTY_PROGRESS);
  });

  it('never uploads when starting a session fails', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 401 }));
    stop = startProgressSync();
    await expect(flushProgressSync()).rejects.toThrow('Starting session failed');
    expect(puts()).toHaveLength(0);
  });

  it('does not overwrite invalid server progress', async () => {
    const normalFetch = defaultFetch;
    fetchMock.mockImplementation((url, init) =>
      url === '/api/progress'
        ? Promise.resolve(
            Response.json({ data: { progress: { completedLessons: null }, updatedAt: LATE } }),
          )
        : normalFetch(url, init),
    );
    stop = startProgressSync();
    await expect(flushProgressSync()).rejects.toThrow();
    expect(puts()).toHaveLength(0);
    fetchMock.mockImplementation(normalFetch);
  });

  it('keeps account transitions paused until all callers resume', async () => {
    const resumeFirst = pauseProgressSync();
    const resumeSecond = pauseProgressSync();
    stop = startProgressSync();
    expect(fetchMock).not.toHaveBeenCalled();
    resumeFirst();
    await vi.advanceTimersByTimeAsync(0);
    expect(fetchMock).not.toHaveBeenCalled();
    resumeSecond();
    await flushProgressSync();
    expect(readProgress().completedLessons).toEqual(['brachial-plexus']);
  });

  it('joins the phone and account after sign-in', async () => {
    completeLesson('offline-lesson');
    saveNote('my-note', 'Remember this');
    await adoptAccountProgress();
    expect(readProgress().completedLessons.sort()).toEqual(['brachial-plexus', 'offline-lesson']);
    expect(readProgress().notes['my-note']?.text).toBe('Remember this');
    expect(readProgress().profile?.adult).toBe(true);
  });

  it('restores a lost device copy, and leaves visitors without a session alone', async () => {
    resetProgress();
    await restoreProgress();
    expect(readProgress().completedLessons).toEqual(['brachial-plexus']);
    resetProgress();
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 401 }));
    await restoreProgress();
    expect(readProgress()).toEqual(EMPTY_PROGRESS);
  });
});
