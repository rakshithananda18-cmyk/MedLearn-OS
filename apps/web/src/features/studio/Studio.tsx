'use client';

import type { BodyRegion, Model3D, PartKind } from '@medlearn/schemas';
import { cx, IconButton, Text } from '@medlearn/ui';
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from '@medlearn/ui/icons';
import type { Stroke, Viewer3DLabel } from '@medlearn/visuals/viewer3d';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { BODY_SYSTEMS, type BodyRegionInfo, bodyStructure } from '@/content/body';
import type { LibraryNode } from '@/content/library';
import { filmsFor } from '@/content/xrays';

import { DrawBar, ModeSwitch, PENS, QuizBar, QuizProgress, QuizTarget, TourBar } from './bars';
import { useBodyIndex } from './bodyIndex';
import { BodyPartCard } from './BodyPanels';
import { structureInfo, structuresOf, type StudioTopic } from './knowledge';
import {
  BodyBrowser,
  GLASS,
  InfoCard,
  LayersPanel,
  SearchSheet,
  SectionPanel,
  SettingsPanel,
  StructureSearch,
  TopicsPanel,
} from './panels';
import { skipQuiz, startQuiz } from './quiz';
import {
  loadBest,
  loadSettings,
  loadStrokes,
  saveBest,
  saveSettings,
  saveStrokes,
  type StudioSettings,
} from './saved';
import {
  changeModeIn,
  findOnBody,
  hiddenIn,
  litIn,
  type Mode,
  openTopicIn,
  type Panel,
  pickIn,
  type Session,
  startSession,
  toggled,
} from './session';
import {
  BestCard,
  BottomSheet,
  DockedHeader,
  GuideCard,
  ModelView,
  PhoneHeader,
  TourButton,
  TourCaption,
  ViewTools,
} from './stage';
import { pixelRatio, useCan3D, useDocked, useReducedMotion } from './viewer';
import { XrayViewer } from './XrayViewer';

// A topic's layers, from the surface in.
const PART_LAYERS: Array<{ kind: PartKind; name: string }> = [
  { kind: 'muscle', name: 'Muscles' },
  { kind: 'artery', name: 'Arteries' },
  { kind: 'vein', name: 'Veins' },
  { kind: 'bone', name: 'Bones' },
];
const BODY_KEY = 'body';

export interface StudioProps {
  topics: StudioTopic[];
  /** The anatomy topics as the library's tree: region, book section, topic. */
  tree: LibraryNode[];
  regions: BodyRegionInfo[];
  /** The whole body, shown when no topic is open. */
  body: Model3D;
  initialTopic: string | null;
  /** Start the open topic's guided tour straight away (from "Watch the 3D tour"). */
  initialTour?: boolean;
}

/** The topic with this slug, when it has a model to open in the studio. */
const withModel = (topics: StudioTopic[], slug: string | null) =>
  topics.find((topic) => topic.slug === slug && topic.model) ?? null;

function firstSession(
  topics: StudioTopic[],
  regions: BodyRegionInfo[],
  initialTopic: string | null,
): Session {
  const first = withModel(topics, initialTopic);
  const region =
    regions.find((item) => topics.some((other) => other.regions.includes(item.id)))?.id ??
    'upper-limb';
  const pen = PENS[0]?.colour ?? '--color-pen-ink';
  return startSession(first, region, pen, loadStrokes(first?.slug ?? BODY_KEY));
}

