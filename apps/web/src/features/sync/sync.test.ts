// @vitest-environment jsdom
import { EMPTY_PROGRESS, type LearnerProgress } from '@medlearn/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { completeLesson, readProgress, resetProgress } from '@/features/progress/store';

import { adoptAccountProgress, newerCopy, restoreProgress, startProgressSync } from './sync';

const copy = (updatedAt: string | null): LearnerProgress => ({ ...EMPTY_PROGRESS, updatedAt });

describe('newerCopy', () => {
  it('keeps the newer copy and lets a fresh device take the server copy', () => {
    const early = '2026-09-27T09:00:00.000Z';
    const late = '2026-09-27T10:00:00.000Z';
    expect(newerCopy(copy(late), copy(early))).toBe('local');
    expect(newerCopy(copy(early), copy(late))).toBe('server');
    expect(newerCopy(copy(early), copy(early))).toBe('same');
    expect(newerCopy(copy(null), copy(early))).toBe('server');
    expect(newerCopy(copy(early), null)).toBe('local');
    expect(newerCopy(copy(null), null)).toBe('same');
  });
});

describe('startProgressSync', () => {
  const serverCopy = {
    ...EMPTY_PROGRESS,
    profile: { year: 1 as const, examDate: null, dailyMinutes: 20, adult: true },
    completedLessons: ['brachial-plexus'],
    updatedAt: '2030-01-01T00:00:00.000Z',
  };
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    if (url === '/api/progress' && !init) {
      return Response.json({ data: { progress: serverCopy, updatedAt: serverCopy.updatedAt } });
    }
    return Response.json({ data: {} });
  });

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    fetchMock.mockClear();
    resetProgress();
  });

  it('starts a session, takes the newer server copy, then saves later changes', async () => {
    const stop = startProgressSync();
    await vi.waitFor(() => expect(readProgress().completedLessons).toEqual(['brachial-plexus']));
    expect(fetchMock).toHaveBeenCalledWith('/api/session', { method: 'POST' });

    completeLesson('oxygen-haemoglobin-curve');
    await vi.advanceTimersByTimeAsync(1000);
    const put = fetchMock.mock.calls.find(([, init]) => init?.method === 'PUT');
    expect(JSON.parse(String(put?.[1]?.body)).progress.completedLessons).toEqual([
      'brachial-plexus',
      'oxygen-haemoglobin-curve',
    ]);
    stop();
  });

  it('sends what was learned offline once the phone is back online', async () => {
    const stop = startProgressSync();
    await vi.waitFor(() => expect(readProgress().completedLessons).toEqual(['brachial-plexus']));
    fetchMock.mockClear();
    const puts = () => fetchMock.mock.calls.filter(([, init]) => init?.method === 'PUT');

    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    completeLesson('oxygen-haemoglobin-curve');
    await vi.advanceTimersByTimeAsync(1000);
    expect(puts()).toHaveLength(1);

    globalThis.dispatchEvent(new Event('online'));
    await vi.waitFor(() => expect(puts()).toHaveLength(2));
    // Nothing new since that save: coming online again sends nothing.
    await vi.advanceTimersByTimeAsync(0);
    globalThis.dispatchEvent(new Event('online'));
    await vi.advanceTimersByTimeAsync(0);
    expect(puts()).toHaveLength(2);
    stop();
  });

  it('restores the server copy on a phone that lost its local progress', async () => {
    await restoreProgress();
    expect(readProgress().completedLessons).toEqual(['brachial-plexus']);
  });

  it('leaves the phone alone when there is no session', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(null, { status: 401 })),
    );
    await restoreProgress();
    expect(readProgress().completedLessons).toEqual([]);
  });

  it('joins this phone with the account after signing in, as an adult profile', async () => {
    completeLesson('oxygen-haemoglobin-curve');
    await adoptAccountProgress();
    expect(readProgress().completedLessons.sort()).toEqual([
      'brachial-plexus',
      'oxygen-haemoglobin-curve',
    ]);
    expect(readProgress().profile?.adult).toBe(true);
  });
});
