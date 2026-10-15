import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  ANKLE_MEDIAL,
  DORSUM_ABOVE,
  GROIN_FRONT,
  KNEE_BACK,
  LIMB_FRONT,
  LOWER_LIMB_ARTERIES,
  LOWER_LIMB_BONES,
  LOWER_LIMB_MODEL_CREDIT,
  LOWER_LIMB_MODEL_SRC,
  lowerLimbParts,
} from './lower-limb-3d';

// Lower limb batch 6 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const lowerLimbSurfaceMarking: Topic = {
  slug: 'lower-limb-surface-marking',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Lower limb: surface marking and pulses',
  summary:
    'Where the main artery runs under the skin from the groin to the sole, and where to feel its four pulses.',
  estimatedMinutes: 10,
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
      'Volume 2, Chapter 14 Surface and Radiological Anatomy, pages 196 to 199',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb: surface anatomy, pages 660, 663, 665 and 667',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones and vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The femoral artery follows the upper two-thirds of a line from the midinguinal point (midway between the anterior superior iliac spine and the pubic symphysis) to the adductor tubercle, with the thigh bent, abducted and turned out: its upper third lies in the femoral triangle, its middle third in the adductor canal.',
    'The popliteal artery runs from the junction of the middle and lower thirds of the back of the thigh, 2.5 cm medial to the midline, to the midline behind the knee, and down to the level of the tibial tuberosity.',
    'The anterior tibial artery runs from 2.5 cm below the medial side of the head of the fibula to midway between the malleoli, where it becomes dorsalis pedis, which ends at the proximal end of the first intermetatarsal space.',
    'The posterior tibial artery runs from the midline at the level of the tibial tuberosity to midway between the medial malleolus and the tendo calcaneus, where it divides into the medial and lateral plantar arteries.',
    'Four pulses: femoral (just below the inguinal ligament at the midinguinal point), popliteal (deep in the fossa with the knee bent; where blood pressure in the leg is taken), posterior tibial (between the medial malleolus and the heel) and dorsalis pedis (on the dorsum, lateral to the tendon of extensor hallucis longus).',
  ],
  visual: {
    kind: 'path',
    // Left: the arterial trunk from the groin to the sole. Right: where each part's pulse is felt.
    diagram: {
      width: 360,
      height: 420,
      nodes: [
        {
          id: 'external-iliac-artery',
          label: 'External\niliac',
          name: 'External iliac artery',
          x: 110,
          y: 30,
        },
        {
          id: 'femoral-artery',
          label: 'Femoral',
          name: 'Femoral artery: midinguinal point to adductor tubercle',
          x: 110,
          y: 95,
        },
        {
          id: 'femoral-pulse',
          label: 'Femoral\npulse',
          name: 'Femoral pulse: just below the inguinal ligament at the midinguinal point',
          x: 305,
          y: 95,
        },
        {
          id: 'popliteal-artery',
          label: 'Popliteal',
          name: 'Popliteal artery: down the back of the knee',
          x: 110,
          y: 160,
        },
        {
          id: 'popliteal-pulse',
          label: 'Popliteal\npulse',
          name: 'Popliteal pulse: deep in the fossa, knee bent',
          x: 305,
          y: 160,
        },
        {
          id: 'anterior-tibial-artery',
          label: 'Anterior\ntibial',
          name: 'Anterior tibial artery: below the fibular head to between the malleoli',
          x: 55,
          y: 235,
        },
        {
          id: 'posterior-tibial-artery',
          label: 'Posterior\ntibial',
          name: 'Posterior tibial artery: to between the medial malleolus and the tendo calcaneus',
          x: 165,
          y: 235,
        },
        {
          id: 'posterior-tibial-pulse',
          label: 'Posterior\ntibial\npulse',
          name: 'Posterior tibial pulse: between the medial malleolus and the heel',
          x: 305,
          y: 235,
        },
        {
          id: 'dorsalis-pedis-artery',
          label: 'Dorsalis\npedis',
          name: 'Dorsalis pedis artery: to the first intermetatarsal space',
          x: 55,
          y: 315,
        },
        {
          id: 'medial-plantar-artery',
          label: 'Medial\nplantar',
          name: 'Medial plantar artery: towards the big toe',
          x: 135,
          y: 315,
        },
        {
          id: 'lateral-plantar-artery',
          label: 'Lateral\nplantar',
          name: 'Lateral plantar artery: towards the fifth metatarsal',
          x: 205,
          y: 315,
        },
        {
          id: 'dorsalis-pedis-pulse',
          label: 'Dorsalis\npedis\npulse',
          name: 'Dorsalis pedis pulse: lateral to the tendon of extensor hallucis longus',
          x: 305,
          y: 315,
        },
        {
          id: 'plantar-arch',
          label: 'Plantar\narch',
          name: 'Plantar arch: across the bases of the metatarsals',
          x: 205,
          y: 390,
        },
      ],
      edges: [
        { from: 'external-iliac-artery', to: 'femoral-artery' },
        { from: 'femoral-artery', to: 'popliteal-artery' },
        { from: 'popliteal-artery', to: 'anterior-tibial-artery' },
        { from: 'popliteal-artery', to: 'posterior-tibial-artery' },
        { from: 'anterior-tibial-artery', to: 'dorsalis-pedis-artery' },
        { from: 'posterior-tibial-artery', to: 'medial-plantar-artery' },
        { from: 'posterior-tibial-artery', to: 'lateral-plantar-artery' },
        { from: 'lateral-plantar-artery', to: 'plantar-arch' },
        { from: 'femoral-artery', to: 'femoral-pulse' },
        { from: 'popliteal-artery', to: 'popliteal-pulse' },
        { from: 'posterior-tibial-artery', to: 'posterior-tibial-pulse' },
        { from: 'dorsalis-pedis-artery', to: 'dorsalis-pedis-pulse' },
      ],
    },
    lesions: [
      {
        id: 'peripheral-arterial-disease',
        label: 'Weak foot pulses',
        nodeIds: ['posterior-tibial-pulse', 'dorsalis-pedis-pulse', 'popliteal-artery'],
        explanation:
          'When the arteries of the limb narrow, the pulses at the foot are the first to weaken or go. The muscles they feed cramp on walking and recover with rest (intermittent claudication), so feeling the posterior tibial and dorsalis pedis pulses is the first check.',
      },
      {
        id: 'femoral-puncture',
        label: 'Femoral puncture',
        nodeIds: ['femoral-pulse', 'femoral-artery'],
        explanation:
          'At the midinguinal point the femoral artery lies just under the skin over the head of the femur: the usual way in for catheters and arterial samples. The vein lies just medial to it and the nerve just lateral, so the pulse guides a needle to either.',
      },
      {
        id: 'popliteal-aneurysm',
        label: 'Popliteal aneurysm',
        nodeIds: ['popliteal-pulse', 'popliteal-artery'],
        explanation:
          'A swelling behind the knee that beats with the pulse: the popliteal artery widened. It can press on the tibial nerve, or clot and starve the leg below.',
      },
    ],
    drill: [
      {
        id: 'arterial-trunk',
        title: 'The arterial trunk',
        hint: 'From the groin to the sole, the trunk then its two branches below the knee.',
        nodeIds: [
          'external-iliac-artery',
          'femoral-artery',
          'popliteal-artery',
          'anterior-tibial-artery',
          'posterior-tibial-artery',
          'dorsalis-pedis-artery',
          'medial-plantar-artery',
          'lateral-plantar-artery',
          'plantar-arch',
        ],
      },
      {
        id: 'pulse-points',
        title: 'The four pulses',
        hint: 'Groin, back of the knee, behind the medial malleolus, top of the foot.',
        nodeIds: [
          'femoral-pulse',
          'popliteal-pulse',
          'posterior-tibial-pulse',
          'dorsalis-pedis-pulse',
        ],
      },
    ],
    model3d: {
      src: LOWER_LIMB_MODEL_SRC,
      credit: LOWER_LIMB_MODEL_CREDIT,
      parts: lowerLimbParts([
        ...LOWER_LIMB_BONES,
        ...LOWER_LIMB_ARTERIES,
        'femoral-vein',
        'great-saphenous-vein',
        'small-saphenous-vein',
        'femoral-nerve',
      ]),
      traces: [],
      stops: [
        {
          ...LIMB_FRONT,
          description:
            'The arterial trunk from the groin to the ankle: external iliac, femoral down the front and inner side of the thigh, then out of sight behind the knee.',
        },
        {
          ...GROIN_FRONT,
          title: 'The femoral pulse',
          description:
            'At the midinguinal point, just below the inguinal ligament: the artery over the head of the femur, the vein medial to it, the nerve lateral.',
        },
        {
          ...KNEE_BACK,
          title: 'The popliteal pulse',
          description:
            'Deep in the fossa against the back of the femur and tibia, felt with the knee bent so the deep fascia is slack.',
        },
        {
          ...ANKLE_MEDIAL,
          title: 'The posterior tibial pulse',
          description:
            'Behind the medial malleolus, between it and the heel, before the artery divides into the plantar arteries.',
        },
        {
          ...DORSUM_ABOVE,
          title: 'The dorsalis pedis pulse',
          description:
            'On the top of the foot, from between the malleoli to the first space between the metatarsals, beside the tendon of extensor hallucis longus.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'trunk',
      title: 'One trunk, two branches',
      body: 'The main artery of the limb is one trunk under different names: the external iliac becomes the femoral behind the inguinal ligament, the femoral becomes the popliteal as it passes through adductor magnus to the back of the knee, and the popliteal ends at the lower border of popliteus by dividing into the anterior and posterior tibial arteries. Each can be drawn on the skin between two or three landmarks.',
      focus: [
        'external-iliac-artery',
        'femoral-artery',
        'popliteal-artery',
        'anterior-tibial-artery',
        'posterior-tibial-artery',
      ],
    },
    {
      id: 'femoral',
      title: 'The femoral artery',
      body: 'Bend the thigh, abduct it and turn it out. Join the midinguinal point (midway between the anterior superior iliac spine and the pubic symphysis) to the adductor tubercle, felt at the lower end of the cord-like tendon of adductor magnus. The artery lies along the upper two-thirds of this line: the upper third in the femoral triangle, the middle third in the adductor canal. Its large branch, the profunda femoris, leaves it about 3.5 cm below the midinguinal point.',
      focus: ['femoral-artery', 'femoral-pulse'],
    },
    {
      id: 'popliteal',
      title: 'The popliteal artery',
      body: 'On the back of the limb, start at the junction of the middle and lower thirds of the thigh, 2.5 cm medial to the midline; go to the midline behind the knee, then straight down to the level of the tibial tuberosity. Its pulse lies deep, against the back of the femur and tibia: bend the knee to slacken the fascia, and press with the fingertips of both hands. Blood pressure in the leg is taken over it.',
      focus: ['popliteal-artery', 'popliteal-pulse'],
    },
    {
      id: 'tibial',
      title: 'The two tibial arteries',
      body: 'The anterior tibial runs from 2.5 cm below the medial side of the head of the fibula, downwards and slightly medially, to midway between the malleoli. The posterior tibial runs from the midline at the level of the tibial tuberosity to midway between the medial malleolus and the tendo calcaneus, where its pulse is felt and where it divides into the plantar arteries.',
      focus: ['anterior-tibial-artery', 'posterior-tibial-artery', 'posterior-tibial-pulse'],
    },
    {
      id: 'foot',
      title: 'In the foot',
      body: 'Dorsalis pedis continues the anterior tibial from midway between the malleoli to the proximal end of the first intermetatarsal space; its pulse lies lateral to the tendon of extensor hallucis longus. In the sole, the medial plantar artery runs from below the medial malleolus towards the big toe, the lateral plantar across to 2.5 cm medial to the tuberosity of the fifth metatarsal, and from there the plantar arch curves back, convex forwards, to the first space.',
      focus: [
        'dorsalis-pedis-artery',
        'dorsalis-pedis-pulse',
        'medial-plantar-artery',
        'lateral-plantar-artery',
        'plantar-arch',
      ],
    },
    {
      id: 'pulses',
      title: 'The four pulses',
      body: 'Feel them from above down: femoral at the groin, popliteal behind the bent knee, posterior tibial behind the medial malleolus, dorsalis pedis on the top of the foot. Compare the two sides. The foot pulses tell first when the arteries of the limb narrow.',
      focus: ['femoral-pulse', 'popliteal-pulse', 'posterior-tibial-pulse', 'dorsalis-pedis-pulse'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'Step through the four pulse points on the model, then hide the bones to see the whole trunk at once.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'femoral-line-end',
      prompt:
        'The femoral artery is marked by the upper two-thirds of a line from the midinguinal point to the:',
      options: [
        { id: 'adductor-tubercle', text: 'Adductor tubercle' },
        { id: 'medial-epicondyle', text: 'Medial epicondyle of the femur' },
        { id: 'tibial-tuberosity', text: 'Tibial tuberosity' },
        { id: 'patella', text: 'Upper border of the patella' },
      ],
      answerId: 'adductor-tubercle',
      explanation: 'With the thigh bent, abducted and turned out.',
    },
    {
      id: 'midinguinal-point',
      prompt:
        'The midinguinal point lies midway between the anterior superior iliac spine and the:',
      options: [
        { id: 'symphysis', text: 'Pubic symphysis' },
        { id: 'pubic-tubercle', text: 'Pubic tubercle' },
        { id: 'ischial-tuberosity', text: 'Ischial tuberosity' },
        { id: 'greater-trochanter', text: 'Greater trochanter' },
      ],
      answerId: 'symphysis',
      explanation:
        'Midway to the pubic tubercle is the midpoint of the inguinal ligament, a little lateral; the femoral artery enters the thigh at the midinguinal point.',
    },
    {
      id: 'dorsalis-pedis-pulse-landmark',
      prompt: 'The dorsalis pedis pulse is felt:',
      options: [
        { id: 'lateral-ehl', text: 'Lateral to the tendon of extensor hallucis longus' },
        { id: 'medial-ehl', text: 'Medial to the tendon of extensor hallucis longus' },
        { id: 'behind-lateral', text: 'Behind the lateral malleolus' },
        { id: 'navicular', text: 'Over the tuberosity of the navicular' },
      ],
      answerId: 'lateral-ehl',
      explanation:
        'Between it and the tendons of extensor digitorum longus, on the way to the first space.',
    },
    {
      id: 'lower-limb-bp-artery',
      prompt: 'Blood pressure in the lower limb is usually taken over the:',
      options: [
        { id: 'popliteal', text: 'Popliteal artery' },
        { id: 'dorsalis-pedis', text: 'Dorsalis pedis artery' },
        { id: 'posterior-tibial', text: 'Posterior tibial artery' },
        { id: 'femoral', text: 'Femoral artery' },
      ],
      answerId: 'popliteal',
      explanation: 'A cuff round the thigh, listening over the popliteal artery behind the knee.',
    },
  ],
  cards: [
    {
      id: 'femoral-marking-card',
      front: 'Surface marking of the femoral artery?',
      back: 'Upper two-thirds of a line from the midinguinal point to the adductor tubercle (thigh bent, abducted, turned out): upper third in the femoral triangle, middle third in the adductor canal.',
    },
    {
      id: 'popliteal-marking-card',
      front: 'Surface marking of the popliteal artery?',
      back: 'From the junction of the middle and lower thirds of the back of the thigh, 2.5 cm medial to the midline, to the midline behind the knee, then down to the level of the tibial tuberosity.',
    },
    {
      id: 'tibial-marking-card',
      front: 'Surface marking of the anterior and posterior tibial arteries?',
      back: 'Anterior: 2.5 cm below the medial side of the fibular head to midway between the malleoli. Posterior: midline at the level of the tibial tuberosity to midway between the medial malleolus and the tendo calcaneus.',
    },
    {
      id: 'lower-limb-pulses-card',
      front: 'Pulses of the lower limb, and where?',
      back: 'Femoral (midinguinal point, below the inguinal ligament), popliteal (deep in the fossa, knee bent), posterior tibial (between the medial malleolus and the heel), dorsalis pedis (lateral to the extensor hallucis longus tendon).',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 14 Surface and Radiological Anatomy',
      pages: '196–199',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '660, 663, 665, 667' },
  ],
};
