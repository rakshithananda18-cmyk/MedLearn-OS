import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  LUMBAR_PLEXUS,
  LUMBAR_PLEXUS_FRONT,
  LUMBAR_PLEXUS_RIGHT,
  POSTERIOR_WALL,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 5 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const lumbarPlexus: Topic = {
  slug: 'lumbar-plexus',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The lumbar plexus',
  summary:
    'How the plexus forms inside psoas from L1 to L4, its six branches and where each leaves the muscle, their courses to the abdominal wall and thigh, and the lumbosacral trunk.',
  estimatedMinutes: 13,
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
      'Volume 2, Chapter 27 Posterior Abdominal Wall: lumbar plexus, pages 402 to 403',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: lumbar plexus, pages 398 to 401'),
    {
      title: 'Z-Anatomy and BodyParts3D (DBCLS)',
      detail: 'The plexus’s branches (Z-Anatomy), psoas, iliacus and the skeleton in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'Z-Anatomy CC BY-SA 4.0; BodyParts3D CC BY 4.0 (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Formed inside the back of psoas major by the ventral rami of L1 to L4, with a twig from the subcostal nerve (T12) to L1. Part of L4 joins L5 as the lumbosacral trunk, which goes down over the sacral ala to the sacral plexus.',
    'Out of the lateral border of psoas, from above down: iliohypogastric (L1), ilioinguinal (L1), lateral cutaneous nerve of the thigh (L2, L3), femoral (L2 to L4). Through its front: genitofemoral (L1, L2). Out of its medial border: obturator (L2 to L4) and the lumbosacral trunk (L4, L5).',
    'The iliohypogastric and ilioinguinal cross quadratus lumborum behind the kidney and pierce transversus abdominis near the iliac crest. The iliohypogastric supplies the abdominal muscles and the skin above the pubis and over the side of the buttock; the ilioinguinal runs through the inguinal canal and out of the superficial ring to the upper medial thigh and the front of the scrotum or labium majus.',
    'The genitofemoral splits near the deep ring: its genital branch goes through the inguinal canal to cremaster and the scrotal or labial skin; its femoral branch in the femoral sheath to the skin below the inguinal ligament. The lateral cutaneous nerve of the thigh crosses iliacus to the anterior superior iliac spine and passes behind the inguinal ligament.',
    'Femoral (dorsal divisions of L2 to L4): down in the groove between psoas and iliacus under the fascia iliaca, supplying iliacus, then behind the inguinal ligament outside the femoral sheath to quadriceps, sartorius and pectineus. Obturator (ventral divisions of L2 to L4): behind the common iliac vessels, crossed by the internal iliac vessels and ureter, along the side wall of the pelvis to the obturator canal and the adductors.',
  ],
  visual: {
    kind: 'path',
    // Left: the branches out of the lateral border, above down. Right: formation, the front and
    // the medial border.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'lumbar-plexus',
          label: 'Lumbar plexus L1 to L4',
          name: 'Lumbar plexus, from L1 to L4',
          x: 180,
          y: 30,
        },
        {
          id: 'lateral-border',
          label: 'Lateral border of\npsoas',
          name: 'Out of the lateral border of psoas, from above down',
          x: 85,
          y: 100,
        },
        {
          id: 'iliohypogastric-nerves',
          label: 'Iliohypogastric\n(L1)',
          name: 'Iliohypogastric nerve (L1)',
          x: 85,
          y: 165,
        },
        {
          id: 'ilioinguinal-nerves',
          label: 'Ilioinguinal (L1)',
          name: 'Ilioinguinal nerve (L1)',
          x: 85,
          y: 225,
        },
        {
          id: 'lateral-femoral-cutaneous-nerves',
          label: 'Lateral cutaneous\nof thigh (L2, L3)',
          name: 'Lateral cutaneous nerve of the thigh (L2, L3)',
          x: 85,
          y: 290,
        },
        {
          id: 'femoral-nerves',
          label: 'Femoral (L2 to\nL4)',
          name: 'Femoral nerve (L2 to L4, dorsal divisions)',
          x: 85,
          y: 355,
        },
        {
          id: 'femoral-supply',
          label: 'Iliacus, pectineus,\nquadriceps',
          name: 'Femoral nerve supplies iliacus, pectineus, quadriceps and sartorius',
          x: 85,
          y: 415,
        },
        {
          id: 'formation',
          label: 'Inside psoas, T12\nto L4',
          name: 'Formed inside psoas by the ventral rami of L1 to L4, with a twig from T12',
          x: 275,
          y: 100,
        },
        {
          id: 'divisions',
          label: 'Dorsal: femoral;\nventral: obturator',
          name: 'Dorsal divisions form the femoral nerve, ventral divisions the obturator',
          x: 275,
          y: 165,
        },
        {
          id: 'genitofemoral-nerves',
          label: 'Front of psoas:\ngenitofemoral',
          name: 'Genitofemoral nerve (L1, L2), through the front of psoas',
          x: 275,
          y: 230,
        },
        {
          id: 'medial-border',
          label: 'Medial border of\npsoas',
          name: 'Out of the medial border of psoas',
          x: 275,
          y: 295,
        },
        {
          id: 'obturator-nerves',
          label: 'Obturator (L2 to\nL4)',
          name: 'Obturator nerve (L2 to L4, ventral divisions)',
          x: 275,
          y: 355,
        },
        {
          id: 'lumbosacral-trunk',
          label: 'Lumbosacral trunk\n(L4, L5)',
          name: 'Lumbosacral trunk (L4, L5), to the sacral plexus',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'lumbar-plexus', to: 'lateral-border' },
        { from: 'lateral-border', to: 'iliohypogastric-nerves' },
        { from: 'iliohypogastric-nerves', to: 'ilioinguinal-nerves' },
        { from: 'ilioinguinal-nerves', to: 'lateral-femoral-cutaneous-nerves' },
        { from: 'lateral-femoral-cutaneous-nerves', to: 'femoral-nerves' },
        { from: 'femoral-nerves', to: 'femoral-supply' },
        { from: 'lumbar-plexus', to: 'formation' },
        { from: 'formation', to: 'divisions' },
        { from: 'divisions', to: 'genitofemoral-nerves' },
        { from: 'genitofemoral-nerves', to: 'medial-border' },
        { from: 'medial-border', to: 'obturator-nerves' },
        { from: 'obturator-nerves', to: 'lumbosacral-trunk' },
      ],
    },
    lesions: [
      {
        id: 'meralgia',
        label: 'Numb outer thigh',
        nodeIds: ['lateral-femoral-cutaneous-nerves'],
        explanation:
          'The lateral cutaneous nerve of the thigh bends sharply as it passes behind the inguinal ligament next to the anterior superior iliac spine. Pressed there, by a tight belt or weight gain, it gives burning numbness over the outer thigh: meralgia paraesthetica.',
      },
      {
        id: 'cremasteric',
        label: 'Cremasteric reflex',
        nodeIds: ['genitofemoral-nerves', 'ilioinguinal-nerves'],
        explanation:
          'Stroking the skin of the upper medial thigh makes cremaster pull the testis up. The afferent limb is the femoral branch of the genitofemoral and the ilioinguinal, the efferent the genital branch: it tests L1 and L2.',
      },
      {
        id: 'femoral-palsy',
        label: 'Femoral nerve pressed',
        nodeIds: ['femoral-nerves', 'femoral-supply'],
        explanation:
          'In the groove between psoas and iliacus the femoral nerve can be pressed by a psoas abscess or by bleeding into the iliacus sheath. The knee will not straighten against gravity, the knee jerk is lost and the front of the thigh goes numb.',
      },
      {
        id: 'hernia-repair',
        label: 'Nerves in the groin',
        nodeIds: ['ilioinguinal-nerves', 'iliohypogastric-nerves'],
        explanation:
          'The ilioinguinal and iliohypogastric nerves supply the lowest fibres of internal oblique and transversus that guard the inguinal canal. Cut in a low appendix or hernia incision, they leave the groin weaker and the skin below numb.',
      },
    ],
    drill: [
      {
        id: 'lateral',
        title: 'Out of the lateral border',
        hint: 'From above down, then what the femoral nerve supplies.',
        nodeIds: [
          'lateral-border',
          'iliohypogastric-nerves',
          'ilioinguinal-nerves',
          'lateral-femoral-cutaneous-nerves',
          'femoral-nerves',
          'femoral-supply',
        ],
      },
      {
        id: 'front-medial',
        title: 'Formation, front and medial border',
        hint: 'Where it forms, its divisions, the nerve through the front, then the medial side.',
        nodeIds: [
          'formation',
          'divisions',
          'genitofemoral-nerves',
          'medial-border',
          'obturator-nerves',
          'lumbosacral-trunk',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [...POSTERIOR_WALL, ...LUMBAR_PLEXUS, 'kidneys', 'common-iliac-vessels', 'iliac-arteries'],
        ['kidneys', 'diaphragm', 'psoas-major'],
      ),
      traces: [],
      stops: [LUMBAR_PLEXUS_FRONT, LUMBAR_PLEXUS_RIGHT],
    },
  },
  lesson: [
    {
      id: 'formation',
      title: 'Formation',
      body: 'The lumbar plexus forms in the back part of psoas major, in front of the transverse processes, from the ventral rami of the upper four lumbar nerves, L1 taking a twig from the subcostal nerve. Its rami split into ventral and dorsal divisions: the ventral ones make the obturator nerve, the dorsal ones the femoral and lateral cutaneous nerves. Part of L4 runs down to join L5 as the lumbosacral trunk.',
      focus: ['formation', 'divisions'],
    },
    {
      id: 'where',
      title: 'Where the branches leave psoas',
      body: 'A simple map: four branches leave its lateral border, from above down the iliohypogastric, ilioinguinal, lateral cutaneous nerve of the thigh and femoral; one, the genitofemoral, pierces its front; two leave its medial border, the obturator nerve and the lumbosacral trunk.',
      focus: ['lateral-border', 'genitofemoral-nerves', 'medial-border'],
    },
    {
      id: 'l1',
      title: 'Iliohypogastric and ilioinguinal (L1)',
      body: 'Both run down and out in front of quadratus lumborum, behind the kidney and colon, and pierce transversus abdominis near the iliac crest to run between the muscles of the abdominal wall, which they supply. The iliohypogastric sends a lateral cutaneous branch over the crest to the buttock and ends above the superficial ring in the skin of the pubic region. The ilioinguinal, a little lower, enters the inguinal canal and leaves by the superficial ring to the upper medial thigh and the root of the penis and front of the scrotum, or the mons and labium majus.',
      focus: ['iliohypogastric-nerves', 'ilioinguinal-nerves'],
    },
    {
      id: 'genitofemoral',
      title: 'Genitofemoral (L1, L2)',
      body: 'It comes through the front of psoas near its medial border and runs down on the muscle, behind the ureter. Near the deep inguinal ring it divides. The genital branch enters the inguinal canal: in the male it supplies cremaster and the scrotal skin, in the female it follows the round ligament to the labium majus. The femoral branch passes behind the inguinal ligament in the femoral sheath beside the femoral artery, and supplies the skin of the upper front of the thigh.',
      focus: ['genitofemoral-nerves'],
    },
    {
      id: 'thigh',
      title: 'Lateral cutaneous and femoral (L2 to L4)',
      body: 'The lateral cutaneous nerve of the thigh (L2, L3) leaves the lateral border of psoas, crosses iliacus to the anterior superior iliac spine and enters the thigh behind the lateral end of the inguinal ligament, to supply the skin of the outer thigh. The femoral nerve, the largest branch (L2 to L4), leaves the lateral border low down and runs in the groove between psoas and iliacus under the fascia iliaca, supplying iliacus; it enters the thigh behind the inguinal ligament lateral to the femoral sheath, for quadriceps, sartorius and pectineus.',
      focus: ['lateral-femoral-cutaneous-nerves', 'femoral-nerves', 'femoral-supply'],
    },
    {
      id: 'medial',
      title: 'Obturator nerve and lumbosacral trunk',
      body: 'The obturator nerve (L2 to L4) leaves the medial border of psoas at the pelvic brim, runs behind the common iliac vessels, is crossed by the internal iliac vessels and ureter, and goes forward on the side wall of the pelvis to the obturator canal, to supply the adductors, gracilis and obturator externus. The lumbosacral trunk (L4, L5) crosses the sacral ala behind the common iliac vessels, with the sympathetic trunk medial and the iliolumbar artery and obturator nerve lateral, to join the sacral plexus.',
      focus: ['obturator-nerves', 'lumbosacral-trunk'],
    },
  ],
  questions: [
    {
      id: 'lp-medial',
      prompt: 'Which branch of the lumbar plexus leaves the medial border of psoas?',
      options: [
        { id: 'obturator', text: 'Obturator nerve' },
        { id: 'femoral', text: 'Femoral nerve' },
        { id: 'genitofemoral', text: 'Genitofemoral nerve' },
        { id: 'lateral-cutaneous', text: 'Lateral cutaneous nerve of the thigh' },
      ],
      answerId: 'obturator',
      explanation: 'With the lumbosacral trunk; the genitofemoral pierces the front.',
    },
    {
      id: 'lp-front',
      prompt: 'The nerve seen on the front of psoas major is the:',
      options: [
        { id: 'genitofemoral', text: 'Genitofemoral' },
        { id: 'ilioinguinal', text: 'Ilioinguinal' },
        { id: 'femoral', text: 'Femoral' },
        { id: 'subcostal', text: 'Subcostal' },
      ],
      answerId: 'genitofemoral',
      explanation: 'L1 and L2; it divides into genital and femoral branches.',
    },
    {
      id: 'lp-femoral-roots',
      prompt: 'The femoral nerve is formed from:',
      options: [
        { id: 'dorsal-two-four', text: 'Dorsal divisions of L2 to L4' },
        { id: 'ventral-two-four', text: 'Ventral divisions of L2 to L4' },
        { id: 'dorsal-one-three', text: 'Dorsal divisions of L1 to L3' },
        { id: 'ventral-four-five', text: 'Ventral rami of L4 and L5' },
      ],
      answerId: 'dorsal-two-four',
      explanation: 'The obturator nerve comes from the ventral divisions of the same rami.',
    },
    {
      id: 'lp-canal',
      prompt: 'Which nerve runs through the inguinal canal and out of the superficial ring?',
      options: [
        { id: 'ilioinguinal', text: 'Ilioinguinal' },
        { id: 'iliohypogastric', text: 'Iliohypogastric' },
        { id: 'lateral-cutaneous', text: 'Lateral cutaneous nerve of the thigh' },
        { id: 'obturator', text: 'Obturator' },
      ],
      answerId: 'ilioinguinal',
      explanation: 'The genital branch of the genitofemoral enters by the deep ring too.',
    },
  ],
  cards: [
    {
      id: 'lp-roots',
      front: 'Roots of the lumbar plexus?',
      back: 'Ventral rami of L1 to L4, with a twig from T12; L4 also helps form the lumbosacral trunk (L4, L5).',
    },
    {
      id: 'lp-lateral-border',
      front: 'Branches out of the lateral border of psoas, above down?',
      back: 'Iliohypogastric, ilioinguinal, lateral cutaneous nerve of the thigh, femoral.',
    },
    {
      id: 'lp-values',
      front: 'Root values of the lumbar plexus branches?',
      back: 'Iliohypogastric L1, ilioinguinal L1, genitofemoral L1 L2, lateral cutaneous L2 L3, femoral L2 to L4, obturator L2 to L4.',
    },
    {
      id: 'lp-genitofemoral',
      front: 'Branches of the genitofemoral nerve?',
      back: 'Genital (inguinal canal, cremaster, scrotal or labial skin); femoral (femoral sheath, skin of the upper front of the thigh).',
    },
    {
      id: 'lp-lumbosacral',
      front: 'The lumbosacral trunk?',
      back: 'L4 and L5; over the sacral ala behind the common iliac vessels to the sacral plexus.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 27 Posterior Abdominal Wall',
      pages: '402–403',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '398–401' },
  ],
};
