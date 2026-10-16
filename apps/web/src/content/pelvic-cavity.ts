import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  PELVIC_INLET_ABOVE,
  PELVIS_FRONT,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  TRACES,
} from './pelvis-3d';

// Pelvis batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const pelvicCavity: Topic = {
  slug: 'pelvic-cavity',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The pelvic cavity',
  summary:
    'The walls of the lesser pelvis, its inlet and outlet and their angles, the J-shaped cavity and its axis, the pelvic floor, what lies inside, and what crosses the brim.',
  estimatedMinutes: 13,
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
      'Volume 2, Chapter 29 Preliminary Consideration of Boundaries and Contents of Pelvis, pages 428 to 432',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: pelvic inlet, walls, outlet and floor, pages 440 to 448',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bony pelvis, ligaments, walls, floor and pelvic organs in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Four bones (two hip bones, the sacrum and coccyx) at four joints (two sacroiliac, the pubic symphysis, the sacrococcygeal). The plane of the inlet, from the sacral promontory to the top of the symphysis, divides the greater (false) pelvis, which holds abdominal viscera, from the lesser (true) pelvis below.',
    'Walls of the lesser pelvis: the symphysis and pubic bodies in front, the sacrum and coccyx behind, the pubic rami, ischium and lower ilium at the sides; filled out by the obturator membrane, the sacrotuberous and sacrospinous ligaments (which make the greater and lesser sciatic foramina), obturator internus on the side walls and piriformis behind.',
    'The inlet slopes 50 to 60 degrees to the horizontal, bounded by the promontory, the linea terminalis (front of the sacral ala, arcuate line, pecten and crest of the pubis) and the top of the symphysis: heart-shaped in the male, oval in the female. The outlet, about 15 degrees, is bounded by the inferior pubic ligament, ischiopubic rami, ischial tuberosities, sacrotuberous ligaments and coccyx.',
    'The cavity is J-shaped, its axis running down and back, then down and forward; its front wall is about 5 cm deep, its back wall 15 cm, and it is roomier in the female. The pelvic diaphragm, levator ani and coccygeus, forms its floor, sloping like a hammock to the midline, where the urethra, anal canal and in the female the vagina pass through.',
    'Inside: the sigmoid colon and rectum behind, the bladder in front with the prostate below its neck, and between them the genital septum (in the male the ductus deferens, seminal vesicles and ureters; in the female the uterus, tubes, ovaries and vagina). Crossing the brim: median sacral vessels, sympathetic and lumbosacral trunks, iliolumbar artery, obturator nerve, internal iliac vessels, ureters, ovarian vessels, ductus deferens or round ligament, the umbilical ligaments, and on the left the sigmoid colon and superior rectal vessels.',
  ],
  visual: {
    kind: 'path',
    // Left: the bony and soft walls and apertures. Right: the cavity and what it holds.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'pelvic-cavity', label: 'Pelvic cavity', name: 'Pelvic cavity', x: 180, y: 30 },
        {
          id: 'hip-bones',
          label: 'Hip bones, sacrum,\ncoccyx',
          name: 'Bony walls: hip bones, sacrum and coccyx',
          x: 85,
          y: 100,
        },
        {
          id: 'pelvic-inlet',
          label: 'Inlet: 50 to 60\ndegrees',
          name: 'Pelvic inlet, at 50 to 60 degrees to the horizontal',
          x: 85,
          y: 165,
        },
        {
          id: 'pelvic-outlet',
          label: 'Outlet: about 15\ndegrees',
          name: 'Pelvic outlet, at about 15 degrees',
          x: 85,
          y: 230,
        },
        {
          id: 'sacrospinous-ligaments',
          label: 'Ligaments: sciatic\nforamina',
          name: 'Sacrotuberous and sacrospinous ligaments, making the sciatic foramina',
          x: 85,
          y: 295,
        },
        {
          id: 'obturator-internus',
          label: 'Obturator internus,\npiriformis',
          name: 'Obturator internus on the side walls, piriformis behind',
          x: 85,
          y: 355,
        },
        {
          id: 'levator-ani',
          label: 'Floor: levator ani,\ncoccygeus',
          name: 'Floor: the pelvic diaphragm, levator ani and coccygeus',
          x: 85,
          y: 415,
        },
        {
          id: 'axis',
          label: 'J-shaped axis',
          name: 'J-shaped axis: down and back, then down and forward',
          x: 275,
          y: 100,
        },
        {
          id: 'sex-difference',
          label: 'Inlet heart-shaped\nor oval',
          name: 'Inlet heart-shaped in the male, oval in the female',
          x: 275,
          y: 165,
        },
        {
          id: 'rectum',
          label: 'Rectum behind',
          name: 'Sigmoid colon and rectum at the back',
          x: 275,
          y: 225,
        },
        {
          id: 'urinary-bladder',
          label: 'Bladder in front',
          name: 'Bladder in front, the prostate below its neck',
          x: 275,
          y: 290,
        },
        {
          id: 'genital-septum',
          label: 'Genital septum\nbetween',
          name: 'Genital septum between bladder and rectum',
          x: 275,
          y: 355,
        },
        {
          id: 'ureters',
          label: 'Crossing the\nbrim',
          name: 'Structures crossing the brim: ureters, vessels, nerves, ductus deferens',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'pelvic-cavity', to: 'hip-bones' },
        { from: 'hip-bones', to: 'pelvic-inlet' },
        { from: 'pelvic-inlet', to: 'pelvic-outlet' },
        { from: 'pelvic-outlet', to: 'sacrospinous-ligaments' },
        { from: 'sacrospinous-ligaments', to: 'obturator-internus' },
        { from: 'obturator-internus', to: 'levator-ani' },
        { from: 'pelvic-cavity', to: 'axis' },
        { from: 'axis', to: 'sex-difference' },
        { from: 'sex-difference', to: 'rectum' },
        { from: 'rectum', to: 'urinary-bladder' },
        { from: 'urinary-bladder', to: 'genital-septum' },
        { from: 'genital-septum', to: 'ureters' },
      ],
    },
    lesions: [
      {
        id: 'labour',
        label: 'Childbirth',
        nodeIds: ['axis', 'levator-ani'],
        explanation:
          'The baby’s head follows the J-shaped axis. Reaching the pelvic floor it turns from transverse to front-to-back, the occiput comes under the pubic arch, and it passes the gap in levator ani. Damage to the floor in delivery can later let the uterus, vagina or rectum prolapse.',
      },
      {
        id: 'obturator',
        label: 'Pain in the inner thigh',
        nodeIds: ['obturator-internus'],
        explanation:
          'The obturator nerve runs on the side wall to the obturator canal. A pelvic appendix or an inflamed ovary lying against it can refer pain to the inner side of the thigh, which the nerve supplies.',
      },
      {
        id: 'caudal',
        label: 'Caudal anaesthesia',
        nodeIds: ['hip-bones'],
        explanation:
          'Local anaesthetic injected into the sacral canal through the sacral hiatus numbs the second to fourth sacral and coccygeal nerves; it is used in obstetrics.',
      },
    ],
    drill: [
      {
        id: 'walls',
        title: 'Walls and apertures',
        hint: 'The bones, the inlet and outlet, the ligaments, the muscles on the walls, then the floor.',
        nodeIds: [
          'hip-bones',
          'pelvic-inlet',
          'pelvic-outlet',
          'sacrospinous-ligaments',
          'obturator-internus',
          'levator-ani',
        ],
      },
      {
        id: 'contents',
        title: 'The cavity and its contents',
        hint: 'Its axis and sex difference, the organs back to front, then what crosses the brim.',
        nodeIds: [
          'axis',
          'sex-difference',
          'rectum',
          'urinary-bladder',
          'genital-septum',
          'ureters',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          ...PELVIS_SKELETON,
          'obturator-membranes',
          'obturator-internus',
          'piriformis',
          'levator-ani',
          'coccygeus',
          'rectum',
          'urinary-bladder',
          'ureters',
          'prostate',
          'seminal-vesicles',
          'ductus-deferens',
          'iliac-arteries',
          'iliac-veins',
        ],
        ['obturator-internus', 'piriformis', 'iliac-veins'],
      ),
      traces: [
        { id: 'pelvic-inlet', ...TRACES.pelvicInlet },
        { id: 'pelvic-outlet', ...TRACES.pelvicOutlet },
      ],
      stops: [PELVIC_INLET_ABOVE, PELVIS_FRONT],
    },
  },
  lesson: [
    {
      id: 'bones',
      title: 'Bones and joints',
      body: 'The bony pelvis is four bones joined at four joints: the two hip bones in front and at the sides, the sacrum and coccyx behind; the two sacroiliac joints, the pubic symphysis and the sacrococcygeal joint. The plane of the pelvic inlet, from the promontory to the top of the symphysis, divides it into the greater (false) pelvis above, the two iliac fossae belonging to the abdomen, and the lesser (true) pelvis below, which holds the pelvic viscera.',
      focus: ['hip-bones'],
    },
    {
      id: 'walls',
      title: 'Walls',
      body: 'The front wall is the pubic symphysis and the bodies of the pubic bones; the back wall the sacrum and coccyx; each side wall the pubic rami, the ischium and the lower ilium. The obturator membrane closes most of the obturator foramen. The sacrotuberous and sacrospinous ligaments bridge from sacrum to hip bone, turning the sciatic notches into the greater and lesser sciatic foramina. Obturator internus lines the side wall and piriformis the back wall, partly filling the greater sciatic foramen.',
      focus: ['sacrospinous-ligaments', 'obturator-internus'],
    },
    {
      id: 'inlet',
      title: 'The inlet',
      body: 'An oblique plane at 50 to 60 degrees to the horizontal, bounded behind by the sacral promontory, in front by the top of the symphysis, and at each side by the linea terminalis: the front of the sacral ala, the arcuate line of the ilium, the pecten pubis and the pubic crest. In the male it is heart-shaped and widest at the back, indented by a prominent promontory; in the female it is oval and wider further forward.',
      focus: ['pelvic-inlet', 'sex-difference'],
    },
    {
      id: 'outlet',
      title: 'The outlet',
      body: 'Bounded in front by the inferior (arcuate) pubic ligament, behind by the coccyx, and at each side by the ischiopubic ramus, the ischial tuberosity and the sacrotuberous ligament. Its plane makes about 15 degrees with the horizontal. Its back part can move: the coccyx bends on the sacrum and the sacrum moves a little at the sacroiliac joints. The narrowest diameter of the pelvis is between the ischial spines.',
      focus: ['pelvic-outlet'],
    },
    {
      id: 'cavity',
      title: 'Cavity and floor',
      body: 'The cavity runs from the brim to the pelvic diaphragm. It is curved, first down and back, then down and forward, so its axis is J-shaped; its front wall is only about 5 cm deep and its back wall 15 cm. The floor is the pelvic diaphragm, levator ani and coccygeus, a gutter sloping to the midline, pierced by the urethra and anal canal (and vagina), separating the pelvis above from the perineum below.',
      focus: ['axis', 'levator-ani'],
    },
    {
      id: 'contents',
      title: 'Contents and the brim',
      body: 'The sigmoid colon and rectum lie at the back, the bladder in front with the prostate below its neck. Between them a transverse genital septum holds, in the male, the ductus deferens, seminal vesicles and ureters; in the female, the uterus, tubes, ovaries with their ligaments, the vagina and ureters. Crossing the brim from the midline outwards: median sacral vessels, sympathetic trunk, lumbosacral trunk, iliolumbar artery, obturator nerve, internal iliac vessels, ureter, ovarian vessels, ductus deferens or round ligament, the lateral and median umbilical ligaments; on the left only the sigmoid colon with the superior rectal vessels.',
      focus: ['rectum', 'urinary-bladder', 'genital-septum', 'ureters'],
    },
  ],
  questions: [
    {
      id: 'pc-inlet-angle',
      prompt: 'The plane of the pelvic inlet makes with the horizontal an angle of about:',
      options: [
        { id: 'fifty-sixty', text: '50 to 60 degrees' },
        { id: 'fifteen', text: '15 degrees' },
        { id: 'thirty', text: '30 degrees' },
        { id: 'eighty', text: '80 degrees' },
      ],
      answerId: 'fifty-sixty',
      explanation: 'The outlet makes about 15 degrees.',
    },
    {
      id: 'pc-axis',
      prompt: 'The axis of the pelvic cavity is:',
      options: [
        { id: 'j', text: 'J-shaped' },
        { id: 'straight', text: 'Straight and vertical' },
        { id: 'horizontal', text: 'Horizontal' },
        { id: 's', text: 'S-shaped' },
      ],
      answerId: 'j',
      explanation: 'Down and back, then down and forward.',
    },
    {
      id: 'pc-brim',
      prompt: 'Which does not cross the pelvic brim in the male?',
      options: [
        { id: 'ovarian', text: 'Ovarian vessels' },
        { id: 'internal-iliac', text: 'Internal iliac vessels' },
        { id: 'iliolumbar', text: 'Iliolumbar artery' },
        { id: 'sympathetic', text: 'Sympathetic trunk' },
      ],
      answerId: 'ovarian',
      explanation: 'In the male the ductus deferens crosses instead.',
    },
    {
      id: 'pc-floor',
      prompt: 'The pelvic floor is formed by:',
      options: [
        { id: 'levator-coccygeus', text: 'Levator ani and coccygeus' },
        { id: 'obturator-piriformis', text: 'Obturator internus and piriformis' },
        { id: 'perineal-membrane', text: 'The perineal membrane' },
        { id: 'transverse', text: 'The transverse perinei' },
      ],
      answerId: 'levator-coccygeus',
      explanation: 'Obturator internus and piriformis line the walls.',
    },
  ],
  cards: [
    {
      id: 'pc-inlet',
      front: 'Boundaries of the pelvic inlet?',
      back: 'Sacral promontory, linea terminalis (ala of sacrum, arcuate line, pecten pubis, pubic crest), top of the pubic symphysis.',
    },
    {
      id: 'pc-outlet',
      front: 'Boundaries of the pelvic outlet?',
      back: 'Inferior pubic ligament, ischiopubic rami, ischial tuberosities, sacrotuberous ligaments, coccyx.',
    },
    {
      id: 'pc-angles',
      front: 'Angles of the pelvic inlet and outlet with the horizontal?',
      back: 'Inlet 50 to 60 degrees; outlet about 15 degrees.',
    },
    {
      id: 'pc-walls',
      front: 'Muscles of the pelvic walls and floor?',
      back: 'Walls: obturator internus (sides), piriformis (back). Floor: levator ani and coccygeus.',
    },
    {
      id: 'pc-left-only',
      front: 'Which structures cross the pelvic brim on the left only?',
      back: 'The sigmoid colon and the medial limb of the sigmoid mesocolon with the superior rectal vessels.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 29 Boundaries and Contents of Pelvis',
      pages: '428–432',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '440–448' },
  ],
};
