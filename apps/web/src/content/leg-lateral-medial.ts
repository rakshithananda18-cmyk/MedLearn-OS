import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  LEG_FOOT_BONES,
  LEG_FOOT_MODEL_CREDIT,
  LEG_FOOT_MODEL_SRC,
  legFootParts,
  PERONEI,
} from './leg-foot-3d';

// Lower limb batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const legLateralMedial: Topic = {
  slug: 'leg-lateral-medial',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Lateral and medial sides of the leg',
  summary:
    'The peroneal compartment with its two muscles, retinacula and nerve, and the bare medial surface of the tibia with the three guy ropes and the anserine bursa.',
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
      'Volume 2, Chapter 8 Lateral and Medial Sides of Leg, pages 116 to 120',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: lateral compartment of leg and fibular retinacula, pages 622, 623 and 643',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bones, muscles and veins (BodyParts3D, CC BY 4.0); nerves (Z-Anatomy, CC BY-SA 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 and CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Lateral compartment: between the anterior and posterior intermuscular septa on the lateral surface of the fibula; peroneus longus and brevis and the superficial peroneal nerve; blood from branches of the peroneal artery.',
    'Peroneus longus: head and upper fibula; tendon behind the lateral malleolus, under the cuboid and across the sole to the medial cuneiform and first metatarsal, where with tibialis anterior it forms a stirrup.',
    'Peroneus brevis: lower fibula to the tuberosity of the fifth metatarsal. Both peronei evert the foot and are supplied by the superficial peroneal nerve.',
    'Superior peroneal retinaculum, behind the lateral malleolus, holds both tendons in one sheath; under the inferior one a septum to the peroneal trochlea separates them, brevis above, longus below.',
    'Medial side: the medial surface of the tibia is bare; sartorius, gracilis and semitendinosus insert on its upper part over the tibial collateral ligament, with the anserine bursa between them.',
  ],
  visual: {
    kind: 'path',
    // The lateral compartment, the longus tendon, the retinacula, then the medial side.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'lateral-compartment',
          label: 'Lateral\ncompartment',
          name: 'Lateral compartment of the leg',
          x: 50,
          y: 30,
        },
        {
          id: 'peroneus-longus',
          label: 'Peroneus\nlongus',
          name: 'Peroneus longus',
          x: 145,
          y: 30,
        },
        {
          id: 'peroneus-brevis',
          label: 'Peroneus\nbrevis',
          name: 'Peroneus brevis',
          x: 225,
          y: 30,
        },
        {
          id: 'superficial-peroneal-nerve',
          label: 'Superficial\nperoneal',
          name: 'Superficial peroneal nerve',
          x: 308,
          y: 30,
        },
        {
          id: 'longus-tendon',
          label: 'Longus\ntendon',
          name: 'Path of the peroneus longus tendon',
          x: 50,
          y: 110,
        },
        {
          id: 'behind-malleolus',
          label: 'Behind\nmalleolus',
          name: 'Behind the lateral malleolus',
          x: 145,
          y: 110,
        },
        {
          id: 'cuboid',
          label: 'Cuboid\ngroove',
          name: 'Through the groove under the cuboid',
          x: 225,
          y: 110,
        },
        {
          id: 'first-metatarsal',
          label: 'First\nmetatarsal',
          name: 'To the medial cuneiform and first metatarsal: the stirrup with tibialis anterior',
          x: 305,
          y: 110,
        },
        {
          id: 'peroneal-retinacula',
          label: 'Peroneal\nretinacula',
          name: 'Peroneal retinacula',
          x: 50,
          y: 186,
        },
        {
          id: 'superior-peroneal',
          label: 'Superior',
          name: 'Superior: behind the malleolus, one sheath for both tendons',
          x: 145,
          y: 186,
        },
        {
          id: 'inferior-peroneal',
          label: 'Inferior',
          name: 'Inferior: below the malleolus, a septum to the peroneal trochlea parts the tendons',
          x: 225,
          y: 186,
        },
        {
          id: 'medial-surface',
          label: 'Medial\nsurface',
          name: 'Upper medial surface of the tibia',
          x: 50,
          y: 262,
        },
        { id: 'sartorius', label: 'Sartorius', name: 'Sartorius: femoral nerve', x: 145, y: 262 },
        { id: 'gracilis', label: 'Gracilis', name: 'Gracilis: obturator nerve', x: 225, y: 262 },
        {
          id: 'semitendinosus',
          label: 'Semiten-\ndinosus',
          name: 'Semitendinosus: sciatic nerve',
          x: 305,
          y: 262,
        },
        {
          id: 'beneath',
          label: 'Beneath',
          name: 'Beneath the three tendons',
          x: 50,
          y: 340,
        },
        {
          id: 'anserine-bursa',
          label: 'Anserine\nbursa',
          name: 'Anserine bursa',
          x: 145,
          y: 340,
        },
        {
          id: 'tibial-collateral',
          label: 'Collateral\nligament',
          name: 'Tibial collateral ligament',
          x: 225,
          y: 340,
        },
        {
          id: 'lower-third',
          label: 'Lower\nthird',
          name: 'Lower third of the medial surface',
          x: 50,
          y: 416,
        },
        {
          id: 'great-saphenous-vein',
          label: 'Great\nsaphenous',
          name: 'Great saphenous vein, crossing it obliquely',
          x: 145,
          y: 416,
        },
        {
          id: 'saphenous-nerve',
          label: 'Saphenous\nnerve',
          name: 'Saphenous nerve, in front of the vein',
          x: 225,
          y: 416,
        },
      ],
      edges: [
        { from: 'lateral-compartment', to: 'peroneus-longus' },
        { from: 'lateral-compartment', to: 'peroneus-brevis' },
        { from: 'lateral-compartment', to: 'superficial-peroneal-nerve' },
        { from: 'longus-tendon', to: 'behind-malleolus' },
        { from: 'longus-tendon', to: 'cuboid' },
        { from: 'longus-tendon', to: 'first-metatarsal' },
        { from: 'peroneal-retinacula', to: 'superior-peroneal' },
        { from: 'peroneal-retinacula', to: 'inferior-peroneal' },
        { from: 'medial-surface', to: 'sartorius' },
        { from: 'medial-surface', to: 'gracilis' },
        { from: 'medial-surface', to: 'semitendinosus' },
        { from: 'beneath', to: 'anserine-bursa' },
        { from: 'beneath', to: 'tibial-collateral' },
        { from: 'lower-third', to: 'great-saphenous-vein' },
        { from: 'lower-third', to: 'saphenous-nerve' },
      ],
    },
    lesions: [
      {
        id: 'superficial-peroneal-injury',
        label: 'Superficial peroneal injury',
        nodeIds: ['superficial-peroneal-nerve', 'peroneus-longus', 'peroneus-brevis'],
        explanation:
          'The peronei are paralysed and the foot cannot be turned out; the skin of the lower lateral leg and most of the dorsum goes numb. The nerve can be trapped where it pierces the deep fascia.',
      },
      {
        id: 'peroneal-tendon-slip',
        label: 'Slipping tendons',
        nodeIds: ['superior-peroneal', 'behind-malleolus'],
        explanation:
          'If the superior peroneal retinaculum tears, the two tendons can slip forwards over the lateral malleolus; their shared sheath can also become inflamed.',
      },
      {
        id: 'anserine-bursitis',
        label: 'Anserine bursitis',
        nodeIds: ['anserine-bursa'],
        explanation:
          'The bursa under the three tendons becomes inflamed and the upper medial tibia, just below the knee, is painful and tender.',
      },
    ],
    drill: [
      {
        id: 'peroneal-side',
        title: 'Lateral side',
        hint: 'Two muscles and a nerve; the long tendon’s path; the two retinacula.',
        nodeIds: [
          'peroneus-longus',
          'peroneus-brevis',
          'superficial-peroneal-nerve',
          'behind-malleolus',
          'cuboid',
          'first-metatarsal',
          'superior-peroneal',
          'inferior-peroneal',
        ],
      },
      {
        id: 'medial-side',
        title: 'Medial side',
        hint: 'One tendon from each compartment of the thigh, what lies under them, and what crosses the lower third.',
        nodeIds: [
          'sartorius',
          'gracilis',
          'semitendinosus',
          'anserine-bursa',
          'tibial-collateral',
          'great-saphenous-vein',
          'saphenous-nerve',
        ],
      },
    ],
    model3d: {
      src: LEG_FOOT_MODEL_SRC,
      credit: LEG_FOOT_MODEL_CREDIT,
      parts: legFootParts([
        ...LEG_FOOT_BONES,
        ...PERONEI,
        'extensor-digitorum-longus',
        'peroneus-tertius',
        'soleus',
        'sartorius',
        'gracilis',
        'semitendinosus',
        'common-peroneal-nerve',
        'superficial-peroneal-nerve',
        'deep-peroneal-nerve',
        'great-saphenous-vein',
        'saphenous-nerve',
      ]),
      traces: [],
      stops: [
        {
          id: 'lateral',
          title: 'The leg from the side',
          description:
            'Peroneus longus covers the upper fibula, peroneus brevis lies under it lower down; both tendons go behind the lateral malleolus.',
          target: [-95, -80, 180],
          position: [-1138, -171, 248],
        },
        {
          id: 'malleolus',
          title: 'Behind the lateral malleolus',
          description:
            'The two tendons turn forwards round the malleolus, brevis to the fifth metatarsal, longus under the cuboid into the sole; the retinacula over them are not in the model.',
          target: [-105, -60, 10],
          position: [-640, -60, 170],
        },
        {
          id: 'sole',
          title: 'Under the foot',
          description:
            'From below: the tendon of peroneus longus crosses the sole obliquely from the cuboid to the first metatarsal and medial cuneiform.',
          target: [-90, -110, -50],
          position: [-300, -260, -560],
        },
        {
          id: 'medial',
          title: 'Medial side',
          description:
            'The bare medial surface of the tibia: the three guy ropes insert on its upper part, the great saphenous vein and saphenous nerve cross its lower third.',
          target: [-60, -90, 250],
          position: [820, -260, 300],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'compartment',
      title: 'The lateral compartment',
      body: 'Bounded by the anterior and posterior intermuscular septa, the lateral surface of the fibula and the deep fascia, it holds peroneus longus and brevis and the superficial peroneal nerve. It has no artery of its own: branches of the peroneal artery reach it through the posterior septum, and its veins drain to the small saphenous vein.',
      focus: [
        'lateral-compartment',
        'peroneus-longus',
        'peroneus-brevis',
        'superficial-peroneal-nerve',
      ],
    },
    {
      id: 'peronei',
      title: 'The two peronei',
      body: 'Peroneus longus arises from the head and upper fibula and lies superficial; peroneus brevis arises lower down and lies under it. Brevis inserts on the tuberosity of the fifth metatarsal. The longus tendon turns twice, below the lateral malleolus and again at the cuboid, where it carries a sesamoid, then crosses the sole to the first metatarsal and medial cuneiform. Both evert the foot; longus with tibialis anterior forms a stirrup that holds up the middle of the foot.',
      focus: ['longus-tendon', 'behind-malleolus', 'cuboid', 'first-metatarsal'],
    },
    {
      id: 'retinacula',
      title: 'Peroneal retinacula',
      body: 'The superior retinaculum runs from the back of the lateral malleolus to the calcaneus and holds both tendons in one compartment with a common sheath. The inferior one, below and in front of the malleolus, joins the stem of the inferior extensor retinaculum; a septum to the peroneal trochlea splits the space beneath it, brevis above and longus below, each in its own sheath.',
      focus: ['peroneal-retinacula', 'superior-peroneal', 'inferior-peroneal'],
    },
    {
      id: 'nerve',
      title: 'Superficial peroneal nerve',
      body: 'It begins at the neck of the fibula under peroneus longus, runs down through the muscle and then between the peronei and extensor digitorum longus, supplying both peronei. At the junction of the upper two-thirds and lower third it pierces the deep fascia and divides into medial and lateral branches for the lower lateral leg and most of the dorsum of the foot.',
      focus: ['superficial-peroneal-nerve'],
    },
    {
      id: 'medial',
      title: 'The medial side',
      body: 'Most of the medial surface of the tibia lies under the skin. On its upper part sartorius, gracilis and semitendinosus insert one behind the other in front of the tibial collateral ligament, the anserine bursa separating them. They come from the three compartments of the thigh and the three parts of the hip bone (femoral, obturator and sciatic nerves) and steady the pelvis like guy ropes. The great saphenous vein and saphenous nerve cross the lower third.',
      focus: [
        'medial-surface',
        'sartorius',
        'gracilis',
        'semitendinosus',
        'beneath',
        'anserine-bursa',
        'tibial-collateral',
        'lower-third',
        'great-saphenous-vein',
        'saphenous-nerve',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select peroneus longus and follow its tendon round the malleolus and under the foot; then turn to the medial side and select the three guy ropes.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'peroneus-brevis-insertion',
      prompt: 'Peroneus brevis is inserted into the:',
      options: [
        { id: 'fifth-tuberosity', text: 'Tuberosity of the base of the fifth metatarsal' },
        { id: 'first-metatarsal', text: 'Base of the first metatarsal' },
        { id: 'cuboid', text: 'Cuboid' },
        { id: 'fifth-dorsal', text: 'Dorsal surface of the fifth metatarsal shaft' },
      ],
      answerId: 'fifth-tuberosity',
      explanation:
        'Peroneus longus goes on across the sole to the first metatarsal and medial cuneiform.',
    },
    {
      id: 'peronei-nerve',
      prompt: 'Injury to which nerve abolishes eversion of the foot?',
      options: [
        { id: 'superficial-peroneal', text: 'Superficial peroneal' },
        { id: 'deep-peroneal', text: 'Deep peroneal' },
        { id: 'tibial', text: 'Tibial' },
        { id: 'sural', text: 'Sural' },
      ],
      answerId: 'superficial-peroneal',
      explanation: 'It supplies both peronei, the main evertors.',
    },
    {
      id: 'guy-ropes',
      prompt: 'Which group inserts on the upper medial surface of the tibia?',
      options: [
        { id: 'guy', text: 'Sartorius, gracilis and semitendinosus' },
        { id: 'semis', text: 'Semimembranosus, semitendinosus and gracilis' },
        { id: 'adductors', text: 'Adductor magnus, gracilis and sartorius' },
        { id: 'quads', text: 'Vastus medialis, sartorius and gracilis' },
      ],
      answerId: 'guy',
      explanation: 'One from each compartment of the thigh: femoral, obturator and sciatic nerves.',
    },
    {
      id: 'stirrup',
      prompt: 'The stirrup under the foot is formed by peroneus longus and:',
      options: [
        { id: 'tibialis-anterior', text: 'Tibialis anterior' },
        { id: 'tibialis-posterior', text: 'Tibialis posterior' },
        { id: 'peroneus-brevis', text: 'Peroneus brevis' },
        { id: 'fhl', text: 'Flexor hallucis longus' },
      ],
      answerId: 'tibialis-anterior',
      explanation:
        'Both insert on the medial cuneiform and first metatarsal, from opposite sides, and hold up the middle of the foot.',
    },
  ],
  cards: [
    {
      id: 'peroneus-longus-course-card',
      front: 'Course of the peroneus longus tendon?',
      back: 'Behind the lateral malleolus under the peroneal retinacula, under the inferior compartment by the peroneal trochlea, through the groove of the cuboid, across the sole to the first metatarsal and medial cuneiform.',
    },
    {
      id: 'peroneal-retinacula-card',
      front: 'Peroneal retinacula and the tendons under them?',
      back: 'Superior: behind the lateral malleolus, both tendons in one sheath. Inferior: below it, a septum to the peroneal trochlea; brevis above, longus below.',
    },
    {
      id: 'superficial-peroneal-card',
      front: 'Supply of the superficial peroneal nerve?',
      back: 'Muscles: peroneus longus and brevis. Skin: lower third of the lateral leg and most of the dorsum of the foot.',
    },
    {
      id: 'guy-ropes-card',
      front: 'The guy ropes of the pelvis and their nerves?',
      back: 'Sartorius (femoral), gracilis (obturator), semitendinosus (sciatic), inserting on the upper medial tibia over the tibial collateral ligament with the anserine bursa.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 8 Lateral and Medial Sides of Leg',
      pages: '116–120',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '622–623, 643' },
  ],
};
