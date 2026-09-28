'use client';

import type { BodyRegion, Model3D, PartKind } from '@medlearn/schemas';
import { cx, Text } from '@medlearn/ui';
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
import { ModelView, StudioHeader } from './stage';
import { useCan3D, useDocked, useReducedMotion } from './viewer';

const PART_KINDS: PartKind[] = ['bone', 'muscle', 'artery', 'vein'];
const GLASS = 'rounded-xl border border-glass-border bg-glass shadow-glass backdrop-blur-md';
const BODY_KEY = 'body';

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
export function Studio({ topics, regions, body, initialTopic }: Readonly<StudioProps>) {
  const capable = useCan3D();
  const reducedMotion = useReducedMotion();
  const docked = useDocked();
  const withModel = (slug: string | null) =>
    topics.find((topic) => topic.slug === slug && topic.model) ?? null;

  const [session, setSession] = useState<Session>(() => {
    const first = withModel(initialTopic);
    const region =
      regions.find((item) => topics.some((other) => other.regions.includes(item.id)))?.id ??
      'upper-limb';
    const pen = PENS[0]?.colour ?? '--color-pen-ink';
    return startSession(first, region, pen, loadStrokes(first?.slug ?? BODY_KEY));
  });
  const topic = withModel(session.topicSlug);
  const model = topic?.model ?? body;
  const structures = useMemo(() => (topic ? structuresOf(topic) : []), [topic]);
  const context = { topic, regions, pool: structures.map((structure) => structure.id) };
  const lit = useMemo(() => litIn(session, topic), [session, topic]);
  const info =
    topic && session.selected && session.mode === 'explore'
      ? structureInfo(topic, session.selected, topics)
      : null;
  const update = (patch: Partial<Session>) => setSession({ ...session, ...patch });

  const openTopic = (slug: string | null) => {
    const next = withModel(slug);
    setSession(openTopicIn(session, next, loadStrokes(next?.slug ?? BODY_KEY)));
    // The address follows the open topic, so it can be shared or reopened.
    window.history.replaceState(null, '', next ? `/studio?topic=${next.slug}` : '/studio');
  };
  const pick = (id: string | null) => {
    const next = pickIn(session, id, context);
    if (topic && next.quiz && next.quiz.best > (session.quiz?.best ?? 0)) {
      saveBest(topic.slug, next.quiz.best);
    }
    setSession(next);
  };
  const changeMode = (mode: Mode) =>
    setSession(changeModeIn(session, mode, context, topic ? loadBest(topic.slug) : 0));
  const keepStrokes = (strokes: Stroke[]) => {
    update({ strokes });
    saveStrokes(topic?.slug ?? BODY_KEY, strokes);
  };

  const modes = topic !== null && capable === true;
  const layers = (place: Place) =>
    topic ? (
      <LayersPanel
        place={place}
        kinds={PART_KINDS.filter((kind) => model.parts.some((part) => part.kind === kind))}
        structures={structures}
        showStructures={session.mode !== 'quiz'}
        hiddenKinds={session.hiddenKinds}
        hiddenIds={session.hiddenIds}
        xray={session.xray}
        isolate={session.isolate}
        selected={session.selected}
        onKind={(kind) => update({ hiddenKinds: toggled(session.hiddenKinds, kind) })}
        // Picking from the list closes the panel to make room for the structure's card.
        onStructure={(id) => setSession({ ...pickIn(session, id, context), panel: null })}
        onHide={(id) => update({ hiddenIds: toggled(session.hiddenIds, id) })}
        onXray={(xray) => update({ xray })}
        onIsolate={(isolate) => update({ isolate })}
        onClose={() => update({ panel: null })}
      />
    ) : null;
  const infoCard = info ? (
    <InfoCard
      docked={docked}
      info={info}
      expanded={session.expanded}
      onExpand={() => update({ expanded: true })}
      onTopic={openTopic}
      onClose={() => pick(null)}
    />
  ) : null;

  return (
    // Edge to edge: the model is the screen, and everything else floats over it.
    <section aria-label="3D studio" className="relative h-studio overflow-hidden md:h-dvh">
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
          hidden={hiddenIn(session, lit, context.pool)}
          xray={session.xray}
          reducedMotion={reducedMotion}
          pen={session.mode === 'draw' ? session.pen : null}
          strokes={session.strokes}
          onPick={pick}
          onRegion={(region: BodyRegion) => update({ region, panel: 'topics' })}
          onStroke={(stroke) => keepStrokes([...session.strokes, stroke])}
        />
        <figcaption className="sr-only">3D model: {topic?.title ?? 'the whole body'}</figcaption>
      </figure>

      <div className="pointer-events-none absolute inset-0 flex gap-4 p-3 xl:p-4">
        {docked || session.panel === 'topics' ? (
          <TopicsPanel
            place={docked ? 'dock' : 'float'}
            topics={topics}
            regions={regions}
            region={session.region}
            current={topic?.slug ?? null}
            onRegion={(region) => update({ region })}
            onTopic={openTopic}
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
          <footer className="flex flex-col gap-2">
            {docked ? null : infoCard}
            <div
              className={cx(
                GLASS,
                'pointer-events-auto flex flex-col gap-2 p-2 md:mx-auto md:w-full md:max-w-2xl',
              )}
            >
              {modes && !docked ? <ModeSwitch mode={session.mode} onMode={changeMode} /> : null}
              <ModeBar
                session={session}
                model={model}
                topicOpen={topic !== null}
                regions={regions}
                regionCount={topics.filter((item) => item.regions.includes(session.region)).length}
                nameOf={(id) =>
                  structures.find((structure) => structure.id === id)?.name ?? 'something else'
                }
                onTopics={docked ? undefined : () => update({ panel: 'topics' })}
                onPen={(pen) => update({ pen })}
                onStrokes={keepStrokes}
                onSkip={(quiz) => update({ quiz: skipQuiz(quiz, context.pool) })}
                onMode={changeMode}
                onStop={(stopIndex) => update({ stopIndex })}
              />
            </div>
            {capable ? (
              <Text size="xs" tone="muted" className="pointer-events-auto line-clamp-1 px-2">
                {model.credit}
              </Text>
            ) : null}
          </footer>
        </div>

        {docked && topic ? (
          <aside
            aria-label="About the model"
            className={cx(
              GLASS,
              'pointer-events-auto flex w-sheet shrink-0 flex-col gap-6 overflow-y-auto p-4',
            )}
          >
            {modes ? <ModeSwitch mode={session.mode} onMode={changeMode} /> : null}
            {infoCard ??
              (session.mode === 'explore' ? (
                <Text size="sm" tone="muted">
                  Tap a structure on the model to see what it is.
                </Text>
              ) : null)}
            {layers('inline')}
          </aside>
        ) : null}
        {!docked && session.panel === 'layers' ? layers('float') : null}
      </div>
    </section>
  );
}

/** The bottom bar for what the student is doing: the body, drawing, "Find it" or the tour. */
function ModeBar({
  session,
  model,
  topicOpen,
  regions,
  regionCount,
  nameOf,
  onTopics,
  onPen,
  onStrokes,
  onSkip,
  onMode,
  onStop,
}: Readonly<{
  session: Session;
  model: Model3D;
  topicOpen: boolean;
  regions: BodyRegionInfo[];
  regionCount: number;
  nameOf: (id: string | null) => string;
  onTopics: (() => void) | undefined;
  onPen: (pen: string) => void;
  onStrokes: (strokes: Stroke[]) => void;
  onSkip: (quiz: NonNullable<Session['quiz']>) => void;
  onMode: (mode: Mode) => void;
  onStop: (index: number) => void;
}>) {
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
