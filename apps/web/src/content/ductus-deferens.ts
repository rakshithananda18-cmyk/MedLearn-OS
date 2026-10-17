import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  BLADDER_BASE_BEHIND,
  PELVIC_INLET_ABOVE,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
} from './pelvis-3d';

// Pelvis batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const ductusDeferens: Topic = {
  slug: 'ductus-deferens',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'Ductus deferens and seminal vesicles',
  summary:
    'The ductus deferens from the epididymis through the scrotum, inguinal canal and pelvis to the base of the prostate, the seminal vesicles behind the bladder, the ejaculatory ducts they form, and vasectomy.',
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
      'Volume 2, Chapter 32 Male Internal Genital Organs: ductus deferens, seminal vesicles and ejaculatory duct, pages 465 to 467',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: ductus deferens, seminal vesicles and ejaculatory ducts, pages 464 to 465',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bony pelvis, bladder, ureters, ductus deferens and seminal vesicles in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'A thick-walled muscular tube about 45 cm long, carrying sperm from the tail of the epididymis to the ejaculatory duct. Its lumen is narrow except at its dilated end, the ampulla; it feels like a firm cord in the upper scrotum.',
    'It climbs along the back of the testis, medial to the epididymis, then in the back of the spermatic cord through the inguinal canal. At the deep inguinal ring it leaves the cord, hooks round the lateral side of the inferior epigastric artery, and crosses the external iliac vessels into the lesser pelvis.',
    'In the pelvis it runs down and back on the side wall under the peritoneum, crossing the obliterated umbilical artery, the obturator nerve and vessels and the vesical vessels. It then crosses over the ureter and turns medially to the base of the bladder, where it runs down medial to the seminal vesicle as the ampulla.',
    'At the base of the prostate it joins the duct of the seminal vesicle to form the ejaculatory duct, which runs through the prostate to open into the prostatic urethra beside the prostatic utricle.',
    'The seminal vesicles, two lobulated sacs about 5 cm long between the bladder and rectum, are not stores for sperm: their alkaline secretion, with fructose and a clotting enzyme, makes up much of the semen. The artery to the ductus comes from the superior vesical artery.',
  ],
  visual: {
    kind: 'path',
    // Left: the ductus from the epididymis to the prostate. Right: the seminal vesicle and duct.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'ductus', label: 'Ductus deferens', name: 'Ductus deferens', x: 180, y: 30 },
        {
          id: 'epididymis',
          label: 'Tail of epididymis',
          name: 'Begins at the tail of the epididymis',
          x: 85,
          y: 100,
        },
        {
          id: 'spermatic-cord',
          label: 'Spermatic cord,\ninguinal canal',
          name: 'In the back of the spermatic cord, through the inguinal canal',
          x: 85,
          y: 165,
        },
        {
          id: 'deep-ring',
          label: 'Deep ring: round\ninferior epigastric',
          name: 'At the deep ring it hooks round the lateral side of the inferior epigastric artery',
          x: 85,
          y: 230,
        },
        {
          id: 'side-wall',
          label: 'Over external iliac,\ndown side wall',
          name: 'Over the external iliac vessels, then down the side wall of the pelvis',
          x: 85,
          y: 295,
        },
        {
          id: 'ureter',
          label: 'Crosses the ureter',
          name: 'Crosses over the ureter and turns medially',
          x: 85,
          y: 360,
        },
        {
          id: 'ampulla',
          label: 'Ampulla behind\nbladder',
          name: 'Ampulla behind the base of the bladder, medial to the seminal vesicle',
          x: 85,
          y: 420,
        },
        {
          id: 'seminal-vesicle',
          label: 'Seminal vesicle',
          name: 'Seminal vesicle, a lobulated sac 5 cm long behind the bladder',
          x: 275,
          y: 100,
        },
        {
          id: 'secretion',
          label: 'Fructose,\nalkaline fluid',
          name: 'Its alkaline secretion, with fructose, makes much of the semen',
          x: 275,
          y: 165,
        },
        {
          id: 'vesicle-duct',
          label: 'Duct of the vesicle',
          name: 'The duct of the seminal vesicle',
          x: 275,
          y: 230,
        },
        {
          id: 'ejaculatory-duct',
          label: 'Ejaculatory duct',
          name: 'Ejaculatory duct, formed at the base of the prostate',
          x: 275,
          y: 295,
        },
        {
          id: 'through-prostate',
          label: 'Through the\nprostate',
          name: 'Runs down and forward through the prostate',
          x: 275,
          y: 360,
        },
        {
          id: 'prostatic-urethra',
          label: 'Prostatic urethra',
          name: 'Opens into the prostatic urethra beside the utricle',
          x: 275,
          y: 420,
        },
      ],
      edges: [
        { from: 'ductus', to: 'epididymis' },
        { from: 'epididymis', to: 'spermatic-cord' },
        { from: 'spermatic-cord', to: 'deep-ring' },
        { from: 'deep-ring', to: 'side-wall' },
        { from: 'side-wall', to: 'ureter' },
        { from: 'ureter', to: 'ampulla' },
        { from: 'ampulla', to: 'ejaculatory-duct' },
        { from: 'ductus', to: 'seminal-vesicle' },
        { from: 'seminal-vesicle', to: 'secretion' },
        { from: 'secretion', to: 'vesicle-duct' },
        { from: 'vesicle-duct', to: 'ejaculatory-duct' },
        { from: 'ejaculatory-duct', to: 'through-prostate' },
        { from: 'through-prostate', to: 'prostatic-urethra' },
      ],
    },
    lesions: [
      {
        id: 'vasectomy',
        label: 'Vasectomy',
        nodeIds: ['epididymis', 'spermatic-cord'],
        explanation:
          'Through a small cut at the top of the scrotum under local anaesthetic, a short piece of each ductus is removed and the ends tied. The testes go on making hormones, which leave in the veins; sperm already beyond the cut stay in the semen for 2 to 3 months, and new sperm are broken down in the epididymis.',
      },
      {
        id: 'hernia-ring',
        label: 'At the deep ring',
        nodeIds: ['deep-ring'],
        explanation:
          'The ductus marks the deep inguinal ring, lateral to the inferior epigastric artery: an indirect hernia leaves the abdomen here beside it, and repairs of the ring must spare it.',
      },
      {
        id: 'ureter-surgery',
        label: 'Near the ureter',
        nodeIds: ['ureter', 'ampulla'],
        explanation:
          'Behind the bladder the ductus crosses over the ureter just before both reach the bladder base, so operations here can damage either.',
      },
    ],
    drill: [
      {
        id: 'course',
        title: 'The ductus deferens',
        hint: 'From the epididymis up through the canal, round the artery at the deep ring, down the pelvis to the bladder base.',
        nodeIds: ['epididymis', 'spermatic-cord', 'deep-ring', 'side-wall', 'ureter', 'ampulla'],
      },
      {
        id: 'vesicle',
        title: 'Seminal vesicle and ejaculatory duct',
        hint: 'The sac, what it makes, its duct, the duct it forms with the ductus and where that opens.',
        nodeIds: [
          'seminal-vesicle',
          'secretion',
          'vesicle-duct',
          'ejaculatory-duct',
          'through-prostate',
          'prostatic-urethra',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          ...PELVIS_SKELETON,
          'ductus-deferens',
          'seminal-vesicles',
          'prostate',
          'urinary-bladder',
          'ureters',
          'urethra',
          'iliac-arteries',
          'iliac-veins',
          'rectum',
        ],
        ['hip-bones', 'urinary-bladder', 'rectum'],
      ),
      traces: [],
      stops: [BLADDER_BASE_BEHIND, PELVIC_INLET_ABOVE],
    },
  },
  lesson: [
    {
      id: 'scrotum',
      title: 'From the testis',
      body: 'The ductus (vas) deferens is a thick-walled muscular tube, about 45 cm long, that carries sperm from the epididymis to the ejaculatory duct. It begins as the continuation of the tail of the epididymis and climbs along the back of the testis, medial to the epididymis, at first very twisted and then straighter. It then runs up in the back of the spermatic cord to the superficial inguinal ring and through the inguinal canal. In the upper scrotum it can be felt as a firm cord, which makes vasectomy a simple operation.',
      focus: ['epididymis', 'spermatic-cord'],
    },
    {
      id: 'ring',
      title: 'Into the pelvis',
      body: 'At the deep inguinal ring the ductus leaves the other contents of the cord and hooks round the lateral side of the inferior epigastric artery. It then runs back and medially across the external iliac vessels and over the pelvic brim into the lesser pelvis.',
      focus: ['deep-ring', 'side-wall'],
    },
    {
      id: 'pelvis',
      title: 'Down the side wall',
      body: 'In the lesser pelvis it runs down and back on the side wall just under the peritoneum, crossing the obliterated umbilical artery, the obturator nerve and vessels and the vesical vessels. It then crosses over the ureter and bends medially, almost at a right angle, into the fold of peritoneum to the bladder base. There it runs down and forward medial to the seminal vesicle and near its fellow, dilated and twisted as the ampulla. Its artery, from a branch of the superior vesical artery, follows it to the testis.',
      focus: ['side-wall', 'ureter', 'ampulla'],
    },
    {
      id: 'vesicles',
      title: 'The seminal vesicles',
      body: 'The seminal vesicles are two lobulated sacs, each about 5 cm long, between the bladder base and the rectum, lateral to the ampullae and pointing up and out. They do not store sperm. Their slightly alkaline secretion, with fructose and a clotting enzyme, forms a large part of the semen. The lower end of each narrows into its duct. Both they and the ampullae can be felt through the front wall of the rectum.',
      focus: ['seminal-vesicle', 'secretion', 'vesicle-duct'],
    },
    {
      id: 'ejaculatory',
      title: 'The ejaculatory ducts',
      body: 'At the base of the prostate the duct of the seminal vesicle joins the ductus at an acute angle to form the ejaculatory duct. Each runs down and forward through the back of the prostate and opens into the prostatic urethra on the colliculus seminalis, just beside or within the opening of the prostatic utricle, carrying the semen into the urethra. The ductus develops from the mesonephric duct.',
      focus: ['ejaculatory-duct', 'through-prostate', 'prostatic-urethra'],
    },
  ],
  questions: [
    {
      id: 'dd-deep-ring',
      prompt: 'At the deep inguinal ring, the ductus deferens hooks round the:',
      options: [
        { id: 'inferior-epigastric', text: 'Lateral side of the inferior epigastric artery' },
        { id: 'external-iliac', text: 'External iliac artery' },
        { id: 'umbilical', text: 'Obliterated umbilical artery' },
        { id: 'ureter', text: 'Ureter' },
      ],
      answerId: 'inferior-epigastric',
      explanation: 'It then crosses the external iliac vessels into the pelvis.',
    },
    {
      id: 'dd-ureter',
      prompt: 'In the pelvis, the ductus deferens relates to the ureter by:',
      options: [
        { id: 'over', text: 'Crossing over it near the bladder' },
        { id: 'under', text: 'Passing under it at the brim' },
        { id: 'parallel', text: 'Running beside it all the way' },
        { id: 'none', text: 'Never meeting it' },
      ],
      answerId: 'over',
      explanation:
        'It crosses above and in front of the ureter, then turns medially to the bladder base.',
    },
    {
      id: 'dd-ejaculatory',
      prompt: 'The ejaculatory duct is formed by the:',
      options: [
        { id: 'ductus-vesicle', text: 'Ductus deferens and the duct of the seminal vesicle' },
        { id: 'two-ductus', text: 'The two ductus deferentes' },
        { id: 'prostatic', text: 'The prostatic ducts' },
        { id: 'bulbourethral', text: 'The bulbourethral ducts' },
      ],
      answerId: 'ductus-vesicle',
      explanation:
        'They join at the base of the prostate, and the duct opens on the colliculus seminalis.',
    },
    {
      id: 'dd-vesicle-role',
      prompt: 'The seminal vesicles:',
      options: [
        { id: 'secrete', text: 'Secrete an alkaline fluid with fructose' },
        { id: 'store', text: 'Store sperm until ejaculation' },
        { id: 'urine', text: 'Drain into the bladder' },
        { id: 'hormones', text: 'Produce testosterone' },
      ],
      answerId: 'secrete',
      explanation: 'Their secretion makes up much of the semen; they are not sperm reservoirs.',
    },
  ],
  cards: [
    {
      id: 'dd-length',
      front: 'Length of the ductus deferens?',
      back: 'About 45 cm when straightened.',
    },
    {
      id: 'dd-parts',
      front: 'Parts of the course of the ductus deferens?',
      back: 'Along the testis, in the spermatic cord and inguinal canal, in the greater pelvis, in the lesser pelvis.',
    },
    {
      id: 'dd-pelvic-crossings',
      front: 'What does the ductus cross on the pelvic side wall?',
      back: 'Obliterated umbilical artery, obturator nerve and vessels, vesical vessels, then the ureter.',
    },
    {
      id: 'dd-artery',
      front: 'Artery to the ductus deferens?',
      back: 'From a branch of the superior vesical artery; it anastomoses with the testicular artery.',
    },
    {
      id: 'dd-vesicle-size',
      front: 'Size and site of the seminal vesicle?',
      back: 'About 5 cm, lobulated, between the bladder base and rectum, lateral to the ampulla.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 32 Male Internal Genital Organs',
      pages: '465–467',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '464–465' },
  ],
};
