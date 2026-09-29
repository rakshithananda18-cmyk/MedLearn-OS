// @vitest-environment jsdom
import { EMPTY_PROGRESS } from '@medlearn/core';
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { parseLocalProgress } from './parseLocalProgress';
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
    { completedLessons: [42] },
    { reviews: { card: { due: 'not a date' } } },
    { notes: { topic: { text: 5, updatedAt: 'bad' } } },
    { profile: { adult: true } },
    { profile: { year: 1, dailyMinutes: 20, examDate: null, adult: true, books: [42] } },
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
    const progress = readProgress();
    expect(progress.completedLessons).toEqual(['old-lesson']);
    expect(progress.notes).toEqual({});
    expect(progress.activity).toEqual({});
    expect(progress.completedLessons).not.toBe(EMPTY_PROGRESS.completedLessons);
    expect(progress.completedDrills).not.toBe(EMPTY_PROGRESS.completedDrills);
    expect(progress.correctAnswers).not.toBe(EMPTY_PROGRESS.correctAnswers);
    expect(progress.mistakes).not.toBe(EMPTY_PROGRESS.mistakes);
    expect(progress.notes).not.toBe(EMPTY_PROGRESS.notes);
    expect(progress.activity).not.toBe(EMPTY_PROGRESS.activity);
  });

  it('does not share day activity lists with a supplied snapshot', () => {
    const day = { minutes: 10, lessons: ['anatomy'], drills: [], answered: 0, reviewed: 0 };
    const progress = parseLocalProgress({ activity: { '2026-09-28': day } });
    expect(progress?.activity['2026-09-28']?.lessons).toEqual(['anatomy']);
    expect(progress?.activity['2026-09-28']?.lessons).not.toBe(day.lessons);
    expect(progress?.activity['2026-09-28']?.drills).not.toBe(day.drills);
  });

  it('restores valid profile, review, note and activity fields from device storage', () => {
    rateCard('card-1', 'good', new Date('2026-09-28T08:00:00.000Z'));
    const review = readProgress().reviews['card-1'];
    localStorage.setItem(
      'ml-progress-v1',
      JSON.stringify({
        profile: { year: 2, examDate: '2026-12-01', dailyMinutes: 30, adult: true },
        reviews: { 'card-1': review },
        notes: { anatomy: { text: 'C5 to T1', updatedAt: '2026-09-28T08:00:00.000Z' } },
        activity: {
          '2026-09-28': {
            minutes: 10,
            lessons: ['anatomy'],
            drills: [],
            answered: 1,
            reviewed: 1,
          },
        },
      }),
    );
    expect(readProgress().profile?.year).toBe(2);
    expect(readProgress().reviews['card-1']).toEqual(review);
    expect(readProgress().notes.anatomy?.text).toBe('C5 to T1');
    expect(readProgress().activity['2026-09-28']?.minutes).toBe(10);
  });

  it('drops unknown storage fields before they can reach account sync', () => {
    localStorage.setItem(
      'ml-progress-v1',
      JSON.stringify({
        unknown: 'discard',
        profile: {
          year: 1,
          examDate: null,
          dailyMinutes: 20,
          adult: true,
          unknown: 'discard',
        },
        notes: {
          anatomy: { text: 'C5 to T1', updatedAt: '2026-09-28T08:00:00.000Z', unknown: 'discard' },
        },
      }),
    );
    const progress = readProgress();
    expect('unknown' in progress).toBe(false);
    expect(progress.profile).toEqual({ year: 1, examDate: null, dailyMinutes: 20, adult: true });
    expect(progress.notes.anatomy).toEqual({
      text: 'C5 to T1',
      updatedAt: '2026-09-28T08:00:00.000Z',
    });
  });

  it('filters prototype keys in stored dictionaries without discarding valid progress', () => {
    localStorage.setItem(
      'ml-progress-v1',
      '{"completedLessons":["old-lesson"],"reviews":{"__proto__":{"garbage":true}},"notes":{"__proto__":{"text":"unsafe","updatedAt":"2026-09-28T08:00:00.000Z"}}}',
    );
    expect(readProgress().completedLessons).toEqual(['old-lesson']);
    expect(readProgress().reviews).toEqual({});
    expect(readProgress().notes).toEqual({});
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
