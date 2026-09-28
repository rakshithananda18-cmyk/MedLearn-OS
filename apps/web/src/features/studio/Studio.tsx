'use client';

import type { BodyRegion, Model3D, PartKind } from '@medlearn/schemas';
import { cx, IconButton, Skeleton, Text } from '@medlearn/ui';
import { Layers, Menu, PenLine, Target } from '@medlearn/ui/icons';
import { pathThrough, PathTracer } from '@medlearn/visuals';
import type { Stroke } from '@medlearn/visuals/viewer3d';
import { useMemo, useState } from 'react';

import type { BodyRegionInfo } from '@/content/body';

import { BodyBar, DrawBar, PENS, QuizBar, TourBar } from './bars';
import { BodyOutline } from './BodyOutline';
import { structureInfo, structuresOf, type StudioTopic } from './knowledge';
import { InfoCard, LayersPanel, TopicsPanel } from './panels';
import { answerQuiz, type QuizState, skipQuiz, startQuiz } from './quiz';
import { loadBest, loadStrokes, saveBest, saveStrokes } from './saved';
import { useCan3D, useReducedMotion, Viewer3D } from './viewer';

const PART_KINDS: PartKind[] = ['bone', 'muscle', 'artery', 'vein'];
const BODY_KEY = 'body';

type Mode = 'explore' | 'draw' | 'quiz';
type Panel = 'topics' | 'layers' | null;

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
 * model; or play "Find it". Phones that cannot show 3D get the flat diagram instead.
 */
