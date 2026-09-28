import type { StudioTopic } from '@/features/studio/knowledge';

import { DRILL_MINUTES, hasDrill, posterOf, TOPICS } from './topics';

/** Every topic as the 3D studio sees it: its model, diagram and the lesson text it draws on. */
export function studioTopics(): StudioTopic[] {
  return TOPICS.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    summary: topic.summary,
    estimatedMinutes: topic.estimatedMinutes,
    regions: topic.regions,
    poster: posterOf(topic),
    questionIds: topic.questions.map((question) => question.id),
    cardIds: topic.cards.map((card) => card.id),
    drillMinutes: hasDrill(topic) ? DRILL_MINUTES : null,
    model: topic.visual.kind === 'path' ? (topic.visual.model3d ?? null) : null,
    diagram: topic.visual.kind === 'path' ? topic.visual.diagram : null,
    lesson: topic.lesson.map(({ title, body, focus }) => ({ title, body, focus })),
    lesions:
      topic.visual.kind === 'path'
        ? topic.visual.lesions.map(({ label, explanation, nodeIds }) => ({
            label,
            explanation,
            nodeIds,
          }))
        : [],
  }));
}
