import { z } from 'zod';

const Id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);

/** A node in a pathway diagram (nerve roots, trunks, cords, branches...). */
export const DiagramNode = z.object({
  id: Id,
  /** Visible label; `\n` breaks it over two lines. */
  label: z.string().min(1),
  /** Name read by screen readers when the label is abbreviated. */
  name: z.string().min(1),
  x: z.number(),
  y: z.number(),
});
export type DiagramNode = z.infer<typeof DiagramNode>;

export const PathDiagram = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
  nodes: z.array(DiagramNode).min(1),
  edges: z.array(z.object({ from: Id, to: Id })),
});
export type PathDiagram = z.infer<typeof PathDiagram>;

/** A clinical lesion shown on the diagram, e.g. Erb's palsy at C5–C6. */
export const Lesion = z.object({
  id: Id,
  label: z.string(),
  nodeIds: z.array(Id).min(1),
  explanation: z.string(),
});
export type Lesion = z.infer<typeof Lesion>;

/** One layer of an exam diagram drill: the student labels these nodes, then lines draw in. */
export const DrillStep = z.object({
  id: Id,
  title: z.string(),
  hint: z.string(),
  nodeIds: z.array(Id).min(1),
});
export type DrillStep = z.infer<typeof DrillStep>;

/** Blood conditions that shift the oxygen–haemoglobin curve; omitted values stay normal. */
export const CurveConditions = z
  .object({
    pco2: z.number().min(10).max(100),
    ph: z.number().min(6.8).max(7.8),
    temperature: z.number().min(30).max(44),
    bpg: z.number().min(0).max(10),
  })
  .partial();
export type CurveConditions = z.infer<typeof CurveConditions>;

/** A point in a 3D model's own frame (BodyParts3D: millimetres, Z up). */
export const Point3 = z.tuple([z.number(), z.number(), z.number()]);
export type Point3 = z.infer<typeof Point3>;

export const PartKind = z.enum(['bone', 'muscle', 'artery', 'vein', 'skin']);
export type PartKind = z.infer<typeof PartKind>;

/** A named mesh inside the model file; a model shows only the parts its content lists. */
export const ModelPart = z.object({
  id: Id,
  name: z.string().min(1),
  kind: PartKind,
  /** What it is and why it matters, in a sentence or two; shown when a student picks it. */
  about: z.string().min(1).optional(),
});
export type ModelPart = z.infer<typeof ModelPart>;

/**
 * A structure the model file lacks (nerves, lymph node groups, the outline of an organ it has no
 * mesh for), drawn as tubes through these points; the id is a node of the topic's 2D diagram.
 */
export const ModelTrace = z.object({
  id: Id,
  kind: z.enum(['nerve', 'lymph', 'outline']),
  paths: z.array(z.array(Point3).min(2)).min(1),
});
export type ModelTrace = z.infer<typeof ModelTrace>;

/** A guided camera position, with what to look at there. */
export const CameraStop = z.object({
  id: Id,
  title: z.string().min(1),
  description: z.string().min(1),
  target: Point3,
  position: Point3,
});
export type CameraStop = z.infer<typeof CameraStop>;

export const Model3D = z.object({
  /** Model file under /public, compressed glTF. */
  src: z.string().startsWith('/models/'),
  /** Visible credit for the model file and our schematic additions. */
  credit: z.string().min(1),
  parts: z.array(ModelPart).min(1),
  traces: z.array(ModelTrace),
  stops: z.array(CameraStop).min(1),
});
export type Model3D = z.infer<typeof Model3D>;

/** A pathway diagram with clinical lesions and an optional exam diagram drill. */
export const PathVisual = z.object({
  kind: z.literal('path'),
  diagram: PathDiagram,
  lesions: z.array(Lesion),
  drill: z.array(DrillStep).default([]),
  /** Optional 3D view of the same structures. */
  model3d: Model3D.optional(),
});
export type PathVisual = z.infer<typeof PathVisual>;

/** The oxygen–haemoglobin dissociation curve with condition sliders. */
export const OxygenCurveVisual = z.object({ kind: z.literal('oxygen-curve') });
export type OxygenCurveVisual = z.infer<typeof OxygenCurveVisual>;

