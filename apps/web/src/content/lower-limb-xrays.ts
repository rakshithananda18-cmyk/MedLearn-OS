import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  LOWER_LIMB_BONES,
  LOWER_LIMB_MODEL_CREDIT,
  LOWER_LIMB_MODEL_SRC,
  lowerLimbParts,
} from './lower-limb-3d';

// Lower limb batch 8. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const lowerLimbXrays: Topic = {
  slug: 'lower-limb-xrays',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Lower limb X-rays and ossification',
  summary:
    'Reading plain X-rays of the hip, knee and ankle, Shenton’s line, and the order in which the growth centres appear, from the one that proves a newborn was full term to the fibula that breaks the rule.',
  estimatedMinutes: 14,
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
      'Volume 2, Chapter 14 Surface and Radiological Anatomy, pages 201 to 203; Chapter 2 Bones, ossification, pages 15, 21, 28, 32, 34, 36, 37, 39 and 40',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Read every film the same way: the view, every bone in it, how the bones meet at each joint and the joint space, and any growth centres still open.',
    'Shenton’s line is one smooth curve along the upper border of the obturator foramen and the lower border of the femoral neck; a break in it means the head has moved, as in a dislocation or a displaced neck fracture.',
    'The neck of the femur meets the shaft at about 125 degrees in adults: wider in children (about 140), narrower in women.',
    'The centre for the lower end of the femur appears at the end of the ninth month before birth. Found in a dead newborn, it shows the baby was full term and could have lived.',
    'The growing ends of the lower limb are at the knee: the lower femur and the upper tibia and fibula. The fibula breaks the law of ossification: its lower centre appears first and also fuses first.',
    'Three tarsal bones are ossified at birth: the calcaneus, the talus and the cuboid. The navicular is the last, at about 3 years.',
  ],
  visual: {
    kind: 'path',
    // Top: the long bone centres in the order they appear. Middle: the tarsal centres in order.
    // Bottom: the growing end.
    diagram: {
      width: 360,
      height: 560,
      nodes: [
        {
          id: 'long-bones',
          label: 'Long bone\ncentres',
          name: 'Growth centres of the femur, tibia and fibula',
          x: 180,
          y: 35,
        },
        {
          id: 'lower-femur',
          label: 'Lower femur\nat birth',
          name: 'Lower end of the femur, end of the ninth month before birth',
          x: 60,
          y: 105,
        },
        {
          id: 'upper-tibia',
          label: 'Upper tibia\nat birth',
          name: 'Upper end of the tibia, just before birth',
          x: 180,
          y: 105,
        },
        {
          id: 'femoral-head',
          label: 'Femoral head\n~6 months',
          name: 'Head of the femur, first six months',
          x: 300,
          y: 105,
        },
        {
          id: 'lower-tibia',
          label: 'Lower tibia\n~1 yr',
          name: 'Lower end of the tibia, first year',
          x: 60,
          y: 175,
        },
        {
          id: 'lower-fibula',
          label: 'Lower fibula\n~1 yr',
          name: 'Lower end of the fibula, first year',
          x: 180,
          y: 175,
        },
        {
          id: 'greater-trochanter',
          label: 'Greater tro-\nchanter ~4 yr',
          name: 'Greater trochanter, fourth year',
          x: 300,
          y: 175,
        },
        {
          id: 'upper-fibula',
          label: 'Upper fibula\n~4 yr',
          name: 'Upper end of the fibula, fourth year',
          x: 60,
          y: 245,
        },
        {
          id: 'lesser-trochanter',
          label: 'Lesser tro-\nchanter ~12 yr',
          name: 'Lesser trochanter, twelfth year',
          x: 180,
          y: 245,
        },
        {
          id: 'tarsals',
          label: 'Tarsal\ncentres',
          name: 'Growth centres of the tarsus',
          x: 180,
          y: 320,
        },
        {
          id: 'calcaneus',
          label: 'Calcaneus',
          name: 'Calcaneus, third month before birth',
          x: 45,
          y: 390,
        },
        { id: 'talus', label: 'Talus', name: 'Talus, sixth month before birth', x: 135, y: 390 },
        { id: 'cuboid', label: 'Cuboid', name: 'Cuboid, just before birth', x: 225, y: 390 },
        {
          id: 'lateral-cuneiform',
          label: 'Lateral\ncuneiform',
          name: 'Lateral cuneiform, first year',
          x: 315,
          y: 390,
        },
        {
          id: 'medial-cuneiform',
          label: 'Medial\ncuneiform',
          name: 'Medial cuneiform, second year',
          x: 60,
          y: 455,
        },
        {
          id: 'intermediate-cuneiform',
          label: 'Intermediate\ncuneiform',
          name: 'Intermediate cuneiform, third year',
          x: 180,
          y: 455,
        },
        {
          id: 'navicular',
          label: 'Navicular',
          name: 'Navicular, third year',
          x: 300,
          y: 455,
        },
        {
          id: 'growing-ends',
          label: 'Growing ends:\nthe knee',
          name: 'Growing ends: lower femur, upper tibia and fibula',
          x: 180,
          y: 525,
        },
      ],
      edges: [
        { from: 'long-bones', to: 'lower-femur' },
        { from: 'lower-femur', to: 'upper-tibia' },
        { from: 'upper-tibia', to: 'femoral-head' },
        { from: 'femoral-head', to: 'lower-tibia' },
        { from: 'lower-tibia', to: 'lower-fibula' },
        { from: 'lower-fibula', to: 'greater-trochanter' },
        { from: 'greater-trochanter', to: 'upper-fibula' },
        { from: 'upper-fibula', to: 'lesser-trochanter' },
        { from: 'tarsals', to: 'calcaneus' },
        { from: 'calcaneus', to: 'talus' },
        { from: 'talus', to: 'cuboid' },
        { from: 'cuboid', to: 'lateral-cuneiform' },
        { from: 'lateral-cuneiform', to: 'medial-cuneiform' },
        { from: 'medial-cuneiform', to: 'intermediate-cuneiform' },
        { from: 'intermediate-cuneiform', to: 'navicular' },
      ],
    },
    lesions: [
      {
        id: 'newborn-viable',
        label: 'A newborn found dead',
        nodeIds: ['lower-femur', 'upper-tibia'],
        explanation:
          'The centre for the lower end of the femur appears at the end of the ninth month before birth, the upper tibia just after it. If an X-ray of a dead newborn shows the femoral centre, the baby was full term and could have lived on its own, which matters in law.',
      },
      {
        id: 'shenton-broken',
        label: 'Shenton’s line broken',
        nodeIds: ['femoral-head'],
        explanation:
          'On an AP film the upper border of the obturator foramen runs on smoothly into the lower border of the femoral neck. When the head dislocates, or a neck fracture lets the shaft ride up, the curve steps: compare it with the other side.',
      },
      {
        id: 'tibia-osteomyelitis',
        label: 'Infection of the upper tibia',
        nodeIds: ['upper-tibia', 'growing-ends'],
        explanation:
          'The upper end of the tibia, a growing end with a rich blood supply, is one of the commonest sites of acute osteomyelitis in children. The knee usually escapes, because its capsule is attached to the tibia above the growth plate, keeping the infected metaphysis outside the joint.',
      },
      {
        id: 'accessory-bones',
        label: 'Extra bones mistaken for a fracture',
        nodeIds: ['talus', 'calcaneus'],
        explanation:
          'Small separate bones are normal: sesamoids under the head of the first metatarsal, an os trigonum behind the talus (an unfused lateral tubercle), an os vesalianum at the base of the fifth metatarsal. The scale-like centre on the back of the calcaneus (6 to 16 years) can also look broken. Smooth, rounded edges and the same on both sides mean normal.',
      },
    ],
    drill: [
      {
        id: 'long-bones',
        title: 'Long bone centres',
        hint: 'From the two at birth around the knee to the lesser trochanter at twelve.',
        nodeIds: [
          'lower-femur',
          'upper-tibia',
          'femoral-head',
          'lower-tibia',
          'lower-fibula',
          'greater-trochanter',
          'upper-fibula',
          'lesser-trochanter',
        ],
      },
      {
        id: 'tarsals',
        title: 'Tarsal centres',
        hint: 'Three before birth, then the cuneiforms laterally to medially, and the navicular last.',
        nodeIds: [
          'calcaneus',
          'talus',
          'cuboid',
          'lateral-cuneiform',
          'medial-cuneiform',
          'intermediate-cuneiform',
          'navicular',
        ],
      },
      {
        id: 'growing',
        title: 'Growing ends',
        hint: 'Where the lower limb bones grow longest.',
        nodeIds: ['growing-ends'],
      },
    ],
    model3d: {
      src: LOWER_LIMB_MODEL_SRC,
      credit: LOWER_LIMB_MODEL_CREDIT,
      parts: lowerLimbParts(LOWER_LIMB_BONES),
      traces: [],
      stops: [
        {
          id: 'hip',
          title: 'Hip, front view',
          description:
            'As on an AP film: the femoral head in the acetabulum, the neck running down and out to the greater trochanter, the lesser trochanter behind and below, and the obturator foramen beside the head.',
          target: [-90, -95, 780],
          position: [-170, -560, 820],
        },
        {
          id: 'knee',
          title: 'Knee, front view',
          description:
            'The two femoral condyles over the tibial condyles, with the patella in front of the femur; on an AP film the patella overlaps the femur and is seen clearly only from the side.',
          target: [-78, -80, 375],
          position: [-110, -520, 410],
        },
        {
          id: 'ankle',
          title: 'Ankle, front view',
          description:
            'The talus held between the two malleoli, the lateral one reaching lower, with the lower ends of the tibia and fibula overlapping just above the joint.',
          target: [-80, -70, 20],
          position: [-100, -560, 60],
        },
        {
          id: 'foot',
          title: 'Ankle and heel from the side',
          description:
            'As on a lateral film: the talus on the calcaneus, the navicular in front of the talar head, and the cuboid in front of the calcaneus.',
          target: [-92, -55, -8],
          position: [-560, -120, 20],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'reading',
      title: 'Reading a lower limb X-ray',
      body: 'Go in the same order every time: which view it is, every bone you can see, how the bones meet at each joint and how wide the joint space is, and whether any growth centres are still open. Plain films show fractures and dislocations, infection, wear of a joint, tumours, rickets and scurvy, and developmental faults, and up to about 25 years they also tell the age.',
      focus: [],
    },
    {
      id: 'hip',
      title: 'The hip',
      body: 'On an AP film find the ilium, ischium and pubis meeting at the acetabulum, and the upper femur: head, neck, both trochanters and the top of the shaft. The neck meets the shaft at about 125 degrees in adults. Follow Shenton’s line, the smooth curve from the upper border of the obturator foramen into the lower border of the neck. Inside the neck, a dense plate in front of the lesser trochanter (the calcar femorale) carries weight down to the shaft.',
      focus: ['femoral-head', 'greater-trochanter', 'lesser-trochanter'],
    },
    {
      id: 'knee',
      title: 'The knee',
      body: 'The patella is clearly seen only on a lateral film, sitting about 1 cm above the joint line; on the AP it overlaps the femur. The joint space, about 5 mm in a young adult, is articular cartilage alone, not the menisci, and narrows with age. A small round bone behind the lateral femoral condyle in some people is the fabella, a sesamoid in the lateral head of gastrocnemius. A patella in two pieces at its upper outer corner (bipartite) is a centre that never fused, not a fracture.',
      focus: ['lower-femur', 'upper-tibia'],
    },
    {
      id: 'ankle-foot',
      title: 'The ankle and foot',
      body: 'The talus and calcaneus show best on a lateral film; the navicular and cuboid show on almost every view. The cuneiforms, metatarsals and phalanges separate only on a dorsoplantar view and overlap on the lateral. Expect sesamoids under the head of the first metatarsal and, in some people, accessory bones; do not call them fractures.',
      focus: ['talus', 'calcaneus', 'cuboid', 'navicular'],
    },
    {
      id: 'law',
      title: 'Growing ends, and the fibula’s exception',
      body: 'In a long bone with a centre at each end, the one that appears first fuses last and so grows longest. In the lower limb the growing ends meet at the knee: the lower femur and the upper tibia and fibula. The fibula breaks the rule: its lower centre appears first (first year) but fuses first (about 16 years), because it bears pressure at the ankle, while the upper end (fourth year, fusing about 18) keeps growing with the tibia.',
      focus: ['growing-ends', 'lower-fibula', 'upper-fibula'],
    },
    {
      id: 'long-bones',
      title: 'Long bone centres',
      body: 'At birth: the lower femur (end of the ninth month) and the upper tibia. In the first six months, the femoral head; in the first year, the lower tibia and lower fibula; in the fourth year, the greater trochanter and upper fibula; in the twelfth year, the lesser trochanter. The upper femoral centres fuse at about 18 (lesser trochanter, greater trochanter, then head) and the lower femur by about 20. In the hip bone the ischiopubic rami unite by 7 to 8 years and the acetabulum by about 17.',
      focus: [
        'lower-femur',
        'upper-tibia',
        'femoral-head',
        'lower-tibia',
        'lower-fibula',
        'greater-trochanter',
        'upper-fibula',
        'lesser-trochanter',
      ],
    },
    {
      id: 'tarsals',
      title: 'Tarsal centres',
      body: 'Unlike the carpus, three tarsal bones are already ossifying before birth: the calcaneus (third month), the talus (sixth month) and the cuboid (just before birth). Then the lateral cuneiform in the first year, the medial in the second, the intermediate and the navicular in the third. The calcaneus also gets a second, scale-like centre on its back between 6 and 8 years, which fuses by 14 to 16.',
      focus: [
        'calcaneus',
        'talus',
        'cuboid',
        'lateral-cuneiform',
        'medial-cuneiform',
        'intermediate-cuneiform',
        'navicular',
      ],
    },
    {
      id: 'explore',
      title: 'Read the films yourself',
      body: 'Open the X-rays in the 3D view: the hip, then the ankle from the front, the side and obliquely. Turn the labels on to check each bone, then find it again in the model.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'll-xrays-medicolegal',
      prompt:
        'A dead newborn’s X-ray shows the centre for the lower end of the femur. This means the baby:',
      options: [
        { id: 'term', text: 'Was full term and could have lived' },
        { id: 'premature', text: 'Was born before seven months' },
        { id: 'year', text: 'Was about a year old' },
        { id: 'nothing', text: 'Nothing: it appears in every fetus' },
      ],
      answerId: 'term',
      explanation:
        'The centre appears at the end of the ninth month before birth, so its presence marks a full-term, viable baby.',
    },
    {
      id: 'll-xrays-shenton',
      prompt: 'Shenton’s line runs along the lower border of the femoral neck and the:',
      options: [
        { id: 'obturator', text: 'Upper border of the obturator foramen' },
        { id: 'iliac-crest', text: 'Iliac crest' },
        { id: 'acetabular-roof', text: 'Roof of the acetabulum' },
        { id: 'greater-trochanter', text: 'Tip of the greater trochanter' },
      ],
      answerId: 'obturator',
      explanation: 'It is one smooth curve; a step in it means the femoral head is out of place.',
    },
    {
      id: 'll-xrays-fibula-law',
      prompt: 'The fibula breaks the law of ossification because its lower centre:',
      options: [
        { id: 'first-first', text: 'Appears first and also fuses first' },
        { id: 'last-last', text: 'Appears last and fuses last' },
        { id: 'none', text: 'Never fuses' },
        { id: 'before-birth', text: 'Appears before birth' },
      ],
      answerId: 'first-first',
      explanation:
        'The lower end is a pressure epiphysis and appears in the first year, fusing at about 16; the upper end, the growing end, appears in the fourth year and fuses at about 18.',
    },
    {
      id: 'll-xrays-tarsals-birth',
      prompt: 'Which tarsal bones are already ossifying at birth?',
      options: [
        { id: 'three', text: 'Calcaneus, talus and cuboid' },
        { id: 'navicular', text: 'Navicular and the cuneiforms' },
        { id: 'none', text: 'None of them' },
        { id: 'talus-only', text: 'Only the talus' },
      ],
      answerId: 'three',
      explanation:
        'Calcaneus (third fetal month), talus (sixth) and cuboid (just before birth); the navicular comes last, at about 3 years.',
    },
    {
      id: 'll-xrays-knee-space',
      prompt: 'The joint space of the knee on an X-ray is made by the:',
      options: [
        { id: 'cartilage', text: 'Articular cartilage alone' },
        { id: 'menisci', text: 'Menisci' },
        { id: 'fluid', text: 'Synovial fluid' },
        { id: 'fat', text: 'Infrapatellar fat pad' },
      ],
      answerId: 'cartilage',
      explanation:
        'About 5 mm in a young adult, it is entirely articular cartilage, and it narrows with age.',
    },
  ],
  cards: [
    {
      id: 'll-xrays-shenton-card',
      front: 'Shenton’s line?',
      back: 'A smooth curve along the upper border of the obturator foramen and the lower border of the femoral neck; broken when the femoral head is displaced.',
    },
    {
      id: 'll-xrays-neck-shaft',
      front: 'Neck-shaft angle of the femur?',
      back: 'About 125 degrees in adults; wider in children (about 140), narrower in women.',
    },
    {
      id: 'll-xrays-femur-order',
      front: 'Order of the femoral centres?',
      back: 'Lower end (ninth fetal month), head (first six months), greater trochanter (4 years), lesser trochanter (12 years).',
    },
    {
      id: 'll-xrays-growing-ends',
      front: 'Growing ends of the lower limb long bones?',
      back: 'At the knee: lower end of the femur, upper ends of the tibia and fibula.',
    },
    {
      id: 'll-xrays-fibula-card',
      front: 'Why does the fibula break the law of ossification?',
      back: 'Its lower centre appears first and fuses first: the lower end is a pressure epiphysis, while the upper end grows on with the tibia.',
    },
    {
      id: 'll-xrays-tarsal-order',
      front: 'Order of tarsal ossification?',
      back: 'Calcaneus, talus, cuboid (before birth), lateral cuneiform (1), medial cuneiform (2), intermediate cuneiform and navicular (3).',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 14 Surface and Radiological Anatomy, and Chapter 2 Bones',
      pages: '201–203, 15, 21, 28, 32, 34, 36–40',
    },
  ],
};
