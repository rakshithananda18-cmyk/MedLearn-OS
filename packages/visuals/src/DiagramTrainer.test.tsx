import type { DrillStep, PathDiagram } from '@medlearn/schemas';
import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { DiagramTrainer } from './DiagramTrainer';
import { type DrillState, placeLabel, selectBlank, startDrill } from './trainer';

const diagram: PathDiagram = {
  width: 200,
  height: 200,
  nodes: [
    { id: 'c5', label: 'C5', name: 'C5 root', x: 40, y: 20 },
    { id: 'c6', label: 'C6', name: 'C6 root', x: 160, y: 20 },
    { id: 'upper', label: 'Upper', name: 'Upper trunk', x: 100, y: 120 },
  ],
  edges: [
    { from: 'c5', to: 'upper' },
    { from: 'c6', to: 'upper' },
  ],
};

const steps: DrillStep[] = [
  { id: 'roots', title: 'Roots', hint: 'x', nodeIds: ['c5', 'c6'] },
  { id: 'trunks', title: 'Trunks', hint: 'x', nodeIds: ['upper'] },
];

function Harness({ initial }: { initial: DrillState }) {
  const [state, setState] = useState(initial);
  return (
    <>
      <DiagramTrainer
        diagram={diagram}
        steps={steps}
        state={state}
        title="Plexus drill"
        onSelectBlank={(id) => setState(selectBlank(steps, state, id))}
      />
      <button type="button" onClick={() => setState(placeLabel(diagram, steps, state, 'C6').state)}>
        Place C6
      </button>
    </>
  );
}

describe('DiagramTrainer', () => {
  it('shows only the current layer as blanks, with the first one selected', async () => {
    const { container } = render(<Harness initial={startDrill(steps)} />);
    expect(screen.getByRole('button', { name: 'Blank 1 of 2' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.queryByRole('img', { name: 'Upper trunk' })).not.toBeInTheDocument();
    expect(screen.getByText('Roots: 0 of 2 labelled.')).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it('selects a blank by tap or keyboard, and fills it', async () => {
    render(<Harness initial={startDrill(steps)} />);
    screen.getByRole('button', { name: 'Blank 2 of 2' }).focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: 'Blank 2 of 2' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Place C6' }));
    expect(screen.getByRole('img', { name: 'C6 root' })).toBeInTheDocument();
    expect(screen.getByText('Roots: 1 of 2 labelled.')).toBeInTheDocument();
  });

  it('draws the lines once both ends are labelled', () => {
    const state: DrillState = {
      stepIndex: 1,
      placed: ['c5', 'c6', 'upper'],
      selectedId: null,
      mistakes: 0,
    };
    const { container } = render(<Harness initial={state} />);
    expect(container.querySelectorAll('line')).toHaveLength(2);
    expect(screen.getByRole('img', { name: 'Upper trunk' })).toBeInTheDocument();
  });
});
