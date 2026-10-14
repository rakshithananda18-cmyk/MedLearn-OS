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
export const plantarVesselsNerves: Topic = {
  slug: 'plantar-vessels-nerves',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Sole of foot: plantar nerves, arteries and the plantar arch',
  summary:
    'The medial and lateral plantar nerves as the median and ulnar of the foot, the plantar arteries, and the plantar arch with its branches.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 10 Sole of Foot, pages 143 to 145'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: arteries and nerves of the foot, pages 653 and 656',
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
    'The medial and lateral plantar nerves and arteries are the terminal branches of the tibial nerve and posterior tibial artery, starting under the flexor retinaculum; the arteries lie nearer the borders of the foot than the nerves.',
    'Medial plantar nerve, the larger: abductor hallucis, flexor digitorum brevis, flexor hallucis brevis and the first lumbrical; skin of the medial sole and medial three and a half toes. Like the median nerve.',
    'Lateral plantar nerve, the smaller: the other fourteen muscles of the sole, through its trunk, superficial and deep branches; skin of the lateral one and a half toes. Like the ulnar nerve.',
    'Plantar arch: the lateral plantar artery turning medially from the base of the fifth metatarsal to the first space, completed by the dorsalis pedis; it lies between the third and fourth layers with the deep branch of the lateral plantar nerve in its curve.',
    'The arch gives four plantar metatarsal arteries to the toes and perforating arteries to the dorsal metatarsal arteries.',
  ],
  visual: {
    kind: 'path',
    // The two nerves and their branches, the arteries, the arch and its branches.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'medial-plantar-nerve',
          label: 'Medial\nplantar',
          name: 'Medial plantar nerve',
          x: 50,
          y: 30,
        },
        {
          id: 'medial-muscles',
          label: 'Four\nmuscles',
          name: 'Abductor hallucis, flexor digitorum brevis, flexor hallucis brevis, first lumbrical',
          x: 145,
          y: 30,
        },
        {
          id: 'medial-skin',
          label: 'Medial\ntoes',
          name: 'Skin of the medial sole and medial three and a half toes',
          x: 225,
          y: 30,
        },
        {
          id: 'median-like',
          label: 'Like\nmedian',
          name: 'Like the median nerve in the hand',
          x: 305,
          y: 30,
        },
        {
          id: 'lateral-plantar-nerve',
          label: 'Lateral\nplantar',
          name: 'Lateral plantar nerve',
          x: 50,
          y: 110,
        },
        {
          id: 'lateral-trunk',
          label: 'Trunk',
          name: 'Trunk: abductor digiti minimi and flexor accessorius',
          x: 145,
          y: 110,
        },
        {
          id: 'superficial-branch',
          label: 'Super-\nficial',
          name: 'Superficial branch: flexor digiti minimi brevis, the fourth-space interossei, lateral one and a half toes',
          x: 225,
          y: 110,
        },
        {
          id: 'deep-branch',
          label: 'Deep\nbranch',
          name: 'Deep branch: adductor hallucis, three lumbricals and the other interossei',
          x: 305,
          y: 110,
        },
        { id: 'arteries', label: 'Arteries', name: 'Plantar arteries', x: 50, y: 186 },
        {
          id: 'medial-plantar-artery',
          label: 'Medial\nplantar',
          name: 'Medial plantar artery, the smaller',
          x: 145,
          y: 186,
        },
        {
          id: 'lateral-plantar-artery',
          label: 'Lateral\nplantar',
          name: 'Lateral plantar artery, the larger',
          x: 225,
          y: 186,
        },
        { id: 'plantar-arch', label: 'Plantar\narch', name: 'Plantar arch', x: 50, y: 262 },
        {
          id: 'arch-course',
          label: 'Fifth to\nfirst',
          name: 'From the base of the fifth metatarsal to the first space',
          x: 145,
          y: 262,
        },
        {
          id: 'deep-plantar-artery',
          label: 'Dorsalis\npedis',
          name: 'Completed by the dorsalis pedis through the first space',
          x: 225,
          y: 262,
        },
        {
          id: 'arch-layer',
          label: 'Layers\n3 and 4',
          name: 'Between the third and fourth layers',
          x: 305,
          y: 262,
        },
        { id: 'arch-branches', label: 'Branches', name: 'Branches of the arch', x: 50, y: 340 },
        {
          id: 'plantar-metatarsal',
          label: 'Plantar\nmetatarsal',
          name: 'Four plantar metatarsal arteries to the toes',
          x: 145,
          y: 340,
        },
        {
          id: 'perforating',
          label: 'Perfor-\nating',
          name: 'Perforating arteries to the dorsal metatarsal arteries',
          x: 225,
          y: 340,
        },
      ],
      edges: [
        { from: 'medial-plantar-nerve', to: 'medial-muscles' },
        { from: 'medial-plantar-nerve', to: 'medial-skin' },
        { from: 'medial-plantar-nerve', to: 'median-like' },
        { from: 'lateral-plantar-nerve', to: 'lateral-trunk' },
        { from: 'lateral-plantar-nerve', to: 'superficial-branch' },
        { from: 'lateral-plantar-nerve', to: 'deep-branch' },
        { from: 'arteries', to: 'medial-plantar-artery' },
        { from: 'arteries', to: 'lateral-plantar-artery' },
        { from: 'plantar-arch', to: 'arch-course' },
        { from: 'plantar-arch', to: 'deep-plantar-artery' },
        { from: 'plantar-arch', to: 'arch-layer' },
        { from: 'arch-branches', to: 'plantar-metatarsal' },
        { from: 'arch-branches', to: 'perforating' },
      ],
    },
    lesions: [
      {
        id: 'mortons-neuroma',
        label: 'Morton’s neuroma',
        nodeIds: ['medial-skin', 'medial-plantar-nerve'],
        explanation:
          'A digital nerve between the third and fourth metatarsal heads thickens into a painful swelling, felt as sharp pain between those toes on walking.',
      },
      {
        id: 'lateral-plantar-injury',
        label: 'Lateral plantar injury',
        nodeIds: ['lateral-plantar-nerve', 'deep-branch'],
        explanation:
          'Most small muscles of the sole weaken, the toes tend to claw, and the lateral sole and lateral one and a half toes lose feeling.',
      },
    ],
    drill: [
      {
        id: 'plantar-nerves',
        title: 'Plantar nerves',
        hint: 'What the medial nerve supplies and resembles; the three parts of the lateral nerve.',
        nodeIds: [
          'medial-muscles',
          'medial-skin',
          'median-like',
          'lateral-trunk',
          'superficial-branch',
          'deep-branch',
        ],
      },
      {
        id: 'plantar-arteries',
        title: 'Arteries and arch',
        hint: 'Two plantar arteries, the course and layer of the arch, and its branches.',
        nodeIds: [
          'medial-plantar-artery',
          'lateral-plantar-artery',
          'arch-course',
          'deep-plantar-artery',
          'arch-layer',
          'plantar-metatarsal',
          'perforating',
        ],
      },
    ],
    model3d: {
      src: LEG_FOOT_MODEL_SRC,
      credit: LEG_FOOT_MODEL_CREDIT,
      parts: legFootParts([
        ...LEG_FOOT_BONES,
        ...SOLE_LAYER_1,
        'adductor-hallucis',
        'posterior-tibial-artery',
        'medial-plantar-artery',
        'lateral-plantar-artery',
        'plantar-arch',
        'dorsalis-pedis-artery',
        'deep-plantar-artery',
        'tibial-nerve',
        'medial-plantar-nerve',
        'lateral-plantar-nerve',
      ]),
      traces: [],
      stops: [
        SOLE_BELOW,
        {
          id: 'entry',
          title: 'Into the sole',
          description:
            'From the medial side: the plantar nerves and arteries come in from behind the medial malleolus under abductor hallucis, the arteries nearer the borders.',
          target: [-70, -90, -35],
          position: [520, -150, -250],
        },
        {
          id: 'arch',
          title: 'Plantar arch',
          description:
            'Switch the first layer off in Layers: the lateral plantar artery crosses the sole to the base of the fifth metatarsal and turns medially as the plantar arch.',
          target: [-90, -150, -50],
          position: [-120, -420, -600],
        },
        {
          id: 'dorsalis-link',
          title: 'From above',
          description:
            'The dorsalis pedis dips through the first space between the metatarsals to complete the arch.',
          target: [-90, -165, -30],
          position: [-200, -520, 380],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'origin',
      title: 'Where they begin',
      body: 'Under the flexor retinaculum the posterior tibial artery divides into medial and lateral plantar arteries, a little higher than the tibial nerve divides into the plantar nerves, so the arteries run nearer the borders of the foot. The medial vessels and nerve run forwards between abductor hallucis and flexor digitorum brevis; the lateral ones cross the sole between the first and second layers towards the base of the fifth metatarsal.',
      focus: ['medial-plantar-nerve', 'lateral-plantar-nerve', 'arteries'],
    },
    {
      id: 'medial-nerve',
      title: 'Medial plantar nerve',
      body: 'The larger branch (L4, L5) supplies four muscles: abductor hallucis, flexor digitorum brevis, flexor hallucis brevis and the first lumbrical. Its four digital nerves supply the skin of the medial sole and the medial three and a half toes, reaching round to the nail beds. It mirrors the median nerve in the hand.',
      focus: ['medial-plantar-nerve', 'medial-muscles', 'medial-skin', 'median-like'],
    },
    {
      id: 'lateral-nerve',
      title: 'Lateral plantar nerve',
      body: 'The smaller branch (S2, S3) supplies the remaining fourteen muscles. Its trunk supplies abductor digiti minimi and flexor accessorius, then divides at the base of the fifth metatarsal. The superficial branch supplies flexor digiti minimi brevis, the interossei of the fourth space and the skin of the lateral one and a half toes. The deep branch curves medially with the plantar arch and supplies adductor hallucis, the lateral three lumbricals and the other interossei. It mirrors the ulnar nerve.',
      focus: ['lateral-plantar-nerve', 'lateral-trunk', 'superficial-branch', 'deep-branch'],
    },
    {
      id: 'arteries',
      title: 'Plantar arteries',
      body: 'The medial plantar artery, the smaller, runs along the medial border with branches to the skin, muscles and toes. The lateral plantar artery, the larger, crosses with the nerve and at the base of the fifth metatarsal gives a superficial branch and becomes the plantar arch.',
      focus: ['arteries', 'medial-plantar-artery', 'lateral-plantar-artery'],
    },
    {
      id: 'arch',
      title: 'Plantar arch',
      body: 'It runs from the base of the fifth metatarsal to the back of the first space, between the third and fourth layers, and is completed by the dorsalis pedis coming down through the first space. The deep branch of the lateral plantar nerve lies in its curve. It gives four plantar metatarsal arteries, one per space, each dividing for the adjacent sides of two toes, and perforating arteries that join the dorsal metatarsal arteries.',
      focus: [
        'plantar-arch',
        'arch-course',
        'deep-plantar-artery',
        'arch-layer',
        'arch-branches',
        'plantar-metatarsal',
        'perforating',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Look at the sole, switch off the first layer, then follow the lateral plantar artery into the plantar arch and up through the first space to the dorsalis pedis.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'medial-plantar-like',
      prompt: 'The medial plantar nerve corresponds in the hand to the:',
      options: [
        { id: 'median', text: 'Median nerve' },
        { id: 'ulnar', text: 'Ulnar nerve' },
        { id: 'radial', text: 'Radial nerve' },
        { id: 'musculocutaneous', text: 'Musculocutaneous nerve' },
      ],
      answerId: 'median',
      explanation:
        'Medial three and a half digits and a few muscles of the big toe side; the lateral plantar matches the ulnar.',
    },
    {
      id: 'plantar-arch-formed',
      prompt: 'The plantar arch is formed by the:',
      options: [
        { id: 'lateral-dorsalis', text: 'Lateral plantar artery, completed by the dorsalis pedis' },
        { id: 'medial-dorsalis', text: 'Medial plantar artery, completed by the dorsalis pedis' },
        { id: 'both-plantar', text: 'Medial and lateral plantar arteries' },
        { id: 'arcuate', text: 'Arcuate and lateral tarsal arteries' },
      ],
      answerId: 'lateral-dorsalis',
      explanation: 'The dorsalis pedis comes down through the first intermetatarsal space.',
    },
    {
      id: 'plantar-arch-layer',
      prompt: 'The plantar arch lies between the:',
      options: [
        { id: 'three-four', text: 'Third and fourth layers' },
        { id: 'one-two', text: 'First and second layers' },
        { id: 'two-three', text: 'Second and third layers' },
        { id: 'aponeurosis', text: 'Aponeurosis and first layer' },
      ],
      answerId: 'three-four',
      explanation: 'The lateral plantar vessels and nerve cross between the first and second.',
    },
    {
      id: 'lateral-plantar-count',
      prompt: 'How many muscles of the sole does the lateral plantar nerve supply?',
      options: [
        { id: 'fourteen', text: 'Fourteen' },
        { id: 'four', text: 'Four' },
        { id: 'nine', text: 'Nine' },
        { id: 'eighteen', text: 'Eighteen' },
      ],
      answerId: 'fourteen',
      explanation: 'The medial plantar supplies four; the deep branch alone supplies nine.',
    },
  ],
  cards: [
    {
      id: 'medial-plantar-supply-card',
      front: 'Muscles supplied by the medial plantar nerve?',
      back: 'Abductor hallucis, flexor digitorum brevis, flexor hallucis brevis, first lumbrical.',
    },
    {
      id: 'lateral-plantar-branches-card',
      front: 'Branches of the lateral plantar nerve and what they supply?',
      back: 'Trunk: abductor digiti minimi, flexor accessorius. Superficial: flexor digiti minimi brevis, fourth-space interossei, lateral one and a half toes. Deep: adductor hallucis, lateral three lumbricals, other interossei.',
    },
    {
      id: 'plantar-arch-card',
      front: 'Course and relations of the plantar arch?',
      back: 'Lateral plantar artery from the base of the fifth metatarsal to the first space, completed by the dorsalis pedis; between the third and fourth layers, the deep branch of the lateral plantar nerve in its concavity.',
    },
    {
      id: 'plantar-arch-branches-card',
      front: 'Branches of the plantar arch?',
      back: 'Four plantar metatarsal arteries (to the toes) and perforating arteries to the dorsal metatarsal arteries.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 10 Sole of Foot', pages: '143–145' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '653, 656' },
  ],
};
