import { mistakeCardId, type PlannableTopic } from '@medlearn/core';
import type { Question, Topic } from '@medlearn/schemas';

import { topicReviewDigest } from '@/server/review-digest';

import { abdominalAorta } from './abdominal-aorta';
import { abdominalAutonomicNerves } from './abdominal-autonomic-nerves';
import { abdominalRegions } from './abdominal-regions';
import { abdominalWallMuscles } from './abdominal-wall-muscles';
import { abdominalWallSuperficial } from './abdominal-wall-superficial';
import { ankleTibiofibularJoints } from './ankle-tibiofibular-joints';
import { anteriorTibialDorsalisPedis } from './anterior-tibial-dorsalis-pedis';
import { aorta } from './aorta';
import { appendix } from './appendix';
import { armBackRadial } from './arm-back-radial';
import { armFront } from './arm-front';
import { assetUrl } from './asset-url';
import { axilla } from './axilla';
import { axillaryLymphNodes } from './axillary-lymph-nodes';
import { axillaryVessels } from './axillary-vessels';
import { backMuscles } from './back-muscles';
import { biliaryApparatus } from './biliary-apparatus';
import { bonyPelvis } from './bony-pelvis';
import { brachialPlexus } from './brachial-plexus';
import { bronchopulmonarySegments } from './bronchopulmonary-segments';
import { calfMuscles } from './calf-muscles';
import { carpalTunnel } from './carpal-tunnel';
import { coeliacTrunk } from './coeliac-trunk';
import { coronaryCirculation } from './coronary-circulation';
import { cubitalFossa } from './cubital-fossa';
import { deltoidRotatorCuff } from './deltoid-rotator-cuff';
import { diaphragm } from './diaphragm';
import { ductusDeferens } from './ductus-deferens';
import { duodenum } from './duodenum';
import { elbowAnastomosis } from './elbow-anastomosis';
import { elbowJoint } from './elbow-joint';
import { femalePerineum } from './female-perineum';
import { femoralTriangle } from './femoral-triangle';
import { femoralVesselsNerve } from './femoral-vessels-nerve';
import { fetalCirculation } from './fetal-circulation';
import { footArches } from './foot-arches';
import { footJoints } from './foot-joints';
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
import { hipJoint } from './hip-joint';
import { inferiorVenaCava } from './inferior-vena-cava';
import { inguinalCanal } from './inguinal-canal';
import { intercostalSpaces } from './intercostal-spaces';
import { internalThoracicAzygos } from './internal-thoracic-azygos';
import { intervertebralDisc } from './intervertebral-disc';
import { ischioanalFossa } from './ischioanal-fossa';
import { jejunumIleum } from './jejunum-ileum';
import { kidney } from './kidney';
import { kneeAnastomoses } from './knee-anastomoses';
import { kneeJoint } from './knee-joint';
import { largeIntestine } from './large-intestine';
import { legFrontMuscles } from './leg-front-muscles';
import { legLateralMedial } from './leg-lateral-medial';
import { legSuperficial } from './leg-superficial';
import { lesserSac } from './lesser-sac';
import { liver } from './liver';
import { liverSegments } from './liver-segments';
import { lowerLimbDermatomes } from './lower-limb-dermatomes';
import { lowerLimbDevelopment } from './lower-limb-development';
import { lowerLimbLymphatics } from './lower-limb-lymphatics';
import { lowerLimbNerveInjuries } from './lower-limb-nerve-injuries';
import { lowerLimbSurfaceMarking } from './lower-limb-surface-marking';
import { lowerLimbVeins } from './lower-limb-veins';
import { lowerLimbXrays } from './lower-limb-xrays';
import { lumbarPlexus } from './lumbar-plexus';
import { lumbarVertebraeSacrum } from './lumbar-vertebrae-sacrum';
import { lungRootBronchialTree } from './lung-root-bronchial-tree';
import { lungs } from './lungs';
import { maleUrogenitalRegion } from './male-urogenital-region';
import { mediastinum } from './mediastinum';
import { mesentericVessels } from './mesenteric-vessels';
import { nerveInjuries } from './nerve-injuries';
import { oesophagus } from './oesophagus';
import { ovaryUterineTube } from './ovary-uterine-tube';
import { oxygenCurve } from './oxygen-curve';
import { palmSpaces } from './palm-spaces';
import { palmVesselsNerves } from './palm-vessels-nerves';
import { pancreas } from './pancreas';
import { pectoralRegion } from './pectoral-region';
import { pelvicCavity } from './pelvic-cavity';
import { penis } from './penis';
import { pericardium } from './pericardium';
import { perineum } from './perineum';
import { peritonealFolds } from './peritoneal-folds';
import { peritonealSpaces } from './peritoneal-spaces';
import { peritoneum } from './peritoneum';
import { plantarVesselsNerves } from './plantar-vessels-nerves';
import { pleura } from './pleura';
import { poplitealFossa } from './popliteal-fossa';
import { poplitealVesselsNerves } from './popliteal-vessels-nerves';
import { portalVein } from './portal-vein';
import { posteriorAbdominalWall } from './posterior-abdominal-wall';
import { posteriorTibialTibialNerve } from './posterior-tibial-tibial-nerve';
import { prostate } from './prostate';
import { pudendalNerveVessels } from './pudendal-nerve-vessels';
import { radioulnarJoints } from './radioulnar-joints';
import { rectusSheath } from './rectus-sheath';
import { ribs } from './ribs';
import { scapularSpaces } from './scapular-spaces';
import { sciaticNerveThigh } from './sciatic-nerve-thigh';
import { scrotumTestis } from './scrotum-testis';
import { shoulderGirdle } from './shoulder-girdle';
import { shoulderJoint } from './shoulder-joint';
import { skinVeinsLymph } from './skin-veins-lymph';
import { soleLayersOneTwo } from './sole-layers-1-2';
import { soleLayersThreeFour } from './sole-layers-3-4';
import { soleSkinFascia } from './sole-skin-fascia';
import { spleen } from './spleen';
import { sternumThoracicVertebrae } from './sternum-thoracic-vertebrae';
import { stomach } from './stomach';
import { stomachSupply } from './stomach-supply';
import { suprarenalGland } from './suprarenal-gland';
import { surfaceMarking } from './surface-marking';
import { svcPulmonaryTrunk } from './svc-pulmonary-trunk';
import { testisDescent } from './testis-descent';
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
import { ureter } from './ureter';
import { urethra } from './urethra';
import { urinaryBladder } from './urinary-bladder';
import { uterineSupports } from './uterine-supports';
import { uterus } from './uterus';
import { vagina } from './vagina';
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
  legSuperficial,
  legFrontMuscles,
  anteriorTibialDorsalisPedis,
  legLateralMedial,
  calfMuscles,
  posteriorTibialTibialNerve,
  soleSkinFascia,
  soleLayersOneTwo,
  soleLayersThreeFour,
  plantarVesselsNerves,
  lowerLimbVeins,
  lowerLimbLymphatics,
  lowerLimbDermatomes,
  hipJoint,
  kneeJoint,
  ankleTibiofibularJoints,
  footJoints,
  footArches,
  lowerLimbSurfaceMarking,
  lowerLimbXrays,
  lowerLimbNerveInjuries,
  lowerLimbDevelopment,
  lumbarVertebraeSacrum,
  intervertebralDisc,
  bonyPelvis,
  abdominalRegions,
  abdominalWallSuperficial,
  abdominalWallMuscles,
  rectusSheath,
  inguinalCanal,
  penis,
  scrotumTestis,
  testisDescent,
  peritoneum,
  peritonealFolds,
  lesserSac,
  peritonealSpaces,
  stomach,
  stomachSupply,
  duodenum,
  jejunumIleum,
  largeIntestine,
  appendix,
  coeliacTrunk,
  mesentericVessels,
  portalVein,
  biliaryApparatus,
  spleen,
  pancreas,
  liver,
  liverSegments,
  kidney,
  ureter,
  suprarenalGland,
  diaphragm,
  abdominalAorta,
  inferiorVenaCava,
  posteriorAbdominalWall,
  lumbarPlexus,
  abdominalAutonomicNerves,
  perineum,
  ischioanalFossa,
  maleUrogenitalRegion,
  femalePerineum,
  pudendalNerveVessels,
  pelvicCavity,
  urinaryBladder,
  urethra,
  prostate,
  ductusDeferens,
  ovaryUterineTube,
  uterus,
  uterineSupports,
  vagina,
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
    ? assetUrl(`/posters/${topic.slug}.webp`)
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
export type TopicTrust = Pick<Topic, 'slug' | 'title' | 'version' | 'reviewed' | 'sources'> & {
  contentDigest?: string;
};

export function trustOf(topic: Topic): TopicTrust {
  const { slug, title, version, reviewed, sources } = topic;
  return { slug, title, version, reviewed, sources, contentDigest: topicReviewDigest(topic) };
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
