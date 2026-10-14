import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  LEG_BACK,
  LEG_FOOT_BONES,
  LEG_FOOT_MODEL_CREDIT,
  LEG_FOOT_MODEL_SRC,
  legFootParts,
} from './leg-foot-3d';

// Perforating veins are not in the model: schematic lines from the great saphenous vein to the
// posterior tibial veins at the levels BD gives, placed on the meshes (BodyParts3D millimetres).
const PERFORATORS = {
  ankle: [
    [
      [-58, -89, 120],
      [-50, -76, 120],
      [-43, -62, 120],
    ],
    [
      [-59, -88, 50],
      [-51, -69, 50],
      [-44, -50, 50],
    ],
    [
      [-63, -108, 5],
      [-55, -82, 5],
      [-48, -56, 5],
    ],
  ],
  knee: [
    [
      [-31, -71, 285],
      [-52, -70, 262],
      [-74, -69, 238],
    ],
  ],
} satisfies Record<string, [number, number, number][][]>;

// Lower limb batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const lowerLimbVeins: Topic = {
  slug: 'lower-limb-veins',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Lower limb: venous drainage and varicose veins',
  summary:
    'How blood climbs back up the leg against gravity: superficial, deep and perforating veins, the calf pump, and what goes wrong in varicose veins and deep vein thrombosis.',
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
      'Volume 2, Chapter 11 Venous and Lymphatic Drainage, pages 148 to 152 and 154',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: veins, varicose veins and deep vein thrombosis, pages 560 and 561',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bones, muscles and veins (BodyParts3D, CC BY 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0',
    },
  ],
  keyFacts: [
    'Venous blood climbs against gravity, helped by suction from the chest, arterial pulsation, valves, and above all the calf muscles squeezing the deep veins inside the tight deep fascia.',
    'Superficial veins (great and small saphenous) lie in the superficial fascia; deep veins run with the arteries; perforating veins join them, their valves letting blood pass only from superficial to deep.',
    'Perforators of the great saphenous system: three medial ones above the ankle, one below the knee and one in the adductor canal; the small saphenous has one lateral perforator.',
    'Varicose veins: when the valve at the saphenofemoral junction or in the perforators fails, calf-pump pressure is passed outwards and the superficial veins stretch and twist; ulcers form above the medial malleolus.',
    'Trendelenburg’s test finds incompetent saphenofemoral and perforator valves; Perthes’ test checks that the deep veins are open.',
  ],
  visual: {
    kind: 'path',
    // What drives the return, the three sets of veins, varicose veins and the tests.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'return', label: 'Return', name: 'What drives blood upwards', x: 50, y: 30 },
        {
          id: 'calf-pump',
          label: 'Calf\npump',
          name: 'The calf muscle pump inside the tight deep fascia',
          x: 145,
          y: 30,
        },
        {
          id: 'valves',
          label: 'Valves',
          name: 'Valves that break up the column of blood',
          x: 225,
          y: 30,
        },
        {
          id: 'chest-suction',
          label: 'Chest\nsuction',
          name: 'Negative pressure in the chest',
          x: 305,
          y: 30,
        },
        {
          id: 'superficial-veins',
          label: 'Super-\nficial',
          name: 'Superficial veins, in the superficial fascia',
          x: 50,
          y: 110,
        },
        {
          id: 'great-saphenous-vein',
          label: 'Great\nsaphenous',
          name: 'Great saphenous vein, to the femoral vein',
          x: 145,
          y: 110,
        },
        {
          id: 'small-saphenous-vein',
          label: 'Small\nsaphenous',
          name: 'Small saphenous vein, to the popliteal vein',
          x: 225,
          y: 110,
        },
        {
          id: 'dorsal-venous-arch',
          label: 'Dorsal\narch',
          name: 'Dorsal venous arch, where both begin',
          x: 305,
          y: 110,
        },
        { id: 'deep-veins', label: 'Deep', name: 'Deep veins, with the arteries', x: 50, y: 186 },
        {
          id: 'posterior-tibial-vein',
          label: 'Posterior\ntibial',
          name: 'Posterior tibial veins',
          x: 145,
          y: 186,
        },
        {
          id: 'anterior-tibial-vein',
          label: 'Anterior\ntibial',
          name: 'Anterior tibial veins',
          x: 225,
          y: 186,
        },
        {
          id: 'popliteal-vein',
          label: 'Popliteal',
          name: 'Popliteal vein, then femoral',
          x: 305,
          y: 186,
        },
        {
          id: 'perforators',
          label: 'Perfor-\nators',
          name: 'Perforating veins, superficial to deep only',
          x: 50,
          y: 262,
        },
        {
          id: 'ankle-perforators',
          label: 'Medial\nankle',
          name: 'Three medial perforators above the ankle',
          x: 145,
          y: 262,
        },
        {
          id: 'knee-perforator',
          label: 'Below\nknee',
          name: 'One just below the knee',
          x: 225,
          y: 262,
        },
        {
          id: 'thigh-perforator',
          label: 'Adductor\ncanal',
          name: 'One in the adductor canal (in the thigh, outside this model)',
          x: 305,
          y: 262,
        },
        { id: 'varicose', label: 'Varicose', name: 'Varicose veins', x: 50, y: 340 },
        {
          id: 'incompetent-valves',
          label: 'Valves\nfail',
          name: 'Incompetent valves at the saphenofemoral junction or in the perforators',
          x: 145,
          y: 340,
        },
        {
          id: 'ulcer',
          label: 'Ulcer',
          name: 'Varicose ulcer, above the medial malleolus',
          x: 225,
          y: 340,
        },
        { id: 'tests', label: 'Tests', name: 'Clinical tests', x: 50, y: 416 },
        {
          id: 'trendelenburg',
          label: 'Trendel-\nenburg',
          name: 'Trendelenburg test: saphenofemoral and perforator valves',
          x: 145,
          y: 416,
        },
        {
          id: 'perthes',
          label: 'Perthes',
          name: 'Perthes test: are the deep veins open?',
          x: 225,
          y: 416,
        },
      ],
      edges: [
        { from: 'return', to: 'calf-pump' },
        { from: 'return', to: 'valves' },
        { from: 'return', to: 'chest-suction' },
        { from: 'superficial-veins', to: 'great-saphenous-vein' },
        { from: 'superficial-veins', to: 'small-saphenous-vein' },
        { from: 'superficial-veins', to: 'dorsal-venous-arch' },
        { from: 'deep-veins', to: 'posterior-tibial-vein' },
        { from: 'deep-veins', to: 'anterior-tibial-vein' },
        { from: 'deep-veins', to: 'popliteal-vein' },
        { from: 'perforators', to: 'ankle-perforators' },
        { from: 'perforators', to: 'knee-perforator' },
        { from: 'perforators', to: 'thigh-perforator' },
        { from: 'varicose', to: 'incompetent-valves' },
        { from: 'varicose', to: 'ulcer' },
        { from: 'tests', to: 'trendelenburg' },
        { from: 'tests', to: 'perthes' },
      ],
    },
    lesions: [
      {
        id: 'varicosity',
        label: 'Varicose veins',
        nodeIds: ['incompetent-valves', 'great-saphenous-vein', 'ankle-perforators'],
        explanation:
          'With failed valves, each contraction of the calf drives blood outwards into the superficial veins; they widen, twist and their walls degenerate, and the skin above the medial malleolus may ulcerate. Pregnancy, pressing on the iliac veins, can bring them on.',
      },
      {
        id: 'deep-vein-thrombosis',
        label: 'Deep vein thrombosis',
        nodeIds: ['posterior-tibial-vein', 'popliteal-vein', 'calf-pump'],
        explanation:
          'Lying or sitting still for long, after surgery or on a long flight, lets blood clot in the calf veins and soleal sinuses; the leg swells and aches, and a clot can break off to the lungs. Afterwards the damaged perforators may reopen without valves.',
      },
      {
        id: 'saphenous-graft',
        label: 'Saphenous vein graft',
        nodeIds: ['great-saphenous-vein'],
        explanation:
          'Lengths of the great saphenous vein are used to bypass blocked coronary arteries, turned end to end so that its valves do not stop the flow.',
      },
    ],
    drill: [
      {
        id: 'limb-veins',
        title: 'Superficial and deep veins',
        hint: 'Where the superficial veins start and end, and the deep veins with the arteries.',
        nodeIds: [
          'great-saphenous-vein',
          'small-saphenous-vein',
          'dorsal-venous-arch',
          'posterior-tibial-vein',
          'anterior-tibial-vein',
          'popliteal-vein',
        ],
      },
      {
        id: 'perforators-varicose',
        title: 'Perforators and varicose veins',
        hint: 'Where the perforators are, what fails in varicose veins, and the two tests.',
        nodeIds: [
          'ankle-perforators',
          'knee-perforator',
          'thigh-perforator',
          'incompetent-valves',
          'ulcer',
          'trendelenburg',
          'perthes',
        ],
      },
    ],
    model3d: {
      src: LEG_FOOT_MODEL_SRC,
      credit: `${LEG_FOOT_MODEL_CREDIT} Perforating veins: MedLearn schematic at the levels BD gives, not yet medically reviewed.`,
      parts: legFootParts([
        ...LEG_FOOT_BONES,
        'gastrocnemius',
        'soleus',
        'dorsal-venous-arch',
        'great-saphenous-vein',
        'small-saphenous-vein',
        'anterior-tibial-vein',
        'posterior-tibial-vein',
        'peroneal-vein',
        'popliteal-vein',
      ]),
      traces: [
        { id: 'ankle-perforators', kind: 'outline', paths: PERFORATORS.ankle },
        { id: 'knee-perforator', kind: 'outline', paths: PERFORATORS.knee },
      ],
      stops: [
        {
          id: 'medial',
          title: 'Medial side',
          description:
            'The great saphenous vein climbs the medial leg; the grey lines are the perforators to the posterior tibial veins, three above the ankle and one below the knee.',
          target: [-70, -80, 180],
          position: [944, -336, 273],
        },
        LEG_BACK,
        {
          id: 'ankle',
          title: 'Above the medial malleolus',
          description:
            'Where the ankle perforators join the deep veins, and where varicose ulcers form when their valves fail.',
          target: [-60, -70, 60],
          position: [600, 200, 140],
        },
        {
          id: 'deep-veins',
          title: 'Deep veins',
          description:
            'From behind and medially, with the calf muscles switched off: the posterior tibial and peroneal veins join the anterior tibial veins to form the popliteal vein.',
          target: [-75, -60, 220],
          position: [500, 760, 280],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'against-gravity',
      title: 'Against gravity',
      body: 'Blood from the foot must climb more than a metre to the heart. General help comes from the negative pressure in the chest, the push from the arteries, and valves that divide the column of blood into short lengths. The local help is the calf pump: contracting muscles squeeze the deep veins, and the tight sleeve of deep fascia stops them bulging outwards, so the blood can only go up. Soleus, with its venous sinuses, is the peripheral heart.',
      focus: ['return', 'calf-pump', 'valves', 'chest-suction'],
    },
    {
      id: 'superficial',
      title: 'Superficial veins',
      body: 'The great and small saphenous veins run in the superficial fascia from the dorsal venous arch. Their walls are thick with smooth muscle, their valves more numerous below. The great saphenous vein ends in the femoral vein at the saphenous opening, with a valve always at the junction; the small one ends in the popliteal vein. Much of their blood passes inwards through perforators.',
      focus: [
        'superficial-veins',
        'great-saphenous-vein',
        'small-saphenous-vein',
        'dorsal-venous-arch',
      ],
    },
    {
      id: 'deep',
      title: 'Deep veins',
      body: 'Paired veins run with each artery: plantar, anterior and posterior tibial and peroneal, joining as the popliteal and then the femoral vein. Supported by the muscles round them and with more valves than the superficial veins, they carry most of the blood.',
      focus: ['deep-veins', 'posterior-tibial-vein', 'anterior-tibial-vein', 'popliteal-vein'],
    },
    {
      id: 'perforators',
      title: 'Perforating veins',
      body: 'Perforators pierce the deep fascia to join the superficial and deep veins, with valves that let blood go only inwards. On the great saphenous side there are three medial perforators above the ankle (from the posterior arch vein), one below the knee and one in the adductor canal; on the small saphenous side, one lateral perforator in the lower leg. Some join the deep veins directly, others through muscle veins.',
      focus: ['perforators', 'ankle-perforators', 'knee-perforator', 'thigh-perforator'],
    },
    {
      id: 'varicose',
      title: 'Varicose veins',
      body: 'If the valve at the saphenofemoral junction or in a perforator fails, it becomes a high-pressure leak: each calf contraction drives deep-vein pressure into the superficial veins, which stretch, twist and degenerate, and the skin above the medial malleolus may break down into an ulcer.',
      focus: ['varicose', 'incompetent-valves', 'ulcer'],
    },
    {
      id: 'tests',
      title: 'Testing the valves',
      body: 'Trendelenburg’s test: with the leg raised and the veins emptied, the saphenofemoral junction is pressed and the patient stands. Quick filling from above on release means the junction valve leaks; slow filling while still pressed means the perforators leak. Perthes’ test: with a tourniquet round the thigh the patient walks; the varicosities shrink if the deep veins and perforators are working, and swell if the deep veins are blocked.',
      focus: ['tests', 'trendelenburg', 'perthes'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select the great saphenous vein and follow it up the medial side, then find where the grey perforators join it to the posterior tibial veins.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'perforator-valves',
      prompt: 'Valves in the perforating veins of the leg allow blood to flow:',
      options: [
        { id: 'superficial-deep', text: 'From superficial to deep veins only' },
        { id: 'deep-superficial', text: 'From deep to superficial veins only' },
        { id: 'both', text: 'Both ways' },
        { id: 'down', text: 'Downwards towards the foot' },
      ],
      answerId: 'superficial-deep',
      explanation: 'When they fail, the calf pump drives blood outwards and varicose veins follow.',
    },
    {
      id: 'calf-pump-main',
      prompt: 'The most important local factor in venous return from the leg is:',
      options: [
        { id: 'calf-pump', text: 'Contraction of the calf muscles inside the deep fascia' },
        { id: 'gravity', text: 'Gravity' },
        { id: 'skin', text: 'Elastic recoil of the skin' },
        { id: 'arteries', text: 'Arterial pulsation alone' },
      ],
      answerId: 'calf-pump',
      explanation: 'Soleus especially: the peripheral heart.',
    },
    {
      id: 'perthes-checks',
      prompt: 'Perthes’ test checks:',
      options: [
        { id: 'deep', text: 'Whether the deep veins are open' },
        { id: 'sf-valve', text: 'The saphenofemoral valve alone' },
        { id: 'arteries', text: 'The leg arteries' },
        { id: 'lymph', text: 'The inguinal lymph nodes' },
      ],
      answerId: 'deep',
      explanation: 'Trendelenburg’s test looks at the superficial and perforator valves.',
    },
    {
      id: 'gsv-termination',
      prompt: 'The great saphenous vein ends in the:',
      options: [
        { id: 'femoral', text: 'Femoral vein' },
        { id: 'popliteal', text: 'Popliteal vein' },
        { id: 'external-iliac', text: 'External iliac vein' },
        { id: 'deep-femoral', text: 'Deep femoral vein' },
      ],
      answerId: 'femoral',
      explanation: 'Through the saphenous opening, with a valve at the junction.',
    },
  ],
  cards: [
    {
      id: 'venous-return-factors-card',
      front: 'Factors helping venous return from the lower limb?',
      back: 'General: negative chest pressure, arterial push, valves. Local: muscular veins with many valves, the calf muscle pump, the tight deep fascia.',
    },
    {
      id: 'gsv-perforators-card',
      front: 'Perforators of the great saphenous system?',
      back: 'Three medial ones above the ankle, one below the knee, one in the adductor canal; one lateral perforator on the small saphenous side.',
    },
    {
      id: 'varicose-mechanism-card',
      front: 'Why do varicose veins form?',
      back: 'Failed valves at the saphenofemoral junction or in perforators let the calf pump drive deep-vein pressure into the superficial veins, which dilate and twist.',
    },
    {
      id: 'saphenous-comparison-card',
      front: 'Great vs small saphenous vein?',
      back: 'Great: medial end of the arch, in front of the medial malleolus, saphenous nerve, ends in the femoral vein. Small: lateral end, behind the lateral malleolus, sural nerve, ends in the popliteal vein.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 11 Venous and Lymphatic Drainage',
      pages: '148–152, 154',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '560–561' },
  ],
};
