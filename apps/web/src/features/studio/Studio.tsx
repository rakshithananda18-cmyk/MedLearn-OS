'use client';

import type { BodyRegion, Model3D, PartKind } from '@medlearn/schemas';
import { cx, Icon, IconButton, type IconGlyph, Text } from '@medlearn/ui';
import { BookOpen, Box, PanelLeftClose, PanelLeftOpen, Play } from '@medlearn/ui/icons';
import type { Stroke, Viewer3DLabel } from '@medlearn/visuals/viewer3d';
import { useRouter } from 'next/navigation';
import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { BODY_SYSTEMS, type BodyRegionInfo, bodyStructure, type BodySystem } from '@/content/body';
import type { LibraryNode } from '@/content/library';
import { bestMatches, searchTerms } from '@/content/match';
import { MOVEMENTS, type Twist } from '@/content/movements';
import { FILM_BONES } from '@/content/xray-basics';
import type { XrayFilm } from '@/content/xrays';
import { useProgress } from '@/features/progress/store';
import { SearchBox, type SearchGroup } from '@/features/search/SearchBox';
import { useHydrated, useShortScreen } from '@/features/shell/media';

import { DrawBar, ModeSwitch, PENS, QuestionCard, Scoreboard, TourBar } from './bars';
import { bodyQuizPool, focusOn, useBodyIndex } from './bodyIndex';
import { BodyPartCard } from './BodyPanels';
import { structureInfo, structuresOf, type StudioTopic } from './knowledge';
import {
  BodyBrowser,
  GLASS,
  InfoCard,
  KIND_LABEL,
  LayersPanel,
  MovementPanel,
  SearchSheet,
  SectionPanel,
  SettingsPanel,
  TopicsPanel,
} from './panels';
import {
  answerQuiz,
  hintQuiz,
  points,
  type QuizKind,
  roundOver,
  skipQuiz,
  startQuiz,
} from './quiz';
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
  DETAIL_PREFIX,
  findOnBody,
  hiddenIn,
  litIn,
  type Mode,
  openTopicIn,
  type Panel,
  pickIn,
  quizFocus,
  type Session,
  startSession,
  toggled,
} from './session';
import {
  BottomSheet,
  FindItButton,
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
  { kind: 'membrane', name: 'Pleura' },
  { kind: 'organ', name: 'Organs' },
  { kind: 'airway', name: 'Airways' },
  { kind: 'valve', name: 'Valves' },
  { kind: 'muscle', name: 'Muscles' },
  { kind: 'artery', name: 'Arteries' },
  { kind: 'vein', name: 'Veins' },
  { kind: 'nerve', name: 'Nerves' },
  { kind: 'capsule', name: 'Capsules' },
  { kind: 'ligament', name: 'Ligaments' },
  { kind: 'cartilage', name: 'Cartilage' },
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
  /** File addresses versioned by the server, without shipping its asset manifest. */
  systems?: BodySystem[];
  bodyIndexSrc?: string;
  /** Every X-ray film, in order; each topic names its own. */
  films: XrayFilm[];
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
  systems = BODY_SYSTEMS,
  bodyIndexSrc,
  films,
  initialTopic,
  initialTour = false,
}: Readonly<StudioProps>) {
  const router = useRouter();
  const [session, setSession] = useState<Session>(() =>
    firstSession(topics, regions, initialTopic),
  );
  const [settings, setSettings] = useState<StudioSettings>(loadSettings);
  const [touring, setTouring] = useState(initialTour && withModel(topics, initialTopic) !== null);
  // The Move tool: a plain drag moves the model instead of turning it.
  const [pan, setPan] = useState(false);
  // The X-ray film showing over or beside the model, by its place in the films at hand.
  const [film, setFilm] = useState<number | null>(null);
  const topic = withModel(topics, session.topicSlug);
  const structures = useMemo(() => (topic ? structuresOf(topic) : []), [topic]);
  const index = useBodyIndex(topic === null, bodyIndexSrc);
  // What "Find it" asks for: the topic's structures, or on the body the region's structures of
  // the systems switched on.
  const pool = useMemo(
    () =>
      topic
        ? structures.map((structure) => structure.id)
        : bodyQuizPool(index ?? [], session.systems, session.region, regions),
    [topic, structures, index, session.systems, session.region, regions],
  );
  const context = { topic, regions, pool };
  const update = (patch: Partial<Session>) => setSession({ ...session, ...patch });
  const slug = topic?.slug ?? BODY_KEY;
  const nameOf = (id: string | null) => {
    if (id?.includes('/')) return bodyStructure(id).name;
    return structures.find((structure) => structure.id === id)?.name ?? 'something else';
  };

  return {
    session,
    setSession,
    update,
    pan,
    togglePan: () => setPan(!pan),
    touring,
    setTouring,
    film,
    setFilm: (next: number | null) => {
      setFilm(next);
      // On the whole body a film lights its bones, so the skeleton has to be showing.
      if (next !== null && !topic && !session.systems.has('skeleton')) {
        update({ systems: new Set([...session.systems, 'skeleton']), focus: null });
      }
    },
    // A topic's films, or on the whole body every film, each beside the bones it shows.
    films: topic ? films.filter((item) => topic.filmIds.includes(item.id)) : films,
    settings,
    changeSettings: (next: StudioSettings) => {
      setSettings(next);
      saveSettings(next);
    },
    topic,
    model: topic?.model ?? body,
    systems,
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
    changeMode: (mode: Mode) => setSession(changeModeIn(session, mode, context, loadBest(slug))),
    /** A new round, of the same kind unless another is asked for. */
    playAgain: (kind: QuizKind = session.quiz?.kind ?? 'find') =>
      update({ quiz: startQuiz(context.pool, loadBest(slug), Math.random, kind) }),
    /** "Name it": a name chosen from the card. */
    answer: (id: string) => {
      if (!session.quiz || roundOver(session.quiz)) return;
      const quiz = answerQuiz(session.quiz, id, context.pool);
      if (quiz.best > session.quiz.best) saveBest(slug, quiz.best);
      update({ quiz });
    },
    skip: () => session.quiz && update({ quiz: skipQuiz(session.quiz, context.pool) }),
    hint: () => session.quiz && update({ quiz: hintQuiz(session.quiz) }),
    /** After a round, a structure to learn again: back to exploring, with it picked. */
    learn: (id: string) => {
      const exploring = { ...session, mode: 'explore' as const, quiz: null };
      setSession(topic ? pickIn(exploring, id, context) : findOnBody(exploring, id));
    },
    keepStrokes: (strokes: Stroke[]) => {
      update({ strokes });
      saveStrokes(slug, strokes);
    },
    hide: (id: string) =>
      update({ hiddenIds: toggled(session.hiddenIds, id), selected: null, isolate: false }),
    // On the body, Reset also closes the region opened in place.
    resetView: () => update({ reset: session.reset + 1, ...(topic ? {} : { focus: null }) }),
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
    // Like their markers, the region names step aside while a structure of the body is picked,
    // while playing "Find it", and beside a film.
    const busy = session.mode === 'quiz' || studio.film !== null || session.movement !== null;
    const structure =
      session.selected?.includes('/') || session.selected?.startsWith(DETAIL_PREFIX);
    if (structure || busy) {
      return [];
    }
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
  const quiz = session.mode === 'quiz' ? session.quiz : null;
  if (quiz) {
    // "Name it": a mark on the structure to name, never its name.
    if (quiz.kind === 'name') return [{ id: quiz.targetId, text: '?', active: true }];
    // Only what was tapped: never the name asked for.
    if (!quiz.picked || !quiz.last) return [];
    const name = studio.nameOf(quiz.picked);
    const text = quiz.last === 'right' ? `+${points(quiz.gained)} ${name}` : name;
    return [{ id: quiz.picked, text, active: quiz.last === 'right' }];
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
function bodyLayers(session: Session, systems: BodySystem[]) {
  const isolated = isolatedOnBody(session);
  return systems.flatMap((system) => {
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
 * The body file's parts left out: its low-detail skeleton always, the skin (the surface of every
 * region) when switched off or while a structure is isolated.
 */
function bodyHidden(session: Session, regions: BodyRegionInfo[]): ReadonlySet<string> {
  // The skin cannot bend, so it steps aside while a joint moves too.
  const skin = session.systems.has('skin') && !isolatedOnBody(session) && !session.movement;
  return new Set(skin ? ['skeleton'] : ['skeleton', ...regions.map((region) => region.id)]);
}

/**
 * The detailed model a region opens into when picked on the body: its file, with every part the
 * region's topics show in it (named, coloured and described as in those topics).
 */
export function regionDetail(
  region: BodyRegionInfo | undefined,
  topics: StudioTopic[],
): Model3D | null {
  if (!region?.detail) return null;
  const path = (src: string) => new URL(src, 'https://assets.medlearn.invalid').pathname;
  const users = topics.filter(
    (topic) =>
      topic.regions.includes(region.id) && topic.model && path(topic.model.src) === region.detail,
  );
  const first = users[0]?.model;
  if (!first) return null;
  const parts = new Map<string, Model3D['parts'][number]>();
  for (const topic of users) {
    for (const part of topic.model?.parts ?? []) if (!parts.has(part.id)) parts.set(part.id, part);
  }
  return { ...first, parts: [...parts.values()], traces: [] };
}

/** The model, with a caption for screen readers; where it sits comes from the layout. */
function StudioModel({
  studio,
  topics,
  regions,
  capable,
  labels,
  className = 'absolute inset-0',
  insetRight = 0,
  insetBottom = 0,
  insetTop = 0,
}: Readonly<{
  studio: StudioState;
  topics: StudioTopic[];
  regions: BodyRegionInfo[];
  capable: boolean | null;
  labels: Viewer3DLabel[];
  className?: string;
  /** How much of the view's right edge a panel covers, in pixels. */
  insetRight?: number;
  /** How much of the view's bottom edge a sheet covers, in pixels (phones). */
  insetBottom?: number;
  /** How much of the view's top edge the header covers, in pixels (phones). */
  insetTop?: number;
}>) {
  const { session, topic, model, update, settings } = studio;
  const systemReducedMotion = useReducedMotion();
  const reducedMotion = settings.smooth === null ? systemReducedMotion : !settings.smooth;
  const index = useBodyIndex(topic === null);
  // A film open on the whole body: its bones lit, and the camera turned to them.
  const film = topic || studio.film === null ? undefined : studio.films[studio.film];
  const filmBones = useMemo(() => (film ? FILM_BONES[film.region] : []), [film]);
  const lit = useMemo(
    () => new Set([...litIn(session, topic, studio.context.pool), ...filmBones]),
    [session, topic, filmBones, studio.context.pool],
  );
  // A joint moving. On the whole body: what its rule picks turns about the axis. In a joint
  // topic: the parts it lists turn, the ligaments crossing the joint stretch, and warm as they
  // tighten. The sets are kept per movement, so moving the slider does not redo the stretching.
  const moving = session.movement;
  const movement = topic ? undefined : MOVEMENTS.find((item) => item.id === moving?.id);
  const joint = useMemo(
    () => topic?.movements.find((item) => item.id === moving?.id),
    [topic, moving?.id],
  );
  const parts = useMemo(() => {
    if (joint)
      return {
        ids: new Set(joint.turns),
        stretch: new Set(joint.stretches),
        taut: { start: new Set(joint.taut.start), end: new Set(joint.taut.end) },
      };
    if (!movement || !index) return null;
    const ids = index.filter((entry) => movement.moves(entry.id, entry.centre));
    return { ids: new Set(ids.map((entry) => entry.id)) };
  }, [joint, movement, index]);
  const pose = useMemo(() => {
    const shown = joint ?? movement;
    if (!moving || !shown || !parts) return null;
    return {
      ...parts,
      pivot: shown.pivot,
      axis: shown.axis,
      twist: shown.twist ? radians(shown.twist) : undefined,
      angle: (moving.angle * Math.PI) / 180,
      range: (shown.range * Math.PI) / 180,
      playing: moving.playing,
    };
  }, [moving, joint, movement, parts]);
  // A region picked on the body opens into its detailed model, while exploring.
  const opened =
    topic || session.mode !== 'explore' || film || moving
      ? undefined
      : regions.find((item) => item.id === session.focus);
  const detail = useMemo(() => regionDetail(opened, topics), [opened, topics]);
  // Where it has bones of its own, the body's skeleton steps aside.
  const detailBones = detail?.parts.some((part) => part.kind === 'bone') ?? false;
  const focus = useMemo(() => {
    if (filmBones.length > 0) return focusOn(filmBones, index ?? []);
    // Choosing a joint turns the camera to it (moving it does not).
    if (movement) return { point: movement.pivot, radius: 120 };
    // A region picked on the body brings it close.
    const region = regions.find((item) => item.id === session.focus);
    if (region) return { point: region.marker, radius: region.reach };
    const entry = index?.find((item) => item.id === session.focus);
    return entry ? { point: entry.centre, radius: entry.radius } : null;
  }, [index, session.focus, filmBones, movement, regions]);
  return (
    <figure className={className}>
      <ModelView
        capable={capable}
        model={model}
        topic={topic}
        // While playing "Find it" on the body its region markers would only be wrong answers, and
        // beside a film they would hide the bones it shows.
        regions={session.mode === 'quiz' || film || moving ? [] : regions}
        region={session.region}
        selected={session.selected}
        lit={lit}
        stopId={model.stops[session.stopIndex]?.id ?? ''}
        hiddenKinds={session.hiddenKinds}
        hidden={topic ? hiddenIn(session, lit, studio.context.pool) : bodyHidden(session, regions)}
        xray={session.xray}
        reducedMotion={reducedMotion}
        pen={session.mode === 'draw' ? session.pen : null}
        strokes={session.strokes}
        labels={labels}
        resetToken={session.reset}
        dpr={pixelRatio(settings.quality)}
        layers={
          topic
            ? []
            : bodyLayers(session, studio.systems).filter(
                (layer) => !detailBones || layer.kind !== 'bone',
              )
        }
        detail={detail}
        // Its surface stays as a faint outline, so the other side's limb keeps its shape.
        ghosts={new Set(detail && opened ? [opened.id] : [])}
        section={session.section}
        focus={topic ? null : focus}
        focusId={quizFocus(session.mode === 'quiz' ? session.quiz : null)}
        pose={pose}
        flat={settings.flat}
        insetRight={insetRight}
        insetBottom={insetBottom}
        insetTop={insetTop}
        pan={studio.pan}
        onPick={studio.pick}
        onRegion={(region: BodyRegion) => update({ region, panel: 'topics' })}
        onStroke={(stroke) => studio.keepStrokes([...session.strokes, stroke])}
      />
      <figcaption className="sr-only">3D model: {topic?.title ?? 'the whole body'}</figcaption>
    </figure>
  );
}

/** A twist for the viewer, its angles turned from degrees to radians. */
function radians(twist: Twist) {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  return { ...twist, angle: toRadians(twist.degrees), over: toRadians(twist.over) };
}

/** The view tools, as a column down the model's left edge. */
function Tools({ studio }: Readonly<{ studio: StudioState }>) {
  const { session, update } = studio;
  return (
    <ViewTools
      layers={session.panel === 'layers'}
      xray={session.xray}
      films={studio.films.length > 0 ? studio.film !== null : null}
      isolate={session.isolate}
      canIsolate={session.selected !== null}
      pan={studio.pan}
      onPan={studio.togglePan}
      section={session.section !== null || session.panel === 'section'}
      settings={session.panel === 'settings'}
      onLayers={() => studio.togglePanel('layers')}
      onXray={() => update({ xray: !session.xray })}
      onFilms={() => studio.setFilm(studio.film === null ? 0 : null)}
      onIsolate={() => update({ isolate: !session.isolate })}
      onSection={() => studio.togglePanel('section')}
      // Movements are measured on the whole body's skeleton, and on the joints model.
      movement={
        studio.topic && studio.topic.movements.length === 0
          ? null
          : session.movement !== null || session.panel === 'movement'
      }
      onMovement={() => studio.togglePanel('movement')}
      onReset={studio.resetView}
      onSettings={() => studio.togglePanel('settings')}
    />
  );
}

/** "Find it" on the whole body, for the region chosen. */
function FindIt({ studio }: Readonly<{ studio: StudioState }>) {
  const region = studio.context.regions.find((item) => item.id === studio.session.region);
  return (
    <FindItButton
      region={region?.name ?? 'the body'}
      best={loadBest(BODY_KEY)}
      disabled={studio.context.pool.length === 0}
      onStart={() => studio.changeMode('quiz')}
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

/** Suggestions per group in the studio's search. */
const SEARCH_LIMIT = 6;

/**
 * The studio's search, the same box as the library's: suggestions in groups as the student types,
 * a letter wrong forgiven. On a topic, the model's own structures and then other topics to open in
 * 3D; on the whole body, the topics in 3D and then every structure of the body with its system.
 * Empty, it offers the next topic to learn and the open model's structures. Picking one turns the
 * model to it or opens the topic, here in the studio. In the phone's search sheet the suggestions
 * sit in place under the box.
 */
function Search({
  studio,
  topics,
  inline = false,
}: Readonly<{ studio: StudioState; topics: StudioTopic[]; inline?: boolean }>) {
  const { topic } = studio;
  const [query, setQuery] = useState('');
  const learnt = new Set(useProgress().completedLessons);
  const index = useBodyIndex(topic === null);
  const bodyItems = useMemo(
    () => (index ?? []).map((entry) => ({ id: entry.id, ...bodyStructure(entry.id) })),
    [index],
  );
  const others = topics.filter((item) => item.model && item.slug !== topic?.slug);
  // Picking one clears the box, ready for the next search.
  const andClear = (then: () => void) => () => {
    setQuery('');
    then();
  };
  const topicOption = (item: StudioTopic, meta: string, icon: IconGlyph = BookOpen) => ({
    id: `topic-${item.slug}`,
    label: item.title,
    meta,
    icon,
    onSelect: andClear(() => studio.openTopic(item.slug)),
  });
  const structureOption = (item: { id: string; name: string; kind: string }) => ({
    id: `structure-${item.id}`,
    label: item.name,
    meta: KIND_LABEL[item.kind as keyof typeof KIND_LABEL] ?? 'On this model',
    icon: Box,
    onSelect: andClear(() => studio.choose(item.id)),
  });
  const byName = (item: { name: string }) => item.name;
  const byTitle = (item: StudioTopic) => item.title;

  const typed = searchTerms(query).length > 0;
  let groups: SearchGroup[];
  if (!typed) {
    const next = others.find((item) => !learnt.has(item.slug));
    groups = [
      { title: 'Up next', options: next ? [topicOption(next, 'Up next to learn', Play)] : [] },
      {
        title: 'On this model',
        options: studio.structures.slice(0, SEARCH_LIMIT).map(structureOption),
      },
    ];
  } else if (topic) {
    groups = [
      {
        title: 'On this model',
        options: bestMatches(studio.structures, byName, query, SEARCH_LIMIT).map(structureOption),
      },
      {
        title: 'Other topics in 3D',
        options: bestMatches(others, byTitle, query, SEARCH_LIMIT).map((item) =>
          topicOption(item, 'Open in 3D'),
        ),
      },
    ];
  } else {
    groups = [
      {
        title: 'Topics in 3D',
        options: bestMatches(others, byTitle, query, SEARCH_LIMIT).map((item) =>
          topicOption(item, 'Open in 3D'),
        ),
      },
      {
        title: 'On the body',
        options: bestMatches(bodyItems, byName, query, SEARCH_LIMIT).map((item) => ({
          id: `body-${item.id}`,
          label: item.name,
          meta: item.system?.name ?? 'Body',
          icon: Box,
          onSelect: andClear(() => studio.find(item.id)),
        })),
      },
    ];
  }
  const label = topic ? 'Find a structure' : 'Find a structure or topic';
  // Short enough to show whole in the docked panel; the label above says it in full.
  const placeholder = topic ? 'Search this model' : 'Search the body';
  const nothing = typed && groups.every((group) => group.options.length === 0);
  return (
    <SearchBox
      label={label}
      placeholder={placeholder}
      query={query}
      onQuery={setQuery}
      groups={groups}
      status={nothing ? 'Nothing by that name here. Try fewer letters.' : null}
      inline={inline}
      autoFocus={inline}
    />
  );
}

/** What is known about the structure picked while exploring a topic, if one is. */
function pickedInfo({ session, topic }: StudioState, topics: StudioTopic[]) {
  const selected = session.mode === 'explore' ? session.selected : null;
  if (!selected) return null;
  if (topic) return structureInfo(topic, selected, topics);
  if (!selected.startsWith(DETAIL_PREFIX)) return null;
  // A part of the region opened on the body: told as the region's first topic that shows it, with
  // that topic first among those to open.
  const id = selected.slice(DETAIL_PREFIX.length);
  const home = topics.find(
    (item) =>
      item.regions.includes(session.region) && item.model?.parts.some((part) => part.id === id),
  );
  const info = home ? structureInfo(home, id, topics) : null;
  return home && info
    ? { ...info, alsoIn: [{ slug: home.slug, title: home.title }, ...info.alsoIn] }
    : null;
}

/** The picked structure's card, while exploring a topic; nothing otherwise. */
function Info({ studio, topics, docked }: Readonly<OverlayProps & { docked: boolean }>) {
  const { session } = studio;
  const info = pickedInfo(studio, topics);
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

/** A joint topic's movements, with its ligaments named as the model names them. */
function jointMovements(studio: StudioState) {
  const parts = studio.model.parts;
  const named = (ids: string[]) =>
    ids.flatMap((id) => parts.find((part) => part.id === id)?.name ?? []);
  return (studio.topic?.movements ?? []).map((movement) => ({
    ...movement,
    taut: { start: named(movement.taut.start), end: named(movement.taut.end) },
  }));
}

/** The movement sheet, while open. */
function Moves({ studio }: Readonly<{ studio: StudioState }>) {
  const { session, update } = studio;
  if (session.panel !== 'movement') return null;
  return (
    <MovementPanel
      movements={studio.topic ? jointMovements(studio) : MOVEMENTS}
      movement={session.movement}
      onChange={(movement) => {
        // Choosing a joint in a topic turns the camera to the view it is best watched from.
        const view = studio.topic?.movements.find(
          (item) => item.id === movement?.id && item.id !== session.movement?.id,
        )?.stop;
        const stopIndex = studio.model.stops.findIndex((stop) => stop.id === view);
        update(stopIndex >= 0 ? { movement, stopIndex } : { movement });
      }}
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

/** The X-ray films while they are open: beside the model where there is room, over it on phones. */
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

/** "Find it" and "Name it": the scoreboard, its answers, hints and skips, and the end of the round. */
function Quiz({ studio }: Readonly<{ studio: StudioState }>) {
  const { quiz } = studio.session;
  if (!quiz) return null;
  return (
    <Scoreboard
      quiz={quiz}
      nameOf={studio.nameOf}
      onHint={studio.hint}
      onSkip={studio.skip}
      onLearn={studio.learn}
      onAgain={() => studio.playAgain()}
      onEnd={() => studio.changeMode('explore')}
      onAnswer={studio.answer}
      onKind={studio.playAgain}
    />
  );
}

/** What to find, at the top of the model. */
function Question({ studio }: Readonly<{ studio: StudioState }>) {
  const { quiz } = studio.session;
  if (!quiz) return null;
  return (
    <QuestionCard
      quiz={quiz}
      name={studio.nameOf(quiz.targetId)}
      onEnd={() => studio.changeMode('explore')}
    />
  );
}

/** Along the bottom of a phone: the body's regions, "Find it", or the sheet for the topic. */
function PhoneFooter({
  onRegionTopics,
  ...props
}: Readonly<OverlayProps & { onRegionTopics: () => void }>) {
  const { studio, topics, regions, capable } = props;
  const { session, topic } = studio;
  const compact = useShortScreen();
  if (session.mode === 'quiz') {
    return (
      <BottomSheet>
        <Quiz studio={studio} />
      </BottomSheet>
    );
  }
  if (!topic && session.selected?.includes('/')) {
    return (
      <BottomSheet>
        <BodyPartCard id={session.selected} onClose={() => studio.pick(null)} />
      </BottomSheet>
    );
  }
  if (!topic && session.selected?.startsWith(DETAIL_PREFIX)) {
    return (
      <BottomSheet>
        <Info {...props} docked={false} />
      </BottomSheet>
    );
  }
  if (!topic) {
    return (
      <div className="flex flex-col gap-2 p-3">
        {capable ? (
          <div className="flex justify-end">
            <FindIt studio={studio} />
          </div>
        ) : null}
        <BodyBrowser
          topics={topics}
          regions={regions}
          region={session.region}
          // On a short screen the topics open in their panel, so the model keeps its room.
          onRegion={(region) => {
            // On a short screen the region's topics take the place of any open panel.
            studio.update(compact ? { region, panel: null } : { region });
            if (compact) onRegionTopics();
          }}
          onTopic={studio.openTopic}
          compact={compact}
        />
        <Credit studio={studio} capable={capable} />
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

/**
 * What the footer covers of the studio, for the model to keep clear of it: its height when it runs
 * along the bottom, or its width from the studio's right edge when a phone held sideways puts the
 * sheet down the right. The sheet itself is measured, as it is positioned out of the footer's flow.
 */
function useFooterCover(onBottom: (height: number) => void, onRight: (width: number) => void) {
  return useCallback(
    (node: HTMLElement | null) => {
      if (!node) {
        onBottom(0);
        onRight(0);
        return;
      }
      const measure = () => {
        const sheet = (node.firstElementChild ?? node).getBoundingClientRect();
        // A sheet that is not shown (hidden, as for the posters) covers nothing.
        if (sheet.width === 0 || sheet.height === 0) {
          onBottom(0);
          onRight(0);
          return;
        }
        // The studio's own box: on the whole body the tab bar sits below it.
        const studio = node.closest('section')?.getBoundingClientRect() ?? sheet;
        const downRight = sheet.left > studio.left + studio.width / 4;
        onBottom(downRight ? 0 : Math.max(0, studio.bottom - sheet.top));
        onRight(downRight ? Math.max(0, studio.right - sheet.left) : 0);
      };
      // The footer's content changes (body chips, a topic's sheet), so each new sheet is watched.
      const resize = new ResizeObserver(measure);
      const watch = () => {
        resize.disconnect();
        resize.observe(node);
        if (node.firstElementChild) resize.observe(node.firstElementChild);
        measure();
      };
      watch();
      const content = new MutationObserver(watch);
      content.observe(node, { childList: true });
      return () => {
        resize.disconnect();
        content.disconnect();
      };
    },
    [onBottom, onRight],
  );
}

/** The height the header covers at the top of the studio, for the model to keep below it. */
function useTopCover(onCover: (height: number) => void) {
  return useCallback(
    (node: HTMLElement | null) => {
      if (!node) {
        onCover(0);
        return;
      }
      const measure = () => {
        const start = node.closest('section')?.getBoundingClientRect().top ?? 0;
        onCover(Math.max(0, node.getBoundingClientRect().bottom - start));
      };
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(node);
      return () => observer.disconnect();
    },
    [onCover],
  );
}

/** Phones and tablets held upright: everything floats over the model, sheets open on demand. */
function PhoneOverlay({
  onCover,
  onCoverRight,
  onCoverTop,
  coverBottom,
  ...props
}: Readonly<
  OverlayProps & {
    coverBottom: number;
    onCover: (height: number) => void;
    onCoverRight: (width: number) => void;
    onCoverTop: (height: number) => void;
  }
>) {
  const { studio, topics, tree, regions } = props;
  const measureFooter = useFooterCover(onCover, onCoverRight);
  const measureHeader = useTopCover(onCoverTop);
  const { session, topic } = studio;
  // On the whole body the topics panel opens only when a short screen's region is tapped (its
  // topics are not inline there); a topic's own panel follows the session as before.
  const [regionTopics, setRegionTopics] = useState(false);
  // One floating panel at a time: opening search or another tool closes the region's topics.
  const otherPanel = session.panel !== null && session.panel !== 'topics';
  if (!topic && regionTopics && otherPanel) setRegionTopics(false);
  const topicsOpen = topic ? session.panel === 'topics' : regionTopics;
  const title = topic?.title ?? 'Whole body';
  const quiz = session.mode === 'quiz' ? session.quiz : null;
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
      <div ref={measureHeader} className="flex flex-col gap-3 p-3">
        {quiz ? (
          <>
            <h1 className="sr-only">{title}</h1>
            <Question studio={studio} />
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
        <div
          className="absolute top-20 left-3 z-10 flex min-h-0 items-start"
          style={{ bottom: Math.max(12, coverBottom + 12) }}
        >
          <Tools studio={studio} />
        </div>
      )}
      <div ref={measureFooter} className="flex flex-col">
        <PhoneFooter {...props} onRegionTopics={() => setRegionTopics(true)} />
      </div>

      {topicsOpen ? (
        // On the whole body it opens on the region chosen.
        <TopicsPanel
          key={topic ? topic.slug : session.region}
          place="float"
          tree={tree}
          topics={topics}
          regions={regions}
          current={topic ? topic.slug : null}
          region={session.region}
          onRegion={(region) => studio.update({ region })}
          onTopic={(slug) => {
            setRegionTopics(false);
            studio.openTopic(slug);
          }}
          onClose={() => {
            setRegionTopics(false);
            studio.update({ panel: null });
          }}
        />
      ) : null}
      {studio.film === null ? null : (
        <div className="absolute inset-x-3 top-20 bottom-3 z-20 flex">
          <Films studio={studio} />
        </div>
      )}
      <Layers studio={studio} />
      <Section studio={studio} />
      <Moves studio={studio} />
      {session.panel === 'search' ? (
        <SearchSheet label="Search" onClose={() => studio.update({ panel: null })}>
          <Search studio={studio} topics={topics} inline />
        </SearchSheet>
      ) : null}
      <Settings studio={studio} />
    </div>
  );
}

/**
 * Along the bottom where docked: the guided views (or the tour playing), the drawing tools,
 * "Find it", and how to use the model.
 */
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
      {mode === 'explore' && !studio.touring ? (
        <div className="flex justify-center">
          <Guide studio={studio} />
        </div>
      ) : null}
      {mode === 'draw' ? (
        <div className={cx(GLASS, 'pointer-events-auto p-3')}>
          <Draw studio={studio} />
        </div>
      ) : null}
      {mode === 'quiz' ? (
        <Text size="xs" tone="muted" className="px-2">
          Tap it on the model · drag to turn · right-drag to move · scroll to zoom
        </Text>
      ) : null}
      {mode === 'explore' ? (
        <Text size="xs" tone="muted" className="px-2">
          {studio.pan ? 'Drag to move' : 'Drag to turn · right-drag to move'} · scroll to zoom ·{' '}
          {studio.topic ? 'click a structure' : 'click a region, then a structure inside it'}
        </Text>
      ) : null}
      <div className="px-2">
        <Credit studio={studio} capable={capable} />
      </div>
    </footer>
  );
}

/** The gap between the model's column and the card beside it (gap-4), in pixels. */
const CARD_GAP_PX = 16;

/** Folds the docked topics away, or brings them back as a pill at the start of the header. */
function Fold({ open, onToggle }: Readonly<{ open: boolean; onToggle: () => void }>) {
  if (open) {
    return (
      <IconButton
        icon={PanelLeftClose}
        label="Hide the topics"
        title="Hide the topics"
        size="sm"
        variant="ghost"
        aria-expanded
        className="pointer-events-auto"
        onClick={onToggle}
      />
    );
  }
  return (
    <button
      type="button"
      aria-label="Show the topics"
      aria-expanded={false}
      onClick={onToggle}
      className={cx(
        GLASS,
        'pointer-events-auto flex h-12 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink',
      )}
    >
      <Icon icon={PanelLeftOpen} size="sm" />
      Topics
    </button>
  );
}

/** At the end of the header where docked: the topic's modes, or "Find it" on the whole body. */
function HeaderAction({ studio, capable }: Readonly<Pick<OverlayProps, 'studio' | 'capable'>>) {
  // Both need the 3D model to tap.
  if (!capable) return null;
  if (!studio.topic) return <FindIt studio={studio} />;
  return (
    <ModeSwitch
      mode={studio.session.mode}
      onMode={studio.changeMode}
      className={cx(GLASS, 'pointer-events-auto shrink-0')}
    />
  );
}

/**
 * Tablets held sideways and laptops: the topics docked on the left (they fold away), and beside
 * them the model under one header row, so the title never sits on it. The view tools stand down
 * the model's left edge, the guided views sit along the bottom, and a structure picked opens its
 * card on the right; layers and settings open from the tools.
 */
function DockedOverlay({
  stage,
  ...props
}: Readonly<OverlayProps & { stage: (insetRight: number) => ReactNode }>) {
  const { studio, topics, tree, regions, capable } = props;
  const { session, topic } = studio;
  const [left, setLeft] = useState(true);
  // How much of the model's view the open card covers (its width and the gap before it), so the
  // model keeps to the free space beside it.
  const [covered, setCovered] = useState(0);
  // Kept the same between renders, so React measures the card only as it opens and closes.
  const measureCard = useCallback((node: HTMLElement | null) => {
    setCovered(node ? node.offsetWidth + CARD_GAP_PX : 0);
  }, []);
  const quiz = session.mode === 'quiz' ? session.quiz : null;
  // A structure picked on the whole body, or on the open topic.
  const picked = !topic && session.selected?.includes('/') ? session.selected : null;
  const card = quiz !== null || picked !== null || pickedInfo(studio, topics) !== null;
  // During a round the topics step aside, giving the model the room.
  const topicsShown = left && !quiz;
  return (
    // Inset as far as the side rail, so their tops and bottoms line up.
    <div className="pointer-events-none absolute inset-0 flex gap-4 p-3">
      {topicsShown ? (
        <TopicsPanel
          place="dock"
          tree={tree}
          topics={topics}
          regions={regions}
          current={topic?.slug ?? null}
          region={session.region}
          search={<Search studio={studio} topics={topics} />}
          action={<Fold open onToggle={() => setLeft(false)} />}
          onRegion={(region) => studio.update({ region })}
          onTopic={studio.openTopic}
          onClose={() => studio.update({ panel: null })}
        />
      ) : null}
      <div className="relative min-w-0 flex-1">
        {stage(card ? covered : 0)}
        <div className="absolute inset-0 flex flex-col gap-3">
          {/* The name of what is loaded, centred over the model; the sides take equal room. */}
          <header className={cx('flex min-h-12 gap-3', quiz ? 'items-start' : 'items-center')}>
            <div className="flex flex-1 basis-0">
              {left || quiz ? null : <Fold open={false} onToggle={() => setLeft(true)} />}
            </div>
            {/* During a round the question takes the title's place. */}
            <h1
              className={cx(
                'text-gold min-w-0 truncate text-center font-display text-2xl tracking-display',
                quiz && 'sr-only',
              )}
            >
              {topic?.title ?? 'Whole body'}
            </h1>
            {quiz ? <Question studio={studio} /> : null}
            <div className="flex flex-1 basis-0 justify-end">
              {/* On a topic the modes stay, so Explore is a tap away; on the body the question
                  card ends the game. */}
              {quiz && !topic ? null : <HeaderAction studio={studio} capable={capable} />}
            </div>
          </header>
          <div className="flex min-h-0 flex-1 gap-4">
            <div className="flex min-w-0 flex-1 flex-col justify-end gap-3">
              {studio.film === null ? null : (
                // The right half on wide screens: the model stays in view beside the film.
                <div className="flex min-h-0 flex-1 xl:w-1/2 xl:self-end">
                  <Films studio={studio} />
                </div>
              )}
              <DockedFooter studio={studio} capable={capable} />
            </div>
            {card ? (
              <aside
                ref={measureCard}
                aria-label={quiz ? 'Your round' : 'About the model'}
                className={cx(
                  GLASS,
                  'pointer-events-auto flex w-sheet shrink-0 animate-slide-in flex-col gap-4 overflow-x-hidden overflow-y-auto p-4 motion-reduce:animate-none',
                  // The scoreboard is only as tall as it needs to be.
                  quiz && 'self-start',
                )}
              >
                {quiz ? <Quiz studio={studio} /> : null}
                {!quiz && picked ? (
                  <BodyPartCard id={picked} onClose={() => studio.pick(null)} />
                ) : null}
                {!quiz && !picked ? <Info {...props} docked /> : null}
              </aside>
            ) : null}
          </div>
          {/* The view tools down the model's left edge: level with the topics' top, or under their
              pill when they are folded away. */}
          <div
            className={cx(
              'absolute bottom-0 left-0 flex min-h-0 items-start',
              topicsShown || quiz ? 'top-0' : 'top-16',
            )}
          >
            <Tools studio={studio} />
          </div>
        </div>
      </div>
      <Layers studio={studio} />
      <Section studio={studio} />
      <Moves studio={studio} />
      <Settings studio={studio} />
    </div>
  );
}

/**
 * The 3D studio: the model with everything else floating over or docked beside it. Pick a region
 * on the body or a topic; turn, light, hide and x-ray structures; draw on the model; or play
 * "Find it". Tablets held sideways and laptops dock the topics on the left and open a picked
 * structure on the right. On a phone a topic fills the whole screen, with a back button in place
 * of the tab bar. Phones that cannot show 3D get the flat diagram.
 */
export function Studio(props: Readonly<StudioProps>) {
  const { topics, tree, regions } = props;
  const capable = useCan3D();
  const docked = useDocked();
  const studio = useStudio(props);
  useTour(studio);
  // The screen's size is known only in the browser: until then the model's placeholder stands
  // alone, so a laptop never shows the phone's layout first.
  const hydrated = useHydrated();
  const overlay = { studio, topics, tree, regions, capable };
  // How much of a phone's screen the footer sheet covers, so the model keeps above or beside it.
  const [coverBottom, setCoverBottom] = useState(0);
  const [coverRight, setCoverRight] = useState(0);
  const [coverTop, setCoverTop] = useState(0);
  const stage = (insetRight = 0) => (
    <StudioModel
      studio={studio}
      topics={topics}
      regions={regions}
      capable={capable}
      labels={labelsFor(studio, topics, regions)}
      insetRight={insetRight}
      insetBottom={docked ? 0 : coverBottom}
      insetTop={docked ? 0 : coverTop}
      // Docked, the model sits between the header row and the guided views; on phones it fills
      // the screen.
      className={
        docked
          ? cx(
              'pointer-events-auto absolute inset-x-0 bottom-24',
              studio.session.mode === 'quiz' ? 'top-24' : 'top-16',
            )
          : undefined
      }
    />
  );
  return (
    <section
      aria-label="3D studio"
      className={cx(
        'relative overflow-hidden md:h-dvh',
        studio.topic ? 'h-dvh max-md:fixed max-md:inset-0 max-md:z-40 max-md:bg-sky' : 'h-studio',
      )}
    >
      {hydrated && docked ? <DockedOverlay {...overlay} stage={stage} /> : stage(coverRight)}
      {hydrated && !docked ? (
        <PhoneOverlay
          {...overlay}
          coverBottom={coverBottom}
          onCover={setCoverBottom}
          onCoverRight={setCoverRight}
          onCoverTop={setCoverTop}
        />
      ) : null}
    </section>
  );
}
