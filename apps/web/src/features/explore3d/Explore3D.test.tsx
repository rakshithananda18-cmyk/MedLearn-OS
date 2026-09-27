import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import type * as Visuals from '@medlearn/visuals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { brachialPlexus } from '@/content/brachial-plexus';

const capability = vi.hoisted(() => ({ supported: true }));

// WebGL cannot run in jsdom: a stand-in shows what the real viewer would receive.
vi.mock('next/dynamic', () => ({
  default: () =>
    function ViewerStandIn(props: {
      highlight: ReadonlySet<string>;
      stopId: string;
      showBones: boolean;
      showArteries: boolean;
    }) {
      return (
        <div
          data-testid="viewer"
          data-highlight={[...props.highlight].sort().join(',')}
          data-stop={props.stopId}
          data-bones={String(props.showBones)}
          data-arteries={String(props.showArteries)}
        />
      );
    },
}));
vi.mock('@medlearn/visuals', async (importOriginal) => ({
  ...(await importOriginal<typeof Visuals>()),
  supports3D: () => capability.supported,
}));

const visual = brachialPlexus.visual;
if (visual.kind !== 'path' || !visual.model3d) throw new Error('The sample topic has a 3D model');
const { diagram, model3d } = visual;

async function renderExplore() {
  // Fresh module each time: the device check is cached per page load.
  vi.resetModules();
  const { Explore3D } = await import('./Explore3D');
  return render(<Explore3D title="3D model" model={model3d} diagram={diagram} />);
}

// Each test imports the screen afresh (the device check is cached per page load). Loading it once
// here first keeps that one-off cost out of the first test's time limit on a busy machine.
beforeAll(() => import('./Explore3D'), 60_000);

beforeEach(() => {
  capability.supported = true;
});

describe('Explore3D', () => {
  it('opens on the overview with every layer shown', async () => {
    const { container } = await renderExplore();
    const viewer = screen.getByTestId('viewer');
    expect(viewer).toHaveAttribute('data-stop', 'overview');
    expect(viewer).toHaveAttribute('data-highlight', '');
    expect(screen.getByText(/The plexus runs from the neck/)).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it("lights a nerve's whole path and names it", async () => {
    await renderExplore();
    await userEvent.click(screen.getByRole('button', { name: 'Median nerve' }));
    const lit = screen.getByTestId('viewer').getAttribute('data-highlight')?.split(',');
    expect(lit).toEqual(
      expect.arrayContaining(['c5', 'c6', 'c7', 'c8', 't1', 'lateral', 'medial', 'median']),
    );
    expect(lit).not.toContain('radial');
    expect(screen.getByText(/^Median nerve\. Path: C5 root/)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Median nerve' }));
    expect(screen.getByTestId('viewer')).toHaveAttribute('data-highlight', '');
  });

  it('names an artery, moves between views and hides layers', async () => {
    await renderExplore();
    await userEvent.click(screen.getByRole('button', { name: 'Axillary artery' }));
    expect(screen.getByText('Axillary artery.')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Divisions and cords' }));
    expect(screen.getByTestId('viewer')).toHaveAttribute('data-stop', 'divisions-cords');

    await userEvent.click(screen.getByRole('button', { name: 'Bones' }));
    expect(screen.getByTestId('viewer')).toHaveAttribute('data-bones', 'false');
    expect(screen.getByRole('button', { name: 'Bones' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows the 2D diagram on a phone that cannot show 3D', async () => {
    capability.supported = false;
    await renderExplore();
    expect(screen.getByText(/cannot show the 3D view/)).toBeInTheDocument();
    expect(screen.queryByTestId('viewer')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Median nerve' })).toBeInTheDocument();
  });
});
