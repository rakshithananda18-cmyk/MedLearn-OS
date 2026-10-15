import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  BUTTOCK_BACK,
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
export const lowerLimbDevelopment: Topic = {
  slug: 'lower-limb-development',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Development of the lower limb',
  summary:
    'How the limb bud grows and is patterned, what the axis artery becomes, why the limb turns inwards, and the common birth defects of the limb.',
  estimatedMinutes: 10,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource(
      'bd-chaurasia',
      'Volume 2, Chapter 1 Introduction: development of the lower limb, pages 3 and 4',
    ),
    {
      title: 'OpenStax Anatomy and Physiology 2e',
      detail: '8.5 Development of the Appendicular Skeleton',
      url: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/8-5-development-of-the-appendicular-skeleton',
      licence: 'CC BY-NC-SA 4.0; cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones and arteries in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The lower limb bud appears at the end of the fourth week, a little after the upper, on the side of the body wall opposite the lumbar and upper sacral segments; TBX4 and FGF10 start its outgrowth.',
    'The apical ectodermal ridge at its tip (FGF8) drives growth from hip to toes; the zone of polarising activity at its back edge (sonic hedgehog) patterns the big toe to little toe axis; the dorsal ectoderm (WNT7a) makes the dorsum of the foot differ from the sole.',
    'Bone, cartilage and tendon form from the mesoderm of the bud itself; muscle cells migrate in from the somites.',
    'The axis artery, the sciatic artery, runs down the back of the limb with the sciatic nerve. It persists as the inferior gluteal artery, the small artery to the sciatic nerve, and parts of the popliteal and peroneal arteries; the femoral artery grows from the external iliac and takes over the thigh.',
    'In the seventh week the lower limb turns 90 degrees medially, the opposite way to the upper: the extensors come to face forwards, the knee points forwards and the big toe lies medially, and the dermatomes spiral down the limb. Toes separate as the cells between them die.',
  ],
  visual: {
    kind: 'path',
    // Top: the bud and its three signalling centres. Left below: the axis artery and what it
    // becomes. Right below: the turn inwards and what it brings. Bottom: when development fails.
    diagram: {
      width: 360,
      height: 430,
      nodes: [
        {
          id: 'limb-bud',
          label: 'Limb bud,\nweek 4',
          name: 'Lower limb bud, end of week 4, opposite the lumbar and upper sacral segments',
          x: 180,
          y: 30,
        },
        {
          id: 'apical-ridge',
          label: 'Apical\nridge',
          name: 'Apical ectodermal ridge (FGF8): growth from hip to toes',
          x: 60,
          y: 105,
        },
        {
          id: 'polarising-zone',
          label: 'Polarising\nzone',
          name: 'Zone of polarising activity (sonic hedgehog): big toe to little toe',
          x: 180,
          y: 105,
        },
        {
          id: 'dorsal-ectoderm',
          label: 'Dorsal\nectoderm',
          name: 'Dorsal ectoderm (WNT7a): dorsum or sole',
          x: 300,
          y: 105,
        },
        {
          id: 'axis-artery',
          label: 'Axis\nartery',
          name: 'Axis artery: the sciatic artery, down the back of the limb',
          x: 60,
          y: 180,
        },
        {
          id: 'medial-rotation',
          label: 'Turns in 90°,\nweek 7',
          name: 'The limb turns 90 degrees medially in the seventh week',
          x: 255,
          y: 180,
        },
        {
          id: 'inferior-gluteal-vein',
          label: 'Inferior\ngluteal',
          name: 'Inferior gluteal artery (the model shows its vein)',
          x: 40,
          y: 255,
        },
        {
          id: 'popliteal-artery',
          label: 'Popliteal',
          name: 'Part of the popliteal artery',
          x: 118,
          y: 255,
        },
        {
          id: 'knee-forward',
          label: 'Knee\nforward',
          name: 'Extensors in front, the knee pointing forwards',
          x: 220,
          y: 255,
        },
        {
          id: 'big-toe-medial',
          label: 'Big toe\nmedial',
          name: 'The big toe, on the preaxial border, comes to lie medially',
          x: 310,
          y: 255,
        },
        {
          id: 'peroneal-vein',
          label: 'Peroneal',
          name: 'Peroneal artery (the model shows its vein)',
          x: 60,
          y: 325,
        },
        {
          id: 'femoral-artery',
          label: 'Femoral\ntakes over',
          name: 'Femoral artery, from the external iliac, takes over the thigh',
          x: 140,
          y: 325,
        },
        {
          id: 'dermatomes',
          label: 'Dermatomes\nspiral',
          name: 'Dermatomes spiral down the limb',
          x: 255,
          y: 325,
        },
        {
          id: 'toes-separate',
          label: 'Toes\nseparate',
          name: 'Toes separate as the cells between them die',
          x: 60,
          y: 400,
        },
        {
          id: 'club-foot',
          label: 'Club foot',
          name: 'Club foot (talipes equinovarus)',
          x: 160,
          y: 400,
        },
        {
          id: 'hip-dysplasia',
          label: 'Hip\ndysplasia',
          name: 'Developmental dysplasia of the hip',
          x: 250,
          y: 400,
        },
        {
          id: 'extra-toes',
          label: 'Extra\ntoes',
          name: 'Extra toes (polydactyly)',
          x: 330,
          y: 400,
        },
      ],
      edges: [
        { from: 'limb-bud', to: 'apical-ridge' },
        { from: 'limb-bud', to: 'polarising-zone' },
        { from: 'limb-bud', to: 'dorsal-ectoderm' },
        { from: 'limb-bud', to: 'axis-artery' },
        { from: 'limb-bud', to: 'medial-rotation' },
        { from: 'axis-artery', to: 'inferior-gluteal-vein' },
        { from: 'axis-artery', to: 'popliteal-artery' },
        { from: 'axis-artery', to: 'peroneal-vein' },
        { from: 'femoral-artery', to: 'popliteal-artery' },
        { from: 'medial-rotation', to: 'knee-forward' },
        { from: 'medial-rotation', to: 'big-toe-medial' },
        { from: 'medial-rotation', to: 'dermatomes' },
        { from: 'apical-ridge', to: 'toes-separate' },
        { from: 'polarising-zone', to: 'extra-toes' },
      ],
    },
    lesions: [
      {
        id: 'club-foot',
        label: 'Club foot',
        nodeIds: ['club-foot', 'big-toe-medial'],
        explanation:
          'Talipes equinovarus, the commonest birth deformity of the foot and commoner than any of the hand: the foot is plantar flexed, turned in and drawn towards the midline, so the child would walk on its outer border.',
      },
      {
        id: 'hip-dysplasia',
        label: 'Hip dysplasia',
        nodeIds: ['hip-dysplasia'],
        explanation:
          'A shallow acetabulum lets the head of the femur slip out. It is looked for in every newborn, because treated early, with the hip held bent and apart, it usually settles.',
      },
      {
        id: 'limb-defects',
        label: 'Missing or extra parts',
        nodeIds: ['apical-ridge', 'polarising-zone', 'extra-toes', 'toes-separate'],
        explanation:
          'If outgrowth fails a limb may be absent or shortened (thalidomide did this). Too much sonic hedgehog gives extra toes; if the cells between the toes do not die, the toes stay joined (syndactyly).',
      },
    ],
    drill: [
      {
        id: 'bud-and-artery',
        title: 'The bud and the axis artery',
        hint: 'Three signalling centres, then what the axis artery leaves behind.',
        nodeIds: [
          'limb-bud',
          'apical-ridge',
          'polarising-zone',
          'dorsal-ectoderm',
          'axis-artery',
          'inferior-gluteal-vein',
          'popliteal-artery',
          'peroneal-vein',
          'femoral-artery',
        ],
      },
      {
        id: 'rotation-and-defects',
        title: 'Turning in, and when it goes wrong',
        hint: 'What the medial turn brings, then four defects.',
        nodeIds: [
          'medial-rotation',
          'knee-forward',
          'big-toe-medial',
          'dermatomes',
          'toes-separate',
          'club-foot',
          'hip-dysplasia',
          'extra-toes',
        ],
      },
    ],
    model3d: {
      src: LOWER_LIMB_MODEL_SRC,
      credit: `${LOWER_LIMB_MODEL_CREDIT} The model is the adult limb that the bud becomes.`,
      parts: lowerLimbParts([
        ...LOWER_LIMB_BONES,
        ...LOWER_LIMB_ARTERIES,
        'inferior-gluteal-vein',
        'peroneal-vein',
        'sciatic-nerve',
      ]),
      traces: [],
      stops: [
        {
          ...LIMB_FRONT,
          title: 'After the turn',
          description:
            'The adult limb from the front: the knee and the extensors face forwards, the big toe lies medially, the result of the turn inwards in the seventh week.',
        },
        {
          ...BUTTOCK_BACK,
          title: 'Where the axis artery began',
          description:
            'The sciatic artery ran down the back of the limb with the sciatic nerve; the inferior gluteal artery, shown here by its vein, is what is left of it in the buttock.',
        },
        {
          ...KNEE_BACK,
          title: 'Where it joins the femoral',
          description:
            'Behind the knee, the popliteal artery keeps part of the axis artery; the femoral artery came down from the external iliac to meet it.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'bud',
      title: 'The limb bud',
      body: 'At the end of the fourth week a bud appears on the side of the body wall, opposite the lumbar and upper sacral segments, a little after the upper limb bud. It is a core of mesoderm covered by ectoderm. Outgrowth starts with TBX4 and FGF10, and HOX genes decide where along the body the limb forms.',
      focus: ['limb-bud'],
    },
    {
      id: 'centres',
      title: 'Three signalling centres',
      body: 'The apical ectodermal ridge at the tip of the bud (FGF8) keeps it growing, so hip, thigh, leg and foot are laid down in turn. The zone of polarising activity at its back edge releases sonic hedgehog, which tells the big toe side from the little toe side. The dorsal ectoderm (WNT7a) makes the dorsum of the foot different from the sole.',
      focus: ['apical-ridge', 'polarising-zone', 'dorsal-ectoderm'],
    },
    {
      id: 'tissues',
      title: 'Where the tissues come from',
      body: 'Bone, cartilage and tendon form from the mesoderm of the bud itself; muscle cells migrate in from the somites, and nerves grow in from the lumbar and sacral segments the bud lies against. The long bones begin to ossify from about the eighth week; the centre in the lower end of the femur appears just before birth, a sign of a full-term baby.',
      focus: ['limb-bud'],
    },
    {
      id: 'artery',
      title: 'The axis artery',
      body: 'The first artery of the limb, the sciatic artery from the internal iliac, runs down its back with the sciatic nerve. Most of it then fades: it is left as the inferior gluteal artery, the slender artery to the sciatic nerve, and parts of the popliteal and peroneal arteries. The femoral artery grows from the external iliac, down the front of the thigh, and joins the popliteal to take over.',
      focus: [
        'axis-artery',
        'inferior-gluteal-vein',
        'popliteal-artery',
        'peroneal-vein',
        'femoral-artery',
      ],
    },
    {
      id: 'rotation',
      title: 'Turning inwards',
      body: 'In the seventh week the lower limb turns 90 degrees medially, the opposite way to the upper limb. So the extensors come to lie in front of the thigh and leg, the knee points forwards, and the big toe, on the preaxial border, lies medially, where the thumb lies laterally. The turn twists the dermatomes into a spiral down the limb. Meanwhile the cells between the toes die, and the toes separate.',
      focus: ['medial-rotation', 'knee-forward', 'big-toe-medial', 'dermatomes', 'toes-separate'],
    },
    {
      id: 'defects',
      title: 'When it goes wrong',
      body: 'Club foot (talipes equinovarus) is the commonest birth deformity of the foot. A shallow acetabulum lets the hip dislocate (developmental dysplasia of the hip), so every newborn hip is examined. Extra toes, joined toes, and limbs missing or shortened (as after thalidomide) are rarer.',
      focus: ['club-foot', 'hip-dysplasia', 'extra-toes'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'Look at the adult limb from the front to see the result of the turn, then from behind to find what is left of the axis artery.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'lower-limb-rotation',
      prompt: 'During development the lower limb rotates:',
      options: [
        { id: 'medial-90', text: 'Medially through 90 degrees' },
        { id: 'lateral-90', text: 'Laterally through 90 degrees' },
        { id: 'medial-180', text: 'Medially through 180 degrees' },
        { id: 'none', text: 'Not at all' },
      ],
      answerId: 'medial-90',
      explanation: 'So the knee and extensors face forwards; the upper limb turns laterally.',
    },
    {
      id: 'axis-artery-remnant',
      prompt: 'In the adult, the axis artery of the lower limb persists in part as the:',
      options: [
        { id: 'inferior-gluteal', text: 'Inferior gluteal artery' },
        { id: 'femoral', text: 'Femoral artery' },
        { id: 'superior-gluteal', text: 'Superior gluteal artery' },
        { id: 'anterior-tibial', text: 'Anterior tibial artery' },
      ],
      answerId: 'inferior-gluteal',
      explanation:
        'With the artery to the sciatic nerve and parts of the popliteal and peroneal; the femoral is a new vessel from the external iliac.',
    },
    {
      id: 'toe-axis-centre',
      prompt: 'Which signalling centre sets up the big toe to little toe axis?',
      options: [
        { id: 'zpa', text: 'Zone of polarising activity (sonic hedgehog)' },
        { id: 'aer', text: 'Apical ectodermal ridge (FGF8)' },
        { id: 'dorsal', text: 'Dorsal ectoderm (WNT7a)' },
        { id: 'progress', text: 'Progress zone' },
      ],
      answerId: 'zpa',
      explanation:
        'The ridge drives growth along the limb, the dorsal ectoderm sets dorsum against sole.',
    },
    {
      id: 'commonest-foot-defect',
      prompt: 'The commonest birth deformity of the foot is:',
      options: [
        { id: 'talipes', text: 'Talipes equinovarus' },
        { id: 'pes-cavus', text: 'Pes cavus' },
        { id: 'hallux-valgus', text: 'Hallux valgus' },
        { id: 'syndactyly', text: 'Syndactyly' },
      ],
      answerId: 'talipes',
      explanation: 'Club foot: plantar flexed, turned in and drawn towards the midline.',
    },
  ],
  cards: [
    {
      id: 'lower-limb-bud-card',
      front: 'The lower limb bud: when and where?',
      back: 'End of the fourth week, just after the upper; side of the body wall opposite the lumbar and upper sacral segments; started by TBX4 and FGF10.',
    },
    {
      id: 'lower-limb-centres-card',
      front: 'The three signalling centres of the limb bud and their axes?',
      back: 'Apical ectodermal ridge (FGF8): hip to toes. Zone of polarising activity (sonic hedgehog): big toe to little toe. Dorsal ectoderm (WNT7a): dorsum to sole.',
    },
    {
      id: 'lower-limb-rotation-card',
      front: 'Rotation of the lower limb, and what it brings?',
      back: 'Seventh week, 90 degrees medially: extensors and knee face forwards, big toe medial, dermatomes spiral. The upper limb turns laterally.',
    },
    {
      id: 'sciatic-axis-artery-card',
      front: 'The axis artery of the lower limb: what is left of it?',
      back: 'The sciatic artery leaves the inferior gluteal artery, the artery to the sciatic nerve, and parts of the popliteal and peroneal arteries. The femoral comes from the external iliac.',
    },
  ],
  readIn: [{ bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 1 Introduction', pages: '3–4' }],
};
