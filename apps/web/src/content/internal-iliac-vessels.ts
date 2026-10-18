import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  PELVIC_INLET_ABOVE,
  PELVIC_WALL_MEDIAL,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
} from './pelvis-3d';

// Pelvis batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const internalIliacVessels: Topic = {
  slug: 'internal-iliac-vessels',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'Internal iliac vessels and pelvic lymph nodes',
  summary:
    'The internal iliac artery from the brim to the greater sciatic notch, the branches of its anterior and posterior divisions in each sex, the internal iliac vein and its plexuses, and the three groups of pelvic lymph nodes.',
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
      'Volume 2, Chapter 34 Walls of Pelvis: vessels and lymph nodes of the pelvis, pages 488 to 491',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: internal iliac artery, veins and lymphatics, pages 489 to 495',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'Bony pelvis, pelvic wall muscles, iliac and pudendal vessels and pelvic organs in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The internal iliac artery is the smaller end branch of the common iliac, about 3.75 cm long. It begins in front of the sacroiliac joint at the level of the L5/S1 disc and ends near the top of the greater sciatic notch by dividing into anterior and posterior divisions.',
    'It supplies the pelvic organs (except what the superior rectal, ovarian and median sacral arteries reach), the perineum, most of the gluteal region and the iliac fossa. In the foetus it is twice the size of the external iliac, carrying blood to the placenta through the umbilical artery.',
    'The posterior division gives the iliolumbar, two lateral sacral and the superior gluteal arteries; the superior gluteal leaves above piriformis.',
    'The anterior division gives six branches in men: superior vesical, obturator, middle rectal, inferior vesical, inferior gluteal and internal pudendal (the last two its end branches). In women the vaginal artery replaces the inferior vesical, and the uterine artery is a seventh.',
    'The internal iliac vein runs up behind and medial to the artery and joins the external iliac vein in front of the sacroiliac joint; the pelvic lymph nodes lie in external iliac, internal iliac and common iliac groups along the vessels.',
  ],
  visual: {
    kind: 'path',
    // Left: the artery's course and posterior division, then the vein. Right: the anterior
    // division, then the lymph nodes.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'iliac-arteries',
          label: 'Internal iliac artery',
          name: 'Internal iliac artery',
          x: 180,
          y: 30,
        },
        {
          id: 'iliac-course',
          label: 'L5/S1 disc to the\nsciatic notch',
          name: 'Course: from the L5/S1 disc in front of the sacroiliac joint to the top of the greater sciatic notch',
          x: 85,
          y: 100,
        },
        {
          id: 'posterior-division',
          label: 'Posterior division',
          name: 'Posterior division: the iliolumbar, lateral sacral and superior gluteal arteries',
          x: 85,
          y: 165,
        },
        {
          id: 'iliolumbar',
          label: 'Iliolumbar',
          name: 'Iliolumbar artery: lumbar and iliac branches, behind psoas',
          x: 85,
          y: 225,
        },
        {
          id: 'lateral-sacral',
          label: 'Two lateral sacral',
          name: 'Two lateral sacral arteries, into the anterior sacral foramina',
          x: 85,
          y: 290,
        },
        {
          id: 'superior-gluteal',
          label: 'Superior gluteal:\nabove piriformis',
          name: 'Superior gluteal artery, out above piriformis to the buttock',
          x: 85,
          y: 355,
        },
        {
          id: 'iliac-veins',
          label: 'Internal iliac vein',
          name: 'Internal iliac vein, behind and medial to the artery, with the pelvic venous plexuses',
          x: 85,
          y: 415,
        },
        {
          id: 'anterior-division',
          label: 'Anterior division',
          name: 'Anterior division: six branches in men, seven in women',
          x: 275,
          y: 100,
        },
        {
          id: 'vesical-rectal',
          label: 'Vesical and middle\nrectal arteries',
          name: 'Superior and inferior vesical and middle rectal arteries (vaginal and uterine in women)',
          x: 275,
          y: 165,
        },
        {
          id: 'obturator-artery',
          label: 'Obturator artery',
          name: 'Obturator artery, below the nerve and above the vein, to the obturator foramen',
          x: 275,
          y: 225,
        },
        {
          id: 'inferior-gluteal',
          label: 'Inferior gluteal:\nthe largest',
          name: 'Inferior gluteal artery, the largest branch of the anterior division, below piriformis',
          x: 275,
          y: 290,
        },
        {
          id: 'internal-pudendal-vessels',
          label: 'Internal pudendal',
          name: 'Internal pudendal artery, the smaller end branch, to the perineum',
          x: 275,
          y: 355,
        },
        {
          id: 'pelvic-nodes',
          label: 'Iliac lymph nodes',
          name: 'External iliac, internal iliac and common iliac lymph nodes',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'iliac-arteries', to: 'iliac-course' },
        { from: 'iliac-course', to: 'posterior-division' },
        { from: 'posterior-division', to: 'iliolumbar' },
        { from: 'iliolumbar', to: 'lateral-sacral' },
        { from: 'lateral-sacral', to: 'superior-gluteal' },
        { from: 'superior-gluteal', to: 'iliac-veins' },
        { from: 'iliac-arteries', to: 'anterior-division' },
        { from: 'anterior-division', to: 'vesical-rectal' },
        { from: 'vesical-rectal', to: 'obturator-artery' },
        { from: 'obturator-artery', to: 'inferior-gluteal' },
        { from: 'inferior-gluteal', to: 'internal-pudendal-vessels' },
        { from: 'internal-pudendal-vessels', to: 'pelvic-nodes' },
      ],
    },
    lesions: [
      {
        id: 'uterine-ureter',
        label: 'Uterine artery and ureter',
        nodeIds: ['vesical-rectal', 'anterior-division'],
        explanation:
          'In women the uterine artery crosses above the ureter about 2 cm from the side of the cervix. When the uterine arteries are tied in removing the uterus, the ureter just below them is at risk.',
      },
      {
        id: 'portosystemic',
        label: 'Spread through rectal veins',
        nodeIds: ['iliac-veins'],
        explanation:
          'The rectal venous plexus is drained by the superior rectal vein to the portal system and by the middle and inferior rectal veins to the internal iliac and the caval system. Their free joining explains how cancers of pelvic organs can reach the liver.',
      },
      {
        id: 'nodes',
        label: 'Spread to iliac nodes',
        nodeIds: ['pelvic-nodes'],
        explanation:
          'The internal iliac nodes take lymph from all the pelvic viscera and the deep perineum; the external iliac nodes also from the prostate, the base of the bladder, the cervix and part of the vagina. Cancers of these organs spread first to these groups, then to the common iliac and lateral aortic nodes.',
      },
    ],
    drill: [
      {
        id: 'posterior',
        title: 'Course, posterior division and vein',
        hint: 'Where it runs, the division that goes back with its three branches, then the vein.',
        nodeIds: [
          'iliac-course',
          'posterior-division',
          'iliolumbar',
          'lateral-sacral',
          'superior-gluteal',
          'iliac-veins',
        ],
      },
      {
        id: 'anterior',
        title: 'Anterior division and nodes',
        hint: 'The division that stays in front: its visceral branches, the obturator, its two end branches, then the lymph nodes.',
        nodeIds: [
          'anterior-division',
          'vesical-rectal',
          'obturator-artery',
          'inferior-gluteal',
          'internal-pudendal-vessels',
          'pelvic-nodes',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          ...PELVIS_SKELETON,
          'obturator-internus',
          'piriformis',
          'iliac-arteries',
          'iliac-veins',
          'internal-pudendal-vessels',
          'obturator-nerves',
          'ureters',
          'urinary-bladder',
          'rectum',
        ],
        ['hip-bones', 'obturator-internus', 'urinary-bladder', 'rectum'],
      ),
      traces: [],
      stops: [PELVIC_WALL_MEDIAL, PELVIC_INLET_ABOVE],
    },
  },
  lesson: [
    {
      id: 'course',
      title: 'Course and relations',
      body: 'The internal iliac artery is the smaller end branch of the common iliac, about 3.75 cm long. It begins in front of the sacroiliac joint at the level of the disc between L5 and the sacrum, medial to psoas, runs down and back, and ends near the top of the greater sciatic notch by dividing into anterior and posterior divisions. In front of it lie the ureter and, in women, the ovary and the end of the uterine tube; behind it the internal iliac vein, the lumbosacral trunk and the sacroiliac joint; lateral to it the external iliac vessels and the obturator nerve; medial to it peritoneum. In the foetus it is twice the size of the external iliac, sending blood to the placenta through the umbilical artery; after birth the first part of that artery stays as the superior vesical artery and the rest becomes the medial umbilical ligament.',
      focus: ['iliac-course'],
    },
    {
      id: 'posterior',
      title: 'The posterior division',
      body: 'The posterior division gives three branches to the walls. The iliolumbar artery runs up in front of the sacroiliac joint and the lumbosacral trunk, behind the obturator nerve and external iliac vessels, and divides behind psoas into a lumbar branch (the fifth lumbar artery, with a spinal branch to the cauda equina) and an iliac branch to the iliac fossa. The two lateral sacral arteries run down over the sacral nerves and send branches into the anterior sacral foramina. The superior gluteal artery runs back, passes above the first sacral nerve and leaves the pelvis through the greater sciatic foramen above piriformis to the buttock.',
      focus: ['posterior-division', 'iliolumbar', 'lateral-sacral', 'superior-gluteal'],
    },
    {
      id: 'anterior-visceral',
      title: 'Anterior division: to the organs',
      body: 'The anterior division gives six branches in men and seven in women. To the organs: the superior vesical artery (its first 2.5 cm the open part of the umbilical artery) to the upper bladder, with the artery to the ductus deferens; the middle rectal artery, often absent, sending little blood to the rectum and most to the prostate and seminal vesicles; the inferior vesical artery to the trigone, prostate, seminal vesicles and lower ureter. In women the vaginal artery takes the place of the inferior vesical, and the uterine artery, crossing above the ureter 2 cm from the cervix, is the extra branch.',
      focus: ['anterior-division', 'vesical-rectal'],
    },
    {
      id: 'anterior-parietal',
      title: 'Anterior division: to the walls',
      body: 'The obturator artery runs forwards on the obturator fascia below the obturator nerve and above the vein (nerve, artery, vein from above down), crossed medially by the ureter and the ductus deferens, and leaves through the obturator foramen; in the pelvis it gives iliac, vesical and pubic branches. The inferior gluteal artery, the largest branch of the anterior division and the axial artery of the lower limb, runs down in front of the sacral plexus and piriformis and leaves between piriformis and coccygeus below S1. The internal pudendal artery, its smaller end branch, leaves below piriformis for the perineum.',
      focus: ['obturator-artery', 'inferior-gluteal', 'internal-pudendal-vessels'],
    },
    {
      id: 'veins-nodes',
      title: 'Vein and lymph nodes',
      body: 'The internal iliac vein runs up behind and medial to the artery and joins the external iliac vein at the brim in front of the sacroiliac joint to form the common iliac vein. Its tributaries match the artery’s branches, except that the iliolumbar vein joins the common iliac vein: the superior gluteal (the largest), inferior gluteal, internal pudendal, obturator and lateral sacral veins, and the rectal, prostatic, vesical, uterine and vaginal venous plexuses. The pelvic lymph nodes lie along the vessels: 8 to 10 external iliac nodes, the internal iliac nodes (with sacral and obturator nodes as outliers), which take lymph from all the pelvic viscera, and 4 to 6 common iliac nodes that drain both to the lateral aortic nodes.',
      focus: ['iliac-veins', 'pelvic-nodes'],
    },
  ],
  questions: [
    {
      id: 'iiv-posterior',
      prompt: 'Which is NOT a branch of the posterior division of the internal iliac artery?',
      options: [
        { id: 'inferior-gluteal', text: 'Inferior gluteal' },
        { id: 'iliolumbar', text: 'Iliolumbar' },
        { id: 'lateral-sacral', text: 'Lateral sacral' },
        { id: 'superior-gluteal', text: 'Superior gluteal' },
      ],
      answerId: 'inferior-gluteal',
      explanation: 'The inferior gluteal artery is the largest branch of the anterior division.',
    },
    {
      id: 'iiv-female',
      prompt:
        'In the female, which artery of the anterior division is replaced by the vaginal artery?',
      options: [
        { id: 'inferior-vesical', text: 'Inferior vesical' },
        { id: 'superior-vesical', text: 'Superior vesical' },
        { id: 'obturator', text: 'Obturator' },
        { id: 'middle-rectal', text: 'Middle rectal' },
      ],
      answerId: 'inferior-vesical',
      explanation: 'The uterine artery is the extra, seventh branch in women.',
    },
    {
      id: 'iiv-umbilical',
      prompt: 'After birth, the first part of the umbilical artery remains as the:',
      options: [
        { id: 'superior-vesical', text: 'Superior vesical artery' },
        { id: 'medial-umbilical', text: 'Medial umbilical ligament' },
        { id: 'median-umbilical', text: 'Median umbilical ligament' },
        { id: 'obturator', text: 'Obturator artery' },
      ],
      answerId: 'superior-vesical',
      explanation:
        'The rest of it becomes the medial umbilical ligament; the median umbilical ligament is the urachus.',
    },
    {
      id: 'iiv-obturator',
      prompt:
        'On the side wall of the pelvis, from above down, the obturator structures lie in the order:',
      options: [
        { id: 'nav', text: 'Nerve, artery, vein' },
        { id: 'van', text: 'Vein, artery, nerve' },
        { id: 'anv', text: 'Artery, nerve, vein' },
        { id: 'avn', text: 'Artery, vein, nerve' },
      ],
      answerId: 'nav',
      explanation: 'The artery runs below the obturator nerve and above the obturator vein.',
    },
  ],
  cards: [
    {
      id: 'iiv-course',
      front: 'Beginning and end of the internal iliac artery?',
      back: 'Begins in front of the sacroiliac joint at the L5/S1 disc; ends near the top of the greater sciatic notch, dividing into anterior and posterior divisions.',
    },
    {
      id: 'iiv-posterior-branches',
      front: 'Branches of the posterior division?',
      back: 'Iliolumbar, two lateral sacral and superior gluteal.',
    },
    {
      id: 'iiv-anterior-branches',
      front: 'Branches of the anterior division in the male?',
      back: 'Superior vesical, obturator, middle rectal, inferior vesical, inferior gluteal and internal pudendal.',
    },
    {
      id: 'iiv-largest',
      front: 'Largest branch of the anterior division?',
      back: 'The inferior gluteal artery, the axial artery of the lower limb.',
    },
    {
      id: 'iiv-vein',
      front: 'Which tributary does not join the internal iliac vein?',
      back: 'The iliolumbar vein, which joins the common iliac vein.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 34 Walls of Pelvis',
      pages: '488–491',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '489–495' },
  ],
};
