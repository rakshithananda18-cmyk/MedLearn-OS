import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  CALF_MUSCLES,
  GENICULAR_ARTERIES,
  HAMSTRINGS,
  HIP_THIGH_BONES,
  HIP_THIGH_MODEL_CREDIT,
  HIP_THIGH_MODEL_SRC,
  hipThighParts,
  POPLITEAL_BACK,
} from './hip-thigh-3d';

// Lower limb batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const poplitealVesselsNerves: Topic = {
  slug: 'popliteal-vessels-nerves',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Popliteal artery and vein, tibial and common peroneal nerves',
  summary:
    'The popliteal artery from the adductor opening to the lower border of popliteus, its branches, the popliteal vein, and the two terminal branches of the sciatic nerve behind the knee.',
  estimatedMinutes: 13,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 6 Popliteal Fossa, pages 89 to 93'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: tibial and common fibular nerves, popliteal vessels, pages 597, 598 and 611',
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
    'Popliteal artery: from the opening in adductor magnus to the lower border of popliteus, where it divides into the anterior and posterior tibial arteries; the deepest structure in the fossa.',
    'From behind forwards in the middle of the fossa: tibial nerve, popliteal vein, popliteal artery. Above, medial to lateral: artery, vein, nerve; below: nerve, vein, artery.',
    'Branches: muscular (upper ones to the hamstrings, sural ones to the calf), cutaneous, and five genicular (two superior, two inferior, one middle).',
    'Tibial nerve: genicular branches in the upper part, the sural nerve in the middle, muscular branches in the lower part; all but the one to the medial head of gastrocnemius leave its lateral side.',
    'Common peroneal nerve: along the medial border of biceps femoris to the neck of the fibula; cutaneous and genicular branches only. Injured there it gives foot drop.',
  ],
  visual: {
    kind: 'path',
    // The artery, its end, the vein, both nerves, and their order in the fossa.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'popliteal-artery',
          label: 'Popliteal\nartery',
          name: 'Popliteal artery',
          x: 50,
          y: 30,
        },
        {
          id: 'adductor-opening',
          label: 'Adductor\nopening',
          name: 'Begins at the opening in adductor magnus',
          x: 145,
          y: 30,
        },
        {
          id: 'muscular-arteries',
          label: 'Muscular\nbranches',
          name: 'Muscular branches: upper to the hamstrings, sural to the calf',
          x: 225,
          y: 30,
        },
        {
          id: 'genicular-arteries',
          label: 'Genicular\nbranches',
          name: 'Five genicular branches to the knee',
          x: 305,
          y: 30,
        },
        { id: 'ends', label: 'Ends', name: 'Ends at the lower border of popliteus', x: 50, y: 110 },
        {
          id: 'anterior-tibial-artery',
          label: 'Anterior\ntibial',
          name: 'Anterior tibial artery',
          x: 145,
          y: 110,
        },
        {
          id: 'posterior-tibial-artery',
          label: 'Posterior\ntibial',
          name: 'Posterior tibial artery',
          x: 225,
          y: 110,
        },
        {
          id: 'popliteal-vein',
          label: 'Popliteal\nvein',
          name: 'Popliteal vein',
          x: 50,
          y: 186,
        },
        {
          id: 'small-saphenous-vein',
          label: 'Small\nsaphenous',
          name: 'Receives the small saphenous vein',
          x: 145,
          y: 186,
        },
        {
          id: 'femoral-vein',
          label: 'Femoral\nvein',
          name: 'Continues as the femoral vein at the adductor opening',
          x: 225,
          y: 186,
        },
        { id: 'tibial-nerve', label: 'Tibial\nnerve', name: 'Tibial nerve', x: 50, y: 262 },
        {
          id: 'genicular-nerves',
          label: 'Genicular\n(upper)',
          name: 'Three genicular branches, in the upper part',
          x: 145,
          y: 262,
        },
        {
          id: 'medial-sural-cutaneous-nerve',
          label: 'Sural\n(middle)',
          name: 'Sural nerve, in the middle',
          x: 225,
          y: 262,
        },
        {
          id: 'muscular-nerves',
          label: 'Muscular\n(lower)',
          name: 'Muscular branches, in the lower part',
          x: 305,
          y: 262,
        },
        {
          id: 'common-peroneal-nerve',
          label: 'Common\nperoneal',
          name: 'Common peroneal nerve',
          x: 50,
          y: 340,
        },
        {
          id: 'sural-communicating-nerve',
          label: 'Sural com-\nmunicating',
          name: 'Sural communicating nerve',
          x: 145,
          y: 340,
        },
        {
          id: 'lateral-cutaneous-calf',
          label: 'Lateral\ncutaneous',
          name: 'Lateral cutaneous nerve of the calf',
          x: 225,
          y: 340,
        },
        {
          id: 'fibular-neck',
          label: 'Neck of\nfibula',
          name: 'Winds round the neck of the fibula and divides',
          x: 305,
          y: 340,
        },
        { id: 'order', label: 'Order', name: 'Order of the nerve and vessels', x: 50, y: 416 },
        {
          id: 'upper-part',
          label: 'Upper:\nA V N',
          name: 'Upper part, medial to lateral: artery, vein, nerve',
          x: 145,
          y: 416,
        },
        {
          id: 'middle-part',
          label: 'Middle:\nN V A',
          name: 'Middle, from behind forwards: nerve, vein, artery',
          x: 225,
          y: 416,
        },
        {
          id: 'lower-part',
          label: 'Lower:\nN V A',
          name: 'Lower part, medial to lateral: nerve, vein, artery',
          x: 305,
          y: 416,
        },
      ],
      edges: [
        { from: 'popliteal-artery', to: 'adductor-opening' },
        { from: 'popliteal-artery', to: 'muscular-arteries' },
        { from: 'popliteal-artery', to: 'genicular-arteries' },
        { from: 'ends', to: 'anterior-tibial-artery' },
        { from: 'ends', to: 'posterior-tibial-artery' },
        { from: 'popliteal-vein', to: 'small-saphenous-vein' },
        { from: 'popliteal-vein', to: 'femoral-vein' },
        { from: 'tibial-nerve', to: 'genicular-nerves' },
        { from: 'tibial-nerve', to: 'medial-sural-cutaneous-nerve' },
        { from: 'tibial-nerve', to: 'muscular-nerves' },
        { from: 'common-peroneal-nerve', to: 'sural-communicating-nerve' },
        { from: 'common-peroneal-nerve', to: 'lateral-cutaneous-calf' },
        { from: 'common-peroneal-nerve', to: 'fibular-neck' },
        { from: 'order', to: 'upper-part' },
        { from: 'order', to: 'middle-part' },
        { from: 'order', to: 'lower-part' },
      ],
    },
    lesions: [
      {
        id: 'foot-drop',
        label: 'Foot drop',
        nodeIds: ['common-peroneal-nerve', 'fibular-neck'],
        explanation:
          'Round the neck of the fibula the common peroneal nerve lies on bone under skin, so a fracture, a tight plaster or crossed legs can injure it: the foot cannot be raised or turned out and drags, and the skin of the outer leg and top of the foot goes numb. Inversion, plantar flexion and the ankle jerk are kept.',
      },
      {
        id: 'popliteal-block',
        label: 'Popliteal block',
        nodeIds: ['popliteal-artery', 'adductor-opening', 'genicular-arteries'],
        explanation:
          'Constant beating against the tendon of adductor magnus can narrow the artery and block it. A sudden block threatens the leg below the knee; a slow one is bridged by the anastomoses round the knee.',
      },
      {
        id: 'tibial-injury',
        label: 'Tibial nerve injury',
        nodeIds: ['tibial-nerve', 'muscular-nerves'],
        explanation:
          'The calf muscles and the small muscles of the sole are paralysed, so the foot cannot be pointed or the toes curled, and the sole loses its feeling.',
      },
    ],
    drill: [
      {
        id: 'popliteal-artery',
        title: 'Popliteal artery',
        hint: 'Where it begins and ends, and its branches.',
        nodeIds: [
          'adductor-opening',
          'muscular-arteries',
          'genicular-arteries',
          'anterior-tibial-artery',
          'posterior-tibial-artery',
        ],
      },
      {
        id: 'nerves',
        title: 'Tibial and common peroneal',
        hint: 'The tibial nerve’s branches by level; the common peroneal’s branches and where it leaves.',
        nodeIds: [
          'genicular-nerves',
          'medial-sural-cutaneous-nerve',
          'muscular-nerves',
          'sural-communicating-nerve',
          'lateral-cutaneous-calf',
          'fibular-neck',
        ],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: HIP_THIGH_MODEL_CREDIT,
      parts: hipThighParts([
        ...HIP_THIGH_BONES,
        ...HAMSTRINGS,
        'adductor-magnus',
        ...CALF_MUSCLES,
        'femoral-artery',
        'popliteal-artery',
        ...GENICULAR_ARTERIES,
        'anterior-tibial-artery',
        'posterior-tibial-artery',
        'femoral-vein',
        'popliteal-vein',
        'small-saphenous-vein',
        'sciatic-nerve',
        'tibial-nerve',
        'common-peroneal-nerve',
        'medial-sural-cutaneous-nerve',
        'sural-communicating-nerve',
      ]),
      traces: [],
      stops: [
        POPLITEAL_BACK,
        {
          id: 'artery',
          title: 'Popliteal artery',
          description:
            'From behind and medially: the artery comes through the opening in adductor magnus, lies on the femur and the back of the knee, and divides at the lower border of popliteus.',
          target: [-75, -60, 400],
          position: [360, 460, 480],
        },
        {
          id: 'nerves',
          title: 'Tibial and common peroneal',
          description:
            'The sciatic nerve divides above the fossa: the tibial nerve runs straight down the middle, the common peroneal follows biceps femoris out to the neck of the fibula.',
          target: [-85, -40, 420],
          position: [-300, 640, 470],
        },
        {
          id: 'layers',
          title: 'Superficial to deep',
          description:
            'From behind the nerve is nearest, the vein next and the artery deepest: switch the nerves off in Layers, then the veins, to reach the artery.',
          target: [-80, -50, 400],
          position: [-90, 640, 380],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'artery',
      title: 'Popliteal artery',
      body: 'The femoral artery becomes the popliteal as it passes through the opening in adductor magnus, at the junction of the middle and lower thirds of the thigh. It runs down and slightly laterally on the popliteal surface of the femur, the back of the knee joint and the fascia over popliteus, and at the lower border of popliteus divides into the anterior and posterior tibial arteries. It is the deepest structure in the fossa, so its pulse needs firm pressure with the knee bent; the blood pressure of the leg is taken over it.',
      focus: ['popliteal-artery', 'adductor-opening', 'ends'],
    },
    {
      id: 'branches',
      title: 'Its branches',
      body: 'Upper muscular branches supply adductor magnus and the hamstrings and join the fourth perforating artery; the lower, sural branches supply gastrocnemius, soleus and plantaris. Cutaneous branches go to the skin, one with the small saphenous vein. Five genicular branches, two superior, two inferior and a middle one, supply the knee and its anastomoses.',
      focus: [
        'muscular-arteries',
        'genicular-arteries',
        'anterior-tibial-artery',
        'posterior-tibial-artery',
      ],
    },
    {
      id: 'vein',
      title: 'Popliteal vein',
      body: 'Formed at the lower border of popliteus by the veins of the anterior and posterior tibial arteries. It is medial to the artery low in the fossa, behind it in the middle and posterolateral to it above, and becomes the femoral vein at the adductor opening. It receives the small saphenous vein and veins matching the arterial branches.',
      focus: ['popliteal-vein', 'small-saphenous-vein', 'femoral-vein'],
    },
    {
      id: 'order',
      title: 'Superficial to deep',
      body: 'The nerve and vessels run down one over the other, the tibial nerve nearest the skin and the artery on the floor. The nerve and vein cross the artery from lateral to medial, so the order changes: above, from medial to lateral, artery, vein, nerve (A V N); in the middle, from behind forwards, nerve, vein, artery; below, from medial to lateral, nerve, vein, artery (N V A).',
      focus: ['order', 'upper-part', 'middle-part', 'lower-part'],
    },
    {
      id: 'tibial',
      title: 'Tibial nerve',
      body: 'The larger terminal branch of the sciatic nerve, from the ventral divisions of L4 to S3. It runs straight down the fossa from the upper to the lower angle. It gives three genicular branches high up, the sural nerve in the middle to the back of the leg and the lateral border of the foot, and muscular branches low down to both heads of gastrocnemius, soleus, plantaris and popliteus. Only the branch to the medial head leaves from its medial side, which makes that the safe side.',
      focus: [
        'tibial-nerve',
        'genicular-nerves',
        'medial-sural-cutaneous-nerve',
        'muscular-nerves',
      ],
    },
    {
      id: 'peroneal',
      title: 'Common peroneal nerve',
      body: 'The smaller terminal branch, from the dorsal divisions of L4 to S2. It follows the medial border of biceps femoris from the upper to the lateral angle, winds round the neck of the fibula, pierces peroneus longus and divides into the superficial and deep peroneal nerves. In the fossa it gives the lateral cutaneous nerve of the calf, the sural communicating nerve and genicular branches, but no muscular branches.',
      focus: [
        'common-peroneal-nerve',
        'sural-communicating-nerve',
        'lateral-cutaneous-calf',
        'fibular-neck',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Switch the hamstrings and gastrocnemius off, then select the tibial and common peroneal nerves and follow each out of the fossa.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'popliteal-artery-end',
      prompt: 'The popliteal artery divides into its terminal branches at the:',
      options: [
        { id: 'popliteus', text: 'Lower border of popliteus' },
        { id: 'hiatus', text: 'Opening in adductor magnus' },
        { id: 'joint', text: 'Level of the knee joint line' },
        { id: 'soleus', text: 'Lower border of soleus' },
      ],
      answerId: 'popliteus',
      explanation: 'It begins at the adductor opening and ends at the lower border of popliteus.',
    },
    {
      id: 'popliteal-deepest',
      prompt: 'The deepest of the main structures in the popliteal fossa is the:',
      options: [
        { id: 'artery', text: 'Popliteal artery' },
        { id: 'vein', text: 'Popliteal vein' },
        { id: 'tibial', text: 'Tibial nerve' },
        { id: 'peroneal', text: 'Common peroneal nerve' },
      ],
      answerId: 'artery',
      explanation:
        'It lies on the floor of the fossa; the vein and then the tibial nerve are behind it.',
    },
    {
      id: 'foot-drop-nerve',
      prompt: 'A fracture of the neck of the fibula followed by foot drop points to injury of the:',
      options: [
        { id: 'common-peroneal', text: 'Common peroneal nerve' },
        { id: 'tibial', text: 'Tibial nerve' },
        { id: 'femoral', text: 'Femoral nerve' },
        { id: 'saphenous', text: 'Saphenous nerve' },
      ],
      answerId: 'common-peroneal',
      explanation:
        'It winds round the neck of the fibula, the most often injured nerve of the lower limb.',
    },
    {
      id: 'leg-blood-pressure',
      prompt: 'Blood pressure in the lower limb is taken over the:',
      options: [
        { id: 'popliteal', text: 'Popliteal artery' },
        { id: 'femoral', text: 'Femoral artery' },
        { id: 'dorsalis', text: 'Dorsalis pedis artery' },
        { id: 'posterior-tibial', text: 'Posterior tibial artery' },
      ],
      answerId: 'popliteal',
      explanation:
        'With the patient prone and a wide cuff on the thigh; in coarctation of the aorta it is lower than in the arm.',
    },
  ],
  cards: [
    {
      id: 'popliteal-artery-course-card',
      front: 'Beginning and end of the popliteal artery?',
      back: 'Begins at the opening in adductor magnus; ends at the lower border of popliteus as the anterior and posterior tibial arteries.',
    },
    {
      id: 'popliteal-order-card',
      front: 'Order of the tibial nerve and popliteal vessels in the fossa?',
      back: 'Above, medial to lateral: artery, vein, nerve. Middle, behind forwards: nerve, vein, artery. Below, medial to lateral: nerve, vein, artery.',
    },
    {
      id: 'genicular-count-card',
      front: 'Genicular branches of the popliteal artery?',
      back: 'Five: superior medial and lateral, inferior medial and lateral, middle.',
    },
    {
      id: 'tibial-branches-card',
      front: 'Branches of the tibial nerve in the popliteal fossa, by level?',
      back: 'Upper: three genicular. Middle: sural (cutaneous). Lower: muscular, to both heads of gastrocnemius, soleus, plantaris and popliteus.',
    },
    {
      id: 'common-peroneal-branches-card',
      front: 'Branches of the common peroneal nerve in the popliteal fossa?',
      back: 'Lateral cutaneous nerve of the calf, sural communicating nerve, superior and inferior lateral genicular, recurrent genicular; no muscular branches.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 6 Popliteal Fossa', pages: '89–93' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '597–598, 611' },
  ],
};
