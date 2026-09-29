import { mistakeCardId, type PlannableTopic } from '@medlearn/core';
import type { Question, Topic } from '@medlearn/schemas';

import { armBackRadial } from './arm-back-radial';
import { armFront } from './arm-front';
import { axilla } from './axilla';
import { axillaryLymphNodes } from './axillary-lymph-nodes';
import { axillaryVessels } from './axillary-vessels';
import { backMuscles } from './back-muscles';
import { brachialPlexus } from './brachial-plexus';
import { carpalTunnel } from './carpal-tunnel';
import { cubitalFossa } from './cubital-fossa';
import { deltoidRotatorCuff } from './deltoid-rotator-cuff';
import { forearmFlexors } from './forearm-flexors';
import { forearmVesselsNerves } from './forearm-vessels-nerves';
import { oxygenCurve } from './oxygen-curve';
import { pectoralRegion } from './pectoral-region';
import { scapularSpaces } from './scapular-spaces';
import { skinVeinsLymph } from './skin-veins-lymph';

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
  backMuscles,
  deltoidRotatorCuff,
  scapularSpaces,
  skinVeinsLymph,
  armFront,
  armBackRadial,
  cubitalFossa,
  forearmFlexors,
  forearmVesselsNerves,
  carpalTunnel,
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

/** What the planner needs about each topic, plus its subject and its hero picture. */
export type TopicSummary = PlannableTopic & {
  subjectSlug: string;
  summary: string;
  /** A still of the topic's 3D model (scripts/models/render-posters.mjs), when it has one. */
  poster: string | null;
};

/** Where a topic's poster lives, when the topic has a 3D model. */
export function posterOf(topic: Topic): string | null {
  return topic.visual.kind === 'path' && topic.visual.model3d
    ? `/posters/${topic.slug}.webp`
    : null;
}

export const PLANNABLE_TOPICS: TopicSummary[] = TOPICS.map((topic) => ({
  slug: topic.slug,
  subjectSlug: topic.subjectSlug,
  summary: topic.summary,
  title: topic.title,
  estimatedMinutes: topic.estimatedMinutes,
  questionIds: topic.questions.map((question) => question.id),
  cardIds: topic.cards.map((card) => card.id),
  drillMinutes: hasDrill(topic) ? DRILL_MINUTES : null,
  poster: posterOf(topic),
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
