import {
  dayKey,
  EMPTY_PROGRESS,
  type LearnerProgress,
  type ReviewRating,
  scheduleReview,
  type StudyProfile,
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

const addOnce = (list: string[], item: string) => (list.includes(item) ? list : [...list, item]);

/** A change made on this device; stamped so syncing keeps the newest copy. */
function commit(change: Partial<LearnerProgress>, now = new Date()): void {
  write({ ...read(), ...change, updatedAt: now.toISOString() });
}

/** Every study action also records when the student was last active (for the catch-up plan). */
function recordActivity(change: Partial<LearnerProgress>, now = new Date()): void {
  commit({ ...change, lastActiveAt: now.toISOString() }, now);
}

export function saveProfile(profile: StudyProfile): void {
  commit({ profile });
}

export function completeLesson(topicSlug: string): void {
  recordActivity({ completedLessons: addOnce(read().completedLessons, topicSlug) });
}

export function completeDrill(topicSlug: string): void {
  recordActivity({ completedDrills: addOnce(read().completedDrills, topicSlug) });
}

/** A wrong answer is remembered: the question comes back as a recall card. */
export function recordAnswer(questionId: string, correct: boolean): void {
  const { correctAnswers, mistakes } = read();
  recordActivity(
    correct
      ? { correctAnswers: addOnce(correctAnswers, questionId) }
      : { mistakes: addOnce(mistakes, questionId) },
  );
}

export function rateCard(cardId: string, rating: ReviewRating, now = new Date()): void {
  const { reviews } = read();
  const next = scheduleReview(reviews[cardId], rating, now);
  recordActivity({ reviews: { ...reviews, [cardId]: next } }, now);
}

export function acceptCatchUp(now = new Date()): void {
  commit({ catchUpAcceptedOn: dayKey(now) }, now);
}

export function resetProgress(): void {
  write(EMPTY_PROGRESS);
}

/** Replaces everything on this device as it is (facilitator screen, copies from the server). */
export function replaceProgress(progress: LearnerProgress): void {
  write(progress);
}

/** Current progress and change notifications, for syncing outside React. */
export { read as readProgress, subscribe as subscribeToProgress };
