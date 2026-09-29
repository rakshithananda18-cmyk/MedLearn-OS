import type { PartKind } from '@medlearn/schemas';
import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import type * as Visuals from '@medlearn/visuals';
import type { Stroke, Viewer3DLabel } from '@medlearn/visuals/viewer3d';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { BODY_MODEL, BODY_REGIONS } from '@/content/body';
import { libraryTree } from '@/content/library';
import { studioTopics } from '@/content/studio';
import { TOPICS } from '@/content/topics';

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
    labels: Viewer3DLabel[];
    resetToken: number;
    reducedMotion: boolean;
    dpr: number | [number, number];
  },
}));
const router = vi.hoisted(() => ({ back: vi.fn(), push: vi.fn() }));

// WebGL cannot run in jsdom: a stand-in records what the real view would receive.
vi.mock('next/dynamic', () => ({
  default: () =>
    function ViewerStandIn(props: NonNullable<typeof viewer.props>) {
      viewer.props = props;
      return <div data-testid="viewer" />;
    },
}));
vi.mock('next/navigation', () => ({ useRouter: () => router }));
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
      tree={libraryTree(TOPICS.filter((topic) => topic.subjectSlug === 'anatomy'))}
      regions={BODY_REGIONS}
      body={BODY_MODEL}
      initialTopic={initialTopic}
    />,
  );
}

const tap = (id: string | null) => act(() => viewer.props?.onSelect(id));

