import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_WALL_MODEL_CREDIT,
  ABDOMINAL_WALL_MODEL_SRC,
  abdominalWallParts,
  INGUINAL_RIGHT,
  MALE_GENITALIA,
} from './abdominal-wall-3d';
import { bookSource } from './books';

// Abdomen batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const testisDescent: Topic = {
  slug: 'testis-descent',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Development and descent of the testis',
  summary:
    'Where the testis forms and the month-by-month road it takes to the scrotum, what pulls and what guides it, what the male ducts and genitalia grow from, and the remnants left along the way.',
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
      'Volume 2, Chapter 17 Male External Genital Organs: development of the male reproductive system, pages 266 to 268',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: descent of the testes, pages 289 to 290'),
    {
      title: 'Z-Anatomy',
      detail: 'Testes, epididymides and ductus deferentes in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Pelvis, vessels and penis in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The testis forms beside the mesonephros at segments T10 to T12, which is why its artery leaves the aorta at L2 and its nerves come from T10.',
    'It starts down in the second month before birth, reaches the iliac fossa by the third, waits at the deep inguinal ring from the fourth to the sixth, crosses the inguinal canal in the seventh, reaches the superficial ring in the eighth and the scrotum in the ninth. It does not descend after the first year.',
    'A pouch of peritoneum, the processus vaginalis, goes ahead of it; the testis invaginates it from behind, its neck closes, and the lower part stays as the tunica vaginalis. The gubernaculum, a band from the lower pole to the scrotum, guides the way and remains as the ligament of the scrotum.',
    'The mesonephric (Wolffian) duct gives the epididymis, ductus deferens, seminal vesicle, ejaculatory duct and the trigone of the bladder; the paramesonephric duct leaves only the appendix of the testis. The SRY gene on the Y chromosome starts the testis.',
    'The genital swellings become the scrotum, the genital tubercle the phallus, and the urethral folds close over the urethral plate to make most of the penile urethra.',
  ],
  visual: {
    kind: 'path',
    // Left: the road down, month by month. Right: what guides it, and what the ducts become.
    diagram: {
      width: 360,
      height: 480,
      nodes: [
        {
          id: 'descent',
          label: 'Descent of\nthe testis',
          name: 'Descent of the testis, months before birth',
          x: 180,
          y: 30,
        },
        {
          id: 'origin-lumbar',
          label: 'Forms at\nT10 to T12',
          name: 'Forms beside the mesonephros at segments T10 to T12',
          x: 80,
          y: 100,
        },
        {
          id: 'month-3-iliac',
          label: '3rd month:\niliac fossa',
          name: 'Third month: iliac fossa',
          x: 80,
          y: 165,
        },
        {
          id: 'months-4-6-ring',
          label: '4th–6th: at\ndeep ring',
          name: 'Fourth to sixth months: at the deep inguinal ring',
          x: 80,
          y: 230,
        },
        {
          id: 'month-7-canal',
          label: '7th: through\nthe canal',
          name: 'Seventh month: through the inguinal canal',
          x: 80,
          y: 295,
        },
        {
          id: 'month-8-superficial',
          label: '8th: superficial\nring',
          name: 'Eighth month: at the superficial inguinal ring',
          x: 80,
          y: 360,
        },
        {
          id: 'month-9-scrotum',
          label: '9th: in the\nscrotum',
          name: 'Ninth month: at the bottom of the scrotum',
          x: 80,
          y: 425,
        },
        {
          id: 'processus-vaginalis',
          label: 'Processus\nvaginalis',
          name: 'Processus vaginalis: peritoneal pouch ahead of the testis',
          x: 275,
          y: 100,
        },
        {
          id: 'gubernaculum',
          label: 'Gubernaculum',
          name: 'Gubernaculum: band from the lower pole to the scrotum',
          x: 275,
          y: 160,
        },
        {
          id: 'descent-factors',
          label: 'Hormones, growth,\npressure',
          name: 'Factors: hormones, differential growth, gubernaculum, abdominal pressure',
          x: 275,
          y: 225,
        },
        {
          id: 'wolffian-duct',
          label: 'Wolffian duct:\nepididymis, ductus',
          name: 'Mesonephric duct: epididymis, ductus deferens, seminal vesicle, ejaculatory duct, trigone',
          x: 275,
          y: 295,
        },
        {
          id: 'testis-remnants',
          label: 'Remnants:\nappendices',
          name: 'Remnants: appendix of the testis, appendix of the epididymis, aberrant ductules, paradidymis',
          x: 275,
          y: 360,
        },
        {
          id: 'external-genitalia',
          label: 'Swellings, tubercle,\nurethral folds',
          name: 'Genital swellings (scrotum), tubercle (phallus) and urethral folds (penile urethra)',
          x: 270,
          y: 425,
        },
      ],
      edges: [
        { from: 'descent', to: 'origin-lumbar' },
        { from: 'origin-lumbar', to: 'month-3-iliac' },
        { from: 'month-3-iliac', to: 'months-4-6-ring' },
        { from: 'months-4-6-ring', to: 'month-7-canal' },
        { from: 'month-7-canal', to: 'month-8-superficial' },
        { from: 'month-8-superficial', to: 'month-9-scrotum' },
        { from: 'descent', to: 'processus-vaginalis' },
        { from: 'processus-vaginalis', to: 'gubernaculum' },
        { from: 'gubernaculum', to: 'descent-factors' },
        { from: 'descent', to: 'wolffian-duct' },
        { from: 'wolffian-duct', to: 'testis-remnants' },
        { from: 'testis-remnants', to: 'external-genitalia' },
      ],
    },
    lesions: [
      {
        id: 'undescended',
        label: 'Arrested on the way',
        nodeIds: ['months-4-6-ring', 'month-7-canal'],
        explanation:
          'A testis that stops in the lumbar region, iliac fossa, canal or upper scrotum is undescended. In a premature baby it may still finish the journey in the first months; it seldom descends after a year and is then brought down surgically.',
      },
      {
        id: 'open-processus',
        label: 'Processus left open',
        nodeIds: ['processus-vaginalis'],
        explanation:
          'If the neck of the processus vaginalis does not close, gut can follow it: an indirect (congenital) inguinal hernia; or peritoneal fluid fills it: a congenital hydrocoele.',
      },
      {
        id: 'remnant-cyst',
        label: 'Cyst of a remnant',
        nodeIds: ['testis-remnants'],
        explanation:
          'The appendix of the testis (paramesonephric), the appendix of the epididymis and the aberrant ductules and paradidymis (mesonephric) can swell into small cysts or twist, causing pain at the top of the testis.',
      },
    ],
    drill: [
      {
        id: 'road',
        title: 'Month by month',
        hint: 'From the lumbar region to the bottom of the scrotum.',
        nodeIds: [
          'origin-lumbar',
          'month-3-iliac',
          'months-4-6-ring',
          'month-7-canal',
          'month-8-superficial',
          'month-9-scrotum',
        ],
      },
      {
        id: 'guides',
        title: 'Guides and derivatives',
        hint: 'The pouch and the band, the causes, then the ducts, remnants and external genitalia.',
        nodeIds: [
          'processus-vaginalis',
          'gubernaculum',
          'descent-factors',
          'wolffian-duct',
          'testis-remnants',
          'external-genitalia',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_WALL_MODEL_SRC,
      credit: ABDOMINAL_WALL_MODEL_CREDIT,
      parts: abdominalWallParts([
        'hip-bones',
        'femurs',
        'sacrum',
        'fifth-lumbar-vertebra',
        'fourth-lumbar-vertebra',
        'third-lumbar-vertebra',
        'second-lumbar-vertebra',
        'inguinal-ligament',
        'transversalis-fascia',
        ...MALE_GENITALIA,
      ]),
      traces: [],
      stops: [
        {
          ...INGUINAL_RIGHT,
          title: 'The road it took',
          description:
            'The testicular vessels still run from L2 down the posterior wall to the deep ring, then through the canal with the ductus deferens to the scrotum: the route the testis travelled.',
        },
        {
          id: 'descent-side',
          title: 'From the side',
          description:
            'From the lumbar spine down past the pelvic brim to the testis below the pubis: about 30 cm of travel before birth.',
          target: [-40, -110, 860],
          position: [-900, -150, 900],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'origin',
      title: 'Where it starts',
      body: 'The testis develops on the back wall of the abdomen beside the mesonephros, at segments T10 to T12. Its spermatogenic cells migrate in from the wall of the yolk sac; Sertoli cells come from the coelomic epithelium and Leydig cells from mesoderm. The SRY gene on the short arm of the Y chromosome sets testis development going.',
      focus: ['origin-lumbar'],
    },
    {
      id: 'road',
      title: 'The road down',
      body: 'Descent begins in the second month before birth. The testis reaches the iliac fossa by the third month, rests at the deep inguinal ring from the fourth to the sixth, passes through the inguinal canal in the seventh, reaches the superficial ring in the eighth and the bottom of the scrotum in the ninth. A testis still up after the first year will not come down on its own.',
      focus: [
        'month-3-iliac',
        'months-4-6-ring',
        'month-7-canal',
        'month-8-superficial',
        'month-9-scrotum',
      ],
    },
    {
      id: 'guides',
      title: 'What guides it',
      body: 'A finger of peritoneum, the processus vaginalis, pushes through the wall into the scrotum ahead of the testis, which slides down behind it and bulges into it. The gubernaculum, a band of loose tissue from the lower pole to the scrotum, guides it and stays as the ligament of the scrotum. Hormones (testosterone, maternal gonadotropins), differential growth of the body wall and abdominal pressure help. Then the neck of the processus closes; its lower part stays as the tunica vaginalis.',
      focus: ['processus-vaginalis', 'gubernaculum', 'descent-factors'],
    },
    {
      id: 'ducts',
      title: 'What the ducts become',
      body: 'In the male the mesonephric (Wolffian) duct is kept, driven by testosterone: it becomes the epididymis, ductus deferens, seminal vesicle, ejaculatory duct and the trigone of the bladder. Müllerian inhibiting substance removes the paramesonephric duct, leaving only the appendix of the testis. Mesonephric tubules give the rete testis and, as vestiges, the aberrant ductules and paradidymis.',
      focus: ['wolffian-duct', 'testis-remnants'],
    },
    {
      id: 'external',
      title: 'External genitalia',
      body: 'Cloacal folds meet in front as the genital tubercle; in the sixth week they split into urethral folds in front and anal folds behind, with genital swellings beside them. Dihydrotestosterone makes the swellings into the scrotum, the tubercle into the phallus, and the urethral folds close over the urethral plate to form most of the penile urethra; the part in the glans comes from an ingrowth of ectoderm.',
      focus: ['external-genitalia'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'Follow the testicular vessels from L2 down to the scrotum: they trace the road the testis took. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'td-canal',
      prompt: 'The testis passes through the inguinal canal in the:',
      options: [
        { id: 'seventh', text: 'Seventh month before birth' },
        { id: 'third', text: 'Third month' },
        { id: 'ninth', text: 'Ninth month' },
        { id: 'after-birth', text: 'First month after birth' },
      ],
      answerId: 'seventh',
      explanation:
        'Iliac fossa by the third month, at the deep ring until the sixth, canal in the seventh, scrotum by the ninth.',
    },
    {
      id: 'td-tunica',
      prompt: 'The tunica vaginalis is the persisting part of the:',
      options: [
        { id: 'processus', text: 'Processus vaginalis' },
        { id: 'gubernaculum', text: 'Gubernaculum' },
        { id: 'paramesonephric', text: 'Paramesonephric duct' },
        { id: 'urachus', text: 'Urachus' },
      ],
      answerId: 'processus',
      explanation:
        'Its neck closes; its lower part, invaginated by the testis, stays as the tunica vaginalis.',
    },
    {
      id: 'td-appendix',
      prompt: 'The appendix of the testis is a remnant of the:',
      options: [
        { id: 'paramesonephric', text: 'Paramesonephric (Müllerian) duct' },
        { id: 'mesonephric', text: 'Mesonephric (Wolffian) duct' },
        { id: 'gubernaculum', text: 'Gubernaculum' },
        { id: 'processus', text: 'Processus vaginalis' },
      ],
      answerId: 'paramesonephric',
      explanation: 'The appendix of the epididymis is the mesonephric remnant.',
    },
    {
      id: 'td-wolffian',
      prompt: 'Which does not come from the mesonephric duct?',
      options: [
        { id: 'prostate', text: 'Prostate' },
        { id: 'epididymis', text: 'Epididymis' },
        { id: 'seminal-vesicle', text: 'Seminal vesicle' },
        { id: 'ductus', text: 'Ductus deferens' },
      ],
      answerId: 'prostate',
      explanation:
        'The mesonephric duct gives the epididymis, ductus deferens, seminal vesicle, ejaculatory duct and trigone; the prostate grows from the urethra.',
    },
  ],
  cards: [
    {
      id: 'td-timeline',
      front: 'Timeline of descent of the testis?',
      back: 'Starts month 2; iliac fossa month 3; deep ring months 4 to 6; canal month 7; superficial ring month 8; scrotum month 9.',
    },
    {
      id: 'td-origin',
      front: 'Where does the testis develop, and what does that explain?',
      back: 'Beside the mesonephros at T10 to T12: its artery from the aorta at L2, lymph to para-aortic nodes, pain at T10.',
    },
    {
      id: 'td-guides',
      front: 'Processus vaginalis and gubernaculum: what becomes of each?',
      back: 'Processus: neck closes, lower part stays as the tunica vaginalis. Gubernaculum: the ligament of the scrotum.',
    },
    {
      id: 'td-wolffian-card',
      front: 'Derivatives of the mesonephric duct in the male?',
      back: 'Epididymis, ductus deferens, seminal vesicle, ejaculatory duct, trigone of the bladder.',
    },
    {
      id: 'td-sry',
      front: 'What starts testis development?',
      back: 'The SRY gene on the short arm of the Y chromosome (testis-determining factor), working with SOX9.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 17 Male External Genital Organs',
      pages: '266–268',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '289–290' },
  ],
};
