import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  FEMALE_ORGANS,
  FEMALE_ORGANS_ABOVE,
  FEMALE_PELVIS_CREDIT,
  FEMALE_PELVIS_MODEL_SRC,
  FEMALE_SKELETON,
  FEMALE_TRACES,
  femalePelvisParts,
  OVARY_WALL,
} from './female-pelvis-3d';

// Pelvis batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const ovaryUterineTube: Topic = {
  slug: 'ovary-uterine-tube',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'Ovary and uterine tube',
  summary:
    'The ovary in its fossa on the side wall, its poles, borders, peritoneal folds and ligaments, its vessels and nerves; the uterine tube’s four parts in the broad ligament, where fertilisation happens, its supply, and tubal disease.',
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
      'Volume 2, Chapter 31 Female Reproductive Organs: ovaries and uterine tubes, pages 445 to 450',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: ovaries, page 470; uterine tubes, page 472',
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
    'Each ovary lies in the ovarian fossa on the side wall of the pelvis, bounded in front by the obliterated umbilical artery and behind by the ureter and internal iliac artery. Its long axis is upright before childbirth and turns horizontal after it.',
    'It has a tubal (upper) and a uterine (lower) pole, a mesovarian (front) border at its hilum and a free (back) border, and a lateral surface on the fossa and a medial surface covered by the tube. The mesovarium ties it to the back of the broad ligament; the suspensory ligament, carrying the ovarian vessels, runs from its upper pole over the pelvic brim; the ligament of the ovary runs from its lower pole to the uterus below the tube.',
    'The ovarian artery comes from the aorta just below the renal artery and reaches the ovary through the suspensory ligament and mesovarium; the pampiniform plexus forms the ovarian vein, which ends in the inferior vena cava on the right and the left renal vein on the left. Lymph goes to the lateral aortic and preaortic nodes.',
    'The uterine tube, about 10 cm long in the free upper border of the broad ligament, has four parts: the fimbriated infundibulum opening into the peritoneal cavity, the wide twisting ampulla over the ovary (where fertilisation happens), the narrow isthmus, and the part in the uterine wall.',
    'The uterine artery supplies the medial two-thirds of the tube and the ovarian artery the lateral third. Blocked tubes are the commonest female cause of infertility; a fertilised egg that implants in the tube (tubal pregnancy) can rupture it.',
  ],
  visual: {
    kind: 'path',
    // Left: the ovary's place, folds, ligaments and vessels. Right: the tube from its funnel inwards.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'ovary-tube',
          label: 'Ovary and tube',
          name: 'Ovary and uterine tube',
          x: 180,
          y: 30,
        },
        {
          id: 'ovary',
          label: 'Ovary in its fossa',
          name: 'Ovary, in the ovarian fossa on the side wall of the pelvis',
          x: 85,
          y: 100,
        },
        {
          id: 'fossa-boundaries',
          label: 'Ureter and internal\niliac behind',
          name: 'Bounded in front by the obliterated umbilical artery, behind by the ureter and internal iliac artery',
          x: 85,
          y: 165,
        },
        {
          id: 'mesovarium',
          label: 'Mesovarium',
          name: 'Mesovarium, from the back of the broad ligament to the hilum',
          x: 85,
          y: 230,
        },
        {
          id: 'suspensory',
          label: 'Suspensory\nligament',
          name: 'Suspensory ligament of the ovary, with the ovarian vessels, from the upper pole',
          x: 85,
          y: 295,
        },
        {
          id: 'ovarian-ligament',
          label: 'Ligament of ovary',
          name: 'Ligament of the ovary, from the lower pole to the uterus below the tube',
          x: 85,
          y: 360,
        },
        {
          id: 'ovarian-artery',
          label: 'Ovarian artery\nfrom aorta',
          name: 'Ovarian artery, from the aorta below the renal artery',
          x: 85,
          y: 420,
        },
        {
          id: 'infundibulum',
          label: 'Infundibulum,\nfimbriae',
          name: 'Infundibulum with its fimbriae, opening into the peritoneal cavity',
          x: 275,
          y: 100,
        },
        {
          id: 'ampulla',
          label: 'Ampulla:\nfertilisation',
          name: 'Ampulla, the lateral two-thirds, wide and twisting: where fertilisation happens',
          x: 275,
          y: 165,
        },
        {
          id: 'isthmus',
          label: 'Isthmus: narrow',
          name: 'Isthmus, the narrow medial third',
          x: 275,
          y: 230,
        },
        {
          id: 'intramural',
          label: 'Intramural part',
          name: 'Intramural part in the uterine wall, opening into the cavity',
          x: 275,
          y: 295,
        },
        {
          id: 'mesosalpinx',
          label: 'Mesosalpinx',
          name: 'Mesosalpinx, the broad ligament between the tube and the mesovarium',
          x: 275,
          y: 360,
        },
        {
          id: 'tube-supply',
          label: 'Uterine medial,\novarian lateral',
          name: 'Uterine artery to the medial two-thirds, ovarian artery to the lateral third',
          x: 275,
          y: 420,
        },
      ],
      edges: [
        { from: 'ovary-tube', to: 'ovary' },
        { from: 'ovary', to: 'fossa-boundaries' },
        { from: 'fossa-boundaries', to: 'mesovarium' },
        { from: 'mesovarium', to: 'suspensory' },
        { from: 'suspensory', to: 'ovarian-ligament' },
        { from: 'ovarian-ligament', to: 'ovarian-artery' },
        { from: 'ovary-tube', to: 'infundibulum' },
        { from: 'infundibulum', to: 'ampulla' },
        { from: 'ampulla', to: 'isthmus' },
        { from: 'isthmus', to: 'intramural' },
        { from: 'intramural', to: 'mesosalpinx' },
        { from: 'mesosalpinx', to: 'tube-supply' },
      ],
    },
    lesions: [
      {
        id: 'tubal-pregnancy',
        label: 'Tubal pregnancy',
        nodeIds: ['ampulla', 'isthmus'],
        explanation:
          'A fertilised egg that sticks to the tube wall instead of reaching the uterus grows there, most often in the ampulla. The thin wall cannot stretch with it and may rupture, bleeding into the peritoneal cavity.',
      },
      {
        id: 'blocked-tubes',
        label: 'Blocked tubes',
        nodeIds: ['infundibulum', 'ampulla', 'isthmus'],
        explanation:
          'Blockage, often after infection (salpingitis), is the commonest female cause of infertility. Whether the tubes are open is tested by blowing air through them (Rubin’s test) or outlining them with dye on X-ray (hysterosalpingography). Cutting or tying both tubes on purpose (tubectomy) is a method of sterilisation.',
      },
      {
        id: 'ovary-in-pouch',
        label: 'Ovary in the pouch',
        nodeIds: ['ovary', 'mesovarium'],
        explanation:
          'An ovary often drops into the rectouterine pouch, where it can be felt on vaginal examination. Ovarian cysts, cancer and endometriosis (the blood-filled chocolate cysts) are common here.',
      },
    ],
    drill: [
      {
        id: 'ovary',
        title: 'The ovary',
        hint: 'Its fossa and what bounds it, the folds and ligaments that hold it, then its artery.',
        nodeIds: [
          'ovary',
          'fossa-boundaries',
          'mesovarium',
          'suspensory',
          'ovarian-ligament',
          'ovarian-artery',
        ],
      },
      {
        id: 'tube',
        title: 'The uterine tube',
        hint: 'From the open funnel by the ovary inwards to the uterus, then its fold and arteries.',
        nodeIds: ['infundibulum', 'ampulla', 'isthmus', 'intramural', 'mesosalpinx', 'tube-supply'],
      },
    ],
    model3d: {
      src: FEMALE_PELVIS_MODEL_SRC,
      credit: FEMALE_PELVIS_CREDIT,
      parts: femalePelvisParts(
        [...FEMALE_SKELETON, ...FEMALE_ORGANS, 'urinary-bladder', 'rectum'],
        ['hip-bones', 'urinary-bladder', 'rectum'],
      ),
      traces: [{ id: 'fossa-boundaries', ...FEMALE_TRACES.ureters }],
      stops: [OVARY_WALL, FEMALE_ORGANS_ABOVE],
    },
  },
  lesson: [
    {
      id: 'fossa',
      title: 'The ovarian fossa',
      body: 'The ovaries are the female gonads, much smaller than the testes, and they stay in the pelvis. Each lies in the ovarian fossa on the side wall, bounded in front by the obliterated umbilical artery and behind by the ureter and internal iliac artery. Peritoneum lining the fossa separates the ovary from the obturator nerve and vessels outside it. Before any childbirth its long axis is upright; afterwards, pulled by the pregnant uterus, it lies horizontal.',
      focus: ['ovary', 'fossa-boundaries'],
    },
    {
      id: 'parts',
      title: 'Poles, borders and surfaces',
      body: 'The broader upper or tubal pole meets the tube and the external iliac vein, and on the right may meet a pelvic appendix. The narrower lower or uterine pole points to the pelvic floor. The front or mesovarian border, straight, is the hilum where vessels enter. The back border is free and convex. The lateral surface rests in the fossa; the medial surface is largely covered by the tube, with a peritoneal recess, the ovarian bursa, between them. Before puberty the surface is smooth; with repeated ovulation it becomes scarred and uneven.',
      focus: ['ovary', 'mesovarium'],
    },
    {
      id: 'folds',
      title: 'Folds and ligaments',
      body: 'Peritoneum covers almost the whole ovary, as its cubical surface layer, except along the front border. There the two layers turn back as the mesovarium, a short fold from the back of the broad ligament, carries its vessels and nerves. The suspensory (infundibulopelvic) ligament, the lateral part of the broad ligament, runs from the upper pole and the infundibulum of the tube over the external iliac vessels, carrying the ovarian vessels. The ligament of the ovary runs from the lower pole to the side of the uterus, just behind and below the tube.',
      focus: ['mesovarium', 'suspensory', 'ovarian-ligament'],
    },
    {
      id: 'supply',
      title: 'Vessels and nerves',
      body: 'The ovarian artery comes from the aorta just below the renal artery and runs down the posterior abdominal wall into the suspensory ligament. It sends branches through the mesovarium and continues medially in the broad ligament to join the uterine artery, which also sends twigs to the ovary. Veins leave the hilum as the pampiniform plexus and form one ovarian vein near the brim, ending in the inferior vena cava on the right and the left renal vein on the left. Lymph goes up with the vessels to the lateral aortic and preaortic nodes. Sympathetic fibres from T10 and T11 carry its pain.',
      focus: ['ovarian-artery', 'suspensory'],
    },
    {
      id: 'tube',
      title: 'The uterine tube',
      body: 'Each uterine (fallopian) tube, about 10 cm long, carries the egg from the ovary to the uterus in the free upper border of the broad ligament. Laterally, the funnel-shaped infundibulum opens into the peritoneal cavity, fringed with fimbriae, one of which reaches the ovary. The ampulla, the lateral two-thirds, is wide, thin-walled and twisting, arches over the ovary, and is where fertilisation happens. The isthmus, the medial third, is narrow and cord-like. The intramural part, about 1 cm, runs through the uterine wall. The uterine artery supplies the medial two-thirds and the ovarian artery the lateral third.',
      focus: ['infundibulum', 'ampulla', 'isthmus', 'intramural', 'mesosalpinx', 'tube-supply'],
    },
  ],
  questions: [
    {
      id: 'ov-fossa',
      prompt: 'The ovarian fossa is bounded behind by the:',
      options: [
        { id: 'ureter-iliac', text: 'Ureter and internal iliac artery' },
        { id: 'umbilical', text: 'Obliterated umbilical artery' },
        { id: 'external-iliac', text: 'External iliac vessels' },
        { id: 'obturator', text: 'Obturator nerve' },
      ],
      answerId: 'ureter-iliac',
      explanation: 'The obliterated umbilical artery bounds it in front.',
    },
    {
      id: 'ov-left-vein',
      prompt: 'The left ovarian vein drains into the:',
      options: [
        { id: 'left-renal', text: 'Left renal vein' },
        { id: 'ivc', text: 'Inferior vena cava' },
        { id: 'internal-iliac', text: 'Left internal iliac vein' },
        { id: 'portal', text: 'Portal vein' },
      ],
      answerId: 'left-renal',
      explanation: 'The right ovarian vein ends in the inferior vena cava.',
    },
    {
      id: 'ov-fertilisation',
      prompt: 'Fertilisation usually takes place in the:',
      options: [
        { id: 'ampulla', text: 'Ampulla of the uterine tube' },
        { id: 'isthmus', text: 'Isthmus of the tube' },
        { id: 'uterus', text: 'Body of the uterus' },
        { id: 'ovary', text: 'Surface of the ovary' },
      ],
      answerId: 'ampulla',
      explanation: 'The wide lateral two-thirds of the tube.',
    },
    {
      id: 'ov-suspensory',
      prompt: 'The ovarian vessels reach the ovary through the:',
      options: [
        { id: 'suspensory', text: 'Suspensory ligament and mesovarium' },
        { id: 'ligament-ovary', text: 'Ligament of the ovary' },
        { id: 'round', text: 'Round ligament of the uterus' },
        { id: 'mesosalpinx', text: 'Mesosalpinx only' },
      ],
      answerId: 'suspensory',
      explanation:
        'The suspensory (infundibulopelvic) ligament runs from the upper pole over the pelvic brim.',
    },
  ],
  cards: [
    {
      id: 'ov-ligaments',
      front: 'Ligaments of the ovary?',
      back: 'Mesovarium (to the broad ligament), suspensory ligament (over the brim, with the ovarian vessels), ligament of the ovary (to the uterus).',
    },
    {
      id: 'ov-artery',
      front: 'Origin of the ovarian artery?',
      back: 'The abdominal aorta, just below the renal artery.',
    },
    {
      id: 'ov-lymph',
      front: 'Lymph drainage of the ovary?',
      back: 'Lateral aortic and preaortic nodes.',
    },
    {
      id: 'ov-tube-parts',
      front: 'Parts of the uterine tube, lateral to medial?',
      back: 'Infundibulum, ampulla, isthmus, intramural part.',
    },
    {
      id: 'ov-tube-supply',
      front: 'Arteries of the uterine tube?',
      back: 'Uterine artery to the medial two-thirds; ovarian artery to the lateral third.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 31 Female Reproductive Organs',
      pages: '445–450',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '470, 472' },
  ],
};
