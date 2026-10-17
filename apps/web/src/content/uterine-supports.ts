import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  FEMALE_FLOOR,
  FEMALE_ORGANS,
  FEMALE_ORGANS_ABOVE,
  FEMALE_ORGANS_SIDE,
  FEMALE_PELVIS_CREDIT,
  FEMALE_PELVIS_MODEL_SRC,
  FEMALE_SKELETON,
  FEMALE_TRACES,
  femalePelvisParts,
} from './female-pelvis-3d';

// Pelvis batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const uterineSupports: Topic = {
  slug: 'uterine-supports',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'Supports of the uterus and the broad ligament',
  summary:
    'The broad ligament, its parts and contents; what really holds the uterus up, from the pelvic floor and perineal body to the cardinal, uterosacral, pubocervical and round ligaments and the uterine axis; and prolapse.',
  estimatedMinutes: 11,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource(
      'bd-chaurasia',
      'Volume 2, Chapter 31 Female Reproductive Organs: ligaments and supports of the uterus, pages 453 to 457',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: pelvic fascia, page 475; broad ligament, pages 477 to 478',
    ),
    {
      title: 'Female Reproductive System, Stanford Medicine EdTech',
      detail:
        'Female pelvis, organs, ligaments and perineal muscles in the 3D view; vessels and the ureter drawn as lines',
      url: 'https://sketchfab.com/3d-models/c4d5e725198d4a1997c641d548bb20ce',
      licence: 'CC BY 4.0',
    },
  ],
  keyFacts: [
    'The broad ligament is a fold of peritoneum from each lateral border of the uterus to the side wall and floor of the pelvis. Its free upper border holds the tube. The mesosalpinx lies between the tube and the ligament of the ovary, the mesovarium hangs the ovary from its back, the mesometrium is below the ligament of the ovary, and the suspensory ligament of the ovary is its lateral part.',
    'Between its layers run the tube, the round ligament, the ligament of the ovary, the uterine vessels near the uterus and the ovarian vessels laterally, nerve plexuses, embryonic remnants (epoophoron, paroophoron), lymph vessels and the parametrium.',
    'The peritoneal folds, broad ligaments included, give little support. The real supports are muscular (the pelvic diaphragm, the perineal body and the urethral sphincter mechanism) and fibromuscular (the uterine axis and condensations of pelvic fascia).',
    'The transverse cervical (cardinal, Mackenrodt’s) ligaments fan from the cervix and upper vagina to the side wall round the uterine vessels, a hammock under the uterus. The uterosacral ligaments brace the cervix back to the sacrum; the pubocervical ligaments tie it to the pubis.',
    'The round ligaments, 10 to 12 cm long, run from the uterus below the tubes through the inguinal canals to the labia majora. Pulling the fundus forward against the uterosacral ligaments’ backward pull on the cervix, they keep the uterus anteverted, so abdominal pressure presses it onto the bladder instead of down the vagina.',
  ],
  visual: {
    kind: 'path',
    // Left: the broad ligament and its parts. Right: the true supports.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'uterus',
          label: 'Holding the uterus',
          name: 'Uterus and what holds it',
          x: 180,
          y: 30,
        },
        {
          id: 'broad-ligament',
          label: 'Broad ligament',
          name: 'Broad ligament: peritoneum from the uterus to the side wall',
          x: 85,
          y: 100,
        },
        {
          id: 'mesosalpinx',
          label: 'Mesosalpinx',
          name: 'Mesosalpinx, between the tube and the ligament of the ovary',
          x: 85,
          y: 165,
        },
        {
          id: 'mesovarium',
          label: 'Mesovarium',
          name: 'Mesovarium, hanging the ovary from the back of the ligament',
          x: 85,
          y: 230,
        },
        {
          id: 'mesometrium',
          label: 'Mesometrium',
          name: 'Mesometrium, the part below the ligament of the ovary',
          x: 85,
          y: 295,
        },
        {
          id: 'suspensory',
          label: 'Suspensory\nligament of ovary',
          name: 'Suspensory ligament of the ovary, the lateral part, with the ovarian vessels',
          x: 85,
          y: 360,
        },
        {
          id: 'parametrium',
          label: 'Parametrium',
          name: 'Parametrium, the fibrofatty tissue between and below its layers',
          x: 85,
          y: 420,
        },
        {
          id: 'pelvic-diaphragm',
          label: 'Pelvic diaphragm',
          name: 'Pelvic diaphragm: levator ani, its pubococcygeus slinging the vagina',
          x: 275,
          y: 100,
        },
        {
          id: 'perineal-body',
          label: 'Perineal body',
          name: 'Perineal body, anchoring the pelvic floor',
          x: 275,
          y: 165,
        },
        {
          id: 'cardinal',
          label: 'Cardinal ligaments',
          name: 'Transverse cervical (cardinal) ligaments, from the cervix to the side wall',
          x: 275,
          y: 230,
        },
        {
          id: 'uterosacral',
          label: 'Uterosacral\nligaments',
          name: 'Uterosacral ligaments, bracing the cervix back to the sacrum',
          x: 275,
          y: 295,
        },
        {
          id: 'round',
          label: 'Round ligaments',
          name: 'Round ligaments, pulling the fundus forward through the inguinal canals',
          x: 275,
          y: 360,
        },
        {
          id: 'axis',
          label: 'Uterine axis:\nanteversion',
          name: 'The uterine axis: an anteverted uterus cannot slide down the vagina',
          x: 275,
          y: 420,
        },
      ],
      edges: [
        { from: 'uterus', to: 'broad-ligament' },
        { from: 'broad-ligament', to: 'mesosalpinx' },
        { from: 'mesosalpinx', to: 'mesovarium' },
        { from: 'mesovarium', to: 'mesometrium' },
        { from: 'mesometrium', to: 'suspensory' },
        { from: 'suspensory', to: 'parametrium' },
        { from: 'uterus', to: 'pelvic-diaphragm' },
        { from: 'pelvic-diaphragm', to: 'perineal-body' },
        { from: 'perineal-body', to: 'cardinal' },
        { from: 'cardinal', to: 'uterosacral' },
        { from: 'uterosacral', to: 'round' },
        { from: 'round', to: 'axis' },
      ],
    },
    lesions: [
      {
        id: 'prolapse',
        label: 'Prolapse',
        nodeIds: ['pelvic-diaphragm', 'perineal-body', 'cardinal'],
        explanation:
          'A pubococcygeus torn in childbirth, or a perineal body left unrepaired, loses its grip on the vagina; with stretched cardinal and uterosacral ligaments the uterus sinks down the vagina, in degrees from descent of the cervix to the whole uterus outside.',
      },
      {
        id: 'retroversion',
        label: 'Retroversion',
        nodeIds: ['round', 'uterosacral', 'axis'],
        explanation:
          'If the couple of round and uterosacral ligaments fails and the uterus tips backwards, it lines up with the vagina and abdominal pressure drives it down instead of onto the bladder.',
      },
      {
        id: 'ureter-parametrium',
        label: 'Ureter in the parametrium',
        nodeIds: ['parametrium', 'cardinal'],
        explanation:
          'The ureter runs forward in the base of the broad ligament, through the parametrium below the uterine artery and beside the cervix: it can be caught when these tissues are clamped at hysterectomy.',
      },
    ],
    drill: [
      {
        id: 'broad',
        title: 'The broad ligament',
        hint: 'The fold itself, its three mesenteries from above down, its lateral part and the tissue inside.',
        nodeIds: [
          'broad-ligament',
          'mesosalpinx',
          'mesovarium',
          'mesometrium',
          'suspensory',
          'parametrium',
        ],
      },
      {
        id: 'true-supports',
        title: 'The true supports',
        hint: 'The muscular floor and its anchor, then the ligaments round the cervix, the round ligament and the axis they keep.',
        nodeIds: ['pelvic-diaphragm', 'perineal-body', 'cardinal', 'uterosacral', 'round', 'axis'],
      },
    ],
    model3d: {
      src: FEMALE_PELVIS_MODEL_SRC,
      credit: FEMALE_PELVIS_CREDIT,
      parts: femalePelvisParts(
        [...FEMALE_SKELETON, ...FEMALE_FLOOR, ...FEMALE_ORGANS, 'urinary-bladder', 'rectum'],
        ['hip-bones', 'urinary-bladder', 'rectum'],
      ),
      traces: [
        { id: 'cardinal', ...FEMALE_TRACES.cardinalLigaments },
        { id: 'uterosacral', ...FEMALE_TRACES.uterosacralLigaments },
        { id: 'perineal-body', ...FEMALE_TRACES.perinealBody },
      ],
      stops: [FEMALE_ORGANS_ABOVE, FEMALE_ORGANS_SIDE],
    },
  },
  lesson: [
    {
      id: 'broad',
      title: 'The broad ligament',
      body: 'Each broad ligament is a double fold of peritoneum from the lateral border of the uterus to the side wall and floor of the pelvis. The two layers meet at its free upper border, which holds the uterine tube. The ovary hangs from its back layer by the mesovarium. The part between the tube and the ligament of the ovary is the mesosalpinx; below the ligament of the ovary is the mesometrium. Its lateral part, from the upper pole of the ovary and the infundibulum to the side wall, is the suspensory ligament of the ovary.',
      focus: ['broad-ligament', 'mesosalpinx', 'mesovarium', 'mesometrium', 'suspensory'],
    },
    {
      id: 'contents',
      title: 'Inside the broad ligament',
      body: 'Between its layers lie the uterine tube, the round ligament of the uterus and the ligament of the ovary. The uterine vessels run near the uterus and the ovarian vessels in the suspensory ligament, with the uterovaginal and ovarian nerve plexuses. There are remnants of the mesonephric tubules, the epoophoron and paroophoron, and lymph vessels and nodes. Round the sides of the cervix and vagina lies dense fibrofatty tissue, the parametrium, through which the ureter passes under the uterine artery.',
      focus: ['parametrium'],
    },
    {
      id: 'muscular',
      title: 'Muscular supports',
      body: 'The peritoneal folds, the broad ligaments and the vesicouterine and rectouterine folds, are secondary supports of doubtful value. The primary supports are muscular and fibromuscular. The pelvic diaphragm holds up the pelvic organs and resists every rise in abdominal pressure. Its pubococcygeus fibres pass beside the vagina into the perineal body, forming a sling and sphincter for the vagina and so, indirectly, for the uterus and bladder. The perineal body anchors the pelvic floor, and the urethral sphincter muscles that reach the vagina help too.',
      focus: ['pelvic-diaphragm', 'perineal-body'],
    },
    {
      id: 'ligaments',
      title: 'Ligaments round the cervix',
      body: 'Condensations of the pelvic fascia tie the cervix to the pelvic walls. The transverse cervical ligaments, also called cardinal or Mackenrodt’s ligaments, fan out from the sides of the cervix and upper vagina to the side wall, above levator ani and round the uterine vessels, a hammock under the uterus. The uterosacral ligaments run back from the cervix, in the folds that bound the rectouterine pouch, to the front of the sacrum, bracing the cervix backwards. The pubocervical ligaments tie it to the back of the pubis, like the puboprostatic ligaments in men.',
      focus: ['cardinal', 'uterosacral'],
    },
    {
      id: 'axis',
      title: 'Round ligaments and the axis',
      body: 'Each round ligament is a flat fibromuscular band, 10 to 12 cm long, from the uterus just below and in front of the tube. It runs forward and out in the broad ligament, through the deep inguinal ring and the inguinal canal, and fades into the labium majus. It pulls the fundus forward, and the uterosacral ligaments pull the cervix back: together they keep the uterus anteverted. An anteverted uterus lies across the vagina, so a rise in abdominal pressure presses it onto the bladder and pubis instead of down the canal.',
      focus: ['round', 'axis'],
    },
  ],
  questions: [
    {
      id: 'ut-sup-cardinal',
      prompt: 'The transverse cervical (Mackenrodt’s) ligaments run from the cervix to the:',
      options: [
        { id: 'side-wall', text: 'Side wall of the pelvis' },
        { id: 'sacrum', text: 'Sacrum' },
        { id: 'pubis', text: 'Back of the pubis' },
        { id: 'labium', text: 'Labium majus' },
      ],
      answerId: 'side-wall',
      explanation: 'The uterosacral ligaments go to the sacrum, the pubocervical to the pubis.',
    },
    {
      id: 'ut-sup-weak',
      prompt: 'Which gives the least support to the uterus?',
      options: [
        { id: 'broad', text: 'Broad ligament' },
        { id: 'cardinal', text: 'Transverse cervical ligament' },
        { id: 'levator', text: 'Levator ani' },
        { id: 'perineal-body', text: 'Perineal body' },
      ],
      answerId: 'broad',
      explanation: 'It is a fold of peritoneum, a secondary support of doubtful value.',
    },
    {
      id: 'ut-sup-mesosalpinx',
      prompt: 'The mesosalpinx is the part of the broad ligament:',
      options: [
        { id: 'tube-ovary', text: 'Between the tube and the ligament of the ovary' },
        { id: 'below', text: 'Below the ligament of the ovary' },
        { id: 'lateral', text: 'From the ovary to the side wall' },
        { id: 'ovary', text: 'Hanging the ovary' },
      ],
      answerId: 'tube-ovary',
      explanation:
        'Below is the mesometrium; the mesovarium hangs the ovary; laterally is the suspensory ligament.',
    },
    {
      id: 'ut-sup-round',
      prompt: 'The round ligament of the uterus ends in the:',
      options: [
        { id: 'labium', text: 'Labium majus' },
        { id: 'sacrum', text: 'Sacrum' },
        { id: 'ovary', text: 'Ovary' },
        { id: 'perineal-body', text: 'Perineal body' },
      ],
      answerId: 'labium',
      explanation:
        'It runs through the deep ring and inguinal canal and fades into the labium majus.',
    },
  ],
  cards: [
    {
      id: 'ut-sup-primary',
      front: 'Primary supports of the uterus?',
      back: 'Muscular: pelvic diaphragm, perineal body, urethral sphincter mechanism. Fibromuscular: uterine axis, pubocervical, transverse cervical, uterosacral and round ligaments.',
    },
    {
      id: 'ut-sup-secondary',
      front: 'Secondary supports of the uterus?',
      back: 'Peritoneal folds: the broad ligaments and the vesicouterine and rectouterine folds.',
    },
    {
      id: 'ut-sup-broad-parts',
      front: 'Parts of the broad ligament?',
      back: 'Mesosalpinx, mesovarium, mesometrium, and laterally the suspensory ligament of the ovary.',
    },
    {
      id: 'ut-sup-couple',
      front: 'Which ligaments keep the uterus anteverted?',
      back: 'The round ligaments pulling the fundus forward and the uterosacral ligaments pulling the cervix back.',
    },
    {
      id: 'ut-sup-canal-nuck',
      front: 'What is the canal of Nuck?',
      back: 'A process of peritoneum along the round ligament in the inguinal canal that persists after birth.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 31 Female Reproductive Organs',
      pages: '453–457',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '475, 477–478' },
  ],
};
