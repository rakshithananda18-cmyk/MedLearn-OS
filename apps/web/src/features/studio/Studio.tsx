'use client';

import type { BodyRegion, Model3D, PartKind } from '@medlearn/schemas';
import type { Stroke } from '@medlearn/visuals/viewer3d';
import { useMemo, useState } from 'react';

import type { BodyRegionInfo } from '@/content/body';

import { BodyBar, DrawBar, ModeSwitch, PENS, QuizBar, TourBar } from './bars';
import { structureInfo, structuresOf, type StudioTopic } from './knowledge';
import { InfoCard, LayersPanel, type Place, TopicsPanel } from './panels';
import { skipQuiz } from './quiz';
import { loadBest, loadStrokes, saveBest, saveStrokes } from './saved';
import {
  changeModeIn,
  hiddenIn,
  litIn,
  type Mode,
  openTopicIn,
  pickIn,
  type Session,
  startSession,
  toggled,
} from './session';
import { DockedSide, ModelView, StudioFooter, StudioHeader } from './stage';
import { useCan3D, useDocked, useReducedMotion } from './viewer';

const PART_KINDS: PartKind[] = ['bone', 'muscle', 'artery', 'vein'];
const BODY_KEY = 'body';

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

export interface StudioProps {
  topics: StudioTopic[];
  regions: BodyRegionInfo[];
  /** The whole body, shown when no topic is open. */
  body: Model3D;
  initialTopic: string | null;
}

/**
 * The 3D studio: one model filling the screen, with everything else floating over it. Pick a
 * region on the body or a topic on the left; turn, light, hide and x-ray structures; draw on the
 * model; or play "Find it". Tablets held sideways and laptops keep the topics docked on the left
 * and the structure and layers on the right. Phones that cannot show 3D get the flat diagram.
 */
/** The studio's state and every action on it; the side effects (saving, the address) live here. */
function useStudio({ topics, regions, body, initialTopic }: Readonly<StudioProps>) {
  const [session, setSession] = useState<Session>(() =>
    firstSession(topics, regions, initialTopic),
  );
  const topic = withModel(topics, session.topicSlug);
  const structures = useMemo(() => (topic ? structuresOf(topic) : []), [topic]);
  const context = { topic, regions, pool: structures.map((structure) => structure.id) };
  const update = (patch: Partial<Session>) => setSession({ ...session, ...patch });
  const slug = topic?.slug ?? BODY_KEY;

  return {
    session,
    setSession,
    update,
    topic,
    model: topic?.model ?? body,
    structures,
    context,
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
    changeMode: (mode: Mode) =>
      setSession(changeModeIn(session, mode, context, topic ? loadBest(slug) : 0)),
    keepStrokes: (strokes: Stroke[]) => {
      update({ strokes });
      saveStrokes(slug, strokes);
    },
  };
}

type StudioState = ReturnType<typeof useStudio>;

/** The model filling the studio, with a caption for screen readers. */
function StudioModel({
  studio,
  regions,
  capable,
}: Readonly<{ studio: StudioState; regions: BodyRegionInfo[]; capable: boolean | null }>) {
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
        onPick={studio.pick}
        onRegion={(region: BodyRegion) => update({ region, panel: 'topics' })}
        onStroke={(stroke) => studio.keepStrokes([...session.strokes, stroke])}
      />
      <figcaption className="sr-only">3D model: {topic?.title ?? 'the whole body'}</figcaption>
    </figure>
  );
}

/** The layers of the open topic's model, floating or inside the docked panel. */
function StudioLayers({ studio, place }: Readonly<{ studio: StudioState; place: Place }>) {
  const { session, update, model } = studio;
  return (
    <LayersPanel
      place={place}
      kinds={PART_KINDS.filter((kind) => model.parts.some((part) => part.kind === kind))}
      structures={studio.structures}
      showStructures={session.mode !== 'quiz'}
      hiddenKinds={session.hiddenKinds}
      hiddenIds={session.hiddenIds}
      xray={session.xray}
      isolate={session.isolate}
      selected={session.selected}
      onKind={(kind) => update({ hiddenKinds: toggled(session.hiddenKinds, kind) })}
      // Picking from the list closes the panel to make room for the structure's card.
      onStructure={(id) =>
        studio.setSession({ ...pickIn(session, id, studio.context), panel: null })
      }
      onHide={(id) => update({ hiddenIds: toggled(session.hiddenIds, id) })}
      onXray={(xray) => update({ xray })}
      onIsolate={(isolate) => update({ isolate })}
      onClose={() => update({ panel: null })}
    />
  );
}