export function Studio({ topics, regions, body, initialTopic }: Readonly<StudioProps>) {
  const capable = useCan3D();
  const reducedMotion = useReducedMotion();
  const withModel = (slug: string | null) =>
    topics.find((topic) => topic.slug === slug && topic.model) ?? null;

  const [topicSlug, setTopicSlug] = useState(withModel(initialTopic)?.slug ?? null);
  const topic = withModel(topicSlug);
  const model = topic?.model ?? body;
  const [region, setRegion] = useState<BodyRegion>(
    topic?.regions[0] ??
      regions.find((item) => topics.some((other) => other.regions.includes(item.id)))?.id ??
      'upper-limb',
  );
  const [panel, setPanel] = useState<Panel>(topic ? null : 'topics');
  const [mode, setMode] = useState<Mode>('explore');
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [stopIndex, setStopIndex] = useState(0);
  const [hiddenKinds, setHiddenKinds] = useState<ReadonlySet<PartKind>>(new Set());
  const [hiddenIds, setHiddenIds] = useState<ReadonlySet<string>>(new Set());
  const [xray, setXray] = useState(false);
  const [isolate, setIsolate] = useState(false);
  const [pen, setPen] = useState(PENS[0]?.colour ?? '--color-pen-ink');
  const [strokes, setStrokes] = useState<Stroke[]>(() => loadStrokes(topicSlug ?? BODY_KEY));
  const [quiz, setQuiz] = useState<QuizState | null>(null);

  const structures = useMemo(() => (topic ? structuresOf(topic) : []), [topic]);
  const pool = useMemo(() => structures.map((structure) => structure.id), [structures]);
  const stop = model.stops[stopIndex] ?? model.stops[0];

  const highlight = useMemo((): ReadonlySet<string> => {
    if (!topic) return new Set([region]);
    // No hints while playing "Find it".
    if (mode === 'quiz' || !selected) return new Set();
    const onDiagram = topic.diagram?.nodes.some((node) => node.id === selected);
    return onDiagram && topic.diagram
      ? pathThrough(topic.diagram.edges, selected)
      : new Set([selected]);
  }, [topic, region, mode, selected]);
  const hidden = useMemo(
    (): ReadonlySet<string> =>
      isolate && selected ? new Set(pool.filter((id) => !highlight.has(id))) : hiddenIds,
    [isolate, selected, pool, highlight, hiddenIds],
  );
  const info =
    topic && selected && mode === 'explore' ? structureInfo(topic, selected, topics) : null;
  const nameOf = (id: string | null) =>
    structures.find((structure) => structure.id === id)?.name ?? 'something else';
  const target = quiz ? structures.find((structure) => structure.id === quiz.targetId) : undefined;

  const openTopic = (slug: string | null) => {
    const next = withModel(slug);
    setTopicSlug(next?.slug ?? null);
    setSelected(null);
    setExpanded(false);
    setStopIndex(0);
    setHiddenIds(new Set());
    setIsolate(false);
    setQuiz(null);
    setMode('explore');
    setStrokes(loadStrokes(next?.slug ?? BODY_KEY));
    setPanel(next ? null : 'topics');
    if (next && !next.regions.includes(region)) setRegion(next.regions[0] ?? region);
    // The address follows the open topic, so it can be shared or reopened.
    window.history.replaceState(null, '', next ? `/studio?topic=${next.slug}` : '/studio');
  };

  const pickRegion = (id: BodyRegion) => {
    setRegion(id);
    setPanel('topics');
  };

  const pick = (id: string | null) => {
    if (!topic) {
      const picked = regions.find((item) => item.id === id);
      if (picked) pickRegion(picked.id);
      return;
    }
    if (mode === 'quiz') {
      if (!quiz || !id) return;
      const next = answerQuiz(quiz, id, pool);
      if (next.best > quiz.best) saveBest(topic.slug, next.best);
      setQuiz(next);
      return;
    }
    setSelected(id);
    setExpanded(false);
  };

  const changeMode = (next: Mode) => {
    const leaving = mode === next;
    setMode(leaving ? 'explore' : next);
    setPanel(null);
    setSelected(null);
    setQuiz(!leaving && next === 'quiz' && topic ? startQuiz(pool, loadBest(topic.slug)) : null);
  };

  const keepStrokes = (next: Stroke[]) => {
    setStrokes(next);
    saveStrokes(topic?.slug ?? BODY_KEY, next);
  };

  const toggleIn = <T,>(set: ReadonlySet<T>, value: T): ReadonlySet<T> => {
    const next = new Set(set);
    if (!next.delete(value)) next.add(value);
    return next;
  };

  const regionInfo = regions.find((item) => item.id === region);
  const regionCount = topics.filter((item) => item.regions.includes(region)).length;
  const tool = (active: boolean) => cx('shadow-glass', active && 'border-gold bg-primary-subtle');

  let view: React.ReactNode;
  if (capable === null) {
    view = <Skeleton className="size-full" />;
  } else if (capable) {
    view = (
      <Viewer3D
        model={model}
        highlight={highlight}
        onSelect={pick}
        stopId={stop?.id ?? ''}
        hiddenKinds={hiddenKinds}
        hiddenIds={hidden}
        xray={xray}
        reducedMotion={reducedMotion}
        markers={topic ? [] : regions.map((item) => ({ id: item.id, position: item.marker }))}
        maxDistance={topic ? 1.5 : 5}
        pen={
          mode === 'draw'
            ? { colour: pen, onStroke: (stroke) => keepStrokes([...strokes, stroke]) }
            : null
        }
        strokes={strokes}
      />
    );
  } else if (topic?.diagram) {
    view = (
      <div className="size-full overflow-auto px-4 pt-20 pb-24">
        <PathTracer
          diagram={topic.diagram}
          title={topic.title}
          selectedId={selected}
          onSelect={pick}
        />
      </div>
    );
  } else {
    view = (
      <div className="size-full px-8 pt-20 pb-24">
        <BodyOutline selected={region} onSelect={pickRegion} />
      </div>
    );
  }

  let bar: React.ReactNode;
  if (!topic) {
    bar = (
      <BodyBar
        region={regionInfo?.name ?? ''}
        count={regionCount}
        onTopics={() => setPanel('topics')}
      />
    );
  } else if (mode === 'draw') {
    bar = (
      <DrawBar
        pen={pen}
        strokes={strokes.length}
        onPen={setPen}
        onUndo={() => keepStrokes(strokes.slice(0, -1))}
        onClear={() => keepStrokes([])}
        onDone={() => changeMode('draw')}
      />
    );
  } else if (mode === 'quiz' && quiz) {
    bar = (
      <QuizBar
        quiz={quiz}
        targetName={target?.name ?? ''}
        pickedName={nameOf(quiz.picked)}
        onSkip={() => setQuiz(skipQuiz(quiz, pool))}
        onEnd={() => changeMode('quiz')}
      />
    );
  } else {
    bar = <TourBar stops={model.stops} index={stopIndex} onIndex={setStopIndex} />;
  }

  return (
    <section
      aria-label="3D studio"
      className="relative -mx-4 -mt-8 -mb-8 h-studio overflow-hidden border-b border-border bg-surface md:mx-0 md:-mt-4 md:h-studio-wide md:rounded-2xl md:border"
    >
      <figure className="absolute inset-0">
        {view}
        <figcaption className="sr-only">3D model: {topic?.title ?? 'the whole body'}</figcaption>
      </figure>

      <header className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
        <div className="pointer-events-auto flex min-w-0 items-center gap-2">
          <IconButton
            icon={Menu}
            label="Topics"
            variant="secondary"
            aria-pressed={panel === 'topics'}
            className={tool(panel === 'topics')}
            onClick={() => setPanel(panel === 'topics' ? null : 'topics')}
          />
          <h1 className="truncate rounded-full border border-glass-border bg-glass px-4 py-3 text-sm font-semibold text-ink shadow-glass backdrop-blur-md">
            {topic?.title ?? 'Whole body'}
          </h1>
        </div>
        {topic ? (
          <div className="pointer-events-auto flex gap-2">
            <IconButton
              icon={Layers}
              label="Layers"
              variant="secondary"
              aria-pressed={panel === 'layers'}
              className={tool(panel === 'layers')}
              onClick={() => setPanel(panel === 'layers' ? null : 'layers')}
            />
            {capable ? (
              <>
                <IconButton
                  icon={PenLine}
                  label="Draw"
                  variant="secondary"
                  aria-pressed={mode === 'draw'}
                  className={tool(mode === 'draw')}
                  onClick={() => changeMode('draw')}
                />
                <IconButton
                  icon={Target}
                  label="Find it"
                  variant="secondary"
                  aria-pressed={mode === 'quiz'}
                  className={tool(mode === 'quiz')}
                  onClick={() => changeMode('quiz')}
                />
              </>
            ) : null}
          </div>
        ) : null}
      </header>

      {panel === 'topics' ? (
        <TopicsPanel
          topics={topics}
          regions={regions}
          region={region}
          current={topic?.slug ?? null}
          onRegion={setRegion}
          onTopic={openTopic}
          onClose={() => setPanel(null)}
        />
      ) : null}
      {panel === 'layers' && topic ? (
        <LayersPanel
          kinds={PART_KINDS.filter((kind) => model.parts.some((part) => part.kind === kind))}
          structures={structures}
          showStructures={mode !== 'quiz'}
          hiddenKinds={hiddenKinds}
          hiddenIds={hiddenIds}
          xray={xray}
          isolate={isolate}
          selected={selected}
          onKind={(kind) => setHiddenKinds(toggleIn(hiddenKinds, kind))}
          onStructure={(id) => {
            // Make room for the structure's card.
            setPanel(null);
            pick(id);
          }}
          onHide={(id) => setHiddenIds(toggleIn(hiddenIds, id))}
          onXray={setXray}
          onIsolate={setIsolate}
          onClose={() => setPanel(null)}
        />
      ) : null}

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3">
        {info ? (
          <InfoCard
            info={info}
            expanded={expanded}
            onExpand={() => setExpanded(true)}
            onTopic={openTopic}
            onClose={() => pick(null)}
          />
        ) : null}
        <div className="pointer-events-auto rounded-2xl border border-glass-border bg-glass p-2 shadow-glass backdrop-blur-md md:max-w-2xl">
          {bar}
        </div>
        {capable ? (
          <Text size="xs" tone="muted" className="pointer-events-auto line-clamp-1 px-1">
            {model.credit}
          </Text>
        ) : null}
      </footer>
    </section>
  );
}
