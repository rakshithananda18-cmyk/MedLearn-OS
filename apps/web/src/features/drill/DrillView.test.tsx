import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { brachialPlexus } from '@/content/brachial-plexus';
import { resetProgress } from '@/features/progress/store';

import { DrillView } from './DrillView';

const push = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

afterEach(() => {
  act(() => resetProgress());
  push.mockClear();
});

const visual = brachialPlexus.visual;
if (visual.kind !== 'path') throw new Error('The sample topic has a path diagram');
const { diagram, drill } = visual;
const labelOf = (id: string) =>
  (diagram.nodes.find((node) => node.id === id)?.label ?? '').replace('-\n', '');

function renderDrill() {
  return render(
    <DrillView
      topicSlug="brachial-plexus"
      title="Brachial plexus"
      diagram={diagram}
      steps={drill}
    />,
  );
}

describe('DrillView', () => {
  it('starts on the roots with a bank of labels', async () => {
    const { container } = renderDrill();
    expect(screen.getByRole('heading', { name: 'Roots' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Labels' })).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it('shakes off a wrong label and explains', async () => {
    renderDrill();
    await userEvent.click(screen.getByRole('button', { name: 'T1' }));
    expect(screen.getByRole('status')).toHaveTextContent('Not T1.');
  });

  it('builds every layer, then records the drill and returns to Today', async () => {
    renderDrill();
    for (const [index, step] of drill.entries()) {
      for (const id of step.nodeIds) {
        await userEvent.click(screen.getByRole('button', { name: labelOf(id) }));
      }
      const next = drill[index + 1];
      if (next) await userEvent.click(screen.getByRole('button', { name: `Next: ${next.title}` }));
    }
    expect(screen.getByRole('heading', { name: 'Diagram built' })).toBeInTheDocument();
    expect(screen.getByText(/Every label right first time/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Finish' }));
    expect(JSON.parse(localStorage.getItem('ml-progress-v1') ?? '{}').completedDrills).toEqual([
      'brachial-plexus',
    ]);
    expect(push).toHaveBeenCalledWith('/today');
  });
});
