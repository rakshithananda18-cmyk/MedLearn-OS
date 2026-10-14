import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  BUTTOCK_BACK,
  GROIN_FRONT,
  KNEE_BACK,
  KNEE_LATERAL,
  LIMB_FRONT,
  LOWER_LIMB_BONES,
  LOWER_LIMB_MODEL_CREDIT,
  LOWER_LIMB_MODEL_SRC,
  LOWER_LIMB_NERVES,
  lowerLimbParts,
} from './lower-limb-3d';

// Lower limb batch 6 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const lowerLimbNerveInjuries: Topic = {
  slug: 'lower-limb-nerve-injuries',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Lower limb nerve injuries at a glance',
  summary:
    'Each nerve of the lower limb, where it is hurt, and the sign that gives it away: from a knee that gives way to foot drop.',
  estimatedMinutes: 12,
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
      'Volume 2, Appendix 1 Nerves, Arteries and Clinical Terms, pages 204 to 213',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb: Trendelenburg sign and common fibular nerve injury, pages 569 and 627',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Nerves in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Femoral nerve (L2, 3, 4): quadriceps is lost, so the knee cannot be straightened and gives way; the front of the thigh and, through the saphenous nerve, the medial side of the leg to the ball of the big toe go numb.',
    'Obturator nerve (L2, 3, 4): the adductors weaken (all but the hamstring part of adductor magnus) and a small patch on the medial thigh goes numb.',
    'Superior gluteal nerve: gluteus medius and minimus can no longer hold the pelvis level, so on standing on that limb the opposite side drops (positive Trendelenburg sign). Inferior gluteal nerve: gluteus maximus is lost, so rising from a chair and climbing stairs are hard.',
    'Sciatic nerve (L4 to S3): the hamstrings and every muscle below the knee are paralysed, with foot drop, and the skin below the knee goes numb except along the medial side, kept by the saphenous nerve.',
    'Common peroneal nerve, the one most often injured, at the neck of the fibula: foot drop, weak eversion, numbness of the front and lateral side of the leg and the dorsum of the foot. Tibial nerve: no plantar flexion or standing on tiptoe, and a numb sole that ulcerates.',
  ],
  visual: {
    kind: 'path',
    // Left: the nerves, the sciatic dividing into its two parts. Right: the sign each injury gives.
    diagram: {
      width: 360,
      height: 540,
      nodes: [
        {
          id: 'femoral-nerve',
          label: 'Femoral',
          name: 'Femoral nerve (L2, 3, 4)',
          x: 60,
          y: 30,
        },
        {
          id: 'knee-gives-way',
          label: 'Knee gives\nway',
          name: 'Quadriceps lost: the knee gives way',
          x: 290,
          y: 30,
        },
        {
          id: 'obturator-nerve',
          label: 'Obturator',
          name: 'Obturator nerve (L2, 3, 4)',
          x: 60,
          y: 95,
        },
        {
          id: 'weak-adduction',
          label: 'Weak\nadduction',
          name: 'Adductors weak: the limb swings out',
          x: 290,
          y: 95,
        },
        {
          id: 'superior-gluteal-nerve',
          label: 'Superior\ngluteal',
          name: 'Superior gluteal nerve',
          x: 60,
          y: 160,
        },
        {
          id: 'trendelenburg',
          label: 'Trendelen-\nburg sign',
          name: 'Positive Trendelenburg sign: the opposite side of the pelvis drops',
          x: 290,
          y: 160,
        },
        {
          id: 'inferior-gluteal-nerve',
          label: 'Inferior\ngluteal',
          name: 'Inferior gluteal nerve',
          x: 60,
          y: 225,
        },
        {
          id: 'hard-to-rise',
          label: 'Hard to rise\nand climb',
          name: 'Gluteus maximus lost: hard to rise from a chair or climb stairs',
          x: 290,
          y: 225,
        },
        {
          id: 'sciatic-nerve',
          label: 'Sciatic',
          name: 'Sciatic nerve (L4 to S3)',
          x: 60,
          y: 295,
        },
        {
          id: 'all-below-knee',
          label: 'Everything\nbelow knee',
          name: 'Hamstrings and every muscle below the knee lost',
          x: 290,
          y: 295,
        },
        {
          id: 'common-peroneal-nerve',
          label: 'Common\nperoneal',
          name: 'Common peroneal nerve, at the neck of the fibula',
          x: 60,
          y: 365,
        },
        {
          id: 'deep-peroneal-nerve',
          label: 'Deep\nperoneal',
          name: 'Deep peroneal nerve: the front of the leg, the first web space',
          x: 165,
          y: 365,
        },
        {
          id: 'foot-drop',
          label: 'Foot drop',
          name: 'Foot drop: no dorsiflexion',
          x: 290,
          y: 365,
        },
        {
          id: 'superficial-peroneal-nerve',
          label: 'Superficial\nperoneal',
          name: 'Superficial peroneal nerve: the peronei, most of the dorsum',
          x: 165,
          y: 435,
        },
        {
          id: 'weak-eversion',
          label: 'Weak\neversion',
          name: 'Peronei lost: weak eversion',
          x: 290,
          y: 435,
        },
        {
          id: 'tibial-nerve',
          label: 'Tibial',
          name: 'Tibial nerve: the back of the leg and the sole',
          x: 60,
          y: 505,
        },
        {
          id: 'numb-sole',
          label: 'Numb sole,\nno tiptoe',
          name: 'No plantar flexion, and a numb sole that ulcerates',
          x: 290,
          y: 505,
        },
      ],
      edges: [
        { from: 'femoral-nerve', to: 'knee-gives-way' },
        { from: 'obturator-nerve', to: 'weak-adduction' },
        { from: 'superior-gluteal-nerve', to: 'trendelenburg' },
        { from: 'inferior-gluteal-nerve', to: 'hard-to-rise' },
        { from: 'sciatic-nerve', to: 'all-below-knee' },
        { from: 'sciatic-nerve', to: 'common-peroneal-nerve' },
        { from: 'sciatic-nerve', to: 'tibial-nerve' },
        { from: 'common-peroneal-nerve', to: 'deep-peroneal-nerve' },
        { from: 'common-peroneal-nerve', to: 'superficial-peroneal-nerve' },
        { from: 'deep-peroneal-nerve', to: 'foot-drop' },
        { from: 'superficial-peroneal-nerve', to: 'weak-eversion' },
        { from: 'tibial-nerve', to: 'numb-sole' },
      ],
    },
    lesions: [
      {
        id: 'foot-drop',
        label: 'Fibular neck',
        nodeIds: ['common-peroneal-nerve', 'deep-peroneal-nerve', 'superficial-peroneal-nerve'],
        explanation:
          'The common peroneal nerve winds round the neck of the fibula just under the skin, so a fracture there, a blow on the side of the knee or a tight plaster crushes it. The foot hangs down and turns in, the toes catch, and the knee is lifted high to clear them (a high-stepping gait); the lateral side of the leg and the top of the foot go numb.',
      },
      {
        id: 'trendelenburg',
        label: 'Trendelenburg',
        nodeIds: ['superior-gluteal-nerve', 'trendelenburg'],
        explanation:
          'Gluteus medius and minimus hold the pelvis level when the other foot leaves the ground. With them paralysed, standing on that limb lets the opposite side of the pelvis drop, and walking becomes a lurching, dipping gait.',
      },
      {
        id: 'injection',
        label: 'Buttock injection',
        nodeIds: ['sciatic-nerve', 'all-below-knee'],
        explanation:
          'An injection into the buttock away from its upper outer quarter can hit the sciatic nerve, as can a posterior dislocation of the hip. The hamstrings and every muscle below the knee are lost, the foot drops, and only the medial side of the leg keeps its feeling.',
      },
      {
        id: 'tibial',
        label: 'Tibial nerve',
        nodeIds: ['tibial-nerve', 'numb-sole'],
        explanation:
          'Without the calf muscles the foot cannot push off or rise on tiptoe; without the small muscles of the sole and its skin, the sole is numb and pressure sores (trophic ulcers) follow.',
      },
    ],
    drill: [
      {
        id: 'nerves',
        title: 'The nerves',
        hint: 'Front, medial and gluteal nerves, then the sciatic and its two parts with their branches.',
        nodeIds: [
          'femoral-nerve',
          'obturator-nerve',
          'superior-gluteal-nerve',
          'inferior-gluteal-nerve',
          'sciatic-nerve',
          'common-peroneal-nerve',
          'deep-peroneal-nerve',
          'superficial-peroneal-nerve',
          'tibial-nerve',
        ],
      },
      {
        id: 'signs',
        title: 'The signs',
        hint: 'What the student sees when each one is cut.',
        nodeIds: [
          'knee-gives-way',
          'weak-adduction',
          'trendelenburg',
          'hard-to-rise',
          'all-below-knee',
          'foot-drop',
          'weak-eversion',
          'numb-sole',
        ],
      },
    ],
    model3d: {
      src: LOWER_LIMB_MODEL_SRC,
      credit: `${LOWER_LIMB_MODEL_CREDIT} The inferior gluteal nerve is not in the model.`,
      parts: lowerLimbParts([...LOWER_LIMB_BONES, ...LOWER_LIMB_NERVES]),
      traces: [],
      stops: [
        {
          ...LIMB_FRONT,
          description:
            'The nerves from the groin to the ankle: femoral and obturator to the thigh, the saphenous on down the medial side, and the peroneal nerves on the front of the leg.',
        },
        {
          ...GROIN_FRONT,
          title: 'Femoral and obturator nerves',
          description:
            'The femoral nerve entering the thigh lateral to the artery, and the obturator nerve coming through the obturator foramen to the adductors.',
        },
        {
          ...BUTTOCK_BACK,
          title: 'Gluteal and sciatic nerves',
          description:
            'The superior gluteal nerve above piriformis, to gluteus medius and minimus; the sciatic nerve below it, in the lower inner part of the buttock.',
        },
        {
          ...KNEE_LATERAL,
          title: 'The common peroneal nerve',
          description:
            'Winding round the neck of the fibula just under the skin: the commonest nerve of the limb to be injured.',
        },
        {
          ...KNEE_BACK,
          title: 'The tibial nerve',
          description:
            'Straight down the middle of the popliteal fossa, over the vessels, and on into the back of the leg.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'map',
      title: 'Who supplies what',
      body: 'Four nerves share the thigh and hip: the femoral supplies the front (the knee extensors), the obturator the medial side (the adductors), the superior and inferior gluteal the buttock (the abductors and gluteus maximus). The sciatic supplies the back of the thigh and, through its tibial and common peroneal parts, everything below the knee. Know this map and each injury follows from it.',
      focus: [
        'femoral-nerve',
        'obturator-nerve',
        'superior-gluteal-nerve',
        'inferior-gluteal-nerve',
        'sciatic-nerve',
      ],
    },
    {
      id: 'femoral',
      title: 'Femoral nerve',
      body: 'Cut it and quadriceps is lost: the knee cannot be straightened against gravity, gives way on standing and the knee jerk goes. The front of the thigh goes numb, and through its saphenous branch the medial side of the leg and foot as far as the ball of the big toe.',
      focus: ['femoral-nerve', 'knee-gives-way'],
    },
    {
      id: 'obturator-gluteal',
      title: 'Obturator and gluteal nerves',
      body: 'The obturator nerve: the adductors weaken, so the limb swings outwards in walking, and a small patch on the medial thigh goes numb. The superior gluteal nerve: gluteus medius and minimus fail to hold the pelvis level, giving a positive Trendelenburg sign. The inferior gluteal nerve: gluteus maximus is lost, so rising from a chair and climbing stairs become hard. Neither gluteal nerve supplies skin.',
      focus: [
        'obturator-nerve',
        'weak-adduction',
        'superior-gluteal-nerve',
        'trendelenburg',
        'inferior-gluteal-nerve',
        'hard-to-rise',
      ],
    },
    {
      id: 'sciatic',
      title: 'Sciatic nerve',
      body: 'The thickest nerve in the body. A misplaced injection in the buttock or a posterior dislocation of the hip can injure it: the hamstrings and every muscle below the knee are paralysed and the foot drops. The skin below the knee goes numb except along the medial side, which the saphenous nerve keeps. Pressing it against the femur on a hard edge gives the brief numb "sleeping foot"; pain shooting down the back of the limb, often from a slipped disc, is sciatica.',
      focus: ['sciatic-nerve', 'all-below-knee'],
    },
    {
      id: 'peroneal',
      title: 'Common peroneal nerve',
      body: 'The nerve of the lower limb most often injured, because it winds round the neck of the fibula just under the skin: a fracture, a blow on the side of the knee or a tight plaster can crush it. Its deep branch supplies the muscles of the front of the leg, so dorsiflexion is lost and the foot drops; its superficial branch supplies the peronei, so eversion weakens. The lateral side of the leg and most of the dorsum go numb; the deep branch alone leaves numb only the first web space.',
      focus: [
        'common-peroneal-nerve',
        'deep-peroneal-nerve',
        'foot-drop',
        'superficial-peroneal-nerve',
        'weak-eversion',
      ],
    },
    {
      id: 'tibial',
      title: 'Tibial nerve',
      body: 'Deep and protected for most of its course, so injured less often. When it is, the calf muscles cannot plantar flex the foot or lift the body on tiptoe, the small muscles of the sole are lost, and the sole goes numb, so unnoticed pressure leads to ulcers.',
      focus: ['tibial-nerve', 'numb-sole'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'Follow the sciatic nerve from the buttock to its division above the knee, then turn to the lateral side to see how close the common peroneal nerve lies to the fibula.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'fibular-neck-nerve',
      prompt:
        'After a fracture of the neck of the fibula, a patient has foot drop and a numb dorsum of the foot. Which nerve is injured?',
      options: [
        { id: 'common-peroneal', text: 'Common peroneal' },
        { id: 'tibial', text: 'Tibial' },
        { id: 'femoral', text: 'Femoral' },
        { id: 'obturator', text: 'Obturator' },
      ],
      answerId: 'common-peroneal',
      explanation:
        'It winds round the neck of the fibula; the commonest nerve of the limb to be injured.',
    },
    {
      id: 'trendelenburg-side',
      prompt:
        'Standing on the right foot, the left side of the pelvis drops. Which nerve is paralysed?',
      options: [
        { id: 'right-superior-gluteal', text: 'Right superior gluteal' },
        { id: 'left-superior-gluteal', text: 'Left superior gluteal' },
        { id: 'right-inferior-gluteal', text: 'Right inferior gluteal' },
        { id: 'right-femoral', text: 'Right femoral' },
      ],
      answerId: 'right-superior-gluteal',
      explanation:
        'The abductors of the limb standing on the ground hold up the other side: right gluteus medius and minimus have failed.',
    },
    {
      id: 'injection-quadrant',
      prompt:
        'Injections into the buttock are given in its upper outer quarter mainly to avoid the:',
      options: [
        { id: 'sciatic', text: 'Sciatic nerve' },
        { id: 'pudendal', text: 'Pudendal nerve' },
        { id: 'femoral', text: 'Femoral nerve' },
        { id: 'obturator', text: 'Obturator nerve' },
      ],
      answerId: 'sciatic',
      explanation: 'It runs through the lower inner part of the buttock.',
    },
    {
      id: 'numb-sole-nerve',
      prompt: 'A numb sole and inability to stand on tiptoe point to injury of the:',
      options: [
        { id: 'tibial', text: 'Tibial nerve' },
        { id: 'deep-peroneal', text: 'Deep peroneal nerve' },
        { id: 'superficial-peroneal', text: 'Superficial peroneal nerve' },
        { id: 'saphenous', text: 'Saphenous nerve' },
      ],
      answerId: 'tibial',
      explanation: 'It supplies the calf muscles, the small muscles of the sole and its skin.',
    },
  ],
  cards: [
    {
      id: 'common-peroneal-injury-card',
      front: 'Common peroneal nerve injury: where, and the signs?',
      back: 'At the neck of the fibula (fracture, blow, tight plaster). Foot drop with a high-stepping gait, weak eversion, numb lateral leg and dorsum of the foot.',
    },
    {
      id: 'lower-limb-trendelenburg-card',
      front: 'Positive Trendelenburg sign?',
      back: 'Superior gluteal nerve (gluteus medius and minimus) paralysed: standing on that limb, the opposite side of the pelvis drops.',
    },
    {
      id: 'femoral-injury-card',
      front: 'Femoral nerve injury?',
      back: 'Quadriceps lost: the knee cannot be straightened and gives way, no knee jerk; numb front of the thigh and, through the saphenous nerve, the medial side of the leg and foot.',
    },
    {
      id: 'sciatic-palsy-card',
      front: 'Sciatic nerve injury?',
      back: 'Hamstrings and every muscle below the knee lost, with foot drop; numb below the knee except the medial side (saphenous). Causes: injection in the wrong part of the buttock, posterior dislocation of the hip.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Appendix 1 Nerves, Arteries and Clinical Terms',
      pages: '204–213',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '569, 627' },
  ],
};
