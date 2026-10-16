import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  AORTIC_BIFURCATION,
  GREAT_VESSELS_FRONT,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 5 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const inferiorVenaCava: Topic = {
  slug: 'inferior-vena-cava',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The inferior vena cava',
  summary:
    'How it forms at L5 and climbs to the caval opening at T8, what lies in front of and behind it, its tributaries, the azygos and hemiazygos veins below the diaphragm, and the routes round a blocked cava.',
  estimatedMinutes: 12,
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
      'Volume 2, Chapter 27 Posterior Abdominal Wall: inferior vena cava, azygos and hemiazygos veins, pages 397 to 399',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: inferior vena cava, pages 390 to 391'),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'IVC, its tributaries, the azygos veins, kidneys and spine in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Formed by the two common iliac veins on the right of the body of L5, behind the right common iliac artery. It climbs in front of the spine on the right of the aorta, grooves the back of the liver, pierces the central tendon at T8 and opens into the right atrium. The largest vein in the body.',
    'In front, from below up: the right common iliac artery, the root of the mesentery and the right gonadal artery, the third part of the duodenum, the head of the pancreas with the bile duct, the first part of the duodenum and the portal vein, the epiploic foramen, the liver. Behind: the right crus with the right renal artery, right coeliac ganglion and right suprarenal, then the right sympathetic chain and psoas.',
    'Tributaries: common iliac, third and fourth lumbar, right gonadal, renal, right suprarenal, inferior phrenic and hepatic veins (“I Like To Rise So High”). The left gonadal and left suprarenal veins end in the left renal vein, which crosses in front of the aorta below the superior mesenteric artery. The veins of the gut and spleen go to the portal vein instead.',
    'The ascending lumbar veins link the common iliac, iliolumbar and lumbar veins; each joins the subcostal vein to form the azygos (right) or hemiazygos (left). The azygos may also begin from the back of the IVC and goes up through the aortic opening; the hemiazygos from the back of the left renal vein, through the left crus.',
    'A blocked cava swells the legs and back, and blood returns to the superior vena cava through superficial veins (superficial epigastric, thoracoepigastric, lateral thoracic, dilated on the trunk) and deep ones (azygos, hemiazygos, lumbar veins and the vertebral venous plexus). It develops from several embryonic veins on the right: cardinal, supracardinal, subcardinal and vitelline.',
  ],
  visual: {
    kind: 'path',
    // Left: course and relations, from below up. Right: tributaries, from below up.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'inferior-vena-cava',
          label: 'IVC: L5 to T8',
          name: 'Inferior vena cava, from L5 to T8',
          x: 180,
          y: 30,
        },
        {
          id: 'formation',
          label: 'Common iliacs\njoin at L5',
          name: 'Formed by the common iliac veins on the right of L5',
          x: 85,
          y: 100,
        },
        {
          id: 'front-lower',
          label: 'In front: duodenum,\nmesentery root',
          name: 'In front, lower down: the right common iliac artery, root of the mesentery, third part of the duodenum',
          x: 85,
          y: 165,
        },
        {
          id: 'front-upper',
          label: 'Pancreas head,\nportal vein',
          name: 'In front, higher: head of the pancreas and bile duct, first part of the duodenum, portal vein',
          x: 85,
          y: 230,
        },
        {
          id: 'liver',
          label: 'Grooves the liver',
          name: 'Grooves the back of the liver, above the epiploic foramen',
          x: 85,
          y: 290,
        },
        {
          id: 'behind',
          label: 'Behind: right crus,\npsoas, chain',
          name: 'Behind: right crus, right renal artery, right sympathetic chain, psoas',
          x: 85,
          y: 350,
        },
        {
          id: 'caval-opening',
          label: 'Central tendon\nat T8',
          name: 'Through the central tendon at T8, into the right atrium',
          x: 85,
          y: 415,
        },
        {
          id: 'lumbar-veins',
          label: 'Lumbar veins 3\nand 4',
          name: 'Third and fourth lumbar veins (the first two go to the ascending lumbar vein)',
          x: 275,
          y: 100,
        },
        {
          id: 'testicular-veins',
          label: 'Right gonadal\nvein',
          name: 'Right testicular or ovarian vein (the left goes to the left renal vein)',
          x: 275,
          y: 165,
        },
        {
          id: 'renal-veins',
          label: 'Renal veins; left\ncrosses aorta',
          name: 'Renal veins; the left crosses in front of the aorta',
          x: 275,
          y: 230,
        },
        {
          id: 'suprarenal-veins',
          label: 'Right suprarenal',
          name: 'Right suprarenal vein (the left goes to the left renal vein)',
          x: 275,
          y: 290,
        },
        {
          id: 'hepatic-veins',
          label: 'Hepatic veins',
          name: 'Hepatic veins, straight into the IVC behind the liver',
          x: 275,
          y: 350,
        },
        {
          id: 'azygos-veins',
          label: 'Azygos and\nhemiazygos',
          name: 'Azygos and hemiazygos veins, from the ascending lumbar and subcostal veins',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'inferior-vena-cava', to: 'formation' },
        { from: 'formation', to: 'front-lower' },
        { from: 'front-lower', to: 'front-upper' },
        { from: 'front-upper', to: 'liver' },
        { from: 'liver', to: 'behind' },
        { from: 'behind', to: 'caval-opening' },
        { from: 'inferior-vena-cava', to: 'lumbar-veins' },
        { from: 'lumbar-veins', to: 'testicular-veins' },
        { from: 'testicular-veins', to: 'renal-veins' },
        { from: 'renal-veins', to: 'suprarenal-veins' },
        { from: 'suprarenal-veins', to: 'hepatic-veins' },
        { from: 'hepatic-veins', to: 'azygos-veins' },
      ],
    },
    lesions: [
      {
        id: 'obstruction',
        label: 'Blocked cava',
        nodeIds: ['azygos-veins', 'lumbar-veins'],
        explanation:
          'Clot in the IVC swells the legs and back. Blood finds its way to the superior vena cava through dilated veins on the trunk, the superficial epigastric to the thoracoepigastric and lateral thoracic, and deep through the lumbar, azygos and hemiazygos veins and the vertebral plexus.',
      },
      {
        id: 'varicocele',
        label: 'Left varicocele',
        nodeIds: ['testicular-veins', 'renal-veins'],
        explanation:
          'The left testicular vein ends at a right angle in the left renal vein. A tumour of the left kidney growing into the renal vein can block it, and the veins of the left spermatic cord swell: a varicocele that appears late in life needs the left kidney checked.',
      },
      {
        id: 'clot',
        label: 'Clot from the legs',
        nodeIds: ['formation'],
        explanation:
          'A deep vein thrombosis can break off and pass up the IVC through the right heart to the pulmonary arteries. When anticoagulation cannot be given, a filter placed in the IVC catches large clots.',
      },
    ],
    drill: [
      {
        id: 'course',
        title: 'Course and relations',
        hint: 'From its formation up to the caval opening: what lies in front, then behind.',
        nodeIds: ['formation', 'front-lower', 'front-upper', 'liver', 'behind', 'caval-opening'],
      },
      {
        id: 'tributaries',
        title: 'Tributaries',
        hint: 'From below up, then the veins that link it to the azygos system.',
        nodeIds: [
          'lumbar-veins',
          'testicular-veins',
          'renal-veins',
          'suprarenal-veins',
          'hepatic-veins',
          'azygos-veins',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [
          'lumbar-spine',
          'sacrum',
          'hip-bones',
          'diaphragm',
          'psoas-major',
          'liver',
          'kidneys',
          'suprarenal-glands',
          'inferior-vena-cava',
          'hepatic-veins',
          'renal-veins',
          'suprarenal-veins',
          'testicular-veins',
          'lumbar-veins',
          'azygos-veins',
          'common-iliac-vessels',
          'abdominal-aorta',
          'renal-arteries',
        ],
        ['liver', 'kidneys', 'diaphragm', 'abdominal-aorta'],
      ),
      traces: [],
      stops: [GREAT_VESSELS_FRONT, AORTIC_BIFURCATION],
    },
  },
  lesson: [
    {
      id: 'course',
      title: 'Course',
      body: 'The IVC begins on the right side of the body of L5, where the two common iliac veins meet behind the right common iliac artery. It climbs in front of the lumbar spine on the right of the aorta, lies in a groove on the back of the liver, and leaves the abdomen through the central tendon of the diaphragm at T8, opening at once into the lower back part of the right atrium. It carries blood from everything below the diaphragm except what goes first to the liver.',
      focus: ['formation', 'caval-opening'],
    },
    {
      id: 'front',
      title: 'In front',
      body: 'From below up: the right common iliac artery, the root of the mesentery with the superior mesenteric vessels, the right gonadal artery, the third part of the duodenum, the head of the pancreas with the bile duct, the first part of the duodenum and the portal vein, the epiploic foramen (the IVC forms its back wall) and the posterior surface of the liver.',
      focus: ['front-lower', 'front-upper', 'liver'],
    },
    {
      id: 'behind',
      title: 'Behind',
      body: 'Above, it rests on the right crus, but with the right renal artery, the right coeliac ganglion and the medial part of the right suprarenal between them. Below, it lies on the right sympathetic chain and the medial edge of right psoas, with the third and fourth right lumbar arteries behind it.',
      focus: ['behind'],
    },
    {
      id: 'tributaries',
      title: 'Tributaries',
      body: 'The common iliac veins form it, each having taken an iliolumbar vein; the median sacral vein joins the left. The third and fourth lumbar veins enter its back, the left ones crossing behind the aorta. The right gonadal vein enters just below the renal veins. The renal veins enter just below the transpyloric plane; the right is short, the left long, crossing in front of the aorta behind the pancreas and taking the left suprarenal and left gonadal veins. The short right suprarenal vein, the inferior phrenic veins, and the right, middle and left hepatic veins open in just before it leaves.',
      focus: [
        'lumbar-veins',
        'testicular-veins',
        'renal-veins',
        'suprarenal-veins',
        'hepatic-veins',
      ],
    },
    {
      id: 'azygos',
      title: 'Azygos and hemiazygos below the diaphragm',
      body: 'The ascending lumbar vein runs up in psoas in front of the roots of the transverse processes, linking the lateral sacral, iliolumbar and lumbar veins, and taking the first and second lumbar veins. On the right it joins the subcostal vein to form the azygos vein, which may also arise from the back of the IVC near the renal veins and enters the thorax through the aortic opening. On the left the same union forms the hemiazygos, which may arise from the back of the left renal vein and pierces the left crus.',
      focus: ['azygos-veins'],
    },
    {
      id: 'collaterals',
      title: 'When it is blocked',
      body: 'Blockage of the IVC swells the legs and back, and blood goes round it to the superior vena cava. On the surface, the superficial epigastric veins link with the thoracoepigastric and lateral thoracic veins, which stand out on the side of the trunk with blood flowing upwards. Deep, the lumbar veins, ascending lumbar, azygos and hemiazygos veins and the vertebral venous plexus carry it. The internal thoracic, posterior intercostal and external pudendal veins help.',
      focus: ['lumbar-veins', 'azygos-veins'],
    },
  ],
  questions: [
    {
      id: 'vc-left-gonadal',
      prompt: 'The left gonadal vein drains into the:',
      options: [
        { id: 'left-renal', text: 'Left renal vein' },
        { id: 'ivc', text: 'Inferior vena cava' },
        { id: 'internal-iliac', text: 'Internal iliac vein' },
        { id: 'azygos', text: 'Hemiazygos vein' },
      ],
      answerId: 'left-renal',
      explanation: 'The right gonadal vein drains straight into the IVC.',
    },
    {
      id: 'vc-formation',
      prompt: 'The inferior vena cava is formed at the level of:',
      options: [
        { id: 'fifth', text: 'L5, on its right side' },
        { id: 'fourth', text: 'L4, in the midline' },
        { id: 'sacral', text: 'The sacral promontory, on the left' },
        { id: 'third', text: 'L3, on its right side' },
      ],
      answerId: 'fifth',
      explanation: 'One vertebra below the aortic division, behind the right common iliac artery.',
    },
    {
      id: 'vc-not-tributary',
      prompt: 'Which vein does not drain into the inferior vena cava?',
      options: [
        { id: 'splenic', text: 'Splenic vein' },
        { id: 'hepatic', text: 'Hepatic veins' },
        { id: 'right-suprarenal', text: 'Right suprarenal vein' },
        { id: 'renal', text: 'Renal veins' },
      ],
      answerId: 'splenic',
      explanation: 'The splenic vein joins the portal vein, which drains through the liver.',
    },
    {
      id: 'vc-relation',
      prompt: 'Which lies directly in front of the IVC?',
      options: [
        { id: 'head-pancreas', text: 'Head of the pancreas' },
        { id: 'right-crus', text: 'Right crus' },
        { id: 'sympathetic', text: 'Right sympathetic chain' },
        { id: 'psoas', text: 'Right psoas' },
      ],
      answerId: 'head-pancreas',
      explanation: 'The crus, chain and psoas lie behind it.',
    },
  ],
  cards: [
    {
      id: 'vc-course',
      front: 'Course of the inferior vena cava?',
      back: 'Formed at L5 (right side) by the common iliac veins; up right of the aorta, grooves the liver; through the central tendon at T8 to the right atrium.',
    },
    {
      id: 'vc-tributaries',
      front: 'Tributaries of the IVC?',
      back: 'Common iliac, lumbar (3, 4), right gonadal, renal, right suprarenal, inferior phrenic, hepatic.',
    },
    {
      id: 'vc-left-renal',
      front: 'The left renal vein?',
      back: 'Longer than the right; crosses in front of the aorta below the SMA, behind the pancreas; receives the left suprarenal and left gonadal veins.',
    },
    {
      id: 'vc-azygos',
      front: 'Origin of the azygos and hemiazygos veins?',
      back: 'Ascending lumbar plus subcostal vein each side, or from the back of the IVC (azygos) and left renal vein (hemiazygos).',
    },
    {
      id: 'vc-collaterals',
      front: 'Collaterals when the IVC is blocked?',
      back: 'Superficial: superficial epigastric, thoracoepigastric, lateral thoracic. Deep: lumbar, azygos, hemiazygos, vertebral venous plexus.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 27 Posterior Abdominal Wall',
      pages: '397–399',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '390–391' },
  ],
};
