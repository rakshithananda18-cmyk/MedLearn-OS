import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  ANAL_TRIANGLE_BEHIND,
  PELVIC_FLOOR,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  PERINEUM_BELOW,
  TRACES,
} from './pelvis-3d';

// Pelvis batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const perineum: Topic = {
  slug: 'perineum',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The perineum',
  summary:
    'Where the perineum lies, its surface and deep boundaries, how a line between the ischial tuberosities divides it into the urogenital and anal triangles, the perineal body and the muscles that meet in it.',
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
      'Volume 2, Chapter 28 Perineum: boundaries, divisions and perineal body, pages 409 to 410',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: perineal body, page 452; perineum, pages 496 to 497',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bony pelvis, ligaments, pelvic floor and organs in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The diamond-shaped region below the pelvic diaphragm (levator ani and coccygeus), between the thighs. On the surface: the scrotum or mons pubis in front, the buttocks behind, the upper medial thighs at the sides. Its deep boundaries are those of the pelvic outlet: the pubic arch and inferior pubic ligament in front, the coccyx behind, the ischiopubic rami, ischial tuberosities and sacrotuberous ligaments at the sides.',
    'A line between the front of the ischial tuberosities, passing just in front of the anus, divides it into the urogenital triangle in front, holding the external genitalia and the superficial and deep perineal spaces, and the anal triangle behind, holding the end of the anal canal with an ischioanal fossa on each side.',
    'The perineal body, the central tendon of the perineum, is a fibromuscular node in the midline about 1.25 cm in front of the anal margin. Ten muscles meet in it: the external anal sphincter and the longitudinal muscle of the anal canal, and on each side bulbospongiosus, the superficial and deep transverse perinei and levator ani.',
    'In women the perineal body holds up the pelvic organs; torn in childbirth and left unrepaired, it lets the bladder, uterus and even the rectum prolapse. The anococcygeal ligament, fibrofatty tissue with fibres of levator ani and the external sphincter, runs from the anus to the coccyx and supports the rectum.',
    'The pudendal nerve (S2 to S4) supplies the muscles, skin and lining of both triangles; the skin round the anus comes from the inferior rectal nerve and behind it from the perineal branch of S4. As S2 to S4 also carry the pelvic parasympathetic supply, disease of the pelvic organs can be felt as pain in the perineum.',
  ],
  visual: {
    kind: 'path',
    // Left: the boundaries, surface then deep. Right: the two triangles and the perineal body.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'perineum', label: 'Perineum', name: 'Perineum', x: 180, y: 30 },
        {
          id: 'surface-boundaries',
          label: 'Scrotum, buttocks,\nthighs',
          name: 'Surface boundaries: scrotum or mons in front, buttocks behind, thighs at the sides',
          x: 85,
          y: 100,
        },
        {
          id: 'pelvic-outlet',
          label: 'Deep: the pelvic\noutlet',
          name: 'Deep boundaries: those of the pelvic outlet',
          x: 85,
          y: 165,
        },
        {
          id: 'pubic-symphysis',
          label: 'Front: pubic arch',
          name: 'In front: the pubic arch and inferior pubic ligament',
          x: 85,
          y: 225,
        },
        {
          id: 'hip-bones',
          label: 'Sides: rami,\ntuberosities',
          name: 'At the sides: the ischiopubic rami and ischial tuberosities',
          x: 85,
          y: 290,
        },
        {
          id: 'sacrotuberous-ligaments',
          label: 'Sacrotuberous\nligaments',
          name: 'Behind the tuberosities: the sacrotuberous ligaments',
          x: 85,
          y: 355,
        },
        {
          id: 'coccyx',
          label: 'Back: coccyx',
          name: 'Behind: the tip of the coccyx',
          x: 85,
          y: 415,
        },
        {
          id: 'interischial-line',
          label: 'Line between\ntuberosities',
          name: 'A line between the ischial tuberosities, just in front of the anus',
          x: 275,
          y: 100,
        },
        {
          id: 'urogenital-triangle',
          label: 'Urogenital\ntriangle',
          name: 'Urogenital triangle in front: external genitalia, superficial and deep spaces',
          x: 275,
          y: 165,
        },
        {
          id: 'anal-triangle',
          label: 'Anal triangle',
          name: 'Anal triangle behind: the anal canal and the ischioanal fossae',
          x: 275,
          y: 225,
        },
        {
          id: 'perineal-body',
          label: 'Perineal body',
          name: 'Perineal body, 1.25 cm in front of the anal margin',
          x: 275,
          y: 290,
        },
        {
          id: 'muscles-meet',
          label: 'Ten muscles meet\nthere',
          name: 'Ten muscles meet in the perineal body',
          x: 275,
          y: 355,
        },
        {
          id: 'anococcygeal',
          label: 'Anococcygeal\nligament',
          name: 'Anococcygeal ligament, from the anus to the coccyx',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'perineum', to: 'surface-boundaries' },
        { from: 'surface-boundaries', to: 'pelvic-outlet' },
        { from: 'pelvic-outlet', to: 'pubic-symphysis' },
        { from: 'pubic-symphysis', to: 'hip-bones' },
        { from: 'hip-bones', to: 'sacrotuberous-ligaments' },
        { from: 'sacrotuberous-ligaments', to: 'coccyx' },
        { from: 'perineum', to: 'interischial-line' },
        { from: 'interischial-line', to: 'urogenital-triangle' },
        { from: 'urogenital-triangle', to: 'anal-triangle' },
        { from: 'anal-triangle', to: 'perineal-body' },
        { from: 'perineal-body', to: 'muscles-meet' },
        { from: 'muscles-meet', to: 'anococcygeal' },
      ],
    },
    lesions: [
      {
        id: 'perineal-tear',
        label: 'Torn perineal body',
        nodeIds: ['perineal-body', 'muscles-meet'],
        explanation:
          'A perineal body torn in childbirth and not repaired no longer anchors the muscles that support the pelvic organs: the bladder, uterus and even the rectum can later prolapse.',
      },
      {
        id: 'episiotomy',
        label: 'Episiotomy',
        nodeIds: ['urogenital-triangle', 'perineal-body'],
        explanation:
          'To widen the outlet in a difficult delivery, a cut is made from the back of the vaginal opening outwards at about 45 degrees (mediolateral), through skin, vaginal wall and bulbospongiosus, so that a tear does not run back through the perineal body into the anal sphincter.',
      },
      {
        id: 'referred',
        label: 'Pain in the perineum',
        nodeIds: ['urogenital-triangle', 'anal-triangle'],
        explanation:
          'The skin of the perineum is supplied by S2 to S4, the same segments that carry the parasympathetic supply of the pelvic organs, so disease of the bladder, prostate or rectum can be felt as perineal pain.',
      },
    ],
    drill: [
      {
        id: 'boundaries',
        title: 'Boundaries',
        hint: 'On the surface, then the deep boundaries of the outlet from front round to back.',
        nodeIds: [
          'surface-boundaries',
          'pelvic-outlet',
          'pubic-symphysis',
          'hip-bones',
          'sacrotuberous-ligaments',
          'coccyx',
        ],
      },
      {
        id: 'divisions',
        title: 'Divisions and the perineal body',
        hint: 'The dividing line, the two triangles, then the central point and what attaches there.',
        nodeIds: [
          'interischial-line',
          'urogenital-triangle',
          'anal-triangle',
          'perineal-body',
          'muscles-meet',
          'anococcygeal',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          ...PELVIS_SKELETON,
          'femurs',
          ...PELVIC_FLOOR,
          'rectum',
          'urinary-bladder',
          'prostate',
          'urethra',
          'corpora-cavernosa',
          'corpus-spongiosum',
        ],
        ['obturator-internus', 'urinary-bladder'],
      ),
      traces: [
        { id: 'pelvic-outlet', ...TRACES.pelvicOutlet },
        { id: 'perineal-body', ...TRACES.perinealBody },
      ],
      stops: [PERINEUM_BELOW, ANAL_TRIANGLE_BEHIND],
    },
  },
  lesson: [
    {
      id: 'where',
      title: 'Where it lies',
      body: 'The perineum is the lowest part of the trunk, between the thighs, below the pelvic diaphragm formed by levator ani and coccygeus. It holds the external genitalia and the anus: in the male two openings, the anal and the common urinary and genital one; in the female three, anal, vaginal and urethral. On the surface it is bounded by the scrotum or mons pubis in front, the buttocks behind and the upper medial thighs at the sides.',
      focus: ['surface-boundaries'],
    },
    {
      id: 'deep',
      title: 'Deep boundaries',
      body: 'Its deep boundaries are those of the pelvic outlet, a diamond: in front, the lower part of the pubic arch and the inferior (arcuate) pubic ligament; behind, the tip of the coccyx; at each side, the conjoined ischiopubic ramus, the ischial tuberosity and the sacrotuberous ligament.',
      focus: ['pelvic-outlet', 'pubic-symphysis', 'hip-bones', 'sacrotuberous-ligaments', 'coccyx'],
    },
    {
      id: 'triangles',
      title: 'Two triangles',
      body: 'A transverse line joining the front of the ischial tuberosities, passing just in front of the anus, divides the diamond into two triangles. The urogenital triangle in front holds the root of the penis and scrotum or the female external genitalia, with the superficial and deep perineal spaces. The anal triangle behind holds the end of the anal canal in the midline and an ischioanal fossa on each side. The main nerves and vessels run in the pudendal canal on the side wall of the fossa.',
      focus: ['interischial-line', 'urogenital-triangle', 'anal-triangle'],
    },
    {
      id: 'body',
      title: 'The perineal body',
      body: 'The perineal body, or central point of the perineum, is a fibromuscular node in the midline about 1.25 cm in front of the anal margin, just behind the bulb of the penis. Ten muscles converge and interlace in it: two unpaired, the external anal sphincter and the longitudinal muscle of the anal canal, and four pairs, bulbospongiosus, the superficial and deep transverse perinei and levator ani. In women sphincter urethrovaginalis is attached too, and the body is a key support of the pelvic organs.',
      focus: ['perineal-body', 'muscles-meet'],
    },
    {
      id: 'anal',
      title: 'Behind the anus',
      body: 'The anococcygeal ligament, a fibrofatty mass threaded with fibres of levator ani and the external sphincter, runs from the anus back to the tip of the coccyx and supports the rectum. The external anal sphincter surrounds the whole anal canal; it is voluntary, supplied by the inferior rectal nerve and the perineal branch of S4, and keeps the canal closed.',
      focus: ['anococcygeal'],
    },
  ],
  questions: [
    {
      id: 'pr-boundaries',
      prompt: 'Which is not a deep boundary of the perineum?',
      options: [
        { id: 'sacrospinous', text: 'Sacrospinous ligament' },
        { id: 'inferior-pubic', text: 'Inferior pubic ligament' },
        { id: 'coccyx', text: 'Tip of the coccyx' },
        { id: 'sacrotuberous', text: 'Sacrotuberous ligament' },
      ],
      answerId: 'sacrospinous',
      explanation: 'The sacrospinous ligament lies higher, at the back of the pelvic wall.',
    },
    {
      id: 'pr-perineal-body',
      prompt: 'Which paired muscle is not attached to the perineal body?',
      options: [
        { id: 'ischiocavernosus', text: 'Ischiocavernosus' },
        { id: 'bulbospongiosus', text: 'Bulbospongiosus' },
        { id: 'levator', text: 'Levator ani' },
        { id: 'deep-transverse', text: 'Deep transverse perinei' },
      ],
      answerId: 'ischiocavernosus',
      explanation: 'Ischiocavernosus runs from the ischial ramus forward over the crus.',
    },
    {
      id: 'pr-dividing-line',
      prompt: 'The line dividing the perineum into its two triangles joins the:',
      options: [
        { id: 'tuberosities', text: 'Front of the two ischial tuberosities' },
        { id: 'spines', text: 'Two ischial spines' },
        { id: 'asis', text: 'Two anterior superior iliac spines' },
        { id: 'coccyx-pubis', text: 'Coccyx and pubic symphysis' },
      ],
      answerId: 'tuberosities',
      explanation: 'It passes just in front of the anus.',
    },
    {
      id: 'pr-anal-contents',
      prompt: 'The anal triangle contains:',
      options: [
        { id: 'canal-fossae', text: 'The anal canal and the two ischioanal fossae' },
        { id: 'bulb', text: 'The bulb of the penis' },
        { id: 'crura', text: 'The crura of the penis' },
        { id: 'bulbourethral', text: 'The bulbourethral glands' },
      ],
      answerId: 'canal-fossae',
      explanation: 'The others lie in the urogenital triangle.',
    },
  ],
  cards: [
    {
      id: 'pr-deep-boundaries',
      front: 'Deep boundaries of the perineum?',
      back: 'Front: pubic arch and inferior pubic ligament. Back: coccyx. Sides: ischiopubic rami, ischial tuberosities, sacrotuberous ligaments.',
    },
    {
      id: 'pr-triangles',
      front: 'Divisions of the perineum?',
      back: 'Line between the ischial tuberosities: urogenital triangle in front, anal triangle behind.',
    },
    {
      id: 'pr-body-muscles',
      front: 'Muscles attached to the perineal body?',
      back: 'External anal sphincter, longitudinal muscle of the anal canal; paired bulbospongiosus, superficial and deep transverse perinei, levator ani.',
    },
    {
      id: 'pr-body-site',
      front: 'Where is the perineal body?',
      back: 'In the midline about 1.25 cm in front of the anal margin, behind the bulb of the penis.',
    },
    {
      id: 'pr-nerve',
      front: 'Chief nerve of the perineum?',
      back: 'Pudendal nerve, S2 to S4.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 28 Perineum', pages: '409–410' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '452, 496–497' },
  ],
};
