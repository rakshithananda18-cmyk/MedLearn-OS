// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
  acceptCatchUp,
  chooseBooks,
  completeDrill,
  completeLesson,
  rateCard,
  recordAnswer,
  resetProgress,
  saveNote,
  saveProfile,
  useProgress,
} from './store';

afterEach(() => {
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