export const Visual = z.discriminatedUnion('kind', [PathVisual, OxygenCurveVisual]);
export type Visual = z.infer<typeof Visual>;

export const LessonStep = z.object({
  id: Id,
  title: z.string(),
  body: z.string(),
  /** Diagram nodes highlighted for this step (path visuals). */
  focus: z.array(Id).default([]),
  /** Curve state shown for this step (curve visuals). */
  conditions: CurveConditions.optional(),
});
export type LessonStep = z.infer<typeof LessonStep>;

export const Question = z.object({
  id: Id,
  prompt: z.string(),
  options: z.array(z.object({ id: Id, text: z.string() })).min(2),
  answerId: Id,
  explanation: z.string(),
});
export type Question = z.infer<typeof Question>;

/** Where a fact comes from; the source drawer lists these for every topic. */
export const ContentSource = z.object({
  title: z.string().min(1),
  /** Chapter or section, when the source is long. */
  detail: z.string().optional(),
  url: z.url().optional(),
  licence: z.string().min(1),
});
export type ContentSource = z.infer<typeof ContentSource>;

export const RecallCardContent = z.object({ id: Id, front: z.string(), back: z.string() });
export type RecallCardContent = z.infer<typeof RecallCardContent>;

/** A standard textbook students follow. Several cover each subject; each student picks theirs. */
export const Book = z.object({
  id: Id,
  subjectSlug: Id,
  title: z.string().min(1),
  /** How students usually name it, such as “BD Chaurasia”. */
  shortTitle: z.string().min(1),
  authors: z.string().min(1),
  /** Edition the chapter and page references follow, once the group confirms it. */
  edition: z.string().min(1).optional(),
});
export type Book = z.infer<typeof Book>;

/** Where one book covers a topic. */
export const BookRef = z.object({
  bookId: Id,
  chapter: z.string().min(1),
  pages: z.string().min(1).optional(),
});
export type BookRef = z.infer<typeof BookRef>;

/** Where a topic sits on the body, so students can pick what to study from a body map. */
export const BodyRegion = z.enum([
  'head-neck',
  'thorax',
  'abdomen',
  'pelvis',
  'back',
  'upper-limb',
  'lower-limb',
]);
export type BodyRegion = z.infer<typeof BodyRegion>;

export const Topic = z
  .object({
    slug: Id,
    subjectSlug: Id,
    /** Body regions the topic belongs to, in the book's order (the pectoral region is both). */
    regions: z.array(BodyRegion).min(1),
    title: z.string(),
    summary: z.string(),
    estimatedMinutes: z.number().int().positive(),
    /** False until a medical reviewer approves it; the app then labels it as sample content. */
    reviewed: z.boolean(),
    /** Content version, reported with every issue so reviewers see what the student saw. */
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    sources: z.array(ContentSource).min(1),
    /** The few facts to remember, shown when the lesson ends. */
    keyFacts: z.array(z.string().min(1)).min(1),
    visual: Visual,
    lesson: z.array(LessonStep).min(1),
    questions: z.array(Question),
    cards: z.array(RecallCardContent),
    /** Where each standard book covers this topic, so students read it in their own book. */
    readIn: z.array(BookRef),
  })
  .superRefine((topic, ctx) => {
    const { visual } = topic;
    const nodeIds = new Set(
      visual.kind === 'path' ? visual.diagram.nodes.map((node) => node.id) : [],
    );
    const referenced = [
      ...topic.lesson.flatMap((step) => step.focus),
      ...(visual.kind === 'path'
        ? [
            ...visual.diagram.edges.flatMap((edge) => [edge.from, edge.to]),
            ...visual.lesions.flatMap((lesion) => lesion.nodeIds),
            ...visual.drill.flatMap((step) => step.nodeIds),
            ...(visual.model3d?.traces.map((trace) => trace.id) ?? []),
          ]
        : []),
    ];
    for (const id of referenced) {
      if (!nodeIds.has(id))
        ctx.addIssue({ code: 'custom', message: `Unknown diagram node "${id}"` });
    }
    for (const question of topic.questions) {
      if (!question.options.some((option) => option.id === question.answerId)) {
        ctx.addIssue({
          code: 'custom',
          message: `Question "${question.id}" has no matching answer`,
        });
      }
    }
  });
export type Topic = z.infer<typeof Topic>;
