'use client';

import type { BodyRegion, Model3D, PartKind } from '@medlearn/schemas';
import { cx, Text } from '@medlearn/ui';
import type { Stroke, Viewer3DLabel } from '@medlearn/visuals/viewer3d';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import type { BodyRegionInfo } from '@/content/body';

import {
  DrawBar,
  GuidedViews,
  ModeSwitch,
  PENS,
  QuizBar,
  QuizProgress,
  QuizTarget,
  TourBar,
} from './bars';
import { structureInfo, structuresOf, type StudioTopic } from './knowledge';
import {
  BodyBrowser,
  GLASS,
  InfoCard,
  LayersPanel,
  type Place,
  SearchSheet,
  StructureSearch,
  TopicsPanel,
} from './panels';
import { skipQuiz, startQuiz } from './quiz';
import { loadBest, loadStrokes, saveBest, saveStrokes } from './saved';
import {
  changeModeIn,
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
import { BottomSheet, DockedHeader, ModelView, PhoneHeader, ViewTools } from './stage';
import { useCan3D, useDocked, useReducedMotion } from './viewer';

const PART_KINDS: PartKind[] = ['bone', 'muscle', 'artery', 'vein'];
const BODY_KEY = 'body';

export interface StudioProps {
  topics: StudioTopic[];
  regions: BodyRegionInfo[];
  /** The whole body, shown when no topic is open. */
  body: Model3D;
  initialTopic: string | null;
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
function useStudio({ topics, regions, body, initialTopic }: Readonly<StudioProps>) {
  const router = useRouter();
  const [session, setSession] = useState<Session>(() =>
    firstSession(topics, regions, initialTopic),
  );
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
    topic,
    model: topic?.model ?? body,
    structures,
    context,
    nameOf,
    openTopic: (next: string | null) => {
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

interface OverlayProps {
  studio: StudioState;
  topics: StudioTopic[];
  regions: BodyRegionInfo[];
  capable: boolean | null;
}

/**
 * Names on the model: each region's topic count on the whole body, or the picked structure and
 * its path while exploring a topic. None during "Find it", where they would give answers away.
 */
function labelsFor(
  studio: StudioState,
  topics: StudioTopic[],
  regions: BodyRegionInfo[],
): Viewer3DLabel[] {
  const { session, topic } = studio;
  if (!topic) {
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
  const others = [...litIn(session, topic)].filter((id) => id !== selected);
  return [selected, ...others].slice(0, 4).map((id) => ({
    id,
    text: studio.nameOf(id),
    active: id === selected,
  }));
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
  const { session, topic, model, update } = studio;
  const reducedMotion = useReducedMotion();
  const lit = useMemo(() => litIn(session, topic), [session, topic]);
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
        hidden={hiddenIn(session, lit, studio.context.pool)}
        xray={session.xray}
        reducedMotion={reducedMotion}
        pen={session.mode === 'draw' ? session.pen : null}
        strokes={session.strokes}
        labels={labels}
        resetToken={session.reset}
        onPick={studio.pick}
        onRegion={(region: BodyRegion) => update({ region, panel: 'topics' })}
        onStroke={(stroke) => studio.keepStrokes([...session.strokes, stroke])}
      />
      <figcaption className="sr-only">3D model: {topic?.title ?? 'the whole body'}</figcaption>
    </figure>
  );
}

/** The view tools, for the open topic or (just the reset) for the whole body. */
function Tools({ studio, row }: Readonly<{ studio: StudioState; row: boolean }>) {
  const { session, topic, update } = studio;
  return (
    <ViewTools
      row={row}
      // Docked panels already show the layers, and the whole body has none.
      layers={topic && !row ? session.panel === 'layers' : null}
      xray={topic ? session.xray : null}
      isolate={session.isolate}
      canIsolate={session.selected !== null}
      onLayers={() => studio.togglePanel('layers')}
      onXray={() => update({ xray: !session.xray })}
      onIsolate={() => update({ isolate: !session.isolate })}
      onReset={studio.resetView}
    />
  );
}

function Guide({ studio }: Readonly<{ studio: StudioState }>) {
  return (
    <GuidedViews
      stops={studio.model.stops}
      index={studio.session.stopIndex}
      onIndex={(stopIndex) => studio.update({ stopIndex })}
    />
  );
}

/** Search the open topic's structures, or the topics with a model on the whole body. */
function Search({
  studio,
  topics,
  autoFocus = false,
}: Readonly<{ studio: StudioState; topics: StudioTopic[]; autoFocus?: boolean }>) {
  const items = studio.topic
    ? studio.structures
    : topics.filter((topic) => topic.model).map((topic) => ({ id: topic.slug, name: topic.title }));
  return (
    <StructureSearch
      items={items}
      label={studio.topic ? 'Find a structure' : 'Find a topic'}
      autoFocus={autoFocus}
      onPick={studio.topic ? studio.choose : studio.openTopic}
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

function Layers({ studio, place }: Readonly<{ studio: StudioState; place: Place }>) {
  const { session, update, model } = studio;
  return (
    <LayersPanel
      place={place}
      kinds={PART_KINDS.filter((kind) => model.parts.some((part) => part.kind === kind))}
      hiddenKinds={session.hiddenKinds}
      hidden={[...session.hiddenIds].map((id) => ({ id, name: studio.nameOf(id) }))}
      onKind={(kind) => update({ hiddenKinds: toggled(session.hiddenKinds, kind) })}
      onShow={(id) => update({ hiddenIds: toggled(session.hiddenIds, id) })}
      onClose={() => update({ panel: null })}
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
        />
      ) : null}
      <Credit studio={studio} capable={capable} />
    </BottomSheet>
  );
}

/** Phones and tablets held upright: everything floats over the model, sheets open on demand. */
function PhoneOverlay(props: Readonly<OverlayProps>) {
  const { studio, topics, regions } = props;
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
            tools={<Tools studio={studio} row />}
            onBack={studio.back}
            onTopics={() => studio.togglePanel('topics')}
            onSearch={() => studio.togglePanel('search')}
          />
        )}
      </div>
      {topic && !quiz ? (
        <div className="absolute top-20 left-3">
          <Tools studio={studio} row={false} />
        </div>
      ) : null}
      <PhoneFooter {...props} />

      {topic && session.panel === 'topics' ? (
        <TopicsPanel
          place="float"
          topics={topics}
          regions={regions}
          region={session.region}
          current={topic.slug}
          guide={<Guide studio={studio} />}
          best={loadBest(topic.slug)}
          onRegion={(region) => studio.update({ region })}
          onTopic={studio.openTopic}
          onClose={() => studio.update({ panel: null })}
        />
      ) : null}
      {topic && session.panel === 'layers' ? <Layers studio={studio} place="float" /> : null}
      {session.panel === 'search' ? (
        <SearchSheet label="Search" onClose={() => studio.update({ panel: null })}>
          <Search studio={studio} topics={topics} autoFocus />
        </SearchSheet>
      ) : null}
    </div>
  );
}

/** Along the bottom where docked: the drawing tools, "Find it", or how to use the model. */
function DockedFooter({ studio, capable }: Readonly<Omit<OverlayProps, 'topics' | 'regions'>>) {
  const { mode } = studio.session;
  return (
    <footer className="flex flex-col gap-2">
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
            : 'Drag to turn · click a marker to pick a region'}
        </Text>
      ) : null}
      <div className="px-2">
        <Credit studio={studio} capable={capable} />
      </div>
    </footer>
  );
}

