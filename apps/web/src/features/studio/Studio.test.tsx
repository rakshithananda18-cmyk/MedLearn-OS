import type { PartKind } from '@medlearn/schemas';
import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import type * as Visuals from '@medlearn/visuals';
import type { Stroke } from '@medlearn/visuals/viewer3d';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { BODY_MODEL, BODY_REGIONS } from '@/content/body';
import { studioTopics } from '@/content/studio';

const capability = vi.hoisted(() => ({ supported: true }));
// What the 3D view last received, so a test can tap the model or draw as a finger would.
const viewer = vi.hoisted(() => ({
  props: null as null | {
    onSelect: (id: string | null) => void;
    hiddenKinds: ReadonlySet<PartKind>;
    hiddenIds: ReadonlySet<string>;
    xray: boolean;
    pen: { colour: string; onStroke: (stroke: Stroke) => void } | null;
    strokes: Stroke[];
    highlight: ReadonlySet<string>;
  },
}));

// WebGL cannot run in jsdom: a stand-in records what the real view would receive.
vi.mock('next/dynamic', () => ({
  default: () =>
    function ViewerStandIn(props: NonNullable<typeof viewer.props>) {
      viewer.props = props;
      return <div data-testid="viewer" />;
    },
}));
vi.mock('@medlearn/visuals', async (importOriginal) => ({
  ...(await importOriginal<typeof Visuals>()),
  supports3D: () => capability.supported,
}));

const STROKE: Stroke = {
  colour: '--color-pen-ink',
  points: [
    [0, 0, 0],
    [5, 5, 5],
  ],
};

async function renderStudio(initialTopic: string | null = null) {
  // Fresh module each time: the device check is cached per page load.
  vi.resetModules();
  const { Studio } = await import('./Studio');
  return render(
    <Studio
      topics={studioTopics()}
      regions={BODY_REGIONS}
      body={BODY_MODEL}
      initialTopic={initialTopic}
    />,
  );
}

const tap = (id: string | null) => act(() => viewer.props?.onSelect(id));

beforeAll(() => import('./Studio'), 60_000);