/** The studio's state and every action on it; the side effects (saving, the address) live here. */
function useStudio({
  topics,
  regions,
  body,
  initialTopic,
  initialTour = false,
}: Readonly<StudioProps>) {
  const router = useRouter();
  const [session, setSession] = useState<Session>(() =>
    firstSession(topics, regions, initialTopic),
  );
  const [settings, setSettings] = useState<StudioSettings>(loadSettings);
  const [touring, setTouring] = useState(initialTour && withModel(topics, initialTopic) !== null);
  // The X-ray film showing in place of the model, by its place in the topic's films.
  const [film, setFilm] = useState<number | null>(null);
  const topic = withModel(topics, session.topicSlug);
  const structures = useMemo(() => (topic ? structuresOf(topic) : []), [topic]);
  const context = { topic, regions, pool: structures.map((structure) => structure.id) };
  const update = (patch: Partial<Session>) => setSession({ ...session, ...patch });
  const slug = topic?.slug ?? BODY_KEY;
  const nameOf = (id: string | null) =>
    structures.find((structure) => structure.id === id)?.name ?? 'something else';

  return {
    session,
    setSession,
    update,
    touring,
    setTouring,
    film,
    setFilm,
    films: topic ? filmsFor(topic.slug) : [],
    settings,
    changeSettings: (next: StudioSettings) => {
      setSettings(next);
      saveSettings(next);
    },
    topic,
    model: topic?.model ?? body,
    structures,
    context,
    nameOf,
    openTopic: (next: string | null) => {
      setTouring(false);
      setFilm(null);
      const opened = withModel(topics, next);
      setSession(openTopicIn(session, opened, loadStrokes(opened?.slug ?? BODY_KEY)));
      // The address follows the open topic, so it can be shared or reopened.
      window.history.replaceState(null, '', opened ? `/studio?topic=${opened.slug}` : '/studio');
    },
    pick: (id: string | null) => {
      const next = pickIn(session, id, context);
      const best = next.quiz?.best ?? 0;
      if (best > (session.quiz?.best ?? 0)) saveBest(slug, best);
      setSession(next);
    },
    /** Picks a structure from a list, closing the sheet the list was in. */
    choose: (id: string) => setSession({ ...pickIn(session, id, context), panel: null }),
    /** Picks a structure of the body found by name, and turns the camera to it. */
    find: (id: string) => setSession(findOnBody(session, id)),
    togglePanel: (panel: Exclude<Panel, null>) =>
      update({ panel: session.panel === panel ? null : panel }),
    changeMode: (mode: Mode) =>
      setSession(changeModeIn(session, mode, context, topic ? loadBest(slug) : 0)),
    playAgain: () => update({ quiz: startQuiz(context.pool, loadBest(slug)) }),
    keepStrokes: (strokes: Stroke[]) => {
      update({ strokes });
      saveStrokes(slug, strokes);
    },
    hide: (id: string) =>
      update({ hiddenIds: toggled(session.hiddenIds, id), selected: null, isolate: false }),
    resetView: () => update({ reset: session.reset + 1 }),
    back: () => {
      if (window.history.length > 1) router.back();
      else router.push('/today');
    },
  };
}

type StudioState = ReturnType<typeof useStudio>;

/** Characters read in a second, for how long a caption stays when it is not read aloud. */
const READ_PER_SECOND = 15;
const MIN_STOP_MS = 5000;
/** A breath after a view is read aloud, before the camera moves on. */
const PAUSE_MS = 1200;

/**
 * Plays the guided views as a tour: each view stays long enough to read its caption (or until it
 * has been read aloud), then the camera moves to the next; the tour stops after the last.
 */
function useTour(studio: StudioState) {
  const { touring, setTouring, setSession, session, model, settings } = studio;
  const stop = model.stops[session.stopIndex];
  const last = session.stopIndex >= model.stops.length - 1;
  useEffect(() => {
    if (!touring || !stop) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const next = () => {
      if (last) setTouring(false);
      else setSession((current) => ({ ...current, stopIndex: current.stopIndex + 1 }));
    };
    const text = `${stop.title}. ${stop.description}`;
    const speech = settings.narrate && 'speechSynthesis' in window ? window.speechSynthesis : null;
    if (speech) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        timer = setTimeout(next, PAUSE_MS);
      };
      speech.cancel();
      speech.speak(utterance);
    } else {
      timer = setTimeout(next, Math.max(MIN_STOP_MS, (text.length / READ_PER_SECOND) * 1000));
    }
    return () => {
      clearTimeout(timer);
      speech?.cancel();
    };
  }, [touring, stop, last, settings.narrate, setSession, setTouring]);
}

interface OverlayProps {
  studio: StudioState;
  topics: StudioTopic[];
  tree: LibraryNode[];
  regions: BodyRegionInfo[];
  capable: boolean | null;
}

/**
 * Names on the model: each region's topic count on the whole body, or the picked structure and
 * its path while exploring a topic. None during "Find it", where they would give answers away, or
 * when the student has turned them off.
 */
