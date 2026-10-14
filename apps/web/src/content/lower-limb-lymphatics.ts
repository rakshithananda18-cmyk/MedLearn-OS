import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  GLUTEAL_BACK,
  HIP_THIGH_BONES,
  HIP_THIGH_MODEL_CREDIT,
  HIP_THIGH_MODEL_SRC,
  hipThighParts,
  POPLITEAL_BACK,
  THIGH_FRONT,
} from './hip-thigh-3d';

// Lymph node groups as schematic traces (BodyParts3D millimetres): the inguinal groups where
// Z-Anatomy's right inguinal nodes lie, the popliteal nodes by the end of the small saphenous
// vein, the inconstant anterior tibial node on the upper anterior tibial artery.
const NODE_GROUPS = {
  vertical: [
    [-61, -146, 722],
    [-60, -146, 744],
    [-59, -146, 764],
  ],
  lateral: [
    [-66, -153, 789],
    [-60, -153, 794],
    [-54, -153, 799],
  ],
  medial: [
    [-29, -155, 769],
    [-22, -155, 772],
    [-15, -155, 775],
  ],
  deep: [
    [-44, -150, 758],
    [-43, -150, 768],
    [-43, -146, 779],
  ],
  popliteal: [
    [-86, -45, 395],
    [-84, -48, 410],
    [-80, -52, 425],
  ],
  anteriorTibial: [
    [-102, -78, 282],
    [-102, -76, 295],
  ],
} satisfies Record<string, [number, number, number][]>;

