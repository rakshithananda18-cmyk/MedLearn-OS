import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_WALL_MODEL_CREDIT,
  ABDOMINAL_WALL_MODEL_SRC,
  abdominalWallParts,
  LUMBAR_BACK,
  LUMBAR_SIDE,
  LUMBAR_VERTEBRAE,
  PELVIS_ABOVE,
} from './abdominal-wall-3d';
import { bookSource } from './books';

// Abdomen batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const lumbarVertebraeSacrum: Topic = {
  slug: 'lumbar-vertebrae-sacrum',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Lumbar vertebrae, sacrum and coccyx',
  summary:
    'The bones behind the abdomen: how to know a lumbar vertebra, why the fifth is different, what lies on the sacrum, and the defects that start here.',
  estimatedMinutes: 14,
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
      'Volume 2, Chapter 15 Introduction and Osteology: lumbar vertebrae, sacrum and coccyx, pages 219 to 227',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 2 Back: lumbar vertebrae, sacrum and coccyx, pages 70 to 71',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones and psoas in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'A lumbar vertebra is known by its large kidney-shaped body, no facets on the body for ribs, and no foramen in the transverse process. The first four are typical; the fifth is atypical.',
    'The fifth lumbar vertebra has thick, short, pyramidal transverse processes joined to the whole pedicle and the side of the body, and the largest body, taller in front: the source of the lumbosacral angle.',
    'The transverse processes lengthen from L1 to L3 and then shorten. The right crus of the diaphragm arises from the upper three bodies and the left from the upper two; psoas major from all of them.',
    'The sacrum is five fused vertebrae. Its promontory juts into the pelvic inlet, its alae carry the obturator nerve, iliolumbar artery, lumbosacral trunk and sympathetic chain (OILS, lateral to medial), and its canal opens below at the sacral hiatus.',
    'Defects start here: spina bifida (the two halves of the arch do not fuse), spondylolisthesis (the body of L5 slips forward over the sacrum) and sacralization (L5 fused to the sacrum, which can press on the fifth lumbar nerve).',
  ],
  visual: {
    kind: 'path',
    // Left: a lumbar vertebra and what sets the fifth apart. Right: the sacrum and coccyx.
    diagram: {
      width: 360,
      height: 470,
      nodes: [
        {
          id: 'lumbar-spine',
          label: 'Lumbar spine\nand sacrum',
          name: 'Lumbar vertebrae, sacrum and coccyx',
          x: 180,
          y: 30,
        },
        {
          id: 'lumbar-body',
          label: 'Body:\nkidney-shaped',
          name: 'Large kidney-shaped body, wider from side to side',
          x: 80,
          y: 100,
        },
        {
          id: 'lumbar-arch',
          label: 'Short pedicles,\nthick laminae',
          name: 'Short strong pedicles and short thick laminae round a triangular canal',
          x: 80,
          y: 160,
        },
        {
          id: 'third-lumbar-vertebra',
          label: 'Longest transverse\nprocess: L3',
          name: 'Transverse processes, longest at L3',
          x: 80,
          y: 220,
        },
        {
          id: 'mammillary-process',
          label: 'Mammillary and\naccessory processes',
          name: 'Mammillary process on the superior articular process; accessory process at the root of the transverse process',
          x: 80,
          y: 280,
        },
        {
          id: 'fifth-lumbar-vertebra',
          label: 'L5: atypical,\nthick processes',
          name: 'Fifth lumbar vertebra: thick pyramidal transverse processes, the largest body',
          x: 80,
          y: 340,
        },
        {
          id: 'lumbar-canal',
          label: 'Canal: conus at L1,\ncauda equina below',
          name: 'Vertebral canal: the conus medullaris at L1, the cauda equina below it',
          x: 80,
          y: 405,
        },
        {
          id: 'sacrum',
          label: 'Sacrum: five\nfused vertebrae',
          name: 'Sacrum: five fused sacral vertebrae',
          x: 275,
          y: 100,
        },
        {
          id: 'sacral-promontory',
          label: 'Promontory',
          name: 'Sacral promontory, the front edge of the first sacral body',
          x: 275,
          y: 160,
        },
        {
          id: 'sacral-ala',
          label: 'Ala: OILS\non it',
          name: 'Ala of the sacrum: obturator nerve, iliolumbar artery, lumbosacral trunk, sympathetic chain',
          x: 275,
          y: 220,
        },
        {
          id: 'sacral-foramina',
          label: 'Pelvic and\ndorsal foramina',
          name: 'Four pairs of pelvic and dorsal sacral foramina',
          x: 275,
          y: 280,
        },
        {
          id: 'sacral-hiatus',
          label: 'Sacral hiatus',
          name: 'Sacral hiatus, where the canal opens below',
          x: 275,
          y: 340,
        },
        {
          id: 'coccyx',
          label: 'Coccyx: four\nfused pieces',
          name: 'Coccyx: four rudimentary fused vertebrae',
          x: 275,
          y: 405,
        },
      ],
      edges: [
        { from: 'lumbar-spine', to: 'lumbar-body' },
        { from: 'lumbar-body', to: 'lumbar-arch' },
        { from: 'lumbar-arch', to: 'third-lumbar-vertebra' },
        { from: 'third-lumbar-vertebra', to: 'mammillary-process' },
        { from: 'mammillary-process', to: 'fifth-lumbar-vertebra' },
        { from: 'fifth-lumbar-vertebra', to: 'lumbar-canal' },
        { from: 'lumbar-spine', to: 'sacrum' },
        { from: 'sacrum', to: 'sacral-promontory' },
        { from: 'sacral-promontory', to: 'sacral-ala' },
        { from: 'sacral-ala', to: 'sacral-foramina' },
        { from: 'sacral-foramina', to: 'sacral-hiatus' },
        { from: 'sacral-hiatus', to: 'coccyx' },
      ],
    },
    lesions: [
      {
        id: 'spina-bifida',
        label: 'Spina bifida',
        nodeIds: ['lumbar-arch', 'lumbar-canal'],
        explanation:
          'The two halves of the neural arch fail to fuse, leaving a gap in the midline. The meninges alone may bulge through (meningocoele), or the cord with them (meningomyelocoele); with no bulge at all it is spina bifida occulta.',
      },
      {
        id: 'spondylolisthesis',
        label: 'Spondylolisthesis',
        nodeIds: ['fifth-lumbar-vertebra', 'sacrum'],
        explanation:
          'Normally the inferior articular processes of L5 hook behind those of the sacrum. If its arch is separated from the body, the body of L5 slides forward over the sacrum, leaving the arch behind: backache, and pain down the sciatic nerve.',
      },
      {
        id: 'sacralization',
        label: 'Sacralization of L5',
        nodeIds: ['fifth-lumbar-vertebra', 'sacral-ala'],
        explanation:
          'The fifth lumbar vertebra, or one of its transverse processes, fuses with the sacrum or articulates with the ala or ilium. It may press on the fifth lumbar nerve.',
      },
    ],
    drill: [
      {
        id: 'lumbar',
        title: 'A lumbar vertebra',
        hint: 'From the body to the canal, with the fifth set apart.',
        nodeIds: [
          'lumbar-body',
          'lumbar-arch',
          'third-lumbar-vertebra',
          'mammillary-process',
          'fifth-lumbar-vertebra',
          'lumbar-canal',
        ],
      },
      {
        id: 'sacrum',
        title: 'Sacrum and coccyx',
        hint: 'Promontory, ala, foramina, hiatus, then the tail bone.',
        nodeIds: ['sacral-promontory', 'sacral-ala', 'sacral-foramina', 'sacral-hiatus', 'coccyx'],
      },
    ],
    model3d: {
      src: ABDOMINAL_WALL_MODEL_SRC,
      credit: ABDOMINAL_WALL_MODEL_CREDIT,
      // The hip bones and psoas would hide the lower vertebrae from the side.
      parts: abdominalWallParts([...LUMBAR_VERTEBRAE, 'lumbar-discs', 'sacrum']),
      traces: [],
      stops: [LUMBAR_SIDE, LUMBAR_BACK, PELVIS_ABOVE],
    },
  },
  lesson: [
    {
      id: 'identify',
      title: 'Knowing a lumbar vertebra',
      body: 'There are five. A lumbar vertebra is large, has no facets on its body for ribs (unlike a thoracic one) and no foramen in its transverse process (unlike a cervical one). The first four are typical; the fifth is not.',
      focus: ['lumbar-spine', 'lumbar-body'],
    },
    {
      id: 'typical',
      title: 'A typical lumbar vertebra',
      body: 'The body is kidney-shaped, wider than deep, and a little taller in front, which helps curve the lumbar spine forward. Short strong pedicles and short thick laminae close a triangular canal. The spine is a square plate pointing back. The thin transverse processes grow longer from L1 to L3, then shorter. On each superior articular process sits a mammillary process; at the root of the transverse process, an accessory process.',
      focus: ['lumbar-body', 'lumbar-arch', 'third-lumbar-vertebra', 'mammillary-process'],
    },
    {
      id: 'fifth',
      title: 'The fifth lumbar vertebra',
      body: 'L5 has thick, short, pyramidal transverse processes that join the whole pedicle and spread onto the body. Its inferior articular processes sit as far apart as the superior ones, its spine is small and rounded, and its body, the largest, is much taller in front: this makes the sharp lumbosacral angle, about 120 degrees in the adult.',
      focus: ['fifth-lumbar-vertebra'],
    },
    {
      id: 'attachments',
      title: 'What attaches, what lies inside',
      body: 'The right crus of the diaphragm arises from the upper three lumbar bodies and the left crus from the upper two; psoas major arises from all of them behind the crura, and quadratus lumborum from the transverse processes lateral to psoas. The canal holds the conus medullaris at L1 and the cauda equina below it.',
      focus: ['lumbar-canal', 'lumbar-body'],
    },
    {
      id: 'ossification',
      title: 'How it ossifies',
      body: 'Three primary centres, one for the body and one for each half of the arch, appear in the third month before birth. The halves of the arch join behind in the first year and the arch joins the body in the sixth. Seven secondary centres follow: a ring epiphysis on each surface of the body, and one each for the tips of the transverse processes, the mammillary processes and the spine.',
      focus: ['lumbar-arch'],
    },
    {
      id: 'sacrum',
      title: 'The sacrum',
      body: 'Five fused vertebrae make a curved triangle wedged between the hip bones at the sacroiliac joints. The front edge of its first body is the promontory; the alae spread from its sides and carry, from lateral to medial, the obturator nerve, iliolumbar artery, lumbosacral trunk and sympathetic chain (OILS). Four pairs of pelvic and dorsal foramina let out the sacral nerves, and the canal opens below at the sacral hiatus. The dura and arachnoid end at the level of S2.',
      focus: ['sacrum', 'sacral-promontory', 'sacral-ala', 'sacral-foramina', 'sacral-hiatus'],
    },
    {
      id: 'sexes',
      title: 'A male or a female sacrum',
      body: 'The male sacrum is longer and narrower: its sacral index (breadth across the base times 100, divided by the length) is about 105, the female about 115. In the male the body of S1 is wider than each ala; in the female they are equal. The coccyx below is four small fused pieces, the first often separate.',
      focus: ['sacrum', 'coccyx'],
    },
    {
      id: 'explore',
      title: 'Turn it yourself',
      body: 'From the side, see the bodies grow and the discs between them; from behind, compare the transverse processes of L3 and L5. Then turn on a defect to see where it starts.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'lsc-longest-process',
      prompt: 'Which lumbar vertebra has the longest transverse processes?',
      options: [
        { id: 'l3', text: 'Third' },
        { id: 'l1', text: 'First' },
        { id: 'l5', text: 'Fifth' },
        { id: 'l2', text: 'Second' },
      ],
      answerId: 'l3',
      explanation: 'They lengthen from L1 to L3 and then shorten; those of L5 are thick and short.',
    },
    {
      id: 'lsc-fifth',
      prompt: 'The fifth lumbar vertebra is best told by its:',
      options: [
        { id: 'processes', text: 'Thick transverse processes joined to the pedicle and body' },
        { id: 'foramen', text: 'Foramen in each transverse process' },
        { id: 'facets', text: 'Costal facets on the body' },
        { id: 'spine', text: 'Long downward-pointing spine' },
      ],
      answerId: 'processes',
      explanation:
        'Its transverse processes are short, thick and pyramidal, attached to the whole pedicle and spreading onto the body.',
    },
    {
      id: 'lsc-ala',
      prompt: 'Which of these is not related to the ala of the sacrum?',
      options: [
        { id: 'internal-iliac', text: 'Internal iliac artery' },
        { id: 'obturator', text: 'Obturator nerve' },
        { id: 'trunk', text: 'Lumbosacral trunk' },
        { id: 'sympathetic', text: 'Sympathetic chain' },
      ],
      answerId: 'internal-iliac',
      explanation:
        'OILS: obturator nerve, iliolumbar artery, lumbosacral trunk and sympathetic chain, from lateral to medial.',
    },
    {
      id: 'lsc-spondylolisthesis',
      prompt: 'In spondylolisthesis:',
      options: [
        { id: 'slip', text: 'The body of L5 slides forward over the sacrum' },
        { id: 'fuse', text: 'L5 fuses with the sacrum' },
        { id: 'arch', text: 'The halves of the arch fail to fuse' },
        { id: 'curve', text: 'The spine bends to one side' },
      ],
      answerId: 'slip',
      explanation:
        'With its arch separated, the body of L5 slips forward, leaving the arch behind; fusion is sacralization, an unfused arch spina bifida, a sideways bend scoliosis.',
    },
    {
      id: 'lsc-sacral-index',
      prompt: 'A sacrum with a sacral index of about 115 is most likely:',
      options: [
        { id: 'female', text: 'Female' },
        { id: 'male', text: 'Male' },
        { id: 'child', text: 'From a child' },
        { id: 'any', text: 'Either: the index does not differ' },
      ],
      answerId: 'female',
      explanation:
        'The female sacrum is shorter and wider: index about 115, against about 105 in the male.',
    },
  ],
  cards: [
    {
      id: 'lsc-identify',
      front: 'Three signs of a lumbar vertebra?',
      back: 'Large kidney-shaped body; no costal facets on the body; no foramen in the transverse process.',
    },
    {
      id: 'lsc-l5',
      front: 'What makes L5 atypical?',
      back: 'Thick short pyramidal transverse processes joined to the pedicle and body; inferior articular processes as far apart as the superior; small spine; the largest body, taller in front.',
    },
    {
      id: 'lsc-crura',
      front: 'Origin of the crura of the diaphragm from the lumbar spine?',
      back: 'Right crus from the bodies of L1 to L3; left crus from L1 and L2.',
    },
    {
      id: 'lsc-oils',
      front: 'Structures on the ala of the sacrum, lateral to medial?',
      back: 'OILS: obturator nerve, iliolumbar artery, lumbosacral trunk, sympathetic chain.',
    },
    {
      id: 'lsc-hiatus',
      front: 'What emerges at the sacral hiatus?',
      back: 'The fifth sacral nerves, the coccygeal nerves and the filum terminale.',
    },
    {
      id: 'lsc-ossification',
      front: 'Primary centres of a lumbar vertebra?',
      back: 'Three, in the third month before birth: one for the body, one for each half of the arch. Seven secondary centres follow.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 15 Introduction and Osteology',
      pages: '219–227',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 2 Back', pages: '70–71' },
  ],
};
