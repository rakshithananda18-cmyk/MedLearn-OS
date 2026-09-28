/** "Find it": the studio names a structure and the student taps it on the model. */
export interface QuizState {
  targetId: string;
  score: number;
  asked: number;
  streak: number;
  best: number;
  /** How the last tap went, and what was tapped, for feedback. */
  last: 'right' | 'wrong' | null;
  picked: string | null;
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
  };
}

/** A right tap scores and moves on; a wrong one breaks the streak and asks again. */
export function answerQuiz(
  state: QuizState,
  pickedId: string,
  pool: string[],
  random = Math.random,
): QuizState {
  if (pickedId !== state.targetId) {
    return { ...state, streak: 0, last: 'wrong', picked: pickedId };
  }
  const score = state.score + 1;
  const streak = state.streak + 1;
  return {
    targetId: nextTarget(pool, state.targetId, random),
    score,
    asked: state.asked + 1,
    streak,
    best: Math.max(state.best, streak),
    last: 'right',
    picked: pickedId,
  };
}

/** Moves on without scoring. */
export function skipQuiz(state: QuizState, pool: string[], random = Math.random): QuizState {
  return {
    ...state,
    targetId: nextTarget(pool, state.targetId, random),
    asked: state.asked + 1,
    streak: 0,
    last: null,
    picked: null,
  };
}
