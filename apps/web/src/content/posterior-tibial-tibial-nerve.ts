import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  CALF_DEEP,
  CALF_SUPERFICIAL,
  LEG_BACK,
  LEG_FOOT_BONES,
  LEG_FOOT_MODEL_CREDIT,
  LEG_FOOT_MODEL_SRC,
  legFootParts,
} from './leg-foot-3d';

// Lower limb batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const posteriorTibialTibialNerve: Topic = {
  slug: 'posterior-tibial-tibial-nerve',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Back of leg: posterior tibial artery, tibial nerve and flexor retinaculum',
  summary:
    'The artery and nerve of the calf, the peroneal artery, and what passes under the flexor retinaculum behind the medial malleolus into the sole.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 9 Back of Leg, pages 125 and 130 to 133'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: arteries and nerves of the posterior compartment, tarsal tunnel, pages 620 to 622 and 642',
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
    'Posterior tibial artery: the larger terminal branch of the popliteal; under the soleal arch, on tibialis posterior and then flexor digitorum longus and the tibia; ends under the flexor retinaculum as the medial and lateral plantar arteries.',
    'Peroneal artery: its largest branch, from 2.5 cm below popliteus, along the fibula and behind the ankle; it feeds the posterior and lateral compartments, and its perforating branch can replace the dorsalis pedis.',
    'Tibial nerve: same course and relations as the artery; supplies the deep muscles and the deep part of soleus, the heel through medial calcanean branches, and ends as the medial and lateral plantar nerves.',
    'Flexor retinaculum: from the medial malleolus to the medial tubercle of the calcaneus. Under it, medial to lateral: tibialis posterior, flexor digitorum longus, posterior tibial vessels, tibial nerve, flexor hallucis longus.',
    'The posterior tibial pulse is felt about 2 cm below and behind the medial malleolus; pressure on the nerve under the retinaculum is tarsal tunnel syndrome.',
  ],
  visual: {
    kind: 'path',
    // The artery and its branches, the nerve, then the structures under the flexor retinaculum.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'posterior-tibial-artery',
          label: 'Posterior\ntibial',
          name: 'Posterior tibial artery',
          x: 50,
          y: 30,
        },
        {
          id: 'soleal-arch',
          label: 'Soleal\narch',
          name: 'Enters under the tendinous arch of soleus',
          x: 145,
          y: 30,
        },
        {
          id: 'peroneal-vein',
          label: 'Peroneal',
          name: 'Peroneal artery, its largest branch (its vein in the model)',
          x: 225,
          y: 30,
        },
        {
          id: 'plantar-arteries',
          label: 'Plantar\narteries',
          name: 'Ends as the medial and lateral plantar arteries',
          x: 305,
          y: 30,
        },
        { id: 'branches', label: 'Branches', name: 'Its other branches', x: 50, y: 110 },
        {
          id: 'circumflex-fibular',
          label: 'Circumflex\nfibular',
          name: 'Circumflex fibular, to the knee',
          x: 145,
          y: 110,
        },
        {
          id: 'nutrient',
          label: 'Nutrient',
          name: 'Nutrient artery of the tibia',
          x: 225,
          y: 110,
        },
        {
          id: 'ankle-branches',
          label: 'Malleolar,\ncalcanean',
          name: 'Communicating, malleolar and calcanean branches',
          x: 305,
          y: 110,
        },
        { id: 'tibial-nerve', label: 'Tibial\nnerve', name: 'Tibial nerve', x: 50, y: 186 },
        {
          id: 'deep-muscles',
          label: 'Deep\nmuscles',
          name: 'Muscular: tibialis posterior, the long flexors and deep soleus',
          x: 145,
          y: 186,
        },
        {
          id: 'heel-skin',
          label: 'Heel\nskin',
          name: 'Medial calcanean branches, to the heel',
          x: 225,
          y: 186,
        },
        {
          id: 'plantar-nerves',
          label: 'Plantar\nnerves',
          name: 'Ends as the medial and lateral plantar nerves',
          x: 305,
          y: 186,
        },
        {
          id: 'flexor-retinaculum',
          label: 'Under the\nretinaculum',
          name: 'Under the flexor retinaculum, medial to lateral',
          x: 50,
          y: 262,
        },
        {
          id: 'tibialis-posterior',
          label: 'Tibialis\nposterior',
          name: 'Tibialis posterior',
          x: 145,
          y: 262,
        },
        {
          id: 'flexor-digitorum-longus',
          label: 'Flexor\ndigitorum',
          name: 'Flexor digitorum longus',
          x: 225,
          y: 262,
        },
        {
          id: 'vessels-nerve',
          label: 'Vessels,\nnerve',
          name: 'Posterior tibial vessels and tibial nerve, sharing a compartment',
          x: 305,
          y: 262,
        },
        { id: 'at-ankle', label: 'At the\nankle', name: 'At the ankle', x: 50, y: 340 },
        {
          id: 'flexor-hallucis-longus',
          label: 'Flexor\nhallucis',
          name: 'Flexor hallucis longus, the most lateral under the retinaculum',
          x: 145,
          y: 340,
        },
        {
          id: 'pulse-site',
          label: 'Pulse',
          name: 'Posterior tibial pulse, below and behind the medial malleolus',
          x: 225,
          y: 340,
        },
        {
          id: 'tarsal-tunnel',
          label: 'Tarsal\ntunnel',
          name: 'Tarsal tunnel, the space under the retinaculum',
          x: 305,
          y: 340,
        },
      ],
      edges: [
        { from: 'posterior-tibial-artery', to: 'soleal-arch' },
        { from: 'posterior-tibial-artery', to: 'peroneal-vein' },
        { from: 'posterior-tibial-artery', to: 'plantar-arteries' },
        { from: 'branches', to: 'circumflex-fibular' },
        { from: 'branches', to: 'nutrient' },
        { from: 'branches', to: 'ankle-branches' },
        { from: 'tibial-nerve', to: 'deep-muscles' },
        { from: 'tibial-nerve', to: 'heel-skin' },
        { from: 'tibial-nerve', to: 'plantar-nerves' },
        { from: 'flexor-retinaculum', to: 'tibialis-posterior' },
        { from: 'flexor-retinaculum', to: 'flexor-digitorum-longus' },
        { from: 'flexor-retinaculum', to: 'vessels-nerve' },
        { from: 'flexor-retinaculum', to: 'flexor-hallucis-longus' },
        { from: 'at-ankle', to: 'pulse-site' },
        { from: 'at-ankle', to: 'tarsal-tunnel' },
      ],
    },
    lesions: [
      {
        id: 'tarsal-tunnel-syndrome',
        label: 'Tarsal tunnel syndrome',
        nodeIds: ['tarsal-tunnel', 'vessels-nerve', 'plantar-nerves'],
        explanation:
          'The tibial nerve squeezed under the flexor retinaculum gives pain and numbness on the inner ankle and the sole, and the small muscles of the sole can weaken.',
      },
      {
        id: 'tibial-nerve-leg-injury',
        label: 'Tibial nerve injury',
        nodeIds: ['tibial-nerve', 'deep-muscles'],
        explanation:
          'A fractured tibia high in the calf or a tight plaster lower down can damage it. Injured high, the calf muscles and the muscles of the sole are paralysed and the sole loses its feeling.',
      },
      {
        id: 'claudication',
        label: 'Intermittent claudication',
        nodeIds: ['posterior-tibial-artery', 'pulse-site'],
        explanation:
          'With narrowed leg arteries the calf cramps after walking a set distance and eases with rest; a weak or absent posterior tibial pulse supports the diagnosis.',
      },
    ],
    drill: [
      {
        id: 'artery-and-nerve',
        title: 'Artery and nerve',
        hint: 'How the artery gets in, its branches and end; the nerve’s branches and end.',
        nodeIds: [
          'soleal-arch',
          'peroneal-vein',
          'plantar-arteries',
          'circumflex-fibular',
          'nutrient',
          'ankle-branches',
          'deep-muscles',
          'heel-skin',
          'plantar-nerves',
        ],
      },
      {
        id: 'flexor-retinaculum-order',
        title: 'Under the flexor retinaculum',
        hint: 'Medial to lateral: two tendons, the vessels and nerve, one more tendon.',
        nodeIds: [
          'tibialis-posterior',
          'flexor-digitorum-longus',
          'vessels-nerve',
          'flexor-hallucis-longus',
        ],
      },
    ],
    model3d: {
      src: LEG_FOOT_MODEL_SRC,
      credit: LEG_FOOT_MODEL_CREDIT,
      parts: legFootParts([
        ...LEG_FOOT_BONES,
        ...CALF_SUPERFICIAL,
        ...CALF_DEEP,
        'popliteal-artery',
        'posterior-tibial-artery',
        'medial-plantar-artery',
        'lateral-plantar-artery',
        'popliteal-vein',
        'peroneal-vein',
        'tibial-nerve',
        'medial-plantar-nerve',
        'lateral-plantar-nerve',
        'sural-nerve',
      ]),
      traces: [],
      stops: [
        LEG_BACK,
        {
          id: 'under-soleus',
          title: 'Under soleus',
          description:
            'From behind and medially, with gastrocnemius and soleus switched off: the artery and nerve run down together on tibialis posterior; the peroneal vessels go out towards the fibula.',
          target: [-75, -55, 200],
          position: [380, 820, 240],
        },
        {
          id: 'retinaculum',
          title: 'Behind the medial malleolus',
          description:
            'Between the malleolus and the heel: tibialis posterior and flexor digitorum longus in front, then the artery and nerve, then flexor hallucis longus. The retinaculum over them is not in the model.',
          target: [-65, -60, 10],
          position: [560, 300, 110],
        },
        {
          id: 'into-sole',
          title: 'Into the sole',
          description:
            'From below and medially: under the retinaculum the artery and nerve divide into their medial and lateral plantar branches.',
          target: [-75, -80, -40],
          position: [460, -120, -380],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'artery',
      title: 'Posterior tibial artery',
      body: 'The larger terminal branch of the popliteal artery begins at the lower border of popliteus and passes under the tendinous arch of soleus. It runs down and slightly medially, first on tibialis posterior under the superficial muscles, then in the lower third on flexor digitorum longus and the tibia, covered only by skin and fascia beside the tendo calcaneus. Under the flexor retinaculum, midway between the medial malleolus and the heel, it divides into the medial and lateral plantar arteries.',
      focus: ['posterior-tibial-artery', 'soleal-arch', 'plantar-arteries'],
    },
    {
      id: 'branches',
      title: 'Its branches',
      body: 'The peroneal artery is the largest; the circumflex fibular winds round the neck of the fibula to the knee; a nutrient artery enters the tibia; a communicating branch joins the peroneal artery above the ankle; malleolar and calcanean branches join the networks there.',
      focus: ['branches', 'circumflex-fibular', 'nutrient', 'ankle-branches'],
    },
    {
      id: 'peroneal',
      title: 'Peroneal artery',
      body: 'It starts about 2.5 cm below popliteus, runs to the fibula and down along its medial crest with the nerve to flexor hallucis longus, then behind the lower tibiofibular and ankle joints, ending in lateral calcanean branches. It supplies the posterior and lateral compartments and the fibula; its perforating branch pierces the interosseous membrane above the ankle and can stand in for a missing dorsalis pedis. The model has no peroneal artery: its vein marks the path.',
      focus: ['peroneal-vein'],
    },
    {
      id: 'nerve',
      title: 'Tibial nerve',
      body: 'The calf’s only nerve follows the artery and has the same relations. It supplies tibialis posterior, the two long flexors and the deep part of soleus, sends medial calcanean branches through the retinaculum to the skin of the heel, gives a branch to the ankle joint, and divides with the artery into the medial and lateral plantar nerves.',
      focus: ['tibial-nerve', 'deep-muscles', 'heel-skin', 'plantar-nerves'],
    },
    {
      id: 'retinaculum',
      title: 'Flexor retinaculum',
      body: 'A band from the medial malleolus to the medial tubercle of the calcaneus, with septa making four compartments beneath. From medial to lateral: tibialis posterior, flexor digitorum longus, the posterior tibial vessels and the tibial nerve together, and flexor hallucis longus, each tendon in its own synovial sheath. BD remembers them as "Talented doctors are never hungry". The space is the tarsal tunnel; abductor hallucis arises from the retinaculum’s lower edge.',
      focus: [
        'flexor-retinaculum',
        'tibialis-posterior',
        'flexor-digitorum-longus',
        'vessels-nerve',
        'flexor-hallucis-longus',
        'tarsal-tunnel',
      ],
    },
    {
      id: 'pulse',
      title: 'Feeling the pulse',
      body: 'The posterior tibial pulse is felt against the calcaneus about 2 cm below and behind the medial malleolus. It is checked when a patient’s calves cramp on walking.',
      focus: ['at-ankle', 'pulse-site'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Switch gastrocnemius and soleus off, select the posterior tibial artery and tibial nerve, and follow them behind the medial malleolus into the sole.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'flexor-retinaculum-middle',
      prompt:
        'Under the flexor retinaculum, the structure between flexor digitorum longus and flexor hallucis longus is the:',
      options: [
        { id: 'vessels-nerve', text: 'Posterior tibial vessels and tibial nerve' },
        { id: 'tibialis-posterior', text: 'Tibialis posterior tendon' },
        { id: 'peroneal', text: 'Peroneal artery' },
        { id: 'sural', text: 'Sural nerve' },
      ],
      answerId: 'vessels-nerve',
      explanation:
        'Medial to lateral: tibialis posterior, flexor digitorum longus, artery and nerve, flexor hallucis longus.',
    },
    {
      id: 'posterior-tibial-largest-branch',
      prompt: 'The largest branch of the posterior tibial artery is the:',
      options: [
        { id: 'peroneal', text: 'Peroneal artery' },
        { id: 'circumflex-fibular', text: 'Circumflex fibular artery' },
        { id: 'nutrient', text: 'Nutrient artery of the tibia' },
        { id: 'medial-plantar', text: 'Medial plantar artery' },
      ],
      answerId: 'peroneal',
      explanation: 'It supplies the posterior and lateral compartments and the fibula.',
    },
    {
      id: 'posterior-tibial-ends',
      prompt: 'The posterior tibial artery ends by dividing into the:',
      options: [
        { id: 'plantar', text: 'Medial and lateral plantar arteries' },
        { id: 'peroneal-dorsalis', text: 'Peroneal and dorsalis pedis arteries' },
        { id: 'calcanean', text: 'Medial and lateral calcanean arteries' },
        { id: 'arcuate', text: 'Arcuate and lateral tarsal arteries' },
      ],
      answerId: 'plantar',
      explanation:
        'Under the flexor retinaculum, as the tibial nerve divides into the plantar nerves.',
    },
    {
      id: 'tarsal-tunnel-nerve',
      prompt: 'Tarsal tunnel syndrome is compression of the:',
      options: [
        { id: 'tibial', text: 'Tibial nerve' },
        { id: 'deep-peroneal', text: 'Deep peroneal nerve' },
        { id: 'sural', text: 'Sural nerve' },
        { id: 'saphenous', text: 'Saphenous nerve' },
      ],
      answerId: 'tibial',
      explanation: 'Under the flexor retinaculum; the pain and numbness spread into the sole.',
    },
  ],
  cards: [
    {
      id: 'flexor-retinaculum-card',
      front: 'Structures under the flexor retinaculum, medial to lateral?',
      back: 'Tibialis posterior, flexor digitorum longus, posterior tibial vessels, tibial nerve, flexor hallucis longus.',
    },
    {
      id: 'posterior-tibial-branches-card',
      front: 'Branches of the posterior tibial artery?',
      back: 'Peroneal (largest), circumflex fibular, muscular, nutrient to the tibia, communicating, malleolar, calcanean; terminal medial and lateral plantar.',
    },
    {
      id: 'tibial-nerve-leg-card',
      front: 'Branches of the tibial nerve in the leg?',
      back: 'Muscular to tibialis posterior, the long flexors and deep soleus; medial calcanean to the heel; articular to the ankle; terminal medial and lateral plantar nerves.',
    },
    {
      id: 'peroneal-artery-card',
      front: 'Course and importance of the peroneal artery?',
      back: 'From the posterior tibial 2.5 cm below popliteus, along the fibula, behind the ankle; supplies the posterior and lateral compartments; its perforating branch can replace the dorsalis pedis.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 9 Back of Leg', pages: '125, 130–133' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '620–622, 642' },
  ],
};