function labelsFor(
  studio: StudioState,
  topics: StudioTopic[],
  regions: BodyRegionInfo[],
): Viewer3DLabel[] {
  const { session, topic } = studio;
  if (!studio.settings.labels) return [];
  if (!topic) {
    // Like their markers, the region names step aside while a structure of the body is picked.
    if (session.selected?.includes('/')) return [];
    return regions.flatMap((region) => {
      const count = topics.filter((item) => item.regions.includes(region.id)).length;
      return count > 0
        ? [
            {
              id: region.id,
              text: `${region.name} · ${count}`,
              active: region.id === session.region,
            },
          ]
        : [];
    });
  }
  const selected = session.mode === 'explore' ? session.selected : null;
  if (!selected) return [];
  // Only structures on the model: a path also runs through diagram-only steps.
  const others = [...litIn(session, topic)].filter((id) => id !== selected);
  return [selected, ...others]
    .flatMap((id) => {
      const structure = studio.structures.find((item) => item.id === id);
      return structure ? [{ id, text: structure.name, active: id === selected }] : [];
    })
    .slice(0, 4);
}

/** A structure picked on the body while isolating: its system and its own id there. */
function isolatedOnBody(session: Session): [string, string] | null {
  const [system, structure] = session.selected?.split('/') ?? [];
  return session.isolate && system && structure ? [system, structure] : null;
}

/**
 * The body's systems switched on, as layers of the viewer (the skin is in the body file); while
 * isolating, only the picked structure of its system.
 */
function bodyLayers(session: Session) {
  const isolated = isolatedOnBody(session);
  return BODY_SYSTEMS.flatMap((system) => {
    if (!system.src) return [];
    if (isolated) {
      return system.id === isolated[0]
        ? [{ id: system.id, kind: system.kind, src: system.src, only: isolated[1] }]
        : [];
    }
    return session.systems.has(system.id)
      ? [{ id: system.id, kind: system.kind, src: system.src }]
      : [];
  });
}

/**
 * The body file's parts left out: its low-detail skeleton always, the skin when switched off or
 * while a structure is isolated.
 */
function bodyHidden(session: Session): ReadonlySet<string> {
  const skin = session.systems.has('skin') && !isolatedOnBody(session);
  return new Set(skin ? ['skeleton'] : ['skeleton', 'skin']);
}

/** The model filling the studio, with a caption for screen readers. */
function StudioModel({
  studio,
  regions,
  capable,
  labels,
}: Readonly<{
  studio: StudioState;
  regions: BodyRegionInfo[];
  capable: boolean | null;
  labels: Viewer3DLabel[];
}>) {
  const { session, topic, model, update, settings } = studio;
  const systemReducedMotion = useReducedMotion();
  const reducedMotion = settings.smooth === null ? systemReducedMotion : !settings.smooth;
  const lit = useMemo(() => litIn(session, topic), [session, topic]);
  const index = useBodyIndex(topic === null);
  const focus = useMemo(() => {
    const entry = index?.find((item) => item.id === session.focus);
    return entry ? { point: entry.centre, radius: entry.radius } : null;
  }, [index, session.focus]);
  return (
    <figure className="absolute inset-0">
      <ModelView
        capable={capable}
        model={model}
        topic={topic}
        regions={regions}
        region={session.region}
        selected={session.selected}
        lit={lit}
        stopId={model.stops[session.stopIndex]?.id ?? ''}
        hiddenKinds={session.hiddenKinds}
        hidden={topic ? hiddenIn(session, lit, studio.context.pool) : bodyHidden(session)}
        xray={session.xray}
        reducedMotion={reducedMotion}
        pen={session.mode === 'draw' ? session.pen : null}
        strokes={session.strokes}
        labels={labels}
        resetToken={session.reset}
        dpr={pixelRatio(settings.quality)}
        layers={topic ? [] : bodyLayers(session)}
        section={session.section}
        focus={topic ? null : focus}
        flat={settings.flat}
        onPick={studio.pick}
        onRegion={(region: BodyRegion) => update({ region, panel: 'topics' })}
        onStroke={(stroke) => studio.keepStrokes([...session.strokes, stroke])}
      />
      <figcaption className="sr-only">3D model: {topic?.title ?? 'the whole body'}</figcaption>
    </figure>
  );
}

