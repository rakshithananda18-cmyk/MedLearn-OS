import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_WALL_MODEL_CREDIT,
  ABDOMINAL_WALL_MODEL_SRC,
  abdominalWallParts,
  GENITALIA_FRONT,
  GENITALIA_SIDE,
  MALE_GENITALIA,
} from './abdominal-wall-3d';
import { bookSource } from './books';

// Abdomen batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const penis: Topic = {
  slug: 'penis',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Penis: parts, vessels, nerves and erection',
  summary:
    'The root and body of the penis, its three masses of erectile tissue and their coverings, the arteries, veins, nerves and lymph, and how erection happens.',
  estimatedMinutes: 10,
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
      'Volume 2, Chapter 17 Male External Genital Organs: penis, pages 257 to 260',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: penis and erection, pages 501 to 502',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Penis, its dorsal vessels and the pelvis in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The root lies in the superficial perineal pouch: two crura on the margins of the pubic arch, covered by ischiocavernosus, and the bulb on the perineal membrane between them, covered by bulbospongiosus and pierced by the urethra.',
    'The body has three erectile masses: two corpora cavernosa above, continuing the crura and ending under the glans, and the corpus spongiosum below, continuing the bulb, carrying the urethra and expanding into the glans.',
    'Coverings: thin loose skin folded at the neck as the prepuce, fat-free superficial fascia with the superficial dorsal vein, and the deep (Buck’s) fascia round all three masses, with the deep dorsal vein and the paired dorsal arteries and nerves beneath it. The fundiform and suspensory ligaments hold up the body.',
    'Arteries: three from the internal pudendal (the deep artery in each corpus cavernosum, the dorsal artery, the artery of the bulb), and the superficial external pudendal for the skin. Lymph: glans to the deep inguinal nodes (Cloquet’s), the rest to the superficial inguinal nodes.',
    'Erection is vascular, under parasympathetic control (nervi erigentes, S2 to S4): the helicine arteries dilate, the cavernous spaces fill, the swelling presses the veins shut and the deep fascia limits it, so the penis turns rigid.',
  ],
  visual: {
    kind: 'path',
    // Left: the parts and coverings. Right: vessels, nerves, lymph and erection.
    diagram: {
      width: 360,
      height: 470,
      nodes: [
        { id: 'penis-overview', label: 'Penis', name: 'Penis: root and body', x: 180, y: 30 },
        {
          id: 'penis-root',
          label: 'Root: two crura\nand the bulb',
          name: 'Root: two crura on the pubic arch and the bulb on the perineal membrane',
          x: 85,
          y: 100,
        },
        {
          id: 'corpora-cavernosa',
          label: 'Two corpora\ncavernosa',
          name: 'Corpora cavernosa, continuing the crura',
          x: 85,
          y: 165,
        },
        {
          id: 'corpus-spongiosum',
          label: 'Corpus spongiosum\nwith the urethra',
          name: 'Corpus spongiosum, continuing the bulb and carrying the urethra',
          x: 85,
          y: 230,
        },
        {
          id: 'glans-penis',
          label: 'Glans: corona,\nprepuce, frenulum',
          name: 'Glans penis, with the corona, prepuce and frenulum',
          x: 85,
          y: 295,
        },
        {
          id: 'buck-fascia',
          label: 'Buck’s fascia',
          name: 'Deep fascia of the penis (Buck’s fascia) round all three masses',
          x: 85,
          y: 360,
        },
        {
          id: 'penis-ligaments',
          label: 'Fundiform and\nsuspensory ligaments',
          name: 'Fundiform ligament (superficial) and suspensory ligament (deep)',
          x: 85,
          y: 420,
        },
        {
          id: 'deep-artery-of-penis',
          label: 'Deep artery:\nhelicine branches',
          name: 'Deep artery of the penis in each corpus cavernosum, with helicine branches',
          x: 275,
          y: 100,
        },
        {
          id: 'dorsal-arteries-of-penis',
          label: 'Dorsal arteries',
          name: 'Dorsal arteries of the penis, from the internal pudendal',
          x: 275,
          y: 160,
        },
        {
          id: 'deep-dorsal-vein',
          label: 'Deep dorsal vein\nto prostatic plexus',
          name: 'Deep dorsal vein, under the symphysis to the prostatic plexus',
          x: 275,
          y: 220,
        },
        {
          id: 'dorsal-nerve-of-penis',
          label: 'Dorsal nerve\n(pudendal)',
          name: 'Dorsal nerve of the penis, from the pudendal nerve',
          x: 275,
          y: 285,
        },
        {
          id: 'penis-lymph',
          label: 'Glans: deep inguinal;\nrest: superficial',
          name: 'Lymph: glans to the deep inguinal nodes, the rest to the superficial inguinal nodes',
          x: 270,
          y: 350,
        },
        {
          id: 'erection',
          label: 'Erection: S2–S4\nparasympathetic',
          name: 'Erection: parasympathetic, nervi erigentes S2 to S4',
          x: 275,
          y: 420,
        },
      ],
      edges: [
        { from: 'penis-overview', to: 'penis-root' },
        { from: 'penis-root', to: 'corpora-cavernosa' },
        { from: 'penis-root', to: 'corpus-spongiosum' },
        { from: 'corpus-spongiosum', to: 'glans-penis' },
        { from: 'corpora-cavernosa', to: 'buck-fascia' },
        { from: 'buck-fascia', to: 'penis-ligaments' },
        { from: 'penis-overview', to: 'deep-artery-of-penis' },
        { from: 'penis-overview', to: 'dorsal-arteries-of-penis' },
        { from: 'dorsal-arteries-of-penis', to: 'deep-dorsal-vein' },
        { from: 'deep-dorsal-vein', to: 'dorsal-nerve-of-penis' },
        { from: 'glans-penis', to: 'penis-lymph' },
        { from: 'deep-artery-of-penis', to: 'erection' },
      ],
    },
    lesions: [
      {
        id: 'phimosis',
        label: 'Phimosis',
        nodeIds: ['glans-penis'],
        explanation:
          'The prepuce cannot be drawn back over the glans. Smegma collects in the preputial sac; hygiene and creams may help, otherwise the prepuce is removed (circumcision).',
      },
      {
        id: 'carcinoma-glans',
        label: 'Cancer of the penis',
        nodeIds: ['penis-lymph', 'glans-penis'],
        explanation:
          'Spread follows the lymph: from the glans to the deep inguinal nodes, notably Cloquet’s node in the femoral canal; from the skin and shaft to the superficial inguinal nodes. The groins are examined in every case.',
      },
      {
        id: 'erectile-failure',
        label: 'Failure of erection',
        nodeIds: ['erection', 'deep-artery-of-penis'],
        explanation:
          'Erection needs the parasympathetic nervi erigentes (S2 to S4) to open the helicine arteries. Damage to these pelvic nerves, as in some pelvic operations, or to the arteries, prevents it.',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'Parts and coverings',
        hint: 'Root, the three masses, the glans, the deep fascia and the two ligaments.',
        nodeIds: [
          'penis-root',
          'corpora-cavernosa',
          'corpus-spongiosum',
          'glans-penis',
          'buck-fascia',
          'penis-ligaments',
        ],
      },
      {
        id: 'supply',
        title: 'Vessels, nerves, lymph',
        hint: 'Two arteries, the deep vein, the nerve, the lymph, then erection.',
        nodeIds: [
          'deep-artery-of-penis',
          'dorsal-arteries-of-penis',
          'deep-dorsal-vein',
          'dorsal-nerve-of-penis',
          'penis-lymph',
          'erection',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_WALL_MODEL_SRC,
      credit: ABDOMINAL_WALL_MODEL_CREDIT,
      parts: abdominalWallParts(['hip-bones', 'femurs', ...MALE_GENITALIA]),
      traces: [],
      stops: [GENITALIA_SIDE, GENITALIA_FRONT],
    },
  },
  lesson: [
    {
      id: 'root',
      title: 'The root',
      body: 'Fixed in the superficial perineal pouch: each crus is attached to the margin of the pubic arch and covered by ischiocavernosus; the bulb, between them on the perineal membrane, is covered by bulbospongiosus. The urethra pierces the bulb from above and widens in its floor (the intrabulbar fossa).',
      focus: ['penis-root'],
    },
    {
      id: 'body',
      title: 'The body',
      body: 'Three erectile masses run forward from the root. The two corpora cavernosa lie side by side above, each in a tough tunica albuginea that also forms a median septum, and stop short under the glans. The corpus spongiosum lies below, carries the urethra and swells at its end into the glans, whose rim is the corona and whose urethra widens into the navicular fossa.',
      focus: ['corpora-cavernosa', 'corpus-spongiosum', 'glans-penis'],
    },
    {
      id: 'coverings',
      title: 'Skin, fascia and supports',
      body: 'Thin dark skin, loosely attached, folds at the neck into the prepuce, tied below by the frenulum; smegma from the preputial glands collects beneath it. The superficial fascia has no fat and carries the superficial dorsal vein. Buck’s fascia wraps all three masses (not the glans) with the deep dorsal vein, dorsal arteries and dorsal nerves beneath it. The fundiform ligament from the linea alba and the deeper suspensory ligament from the symphysis hold up the body.',
      focus: ['buck-fascia', 'penis-ligaments'],
    },
    {
      id: 'vessels',
      title: 'Arteries, veins, nerves and lymph',
      body: 'The internal pudendal artery gives the deep artery (in each corpus cavernosum, with helicine branches), the dorsal artery (to the glans and skin) and the artery of the bulb; the superficial external pudendal artery feeds the skin. The superficial dorsal vein drains to an external pudendal vein; the deep dorsal vein passes under the symphysis to the prostatic plexus. The dorsal nerve (pudendal) and the ilioinguinal give sensation. Glans lymph goes to the deep inguinal nodes, the rest to the superficial.',
      focus: [
        'deep-artery-of-penis',
        'dorsal-arteries-of-penis',
        'deep-dorsal-vein',
        'dorsal-nerve-of-penis',
        'penis-lymph',
      ],
    },
    {
      id: 'erection',
      title: 'Erection',
      body: 'A vascular event. Parasympathetic nerves (S2 to S4) dilate the helicine arteries and blood floods the cavernous spaces; the swelling compresses the veins, helped by ischiocavernosus, and the deep fascia restricts the expansion, so pressure rises and the penis becomes rigid. Sympathetic nerves constrict the vessels.',
      focus: ['erection', 'deep-artery-of-penis'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the side, find the corpora cavernosa above and the corpus spongiosum below; trace the dorsal vessels on the dorsum. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'penis-urethra',
      prompt: 'The urethra in the body of the penis runs through the:',
      options: [
        { id: 'spongiosum', text: 'Corpus spongiosum' },
        { id: 'cavernosum', text: 'Right corpus cavernosum' },
        { id: 'septum', text: 'Median septum' },
        { id: 'dorsum', text: 'Dorsal groove' },
      ],
      answerId: 'spongiosum',
      explanation: 'It enters the bulb and runs the length of the corpus spongiosum to the glans.',
    },
    {
      id: 'penis-glans-lymph',
      prompt: 'Lymph from the glans penis drains to the:',
      options: [
        { id: 'deep-inguinal', text: 'Deep inguinal nodes' },
        { id: 'superficial-inguinal', text: 'Superficial inguinal nodes' },
        { id: 'internal-iliac', text: 'Internal iliac nodes' },
        { id: 'para-aortic', text: 'Para-aortic nodes' },
      ],
      answerId: 'deep-inguinal',
      explanation:
        'Including the node of Cloquet; the skin and the rest of the penis drain to the superficial inguinal nodes.',
    },
    {
      id: 'penis-erection-nerves',
      prompt: 'Erection is brought about by:',
      options: [
        { id: 'parasympathetic', text: 'Parasympathetic nerves, S2 to S4' },
        { id: 'sympathetic', text: 'Sympathetic nerves, T12 to L2' },
        { id: 'pudendal-motor', text: 'Motor fibres of the pudendal nerve only' },
        { id: 'genitofemoral', text: 'The genitofemoral nerve' },
      ],
      answerId: 'parasympathetic',
      explanation:
        'The nervi erigentes dilate the helicine arteries; sympathetic fibres constrict.',
    },
    {
      id: 'penis-buck',
      prompt: 'Which lies deep to Buck’s fascia?',
      options: [
        { id: 'deep-dorsal-vein', text: 'Deep dorsal vein' },
        { id: 'superficial-dorsal-vein', text: 'Superficial dorsal vein' },
        { id: 'fundiform', text: 'Fundiform ligament' },
        { id: 'skin-nerves', text: 'Ilioinguinal nerve' },
      ],
      answerId: 'deep-dorsal-vein',
      explanation:
        'With the paired dorsal arteries and nerves; the superficial vein lies in the superficial fascia.',
    },
  ],
  cards: [
    {
      id: 'penis-root-card',
      front: 'Parts of the root of the penis and their muscles?',
      back: 'Two crura (ischiocavernosus) on the pubic arch; the bulb (bulbospongiosus) on the perineal membrane.',
    },
    {
      id: 'penis-masses',
      front: 'The three erectile masses of the body?',
      back: 'Two corpora cavernosa (dorsal); corpus spongiosum (ventral, with the urethra, ending as the glans).',
    },
    {
      id: 'penis-arteries',
      front: 'Arteries of the penis?',
      back: 'From the internal pudendal: deep artery, dorsal artery, artery of the bulb. Skin: superficial external pudendal (from the femoral).',
    },
    {
      id: 'penis-veins',
      front: 'Where do the dorsal veins of the penis drain?',
      back: 'Superficial dorsal vein to an external pudendal vein; deep dorsal vein under the symphysis to the prostatic plexus.',
    },
    {
      id: 'penis-erection-steps',
      front: 'Mechanism of erection?',
      back: 'Parasympathetic (S2 to S4) dilation of helicine arteries, filling of cavernous spaces, compression of veins, deep fascia limits expansion: rigidity.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 17 Male External Genital Organs',
      pages: '257–260',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '501–502' },
  ],
};
