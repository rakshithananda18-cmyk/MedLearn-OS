import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_WALL_MODEL_CREDIT,
  ABDOMINAL_WALL_MODEL_SRC,
  abdominalWallParts,
  PELVIS_ABOVE,
  PELVIS_FRONT,
} from './abdominal-wall-3d';
import { bookSource } from './books';

// Abdomen batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const bonyPelvis: Topic = {
  slug: 'bony-pelvis',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The bony pelvis: sex differences and pelvimetry',
  summary:
    'How to hold a pelvis the right way up, tell a female pelvis from a male one, read the diameters of inlet, cavity and outlet, and name the four shapes that decide a normal birth.',
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
      'Volume 2, Chapter 15 Introduction and Osteology: bony pelvis, pages 227 to 230',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: pelvic bones, pelvic inlet and differences between men and women, pages 415 to 426',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones in the 3D view (a male pelvis)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'In the anatomical position the anterior superior iliac spines and the pubic symphysis lie in one coronal plane, the plane of the inlet faces forwards and upwards at 50 to 60 degrees, and that of the outlet at about 15 degrees.',
    'The subpubic angle is the clearest sign of sex: 50 to 60 degrees in the male, 80 to 85 in the female. The female greater sciatic notch is also wider (about 75 degrees against 50).',
    'In the female pelvis the inlet is transversely oval (heart-shaped in the male), the cavity shallow and roomy, the outlet wide with everted ischial tuberosities, and the sacrum short and wide.',
    'In the female: the inlet is widest across (transverse 13 cm), the cavity about 12 cm every way, and the outlet longest front to back (13 cm). The true conjugate is about 11 cm, about 1.5 to 2 cm less than the diagonal conjugate felt per vaginum.',
    'Four shapes: gynaecoid (the normal female, about 41 percent), android (male-like, funnel-shaped), anthropoid (long front to back) and platypelloid (flat). Only the gynaecoid reliably allows a normal delivery.',
  ],
  visual: {
    kind: 'path',
    // Left: the diameters of inlet, cavity and outlet. Right: male against female, and the shapes.
    diagram: {
      width: 360,
      height: 470,
      nodes: [
        { id: 'bony-pelvis', label: 'Bony pelvis', name: 'Bony pelvis', x: 180, y: 30 },
        {
          id: 'pelvic-inlet',
          label: 'Inlet: widest\nacross, 13 cm',
          name: 'Pelvic inlet: transverse diameter the longest, about 13 cm',
          x: 80,
          y: 100,
        },
        {
          id: 'true-conjugate',
          label: 'True conjugate\nabout 11 cm',
          name: 'True conjugate, promontory to the top of the symphysis: about 11 cm',
          x: 80,
          y: 165,
        },
        {
          id: 'pelvic-cavity',
          label: 'Cavity: about\n12 cm every way',
          name: 'Pelvic cavity: all diameters about 12 cm',
          x: 80,
          y: 230,
        },
        {
          id: 'pelvic-outlet',
          label: 'Outlet: longest\nfront to back',
          name: 'Pelvic outlet: anteroposterior diameter the longest, about 13 cm',
          x: 80,
          y: 295,
        },
        {
          id: 'diagonal-conjugate',
          label: 'Diagonal conjugate\n11.5 cm or more',
          name: 'Diagonal conjugate, felt per vaginum: at least 11.5 cm',
          x: 80,
          y: 360,
        },
        {
          id: 'subpubic-angle',
          label: 'Subpubic angle:\n50–60° or 80–85°',
          name: 'Subpubic angle: 50 to 60 degrees in the male, 80 to 85 in the female',
          x: 275,
          y: 100,
        },
        {
          id: 'sciatic-notch',
          label: 'Greater sciatic\nnotch wider',
          name: 'Greater sciatic notch wider in the female (about 75 degrees against 50)',
          x: 275,
          y: 165,
        },
        {
          id: 'inlet-shape',
          label: 'Inlet: heart or\ntransverse oval',
          name: 'Inlet heart-shaped in the male, transversely oval in the female',
          x: 275,
          y: 230,
        },
        {
          id: 'sacrum',
          label: 'Sacrum: long or\nshort and wide',
          name: 'Sacrum long and narrow in the male, short and wide in the female',
          x: 275,
          y: 295,
        },
        {
          id: 'pelvis-types',
          label: 'Gynaecoid, android,\nanthropoid, flat',
          name: 'Gynaecoid, android, anthropoid and platypelloid pelves',
          x: 275,
          y: 360,
        },
        {
          id: 'pelvis-orientation',
          label: 'ASIS and symphysis\nin one plane',
          name: 'Anatomical position: the anterior superior iliac spines and the symphysis in one coronal plane',
          x: 180,
          y: 430,
        },
      ],
      edges: [
        { from: 'bony-pelvis', to: 'pelvic-inlet' },
        { from: 'pelvic-inlet', to: 'true-conjugate' },
        { from: 'pelvic-inlet', to: 'pelvic-cavity' },
        { from: 'pelvic-cavity', to: 'pelvic-outlet' },
        { from: 'true-conjugate', to: 'diagonal-conjugate' },
        { from: 'bony-pelvis', to: 'subpubic-angle' },
        { from: 'subpubic-angle', to: 'sciatic-notch' },
        { from: 'sciatic-notch', to: 'inlet-shape' },
        { from: 'inlet-shape', to: 'sacrum' },
        { from: 'sacrum', to: 'pelvis-types' },
        { from: 'bony-pelvis', to: 'pelvis-orientation' },
      ],
    },
    lesions: [
      {
        id: 'android-pelvis',
        label: 'Android pelvis',
        nodeIds: ['pelvis-types', 'subpubic-angle', 'pelvic-outlet'],
        explanation:
          'A male-like pelvis in a woman: a triangular inlet with its widest part near the promontory, a narrow subpubic angle and sciatic notches, and a funnel-shaped cavity, so the outlet is small in every diameter and labour may stop.',
      },
      {
        id: 'contracted-inlet',
        label: 'Contracted inlet',
        nodeIds: ['true-conjugate', 'diagonal-conjugate', 'pelvic-inlet'],
        explanation:
          'The true conjugate cannot be felt; it is estimated as the diagonal conjugate less 1.5 to 2 cm. If the promontory is easily reached, the inlet is small (as in a platypelloid pelvis) and the head may not engage.',
      },
    ],
    drill: [
      {
        id: 'diameters',
        title: 'Inlet, cavity and outlet',
        hint: 'Widest across, the same every way, then longest front to back.',
        nodeIds: [
          'pelvic-inlet',
          'true-conjugate',
          'pelvic-cavity',
          'pelvic-outlet',
          'diagonal-conjugate',
        ],
      },
      {
        id: 'sexes',
        title: 'Male or female',
        hint: 'The angle first, then the notch, the inlet, the sacrum and the four shapes.',
        nodeIds: ['subpubic-angle', 'sciatic-notch', 'inlet-shape', 'sacrum', 'pelvis-types'],
      },
    ],
    model3d: {
      src: ABDOMINAL_WALL_MODEL_SRC,
      credit: ABDOMINAL_WALL_MODEL_CREDIT,
      parts: abdominalWallParts(['hip-bones', 'sacrum', 'fifth-lumbar-vertebra', 'femurs']),
      traces: [],
      stops: [
        {
          ...PELVIS_FRONT,
          description:
            'This is a male pelvis: note the narrow subpubic angle under the symphysis, about 50 to 60 degrees, where a female angle would be 80 to 85.',
        },
        {
          ...PELVIS_ABOVE,
          description:
            'The inlet from above: here heart-shaped, as the sacral promontory juts forward; a female inlet is a wider transverse oval.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'orientation',
      title: 'Holding it the right way',
      body: 'Stand an isolated pelvis so that both anterior superior iliac spines and the front of the pubic symphysis touch a wall: that is the anatomical position. The inlet then faces forwards and up at 50 to 60 degrees to the horizontal, the outlet at about 15 degrees, and the top of the sacral canal points almost straight up.',
      focus: ['pelvis-orientation'],
    },
    {
      id: 'inlet',
      title: 'The inlet',
      body: 'In the female the inlet is widest across, about 13 cm; its oblique diameter (iliopubic eminence to the opposite sacroiliac joint) is about 12 cm and its true conjugate (promontory to the top of the symphysis) about 11 cm.',
      focus: ['pelvic-inlet', 'true-conjugate'],
    },
    {
      id: 'cavity-outlet',
      title: 'Cavity and outlet',
      body: 'In the cavity every diameter is about 12 cm. At the outlet the front-to-back diameter (coccyx to the lower symphysis) is the longest, about 13 cm, and the distance between the ischial tuberosities about 11 cm. So the head enters sideways and leaves facing back.',
      focus: ['pelvic-cavity', 'pelvic-outlet'],
    },
    {
      id: 'pelvimetry',
      title: 'Measuring in the living',
      body: 'On vaginal examination the diagonal conjugate, from the promontory to the lower border of the symphysis, should be at least 11.5 cm; take 1.5 to 2 cm off for the true conjugate. The spines of the ischium are about 9 cm apart. Ultrasound has largely replaced X-ray pelvimetry.',
      focus: ['diagonal-conjugate', 'true-conjugate'],
    },
    {
      id: 'sexes',
      title: 'Male or female',
      body: 'Built for childbirth, the female pelvis has a shallow false pelvis, a transversely oval inlet, a roomy shallow cavity, a wide outlet with everted tuberosities, a short wide sacrum and a wider greater sciatic notch. The subpubic angle settles it: 50 to 60 degrees in the male, 80 to 85 in the female. Male bones are thicker, with bolder markings and a larger acetabulum.',
      focus: ['subpubic-angle', 'sciatic-notch', 'inlet-shape', 'sacrum'],
    },
    {
      id: 'types',
      title: 'Four shapes',
      body: 'Gynaecoid (about 41 percent of women): round inlet, straight side walls, the normal female pelvis. Android (about 33 percent): male-like, funnel-shaped. Anthropoid (about 24 percent): long front to back, like an ape’s. Platypelloid (about 3 percent): flat. Only the gynaecoid reliably allows a normal delivery; the others are types of contracted pelvis.',
      focus: ['pelvis-types'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'This model is a male pelvis. From the front, judge the subpubic angle; from above, the shape of the inlet. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'pelvis-subpubic',
      prompt: 'A subpubic angle of 50 to 60 degrees suggests a pelvis that is:',
      options: [
        { id: 'male', text: 'Male' },
        { id: 'female', text: 'Female' },
        { id: 'gynaecoid', text: 'Gynaecoid' },
        { id: 'child', text: 'From a child' },
      ],
      answerId: 'male',
      explanation:
        'The female angle is 80 to 85 degrees; this is the most important single difference.',
    },
    {
      id: 'pelvis-equal',
      prompt: 'Where are the anteroposterior, transverse and oblique diameters about equal?',
      options: [
        { id: 'cavity', text: 'The pelvic cavity' },
        { id: 'inlet', text: 'The inlet' },
        { id: 'outlet', text: 'The outlet' },
        { id: 'all', text: 'All three levels' },
      ],
      answerId: 'cavity',
      explanation:
        'About 12 cm each way in the cavity; the inlet is widest across, the outlet longest front to back.',
    },
    {
      id: 'pelvis-true-conjugate',
      prompt: 'The true conjugate is estimated from the diagonal conjugate by:',
      options: [
        { id: 'minus', text: 'Taking off 1.5 to 2 cm' },
        { id: 'plus', text: 'Adding 1.5 to 2 cm' },
        { id: 'half', text: 'Halving it' },
        { id: 'same', text: 'They are the same' },
      ],
      answerId: 'minus',
      explanation:
        'The diagonal conjugate runs to the lower border of the symphysis, so it is longer.',
    },
    {
      id: 'pelvis-gynaecoid',
      prompt: 'Which pelvis reliably allows a normal delivery?',
      options: [
        { id: 'gynaecoid', text: 'Gynaecoid' },
        { id: 'android', text: 'Android' },
        { id: 'anthropoid', text: 'Anthropoid' },
        { id: 'platypelloid', text: 'Platypelloid' },
      ],
      answerId: 'gynaecoid',
      explanation: 'The other three are forms of contracted pelvis.',
    },
  ],
  cards: [
    {
      id: 'pelvis-position',
      front: 'Anatomical position of the pelvis?',
      back: 'Anterior superior iliac spines and pubic symphysis in one coronal plane; inlet at 50 to 60 degrees, outlet at about 15 degrees to the horizontal.',
    },
    {
      id: 'pelvis-longest',
      front: 'Longest diameter at the inlet, and at the outlet?',
      back: 'Inlet: transverse (about 13 cm). Outlet: anteroposterior (about 13 cm). Cavity: all about 12 cm.',
    },
    {
      id: 'pelvis-angle',
      front: 'Subpubic angle in the male and the female?',
      back: 'Male 50 to 60 degrees; female 80 to 85 degrees.',
    },
    {
      id: 'pelvis-notch',
      front: 'Greater sciatic notch in the two sexes?',
      back: 'Wider in the female (about 75 degrees) than in the male (about 50).',
    },
    {
      id: 'pelvis-types-card',
      front: 'The four pelvic shapes?',
      back: 'Gynaecoid (normal female, about 41 percent), android (male-like, funnel), anthropoid (long front to back), platypelloid (flat).',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 15 Introduction and Osteology',
      pages: '227–230',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '415–426' },
  ],
};