/** The view tools: a column on phones, a row beside the title where docked. */
function Tools({ studio, row }: Readonly<{ studio: StudioState; row: boolean }>) {
  const { session, update } = studio;
  return (
    <ViewTools
      row={row}
      layers={session.panel === 'layers'}
      xray={session.xray}
      films={studio.films.length > 0 ? studio.film !== null : null}
      isolate={session.isolate}
      canIsolate={session.selected !== null}
      section={session.section !== null || session.panel === 'section'}
      settings={session.panel === 'settings'}
      onLayers={() => studio.togglePanel('layers')}
      onXray={() => update({ xray: !session.xray })}
      onFilms={() => studio.setFilm(studio.film === null ? 0 : null)}
      onIsolate={() => update({ isolate: !session.isolate })}
      onSection={() => studio.togglePanel('section')}
      onReset={studio.resetView}
      onSettings={() => studio.togglePanel('settings')}
    />
  );
}

function Guide({ studio }: Readonly<{ studio: StudioState }>) {
  return (
    <GuideCard
      stops={studio.model.stops}
      index={studio.session.stopIndex}
      touring={studio.touring}
      onIndex={(stopIndex) => studio.update({ stopIndex })}
      onTour={() => studio.setTouring(!studio.touring)}
    />
  );
}

/**
 * Search the open topic's structures; on the whole body, the topics with a model and then every
 * structure of the body, each with its system.
 */
function Search({
  studio,
  topics,
  autoFocus = false,
}: Readonly<{ studio: StudioState; topics: StudioTopic[]; autoFocus?: boolean }>) {
  const index = useBodyIndex(studio.topic === null);
  const bodyItems = useMemo(
    () => [
      ...topics
        .filter((topic) => topic.model)
        .map((topic) => ({ id: topic.slug, name: topic.title })),
      ...(index ?? []).map((entry) => {
        const { name, system } = bodyStructure(entry.id);
        return { id: entry.id, name, detail: system?.name };
      }),
    ],
    [topics, index],
  );
  if (studio.topic) {
    return (
      <StructureSearch
        items={studio.structures}
        label="Find a structure"
        autoFocus={autoFocus}
        onPick={studio.choose}
      />
    );
  }
  return (
    <StructureSearch
      items={bodyItems}
      label="Find a structure or topic"
      autoFocus={autoFocus}
      onPick={(id) => (id.includes('/') ? studio.find(id) : studio.openTopic(id))}
    />
  );
}

/** The picked structure's card, while exploring a topic; nothing otherwise. */
function Info({ studio, topics, docked }: Readonly<OverlayProps & { docked: boolean }>) {
  const { session, topic } = studio;
  const selected = session.mode === 'explore' ? session.selected : null;
  const info = topic && selected ? structureInfo(topic, selected, topics) : null;
  if (!info) return null;
  return (
    <InfoCard
      docked={docked}
      info={info}
      detail={session.detail}
      onDetail={(detail) => studio.update({ detail })}
      onHide={() => studio.hide(info.id)}
      onTopic={studio.openTopic}
      onClose={() => studio.pick(null)}
    />
  );
}

/** The layers sheet: the body's systems, or the kinds of structure in the open topic. */
function Layers({ studio }: Readonly<{ studio: StudioState }>) {
  const { session, update, model, topic } = studio;
  if (session.panel !== 'layers') return null;
  const close = () => update({ panel: null });
  if (!topic) {
    return (
      <LayersPanel
        layers={BODY_SYSTEMS.map((system) => ({
          id: system.id,
          name: system.name,
          kind: system.kind,
          on: session.systems.has(system.id),
        }))}
        onToggle={(id) => update({ systems: toggled(session.systems, id) })}
        onClose={close}
      />
    );
  }
  return (
    <LayersPanel
      layers={PART_LAYERS.filter(({ kind }) => model.parts.some((part) => part.kind === kind)).map(
        ({ kind, name }) => ({ id: kind, name, kind, on: !session.hiddenKinds.has(kind) }),
      )}
      hidden={[...session.hiddenIds].map((id) => ({ id, name: studio.nameOf(id) }))}
      onToggle={(kind) => update({ hiddenKinds: toggled(session.hiddenKinds, kind) })}
      onShow={(id) => update({ hiddenIds: toggled(session.hiddenIds, id) })}
      onClose={close}
    />
  );
}