beforeEach(() => {
  capability.supported = true;
  localStorage.clear();
  // "Find it" always asks for the first structure it may.
  vi.spyOn(Math, 'random').mockReturnValue(0);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('Studio', () => {
  it('opens on the whole body with the topics of the first region', async () => {
    const { container } = await renderStudio();
    expect(screen.getByRole('heading', { level: 1, name: 'Whole body' })).toBeInTheDocument();
    const topics = screen.getByRole('region', { name: 'Topics' });
    expect(within(topics).getByRole('button', { name: /Axilla: walls/ })).toBeInTheDocument();
    await expectNoA11yViolations(container);

    // A marker on the body picks its region; a lesson-only topic links to its lesson.
    tap('thorax');
    expect(within(topics).getByRole('link', { name: /Oxygen–haemoglobin curve/ })).toHaveAttribute(
      'href',
      '/learn/oxygen-haemoglobin-curve',
    );
  });

  it('opens a topic in place, with its guided views', async () => {
    await renderStudio();
    await userEvent.click(screen.getByRole('button', { name: /Axilla: walls/ }));
    expect(
      screen.getByRole('heading', { level: 1, name: 'Axilla: walls and contents' }),
    ).toBeInTheDocument();
    expect(window.location.search).toBe('?topic=axilla');
    expect(screen.getByText(/^The space/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Next view' }));
    expect(screen.getByText(/^Apex/)).toBeInTheDocument();
  });

  it('explains a picked structure, with the lesson, clinical notes and other topics', async () => {
    const { container } = await renderStudio('axilla');
    tap('serratus');
    const card = screen.getByRole('region', { name: 'Serratus anterior' });
    expect(within(card).getByText(/Long thoracic nerve/)).toBeInTheDocument();
    await userEvent.click(within(card).getByRole('button', { name: 'More about it' }));
    expect(within(card).getByText('Long thoracic nerve injury.')).toBeInTheDocument();
    await expectNoA11yViolations(container);

    await userEvent.click(within(card).getByRole('button', { name: 'Pectoral region and breast' }));
    expect(
      screen.getByRole('heading', { level: 1, name: 'Pectoral region and breast' }),
    ).toBeInTheDocument();
  });

  it('switches layers and single structures off, and x-rays the model', async () => {
    await renderStudio('axilla');
    await userEvent.click(screen.getByRole('button', { name: 'Layers' }));
    const layers = screen.getByRole('region', { name: 'Layers' });
    await userEvent.click(within(layers).getByRole('button', { name: 'Muscles', pressed: true }));
    expect(viewer.props?.hiddenKinds.has('muscle')).toBe(true);
    await userEvent.click(within(layers).getByRole('button', { name: 'Hide Axillary vein' }));
    expect(viewer.props?.hiddenIds.has('axillary-vein')).toBe(true);
    await userEvent.click(within(layers).getByRole('switch', { name: 'X-ray' }));
    expect(viewer.props?.xray).toBe(true);
  });

  it('plays "Find it": a right tap scores, a wrong one names what was tapped', async () => {
    await renderStudio('axilla');
    await userEvent.click(screen.getByRole('button', { name: 'Find it' }));
    expect(screen.getByText('Cords of the brachial plexus')).toBeInTheDocument();
    tap('cords');
    expect(screen.getByText(/Score 1 · Streak 1/)).toBeInTheDocument();
    tap('humerus');
    expect(screen.getByText(/You tapped Humerus/)).toBeInTheDocument();
    expect(screen.getByText(/Streak 0 · Best 1/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'End' }));
    expect(screen.queryByText(/^Find:/)).not.toBeInTheDocument();
  });

  it('draws on the model, undoes and clears, and keeps drawings on the phone', async () => {
    await renderStudio('axilla');
    await userEvent.click(screen.getByRole('button', { name: 'Draw' }));
    expect(viewer.props?.pen?.colour).toBe('--color-pen-ink');
    await userEvent.click(screen.getByRole('button', { name: 'Violet pen' }));
    act(() => viewer.props?.pen?.onStroke(STROKE));
    act(() => viewer.props?.pen?.onStroke(STROKE));
    expect(viewer.props?.strokes).toHaveLength(2);
    await userEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(viewer.props?.strokes).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('ml-drawings-v1') ?? '{}').axilla).toHaveLength(1);
    await userEvent.click(screen.getByRole('button', { name: 'Clear drawing' }));
    expect(screen.getByRole('button', { name: 'Undo' })).toBeDisabled();
    await userEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(viewer.props?.pen).toBeNull();
  });

  it('docks the topics and the structure beside the model on a wide screen', async () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query === '(min-width: 64rem)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    const { container } = await renderStudio('axilla');
    expect(screen.queryByRole('button', { name: 'Topics' })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Topics' })).toBeInTheDocument();
    const side = screen.getByRole('complementary', { name: 'About the model' });
    expect(within(side).getByRole('region', { name: 'Layers' })).toBeInTheDocument();
    tap('serratus');
    expect(within(side).getByRole('region', { name: 'Serratus anterior' })).toBeInTheDocument();
    await userEvent.click(within(side).getByRole('button', { name: 'Find it' }));
    expect(screen.getByText(/^Find:/)).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it('shows the flat diagram or body outline on a phone that cannot show 3D', async () => {
    capability.supported = false;
    const { unmount } = await renderStudio('brachial-plexus');
    expect(screen.queryByTestId('viewer')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Median nerve' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Draw' })).not.toBeInTheDocument();
    unmount();

    await renderStudio();
    const outline = screen.getByRole('group', { name: 'Body outline' });
    await userEvent.click(within(outline).getByRole('button', { name: 'Thorax' }));
    const topics = screen.getByRole('region', { name: 'Topics' });
    expect(
      within(topics).getByRole('button', { name: 'Thorax', pressed: true }),
    ).toBeInTheDocument();
  });
});
