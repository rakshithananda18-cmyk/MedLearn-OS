/** "Find it" comes in rounds of this many questions. */
export const ROUND = 10;
/** After this many wrong taps on one structure, it glows so the round can go on. */
export const REVEAL_AFTER = 2;
/** Hints on one structure: first what kind of thing it is, then the camera turns to it. */
export const MAX_HINTS = 2;
/** Streaks worth a cheer. */
export const MILESTONES = [3, 5, 10];

/** How each question of the round went: found first time, found with help, or skipped. */
export type QuizResult = { id: string; how: 'clean' | 'helped' | 'skipped' };

/** "Find it": the studio names a structure and the student taps it on the model. */
export interface QuizState {
  targetId: string;
  /** Points: one for each structure found first time, half for one found with help. */
  score: number;
  asked: number;
  /** Structures found in a row first time, without help. */
  streak: number;
  best: number;
  /** How the last tap went, and what was tapped, for feedback. */
  last: 'right' | 'wrong' | null;
  picked: string | null;
  /** The points the last right tap earned. */
  gained: number;
  /** Wrong taps on the structure asked for now. */
  misses: number;
  /** Hints taken on it. */
  hints: number;
  /** The round so far, question by question. */
  results: QuizResult[];
}

/** A structure to find, never the one just found (when there is a choice). */
export function nextTarget(pool: string[], previous: string | null, random = Math.random): string {
  const choices = pool.length > 1 ? pool.filter((id) => id !== previous) : pool;
  return choices[Math.floor(random() * choices.length)] ?? '';
}

export function startQuiz(pool: string[], best: number, random = Math.random): QuizState {
  return {
    targetId: nextTarget(pool, null, random),
    score: 0,
    asked: 0,
    streak: 0,
    best,
    last: null,
    picked: null,
    gained: 0,
    misses: 0,
    hints: 0,
    results: [],
  };
}

/**
 * A right tap scores and moves on: a full point first time, half with a hint or once it was
 * shown. A wrong one breaks the streak and asks again; after two, the answer is shown.
 */
export function answerQuiz(
  state: QuizState,
  pickedId: string,
  pool: string[],
  random = Math.random,
): QuizState {
  if (pickedId !== state.targetId) {
    return { ...state, streak: 0, last: 'wrong', picked: pickedId, misses: state.misses + 1 };
  }
  const helped = state.hints > 0 || state.misses >= REVEAL_AFTER;
  const gained = helped ? 0.5 : 1;
  const streak = helped ? 0 : state.streak + 1;
  return {
    targetId: nextTarget(pool, state.targetId, random),
    score: state.score + gained,
    asked: state.asked + 1,
    streak,
    best: Math.max(state.best, streak),
    last: 'right',
    picked: pickedId,
    gained,
    misses: 0,
    hints: 0,
    results: [...state.results, { id: state.targetId, how: helped ? 'helped' : 'clean' }],
  };
}

/** One more hint on the structure asked for, up to two. */
export function hintQuiz(state: QuizState): QuizState {
  return { ...state, hints: Math.min(MAX_HINTS, state.hints + 1), last: null, picked: null };
}

/** The round is over once every question has been found or skipped. */
export const roundOver = (state: QuizState): boolean => state.asked >= ROUND;

/** Moves on without scoring. */
export function skipQuiz(state: QuizState, pool: string[], random = Math.random): QuizState {
  return {
    ...state,
    targetId: nextTarget(pool, state.targetId, random),
    asked: state.asked + 1,
    streak: 0,
    last: null,
    picked: null,
    gained: 0,
    misses: 0,
    hints: 0,
    results: [...state.results, { id: state.targetId, how: 'skipped' }],
  };
}

/** The streak just reached, when it is one worth a cheer. */
export const milestone = (state: QuizState): number | null =>
  state.last === 'right' && MILESTONES.includes(state.streak) ? state.streak : null;

/** Stars for a round's points: three for 9 or more, two for 6, one for 3. */
export const starsFor = (score: number): number => [3, 6, 9].filter((at) => score >= at).length;

/** The structures worth another look after a round: skipped, or found only with help. */
export const toRevisit = (state: QuizState): string[] => [
  ...new Set(state.results.filter((result) => result.how !== 'clean').map((result) => result.id)),
];

/** Points as students say them: 7, or 7½. */
export const points = (score: number): string =>
  Number.isInteger(score) ? String(score) : `${Math.floor(score)}½`;
