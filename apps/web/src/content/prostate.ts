import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  MALE_PELVIS_SIDE,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  PROSTATE_SIDE,
} from './pelvis-3d';

// Pelvis batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const prostate: Topic = {
  slug: 'prostate',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The prostate',
  summary:
    'Where the prostate lies, its apex, base and surfaces and what each touches, its lobes and zones, its two capsules with the venous plexus between them, what runs through it, its supply, and enlargement and cancer.',
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
      'Volume 2, Chapter 32 Male Internal Genital Organs: prostate and the vertebral system of veins, pages 467 to 472',
    ),
    bookSource('grays-anatomy', 'Chapter 5 Pelvis and Perineum: prostate, pages 465 to 467'),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bony pelvis, pelvic floor, prostate and neighbouring organs in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'A firm fibromuscular gland round the first part of the urethra, below the bladder neck, behind the lower pubic symphysis and in front of the rectal ampulla. An inverted cone about 4 cm across, 3 cm high and 2 cm deep, weighing about 8 g; its secretion adds bulk to semen.',
    'Its base is continuous with the bladder neck; its apex, below, surrounds the start of the membranous urethra and is separated from the anal canal by the perineal body. The anterior surface lies 2 cm behind the symphysis with retropubic fat between; the inferolateral surfaces rest on levator ani (levator prostatae).',
    'Its posterior surface, separated from the rectum by the rectovesical fascia (of Denonvilliers), is pierced near its upper border by the ejaculatory ducts and lies about 4 cm from the anus, so it is felt on rectal examination.',
    'A true capsule (the gland’s own condensed edge) and a false capsule (pelvic fascia, joined in front to the puboprostatic ligaments) have the prostatic venous plexus between them. Removing an enlarged gland enucleates it and leaves both capsules and the plexus behind.',
    'Zones: peripheral (70%, behind, where cancer arises), central (25%, round the ejaculatory ducts) and transition (5%, round the urethra, where benign enlargement arises). Its veins connect, without valves, with the vertebral venous plexus, so prostatic cancer spreads to the spine and skull.',
  ],
  visual: {
    kind: 'path',
    // Left: the gland's place and surfaces. Right: inside it, capsules, zones and supply.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'prostate', label: 'Prostate', name: 'Prostate', x: 180, y: 30 },
        {
          id: 'base',
          label: 'Base: bladder neck',
          name: 'Base, continuous with the neck of the bladder',
          x: 85,
          y: 100,
        },
        {
          id: 'anterior',
          label: 'Front: 2 cm behind\nsymphysis',
          name: 'Anterior surface, 2 cm behind the pubic symphysis, with retropubic fat between',
          x: 85,
          y: 165,
        },
        {
          id: 'puboprostatic',
          label: 'Puboprostatic\nligaments',
          name: 'Medial and lateral puboprostatic ligaments, to the back of the pubis',
          x: 85,
          y: 230,
        },
        {
          id: 'inferolateral',
          label: 'Sides: levator\nprostatae',
          name: 'Inferolateral surfaces, on the levator ani (levator prostatae)',
          x: 85,
          y: 295,
        },
        {
          id: 'posterior',
          label: 'Back: Denonvilliers,\nrectum',
          name: 'Posterior surface: Denonvilliers’ fascia, then the rectum; felt per rectum',
          x: 85,
          y: 360,
        },
        {
          id: 'apex',
          label: 'Apex: perineal body',
          name: 'Apex, below, separated from the anal canal by the perineal body',
          x: 85,
          y: 420,
        },
        {
          id: 'urethra',
          label: 'Prostatic urethra',
          name: 'Prostatic urethra, through the front third of the gland',
          x: 275,
          y: 100,
        },
        {
          id: 'ejaculatory',
          label: 'Ejaculatory ducts,\nutricle',
          name: 'Ejaculatory ducts and the prostatic utricle, opening on the colliculus',
          x: 275,
          y: 165,
        },
        {
          id: 'capsules',
          label: 'True and false\ncapsules',
          name: 'True capsule of the gland and false capsule of pelvic fascia',
          x: 275,
          y: 230,
        },
        {
          id: 'venous-plexus',
          label: 'Venous plexus\nbetween them',
          name: 'Prostatic venous plexus, between the two capsules',
          x: 275,
          y: 295,
        },
        {
          id: 'transition',
          label: 'Transition zone:\nBPH',
          name: 'Transition zone round the urethra, where benign enlargement arises',
          x: 275,
          y: 360,
        },
        {
          id: 'peripheral',
          label: 'Peripheral zone:\ncancer',
          name: 'Peripheral zone, behind, where cancer arises',
          x: 275,
          y: 420,
        },
      ],
      edges: [
        { from: 'prostate', to: 'base' },
        { from: 'base', to: 'anterior' },
        { from: 'anterior', to: 'puboprostatic' },
        { from: 'puboprostatic', to: 'inferolateral' },
        { from: 'inferolateral', to: 'posterior' },
        { from: 'posterior', to: 'apex' },
        { from: 'prostate', to: 'urethra' },
        { from: 'urethra', to: 'ejaculatory' },
        { from: 'ejaculatory', to: 'capsules' },
        { from: 'capsules', to: 'venous-plexus' },
        { from: 'venous-plexus', to: 'transition' },
        { from: 'transition', to: 'peripheral' },
      ],
    },
    lesions: [
      {
        id: 'bph',
        label: 'Benign enlargement',
        nodeIds: ['transition', 'urethra'],
        explanation:
          'After about 50, the tissue round the urethra often enlarges. It distorts the prostatic urethra and holds back urine; an enlarged middle lobe rises behind the urethral orifice like a valve, closing it the harder the patient strains. The gland is felt smooth and enlarged per rectum.',
      },
      {
        id: 'cancer',
        label: 'Prostatic cancer',
        nodeIds: ['peripheral', 'posterior', 'venous-plexus'],
        explanation:
          'Cancer starts in the peripheral zone at the back, so a finger in the rectum finds a hard, irregular, fixed gland. Through valveless veins joining the vertebral venous plexus it spreads to the lumbar vertebrae, pelvis and even the skull, causing back pain or sciatica.',
      },
      {
        id: 'prostatectomy',
        label: 'Prostatectomy',
        nodeIds: ['capsules', 'venous-plexus'],
        explanation:
          'The enlarged gland is shelled out from inside its capsules, through the bladder, the front of the capsule, the perineum or the urethra (transurethral resection). Both capsules and the venous plexus between them stay behind, so the plexus is not torn.',
      },
    ],
    drill: [
      {
        id: 'surfaces',
        title: 'Place and surfaces',
        hint: 'From the base at the bladder down round the front, the sides and the back to the apex.',
        nodeIds: ['base', 'anterior', 'puboprostatic', 'inferolateral', 'posterior', 'apex'],
      },
      {
        id: 'inside',
        title: 'Inside, capsules and zones',
        hint: 'What runs through it, its coverings and their veins, then where enlargement and cancer arise.',
        nodeIds: [
          'urethra',
          'ejaculatory',
          'capsules',
          'venous-plexus',
          'transition',
          'peripheral',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          ...PELVIS_SKELETON,
          'levator-ani',
          'external-anal-sphincter',
          'prostate',
          'urethra',
          'urinary-bladder',
          'seminal-vesicles',
          'ductus-deferens',
          'rectum',
          'corpus-spongiosum',
        ],
        ['hip-bones', 'levator-ani', 'urinary-bladder', 'rectum'],
      ),
      traces: [],
      stops: [PROSTATE_SIDE, MALE_PELVIS_SIDE],
    },
  },
  lesson: [
    {
      id: 'where',
      title: 'Where it lies',
      body: 'The prostate is an accessory gland of the male reproductive tract whose secretion adds bulk to semen. It lies in the lesser pelvis below the neck of the bladder, behind the lower pubic symphysis and the upper pubic arch, and in front of the rectal ampulla. It is shaped like an inverted cone about 4 cm across, 3 cm high and 2 cm from front to back, and weighs about 8 g. It is firm because its glands sit in a dense stroma of fibrous tissue and smooth muscle. In women the paraurethral glands are its counterpart.',
      focus: ['base', 'apex'],
    },
    {
      id: 'surfaces',
      title: 'Base, apex and surfaces',
      body: 'Its base, above, is continuous with the bladder neck. Its apex, below, surrounds the start of the membranous urethra and is separated from the anal canal by the perineal body. The narrow anterior surface lies 2 cm behind the symphysis with retropubic fat between, tied to the pubis by the puboprostatic ligaments; the urethra leaves just above and in front of the apex. The inferolateral surfaces rest on the levator ani, whose front fibres sling round the gland as levator prostatae. The flat, triangular posterior surface lies against the rectum, about 4 cm from the anus, with the rectovesical fascia between.',
      focus: ['anterior', 'puboprostatic', 'inferolateral', 'posterior', 'apex'],
    },
    {
      id: 'through',
      title: 'What runs through it',
      body: 'The prostatic urethra runs down through the gland at the junction of its front third and back two-thirds. Into it open the prostatic ducts and, on the colliculus seminalis, the prostatic utricle with an ejaculatory duct on each side. The ejaculatory ducts enter the back of the gland near its upper border and run down and forward to it. The glandular tissue is now described as two lateral lobes and a middle lobe, the middle lobe lying between the ducts and the urethra; the older five-lobe description is no longer used.',
      focus: ['urethra', 'ejaculatory'],
    },
    {
      id: 'capsules',
      title: 'Capsules and zones',
      body: 'The true capsule is the gland’s own condensed edge. Outside it, the false capsule of pelvic fascia is continuous in front with the puboprostatic ligaments; behind, it is the avascular rectovesical fascia (of Denonvilliers). The prostatic venous plexus lies between the two capsules. In McNeal’s zones, the peripheral zone (70%) sits behind and is where cancer arises. The central zone (25%) surrounds the ejaculatory ducts. The transition zone (5%) round the urethra is where benign enlargement begins.',
      focus: ['capsules', 'venous-plexus', 'transition', 'peripheral'],
    },
    {
      id: 'supply',
      title: 'Supply and spread',
      body: 'The inferior vesical, middle rectal and internal pudendal arteries supply it. Its venous plexus takes the deep dorsal vein of the penis and drains to the vesical and internal iliac veins. It also connects, without valves, with the vertebral venous plexus, the route by which prostatic cancer reaches the vertebrae and skull. Lymph goes mainly to the internal iliac and sacral nodes. Its nerves come from the prostatic plexus, the lower part of the inferior hypogastric plexus, which also supplies the seminal vesicles, the erectile tissue and the urethra.',
      focus: ['venous-plexus'],
    },
  ],
  questions: [
    {
      id: 'pg-cancer-zone',
      prompt: 'Carcinoma of the prostate usually arises in the:',
      options: [
        { id: 'peripheral', text: 'Peripheral zone' },
        { id: 'transition', text: 'Transition zone' },
        { id: 'central', text: 'Central zone' },
        { id: 'middle-lobe', text: 'Middle lobe round the urethra' },
      ],
      answerId: 'peripheral',
      explanation:
        'It lies at the back, where the gland is felt per rectum; benign enlargement starts in the transition zone.',
    },
    {
      id: 'pg-plexus',
      prompt: 'The prostatic venous plexus lies:',
      options: [
        { id: 'between', text: 'Between the true and false capsules' },
        { id: 'inside', text: 'Inside the true capsule' },
        { id: 'outside', text: 'Outside the false capsule' },
        { id: 'urethra', text: 'In the wall of the urethra' },
      ],
      answerId: 'between',
      explanation:
        'So both capsules and the plexus are left behind when an enlarged gland is enucleated.',
    },
    {
      id: 'pg-spine',
      prompt: 'Prostatic cancer reaches the vertebrae through:',
      options: [
        { id: 'batson', text: 'Valveless links with the vertebral venous plexus' },
        { id: 'lymph', text: 'Lymph vessels to the inguinal nodes' },
        { id: 'portal', text: 'The portal vein' },
        { id: 'artery', text: 'The inferior vesical artery' },
      ],
      answerId: 'batson',
      explanation: 'Coughing and straining can push blood along these veins in either direction.',
    },
    {
      id: 'pg-pierce',
      prompt: 'The posterior surface of the prostate is pierced by the:',
      options: [
        { id: 'ejaculatory', text: 'Ejaculatory ducts' },
        { id: 'ureters', text: 'Ureters' },
        { id: 'ductus', text: 'Ductus deferens' },
        { id: 'urethra', text: 'Urethra' },
      ],
      answerId: 'ejaculatory',
      explanation: 'They enter near its upper border; the urethra leaves near the apex in front.',
    },
  ],
  cards: [
    {
      id: 'pg-size',
      front: 'Size and weight of the prostate?',
      back: 'About 4 cm across, 3 cm high, 2 cm front to back; about 8 g.',
    },
    {
      id: 'pg-posterior',
      front: 'What separates the prostate from the rectum?',
      back: 'The rectovesical fascia of Denonvilliers; the gland lies about 4 cm from the anus.',
    },
    {
      id: 'pg-zones',
      front: 'Zones of the prostate?',
      back: 'Peripheral 70% (cancer), central 25% (round the ejaculatory ducts), transition 5% (benign enlargement).',
    },
    {
      id: 'pg-lobes',
      front: 'Lobes of the prostate?',
      back: 'Two lateral and one middle lobe.',
    },
    {
      id: 'pg-arteries',
      front: 'Arteries of the prostate?',
      back: 'Inferior vesical, middle rectal and internal pudendal.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 32 Male Internal Genital Organs',
      pages: '467–472',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '465–467' },
  ],
};
