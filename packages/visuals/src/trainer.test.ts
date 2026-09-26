import type { DrillStep, PathDiagram } from '@medlearn/schemas';
import { describe, expect, it } from 'vitest';

import {
  blanks,
  isDrillDone,
  isStepDone,
  labelBank,
  labelText,
  nextStep,
  placeLabel,
  selectBlank,
  startDrill,
} from './trainer';

const diagram: PathDiagram = {
  width: 200,
  height: 200,
  nodes: [
    { id: 'c5', label: 'C5', name: 'C5 root', x: 40, y: 20 },
    { id: 'c6', label: 'C6', name: 'C6 root', x: 160, y: 20 },
    { id: 'upper-ant', label: 'A', name: 'Anterior division', x: 20, y: 100 },
    { id: 'upper-post', label: 'P', name: 'Posterior division', x: 60, y: 100 },
    { id: 'lower-ant', label: 'A', name: 'Anterior division', x: 140, y: 100 },
    { id: 'mc', label: 'Musculo-\ncutaneous', name: 'Musculocutaneous nerve', x: 100, y: 180 },
  ],
  edges: [],
};

const steps: DrillStep[] = [
  { id: 'roots', title: 'Roots', hint: 'x', nodeIds: ['c5', 'c6'] },
  {
    id: 'divisions',
    title: 'Divisions',
    hint: 'x',
    nodeIds: ['upper-ant', 'upper-post', 'lower-ant'],
  },
  { id: 'branches', title: 'Branches', hint: 'x', nodeIds: ['mc'] },
];

describe('exam diagram drill', () => {
  it('starts on the first blank of the first layer', () => {
    const state = startDrill(steps);
    expect(state).toEqual({ stepIndex: 0, placed: [], selectedId: 'c5', mistakes: 0 });
    expect(blanks(steps, state)).toEqual(['c5', 'c6']);
  });

  it('fills the selected blank with the right label and moves to the next blank', () => {
    const { state, correct } = placeLabel(diagram, steps, startDrill(steps), 'C5');
    expect(correct).toBe(true);
    expect(state.placed).toEqual(['c5']);
    expect(state.selectedId).toBe('c6');
  });

  it('counts a wrong label as a mistake and keeps the blank', () => {
    const { state, correct } = placeLabel(diagram, steps, startDrill(steps), 'C6');
    expect(correct).toBe(false);
    expect(state).toMatchObject({ placed: [], selectedId: 'c5', mistakes: 1 });
  });

  it('lets the student pick another blank of the current layer only', () => {
    const state = startDrill(steps);
    expect(selectBlank(steps, state, 'c6').selectedId).toBe('c6');
    expect(selectBlank(steps, state, 'mc')).toBe(state);
  });

  it('lists each remaining label once, so repeated labels are placed one by one', () => {
    let state = nextStep(steps, { ...startDrill(steps), placed: ['c5', 'c6'] });
    expect(labelBank(diagram, steps, state).sort()).toEqual(['A', 'P']);
    state = placeLabel(diagram, steps, state, 'A').state;
    state = placeLabel(diagram, steps, state, 'P').state;
    expect(labelBank(diagram, steps, state)).toEqual(['A']);
    state = placeLabel(diagram, steps, state, 'A').state;
    expect(isStepDone(steps, state)).toBe(true);
    expect(isDrillDone(steps, state)).toBe(false);
  });

  it('finishes after the last layer and joins wrapped labels', () => {
    const state = nextStep(steps, {
      stepIndex: 1,
      placed: ['c5', 'c6', 'upper-ant', 'upper-post', 'lower-ant'],
      selectedId: null,
      mistakes: 0,
    });
    expect(labelBank(diagram, steps, state)).toEqual(['Musculocutaneous']);
    const done = placeLabel(diagram, steps, state, 'Musculocutaneous').state;
    expect(isDrillDone(steps, done)).toBe(true);
    expect(nextStep(steps, done).stepIndex).toBe(2);
    expect(labelText('Two\nlines')).toBe('Two lines');
  });
});
