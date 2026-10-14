import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  LEG_BACK,
  LEG_FOOT_BONES,
  LEG_FOOT_MODEL_CREDIT,
  LEG_FOOT_MODEL_SRC,
  legFootParts,
} from './leg-foot-3d';

// Lower limb batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const lowerLimbDermatomes: Topic = {
  slug: 'lower-limb-dermatomes',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Lower limb: dermatomes, myotomes and sympathetic supply',
  summary:
    'How the spinal segments map on to the skin and muscles of the lower limb after the limb bud turns, the segments for each joint movement, and the sympathetic supply of its vessels.',
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
      'Volume 2, Chapter 11 Segmental and Sympathetic Innervation, pages 154 to 156',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, conceptual overview: dermatomes and myotomes, pages 538 to 541',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bones (BodyParts3D, CC BY 4.0); nerves (Z-Anatomy, CC BY-SA 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 and CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The skin of the lower limb is supplied mainly by L1 to S3, with T12 and S4 at the edges, all through ventral rami except the upper inner buttock, from dorsal rami.',
    'The limb bud turns medially, so the tibial border is preaxial: T12 and L1 to L4 from above down. L5 runs down the lateral leg to the dorsum and middle three toes; S1 to S3 climb the postaxial border from the lateral foot and heel.',
    'Axial lines mark where segments that are not neighbours meet; there is little overlap across them.',
    'Myotomes by movement: hip flexion L1–L3, extension L5–S1; knee extension L3–L4, flexion L5–S1; dorsiflexion and inversion L4–L5; plantar flexion S1–S2; eversion L5–S1.',
    'Sympathetic fibres come from T10 to L2; lumbar sympathectomy (second to fourth ganglia) dilates the leg vessels, sparing the first ganglion for ejaculation.',
  ],
  visual: {
    kind: 'path',
    // Dermatomes along the borders, the axial lines, myotomes by joint, and the sympathetic.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'preaxial',
          label: 'Pre-\naxial',
          name: 'Preaxial (tibial) border, from above down',
          x: 50,
          y: 30,
        },
        { id: 'l1', label: 'L1', name: 'L1: groin, below the inguinal ligament', x: 145, y: 30 },
        {
          id: 'l2-l3',
          label: 'L2, L3',
          name: 'L2 and L3: front and medial side of the thigh',
          x: 225,
          y: 30,
        },
        {
          id: 'l4',
          label: 'L4',
          name: 'L4: medial leg and medial border of the foot',
          x: 305,
          y: 30,
        },
        { id: 'middle', label: 'Middle', name: 'The middle of the limb', x: 50, y: 110 },
        {
          id: 'l5',
          label: 'L5',
          name: 'L5: lateral leg, dorsum of the foot and middle three toes',
          x: 145,
          y: 110,
        },
        {
          id: 'axial-lines',
          label: 'Axial\nlines',
          name: 'Axial lines: segments that are not neighbours meet, with little overlap',
          x: 225,
          y: 110,
        },
        {
          id: 'postaxial',
          label: 'Post-\naxial',
          name: 'Postaxial (fibular) border, from below up',
          x: 50,
          y: 186,
        },
        {
          id: 's1',
          label: 'S1',
          name: 'S1: lateral border of the foot, sole and heel',
          x: 145,
          y: 186,
        },
        { id: 's2', label: 'S2', name: 'S2: back of the leg and thigh', x: 225, y: 186 },
        { id: 's3', label: 'S3', name: 'S3: buttock beside the gluteal fold', x: 305, y: 186 },
        {
          id: 'hip-knee',
          label: 'Hip and\nknee',
          name: 'Segments for hip and knee movements',
          x: 50,
          y: 262,
        },
        {
          id: 'hip-flexion',
          label: 'Hip flex\nL1–L3',
          name: 'Hip flexion, adduction and medial rotation: L1, L2, L3',
          x: 145,
          y: 262,
        },
        {
          id: 'hip-extension',
          label: 'Hip ext\nL5, S1',
          name: 'Hip extension, abduction and lateral rotation: L5, S1',
          x: 225,
          y: 262,
        },
        {
          id: 'knee',
          label: 'Knee ext\nL3, L4',
          name: 'Knee extension L3, L4; knee flexion L5, S1',
          x: 305,
          y: 262,
        },
        {
          id: 'ankle-foot',
          label: 'Ankle and\nfoot',
          name: 'Segments for ankle and foot movements',
          x: 50,
          y: 340,
        },
        {
          id: 'dorsiflexion',
          label: 'Dorsiflex\nL4, L5',
          name: 'Dorsiflexion and inversion: L4, L5',
          x: 145,
          y: 340,
        },
        {
          id: 'plantar-flexion',
          label: 'Plantar\nS1, S2',
          name: 'Plantar flexion: S1, S2',
          x: 225,
          y: 340,
        },
        { id: 'eversion', label: 'Evert\nL5, S1', name: 'Eversion: L5, S1', x: 305, y: 340 },
        {
          id: 'sympathetic',
          label: 'Sympa-\nthetic',
          name: 'Sympathetic supply',
          x: 50,
          y: 416,
        },
        {
          id: 'sympathetic-roots',
          label: 'T10–L2',
          name: 'Preganglionic fibres from T10 to L2, relaying in lumbar and sacral ganglia',
          x: 145,
          y: 416,
        },
        {
          id: 'sympathectomy',
          label: 'Sympath-\nectomy',
          name: 'Lumbar sympathectomy: the second to fourth ganglia removed',
          x: 225,
          y: 416,
        },
      ],
      edges: [
        { from: 'preaxial', to: 'l1' },
        { from: 'preaxial', to: 'l2-l3' },
        { from: 'preaxial', to: 'l4' },
        { from: 'middle', to: 'l5' },
        { from: 'middle', to: 'axial-lines' },
        { from: 'postaxial', to: 's1' },
        { from: 'postaxial', to: 's2' },
        { from: 'postaxial', to: 's3' },
        { from: 'hip-knee', to: 'hip-flexion' },
        { from: 'hip-knee', to: 'hip-extension' },
        { from: 'hip-knee', to: 'knee' },
        { from: 'ankle-foot', to: 'dorsiflexion' },
        { from: 'ankle-foot', to: 'plantar-flexion' },
        { from: 'ankle-foot', to: 'eversion' },
        { from: 'sympathetic', to: 'sympathetic-roots' },
        { from: 'sympathetic', to: 'sympathectomy' },
      ],
    },
    lesions: [
      {
        id: 'l5-root',
        label: 'L5 root',
        nodeIds: ['l5', 'dorsiflexion'],
        explanation:
          'A disc pressing on the L5 root numbs the lateral leg and the dorsum of the foot and weakens dorsiflexion, especially lifting the big toe.',
      },
      {
        id: 's1-root',
        label: 'S1 root',
        nodeIds: ['s1', 'plantar-flexion'],
        explanation:
          'A disc pressing on the S1 root numbs the lateral border of the foot and the sole, weakens plantar flexion and abolishes the ankle jerk.',
      },
      {
        id: 'buergers',
        label: 'Buerger’s disease',
        nodeIds: ['sympathectomy', 'sympathetic-roots'],
        explanation:
          'In this inflammatory blockage of the leg arteries, cutting the sympathetic supply by removing the second to fourth lumbar ganglia dilates the vessels. The first ganglion is spared because it controls ejaculation.',
      },
    ],
    drill: [
      {
        id: 'lower-dermatomes',
        title: 'Dermatomes',
        hint: 'Down the preaxial border, the middle of the limb, up the postaxial border.',
        nodeIds: ['l1', 'l2-l3', 'l4', 'l5', 'axial-lines', 's1', 's2', 's3'],
      },
      {
        id: 'lower-myotomes',
        title: 'Myotomes and sympathetic',
        hint: 'Two segments for each pair of movements, then where the sympathetic fibres start.',
        nodeIds: [
          'hip-flexion',
          'hip-extension',
          'knee',
          'dorsiflexion',
          'plantar-flexion',
          'eversion',
          'sympathetic-roots',
          'sympathectomy',
        ],
      },
    ],
    model3d: {
      src: LEG_FOOT_MODEL_SRC,
      credit: `${LEG_FOOT_MODEL_CREDIT} Dermatomes are described with each view, not drawn on the model.`,
      parts: legFootParts([
        ...LEG_FOOT_BONES,
        'saphenous-nerve',
        'superficial-peroneal-nerve',
        'deep-peroneal-nerve',
        'common-peroneal-nerve',
        'tibial-nerve',
        'sural-nerve',
        'sural-communicating-nerve',
        'medial-plantar-nerve',
        'lateral-plantar-nerve',
      ]),
      traces: [],
      stops: [
        {
          id: 'medial',
          title: 'Medial side: L4',
          description:
            'The medial leg and the medial border of the foot to the big toe are L4, reached through the saphenous nerve; the knee above is L3.',
          target: [-70, -80, 180],
          position: [944, -336, 273],
        },
        {
          id: 'front',
          title: 'Front and lateral side: L5',
          description:
            'The lateral leg, the dorsum of the foot and the middle three toes are L5, through the superficial and deep peroneal nerves.',
          target: [-85, -100, 180],
          position: [-560, -1050, 238],
        },
        {
          id: 'sole',
          title: 'Sole and lateral border: S1',
          description:
            'The lateral border of the foot, the sole and the heel are S1, through the sural and plantar nerves; stroking here tests the plantar reflex.',
          target: [-85, -130, -45],
          position: [-97, -433, -517],
        },
        {
          ...LEG_BACK,
          title: 'Back of the leg: S1 and S2',
          description:
            'The back of the calf is S2 centrally with S1 laterally; the ankle jerk, S1 and S2, is tapped on the tendo calcaneus.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'turning',
      title: 'The limb bud turns',
      body: 'Each limb bud starts with a cephalic (preaxial) and a caudal (postaxial) border. The lower limb bud turns medially through 90 degrees, carrying the big toe and tibia to the medial side and the little toe and fibula to the lateral side. So the tibial border is preaxial and the fibular border postaxial, and the front of the thigh is the extensor side.',
      focus: [],
    },
    {
      id: 'segments',
      title: 'Which segments',
      body: 'The skin is supplied mainly by L1 to S3, with T12 and S4 at the margins, all through ventral rami except the upper inner part of the buttock, which comes from dorsal rami of L1 to L3 and S1 to S3. Neighbouring dermatomes overlap, so cutting one root numbs less skin than its full dermatome.',
      focus: [],
    },
    {
      id: 'map',
      title: 'The map',
      body: 'Down the preaxial border run T12, L1, L2, L3 and L4, ending on the medial side of the leg and foot. L5 takes the lateral leg, the dorsum and the middle three toes. Up the postaxial border from the lateral foot and heel run S1, S2 and S3. The central segments L4, L5 and S1 reach the skin only in the distal limb; higher up they are buried along axial lines, where segments that are not neighbours meet with little overlap.',
      focus: [
        'preaxial',
        'l1',
        'l2-l3',
        'l4',
        'middle',
        'l5',
        'axial-lines',
        'postaxial',
        's1',
        's2',
        's3',
      ],
    },
    {
      id: 'myotomes',
      title: 'Myotomes by movement',
      body: 'Each muscle has several segments, so the useful clinical chart is by movement, two segments each: at the hip, flexion L1 to L3 and extension L5, S1; at the knee, extension L3, L4 and flexion L5, S1; at the ankle, dorsiflexion L4, L5 and plantar flexion S1, S2; in the foot, inversion L4, L5 and eversion L5, S1. The knee jerk tests L3, L4 and the ankle jerk S1, S2.',
      focus: [
        'hip-knee',
        'hip-flexion',
        'hip-extension',
        'knee',
        'ankle-foot',
        'dorsiflexion',
        'plantar-flexion',
        'eversion',
      ],
    },
    {
      id: 'sympathetic',
      title: 'Sympathetic supply',
      body: 'Preganglionic fibres from T10 to L2 run down the sympathetic chain to the lumbar and upper sacral ganglia. Postganglionic fibres join the lumbar nerves and reach the femoral artery through the femoral nerve, and the popliteal artery and its branches through the tibial nerve. They are vasomotor, sudomotor and pilomotor to the skin. Removing the second to fourth lumbar ganglia cuts all the preganglionic fibres to the limb; the first is spared for its role in ejaculation.',
      focus: ['sympathetic', 'sympathetic-roots', 'sympathectomy'],
    },
    {
      id: 'explore',
      title: 'Walk round the leg',
      body: 'Step through the views: each one names the segment for the skin you are looking at; select a nerve to see which one carries it.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'dorsum-dermatome',
      prompt: 'The skin of the dorsum of the foot and the middle three toes belongs to:',
      options: [
        { id: 'l5', text: 'L5' },
        { id: 'l4', text: 'L4' },
        { id: 's1', text: 'S1' },
        { id: 'l3', text: 'L3' },
      ],
      answerId: 'l5',
      explanation: 'L4 is the medial side, S1 the lateral border and sole.',
    },
    {
      id: 'ankle-jerk-myotome',
      prompt: 'Plantar flexion of the ankle is mainly supplied by:',
      options: [
        { id: 's1-s2', text: 'S1, S2' },
        { id: 'l4-l5', text: 'L4, L5' },
        { id: 'l3-l4', text: 'L3, L4' },
        { id: 'l5-s1', text: 'L5, S1' },
      ],
      answerId: 's1-s2',
      explanation: 'Dorsiflexion is L4, L5.',
    },
    {
      id: 'preaxial-bone',
      prompt: 'The preaxial bone of the leg is the:',
      options: [
        { id: 'tibia', text: 'Tibia' },
        { id: 'fibula', text: 'Fibula' },
        { id: 'talus', text: 'Talus' },
        { id: 'femur', text: 'Femur' },
      ],
      answerId: 'tibia',
      explanation:
        'The limb bud turned medially, bringing the preaxial border and big toe to the medial side.',
    },
    {
      id: 'lower-sympathetic-roots',
      prompt: 'The sympathetic supply of the lower limb arises from segments:',
      options: [
        { id: 't10-l2', text: 'T10 to L2' },
        { id: 't1-t5', text: 'T1 to T5' },
        { id: 's2-s4', text: 'S2 to S4' },
        { id: 'l3-l5', text: 'L3 to L5' },
      ],
      answerId: 't10-l2',
      explanation: 'S2 to S4 are parasympathetic; the limb has no parasympathetic supply.',
    },
  ],
  cards: [
    {
      id: 'lower-dermatome-map-card',
      front: 'Dermatomes of the lower limb, in order?',
      back: 'Down the preaxial (medial) border T12, L1 to L4; L5 the lateral leg, dorsum and middle toes; up the postaxial border S1 (lateral foot, sole, heel), S2, S3.',
    },
    {
      id: 'lower-myotome-chart-card',
      front: 'Segments for movements of the lower limb?',
      back: 'Hip flexion L1–L3, extension L5–S1; knee extension L3–L4, flexion L5–S1; dorsiflexion and inversion L4–L5; plantar flexion S1–S2; eversion L5–S1.',
    },
    {
      id: 'lower-reflexes-card',
      front: 'Segments of the knee and ankle jerks?',
      back: 'Knee jerk L3, L4; ankle jerk S1, S2.',
    },
    {
      id: 'lumbar-sympathectomy-card',
      front: 'Lumbar sympathectomy: what and why?',
      back: 'Removing the second to fourth lumbar ganglia to dilate the leg vessels, as in Buerger’s disease; the first is spared for ejaculation.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 11 Segmental and Sympathetic Innervation',
      pages: '154–156',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '538–541' },
  ],
};
