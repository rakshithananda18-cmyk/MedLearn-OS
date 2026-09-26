import type { PlannableTopic } from '@medlearn/core';
import type { Topic } from '@medlearn/schemas';

import { brachialPlexus } from './brachial-plexus';
import { oxygenCurve } from './oxygen-curve';

// ponytail: content is bundled with the app for the prototype; M4 moves it to the database.
/** Topics in teaching order. */
export const TOPICS: Topic[] = [brachialPlexus, oxygenCurve];

/** Length of an exam diagram drill on Today. */
export const DRILL_MINUTES = 10;

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((topic) => topic.slug === slug);
}

export function hasDrill(topic: Topic): boolean {
  return topic.visual.kind === 'path' && topic.visual.drill.length > 0;
}

export const PLANNABLE_TOPICS: PlannableTopic[] = TOPICS.map((topic) => ({
  slug: topic.slug,
  title: topic.title,
  estimatedMinutes: topic.estimatedMinutes,
  questionIds: topic.questions.map((question) => question.id),
  cardIds: topic.cards.map((card) => card.id),
  drillMinutes: hasDrill(topic) ? DRILL_MINUTES : null,
}));
