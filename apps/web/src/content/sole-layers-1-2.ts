import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  LEG_FOOT_BONES,
  LEG_FOOT_MODEL_CREDIT,
  LEG_FOOT_MODEL_SRC,
  legFootParts,
  SOLE_BELOW,
  SOLE_LAYER_1,
  SOLE_LAYER_2,
} from './leg-foot-3d';

// Lower limb batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const soleLayersOneTwo: Topic = {
  slug: 'sole-layers-1-2',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Sole of foot: first and second layers of muscles',
  summary:
    'The three muscles of the first layer from the heel, and the long flexor tendons of the second layer with flexor accessorius and the lumbricals.',
  estimatedMinutes: 11,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 10 Sole of Foot, pages 137 to 141'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: first and second layers of the sole, pages 648 and 649',
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
    'First layer, medial to lateral: abductor hallucis, flexor digitorum brevis and abductor digiti minimi, all from the calcaneus.',
    'Flexor digitorum brevis splits to let the long flexor tendon through and inserts on the middle phalanges of the lateral four toes, like flexor digitorum superficialis in the hand.',
    'Second layer: the tendons of flexor hallucis longus and flexor digitorum longus, with flexor accessorius pulling on the long tendon and four lumbricals arising from it.',
    'Lumbricals insert into the extensor expansions and keep the toes straight so they do not buckle in walking.',
    'Medial plantar nerve: abductor hallucis, flexor digitorum brevis and the first lumbrical. Lateral plantar nerve: abductor digiti minimi, flexor accessorius and the other three lumbricals.',
  ],
  visual: {
    kind: 'path',
    // The first layer and its origin, the second layer, the lumbricals and the two nerves.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        { id: 'first-layer', label: 'First\nlayer', name: 'First layer', x: 50, y: 30 },
        {
          id: 'abductor-hallucis',
          label: 'Abductor\nhallucis',
          name: 'Abductor hallucis, along the medial border',
          x: 145,
          y: 30,
        },
        {
          id: 'flexor-digitorum-brevis',
          label: 'Flexor\nbrevis',
          name: 'Flexor digitorum brevis, in the middle',
          x: 225,
          y: 30,
        },
        {
          id: 'abductor-digiti-minimi',
          label: 'Abductor\nminimi',
          name: 'Abductor digiti minimi, along the lateral border',
          x: 305,
          y: 30,
        },
        { id: 'origin', label: 'Origin', name: 'Where the first layer arises', x: 50, y: 110 },
        {
          id: 'calcaneus',
          label: 'Calcaneus',
          name: 'Tubercles of the calcaneus',
          x: 145,
          y: 110,
        },
        {
          id: 'aponeurosis',
          label: 'Aponeurosis',
          name: 'Plantar aponeurosis and septa',
          x: 225,
          y: 110,
        },
        {
          id: 'split-tendons',
          label: 'Split\ntendons',
          name: 'Flexor digitorum brevis splits round the long tendons to the middle phalanges',
          x: 308,
          y: 110,
        },
        { id: 'second-layer', label: 'Second\nlayer', name: 'Second layer', x: 50, y: 186 },
        {
          id: 'flexor-digitorum-longus',
          label: 'Flexor\ndigitorum',
          name: 'Tendon of flexor digitorum longus',
          x: 145,
          y: 186,
        },
        {
          id: 'flexor-hallucis-longus',
          label: 'Flexor\nhallucis',
          name: 'Tendon of flexor hallucis longus, crossed by it',
          x: 225,
          y: 186,
        },
        {
          id: 'flexor-accessorius',
          label: 'Accessorius',
          name: 'Flexor digitorum accessorius, into the long tendon',
          x: 305,
          y: 186,
        },
        { id: 'lumbricals', label: 'Lumbricals', name: 'Four lumbricals', x: 50, y: 262 },
        {
          id: 'lumbrical-origin',
          label: 'From long\ntendons',
          name: 'Arise from the tendons of flexor digitorum longus',
          x: 145,
          y: 262,
        },
        {
          id: 'lumbrical-action',
          label: 'Keep toes\nstraight',
          name: 'Insert into the extensor expansions and keep the toes from buckling',
          x: 225,
          y: 262,
        },
        { id: 'supply', label: 'Nerves', name: 'Nerve supply', x: 50, y: 340 },
        {
          id: 'medial-plantar-nerve',
          label: 'Medial\nplantar',
          name: 'Medial plantar: abductor hallucis, flexor digitorum brevis, first lumbrical',
          x: 145,
          y: 340,
        },
        {
          id: 'lateral-plantar-nerve',
          label: 'Lateral\nplantar',
          name: 'Lateral plantar: abductor digiti minimi, flexor accessorius, other lumbricals',
          x: 225,
          y: 340,
        },
      ],
      edges: [
        { from: 'first-layer', to: 'abductor-hallucis' },
        { from: 'first-layer', to: 'flexor-digitorum-brevis' },
        { from: 'first-layer', to: 'abductor-digiti-minimi' },
        { from: 'origin', to: 'calcaneus' },
        { from: 'origin', to: 'aponeurosis' },
        { from: 'origin', to: 'split-tendons' },
        { from: 'second-layer', to: 'flexor-digitorum-longus' },
        { from: 'second-layer', to: 'flexor-hallucis-longus' },
        { from: 'second-layer', to: 'flexor-accessorius' },
        { from: 'lumbricals', to: 'lumbrical-origin' },
        { from: 'lumbricals', to: 'lumbrical-action' },
        { from: 'supply', to: 'medial-plantar-nerve' },
        { from: 'supply', to: 'lateral-plantar-nerve' },
      ],
    },
    lesions: [
      {
        id: 'claw-toes',
        label: 'Claw toes',
        nodeIds: ['lumbricals', 'lumbrical-action'],
        explanation:
          'When the lumbricals and interossei are weak, for instance after lateral plantar nerve injury, the long flexors and extensors pull the toes into claws: bent up at the base and curled down beyond.',
      },
      {
        id: 'plantar-nerve-entry',
        label: 'Entrapment at the heel',
        nodeIds: ['abductor-hallucis', 'medial-plantar-nerve', 'lateral-plantar-nerve'],
        explanation:
          'The plantar nerves enter the sole under abductor hallucis just past the flexor retinaculum; pressed there they give burning pain and numbness in the sole.',
      },
    ],
    drill: [
      {
        id: 'sole-layer-one',
        title: 'First layer',
        hint: 'Three muscles from medial to lateral, where they arise, and the split tendons.',
        nodeIds: [
          'abductor-hallucis',
          'flexor-digitorum-brevis',
          'abductor-digiti-minimi',
          'calcaneus',
          'aponeurosis',
          'split-tendons',
        ],
      },
      {
        id: 'sole-layer-two',
        title: 'Second layer and nerves',
        hint: 'Two long tendons and two muscles on them; then which nerve supplies what.',
        nodeIds: [
          'flexor-digitorum-longus',
          'flexor-hallucis-longus',
          'flexor-accessorius',
          'lumbrical-origin',
          'lumbrical-action',
          'medial-plantar-nerve',
          'lateral-plantar-nerve',
        ],
      },
    ],
    model3d: {
      src: LEG_FOOT_MODEL_SRC,
      credit: LEG_FOOT_MODEL_CREDIT,
      parts: legFootParts([
        ...LEG_FOOT_BONES,
        ...SOLE_LAYER_1,
        ...SOLE_LAYER_2,
        'medial-plantar-artery',
        'lateral-plantar-artery',
        'medial-plantar-nerve',
        'lateral-plantar-nerve',
      ]),
      traces: [],
      stops: [
        SOLE_BELOW,
        {
          id: 'medial',
          title: 'Medial border',
          description:
            'Abductor hallucis runs along the medial border from the heel to the big toe, over the plantar vessels and nerves.',
          target: [-70, -110, -40],
          position: [520, -200, -260],
        },
        {
          id: 'lateral',
          title: 'Lateral border',
          description: 'Abductor digiti minimi runs along the lateral border to the little toe.',
          target: [-100, -110, -40],
          position: [-640, -200, -260],
        },
        {
          id: 'second-layer',
          title: 'Second layer',
          description:
            'Switch the first layer off in Layers: the long flexor tendons cross, flexor accessorius pulls on the long tendon, and the lumbricals arise from it.',
          target: [-85, -130, -45],
          position: [-60, -420, -640],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'layers',
      title: 'Four layers',
      body: 'Septa from the plantar aponeurosis divide the muscles of the sole into four layers, counted from the surface. The first two lie in the length of the foot from the heel; the deeper two are in the forefoot.',
      focus: [],
    },
    {
      id: 'first',
      title: 'First layer',
      body: 'Abductor hallucis runs along the medial border from the medial tubercle of the calcaneus and flexor retinaculum to the base of the big toe, covering the vessels and nerves as they enter. Flexor digitorum brevis, in the middle under the aponeurosis, splits at each toe for the long flexor tendon and inserts on the middle phalanx, as flexor digitorum superficialis does in the hand. Abductor digiti minimi runs along the lateral border from both tubercles to the little toe.',
      focus: [
        'first-layer',
        'abductor-hallucis',
        'flexor-digitorum-brevis',
        'abductor-digiti-minimi',
        'origin',
        'calcaneus',
        'aponeurosis',
        'split-tendons',
      ],
    },
    {
      id: 'second',
      title: 'Second layer',
      body: 'The tendon of flexor hallucis longus runs forwards from under the sustentaculum tali to the big toe; the tendon of flexor digitorum longus crosses below it and divides into four for the lateral toes. Flexor accessorius, from two heads on the calcaneus, joins the long tendon and straightens its oblique pull.',
      focus: [
        'second-layer',
        'flexor-digitorum-longus',
        'flexor-hallucis-longus',
        'flexor-accessorius',
      ],
    },
    {
      id: 'lumbricals',
      title: 'Lumbricals',
      body: 'Four small muscles arise from the tendons of flexor digitorum longus, the first from one tendon, the others from two, pass on the medial side of each lateral toe and insert into its extensor expansion. They keep the toes straight at the interphalangeal joints so that they grip the ground instead of buckling.',
      focus: ['lumbricals', 'lumbrical-origin', 'lumbrical-action'],
    },
    {
      id: 'nerves',
      title: 'Nerves',
      body: 'The medial plantar nerve supplies abductor hallucis, flexor digitorum brevis and the first lumbrical; the lateral plantar nerve supplies abductor digiti minimi and flexor accessorius from its trunk and the other three lumbricals from its deep branch. The two long flexors belong to the calf and the tibial nerve.',
      focus: ['supply', 'medial-plantar-nerve', 'lateral-plantar-nerve'],
    },
    {
      id: 'explore',
      title: 'Peel it yourself',
      body: 'Look at the sole, select each first-layer muscle, then switch them off to see the long tendons and lumbricals beneath.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'second-layer-not',
      prompt: 'Which belongs to the second layer of the sole?',
      options: [
        { id: 'accessorius', text: 'Flexor digitorum accessorius' },
        { id: 'fdb', text: 'Flexor digitorum brevis' },
        { id: 'fhb', text: 'Flexor hallucis brevis' },
        { id: 'adductor', text: 'Adductor hallucis' },
      ],
      answerId: 'accessorius',
      explanation:
        'With the lumbricals and the two long flexor tendons. Flexor digitorum brevis is first layer; the other two are third.',
    },
    {
      id: 'fdb-insertion',
      prompt: 'Flexor digitorum brevis is inserted into the:',
      options: [
        { id: 'middle', text: 'Middle phalanges of the lateral four toes' },
        { id: 'distal', text: 'Distal phalanges of the lateral four toes' },
        { id: 'proximal', text: 'Proximal phalanges of the lateral four toes' },
        { id: 'expansions', text: 'Extensor expansions' },
      ],
      answerId: 'middle',
      explanation: 'Each tendon splits to let the long flexor tendon pass to the distal phalanx.',
    },
    {
      id: 'first-lumbrical-nerve',
      prompt: 'The first lumbrical of the foot is supplied by the:',
      options: [
        { id: 'medial-plantar', text: 'Medial plantar nerve' },
        { id: 'lateral-deep', text: 'Deep branch of the lateral plantar nerve' },
        { id: 'tibial', text: 'Tibial nerve' },
        { id: 'deep-peroneal', text: 'Deep peroneal nerve' },
      ],
      answerId: 'medial-plantar',
      explanation: 'The other three by the deep branch of the lateral plantar nerve.',
    },
    {
      id: 'accessorius-action',
      prompt: 'Flexor digitorum accessorius:',
      options: [
        { id: 'straightens', text: 'Straightens the pull of the long flexor tendons' },
        { id: 'abducts', text: 'Abducts the little toe' },
        { id: 'extends', text: 'Extends the interphalangeal joints' },
        { id: 'arch', text: 'Holds up the transverse arch' },
      ],
      answerId: 'straightens',
      explanation:
        'The tendon of flexor digitorum longus enters the sole obliquely; accessorius pulls it in line.',
    },
  ],
  cards: [
    {
      id: 'sole-first-layer-card',
      front: 'Muscles of the first layer of the sole?',
      back: 'Abductor hallucis, flexor digitorum brevis (medial plantar nerve), abductor digiti minimi (lateral plantar nerve).',
    },
    {
      id: 'sole-second-layer-card',
      front: 'Contents of the second layer of the sole?',
      back: 'Tendons of flexor digitorum longus and flexor hallucis longus, flexor digitorum accessorius, four lumbricals.',
    },
    {
      id: 'foot-lumbricals-card',
      front: 'Origin, insertion and action of the lumbricals of the foot?',
      back: 'From the tendons of flexor digitorum longus to the extensor expansions of the lateral four toes; keep the toes straight so they do not buckle.',
    },
    {
      id: 'sole-first-two-nerves-card',
      front: 'Nerve supply of the first two layers of the sole?',
      back: 'Medial plantar: abductor hallucis, flexor digitorum brevis, first lumbrical. Lateral plantar: abductor digiti minimi, flexor accessorius, lumbricals two to four.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 10 Sole of Foot', pages: '137–141' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '648–649' },
  ],
};
