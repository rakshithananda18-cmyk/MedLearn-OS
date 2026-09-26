import type { DrillStep, PathDiagram } from '@medlearn/schemas';

/** Progress through an exam diagram drill. */
export interface DrillState {
  stepIndex: number;
  /** Nodes labelled correctly so far, across all steps. */
  placed: string[];
  /** The blank the next label goes to. */
  selectedId: string | null;
  mistakes: number;
}

/** A node label as one line of text: "Musculo-\ncutaneous" becomes "Musculocutaneous". */
export function labelText(label: string): string {
  return label.replace(/-\n/g, '').replace(/\n/g, ' ');
}

function textOf(diagram: PathDiagram, id: string): string {
  return labelText(diagram.nodes.find((node) => node.id === id)?.label ?? '');
}

// A fixed shuffle, so the bank order never gives the answer away yet never jumps around.
function scramble(text: string): number {
  return [...text].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 997, 7);
}

export function startDrill(steps: DrillStep[]): DrillState {
  return { stepIndex: 0, placed: [], selectedId: steps[0]?.nodeIds[0] ?? null, mistakes: 0 };
}

/** Unlabelled nodes of the current step, in drawing order. */
export function blanks(steps: DrillStep[], state: DrillState): string[] {
  return (steps[state.stepIndex]?.nodeIds ?? []).filter((id) => !state.placed.includes(id));
}

export function isStepDone(steps: DrillStep[], state: DrillState): boolean {
  return blanks(steps, state).length === 0;
}

export function isDrillDone(steps: DrillStep[], state: DrillState): boolean {
  return state.stepIndex === steps.length - 1 && isStepDone(steps, state);
}

/** Labels still to place in the current step, each listed once. */
export function labelBank(diagram: PathDiagram, steps: DrillStep[], state: DrillState): string[] {
  const texts = new Set(blanks(steps, state).map((id) => textOf(diagram, id)));
  return [...texts].sort((a, b) => scramble(a) - scramble(b) || a.localeCompare(b));
}

export function selectBlank(steps: DrillStep[], state: DrillState, id: string): DrillState {
  return blanks(steps, state).includes(id) ? { ...state, selectedId: id } : state;
}

/** Puts a label on the selected blank. A wrong label counts a mistake and changes nothing else. */
export function placeLabel(
  diagram: PathDiagram,
  steps: DrillStep[],
  state: DrillState,
  text: string,
): { state: DrillState; correct: boolean } {
  const target = state.selectedId;
  if (!target || textOf(diagram, target) !== text) {
    return { state: { ...state, mistakes: state.mistakes + 1 }, correct: false };
  }
  const next = { ...state, placed: [...state.placed, target] };
  return { state: { ...next, selectedId: blanks(steps, next)[0] ?? null }, correct: true };
}

export function nextStep(steps: DrillStep[], state: DrillState): DrillState {
  const stepIndex = Math.min(state.stepIndex + 1, steps.length - 1);
  return { ...state, stepIndex, selectedId: steps[stepIndex]?.nodeIds[0] ?? null };
}