/** Laptops and tablets held sideways: the media query for docked panels matches. */
function wideScreen() {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query === '(min-width: 64rem)',
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

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

describe('Studio on a phone', () => {
  it('opens on the whole body: regions, their topics as cards, counts on the model', async () => {
    const { container } = await renderStudio();
    expect(screen.getByRole('heading', { level: 1, name: 'Whole body' })).toBeInTheDocument();
    const browser = screen.getByRole('region', { name: 'Regions and topics' });
    expect(within(browser).getByRole('button', { name: /Axilla: walls/ })).toBeInTheDocument();
    const upperLimb = studioTopics().filter((topic) => topic.regions.includes('upper-limb'));
    expect(viewer.props?.labels).toContainEqual({
      id: 'upper-limb',
      text: `Upper limb · ${upperLimb.length}`,
      active: true,
    });
    await expectNoA11yViolations(container);

    // A marker on the body picks its region; a lesson-only topic links to its lesson.
    tap('thorax');
    expect(
      within(browser).getByRole('button', { name: 'Thorax', pressed: true }),
    ).toBeInTheDocument();
    expect(within(browser).getByRole('link', { name: /Oxygen–haemoglobin curve/ })).toHaveAttribute(
      'href',
      '/learn/oxygen-haemoglobin-curve',
    );
  });

  it('opens a topic in place, walks its guided views, and goes back', async () => {
    await renderStudio();
    await userEvent.click(screen.getByRole('button', { name: /Axilla: walls/ }));
    expect(
      screen.getByRole('heading', { level: 1, name: 'Axilla: walls and contents' }),
    ).toBeInTheDocument();
    expect(window.location.search).toBe('?topic=axilla');
    expect(screen.getByText(/^The space/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Next view' }));
    expect(screen.getByText(/^Apex/)).toBeInTheDocument();

    // The topic's name opens the topics as the library's tree, the open one marked.
    await userEvent.click(screen.getByRole('button', { name: 'Axilla: walls and contents' }));
    const topics = screen.getByRole('region', { name: 'Topics' });
    expect(within(topics).getByRole('button', { name: /Axilla: walls.*Open/ })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Go back' }));
    expect(router.back.mock.calls.length + router.push.mock.calls.length).toBe(1);
  });

  it('explains a picked structure, with a clinical note, and labels it on the model', async () => {
    const { container } = await renderStudio('axilla');
    tap('serratus');
    const card = screen.getByRole('region', { name: 'Serratus anterior' });
    expect(within(card).getByText(/Long thoracic nerve/)).toBeInTheDocument();
    expect(viewer.props?.labels[0]).toEqual({
      id: 'serratus',
      text: 'Serratus anterior',
      active: true,
    });
    await userEvent.click(within(card).getByRole('button', { name: 'Clinical note' }));
    expect(within(card).getByText('Long thoracic nerve injury.')).toBeInTheDocument();
    await expectNoA11yViolations(container);

    await userEvent.click(within(card).getByRole('button', { name: 'Pectoral region and breast' }));
    expect(
      screen.getByRole('heading', { level: 1, name: 'Pectoral region and breast' }),
    ).toBeInTheDocument();
  });

  it('switches layers off, hides one structure, x-rays and resets the view', async () => {
    await renderStudio('axilla');
    const tools = screen.getByRole('toolbar', { name: 'View' });
    await userEvent.click(within(tools).getByRole('button', { name: 'Layers' }));
    const layers = screen.getByRole('region', { name: 'Layers' });
    await userEvent.click(within(layers).getByRole('button', { name: 'Muscles', pressed: true }));
    expect(viewer.props?.hiddenKinds.has('muscle')).toBe(true);

    tap('axillary-vein');
    await userEvent.click(screen.getByRole('button', { name: 'Hide it' }));
    expect(viewer.props?.hiddenIds.has('axillary-vein')).toBe(true);
    await userEvent.click(within(layers).getByRole('button', { name: 'Show Axillary vein' }));
    expect(viewer.props?.hiddenIds.has('axillary-vein')).toBe(false);

    await userEvent.click(within(tools).getByRole('button', { name: 'X-ray' }));
    expect(viewer.props?.xray).toBe(true);
    await userEvent.click(within(tools).getByRole('button', { name: 'Reset the view' }));
    expect(viewer.props?.resetToken).toBe(1);
  });

  it('finds a structure by name', async () => {
    await renderStudio('axilla');
    await userEvent.click(screen.getByRole('button', { name: 'Search structures' }));
    const sheet = screen.getByRole('region', { name: 'Search' });
    await userEvent.type(
      within(sheet).getByRole('searchbox', { name: 'Find a structure' }),
      'vein',
    );
    await userEvent.click(within(sheet).getByRole('button', { name: 'Axillary vein' }));
    expect(screen.getByRole('region', { name: 'Axillary vein' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Search' })).not.toBeInTheDocument();
  });

  it('plays "Find it" in rounds of ten: a right tap scores, a wrong one names what was tapped', async () => {
    await renderStudio('axilla');
    await userEvent.click(screen.getByRole('button', { name: 'Find it' }));
    expect(screen.getByText('Find it on the model')).toBeInTheDocument();
    expect(screen.getByText('Cords of the brachial plexus')).toBeInTheDocument();
    expect(screen.getByText('Question 1 of 10')).toBeInTheDocument();
    tap('cords');
    expect(screen.getByText('Right! Next one.')).toBeInTheDocument();
    expect(screen.getByText('Question 2 of 10')).toBeInTheDocument();
    tap('humerus');
    expect(screen.getByText(/You tapped Humerus/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Hint/ })).toBeDisabled();

    for (let skip = 0; skip < 9; skip++) {
      await userEvent.click(screen.getByRole('button', { name: 'Skip' }));
    }
    expect(screen.getByText('Round over: you found 1 of 10.')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Play again' }));
    expect(screen.getByText('Question 1 of 10')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'End the game' }));
    expect(screen.queryByText('Find it on the model')).not.toBeInTheDocument();
  });

  it('draws on the model, undoes and clears, and keeps drawings on the device', async () => {
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
    const browser = screen.getByRole('region', { name: 'Regions and topics' });
    expect(
      within(browser).getByRole('button', { name: 'Thorax', pressed: true }),
    ).toBeInTheDocument();
  });
});

describe('Studio on a wide screen', () => {
  it('docks the topics and search, the guided views by the tools, and the structure', async () => {
    wideScreen();
    const { container } = await renderStudio('axilla');
    expect(screen.queryByRole('button', { name: 'Search structures' })).not.toBeInTheDocument();
    const topics = screen.getByRole('region', { name: 'Topics' });
    expect(screen.getByText('Best streak')).toBeInTheDocument();
    const guide = screen.getByRole('group', { name: 'Guided views' });
    expect(guide).toHaveTextContent('1/');
    await userEvent.click(within(guide).getByRole('button', { name: 'Next view' }));
    expect(guide).toHaveTextContent('2/');
    const side = screen.getByRole('complementary', { name: 'About the model' });
    expect(within(side).getByRole('region', { name: 'Layers' })).toBeInTheDocument();

    await userEvent.type(
      within(topics).getByRole('searchbox', { name: 'Find a structure' }),
      'serr',
    );
    await userEvent.click(within(topics).getByRole('button', { name: 'Serratus anterior' }));
    const card = within(side).getByRole('region', { name: 'Serratus anterior' });
    // Docked, the card shows everything at once.
    expect(within(card).getByText('Long thoracic nerve injury.')).toBeInTheDocument();
    await expectNoA11yViolations(container);

    await userEvent.click(within(side).getByRole('button', { name: 'Find it' }));
    expect(screen.getByText('Find it on the model')).toBeInTheDocument();
  });

  it('lists regions and book sections as a tree of topic cards, each branch folding', async () => {
    wideScreen();
    await renderStudio('axilla');
    const tree = screen.getByRole('list', { name: 'Regions and topics' });
    const open = within(tree).getByRole('button', { name: /Axilla: walls.*Open/ });
    expect(open).toHaveAttribute('aria-current', 'true');
    // The branches leading to the open topic start open; the others are folded.
    expect(within(tree).getByRole('button', { name: /^Upper limb/, expanded: true })).toBeVisible();
    const pectoral = within(tree).getByRole('button', {
      name: /^Pectoral region/,
      expanded: false,
    });
    await userEvent.click(pectoral);
    expect(pectoral).toHaveAttribute('aria-expanded', 'true');
    expect(
      within(tree).getByRole('button', { name: /Pectoral region and breast.*Up next/ }),
    ).toBeInTheDocument();

    // The whole body sits beside the search.
    await userEvent.click(screen.getByRole('button', { name: 'Whole body', pressed: false }));
    expect(screen.getByRole('heading', { level: 1, name: 'Whole body' })).toBeInTheDocument();
  });

  it('folds either panel away and brings it back', async () => {
    wideScreen();
    await renderStudio('axilla');
    await userEvent.click(screen.getByRole('button', { name: 'Hide the topics' }));
    expect(screen.queryByRole('region', { name: 'Topics' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Hide the model panel' }));
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Show the topics' }));
    await userEvent.click(screen.getByRole('button', { name: 'Show the model panel' }));
    expect(screen.getByRole('region', { name: 'Topics' })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'About the model' })).toBeInTheDocument();
  });

  it('shows the topic as its flat diagram when the student picks 2D in the settings', async () => {
    wideScreen();
    await renderStudio('brachial-plexus');
    await userEvent.click(screen.getByRole('button', { name: 'Settings' }));
    await userEvent.click(screen.getByRole('switch', { name: 'Flat diagram (2D)' }));
    expect(screen.queryByTestId('viewer')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Median nerve' })).toBeInTheDocument();
  });

  it('changes names, camera moves and sharpness in the settings, and keeps them', async () => {
    wideScreen();
    const { container, unmount } = await renderStudio();
    expect(viewer.props?.labels.length).toBeGreaterThan(0);
    expect(viewer.props?.dpr).toEqual([1, 2]);

    await userEvent.click(screen.getByRole('button', { name: 'Settings' }));
    const settings = screen.getByRole('region', { name: 'Settings' });
    await expectNoA11yViolations(container);
    await userEvent.click(within(settings).getByRole('switch', { name: 'Names on the model' }));
    await userEvent.click(within(settings).getByRole('switch', { name: 'Smooth camera moves' }));
    await userEvent.click(within(settings).getByRole('switch', { name: 'Sharper picture' }));
    expect(viewer.props?.labels).toEqual([]);
    expect(viewer.props?.reducedMotion).toBe(true);
    expect(viewer.props?.dpr).toBe(1);

    unmount();
    await renderStudio();
    expect(viewer.props?.labels).toEqual([]);
    expect(viewer.props?.dpr).toBe(1);
  });
});
