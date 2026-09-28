import type { BodyRegion, PartKind } from '@medlearn/schemas';
import { pathThrough } from '@medlearn/visuals';
import type { Stroke } from '@medlearn/visuals/viewer3d';

import type { StudioTopic } from './knowledge';
import { answerQuiz, type QuizState, startQuiz } from './quiz';

// What the student is doing in the 3D studio, and every change to it, as plain functions: the
// component keeps only the side effects (saving, the address bar) and the layout.

export type Mode = 'explore' | 'draw' | 'quiz';
export type Panel = 'topics' | 'layers' | null;

export interface Session {
  topicSlug: string | null;
  region: BodyRegion;
  panel: Panel;
  mode: Mode;
  selected: string | null;
  expanded: boolean;
  stopIndex: number;
  hiddenKinds: ReadonlySet<PartKind>;
  hiddenIds: ReadonlySet<string>;
  xray: boolean;
  isolate: boolean;
  pen: string;
  strokes: Stroke[];
  quiz: QuizState | null;
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
    expanded: false,
    stopIndex: 0,
    hiddenKinds: new Set(),
    hiddenIds: new Set(),
    xray: false,
    isolate: false,
    pen,
    strokes,
    quiz: null,
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
  };
}

/** A tap on the model: picks a region on the body, answers "Find it", or selects a structure. */
export function pickIn(session: Session, id: string | null, context: SessionContext): Session {
  if (!context.topic) {
    const region = context.regions.find((item) => item.id === id);
    return region ? { ...session, region: region.id, panel: 'topics' } : session;
  }
  if (session.mode === 'quiz') {
    return session.quiz && id
      ? { ...session, quiz: answerQuiz(session.quiz, id, context.pool) }
      : session;
  }
  return { ...session, selected: id, expanded: false };
}

/** Switches to a mode, or back to exploring when it is already on. */
export function changeModeIn(
  session: Session,
  mode: Mode,
  context: SessionContext,
  best: number,
): Session {
  const leaving = session.mode === mode;
  const playing = !leaving && mode === 'quiz' && context.topic !== null;
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
  if (!topic) return new Set([session.region]);
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
