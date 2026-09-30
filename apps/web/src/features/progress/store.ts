import {
  type ActivityEvent,
  dayKey,
  EMPTY_PROGRESS,
  firstRevisit,
  type LearnerProgress,
  logActivity,
  nextRevisit,
  type ReviewRating,
  scheduleReview,
  type StudyGoal,
  type StudyProfile,
} from '@medlearn/core';
import { useSyncExternalStore } from 'react';

import { parseLocalProgress } from './parseLocalProgress';

const STORAGE_KEY = 'ml-progress-v1';
const listeners = new Set<() => void>();

let cachedRaw: string | null | undefined;
let cached: LearnerProgress = EMPTY_PROGRESS;
let memoryOnly = false;
let generation = 0;

/** Returns the same object until storage changes, as useSyncExternalStore requires. */
function read(): LearnerProgress {
  if (memoryOnly) return cached;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return cached;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const value: unknown = raw ? JSON.parse(raw) : null;
    cached = parseLocalProgress(value) ?? EMPTY_PROGRESS;
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
    memoryOnly = false;
  } catch {
    // Storage can be blocked or full; keep the in-memory copy for this visit.
    memoryOnly = true;
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
  const previous = read();
  const updatedAt = new Date(
    Math.max(now.getTime(), (Date.parse(previous.updatedAt ?? '') || 0) + 1),
  ).toISOString();
  write({ ...previous, ...change, updatedAt });
}

/**
 * Every study action also records when the student was last active (for the catch-up plan) and
 * what they did today (for streaks, the daily ring and the plan's ticks).
 */
function recordActivity(
  change: Partial<LearnerProgress>,
  event: ActivityEvent,
  now = new Date(),
): void {
  const activity = logActivity(read().activity ?? {}, event, now);
  commit({ ...change, activity, lastActiveAt: now.toISOString() }, now);
}

export function saveProfile(profile: StudyProfile): void {
  commit({ profile });
}

/**
 * Marks a lesson done; `minutes` is its length, counted towards today's study time. The first
 * time, the topic's spaced revisits start: the first is due tomorrow.
 */
export function completeLesson(topicSlug: string, minutes = 0, now = new Date()): void {
  const { completedLessons, revisits } = read();
  recordActivity(
    {
      completedLessons: addOnce(completedLessons, topicSlug),
      revisits:
        topicSlug in revisits ? revisits : { ...revisits, [topicSlug]: firstRevisit(dayKey(now)) },
    },
    { kind: 'lesson', topicSlug, minutes },
    now,
  );
}

/**
 * Records a spaced revisit: `share` is the part answered right. Enough right moves the topic on to
 * its next, longer gap (the last one done ends them); too few brings it back tomorrow.
 */
export function completeRevisit(topicSlug: string, share: number, now = new Date()): void {
  const { revisits } = read();
  const current = revisits[topicSlug];
  if (!current) return;
  const next = nextRevisit(current, share, dayKey(now));
  const rest = Object.fromEntries(Object.entries(revisits).filter(([slug]) => slug !== topicSlug));
  commit({ revisits: next ? { ...rest, [topicSlug]: next } : rest }, now);
}

export function completeDrill(topicSlug: string, minutes = 0): void {
  recordActivity(
    { completedDrills: addOnce(read().completedDrills, topicSlug) },
    { kind: 'drill', topicSlug, minutes },
  );
}

/** A wrong answer is remembered: the question comes back as a recall card. */
export function recordAnswer(questionId: string, correct: boolean): void {
  const { correctAnswers, mistakes } = read();
  recordActivity(
    correct
      ? { correctAnswers: addOnce(correctAnswers, questionId) }
      : { mistakes: addOnce(mistakes, questionId) },
    { kind: 'answer' },
  );
}

export function rateCard(cardId: string, rating: ReviewRating, now = new Date()): void {
  const { reviews } = read();
  const next = scheduleReview(reviews[cardId], rating, now);
  recordActivity({ reviews: { ...reviews, [cardId]: next } }, { kind: 'review' }, now);
}

/** The standard books this student follows; needs the study plan (profile) to exist. */
export function chooseBooks(bookIds: string[]): void {
  const { profile } = read();
  if (profile) commit({ profile: { ...profile, books: bookIds } });
}

/** Saves the student's note on a topic (an empty note clears it). */
export function saveNote(topicSlug: string, text: string, now = new Date()): void {
  const notes = read().notes;
  const updatedAt = new Date(
    Math.max(now.getTime(), (Date.parse(notes[topicSlug]?.updatedAt ?? '') || 0) + 1),
  ).toISOString();
  commit({ notes: { ...notes, [topicSlug]: { text, updatedAt } } }, now);
}

/** Plans a class test or a revisit: Today spreads its topics over the days until its date. */
export function addGoal(
  goal: Pick<StudyGoal, 'kind' | 'title' | 'topics' | 'date'>,
  now = new Date(),
): StudyGoal {
  const added: StudyGoal = {
    ...goal,
    id: `goal-${now.getTime().toString(36)}`,
    done: [],
    createdAt: now.toISOString(),
  };
  commit({ goals: [...read().goals, added] }, now);
  return added;
}

export function removeGoal(goalId: string): void {
  commit({ goals: read().goals.filter((goal) => goal.id !== goalId) });
}

/** Counts a topic as gone over for a goal, after a practice session on it. */
export function markGoalTopic(goalId: string, topicSlug: string): void {
  commit({
    goals: read().goals.map((goal) =>
      goal.id === goalId ? { ...goal, done: addOnce(goal.done, topicSlug) } : goal,
    ),
  });
}

export function acceptCatchUp(now = new Date()): void {
  commit({ catchUpAcceptedOn: dayKey(now) }, now);
}

export function resetProgress(): void {
  generation += 1;
  write(EMPTY_PROGRESS);
}

/** Pending requests must not restore progress after this device has been cleared. */
export const progressGeneration = () => generation;

/** Replaces everything on this device as it is (facilitator screen, copies from the server). */
export function replaceProgress(progress: LearnerProgress): void {
  write(progress);
}

/** Current progress and change notifications, for syncing outside React. */
export { read as readProgress, subscribe as subscribeToProgress };