/**
 * The 3D studio: one model filling the screen, with everything else floating over it. Pick a
 * region on the body or a topic on the left; turn, light, hide and x-ray structures; draw on the
 * model; or play "Find it". Tablets held sideways and laptops keep the topics docked on the left
 * and the structure and layers on the right. Phones that cannot show 3D get the flat diagram.
 */
export function Studio(props: Readonly<StudioProps>) {
  const { topics, regions } = props;
  const capable = useCan3D();
  const docked = useDocked();
  const studio = useStudio(props);
  const { session, topic, update } = studio;
  const selected = topic && session.mode === 'explore' ? session.selected : null;
  const info = topic && selected ? structureInfo(topic, selected, topics) : null;
  const switcher =
    topic && capable ? <ModeSwitch mode={session.mode} onMode={studio.changeMode} /> : null;
  const infoCard = info ? (
    <InfoCard
      docked={docked}
      info={info}
      expanded={session.expanded}
      onExpand={() => update({ expanded: true })}
      onTopic={studio.openTopic}
      onClose={() => studio.pick(null)}
    />
  ) : null;
  const layers = topic ? (
    <StudioLayers studio={studio} place={docked ? 'inline' : 'float'} />
  ) : null;

  return (
    // Edge to edge: the model is the screen, and everything else floats over it.
    <section aria-label="3D studio" className="relative h-studio overflow-hidden md:h-dvh">
      <StudioModel studio={studio} regions={regions} capable={capable} />

      <div className="pointer-events-none absolute inset-0 flex gap-4 p-3 xl:p-4">
        {docked || session.panel === 'topics' ? (
          <TopicsPanel
            place={docked ? 'dock' : 'float'}
            topics={topics}
            regions={regions}
            region={session.region}
            current={topic?.slug ?? null}
            onRegion={(region) => update({ region })}
            onTopic={studio.openTopic}
            onClose={() => update({ panel: null })}
          />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
          <StudioHeader
            title={topic?.title ?? 'Whole body'}
            panel={session.panel}
            docked={docked}
            tools={topic !== null}
            onPanel={(panel) => update({ panel })}
          />
          <StudioFooter
            docked={docked}
            info={infoCard}
            switcher={switcher}
            credit={capable ? studio.model.credit : null}
          >
            <ModeBar
              studio={studio}
              regions={regions}
              regionCount={topics.filter((item) => item.regions.includes(session.region)).length}
              onTopics={docked ? undefined : () => update({ panel: 'topics' })}
            />
          </StudioFooter>
        </div>

        {docked ? (
          <DockedSide switcher={switcher} info={infoCard} hint={session.mode === 'explore'}>
            {layers}
          </DockedSide>
        ) : null}
        {session.panel === 'layers' && !docked ? layers : null}
      </div>
    </section>
  );
}

/** The bottom bar for what the student is doing: the body, drawing, "Find it" or the tour. */
function ModeBar({
  studio,
  regions,
  regionCount,
  onTopics,
}: Readonly<{
  studio: StudioState;
  regions: BodyRegionInfo[];
  regionCount: number;
  onTopics: (() => void) | undefined;
}>) {
  const { session, model, update, changeMode: onMode } = studio;
  const nameOf = (id: string | null) =>
    studio.structures.find((structure) => structure.id === id)?.name ?? 'something else';
  const onStrokes = studio.keepStrokes;
  const onPen = (pen: string) => update({ pen });
  const onSkip = (quiz: NonNullable<Session['quiz']>) =>
    update({ quiz: skipQuiz(quiz, studio.context.pool) });
  const onStop = (stopIndex: number) => update({ stopIndex });
  const topicOpen = studio.topic !== null;
  const { mode, quiz, strokes } = session;
  if (!topicOpen) {
    const region = regions.find((item) => item.id === session.region);
    return <BodyBar region={region?.name ?? ''} count={regionCount} onTopics={onTopics} />;
  }
  if (mode === 'draw') {
    return (
      <DrawBar
        pen={session.pen}
        strokes={strokes.length}
        onPen={onPen}
        onUndo={() => onStrokes(strokes.slice(0, -1))}
        onClear={() => onStrokes([])}
        onDone={() => onMode('draw')}
      />
    );
  }
  if (mode === 'quiz' && quiz) {
    return (
      <QuizBar
        quiz={quiz}
        targetName={nameOf(quiz.targetId)}
        pickedName={nameOf(quiz.picked)}
        onSkip={() => onSkip(quiz)}
        onEnd={() => onMode('quiz')}
      />
    );
  }
  return <TourBar stops={model.stops} index={session.stopIndex} onIndex={onStop} />;
}
