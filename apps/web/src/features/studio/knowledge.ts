import type {
  BodyRegion,
  Lesion,
  LessonStep,
  Model3D,
  ModelTrace,
  PartKind,
  PathDiagram,
} from '@medlearn/schemas';
import { affectedBy, pathThrough } from '@medlearn/visuals';

/** What the studio knows about a topic: its model and the lesson text it can draw on. */
export interface StudioTopic {
  slug: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  regions: BodyRegion[];
  /** A still of the model, for the topic cards on the body. */
  poster: string | null;
  /** For mastery: the topic's questions and recall cards. */
  questionIds: string[];
  cardIds: string[];
  drillMinutes: number | null;
  model: Model3D | null;
  diagram: PathDiagram | null;
  lesson: Array<Pick<LessonStep, 'title' | 'body' | 'focus'>>;
  lesions: Array<Pick<Lesion, 'label' | 'explanation' | 'nodeIds'>>;
}

export interface StructureInfo {
  id: string;
  name: string;
  kind: PartKind | ModelTrace['kind'] | null;
  about: string | null;
  /** Names along the structure's path (a nerve from its roots, an artery from the subclavian). */
  path: string[];
  /** What the topic's lesson says about it. */
  lesson: Array<{ title: string; body: string }>;
  /** Lesions that reach it. */
  clinical: Array<{ label: string; explanation: string }>;
  /** Other topics that show it. */
  alsoIn: Array<{ slug: string; title: string }>;
}

function shows(topic: StudioTopic, id: string): boolean {
  return (
    topic.diagram?.nodes.some((node) => node.id === id) === true ||
    topic.model?.parts.some((part) => part.id === id) === true ||
    topic.model?.traces.some((trace) => trace.id === id) === true
  );
}

/** Everything the studio can tell a student about one structure of a topic. */
export function structureInfo(
  topic: StudioTopic,
  id: string,
  topics: StudioTopic[],
): StructureInfo | null {
  const node = topic.diagram?.nodes.find((item) => item.id === id);
  const part = topic.model?.parts.find((item) => item.id === id);
  const trace = topic.model?.traces.find((item) => item.id === id);
  const name = node?.name ?? part?.name;
  if (!name) return null;
  const kind = part?.kind ?? trace?.kind ?? null;

  const edges = topic.diagram?.edges ?? [];
  const onPath = node ? pathThrough(edges, id) : new Set<string>();
  const pathNames = (topic.diagram?.nodes ?? [])
    .filter((item) => onPath.has(item.id))
    .map((item) => item.name);
  // Bones and muscles sit in a diagram as members of a wall, not along a route.
  const path = kind === 'bone' || kind === 'muscle' || pathNames.length < 2 ? [] : pathNames;

  return {
    id,
    name,
    kind,
    about: part?.about ?? null,
    path,
    lesson: topic.lesson
      .filter((step) => step.focus.includes(id))
      .map(({ title, body }) => ({ title, body })),
    clinical: topic.lesions
      .filter((lesion) => affectedBy(edges, lesion.nodeIds).has(id))
      .map(({ label, explanation }) => ({ label, explanation })),
    alsoIn: topics
      .filter((other) => other.slug !== topic.slug && shows(other, id))
      .map(({ slug, title }) => ({ slug, title })),
  };
}

/** Every structure a student can pick on the model, with its display name. */
export function structuresOf(
  topic: StudioTopic,
): Array<{ id: string; name: string; kind: string }> {
  const nameOf = (id: string, fallback: string) =>
    topic.diagram?.nodes.find((node) => node.id === id)?.name ?? fallback;
  return [
    ...(topic.model?.traces ?? []).map((trace) => ({
      id: trace.id,
      name: nameOf(trace.id, trace.id),
      kind: trace.kind,
    })),
    ...(topic.model?.parts ?? []).map((part) => ({
      id: part.id,
      name: nameOf(part.id, part.name),
      kind: part.kind,
    })),
  ];
}
