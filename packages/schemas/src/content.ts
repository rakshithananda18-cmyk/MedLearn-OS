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

/** A pathway diagram with clinical lesions and an optional exam diagram drill. */
export const PathVisual = z.object({
  kind: z.literal('path'),
  diagram: PathDiagram,
  lesions: z.array(Lesion),
  drill: z.array(DrillStep).default([]),
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

export const RecallCardContent = z.object({ id: Id, front: z.string(), back: z.string() });
export type RecallCardContent = z.infer<typeof RecallCardContent>;

export const Topic = z
  .object({
    slug: Id,
    subjectSlug: Id,
    title: z.string(),
    summary: z.string(),
    estimatedMinutes: z.number().int().positive(),
    /** False until a medical reviewer approves it; the app then labels it as sample content. */
    reviewed: z.boolean(),
    visual: Visual,
    lesson: z.array(LessonStep).min(1),
    questions: z.array(Question),
    cards: z.array(RecallCardContent),
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