// Lower limb batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const lowerLimbLymphatics: Topic = {
  slug: 'lower-limb-lymphatics',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Lower limb: lymphatic drainage and inguinal nodes',
  summary:
    'The superficial and deep inguinal nodes and what each group drains, the popliteal nodes, and the two streams of lymph vessels up the limb.',
  estimatedMinutes: 10,
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
      'Volume 2, Chapter 11 Venous and Lymphatic Drainage, pages 152 to 154',
    ),
    bookSource('grays-anatomy', 'Chapter 6 Lower Limb, regional anatomy: lymphatics, page 562'),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'Bones, muscles and vessels (BodyParts3D, CC BY 4.0); inguinal node positions (Z-Anatomy, CC BY-SA 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 and CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Most lymph from the lower limb reaches the inguinal nodes, directly or through the popliteal nodes; the deep buttock and upper back of the thigh drain along the gluteal vessels to the internal iliac nodes.',
    'Superficial inguinal nodes lie in a T: a lower vertical group along the end of the great saphenous vein (most of the skin of the limb), an upper lateral group (buttock, flank and back below the umbilicus) and an upper medial group (lower abdominal wall, perineum, external genitalia, lower anal canal).',
    'Deep inguinal nodes lie medial to the upper femoral vein, one (Cloquet’s) in the femoral canal; they receive the superficial nodes, the popliteal nodes and the deep lymphatics, and drain to the external iliac nodes.',
    'Popliteal nodes, by the end of the small saphenous vein, drain the lateral foot, heel and back of the leg, the deep leg and the knee.',
    'Superficial lymph vessels outnumber the deep: the main stream follows the great saphenous vein, a smaller one the small saphenous vein; the deep ones follow the arteries.',
  ],
  visual: {
    kind: 'path',
    // The superficial groups and what they drain, deep and popliteal nodes, vessels, gluteal route.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'superficial-inguinal',
          label: 'Super-\nficial',
          name: 'Superficial inguinal nodes',
          x: 50,
          y: 30,
        },
        {
          id: 'vertical-group',
          label: 'Vertical',
          name: 'Lower vertical group, along the end of the great saphenous vein',
          x: 145,
          y: 30,
        },
        {
          id: 'lateral-group',
          label: 'Upper\nlateral',
          name: 'Upper lateral group, below the lateral inguinal ligament',
          x: 225,
          y: 30,
        },
        {
          id: 'medial-group',
          label: 'Upper\nmedial',
          name: 'Upper medial group, below the medial inguinal ligament',
          x: 305,
          y: 30,
        },
        { id: 'drains', label: 'Drain', name: 'What each group drains', x: 50, y: 110 },
        {
          id: 'limb-skin',
          label: 'Limb\nskin',
          name: 'Vertical: skin of the limb, except the buttock and the small saphenous territory',
          x: 145,
          y: 110,
        },
        {
          id: 'buttock-flank',
          label: 'Buttock,\nflank',
          name: 'Lateral: buttock, flank and back below the umbilicus',
          x: 225,
          y: 110,
        },
        {
          id: 'perineum',
          label: 'Perineum',
          name: 'Medial: lower abdominal wall, perineum, external genitalia, lower anal canal',
          x: 305,
          y: 110,
        },
        {
          id: 'deep-inguinal',
          label: 'Deep\ninguinal',
          name: 'Deep inguinal nodes, medial to the femoral vein',
          x: 50,
          y: 186,
        },
        {
          id: 'cloquet',
          label: 'Cloquet',
          name: 'Node of Cloquet, in the femoral canal',
          x: 145,
          y: 186,
        },
        {
          id: 'external-iliac',
          label: 'External\niliac',
          name: 'Drain on to the external iliac nodes',
          x: 225,
          y: 186,
        },
        {
          id: 'popliteal-nodes',
          label: 'Popliteal',
          name: 'Popliteal nodes, by the end of the small saphenous vein',
          x: 50,
          y: 262,
        },
        {
          id: 'small-saphenous-vein',
          label: 'Small\nsaphenous',
          name: 'Territory of the small saphenous vein: lateral foot, heel, back of leg',
          x: 145,
          y: 262,
        },
        {
          id: 'deep-leg',
          label: 'Deep leg,\nknee',
          name: 'Deep structures of the leg and the knee joint',
          x: 225,
          y: 262,
        },
        {
          id: 'anterior-tibial-node',
          label: 'Anterior\ntibial',
          name: 'An inconstant anterior tibial node on the way',
          x: 305,
          y: 262,
        },
        { id: 'vessels', label: 'Vessels', name: 'Lymph vessels', x: 50, y: 340 },
        {
          id: 'great-saphenous-vein',
          label: 'Main\nstream',
          name: 'Main superficial stream, with the great saphenous vein',
          x: 145,
          y: 340,
        },
        {
          id: 'femoral-vein',
          label: 'Deep\nvessels',
          name: 'Deep lymphatics, with the femoral and popliteal vessels',
          x: 225,
          y: 340,
        },
        {
          id: 'internal-iliac',
          label: 'Internal\niliac',
          name: 'Internal iliac nodes',
          x: 50,
          y: 416,
        },
        {
          id: 'inferior-gluteal-vein',
          label: 'Deep\nbuttock',
          name: 'Deep buttock and upper back of the thigh, along the gluteal vessels',
          x: 145,
          y: 416,
        },
      ],
      edges: [
        { from: 'superficial-inguinal', to: 'vertical-group' },
        { from: 'superficial-inguinal', to: 'lateral-group' },
        { from: 'superficial-inguinal', to: 'medial-group' },
        { from: 'drains', to: 'limb-skin' },
        { from: 'drains', to: 'buttock-flank' },
        { from: 'drains', to: 'perineum' },
        { from: 'deep-inguinal', to: 'cloquet' },
        { from: 'deep-inguinal', to: 'external-iliac' },
        { from: 'popliteal-nodes', to: 'small-saphenous-vein' },
        { from: 'popliteal-nodes', to: 'deep-leg' },
        { from: 'popliteal-nodes', to: 'anterior-tibial-node' },
        { from: 'vessels', to: 'great-saphenous-vein' },
        { from: 'vessels', to: 'femoral-vein' },
        { from: 'internal-iliac', to: 'inferior-gluteal-vein' },
      ],
    },
    lesions: [
      {
        id: 'groin-nodes',
        label: 'Swollen groin nodes',
        nodeIds: ['superficial-inguinal', 'limb-skin', 'perineum'],
        explanation:
          'The commonest lump in the groin is an enlarged inguinal node. The cause, infection or cancer, can be anywhere they drain: foot, leg, buttock, lower abdominal wall, perineum, genitals or lower anal canal, so the whole territory is examined.',
      },
      {
        id: 'elephantiasis',
        label: 'Elephantiasis',
        nodeIds: ['vessels', 'vertical-group'],
        explanation:
          'Filarial worms block the lymph vessels of the limb; lymph backs up and the skin and subcutaneous tissue of the leg grow enormously thick.',
      },
      {
        id: 'popliteal-nodes-swollen',
        label: 'Swollen popliteal nodes',
        nodeIds: ['popliteal-nodes', 'small-saphenous-vein'],
        explanation:
          'An infection on the lateral side of the foot or the heel enlarges the popliteal nodes, which lie along the end of the small saphenous vein.',
      },
    ],
    drill: [
      {
        id: 'inguinal-groups',
        title: 'Superficial inguinal nodes',
        hint: 'Three groups in a T, and what each one drains.',
        nodeIds: [
          'vertical-group',
          'lateral-group',
          'medial-group',
          'limb-skin',
          'buttock-flank',
          'perineum',
        ],
      },
      {
        id: 'deep-and-popliteal',
        title: 'Deep, popliteal and the other routes',
        hint: 'Where the deep nodes lie and drain, what the popliteal nodes take, and the two streams.',
        nodeIds: [
          'cloquet',
          'external-iliac',
          'small-saphenous-vein',
          'deep-leg',
          'anterior-tibial-node',
          'great-saphenous-vein',
          'femoral-vein',
          'inferior-gluteal-vein',
        ],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: `${HIP_THIGH_MODEL_CREDIT} Lymph node groups: MedLearn schematic placed where Z-Anatomy’s inguinal nodes lie and along the vessels they follow, not yet medically reviewed.`,
      parts: hipThighParts([
        ...HIP_THIGH_BONES,
        'sartorius',
        'adductor-longus',
        'femoral-artery',
        'external-iliac-vein',
        'femoral-vein',
        'great-saphenous-vein',
        'superficial-epigastric-vein',
        'inferior-gluteal-vein',
        'popliteal-artery',
        'popliteal-vein',
        'small-saphenous-vein',
      ]),
      traces: [
        { id: 'vertical-group', kind: 'lymph', paths: [NODE_GROUPS.vertical] },
        { id: 'lateral-group', kind: 'lymph', paths: [NODE_GROUPS.lateral] },
        { id: 'medial-group', kind: 'lymph', paths: [NODE_GROUPS.medial] },
        { id: 'deep-inguinal', kind: 'lymph', paths: [NODE_GROUPS.deep] },
        { id: 'popliteal-nodes', kind: 'lymph', paths: [NODE_GROUPS.popliteal] },
        { id: 'anterior-tibial-node', kind: 'lymph', paths: [NODE_GROUPS.anteriorTibial] },
      ],
      stops: [
        {
          id: 'groin',
          title: 'The groin',
          description:
            'The superficial nodes lie in a T: two upper groups along the inguinal ligament and a vertical group along the end of the great saphenous vein; the deep nodes lie beside the femoral vein.',
          target: [-50, -145, 770],
          position: [-200, -860, 860],
        },
        THIGH_FRONT,
        POPLITEAL_BACK,
        GLUTEAL_BACK,
      ],
    },
  },
  lesson: [
    {
      id: 'overview',
      title: 'Where it all goes',
      body: 'Nearly all the lymph of the lower limb ends in the inguinal nodes, most of it directly and some through the popliteal nodes on the way. The exception is the deep tissue of the buttock and upper back of the thigh, whose lymph follows the gluteal vessels into the pelvis to the internal iliac nodes.',
      focus: ['internal-iliac', 'inferior-gluteal-vein'],
    },
    {
      id: 'superficial-groups',
      title: 'Superficial inguinal nodes',
      body: 'They lie in the superficial fascia below the inguinal ligament, like a T. The lower vertical group, along both sides of the end of the great saphenous vein, takes the skin and fascia of most of the limb. The upper lateral group takes the buttock, flank and back below the umbilicus. The upper medial group takes the lower front abdominal wall, the perineum and external genitalia (not the glans), the anal canal below the pectinate line and, through the round ligament, a little of the uterus.',
      focus: [
        'superficial-inguinal',
        'vertical-group',
        'lateral-group',
        'medial-group',
        'drains',
        'limb-skin',
        'buttock-flank',
        'perineum',
      ],
    },
    {
      id: 'deep-inguinal',
      title: 'Deep inguinal nodes',
      body: 'Four or five nodes medial to the upper femoral vein; the highest, the node of Cloquet, sits in the femoral canal. They receive the superficial nodes, the popliteal nodes, the deep lymphatics along the femoral vessels and the glans, and drain to the external iliac nodes.',
      focus: ['deep-inguinal', 'cloquet', 'external-iliac'],
    },
    {
      id: 'popliteal',
      title: 'Popliteal nodes',
      body: 'A few nodes deep to the fascia by the end of the small saphenous vein, one between the artery and the knee capsule. They take the small saphenous territory, the deep leg along the tibial vessels and the knee joint, and send their lymph up along the femoral vessels. An inconstant anterior tibial node may lie on the way from the front of the leg.',
      focus: ['popliteal-nodes', 'small-saphenous-vein', 'deep-leg', 'anterior-tibial-node'],
    },
    {
      id: 'vessels',
      title: 'Lymph vessels',
      body: 'Superficial vessels are bigger and more numerous. The main stream follows the great saphenous vein to the vertical group; the smaller stream follows the small saphenous vein to the popliteal nodes. Deep vessels run with the main arteries and end mostly in the deep inguinal nodes.',
      focus: ['vessels', 'great-saphenous-vein', 'femoral-vein'],
    },
    {
      id: 'explore',
      title: 'Find them yourself',
      body: 'Go to the groin view and select each node group in turn, then follow the great saphenous vein down to see which skin the vertical group drains.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'vertical-group-drains',
      prompt: 'The lower vertical group of superficial inguinal nodes drains:',
      options: [
        { id: 'limb', text: 'Most of the skin of the lower limb' },
        { id: 'buttock', text: 'The buttock' },
        { id: 'perineum', text: 'The perineum' },
        { id: 'glans', text: 'The glans penis' },
      ],
      answerId: 'limb',
      explanation:
        'Except the buttock (upper lateral group) and the small saphenous territory (popliteal nodes).',
    },
    {
      id: 'cloquet-site',
      prompt: 'The node of Cloquet lies in the:',
      options: [
        { id: 'femoral-canal', text: 'Femoral canal' },
        { id: 'popliteal-fossa', text: 'Popliteal fossa' },
        { id: 'adductor-canal', text: 'Adductor canal' },
        { id: 'saphenous-opening', text: 'Saphenous opening' },
      ],
      answerId: 'femoral-canal',
      explanation: 'It is the highest deep inguinal node.',
    },
    {
      id: 'lateral-foot-lymph',
      prompt: 'An infected blister on the lateral side of the heel first enlarges the:',
      options: [
        { id: 'popliteal', text: 'Popliteal nodes' },
        { id: 'vertical', text: 'Vertical group of superficial inguinal nodes' },
        { id: 'internal-iliac', text: 'Internal iliac nodes' },
        { id: 'upper-medial', text: 'Upper medial superficial inguinal nodes' },
      ],
      answerId: 'popliteal',
      explanation:
        'Lymph from the small saphenous territory follows the vein to the popliteal nodes.',
    },
    {
      id: 'anal-canal-lymph',
      prompt: 'Lymph from the anal canal below the pectinate line goes to the:',
      options: [
        { id: 'superficial-inguinal', text: 'Superficial inguinal nodes' },
        { id: 'internal-iliac', text: 'Internal iliac nodes' },
        { id: 'popliteal', text: 'Popliteal nodes' },
        { id: 'para-aortic', text: 'Para-aortic nodes' },
      ],
      answerId: 'superficial-inguinal',
      explanation: 'The upper medial group, with the perineum and external genitalia.',
    },
  ],
  cards: [
    {
      id: 'superficial-inguinal-groups-card',
      front: 'Groups of superficial inguinal nodes and their territories?',
      back: 'Lower vertical: skin of most of the limb. Upper lateral: buttock, flank, back below the umbilicus. Upper medial: lower abdominal wall, perineum, external genitalia, lower anal canal.',
    },
    {
      id: 'deep-inguinal-card',
      front: 'Deep inguinal nodes: site, afferents, efferents?',
      back: 'Medial to the upper femoral vein, Cloquet in the femoral canal; from the superficial nodes, popliteal nodes, deep lymphatics and the glans; to the external iliac nodes.',
    },
    {
      id: 'popliteal-nodes-card',
      front: 'What do the popliteal nodes drain?',
      back: 'The small saphenous territory (lateral foot, heel, back of leg), the deep leg and the knee joint.',
    },
    {
      id: 'internal-iliac-route-card',
      front: 'Which lymph of the lower limb bypasses the inguinal nodes?',
      back: 'From the deep gluteal region and upper back of the thigh, along the gluteal vessels to the internal iliac nodes.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 11 Venous and Lymphatic Drainage',
      pages: '152–154',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '562' },
  ],
};
