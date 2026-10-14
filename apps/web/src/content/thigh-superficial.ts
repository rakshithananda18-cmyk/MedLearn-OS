import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  FRONT_MUSCLES,
  HIP_THIGH_BONES,
  HIP_THIGH_MODEL_CREDIT,
  HIP_THIGH_MODEL_SRC,
  hipThighParts,
  THIGH_FRONT,
} from './hip-thigh-3d';

// Lower limb batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const thighSuperficial: Topic = {
  slug: 'thigh-superficial',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Front of thigh: skin, superficial veins and fascia lata',
  summary:
    'The cutaneous nerves of the front of the thigh, the great saphenous vein and inguinal nodes, and the fascia lata with its iliotibial tract and saphenous opening.',
  estimatedMinutes: 13,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 3 Front of Thigh, pages 45 to 50'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: superficial veins, fascia lata and saphenous opening, pages 560 to 564',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'Bones, muscles and vessels (BodyParts3D, CC BY 4.0); nerves (Z-Anatomy, CC BY-SA 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 and CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Skin of the front of the thigh: lateral cutaneous nerve of thigh, intermediate and medial cutaneous nerves (femoral), femoral branch of the genitofemoral, ilioinguinal; the saphenous nerve below the knee.',
    'The great saphenous vein runs up in front of the medial malleolus and along the medial leg and thigh, through the saphenous opening into the femoral vein.',
    'Saphenous opening: 4 cm below and 4 cm lateral to the pubic tubercle, closed by the cribriform fascia.',
    'Superficial inguinal nodes lie in a T: a vertical group draining most of the limb, and upper lateral and medial groups.',
    'Iliotibial tract: thickened fascia lata from the iliac crest to the lateral tibial condyle, taking gluteus maximus and tensor fasciae latae; it steadies the knee.',
  ],
  visual: {
    kind: 'path',
    // The skin nerves, the great saphenous vein, the inguinal nodes and the fascia lata.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'cutaneous-nerves',
          label: 'Skin\nnerves',
          name: 'Cutaneous nerves of the front of the thigh',
          x: 50,
          y: 30,
        },
        {
          id: 'lateral-cutaneous-nerve-of-thigh',
          label: 'Lateral\ncutaneous',
          name: 'Lateral cutaneous nerve of the thigh (L2, L3)',
          x: 145,
          y: 30,
        },
        {
          id: 'femoral-nerve',
          label: 'Femoral\nbranches',
          name: 'Intermediate and medial cutaneous nerves of the thigh, from the femoral nerve',
          x: 225,
          y: 30,
        },
        {
          id: 'saphenous-nerve',
          label: 'Saphenous',
          name: 'Saphenous nerve (L3, L4)',
          x: 305,
          y: 30,
        },
        {
          id: 'genitofemoral-nerve',
          label: 'Genito-\nfemoral',
          name: 'Femoral branch of the genitofemoral nerve, over the femoral triangle',
          x: 185,
          y: 96,
        },
        {
          id: 'patellar-plexus',
          label: 'Patellar\nplexus',
          name: 'Patellar plexus in front of the knee',
          x: 285,
          y: 96,
        },
        {
          id: 'great-saphenous-vein',
          label: 'Great\nsaphenous',
          name: 'Great saphenous vein',
          x: 50,
          y: 176,
        },
        {
          id: 'superficial-epigastric-vein',
          label: 'Three\ntributaries',
          name: 'Superficial epigastric, circumflex iliac and external pudendal veins',
          x: 145,
          y: 176,
        },
        {
          id: 'saphenous-opening',
          label: 'Saphenous\nopening',
          name: 'Saphenous opening in the fascia lata, closed by cribriform fascia',
          x: 225,
          y: 176,
        },
        {
          id: 'femoral-vein',
          label: 'Femoral\nvein',
          name: 'Femoral vein, which it joins',
          x: 305,
          y: 176,
        },
        {
          id: 'inguinal-nodes',
          label: 'Inguinal\nnodes',
          name: 'Superficial inguinal lymph nodes',
          x: 50,
          y: 256,
        },
        {
          id: 'vertical-nodes',
          label: 'Vertical\ngroup',
          name: 'Lower vertical group, along the vein, draining most of the limb',
          x: 145,
          y: 256,
        },
        {
          id: 'horizontal-nodes',
          label: 'Horizontal\ngroup',
          name: 'Upper horizontal group: buttock, lower abdominal wall, external genitalia, lower anal canal',
          x: 235,
          y: 256,
        },
        {
          id: 'fascia-lata',
          label: 'Fascia\nlata',
          name: 'Fascia lata, the deep fascia of the thigh',
          x: 50,
          y: 336,
        },
        {
          id: 'iliotibial-tract',
          label: 'Iliotibial\ntract',
          name: 'Iliotibial tract',
          x: 145,
          y: 336,
        },
        {
          id: 'intermuscular-septa',
          label: 'Three\nsepta',
          name: 'Lateral, medial and posterior intermuscular septa',
          x: 225,
          y: 336,
        },
        {
          id: 'holdens-line',
          label: 'Holden’s\nline',
          name: 'Holden’s line, where the membranous superficial fascia fixes to the fascia lata',
          x: 305,
          y: 336,
        },
      ],
      edges: [
        { from: 'cutaneous-nerves', to: 'lateral-cutaneous-nerve-of-thigh' },
        { from: 'cutaneous-nerves', to: 'femoral-nerve' },
        { from: 'cutaneous-nerves', to: 'saphenous-nerve' },
        { from: 'cutaneous-nerves', to: 'genitofemoral-nerve' },
        { from: 'cutaneous-nerves', to: 'patellar-plexus' },
        { from: 'great-saphenous-vein', to: 'superficial-epigastric-vein' },
        { from: 'great-saphenous-vein', to: 'saphenous-opening' },
        { from: 'saphenous-opening', to: 'femoral-vein' },
        { from: 'inguinal-nodes', to: 'vertical-nodes' },
        { from: 'inguinal-nodes', to: 'horizontal-nodes' },
        { from: 'fascia-lata', to: 'iliotibial-tract' },
        { from: 'fascia-lata', to: 'intermuscular-septa' },
        { from: 'fascia-lata', to: 'holdens-line' },
      ],
    },
    lesions: [
      {
        id: 'meralgia',
        label: 'Meralgia paraesthetica',
        nodeIds: ['lateral-cutaneous-nerve-of-thigh'],
        explanation:
          'The lateral cutaneous nerve of the thigh can be caught where it passes behind or through the lateral end of the inguinal ligament, giving burning pain and numbness down the outer thigh.',
      },
      {
        id: 'urine-holdens-line',
        label: 'Ruptured urethra',
        nodeIds: ['holdens-line', 'fascia-lata'],
        explanation:
          'Urine escaping from a urethra torn in the perineum spreads under the membranous layer of superficial fascia up onto the abdominal wall, but cannot pass down into the thigh beyond Holden’s line, where that layer is fixed to the fascia lata.',
      },
      {
        id: 'knee-bursitis',
        label: 'Housemaid’s knee',
        nodeIds: ['patellar-plexus'],
        explanation:
          'Kneeling inflames the prepatellar bursa in front of the patella (housemaid’s knee); kneeling upright inflames the subcutaneous infrapatellar bursa over the tibial tuberosity (clergyman’s knee).',
      },
    ],
    drill: [
      {
        id: 'nerves',
        title: 'Skin nerves',
        hint: 'Outer side, front, groin and medial side, and the plexus in front of the knee.',
        nodeIds: [
          'lateral-cutaneous-nerve-of-thigh',
          'femoral-nerve',
          'saphenous-nerve',
          'genitofemoral-nerve',
          'patellar-plexus',
        ],
      },
      {
        id: 'vein-fascia',
        title: 'Vein, nodes and fascia',
        hint: 'Where the vein ends, the two groups of nodes, and the specialisations of the fascia lata.',
        nodeIds: [
          'saphenous-opening',
          'femoral-vein',
          'vertical-nodes',
          'horizontal-nodes',
          'iliotibial-tract',
          'intermuscular-septa',
          'holdens-line',
        ],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: HIP_THIGH_MODEL_CREDIT,
      parts: hipThighParts([
        ...HIP_THIGH_BONES,
        ...FRONT_MUSCLES,
        'tensor-fasciae-latae',
        'iliotibial-tract',
        'adductor-longus',
        'gracilis',
        'great-saphenous-vein',
        'superficial-epigastric-vein',
        'femoral-vein',
        'femoral-artery',
        'superficial-epigastric-artery',
        'lateral-cutaneous-nerve-of-thigh',
        'femoral-nerve',
        'saphenous-nerve',
        'genitofemoral-nerve',
      ]),
      traces: [],
      stops: [
        THIGH_FRONT,
        {
          id: 'groin',
          title: 'The groin',
          description:
            'The great saphenous vein turns in through the saphenous opening to the femoral vein, with its three small tributaries joining just before.',
          target: [-60, -130, 790],
          position: [-225, -908, 880],
        },
        {
          id: 'lateral',
          title: 'Iliotibial tract',
          description:
            'From the side: the thickened band of fascia lata from the iliac crest to the lateral tibial condyle, with tensor fasciae latae and gluteus maximus inserting into its top.',
          target: [-125, -90, 640],
          position: [-1346, -348, 716],
        },
        {
          id: 'medial',
          title: 'Medial side',
          description:
            'The great saphenous vein and saphenous nerve run up the medial side of the knee and thigh.',
          target: [-50, -100, 520],
          position: [917, -880, 656],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'landmarks',
      title: 'Landmarks',
      body: 'The fold of the groin lies over the inguinal ligament, from the anterior superior iliac spine to the pubic tubercle. The midinguinal point, halfway between the spine and the pubic symphysis, marks the femoral artery and head of the femur; the femoral nerve lies under the midpoint of the ligament, a little lateral.',
      focus: [],
    },
    {
      id: 'nerves',
      title: 'Skin nerves',
      body: 'The lateral cutaneous nerve of the thigh (L2, L3) comes out behind the lateral end of the inguinal ligament to the outer thigh. The femoral nerve gives the intermediate and medial cutaneous nerves to the front and lower medial thigh. The femoral branch of the genitofemoral nerve supplies the skin over the femoral triangle, and the ilioinguinal the upper medial thigh. The saphenous nerve comes through at the knee to the medial leg and foot, giving an infrapatellar branch. Four of these join in the patellar plexus in front of the knee.',
      focus: [
        'cutaneous-nerves',
        'lateral-cutaneous-nerve-of-thigh',
        'femoral-nerve',
        'genitofemoral-nerve',
        'saphenous-nerve',
        'patellar-plexus',
      ],
    },
    {
      id: 'vein',
      title: 'Great saphenous vein',
      body: 'The longest superficial vein. It starts at the medial end of the dorsal venous arch, runs in front of the medial malleolus, up the medial side of the leg, behind the knee and forwards in the thigh to the saphenous opening, where it pierces the cribriform fascia to join the femoral vein. Just before, it takes three tributaries matching the superficial branches of the femoral artery: superficial epigastric, circumflex iliac and external pudendal.',
      focus: [
        'great-saphenous-vein',
        'superficial-epigastric-vein',
        'saphenous-opening',
        'femoral-vein',
      ],
    },
    {
      id: 'nodes',
      title: 'Superficial inguinal nodes',
      body: 'Arranged like a T. The vertical group along the vein drains most of the lower limb. The upper lateral group drains the buttock and the lateral lower abdominal wall; the upper medial group the medial lower abdominal wall, external genitalia and the ends of the urethra, anal canal and vagina.',
      focus: ['inguinal-nodes', 'vertical-nodes', 'horizontal-nodes'],
    },
    {
      id: 'fascia-lata',
      title: 'Fascia lata',
      body: 'A tough sleeve round the thigh, attached above along the boundary with the pelvis (inguinal ligament, iliac crest, sacrum, ischial tuberosity, pubis) and below to the bony points round the knee. Three intermuscular septa from it to the linea aspera divide the thigh into anterior, medial and posterior compartments. The saphenous opening, 4 cm below and lateral to the pubic tubercle, has a sharp falciform lateral margin.',
      focus: ['fascia-lata', 'intermuscular-septa'],
    },
    {
      id: 'iliotibial',
      title: 'Iliotibial tract',
      body: 'A 5 cm band on the outer thigh from the tubercle of the iliac crest to the front of the lateral condyle of the tibia. Three-quarters of gluteus maximus and all of tensor fasciae latae insert into it, and it steadies the knee in extension and partial flexion, in walking and running.',
      focus: ['iliotibial-tract'],
    },
    {
      id: 'membranous',
      title: 'Superficial fascia',
      body: 'Two layers continuous with those of the abdominal wall: fatty outside, membranous inside, with the nerves, vessels and nodes between them near the groin. The membranous layer is fixed to the fascia lata along Holden’s line, just below the inguinal ligament.',
      focus: ['holdens-line'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select the vein and each nerve to light it, and follow them with the guided views.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'longest-superficial-vein',
      prompt: 'The longest superficial vein of the lower limb is:',
      options: [
        { id: 'great-saphenous', text: 'The great saphenous vein' },
        { id: 'femoral', text: 'The femoral vein' },
        { id: 'small-saphenous', text: 'The small saphenous vein' },
        { id: 'popliteal', text: 'The popliteal vein' },
      ],
      answerId: 'great-saphenous',
      explanation: 'It runs from the foot to the saphenous opening in the groin.',
    },
    {
      id: 'iliotibial-insertions',
      prompt: 'Which pair of muscles inserts into the upper part of the iliotibial tract?',
      options: [
        { id: 'gmax-tfl', text: 'Gluteus maximus and tensor fasciae latae' },
        { id: 'gmax-pect', text: 'Gluteus maximus and pectineus' },
        { id: 'pect-tfl', text: 'Pectineus and tensor fasciae latae' },
        { id: 'al-pect', text: 'Adductor longus and pectineus' },
      ],
      answerId: 'gmax-tfl',
      explanation: 'Through the tract they steady the knee in extension and partial flexion.',
    },
    {
      id: 'saphenous-opening-site',
      prompt: 'The centre of the saphenous opening lies:',
      options: [
        { id: 'four-four', text: '4 cm below and 4 cm lateral to the pubic tubercle' },
        { id: 'midinguinal', text: 'At the midinguinal point' },
        { id: 'asis', text: '4 cm below the anterior superior iliac spine' },
        { id: 'apex', text: 'At the apex of the femoral triangle' },
      ],
      answerId: 'four-four',
      explanation:
        'It is about 2.5 by 2 cm, closed by the cribriform fascia, with a sharp lateral falciform margin.',
    },
    {
      id: 'meralgia-nerve',
      prompt: 'Meralgia paraesthetica is pain along:',
      options: [
        { id: 'lcnt', text: 'The lateral cutaneous nerve of the thigh' },
        { id: 'saphenous', text: 'The saphenous nerve' },
        { id: 'genitofemoral', text: 'The genitofemoral nerve' },
        { id: 'obturator', text: 'The obturator nerve' },
      ],
      answerId: 'lcnt',
      explanation: 'It is trapped at the lateral end of the inguinal ligament.',
    },
  ],
  cards: [
    {
      id: 'thigh-front-cutaneous',
      front: 'Cutaneous nerves of the front of the thigh?',
      back: 'Lateral cutaneous nerve of thigh, intermediate and medial cutaneous nerves (femoral), femoral branch of genitofemoral, ilioinguinal; saphenous at the knee.',
    },
    {
      id: 'patellar-plexus-card',
      front: 'Nerves forming the patellar plexus?',
      back: 'Lateral cutaneous (anterior division), intermediate cutaneous, medial cutaneous (anterior division), and the infrapatellar branch of the saphenous.',
    },
    {
      id: 'great-saphenous-course',
      front: 'Course of the great saphenous vein?',
      back: 'Medial end of the dorsal venous arch → in front of the medial malleolus → medial leg → behind the knee → thigh → saphenous opening → femoral vein.',
    },
    {
      id: 'inguinal-node-groups',
      front: 'Groups of superficial inguinal nodes and their drainage?',
      back: 'Vertical: most of the lower limb. Upper lateral: buttock, lateral lower abdominal wall. Upper medial: medial lower abdominal wall, external genitalia, lower anal canal, urethra, vagina.',
    },
    {
      id: 'iliotibial-tract-card',
      front: 'Iliotibial tract: attachments and role?',
      back: 'Tubercle of iliac crest to the lateral tibial condyle; takes gluteus maximus and tensor fasciae latae; steadies the knee.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 3 Front of Thigh', pages: '45–50' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '560–564' },
  ],
};
