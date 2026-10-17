import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  PROSTATE_SIDE,
  UROGENITAL_BELOW,
} from './pelvis-3d';

// Pelvis batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const urethra: Topic = {
  slug: 'urethra',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The urethra',
  summary:
    'The male urethra’s preprostatic, prostatic, membranous and spongy parts with what opens into each, its narrow and wide places and curves, the two sphincter mechanisms, the short female urethra, and urethral injuries.',
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
      'Volume 2, Chapter 30 Urinary Bladder and Urethra: male and female urethra, pages 438 to 442',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: urethra, page 456 and pages 459 to 462',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bladder, prostate, urethra and the root of the penis in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The male urethra, 18 to 20 cm long, carries urine and semen from the internal urethral orifice to the tip of the penis. The posterior urethra, about 4 cm in the pelvis, is preprostatic (1 to 1.5 cm), prostatic (3 to 4 cm) and membranous (1.5 cm); the anterior or spongy urethra, about 16 cm, runs in the corpus spongiosum through the bulb and penis.',
    'Into the prostatic part open the prostatic ducts in the sinuses beside the urethral crest, and on the colliculus seminalis (verumontanum) the prostatic utricle with an ejaculatory duct on each side. The bulbourethral glands open into the bulbar part.',
    'The prostatic part is the widest and most dilatable; the membranous part the least dilatable and, after the external orifice, the narrowest. The external orifice, a sagittal slit, is the narrowest of all; the navicular fossa just inside it is a dilatation.',
    'Two sphincter mechanisms: proximally, smooth muscle round the bladder neck and preprostatic urethra, with sympathetic supply, which stops semen flowing back into the bladder and is absent in women; distally, the striated rhabdosphincter in the wall of the membranous urethra, slow-twitch and supplied through the pudendal nerve, which keeps continence.',
    'The female urethra is about 4 cm long and 6 mm wide, embedded in the front wall of the vagina; it crosses the perineal membrane and opens just in front of the vaginal opening, 2.5 cm behind the glans of the clitoris, with paraurethral (Skene’s) ducts beside it.',
  ],
  visual: {
    kind: 'path',
    // Left: the male urethra's parts from the bladder down. Right: features, sphincters, the female.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'urethra', label: 'Urethra', name: 'Urethra', x: 180, y: 30 },
        {
          id: 'preprostatic',
          label: 'Preprostatic\n1 to 1.5 cm',
          name: 'Preprostatic part, 1 to 1.5 cm, from the bladder neck',
          x: 85,
          y: 100,
        },
        {
          id: 'prostatic',
          label: 'Prostatic\n3 to 4 cm, widest',
          name: 'Prostatic part, 3 to 4 cm, the widest and most dilatable',
          x: 85,
          y: 165,
        },
        {
          id: 'membranous',
          label: 'Membranous\n1.5 cm, least stretchy',
          name: 'Membranous part, 1.5 cm, the shortest and least dilatable',
          x: 85,
          y: 230,
        },
        {
          id: 'bulbar',
          label: 'Bulbar: glands\nopen here',
          name: 'Bulbar part, the wide start of the spongy urethra; the bulbourethral glands open into it',
          x: 85,
          y: 295,
        },
        {
          id: 'penile',
          label: 'Penile, navicular\nfossa',
          name: 'Penile part, ending in the navicular fossa in the glans',
          x: 85,
          y: 360,
        },
        {
          id: 'external-orifice',
          label: 'External orifice:\nnarrowest',
          name: 'External orifice, a sagittal slit, the narrowest part',
          x: 85,
          y: 420,
        },
        {
          id: 'colliculus',
          label: 'Colliculus\nseminalis',
          name: 'Colliculus seminalis on the urethral crest: the prostatic utricle and ejaculatory ducts',
          x: 275,
          y: 100,
        },
        {
          id: 'prostatic-sinuses',
          label: 'Prostatic sinuses',
          name: 'Prostatic sinuses beside the crest, with the openings of the prostatic ducts',
          x: 275,
          y: 165,
        },
        {
          id: 'proximal-sphincter',
          label: 'Proximal sphincter',
          name: 'Proximal sphincter: smooth muscle round the bladder neck, sympathetic, men only',
          x: 275,
          y: 230,
        },
        {
          id: 'rhabdosphincter',
          label: 'Rhabdosphincter',
          name: 'Distal sphincter: striated muscle in the wall of the membranous urethra',
          x: 275,
          y: 295,
        },
        {
          id: 'female-urethra',
          label: 'Female: 4 cm',
          name: 'Female urethra, 4 cm, in the front wall of the vagina',
          x: 275,
          y: 360,
        },
        {
          id: 'paraurethral',
          label: 'Paraurethral\nducts',
          name: 'Paraurethral (Skene’s) ducts, beside the female external orifice',
          x: 275,
          y: 420,
        },
      ],
      edges: [
        { from: 'urethra', to: 'preprostatic' },
        { from: 'preprostatic', to: 'prostatic' },
        { from: 'prostatic', to: 'membranous' },
        { from: 'membranous', to: 'bulbar' },
        { from: 'bulbar', to: 'penile' },
        { from: 'penile', to: 'external-orifice' },
        { from: 'urethra', to: 'colliculus' },
        { from: 'colliculus', to: 'prostatic-sinuses' },
        { from: 'prostatic-sinuses', to: 'proximal-sphincter' },
        { from: 'proximal-sphincter', to: 'rhabdosphincter' },
        { from: 'rhabdosphincter', to: 'female-urethra' },
        { from: 'female-urethra', to: 'paraurethral' },
      ],
    },
    lesions: [
      {
        id: 'straddle',
        label: 'Fall astride',
        nodeIds: ['bulbar', 'penile'],
        explanation:
          'A fall astride crushes the bulbar urethra against the pubic arch. Urine escapes into the superficial perineal space: held back behind by the fused fascia at the perineal membrane, at the sides by the ischiopubic rami and above by the membrane, it spreads into the scrotum and penis and up the anterior abdominal wall.',
      },
      {
        id: 'membranous-tear',
        label: 'Membranous rupture',
        nodeIds: ['membranous', 'rhabdosphincter'],
        explanation:
          'Torn above the perineal membrane, as with a fractured pelvis, the urethra leaks urine into the pelvic tissues round the bladder instead of the perineum.',
      },
      {
        id: 'retrograde',
        label: 'Prostate surgery',
        nodeIds: ['preprostatic', 'proximal-sphincter'],
        explanation:
          'Operations on the bladder neck or a transurethral resection of the prostate usually destroy the proximal sphincter: semen then flows back into the bladder (retrograde ejaculation). Continence is kept by the rhabdosphincter.',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'Parts of the male urethra',
        hint: 'From the bladder neck down through the prostate and perineal membrane, then along the penis.',
        nodeIds: [
          'preprostatic',
          'prostatic',
          'membranous',
          'bulbar',
          'penile',
          'external-orifice',
        ],
      },
      {
        id: 'features',
        title: 'Openings, sphincters and the female urethra',
        hint: 'What opens into the prostatic part, the two sphincters, then the short female urethra.',
        nodeIds: [
          'colliculus',
          'prostatic-sinuses',
          'proximal-sphincter',
          'rhabdosphincter',
          'female-urethra',
          'paraurethral',
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
          'urinary-bladder',
          'prostate',
          'urethra',
          'corpora-cavernosa',
          'corpus-spongiosum',
          'ductus-deferens',
          'seminal-vesicles',
        ],
        ['hip-bones', 'levator-ani', 'urinary-bladder', 'prostate', 'corpus-spongiosum'],
      ),
      traces: [],
      stops: [PROSTATE_SIDE, UROGENITAL_BELOW],
    },
  },
  lesson: [
    {
      id: 'course',
      title: 'Course and parts',
      body: 'The male urethra, 18 to 20 cm long, carries both urine and semen from the internal urethral orifice to the external orifice on the glans. Its posterior part, about 4 cm, lies in the pelvis: preprostatic (1 to 1.5 cm) from the bladder neck, prostatic (3 to 4 cm) through the prostate, and membranous (1.5 cm) through the perineal membrane, about 2.5 cm behind and below the pubic symphysis. Its anterior or spongy part, about 16 cm, runs in the corpus spongiosum: the wide bulbar part in the perineum under bulbospongiosus, then the penile part.',
      focus: ['preprostatic', 'prostatic', 'membranous', 'bulbar', 'penile'],
    },
    {
      id: 'prostatic',
      title: 'The prostatic urethra',
      body: 'The prostatic part runs nearer the front of the gland than the back. Along its back wall runs a ridge, the urethral crest, which makes the lumen crescentic. In the grooves on each side, the prostatic sinuses, open the 15 to 20 prostatic ducts. Midway down, the crest swells into the colliculus seminalis (verumontanum). On it opens the prostatic utricle, a blind pocket 6 mm long, thought to match the vagina, with the opening of an ejaculatory duct on each side of or just within it. The lowest part is held by the puboprostatic ligaments and does not move.',
      focus: ['prostatic', 'colliculus', 'prostatic-sinuses'],
    },
    {
      id: 'calibre',
      title: 'Wide, narrow and curved',
      body: 'The prostatic part is the widest and most dilatable. The membranous part is the shortest and least dilatable and, apart from the external orifice, the narrowest. The bulbar part is wide, and the bulbourethral glands open into it about 2.5 cm below the perineal membrane. The penile part is a slit when empty, widening into the navicular fossa inside the glans; the external orifice, a sagittal slit about 6 mm long, is the narrowest part of all. In the flaccid penis the urethra makes a double curve, which a catheter must follow.',
      focus: ['membranous', 'bulbar', 'penile', 'external-orifice'],
    },
    {
      id: 'sphincters',
      title: 'Two sphincters',
      body: 'Proximally, a collar of smooth muscle with its own sympathetic supply surrounds the bladder neck and preprostatic urethra. It closes during ejaculation so that semen does not flow back into the bladder, and it is absent in women. Distally, the wall of the membranous urethra holds the rhabdosphincter, small slow-twitch striated fibres that keep up a closing tone for long periods. It is supplied through the perineal branch of the pudendal nerve (S2). With it work the urethral smooth muscle and the pubourethral fibres of levator ani, which resist sudden rises in abdominal pressure.',
      focus: ['proximal-sphincter', 'rhabdosphincter'],
    },
    {
      id: 'female',
      title: 'The female urethra',
      body: 'The female urethra is only about 4 cm long and 6 mm wide, for urine alone, so a catheter passes far more easily than in a man. It starts opposite the middle of the pubic symphysis and runs down and forward behind it, embedded in the front wall of the vagina. It crosses the perineal membrane and opens as a slit just in front of the vaginal opening, 2.5 cm behind the glans of the clitoris. Small urethral glands open along it, and near its end some drain through a paraurethral duct (Skene’s) on each side of the orifice. Its striated sphincter is thickest in front, and there is no internal sphincter.',
      focus: ['female-urethra', 'paraurethral'],
    },
  ],
  questions: [
    {
      id: 'ue-least-dilatable',
      prompt: 'The least dilatable part of the male urethra is the:',
      options: [
        { id: 'membranous', text: 'Membranous part' },
        { id: 'prostatic', text: 'Prostatic part' },
        { id: 'bulbar', text: 'Bulbar part' },
        { id: 'navicular', text: 'Navicular fossa' },
      ],
      answerId: 'membranous',
      explanation: 'The prostatic part is the widest; the external orifice is the narrowest.',
    },
    {
      id: 'ue-colliculus',
      prompt: 'What opens on the colliculus seminalis?',
      options: [
        { id: 'utricle-ejaculatory', text: 'The prostatic utricle and the ejaculatory ducts' },
        { id: 'bulbourethral', text: 'The bulbourethral glands' },
        { id: 'prostatic-ducts', text: 'All the prostatic ducts' },
        { id: 'seminal', text: 'The seminal vesicles directly' },
      ],
      answerId: 'utricle-ejaculatory',
      explanation:
        'The prostatic ducts open into the sinuses beside the crest; the bulbourethral glands into the bulbar urethra.',
    },
    {
      id: 'ue-absent-female',
      prompt: 'Which sphincter is absent in women?',
      options: [
        { id: 'preprostatic', text: 'The proximal (preprostatic) sphincter' },
        { id: 'rhabdo', text: 'The striated rhabdosphincter' },
        { id: 'smooth', text: 'Urethral smooth muscle' },
        { id: 'pubourethral', text: 'Pubourethral fibres of levator ani' },
      ],
      answerId: 'preprostatic',
      explanation: 'The female bladder neck has no comparable collar of circular smooth muscle.',
    },
    {
      id: 'ue-straddle',
      prompt: 'After a fall astride ruptures the bulbar urethra, urine collects in the:',
      options: [
        { id: 'superficial', text: 'Superficial perineal space, scrotum and abdominal wall' },
        { id: 'pelvis', text: 'Retropubic space of the pelvis' },
        { id: 'thigh', text: 'Front of the thigh' },
        { id: 'ischioanal', text: 'Ischioanal fossa' },
      ],
      answerId: 'superficial',
      explanation:
        'The attachments of the membranous fascia keep it out of the thighs and the anal triangle.',
    },
  ],
  cards: [
    {
      id: 'ue-parts',
      front: 'Parts of the male urethra and their lengths?',
      back: 'Preprostatic 1 to 1.5 cm, prostatic 3 to 4 cm, membranous 1.5 cm, spongy (bulbar and penile) about 16 cm.',
    },
    {
      id: 'ue-narrowest',
      front: 'Narrowest part of the male urethra?',
      back: 'The external orifice; then the membranous part.',
    },
    {
      id: 'ue-bulbourethral',
      front: 'Where do the bulbourethral glands open?',
      back: 'Into the bulbar urethra, about 2.5 cm below the perineal membrane.',
    },
    {
      id: 'ue-utricle',
      front: 'What is the prostatic utricle?',
      back: 'A blind pocket 6 mm long opening on the colliculus seminalis; thought to match the vagina.',
    },
    {
      id: 'ue-female',
      front: 'Length and opening of the female urethra?',
      back: 'About 4 cm; opens just in front of the vaginal opening, 2.5 cm behind the glans of the clitoris.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 30 Urinary Bladder and Urethra',
      pages: '438–442',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '456, 459–462' },
  ],
};
