import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  HIP_BACK,
  HIP_FRONT,
  HIP_LIGAMENTS,
  LOWER_LIMB_JOINTS_MODEL_CREDIT,
  LOWER_LIMB_JOINTS_MODEL_SRC,
  lowerLimbJointParts,
} from './lower-limb-joints-3d';

// Lower limb batch 7 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const hipJoint: Topic = {
  slug: 'hip-joint',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Hip joint',
  summary:
    'The deep ball and socket that carries the body: what holds it together, how its head is fed, what moves it, and how it breaks and dislocates.',
  estimatedMinutes: 13,
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
      'Volume 2, Chapter 12 Joints of Lower Limb: hip joint, pages 162 to 166',
    ),
    bookSource('grays-anatomy', 'Chapter 6 Lower Limb: hip joint, pages 550 to 554'),
    {
      title: 'Z-Anatomy',
      detail: 'Capsule, ligaments and labrum in the 3D view',
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
    'A multiaxial ball and socket synovial joint between the head of the femur and the acetabulum: as mobile as the shoulder in kind but far more stable, thanks to the deep socket and its labrum, strong ligaments and muscles, and the long angled neck of the femur.',
    'The capsule reaches the intertrochanteric line in front but only halfway down the neck behind; its fibres turn up the neck as retinacula, which carry the arteries of the head.',
    'The iliofemoral ligament (the inverted Y of Bigelow), from the anterior inferior iliac spine to the intertrochanteric line, is one of the strongest in the body and stops the trunk falling backwards; the pubofemoral and ischiofemoral ligaments complete the cover.',
    'The head is fed mostly by retinacular arteries from the ring of the medial and lateral circumflex femoral arteries round the neck, and a little through the ligament of the head. The femoral, obturator and sciatic nerves (nerve to quadratus femoris) and the superior gluteal nerve supply the joint.',
    'Flexion: iliopsoas. Extension: gluteus maximus and hamstrings. Abduction: gluteus medius and minimus. Adduction: the adductors. Medial rotation: tensor fasciae latae and the front of the small glutei. Lateral rotation: the obturators, gemelli and quadratus femoris.',
  ],
  visual: {
    kind: 'path',
    // Left: what holds the joint together and feeds the head. Right: its movements and muscles.
    diagram: {
      width: 360,
      height: 480,
      nodes: [
        { id: 'hip', label: 'Hip joint', name: 'Hip joint: ball and socket', x: 180, y: 30 },
        { id: 'hip-capsule', label: 'Capsule', name: 'Fibrous capsule', x: 80, y: 95 },
        {
          id: 'iliofemoral-ligament',
          label: 'Iliofemoral\n(Y)',
          name: 'Iliofemoral ligament, the inverted Y',
          x: 80,
          y: 155,
        },
        {
          id: 'pubofemoral-ligament',
          label: 'Pubofemoral',
          name: 'Pubofemoral ligament',
          x: 80,
          y: 215,
        },
        {
          id: 'ischiofemoral-ligament',
          label: 'Ischiofemoral',
          name: 'Ischiofemoral ligament',
          x: 80,
          y: 270,
        },
        { id: 'acetabular-labrum', label: 'Labrum', name: 'Acetabular labrum', x: 80, y: 330 },
        {
          id: 'ligament-of-head-of-femur',
          label: 'Ligament of\nthe head',
          name: 'Ligament of the head of the femur, with its small artery',
          x: 80,
          y: 390,
        },
        {
          id: 'retinacular-arteries',
          label: 'Retinacular\narteries',
          name: 'Retinacular arteries up the neck, from the circumflex femoral ring',
          x: 80,
          y: 455,
        },
        {
          id: 'hip-flexion',
          label: 'Flex:\niliopsoas',
          name: 'Flexion: iliopsoas',
          x: 275,
          y: 95,
        },
        {
          id: 'hip-extension',
          label: 'Extend:\ngluteus\nmaximus',
          name: 'Extension: gluteus maximus and hamstrings',
          x: 275,
          y: 160,
        },
        {
          id: 'hip-abduction',
          label: 'Abduct:\nglutei medius,\nminimus',
          name: 'Abduction: gluteus medius and minimus',
          x: 275,
          y: 225,
        },
        {
          id: 'hip-adduction',
          label: 'Adduct:\nadductors',
          name: 'Adduction: adductors longus, brevis and magnus',
          x: 275,
          y: 290,
        },
        {
          id: 'hip-medial-rotation',
          label: 'Turn in:\nfront glutei',
          name: 'Medial rotation: tensor fasciae latae and the front of gluteus medius and minimus',
          x: 275,
          y: 355,
        },
        {
          id: 'hip-lateral-rotation',
          label: 'Turn out:\nshort rotators',
          name: 'Lateral rotation: obturators, gemelli, quadratus femoris',
          x: 275,
          y: 420,
        },
      ],
      edges: [
        { from: 'hip', to: 'hip-capsule' },
        { from: 'hip-capsule', to: 'iliofemoral-ligament' },
        { from: 'hip-capsule', to: 'pubofemoral-ligament' },
        { from: 'hip-capsule', to: 'ischiofemoral-ligament' },
        { from: 'hip', to: 'acetabular-labrum' },
        { from: 'hip', to: 'ligament-of-head-of-femur' },
        { from: 'hip-capsule', to: 'retinacular-arteries' },
        { from: 'hip', to: 'hip-flexion' },
        { from: 'hip', to: 'hip-extension' },
        { from: 'hip', to: 'hip-abduction' },
        { from: 'hip', to: 'hip-adduction' },
        { from: 'hip', to: 'hip-medial-rotation' },
        { from: 'hip', to: 'hip-lateral-rotation' },
      ],
    },
    lesions: [
      {
        id: 'neck-fracture',
        label: 'Fractured neck',
        nodeIds: ['retinacular-arteries', 'hip-capsule'],
        explanation:
          'Common in the elderly after a trivial fall. The retinacular arteries running up the neck tear, so the head can die (avascular necrosis): the risk is greatest when the break is close to the head, least near the trochanters, and the hip may need replacing.',
      },
      {
        id: 'posterior-dislocation',
        label: 'Posterior dislocation',
        nodeIds: ['ischiofemoral-ligament', 'hip-capsule'],
        explanation:
          'The capsule is thinnest behind and below, so the head usually goes out backwards, as when a bent knee hits a dashboard. The sciatic nerve behind the joint may be injured.',
      },
      {
        id: 'developmental-dysplasia',
        label: 'Developmental dislocation',
        nodeIds: ['acetabular-labrum', 'hip-abduction'],
        explanation:
          'Commoner at the hip than at any other joint: the upper rim of the acetabulum is underdeveloped, so the head rides up onto the ilium. The child lurches, and the Trendelenburg sign is positive.',
      },
    ],
    drill: [
      {
        id: 'hip-holding',
        title: 'What holds it, what feeds it',
        hint: 'Capsule and its three ligaments, then the labrum, the ligament of the head and the arteries up the neck.',
        nodeIds: [
          'hip-capsule',
          'iliofemoral-ligament',
          'pubofemoral-ligament',
          'ischiofemoral-ligament',
          'acetabular-labrum',
          'ligament-of-head-of-femur',
          'retinacular-arteries',
        ],
      },
      {
        id: 'hip-movements',
        title: 'Movements and muscles',
        hint: 'Six movements, the chief muscle for each.',
        nodeIds: [
          'hip-flexion',
          'hip-extension',
          'hip-abduction',
          'hip-adduction',
          'hip-medial-rotation',
          'hip-lateral-rotation',
        ],
      },
    ],
    model3d: {
      src: LOWER_LIMB_JOINTS_MODEL_SRC,
      credit: LOWER_LIMB_JOINTS_MODEL_CREDIT,
      parts: lowerLimbJointParts(HIP_LIGAMENTS),
      traces: [],
      stops: [HIP_FRONT, HIP_BACK],
    },
  },
  lesson: [
    {
      id: 'type',
      title: 'A deep ball and socket',
      body: 'The head of the femur, more than half a sphere, sits in the horseshoe-shaped lunate surface of the acetabulum. It moves in every direction like the shoulder, but is built for stability: a deep socket narrowed by its labrum, strong ligaments and muscles, a long neck set at an angle, and even atmospheric pressure hold the head in.',
      focus: ['hip', 'acetabular-labrum'],
    },
    {
      id: 'capsule',
      title: 'The capsule',
      body: 'On the hip bone it is attached round the acetabulum, to the labrum and the transverse ligament; on the femur to the intertrochanteric line in front but only about halfway along the neck behind. It is thick and taut in front and above, where standing loads it, and thin and loose behind and below. Its longitudinal fibres turn up along the neck as retinacula, carrying the arteries of the head.',
      focus: ['hip-capsule', 'retinacular-arteries'],
    },
    {
      id: 'ligaments',
      title: 'Three ligaments, and two inside',
      body: 'The iliofemoral ligament, an inverted Y from the anterior inferior iliac spine to the intertrochanteric line, is one of the strongest in the body: it keeps the trunk from falling backwards as we stand. The pubofemoral covers the joint below and in front, the weak ischiofemoral behind. Inside, the labrum deepens the socket, and the ligament of the head runs from the fovea to the acetabular notch.',
      focus: [
        'iliofemoral-ligament',
        'pubofemoral-ligament',
        'ischiofemoral-ligament',
        'acetabular-labrum',
        'ligament-of-head-of-femur',
      ],
    },
    {
      id: 'supply',
      title: 'Blood and nerves',
      body: 'The medial and lateral circumflex femoral arteries make a ring round the neck; retinacular arteries climb from it to supply most of the head. Only a small part near the fovea is fed through the ligament of the head, from the obturator artery. The femoral, obturator and sciatic nerves and the superior gluteal nerve supply the joint, which is why hip disease can be felt in the knee.',
      focus: ['retinacular-arteries', 'ligament-of-head-of-femur'],
    },
    {
      id: 'movements',
      title: 'Movements',
      body: 'Flexion by iliopsoas, extension by gluteus maximus and the hamstrings, abduction by gluteus medius and minimus, adduction by the adductors, medial rotation by tensor fasciae latae and the front fibres of the small glutei, lateral rotation by the obturators, gemelli and quadratus femoris. Extension is limited (about 15 degrees), lateral rotation is large (about 60).',
      focus: [
        'hip-flexion',
        'hip-extension',
        'hip-abduction',
        'hip-adduction',
        'hip-medial-rotation',
        'hip-lateral-rotation',
      ],
    },
    {
      id: 'clinical',
      title: 'Clinical points',
      body: 'Fracture of the neck in the elderly risks the head (avascular necrosis), most when the break is near the head. Most dislocations are posterior, endangering the sciatic nerve. Developmental dislocation is commoner here than at any other joint. Shenton’s line on an X-ray, from the obturator foramen along the underside of the neck, breaks when the neck is fractured.',
      focus: ['retinacular-arteries', 'ischiofemoral-ligament', 'acetabular-labrum'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the front, follow the Y of the iliofemoral ligament; from behind, see how far down the neck the capsule reaches.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'hip-strongest-ligament',
      prompt: 'The strongest ligament of the hip joint is the:',
      options: [
        { id: 'iliofemoral', text: 'Iliofemoral ligament' },
        { id: 'pubofemoral', text: 'Pubofemoral ligament' },
        { id: 'ischiofemoral', text: 'Ischiofemoral ligament' },
        { id: 'head', text: 'Ligament of the head of the femur' },
      ],
      answerId: 'iliofemoral',
      explanation: 'The inverted Y in front; it stops the trunk falling backwards.',
    },
    {
      id: 'hip-necrosis-fracture',
      prompt: 'Avascular necrosis of the head is most likely after a fracture of the neck that is:',
      options: [
        { id: 'subcapital', text: 'Subcapital, close to the head' },
        { id: 'cervical', text: 'In the middle of the neck' },
        { id: 'basal', text: 'At the base of the neck' },
        { id: 'intertrochanteric', text: 'Between the trochanters' },
      ],
      answerId: 'subcapital',
      explanation: 'The nearer the head, the more retinacular arteries are torn.',
    },
    {
      id: 'hip-abductors',
      prompt: 'The chief abductors of the hip are:',
      options: [
        { id: 'glutei', text: 'Gluteus medius and minimus' },
        { id: 'maximus', text: 'Gluteus maximus' },
        { id: 'adductors', text: 'The adductors' },
        { id: 'iliopsoas', text: 'Iliopsoas' },
      ],
      answerId: 'glutei',
      explanation: 'They also hold the pelvis level in walking: the Trendelenburg sign.',
    },
    {
      id: 'hip-dislocation-nerve',
      prompt: 'The nerve at risk in a posterior dislocation of the hip is the:',
      options: [
        { id: 'sciatic', text: 'Sciatic nerve' },
        { id: 'femoral', text: 'Femoral nerve' },
        { id: 'obturator', text: 'Obturator nerve' },
        { id: 'superior-gluteal', text: 'Superior gluteal nerve' },
      ],
      answerId: 'sciatic',
      explanation: 'It lies directly behind the joint.',
    },
  ],
  cards: [
    {
      id: 'hip-stability-card',
      front: 'What makes the hip so stable?',
      back: 'A deep acetabulum narrowed by the labrum, strong ligaments (above all the iliofemoral), strong muscles, the long angled neck of the femur, and atmospheric pressure.',
    },
    {
      id: 'iliofemoral-card',
      front: 'Iliofemoral ligament?',
      back: 'Inverted Y of Bigelow: anterior inferior iliac spine to the intertrochanteric line; one of the strongest in the body; stops the trunk falling backwards when standing.',
    },
    {
      id: 'femoral-head-supply-card',
      front: 'Blood supply of the head of the femur?',
      back: 'Mostly retinacular arteries from the circumflex femoral ring round the neck; a little through the ligament of the head (obturator artery). Torn in neck fractures: avascular necrosis.',
    },
    {
      id: 'hip-muscles-card',
      front: 'Chief muscles of each hip movement?',
      back: 'Flexion iliopsoas; extension gluteus maximus and hamstrings; abduction glutei medius and minimus; adduction the adductors; medial rotation tensor fasciae latae and front glutei; lateral rotation the short rotators.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 12 Joints of Lower Limb',
      pages: '162–166',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '550–554' },
  ],
};
