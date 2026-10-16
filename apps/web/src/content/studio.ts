import type { StudioTopic } from '@/features/studio/knowledge';

import { assetUrl } from './asset-url';
import { BODY_MODEL, BODY_SYSTEMS } from './body';
import { movementsFor } from './joint-movements';
import { DRILL_MINUTES, hasDrill, posterOf, TOPICS } from './topics';
import { filmsFor, XRAYS } from './xrays';

/** Versioned file addresses are serialized as props, keeping the manifest on the server. */
export function studioAssets() {
  return {
    body: { ...BODY_MODEL, src: assetUrl(BODY_MODEL.src) },
    systems: BODY_SYSTEMS.map((system) => ({
      ...system,
      src: system.src ? assetUrl(system.src) : null,
    })),
    bodyIndexSrc: assetUrl('/models/body-index.json'),
    films: XRAYS.map((film) => ({ ...film, src: assetUrl(`/xrays/${film.id}.webp`) })),
  };
}

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
    model:
      topic.visual.kind === 'path' && topic.visual.model3d
        ? { ...topic.visual.model3d, src: assetUrl(topic.visual.model3d.src) }
        : null,
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
    filmIds: filmsFor(topic.slug).map((film) => film.id),
    movements: movementsFor(topic.slug),
  }));
}
