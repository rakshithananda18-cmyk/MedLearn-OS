import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  KNEE_FRONT,
  KNEE_LIGAMENTS,
  KNEE_MENISCI,
  KNEE_POSTERIOR,
  LOWER_LIMB_JOINTS_MODEL_CREDIT,
  LOWER_LIMB_JOINTS_MODEL_SRC,
  lowerLimbJointParts,
  PATELLAR_LIGAMENT,
} from './lower-limb-joints-3d';

// Lower limb batch 7 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const kneeJoint: Topic = {
  slug: 'knee-joint',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Knee joint',
  summary:
    'The largest and most complex joint: its ligaments and menisci, how it locks for standing and unlocks to bend, its bursae, and the injuries sport brings.',
  estimatedMinutes: 15,
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
      'Volume 2, Chapter 12 Joints of Lower Limb: knee joint, pages 167 to 175',
    ),
    bookSource('grays-anatomy', 'Chapter 6 Lower Limb: knee joint, pages 598 to 608'),
    {
      title: 'Z-Anatomy',
      detail: 'Capsule, ligaments and menisci in the 3D view',
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
    'A condylar synovial joint: two condylar joints between the femur and tibia and a saddle joint between the femur and patella, its cavity divided by the menisci. The capsule is thin and missing in front, where quadriceps, the patella and the patellar ligament replace it.',
    'Tibial collateral ligament: broad, fixed to the medial meniscus. Fibular collateral ligament: a free cord to the head of the fibula. Oblique popliteal ligament: an expansion of semimembranosus behind.',
    'The cruciates are named by their tibial ends: the anterior runs up, back and laterally and stops the tibia sliding forwards (taut in extension); the posterior runs up, forwards and medially and stops it sliding back (taut in flexion).',
    'The medial meniscus is C-shaped and fixed to the tibial collateral ligament, so it is torn more often; the lateral is nearly circular and kept out of harm by popliteus.',
    'Locking: in the last 30 degrees of extension the femur turns medially on the tibia (vastus medialis), making the knee rigid for standing. Unlocking: popliteus turns it laterally so the knee can bend.',
  ],
  visual: {
    kind: 'path',
    // Left: the ligaments. Right: the menisci, locking and unlocking, and the bursae.
    diagram: {
      width: 360,
      height: 460,
      nodes: [
        { id: 'knee', label: 'Knee joint', name: 'Knee joint', x: 180, y: 30 },
        {
          id: 'patellar-ligament',
          label: 'Patellar\nligament',
          name: 'Patellar ligament: apex of the patella to the tibial tuberosity',
          x: 80,
          y: 95,
        },
        {
          id: 'tibial-collateral-ligament',
          label: 'Tibial\ncollateral',
          name: 'Tibial (medial) collateral ligament',
          x: 80,
          y: 160,
        },
        {
          id: 'fibular-collateral-ligament',
          label: 'Fibular\ncollateral',
          name: 'Fibular (lateral) collateral ligament',
          x: 80,
          y: 225,
        },
        {
          id: 'anterior-cruciate-ligament',
          label: 'Anterior\ncruciate',
          name: 'Anterior cruciate ligament: taut in extension',
          x: 80,
          y: 290,
        },
        {
          id: 'posterior-cruciate-ligament',
          label: 'Posterior\ncruciate',
          name: 'Posterior cruciate ligament: taut in flexion',
          x: 80,
          y: 355,
        },
        {
          id: 'oblique-popliteal-ligament',
          label: 'Oblique\npopliteal',
          name: 'Oblique popliteal ligament, from semimembranosus',
          x: 80,
          y: 420,
        },
        {
          id: 'medial-meniscus',
          label: 'Medial\nmeniscus',
          name: 'Medial meniscus: C-shaped, fixed',
          x: 270,
          y: 95,
        },
        {
          id: 'lateral-meniscus',
          label: 'Lateral\nmeniscus',
          name: 'Lateral meniscus: nearly circular, mobile',
          x: 270,
          y: 160,
        },
        {
          id: 'knee-locking',
          label: 'Locking:\nvastus\nmedialis',
          name: 'Locking: the femur turns medially in the last of extension',
          x: 270,
          y: 230,
        },
        {
          id: 'knee-unlocking',
          label: 'Unlocking:\npopliteus',
          name: 'Unlocking: popliteus turns the femur laterally',
          x: 270,
          y: 300,
        },
        {
          id: 'prepatellar-bursa',
          label: 'Prepatellar\nbursa',
          name: 'Prepatellar bursa, in front of the patella',
          x: 270,
          y: 365,
        },
        {
          id: 'suprapatellar-bursa',
          label: 'Suprapatellar\nbursa',
          name: 'Suprapatellar bursa, open to the joint',
          x: 270,
          y: 430,
        },
      ],
      edges: [
        { from: 'knee', to: 'patellar-ligament' },
        { from: 'knee', to: 'tibial-collateral-ligament' },
        { from: 'knee', to: 'fibular-collateral-ligament' },
        { from: 'knee', to: 'anterior-cruciate-ligament' },
        { from: 'knee', to: 'posterior-cruciate-ligament' },
        { from: 'knee', to: 'oblique-popliteal-ligament' },
        { from: 'knee', to: 'medial-meniscus' },
        { from: 'knee', to: 'lateral-meniscus' },
        { from: 'tibial-collateral-ligament', to: 'medial-meniscus' },
        { from: 'knee', to: 'knee-locking' },
        { from: 'knee', to: 'knee-unlocking' },
        { from: 'knee-unlocking', to: 'lateral-meniscus' },
        { from: 'knee', to: 'prepatellar-bursa' },
        { from: 'knee', to: 'suprapatellar-bursa' },
      ],
    },
    lesions: [
      {
        id: 'unhappy-triad',
        label: 'Unhappy triad',
        nodeIds: ['tibial-collateral-ligament', 'medial-meniscus', 'anterior-cruciate-ligament'],
        explanation:
          'A blow to the outer side of the bent knee, as in football, tears the tibial collateral ligament, the medial meniscus fixed to it, and the anterior cruciate ligament together.',
      },
      {
        id: 'cruciate-tear',
        label: 'Cruciate tear',
        nodeIds: ['anterior-cruciate-ligament', 'posterior-cruciate-ligament'],
        explanation:
          'With the anterior cruciate torn, the tibia can be pulled forwards on the femur too far (anterior drawer sign); with the posterior torn, pushed back too far (posterior drawer sign).',
      },
      {
        id: 'meniscus-tear',
        label: 'Torn meniscus',
        nodeIds: ['medial-meniscus', 'knee-locking'],
        explanation:
          'Twisting on a bent, weight-bearing knee traps a meniscus between the bones. A torn piece can jam the joint so it cannot straighten fully, with pain on the joint line. The medial is torn far more often.',
      },
      {
        id: 'housemaids-knee',
        label: 'Housemaid’s knee',
        nodeIds: ['prepatellar-bursa'],
        explanation:
          'Long kneeling inflames the prepatellar bursa in front of the patella. Fluid in the joint itself fills the suprapatellar bursa too, which opens into it.',
      },
    ],
    drill: [
      {
        id: 'knee-ligaments',
        title: 'Ligaments and menisci',
        hint: 'Front, sides, inside the joint, behind; then the two menisci.',
        nodeIds: [
          'patellar-ligament',
          'tibial-collateral-ligament',
          'fibular-collateral-ligament',
          'anterior-cruciate-ligament',
          'posterior-cruciate-ligament',
          'oblique-popliteal-ligament',
          'medial-meniscus',
          'lateral-meniscus',
        ],
      },
      {
        id: 'knee-mechanics',
        title: 'Locking, unlocking and bursae',
        hint: 'Which muscle locks, which unlocks, and two bursae in front.',
        nodeIds: ['knee-locking', 'knee-unlocking', 'prepatellar-bursa', 'suprapatellar-bursa'],
      },
    ],
    model3d: {
      src: LOWER_LIMB_JOINTS_MODEL_SRC,
      credit: LOWER_LIMB_JOINTS_MODEL_CREDIT,
      parts: lowerLimbJointParts(KNEE_LIGAMENTS),
      traces: [PATELLAR_LIGAMENT],
      stops: [KNEE_FRONT, KNEE_MENISCI, KNEE_POSTERIOR],
    },
  },
  lesson: [
    {
      id: 'type',
      title: 'Three joints in one',
      body: 'The largest and most complex joint of the body: two condylar joints, between each condyle of the femur and the tibia, and a saddle joint between the femur and the patella, with the cavity divided by two menisci. The fibula takes no part. Bony fit adds little stability; ligaments and muscles, above all quadriceps, hold it together.',
      focus: ['knee'],
    },
    {
      id: 'outer-ligaments',
      title: 'Capsule and outer ligaments',
      body: 'The capsule is thin and missing in front, where quadriceps, the patella and the patellar ligament (from the apex of the patella to the tibial tuberosity) take its place. The tibial collateral ligament is a broad band on the medial side, its deep part fixed to the medial meniscus; the fibular collateral is a round cord to the head of the fibula, standing free of the capsule. Behind, the oblique popliteal ligament comes from semimembranosus and the arcuate from the fibula.',
      focus: [
        'patellar-ligament',
        'tibial-collateral-ligament',
        'fibular-collateral-ligament',
        'oblique-popliteal-ligament',
      ],
    },
    {
      id: 'cruciates',
      title: 'The cruciate ligaments',
      body: 'Two strong bands inside the capsule but outside the synovial cavity, crossing like an X and named by where they leave the tibia. The anterior runs up, back and laterally to the lateral condyle of the femur, stops the tibia sliding forwards and is taut in extension. The posterior runs up, forwards and medially to the medial condyle, stops the tibia sliding back and is taut in flexion.',
      focus: ['anterior-cruciate-ligament', 'posterior-cruciate-ligament'],
    },
    {
      id: 'menisci',
      title: 'The menisci',
      body: 'Two crescents of fibrocartilage on the tibia, deepening its surfaces, spreading the load and the synovial fluid, and sensing position. The medial is C-shaped, wider behind and fixed to the tibial collateral ligament, so it cannot dodge and tears more often. The lateral is nearly circular and mobile; popliteus pulls its back end away as the knee bends. Only their outer rims have blood vessels, so tears inside heal poorly.',
      focus: ['medial-meniscus', 'lateral-meniscus'],
    },
    {
      id: 'locking',
      title: 'Locking and unlocking',
      body: 'The knee flexes and extends, with a little rotation. In the last 30 degrees of extension, with the foot on the ground, the femur turns medially on the tibia: the medial condyle is longer, and it uses up its last bit of surface. The ligaments go taut and the knee locks, so we stand without effort; vastus medialis completes it. To bend again, popliteus first turns the femur laterally and unlocks the knee.',
      focus: ['knee-locking', 'knee-unlocking'],
    },
    {
      id: 'bursae',
      title: 'Bursae and clinical points',
      body: 'About a dozen bursae surround the knee. The suprapatellar bursa above the patella opens into the joint, so fluid in the knee fills it. The prepatellar bursa in front of the patella swells with long kneeling (housemaid’s knee). Sport tears the anterior cruciate ligament and the medial meniscus, often with the tibial collateral ligament.',
      focus: [
        'prepatellar-bursa',
        'suprapatellar-bursa',
        'anterior-cruciate-ligament',
        'medial-meniscus',
      ],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the front, see the cruciates through the capsule; from the medial side, the tibial collateral ligament over the medial meniscus. Switch the bones off in Layers to compare the C of the medial meniscus with the O of the lateral.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'knee-unlocking-muscle',
      prompt: 'Unlocking of the knee is brought about by:',
      options: [
        { id: 'popliteus', text: 'Popliteus' },
        { id: 'vastus-medialis', text: 'Vastus medialis' },
        { id: 'biceps-femoris', text: 'Biceps femoris' },
        { id: 'sartorius', text: 'Sartorius' },
      ],
      answerId: 'popliteus',
      explanation: 'It turns the femur laterally on the tibia; vastus medialis completes locking.',
    },
    {
      id: 'cruciate-taut-extension',
      prompt:
        'Which ligament is taut in full extension of the knee and stops the tibia sliding forwards?',
      options: [
        { id: 'acl', text: 'Anterior cruciate' },
        { id: 'pcl', text: 'Posterior cruciate' },
        { id: 'oblique', text: 'Oblique popliteal' },
        { id: 'fibular', text: 'Fibular collateral' },
      ],
      answerId: 'acl',
      explanation: 'The posterior cruciate is taut in flexion and stops the tibia sliding back.',
    },
    {
      id: 'medial-meniscus-injury',
      prompt: 'The medial meniscus is injured more often than the lateral because it is:',
      options: [
        { id: 'fixed', text: 'Fixed to the tibial collateral ligament' },
        { id: 'smaller', text: 'Smaller' },
        { id: 'mobile', text: 'More mobile' },
        { id: 'thicker', text: 'Thicker' },
      ],
      answerId: 'fixed',
      explanation: 'Unable to move out of the way, it is trapped and torn on twisting.',
    },
    {
      id: 'housemaids-knee-bursa',
      prompt: 'Housemaid’s knee is inflammation of the:',
      options: [
        { id: 'prepatellar', text: 'Prepatellar bursa' },
        { id: 'suprapatellar', text: 'Suprapatellar bursa' },
        { id: 'deep-infrapatellar', text: 'Deep infrapatellar bursa' },
        { id: 'semimembranosus', text: 'Semimembranosus bursa' },
      ],
      answerId: 'prepatellar',
      explanation: 'In front of the patella, from long kneeling.',
    },
  ],
  cards: [
    {
      id: 'cruciates-card',
      front: 'The two cruciate ligaments?',
      back: 'Named by their tibial ends. Anterior: up, back and laterally; stops forward slide of the tibia; taut in extension. Posterior: up, forwards and medially; stops backward slide; taut in flexion.',
    },
    {
      id: 'menisci-compare-card',
      front: 'Medial vs lateral meniscus?',
      back: 'Medial: C-shaped, fixed to the tibial collateral ligament, torn more often. Lateral: nearly circular, mobile, pulled clear by popliteus.',
    },
    {
      id: 'knee-locking-card',
      front: 'Locking and unlocking of the knee?',
      back: 'Locking: medial rotation of the femur in the last 30 degrees of extension, completed by vastus medialis; the knee is rigid for standing. Unlocking: popliteus rotates the femur laterally.',
    },
    {
      id: 'unhappy-triad-card',
      front: 'Unhappy triad of the knee?',
      back: 'Tibial collateral ligament, medial meniscus and anterior cruciate ligament torn together by a blow to the outer side of the bent knee.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 12 Joints of Lower Limb',
      pages: '167–175',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '598–608' },
  ],
};
