import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  PELVIC_FLOOR,
  PELVIC_FLOOR_ABOVE,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  RECTUM_SIDE,
} from './pelvis-3d';

// Pelvis batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const rectum: Topic = {
  slug: 'rectum',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The rectum',
  summary:
    'Where the rectum begins and ends, its curves, its peritoneum and relations in each sex, the transverse folds inside, its arteries, veins, lymph and nerves, and what holds it in place.',
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
      'Volume 2, Chapter 33 Rectum and Anal Canal: rectum, pages 475 to 481',
    ),
    bookSource('grays-anatomy', 'Chapter 5 Pelvis and Perineum: rectum, pages 452 to 454'),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bony pelvis, pelvic floor, rectum, male organs and iliac vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The rectum runs from the sigmoid colon at the level of S3 to the anorectal junction, 2 to 3 cm in front of and a little below the tip of the coccyx (in men at the apex of the prostate). It is about 12 cm long, and its lower part widens into the ampulla. It has no sacculations, appendices epiploicae or taeniae.',
    'It is not straight: two front-to-back curves (the sacral flexure following the hollow of the sacrum, and the perineal flexure bending back at the anorectal junction) and three side-to-side curves, the middle one convex to the left and the largest.',
    'Peritoneum covers the front and sides of its upper third and only the front of its middle third; the lower third, the ampulla, has none. The floor of the rectovesical pouch is 7.5 cm above the anus in men; the rectouterine pouch only 5.5 cm in women.',
    'The superior rectal artery, the continuation of the inferior mesenteric, is its chief artery; the middle rectal arteries supply only its muscle coats. The superior rectal vein drains to the portal system through the inferior mesenteric vein; the middle rectal veins to the internal iliac veins.',
    'The levator ani and the perineal body are its main supports, helped by the fascia of Waldeyer behind, the lateral ligaments at the sides and the rectovesical fascia of Denonvilliers in front.',
  ],
  visual: {
    kind: 'path',
    // Left: its course, peritoneum and relations. Right: its supply and supports.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'rectum', label: 'Rectum', name: 'Rectum', x: 180, y: 30 },
        {
          id: 'extent',
          label: 'S3 to the anorectal\njunction',
          name: 'Extent: from the sigmoid colon at S3 to the anorectal junction in front of the coccyx',
          x: 85,
          y: 100,
        },
        {
          id: 'curves',
          label: 'Curves: sacral,\nperineal, lateral',
          name: 'Curves: the sacral and perineal flexures, and three lateral curves',
          x: 85,
          y: 165,
        },
        {
          id: 'peritoneum',
          label: 'Peritoneum: upper\nand middle thirds',
          name: 'Peritoneum on the front and sides of the upper third, the front of the middle third, none on the ampulla',
          x: 85,
          y: 225,
        },
        {
          id: 'front-relations',
          label: 'In front: pouch,\nbladder or vagina',
          name: 'In front: the rectovesical or rectouterine pouch; below it the bladder, vesicles and prostate, or the vagina',
          x: 85,
          y: 290,
        },
        {
          id: 'back-relations',
          label: 'Behind: sacrum,\ncoccyx, nerves',
          name: 'Behind: the lower sacrum and coccyx, piriformis, coccygeus and levator ani, the sympathetic trunks and sacral nerves',
          x: 85,
          y: 355,
        },
        {
          id: 'transverse-folds',
          label: 'Transverse folds',
          name: 'Transverse folds (Houston’s valves): permanent shelves of the lining',
          x: 85,
          y: 415,
        },
        {
          id: 'superior-rectal',
          label: 'Superior rectal\nartery: chief',
          name: 'Superior rectal artery, the continuation of the inferior mesenteric: the chief artery',
          x: 275,
          y: 100,
        },
        {
          id: 'middle-rectal',
          label: 'Middle rectal:\nmuscle coats',
          name: 'Middle rectal arteries, from the internal iliac: the muscle coats of the lower rectum',
          x: 275,
          y: 165,
        },
        {
          id: 'median-sacral',
          label: 'Median sacral',
          name: 'Median sacral artery, from the back of the aorta: the back of the anorectal junction',
          x: 275,
          y: 225,
        },
        {
          id: 'rectal-veins',
          label: 'Superior rectal\nvein: to portal',
          name: 'Superior rectal vein to the inferior mesenteric (portal); middle rectal veins to the internal iliac',
          x: 275,
          y: 290,
        },
        {
          id: 'rectal-nerves',
          label: 'L1, L2 and S2 to S4',
          name: 'Sympathetic L1, L2 and parasympathetic S2 to S4 nerves, through the hypogastric plexuses',
          x: 275,
          y: 355,
        },
        {
          id: 'supports',
          label: 'Supports: levator,\nperineal body',
          name: 'Supports: levator ani and the perineal body, the fascia of Waldeyer, the lateral ligaments and Denonvilliers’ fascia',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'rectum', to: 'extent' },
        { from: 'extent', to: 'curves' },
        { from: 'curves', to: 'peritoneum' },
        { from: 'peritoneum', to: 'front-relations' },
        { from: 'front-relations', to: 'back-relations' },
        { from: 'back-relations', to: 'transverse-folds' },
        { from: 'rectum', to: 'superior-rectal' },
        { from: 'superior-rectal', to: 'middle-rectal' },
        { from: 'middle-rectal', to: 'median-sacral' },
        { from: 'median-sacral', to: 'rectal-veins' },
        { from: 'rectal-veins', to: 'rectal-nerves' },
        { from: 'rectal-nerves', to: 'supports' },
      ],
    },
    lesions: [
      {
        id: 'pr-exam',
        label: 'Rectal examination',
        nodeIds: ['front-relations', 'back-relations'],
        explanation:
          'A finger in the rectum feels, in men, the back of the prostate, the seminal vesicles and the ductus deferens; in women, the perineal body and the cervix; in both, the anorectal ring, the coccyx and sacrum, and the ischioanal fossae and ischial spines. It also finds growths in the wall and enlarged organs outside it.',
      },
      {
        id: 'prolapse',
        label: 'Rectal prolapse',
        nodeIds: ['supports', 'peritoneum'],
        explanation:
          'Violent straining can push the loosely held lining out through the anus (mucosal prolapse). The whole wall comes out (procidentia) when the pelvic floor is lax, the rectovesical or rectouterine pouch is too deep, or the rectum is poorly fixed in its bed in front of the sacrum.',
      },
      {
        id: 'carcinoma',
        label: 'Carcinoma of the rectum',
        nodeIds: ['superior-rectal', 'rectal-veins'],
        explanation:
          'Common at the rectosigmoid junction or in the ampulla, it bleeds from a raised, hard ulcer. Removal takes the anus, anal canal and rectum with their fascia and the lymph nodes along the superior rectal and inferior mesenteric vessels, and leaves a colostomy.',
      },
    ],
    drill: [
      {
        id: 'course',
        title: 'Course and relations',
        hint: 'Where it begins and ends, how it bends, the peritoneum on it, then what lies in front, behind and inside.',
        nodeIds: [
          'extent',
          'curves',
          'peritoneum',
          'front-relations',
          'back-relations',
          'transverse-folds',
        ],
      },
      {
        id: 'supply',
        title: 'Supply and supports',
        hint: 'Its three arteries, its veins, its nerves, then what holds it.',
        nodeIds: [
          'superior-rectal',
          'middle-rectal',
          'median-sacral',
          'rectal-veins',
          'rectal-nerves',
          'supports',
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
          'seminal-vesicles',
          'iliac-arteries',
          'iliac-veins',
        ],
        ['hip-bones', 'obturator-internus', 'urinary-bladder', 'prostate', 'seminal-vesicles'],
      ),
      traces: [],
      stops: [RECTUM_SIDE, PELVIC_FLOOR_ABOVE],
    },
  },
  lesson: [
    {
      id: 'course',
      title: 'Course and curves',
      body: 'The rectum is the last part of the large gut but one, between the sigmoid colon and the anal canal, in the back of the lesser pelvis in front of the lower three pieces of the sacrum and the coccyx. It begins at the level of S3, where the sigmoid mesocolon ends, and ends at the anorectal junction, 2 to 3 cm in front of and a little below the tip of the coccyx; in men the junction lies at the apex of the prostate. It is about 12 cm long, 4 cm wide above, and widens below into the ampulla. Despite its name it is curved: from front to back it follows the hollow of the sacrum (the sacral flexure) and bends back at the anorectal junction (the perineal flexure); from side to side it has three curves, convex to the right, to the left (the largest) and to the right.',
      focus: ['extent', 'curves'],
    },
    {
      id: 'peritoneum',
      title: 'Peritoneum and pouches',
      body: 'Peritoneum covers the front and sides of the upper third and only the front of the middle third. The lower third, the ampulla, has none: it lies below the rectovesical pouch in men and the rectouterine pouch in women. The floor of the pouch is about 7.5 cm above the anus in men but only 5.5 cm in women. Unlike the colon, the rectum has no sacculations, appendices epiploicae or taeniae.',
      focus: ['peritoneum'],
    },
    {
      id: 'relations',
      title: 'Relations',
      body: 'In front, the upper two-thirds face the pouch with coils of ileum and the sigmoid colon in it. Below the pouch, in men, lie the base of the bladder, the ends of the ureters, the seminal vesicles, the ductus deferens and the prostate; in women, the lower vagina. Behind, the same in both sexes: the lower sacrum, the coccyx and the anococcygeal ligament; piriformis, coccygeus and levator ani; the median sacral, superior rectal and lateral sacral vessels; the sympathetic trunks ending in the ganglion impar; the ventral rami of S3 to S5 and the coccygeal nerve; and the pelvic splanchnic nerves.',
      focus: ['front-relations', 'back-relations'],
    },
    {
      id: 'inside',
      title: 'Folds inside',
      body: 'An empty rectum has two kinds of folds. Longitudinal folds in its lower part flatten out as it fills. The transverse folds (Houston’s valves) are permanent and stand out most when it is full: the first near its upper end on the left wall, about 7.5 cm above the anus; the second, the largest and most constant, at the top of the ampulla on the front and right walls; the third, not always present, lower on the left. Above the third fold the rectum comes from the hindgut and has peritoneum; below it, from the cloaca, and has none. Normally the rectum is empty: faeces entering it stretch it and bring on the urge to empty the bowel.',
      focus: ['transverse-folds'],
    },
    {
      id: 'supply',
      title: 'Supply and supports',
      body: 'The superior rectal artery, the continuation of the inferior mesenteric at the pelvic brim, is the chief artery: it divides opposite S3 into right and left branches that break up in the wall and run down in the anal columns. The middle rectal arteries, from the internal iliac in the lateral ligaments, supply only the muscle coats; the median sacral artery the back of the anorectal junction. The superior rectal vein runs up to the inferior mesenteric vein (portal); the middle rectal veins drain the muscular walls to the internal iliac veins. Lymph from the upper half follows the superior rectal vessels to the inferior mesenteric nodes; from the lower half, the middle rectal vessels to the internal iliac nodes. Sympathetic (L1, L2) and parasympathetic (S2 to S4) nerves reach it through the hypogastric plexuses; the parasympathetic carry the sense of fullness. It is held by the levator ani and the perineal body, the fascia of Waldeyer behind, the lateral ligaments and the rectovesical fascia of Denonvilliers in front.',
      focus: [
        'superior-rectal',
        'middle-rectal',
        'median-sacral',
        'rectal-veins',
        'rectal-nerves',
        'supports',
      ],
    },
  ],
  questions: [
    {
      id: 're-begins',
      prompt: 'The rectum begins as the continuation of the sigmoid colon at the level of:',
      options: [
        { id: 's3', text: 'The third sacral vertebra' },
        { id: 's1', text: 'The sacral promontory' },
        { id: 'l5', text: 'The fifth lumbar vertebra' },
        { id: 'coccyx', text: 'The tip of the coccyx' },
      ],
      answerId: 's3',
      explanation: 'The rectosigmoid junction lies where the sigmoid mesocolon ends, at S3.',
    },
    {
      id: 're-curve',
      prompt: 'Which lateral curve of the rectum is the most prominent?',
      options: [
        { id: 'middle-left', text: 'The middle one, convex to the left' },
        { id: 'upper-right', text: 'The upper one, convex to the right' },
        { id: 'lower-right', text: 'The lower one, convex to the right' },
        { id: 'none', text: 'They are all the same' },
      ],
      answerId: 'middle-left',
      explanation:
        'The three lateral curves are convex to the right, left and right; the middle one is the largest.',
    },
    {
      id: 're-ampulla',
      prompt: 'The lower third of the rectum, the ampulla, is:',
      options: [
        { id: 'bare', text: 'Without peritoneum' },
        { id: 'front', text: 'Covered by peritoneum in front only' },
        { id: 'front-sides', text: 'Covered in front and at the sides' },
        { id: 'all-round', text: 'Covered all round' },
      ],
      answerId: 'bare',
      explanation: 'It lies below the rectovesical or rectouterine pouch.',
    },
    {
      id: 're-artery',
      prompt: 'The chief artery of the rectum is the:',
      options: [
        { id: 'superior-rectal', text: 'Superior rectal' },
        { id: 'middle-rectal', text: 'Middle rectal' },
        { id: 'inferior-rectal', text: 'Inferior rectal' },
        { id: 'median-sacral', text: 'Median sacral' },
      ],
      answerId: 'superior-rectal',
      explanation:
        'The continuation of the inferior mesenteric artery; the middle rectal arteries supply only the muscle coats.',
    },
  ],
  cards: [
    {
      id: 're-extent',
      front: 'Where does the rectum begin and end?',
      back: 'At S3, from the sigmoid colon; at the anorectal junction, 2 to 3 cm in front of and below the coccyx tip (apex of the prostate in men).',
    },
    {
      id: 're-peritoneum',
      front: 'Peritoneum on the rectum?',
      back: 'Upper third: front and sides. Middle third: front only. Lower third (ampulla): none.',
    },
    {
      id: 're-pouch-depth',
      front: 'Height of the rectovesical and rectouterine pouches above the anus?',
      back: '7.5 cm in men; 5.5 cm in women.',
    },
    {
      id: 're-folds',
      front: 'The largest and most constant transverse fold of the rectum?',
      back: 'The second (middle) fold, at the top of the ampulla, on the front and right walls.',
    },
    {
      id: 're-supports',
      front: 'Supports of the rectum?',
      back: 'Levator ani and the perineal body; fascia of Waldeyer; lateral ligaments; Denonvilliers’ fascia; the pelvic peritoneum and vascular pedicles.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 33 Rectum and Anal Canal',
      pages: '475–481',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '452–454' },
  ],
};
