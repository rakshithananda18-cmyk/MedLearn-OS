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
export const hamstringMuscles: Topic = {
  slug: 'hamstrings',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Back of thigh: the hamstrings',
  summary:
    'Semitendinosus, semimembranosus, biceps femoris and the hamstring part of adductor magnus: what makes a hamstring, their attachments, nerve supply and actions.',
  estimatedMinutes: 11,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 7 Back of Thigh, pages 96 to 99 and 101'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: posterior compartment of the thigh, pages 590 and 591',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bones and muscles (BodyParts3D, CC BY 4.0); nerves (Z-Anatomy, CC BY-SA 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 and CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Hamstrings: semitendinosus, semimembranosus, the long head of biceps femoris and the ischial part of adductor magnus.',
    'What makes a hamstring: origin from the ischial tuberosity, insertion into a bone of the leg, supply from the tibial part of the sciatic nerve; each extends the hip and flexes the knee.',
    'The short head of biceps femoris arises from the linea aspera and is supplied by the common peroneal part: not a true hamstring.',
    'Adductor magnus is a hybrid: its adductor part by the obturator nerve, its ischial part by the sciatic; the tibial collateral ligament is the remnant of its tendon.',
    'Semitendinosus inserts on the upper medial tibia behind sartorius and gracilis; semimembranosus into the back of the medial tibial condyle; biceps femoris on the head of the fibula.',
  ],
  visual: {
    kind: 'path',
    // Origin, the hybrid adductor magnus, insertions, nerve supply and actions.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'origin',
          label: 'Ischial\ntuberosity',
          name: 'Common origin: the ischial tuberosity',
          x: 50,
          y: 30,
        },
        {
          id: 'semitendinosus',
          label: 'Semiten-\ndinosus',
          name: 'Semitendinosus',
          x: 145,
          y: 30,
        },
        {
          id: 'semimembranosus',
          label: 'Semimem-\nbranosus',
          name: 'Semimembranosus',
          x: 225,
          y: 30,
        },
        {
          id: 'biceps-femoris',
          label: 'Biceps\nlong head',
          name: 'Long head of biceps femoris',
          x: 305,
          y: 30,
        },
        {
          id: 'adductor-magnus',
          label: 'Adductor\nmagnus',
          name: 'Adductor magnus, a hybrid muscle',
          x: 50,
          y: 110,
        },
        {
          id: 'obturator-nerve',
          label: 'Obturator\npart',
          name: 'Adductor part: obturator nerve',
          x: 145,
          y: 110,
        },
        {
          id: 'ischial-part',
          label: 'Ischial\npart',
          name: 'Hamstring part: tibial part of the sciatic nerve',
          x: 225,
          y: 110,
        },
        {
          id: 'tibial-collateral',
          label: 'Collateral\nligament',
          name: 'Tibial collateral ligament, the remnant of its tendon',
          x: 305,
          y: 110,
        },
        { id: 'insertion', label: 'Insertion', name: 'Insertions', x: 50, y: 186 },
        {
          id: 'medial-tibia',
          label: 'Medial\ntibia',
          name: 'Semitendinosus: upper medial surface of the tibia',
          x: 145,
          y: 186,
        },
        {
          id: 'medial-condyle',
          label: 'Medial\ncondyle',
          name: 'Semimembranosus: groove on the back of the medial tibial condyle',
          x: 225,
          y: 186,
        },
        {
          id: 'fibula',
          label: 'Fibular\nhead',
          name: 'Biceps femoris: head of the fibula',
          x: 305,
          y: 186,
        },
        { id: 'nerve-supply', label: 'Nerve', name: 'Nerve supply', x: 50, y: 262 },
        {
          id: 'tibial-part',
          label: 'Tibial\npart',
          name: 'Tibial part of the sciatic nerve: every hamstring',
          x: 145,
          y: 262,
        },
        {
          id: 'peroneal-part',
          label: 'Peroneal\npart',
          name: 'Common peroneal part: the short head of biceps',
          x: 225,
          y: 262,
        },
        {
          id: 'short-head',
          label: 'Short\nhead',
          name: 'Short head of biceps femoris, from the linea aspera',
          x: 305,
          y: 262,
        },
        { id: 'actions', label: 'Actions', name: 'Actions', x: 50, y: 340 },
        { id: 'knee-flexion', label: 'Flex knee', name: 'Flex the knee', x: 145, y: 340 },
        { id: 'hip-extension', label: 'Extend hip', name: 'Extend the hip', x: 225, y: 340 },
        {
          id: 'leg-rotation',
          label: 'Rotate leg',
          name: 'Rotate the leg with the knee bent: the semis medially, biceps laterally',
          x: 305,
          y: 340,
        },
      ],
      edges: [
        { from: 'origin', to: 'semitendinosus' },
        { from: 'origin', to: 'semimembranosus' },
        { from: 'origin', to: 'biceps-femoris' },
        { from: 'adductor-magnus', to: 'obturator-nerve' },
        { from: 'adductor-magnus', to: 'ischial-part' },
        { from: 'adductor-magnus', to: 'tibial-collateral' },
        { from: 'insertion', to: 'medial-tibia' },
        { from: 'insertion', to: 'medial-condyle' },
        { from: 'insertion', to: 'fibula' },
        { from: 'nerve-supply', to: 'tibial-part' },
        { from: 'nerve-supply', to: 'peroneal-part' },
        { from: 'peroneal-part', to: 'short-head' },
        { from: 'actions', to: 'knee-flexion' },
        { from: 'actions', to: 'hip-extension' },
        { from: 'actions', to: 'leg-rotation' },
      ],
    },
    lesions: [
      {
        id: 'hamstring-tear',
        label: 'Hamstring tear',
        nodeIds: ['origin', 'biceps-femoris'],
        explanation:
          'Sprinting or a sudden stretch with the hip bent and the knee straight can tear the hamstrings, even pulling their tendon off the ischial tuberosity; there is sudden pain at the back of the thigh.',
      },
      {
        id: 'semimembranosus-bursitis',
        label: 'Semimembranosus bursitis',
        nodeIds: ['semimembranosus', 'medial-condyle'],
        explanation:
          'The bursa under semimembranosus swells on the medial side of the back of the knee; the swelling stands out with the knee straight and goes with it bent.',
      },
      {
        id: 'cut-hamstrings',
        label: 'Cut hamstrings',
        nodeIds: ['knee-flexion', 'hip-extension'],
        explanation:
          'Cut behind the knee, the hamstrings can no longer bend the knee or swing the thigh back, so the person cannot run.',
      },
    ],
    drill: [
      {
        id: 'hamstring-attachments',
        title: 'Attachments',
        hint: 'All from the ischial tuberosity; follow each to its bone in the leg.',
        nodeIds: [
          'semitendinosus',
          'semimembranosus',
          'biceps-femoris',
          'medial-tibia',
          'medial-condyle',
          'fibula',
        ],
      },
      {
        id: 'hybrid-supply',
        title: 'Hybrid and nerve supply',
        hint: 'Two nerves for adductor magnus; one part of the sciatic for nearly everything, the other for one head.',
        nodeIds: [
          'obturator-nerve',
          'ischial-part',
          'tibial-collateral',
          'tibial-part',
          'peroneal-part',
          'short-head',
        ],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: HIP_THIGH_MODEL_CREDIT,
      parts: hipThighParts([
        ...HIP_THIGH_BONES,
        ...HAMSTRINGS,
        'adductor-magnus',
        'gracilis',
        'sartorius',
        'quadratus-femoris',
        'vastus-lateralis',
        'gastrocnemius-medial-head',
        'gastrocnemius-lateral-head',
        'sciatic-nerve',
        'tibial-nerve',
        'common-peroneal-nerve',
      ]),
      traces: [],
      stops: [
        THIGH_BACK,
        {
          id: 'origin',
          title: 'Ischial tuberosity',
          description:
            'From behind and below: semitendinosus and the long head of biceps share a tendon from the tuberosity, semimembranosus starts just lateral to them and adductor magnus below.',
          target: [-60, -40, 700],
          position: [-150, 660, 640],
        },
        {
          id: 'medial-insertions',
          title: 'Medial side of the knee',
          description:
            'Semitendinosus, lying on semimembranosus, runs to the upper medial tibia with sartorius and gracilis; semimembranosus goes to the back of the medial condyle.',
          target: [-60, -60, 400],
          position: [380, 450, 440],
        },
        {
          id: 'biceps',
          title: 'Biceps to the fibula',
          description:
            'From behind and laterally: the long and short heads of biceps femoris join and go down to the head of the fibula, the common peroneal nerve along their medial border.',
          target: [-100, -50, 450],
          position: [-560, 480, 500],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'compartment',
      title: 'The flexor compartment',
      body: 'The back of the thigh is the flexor compartment, only partly separated from the medial compartment. Its muscles are the hamstrings: semitendinosus, semimembranosus, the long head of biceps femoris and the ischial part of adductor magnus. The skin over them is supplied by the posterior cutaneous nerve of the thigh.',
      focus: ['origin', 'semitendinosus', 'semimembranosus', 'biceps-femoris'],
    },
    {
      id: 'features',
      title: 'What makes a hamstring',
      body: 'A true hamstring arises from the ischial tuberosity, is inserted into a bone of the leg, is supplied by the tibial part of the sciatic nerve, and so crosses both joints: it extends the hip and flexes the knee. The short head of biceps fails on three counts: it arises from the linea aspera, crosses only the knee and is supplied by the common peroneal part.',
      focus: ['origin', 'tibial-part', 'peroneal-part', 'short-head'],
    },
    {
      id: 'each',
      title: 'Each muscle',
      body: 'Semitendinosus is fleshy above and a long cord below; it lies on semimembranosus and reaches the upper medial tibia behind sartorius and gracilis. Semimembranosus starts as a flat sheet of tendon and ends in the groove on the back of the medial tibial condyle; expansions of its tendon form the oblique popliteal ligament and the fascia over popliteus. Biceps femoris has a long head from the tuberosity and a short head from the linea aspera and goes to the head of the fibula.',
      focus: [
        'semitendinosus',
        'semimembranosus',
        'biceps-femoris',
        'insertion',
        'medial-tibia',
        'medial-condyle',
        'fibula',
      ],
    },
    {
      id: 'hybrid',
      title: 'Adductor magnus, a hybrid',
      body: 'Adductor magnus belongs to two compartments. Its adductor part, from the ischiopubic ramus, is supplied by the posterior division of the obturator nerve; its ischial part, from the tuberosity to the adductor tubercle, by the tibial part of the sciatic. It counts as a hamstring because the tibial collateral ligament of the knee is the degenerated rest of its tendon.',
      focus: ['adductor-magnus', 'obturator-nerve', 'ischial-part', 'tibial-collateral'],
    },
    {
      id: 'actions',
      title: 'Actions',
      body: 'The hamstrings are the main flexors of the knee and help extend the hip, as in walking and running. With the knee bent, the semis rotate the leg medially and biceps laterally. Short hamstrings are why some people cannot touch their toes with straight knees.',
      focus: ['actions', 'knee-flexion', 'hip-extension', 'leg-rotation'],
    },
    {
      id: 'explore',
      title: 'Find it yourself',
      body: 'Select each hamstring and follow it from the ischial tuberosity to the leg; switch biceps femoris off to see the sciatic nerve on adductor magnus.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'not-a-hamstring',
      prompt: 'Which is not a true hamstring?',
      options: [
        { id: 'short-head', text: 'Short head of biceps femoris' },
        { id: 'semitendinosus', text: 'Semitendinosus' },
        { id: 'semimembranosus', text: 'Semimembranosus' },
        { id: 'ischial-magnus', text: 'Ischial part of adductor magnus' },
      ],
      answerId: 'short-head',
      explanation:
        'It arises from the linea aspera, not the ischial tuberosity, and is supplied by the common peroneal part.',
    },
    {
      id: 'short-head-supply',
      prompt: 'The short head of biceps femoris is supplied by the:',
      options: [
        { id: 'common-peroneal', text: 'Common peroneal part of the sciatic nerve' },
        { id: 'tibial', text: 'Tibial part of the sciatic nerve' },
        { id: 'obturator', text: 'Obturator nerve' },
        { id: 'femoral', text: 'Femoral nerve' },
      ],
      answerId: 'common-peroneal',
      explanation:
        'It is the only muscle of the back of the thigh supplied by the common peroneal part.',
    },
    {
      id: 'biceps-insertion',
      prompt: 'Biceps femoris is inserted into the:',
      options: [
        { id: 'fibula', text: 'Head of the fibula' },
        { id: 'adductor-tubercle', text: 'Adductor tubercle' },
        { id: 'medial-condyle', text: 'Medial condyle of the tibia' },
        { id: 'tibial-tuberosity', text: 'Tibial tuberosity' },
      ],
      answerId: 'fibula',
      explanation: 'Its tendon is folded round the fibular collateral ligament at the insertion.',
    },
    {
      id: 'tibial-collateral-origin',
      prompt: 'The tibial collateral ligament of the knee is the degenerated tendon of:',
      options: [
        { id: 'magnus', text: 'Adductor magnus' },
        { id: 'longus', text: 'Adductor longus' },
        { id: 'semimembranosus', text: 'Semimembranosus' },
        { id: 'gracilis', text: 'Gracilis' },
      ],
      answerId: 'magnus',
      explanation:
        'Which is why adductor magnus, ending at the adductor tubercle, still counts as a hamstring.',
    },
  ],
  cards: [
    {
      id: 'hamstring-features-card',
      front: 'Features shared by the hamstrings?',
      back: 'Origin from the ischial tuberosity, insertion into a bone of the leg, supply from the tibial part of the sciatic nerve; flex the knee and extend the hip.',
    },
    {
      id: 'hamstring-list-card',
      front: 'The hamstring muscles?',
      back: 'Semitendinosus, semimembranosus, long head of biceps femoris, ischial part of adductor magnus.',
    },
    {
      id: 'hamstring-insertions-card',
      front: 'Insertions of the hamstrings?',
      back: 'Semitendinosus: upper medial tibia. Semimembranosus: groove on the back of the medial tibial condyle. Biceps femoris: head of the fibula. Adductor magnus: adductor tubercle.',
    },
    {
      id: 'hybrid-magnus-card',
      front: 'Why is adductor magnus a hybrid muscle?',
      back: 'Adductor part: posterior division of the obturator nerve. Ischial (hamstring) part: tibial part of the sciatic nerve.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 7 Back of Thigh', pages: '96–99, 101' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '590–591' },
  ],
};
