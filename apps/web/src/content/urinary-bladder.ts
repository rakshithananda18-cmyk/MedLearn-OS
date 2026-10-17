import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  BLADDER_BASE_BEHIND,
  MALE_PELVIS_SIDE,
  PELVIC_FLOOR,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
} from './pelvis-3d';

// Pelvis batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const urinaryBladder: Topic = {
  slug: 'urinary-bladder',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The urinary bladder',
  summary:
    'The bladder empty and full, its apex, base, neck and surfaces with their relations in each sex, its true and false ligaments, the trigone inside, its capacity, vessels and nerves, and how it empties.',
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
      'Volume 2, Chapter 30 Urinary Bladder and Urethra: urinary bladder, pages 434 to 438; micturition, page 442',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: ureters and bladder, pages 455 to 456',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bony pelvis, pelvic floor, bladder and male organs in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'A muscular reservoir in the front of the lesser pelvis. Empty, it lies wholly in the pelvis and is a tetrahedron: an apex forwards, a base backwards, a neck below, a superior and two inferolateral surfaces. Filling, it rises into the abdomen as an ovoid, towards the umbilicus.',
    'The apex is tied to the umbilicus by the median umbilical ligament, the remnant of the urachus. The neck, lowest and most fixed, lies 3 to 4 cm behind the lower pubic symphysis. Behind the base in men are the rectovesical pouch above, and the seminal vesicles and ends of the ductus deferens below; in women, the cervix and vagina.',
    'A full bladder’s inferolateral surfaces face forwards, and their lower part touches the abdominal wall with no peritoneum between: it can be opened above the pubis (suprapubic cystostomy) without entering the peritoneal cavity.',
    'Inside, the mucosa is folded except over the trigone, where it is smooth and fixed to the muscle: the internal urethral orifice at its lower angle, the ureteric openings at its upper angles, 2.5 cm apart when empty and 5 cm when full, joined by the interureteric ridge.',
    'Superior and inferior vesical arteries (internal iliac); a vesical venous plexus to the internal iliac veins; lymph mainly to external iliac nodes. Parasympathetic S2 to S4 (pelvic splanchnic nerves) contracts the detrusor; sympathetic T11 to L2 relaxes it and closes the male bladder neck; the pudendal nerve supplies the voluntary urethral sphincter.',
  ],
  visual: {
    kind: 'path',
    // Left: the bladder's parts and their relations. Right: the interior, supports and supply.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'bladder', label: 'Urinary bladder', name: 'Urinary bladder', x: 180, y: 30 },
        {
          id: 'apex',
          label: 'Apex: median\numbilical ligament',
          name: 'Apex, tied to the umbilicus by the median umbilical ligament (urachus)',
          x: 85,
          y: 100,
        },
        {
          id: 'superior-surface',
          label: 'Superior surface:\nperitoneum',
          name: 'Superior surface, covered by peritoneum, with ileum and sigmoid colon on it',
          x: 85,
          y: 165,
        },
        {
          id: 'inferolateral',
          label: 'Inferolateral:\nretropubic fat',
          name: 'Inferolateral surfaces, on the retropubic fat, levator ani and obturator internus',
          x: 85,
          y: 225,
        },
        {
          id: 'base',
          label: 'Base: vesicles,\nductus, rectum',
          name: 'Base: seminal vesicles and ductus deferens, rectum behind; cervix and vagina in women',
          x: 85,
          y: 290,
        },
        {
          id: 'neck',
          label: 'Neck: most fixed',
          name: 'Neck, the lowest and most fixed part, 3 to 4 cm behind the pubic symphysis',
          x: 85,
          y: 355,
        },
        {
          id: 'urethra',
          label: 'Internal urethral\norifice',
          name: 'Internal urethral orifice, into the urethra',
          x: 85,
          y: 415,
        },
        {
          id: 'trigone',
          label: 'Trigone: smooth',
          name: 'Trigone, the smooth triangle over the lower base',
          x: 275,
          y: 100,
        },
        {
          id: 'ureteric-openings',
          label: 'Ureteric openings',
          name: 'Ureteric openings at the upper angles, 2.5 cm apart when empty',
          x: 275,
          y: 165,
        },
        {
          id: 'true-ligaments',
          label: 'True ligaments',
          name: 'True ligaments: puboprostatic (pubovesical), lateral and posterior, of pelvic fascia',
          x: 275,
          y: 225,
        },
        {
          id: 'vesical-arteries',
          label: 'Superior and\ninferior vesical',
          name: 'Superior and inferior vesical arteries, from the internal iliac',
          x: 275,
          y: 290,
        },
        {
          id: 'parasympathetic',
          label: 'S2 to S4: detrusor',
          name: 'Parasympathetic S2 to S4, the pelvic splanchnic nerves, contract the detrusor',
          x: 275,
          y: 355,
        },
        {
          id: 'sympathetic',
          label: 'T11 to L2: neck',
          name: 'Sympathetic T11 to L2: relaxes the detrusor, closes the male bladder neck',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'bladder', to: 'apex' },
        { from: 'apex', to: 'superior-surface' },
        { from: 'superior-surface', to: 'inferolateral' },
        { from: 'inferolateral', to: 'base' },
        { from: 'base', to: 'neck' },
        { from: 'neck', to: 'urethra' },
        { from: 'bladder', to: 'trigone' },
        { from: 'trigone', to: 'ureteric-openings' },
        { from: 'ureteric-openings', to: 'true-ligaments' },
        { from: 'true-ligaments', to: 'vesical-arteries' },
        { from: 'vesical-arteries', to: 'parasympathetic' },
        { from: 'parasympathetic', to: 'sympathetic' },
      ],
    },
    lesions: [
      {
        id: 'suprapubic',
        label: 'Suprapubic cystostomy',
        nodeIds: ['inferolateral', 'superior-surface'],
        explanation:
          'Filled with about 300 ml, the bladder lifts the peritoneum off the lower abdominal wall, so it can be reached through an incision just above the pubis without entering the peritoneal cavity.',
      },
      {
        id: 'automatic',
        label: 'Spinal cord injury',
        nodeIds: ['parasympathetic', 'sympathetic'],
        explanation:
          'Cut above the sacral segments, the cord first goes into spinal shock: the bladder distends and dribbles. Within days it empties by reflex every few hours (automatic bladder). Destroy the sacral segments themselves and the bladder stays flaccid, fills and overflows (autonomous bladder).',
      },
      {
        id: 'enlarged-prostate',
        label: 'Outflow obstruction',
        nodeIds: ['neck', 'trigone'],
        explanation:
          'An enlarged prostate blocking the outflow makes the detrusor work harder: its bundles thicken into ridges and the lining between them bulges (a trabeculated bladder); the middle lobe lifts the floor behind the urethral orifice.',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'Parts and relations',
        hint: 'From the apex in front, over the surfaces to the base behind, then down to the neck and its opening.',
        nodeIds: ['apex', 'superior-surface', 'inferolateral', 'base', 'neck', 'urethra'],
      },
      {
        id: 'inside-supply',
        title: 'Inside, supports and supply',
        hint: 'The smooth triangle and its openings, what holds it, then its arteries and nerves.',
        nodeIds: [
          'trigone',
          'ureteric-openings',
          'true-ligaments',
          'vesical-arteries',
          'parasympathetic',
          'sympathetic',
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
          'urinary-bladder',
          'ureters',
          'prostate',
          'seminal-vesicles',
          'ductus-deferens',
          'urethra',
          'rectum',
          'iliac-arteries',
        ],
        ['hip-bones', 'obturator-internus', 'levator-ani', 'rectum'],
      ),
      traces: [],
      stops: [MALE_PELVIS_SIDE, BLADDER_BASE_BEHIND],
    },
  },
  lesson: [
    {
      id: 'shape',
      title: 'Empty and full',
      body: 'The bladder stores urine in the front of the lesser pelvis. Its size, shape and position follow how full it is. Empty, it lies wholly within the pelvis and is a tetrahedron, with an apex pointing forwards, a base backwards, a neck below, a superior surface and two inferolateral surfaces. Full, it becomes ovoid and rises out of the pelvis into the abdomen, towards the umbilicus or above. Its muscle, the detrusor, runs in whorls and spirals made for one mass contraction, not peristalsis.',
      focus: ['apex', 'superior-surface', 'inferolateral'],
    },
    {
      id: 'relations',
      title: 'Relations',
      body: 'The apex is tied to the umbilicus by the median umbilical ligament, the obliterated urachus. In men the superior surface is wholly covered by peritoneum, with coils of ileum and sigmoid colon on it; in women the peritoneum turns from it onto the uterus as the vesicouterine pouch. The inferolateral surfaces have no peritoneum: they lie on the retropubic fat, the puboprostatic (in women pubovesical) ligaments, levator ani and obturator internus. Behind the base in men, the rectovesical pouch lies above, and the seminal vesicles and ends of the ductus deferens below, with the rectovesical fascia (of Denonvilliers) between them and the rectum. In women the cervix and vagina lie behind it.',
      focus: ['apex', 'superior-surface', 'inferolateral', 'base'],
    },
    {
      id: 'neck-ligaments',
      title: 'Neck and ligaments',
      body: 'The neck is the lowest and most fixed part, 3 to 4 cm behind the lower pubic symphysis, pierced by the internal urethral orifice. In men it rests on the prostate, and a collar of smooth muscle with its own sympathetic supply surrounds it (the preprostatic sphincter). The true ligaments are condensations of pelvic fascia round the neck and base: the medial and lateral puboprostatic or pubovesical ligaments, the lateral true ligaments to the tendinous arch, and the posterior ligaments along the vesical veins. The peritoneal folds over it are false ligaments and give no support.',
      focus: ['neck', 'urethra', 'true-ligaments'],
    },
    {
      id: 'inside',
      title: 'The trigone',
      body: 'Inside an empty bladder the lining lies in folds, loosely attached to the muscle, except over the trigone, a smooth triangle on the lower base where it is firmly fixed. The internal urethral orifice is at its lower front angle; the ureters open at its upper angles, 2.5 cm apart when empty and about 5 cm when full, joined by the interureteric ridge. Behind the urethral orifice, the middle lobe of the prostate may raise a small bump, the uvula vesicae. The bladder holds about 220 ml before the urge to empty it; over 500 ml becomes painful. Its lining is transitional epithelium.',
      focus: ['trigone', 'ureteric-openings'],
    },
    {
      id: 'supply',
      title: 'Supply and emptying',
      body: 'The superior and inferior vesical arteries of the internal iliac supply it, with help from the obturator and inferior gluteal arteries; in women the uterine and vaginal arteries replace the inferior vesical. A venous plexus on the inferolateral surfaces drains back to the internal iliac veins; lymph goes mainly to the external iliac nodes. The pelvic splanchnic nerves (S2 to S4) contract the detrusor and carry the sense of fullness. Sympathetic fibres (T11 to L2) relax it and close the male bladder neck during ejaculation. The pudendal nerve supplies the voluntary sphincter in the urethral wall. To empty it, the perineal muscles relax and the abdominal wall contracts, then the detrusor contracts as the urethral sphincters open.',
      focus: ['vesical-arteries', 'parasympathetic', 'sympathetic'],
    },
  ],
  questions: [
    {
      id: 'ub-fixed',
      prompt: 'The most fixed part of the urinary bladder is its:',
      options: [
        { id: 'neck', text: 'Neck' },
        { id: 'apex', text: 'Apex' },
        { id: 'superior', text: 'Superior surface' },
        { id: 'base', text: 'Base' },
      ],
      answerId: 'neck',
      explanation:
        'The neck, held by the puboprostatic ligaments and the prostate, lies 3 to 4 cm behind the lower pubic symphysis.',
    },
    {
      id: 'ub-trigone',
      prompt: 'The lining over the trigone is smooth because:',
      options: [
        { id: 'fixed', text: 'It is firmly attached to the muscle coat' },
        { id: 'peritoneum', text: 'It is covered by peritoneum' },
        { id: 'no-muscle', text: 'There is no muscle beneath it' },
        { id: 'distended', text: 'That part is always distended' },
      ],
      answerId: 'fixed',
      explanation: 'Elsewhere the lining is loosely attached and folds when the bladder is empty.',
    },
    {
      id: 'ub-detrusor',
      prompt: 'Which nerves contract the detrusor muscle?',
      options: [
        { id: 'pelvic-splanchnic', text: 'Pelvic splanchnic nerves, S2 to S4' },
        { id: 'sympathetic', text: 'Sympathetic fibres, T11 to L2' },
        { id: 'pudendal', text: 'Pudendal nerve' },
        { id: 'obturator', text: 'Obturator nerve' },
      ],
      answerId: 'pelvic-splanchnic',
      explanation:
        'Destroy them and normal emptying is lost; the pudendal nerve supplies the voluntary sphincter.',
    },
    {
      id: 'ub-suprapubic',
      prompt:
        'A distended bladder can be opened above the pubis without entering the peritoneum because:',
      options: [
        { id: 'strips', text: 'It lifts the peritoneum off the lower abdominal wall' },
        { id: 'retroperitoneal', text: 'The bladder has no peritoneum at all' },
        { id: 'apex', text: 'Its apex is bare' },
        { id: 'urachus', text: 'The urachus holds the peritoneum down' },
      ],
      answerId: 'strips',
      explanation:
        'Its front then touches the abdominal wall directly, below the reflected peritoneum.',
    },
  ],
  cards: [
    {
      id: 'ub-empty-shape',
      front: 'Parts of the empty bladder?',
      back: 'Apex (forwards), base (backwards), neck (below), superior and two inferolateral surfaces.',
    },
    {
      id: 'ub-base-male',
      front: 'Relations of the base in the male?',
      back: 'Rectovesical pouch above; seminal vesicles and ends of the ductus deferens below; Denonvilliers’ fascia between them and the rectum.',
    },
    {
      id: 'ub-ureteric-gap',
      front: 'Distance between the ureteric openings?',
      back: '2.5 cm in the empty bladder, about 5 cm when distended.',
    },
    {
      id: 'ub-arteries',
      front: 'Arteries of the bladder?',
      back: 'Superior and inferior vesical (internal iliac); also obturator and inferior gluteal; uterine and vaginal in women.',
    },
    {
      id: 'ub-capacity',
      front: 'Capacity of the adult bladder?',
      back: 'About 220 ml before the urge to empty it; over 500 ml becomes painful.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 30 Urinary Bladder and Urethra',
      pages: '434–438, 442',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '455–456' },
  ],
};
