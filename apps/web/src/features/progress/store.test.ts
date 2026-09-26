// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { completeLesson, rateCard, recordAnswer, resetProgress, useProgress } from './store';

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
});
