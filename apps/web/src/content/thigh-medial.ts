import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  ADDUCTORS,
  HIP_THIGH_BONES,
  HIP_THIGH_MODEL_CREDIT,
  HIP_THIGH_MODEL_SRC,
  hipThighParts,
  THIGH_FRONT,
} from './hip-thigh-3d';

// Lower limb batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const thighMedial: Topic = {
  slug: 'thigh-medial',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Medial side of thigh: adductors and obturator nerve',
  summary:
    'The adductor muscles in their layers, the obturator nerve and its two divisions, and the vessels of the medial compartment.',
  estimatedMinutes: 13,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 4 Medial Side of Thigh, pages 66 to 73'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: medial compartment of the thigh and obturator nerve, pages 586 to 590 and 596',
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
    'Adductor compartment: adductor longus, brevis and magnus, gracilis and pectineus, with obturator externus deep.',
    'Adductor magnus and pectineus are hybrid: magnus by the obturator and sciatic nerves, pectineus by the femoral and obturator.',
    'Obturator nerve: L2–L4 ventral divisions, through the obturator canal, splitting round adductor brevis.',
    'Anterior division: pectineus, adductor longus, gracilis, (brevis), and the hip. Posterior division: obturator externus, adductor magnus, (brevis), and the knee.',
    'Hip disease can hurt in the knee: the obturator and femoral nerves supply both joints.',
  ],
  visual: {
    kind: 'path',
    // The muscles of the compartment, the obturator nerve and its divisions, and the arteries.
    diagram: {
      width: 360,
      height: 360,
      nodes: [
        {
          id: 'adductor-compartment',
          label: 'Adductor\ncompartment',
          name: 'Adductor (medial) compartment of the thigh',
          x: 50,
          y: 30,
        },
        { id: 'adductor-longus', label: 'Longus', name: 'Adductor longus', x: 145, y: 30 },
        { id: 'adductor-brevis', label: 'Brevis', name: 'Adductor brevis', x: 225, y: 30 },
        { id: 'adductor-magnus', label: 'Magnus', name: 'Adductor magnus', x: 305, y: 30 },
        { id: 'gracilis', label: 'Gracilis', name: 'Gracilis', x: 185, y: 96 },
        { id: 'pectineus', label: 'Pectineus', name: 'Pectineus', x: 285, y: 96 },
        {
          id: 'obturator-nerve',
          label: 'Obturator\nnerve',
          name: 'Obturator nerve',
          x: 50,
          y: 180,
        },
        {
          id: 'anterior-obturator',
          label: 'Anterior\ndivision',
          name: 'Anterior division, in front of adductor brevis',
          x: 145,
          y: 180,
        },
        {
          id: 'posterior-obturator',
          label: 'Posterior\ndivision',
          name: 'Posterior division, behind adductor brevis',
          x: 245,
          y: 180,
        },
        { id: 'hip-joint', label: 'Hip\njoint', name: 'Hip joint', x: 145, y: 256 },
        {
          id: 'obturator-externus',
          label: 'Obturator\nexternus',
          name: 'Obturator externus',
          x: 230,
          y: 256,
        },
        { id: 'knee-joint', label: 'Knee\njoint', name: 'Knee joint', x: 315, y: 256 },
        {
          id: 'arteries',
          label: 'Arteries',
          name: 'Arteries of the medial compartment',
          x: 50,
          y: 330,
        },
        {
          id: 'obturator-vein',
          label: 'Obturator\nartery',
          name: 'Obturator artery (shown by its vein)',
          x: 145,
          y: 330,
        },
        {
          id: 'medial-circumflex-femoral-vein',
          label: 'Medial\ncircumflex',
          name: 'Medial circumflex femoral artery (shown by its vein)',
          x: 230,
          y: 330,
        },
        {
          id: 'deep-femoral-vein',
          label: 'Profunda',
          name: 'Profunda femoris vessels',
          x: 315,
          y: 330,
        },
      ],
      edges: [
        { from: 'adductor-compartment', to: 'adductor-longus' },
        { from: 'adductor-compartment', to: 'adductor-brevis' },
        { from: 'adductor-compartment', to: 'adductor-magnus' },
        { from: 'adductor-compartment', to: 'gracilis' },
        { from: 'adductor-compartment', to: 'pectineus' },
        { from: 'obturator-nerve', to: 'anterior-obturator' },
        { from: 'obturator-nerve', to: 'posterior-obturator' },
        { from: 'anterior-obturator', to: 'hip-joint' },
        { from: 'posterior-obturator', to: 'obturator-externus' },
        { from: 'posterior-obturator', to: 'knee-joint' },
        { from: 'arteries', to: 'obturator-vein' },
        { from: 'arteries', to: 'medial-circumflex-femoral-vein' },
        { from: 'arteries', to: 'deep-femoral-vein' },
      ],
    },
    lesions: [
      {
        id: 'referred-knee-pain',
        label: 'Hip pain felt in the knee',
        nodeIds: ['obturator-nerve', 'hip-joint', 'knee-joint'],
        explanation:
          'The obturator nerve (and the femoral) supplies both the hip and the knee, so a diseased hip often hurts in the knee and down the medial thigh, and the reverse.',
      },
      {
        id: 'adductor-spasm',
        label: 'Adductor spasm',
        nodeIds: ['obturator-nerve', 'anterior-obturator'],
        explanation:
          'In some severe spastic paraplegias the adductors lock the thighs together; cutting the obturator nerve relieves it.',
      },
      {
        id: 'neck-of-femur',
        label: 'Fracture of the femoral neck',
        nodeIds: ['medial-circumflex-femoral-vein'],
        explanation:
          'The head of the femur is fed mainly by retinacular branches of the circumflex femoral arteries running up the neck. A fracture inside the capsule tears them and the head can die (avascular necrosis).',
      },
    ],
    drill: [
      {
        id: 'muscles',
        title: 'Muscles',
        hint: 'Three adductors, the slender one, and the flat one in the femoral triangle.',
        nodeIds: ['adductor-longus', 'adductor-brevis', 'adductor-magnus', 'gracilis', 'pectineus'],
      },
      {
        id: 'nerve',
        title: 'Obturator nerve',
        hint: 'Two divisions round adductor brevis, and a joint for each.',
        nodeIds: [
          'anterior-obturator',
          'posterior-obturator',
          'hip-joint',
          'obturator-externus',
          'knee-joint',
        ],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: HIP_THIGH_MODEL_CREDIT,
      parts: hipThighParts([
        ...HIP_THIGH_BONES,
        ...ADDUCTORS,
        'sartorius',
        'vastus-medialis',
        'femoral-artery',
        'femoral-vein',
        'deep-femoral-vein',
        'obturator-vein',
        'medial-circumflex-femoral-vein',
        'obturator-nerve',
        'femoral-nerve',
        'sciatic-nerve',
      ]),
      traces: [],
      stops: [
        {
          id: 'medial',
          title: 'The medial thigh',
          description:
            'From the medial side: gracilis runs down the inner edge, adductor longus and magnus fill the compartment, sartorius crosses in front.',
          target: [-55, -100, 620],
          position: [1005, -755, 723],
        },
        THIGH_FRONT,
        {
          id: 'layers',
          title: 'In layers',
          description:
            'From in front: pectineus and adductor longus on one plane, adductor brevis behind them with the obturator nerve’s divisions on either side, adductor magnus deepest.',
          target: [-55, -110, 730],
          position: [414, -929, 834],
        },
        {
          id: 'back',
          title: 'Adductor magnus from behind',
          description:
            'Its hamstring part runs down to the adductor tubercle, with the opening for the femoral vessels between its two parts.',
          target: [-60, -60, 600],
          position: [-126, 1086, 666],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'compartment',
      title: 'The adductor compartment',
      body: 'Between the medial and posterior intermuscular septa. Its muscles came partly from the flexors and partly from the extensors, which is why some have two nerve supplies. They steady the pelvis and thigh in standing and walking.',
      focus: ['adductor-compartment'],
    },
    {
      id: 'adductors',
      title: 'Three adductors',
      body: 'Adductor longus, triangular, from the front of the pubis to the middle of the linea aspera, forms the medial side and floor of the femoral triangle. Adductor brevis lies behind it and pectineus. Adductor magnus, the largest, from the ischiopubic ramus and ischial tuberosity to the gluteal tuberosity, linea aspera, supracondylar line and adductor tubercle: its adductor part by the obturator nerve, its hamstring part by the tibial part of the sciatic.',
      focus: ['adductor-longus', 'adductor-brevis', 'adductor-magnus'],
    },
    {
      id: 'gracilis-pectineus',
      title: 'Gracilis and pectineus',
      body: 'Gracilis, slender and superficial, runs from the pubis to the upper medial tibia behind sartorius; surgeons borrow it to replace damaged muscles. Pectineus, flat and in the floor of the femoral triangle, is supplied by both the femoral and obturator nerves.',
      focus: ['gracilis', 'pectineus'],
    },
    {
      id: 'nerve',
      title: 'Obturator nerve',
      body: 'From the ventral divisions of L2, L3 and L4 (the femoral is from the dorsal divisions). It runs along the medial border of psoas, over the side wall of the pelvis, and through the obturator canal, where it divides.',
      focus: ['obturator-nerve'],
    },
    {
      id: 'divisions',
      title: 'Its divisions',
      body: 'The anterior division runs in front of obturator externus and adductor brevis, behind pectineus and adductor longus, supplying pectineus, adductor longus, gracilis, often adductor brevis, and the hip; it ends on the femoral artery. The posterior division pierces obturator externus, runs behind adductor brevis on adductor magnus, supplies both, and ends as a twig to the knee. An accessory obturator nerve is present in about a third of people.',
      focus: [
        'anterior-obturator',
        'posterior-obturator',
        'hip-joint',
        'obturator-externus',
        'knee-joint',
      ],
    },
    {
      id: 'arteries',
      title: 'Arteries',
      body: 'The obturator artery, from the internal iliac, divides round the obturator membrane and sends an acetabular branch up the ligament of the head of the femur. The medial circumflex femoral artery, from the profunda, passes back between pectineus and psoas and helps form the trochanteric and cruciate anastomoses. The model has neither artery; their veins show where they run.',
      focus: ['arteries', 'obturator-vein', 'medial-circumflex-femoral-vein', 'deep-femoral-vein'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each adductor to light it, and switch the front muscles off in Layers to find the obturator nerve’s divisions.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'most-medial',
      prompt: 'The most medial muscle of the adductor compartment is:',
      options: [
        { id: 'gracilis', text: 'Gracilis' },
        { id: 'pectineus', text: 'Pectineus' },
        { id: 'magnus', text: 'Adductor magnus' },
        { id: 'sartorius', text: 'Sartorius' },
      ],
      answerId: 'gracilis',
      explanation: 'It is also the most superficial, running down to the upper medial tibia.',
    },
    {
      id: 'hybrid-muscle',
      prompt: 'Which of these is a hybrid muscle with two nerve supplies?',
      options: [
        { id: 'magnus', text: 'Adductor magnus' },
        { id: 'gracilis', text: 'Gracilis' },
        { id: 'longus', text: 'Adductor longus' },
        { id: 'brevis', text: 'Adductor brevis' },
      ],
      answerId: 'magnus',
      explanation:
        'Obturator nerve to its adductor part, tibial part of the sciatic to its hamstring part. Pectineus is the other hybrid.',
    },
    {
      id: 'magnus-hamstring-nerve',
      prompt: 'The hamstring part of adductor magnus is supplied by:',
      options: [
        { id: 'tibial', text: 'The tibial part of the sciatic nerve' },
        { id: 'posterior-obturator', text: 'The posterior division of the obturator nerve' },
        { id: 'anterior-obturator', text: 'The anterior division of the obturator nerve' },
        { id: 'femoral', text: 'The femoral nerve' },
      ],
      answerId: 'tibial',
      explanation:
        'The adductor part is supplied by the posterior division of the obturator nerve.',
    },
    {
      id: 'accessory-obturator',
      prompt: 'The accessory obturator nerve, when present, supplies:',
      options: [
        { id: 'both', text: 'Pectineus and the hip joint' },
        { id: 'pectineus', text: 'Pectineus only, always' },
        { id: 'psoas', text: 'Psoas major' },
        { id: 'gracilis', text: 'Gracilis' },
      ],
      answerId: 'both',
      explanation: 'It comes from L3 and L4 and crosses the superior pubic ramus behind pectineus.',
    },
  ],
  cards: [
    {
      id: 'medial-compartment-muscles',
      front: 'Muscles of the medial compartment of the thigh?',
      back: 'Adductor longus, brevis and magnus, gracilis, pectineus; obturator externus deep.',
    },
    {
      id: 'obturator-divisions',
      front: 'Branches of the anterior and posterior divisions of the obturator nerve?',
      back: 'Anterior: pectineus, adductor longus, gracilis, (brevis), hip joint. Posterior: obturator externus, adductor magnus, (brevis), knee joint.',
    },
    {
      id: 'femoral-vs-obturator',
      front: 'Femoral and obturator nerves compared?',
      back: 'Both L2–L4: femoral from dorsal divisions, lateral to psoas, under the inguinal ligament; obturator from ventral divisions, medial to psoas, through the obturator foramen.',
    },
    {
      id: 'adductor-longus-relations',
      front: 'Relations of adductor longus?',
      back: 'In front: spermatic cord, great saphenous vein, femoral vessels, sartorius. Behind: adductor brevis and magnus, anterior obturator division, profunda vessels.',
    },
    {
      id: 'medial-circumflex-card',
      front: 'Medial circumflex femoral artery: origin and anastomoses?',
      back: 'From the profunda femoris; its ascending branch joins the trochanteric anastomosis, its transverse branch the cruciate anastomosis.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 4 Medial Side of Thigh', pages: '66–73' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '586–590, 596' },
  ],
};
