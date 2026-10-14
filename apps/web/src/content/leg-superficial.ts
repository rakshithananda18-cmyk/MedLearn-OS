import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  LEG_FOOT_BONES,
  LEG_FOOT_MODEL_CREDIT,
  LEG_FOOT_MODEL_SRC,
  legFootParts,
} from './leg-foot-3d';

// Lower limb batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const legSuperficial: Topic = {
  slug: 'leg-superficial',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Leg and foot: superficial veins and cutaneous nerves',
  summary:
    'The dorsal venous arch and the two saphenous veins, and the nerves that supply the skin of the leg, the heel and the dorsum of the foot.',
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
      'Volume 2, Chapter 8 Front of Leg, pages 107 and 108; Chapter 9 Back of Leg, pages 123 and 124',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: veins and cutaneous nerves of the foot, pages 655 to 658',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bones and veins (BodyParts3D, CC BY 4.0); nerves (Z-Anatomy, CC BY-SA 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 and CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The dorsal venous arch lies over the metatarsals: its medial end with the medial marginal vein forms the great saphenous vein, its lateral end with the lateral marginal vein the small saphenous vein.',
    'Great saphenous vein: in front of the medial malleolus, across the lower third of the tibia and up its medial border, the saphenous nerve in front of it.',
    'Small saphenous vein: behind the lateral malleolus, up the middle of the calf with the sural nerve, through the roof of the popliteal fossa to the popliteal vein.',
    'Dorsum of the foot: superficial peroneal nerve for most of it; sural nerve on the lateral border, saphenous on the medial border, deep peroneal in the first cleft, plantar nerves on the nail beds.',
    'Calf: saphenous and medial cutaneous of thigh medially, posterior cutaneous of thigh and sural centrally, lateral cutaneous of calf and sural communicating laterally; medial calcanean branches to the heel.',
  ],
  visual: {
    kind: 'path',
    // The veins, then the skin of the medial leg, the calf, the lateral leg and the dorsum.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'dorsal-venous-arch',
          label: 'Dorsal\narch',
          name: 'Dorsal venous arch',
          x: 50,
          y: 30,
        },
        {
          id: 'great-saphenous-vein',
          label: 'Great\nsaphenous',
          name: 'Great saphenous vein, from its medial end',
          x: 145,
          y: 30,
        },
        {
          id: 'small-saphenous-vein',
          label: 'Small\nsaphenous',
          name: 'Small saphenous vein, from its lateral end',
          x: 225,
          y: 30,
        },
        {
          id: 'perforators',
          label: 'Perfor-\nators',
          name: 'Perforating veins, to the deep veins',
          x: 305,
          y: 30,
        },
        { id: 'medial-leg', label: 'Medial\nleg', name: 'Skin of the medial leg', x: 50, y: 110 },
        {
          id: 'saphenous-nerve',
          label: 'Saphenous',
          name: 'Saphenous nerve, to the medial border of the foot',
          x: 145,
          y: 110,
        },
        {
          id: 'infrapatellar',
          label: 'Infra-\npatellar',
          name: 'Infrapatellar branch of the saphenous nerve',
          x: 225,
          y: 110,
        },
        { id: 'calf', label: 'Calf', name: 'Skin of the back of the calf', x: 50, y: 186 },
        {
          id: 'sural-nerve',
          label: 'Sural',
          name: 'Sural nerve, lower calf and lateral border of the foot',
          x: 145,
          y: 186,
        },
        {
          id: 'posterior-cutaneous',
          label: 'Posterior\ncutaneous',
          name: 'Posterior cutaneous nerve of the thigh, upper calf',
          x: 225,
          y: 186,
        },
        {
          id: 'heel-branches',
          label: 'Heel\nbranches',
          name: 'Medial calcanean branches of the tibial nerve, to the heel',
          x: 305,
          y: 186,
        },
        {
          id: 'lateral-leg',
          label: 'Lateral\nleg',
          name: 'Skin of the lateral leg',
          x: 50,
          y: 262,
        },
        {
          id: 'lateral-cutaneous-calf',
          label: 'Lateral\ncutaneous',
          name: 'Lateral cutaneous nerve of the calf, upper two-thirds',
          x: 145,
          y: 262,
        },
        {
          id: 'sural-communicating-nerve',
          label: 'Sural com-\nmunicating',
          name: 'Sural communicating nerve',
          x: 225,
          y: 262,
        },
        {
          id: 'superficial-peroneal-nerve',
          label: 'Superficial\nperoneal',
          name: 'Superficial peroneal nerve, lower third',
          x: 308,
          y: 262,
        },
        { id: 'dorsum', label: 'Dorsum', name: 'Skin of the dorsum of the foot', x: 50, y: 340 },
        {
          id: 'most-dorsum',
          label: 'Most of\ndorsum',
          name: 'Most of the dorsum: superficial peroneal nerve',
          x: 145,
          y: 340,
        },
        {
          id: 'deep-peroneal-nerve',
          label: 'First\ncleft',
          name: 'First toe cleft: deep peroneal nerve',
          x: 225,
          y: 340,
        },
        {
          id: 'nail-beds',
          label: 'Nail\nbeds',
          name: 'Nail beds: medial and lateral plantar nerves',
          x: 305,
          y: 340,
        },
      ],
      edges: [
        { from: 'dorsal-venous-arch', to: 'great-saphenous-vein' },
        { from: 'dorsal-venous-arch', to: 'small-saphenous-vein' },
        { from: 'dorsal-venous-arch', to: 'perforators' },
        { from: 'medial-leg', to: 'saphenous-nerve' },
        { from: 'medial-leg', to: 'infrapatellar' },
        { from: 'calf', to: 'sural-nerve' },
        { from: 'calf', to: 'posterior-cutaneous' },
        { from: 'calf', to: 'heel-branches' },
        { from: 'lateral-leg', to: 'lateral-cutaneous-calf' },
        { from: 'lateral-leg', to: 'sural-communicating-nerve' },
        { from: 'lateral-leg', to: 'superficial-peroneal-nerve' },
        { from: 'dorsum', to: 'most-dorsum' },
        { from: 'dorsum', to: 'deep-peroneal-nerve' },
        { from: 'dorsum', to: 'nail-beds' },
      ],
    },
    lesions: [
      {
        id: 'varicose-veins',
        label: 'Varicose veins',
        nodeIds: ['great-saphenous-vein', 'perforators'],
        explanation:
          'When the valves of the perforating veins fail, the calf muscles pump blood outwards into the superficial veins, which stretch and twist, the great saphenous most of all.',
      },
      {
        id: 'saphenous-cutdown',
        label: 'Saphenous cut-down',
        nodeIds: ['great-saphenous-vein', 'saphenous-nerve'],
        explanation:
          'In an emergency the great saphenous vein in front of the medial malleolus is opened for fluids or blood. The saphenous nerve lies just in front of it; caught, it leaves the medial border of the foot numb.',
      },
      {
        id: 'sural-graft',
        label: 'Sural nerve graft',
        nodeIds: ['sural-nerve'],
        explanation:
          'Being purely sensory, superficial and easy to find between the tendo calcaneus and the lateral malleolus, the sural nerve is the usual donor for nerve grafts; the lateral border of the foot goes numb.',
      },
    ],
    drill: [
      {
        id: 'leg-veins',
        title: 'Superficial veins',
        hint: 'One vein from each end of the arch, and the links to the deep veins.',
        nodeIds: ['great-saphenous-vein', 'small-saphenous-vein', 'perforators'],
      },
      {
        id: 'leg-skin-nerves',
        title: 'Cutaneous nerves',
        hint: 'Go round the leg: medial, back, lateral, then the dorsum of the foot.',
        nodeIds: [
          'saphenous-nerve',
          'infrapatellar',
          'sural-nerve',
          'posterior-cutaneous',
          'heel-branches',
          'lateral-cutaneous-calf',
          'sural-communicating-nerve',
          'superficial-peroneal-nerve',
          'most-dorsum',
          'deep-peroneal-nerve',
          'nail-beds',
        ],
      },
    ],
    model3d: {
      src: LEG_FOOT_MODEL_SRC,
      credit: LEG_FOOT_MODEL_CREDIT,
      parts: legFootParts([
        ...LEG_FOOT_BONES,
        'dorsal-venous-arch',
        'great-saphenous-vein',
        'small-saphenous-vein',
        'popliteal-vein',
        'saphenous-nerve',
        'sural-nerve',
        'sural-communicating-nerve',
        'superficial-peroneal-nerve',
        'deep-peroneal-nerve',
        'common-peroneal-nerve',
        'tibial-nerve',
      ]),
      traces: [],
      stops: [
        {
          id: 'medial',
          title: 'Medial side',
          description:
            'The great saphenous vein comes up in front of the medial malleolus, crosses the lower tibia and climbs its medial border, the saphenous nerve beside it.',
          target: [-70, -80, 180],
          position: [944, -336, 273],
        },
        {
          id: 'back',
          title: 'Back of the leg',
          description:
            'The small saphenous vein climbs the middle of the calf with the sural nerve and dives into the popliteal fossa.',
          target: [-85, -50, 180],
          position: [-150, 1047, 239],
        },
        {
          id: 'dorsum',
          title: 'Dorsum of the foot',
          description:
            'The dorsal venous arch over the metatarsals, the branches of the superficial peroneal nerve fanning out over it, and the deep peroneal nerve ending in the first cleft.',
          target: [-95, -130, -20],
          position: [-160, -560, 420],
        },
        {
          id: 'lateral',
          title: 'Lateral side',
          description:
            'The superficial peroneal nerve comes through the deep fascia in the lower third of the leg; the small saphenous vein and sural nerve pass behind the lateral malleolus.',
          target: [-95, -80, 150],
          position: [-1122, -277, 231],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'arch',
      title: 'The dorsal venous arch',
      body: 'Dorsal digital veins join into four dorsal metatarsal veins, which end in an arch across the dorsum of the foot over the metatarsals. A marginal vein runs along each border of the foot to meet the ends of the arch, and the two saphenous veins start there.',
      focus: ['dorsal-venous-arch'],
    },
    {
      id: 'saphenous-veins',
      title: 'The two saphenous veins',
      body: 'The great saphenous vein starts at the medial end, passes in front of the medial malleolus, crosses the lower third of the medial surface of the tibia and climbs its medial border to the back of the knee and on up the thigh, the saphenous nerve in front of it. The small saphenous vein starts at the lateral end, passes behind the lateral malleolus, runs up beside the tendo calcaneus and then the middle of the calf with the sural nerve, and ends in the popliteal vein. Perforating veins link both to the deep veins.',
      focus: ['great-saphenous-vein', 'small-saphenous-vein', 'perforators'],
    },
    {
      id: 'medial-skin',
      title: 'Medial side',
      body: 'The saphenous nerve, from the posterior division of the femoral nerve, pierces the deep fascia at the knee between sartorius and gracilis and supplies the medial leg and the medial border of the foot to the ball of the big toe. Its infrapatellar branch supplies the skin over the ligamentum patellae.',
      focus: ['medial-leg', 'saphenous-nerve', 'infrapatellar'],
    },
    {
      id: 'calf-skin',
      title: 'Back of the calf',
      body: 'Roughly two nerves supply each third of the calf. Centrally the posterior cutaneous nerve of the thigh reaches the upper half and the sural nerve the lower half; the sural nerve, from the tibial nerve in the popliteal fossa, goes on behind the lateral malleolus to the lateral border of the foot and the little toe. The heel has its own medial calcanean branches of the tibial nerve.',
      focus: ['calf', 'sural-nerve', 'posterior-cutaneous', 'heel-branches'],
    },
    {
      id: 'lateral-skin',
      title: 'Lateral side',
      body: 'The lateral cutaneous nerve of the calf, from the common peroneal nerve, supplies the upper two-thirds; the sural communicating nerve, also from the common peroneal, joins the sural nerve about 5 cm above the heel. The superficial peroneal nerve pierces the deep fascia at the junction of the upper two-thirds and lower third and supplies the lower lateral leg.',
      focus: [
        'lateral-leg',
        'lateral-cutaneous-calf',
        'sural-communicating-nerve',
        'superficial-peroneal-nerve',
      ],
    },
    {
      id: 'dorsum-skin',
      title: 'Dorsum of the foot',
      body: 'The superficial peroneal nerve supplies most of it through its medial and lateral branches. The exceptions are the borders (sural laterally, saphenous medially up to the base of the big toe), the cleft between the first and second toes (deep peroneal), and the ends of the toes with their nail beds, reached by digital branches of the plantar nerves curling up from the sole.',
      focus: ['dorsum', 'most-dorsum', 'deep-peroneal-nerve', 'nail-beds'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each saphenous vein and follow it from the arch up the leg, then select the nerves on the dorsum to see which part each one covers.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'gsv-malleolus',
      prompt: 'The great saphenous vein passes:',
      options: [
        { id: 'front-medial', text: 'In front of the medial malleolus' },
        { id: 'behind-medial', text: 'Behind the medial malleolus' },
        { id: 'behind-lateral', text: 'Behind the lateral malleolus' },
        { id: 'front-lateral', text: 'In front of the lateral malleolus' },
      ],
      answerId: 'front-medial',
      explanation:
        'Which makes it easy to find for a cut-down; the small saphenous vein passes behind the lateral malleolus.',
    },
    {
      id: 'first-cleft-nerve',
      prompt: 'The skin between the big toe and the second toe is supplied by the:',
      options: [
        { id: 'deep-peroneal', text: 'Deep peroneal nerve' },
        { id: 'superficial-peroneal', text: 'Superficial peroneal nerve' },
        { id: 'saphenous', text: 'Saphenous nerve' },
        { id: 'sural', text: 'Sural nerve' },
      ],
      answerId: 'deep-peroneal',
      explanation: 'Its only skin; loss of feeling there alone points to the deep peroneal nerve.',
    },
    {
      id: 'sural-companion',
      prompt: 'The sural nerve accompanies the:',
      options: [
        { id: 'small-saphenous', text: 'Small saphenous vein' },
        { id: 'great-saphenous', text: 'Great saphenous vein' },
        { id: 'posterior-tibial', text: 'Posterior tibial artery' },
        { id: 'peroneal', text: 'Peroneal artery' },
      ],
      answerId: 'small-saphenous',
      explanation:
        'Up the calf and behind the lateral malleolus to the lateral border of the foot.',
    },
    {
      id: 'heel-skin',
      prompt: 'The skin of the heel is supplied by the:',
      options: [
        { id: 'medial-calcanean', text: 'Medial calcanean branches of the tibial nerve' },
        { id: 'sural', text: 'Sural nerve' },
        { id: 'saphenous', text: 'Saphenous nerve' },
        { id: 'deep-peroneal', text: 'Deep peroneal nerve' },
      ],
      answerId: 'medial-calcanean',
      explanation: 'They pierce the flexor retinaculum to reach the heel and the medial sole.',
    },
  ],
  cards: [
    {
      id: 'saphenous-veins-card',
      front: 'Where do the great and small saphenous veins begin and end?',
      back: 'Great: medial end of the dorsal venous arch, in front of the medial malleolus, to the femoral vein. Small: lateral end, behind the lateral malleolus, to the popliteal vein.',
    },
    {
      id: 'dorsum-nerves-card',
      front: 'Nerves supplying the skin of the dorsum of the foot?',
      back: 'Superficial peroneal (most), sural (lateral border), saphenous (medial border), deep peroneal (first cleft), plantar nerves (nail beds).',
    },
    {
      id: 'calf-nerves-card',
      front: 'Cutaneous nerves of the back of the calf?',
      back: 'Medial: saphenous, medial cutaneous of thigh. Central: posterior cutaneous of thigh, sural. Lateral: lateral cutaneous of calf, sural communicating. Heel: medial calcanean.',
    },
    {
      id: 'sural-course-card',
      front: 'Course of the sural nerve?',
      back: 'From the tibial nerve in the popliteal fossa, between the heads of gastrocnemius, with the small saphenous vein, joined by the sural communicating nerve, behind the lateral malleolus to the little toe.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 8 Front of Leg and Dorsum of Foot',
      pages: '107–108',
    },
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 9 Back of Leg', pages: '123–124' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '655–658' },
  ],
};
