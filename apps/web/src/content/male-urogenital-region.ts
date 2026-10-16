import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  pelvisParts,
  PERINEUM_BELOW,
  TRACES,
  UROGENITAL_BELOW,
} from './pelvis-3d';

// Pelvis batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const maleUrogenitalRegion: Topic = {
  slug: 'male-urogenital-region',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The male urogenital region',
  summary:
    'The layers of the male urogenital triangle: Colles’ fascia, the superficial perineal space with the root of the penis and its muscles, the perineal membrane and what pierces it, the thin deep perineal space, and where urine goes when the urethra tears.',
  estimatedMinutes: 15,
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
      'Volume 2, Chapter 28 Perineum: male urogenital region, pages 414 to 419',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: perineal membrane and deep perineal pouch, pages 449 to 451; urogenital triangle, pages 500 to 505 and 507 to 508',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Root of the penis, urethra, prostate and the pubic arch in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Bounded in front and at the sides by the pubic symphysis and ischiopubic rami, and behind by the line between the ischial tuberosities over the back of the transverse perinei. The perineal membrane, a strong triangular sheet across the pubic arch, divides it into the superficial perineal space below and the deep perineal space above.',
    'Colles’ fascia, the membranous layer of superficial fascia, is fixed behind to the back edge of the perineal membrane and at the sides to the pubic arch, and runs on into the dartos of the scrotum and Scarpa’s fascia of the abdominal wall. The superficial perineal space lies between it and the membrane: closed behind, open in front.',
    'In the superficial space: the root of the penis, its two crura fixed to the ischiopubic rami under ischiocavernosus and its bulb in the midline under bulbospongiosus (the two bulbospongiosus joined by a raphe), with the superficial transverse perinei behind; branches of the perineal nerve and artery; and the ducts of the bulbourethral glands.',
    'The perineal membrane is fixed to the ischiopubic rami, thickened at its apex as the transverse perineal ligament, and fused behind with the perineal body. It is pierced by the urethra 2 to 3 cm below the symphysis, the arteries to the bulb, the urethral and deep arteries, the dorsal arteries and nerves of the penis, and the bulbourethral ducts.',
    'The deep perineal space above it is thin and open above: the urethral sphincter is now known to lie in the wall of the urethra itself, so there is no separate urogenital diaphragm. It holds the membranous urethra with its sphincter (mainly the rhabdosphincter), the deep transverse perinei, the bulbourethral glands, and the artery and dorsal nerve of the penis.',
  ],
  visual: {
    kind: 'path',
    // Left: the superficial layers, out to in. Right: the membrane and the deep space.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'urogenital-region',
          label: 'Urogenital region',
          name: 'Male urogenital region',
          x: 180,
          y: 30,
        },
        {
          id: 'colles-fascia',
          label: 'Colles’ fascia',
          name: 'Colles’ fascia, the membranous layer of superficial fascia',
          x: 85,
          y: 100,
        },
        {
          id: 'superficial-space',
          label: 'Superficial\nperineal space',
          name: 'Superficial perineal space, between Colles’ fascia and the perineal membrane',
          x: 85,
          y: 165,
        },
        {
          id: 'ischiocavernosus',
          label: 'Ischiocavernosus\non the crura',
          name: 'Ischiocavernosus over each crus of the penis',
          x: 85,
          y: 230,
        },
        {
          id: 'bulbospongiosus',
          label: 'Bulbospongiosus\non the bulb',
          name: 'Bulbospongiosus over the bulb of the penis',
          x: 85,
          y: 295,
        },
        {
          id: 'superficial-transverse',
          label: 'Superficial\ntransverse perinei',
          name: 'Superficial transverse perinei, from the tuberosities to the perineal body',
          x: 85,
          y: 355,
        },
        {
          id: 'superficial-contents',
          label: 'Perineal nerve\nand artery',
          name: 'Branches of the perineal nerve and artery; the bulbourethral ducts',
          x: 85,
          y: 415,
        },
        {
          id: 'perineal-membrane',
          label: 'Perineal\nmembrane',
          name: 'Perineal membrane, across the pubic arch',
          x: 275,
          y: 100,
        },
        {
          id: 'piercing',
          label: 'Pierced by urethra,\narteries, nerves',
          name: 'Pierced by the urethra, the arteries of the penis, its dorsal nerves and the bulbourethral ducts',
          x: 275,
          y: 165,
        },
        {
          id: 'deep-space',
          label: 'Deep space: thin,\nopen above',
          name: 'Deep perineal space: thin and open above',
          x: 275,
          y: 230,
        },
        {
          id: 'urethra',
          label: 'Membranous\nurethra, sphincter',
          name: 'Membranous urethra with the urethral sphincter in its wall',
          x: 275,
          y: 295,
        },
        {
          id: 'deep-transverse',
          label: 'Deep transverse\nperinei',
          name: 'Deep transverse perinei',
          x: 275,
          y: 355,
        },
        {
          id: 'bulbourethral',
          label: 'Bulbourethral\nglands',
          name: 'Bulbourethral glands, their ducts going down into the bulb',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'urogenital-region', to: 'colles-fascia' },
        { from: 'colles-fascia', to: 'superficial-space' },
        { from: 'superficial-space', to: 'ischiocavernosus' },
        { from: 'ischiocavernosus', to: 'bulbospongiosus' },
        { from: 'bulbospongiosus', to: 'superficial-transverse' },
        { from: 'superficial-transverse', to: 'superficial-contents' },
        { from: 'urogenital-region', to: 'perineal-membrane' },
        { from: 'perineal-membrane', to: 'piercing' },
        { from: 'piercing', to: 'deep-space' },
        { from: 'deep-space', to: 'urethra' },
        { from: 'urethra', to: 'deep-transverse' },
        { from: 'deep-transverse', to: 'bulbourethral' },
      ],
    },
    lesions: [
      {
        id: 'superficial-extravasation',
        label: 'Torn spongy urethra',
        nodeIds: ['colles-fascia', 'superficial-space'],
        explanation:
          'Urine from a urethra torn below the perineal membrane runs under Colles’ fascia: it fills the superficial perineal space, then the scrotum, the penis and the lower abdominal wall. It cannot reach the thighs or the ischioanal fossae, where the fascia is firmly attached.',
      },
      {
        id: 'deep-extravasation',
        label: 'Torn membranous urethra',
        nodeIds: ['urethra', 'deep-space'],
        explanation:
          'Urine from a tear above the perineal membrane spreads upwards into the extraperitoneal tissue of the pelvis round the bladder and prostate, and from there into the abdominal wall, not into the scrotum.',
      },
      {
        id: 'instrumentation',
        label: 'A false passage',
        nodeIds: ['urethra', 'perineal-membrane'],
        explanation:
          'The membranous urethra is the narrowest and least stretchy part. A catheter or sound forced against it can tear through its wall, the commonest injury from careless instrumentation.',
      },
    ],
    drill: [
      {
        id: 'superficial',
        title: 'Superficial layers',
        hint: 'The fascia, the space beneath it, its three muscles, then its nerves and vessels.',
        nodeIds: [
          'colles-fascia',
          'superficial-space',
          'ischiocavernosus',
          'bulbospongiosus',
          'superficial-transverse',
          'superficial-contents',
        ],
      },
      {
        id: 'deep',
        title: 'Membrane and deep space',
        hint: 'The membrane and what pierces it, then the deep space and what lies in it.',
        nodeIds: [
          'perineal-membrane',
          'piercing',
          'deep-space',
          'urethra',
          'deep-transverse',
          'bulbourethral',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          'hip-bones',
          'sacrum',
          'pubic-symphysis',
          'femurs',
          'obturator-internus',
          'levator-ani',
          'external-anal-sphincter',
          'rectum',
          'urinary-bladder',
          'prostate',
          'urethra',
          'corpora-cavernosa',
          'corpus-spongiosum',
          'dorsal-arteries',
          'internal-pudendal-vessels',
          'pudendal-nerves',
        ],
        ['obturator-internus', 'levator-ani', 'urinary-bladder', 'rectum'],
      ),
      traces: [
        { id: 'perineal-membrane', ...TRACES.perinealMembrane },
        { id: 'ischiocavernosus', ...TRACES.ischiocavernosus },
        { id: 'bulbospongiosus', ...TRACES.bulbospongiosus },
        { id: 'superficial-transverse', ...TRACES.superficialTransversePerinei },
      ],
      stops: [UROGENITAL_BELOW, PERINEUM_BELOW],
    },
  },
  lesson: [
    {
      id: 'layers',
      title: 'The layers',
      body: 'The urogenital triangle lies between the pubic symphysis, the ischiopubic rami and the line joining the ischial tuberosities. From the skin inwards: superficial fatty fascia; the membranous layer (Colles’ fascia); the superficial perineal space with the root of the penis; the perineal membrane; and the thin deep perineal space, open above to the pelvis.',
      focus: ['colles-fascia', 'superficial-space', 'perineal-membrane', 'deep-space'],
    },
    {
      id: 'colles',
      title: 'Colles’ fascia',
      body: 'The membranous layer of superficial fascia is fixed behind to the back edge of the perineal membrane and on each side to the pubic arch below the crus. In front it runs on into the dartos of the scrotum and the membranous (Scarpa’s) layer of the abdominal wall. So the superficial perineal space it encloses is closed behind and at the sides but open in front to the scrotum, penis and abdominal wall.',
      focus: ['colles-fascia', 'superficial-space'],
    },
    {
      id: 'root',
      title: 'Root of the penis and its muscles',
      body: 'The two crura (corpora cavernosa) are fixed to the ischiopubic rami and the membrane, each covered by ischiocavernosus, which compresses the crus to keep up erection. The bulb (corpus spongiosum) lies in the midline on the membrane, the urethra entering it from above, covered by the two bulbospongiosus muscles joined in a raphe: they empty the urethra of semen and the last drops of urine and help erection. The superficial transverse perinei run from the ischial rami to the perineal body and steady it. All are supplied by the perineal branch of the pudendal nerve.',
      focus: ['ischiocavernosus', 'bulbospongiosus', 'superficial-transverse'],
    },
    {
      id: 'membrane',
      title: 'The perineal membrane',
      body: 'A nearly triangular sheet fixed to the periosteum of the ischiopubic rami. Its apex, thick where it meets the arcuate pubic ligament, is the transverse perineal ligament; its back edge fuses with the perineal body. It is pierced by the urethra 2 to 3 cm behind the lower edge of the symphysis, the artery to the bulb, the urethral and deep arteries of the penis, the dorsal arteries and nerves of the penis, the ducts of the bulbourethral glands and the nerves to the muscles.',
      focus: ['perineal-membrane', 'piercing'],
    },
    {
      id: 'deep',
      title: 'The deep perineal space',
      body: 'The older view placed a sphincter urethrae sheet between two layers, the urogenital diaphragm. The urethral sphincter is now known to lie within the wall of the urethra, mostly as circular striated muscle (the rhabdosphincter) round the membranous urethra, so the deep space is thin and open above. In it lie the membranous urethra, the deep transverse perinei (attached to the rami and the perineal body), the bulbourethral glands, and the artery and dorsal nerve of the penis.',
      focus: ['deep-space', 'urethra', 'deep-transverse', 'bulbourethral'],
    },
    {
      id: 'injury',
      title: 'When the urethra tears',
      body: 'The membranous urethra is the narrowest, least dilatable part and is easily torn by instruments. A tear below the membrane, as in a fall astride, lets urine run under Colles’ fascia into the superficial space, scrotum, penis and lower abdominal wall, but not into the thighs. A tear above the membrane, as in a fractured pelvis, sends urine up round the bladder and prostate.',
      focus: ['urethra', 'superficial-space'],
    },
  ],
  questions: [
    {
      id: 'mu-not-piercing',
      prompt: 'Which does not pierce the male perineal membrane?',
      options: [
        { id: 'pudendal', text: 'Pudendal nerve' },
        { id: 'urethra', text: 'Urethra' },
        { id: 'deep-artery', text: 'Deep artery of the penis' },
        { id: 'dorsal-artery', text: 'Dorsal artery of the penis' },
      ],
      answerId: 'pudendal',
      explanation:
        'The pudendal nerve ends in the pudendal canal; its dorsal branch passes forwards.',
    },
    {
      id: 'mu-colles',
      prompt:
        'Urine from a torn spongy urethra does not reach the thigh because Colles’ fascia is attached to the:',
      options: [
        { id: 'arch', text: 'Pubic arch and the back edge of the perineal membrane' },
        { id: 'inguinal', text: 'Inguinal ligament only' },
        { id: 'ischial-spine', text: 'Ischial spines' },
        { id: 'sacrum', text: 'Sacrum and coccyx' },
      ],
      answerId: 'arch',
      explanation: 'In front it is open into the scrotum, penis and abdominal wall.',
    },
    {
      id: 'mu-bulb',
      prompt: 'The muscle covering the bulb of the penis is:',
      options: [
        { id: 'bulbospongiosus', text: 'Bulbospongiosus' },
        { id: 'ischiocavernosus', text: 'Ischiocavernosus' },
        { id: 'transverse', text: 'Superficial transverse perinei' },
        { id: 'sphincter', text: 'Urethral sphincter' },
      ],
      answerId: 'bulbospongiosus',
      explanation: 'Ischiocavernosus covers the crura.',
    },
    {
      id: 'mu-narrowest',
      prompt: 'The least dilatable part of the male urethra is the:',
      options: [
        { id: 'membranous', text: 'Membranous part' },
        { id: 'prostatic', text: 'Prostatic part' },
        { id: 'spongy', text: 'Spongy part' },
        { id: 'bulbar', text: 'Bulbar part' },
      ],
      answerId: 'membranous',
      explanation: 'It passes through the deep perineal space and the membrane.',
    },
  ],
  cards: [
    {
      id: 'mu-superficial-contents',
      front: 'Contents of the male superficial perineal space?',
      back: 'Root of the penis (crura and bulb), ischiocavernosus, bulbospongiosus, superficial transverse perinei, perineal nerve and artery branches, bulbourethral ducts.',
    },
    {
      id: 'mu-deep-contents',
      front: 'Contents of the male deep perineal space?',
      back: 'Membranous urethra and its sphincter, deep transverse perinei, bulbourethral glands, artery and dorsal nerve of the penis.',
    },
    {
      id: 'mu-membrane-piercing',
      front: 'Structures piercing the male perineal membrane?',
      back: 'Urethra, artery to the bulb, urethral and deep arteries, dorsal arteries and nerves of the penis, bulbourethral ducts, nerves to the muscles.',
    },
    {
      id: 'mu-colles-attachments',
      front: 'Attachments of Colles’ fascia?',
      back: 'Back edge of the perineal membrane, pubic arch on each side; continuous in front with the dartos and Scarpa’s fascia.',
    },
    {
      id: 'mu-extravasation',
      front: 'Where does urine go from a torn spongy urethra?',
      back: 'Superficial perineal space, scrotum, penis, lower abdominal wall; not the thighs or ischioanal fossae.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 28 Perineum', pages: '414–419' },
    {
      bookId: 'grays-anatomy',
      chapter: 'Chapter 5 Pelvis and Perineum',
      pages: '449–451, 500–505, 507–508',
    },
  ],
};
