import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  ANKLE_INSIDE,
  ANKLE_LATERAL,
  FOOT_BELOW,
  FOOT_LIGAMENTS,
  LOWER_LIMB_JOINTS_MODEL_CREDIT,
  LOWER_LIMB_JOINTS_MODEL_SRC,
  lowerLimbJointParts,
} from './lower-limb-joints-3d';

// Lower limb batch 7 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const footJoints: Topic = {
  slug: 'foot-joints',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Joints of the foot: inversion and eversion',
  summary:
    'The joints below the ankle that turn the sole in and out to meet uneven ground, the ligaments that bind them, and the muscles that move them.',
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
      'Volume 2, Chapter 12 Joints of Lower Limb: joints of the foot, pages 180 to 185',
    ),
    bookSource('grays-anatomy', 'Chapter 6 Lower Limb: joints of the foot, pages 636 to 639'),
    {
      title: 'Z-Anatomy',
      detail: 'Ligaments in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Inversion turns the sole to face medially, eversion laterally. They happen at the joints below the talus: the subtalar (talocalcanean) and talocalcaneonavicular joints, with the transverse tarsal joint.',
    'Subtalar joint: a plane synovial joint between the talus and calcaneus behind the sinus tarsi, whose interosseous talocalcanean ligament is the strongest bond between the two bones.',
    'Talocalcaneonavicular joint: a ball and socket, the head of the talus in a socket of the navicular, the calcaneus and the spring ligament stretched between them.',
    'Transverse tarsal (midtarsal) joint: the talonavicular part of the talocalcaneonavicular joint plus the saddle-shaped calcaneocuboid joint, crossing the foot in an S; the bifurcate and the long and short plantar ligaments bind it.',
    'Inversion: tibialis anterior and tibialis posterior. Eversion: peroneus longus and brevis, helped by peroneus tertius. Inversion has the greater range, and inversion injuries are the commoner.',
  ],
  visual: {
    kind: 'path',
    // Left: the joints. Right: their ligaments. Bottom: the two movements and their muscles.
    diagram: {
      width: 360,
      height: 470,
      nodes: [
        {
          id: 'foot-joints',
          label: 'Joints of\nthe foot',
          name: 'Joints of the foot below the ankle',
          x: 180,
          y: 30,
        },
        {
          id: 'subtalar-joint',
          label: 'Subtalar',
          name: 'Subtalar (talocalcanean) joint: plane synovial',
          x: 80,
          y: 100,
        },
        {
          id: 'talocalcaneonavicular-joint',
          label: 'Talocalcaneo-\nnavicular',
          name: 'Talocalcaneonavicular joint: ball and socket',
          x: 80,
          y: 165,
        },
        {
          id: 'calcaneocuboid-joint',
          label: 'Calcaneo-\ncuboid',
          name: 'Calcaneocuboid joint: saddle',
          x: 80,
          y: 230,
        },
        {
          id: 'transverse-tarsal-joint',
          label: 'Transverse\ntarsal',
          name: 'Transverse tarsal (midtarsal) joint: talonavicular and calcaneocuboid',
          x: 80,
          y: 295,
        },
        {
          id: 'interosseous-talocalcanean-ligament',
          label: 'Interosseous\nligament',
          name: 'Interosseous talocalcanean ligament, in the sinus tarsi',
          x: 270,
          y: 100,
        },
        {
          id: 'spring-ligament',
          label: 'Spring\nligament',
          name: 'Spring ligament, under the head of the talus',
          x: 270,
          y: 165,
        },
        {
          id: 'bifurcate-ligament',
          label: 'Bifurcate\nligament',
          name: 'Bifurcate ligament, across the transverse tarsal joint',
          x: 270,
          y: 230,
        },
        {
          id: 'long-plantar-ligament',
          label: 'Long\nplantar',
          name: 'Long plantar ligament',
          x: 270,
          y: 295,
        },
        {
          id: 'short-plantar-ligament',
          label: 'Short\nplantar',
          name: 'Short plantar ligament',
          x: 270,
          y: 360,
        },
        {
          id: 'inversion',
          label: 'Inversion:\ntibialis ant\nand post',
          name: 'Inversion: tibialis anterior and tibialis posterior',
          x: 95,
          y: 430,
        },
        {
          id: 'eversion',
          label: 'Eversion:\nperoneus\nlongus, brevis',
          name: 'Eversion: peroneus longus and brevis, with peroneus tertius',
          x: 270,
          y: 430,
        },
      ],
      edges: [
        { from: 'foot-joints', to: 'subtalar-joint' },
        { from: 'foot-joints', to: 'talocalcaneonavicular-joint' },
        { from: 'foot-joints', to: 'calcaneocuboid-joint' },
        { from: 'talocalcaneonavicular-joint', to: 'transverse-tarsal-joint' },
        { from: 'calcaneocuboid-joint', to: 'transverse-tarsal-joint' },
        { from: 'subtalar-joint', to: 'interosseous-talocalcanean-ligament' },
        { from: 'talocalcaneonavicular-joint', to: 'spring-ligament' },
        { from: 'transverse-tarsal-joint', to: 'bifurcate-ligament' },
        { from: 'calcaneocuboid-joint', to: 'long-plantar-ligament' },
        { from: 'calcaneocuboid-joint', to: 'short-plantar-ligament' },
        { from: 'transverse-tarsal-joint', to: 'inversion' },
        { from: 'transverse-tarsal-joint', to: 'eversion' },
      ],
    },
    lesions: [
      {
        id: 'inversion-injury',
        label: 'Inversion injury',
        nodeIds: ['inversion', 'subtalar-joint'],
        explanation:
          'Inversion has the greater range and comes with plantar flexion, when the ankle is loosest, so turning the foot in on rough ground is the common injury: the lateral ligaments of the ankle and foot are sprained.',
      },
      {
        id: 'spring-flat-foot',
        label: 'Flat foot',
        nodeIds: ['spring-ligament', 'talocalcaneonavicular-joint'],
        explanation:
          'If the spring ligament stretches, the head of the talus sinks between the calcaneus and the navicular and the medial arch falls.',
      },
      {
        id: 'club-foot-joints',
        label: 'Club foot',
        nodeIds: ['inversion', 'talocalcaneonavicular-joint'],
        explanation:
          'In talipes equinovarus the foot is held plantar flexed and inverted, with the forefoot drawn in, at these same joints.',
      },
    ],
    drill: [
      {
        id: 'foot-joint-names',
        title: 'The joints',
        hint: 'Below the talus, then the joint across the middle of the foot.',
        nodeIds: [
          'subtalar-joint',
          'talocalcaneonavicular-joint',
          'calcaneocuboid-joint',
          'transverse-tarsal-joint',
        ],
      },
      {
        id: 'foot-ligaments-movements',
        title: 'Ligaments and movements',
        hint: 'One ligament for each joint, two in the sole; then inversion and eversion.',
        nodeIds: [
          'interosseous-talocalcanean-ligament',
          'spring-ligament',
          'bifurcate-ligament',
          'long-plantar-ligament',
          'short-plantar-ligament',
          'inversion',
          'eversion',
        ],
      },
    ],
    model3d: {
      src: LOWER_LIMB_JOINTS_MODEL_SRC,
      credit: LOWER_LIMB_JOINTS_MODEL_CREDIT,
      parts: lowerLimbJointParts([...FOOT_LIGAMENTS, 'deltoid-ligament']),
      traces: [],
      stops: [
        {
          ...ANKLE_LATERAL,
          title: 'The sinus tarsi',
          description:
            'From the lateral side: the interosseous talocalcanean ligament in the tunnel between the talus and calcaneus, and the bifurcate ligament on the dorsum.',
        },
        {
          ...ANKLE_INSIDE,
          title: 'Under the head of the talus',
          description:
            'From the medial side: the spring ligament slung from the sustentaculum tali to the navicular, holding up the head of the talus.',
        },
        FOOT_BELOW,
      ],
    },
  },
  lesson: [
    {
      id: 'why',
      title: 'Why the foot turns',
      body: 'The ankle only hinges up and down. To meet sloping or uneven ground the sole must also turn in (inversion) and out (eversion). These movements happen below the talus: at the subtalar and talocalcaneonavicular joints, with the transverse tarsal joint across the middle of the foot.',
      focus: ['foot-joints', 'inversion', 'eversion'],
    },
    {
      id: 'subtalar',
      title: 'The subtalar joint',
      body: 'Between the back of the underside of the talus and the calcaneus: a plane synovial joint. In front of it the sinus tarsi runs between the two bones, holding the interosseous talocalcanean ligament, the strongest bond between them.',
      focus: ['subtalar-joint', 'interosseous-talocalcanean-ligament'],
    },
    {
      id: 'talocalcaneonavicular',
      title: 'The talocalcaneonavicular joint',
      body: 'A ball and socket: the head of the talus sits in a socket made by the back of the navicular, the front of the calcaneus, and between them the spring ligament, which holds the head up from below and so supports the medial arch.',
      focus: ['talocalcaneonavicular-joint', 'spring-ligament'],
    },
    {
      id: 'transverse-tarsal',
      title: 'The transverse tarsal joint',
      body: 'Two joints in a line across the foot: the talonavicular part of the talocalcaneonavicular joint and the saddle-shaped calcaneocuboid joint. The bifurcate ligament crosses it on the dorsum; the long and short plantar ligaments bind the calcaneocuboid part from below. It lets the forefoot turn on the hindfoot.',
      focus: [
        'transverse-tarsal-joint',
        'calcaneocuboid-joint',
        'bifurcate-ligament',
        'long-plantar-ligament',
        'short-plantar-ligament',
      ],
    },
    {
      id: 'movements',
      title: 'Inversion and eversion',
      body: 'Inversion, by tibialis anterior and tibialis posterior with help from the long flexors, has the greater range. Eversion is by peroneus longus and brevis, helped by peroneus tertius. Further forward, the metatarsophalangeal joints are condyloid and the interphalangeal joints hinges.',
      focus: ['inversion', 'eversion'],
    },
    {
      id: 'clinical',
      title: 'Clinical points',
      body: 'Inversion injuries are commoner than eversion ones, because inversion goes with plantar flexion, when the ankle is loosest. A stretched spring ligament lets the head of the talus sink and the arch fall (flat foot). Club foot fixes the foot inverted and plantar flexed.',
      focus: ['inversion', 'spring-ligament'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'Look into the sinus tarsi from the lateral side, then turn underneath to see the spring ligament and the long and short plantar ligaments.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'inversion-eversion-site',
      prompt: 'Inversion and eversion of the foot take place mainly at the:',
      options: [
        { id: 'subtalar', text: 'Subtalar and talocalcaneonavicular joints' },
        { id: 'ankle', text: 'Ankle joint' },
        { id: 'tarsometatarsal', text: 'Tarsometatarsal joints' },
        { id: 'mtp', text: 'Metatarsophalangeal joints' },
      ],
      answerId: 'subtalar',
      explanation: 'With the transverse tarsal joint; the ankle only hinges.',
    },
    {
      id: 'tcn-joint-type',
      prompt: 'The talocalcaneonavicular joint is of which type?',
      options: [
        { id: 'ball', text: 'Ball and socket' },
        { id: 'hinge', text: 'Hinge' },
        { id: 'plane', text: 'Plane' },
        { id: 'saddle', text: 'Saddle' },
      ],
      answerId: 'ball',
      explanation:
        'The head of the talus in the socket of the navicular, calcaneus and spring ligament; the calcaneocuboid is the saddle.',
    },
    {
      id: 'chief-evertors',
      prompt: 'The chief evertors of the foot are:',
      options: [
        { id: 'peronei', text: 'Peroneus longus and brevis' },
        { id: 'tibiales', text: 'Tibialis anterior and posterior' },
        { id: 'calf', text: 'Gastrocnemius and soleus' },
        { id: 'extensors', text: 'Extensor hallucis and digitorum longus' },
      ],
      answerId: 'peronei',
      explanation: 'The two tibiales invert.',
    },
    {
      id: 'transverse-tarsal-parts',
      prompt: 'The transverse tarsal joint is made up of the:',
      options: [
        { id: 'tn-cc', text: 'Talonavicular and calcaneocuboid joints' },
        { id: 'subtalar-cc', text: 'Subtalar and calcaneocuboid joints' },
        { id: 'tn-cn', text: 'Talonavicular and cuneonavicular joints' },
        { id: 'ankle-subtalar', text: 'Ankle and subtalar joints' },
      ],
      answerId: 'tn-cc',
      explanation: 'A line across the middle of the foot.',
    },
  ],
  cards: [
    {
      id: 'foot-inversion-joints-card',
      front: 'Where do inversion and eversion occur?',
      back: 'Mainly at the subtalar and talocalcaneonavicular joints, with the transverse tarsal joint (talonavicular plus calcaneocuboid).',
    },
    {
      id: 'tcn-joint-card',
      front: 'Talocalcaneonavicular joint?',
      back: 'Ball and socket: the head of the talus in a socket of the navicular, calcaneus and spring ligament.',
    },
    {
      id: 'invertors-evertors-card',
      front: 'Invertors and evertors of the foot?',
      back: 'Invertors: tibialis anterior and tibialis posterior. Evertors: peroneus longus and brevis, helped by peroneus tertius.',
    },
    {
      id: 'spring-ligament-joint-card',
      front: 'Spring ligament?',
      back: 'Plantar calcaneonavicular ligament, from the sustentaculum tali to the navicular: holds up the head of the talus as part of its socket; supports the medial arch.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 12 Joints of Lower Limb',
      pages: '180–185',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '636–639' },
  ],
};
