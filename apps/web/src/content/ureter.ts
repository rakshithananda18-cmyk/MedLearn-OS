import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  PELVIC_POUCHES,
  URETERS_FRONT,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const ureter: Topic = {
  slug: 'ureter',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The ureter',
  summary:
    'The ureter from the renal pelvis to the bladder: its course over the psoas and the pelvic brim, its five narrow points, what crosses it in men and women, its blood and nerves, and why a stone hurts from loin to groin.',
  estimatedMinutes: 11,
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
      'Volume 2, Chapter 24 Kidney and Ureter: ureter, development and anomalies, pages 374 to 380',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: ureters, pages 380 to 381'),
    {
      title: 'Z-Anatomy',
      detail: 'Sigmoid colon in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Kidneys, ureters, bladder, vessels, psoas and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'A narrow, thick-walled muscular tube about 25 cm long (half in the abdomen, half in the pelvis) and 3 mm wide, carrying urine from the renal pelvis to the bladder, behind the peritoneum throughout.',
    'It runs down on the psoas and the tips of the lumbar transverse processes, over the genitofemoral nerve, and enters the pelvis by crossing in front of the end of the common iliac artery. In the pelvis it runs down along the front of the greater sciatic notch, then at the ischial spine turns forward and medially to the bladder.',
    'Five narrow points, where stones stick: the pelviureteric junction, the pelvic brim, where the ductus deferens or broad ligament crosses it, its oblique passage through the bladder wall, and its opening.',
    'In front of the right ureter: the third part of the duodenum, right colic and ileocolic vessels, gonadal vessels, root of the mesentery, end of the ileum. Of the left: gonadal artery, left colic vessels, sigmoid colon and mesocolon. In the male the ductus deferens crosses above it; in the female the uterine artery crosses above it about 2 cm lateral to the cervix.',
    'Supplied from its medial side above (renal, aortic, gonadal) and its lateral side in the pelvis (vesical, middle rectal, uterine). Nerves from T10 to L1 and S2 to S4. Colic from a stone runs from the loin to the groin, the scrotum or labium and the inner thigh, the skin of T11 to L2.',
  ],
  visual: {
    kind: 'path',
    // Left: its course from top to bottom. Right: narrow points, crossings, supply and anomalies.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'ureters', label: 'Ureter: 25 cm', name: 'Ureter, about 25 cm', x: 180, y: 30 },
        {
          id: 'renal-pelvis',
          label: 'Begins as the\nrenal pelvis',
          name: 'Begins as the renal pelvis in the renal sinus',
          x: 85,
          y: 100,
        },
        {
          id: 'psoas-major',
          label: 'On psoas and\ntransverse processes',
          name: 'Down on the psoas major and the tips of the transverse processes',
          x: 85,
          y: 165,
        },
        {
          id: 'testicular-arteries',
          label: 'Crossed by gonadal\nvessels',
          name: 'Crossed in front by the gonadal vessels',
          x: 85,
          y: 230,
        },
        {
          id: 'common-iliac-vessels',
          label: 'Over the common\niliac artery',
          name: 'Enters the pelvis in front of the end of the common iliac artery',
          x: 85,
          y: 295,
        },
        {
          id: 'pelvic-course',
          label: 'Pelvis: to the\nischial spine',
          name: 'In the pelvis, down along the greater sciatic notch to the ischial spine',
          x: 85,
          y: 355,
        },
        {
          id: 'urinary-bladder',
          label: 'Oblique through\nthe bladder wall',
          name: 'Oblique course through the bladder wall, acting as a valve',
          x: 85,
          y: 415,
        },
        {
          id: 'constrictions',
          label: 'Five constrictions',
          name: 'Five constrictions: pelviureteric junction, brim, crossing, bladder wall, opening',
          x: 275,
          y: 100,
        },
        {
          id: 'ductus-deferens',
          label: 'Male: ductus\ndeferens above',
          name: 'In the male, the ductus deferens crosses above it',
          x: 275,
          y: 160,
        },
        {
          id: 'uterine-artery',
          label: 'Female: uterine\nartery above',
          name: 'In the female, the uterine artery crosses above it beside the cervix',
          x: 275,
          y: 225,
        },
        {
          id: 'blood-supply',
          label: 'Blood: medial above,\nlateral below',
          name: 'Arteries reach it from the medial side above and the lateral side in the pelvis',
          x: 275,
          y: 290,
        },
        {
          id: 'ureteric-colic',
          label: 'Colic: loin to\ngroin, T11 to L2',
          name: 'Ureteric colic, from loin to groin, through T11 to L2',
          x: 275,
          y: 355,
        },
        {
          id: 'duplex-ureter',
          label: 'Duplex and\nectopic ureter',
          name: 'Duplex and ectopic ureters, from a split or misplaced ureteric bud',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'ureters', to: 'renal-pelvis' },
        { from: 'renal-pelvis', to: 'psoas-major' },
        { from: 'psoas-major', to: 'testicular-arteries' },
        { from: 'testicular-arteries', to: 'common-iliac-vessels' },
        { from: 'common-iliac-vessels', to: 'pelvic-course' },
        { from: 'pelvic-course', to: 'urinary-bladder' },
        { from: 'ureters', to: 'constrictions' },
        { from: 'constrictions', to: 'ductus-deferens' },
        { from: 'ductus-deferens', to: 'uterine-artery' },
        { from: 'uterine-artery', to: 'blood-supply' },
        { from: 'blood-supply', to: 'ureteric-colic' },
        { from: 'ureteric-colic', to: 'duplex-ureter' },
      ],
    },
    lesions: [
      {
        id: 'ureteric-stone',
        label: 'Ureteric stone',
        nodeIds: ['constrictions', 'ureteric-colic', 'common-iliac-vessels', 'renal-pelvis'],
        explanation:
          'A stone sticks at a narrow point: the pelviureteric junction, the pelvic brim or the passage through the bladder wall. The ureter spasms round it, and the pain runs from the loin down to the groin, the scrotum or labium and the inner thigh, the skin of the same segments. Unlike most gallstones, most kidney stones show on an X-ray.',
      },
      {
        id: 'hysterectomy',
        label: 'Ureter at hysterectomy',
        nodeIds: ['uterine-artery', 'pelvic-course'],
        explanation:
          'Beside the cervix the uterine artery crosses above the ureter, “water under the bridge”. In tying the artery to remove the uterus, the surgeon can catch the ureter with it.',
      },
    ],
    drill: [
      {
        id: 'course',
        title: 'Its course',
        hint: 'From the renal pelvis down to the bladder.',
        nodeIds: [
          'renal-pelvis',
          'psoas-major',
          'testicular-arteries',
          'common-iliac-vessels',
          'pelvic-course',
          'urinary-bladder',
        ],
      },
      {
        id: 'points',
        title: 'Narrow points and crossings',
        hint: 'Where stones stick, what crosses it in each sex, its blood, its pain, its anomalies.',
        nodeIds: [
          'constrictions',
          'ductus-deferens',
          'uterine-artery',
          'blood-supply',
          'ureteric-colic',
          'duplex-ureter',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [
          'lumbar-spine',
          'sacrum',
          'hip-bones',
          'lower-ribs',
          'psoas-major',
          'kidneys',
          'ureters',
          'urinary-bladder',
          'renal-arteries',
          'renal-veins',
          'testicular-arteries',
          'testicular-veins',
          'common-iliac-vessels',
          'abdominal-aorta',
          'inferior-vena-cava',
          'duodenum',
          'sigmoid-colon',
          'rectum',
        ],
        ['hip-bones'],
      ),
      traces: [],
      stops: [
        URETERS_FRONT,
        {
          ...PELVIC_POUCHES,
          title: 'Into the pelvis',
          description:
            'From the side: over the pelvic brim in front of the common iliac artery, down the side wall to the ischial spine, then forward to the bladder.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'course',
      title: 'Its course',
      body: 'About 25 cm long and 3 mm wide, half in the abdomen and half in the pelvis, the ureter starts as the funnel-shaped renal pelvis in the renal sinus, leaves the hilum, and narrows into the ureter proper at the lower pole. It runs down and a little in on the psoas and the tips of the lumbar transverse processes, crossing the genitofemoral nerve, and enters the pelvis in front of the end of the common iliac artery.',
      focus: ['renal-pelvis', 'psoas-major', 'common-iliac-vessels'],
    },
    {
      id: 'abdominal-relations',
      title: 'In the abdomen',
      body: 'In front of the right ureter: the third part of the duodenum, the peritoneum, the right colic and ileocolic vessels, the gonadal vessels, the root of the mesentery and the end of the ileum; the IVC lies on its medial side. In front of the left: the peritoneum, the gonadal artery, the left colic vessels, the sigmoid colon and its mesocolon; medial to it, the left gonadal vein and the inferior mesenteric vein.',
      focus: ['testicular-arteries'],
    },
    {
      id: 'pelvic-course',
      title: 'In the pelvis',
      body: 'It runs down along the front of the greater sciatic notch, in front of the internal iliac vessels, the lumbosacral trunk and the sacroiliac joint, with the obturator nerve and vessels lateral to it. At the ischial spine it turns forward and medially to the base of the bladder. In the male the ductus deferens crosses above it and the seminal vesicle lies below and behind its end. In the female it runs in the base of the broad ligament, the uterine artery crossing above it about 2 cm from the cervix.',
      focus: ['pelvic-course', 'ductus-deferens', 'uterine-artery'],
    },
    {
      id: 'bladder',
      title: 'Into the bladder',
      body: 'It passes obliquely through the bladder wall, so a full bladder presses it shut and urine cannot run back. The two openings lie about 5 cm apart in a full bladder, 2.5 cm in an empty one.',
      focus: ['urinary-bladder'],
    },
    {
      id: 'narrow-points',
      title: 'Five narrow points',
      body: 'The ureter narrows at the pelviureteric junction, at the brim of the pelvis, where the ductus deferens or broad ligament crosses it, in its passage through the bladder wall, and at its opening. These are where stones lodge.',
      focus: ['constrictions'],
    },
    {
      id: 'supply',
      title: 'Blood, nerves and development',
      body: 'Long arteries reach it from the renal artery above, the aorta (and gonadal or iliac arteries) in the middle, and the vesical, middle rectal or uterine arteries in the pelvis, forming a chain along it: from its medial side above and its lateral side below. Nerves come from T10 to L1 and S2 to S4 through the renal, aortic and hypogastric plexuses. It grows from the ureteric bud of the mesonephric duct; a split bud gives a duplex ureter, and a misplaced one an ectopic ureter opening lower and more medially.',
      focus: ['blood-supply', 'ureteric-colic', 'duplex-ureter'],
    },
  ],
  questions: [
    {
      id: 'ur-brim',
      prompt: 'The ureter enters the pelvis by crossing in front of the:',
      options: [
        { id: 'common-iliac', text: 'End of the common iliac artery' },
        { id: 'external-iliac', text: 'External iliac vein' },
        { id: 'internal-iliac', text: 'Internal iliac vein' },
        { id: 'sacral-promontory', text: 'Sacral promontory' },
      ],
      answerId: 'common-iliac',
      explanation: 'At its division into the external and internal iliac arteries.',
    },
    {
      id: 'ur-uterine',
      prompt: 'Beside the cervix, the uterine artery crosses the ureter:',
      options: [
        { id: 'above', text: 'Above it, from lateral to medial' },
        { id: 'below', text: 'Below it' },
        { id: 'behind', text: 'Behind it' },
        { id: 'never', text: 'It does not cross it' },
      ],
      answerId: 'above',
      explanation: '“Water under the bridge”: the ureter runs under the artery.',
    },
    {
      id: 'ur-length',
      prompt: 'The ureter is about:',
      options: [
        { id: 'twenty-five', text: '25 cm long' },
        { id: 'ten', text: '10 cm long' },
        { id: 'forty', text: '40 cm long' },
        { id: 'fifteen', text: '15 cm long' },
      ],
      answerId: 'twenty-five',
      explanation: 'Half in the abdomen, half in the pelvis.',
    },
    {
      id: 'ur-colic',
      prompt: 'Pain from a ureteric stone typically spreads from the loin to the:',
      options: [
        { id: 'groin', text: 'Groin, scrotum or labium and inner thigh' },
        { id: 'shoulder', text: 'Right shoulder' },
        { id: 'umbilicus', text: 'Umbilicus only' },
        { id: 'back-of-thigh', text: 'Back of the thigh and sole' },
      ],
      answerId: 'groin',
      explanation: 'The skin of T11 to L2, the segments that also supply the ureter.',
    },
  ],
  cards: [
    {
      id: 'ur-course',
      front: 'Course of the ureter?',
      back: 'From the renal pelvis down on the psoas and the tips of the transverse processes, over the end of the common iliac artery, along the greater sciatic notch to the ischial spine, then forward and medially into the bladder.',
    },
    {
      id: 'ur-constrictions',
      front: 'Five constrictions of the ureter?',
      back: 'Pelviureteric junction, pelvic brim, crossing by the ductus deferens or broad ligament, passage through the bladder wall, its opening.',
    },
    {
      id: 'ur-right-front',
      front: 'In front of the right ureter in the abdomen?',
      back: 'Third part of the duodenum, right colic and ileocolic vessels, gonadal vessels, root of the mesentery, end of the ileum.',
    },
    {
      id: 'ur-left-front',
      front: 'In front of the left ureter in the abdomen?',
      back: 'Gonadal artery, left colic vessels, sigmoid colon and sigmoid mesocolon.',
    },
    {
      id: 'ur-supply',
      front: 'Blood supply of the ureter?',
      back: 'Upper: renal. Middle: aorta (gonadal, iliac). Pelvic: vesical, middle rectal, uterine. From its medial side above, lateral side in the pelvis.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 24 Kidney and Ureter',
      pages: '374–380',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '380–381' },
  ],
};
