import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  FRONT_MUSCLES,
  HIP_THIGH_BONES,
  HIP_THIGH_MODEL_CREDIT,
  HIP_THIGH_MODEL_SRC,
  hipThighParts,
  THIGH_FRONT,
} from './hip-thigh-3d';

// Lower limb batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const femoralVesselsNerve: Topic = {
  slug: 'femoral-vessels-nerve',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Femoral artery, vein and nerve',
  summary:
    'The chief artery of the lower limb and its branches, the profunda femoris and its circumflex and perforating branches, the femoral vein, and the femoral nerve to the front of the thigh.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 3 Front of Thigh, pages 55 to 59'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: thigh, arteries, veins and nerves, pages 592 to 597',
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
    'The femoral artery continues the external iliac at the midinguinal point and becomes the popliteal at the opening in adductor magnus.',
    'In the femoral triangle it gives three superficial branches (external pudendal, epigastric, circumflex iliac) and three deep (profunda femoris, deep external pudendal, muscular).',
    'Profunda femoris: the largest branch, from its lateral side 4 cm below the ligament; gives the medial and lateral circumflex femoral and the perforating arteries.',
    'The femoral vein is medial to the artery at the inguinal ligament, behind it at the apex of the triangle, and lateral to it in the adductor canal.',
    'Femoral nerve (L2–L4, dorsal divisions): anterior division to sartorius and the skin; posterior division to quadriceps and the saphenous nerve.',
  ],
  visual: {
    kind: 'path',
    // The artery and its branches, the vein and its tributaries, the nerve and its divisions.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        { id: 'femoral-artery', label: 'Femoral\nartery', name: 'Femoral artery', x: 50, y: 30 },
        {
          id: 'superficial-branches',
          label: 'Three\nsuperficial',
          name: 'Superficial external pudendal, epigastric and circumflex iliac arteries',
          x: 145,
          y: 30,
        },
        {
          id: 'profunda-femoris',
          label: 'Profunda\nfemoris',
          name: 'Profunda femoris artery (shown in the model by its vein)',
          x: 225,
          y: 30,
        },
        {
          id: 'descending-genicular-artery',
          label: 'Descending\ngenicular',
          name: 'Descending genicular artery, in the adductor canal',
          x: 305,
          y: 30,
        },
        {
          id: 'medial-circumflex-femoral-vein',
          label: 'Medial\ncircumflex',
          name: 'Medial circumflex femoral artery (shown by its vein)',
          x: 145,
          y: 110,
        },
        {
          id: 'lateral-circumflex-femoral-artery',
          label: 'Lateral\ncircumflex',
          name: 'Lateral circumflex femoral artery',
          x: 225,
          y: 110,
        },
        {
          id: 'perforating-arteries',
          label: 'Four\nperforating',
          name: 'Perforating arteries; the profunda ends as the fourth',
          x: 312,
          y: 110,
        },
        { id: 'femoral-vein', label: 'Femoral\nvein', name: 'Femoral vein', x: 50, y: 190 },
        {
          id: 'great-saphenous-vein',
          label: 'Great\nsaphenous',
          name: 'Great saphenous vein',
          x: 145,
          y: 190,
        },
        {
          id: 'deep-femoral-vein',
          label: 'Profunda\nvein',
          name: 'Profunda femoris vein',
          x: 225,
          y: 190,
        },
        {
          id: 'external-iliac-vein',
          label: 'External\niliac',
          name: 'External iliac vein, which it becomes',
          x: 305,
          y: 190,
        },
        { id: 'femoral-nerve', label: 'Femoral\nnerve', name: 'Femoral nerve', x: 50, y: 270 },
        {
          id: 'anterior-division',
          label: 'Anterior\ndivision',
          name: 'Anterior division: sartorius, intermediate and medial cutaneous nerves',
          x: 145,
          y: 270,
        },
        {
          id: 'posterior-division',
          label: 'Posterior\ndivision',
          name: 'Posterior division: quadriceps, saphenous nerve',
          x: 245,
          y: 270,
        },
        { id: 'sartorius', label: 'Sartorius', name: 'Sartorius', x: 100, y: 340 },
        {
          id: 'rectus-femoris',
          label: 'Quadri-\nceps',
          name: 'Quadriceps femoris',
          x: 200,
          y: 340,
        },
        { id: 'saphenous-nerve', label: 'Saphenous', name: 'Saphenous nerve', x: 300, y: 340 },
      ],
      edges: [
        { from: 'femoral-artery', to: 'superficial-branches' },
        { from: 'femoral-artery', to: 'profunda-femoris' },
        { from: 'femoral-artery', to: 'descending-genicular-artery' },
        { from: 'profunda-femoris', to: 'medial-circumflex-femoral-vein' },
        { from: 'profunda-femoris', to: 'lateral-circumflex-femoral-artery' },
        { from: 'profunda-femoris', to: 'perforating-arteries' },
        { from: 'femoral-vein', to: 'great-saphenous-vein' },
        { from: 'femoral-vein', to: 'deep-femoral-vein' },
        { from: 'femoral-vein', to: 'external-iliac-vein' },
        { from: 'femoral-nerve', to: 'anterior-division' },
        { from: 'femoral-nerve', to: 'posterior-division' },
        { from: 'anterior-division', to: 'sartorius' },
        { from: 'posterior-division', to: 'rectus-femoris' },
        { from: 'posterior-division', to: 'saphenous-nerve' },
      ],
    },
    lesions: [
      {
        id: 'femoral-pulse',
        label: 'Femoral pulse',
        nodeIds: ['femoral-artery'],
        explanation:
          'The pulse is felt at the midinguinal point against the head of the femur, where the artery can also be pressed to stop bleeding further down. Weak or absent femoral pulses on both sides suggest coarctation or blockage of the aorta.',
      },
      {
        id: 'apex-stab',
        label: 'Stab at the apex',
        nodeIds: ['femoral-artery', 'femoral-vein', 'deep-femoral-vein'],
        explanation:
          'At the apex of the femoral triangle the femoral artery, femoral vein, profunda vein and profunda artery lie one behind another, so a single stab can cut all four and bleed fatally.',
      },
      {
        id: 'femoral-nerve-injury',
        label: 'Femoral nerve injury',
        nodeIds: ['femoral-nerve', 'posterior-division', 'rectus-femoris'],
        explanation:
          'Quadriceps is paralysed, so the knee cannot be straightened and the knee jerk is lost, with numbness over the front of the thigh and the medial leg and foot.',
      },
    ],
    drill: [
      {
        id: 'artery',
        title: 'Femoral artery',
        hint: 'Its branches in the triangle and canal, and the profunda’s three groups.',
        nodeIds: [
          'superficial-branches',
          'profunda-femoris',
          'descending-genicular-artery',
          'medial-circumflex-femoral-vein',
          'lateral-circumflex-femoral-artery',
          'perforating-arteries',
        ],
      },
      {
        id: 'vein-nerve',
        title: 'Vein and nerve',
        hint: 'Two tributaries and where the vein goes, then the nerve’s divisions and their targets.',
        nodeIds: [
          'great-saphenous-vein',
          'deep-femoral-vein',
          'external-iliac-vein',
          'anterior-division',
          'posterior-division',
          'sartorius',
          'rectus-femoris',
          'saphenous-nerve',
        ],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: HIP_THIGH_MODEL_CREDIT,
      parts: hipThighParts([
        ...HIP_THIGH_BONES,
        ...FRONT_MUSCLES,
        'pectineus',
        'adductor-longus',
        'adductor-magnus',
        'external-iliac-artery',
        'femoral-artery',
        'superficial-epigastric-artery',
        'lateral-circumflex-femoral-artery',
        'perforating-arteries',
        'descending-genicular-artery',
        'popliteal-artery',
        'external-iliac-vein',
        'femoral-vein',
        'deep-femoral-vein',
        'great-saphenous-vein',
        'medial-circumflex-femoral-vein',
        'lateral-circumflex-femoral-vein',
        'femoral-nerve',
        'saphenous-nerve',
      ]),
      traces: [],
      stops: [
        THIGH_FRONT,
        {
          id: 'triangle',
          title: 'In the femoral triangle',
          description:
            'The femoral nerve divides soon after the ligament, the lateral circumflex femoral artery running out between its divisions.',
          target: [-65, -120, 760],
          position: [-202, -956, 825],
        },
        {
          id: 'medial',
          title: 'From the medial side',
          description:
            'The femoral vessels run down to the opening in adductor magnus, the profunda vessels behind adductor longus giving perforating branches round the back of the femur.',
          target: [-60, -115, 640],
          position: [859, -956, 744],
        },
        {
          id: 'lower-thigh',
          title: 'Into the popliteal fossa',
          description:
            'From behind and medially: the femoral artery and vein pass through the opening in adductor magnus to become the popliteal vessels behind the knee.',
          target: [-65, -95, 480],
          position: [461, 632, 551],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'artery',
      title: 'Femoral artery',
      body: 'The chief artery of the lower limb, continuing the external iliac artery behind the inguinal ligament at the midinguinal point. It runs down and medially through the femoral triangle and the adductor canal, and passes through the opening in adductor magnus to become the popliteal artery. It is not the original axis artery of the limb: that is represented by the inferior gluteal artery and the small artery to the sciatic nerve.',
      focus: ['femoral-artery'],
    },
    {
      id: 'branches',
      title: 'Its branches',
      body: 'In the triangle three superficial branches pierce the fascia: superficial external pudendal (to the external genitalia), superficial epigastric (to the lower abdominal wall) and superficial circumflex iliac (along the iliac crest). Three deep branches: the profunda femoris, deep external pudendal and muscular. In the adductor canal it gives the descending genicular artery to the knee.',
      focus: ['superficial-branches', 'profunda-femoris', 'descending-genicular-artery'],
    },
    {
      id: 'profunda',
      title: 'Profunda femoris',
      body: 'The largest branch and the main supply of all three compartments of the thigh. It leaves the lateral side of the femoral artery about 4 cm below the ligament, passes behind the femoral vessels and behind adductor longus, and ends as the fourth perforating artery. Its medial circumflex femoral branch passes back between pectineus and psoas towards the head of the femur; its lateral circumflex femoral branch runs out between the divisions of the femoral nerve with ascending, transverse and descending branches.',
      focus: [
        'profunda-femoris',
        'medial-circumflex-femoral-vein',
        'lateral-circumflex-femoral-artery',
        'perforating-arteries',
      ],
    },
    {
      id: 'vein',
      title: 'Femoral vein',
      body: 'It continues the popliteal vein at the opening in adductor magnus and becomes the external iliac vein behind the inguinal ligament. It lies lateral to the artery in the adductor canal, behind it at the apex of the triangle and medial to it at the ligament. It receives the great saphenous vein, the profunda and circumflex veins and the veins matching the femoral branches; it is a handy vein for infusions in infants.',
      focus: ['femoral-vein', 'great-saphenous-vein', 'deep-femoral-vein', 'external-iliac-vein'],
    },
    {
      id: 'nerve',
      title: 'Femoral nerve',
      body: 'The largest branch of the lumbar plexus, from the dorsal divisions of L2, L3 and L4. It enters the thigh behind the inguinal ligament lateral to the artery, in the groove between iliacus and psoas and outside the femoral sheath, and within 2.5 cm splits into two divisions with the lateral circumflex femoral artery between them. It supplies iliacus and pectineus higher up.',
      focus: ['femoral-nerve'],
    },
    {
      id: 'divisions',
      title: 'Its divisions',
      body: 'The anterior division supplies sartorius and gives the intermediate and medial cutaneous nerves of the thigh. The posterior division supplies rectus femoris (which also supplies the hip), the three vasti (which also supply the knee) and articularis genu, and gives the saphenous nerve. The nerve to vastus medialis is thick with fibres from the knee: Hilton’s law.',
      focus: [
        'anterior-division',
        'posterior-division',
        'sartorius',
        'rectus-femoris',
        'saphenous-nerve',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'The model has no profunda artery: its vein shows the way. Select each vessel and nerve to light it, then follow them down with the guided views.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'femoral-continuation',
      prompt: 'The femoral artery is the continuation of:',
      options: [
        { id: 'external-iliac', text: 'The external iliac artery' },
        { id: 'internal-iliac', text: 'The internal iliac artery' },
        { id: 'common-iliac', text: 'The common iliac artery' },
        { id: 'profunda', text: 'The profunda femoris artery' },
      ],
      answerId: 'external-iliac',
      explanation: 'It begins behind the inguinal ligament at the midinguinal point.',
    },
    {
      id: 'largest-femoral-branch',
      prompt: 'The largest branch of the femoral artery is:',
      options: [
        { id: 'profunda', text: 'Profunda femoris' },
        { id: 'superficial-epigastric', text: 'Superficial epigastric' },
        { id: 'deep-external-pudendal', text: 'Deep external pudendal' },
        { id: 'descending-genicular', text: 'Descending genicular' },
      ],
      answerId: 'profunda',
      explanation: 'It is the chief artery of all three compartments of the thigh.',
    },
    {
      id: 'vein-apex',
      prompt: 'At the apex of the femoral triangle, the femoral vein lies:',
      options: [
        { id: 'behind', text: 'Directly behind the artery' },
        { id: 'medial', text: 'Medial to the artery' },
        { id: 'lateral', text: 'Lateral to the artery' },
        { id: 'front', text: 'In front of the artery' },
      ],
      answerId: 'behind',
      explanation:
        'It is medial at the inguinal ligament and lateral at the lower end of the adductor canal.',
    },
    {
      id: 'saphenous-from',
      prompt: 'The saphenous nerve is a branch of:',
      options: [
        { id: 'posterior-femoral', text: 'The posterior division of the femoral nerve' },
        { id: 'anterior-femoral', text: 'The anterior division of the femoral nerve' },
        { id: 'obturator', text: 'The obturator nerve' },
        { id: 'tibial', text: 'The tibial nerve' },
      ],
      answerId: 'posterior-femoral',
      explanation: 'It is the longest cutaneous nerve, reaching the medial side of the foot.',
    },
  ],
  cards: [
    {
      id: 'femoral-artery-branches',
      front: 'Branches of the femoral artery?',
      back: 'Superficial: external pudendal, epigastric, circumflex iliac. Deep: profunda femoris, deep external pudendal, muscular. In the canal: descending genicular.',
    },
    {
      id: 'profunda-branches',
      front: 'Branches of the profunda femoris?',
      back: 'Medial and lateral circumflex femoral arteries and three perforating arteries; it ends as the fourth perforating.',
    },
    {
      id: 'femoral-vein-relation',
      front: 'Relation of the femoral vein to the artery along the thigh?',
      back: 'Medial at the inguinal ligament, behind at the apex of the femoral triangle, lateral at the lower end of the adductor canal.',
    },
    {
      id: 'femoral-nerve-branches',
      front: 'Branches of the femoral nerve?',
      back: 'Anterior division: sartorius, intermediate and medial cutaneous nerves. Posterior division: rectus femoris, three vasti, articularis genu, saphenous nerve.',
    },
    {
      id: 'hiltons-law',
      front: 'What is Hilton’s law?',
      back: 'The nerve to a muscle crossing a joint also supplies the joint and the skin over the muscle.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 3 Front of Thigh', pages: '55–59' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '592–597' },
  ],
};
