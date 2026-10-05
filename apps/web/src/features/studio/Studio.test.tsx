import type { PartKind } from '@medlearn/schemas';
import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import type * as Visuals from '@medlearn/visuals';
import type {
  Stroke,
  Viewer3DFocus,
  Viewer3DLabel,
  Viewer3DLayer,
  Viewer3DSection,
} from '@medlearn/visuals/viewer3d';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
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
    stopId: string;
    layers: Viewer3DLayer[];
    section: Viewer3DSection | null;
    focus: Viewer3DFocus | null;
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

async function renderStudio(initialTopic: string | null = null, initialTour = false) {
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
      initialTour={initialTour}
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
    await userEvent.click(within(layers).getByRole('switch', { name: 'Muscles', checked: true }));
    expect(viewer.props?.hiddenKinds.has('muscle')).toBe(true);

    tap('axillary-vein');
    await userEvent.click(screen.getByRole('button', { name: 'Hide it' }));
    expect(viewer.props?.hiddenIds.has('axillary-vein')).toBe(true);
    await userEvent.click(within(layers).getByRole('button', { name: 'Show Axillary vein' }));
    expect(viewer.props?.hiddenIds.has('axillary-vein')).toBe(false);

    await userEvent.click(within(tools).getByRole('button', { name: 'See-through' }));
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
    // The layers open from beside the settings, not in the side panel.
    expect(within(side).queryByRole('region', { name: 'Layers' })).not.toBeInTheDocument();
    const tools = screen.getByRole('toolbar', { name: 'View' });
    await userEvent.click(within(tools).getByRole('button', { name: 'Layers' }));
    expect(screen.getByRole('switch', { name: 'Muscles', checked: true })).toBeInTheDocument();

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

  it('builds one body from its systems: switch them on and off, tap any structure', async () => {
    wideScreen();
    const search = vi.fn(async () =>
      Response.json({
        data: {
          results: [
            { kind: 'Topic', topicSlug: 'humerus', topicTitle: 'Humerus', excerpt: '', href: '' },
            {
              kind: 'Structure',
              topicSlug: 'humerus',
              topicTitle: 'Humerus',
              excerpt: '',
              href: '',
            },
          ],
        },
      }),
    );
    vi.stubGlobal('fetch', search);
    const { container } = await renderStudio();
    // No side panel until a structure is picked; the systems are the layers, by the settings.
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    const tools = screen.getByRole('toolbar', { name: 'View' });
    await userEvent.click(within(tools).getByRole('button', { name: 'Layers' }));
    const layers = screen.getByRole('region', { name: 'Layers' });
    // It opens on the skin over the skeleton; the other systems load when switched on.
    expect(viewer.props?.layers.map((layer) => layer.id)).toEqual(['skeleton']);
    await userEvent.click(within(layers).getByRole('switch', { name: 'Muscles' }));
    await userEvent.click(within(layers).getByRole('switch', { name: 'Skin' }));
    expect(viewer.props?.layers.map((layer) => layer.id)).toEqual(['skeleton', 'muscles']);
    expect(viewer.props?.hiddenIds).toContain('skin');
    await expectNoA11yViolations(container);

    await userEvent.click(within(layers).getByRole('button', { name: 'Close layers' }));
    tap('skeleton/left-humerus');
    const side = screen.getByRole('complementary', { name: 'About the model' });
    const card = await within(side).findByRole('region', { name: 'Left humerus' });
    expect(card).toHaveTextContent('Skeleton');
    expect(viewer.props?.highlight).toContain('skeleton/left-humerus');
    expect(search).toHaveBeenCalledWith('/api/search?q=humerus', expect.anything());
    expect(await within(card).findByRole('link', { name: 'Humerus' })).toHaveAttribute(
      'href',
      '/learn/humerus',
    );
    await userEvent.click(within(card).getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  });

  it('plays "Find it" on the whole body, over the region and the systems switched on', async () => {
    wideScreen();
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) =>
        url.includes('body-index')
          ? Response.json({
              structures: [
                ['skeleton/left-humerus', 180, -80, 1150, 150],
                ['skeleton/right-humerus', -180, -80, 1150, 150],
                ['organs/left-kidney', 60, -40, 1050, 60],
              ],
            })
          : Response.json({ data: { results: [] } }),
      ),
    );
    await renderStudio();
    const start = await screen.findByRole('button', { name: /Find it: Upper limb/ });
    await userEvent.click(start);
    expect(screen.getByText('Find it on the model')).toBeInTheDocument();
    // Region names and markers step aside: tapping them would only be a wrong answer.
    expect(viewer.props?.labels).toEqual([]);
    // Math.random is held at 0, so the first of the region's structures is asked first.
    expect(screen.getByText('Left humerus')).toBeInTheDocument();
    tap('skeleton/left-humerus');
    expect(screen.getByText('Right humerus')).toBeInTheDocument();
    tap('skeleton/left-humerus');
    expect(screen.getByText(/Left humerus/, { selector: 'p, span' })).toBeInTheDocument();
  });

  it('finds any structure of the body by name, switches its system on and turns to it', async () => {
    wideScreen();
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) =>
        url.includes('body-index')
          ? Response.json({ structures: [['skeleton/left-femur', 91, -81, 601, 243]] })
          : Response.json({ data: { results: [] } }),
      ),
    );
    await renderStudio();
    await userEvent.click(screen.getByRole('button', { name: 'Layers' }));
    await userEvent.click(screen.getByRole('switch', { name: 'Skeleton' }));
    expect(viewer.props?.layers).toEqual([]);

    const search = screen.getByRole('searchbox', { name: 'Find a structure or topic' });
    await userEvent.type(search, 'femur');
    await userEvent.click(await screen.findByRole('button', { name: /^Left femur.*Skeleton$/ }));
    expect(viewer.props?.layers.map((layer) => layer.id)).toEqual(['skeleton']);
    expect(viewer.props?.highlight).toContain('skeleton/left-femur');
    expect(viewer.props?.focus).toEqual({ point: [91, -81, 601], radius: 243 });
    expect(screen.getByRole('complementary', { name: 'About the model' })).toHaveTextContent(
      'Left femur',
    );
  });

  it('isolates a structure picked on the body, alone from its own system', async () => {
    wideScreen();
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Response.json({ data: { results: [] } })),
    );
    await renderStudio();
    const tools = screen.getByRole('toolbar', { name: 'View' });
    const only = within(tools).getByRole('button', { name: 'Only the picked structure' });
    expect(only).toBeDisabled();
    tap('skeleton/left-humerus');
    await userEvent.click(only);
    expect(viewer.props?.layers).toEqual([
      expect.objectContaining({ id: 'skeleton', only: 'left-humerus' }),
    ]);
    expect(viewer.props?.hiddenIds).toContain('skin');
    // Picking nothing shows the whole body again.
    tap(null);
    expect(viewer.props?.layers.map((layer) => layer.id)).toEqual(['skeleton']);
    expect(viewer.props?.layers[0]?.only).toBeUndefined();
  });

  it('cuts through the model along a plane, and keeps the cut when the sheet closes', async () => {
    wideScreen();
    const { container } = await renderStudio('axilla');
    const tools = screen.getByRole('toolbar', { name: 'View' });
    await userEvent.click(within(tools).getByRole('button', { name: 'Section' }));
    const sheet = screen.getByRole('region', { name: 'Section' });
    expect(viewer.props?.section).toBeNull();
    await userEvent.click(within(sheet).getByRole('switch', { name: 'Cut through the model' }));
    expect(viewer.props?.section).toEqual({ plane: 'transverse', at: 0.5 });
    await userEvent.click(within(sheet).getByRole('button', { name: 'Coronal', pressed: false }));
    fireEvent.change(within(sheet).getByRole('slider', { name: /Where to cut/ }), {
      target: { value: '30' },
    });
    expect(viewer.props?.section).toEqual({ plane: 'coronal', at: 0.3 });
    await expectNoA11yViolations(container);

    await userEvent.click(within(sheet).getByRole('button', { name: 'Close section' }));
    expect(viewer.props?.section).toEqual({ plane: 'coronal', at: 0.3 });
    expect(within(tools).getByRole('button', { name: 'Section' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
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
    await userEvent.click(within(settings).getByRole('button', { name: 'Battery saver' }));
    expect(viewer.props?.labels).toEqual([]);
    expect(viewer.props?.reducedMotion).toBe(true);
    expect(viewer.props?.dpr).toBe(1);

    unmount();
    await renderStudio();
    expect(viewer.props?.labels).toEqual([]);
    expect(viewer.props?.dpr).toBe(1);
  });

  it('plays the guided views as a captioned tour, moving on by itself and stopping at the end', async () => {
    wideScreen();
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      await renderStudio('axilla', true);
      const stops = studioTopics().find((topic) => topic.slug === 'axilla')?.model?.stops;
      const count = stops?.length ?? 0;
      const caption = screen.getByRole('region', { name: 'Tour caption' });
      expect(caption).toHaveTextContent(`Tour · 1 of ${count}`);
      expect(viewer.props?.stopId).toBe(stops?.[0]?.id);

      act(() => vi.advanceTimersByTime(30_000));
      expect(caption).toHaveTextContent(`Tour · 2 of ${count}`);
      expect(viewer.props?.stopId).toBe(stops?.[1]?.id);

      for (let stop = 2; stop <= count; stop++) act(() => vi.advanceTimersByTime(30_000));
      expect(screen.queryByRole('region', { name: 'Tour caption' })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Play the tour' })).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('opens every X-ray on the whole body beside the bones it shows', async () => {
    wideScreen();
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) =>
        url.includes('body-index')
          ? Response.json({
              structures: [
                ['skeleton/right-humerus', -190, -76, 1183, 164],
                ['skeleton/right-scapula', -112, -49, 1267, 113],
                ['skeleton/right-clavicle', -77, -101, 1332, 85],
              ],
            })
          : Response.json({ data: { results: [] } }),
      ),
    );
    await renderStudio();
    await userEvent.click(screen.getByRole('button', { name: 'Layers' }));
    await userEvent.click(screen.getByRole('switch', { name: 'Skeleton' }));
    await userEvent.click(screen.getByRole('button', { name: 'Close layers' }));

    await userEvent.click(screen.getByRole('button', { name: 'X-ray images', pressed: false }));
    expect(
      screen.getByRole('region', { name: 'X-ray: Shoulder, true AP (Grashey)' }),
    ).toBeVisible();
    // The skeleton comes back on, with the shoulder's bones lit and the camera turned to them.
    expect(viewer.props?.layers.map((layer) => layer.id)).toContain('skeleton');
    expect([...(viewer.props?.highlight ?? [])]).toEqual(
      expect.arrayContaining([
        'skeleton/right-humerus',
        'skeleton/right-scapula',
        'skeleton/right-clavicle',
      ]),
    );
    await vi.waitFor(() => expect(viewer.props?.focus?.point[2]).toBeCloseTo(1260.7, 0));
    // Every film is at hand, the hand's included.
    expect(screen.getByRole('button', { name: 'Hand, PA' })).toBeInTheDocument();
  });

  it('shows the topic’s X-ray films in place of the model, marked and switchable', async () => {
    wideScreen();
    const { unmount } = await renderStudio('elbow-joint');
    await userEvent.click(screen.getByRole('button', { name: 'X-ray images', pressed: false }));
    const films = screen.getByRole('region', { name: 'X-ray: Elbow, AP' });
    expect(within(films).getByRole('img', { name: 'Elbow, AP radiograph' })).toBeInTheDocument();
    const key = within(films).getByRole('list', { name: 'Marked on the film' });
    expect(within(key).getByRole('button', { name: /Medial epicondyle/ })).toBeInTheDocument();
    expect(within(films).getByText(/Mikael Häggström, CC0/)).toBeInTheDocument();

    await userEvent.click(within(films).getByRole('button', { name: 'Elbow, lateral' }));
    expect(screen.getByRole('region', { name: 'X-ray: Elbow, lateral' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Invert the film' }));
    expect(screen.getByRole('button', { name: 'Invert the film' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await userEvent.click(screen.getByRole('button', { name: 'Close the X-rays' }));
    expect(screen.queryByRole('region', { name: /^X-ray:/ })).not.toBeInTheDocument();
    // A topic with no films has no button for them.
    unmount();
    await renderStudio('brachial-plexus');
    expect(screen.queryByRole('button', { name: 'X-ray images' })).not.toBeInTheDocument();
  });
});
