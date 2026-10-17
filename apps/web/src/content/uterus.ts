import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  FEMALE_ORGANS_ABOVE,
  FEMALE_ORGANS_SIDE,
  FEMALE_PELVIS_CREDIT,
  FEMALE_PELVIS_MODEL_SRC,
  FEMALE_SKELETON,
  FEMALE_TRACES,
  femalePelvisParts,
  UTERUS_SECTION_SIDE,
} from './female-pelvis-3d';

// Pelvis batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const uterus: Topic = {
  slug: 'uterus',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The uterus',
  summary:
    'The uterus’s size and parts, how it is tilted forward on the vagina and bent forward at the cervix, the relations of its body and cervix, its cavity and canal, the uterine artery and the ureter, its lymph and nerves, and its changes with age.',
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
      'Volume 2, Chapter 31 Female Reproductive Organs: uterus, pages 450 to 454 and 457',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: uterus and cervix, pages 471 to 473',
    ),
    {
      title: 'Female Reproductive System, Stanford Medicine EdTech',
      detail:
        'Female pelvis, organs, ligaments and perineal muscles in the 3D view; vessels and the ureter drawn as lines',
      url: 'https://sketchfab.com/3d-models/c4d5e725198d4a1997c641d548bb20ce',
      licence: 'CC BY 4.0',
    },
  ],
  keyFacts: [
    'A thick-walled, pear-shaped muscular organ between the bladder and rectum, about 7.5 cm long, 5 cm wide and 2.5 cm thick, weighing 30 to 40 g. The body forms the upper two-thirds, with the fundus above the openings of the tubes; the cervix forms the lower third; the narrow isthmus joins them.',
    'Its long axis meets that of the vagina at about 90 degrees, open forwards (anteversion), and the body bends forwards on the cervix at about 125 degrees (anteflexion). It usually leans a little to the right.',
    'The flat front (vesical) surface lies on the bladder and backs the vesicouterine pouch; the convex back (intestinal) surface faces ileum and sigmoid colon and fronts the rectouterine pouch. The broad ligament attaches along each lateral border, where the tube enters, with the round ligament in front of and below it and the ligament of the ovary behind and below it.',
    'The cervix, about 2.5 cm long, is divided by the vagina into supravaginal and vaginal parts. Beside the supravaginal part the uterine artery crosses above the ureter about 2 cm lateral to the cervix, above the lateral fornix: a classic danger point when the artery is tied.',
    'Lymph from the fundus goes mostly to the aortic nodes, some along the round ligament to the superficial inguinal nodes; from the lower body to the external iliac nodes; from the cervix to the internal iliac and sacral nodes. Pain from the body travels with sympathetic nerves, from the cervix with the pelvic splanchnic nerves.',
  ],
  visual: {
    kind: 'path',
    // Left: the uterus's parts from the fundus down. Right: its position and supply.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'uterus', label: 'Uterus', name: 'Uterus', x: 180, y: 30 },
        {
          id: 'fundus',
          label: 'Fundus',
          name: 'Fundus, above the openings of the tubes',
          x: 85,
          y: 100,
        },
        {
          id: 'body',
          label: 'Body: vesical,\nintestinal surfaces',
          name: 'Body, with a vesical surface on the bladder and an intestinal surface behind',
          x: 85,
          y: 165,
        },
        {
          id: 'lateral-border',
          label: 'Lateral borders:\nbroad ligament',
          name: 'Lateral borders, with the broad ligament, the tube, the round ligament and the ligament of the ovary',
          x: 85,
          y: 230,
        },
        {
          id: 'isthmus',
          label: 'Isthmus,\ninternal os',
          name: 'Isthmus, at the internal os, joining body and cervix',
          x: 85,
          y: 295,
        },
        {
          id: 'supravaginal',
          label: 'Supravaginal\ncervix',
          name: 'Supravaginal cervix: bladder in front, rectouterine pouch behind, ureter and uterine artery beside',
          x: 85,
          y: 360,
        },
        {
          id: 'vaginal-cervix',
          label: 'Vaginal cervix,\nexternal os',
          name: 'Vaginal part of the cervix with the external os, ringed by the fornices',
          x: 85,
          y: 420,
        },
        {
          id: 'anteversion',
          label: 'Anteversion 90°',
          name: 'Anteversion: the uterus tilted forwards on the vagina at about 90 degrees',
          x: 275,
          y: 100,
        },
        {
          id: 'anteflexion',
          label: 'Anteflexion 125°',
          name: 'Anteflexion: the body bent forwards on the cervix at about 125 degrees',
          x: 275,
          y: 165,
        },
        {
          id: 'uterine-artery',
          label: 'Uterine artery',
          name: 'Uterine artery, from the anterior division of the internal iliac',
          x: 275,
          y: 230,
        },
        {
          id: 'over-ureter',
          label: 'Over the ureter,\n2 cm from cervix',
          name: 'Crosses above the ureter about 2 cm lateral to the cervix',
          x: 275,
          y: 295,
        },
        {
          id: 'lymph',
          label: 'Aortic, iliac,\nsacral nodes',
          name: 'Lymph: fundus to aortic nodes, lower body to external iliac, cervix to internal iliac and sacral',
          x: 275,
          y: 360,
        },
        {
          id: 'nerves',
          label: 'Pain: body T12,\ncervix S2 to S4',
          name: 'Pain from the body with sympathetic nerves, from the cervix with the pelvic splanchnic nerves',
          x: 275,
          y: 420,
        },
      ],
      edges: [
        { from: 'uterus', to: 'fundus' },
        { from: 'fundus', to: 'body' },
        { from: 'body', to: 'lateral-border' },
        { from: 'lateral-border', to: 'isthmus' },
        { from: 'isthmus', to: 'supravaginal' },
        { from: 'supravaginal', to: 'vaginal-cervix' },
        { from: 'uterus', to: 'anteversion' },
        { from: 'anteversion', to: 'anteflexion' },
        { from: 'anteflexion', to: 'uterine-artery' },
        { from: 'uterine-artery', to: 'over-ureter' },
        { from: 'over-ureter', to: 'lymph' },
        { from: 'lymph', to: 'nerves' },
      ],
    },
    lesions: [
      {
        id: 'ureter-injury',
        label: 'Tying the uterine artery',
        nodeIds: ['uterine-artery', 'over-ureter', 'supravaginal'],
        explanation:
          'At hysterectomy the uterine artery is tied beside the cervix, just where it passes over the ureter about 2 cm from the cervix. A tie placed too low or too wide can catch or cut the ureter.',
      },
      {
        id: 'retroversion',
        label: 'Retroverted uterus',
        nodeIds: ['anteversion', 'anteflexion'],
        explanation:
          'Tilted backwards instead of forwards, the uterus lines up with the vagina, so a rise in abdominal pressure pushes it down the vaginal canal instead of against the bladder: a retroverted uterus is more prone to prolapse.',
      },
      {
        id: 'fibroids',
        label: 'Fibroids',
        nodeIds: ['body', 'fundus'],
        explanation:
          'Benign tumours of the uterine muscle are very common in the body of the uterus, under the lining, in the wall or under the peritoneum, and can enlarge it and cause heavy bleeding.',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'Parts of the uterus',
        hint: 'From the dome at the top down the body and its borders, to the narrowing and the two parts of the cervix.',
        nodeIds: ['fundus', 'body', 'lateral-border', 'isthmus', 'supravaginal', 'vaginal-cervix'],
      },
      {
        id: 'position-supply',
        title: 'Position and supply',
        hint: 'The two angles, then the artery, where it meets the ureter, and the lymph and nerves.',
        nodeIds: ['anteversion', 'anteflexion', 'uterine-artery', 'over-ureter', 'lymph', 'nerves'],
      },
    ],
    model3d: {
      src: FEMALE_PELVIS_MODEL_SRC,
      credit: FEMALE_PELVIS_CREDIT,
      parts: femalePelvisParts(
        [
          ...FEMALE_SKELETON,
          'uterus-section',
          'uterus-vagina',
          'ovaries',
          'uterine-tubes',
          'broad-ligaments',
          'round-ligaments',
          'urinary-bladder',
          'rectum',
        ],
        ['hip-bones', 'uterus-vagina', 'urinary-bladder', 'rectum'],
      ),
      traces: [
        { id: 'uterine-artery', ...FEMALE_TRACES.uterineArteries },
        { id: 'over-ureter', ...FEMALE_TRACES.ureters },
      ],
      stops: [FEMALE_ORGANS_SIDE, UTERUS_SECTION_SIDE, FEMALE_ORGANS_ABOVE],
    },
  },
  lesson: [
    {
      id: 'parts',
      title: 'Size and parts',
      body: 'The uterus (womb) holds and feeds the growing fetus and expels it at birth. Hollow but thick-walled and firm, it lies in the pelvis between the bladder and rectum and can be felt between two hands on vaginal examination. It is pear-shaped, about 7.5 cm long, 5 cm wide and 2.5 cm thick, and weighs 30 to 40 g. The upper two-thirds is the body; the fundus is the domed part above the openings of the tubes, and the corners where the tubes enter are the cornua. The lower third is the cervix, and the narrow isthmus joins the two.',
      focus: ['fundus', 'body', 'isthmus'],
    },
    {
      id: 'position',
      title: 'Anteverted and anteflexed',
      body: 'Normally the long axis of the uterus meets the long axis of the vagina at about 90 degrees, open forwards: the uterus is tilted forwards, or anteverted. The body is also bent forwards on the cervix at the internal os, at about 125 degrees: anteflexion. So the uterus lies roughly along the axis of the pelvic inlet and the vagina along the axes of the cavity and outlet. It usually lies a little to the right. Tilted backwards instead, it is retroverted.',
      focus: ['anteversion', 'anteflexion'],
    },
    {
      id: 'body',
      title: 'Body and borders',
      body: 'The fundus is covered by peritoneum and points forwards when the bladder is empty; the embryo usually implants in the back wall of the fundus or upper body. The flat front (vesical) surface lies on the bladder and forms the back wall of the vesicouterine pouch. The convex back (intestinal) surface faces ileum and sigmoid colon and forms the front wall of the rectouterine pouch. Along each rounded lateral border the broad ligament is attached, and the uterine artery climbs between its layers. At the top of the border the tube enters, with the round ligament in front and below it and the ligament of the ovary behind and below. The cavity of the body is a slit from front to back but a triangle from the front, its apex at the internal os.',
      focus: ['fundus', 'body', 'lateral-border'],
    },
    {
      id: 'cervix',
      title: 'The cervix',
      body: 'The cervix, about 2.5 cm long and less mobile than the body, projects through the front wall of the vagina, which divides it into two parts. The supravaginal part has the bladder in front and, behind, the rectouterine pouch and the rectum. At each side lie the ureter and uterine artery in the parametrium, the fibrofatty tissue beside and below the broad ligament. The vaginal part sits in the vault, ringed by the fornices. Its external os is small and round before childbirth and a transverse slit with two lips after it. The canal is spindle-shaped, with branching folds on its walls (the arbor vitae).',
      focus: ['supravaginal', 'vaginal-cervix'],
    },
    {
      id: 'supply',
      title: 'Supply',
      body: 'The uterine artery, from the anterior division of the internal iliac, runs medially in the base of the broad ligament. It crosses above the ureter about 2 cm lateral to the cervix, then climbs the side of the uterus in a tortuous course that lets it lengthen in pregnancy, and joins the ovarian artery. The ovarian arteries add to the supply. Veins form a plexus along the borders and drain to the internal iliac veins. Lymph from the fundus and upper body goes mostly to the aortic nodes, with some along the round ligament to the superficial inguinal nodes. From the lower body it goes to the external iliac nodes, and from the cervix to the internal iliac and sacral nodes. Sympathetic fibres (T12, L1) contract it and carry pain from the body; the pelvic splanchnic nerves (S2 to S4) carry pain from the cervix.',
      focus: ['uterine-artery', 'over-ureter', 'lymph', 'nerves'],
    },
  ],
  questions: [
    {
      id: 'ut-anteversion',
      prompt: 'Anteversion of the uterus is the angle between the:',
      options: [
        { id: 'uterus-vagina', text: 'Long axes of the uterus and vagina' },
        { id: 'body-cervix', text: 'Body and cervix' },
        { id: 'cervix-vagina-wall', text: 'Cervix and posterior vaginal wall' },
        { id: 'uterus-inlet', text: 'Uterus and the pelvic inlet' },
      ],
      answerId: 'uterus-vagina',
      explanation:
        'About 90 degrees, open forwards; the bend between body and cervix is anteflexion.',
    },
    {
      id: 'ut-ureter',
      prompt: 'Beside the cervix, the uterine artery crosses the ureter:',
      options: [
        { id: 'above', text: 'Above it, about 2 cm lateral to the cervix' },
        { id: 'below', text: 'Below it, at the pelvic brim' },
        { id: 'never', text: 'It does not cross the ureter' },
        { id: 'behind', text: 'Behind it, at the ischial spine' },
      ],
      answerId: 'above',
      explanation:
        'Above the lateral fornix of the vagina; the ureter is at risk when the artery is tied.',
    },
    {
      id: 'ut-cervix-lymph',
      prompt: 'Lymph from the cervix drains mainly to the:',
      options: [
        { id: 'internal-iliac', text: 'Internal iliac and sacral nodes' },
        { id: 'aortic', text: 'Aortic nodes' },
        { id: 'inguinal', text: 'Superficial inguinal nodes' },
        { id: 'mesenteric', text: 'Inferior mesenteric nodes' },
      ],
      answerId: 'internal-iliac',
      explanation:
        'The fundus drains mostly to the aortic nodes, the lower body to the external iliac nodes.',
    },
    {
      id: 'ut-inguinal',
      prompt: 'Lymph from near the cornua can reach the superficial inguinal nodes along the:',
      options: [
        { id: 'round', text: 'Round ligament of the uterus' },
        { id: 'ovarian', text: 'Ligament of the ovary' },
        { id: 'uterosacral', text: 'Uterosacral ligament' },
        { id: 'suspensory', text: 'Suspensory ligament of the ovary' },
      ],
      answerId: 'round',
      explanation: 'The round ligament runs through the inguinal canal to the labium majus.',
    },
  ],
  cards: [
    {
      id: 'ut-size',
      front: 'Size and weight of the uterus?',
      back: 'About 7.5 cm long, 5 cm wide, 2.5 cm thick; 30 to 40 g.',
    },
    {
      id: 'ut-angles',
      front: 'Angles of anteversion and anteflexion?',
      back: 'Anteversion about 90 degrees (uterus on vagina); anteflexion about 125 degrees (body on cervix).',
    },
    {
      id: 'ut-cervix-relations',
      front: 'Relations of the supravaginal cervix?',
      back: 'Bladder in front; rectouterine pouch and rectum behind; ureter and uterine artery at each side.',
    },
    {
      id: 'ut-border',
      front: 'What is attached at the upper end of the lateral border of the uterus?',
      back: 'The tube; the round ligament in front and below it; the ligament of the ovary behind and below it.',
    },
    {
      id: 'ut-pain',
      front: 'Pain pathways from the uterus?',
      back: 'From the body with sympathetic nerves; from the cervix with the pelvic splanchnic nerves (S2 to S4).',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 31 Female Reproductive Organs',
      pages: '450–454, 457',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '471–473' },
  ],
};
