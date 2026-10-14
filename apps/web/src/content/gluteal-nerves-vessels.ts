import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  GLUTEAL_BACK,
  GLUTEAL_MUSCLES,
  HAMSTRINGS,
  HIP_THIGH_BONES,
  HIP_THIGH_MODEL_CREDIT,
  HIP_THIGH_MODEL_SRC,
  hipThighParts,
} from './hip-thigh-3d';

// Lower limb batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const glutealNervesVessels: Topic = {
  slug: 'gluteal-nerves-vessels',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Gluteal region: sciatic foramina, nerves and vessels',
  summary:
    'What passes above and below piriformis through the greater sciatic foramen, what goes through the lesser, the sciatic nerve, and the anastomoses round the hip.',
  estimatedMinutes: 13,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 5 Gluteal Region, pages 82 to 86'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: gluteal region, foramina, nerves and vessels, pages 566 and 571 to 575',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bones, muscles and veins (BodyParts3D, CC BY 4.0); nerves (Z-Anatomy, CC BY-SA 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 and CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Piriformis is the key: above it the superior gluteal nerve and vessels; below it everything else.',
    'Below piriformis: inferior gluteal nerve and vessels, sciatic nerve, posterior cutaneous nerve of thigh, nerves to quadratus femoris and obturator internus, pudendal nerve and internal pudendal vessels.',
    'Lesser sciatic foramen: obturator internus tendon, its nerve, the pudendal nerve and internal pudendal vessels, on their way to the perineum.',
    'Sciatic nerve (L4–S3): the thickest nerve, between the greater trochanter and the ischial tuberosity; no branches in the gluteal region.',
    'Trochanteric anastomosis feeds the head of the femur; the cruciate anastomosis links the gluteal, circumflex and first perforating arteries.',
  ],
  visual: {
    kind: 'path',
    // Above piriformis, below piriformis, the lesser foramen, and the two anastomoses.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'above-piriformis',
          label: 'Above\npiriformis',
          name: 'Above piriformis',
          x: 50,
          y: 30,
        },
        {
          id: 'superior-gluteal-nerve',
          label: 'Superior\nnerve',
          name: 'Superior gluteal nerve',
          x: 145,
          y: 30,
        },
        {
          id: 'superior-gluteal-vein',
          label: 'Superior\nvessels',
          name: 'Superior gluteal artery and vein',
          x: 225,
          y: 30,
        },
        {
          id: 'below-piriformis',
          label: 'Below\npiriformis',
          name: 'Below piriformis',
          x: 50,
          y: 110,
        },
        { id: 'sciatic-nerve', label: 'Sciatic', name: 'Sciatic nerve', x: 145, y: 110 },
        {
          id: 'inferior-gluteal-vein',
          label: 'Inferior\ngluteal',
          name: 'Inferior gluteal nerve, artery and vein',
          x: 225,
          y: 110,
        },
        {
          id: 'posterior-cutaneous-nerve-of-thigh',
          label: 'Posterior\ncutaneous',
          name: 'Posterior cutaneous nerve of the thigh',
          x: 305,
          y: 110,
        },
        { id: 'pudendal-nerve', label: 'Pudendal\nnerve', name: 'Pudendal nerve', x: 145, y: 176 },
        {
          id: 'pudendal-vessels',
          label: 'Pudendal\nvessels',
          name: 'Internal pudendal artery and vein',
          x: 225,
          y: 176,
        },
        {
          id: 'rotator-nerves',
          label: 'Nerves to\nrotators',
          name: 'Nerves to quadratus femoris and obturator internus',
          x: 305,
          y: 176,
        },
        {
          id: 'lesser-sciatic-foramen',
          label: 'Lesser\nforamen',
          name: 'Lesser sciatic foramen',
          x: 50,
          y: 256,
        },
        {
          id: 'obturator-internus',
          label: 'Obturator\ninternus',
          name: 'Tendon of obturator internus',
          x: 145,
          y: 256,
        },
        {
          id: 'pudendal-structures',
          label: 'Pudendal\nstructures',
          name: 'Pudendal nerve, internal pudendal vessels and the nerve to obturator internus',
          x: 240,
          y: 256,
        },
        {
          id: 'anastomoses',
          label: 'Anasto-\nmoses',
          name: 'Arterial anastomoses round the hip',
          x: 50,
          y: 336,
        },
        {
          id: 'trochanteric',
          label: 'Trochan-\nteric',
          name: 'Trochanteric anastomosis, near the trochanteric fossa',
          x: 145,
          y: 336,
        },
        {
          id: 'cruciate',
          label: 'Cruciate',
          name: 'Cruciate anastomosis, at the level of the lesser trochanter',
          x: 225,
          y: 336,
        },
      ],
      edges: [
        { from: 'above-piriformis', to: 'superior-gluteal-nerve' },
        { from: 'above-piriformis', to: 'superior-gluteal-vein' },
        { from: 'below-piriformis', to: 'sciatic-nerve' },
        { from: 'below-piriformis', to: 'inferior-gluteal-vein' },
        { from: 'below-piriformis', to: 'posterior-cutaneous-nerve-of-thigh' },
        { from: 'below-piriformis', to: 'pudendal-nerve' },
        { from: 'below-piriformis', to: 'pudendal-vessels' },
        { from: 'below-piriformis', to: 'rotator-nerves' },
        { from: 'lesser-sciatic-foramen', to: 'obturator-internus' },
        { from: 'lesser-sciatic-foramen', to: 'pudendal-structures' },
        { from: 'anastomoses', to: 'trochanteric' },
        { from: 'anastomoses', to: 'cruciate' },
      ],
    },
    lesions: [
      {
        id: 'sciatic-injection',
        label: 'Injection injury',
        nodeIds: ['sciatic-nerve', 'below-piriformis'],
        explanation:
          'An injection placed too low and medially in the buttock can hit the sciatic nerve as it comes out below piriformis, paralysing the hamstrings and everything below the knee. Hence the upper outer quadrant.',
      },
      {
        id: 'piriformis-syndrome',
        label: 'Piriformis syndrome',
        nodeIds: ['sciatic-nerve'],
        explanation:
          'The sciatic nerve, sometimes partly piercing piriformis, can be squeezed by it, giving pain in the buttock and down the back of the thigh.',
      },
      {
        id: 'sleeping-foot',
        label: 'Sleeping foot',
        nodeIds: ['sciatic-nerve'],
        explanation:
          'Between quadratus femoris and adductor magnus the sciatic nerve lies right on the femur; sitting on a hard edge presses it there and the foot goes to sleep.',
      },
    ],
    drill: [
      {
        id: 'greater-foramen',
        title: 'Greater sciatic foramen',
        hint: 'One nerve and its vessels above piriformis; the rest below.',
        nodeIds: [
          'superior-gluteal-nerve',
          'superior-gluteal-vein',
          'sciatic-nerve',
          'inferior-gluteal-vein',
          'posterior-cutaneous-nerve-of-thigh',
          'pudendal-nerve',
          'pudendal-vessels',
          'rotator-nerves',
        ],
      },
      {
        id: 'lesser-anastomoses',
        title: 'Lesser foramen and anastomoses',
        hint: 'What passes through the lesser foramen, and the two arterial meeting points round the hip.',
        nodeIds: ['obturator-internus', 'pudendal-structures', 'trochanteric', 'cruciate'],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: HIP_THIGH_MODEL_CREDIT,
      parts: hipThighParts([
        ...HIP_THIGH_BONES,
        ...GLUTEAL_MUSCLES,
        'obturator-externus',
        ...HAMSTRINGS,
        'adductor-magnus',
        'superior-gluteal-nerve',
        'superior-gluteal-vein',
        'inferior-gluteal-vein',
        'sciatic-nerve',
        'posterior-cutaneous-nerve-of-thigh',
        'pudendal-nerve',
        'medial-circumflex-femoral-vein',
        'lateral-circumflex-femoral-artery',
        'perforating-arteries',
        'deep-femoral-vein',
      ]),
      traces: [],
      stops: [
        GLUTEAL_BACK,
        {
          id: 'foramen',
          title: 'Greater sciatic foramen',
          description:
            'Close up from behind: piriformis fills the foramen, the superior gluteal vessels and nerve come out above it, the sciatic nerve and the rest below.',
          target: [-60, -45, 840],
          position: [-240, 680, 912],
        },
        {
          id: 'sciatic',
          title: 'Sciatic nerve',
          description:
            'It runs down between the greater trochanter and the ischial tuberosity, over the lateral rotators, and leaves under the lower border of gluteus maximus.',
          target: [-60, -50, 720],
          position: [-312, 969, 745],
        },
        {
          id: 'anastomoses',
          title: 'Round the hip',
          description:
            'Behind the femur near the lesser trochanter the circumflex, gluteal and first perforating arteries meet in the cruciate anastomosis.',
          target: [-90, -60, 760],
          position: [-743, 628, 807],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'gateway',
      title: 'The gateway',
      body: 'Nerves and vessels leave the pelvis for the buttock through the greater sciatic foramen, the space the sacrotuberous and sacrospinous ligaments make of the greater sciatic notch. Piriformis comes out through it and almost fills it, so each structure is either above or below piriformis.',
      focus: [],
    },
    {
      id: 'above',
      title: 'Above piriformis',
      body: 'The superior gluteal nerve (L4–S1) and vessels. The nerve runs forwards between gluteus medius and minimus to supply both and tensor fasciae latae. The artery, from the internal iliac, gives a superficial branch to gluteus maximus and a deep branch between the medius and minimus. The model has no gluteal arteries; the veins show where they run.',
      focus: ['above-piriformis', 'superior-gluteal-nerve', 'superior-gluteal-vein'],
    },
    {
      id: 'below',
      title: 'Below piriformis',
      body: 'The inferior gluteal nerve (L5–S2), all for gluteus maximus, and the inferior gluteal vessels; the sciatic nerve; the posterior cutaneous nerve of the thigh; the nerves to quadratus femoris and obturator internus; and the pudendal nerve with the internal pudendal vessels, which only cross the ischial spine on their way back in through the lesser foramen.',
      focus: [
        'below-piriformis',
        'inferior-gluteal-vein',
        'posterior-cutaneous-nerve-of-thigh',
        'pudendal-nerve',
        'pudendal-vessels',
        'rotator-nerves',
      ],
    },
    {
      id: 'sciatic',
      title: 'Sciatic nerve',
      body: 'The thickest nerve in the body, L4 to S3, the main continuation of the sacral plexus. It comes out below piriformis, runs down between the greater trochanter and ischial tuberosity over obturator internus, the gemelli and quadratus femoris, and enters the back of the thigh under gluteus maximus. It gives no branches in the gluteal region; a small artery to it is the remnant of the limb’s original axis artery.',
      focus: ['sciatic-nerve'],
    },
    {
      id: 'lesser',
      title: 'Lesser sciatic foramen',
      body: 'The gateway of the perineum: the tendon of obturator internus comes out through it, and the pudendal nerve, internal pudendal vessels and nerve to obturator internus go in, into the pudendal canal.',
      focus: ['lesser-sciatic-foramen', 'obturator-internus', 'pudendal-structures'],
    },
    {
      id: 'anastomoses',
      title: 'Anastomoses',
      body: 'The trochanteric anastomosis, near the trochanteric fossa, joins the superior and inferior gluteal arteries with the ascending branches of both circumflex femoral arteries, and sends branches up the femoral neck to the head. The cruciate anastomosis, behind the femur at the lesser trochanter, joins the inferior gluteal, the transverse branches of both circumflex femoral arteries and the first perforating artery: a route round a blocked femoral artery.',
      focus: ['anastomoses', 'trochanteric', 'cruciate'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Switch gluteus maximus off in Layers, then select each nerve and vessel to light it where it leaves the foramen.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'above-piriformis-q',
      prompt: 'Which passes above piriformis?',
      options: [
        { id: 'superior-gluteal', text: 'Superior gluteal nerve and vessels' },
        { id: 'sciatic', text: 'Sciatic nerve' },
        { id: 'inferior-gluteal', text: 'Inferior gluteal nerve' },
        { id: 'pudendal', text: 'Pudendal nerve' },
      ],
      answerId: 'superior-gluteal',
      explanation: 'Everything else leaving through the greater sciatic foramen passes below it.',
    },
    {
      id: 'sciatic-branches-gluteal',
      prompt: 'In the gluteal region the sciatic nerve:',
      options: [
        { id: 'none', text: 'Gives no branches' },
        { id: 'maximus', text: 'Supplies gluteus maximus' },
        { id: 'rotators', text: 'Supplies the lateral rotators' },
        { id: 'skin', text: 'Supplies the skin of the buttock' },
      ],
      answerId: 'none',
      explanation: 'Its branches start in the back of the thigh.',
    },
    {
      id: 'lesser-foramen-contents',
      prompt: 'Which does not pass through the lesser sciatic foramen?',
      options: [
        { id: 'sciatic', text: 'Sciatic nerve' },
        { id: 'oi-tendon', text: 'Obturator internus tendon' },
        { id: 'pudendal', text: 'Pudendal nerve' },
        { id: 'ipv', text: 'Internal pudendal vessels' },
      ],
      answerId: 'sciatic',
      explanation: 'The sciatic nerve passes only through the greater foramen, below piriformis.',
    },
    {
      id: 'cruciate-not',
      prompt: 'Which artery does not take part in the cruciate anastomosis?',
      options: [
        { id: 'superior-gluteal', text: 'Superior gluteal' },
        { id: 'inferior-gluteal', text: 'Inferior gluteal' },
        { id: 'first-perforating', text: 'First perforating' },
        { id: 'medial-circumflex', text: 'Medial circumflex femoral' },
      ],
      answerId: 'superior-gluteal',
      explanation: 'The superior gluteal joins the trochanteric anastomosis, not the cruciate.',
    },
  ],
  cards: [
    {
      id: 'below-piriformis-card',
      front: 'Structures passing below piriformis?',
      back: 'Inferior gluteal nerve and vessels, sciatic nerve, posterior cutaneous nerve of thigh, nerves to quadratus femoris and obturator internus, pudendal nerve, internal pudendal vessels.',
    },
    {
      id: 'lesser-foramen-card',
      front: 'Structures passing through the lesser sciatic foramen?',
      back: 'Obturator internus tendon, nerve to obturator internus, pudendal nerve, internal pudendal vessels.',
    },
    {
      id: 'cruciate-card',
      front: 'Arteries forming the cruciate anastomosis?',
      back: 'Inferior gluteal, transverse branches of the medial and lateral circumflex femoral, first perforating.',
    },
    {
      id: 'trochanteric-card',
      front: 'Arteries forming the trochanteric anastomosis?',
      back: 'Superior and inferior gluteal, ascending branches of the medial and lateral circumflex femoral; it supplies the head of the femur.',
    },
    {
      id: 'sciatic-roots',
      front: 'Root value and course of the sciatic nerve in the buttock?',
      back: 'L4–S3; below piriformis, between the greater trochanter and ischial tuberosity, under gluteus maximus; no branches there.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 5 Gluteal Region', pages: '82–86' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '566, 571–575' },
  ],
};
