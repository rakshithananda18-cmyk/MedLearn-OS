import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  HIP_THIGH_BONES,
  HIP_THIGH_MODEL_CREDIT,
  HIP_THIGH_MODEL_SRC,
  hipThighParts,
} from './hip-thigh-3d';

// Lower limb batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const femoralTriangle: Topic = {
  slug: 'femoral-triangle',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Femoral triangle, sheath and canal',
  summary:
    'The triangle below the inguinal ligament, its floor and contents, the femoral sheath with its three compartments, and the femoral canal where a femoral hernia comes through.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 3 Front of Thigh, pages 51 to 55'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: femoral triangle and femoral sheath, pages 564 to 565',
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
    'Femoral triangle: inguinal ligament above, medial border of sartorius laterally, medial border of adductor longus medially; apex continues into the adductor canal.',
    'Floor, lateral to medial: iliacus, psoas major, pectineus, adductor longus.',
    'Contents, lateral to medial: femoral nerve (outside the sheath), femoral artery, femoral vein, deep inguinal nodes in the femoral canal.',
    'Femoral sheath: fascia transversalis in front, fascia iliaca behind; compartments for artery, vein and the femoral canal.',
    'Femoral ring: inguinal ligament in front, pectineus behind, lacunar ligament medially, femoral vein laterally. Femoral hernia is commoner in women.',
  ],
  visual: {
    kind: 'path',
    // Boundaries, floor, contents, the sheath and the canal.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'femoral-triangle',
          label: 'Femoral\ntriangle',
          name: 'Femoral triangle',
          x: 50,
          y: 30,
        },
        {
          id: 'inguinal-ligament',
          label: 'Inguinal\nligament',
          name: 'Base: inguinal ligament',
          x: 145,
          y: 30,
        },
        {
          id: 'sartorius',
          label: 'Sartorius',
          name: 'Lateral side: medial border of sartorius',
          x: 225,
          y: 30,
        },
        {
          id: 'adductor-longus',
          label: 'Adductor\nlongus',
          name: 'Medial side: medial border of adductor longus',
          x: 305,
          y: 30,
        },
        { id: 'floor', label: 'Floor', name: 'Floor of the femoral triangle', x: 50, y: 106 },
        { id: 'iliacus', label: 'Iliacus', name: 'Iliacus', x: 145, y: 106 },
        { id: 'psoas-major', label: 'Psoas', name: 'Psoas major', x: 225, y: 106 },
        { id: 'pectineus', label: 'Pectineus', name: 'Pectineus', x: 305, y: 106 },
        { id: 'contents', label: 'Contents', name: 'Contents, lateral to medial', x: 50, y: 186 },
        {
          id: 'femoral-nerve',
          label: 'Nerve',
          name: 'Femoral nerve, outside the sheath, lateral to the artery',
          x: 145,
          y: 186,
        },
        { id: 'femoral-artery', label: 'Artery', name: 'Femoral artery', x: 225, y: 186 },
        { id: 'femoral-vein', label: 'Vein', name: 'Femoral vein', x: 305, y: 186 },
        { id: 'femoral-sheath', label: 'Femoral\nsheath', name: 'Femoral sheath', x: 50, y: 262 },
        {
          id: 'arterial-compartment',
          label: 'Lateral:\nartery',
          name: 'Lateral compartment: femoral artery and femoral branch of the genitofemoral nerve',
          x: 145,
          y: 262,
        },
        {
          id: 'venous-compartment',
          label: 'Middle:\nvein',
          name: 'Intermediate compartment: femoral vein',
          x: 225,
          y: 262,
        },
        {
          id: 'femoral-canal',
          label: 'Medial:\ncanal',
          name: 'Medial compartment: the femoral canal',
          x: 305,
          y: 262,
        },
        {
          id: 'femoral-ring',
          label: 'Femoral\nring',
          name: 'Femoral ring, the mouth of the canal',
          x: 50,
          y: 340,
        },
        {
          id: 'lacunar-ligament',
          label: 'Lacunar\nligament',
          name: 'Lacunar ligament, its medial boundary',
          x: 145,
          y: 340,
        },
        {
          id: 'cloquet-node',
          label: 'Node of\nCloquet',
          name: 'Lymph node of Cloquet in the canal',
          x: 225,
          y: 340,
        },
        {
          id: 'femoral-septum',
          label: 'Femoral\nseptum',
          name: 'Femoral septum closing the ring',
          x: 305,
          y: 340,
        },
      ],
      edges: [
        { from: 'femoral-triangle', to: 'inguinal-ligament' },
        { from: 'femoral-triangle', to: 'sartorius' },
        { from: 'femoral-triangle', to: 'adductor-longus' },
        { from: 'floor', to: 'iliacus' },
        { from: 'floor', to: 'psoas-major' },
        { from: 'floor', to: 'pectineus' },
        { from: 'contents', to: 'femoral-nerve' },
        { from: 'contents', to: 'femoral-artery' },
        { from: 'contents', to: 'femoral-vein' },
        { from: 'femoral-sheath', to: 'arterial-compartment' },
        { from: 'femoral-sheath', to: 'venous-compartment' },
        { from: 'femoral-sheath', to: 'femoral-canal' },
        { from: 'femoral-ring', to: 'lacunar-ligament' },
        { from: 'femoral-ring', to: 'cloquet-node' },
        { from: 'femoral-ring', to: 'femoral-septum' },
      ],
    },
    lesions: [
      {
        id: 'femoral-hernia',
        label: 'Femoral hernia',
        nodeIds: ['femoral-canal', 'femoral-ring', 'lacunar-ligament'],
        explanation:
          'Bowel pushes down through the femoral ring into the canal, forwards through the saphenous opening and then up over the inguinal ligament, below and lateral to the pubic tubercle. It is commoner in women, whose wider pelvis and smaller vessels leave a wider canal, and is never congenital.',
      },
      {
        id: 'abnormal-obturator',
        label: 'Abnormal obturator artery',
        nodeIds: ['lacunar-ligament', 'femoral-ring'],
        explanation:
          'To free a strangulated femoral hernia the surgeon cuts the lacunar ligament. Sometimes an obturator artery arising from the inferior epigastric runs along that edge, and cutting it bleeds badly.',
      },
      {
        id: 'psoas-abscess',
        label: 'Psoas abscess',
        nodeIds: ['psoas-major', 'iliacus'],
        explanation:
          'Pus from tuberculosis of the lumbar spine tracks down inside the psoas sheath, behind the inguinal ligament, into the femoral triangle, where it can be mistaken for enlarged nodes.',
      },
    ],
    drill: [
      {
        id: 'triangle',
        title: 'Boundaries and floor',
        hint: 'Three sides, then the four muscles of the floor from lateral to medial.',
        nodeIds: [
          'inguinal-ligament',
          'sartorius',
          'adductor-longus',
          'iliacus',
          'psoas-major',
          'pectineus',
        ],
      },
      {
        id: 'sheath',
        title: 'Contents, sheath and canal',
        hint: 'NAV from lateral to medial, the three compartments, and what bounds and fills the ring.',
        nodeIds: [
          'femoral-nerve',
          'femoral-artery',
          'femoral-vein',
          'arterial-compartment',
          'venous-compartment',
          'femoral-canal',
          'lacunar-ligament',
          'cloquet-node',
          'femoral-septum',
        ],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: HIP_THIGH_MODEL_CREDIT,
      parts: hipThighParts([
        ...HIP_THIGH_BONES,
        'sartorius',
        'adductor-longus',
        'iliacus',
        'psoas-major',
        'pectineus',
        'rectus-femoris',
        'vastus-medialis',
        'adductor-brevis',
        'femoral-artery',
        'external-iliac-artery',
        'femoral-vein',
        'external-iliac-vein',
        'deep-femoral-vein',
        'great-saphenous-vein',
        'femoral-nerve',
        'genitofemoral-nerve',
        'lateral-cutaneous-nerve-of-thigh',
      ]),
      traces: [],
      stops: [
        {
          id: 'triangle',
          title: 'The triangle',
          description:
            'Below the inguinal ligament, between sartorius and adductor longus: the femoral nerve, artery and vein from lateral to medial.',
          target: [-60, -125, 735],
          position: [-153, -966, 821],
        },
        {
          id: 'floor',
          title: 'Its floor',
          description:
            'From in front and medially: iliacus and psoas laterally, pectineus and adductor longus medially, sloping back into a gutter.',
          target: [-60, -115, 740],
          position: [456, -842, 862],
        },
        {
          id: 'sheath',
          title: 'Under the inguinal ligament',
          description:
            'Close up: the artery and vein enter the thigh in their sheath at the midinguinal point; the nerve lies lateral to the sheath, the femoral canal medial to the vein.',
          target: [-50, -138, 805],
          position: [-127, -778, 892],
        },
        {
          id: 'apex',
          title: 'Apex',
          description:
            'At the apex the femoral artery, femoral vein, profunda vein and profunda artery lie one behind the other, so one stab wound can cut them all.',
          target: [-55, -120, 640],
          position: [-234, -899, 671],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'triangle',
      title: 'The triangle',
      body: 'A triangular hollow in the upper third of the front of the thigh. Its base is the inguinal ligament, its lateral side the medial border of sartorius, its medial side the medial border of adductor longus; the apex, where the two muscles cross, leads into the adductor canal.',
      focus: ['femoral-triangle', 'inguinal-ligament', 'sartorius', 'adductor-longus'],
    },
    {
      id: 'roof-floor',
      title: 'Roof and floor',
      body: 'The roof is skin, superficial fascia with its nodes, nerves and the upper great saphenous vein, and the fascia lata with the cribriform fascia. The floor is a gutter: iliacus and psoas major laterally, pectineus and adductor longus medially.',
      focus: ['floor', 'iliacus', 'psoas-major', 'pectineus'],
    },
    {
      id: 'contents',
      title: 'Contents',
      body: 'From lateral to medial: the femoral nerve in the groove between iliacus and psoas, outside the sheath; the femoral artery from the midinguinal point to the apex; the femoral vein, medial to the artery at the base and behind it at the apex; and the deep inguinal nodes. The lateral cutaneous nerve of the thigh crosses its lateral corner.',
      focus: ['contents', 'femoral-nerve', 'femoral-artery', 'femoral-vein'],
    },
    {
      id: 'sheath',
      title: 'Femoral sheath',
      body: 'A funnel of fascia round the upper 3 to 4 cm of the femoral vessels, its front from the fascia transversalis and its back from the fascia iliaca. The femoral nerve stays outside because it lies behind the fascia iliaca. Septa divide it into a lateral compartment (artery and femoral branch of the genitofemoral nerve), an intermediate one (vein) and a medial one, the femoral canal.',
      focus: ['femoral-sheath', 'arterial-compartment', 'venous-compartment', 'femoral-canal'],
    },
    {
      id: 'canal',
      title: 'Femoral canal and ring',
      body: 'The canal is about 1.5 cm long and wide, holding the lymph node of Cloquet, lymphatics and fat. Its mouth, the femoral ring, is bounded by the inguinal ligament in front, pectineus behind, the lacunar ligament medially and the femoral vein laterally, and is closed by the femoral septum. It is a weak spot, and room for the vein to swell.',
      focus: ['femoral-ring', 'lacunar-ligament', 'cloquet-node', 'femoral-septum'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each boundary and content to light it, then turn on a femoral hernia to follow its path.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'triangle-lateral',
      prompt: 'The lateral boundary of the femoral triangle is:',
      options: [
        { id: 'sartorius', text: 'The medial border of sartorius' },
        { id: 'inguinal', text: 'The inguinal ligament' },
        { id: 'adductor-longus', text: 'The medial border of adductor longus' },
        { id: 'pectineus', text: 'Pectineus' },
      ],
      answerId: 'sartorius',
      explanation: 'The inguinal ligament is its base and adductor longus its medial side.',
    },
    {
      id: 'femoral-ring-medial',
      prompt: 'The medial boundary of the femoral ring is:',
      options: [
        { id: 'lacunar', text: 'The lacunar ligament' },
        { id: 'inguinal', text: 'The inguinal ligament' },
        { id: 'pectineus', text: 'Pectineus' },
        { id: 'vein', text: 'The femoral vein' },
      ],
      answerId: 'lacunar',
      explanation:
        'In front is the inguinal ligament, behind is pectineus, and laterally the femoral vein.',
    },
    {
      id: 'femoral-hernia-women',
      prompt: 'A femoral hernia is commoner in women because:',
      options: [
        { id: 'all', text: 'All of these: wider pelvis, smaller femoral vessels, wider canal' },
        { id: 'pelvis', text: 'Only their wider pelvis' },
        { id: 'vessels', text: 'Only their smaller femoral vessels' },
        { id: 'canal', text: 'Only their wider femoral canal' },
      ],
      answerId: 'all',
      explanation: 'The three go together; an inguinal hernia, by contrast, is commoner in men.',
    },
    {
      id: 'nerve-outside-sheath',
      prompt: 'The femoral nerve lies outside the femoral sheath because:',
      options: [
        {
          id: 'behind-iliaca',
          text: 'It lies behind the fascia iliaca, which forms the back of the sheath',
        },
        { id: 'medial', text: 'It lies medial to the femoral vein' },
        { id: 'superficial', text: 'It runs in the superficial fascia' },
        { id: 'below', text: 'It enters the thigh below the inguinal ligament' },
      ],
      answerId: 'behind-iliaca',
      explanation:
        'The sheath is made from the fascia transversalis in front and the fascia iliaca behind.',
    },
  ],
  cards: [
    {
      id: 'femoral-triangle-boundaries',
      front: 'Boundaries of the femoral triangle?',
      back: 'Base: inguinal ligament. Lateral: medial border of sartorius. Medial: medial border of adductor longus. Apex continues into the adductor canal.',
    },
    {
      id: 'femoral-triangle-floor',
      front: 'Floor of the femoral triangle, lateral to medial?',
      back: 'Iliacus, psoas major, pectineus, adductor longus.',
    },
    {
      id: 'femoral-sheath-compartments',
      front: 'Compartments of the femoral sheath and their contents?',
      back: 'Lateral: femoral artery and femoral branch of genitofemoral nerve. Intermediate: femoral vein. Medial: femoral canal with lymph node of Cloquet.',
    },
    {
      id: 'femoral-ring-boundaries',
      front: 'Boundaries of the femoral ring?',
      back: 'Front: inguinal ligament. Back: pectineus and its fascia. Medial: lacunar ligament. Lateral: septum beside the femoral vein.',
    },
    {
      id: 'femoral-hernia-path',
      front: 'Path of an enlarging femoral hernia?',
      back: 'Down through the femoral canal, forwards through the saphenous opening, then up over the inguinal ligament; reduced in reverse.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 3 Front of Thigh', pages: '51–55' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '564–565' },
  ],
};