/** The section sheet, while open. */
function Section({ studio }: Readonly<{ studio: StudioState }>) {
  const { session, update } = studio;
  if (session.panel !== 'section') return null;
  return (
    <SectionPanel
      section={session.section}
      onChange={(section) => update({ section })}
      onClose={() => update({ panel: null })}
    />
  );
}

function Settings({ studio }: Readonly<{ studio: StudioState }>) {
  const reducedMotion = useReducedMotion();
  if (studio.session.panel !== 'settings') return null;
  return (
    <SettingsPanel
      settings={studio.settings}
      reducedMotion={reducedMotion}
      canFlat={Boolean(studio.topic?.diagram)}
      onChange={studio.changeSettings}
      onClose={() => studio.update({ panel: null })}
    />
  );
}

/** The topic's X-ray films, over the model, while they are open. */
function Films({ studio }: Readonly<{ studio: StudioState }>) {
  if (studio.film === null) return null;
  return (
    <XrayViewer
      films={studio.films}
      index={studio.film}
      labels={studio.settings.labels}
      onIndex={studio.setFilm}
      onClose={() => studio.setFilm(null)}
    />
  );
}

function Credit({ studio, capable }: Readonly<{ studio: StudioState; capable: boolean | null }>) {
  if (!capable) return null;
  return (
    <Text size="xs" tone="muted" className="pointer-events-auto line-clamp-1">
      {studio.model.credit}
    </Text>
  );
}

function Draw({ studio }: Readonly<{ studio: StudioState }>) {
  const { session } = studio;
  return (
    <DrawBar
      pen={session.pen}
      strokes={session.strokes.length}
      onPen={(pen) => studio.update({ pen })}
      onUndo={() => studio.keepStrokes(session.strokes.slice(0, -1))}
      onClear={() => studio.keepStrokes([])}
      onDone={() => studio.changeMode('explore')}
    />
  );
}

function Quiz({ studio }: Readonly<{ studio: StudioState }>) {
  const { session } = studio;
  if (!session.quiz) return null;
  const quiz = session.quiz;
  return (
    <QuizBar
      quiz={quiz}
      pickedName={studio.nameOf(quiz.picked)}
      onSkip={() => studio.update({ quiz: skipQuiz(quiz, studio.context.pool) })}
      onAgain={studio.playAgain}
      onEnd={() => studio.changeMode('explore')}
    />
  );
}

/** Along the bottom of a phone: the body's regions, "Find it", or the sheet for the topic. */
function PhoneFooter(props: Readonly<OverlayProps>) {
  const { studio, topics, regions, capable } = props;
  const { session, topic } = studio;
  if (!topic && session.selected?.includes('/')) {
    return (
      <BottomSheet>
        <BodyPartCard id={session.selected} onClose={() => studio.pick(null)} />
      </BottomSheet>
    );
  }
  if (!topic) {
    return (
      <div className="flex flex-col gap-2 p-3">
        <BodyBrowser
          topics={topics}
          regions={regions}
          region={session.region}
          onRegion={(region) => studio.update({ region })}
          onTopic={studio.openTopic}
        />
        <Credit studio={studio} capable={capable} />
      </div>
    );
  }
  if (session.mode === 'quiz') {
    return (
      <div className="p-3">
        <Quiz studio={studio} />
      </div>
    );
  }
  const exploring = session.mode === 'explore';
  return (
    <BottomSheet>
      {capable ? <ModeSwitch mode={session.mode} onMode={studio.changeMode} /> : null}
      {session.mode === 'draw' ? <Draw studio={studio} /> : null}
      {exploring && session.selected ? <Info {...props} docked={false} /> : null}
      {exploring && !session.selected ? (
        <TourBar
          stops={studio.model.stops}
          index={session.stopIndex}
          onIndex={(stopIndex) => studio.update({ stopIndex })}
          tour={
            <TourButton
              touring={studio.touring}
              size="md"
              onTour={() => studio.setTouring(!studio.touring)}
            />
          }
        />
      ) : null}
      <Credit studio={studio} capable={capable} />
    </BottomSheet>
  );
}

