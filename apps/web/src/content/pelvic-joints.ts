import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  PELVIS_FRONT,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  SACROILIAC_BEHIND,
} from './pelvis-3d';

// Pelvis batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const pelvicJoints: Topic = {
  slug: 'pelvic-joints',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'Joints of the pelvis',
  summary:
    'The lumbosacral, sacrococcygeal and sacroiliac joints and the pubic symphysis: their type, surfaces and ligaments, how the sacroiliac joint stays stable, how body weight passes through the pelvis, and what pregnancy and injury do to it.',
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
      'Volume 2, Chapter 34 Walls of Pelvis: joints of pelvis, pages 495 to 499',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: sacro-iliac joints and pubic symphysis, pages 438 to 440',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'Hip bones, sacrum, lower lumbar spine, pubic symphysis and pelvic ligaments in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The sacroiliac joint is a plane synovial joint between the auricular surfaces of the sacrum (fibrocartilage) and the ilium (hyaline cartilage). In adults the surfaces interlock, which limits movement to a slight rotation that absorbs shocks.',
    'The interosseous sacroiliac ligament, the strongest in the body, is the chief bond between sacrum and ilium; the dorsal ligament covers it, and the ventral ligament is a thickening of the capsule. The iliolumbar, sacrotuberous and sacrospinous ligaments are its accessory ligaments.',
    'The pubic symphysis is a secondary cartilaginous joint: hyaline cartilage on each pubis and a fibrocartilaginous disc between, thickest below as the arcuate pubic ligament. The lumbosacral joint has a thick disc and a 120-degree angle; the sacrococcygeal joint is secondary cartilaginous too.',
    'Body weight passes through the alae of the sacrum and the thick bone between the sacroiliac joint and the acetabulum. The dorsal and interosseous ligaments stop the top of the sacrum tipping forwards; the sacrotuberous and sacrospinous ligaments stop its lower end tipping up.',
    'In pregnancy hormones loosen the pelvic ligaments, so the joints move more and lock less well: the strain on the sacroiliac ligaments can outlast the pregnancy and cause low backache.',
  ],
  visual: {
    kind: 'path',
    // Left: the sacroiliac joint and its ligaments. Right: the other joints, then the mechanism.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'pelvic-joints',
          label: 'Joints of the pelvis',
          name: 'Joints of the pelvis',
          x: 180,
          y: 30,
        },
        {
          id: 'sacroiliac',
          label: 'Sacroiliac: plane\nsynovial',
          name: 'Sacroiliac joint: a plane synovial joint',
          x: 85,
          y: 100,
        },
        {
          id: 'auricular-surfaces',
          label: 'Auricular surfaces:\ninterlocking',
          name: 'Auricular surfaces: fibrocartilage on the sacrum, hyaline on the ilium, interlocking in adults',
          x: 85,
          y: 165,
        },
        {
          id: 'interosseous',
          label: 'Interosseous: the\nstrongest',
          name: 'Interosseous sacroiliac ligament, the strongest ligament of the body',
          x: 85,
          y: 225,
        },
        {
          id: 'dorsal-ventral',
          label: 'Dorsal and ventral\nsacroiliac',
          name: 'Dorsal sacroiliac ligament, covering the interosseous; ventral, a thickening of the capsule',
          x: 85,
          y: 290,
        },
        {
          id: 'sacrotuberous-ligaments',
          label: 'Sacrotuberous',
          name: 'Sacrotuberous ligament, from the sacrum and coccyx to the ischial tuberosity',
          x: 85,
          y: 355,
        },
        {
          id: 'sacrospinous-ligaments',
          label: 'Sacrospinous',
          name: 'Sacrospinous ligament, from the sacrum and coccyx to the ischial spine',
          x: 85,
          y: 415,
        },
        {
          id: 'lumbosacral',
          label: 'Lumbosacral: thick\ndisc, 120 degrees',
          name: 'Lumbosacral joint: a thick disc and a 120-degree angle opening backwards',
          x: 275,
          y: 100,
        },
        {
          id: 'iliolumbar',
          label: 'Iliolumbar ligament',
          name: 'Iliolumbar ligament, from the L5 transverse process to the iliac crest',
          x: 275,
          y: 165,
        },
        {
          id: 'sacrococcygeal',
          label: 'Sacrococcygeal',
          name: 'Sacrococcygeal joint, secondary cartilaginous, fusing in old age',
          x: 275,
          y: 225,
        },
        {
          id: 'pubic-symphysis',
          label: 'Pubic symphysis:\ncartilaginous',
          name: 'Pubic symphysis: a secondary cartilaginous joint with a fibrocartilaginous disc',
          x: 275,
          y: 290,
        },
        {
          id: 'weight',
          label: 'Weight: ala to\nacetabulum',
          name: 'Body weight through the alae of the sacrum and the hip bone to the acetabulum',
          x: 275,
          y: 355,
        },
        {
          id: 'pregnancy',
          label: 'Pregnancy loosens',
          name: 'In pregnancy hormones loosen the pelvic ligaments',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'pelvic-joints', to: 'sacroiliac' },
        { from: 'sacroiliac', to: 'auricular-surfaces' },
        { from: 'auricular-surfaces', to: 'interosseous' },
        { from: 'interosseous', to: 'dorsal-ventral' },
        { from: 'dorsal-ventral', to: 'sacrotuberous-ligaments' },
        { from: 'sacrotuberous-ligaments', to: 'sacrospinous-ligaments' },
        { from: 'pelvic-joints', to: 'lumbosacral' },
        { from: 'lumbosacral', to: 'iliolumbar' },
        { from: 'iliolumbar', to: 'sacrococcygeal' },
        { from: 'sacrococcygeal', to: 'pubic-symphysis' },
        { from: 'pubic-symphysis', to: 'weight' },
        { from: 'weight', to: 'pregnancy' },
      ],
    },
    lesions: [
      {
        id: 'pregnancy-strain',
        label: 'Sacroiliac strain after pregnancy',
        nodeIds: ['pregnancy', 'interosseous', 'dorsal-ventral'],
        explanation:
          'In pregnancy the ligaments loosen and the joints lock less well, straining the sacroiliac ligaments. After childbirth they tighten again; if the joint locks in the rotated position it held in pregnancy, it is subluxated and the strain on its ligaments causes low backache.',
      },
      {
        id: 'which-joint',
        label: 'Lumbosacral or sacroiliac?',
        nodeIds: ['lumbosacral', 'iliolumbar', 'sacroiliac'],
        explanation:
          'In lumbosacral disease the tenderness is over the spines and above the dimple of the posterior superior iliac spine (over the iliolumbar ligament), and the spine’s movements are limited in every direction. In sacroiliac disease it is below and medial to the dimple, and the spine moves freely except in full forward bending, when the hamstrings rotate the hip bones against the sacrum and hurt the joint.',
      },
      {
        id: 'pelvic-fracture',
        label: 'Crushed pelvis',
        nodeIds: ['pubic-symphysis', 'sacroiliac'],
        explanation:
          'The pelvic ring (the pubic rami, acetabulum, ischium, ilium and sacrum) tends to break in two places: run over by a vehicle, the pubic bone may fracture on one side while the sacroiliac joint dislocates on the other. The bladder behind the pubis is the organ most at risk.',
      },
    ],
    drill: [
      {
        id: 'sacroiliac',
        title: 'The sacroiliac joint',
        hint: 'Its type, its surfaces, then its ligaments from the strongest outwards, and the two below it.',
        nodeIds: [
          'sacroiliac',
          'auricular-surfaces',
          'interosseous',
          'dorsal-ventral',
          'sacrotuberous-ligaments',
          'sacrospinous-ligaments',
        ],
      },
      {
        id: 'others',
        title: 'The other joints and the mechanism',
        hint: 'From the lumbosacral joint and its ligament down to the coccyx, round to the symphysis, then how weight passes and what pregnancy does.',
        nodeIds: [
          'lumbosacral',
          'iliolumbar',
          'sacrococcygeal',
          'pubic-symphysis',
          'weight',
          'pregnancy',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [...PELVIS_SKELETON, 'obturator-membranes', 'femurs', 'piriformis'],
        ['piriformis'],
      ),
      traces: [],
      stops: [SACROILIAC_BEHIND, PELVIS_FRONT],
    },
  },
  lesson: [
    {
      id: 'lumbosacral',
      title: 'Lumbosacral and sacrococcygeal joints',
      body: 'Between L5 and the base of the sacrum the joints and ligaments are like those between any two vertebrae, but the disc is very thick, thickest in front. L5 is held more firmly by its widely spaced articular processes and by the strong iliolumbar ligament from its stout transverse process to the iliac crest, which fans out below onto the ala as the lumbosacral ligament. The body of L5 meets the sacrum at about 120 degrees, the lumbosacral angle, opening backwards. The sacrococcygeal joint, between the apex of the sacrum and the base of the coccyx, is secondary cartilaginous, with a thin disc and ventral, deep and superficial dorsal, and lateral sacrococcygeal ligaments; in old age it fuses, and the coccygeal segments fuse between 20 and 30.',
      focus: ['lumbosacral', 'iliolumbar', 'sacrococcygeal'],
    },
    {
      id: 'sacroiliac',
      title: 'The sacroiliac joint',
      body: 'The sacroiliac joint is a plane synovial joint between the auricular surface of the sacrum, covered with fibrocartilage, and that of the ilium, covered with hyaline cartilage. Flat in infants, the surfaces develop interlocking ridges and hollows in adults that discourage movement. Its capsule is attached close to the joint margins and lined by synovial membrane. The ventral sacroiliac ligament thickens the front and lower capsule. The interosseous sacroiliac ligament, massive and the strongest in the body, joins the rough areas beside the auricular surfaces and is the chief bond of union. The dorsal sacroiliac ligament covers it, its short fibres from the ilium to the first two sacral pieces and its long band from the posterior superior iliac spine to the third and fourth, joining the sacrotuberous ligament.',
      focus: ['sacroiliac', 'auricular-surfaces', 'interosseous', 'dorsal-ventral'],
    },
    {
      id: 'accessory',
      title: 'Accessory ligaments and stability',
      body: 'The iliolumbar, sacrotuberous and sacrospinous ligaments steady the joint. The sacrotuberous ligament runs from the posterior iliac spines, the lower sacrum and the upper coccyx to the medial edge of the ischial tuberosity, with its falciform process along the ischial ramus; gluteus maximus covers it and partly arises from it. The thin sacrospinous ligament, deep to it, runs from the last sacral piece and the coccyx to the ischial spine and separates the greater and lesser sciatic foramina; coccygeus covers its pelvic surface. The joint stays stable because its surfaces interlock, its interosseous and dorsal ligaments are thick and strong, these accessory ligaments hold it, and with age it partly fuses. It moves only slightly, rotating about a transverse axis 5 to 10 cm below the promontory, which absorbs the shocks of jumping and carrying loads.',
      focus: ['sacrotuberous-ligaments', 'sacrospinous-ligaments', 'interosseous'],
    },
    {
      id: 'symphysis',
      title: 'The pubic symphysis',
      body: 'The pubic symphysis is a secondary cartilaginous joint between the bodies of the two pubic bones. Each surface is covered with a thin layer of hyaline cartilage, and a fibrocartilaginous disc joins them, reinforced by ligamentous fibres: thickest below, where they form the arcuate pubic ligament, and in front as the anterior pubic ligament. It allows a little movement between the hip bones that helps absorb shocks, more in pregnancy.',
      focus: ['pubic-symphysis'],
    },
    {
      id: 'mechanism',
      title: 'How the pelvis carries weight',
      body: 'The pelvis carries the weight of the trunk to the lower limbs, mainly through the alae of the sacrum and the thick bone between the sacroiliac joint and the acetabulum. Weight on the lumbosacral joint tends to drive the sacrum down and back between the iliac bones, resisted by the ligaments of the symphysis, and to push its top down and forwards into the pelvis, resisted by the wedge-shaped, interlocking middle part of the sacroiliac joint. Because the front and back parts lock poorly, the sacrum tends to rotate: its upper end tipping down, held by the dorsal and interosseous ligaments, and its lower end tipping up, held by the sacrotuberous and sacrospinous ligaments. In pregnancy hormones loosen all these ligaments to ease delivery.',
      focus: ['weight', 'pregnancy', 'sacrotuberous-ligaments', 'sacrospinous-ligaments'],
    },
  ],
  questions: [
    {
      id: 'pj-type',
      prompt: 'The sacroiliac joint is a:',
      options: [
        { id: 'plane-synovial', text: 'Plane synovial joint' },
        { id: 'secondary-cartilaginous', text: 'Secondary cartilaginous joint' },
        { id: 'fibrous', text: 'Fibrous joint (syndesmosis)' },
        { id: 'condylar', text: 'Condylar synovial joint' },
      ],
      answerId: 'plane-synovial',
      explanation:
        'Its auricular surfaces interlock in adults; the pubic symphysis is the secondary cartilaginous joint.',
    },
    {
      id: 'pj-strongest',
      prompt: 'The strongest ligament of the body, the chief bond of the sacroiliac joint, is the:',
      options: [
        { id: 'interosseous', text: 'Interosseous sacroiliac ligament' },
        { id: 'iliolumbar', text: 'Iliolumbar ligament' },
        { id: 'sacrotuberous', text: 'Sacrotuberous ligament' },
        { id: 'ventral', text: 'Ventral sacroiliac ligament' },
      ],
      answerId: 'interosseous',
      explanation:
        'It joins the rough areas beside the auricular surfaces, under the dorsal ligament.',
    },
    {
      id: 'pj-tilt',
      prompt:
        'The upward tilt of the lower end of the sacrum under body weight is resisted chiefly by the:',
      options: [
        { id: 'st-ss', text: 'Sacrotuberous and sacrospinous ligaments' },
        { id: 'dorsal-interosseous', text: 'Dorsal and interosseous sacroiliac ligaments' },
        { id: 'symphysis', text: 'Ligaments of the pubic symphysis' },
        { id: 'iliolumbar', text: 'Iliolumbar ligament' },
      ],
      answerId: 'st-ss',
      explanation:
        'They bind the sacrum to the ischium; the dorsal and interosseous ligaments resist the downward tilt of its upper end.',
    },
    {
      id: 'pj-symphysis',
      prompt: 'The thickest ligamentous fibres of the pubic symphysis form the:',
      options: [
        { id: 'arcuate', text: 'Arcuate pubic ligament, below' },
        { id: 'anterior', text: 'Anterior pubic ligament' },
        { id: 'superior', text: 'Superior pubic ligament' },
        { id: 'inguinal', text: 'Inguinal ligament' },
      ],
      answerId: 'arcuate',
      explanation: 'It rounds off the lower edge of the joint, the front of the pelvic outlet.',
    },
  ],
  cards: [
    {
      id: 'pj-surfaces',
      front: 'Cartilage on the sacroiliac articular surfaces?',
      back: 'Fibrocartilage on the sacrum; hyaline cartilage on the ilium.',
    },
    {
      id: 'pj-accessory',
      front: 'Accessory (vertebropelvic) ligaments of the sacroiliac joint?',
      back: 'Iliolumbar, sacrotuberous and sacrospinous.',
    },
    {
      id: 'pj-angle',
      front: 'The lumbosacral angle?',
      back: 'About 120 degrees between the body of L5 and the sacrum, opening backwards.',
    },
    {
      id: 'pj-supply',
      front: 'Blood and nerve supply of the sacroiliac joint?',
      back: 'Iliolumbar, lateral sacral and superior gluteal arteries; the superior gluteal nerve and branches of S1 and S2.',
    },
    {
      id: 'pj-movement',
      front: 'Movement at the sacroiliac joint?',
      back: 'A slight rotation about a transverse axis 5 to 10 cm below the promontory, absorbing shocks; more in pregnancy.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 34 Walls of Pelvis',
      pages: '495–499',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '438–440' },
  ],
};
