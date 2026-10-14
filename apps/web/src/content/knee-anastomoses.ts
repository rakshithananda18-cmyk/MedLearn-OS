import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  GENICULAR_ARTERIES,
  HIP_THIGH_MODEL_CREDIT,
  HIP_THIGH_MODEL_SRC,
  hipThighParts,
} from './hip-thigh-3d';

// Lower limb batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const kneeAnastomoses: Topic = {
  slug: 'knee-anastomoses',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Anastomoses round the knee',
  summary:
    'The genicular arteries and the branches from above and below that meet round the patella and the ends of the femur and tibia, and why the network matters when the popliteal artery is blocked.',
  estimatedMinutes: 9,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 6 Popliteal Fossa, pages 91 and 93'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: arteries of the thigh and vascular supply of the knee joint, pages 593 and 606',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones, muscles and arteries (CC BY 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0',
    },
  ],
  keyFacts: [
    'A network round the patella and the adjoining ends of the femur and tibia, with a superficial part (round the patella and behind the ligamentum patellae) and a deep part on the bones.',
    'Medial, above the condyle: descending genicular (femoral) and superior medial genicular. Medial, below: saphenous branch of the descending genicular and inferior medial genicular.',
    'Lateral, above: descending branch of the lateral circumflex femoral and superior lateral genicular. Lateral, below: inferior lateral genicular, anterior and posterior tibial recurrent, circumflex fibular.',
    'The middle genicular artery pierces the oblique popliteal ligament to the cruciate ligaments and synovial membrane.',
    'The network supplies the bones, capsule and synovial membrane, and carries blood round a slowly blocked popliteal artery.',
  ],
  visual: {
    kind: 'path',
    // The four corners of the network and the middle genicular inside the joint.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'medial-above',
          label: 'Medial,\nabove',
          name: 'Medial side, above the condyle',
          x: 50,
          y: 30,
        },
        {
          id: 'descending-genicular-artery',
          label: 'Descending\ngenicular',
          name: 'Descending genicular, from the femoral artery',
          x: 145,
          y: 30,
        },
        {
          id: 'superior-medial-genicular-artery',
          label: 'Superior\nmedial',
          name: 'Superior medial genicular',
          x: 225,
          y: 30,
        },
        {
          id: 'medial-below',
          label: 'Medial,\nbelow',
          name: 'Medial side, below the condyle',
          x: 50,
          y: 110,
        },
        {
          id: 'saphenous-branch',
          label: 'Saphenous\nbranch',
          name: 'Saphenous branch of the descending genicular',
          x: 145,
          y: 110,
        },
        {
          id: 'inferior-medial-genicular-artery',
          label: 'Inferior\nmedial',
          name: 'Inferior medial genicular',
          x: 225,
          y: 110,
        },
        {
          id: 'lateral-above',
          label: 'Lateral,\nabove',
          name: 'Lateral side, above the condyle',
          x: 50,
          y: 186,
        },
        {
          id: 'lateral-circumflex-femoral-artery',
          label: 'Lateral\ncircumflex',
          name: 'Descending branch of the lateral circumflex femoral',
          x: 145,
          y: 186,
        },
        {
          id: 'superior-lateral-genicular-artery',
          label: 'Superior\nlateral',
          name: 'Superior lateral genicular',
          x: 225,
          y: 186,
        },
        {
          id: 'lateral-below',
          label: 'Lateral,\nbelow',
          name: 'Lateral side, below the condyle',
          x: 50,
          y: 262,
        },
        {
          id: 'inferior-lateral-genicular-artery',
          label: 'Inferior\nlateral',
          name: 'Inferior lateral genicular',
          x: 145,
          y: 262,
        },
        {
          id: 'anterior-tibial-artery',
          label: 'Tibial\nrecurrents',
          name: 'Anterior and posterior tibial recurrent, from the anterior tibial',
          x: 225,
          y: 262,
        },
        {
          id: 'posterior-tibial-artery',
          label: 'Circumflex\nfibular',
          name: 'Circumflex fibular, from the posterior tibial',
          x: 305,
          y: 262,
        },
        { id: 'inside', label: 'Inside', name: 'Inside the joint', x: 50, y: 340 },
        {
          id: 'middle-genicular-artery',
          label: 'Middle\ngenicular',
          name: 'Middle genicular, through the oblique popliteal ligament',
          x: 145,
          y: 340,
        },
        {
          id: 'popliteal-artery',
          label: 'Popliteal\nartery',
          name: 'Popliteal artery, source of the five genicular arteries',
          x: 225,
          y: 340,
        },
      ],
      edges: [
        { from: 'medial-above', to: 'descending-genicular-artery' },
        { from: 'medial-above', to: 'superior-medial-genicular-artery' },
        { from: 'medial-below', to: 'saphenous-branch' },
        { from: 'medial-below', to: 'inferior-medial-genicular-artery' },
        { from: 'lateral-above', to: 'lateral-circumflex-femoral-artery' },
        { from: 'lateral-above', to: 'superior-lateral-genicular-artery' },
        { from: 'lateral-below', to: 'inferior-lateral-genicular-artery' },
        { from: 'lateral-below', to: 'anterior-tibial-artery' },
        { from: 'lateral-below', to: 'posterior-tibial-artery' },
        { from: 'inside', to: 'middle-genicular-artery' },
        { from: 'inside', to: 'popliteal-artery' },
      ],
    },
    lesions: [
      {
        id: 'slow-block',
        label: 'Slow popliteal block',
        nodeIds: [
          'popliteal-artery',
          'descending-genicular-artery',
          'lateral-circumflex-femoral-artery',
        ],
        explanation:
          'When the popliteal artery narrows slowly, the branches of the femoral and profunda arteries above the knee enlarge and carry blood through the network to the tibial arteries below, keeping the leg alive.',
      },
      {
        id: 'tethered-artery',
        label: 'Tethered artery',
        nodeIds: ['popliteal-artery'],
        explanation:
          'A fibrous band ties the popliteal artery to the capsule just above the femoral condyles; repeated stretching there can clot the artery in young people.',
      },
    ],
    drill: [
      {
        id: 'medial-side',
        title: 'Medial side',
        hint: 'Two from the femoral artery’s descending genicular, two genicular from the popliteal.',
        nodeIds: [
          'descending-genicular-artery',
          'superior-medial-genicular-artery',
          'saphenous-branch',
          'inferior-medial-genicular-artery',
        ],
      },
      {
        id: 'lateral-side',
        title: 'Lateral side',
        hint: 'From the profunda above; the genicular arteries; the recurrent branches from below.',
        nodeIds: [
          'lateral-circumflex-femoral-artery',
          'superior-lateral-genicular-artery',
          'inferior-lateral-genicular-artery',
          'anterior-tibial-artery',
          'posterior-tibial-artery',
        ],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: HIP_THIGH_MODEL_CREDIT,
      parts: hipThighParts([
        'femur',
        'patella',
        'tibia',
        'fibula',
        'popliteus',
        'femoral-artery',
        'popliteal-artery',
        'descending-genicular-artery',
        'lateral-circumflex-femoral-artery',
        ...GENICULAR_ARTERIES,
        'anterior-tibial-artery',
        'posterior-tibial-artery',
      ]),
      traces: [],
      stops: [
        {
          id: 'front',
          title: 'The knee from the front',
          description:
            'The network lies round the patella and the ends of the femur and tibia; its arteries reach the front from both sides.',
          target: [-80, -80, 390],
          position: [-120, -780, 430],
        },
        {
          id: 'medial',
          title: 'Medial side',
          description:
            'The descending genicular comes down from the adductor canal; the superior and inferior medial genicular arteries wind round above and below the medial condyles.',
          target: [-70, -70, 390],
          position: [600, -250, 430],
        },
        {
          id: 'lateral',
          title: 'Lateral side',
          description:
            'The superior lateral genicular winds round above the lateral femoral condyle, the inferior lateral above the head of the fibula; recurrent branches climb from the tibial arteries below.',
          target: [-90, -70, 390],
          position: [-760, -200, 430],
        },
        {
          id: 'source',
          title: 'From behind',
          description:
            'The popliteal artery gives all five genicular arteries; the middle one goes straight forwards into the joint.',
          target: [-80, -60, 400],
          position: [-110, 640, 440],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'network',
      title: 'A network round the joint',
      body: 'Arteries from above and below the knee meet in a network round the patella and the adjoining ends of the femur and tibia. Its superficial part lies in the fascia round the patella and in the fat behind the ligamentum patellae; its deep part lies on the bones next to their joint surfaces. It supplies the bones, capsule and synovial membrane of the knee.',
      focus: [],
    },
    {
      id: 'medial',
      title: 'Medial side',
      body: 'Above the condyle the descending genicular branch of the femoral artery, given off in the adductor canal, meets the superior medial genicular. Below it the saphenous branch of the descending genicular meets the inferior medial genicular, which winds round the medial tibial condyle under the tibial collateral ligament.',
      focus: [
        'medial-above',
        'descending-genicular-artery',
        'superior-medial-genicular-artery',
        'medial-below',
        'saphenous-branch',
        'inferior-medial-genicular-artery',
      ],
    },
    {
      id: 'lateral',
      title: 'Lateral side',
      body: 'Above the condyle the descending branch of the lateral circumflex femoral, from the profunda, meets the superior lateral genicular. Below it the inferior lateral genicular, passing above the head of the fibula under the fibular collateral ligament, meets branches climbing from below: the anterior and posterior tibial recurrent arteries and the circumflex fibular artery.',
      focus: [
        'lateral-above',
        'lateral-circumflex-femoral-artery',
        'superior-lateral-genicular-artery',
        'lateral-below',
        'inferior-lateral-genicular-artery',
        'anterior-tibial-artery',
        'posterior-tibial-artery',
      ],
    },
    {
      id: 'linked',
      title: 'Linked up',
      body: 'The medial and lateral vessels run up and down each side of the patella and are joined across, above the patella and above the tibial tuberosity. The middle genicular artery takes no part: it pierces the oblique popliteal ligament to supply the cruciate ligaments and synovial membrane inside the joint.',
      focus: ['inside', 'middle-genicular-artery', 'popliteal-artery'],
    },
    {
      id: 'why',
      title: 'Why it matters',
      body: 'Because branches of the femoral and profunda arteries join branches of the tibial arteries here, blood can bypass a popliteal artery that closes slowly. A sudden block, before the network has enlarged, can still cost the leg.',
      focus: [
        'popliteal-artery',
        'descending-genicular-artery',
        'lateral-circumflex-femoral-artery',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Turn round the knee with the views and select each genicular artery to light it, then follow the descending genicular up to the femoral artery.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'middle-genicular-pierces',
      prompt: 'Which artery pierces the oblique popliteal ligament?',
      options: [
        { id: 'middle', text: 'Middle genicular' },
        { id: 'superior-medial', text: 'Superior medial genicular' },
        { id: 'descending', text: 'Descending genicular' },
        { id: 'inferior-lateral', text: 'Inferior lateral genicular' },
      ],
      answerId: 'middle',
      explanation: 'It supplies the cruciate ligaments and synovial membrane inside the joint.',
    },
    {
      id: 'knee-anastomosis-not',
      prompt: 'Which artery does not take part in the anastomoses round the knee?',
      options: [
        { id: 'obturator', text: 'Obturator' },
        { id: 'descending-genicular', text: 'Descending genicular' },
        { id: 'tibial-recurrent', text: 'Anterior tibial recurrent' },
        { id: 'lcfa', text: 'Lateral circumflex femoral' },
      ],
      answerId: 'obturator',
      explanation:
        'The obturator artery joins the anastomoses round the hip, not the knee; the lateral circumflex femoral reaches the knee by its descending branch.',
    },
    {
      id: 'descending-genicular-source',
      prompt: 'The descending genicular artery is a branch of the:',
      options: [
        { id: 'femoral', text: 'Femoral artery, in the adductor canal' },
        { id: 'popliteal', text: 'Popliteal artery' },
        { id: 'profunda', text: 'Profunda femoris' },
        { id: 'anterior-tibial', text: 'Anterior tibial artery' },
      ],
      answerId: 'femoral',
      explanation: 'It is the last branch of the femoral artery before the adductor opening.',
    },
    {
      id: 'genicular-from-popliteal',
      prompt: 'How many genicular branches does the popliteal artery give?',
      options: [
        { id: 'five', text: 'Five' },
        { id: 'three', text: 'Three' },
        { id: 'four', text: 'Four' },
        { id: 'six', text: 'Six' },
      ],
      answerId: 'five',
      explanation: 'Superior medial and lateral, inferior medial and lateral, and middle.',
    },
  ],
  cards: [
    {
      id: 'knee-medial-card',
      front: 'Arteries on the medial side of the knee anastomosis?',
      back: 'Above: descending genicular and superior medial genicular. Below: saphenous branch of the descending genicular and inferior medial genicular.',
    },
    {
      id: 'knee-lateral-card',
      front: 'Arteries on the lateral side of the knee anastomosis?',
      back: 'Above: descending branch of the lateral circumflex femoral and superior lateral genicular. Below: inferior lateral genicular, anterior and posterior tibial recurrent, circumflex fibular.',
    },
    {
      id: 'middle-genicular-card',
      front: 'What does the middle genicular artery supply?',
      back: 'It pierces the oblique popliteal ligament to the cruciate ligaments and synovial membrane of the knee.',
    },
    {
      id: 'knee-network-supplies-card',
      front: 'What does the anastomosis round the knee supply?',
      back: 'The bones forming the knee joint, its capsule and synovial membrane; and a bypass round a slowly blocked popliteal artery.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 6 Popliteal Fossa', pages: '91, 93' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '593, 606' },
  ],
};