/** Phones and tablets held upright: everything floats over the model, sheets open on demand. */
function PhoneOverlay(props: Readonly<OverlayProps>) {
  const { studio, topics, tree, regions } = props;
  const { session, topic } = studio;
  const title = topic?.title ?? 'Whole body';
  const quiz = session.mode === 'quiz' ? session.quiz : null;
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
      <div className="flex flex-col gap-3 p-3">
        {quiz ? (
          <>
            <h1 className="sr-only">{title}</h1>
            <QuizProgress quiz={quiz} onEnd={() => studio.changeMode('explore')} />
            <QuizTarget name={studio.nameOf(quiz.targetId)} />
          </>
        ) : (
          <PhoneHeader
            title={title}
            topicOpen={topic !== null}
            onBack={studio.back}
            onTopics={() => studio.togglePanel('topics')}
            onSearch={() => studio.togglePanel('search')}
          />
        )}
      </div>
      {quiz ? null : (
        <div className="absolute top-20 left-3">
          <Tools studio={studio} row={false} />
        </div>
      )}
      <PhoneFooter {...props} />

      {topic && session.panel === 'topics' ? (
        <TopicsPanel
          place="float"
          tree={tree}
          topics={topics}
          regions={regions}
          current={topic.slug}
          onRegion={(region) => studio.update({ region })}
          onTopic={studio.openTopic}
          onClose={() => studio.update({ panel: null })}
        />
      ) : null}
      {studio.film === null ? null : (
        <div className="absolute inset-x-3 top-20 bottom-3 z-20 flex">
          <Films studio={studio} />
        </div>
      )}
      <Layers studio={studio} />
      <Section studio={studio} />
      {session.panel === 'search' ? (
        <SearchSheet label="Search" onClose={() => studio.update({ panel: null })}>
          <Search studio={studio} topics={topics} autoFocus />
        </SearchSheet>
      ) : null}
      <Settings studio={studio} />
    </div>
  );
}

/** Along the bottom where docked: the drawing tools, "Find it", or how to use the model. */
function DockedFooter({ studio, capable }: Readonly<Pick<OverlayProps, 'studio' | 'capable'>>) {
  const { mode } = studio.session;
  return (
    <footer className="flex flex-col gap-2">
      {studio.touring ? (
        <TourCaption
          stops={studio.model.stops}
          index={studio.session.stopIndex}
          onPause={() => studio.setTouring(false)}
        />
      ) : null}
      {mode === 'draw' ? (
        <div className={cx(GLASS, 'pointer-events-auto p-3')}>
          <Draw studio={studio} />
        </div>
      ) : null}
      {mode === 'quiz' ? <Quiz studio={studio} /> : null}
      {mode === 'explore' ? (
        <Text size="xs" tone="muted" className="px-2">
          {studio.topic
            ? 'Drag to turn · scroll to zoom · click a structure'
            : 'Drag to turn · click a structure or a region marker'}
        </Text>
      ) : null}
      <div className="px-2">
        <Credit studio={studio} capable={capable} />
      </div>
    </footer>
  );
}

/** Folds a docked panel away, or brings it back from the edge. */
function Fold({
  side,
  open,
  onToggle,
}: Readonly<{ side: 'left' | 'right'; open: boolean; onToggle: () => void }>) {
  const left = side === 'left';
  let icon = left ? PanelLeftOpen : PanelRightOpen;
  if (open) icon = left ? PanelLeftClose : PanelRightClose;
  const name = left ? 'topics' : 'model panel';
  return (
    <IconButton
      icon={icon}
      label={open ? `Hide the ${name}` : `Show the ${name}`}
      title={open ? `Hide the ${name}` : `Show the ${name}`}
      size="sm"
      variant={open ? 'ghost' : 'secondary'}
      aria-expanded={open}
      className={cx('pointer-events-auto', !open && 'shadow-glass')}
      onClick={onToggle}
    />
  );
}

/** Beside the title where docked: the best streak, the guided views and the view tools. */
function HeaderTools({
  studio,
  folded,
  onUnfold,
}: Readonly<{ studio: StudioState; folded: boolean; onUnfold: () => void }>) {
  const { topic } = studio;
  return (
    <>
      {topic ? <BestCard best={loadBest(topic.slug)} /> : null}
      <Guide studio={studio} />
      <Tools studio={studio} row />
      {folded ? <Fold side="right" open={false} onToggle={onUnfold} /> : null}
    </>
  );
}

