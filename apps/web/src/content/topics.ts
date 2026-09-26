import type { PlannableTopic } from '@medlearn/core';
import type { Topic } from '@medlearn/schemas';

import { brachialPlexus } from './brachial-plexus';

// ponytail: content is bundled with the app for the prototype; M4 moves it to the database.
/** Topics in teaching order. */
export const TOPICS: Topic[] = [brachialPlexus];

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((topic) => topic.slug === slug);
}

export const PLANNABLE_TOPICS: PlannableTopic[] = TOPICS.map((topic) => ({
  slug: topic.slug,
  title: topic.title,
  estimatedMinutes: topic.estimatedMinutes,
  questionIds: topic.questions.map((question) => question.id),
  cardIds: topic.cards.map((card) => card.id),
}));
