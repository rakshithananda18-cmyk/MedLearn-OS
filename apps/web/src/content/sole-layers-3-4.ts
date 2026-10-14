import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  LEG_FOOT_BONES,
  LEG_FOOT_MODEL_CREDIT,
  LEG_FOOT_MODEL_SRC,
  legFootParts,
  SOLE_BELOW,
  SOLE_LAYER_3,
  SOLE_LAYER_4,
} from './leg-foot-3d';

// Lower limb batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const soleLayersThreeFour: Topic = {
  slug: 'sole-layers-3-4',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Sole of foot: third and fourth layers of muscles',
  summary:
    'The short muscles of the big and little toes and adductor hallucis in the third layer, and the interossei with the tendons of tibialis posterior and peroneus longus in the fourth.',
  estimatedMinutes: 11,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 10 Sole of Foot, pages 141 to 143 and 145'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: third and fourth layers of the sole, pages 650 to 652',
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
    'Third layer, in the forefoot: flexor hallucis brevis, adductor hallucis and flexor digiti minimi brevis.',
    'Flexor hallucis brevis has two tendons, each with a sesamoid, to either side of the base of the big toe; medial plantar nerve.',
    'Adductor hallucis has an oblique head from the bases of the middle metatarsals and a transverse head across the toe joints; it holds the transverse arch and receives the end of the deep branch of the lateral plantar nerve.',
    'Fourth layer: three plantar and four dorsal interossei, and the tendons of tibialis posterior and peroneus longus.',
    'The axis of the foot runs through the second toe: dorsal interossei abduct from it, plantar interossei adduct the third to fifth toes towards it.',
  ],
  visual: {
    kind: 'path',
    // Third layer and adductor hallucis, fourth layer and its axis, the tendons, the nerves.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'third-layer', label: 'Third\nlayer', name: 'Third layer', x: 50, y: 30 },
        {
          id: 'flexor-hallucis-brevis',
          label: 'Flexor\nhallucis',
          name: 'Flexor hallucis brevis',
          x: 145,
          y: 30,
        },
        {
          id: 'adductor-hallucis',
          label: 'Adductor\nhallucis',
          name: 'Adductor hallucis',
          x: 225,
          y: 30,
        },
        {
          id: 'flexor-digiti-minimi-brevis',
          label: 'Flexor\nminimi',
          name: 'Flexor digiti minimi brevis',
          x: 305,
          y: 30,
        },
        {
          id: 'adductor-heads',
          label: 'Two\nheads',
          name: 'The two heads of adductor hallucis',
          x: 50,
          y: 110,
        },
        {
          id: 'oblique-head',
          label: 'Oblique',
          name: 'Oblique head: bases of the second to fourth metatarsals',
          x: 145,
          y: 110,
        },
        {
          id: 'transverse-head',
          label: 'Transverse',
          name: 'Transverse head: across the toe joints, with no bony origin',
          x: 225,
          y: 110,
        },
        {
          id: 'transverse-arch',
          label: 'Transverse\narch',
          name: 'Holds the transverse arch',
          x: 305,
          y: 110,
        },
        { id: 'fourth-layer', label: 'Fourth\nlayer', name: 'Fourth layer', x: 50, y: 186 },
        {
          id: 'plantar-interossei',
          label: 'Plantar\ninterossei',
          name: 'Three plantar interossei',
          x: 145,
          y: 186,
        },
        {
          id: 'dorsal-interossei',
          label: 'Dorsal\ninterossei',
          name: 'Four dorsal interossei (not in the model)',
          x: 225,
          y: 186,
        },
        { id: 'axis', label: 'Axis', name: 'Axis of the foot: the second toe', x: 50, y: 262 },
        {
          id: 'plantar-adduct',
          label: 'Plantar:\nadduct',
          name: 'Plantar interossei adduct the third to fifth toes towards it',
          x: 145,
          y: 262,
        },
        {
          id: 'dorsal-abduct',
          label: 'Dorsal:\nabduct',
          name: 'Dorsal interossei abduct away from it',
          x: 225,
          y: 262,
        },
        {
          id: 'long-tendons',
          label: 'Tendons',
          name: 'Long tendons in the fourth layer',
          x: 50,
          y: 340,
        },
        {
          id: 'tibialis-posterior',
          label: 'Tibialis\nposterior',
          name: 'Tibialis posterior: navicular and the other tarsals',
          x: 145,
          y: 340,
        },
        {
          id: 'peroneus-longus',
          label: 'Peroneus\nlongus',
          name: 'Peroneus longus: across the sole to the first metatarsal',
          x: 225,
          y: 340,
        },
        { id: 'nerves', label: 'Nerves', name: 'Nerve supply', x: 50, y: 416 },
        {
          id: 'medial-plantar-nerve',
          label: 'Medial\nplantar',
          name: 'Medial plantar: flexor hallucis brevis',
          x: 145,
          y: 416,
        },
        {
          id: 'lateral-plantar-nerve',
          label: 'Lateral\nplantar',
          name: 'Lateral plantar: adductor hallucis, flexor digiti minimi brevis, all interossei',
          x: 225,
          y: 416,
        },
      ],
      edges: [
        { from: 'third-layer', to: 'flexor-hallucis-brevis' },
        { from: 'third-layer', to: 'adductor-hallucis' },
        { from: 'third-layer', to: 'flexor-digiti-minimi-brevis' },
        { from: 'adductor-heads', to: 'oblique-head' },
        { from: 'adductor-heads', to: 'transverse-head' },
        { from: 'adductor-heads', to: 'transverse-arch' },
        { from: 'fourth-layer', to: 'plantar-interossei' },
        { from: 'fourth-layer', to: 'dorsal-interossei' },
        { from: 'axis', to: 'plantar-adduct' },
        { from: 'axis', to: 'dorsal-abduct' },
        { from: 'long-tendons', to: 'tibialis-posterior' },
        { from: 'long-tendons', to: 'peroneus-longus' },
        { from: 'nerves', to: 'medial-plantar-nerve' },
        { from: 'nerves', to: 'lateral-plantar-nerve' },
      ],
    },
    lesions: [
      {
        id: 'march-fracture',
        label: 'March fracture',
        nodeIds: ['fourth-layer', 'dorsal-interossei'],
        explanation:
          'Long marching, as for soldiers and policemen, can crack the shaft of the second, third or fourth metatarsal, between the interossei, with pain in the forefoot.',
      },
      {
        id: 'club-foot',
        label: 'Club foot',
        nodeIds: ['tibialis-posterior', 'peroneus-longus'],
        explanation:
          'In talipes equinovarus, the commonest club foot, the heel is turned in and the foot is pointed and inverted with a high medial arch, so the child walks on the outer border.',
      },
    ],
    drill: [
      {
        id: 'sole-layer-three',
        title: 'Third layer',
        hint: 'Three muscles in the forefoot, then the two heads and job of adductor hallucis.',
        nodeIds: [
          'flexor-hallucis-brevis',
          'adductor-hallucis',
          'flexor-digiti-minimi-brevis',
          'oblique-head',
          'transverse-head',
          'transverse-arch',
        ],
      },
      {
        id: 'sole-layer-four',
        title: 'Fourth layer and nerves',
        hint: 'Two sets of interossei and what each does, two tendons, two nerves.',
        nodeIds: [
          'plantar-interossei',
          'dorsal-interossei',
          'plantar-adduct',
          'dorsal-abduct',
          'tibialis-posterior',
          'peroneus-longus',
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
        ...SOLE_LAYER_3,
        ...SOLE_LAYER_4,
        'lateral-plantar-artery',
        'plantar-arch',
        'medial-plantar-nerve',
        'lateral-plantar-nerve',
      ]),
      traces: [],
      stops: [
        SOLE_BELOW,
        {
          id: 'forefoot',
          title: 'The forefoot',
          description:
            'The third layer lies in the forefoot: flexor hallucis brevis under the first metatarsal, adductor hallucis across to the big toe, flexor digiti minimi brevis along the fifth.',
          target: [-95, -170, -50],
          position: [-110, -520, -520],
        },
        {
          id: 'interossei',
          title: 'Plantar interossei',
          description:
            'Switch the third layer off in Layers: the plantar interossei lie on the third to fifth metatarsals.',
          target: [-95, -160, -45],
          position: [-400, -420, -500],
        },
        {
          id: 'tendons',
          title: 'Two long tendons',
          description:
            'From below and medially: tibialis posterior fans out from the navicular to the other tarsals; peroneus longus crosses the sole obliquely from the cuboid to the first metatarsal.',
          target: [-85, -120, -45],
          position: [400, -250, -520],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'third',
      title: 'Third layer',
      body: 'Three short muscles in the forefoot. Flexor hallucis brevis arises from the cuboid, lateral cuneiform and the tendon of tibialis posterior and splits into two tendons, each holding a sesamoid, to either side of the base of the big toe. Flexor digiti minimi brevis runs along the fifth metatarsal to the little toe. Adductor hallucis goes to the lateral side of the big toe.',
      focus: [
        'third-layer',
        'flexor-hallucis-brevis',
        'adductor-hallucis',
        'flexor-digiti-minimi-brevis',
      ],
    },
    {
      id: 'adductor',
      title: 'Adductor hallucis',
      body: 'Its large oblique head arises from the bases of the second to fourth metatarsals and the sheath of peroneus longus; its small transverse head has no bony origin, only the ligaments of the lateral toe joints. Pulling the big toe towards the second, it also braces the transverse arch. The deep branch of the lateral plantar nerve ends in it.',
      focus: ['adductor-heads', 'oblique-head', 'transverse-head', 'transverse-arch'],
    },
    {
      id: 'fourth',
      title: 'Fourth layer',
      body: 'Between and below the metatarsals lie three plantar interossei, on the third to fifth, and four dorsal interossei, each from two neighbouring bones. The tendons of tibialis posterior and peroneus longus also run in this deepest layer.',
      focus: ['fourth-layer', 'plantar-interossei', 'dorsal-interossei'],
    },
    {
      id: 'axis',
      title: 'Axis of the second toe',
      body: 'In the hand the axis runs through the middle finger; in the foot it runs through the second toe. Dorsal interossei abduct away from it (the second toe has two, one on each side); plantar interossei adduct the third, fourth and fifth toes towards it.',
      focus: ['axis', 'plantar-adduct', 'dorsal-abduct'],
    },
    {
      id: 'tendons',
      title: 'The two tendons',
      body: 'Tibialis posterior inserts mainly on the navicular tuberosity and spreads to every other tarsal bone except the talus and to the middle metatarsals. Peroneus longus runs in the groove under the cuboid and across the sole to the first metatarsal and medial cuneiform.',
      focus: ['long-tendons', 'tibialis-posterior', 'peroneus-longus'],
    },
    {
      id: 'nerves',
      title: 'Nerves',
      body: 'Flexor hallucis brevis is the only muscle of these layers supplied by the medial plantar nerve. Everything else is lateral plantar: adductor hallucis and most interossei by its deep branch, flexor digiti minimi brevis and the fourth-space interossei by its superficial branch.',
      focus: ['nerves', 'medial-plantar-nerve', 'lateral-plantar-nerve'],
    },
    {
      id: 'explore',
      title: 'Peel it yourself',
      body: 'Look at the sole, switch off the first and second layers, and select the third-layer muscles; then switch those off to reach the interossei.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'foot-axis',
      prompt: 'Abduction and adduction of the toes are described about an axis through the:',
      options: [
        { id: 'second', text: 'Second toe' },
        { id: 'third', text: 'Third toe' },
        { id: 'big', text: 'Big toe' },
        { id: 'fourth', text: 'Fourth toe' },
      ],
      answerId: 'second',
      explanation: 'In the hand the axis is the middle finger.',
    },
    {
      id: 'adductor-hallucis-nerve',
      prompt: 'Adductor hallucis is supplied by the:',
      options: [
        { id: 'deep-lateral', text: 'Deep branch of the lateral plantar nerve' },
        { id: 'medial', text: 'Medial plantar nerve' },
        { id: 'superficial-lateral', text: 'Superficial branch of the lateral plantar nerve' },
        { id: 'deep-peroneal', text: 'Deep peroneal nerve' },
      ],
      answerId: 'deep-lateral',
      explanation: 'The deep branch ends in it, as the deep ulnar nerve ends in adductor pollicis.',
    },
    {
      id: 'plantar-interossei-count',
      prompt: 'How many plantar interossei are there in the foot?',
      options: [
        { id: 'three', text: 'Three' },
        { id: 'four', text: 'Four' },
        { id: 'two', text: 'Two' },
        { id: 'five', text: 'Five' },
      ],
      answerId: 'three',
      explanation: 'On the third to fifth metatarsals; the dorsal interossei are four.',
    },
    {
      id: 'medial-plantar-not',
      prompt: 'The medial plantar nerve supplies all of these except:',
      options: [
        { id: 'adductor', text: 'Adductor hallucis' },
        { id: 'abductor', text: 'Abductor hallucis' },
        { id: 'fdb', text: 'Flexor digitorum brevis' },
        { id: 'fhb', text: 'Flexor hallucis brevis' },
      ],
      answerId: 'adductor',
      explanation: 'Adductor hallucis is lateral plantar (deep branch).',
    },
  ],
  cards: [
    {
      id: 'sole-third-layer-card',
      front: 'Muscles of the third layer of the sole?',
      back: 'Flexor hallucis brevis (medial plantar), adductor hallucis (deep branch of lateral plantar), flexor digiti minimi brevis (superficial branch of lateral plantar).',
    },
    {
      id: 'sole-fourth-layer-card',
      front: 'Contents of the fourth layer of the sole?',
      back: 'Three plantar and four dorsal interossei, and the tendons of tibialis posterior and peroneus longus.',
    },
    {
      id: 'foot-interossei-actions-card',
      front: 'Actions of the interossei of the foot?',
      back: 'About the axis of the second toe: dorsal interossei abduct, plantar interossei adduct the third to fifth toes; both flex the toe joints at the base.',
    },
    {
      id: 'adductor-hallucis-heads-card',
      front: 'Heads of adductor hallucis?',
      back: 'Oblique: bases of the second to fourth metatarsals and the peroneus longus sheath. Transverse: ligaments of the lateral toe joints, no bony origin.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 10 Sole of Foot',
      pages: '141–143, 145',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '650–652' },
  ],
};