/**
 * Tablets held sideways and laptops: the topics docked on the left, the model in the middle, and
 * on the right what the student is looking at (a topic's modes and picked structure, or a
 * structure picked on the body). Either side folds away to give the model room. By the view tools
 * sit the best "Find it" streak and the guided views; layers and settings open from the tools.
 */
function DockedOverlay(props: Readonly<OverlayProps>) {
  const { studio, topics, tree, regions, capable } = props;
  const { session, topic } = studio;
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(true);
  const quiz = session.mode === 'quiz' ? session.quiz : null;
  // On the whole body the right panel opens only for a structure picked on it.
  const picked = !topic && session.selected?.includes('/') ? session.selected : null;
  const side = topic !== null || picked !== null;
  return (
    <div className="pointer-events-none absolute inset-0 flex gap-4 p-4">
      {left ? (
        <TopicsPanel
          place="dock"
          tree={tree}
          topics={topics}
          regions={regions}
          current={topic?.slug ?? null}
          search={quiz ? undefined : <Search studio={studio} topics={topics} />}
          action={<Fold side="left" open onToggle={() => setLeft(false)} />}
          onRegion={(region) => studio.update({ region })}
          onTopic={studio.openTopic}
          onClose={() => studio.update({ panel: null })}
        />
      ) : (
        <div className="self-start">
          <Fold side="left" open={false} onToggle={() => setLeft(true)} />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex flex-col gap-3">
          <DockedHeader
            title={topic?.title ?? 'Whole body'}
            tools={
              quiz ? null : (
                <HeaderTools
                  studio={studio}
                  folded={side && !right}
                  onUnfold={() => setRight(true)}
                />
              )
            }
          />
          {quiz ? (
            <div className="pointer-events-auto flex flex-col gap-3">
              <QuizProgress quiz={quiz} onEnd={() => studio.changeMode('explore')} />
              <QuizTarget name={studio.nameOf(quiz.targetId)} />
            </div>
          ) : null}
        </div>
        <Films studio={studio} />
        <DockedFooter studio={studio} capable={capable} />
      </div>
      {side && right ? (
        <aside
          aria-label="About the model"
          className={cx(
            GLASS,
            'pointer-events-auto flex w-sheet shrink-0 flex-col gap-4 overflow-x-hidden overflow-y-auto p-4',
          )}
        >
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              {topic && capable ? (
                <ModeSwitch mode={session.mode} onMode={studio.changeMode} />
              ) : null}
            </div>
            <Fold side="right" open onToggle={() => setRight(false)} />
          </div>
          {topic && session.mode === 'explore' && !session.selected ? (
            <Text size="sm" tone="muted">
              Tap a structure on the model, or find it by name, to see what it is.
            </Text>
          ) : null}
          {picked ? (
            <BodyPartCard id={picked} onClose={() => studio.pick(null)} />
          ) : (
            <Info {...props} docked />
          )}
        </aside>
      ) : null}
      <Layers studio={studio} />
      <Section studio={studio} />
      <Settings studio={studio} />
    </div>
  );
}

/**
 * The 3D studio: one model filling the screen, with everything else floating over it. Pick a
 * region on the body or a topic; turn, light, hide and x-ray structures; draw on the model; or
 * play "Find it". Tablets held sideways and laptops keep the topics docked on the left and the
 * structure and layers on the right. On a phone a topic fills the whole screen, with a back
 * button in place of the tab bar. Phones that cannot show 3D get the flat diagram.
 */
export function Studio(props: Readonly<StudioProps>) {
  const { topics, tree, regions } = props;
  const capable = useCan3D();
  const docked = useDocked();
  const studio = useStudio(props);
  useTour(studio);
  const Overlay = docked ? DockedOverlay : PhoneOverlay;
  return (
    <section
      aria-label="3D studio"
      className={cx(
        'relative overflow-hidden md:h-dvh',
        studio.topic ? 'h-dvh max-md:fixed max-md:inset-0 max-md:z-40 max-md:bg-sky' : 'h-studio',
      )}
    >
      <StudioModel
        studio={studio}
        regions={regions}
        capable={capable}
        labels={labelsFor(studio, topics, regions)}
      />
      <Overlay studio={studio} topics={topics} tree={tree} regions={regions} capable={capable} />
    </section>
  );
}
