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
export const thighFrontMuscles: Topic = {
  slug: 'thigh-front-muscles',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Quadriceps, sartorius and the adductor canal',
  summary:
    'The muscles of the front of the thigh, what each does at the hip and knee, and the adductor canal that carries the femoral vessels to the back of the knee.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 3 Front of Thigh, pages 59 to 64'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: anterior compartment of the thigh and adductor canal, pages 565 and 581 to 586',
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
    'Sartorius: anterior superior iliac spine to the upper medial tibia; flexes, abducts and laterally rotates the hip and flexes the knee (the tailor’s position).',
    'Quadriceps femoris: rectus femoris and three vasti, through the patella and ligamentum patellae to the tibial tuberosity; the extensor of the knee. Femoral nerve.',
    'Rectus femoris also flexes the hip; vastus medialis reaches lowest on the patella and keeps it from slipping laterally.',
    'Iliopsoas (iliacus and psoas major) inserts on the lesser trochanter: the chief flexor of the hip.',
    'Adductor canal: from the apex of the femoral triangle to the opening in adductor magnus, between vastus medialis and the adductors, roofed under sartorius.',
  ],
  visual: {
    kind: 'path',
    // The muscles of the front, quadriceps by its parts, then the adductor canal's walls and contents.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'front-muscles',
          label: 'Front of\nthigh',
          name: 'Muscles of the front of the thigh',
          x: 50,
          y: 30,
        },
        { id: 'sartorius', label: 'Sartorius', name: 'Sartorius', x: 145, y: 30 },
        {
          id: 'iliacus',
          label: 'Iliopsoas',
          name: 'Iliopsoas: iliacus and psoas major',
          x: 225,
          y: 30,
        },
        {
          id: 'articularis-genu',
          label: 'Articularis\ngenu',
          name: 'Articularis genu, pulling up the synovial membrane',
          x: 305,
          y: 30,
        },
        { id: 'quadriceps', label: 'Quadri-\nceps', name: 'Quadriceps femoris', x: 50, y: 110 },
        { id: 'rectus-femoris', label: 'Rectus\nfemoris', name: 'Rectus femoris', x: 145, y: 110 },
        {
          id: 'vastus-lateralis',
          label: 'Vastus\nlateralis',
          name: 'Vastus lateralis',
          x: 225,
          y: 110,
        },
        {
          id: 'vastus-medialis',
          label: 'Vastus\nmedialis',
          name: 'Vastus medialis',
          x: 305,
          y: 110,
        },
        {
          id: 'vastus-intermedius',
          label: 'Vastus\nintermedius',
          name: 'Vastus intermedius',
          x: 185,
          y: 170,
        },
        {
          id: 'patellar-ligament',
          label: 'Ligamentum\npatellae',
          name: 'Ligamentum patellae, to the tibial tuberosity',
          x: 285,
          y: 170,
        },
        {
          id: 'adductor-canal',
          label: 'Adductor\ncanal',
          name: 'Adductor (subsartorial, Hunter’s) canal',
          x: 50,
          y: 256,
        },
        {
          id: 'adductor-longus',
          label: 'Adductor\nlongus',
          name: 'Floor above: adductor longus',
          x: 145,
          y: 256,
        },
        {
          id: 'adductor-magnus',
          label: 'Adductor\nmagnus',
          name: 'Floor below: adductor magnus, with the opening at its end',
          x: 225,
          y: 256,
        },
        {
          id: 'canal-roof',
          label: 'Roof under\nsartorius',
          name: 'Fibrous roof under sartorius, with the subsartorial plexus',
          x: 305,
          y: 256,
        },
        {
          id: 'canal-contents',
          label: 'Contents',
          name: 'Contents of the adductor canal',
          x: 50,
          y: 336,
        },
        {
          id: 'femoral-artery',
          label: 'Femoral\nvessels',
          name: 'Femoral artery and vein',
          x: 145,
          y: 336,
        },
        {
          id: 'saphenous-nerve',
          label: 'Saphenous\nnerve',
          name: 'Saphenous nerve',
          x: 225,
          y: 336,
        },
        {
          id: 'obturator-nerve',
          label: 'Obturator\nbranches',
          name: 'Branches of both divisions of the obturator nerve',
          x: 305,
          y: 336,
        },
      ],
      edges: [
        { from: 'front-muscles', to: 'sartorius' },
        { from: 'front-muscles', to: 'iliacus' },
        { from: 'front-muscles', to: 'articularis-genu' },
        { from: 'quadriceps', to: 'rectus-femoris' },
        { from: 'quadriceps', to: 'vastus-lateralis' },
        { from: 'quadriceps', to: 'vastus-medialis' },
        { from: 'quadriceps', to: 'vastus-intermedius' },
        { from: 'quadriceps', to: 'patellar-ligament' },
        { from: 'adductor-canal', to: 'adductor-longus' },
        { from: 'adductor-canal', to: 'adductor-magnus' },
        { from: 'adductor-canal', to: 'canal-roof' },
        { from: 'canal-contents', to: 'femoral-artery' },
        { from: 'canal-contents', to: 'saphenous-nerve' },
        { from: 'canal-contents', to: 'obturator-nerve' },
      ],
    },
    lesions: [
      {
        id: 'knee-jerk',
        label: 'Knee jerk',
        nodeIds: ['patellar-ligament', 'rectus-femoris'],
        explanation:
          'Tapping the ligamentum patellae stretches quadriceps and it contracts, kicking the leg forward: the knee jerk, testing L3 and L4 and the femoral nerve.',
      },
      {
        id: 'patella-slip',
        label: 'Slipping patella',
        nodeIds: ['vastus-medialis'],
        explanation:
          'Quadriceps pulls the patella slightly outwards. The lowest fibres of vastus medialis, reaching lower on the patella than vastus lateralis, hold it in its groove; when they are weak the patella can dislocate laterally.',
      },
      {
        id: 'thigh-injection',
        label: 'Injection in the thigh',
        nodeIds: ['vastus-lateralis'],
        explanation:
          'Intramuscular injections, especially in infants, are given into vastus lateralis on the front and outer side of the thigh, away from the large vessels and nerves.',
      },
      {
        id: 'hunter',
        label: 'Hunter’s operation',
        nodeIds: ['adductor-canal', 'femoral-artery'],
        explanation:
          'John Hunter treated popliteal aneurysms by tying the femoral artery in this canal; the femoral artery is still reached here for some operations.',
      },
    ],
    drill: [
      {
        id: 'muscles',
        title: 'Muscles of the front',
        hint: 'Sartorius and iliopsoas, then the four parts of quadriceps and its tendon.',
        nodeIds: [
          'sartorius',
          'iliacus',
          'rectus-femoris',
          'vastus-lateralis',
          'vastus-medialis',
          'vastus-intermedius',
          'patellar-ligament',
        ],
      },
      {
        id: 'canal',
        title: 'Adductor canal',
        hint: 'Its floor and roof, and the vessels and nerves that run in it.',
        nodeIds: [
          'adductor-longus',
          'adductor-magnus',
          'canal-roof',
          'femoral-artery',
          'saphenous-nerve',
          'obturator-nerve',
        ],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: HIP_THIGH_MODEL_CREDIT,
      parts: hipThighParts([
        ...HIP_THIGH_BONES,
        ...FRONT_MUSCLES,
        'tensor-fasciae-latae',
        'adductor-longus',
        'adductor-magnus',
        'gracilis',
        'femoral-artery',
        'femoral-vein',
        'descending-genicular-artery',
        'popliteal-artery',
        'popliteal-vein',
        'femoral-nerve',
        'saphenous-nerve',
        'obturator-nerve',
      ]),
      traces: [],
      stops: [
        THIGH_FRONT,
        {
          id: 'lateral',
          title: 'From the side',
          description:
            'Vastus lateralis makes the bulk of the outer thigh; rectus femoris runs down the front from the hip to the patella.',
          target: [-110, -110, 590],
          position: [-1319, -423, 650],
        },
        {
          id: 'adductor-canal',
          title: 'Adductor canal',
          description:
            'From the medial side: the canal runs down the middle third of the thigh between vastus medialis and the adductors, under sartorius, ending at the opening in adductor magnus.',
          target: [-60, -110, 560],
          position: [835, -829, 624],
        },
        {
          id: 'knee',
          title: 'Front of the knee',
          description:
            'Quadriceps converges on the patella; the ligamentum patellae carries its pull on to the tibial tuberosity.',
          target: [-80, -115, 400],
          position: [-239, -846, 458],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'sartorius',
      title: 'Sartorius',
      body: 'The longest muscle in the body, a ribbon from the anterior superior iliac spine across the front of the thigh to the upper medial tibia, in front of gracilis and semitendinosus. It flexes, abducts and laterally rotates the hip and flexes the knee, the cross-legged position of a tailor. Femoral nerve, anterior division.',
      focus: ['front-muscles', 'sartorius'],
    },
    {
      id: 'iliopsoas',
      title: 'Iliopsoas',
      body: 'Iliacus from the iliac fossa and psoas major from the lumbar spine share an insertion on the lesser trochanter and form the floor of the lateral femoral triangle: together the chief and most powerful flexor of the hip. Psoas is supplied from the lumbar roots, iliacus by the femoral nerve.',
      focus: ['iliacus'],
    },
    {
      id: 'quadriceps',
      title: 'Quadriceps femoris',
      body: 'Four parts converging on the patella. Rectus femoris has a straight head from the anterior inferior iliac spine and a reflected head from above the acetabulum, so it flexes the hip too. Vastus lateralis arises from the intertrochanteric line, greater trochanter, gluteal tuberosity and linea aspera; vastus medialis from the intertrochanteric and spiral lines and the linea aspera; vastus intermedius from the front and side of the shaft. Their tendon wraps the patella and continues as the ligamentum patellae to the tibial tuberosity.',
      focus: [
        'quadriceps',
        'rectus-femoris',
        'vastus-lateralis',
        'vastus-medialis',
        'vastus-intermedius',
        'patellar-ligament',
      ],
    },
    {
      id: 'quadriceps-action',
      title: 'What it does',
      body: 'It extends the knee, in standing up, walking and kicking. Vastus medialis reaches lower on the patella than vastus lateralis and keeps it from slipping out; it also turns the femur inwards as the knee locks. Articularis genu, a few slips from the femur, pulls the synovial membrane up out of the way as the knee straightens. All are supplied by the femoral nerve.',
      focus: ['vastus-medialis', 'articularis-genu'],
    },
    {
      id: 'canal',
      title: 'Adductor canal',
      body: 'Also the subsartorial or Hunter’s canal: a triangular tunnel down the medial side of the middle third of the thigh, from the apex of the femoral triangle to the opening in adductor magnus. Vastus medialis forms its anterolateral wall, adductor longus and then adductor magnus its floor, and a fibrous roof joins them under sartorius, with the subsartorial plexus of nerves on it.',
      focus: ['adductor-canal', 'adductor-longus', 'adductor-magnus', 'canal-roof'],
    },
    {
      id: 'canal-contents',
      title: 'What runs in it',
      body: 'The femoral artery, giving the descending genicular artery, and the femoral vein, behind it above and lateral to it below; the saphenous nerve, crossing in front of the artery from lateral to medial; the nerve to vastus medialis; and the ends of both divisions of the obturator nerve. The vessels leave through the opening in adductor magnus to the back of the knee.',
      focus: ['canal-contents', 'femoral-artery', 'saphenous-nerve', 'obturator-nerve'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each muscle to light it, then view the adductor canal from the medial side.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'not-quadriceps',
      prompt: 'Which is not a part of quadriceps femoris?',
      options: [
        { id: 'sartorius', text: 'Sartorius' },
        { id: 'rectus', text: 'Rectus femoris' },
        { id: 'vm', text: 'Vastus medialis' },
        { id: 'vl', text: 'Vastus lateralis' },
      ],
      answerId: 'sartorius',
      explanation: 'The fourth part of quadriceps is vastus intermedius.',
    },
    {
      id: 'lesser-trochanter',
      prompt: 'Which muscles share an insertion on the lesser trochanter?',
      options: [
        { id: 'iliopsoas', text: 'Iliacus and psoas major' },
        { id: 'pect-al', text: 'Pectineus and adductor longus' },
        { id: 'psoas-pect', text: 'Psoas major and pectineus' },
        { id: 'glutei', text: 'Gluteus medius and minimus' },
      ],
      answerId: 'iliopsoas',
      explanation: 'Together they are the chief flexor of the hip.',
    },
    {
      id: 'vm-patella',
      prompt: 'Lateral slipping of the patella is resisted chiefly by:',
      options: [
        { id: 'vm', text: 'The lowest fibres of vastus medialis' },
        { id: 'vl', text: 'Vastus lateralis' },
        { id: 'rf', text: 'Rectus femoris' },
        { id: 'itt', text: 'The iliotibial tract' },
      ],
      answerId: 'vm',
      explanation:
        'They insert lower on the medial border of the patella than vastus lateralis does on the lateral.',
    },
    {
      id: 'canal-opening',
      prompt: 'The femoral vessels leave the adductor canal through:',
      options: [
        { id: 'magnus', text: 'The opening in adductor magnus' },
        { id: 'saphenous', text: 'The saphenous opening' },
        { id: 'obturator', text: 'The obturator foramen' },
        { id: 'roof', text: 'The roof of the canal' },
      ],
      answerId: 'magnus',
      explanation: 'They become the popliteal vessels in the popliteal fossa.',
    },
  ],
  cards: [
    {
      id: 'sartorius-card',
      front: 'Sartorius: attachments and actions?',
      back: 'Anterior superior iliac spine to the upper medial tibia; flexes, abducts and laterally rotates the hip and flexes the knee.',
    },
    {
      id: 'quadriceps-card',
      front: 'Parts of quadriceps femoris and its insertion?',
      back: 'Rectus femoris and vastus lateralis, medialis and intermedius; into the patella and through the ligamentum patellae to the tibial tuberosity.',
    },
    {
      id: 'rectus-femoris-heads',
      front: 'Heads of rectus femoris?',
      back: 'Straight head from the anterior inferior iliac spine; reflected head from the groove above the acetabulum and the hip capsule.',
    },
    {
      id: 'adductor-canal-walls',
      front: 'Walls of the adductor canal?',
      back: 'Anterolateral: vastus medialis. Floor: adductor longus above, adductor magnus below. Roof: fibrous membrane under sartorius.',
    },
    {
      id: 'adductor-canal-contents',
      front: 'Contents of the adductor canal?',
      back: 'Femoral artery and vein, descending genicular artery, saphenous nerve, nerve to vastus medialis, branches of both divisions of the obturator nerve.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 3 Front of Thigh', pages: '59–64' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '565, 581–586' },
  ],
};
