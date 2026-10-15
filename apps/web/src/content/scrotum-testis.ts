import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_WALL_MODEL_CREDIT,
  ABDOMINAL_WALL_MODEL_SRC,
  abdominalWallParts,
  GENITALIA_FRONT,
  GENITALIA_SIDE,
  INGUINAL_RIGHT,
  MALE_GENITALIA,
} from './abdominal-wall-3d';
import { bookSource } from './books';

// Abdomen batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const scrotumTestis: Topic = {
  slug: 'scrotum-testis',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Scrotum, testis and epididymis',
  summary:
    'The layers and nerves of the scrotum, the testis with its coverings, inner plan, vessels, lymph and nerves, the epididymis, and the swellings and misplaced testes met in clinic.',
  estimatedMinutes: 14,
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
      'Volume 2, Chapter 17 Male External Genital Organs: scrotum, testis and epididymis, pages 260 to 266',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: scrotum and testes, pages 463 to 466',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Testes, epididymides and ductus deferentes in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Pelvis, penis and testicular vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Layers of the scrotum, outside in: skin, dartos (in place of superficial fascia), external spermatic fascia, cremaster with its fascia, internal spermatic fascia, then the parietal tunica vaginalis.',
    'The front third of the scrotum is supplied by L1 (ilioinguinal and genital branch of genitofemoral), the back two thirds by S3 (posterior scrotal branches of the pudendal and the posterior cutaneous nerve of the thigh), so one spinal block rarely numbs it all.',
    'The testis (about 3.75 by 2.5 by 1.8 cm, 10 to 15 g) has three coats: tunica vaginalis (the closed lower end of the processus vaginalis), tunica albuginea (thickened behind as the mediastinum testis) and tunica vasculosa. Its 200 to 300 lobules hold coiled seminiferous tubules that drain through straight tubules, the rete testis and 12 to 30 efferent ductules into the epididymis.',
    'The testicular artery arises from the aorta at L2; lymph returns to the para-aortic nodes at L2, not to the inguinal nodes; sensation travels with sympathetic nerves to T10, so testicular pain is felt round the umbilicus.',
    'The pampiniform plexus becomes one testicular vein: the right drains to the inferior vena cava, the left to the left renal vein at a right angle, one reason varicocoele is usually left-sided.',
  ],
  visual: {
    kind: 'path',
    // Left: the scrotum and the testis's coats and plan. Right: its supply, and the epididymis.
    diagram: {
      width: 360,
      height: 480,
      nodes: [
        {
          id: 'scrotum-overview',
          label: 'Scrotum and testis',
          name: 'Scrotum, testis and epididymis',
          x: 180,
          y: 30,
        },
        {
          id: 'scrotal-layers',
          label: 'Skin, dartos,\nthree fasciae',
          name: 'Scrotal layers: skin, dartos, external spermatic, cremasteric and internal spermatic fasciae',
          x: 85,
          y: 100,
        },
        {
          id: 'scrotal-nerves',
          label: 'Front L1,\nback S3',
          name: 'Nerves: front third L1, back two thirds S3',
          x: 85,
          y: 165,
        },
        {
          id: 'tunica-vaginalis',
          label: 'Tunica\nvaginalis',
          name: 'Tunica vaginalis: lower closed end of the processus vaginalis',
          x: 85,
          y: 230,
        },
        {
          id: 'tunica-albuginea',
          label: 'Albuginea and\nmediastinum',
          name: 'Tunica albuginea, thickened behind as the mediastinum testis',
          x: 85,
          y: 295,
        },
        {
          id: 'seminiferous-tubules',
          label: 'Lobules and\ntubules',
          name: '200 to 300 lobules of coiled seminiferous tubules',
          x: 85,
          y: 360,
        },
        {
          id: 'rete-testis',
          label: 'Rete testis,\nefferent ductules',
          name: 'Straight tubules, rete testis and 12 to 30 efferent ductules',
          x: 85,
          y: 425,
        },
        {
          id: 'testicular-artery',
          label: 'Testicular artery:\naorta at L2',
          name: 'Testicular artery, from the aorta at L2',
          x: 275,
          y: 100,
        },
        {
          id: 'testicular-vein',
          label: 'Pampiniform\nplexus, vein',
          name: 'Pampiniform plexus to one testicular vein: right to the IVC, left to the left renal vein',
          x: 275,
          y: 165,
        },
        {
          id: 'testis-lymph',
          label: 'Lymph: para-\naortic at L2',
          name: 'Lymph to the para-aortic and preaortic nodes at L2',
          x: 275,
          y: 230,
        },
        {
          id: 'testis-nerves',
          label: 'Nerves: T10\nsympathetic',
          name: 'Sympathetic nerves from T10',
          x: 275,
          y: 295,
        },
        {
          id: 'epididymis',
          label: 'Epididymis: head,\nbody, tail',
          name: 'Epididymis: head of efferent ductules, body and tail of one coiled duct',
          x: 275,
          y: 360,
        },
        {
          id: 'ductus-deferens',
          label: 'Ductus deferens',
          name: 'Ductus deferens, continuing the tail of the epididymis',
          x: 275,
          y: 425,
        },
      ],
      edges: [
        { from: 'scrotum-overview', to: 'scrotal-layers' },
        { from: 'scrotal-layers', to: 'scrotal-nerves' },
        { from: 'scrotal-layers', to: 'tunica-vaginalis' },
        { from: 'tunica-vaginalis', to: 'tunica-albuginea' },
        { from: 'tunica-albuginea', to: 'seminiferous-tubules' },
        { from: 'seminiferous-tubules', to: 'rete-testis' },
        { from: 'rete-testis', to: 'epididymis' },
        { from: 'scrotum-overview', to: 'testicular-artery' },
        { from: 'testicular-artery', to: 'testicular-vein' },
        { from: 'testicular-vein', to: 'testis-lymph' },
        { from: 'testis-lymph', to: 'testis-nerves' },
        { from: 'epididymis', to: 'ductus-deferens' },
      ],
    },
    lesions: [
      {
        id: 'hydrocoele',
        label: 'Hydrocoele',
        nodeIds: ['tunica-vaginalis'],
        explanation:
          'Fluid in the tunica vaginalis (or in a processus vaginalis left open): the commonest scrotal swelling. Tapping it passes through skin, dartos, the three spermatic fasciae and the parietal tunica vaginalis.',
      },
      {
        id: 'varicocoele',
        label: 'Varicocoele',
        nodeIds: ['testicular-vein'],
        explanation:
          'A swollen pampiniform plexus, like a bag of worms, usually on the left: the left testicular vein is longer, joins the left renal vein at a right angle and can be pressed on by a loaded colon.',
      },
      {
        id: 'undescended-testis',
        label: 'Undescended testis',
        nodeIds: ['tunica-vaginalis', 'seminiferous-tubules'],
        explanation:
          'The testis stops on the normal path, in the abdomen, iliac fossa, inguinal canal or upper scrotum. It may still descend after birth, usually comes with an indirect hernia, may not make sperm and is more prone to cancer; it can be brought down surgically. An ectopic testis has left the path (lower abdomen, thigh, femoral canal, penis, perineum) and is usually fully formed.',
      },
      {
        id: 'testicular-pain',
        label: 'Pain round the umbilicus',
        nodeIds: ['testis-nerves', 'testis-lymph'],
        explanation:
          'The testis keeps the nerves and lymph of its origin near L1 and L2: its pain is felt round the umbilicus (T10), and a testicular cancer spreads first to the para-aortic nodes at L2, not to the groin.',
      },
    ],
    drill: [
      {
        id: 'coverings',
        title: 'Scrotum and testis',
        hint: 'Layers, nerves, then the testis’s coats and plan from outside in.',
        nodeIds: [
          'scrotal-layers',
          'scrotal-nerves',
          'tunica-vaginalis',
          'tunica-albuginea',
          'seminiferous-tubules',
          'rete-testis',
        ],
      },
      {
        id: 'supply',
        title: 'Supply and ducts',
        hint: 'Artery, vein, lymph, nerves, then the epididymis and its duct.',
        nodeIds: [
          'testicular-artery',
          'testicular-vein',
          'testis-lymph',
          'testis-nerves',
          'epididymis',
          'ductus-deferens',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_WALL_MODEL_SRC,
      credit: ABDOMINAL_WALL_MODEL_CREDIT,
      parts: abdominalWallParts([
        'hip-bones',
        'femurs',
        'fifth-lumbar-vertebra',
        'inguinal-ligament',
        ...MALE_GENITALIA,
      ]),
      traces: [],
      stops: [
        GENITALIA_FRONT,
        GENITALIA_SIDE,
        {
          ...INGUINAL_RIGHT,
          title: 'The cord to the abdomen',
          description:
            'The testicular vessels and the ductus deferens climb through the inguinal canal together; above the deep ring the vessels go up the posterior wall to the aorta and the inferior vena cava at L2.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'scrotum',
      title: 'The scrotum',
      body: 'A bag of skin divided by a median raphe, the left half hanging lower with the longer left cord. Its smooth muscle, the dartos, wrinkles it in the cold and lets it hang in warmth, keeping the testes cooler than the body. Layers, outside in: skin, dartos, external spermatic fascia, cremaster and its fascia, internal spermatic fascia.',
      focus: ['scrotal-layers'],
    },
    {
      id: 'scrotal-supply',
      title: 'Vessels and nerves of the scrotum',
      body: 'Arteries: superficial and deep external pudendal, scrotal branches of the internal pudendal, and the cremasteric. Nerves: the front third from L1 (ilioinguinal, genital branch of genitofemoral), the back two thirds from S3 (pudendal and the posterior cutaneous nerve of the thigh), divided by the ventral axial line. The dartos is supplied by the genital branch of the genitofemoral.',
      focus: ['scrotal-nerves'],
    },
    {
      id: 'testis',
      title: 'The testis and its coats',
      body: 'Oval, about 3.75 cm long, its upper pole tilted forward; the left lies a little lower. The tunica vaginalis covers all but its posterior border and dips between it and the epididymis as the sinus of the epididymis. Under it the dense white tunica albuginea thickens behind into the mediastinum testis, from which septa divide the gland into 200 to 300 lobules; the tunica vasculosa lines them.',
      focus: ['tunica-vaginalis', 'tunica-albuginea'],
    },
    {
      id: 'plan',
      title: 'Inside the testis',
      body: 'Each lobule holds two or three seminiferous tubules, each about 60 cm long when stretched. They join as straight tubules into the mediastinum, network as the rete testis, and leave the upper pole as 12 to 30 efferent ductules into the head of the epididymis. Between the tubules, Leydig cells make testosterone; within them, Sertoli cells nurse the developing sperm.',
      focus: ['seminiferous-tubules', 'rete-testis'],
    },
    {
      id: 'supply',
      title: 'Vessels, lymph and nerves',
      body: 'The testicular artery leaves the aorta at L2 and reaches the testis through the cord. Veins form the pampiniform plexus, which narrows to four veins at the superficial ring, two at the deep ring and one above: the right ends in the inferior vena cava, the left in the left renal vein. Lymph runs up with the vessels to the para-aortic nodes at L2. Sympathetic nerves from T10 carry pain.',
      focus: ['testicular-artery', 'testicular-vein', 'testis-lymph', 'testis-nerves'],
    },
    {
      id: 'epididymis',
      title: 'The epididymis',
      body: 'A store for sperm along the lateral part of the back of the testis: the head is the coiled efferent ductules, the body and tail one tightly coiled duct that continues as the ductus deferens. Its arteries come from the testicular artery and the artery to the ductus; its nerves from T11 to L1. Tuberculosis, filariasis and gonorrhoea inflame it.',
      focus: ['epididymis', 'ductus-deferens'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the front, follow each ductus from its epididymis up to the inguinal canal; from the groin, the testicular vessels on their way to L2. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'st-lymph',
      prompt: 'Lymph from the testis drains first to the:',
      options: [
        { id: 'para-aortic', text: 'Para-aortic nodes at L2' },
        { id: 'superficial-inguinal', text: 'Superficial inguinal nodes' },
        { id: 'deep-inguinal', text: 'Deep inguinal nodes' },
        { id: 'internal-iliac', text: 'Internal iliac nodes' },
      ],
      answerId: 'para-aortic',
      explanation:
        'It follows the testicular vessels back to where the testis developed; the scrotal skin drains to the superficial inguinal nodes.',
    },
    {
      id: 'st-left-vein',
      prompt: 'The left testicular vein drains into the:',
      options: [
        { id: 'left-renal', text: 'Left renal vein' },
        { id: 'ivc', text: 'Inferior vena cava' },
        { id: 'left-common-iliac', text: 'Left common iliac vein' },
        { id: 'inferior-mesenteric', text: 'Inferior mesenteric vein' },
      ],
      answerId: 'left-renal',
      explanation:
        'At a right angle, one reason varicocoele is commoner on the left; the right vein enters the inferior vena cava.',
    },
    {
      id: 'st-s3',
      prompt: 'The back two thirds of the scrotum are supplied by segment:',
      options: [
        { id: 's3', text: 'S3' },
        { id: 'l1', text: 'L1' },
        { id: 't10', text: 'T10' },
        { id: 'l2', text: 'L2' },
      ],
      answerId: 's3',
      explanation: 'The front third is L1; the two are separated by the ventral axial line.',
    },
    {
      id: 'st-vaginalis',
      prompt: 'The tunica vaginalis is derived from the:',
      options: [
        { id: 'processus', text: 'Processus vaginalis of peritoneum' },
        { id: 'fascia', text: 'Fascia transversalis' },
        { id: 'io', text: 'Internal oblique' },
        { id: 'dartos', text: 'Dartos' },
      ],
      answerId: 'processus',
      explanation: 'It is the closed lower end of the processus; fluid in it is a hydrocoele.',
    },
  ],
  cards: [
    {
      id: 'st-scrotal-layers',
      front: 'Layers of the scrotum, outside in?',
      back: 'Skin, dartos, external spermatic fascia, cremaster and cremasteric fascia, internal spermatic fascia (then the parietal tunica vaginalis).',
    },
    {
      id: 'st-coats',
      front: 'Three coats of the testis?',
      back: 'Tunica vaginalis, tunica albuginea (mediastinum testis behind), tunica vasculosa.',
    },
    {
      id: 'st-duct-path',
      front: 'Path of sperm from tubule to ductus?',
      back: 'Seminiferous tubules, straight tubules, rete testis, efferent ductules (head of epididymis), duct of epididymis (body and tail), ductus deferens.',
    },
    {
      id: 'st-supply',
      front: 'Artery, lymph and nerve segment of the testis?',
      back: 'Testicular artery from the aorta at L2; para-aortic nodes at L2; sympathetic T10.',
    },
    {
      id: 'st-varicocoele',
      front: 'Why is varicocoele usually left-sided?',
      back: 'The left testicular vein is longer, joins the left renal vein at a right angle and may be pressed on by a loaded colon.',
    },
    {
      id: 'st-undescended-ectopic',
      front: 'Undescended against ectopic testis?',
      back: 'Undescended: stopped on the normal path, often with a hernia, may not make sperm, prone to cancer. Ectopic: off the path (lower abdomen, thigh, femoral canal, penis, perineum), usually fully developed.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 17 Male External Genital Organs',
      pages: '260–266',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '463–466' },
  ],
};
