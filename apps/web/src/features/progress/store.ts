import {
  EMPTY_PROGRESS,
  type LearnerProgress,
  type ReviewRating,
  scheduleReview,
} from '@medlearn/core';
import { useSyncExternalStore } from 'react';

// ponytail: progress lives on this device for the prototype; M4 syncs it to the account.
const STORAGE_KEY = 'ml-progress-v1';
const listeners = new Set<() => void>();

let cachedRaw: string | null | undefined;
let cached: LearnerProgress = EMPTY_PROGRESS;

/** Returns the same object until storage changes, as useSyncExternalStore requires. */
function read(): LearnerProgress {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return cached;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    cached = raw
      ? { ...EMPTY_PROGRESS, ...(JSON.parse(raw) as Partial<LearnerProgress>) }
      : EMPTY_PROGRESS;
  } catch {
    cached = EMPTY_PROGRESS;
  }
  return cached;
}

function write(next: LearnerProgress): void {
  const raw = JSON.stringify(next);
  cachedRaw = raw;
  cached = next;
  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // Storage can be blocked (private browsing); progress still works for this visit.
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

const serverSnapshot = () => EMPTY_PROGRESS;

export function useProgress(): LearnerProgress {
  return useSyncExternalStore(subscribe, read, serverSnapshot);
}

export function completeLesson(topicSlug: string): void {
  const progress = read();
  if (progress.completedLessons.includes(topicSlug)) return;
  write({ ...progress, completedLessons: [...progress.completedLessons, topicSlug] });
}

export function recordAnswer(questionId: string, correct: boolean): void {
  const progress = read();
  if (!correct || progress.correctAnswers.includes(questionId)) return;
  write({ ...progress, correctAnswers: [...progress.correctAnswers, questionId] });
}

export function rateCard(cardId: string, rating: ReviewRating, now = new Date()): void {
  const progress = read();
  const next = scheduleReview(progress.reviews[cardId], rating, now);
  write({ ...progress, reviews: { ...progress.reviews, [cardId]: next } });
}

export function resetProgress(): void {
  write(EMPTY_PROGRESS);
}
