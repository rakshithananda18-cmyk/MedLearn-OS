import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  PUDENDAL_ROUTE,
  UROGENITAL_BELOW,
} from './pelvis-3d';

// Pelvis batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const pudendalNerveVessels: Topic = {
  slug: 'pudendal-nerve-vessels',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'Pudendal nerve and vessels',
  summary:
    'The pudendal canal, and how the pudendal nerve and internal pudendal artery leave the pelvis, hook round the ischial spine into the perineum, branch there, and are blocked for childbirth.',
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
      'Volume 2, Chapter 28 Perineum: pudendal canal, pudendal nerve, internal pudendal vessels, pages 423 to 426',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: pudendal nerve and perineal vessels, pages 508 to 513',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'Pudendal nerves (Z-Anatomy), internal pudendal and iliac vessels, pelvic walls in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The pudendal canal is a fascial tunnel in the lateral wall of the ischioanal fossa, about 4 cm above the lower edge of the ischial tuberosity, from the lesser sciatic notch to the back of the perineal membrane; it lies between the obturator fascia and the lunate fascia (some say in a split of the obturator fascia). It carries the pudendal nerve and internal pudendal vessels.',
    'The pudendal nerve (S2 to S4) leaves the sacral plexus, runs down in front of piriformis, leaves the pelvis through the greater sciatic foramen below piriformis, crosses the sacrospinous ligament near the ischial spine, medial to the internal pudendal vessels, and enters the perineum through the lesser sciatic foramen into the pudendal canal.',
    'In the canal it gives the inferior rectal nerve (to the external sphincter, the lining below the pectinate line and the skin round the anus) and divides into the larger perineal nerve (posterior scrotal or labial nerves, the urogenital muscles, the front of the sphincter and levator ani, the bulb and urethra) and the dorsal nerve of the penis or clitoris, which runs along the pubic arch to the skin of the body and glans.',
    'The internal pudendal artery, the smaller end branch of the anterior division of the internal iliac, takes the same route, crossing the back of the ischial spine between the pudendal nerve medially and the nerve to obturator internus laterally. It gives the inferior rectal artery and the perineal artery (transverse perineal and posterior scrotal or labial branches) and continues as the artery of the penis or clitoris.',
    'The artery of the penis, in the deep perineal space beside the pubic arch, gives the artery to the bulb, the urethral artery, and ends as the deep artery (into the crus and corpus cavernosum) and the dorsal artery; all pierce the perineal membrane. The internal pudendal vein follows the artery to the internal iliac vein.',
  ],
  visual: {
    kind: 'path',
    // Left: the nerve's route and branches. Right: the artery's.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'pudendal-nerves',
          label: 'Pudendal nerve S2 to 4',
          name: 'Pudendal nerve, S2 to S4',
          x: 180,
          y: 30,
        },
        {
          id: 'below-piriformis',
          label: 'Out below\npiriformis',
          name: 'Out of the pelvis through the greater sciatic foramen, below piriformis',
          x: 85,
          y: 100,
        },
        {
          id: 'sacrospinous-ligaments',
          label: 'Round the ischial\nspine',
          name: 'Over the sacrospinous ligament beside the ischial spine',
          x: 85,
          y: 165,
        },
        {
          id: 'lesser-foramen',
          label: 'In by the lesser\nsciatic foramen',
          name: 'Into the perineum through the lesser sciatic foramen',
          x: 85,
          y: 230,
        },
        {
          id: 'pudendal-canal',
          label: 'Pudendal canal',
          name: 'Pudendal canal, in the lateral wall of the ischioanal fossa',
          x: 85,
          y: 290,
        },
        {
          id: 'inferior-rectal',
          label: 'Inferior rectal\nnerve',
          name: 'Inferior rectal nerve: external sphincter, anal lining, perianal skin',
          x: 85,
          y: 355,
        },
        {
          id: 'terminal',
          label: 'Perineal and\ndorsal nerves',
          name: 'Ends as the perineal nerve and the dorsal nerve of the penis or clitoris',
          x: 85,
          y: 415,
        },
        {
          id: 'iliac-arteries',
          label: 'Internal iliac,\nanterior division',
          name: 'Internal pudendal artery: from the anterior division of the internal iliac',
          x: 275,
          y: 100,
        },
        {
          id: 'internal-pudendal-vessels',
          label: 'Same route,\nlateral to nerve',
          name: 'Same route as the nerve, lateral to it at the ischial spine',
          x: 275,
          y: 165,
        },
        {
          id: 'inferior-rectal-artery',
          label: 'Inferior rectal\nartery',
          name: 'Inferior rectal artery, at the back of the canal',
          x: 275,
          y: 230,
        },
        {
          id: 'perineal-artery',
          label: 'Perineal artery',
          name: 'Perineal artery: transverse perineal and posterior scrotal or labial branches',
          x: 275,
          y: 290,
        },
        {
          id: 'artery-of-penis',
          label: 'Artery of the\npenis',
          name: 'Artery of the penis or clitoris, in the deep perineal space',
          x: 275,
          y: 355,
        },
        {
          id: 'dorsal-arteries',
          label: 'Bulb, urethral,\ndeep, dorsal',
          name: 'Its branches: artery to the bulb, urethral, deep and dorsal arteries',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'pudendal-nerves', to: 'below-piriformis' },
        { from: 'below-piriformis', to: 'sacrospinous-ligaments' },
        { from: 'sacrospinous-ligaments', to: 'lesser-foramen' },
        { from: 'lesser-foramen', to: 'pudendal-canal' },
        { from: 'pudendal-canal', to: 'inferior-rectal' },
        { from: 'inferior-rectal', to: 'terminal' },
        { from: 'pudendal-nerves', to: 'iliac-arteries' },
        { from: 'iliac-arteries', to: 'internal-pudendal-vessels' },
        { from: 'internal-pudendal-vessels', to: 'inferior-rectal-artery' },
        { from: 'inferior-rectal-artery', to: 'perineal-artery' },
        { from: 'perineal-artery', to: 'artery-of-penis' },
        { from: 'artery-of-penis', to: 'dorsal-arteries' },
      ],
    },
    lesions: [
      {
        id: 'block',
        label: 'Pudendal block',
        nodeIds: ['sacrospinous-ligaments', 'terminal'],
        explanation:
          'For vaginal operations and delivery, the nerve is infiltrated where it passes the ischial spine, through a needle guided by a finger in the vagina. It numbs most of the perineum, but not the front of the labia (ilioinguinal, genitofemoral) or their outer part (posterior cutaneous nerve of the thigh).',
      },
      {
        id: 'haematoma',
        label: 'Swelling after childbirth',
        nodeIds: ['inferior-rectal-artery', 'pudendal-canal'],
        explanation:
          'A painful swelling beside the anus after delivery can be blood from a torn small branch of the internal pudendal artery in the ischioanal fossa, sometimes after infection of an episiotomy.',
      },
      {
        id: 'compression',
        label: 'Nerve pressed in the canal',
        nodeIds: ['pudendal-canal', 'terminal'],
        explanation:
          'Long pressure on the perineum, as in cycling, can squeeze the nerve in its canal against the ischium: burning pain or numbness in the perineum, made worse by sitting.',
      },
    ],
    drill: [
      {
        id: 'nerve',
        title: 'The nerve',
        hint: 'Out of the pelvis, round the spine, back in, along the canal, then its branches.',
        nodeIds: [
          'below-piriformis',
          'sacrospinous-ligaments',
          'lesser-foramen',
          'pudendal-canal',
          'inferior-rectal',
          'terminal',
        ],
      },
      {
        id: 'artery',
        title: 'The artery',
        hint: 'Where it comes from, its route beside the nerve, then its branches back to front.',
        nodeIds: [
          'iliac-arteries',
          'internal-pudendal-vessels',
          'inferior-rectal-artery',
          'perineal-artery',
          'artery-of-penis',
          'dorsal-arteries',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          ...PELVIS_SKELETON,
          'piriformis',
          'obturator-internus',
          'levator-ani',
          'coccygeus',
          'external-anal-sphincter',
          'rectum',
          'iliac-arteries',
          'iliac-veins',
          'internal-pudendal-vessels',
          'dorsal-arteries',
          'pudendal-nerves',
          'corpora-cavernosa',
          'corpus-spongiosum',
        ],
        ['obturator-internus', 'levator-ani', 'rectum', 'iliac-veins'],
      ),
      traces: [],
      stops: [PUDENDAL_ROUTE, UROGENITAL_BELOW],
    },
  },
  lesson: [
    {
      id: 'canal',
      title: 'The pudendal canal',
      body: 'A fascial tunnel in the lateral wall of the ischioanal fossa, just above the sacrotuberous ligament and about 4 cm above the lower edge of the ischial tuberosity. It runs from the lesser sciatic notch to the back of the perineal membrane, between the obturator fascia laterally and the lunate fascia (some describe it as a split in the obturator fascia). It carries the pudendal nerve and the internal pudendal artery and vein.',
      focus: ['pudendal-canal'],
    },
    {
      id: 'course',
      title: 'Out and back in',
      body: 'The pudendal nerve (S2 to S4) forms from the sacral plexus in front of piriformis. It leaves the pelvis through the lower part of the greater sciatic foramen, between piriformis and coccygeus, to the gluteal region, where under gluteus maximus it crosses the sacrospinous ligament close to the ischial spine, medial to the internal pudendal vessels. It then turns forward through the lesser sciatic foramen into the pudendal canal: a short detour round the spine into the perineum.',
      focus: ['below-piriformis', 'sacrospinous-ligaments', 'lesser-foramen'],
    },
    {
      id: 'nerve-branches',
      title: 'Branches of the nerve',
      body: 'At the back of the canal the inferior rectal nerve pierces its medial wall and crosses the ischioanal fossa to the external sphincter, the lining of the canal below the pectinate line and the skin round the anus. The nerve then divides. The perineal nerve, larger, runs below the vessels and gives the posterior scrotal or labial nerves, branches to the urogenital muscles, the front of the sphincter and levator ani, and the nerve to the bulb. The dorsal nerve of the penis or clitoris runs above the vessels, then along the pubic arch in the deep space, through the gap below the symphysis, to the dorsum and glans.',
      focus: ['inferior-rectal', 'terminal'],
    },
    {
      id: 'artery',
      title: 'The internal pudendal artery',
      body: 'The smaller end branch of the anterior division of the internal iliac artery (the larger is the inferior gluteal), larger in men. It runs down in front of piriformis and the sacral plexus, leaves through the greater sciatic foramen below piriformis, crosses the back of the ischial spine between the pudendal nerve medially and the nerve to obturator internus laterally, and returns through the lesser sciatic foramen into the canal, the dorsal nerve above it and the perineal nerve below.',
      focus: ['iliac-arteries', 'internal-pudendal-vessels'],
    },
    {
      id: 'artery-branches',
      title: 'Branches of the artery',
      body: 'The inferior rectal artery arises at the back of the canal, crosses the fossa with its nerve, and joins the superior and middle rectal arteries. The perineal artery arises at the front of the canal and pierces the membrane’s base into the superficial space, giving transverse perineal and posterior scrotal or labial branches. The artery continues as the artery of the penis or clitoris in the deep space beside the pubic arch, giving the artery to the bulb, the urethral artery, and ending as the deep artery (into the crus and corpus cavernosum) and the dorsal artery; all pierce the membrane.',
      focus: ['inferior-rectal-artery', 'perineal-artery', 'artery-of-penis', 'dorsal-arteries'],
    },
    {
      id: 'vein',
      title: 'Vein and the block',
      body: 'The internal pudendal vein follows the artery and its branches back to the internal iliac vein. As the pudendal nerve passes close to the ischial spine, which can be felt through the vaginal wall, it can be blocked there with local anaesthetic for vaginal operations and childbirth in place of a general anaesthetic.',
      focus: ['internal-pudendal-vessels', 'sacrospinous-ligaments'],
    },
  ],
  questions: [
    {
      id: 'pn-root',
      prompt: 'The root value of the pudendal nerve is:',
      options: [
        { id: 'two-four', text: 'S2 to S4' },
        { id: 'one-three', text: 'S1 to S3' },
        { id: 'four-two', text: 'L4 to S2' },
        { id: 'three-five', text: 'S3 to S5' },
      ],
      answerId: 'two-four',
      explanation: 'The same segments carry the pelvic parasympathetic supply.',
    },
    {
      id: 'pn-route',
      prompt: 'The pudendal nerve enters the perineum through the:',
      options: [
        { id: 'lesser', text: 'Lesser sciatic foramen' },
        { id: 'greater', text: 'Greater sciatic foramen' },
        { id: 'obturator', text: 'Obturator canal' },
        { id: 'hiatus', text: 'Urogenital hiatus' },
      ],
      answerId: 'lesser',
      explanation:
        'It leaves the pelvis by the greater foramen and re-enters the perineum by the lesser.',
    },
    {
      id: 'pn-first-branch',
      prompt: 'The first branch of the pudendal nerve in the canal is the:',
      options: [
        { id: 'inferior-rectal', text: 'Inferior rectal nerve' },
        { id: 'perineal', text: 'Perineal nerve' },
        { id: 'dorsal', text: 'Dorsal nerve of the penis' },
        { id: 'posterior-scrotal', text: 'Posterior scrotal nerve' },
      ],
      answerId: 'inferior-rectal',
      explanation: 'It then divides into the perineal and dorsal nerves.',
    },
    {
      id: 'pn-artery-origin',
      prompt: 'The internal pudendal artery is a branch of the:',
      options: [
        { id: 'anterior', text: 'Anterior division of the internal iliac artery' },
        { id: 'posterior', text: 'Posterior division of the internal iliac artery' },
        { id: 'external', text: 'External iliac artery' },
        { id: 'femoral', text: 'Femoral artery' },
      ],
      answerId: 'anterior',
      explanation: 'The smaller end branch; the larger is the inferior gluteal.',
    },
  ],
  cards: [
    {
      id: 'pn-course',
      front: 'Course of the pudendal nerve?',
      back: 'Sacral plexus (S2 to S4), out through the greater sciatic foramen below piriformis, over the sacrospinous ligament by the ischial spine, in through the lesser sciatic foramen to the pudendal canal.',
    },
    {
      id: 'pn-branches',
      front: 'Branches of the pudendal nerve?',
      back: 'Inferior rectal nerve; perineal nerve (posterior scrotal or labial, muscular, nerve to the bulb); dorsal nerve of the penis or clitoris.',
    },
    {
      id: 'pn-canal',
      front: 'Contents of the pudendal canal?',
      back: 'Pudendal nerve (and its branches), internal pudendal artery and vein.',
    },
    {
      id: 'pn-artery-branches',
      front: 'Branches of the internal pudendal artery in the perineum?',
      back: 'Inferior rectal, perineal (transverse perineal, posterior scrotal or labial), artery of the penis (to the bulb, urethral, deep, dorsal).',
    },
    {
      id: 'pn-spine',
      front: 'At the ischial spine, what lies medial and lateral to the internal pudendal artery?',
      back: 'Medial: pudendal nerve. Lateral: nerve to obturator internus.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 28 Perineum', pages: '423–426' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '508–513' },
  ],
};
