import type { PathDiagram } from '@medlearn/schemas';
import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { PathTracer } from './PathTracer';

const diagram: PathDiagram = {
  width: 200,
  height: 200,
  nodes: [
    { id: 'c5', label: 'C5', name: 'C5 root', x: 40, y: 20 },
    { id: 'c7', label: 'C7', name: 'C7 root', x: 160, y: 20 },
    { id: 'upper', label: 'Upper', name: 'Upper trunk', x: 40, y: 100 },
    { id: 'middle', label: 'Middle', name: 'Middle trunk', x: 160, y: 100 },
    { id: 'median', label: 'Median', name: 'Median nerve', x: 100, y: 180 },
  ],
  edges: [
    { from: 'c5', to: 'upper' },
    { from: 'c7', to: 'middle' },
    { from: 'upper', to: 'median' },
    { from: 'middle', to: 'median' },
  ],
};

function Harness({ lesion }: { lesion?: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <PathTracer
      diagram={diagram}
      title="Test plexus"
      selectedId={selected}
      onSelect={setSelected}
      lesion={lesion ?? []}
    />
  );
}

describe('PathTracer', () => {
  it('exposes each node as a named button inside a labelled diagram', () => {
    render(<Harness />);
    expect(screen.getByRole('group', { name: 'Test plexus' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Median nerve' })).toBeInTheDocument();
  });

  it('describes the traced path in text when a node is selected', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'C5 root' }));
    expect(screen.getByRole('button', { name: 'C5 root' })).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByText(/C5 root\. Path: C5 root, Upper trunk, Median nerve\./),
    ).toBeInTheDocument();
  });

  it('can be driven entirely from the keyboard, and deselected', async () => {
    render(<Harness />);
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: 'C5 root' })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.keyboard(' ');
    expect(screen.getByText('Select a root or nerve to trace its path.')).toBeInTheDocument();
  });

  it('lists what a lesion affects', () => {
    render(<Harness lesion={['c7']} />);
    expect(
      screen.getByText('Affected by the lesion: C7 root, Middle trunk, Median nerve.'),
    ).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Harness />);
    await expectNoA11yViolations(container);
  });
});
