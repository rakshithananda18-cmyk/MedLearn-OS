import { mistakeCardId, type PlannableTopic } from '@medlearn/core';
import type { Question, Topic } from '@medlearn/schemas';

import { aorta } from './aorta';
import { armBackRadial } from './arm-back-radial';
import { armFront } from './arm-front';
import { axilla } from './axilla';
import { axillaryLymphNodes } from './axillary-lymph-nodes';
import { axillaryVessels } from './axillary-vessels';
import { backMuscles } from './back-muscles';
import { brachialPlexus } from './brachial-plexus';
import { bronchopulmonarySegments } from './bronchopulmonary-segments';
import { carpalTunnel } from './carpal-tunnel';
import { coronaryCirculation } from './coronary-circulation';
import { cubitalFossa } from './cubital-fossa';
import { deltoidRotatorCuff } from './deltoid-rotator-cuff';
import { elbowAnastomosis } from './elbow-anastomosis';
import { elbowJoint } from './elbow-joint';
import { femoralTriangle } from './femoral-triangle';
import { femoralVesselsNerve } from './femoral-vessels-nerve';
import { fetalCirculation } from './fetal-circulation';
import { forearmExtensors } from './forearm-extensors';
import { forearmFlexors } from './forearm-flexors';
import { forearmVesselsNerves } from './forearm-vessels-nerves';
import { glutealMuscles } from './gluteal-muscles';
import { glutealNervesVessels } from './gluteal-nerves-vessels';
import { hamstringMuscles } from './hamstrings';
import { handMuscles } from './hand-muscles';
import { heartChambers } from './heart-chambers';
import { heartExternalFeatures } from './heart-external-features';
import { heartValvesConduction } from './heart-valves-conduction';
import { intercostalSpaces } from './intercostal-spaces';
import { internalThoracicAzygos } from './internal-thoracic-azygos';
import { kneeAnastomoses } from './knee-anastomoses';
import { lungRootBronchialTree } from './lung-root-bronchial-tree';
import { lungs } from './lungs';
import { mediastinum } from './mediastinum';
import { nerveInjuries } from './nerve-injuries';
import { oesophagus } from './oesophagus';
import { oxygenCurve } from './oxygen-curve';
import { palmSpaces } from './palm-spaces';
import { palmVesselsNerves } from './palm-vessels-nerves';
import { pectoralRegion } from './pectoral-region';
import { pericardium } from './pericardium';
import { pleura } from './pleura';
import { poplitealFossa } from './popliteal-fossa';
import { poplitealVesselsNerves } from './popliteal-vessels-nerves';
import { radioulnarJoints } from './radioulnar-joints';
import { ribs } from './ribs';
import { scapularSpaces } from './scapular-spaces';
import { sciaticNerveThigh } from './sciatic-nerve-thigh';
import { shoulderGirdle } from './shoulder-girdle';
import { shoulderJoint } from './shoulder-joint';
import { skinVeinsLymph } from './skin-veins-lymph';
import { sternumThoracicVertebrae } from './sternum-thoracic-vertebrae';
import { surfaceMarking } from './surface-marking';
import { svcPulmonaryTrunk } from './svc-pulmonary-trunk';
import { thighFrontMuscles } from './thigh-front-muscles';
import { thighMedial } from './thigh-medial';
import { thighSuperficial } from './thigh-superficial';
import { thoracicDuct } from './thoracic-duct';
import { thoracicJointsRespiration } from './thoracic-joints-respiration';
import { thoraxIntroduction } from './thorax-introduction';
import { thoraxSurfaceXray } from './thorax-surface-xray';
import { trachea } from './trachea';
import { upperLimbDevelopment } from './upper-limb-development';
import { upperLimbXrays } from './upper-limb-xrays';
import { wristBack } from './wrist-back';
import { wristHandJoints } from './wrist-hand-joints';

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
  handMuscles,
  palmVesselsNerves,
  palmSpaces,
  wristBack,
  forearmExtensors,
  shoulderGirdle,
  shoulderJoint,
  elbowJoint,
  radioulnarJoints,
  wristHandJoints,
  surfaceMarking,
  upperLimbXrays,
  nerveInjuries,
  elbowAnastomosis,
  upperLimbDevelopment,
  thoraxIntroduction,
  ribs,
  sternumThoracicVertebrae,
  thoracicJointsRespiration,
  intercostalSpaces,
  internalThoracicAzygos,
  pleura,
  lungs,
  lungRootBronchialTree,
  bronchopulmonarySegments,
  mediastinum,
  pericardium,
  heartExternalFeatures,
  heartChambers,
  heartValvesConduction,
  coronaryCirculation,
  fetalCirculation,
  svcPulmonaryTrunk,
  aorta,
  trachea,
  oesophagus,
  thoracicDuct,
  thoraxSurfaceXray,
  thighSuperficial,
  femoralTriangle,
  femoralVesselsNerve,
  thighFrontMuscles,
  thighMedial,
  glutealMuscles,
  glutealNervesVessels,
  poplitealFossa,
  poplitealVesselsNerves,
  kneeAnastomoses,
  hamstringMuscles,
  sciaticNerveThigh,
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
