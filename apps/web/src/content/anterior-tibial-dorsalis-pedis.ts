import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  FRONT_LEG_MUSCLES,
  LEG_FOOT_BONES,
  LEG_FOOT_MODEL_CREDIT,
  LEG_FOOT_MODEL_SRC,
  LEG_FRONT,
  legFootParts,
} from './leg-foot-3d';

// Lower limb batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const anteriorTibialDorsalisPedis: Topic = {
  slug: 'anterior-tibial-dorsalis-pedis',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Anterior tibial artery, deep peroneal nerve and dorsalis pedis',
  summary:
    'The artery and nerve of the front of the leg, how the muscles change round them on the way down, and the dorsalis pedis artery on the dorsum of the foot.',
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
      'Volume 2, Chapter 8 Front of Leg and Dorsum of Foot, pages 113 to 116',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: anterior tibial artery, deep fibular nerve and dorsalis pedis artery, pages 626 and 654',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'Bones, muscles and arteries (BodyParts3D, CC BY 4.0); nerves (Z-Anatomy, CC BY-SA 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 and CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Anterior tibial artery: the smaller terminal branch of the popliteal, through the top of the interosseous membrane into the front of the leg; it becomes the dorsalis pedis midway between the malleoli.',
    'Its neighbours change because extensor hallucis longus crosses it: above, tibialis anterior and extensor digitorum longus; in the middle, tibialis anterior and extensor hallucis longus; below, extensor hallucis longus and extensor digitorum longus.',
    'Deep peroneal nerve: from the common peroneal at the neck of the fibula; lateral to the artery above and below, in front of it in the middle; ends in a lateral branch to extensor digitorum brevis and a medial branch to the first toe cleft.',
    'Dorsalis pedis: over the talus, navicular and intermediate cuneiform to the first intermetatarsal space, where it dips into the sole to complete the plantar arch. Pulse lateral to the tendon of extensor hallucis longus.',
    'Branches of the dorsalis pedis: lateral and medial tarsal, arcuate (dorsal metatarsals two to four) and the first dorsal metatarsal. It is congenitally absent in about one person in seven.',
  ],
  visual: {
    kind: 'path',
    // The artery and its neighbours, the nerve, then the dorsalis pedis and its end.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'anterior-tibial-artery',
          label: 'Anterior\ntibial',
          name: 'Anterior tibial artery',
          x: 50,
          y: 30,
        },
        {
          id: 'interosseous-opening',
          label: 'Through\nmembrane',
          name: 'Enters over the top of the interosseous membrane',
          x: 145,
          y: 30,
        },
        {
          id: 'recurrents',
          label: 'Recurrent\nbranches',
          name: 'Anterior and posterior tibial recurrent, to the knee',
          x: 225,
          y: 30,
        },
        {
          id: 'malleolar',
          label: 'Malleolar\nbranches',
          name: 'Anterior medial and lateral malleolar, to the ankle',
          x: 305,
          y: 30,
        },
        { id: 'between', label: 'Between', name: 'Muscles on either side', x: 50, y: 110 },
        {
          id: 'upper-third',
          label: 'Upper\nthird',
          name: 'Upper third: tibialis anterior and extensor digitorum longus',
          x: 145,
          y: 110,
        },
        {
          id: 'middle-third',
          label: 'Middle\nthird',
          name: 'Middle third: tibialis anterior and extensor hallucis longus',
          x: 225,
          y: 110,
        },
        {
          id: 'lower-third',
          label: 'Lower\nthird',
          name: 'Lower third: extensor hallucis longus and extensor digitorum longus',
          x: 305,
          y: 110,
        },
        {
          id: 'deep-peroneal-nerve',
          label: 'Deep\nperoneal',
          name: 'Deep peroneal nerve',
          x: 50,
          y: 186,
        },
        {
          id: 'beside-artery',
          label: 'Beside\nartery',
          name: 'Lateral to the artery above and below, in front of it in the middle',
          x: 145,
          y: 186,
        },
        {
          id: 'lateral-terminal',
          label: 'Lateral\nbranch',
          name: 'Lateral terminal branch, to extensor digitorum brevis',
          x: 225,
          y: 186,
        },
        {
          id: 'medial-terminal',
          label: 'Medial\nbranch',
          name: 'Medial terminal branch, to the skin of the first toe cleft',
          x: 305,
          y: 186,
        },
        {
          id: 'dorsalis-pedis-artery',
          label: 'Dorsalis\npedis',
          name: 'Dorsalis pedis artery',
          x: 50,
          y: 262,
        },
        {
          id: 'lateral-tarsal-artery',
          label: 'Lateral\ntarsal',
          name: 'Lateral tarsal artery',
          x: 145,
          y: 262,
        },
        {
          id: 'arcuate-artery',
          label: 'Arcuate',
          name: 'Arcuate artery, giving dorsal metatarsals two to four',
          x: 225,
          y: 262,
        },
        {
          id: 'first-dorsal-metatarsal',
          label: 'First\nmetatarsal',
          name: 'First dorsal metatarsal artery',
          x: 305,
          y: 262,
        },
        { id: 'ends', label: 'Ends', name: 'Its end', x: 50, y: 340 },
        {
          id: 'first-space',
          label: 'First\nspace',
          name: 'Dips into the sole through the first intermetatarsal space',
          x: 145,
          y: 340,
        },
        {
          id: 'plantar-arch',
          label: 'Plantar\narch',
          name: 'Completes the plantar arch',
          x: 225,
          y: 340,
        },
      ],
      edges: [
        { from: 'anterior-tibial-artery', to: 'interosseous-opening' },
        { from: 'anterior-tibial-artery', to: 'recurrents' },
        { from: 'anterior-tibial-artery', to: 'malleolar' },
        { from: 'between', to: 'upper-third' },
        { from: 'between', to: 'middle-third' },
        { from: 'between', to: 'lower-third' },
        { from: 'deep-peroneal-nerve', to: 'beside-artery' },
        { from: 'deep-peroneal-nerve', to: 'lateral-terminal' },
        { from: 'deep-peroneal-nerve', to: 'medial-terminal' },
        { from: 'dorsalis-pedis-artery', to: 'lateral-tarsal-artery' },
        { from: 'dorsalis-pedis-artery', to: 'arcuate-artery' },
        { from: 'dorsalis-pedis-artery', to: 'first-dorsal-metatarsal' },
        { from: 'ends', to: 'first-space' },
        { from: 'ends', to: 'plantar-arch' },
      ],
    },
    lesions: [
      {
        id: 'deep-peroneal-foot-drop',
        label: 'Foot drop',
        nodeIds: ['deep-peroneal-nerve', 'medial-terminal'],
        explanation:
          'Injury to the deep peroneal nerve, or to the common peroneal above it, paralyses the front of the leg: the foot hangs plantar flexed. When the deep branch alone is hurt, feeling is lost only in the first toe cleft.',
      },
      {
        id: 'absent-dorsalis-pulse',
        label: 'Missing pulse',
        nodeIds: ['dorsalis-pedis-artery'],
        explanation:
          'The pulse is felt between the tendons of extensor hallucis longus and the first tendon of extensor digitorum longus, and is checked in blocked leg arteries. It is absent from birth in about 14 percent of people, so both feet and the posterior tibial pulse are compared.',
      },
    ],
    drill: [
      {
        id: 'anterior-tibial-course',
        title: 'Anterior tibial artery',
        hint: 'How it gets in, its branches, and its neighbours in each third.',
        nodeIds: [
          'interosseous-opening',
          'recurrents',
          'malleolar',
          'upper-third',
          'middle-third',
          'lower-third',
        ],
      },
      {
        id: 'nerve-and-dorsalis',
        title: 'Nerve and dorsalis pedis',
        hint: 'Where the nerve lies and ends; the branches of the dorsalis pedis and where it goes.',
        nodeIds: [
          'beside-artery',
          'lateral-terminal',
          'medial-terminal',
          'lateral-tarsal-artery',
          'arcuate-artery',
          'first-dorsal-metatarsal',
          'first-space',
          'plantar-arch',
        ],
      },
    ],
    model3d: {
      src: LEG_FOOT_MODEL_SRC,
      credit: LEG_FOOT_MODEL_CREDIT,
      parts: legFootParts([
        ...LEG_FOOT_BONES,
        ...FRONT_LEG_MUSCLES,
        'popliteal-artery',
        'anterior-tibial-artery',
        'dorsalis-pedis-artery',
        'arcuate-artery',
        'lateral-tarsal-artery',
        'common-peroneal-nerve',
        'deep-peroneal-nerve',
        'superficial-peroneal-nerve',
      ]),
      traces: [],
      stops: [
        LEG_FRONT,
        {
          id: 'membrane',
          title: 'Over the membrane',
          description:
            'From the front and laterally: the artery comes forwards over the top of the interosseous membrane and runs down on it; the deep peroneal nerve joins it from round the neck of the fibula.',
          target: [-90, -80, 300],
          position: [-560, -700, 360],
        },
        {
          id: 'ankle',
          title: 'At the ankle',
          description:
            'Midway between the malleoli the artery becomes the dorsalis pedis, with the nerve beside it and the tendon of extensor hallucis longus on its medial side.',
          target: [-85, -110, 30],
          position: [-110, -660, 180],
        },
        {
          id: 'dorsum',
          title: 'Dorsalis pedis',
          description:
            'Across the tarsal bones to the first space between the metatarsals, with the arcuate and lateral tarsal arteries branching off laterally.',
          target: [-90, -150, -20],
          position: [-150, -520, 420],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'artery-course',
      title: 'Anterior tibial artery',
      body: 'The smaller terminal branch of the popliteal artery begins at the lower border of popliteus, opposite the tibial tuberosity. It passes forwards close to the fibula over the top of the interosseous membrane, runs down on the membrane and then on the tibia, and at the ankle, midway between the malleoli, changes its name to dorsalis pedis. Recurrent branches join the anastomosis round the knee and malleolar branches the network round the ankle; the perforating branch of the peroneal artery reinforces it.',
      focus: ['anterior-tibial-artery', 'interosseous-opening', 'recurrents', 'malleolar'],
    },
    {
      id: 'neighbours',
      title: 'Its neighbours',
      body: 'Extensor hallucis longus starts lateral to the artery and crosses in front of it to its medial side. So in the upper third the artery lies between tibialis anterior and extensor digitorum longus, in the middle third between tibialis anterior and extensor hallucis longus, and in the lower third between extensor hallucis longus and extensor digitorum longus.',
      focus: ['between', 'upper-third', 'middle-third', 'lower-third'],
    },
    {
      id: 'nerve',
      title: 'Deep peroneal nerve',
      body: 'One of the two terminal branches of the common peroneal nerve, it begins at the neck of the fibula, pierces the anterior intermuscular septum and extensor digitorum longus and joins the artery: lateral to it in the upper and lower thirds, in front of it in the middle. It supplies the four muscles of the front of the leg, then near the ankle divides: the lateral branch ends in a swelling under extensor digitorum brevis and supplies it, the medial branch supplies the skin of the first toe cleft.',
      focus: ['deep-peroneal-nerve', 'beside-artery', 'lateral-terminal', 'medial-terminal'],
    },
    {
      id: 'dorsalis',
      title: 'Dorsalis pedis artery',
      body: 'It starts in front of the ankle, runs forwards on the medial side of the dorsum over the talus, navicular and intermediate cuneiform, and reaches the back of the first intermetatarsal space. Extensor hallucis brevis crosses it; the tendon of extensor hallucis longus lies medial to it and the first tendon of extensor digitorum longus lateral, which is where its pulse is felt.',
      focus: ['dorsalis-pedis-artery'],
    },
    {
      id: 'dorsalis-branches',
      title: 'Branches and end',
      body: 'The lateral tarsal artery runs under extensor digitorum brevis; medial tarsal twigs go to the medial malleolar network; the arcuate artery runs laterally over the metatarsal bases and gives the second to fourth dorsal metatarsal arteries; the first dorsal metatarsal arises last. The dorsalis pedis then dips between the two heads of the first dorsal interosseous into the sole and completes the plantar arch.',
      focus: [
        'lateral-tarsal-artery',
        'arcuate-artery',
        'first-dorsal-metatarsal',
        'ends',
        'first-space',
        'plantar-arch',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select the anterior tibial artery and follow it from the back of the knee over the membrane to the dorsum, switching tibialis anterior and the extensors off as you go.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'dorsalis-pedis-pulse-site',
      prompt: 'The dorsalis pedis pulse is felt:',
      options: [
        { id: 'lateral-ehl', text: 'Just lateral to the tendon of extensor hallucis longus' },
        { id: 'medial-ehl', text: 'Just medial to the tendon of extensor hallucis longus' },
        { id: 'behind-medial', text: 'Behind the medial malleolus' },
        { id: 'fifth-metatarsal', text: 'Over the base of the fifth metatarsal' },
      ],
      answerId: 'lateral-ehl',
      explanation:
        'Between extensor hallucis longus and the first tendon of extensor digitorum longus; behind the medial malleolus is the posterior tibial pulse.',
    },
    {
      id: 'anterior-tibial-crossed',
      prompt:
        'In the leg the anterior tibial artery is crossed from lateral to medial by the tendon of:',
      options: [
        { id: 'ehl', text: 'Extensor hallucis longus' },
        { id: 'ta', text: 'Tibialis anterior' },
        { id: 'edl', text: 'Extensor digitorum longus' },
        { id: 'pt', text: 'Peroneus tertius' },
      ],
      answerId: 'ehl',
      explanation: 'Which is why the artery’s neighbours change from one third to the next.',
    },
    {
      id: 'anterior-tibial-becomes',
      prompt: 'The anterior tibial artery becomes the dorsalis pedis:',
      options: [
        { id: 'malleoli', text: 'Midway between the two malleoli' },
        { id: 'first-space', text: 'At the first intermetatarsal space' },
        { id: 'retinaculum', text: 'At the upper border of the superior extensor retinaculum' },
        { id: 'navicular', text: 'Over the navicular' },
      ],
      answerId: 'malleoli',
      explanation: 'In front of the ankle; it ends at the first space by dipping into the sole.',
    },
    {
      id: 'deep-peroneal-skin',
      prompt: 'Isolated injury of the deep peroneal nerve gives sensory loss in the:',
      options: [
        { id: 'first-cleft', text: 'Cleft between the first and second toes' },
        { id: 'dorsum', text: 'Whole dorsum of the foot' },
        { id: 'lateral-border', text: 'Lateral border of the foot' },
        { id: 'sole', text: 'Sole of the foot' },
      ],
      answerId: 'first-cleft',
      explanation: 'Its only skin; the superficial peroneal nerve supplies most of the dorsum.',
    },
  ],
  cards: [
    {
      id: 'anterior-tibial-relations-card',
      front: 'Muscles on either side of the anterior tibial artery in each third of the leg?',
      back: 'Upper: tibialis anterior and extensor digitorum longus. Middle: tibialis anterior and extensor hallucis longus. Lower: extensor hallucis longus and extensor digitorum longus.',
    },
    {
      id: 'deep-peroneal-supply-card',
      front: 'What does the deep peroneal nerve supply?',
      back: 'Tibialis anterior, extensor hallucis longus, extensor digitorum longus, peroneus tertius, extensor digitorum brevis; the ankle and tarsal joints; the skin of the first toe cleft.',
    },
    {
      id: 'dorsalis-pedis-branches-card',
      front: 'Branches of the dorsalis pedis artery?',
      back: 'Lateral tarsal, medial tarsal, arcuate (dorsal metatarsals two to four), first dorsal metatarsal; it ends by completing the plantar arch.',
    },
    {
      id: 'dorsalis-pedis-course-card',
      front: 'Course of the dorsalis pedis artery?',
      back: 'From midway between the malleoli over the talus, navicular and intermediate cuneiform to the first intermetatarsal space, then between the heads of the first dorsal interosseous into the sole.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 8 Front of Leg and Dorsum of Foot',
      pages: '113–116',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '626, 654' },
  ],
};
