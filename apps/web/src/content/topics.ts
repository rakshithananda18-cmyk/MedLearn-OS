import { mistakeCardId, type PlannableTopic } from '@medlearn/core';
import type { Question, Topic } from '@medlearn/schemas';

import { axilla } from './axilla';
import { axillaryLymphNodes } from './axillary-lymph-nodes';
import { axillaryVessels } from './axillary-vessels';
import { brachialPlexus } from './brachial-plexus';
import { oxygenCurve } from './oxygen-curve';
import { pectoralRegion } from './pectoral-region';

// Content is imported only by server components (pages, routes); each page hands its screen just
// what that screen shows, so adding topics never grows the JavaScript every page downloads.
// ponytail: bundled with the app while it is private and small; a content database comes with
// the provenance foundation.
/** Topics in teaching order: anatomy follows BD Chaurasia's chapters (Blueprint v0.5, Section 34). */
export const TOPICS: Topic[] = [
  pectoralRegion,
  axilla,
  axillaryVessels,
  axillaryLymphNodes,
  brachialPlexus,
  oxygenCurve,
];

/** Length of an exam diagram drill on Today. */
export const DRILL_MINUTES = 10;

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((topic) => topic.slug === slug);
}

export function hasDrill(topic: Topic): boolean {
  return topic.visual.kind === 'path' && topic.visual.drill.length > 0;
}

/** What the planner needs about each topic, plus its subject for grouping. */
export type TopicSummary = PlannableTopic & { subjectSlug: string };

export const PLANNABLE_TOPICS: TopicSummary[] = TOPICS.map((topic) => ({
  slug: topic.slug,
  subjectSlug: topic.subjectSlug,
  title: topic.title,
  estimatedMinutes: topic.estimatedMinutes,
  questionIds: topic.questions.map((question) => question.id),
  cardIds: topic.cards.map((card) => card.id),
  drillMinutes: hasDrill(topic) ? DRILL_MINUTES : null,
}));

/** What the source drawer shows about the topic a question or card comes from. */
export type TopicTrust = Pick<Topic, 'slug' | 'title' | 'version' | 'reviewed' | 'sources'>;

function trustOf({ slug, title, version, reviewed, sources }: Topic): TopicTrust {
  return { slug, title, version, reviewed, sources };
}

export interface PracticeQuestion {
  topic: TopicTrust;
  question: Question;
}

/** Every practice question with the topic it comes from. */
export function practiceQuestions(): PracticeQuestion[] {
  return TOPICS.flatMap((topic) => {
    const trust = trustOf(topic);
    return topic.questions.map((question) => ({ topic: trust, question }));
  });
}

export interface DeckCard {
  topic: TopicTrust;
  id: string;
  front: string;
  back: string;
  fromMistake: boolean;
}

/** Every recall card: each topic's own cards plus one for each question a student can miss. */
export function recallDeck(): DeckCard[] {
  return TOPICS.flatMap((topic) => {
    const trust = trustOf(topic);
    return [
      ...topic.cards.map((card) => ({ topic: trust, ...card, fromMistake: false })),
      ...topic.questions.map((question) => {
        const answer = question.options.find((option) => option.id === question.answerId);
        return {
          topic: trust,
          id: mistakeCardId(question.id),
          front: question.prompt,
          back: `${answer?.text ?? ''}. ${question.explanation}`,
          fromMistake: true,
        };
      }),
    ];
  });
}
