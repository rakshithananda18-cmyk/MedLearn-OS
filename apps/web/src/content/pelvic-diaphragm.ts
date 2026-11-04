import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  PELVIC_FLOOR,
  PELVIC_FLOOR_ABOVE,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  PERINEUM_BELOW,
} from './pelvis-3d';

// Pelvis batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const pelvicDiaphragm: Topic = {
  slug: 'pelvic-diaphragm',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'Pelvic fascia and the pelvic diaphragm',
  summary:
    'The parietal and visceral pelvic fascia and how it is laid out, then levator ani and coccygeus: their origin, parts and insertions, nerves, actions and relations, and what happens when the floor is torn.',
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
      'Volume 2, Chapter 34 Walls of Pelvis: pelvic fascia and pelvic muscles, pages 493 to 495',
    ),
    bookSource('grays-anatomy', 'Chapter 5 Pelvis and Perineum: pelvic floor, pages 446 to 449'),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bony pelvis, pelvic wall and floor muscles and pelvic organs in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The pelvic fascia lies outside the peritoneum. The parietal layer lines the walls and floor; it is dense over the side wall, where the obturator fascia shows a tendinous arch (white line) for levator ani. The visceral layer wraps the organs: loose round the bladder, rectum and vagina, dense round the prostate.',
    'The sacral plexus lies outside the parietal fascia, so its nerves leave the pelvis without piercing it; the gluteal vessels lie inside it and must pierce it.',
    'Levator ani and coccygeus of both sides make the pelvic diaphragm, which separates the pelvis from the perineum. They arise in one line from the back of the body of the pubis, the tendinous arch and the ischial spine, and slope down and back to the midline, making a gutter-shaped floor.',
    'Levator ani has a pubococcygeus part (levator prostatae or sphincter vaginae in front, puborectalis looping round the anorectal junction), an iliococcygeus part, and behind them coccygeus (ischiococcygeus) on the sacrospinous ligament. S4 and the inferior rectal nerve supply levator ani; S4 and S5 supply coccygeus.',
    'The floor supports the pelvic organs and fixes the perineal body, resists the rise in abdominal pressure in coughing, lifting and labour to keep bladder and rectum continent, and through puborectalis pulls the anorectal junction forwards.',
  ],
  visual: {
    kind: 'path',
    // Left: levator ani and coccygeus, from their origin to their parts. Right: insertion, then
    // the fascia, nerves and actions.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'pelvic-diaphragm',
          label: 'Pelvic diaphragm',
          name: 'Pelvic diaphragm',
          x: 180,
          y: 30,
        },
        {
          id: 'levator-ani',
          label: 'Levator ani',
          name: 'Levator ani, the main part of the pelvic diaphragm',
          x: 85,
          y: 100,
        },
        {
          id: 'origin-line',
          label: 'Pubis, white line,\nischial spine',
          name: 'Origin: the back of the body of the pubis, the tendinous arch (white line) and the ischial spine',
          x: 85,
          y: 165,
        },
        {
          id: 'pubococcygeus',
          label: 'Pubococcygeus',
          name: 'Pubococcygeus: levator prostatae (sphincter vaginae) in front, fibres to the coccyx behind',
          x: 85,
          y: 225,
        },
        {
          id: 'puborectalis',
          label: 'Puborectalis: sling',
          name: 'Puborectalis, the sling round the anorectal junction',
          x: 85,
          y: 290,
        },
        {
          id: 'iliococcygeus',
          label: 'Iliococcygeus',
          name: 'Iliococcygeus, from the back of the white line and the ischial spine',
          x: 85,
          y: 355,
        },
        {
          id: 'coccygeus',
          label: 'Coccygeus',
          name: 'Coccygeus (ischiococcygeus), on the sacrospinous ligament',
          x: 85,
          y: 415,
        },
        {
          id: 'insertion',
          label: 'Perineal body,\nanococcygeal, coccyx',
          name: 'Insertion: the perineal body, the anococcygeal ligament and the coccyx',
          x: 275,
          y: 100,
        },
        {
          id: 'parietal-fascia',
          label: 'Parietal fascia:\nwalls and floor',
          name: 'Parietal pelvic fascia: dense over the side wall (obturator fascia), loose over the floor',
          x: 275,
          y: 165,
        },
        {
          id: 'visceral-fascia',
          label: 'Visceral fascia:\nround the organs',
          name: 'Visceral pelvic fascia: loose round distensible organs, dense round the prostate',
          x: 275,
          y: 225,
        },
        {
          id: 'floor-gap',
          label: 'Gap: urethra,\nvagina',
          name: 'The gap between the front borders of the two levators, for the urethra and vagina',
          x: 275,
          y: 290,
        },
        {
          id: 'floor-nerves',
          label: 'S4, inferior rectal',
          name: 'Nerves: S4 and the inferior rectal nerve to levator ani; S4 and S5 to coccygeus',
          x: 275,
          y: 355,
        },
        {
          id: 'floor-actions',
          label: 'Support, continence',
          name: 'Actions: support the organs, resist abdominal pressure, keep the bladder and rectum continent',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'pelvic-diaphragm', to: 'levator-ani' },
        { from: 'levator-ani', to: 'origin-line' },
        { from: 'origin-line', to: 'pubococcygeus' },
        { from: 'pubococcygeus', to: 'puborectalis' },
        { from: 'puborectalis', to: 'iliococcygeus' },
        { from: 'iliococcygeus', to: 'coccygeus' },
        { from: 'pelvic-diaphragm', to: 'insertion' },
        { from: 'insertion', to: 'parietal-fascia' },
        { from: 'parietal-fascia', to: 'visceral-fascia' },
        { from: 'visceral-fascia', to: 'floor-gap' },
        { from: 'floor-gap', to: 'floor-nerves' },
        { from: 'floor-nerves', to: 'floor-actions' },
      ],
    },
    lesions: [
      {
        id: 'perineal-tear',
        label: 'Torn perineal body',
        nodeIds: ['insertion', 'pubococcygeus', 'floor-gap'],
        explanation:
          'The floor can be injured in childbirth. If a torn perineal body is not repaired well, the front fibres of levator ani, which normally narrow the gap in the floor, pull it wider instead, and the uterus prolapses through it.',
      },
      {
        id: 'spread',
        label: 'Spread of pelvic infection',
        nodeIds: ['parietal-fascia', 'visceral-fascia'],
        explanation:
          'Between the peritoneum and the floor, the fascia is loose, leaving room for the bladder, rectum, uterus and vagina to fill. Infection spreads quickly through this loose tissue.',
      },
    ],
    drill: [
      {
        id: 'muscle',
        title: 'Levator ani and coccygeus',
        hint: 'The muscle, the line it arises from, then its parts from front to back.',
        nodeIds: [
          'levator-ani',
          'origin-line',
          'pubococcygeus',
          'puborectalis',
          'iliococcygeus',
          'coccygeus',
        ],
      },
      {
        id: 'fascia-function',
        title: 'Insertion, fascia and work',
        hint: 'Where it ends, the fascia above and round it, the gap in front, its nerves and what it does.',
        nodeIds: [
          'insertion',
          'parietal-fascia',
          'visceral-fascia',
          'floor-gap',
          'floor-nerves',
          'floor-actions',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          ...PELVIS_SKELETON,
          ...PELVIC_FLOOR,
          'piriformis',
          'rectum',
          'urinary-bladder',
          'prostate',
        ],
        ['hip-bones', 'rectum', 'urinary-bladder', 'prostate'],
      ),
      traces: [],
      stops: [PELVIC_FLOOR_ABOVE, PERINEUM_BELOW],
    },
  },
  lesson: [
    {
      id: 'fascia-layout',
      title: 'The pelvic fascia',
      body: 'The pelvic fascia fills the space outside the peritoneum. Its parietal layer covers the side walls and the floor; its visceral layer surrounds the organs. Two rules lay it out. It is dense and membranous over things that do not stretch, such as the side wall, but loose over things that fill or move, such as the organs and the floor. And it does not cover bare bone: at the edges of the muscles it fuses with the periosteum. The fascia of Waldeyer, from the sacrum to the rectal ampulla, is the exception.',
      focus: ['parietal-fascia', 'visceral-fascia'],
    },
    {
      id: 'parietal',
      title: 'Parietal and visceral layers',
      body: 'On the side wall the fascia over obturator internus, the obturator fascia, is thick and strong and shows a line, the tendinous arch or white line, from which levator ani arises; below it lie the lunate fascia and the pudendal canal. Over piriformis the fascia is thin, and the sacral plexus lies outside it, so its nerves leave without piercing it, while the gluteal vessels, inside it, pierce it. The fascia covers both surfaces of the pelvic diaphragm (the lower one is the anal fascia) and is loose above the floor, leaving room for the organs to fill, but condenses into ligaments that hold the bladder, prostate, uterus and rectum. The visceral layer is loose round the bladder, rectum and vagina and dense round the prostate.',
      focus: ['parietal-fascia', 'visceral-fascia'],
    },
    {
      id: 'origin-parts',
      title: 'Origin and parts',
      body: 'Levator ani and coccygeus of the two sides form the pelvic diaphragm, which separates the pelvis above from the perineum below. They arise in one continuous line from the back of the body of the pubis, the tendinous arch on the obturator fascia and the ischial spine, and their fibres slope down and back to the midline, making a gutter-shaped floor. From front to back: pubococcygeus, whose front fibres surround the prostate (levator prostatae) or the vagina (sphincter vaginae) and end in the perineal body, whose middle fibres, puborectalis, loop round the anorectal junction and blend with the rectal muscle, and whose back fibres reach the anococcygeal ligament and coccyx; iliococcygeus, from the back of the white line and the ischial spine to the anococcygeal ligament and the last two pieces of the coccyx; and coccygeus, partly tendinous, from the ischial spine and the sacrospinous ligament to the side of the coccyx and fifth sacral piece.',
      focus: [
        'levator-ani',
        'origin-line',
        'pubococcygeus',
        'puborectalis',
        'iliococcygeus',
        'coccygeus',
        'insertion',
      ],
    },
    {
      id: 'relations',
      title: 'Relations and nerves',
      body: 'The upper surface of levator ani is covered by pelvic fascia, which separates it from the bladder, prostate, rectum and peritoneum. Its lower surface, covered by anal fascia, is the medial wall of the ischioanal fossa. The front borders of the two muscles leave a triangular gap for the urethra and, in women, the vagina; the back border meets coccygeus. Levator ani is supplied by a branch of S4 and by the inferior rectal nerve; coccygeus by S4 and S5. Coccygeus matches the sacrospinous ligament, which is its degenerate aponeurosis.',
      focus: ['floor-gap', 'floor-nerves'],
    },
    {
      id: 'actions',
      title: 'What the floor does',
      body: 'The levators and coccygei close the back of the pelvic outlet, fix the perineal body and support the pelvic organs. In coughing, sneezing, lifting and straining they resist the rise in abdominal pressure and keep the bladder and rectum continent; during micturition, defaecation and childbirth one opening relaxes while the fibres round the others stay contracted, so nothing prolapses. The puborectalis sling pulls the anorectal junction forwards and holds faeces back. Coccygeus pulls the coccyx forwards again after defaecation or childbirth has pressed it back. In animals with tails these muscles moved the tail; in upright humans they became a floor for the organs.',
      focus: ['floor-actions', 'puborectalis', 'coccygeus'],
    },
  ],
  questions: [
    {
      id: 'pd-origin',
      prompt: 'Levator ani arises from all of these EXCEPT:',
      options: [
        { id: 'tuberosity', text: 'The ischial tuberosity' },
        { id: 'pubis', text: 'The back of the body of the pubis' },
        { id: 'white-line', text: 'The tendinous arch on the obturator fascia' },
        { id: 'spine', text: 'The ischial spine' },
      ],
      answerId: 'tuberosity',
      explanation: 'Its origin runs from the pubis along the white line to the ischial spine.',
    },
    {
      id: 'pd-parts',
      prompt: 'Which of these is NOT part of the pelvic diaphragm?',
      options: [
        { id: 'external-sphincter', text: 'External anal sphincter' },
        { id: 'pubococcygeus', text: 'Pubococcygeus' },
        { id: 'iliococcygeus', text: 'Iliococcygeus' },
        { id: 'ischiococcygeus', text: 'Ischiococcygeus' },
      ],
      answerId: 'external-sphincter',
      explanation: 'The external anal sphincter lies below the diaphragm, round the anal canal.',
    },
    {
      id: 'pd-puborectalis',
      prompt: 'Puborectalis helps continence by:',
      options: [
        { id: 'pulls-forward', text: 'Pulling the anorectal junction forwards' },
        { id: 'closes-urethra', text: 'Closing the urethra' },
        { id: 'pulls-coccyx', text: 'Pulling the coccyx forwards' },
        { id: 'lifts-bladder', text: 'Lifting the bladder' },
      ],
      answerId: 'pulls-forward',
      explanation: 'Its sling round the anorectal junction holds faeces back until defaecation.',
    },
    {
      id: 'pd-nerve',
      prompt: 'Levator ani is supplied by:',
      options: [
        { id: 's4-inferior-rectal', text: 'A branch of S4 and the inferior rectal nerve' },
        { id: 'pudendal-only', text: 'The perineal branch of the pudendal nerve only' },
        { id: 'obturator', text: 'The obturator nerve' },
        { id: 'pelvic-splanchnic', text: 'The pelvic splanchnic nerves' },
      ],
      answerId: 's4-inferior-rectal',
      explanation: 'Coccygeus is supplied by S4 and S5.',
    },
  ],
  cards: [
    {
      id: 'pd-fascia-rule',
      front: 'Two rules of the pelvic fascia?',
      back: 'Dense over structures that do not stretch, loose over those that fill or move; it does not cover bare bone (the fascia of Waldeyer is the exception).',
    },
    {
      id: 'pd-white-line',
      front: 'What is the white line of the pelvis?',
      back: 'The tendinous arch, a thickening of the obturator fascia from which levator ani arises.',
    },
    {
      id: 'pd-parts-list',
      front: 'Parts of the pelvic diaphragm, front to back?',
      back: 'Pubococcygeus (with puborectalis), iliococcygeus and coccygeus (ischiococcygeus).',
    },
    {
      id: 'pd-coccygeus-ligament',
      front: 'Which ligament is coccygeus related to?',
      back: 'The sacrospinous ligament, its degenerate aponeurosis; the two are inversely developed.',
    },
    {
      id: 'pd-prolapse',
      front: 'Why does a badly repaired perineal tear cause prolapse?',
      back: 'Without the perineal body, the front fibres of levator ani widen the gap in the floor instead of narrowing it, and the uterus prolapses.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 34 Walls of Pelvis',
      pages: '493–495',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '446–449' },
  ],
};
