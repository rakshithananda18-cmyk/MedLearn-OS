// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  acceptCatchUp,
  chooseBooks,
  completeDrill,
  completeLesson,
  rateCard,
  readProgress,
  recordAnswer,
  resetProgress,
  saveNote,
  saveProfile,
  useProgress,
} from './store';

afterEach(() => {
  vi.restoreAllMocks();
  act(() => resetProgress());
  localStorage.clear();
});

describe('progress store', () => {
  it('starts empty and updates subscribers when a lesson is completed', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.completedLessons).toEqual([]);
    act(() => completeLesson('brachial-plexus'));
    expect(result.current.completedLessons).toEqual(['brachial-plexus']);
  });

  it('records lessons and correct answers once, and ignores wrong answers', () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      completeLesson('brachial-plexus');
      completeLesson('brachial-plexus');
      recordAnswer('q1', false);
      recordAnswer('q2', true);
      recordAnswer('q2', true);
    });
    expect(result.current.completedLessons).toEqual(['brachial-plexus']);
    expect(result.current.correctAnswers).toEqual(['q2']);
  });

  it('schedules a rated card into the future', () => {
    const now = new Date('2026-09-26T09:00:00.000Z');
    const { result } = renderHook(() => useProgress());
    act(() => rateCard('card-1', 'good', now));
    const review = result.current.reviews['card-1'];
    expect(review && new Date(review.due).getTime()).toBeGreaterThan(now.getTime());
  });

  it('persists to this device and survives a reload', () => {
    act(() => completeLesson('brachial-plexus'));
    expect(JSON.parse(localStorage.getItem('ml-progress-v1') ?? '{}').completedLessons).toEqual([
      'brachial-plexus',
    ]);
  });

  it('falls back to empty progress when storage holds something unreadable', () => {
    localStorage.setItem('ml-progress-v1', '{not json');
    const { result } = renderHook(() => useProgress());
    expect(result.current.completedLessons).toEqual([]);
  });

  it('saves the books a student follows with their plan, and only once a plan exists', () => {
    const { result } = renderHook(() => useProgress());
    act(() => chooseBooks(['guyton-hall']));
    expect(result.current.profile).toBeNull();

    act(() => saveProfile({ year: 1, examDate: null, dailyMinutes: 20, adult: true }));
    act(() => chooseBooks(['guyton-hall', 'bd-chaurasia']));
    expect(result.current.profile?.books).toEqual(['guyton-hall', 'bd-chaurasia']);
    expect(result.current.profile?.dailyMinutes).toBe(20);
  });

  it('saves a note per topic and stamps the change for syncing', () => {
    const { result } = renderHook(() => useProgress());
    const now = new Date('2026-09-27T08:00:00.000Z');
    act(() => saveNote('brachial-plexus', 'Upper trunk: Erb', now));
    expect(result.current.notes['brachial-plexus']).toEqual({
      text: 'Upper trunk: Erb',
      updatedAt: now.toISOString(),
    });
    expect(result.current.updatedAt).toBe(now.toISOString());
  });

  it('saves the onboarding profile and the catch-up acceptance', () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      saveProfile({ year: 1, examDate: '2026-12-01', dailyMinutes: 30, adult: true });
      acceptCatchUp(new Date(2026, 8, 26, 10));
    });
    expect(result.current.profile).toEqual({
      year: 1,
      examDate: '2026-12-01',
      dailyMinutes: 30,
      adult: true,
    });
    expect(result.current.catchUpAcceptedOn).toBe('2026-09-26');
    expect(result.current.lastActiveAt).toBeNull();
  });

  it('remembers wrong answers so they come back as recall cards, and stamps changes', () => {
    const { result } = renderHook(() => useProgress());
    act(() => recordAnswer('q1', false));
    expect(result.current.mistakes).toEqual(['q1']);
    expect(result.current.correctAnswers).toEqual([]);
    expect(result.current.updatedAt).not.toBeNull();
  });

  it('records when the student last studied, including wrong answers and drills', () => {
    const { result } = renderHook(() => useProgress());
    act(() => recordAnswer('q1', false));
    expect(result.current.lastActiveAt).not.toBeNull();
    act(() => {
      completeDrill('brachial-plexus');
      completeDrill('brachial-plexus');
    });
    expect(result.current.completedDrills).toEqual(['brachial-plexus']);
  });
});

describe('storage recovery', () => {
  it.each([
    { completedLessons: null },
    { completedLessons: 'all' },
    { reviews: { card: { due: 'not a date' } } },
    { notes: { topic: { text: 5, updatedAt: 'bad' } } },
    { profile: { adult: true } },
    { activity: { '2026-09-28': { minutes: 'invalid' } } },
    [],
    'not an object',
  ])('rejects malformed persisted fields without breaking study actions: %j', (value) => {
    localStorage.setItem('ml-progress-v1', JSON.stringify(value));
    expect(() => completeLesson('safe-lesson')).not.toThrow();
    expect(readProgress().completedLessons).toEqual(['safe-lesson']);
  });

  it('preserves valid legacy progress with missing newer fields', () => {
    localStorage.setItem('ml-progress-v1', JSON.stringify({ completedLessons: ['old-lesson'] }));
    expect(readProgress().completedLessons).toEqual(['old-lesson']);
    expect(readProgress().notes).toEqual({});
    expect(readProgress().activity).toEqual({});
  });

  it('keeps work in memory when writes fail but storage reads still succeed', () => {
    completeLesson('saved-lesson');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Full', 'QuotaExceededError');
    });
    completeLesson('memory-lesson');
    saveNote('topic', 'Still here');
    expect(readProgress().completedLessons).toEqual(['saved-lesson', 'memory-lesson']);
    expect(readProgress().notes.topic?.text).toBe('Still here');
    expect(JSON.parse(localStorage.getItem('ml-progress-v1') ?? '{}').completedLessons).toEqual([
      'saved-lesson',
    ]);
  });

  it('keeps learning usable when access to storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Blocked');
    });
    completeLesson('private-lesson');
    expect(readProgress().completedLessons).toEqual(['private-lesson']);
  });
});

describe('progress versions', () => {
  it('gives consecutive edits distinct versions even in the same millisecond', () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2030-01-01T00:00:00.000Z'));
      completeLesson('first');
      const first = readProgress().updatedAt;
      completeLesson('second');
      expect(Date.parse(readProgress().updatedAt ?? '')).toBeGreaterThan(Date.parse(first ?? ''));
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps a note edit newer than the previous note if the clock moves backwards', () => {
    saveNote('topic', 'original', new Date('2030-01-01T00:00:00.000Z'));
    saveNote('topic', 'edited', new Date('2029-01-01T00:00:00.000Z'));
    expect(readProgress().notes.topic).toEqual({
      text: 'edited',
      updatedAt: '2030-01-01T00:00:00.001Z',
    });
  });
});
