import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  LEG_FOOT_BONES,
  LEG_FOOT_MODEL_CREDIT,
  LEG_FOOT_MODEL_SRC,
  legFootParts,
  SOLE_BELOW,
  SOLE_LAYER_1,
} from './leg-foot-3d';

// Lower limb batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const soleSkinFascia: Topic = {
  slug: 'sole-skin-fascia',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Sole of foot: skin, fasciae and plantar aponeurosis',
  summary:
    'Why the sole is built like the palm but for standing: its skin and nerves, the fat cushions, the plantar aponeurosis and the fibrous sheaths of the toes.',
  estimatedMinutes: 9,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 10 Sole of Foot, pages 135 to 137'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: plantar aponeurosis and fibrous sheaths, pages 644 and 645',
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
    'The skin of the sole, like that of the palm, is thick, creased and tied down to the aponeurosis for grip. Medial calcanean branches supply the heel, the medial plantar nerve the medial three and a half toes, the lateral plantar the lateral one and a half.',
    'Its segments are L4, L5 and S1; the plantar reflex is tested on the S1 area.',
    'The superficial fascia is dense: fibrous bands divide its fat into small cushions, thickest under the weight-bearing points.',
    'Plantar aponeurosis: the thick centre of the deep fascia, apex on the medial tubercle of the calcaneus, base splitting into five slips for the toes; thought to be the detached lower part of plantaris.',
    'Its septa make three compartments and four layers of muscles; it fixes the skin, protects, helps hold the longitudinal arches and gives origin to the first layer.',
  ],
  visual: {
    kind: 'path',
    // Skin and its nerves, superficial fascia, the aponeurosis, other deep fascia, functions.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        { id: 'skin', label: 'Skin', name: 'Skin of the sole and its nerves', x: 50, y: 30 },
        {
          id: 'heel-branches',
          label: 'Heel',
          name: 'Medial calcanean branches of the tibial nerve, to the heel',
          x: 145,
          y: 30,
        },
        {
          id: 'medial-plantar-nerve',
          label: 'Medial\nplantar',
          name: 'Medial plantar nerve: medial sole and medial three and a half toes',
          x: 225,
          y: 30,
        },
        {
          id: 'lateral-plantar-nerve',
          label: 'Lateral\nplantar',
          name: 'Lateral plantar nerve: lateral sole and lateral one and a half toes',
          x: 305,
          y: 30,
        },
        {
          id: 'superficial-fascia',
          label: 'Super-\nficial',
          name: 'Superficial fascia',
          x: 50,
          y: 110,
        },
        {
          id: 'fat-cushions',
          label: 'Fat\ncushions',
          name: 'Fibrous bands divide the fat into small cushions',
          x: 145,
          y: 110,
        },
        {
          id: 'weight-points',
          label: 'Weight\npoints',
          name: 'Thickest over the weight-bearing points',
          x: 225,
          y: 110,
        },
        {
          id: 'aponeurosis',
          label: 'Plantar\naponeurosis',
          name: 'Plantar aponeurosis',
          x: 50,
          y: 186,
        },
        {
          id: 'apex',
          label: 'Apex',
          name: 'Apex on the medial tubercle of the calcaneus',
          x: 145,
          y: 186,
        },
        {
          id: 'five-slips',
          label: 'Five\nslips',
          name: 'Base divides into five slips for the toes',
          x: 225,
          y: 186,
        },
        {
          id: 'septa',
          label: 'Septa',
          name: 'Medial and lateral septa make three compartments',
          x: 305,
          y: 186,
        },
        { id: 'deep-fascia', label: 'Deep\nfascia', name: 'Other deep fascia', x: 50, y: 262 },
        {
          id: 'metatarsal-ligaments',
          label: 'Metatarsal\nligaments',
          name: 'Deep transverse metatarsal ligaments',
          x: 145,
          y: 262,
        },
        {
          id: 'flexor-sheaths',
          label: 'Flexor\nsheaths',
          name: 'Fibrous flexor sheaths of the toes',
          x: 225,
          y: 262,
        },
        { id: 'functions', label: 'Functions', name: 'What the aponeurosis does', x: 50, y: 340 },
        {
          id: 'protects',
          label: 'Protects',
          name: 'Fixes the skin and protects deeper structures',
          x: 145,
          y: 340,
        },
        {
          id: 'arches',
          label: 'Arches',
          name: 'Helps keep the longitudinal arches',
          x: 225,
          y: 340,
        },
        {
          id: 'first-layer',
          label: 'First\nlayer',
          name: 'Gives origin to the first layer of muscles',
          x: 305,
          y: 340,
        },
      ],
      edges: [
        { from: 'skin', to: 'heel-branches' },
        { from: 'skin', to: 'medial-plantar-nerve' },
        { from: 'skin', to: 'lateral-plantar-nerve' },
        { from: 'superficial-fascia', to: 'fat-cushions' },
        { from: 'superficial-fascia', to: 'weight-points' },
        { from: 'aponeurosis', to: 'apex' },
        { from: 'aponeurosis', to: 'five-slips' },
        { from: 'aponeurosis', to: 'septa' },
        { from: 'deep-fascia', to: 'metatarsal-ligaments' },
        { from: 'deep-fascia', to: 'flexor-sheaths' },
        { from: 'functions', to: 'protects' },
        { from: 'functions', to: 'arches' },
        { from: 'functions', to: 'first-layer' },
      ],
    },
    lesions: [
      {
        id: 'plantar-fasciitis',
        label: 'Plantar fasciitis',
        nodeIds: ['aponeurosis', 'apex'],
        explanation:
          'Long hours on the feet, as for a policeman, strain the aponeurosis where it leaves the calcaneus: the heel hurts, worst on standing.',
      },
      {
        id: 'plantar-reflex',
        label: 'Plantar reflex',
        nodeIds: ['skin', 'lateral-plantar-nerve'],
        explanation:
          'Stroking the lateral part of the sole (S1) normally curls the toes down. A big toe that goes up instead points to damage of the motor pathway in the brain or spinal cord.',
      },
    ],
    drill: [
      {
        id: 'sole-skin',
        title: 'Skin and superficial fascia',
        hint: 'Three nerves for the skin, then what the superficial fascia does.',
        nodeIds: [
          'heel-branches',
          'medial-plantar-nerve',
          'lateral-plantar-nerve',
          'fat-cushions',
          'weight-points',
        ],
      },
      {
        id: 'plantar-aponeurosis',
        title: 'Deep fascia',
        hint: 'The aponeurosis from apex to slips, the other deep fascia, and its jobs.',
        nodeIds: [
          'apex',
          'five-slips',
          'septa',
          'metatarsal-ligaments',
          'flexor-sheaths',
          'protects',
          'arches',
          'first-layer',
        ],
      },
    ],
    model3d: {
      src: LEG_FOOT_MODEL_SRC,
      credit: `${LEG_FOOT_MODEL_CREDIT} The aponeurosis and fascia are not in the model.`,
      parts: legFootParts([
        ...LEG_FOOT_BONES,
        ...SOLE_LAYER_1,
        'posterior-tibial-artery',
        'medial-plantar-artery',
        'lateral-plantar-artery',
        'tibial-nerve',
        'medial-plantar-nerve',
        'lateral-plantar-nerve',
      ]),
      traces: [],
      stops: [
        SOLE_BELOW,
        {
          id: 'heel',
          title: 'Heel',
          description:
            'From behind and below: the medial tubercle of the calcaneus, where the aponeurosis and the first layer arise, and the heel pad over it.',
          target: [-75, -60, -55],
          position: [-100, 380, -400],
        },
        {
          id: 'medial-border',
          title: 'Medial border',
          description:
            'The plantar vessels and nerves enter the sole from behind the medial malleolus, under abductor hallucis.',
          target: [-70, -110, -40],
          position: [520, -200, -260],
        },
        {
          id: 'toes',
          title: 'Towards the toes',
          description:
            'The digital nerves and vessels come forwards between the slips of the aponeurosis to the toes.',
          target: [-95, -200, -55],
          position: [-120, -560, -380],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'palm-and-sole',
      title: 'Built for standing',
      body: 'The sole is laid out like the palm, but the foot carries weight and walks: the big toe has given up grasping, the lesser toes are small, and the tarsal bones and first metatarsal are big to make a broad base. Its arches act as springs.',
      focus: [],
    },
    {
      id: 'skin',
      title: 'Skin',
      body: 'Thick, creased and firmly tied to the aponeurosis, which improves grip. Medial calcanean branches of the tibial nerve supply the heel; the medial plantar nerve the larger front medial part with the medial three and a half toes; the lateral plantar nerve the lateral part with the lateral one and a half; the saphenous and sural nerves small strips at the borders. The segments are L4, L5 and S1.',
      focus: ['skin', 'heel-branches', 'medial-plantar-nerve', 'lateral-plantar-nerve'],
    },
    {
      id: 'superficial',
      title: 'Superficial fascia',
      body: 'Fibrous bands tie the skin to the aponeurosis and divide the fat into small tight pockets that act as water cushions and add to the spring of the arches. It is thickest under the weight-bearing points and carries the cutaneous nerves and vessels.',
      focus: ['superficial-fascia', 'fat-cushions', 'weight-points'],
    },
    {
      id: 'aponeurosis',
      title: 'Plantar aponeurosis',
      body: 'The deep fascia is thick in the centre and thin at the sides. The central part is a triangle with its apex on the medial tubercle of the calcaneus and its base dividing into five slips near the metatarsal heads; each slip splits round the flexor tendons and blends with the fibrous sheaths and the deep transverse metatarsal ligaments, and digital nerves and vessels come out between them. Unlike the palmar aponeurosis it sends a slip to the big toe. Septa from its margins divide the sole into three compartments.',
      focus: ['aponeurosis', 'apex', 'five-slips', 'septa'],
    },
    {
      id: 'deep-fascia',
      title: 'Other deep fascia',
      body: 'Deep transverse metatarsal ligaments join the plantar ligaments of neighbouring toe joints, with the interossei above and the lumbricals and digital vessels below. Fibrous flexor sheaths, like those of the fingers, hold the flexor tendons against the toes.',
      focus: ['deep-fascia', 'metatarsal-ligaments', 'flexor-sheaths'],
    },
    {
      id: 'functions',
      title: 'What it does',
      body: 'It fixes the skin, protects the deeper vessels and nerves, helps hold up the longitudinal arches like a tie beam, and gives origin to the muscles of the first layer.',
      focus: ['functions', 'protects', 'arches', 'first-layer'],
    },
    {
      id: 'explore',
      title: 'Look underneath',
      body: 'Turn the foot to look at the sole, then select the plantar nerves and follow them in from behind the medial malleolus.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'aponeurosis-apex',
      prompt: 'The apex of the plantar aponeurosis is attached to the:',
      options: [
        { id: 'medial-tubercle', text: 'Medial tubercle of the calcaneus' },
        { id: 'lateral-tubercle', text: 'Lateral tubercle of the calcaneus' },
        { id: 'navicular', text: 'Tuberosity of the navicular' },
        { id: 'metatarsal-heads', text: 'Heads of the metatarsals' },
      ],
      answerId: 'medial-tubercle',
      explanation: 'Its base divides into five slips near the metatarsal heads.',
    },
    {
      id: 'sole-lateral-toes',
      prompt: 'The skin of the lateral one and a half toes on the sole is supplied by the:',
      options: [
        { id: 'lateral-plantar', text: 'Lateral plantar nerve' },
        { id: 'medial-plantar', text: 'Medial plantar nerve' },
        { id: 'sural', text: 'Sural nerve' },
        { id: 'deep-peroneal', text: 'Deep peroneal nerve' },
      ],
      answerId: 'lateral-plantar',
      explanation:
        'The medial plantar takes the medial three and a half, as the median does in the hand.',
    },
    {
      id: 'plantar-aponeurosis-origin',
      prompt: 'The plantar aponeurosis is regarded as the detached tendon of:',
      options: [
        { id: 'plantaris', text: 'Plantaris' },
        { id: 'gastrocnemius', text: 'Gastrocnemius' },
        { id: 'fdl', text: 'Flexor digitorum longus' },
        { id: 'soleus', text: 'Soleus' },
      ],
      answerId: 'plantaris',
      explanation: 'Separated from the rest of the muscle as the heel grew larger.',
    },
    {
      id: 'heel-pain-standing',
      prompt: 'Heel pain that is worst on standing, in someone who stands all day, suggests:',
      options: [
        { id: 'fasciitis', text: 'Plantar fasciitis' },
        { id: 'march', text: 'March fracture' },
        { id: 'morton', text: 'Morton’s neuroma' },
        { id: 'tarsal', text: 'Tarsal tunnel syndrome' },
      ],
      answerId: 'fasciitis',
      explanation: 'A strain of the aponeurosis at its attachment to the calcaneus.',
    },
  ],
  cards: [
    {
      id: 'sole-skin-nerves-card',
      front: 'Nerves supplying the skin of the sole?',
      back: 'Medial calcanean (heel), medial plantar (medial three and a half toes), lateral plantar (lateral one and a half), with small strips from the saphenous and sural.',
    },
    {
      id: 'plantar-aponeurosis-card',
      front: 'Shape and attachments of the plantar aponeurosis?',
      back: 'A triangle: apex on the medial tubercle of the calcaneus, base splitting into five slips that blend with the fibrous flexor sheaths and deep transverse metatarsal ligaments.',
    },
    {
      id: 'plantar-aponeurosis-functions-card',
      front: 'Functions of the plantar aponeurosis?',
      back: 'Fixes the skin, protects deeper structures, helps hold the longitudinal arches, gives origin to the first layer of muscles.',
    },
    {
      id: 'sole-deep-fascia-card',
      front: 'What does the deep fascia of the sole form?',
      back: 'The plantar aponeurosis, the deep transverse metatarsal ligaments and the fibrous flexor sheaths of the toes.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 10 Sole of Foot', pages: '135–137' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '644–645' },
  ],
};
