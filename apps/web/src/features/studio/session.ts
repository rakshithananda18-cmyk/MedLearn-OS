import type { BodyRegion, PartKind } from '@medlearn/schemas';
import { pathThrough } from '@medlearn/visuals';
import type { Stroke, Viewer3DSection } from '@medlearn/visuals/viewer3d';

import { BODY_SYSTEMS, type BodySystemId, FIRST_SYSTEMS } from '@/content/body';
import type { MovementId } from '@/content/movements';

import type { StudioTopic } from './knowledge';
import { answerQuiz, type QuizState, roundOver, startQuiz } from './quiz';

// What the student is doing in the 3D studio, and every change to it, as plain functions: the
// component keeps only the side effects (saving, the address bar) and the layout.

export type Mode = 'explore' | 'draw' | 'quiz';
export type Panel = 'topics' | 'layers' | 'section' | 'movement' | 'search' | 'settings' | null;
/** The extra a picked structure's card shows under its summary. */
export type Detail = 'clinical' | 'lesson' | null;

export interface Session {
  topicSlug: string | null;
  region: BodyRegion;
  panel: Panel;
  mode: Mode;
  selected: string | null;
  detail: Detail;
  stopIndex: number;
  /** Counts "reset the view" taps; each new count sends the camera back. */
  reset: number;
  /** A structure of the body found by name, for the camera to turn to. */
  focus: string | null;
  hiddenKinds: ReadonlySet<PartKind>;
  hiddenIds: ReadonlySet<string>;
  xray: boolean;
  /** A cut through the model, kept while moving between topics. */
  section: Viewer3DSection | null;
  /** A joint movement on the whole body: which, at what angle (degrees), and whether playing. */
  movement: { id: MovementId; angle: number; playing: boolean } | null;
  isolate: boolean;
  pen: string;
  strokes: Stroke[];
  quiz: QuizState | null;
  /** The body's systems switched on, on the whole body. */
  systems: ReadonlySet<BodySystemId>;
}

/** What the changes need to know about the topic that is open. */
export interface SessionContext {
  topic: StudioTopic | null;
  regions: ReadonlyArray<{ id: BodyRegion }>;
  /** Every structure the student can pick on the open model. */
  pool: string[];
}

export function startSession(
  topic: StudioTopic | null,
  region: BodyRegion,
  pen: string,
  strokes: Stroke[],
): Session {
  return {
    topicSlug: topic?.slug ?? null,
    region: topic?.regions[0] ?? region,
    panel: topic ? null : 'topics',
    mode: 'explore',
    selected: null,
    detail: null,
    stopIndex: 0,
    reset: 0,
    focus: null,
    hiddenKinds: new Set(),
    hiddenIds: new Set(),
    xray: false,
    section: null,
    movement: null,
    isolate: false,
    pen,
    strokes,
    quiz: null,
    systems: FIRST_SYSTEMS,
  };
}

/** Opens a topic (or the whole body) in place: a fresh look at it, keeping pen and layers. */
export function openTopicIn(
  session: Session,
  topic: StudioTopic | null,
  strokes: Stroke[],
): Session {
  const region =
    topic && !topic.regions.includes(session.region)
      ? (topic.regions[0] ?? session.region)
      : session.region;
  return {
    ...startSession(topic, region, session.pen, strokes),
    region,
    hiddenKinds: session.hiddenKinds,
    xray: session.xray,
    section: session.section,
    systems: session.systems,
  };
}

/** A structure found by name on the body: picked, its system switched on, the camera turned to it. */
export function findOnBody(session: Session, id: string): Session {
  const system = BODY_SYSTEMS.find((item) => id.startsWith(`${item.id}/`));
  const systems = system ? new Set([...session.systems, system.id]) : session.systems;
  return { ...session, selected: id, systems, focus: id, panel: null };
}

/** A tap on the model: picks a region on the body, answers "Find it", or selects a structure. */
export function pickIn(session: Session, id: string | null, context: SessionContext): Session {
  if (session.mode === 'quiz') {
    // Taps after the round is over do nothing until the student plays again.
    return session.quiz && id && !roundOver(session.quiz)
      ? { ...session, quiz: answerQuiz(session.quiz, id, context.pool) }
      : session;
  }
  if (!context.topic) {
    const region = context.regions.find((item) => item.id === id);
    if (region) return { ...session, region: region.id, panel: 'topics', selected: null };
    // A structure of one of the body's systems ("skeleton/left-humerus"), or nothing.
    return { ...session, selected: id?.includes('/') ? id : null };
  }
  return { ...session, selected: id, detail: null };
}

/** Switches to a mode, or back to exploring when it is already on. */
export function changeModeIn(
  session: Session,
  mode: Mode,
  context: SessionContext,
  best: number,
): Session {
  const leaving = session.mode === mode;
  // Nothing to find (the body with no system switched on in this region): stay as it is.
  if (!leaving && mode === 'quiz' && context.pool.length === 0) return session;
  const playing = !leaving && mode === 'quiz';
  return {
    ...session,
    mode: leaving ? 'explore' : mode,
    panel: null,
    selected: null,
    quiz: playing ? startQuiz(context.pool, best) : null,
  };
}

/** What glows: the picked region on the body, else the picked structure and its whole path. */
export function litIn(session: Session, topic: StudioTopic | null): ReadonlySet<string> {
  // The whole body: the region picked, and a structure picked on one of its systems.
  if (!topic)
    return new Set(session.selected ? [session.region, session.selected] : [session.region]);
  // No hints while playing "Find it".
  if (session.mode === 'quiz' || !session.selected) return new Set();
  const onDiagram = topic.diagram?.nodes.some((node) => node.id === session.selected);
  return onDiagram && topic.diagram
    ? pathThrough(topic.diagram.edges, session.selected)
    : new Set([session.selected]);
}

/** What is switched off: the student's choice, or everything off the picked path when isolating. */
export function hiddenIn(
  session: Session,
  lit: ReadonlySet<string>,
  pool: string[],
): ReadonlySet<string> {
  return session.isolate && session.selected
    ? new Set(pool.filter((id) => !lit.has(id)))
    : session.hiddenIds;
}

/** Adds a value to a set, or takes it out when it is there. */
export function toggled<T>(set: ReadonlySet<T>, value: T): ReadonlySet<T> {
  const next = new Set(set);
  if (!next.delete(value)) next.add(value);
  return next;
}
