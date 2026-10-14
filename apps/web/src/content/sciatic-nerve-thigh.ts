import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  HAMSTRINGS,
  HIP_THIGH_BONES,
  HIP_THIGH_MODEL_CREDIT,
  HIP_THIGH_MODEL_SRC,
  hipThighParts,
  THIGH_BACK,
} from './hip-thigh-3d';

// Lower limb batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const sciaticNerveThigh: Topic = {
  slug: 'sciatic-nerve-thigh',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Back of thigh: sciatic nerve and perforating arteries',
  summary:
    'The sciatic nerve from the buttock to the popliteal fossa, its two parts, relations and branches, and the perforating arteries and anastomoses that feed the back of the thigh.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 7 Back of Thigh, pages 99 to 103'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: perforating arteries and sciatic nerve, pages 593, 594 and 597',
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
    'Sciatic nerve (L4–S3), the largest branch of the sacral plexus: a tibial part from the ventral divisions (L4–S3) and a common peroneal part from the dorsal divisions (L4–S2).',
    'In the thigh it lies on adductor magnus, crossed behind by the long head of biceps femoris, with the semis medial and biceps lateral.',
    'It divides into the tibial and common peroneal nerves at the upper angle of the popliteal fossa, at the junction of the upper two-thirds and lower third of the thigh, sometimes much higher.',
    'Muscular branches leave its medial side, all from the tibial part except the one to the short head of biceps.',
    'Perforating arteries of the profunda femoris (four in BD, the fourth its end; three in Gray’s) wind round the femur to feed the back of the thigh; the second gives the nutrient artery of the femur.',
  ],
  visual: {
    kind: 'path',
    // The nerve's two parts, relations, branches and division, then the perforating arteries.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'sciatic-nerve',
          label: 'Sciatic\nnerve',
          name: 'Sciatic nerve, L4 to S3',
          x: 50,
          y: 30,
        },
        {
          id: 'tibial-part',
          label: 'Tibial\npart',
          name: 'Tibial part: ventral divisions, L4 to S3',
          x: 145,
          y: 30,
        },
        {
          id: 'peroneal-part',
          label: 'Peroneal\npart',
          name: 'Common peroneal part: dorsal divisions, L4 to S2',
          x: 225,
          y: 30,
        },
        { id: 'relations', label: 'Relations', name: 'Relations in the thigh', x: 50, y: 110 },
        {
          id: 'biceps-femoris',
          label: 'Biceps\nlong head',
          name: 'Behind: the long head of biceps femoris crosses it',
          x: 145,
          y: 110,
        },
        {
          id: 'adductor-magnus',
          label: 'Adductor\nmagnus',
          name: 'In front: adductor magnus',
          x: 225,
          y: 110,
        },
        {
          id: 'semimembranosus',
          label: 'Semimem-\nbranosus',
          name: 'Medially: semimembranosus and semitendinosus',
          x: 305,
          y: 110,
        },
        { id: 'branches', label: 'Branches', name: 'Muscular branches', x: 50, y: 186 },
        {
          id: 'hamstring-branches',
          label: 'Hamstrings',
          name: 'Tibial part, from the medial side: semitendinosus, semimembranosus, long head of biceps, ischial part of adductor magnus',
          x: 145,
          y: 186,
        },
        {
          id: 'short-head-branch',
          label: 'Short\nhead',
          name: 'Common peroneal part: short head of biceps',
          x: 225,
          y: 186,
        },
        {
          id: 'divides',
          label: 'Divides',
          name: 'Divides at the upper angle of the popliteal fossa',
          x: 50,
          y: 262,
        },
        {
          id: 'tibial-nerve',
          label: 'Tibial\nnerve',
          name: 'Tibial nerve',
          x: 145,
          y: 262,
        },
        {
          id: 'common-peroneal-nerve',
          label: 'Common\nperoneal',
          name: 'Common peroneal nerve',
          x: 225,
          y: 262,
        },
        {
          id: 'perforating-arteries',
          label: 'Perfor-\nating',
          name: 'Perforating arteries of the profunda femoris',
          x: 50,
          y: 340,
        },
        {
          id: 'cruciate',
          label: 'Cruciate',
          name: 'First: joins the cruciate anastomosis',
          x: 145,
          y: 340,
        },
        {
          id: 'nutrient',
          label: 'Nutrient',
          name: 'Second: gives the nutrient artery of the femur',
          x: 225,
          y: 340,
        },
        {
          id: 'popliteal-artery',
          label: 'Popliteal',
          name: 'Fourth: joins the upper muscular branches of the popliteal artery',
          x: 305,
          y: 340,
        },
      ],
      edges: [
        { from: 'sciatic-nerve', to: 'tibial-part' },
        { from: 'sciatic-nerve', to: 'peroneal-part' },
        { from: 'relations', to: 'biceps-femoris' },
        { from: 'relations', to: 'adductor-magnus' },
        { from: 'relations', to: 'semimembranosus' },
        { from: 'branches', to: 'hamstring-branches' },
        { from: 'branches', to: 'short-head-branch' },
        { from: 'divides', to: 'tibial-nerve' },
        { from: 'divides', to: 'common-peroneal-nerve' },
        { from: 'perforating-arteries', to: 'cruciate' },
        { from: 'perforating-arteries', to: 'nutrient' },
        { from: 'perforating-arteries', to: 'popliteal-artery' },
      ],
    },
    lesions: [
      {
        id: 'sciatica',
        label: 'Sciatica',
        nodeIds: ['sciatic-nerve', 'tibial-part', 'peroneal-part'],
        explanation:
          'Pressure on the roots of the nerve, most often by a prolapsed disc, sends shooting pain from the buttock down the back of the thigh and the outer leg to the top of the foot. Raising the straight leg stretches the nerve and brings the pain on.',
      },
      {
        id: 'sciatic-injury',
        label: 'Sciatic nerve injury',
        nodeIds: ['sciatic-nerve', 'hamstring-branches', 'tibial-nerve', 'common-peroneal-nerve'],
        explanation:
          'A wound or a dislocated hip can cut the nerve: the hamstrings weaken, every movement below the knee is lost with foot drop, and feeling goes from the back of the thigh, the leg and the foot except the strip supplied by the saphenous nerve.',
      },
    ],
    drill: [
      {
        id: 'sciatic-course',
        title: 'Parts and relations',
        hint: 'Two parts from two sets of divisions; what lies behind, in front and on each side.',
        nodeIds: [
          'tibial-part',
          'peroneal-part',
          'biceps-femoris',
          'adductor-magnus',
          'semimembranosus',
        ],
      },
      {
        id: 'sciatic-branches-arteries',
        title: 'Branches and arteries',
        hint: 'Its muscular branches and end branches; then the perforating arteries in order.',
        nodeIds: [
          'hamstring-branches',
          'short-head-branch',
          'tibial-nerve',
          'common-peroneal-nerve',
          'cruciate',
          'nutrient',
          'popliteal-artery',
        ],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: HIP_THIGH_MODEL_CREDIT,
      parts: hipThighParts([
        ...HIP_THIGH_BONES,
        'piriformis',
        'quadratus-femoris',
        ...HAMSTRINGS,
        'adductor-magnus',
        'vastus-lateralis',
        'sciatic-nerve',
        'tibial-nerve',
        'common-peroneal-nerve',
        'posterior-cutaneous-nerve-of-thigh',
        'perforating-arteries',
        'deep-femoral-vein',
        'lateral-circumflex-femoral-artery',
        'medial-circumflex-femoral-vein',
        'inferior-gluteal-vein',
        'popliteal-artery',
        'popliteal-vein',
      ]),
      traces: [],
      stops: [
        THIGH_BACK,
        {
          id: 'course',
          title: 'Down the thigh',
          description:
            'Below gluteus maximus the nerve runs straight down on adductor magnus, the long head of biceps crossing behind it from medial to lateral.',
          target: [-75, -45, 600],
          position: [-150, 830, 640],
        },
        {
          id: 'division',
          title: 'Division',
          description:
            'Above the knee it splits: the tibial nerve goes straight on down the popliteal fossa, the common peroneal out along biceps femoris.',
          target: [-80, -45, 470],
          position: [-200, 640, 520],
        },
        {
          id: 'perforators',
          title: 'Perforating arteries',
          description:
            'From behind and laterally: the perforating arteries come round the back of the femur through adductor magnus towards vastus lateralis. Switch the hamstrings off in Layers to see them.',
          target: [-90, -60, 640],
          position: [-520, 700, 680],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'origin',
      title: 'Two nerves in one sheath',
      body: 'The sciatic nerve is the largest branch of the sacral plexus and the thickest nerve of the body, from L4 to S3. It is really two nerves bound together: a tibial part from the ventral divisions of L4 to S3 and a common peroneal part from the dorsal divisions of L4 to S2.',
      focus: ['sciatic-nerve', 'tibial-part', 'peroneal-part'],
    },
    {
      id: 'course',
      title: 'Course and relations',
      body: 'It enters the back of the thigh at the lower border of gluteus maximus and runs straight down to the upper angle of the popliteal fossa. It lies on adductor magnus; the long head of biceps femoris crosses behind it from medial to lateral; semimembranosus and semitendinosus are medial, biceps lateral. A small companion artery from the inferior gluteal runs with it, the remnant of the limb’s original axis artery.',
      focus: ['relations', 'biceps-femoris', 'adductor-magnus', 'semimembranosus'],
    },
    {
      id: 'branches',
      title: 'Branches',
      body: 'Articular branches to the hip arise in the gluteal region. In the thigh the tibial part supplies semitendinosus, semimembranosus, the long head of biceps and the ischial part of adductor magnus, all from the medial side of the nerve; the common peroneal part supplies only the short head of biceps, from the lateral side.',
      focus: ['branches', 'hamstring-branches', 'short-head-branch'],
    },
    {
      id: 'division',
      title: 'Division',
      body: 'At the junction of the upper two-thirds and lower third of the thigh, at the top of the popliteal fossa, it divides into the tibial and common peroneal nerves. The division can happen anywhere higher, even in the pelvis, when the common peroneal part may pierce piriformis.',
      focus: ['divides', 'tibial-nerve', 'common-peroneal-nerve'],
    },
    {
      id: 'arteries',
      title: 'Perforating arteries',
      body: 'The back of the thigh has no artery of its own: it is fed by the perforating branches of the profunda femoris. They arise in front, pierce the adductors close to the linea aspera, wind round the back of the femur and end in vastus lateralis. BD counts four, the fourth being the end of the profunda; Gray’s counts three. The second gives the nutrient artery of the femur. The model has no profunda artery: the deep femoral vein shows its path.',
      focus: ['perforating-arteries', 'cruciate', 'nutrient', 'popliteal-artery'],
    },
    {
      id: 'anastomoses',
      title: 'A chain down the back',
      body: 'From above down, the gluteal arteries join the circumflex femoral arteries; both circumflex arteries join the first perforating in the cruciate anastomosis; the perforating arteries join one another; and the last joins the upper muscular branches of the popliteal. This chain, with one on the sciatic nerve, can carry blood round a blocked external iliac or femoral artery.',
      focus: ['perforating-arteries', 'cruciate', 'popliteal-artery'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Switch biceps femoris off and follow the sciatic nerve from below piriformis to its division; then switch all the hamstrings off to find the perforating arteries.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'sciatic-crossed-by',
      prompt: 'In the back of the thigh the sciatic nerve is crossed posteriorly by the:',
      options: [
        { id: 'biceps-long', text: 'Long head of biceps femoris' },
        { id: 'semitendinosus', text: 'Semitendinosus' },
        { id: 'adductor-magnus', text: 'Adductor magnus' },
        { id: 'short-head', text: 'Short head of biceps femoris' },
      ],
      answerId: 'biceps-long',
      explanation: 'It crosses from medial to lateral; adductor magnus lies in front of the nerve.',
    },
    {
      id: 'sciatic-root-value',
      prompt: 'The root value of the sciatic nerve is:',
      options: [
        { id: 'l4-s3', text: 'L4 to S3' },
        { id: 'l2-l4', text: 'L2 to L4' },
        { id: 'l5-s2', text: 'L5 to S2' },
        { id: 's2-s4', text: 'S2 to S4' },
      ],
      answerId: 'l4-s3',
      explanation: 'L2–L4 are the femoral and obturator nerves; S2–S4 the pudendal.',
    },
    {
      id: 'sciatic-division-level',
      prompt: 'The sciatic nerve usually divides:',
      options: [
        { id: 'popliteal-apex', text: 'At the upper angle of the popliteal fossa' },
        { id: 'gluteal', text: 'Below piriformis' },
        { id: 'mid-thigh', text: 'At the middle of the thigh' },
        { id: 'knee', text: 'At the level of the knee joint' },
      ],
      answerId: 'popliteal-apex',
      explanation:
        'At the junction of the upper two-thirds and lower third of the thigh, though it can divide higher.',
    },
    {
      id: 'femur-nutrient',
      prompt: 'The nutrient artery of the femur usually comes from the:',
      options: [
        { id: 'second-perforating', text: 'Second perforating artery' },
        { id: 'first-perforating', text: 'First perforating artery' },
        { id: 'medial-circumflex', text: 'Medial circumflex femoral artery' },
        { id: 'descending-genicular', text: 'Descending genicular artery' },
      ],
      answerId: 'second-perforating',
      explanation:
        'The perforating arteries feed the back of the thigh; the second also feeds the femur.',
    },
  ],
  cards: [
    {
      id: 'sciatic-parts-card',
      front: 'Two parts of the sciatic nerve and their roots?',
      back: 'Tibial part: ventral divisions of L4–S3. Common peroneal part: dorsal divisions of L4–S2.',
    },
    {
      id: 'sciatic-thigh-relations-card',
      front: 'Relations of the sciatic nerve in the back of the thigh?',
      back: 'In front: adductor magnus. Behind: crossed by the long head of biceps femoris. Medial: semimembranosus and semitendinosus. Lateral: biceps femoris.',
    },
    {
      id: 'sciatic-thigh-branches-card',
      front: 'Muscular branches of the sciatic nerve in the thigh?',
      back: 'Tibial part: semitendinosus, semimembranosus, long head of biceps, ischial part of adductor magnus. Common peroneal part: short head of biceps.',
    },
    {
      id: 'perforating-card',
      front: 'Perforating arteries of the profunda femoris?',
      back: 'Four (BD; three in Gray’s): pierce the adductors near the linea aspera, wind round the femur to vastus lateralis; the first joins the cruciate anastomosis, the second gives the nutrient artery, the last joins the popliteal branches.',
    },
    {
      id: 'sciatic-injury-card',
      front: 'Effects of complete sciatic nerve injury?',
      back: 'Weak hamstrings, loss of all movements below the knee with foot drop; sensory loss on the back of the thigh, leg and foot except the saphenous strip.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 7 Back of Thigh', pages: '99–103' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '593–594, 597' },
  ],
};