/**
 * Tablets held sideways and laptops: the topics docked on the left, the picked structure and
 * the layers on the right, the model in between.
 */
function DockedOverlay(props: Readonly<OverlayProps>) {
  const { studio, topics, regions, capable } = props;
  const { session, topic } = studio;
  const quiz = session.mode === 'quiz' ? session.quiz : null;
  return (
    <div className="pointer-events-none absolute inset-0 flex gap-4 p-4">
      <TopicsPanel
        place="dock"
        topics={topics}
        regions={regions}
        region={session.region}
        current={topic?.slug ?? null}
        search={quiz ? undefined : <Search studio={studio} topics={topics} />}
        guide={<Guide studio={studio} />}
        best={topic ? loadBest(topic.slug) : null}
        onRegion={(region) => studio.update({ region })}
        onTopic={studio.openTopic}
        onClose={() => studio.update({ panel: null })}
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex flex-col gap-3">
          <DockedHeader
            title={topic?.title ?? 'Whole body'}
            tools={quiz ? null : <Tools studio={studio} row />}
          />
          {quiz ? (
            <div className="pointer-events-auto flex flex-col gap-3">
              <QuizProgress quiz={quiz} onEnd={() => studio.changeMode('explore')} />
              <QuizTarget name={studio.nameOf(quiz.targetId)} />
            </div>
          ) : null}
        </div>
        <DockedFooter studio={studio} capable={capable} />
      </div>
      {topic ? (
        <aside
          aria-label="About the model"
          className={cx(
            GLASS,
            'pointer-events-auto flex w-sheet shrink-0 flex-col gap-6 overflow-y-auto p-4',
          )}
        >
          {capable ? <ModeSwitch mode={session.mode} onMode={studio.changeMode} /> : null}
          {session.mode === 'explore' && !session.selected ? (
            <Text size="sm" tone="muted">
              Tap a structure on the model, or find it by name, to see what it is.
            </Text>
          ) : null}
          <Info {...props} docked />
          <Layers studio={studio} place="inline" />
        </aside>
      ) : null}
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
  const { topics, regions } = props;
  const capable = useCan3D();
  const docked = useDocked();
  const studio = useStudio(props);
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
      <Overlay studio={studio} topics={topics} regions={regions} capable={capable} />
    </section>
  );
}
