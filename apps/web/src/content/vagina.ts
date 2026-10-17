import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  FEMALE_ORGANS_SIDE,
  FEMALE_PELVIS_CREDIT,
  PELVIC_FLOOR,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  TRACES,
  VAGINA_OBLIQUE,
} from './pelvis-3d';

// Pelvis batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const vagina: Topic = {
  slug: 'vagina',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The vagina and the ureter in the female pelvis',
  summary:
    'The vagina’s direction, walls and fornices, what lies in front of, behind and beside each part of it, its arteries, lymph and nerves, the ureter’s course past the cervix, and what a vaginal examination can feel.',
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
      'Volume 2, Chapter 31 Female Reproductive Organs: vagina and the ureter in the female pelvis, pages 457 to 460',
    ),
    bookSource('grays-anatomy', 'Chapter 5 Pelvis and Perineum: vagina, pages 473 to 474'),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'Bony pelvis, pelvic floor, bladder, rectum and ureters in the 3D view; the organs drawn as outlines',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'A fibromuscular canal from the vulva to the uterus, behind the bladder and urethra and in front of the rectum and anal canal, running up and back. Its front wall is about 8 cm long and its back wall about 10 cm; it widens upwards, and stretches enough for the fetal head.',
    'The cervix enters its upper front wall, so the vault round it forms a groove, the fornices: the anterior shallowest, the posterior deepest, and a lateral fornix on each side. The posterior fornix lies against the rectouterine pouch.',
    'In front: the bladder base above, the urethra below. Behind: the rectouterine pouch for the upper quarter, the rectum for the middle half, the perineal body (separating it from the anal canal) for the lower quarter. At the sides: the cardinal ligament with the ureter and uterine artery above, levator ani in the middle, and below the perineal membrane the bulb of the vestibule, bulbospongiosus and the greater vestibular gland.',
    'Its main artery is the vaginal artery of the internal iliac, with the uterine artery above and the middle rectal and internal pudendal below. Lymph from the upper third goes to the external iliac nodes, from the middle third to the internal iliac and from the lower third to the superficial inguinal nodes.',
    'Only the lower third feels pain, through the pudendal nerve; the upper two-thirds have autonomic nerves only. The ureter runs forward about 2 cm lateral to the cervix, just above the lateral fornix, under the uterine artery, and the left ureter lies closer to the vagina.',
  ],
  visual: {
    kind: 'path',
    // Left: the vagina and what lies round it. Right: its vault, supply and nerves.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'vagina', label: 'Vagina', name: 'Vagina', x: 180, y: 30 },
        {
          id: 'anterior-wall',
          label: 'Front: bladder,\nurethra',
          name: 'Front wall, 8 cm: the bladder base above, the urethra below',
          x: 85,
          y: 100,
        },
        {
          id: 'pouch',
          label: 'Back, upper:\nrectouterine pouch',
          name: 'Back wall, upper quarter: the rectouterine pouch',
          x: 85,
          y: 165,
        },
        {
          id: 'rectum',
          label: 'Back, middle:\nrectum',
          name: 'Back wall, middle half: the rectum',
          x: 85,
          y: 230,
        },
        {
          id: 'perineal-body',
          label: 'Back, lower:\nperineal body',
          name: 'Back wall, lower quarter: the perineal body, then the anal canal',
          x: 85,
          y: 295,
        },
        {
          id: 'ureter',
          label: 'Side, upper:\nureter',
          name: 'Side, upper third: the cardinal ligament with the ureter crossed by the uterine artery',
          x: 85,
          y: 360,
        },
        {
          id: 'levator',
          label: 'Side, middle:\nlevator ani',
          name: 'Side, middle third: the pubococcygeus part of levator ani',
          x: 85,
          y: 420,
        },
        {
          id: 'fornices',
          label: 'Fornices round\nthe cervix',
          name: 'Fornices round the cervix: anterior, lateral and posterior',
          x: 275,
          y: 100,
        },
        {
          id: 'posterior-fornix',
          label: 'Posterior fornix:\ndeepest',
          name: 'Posterior fornix, the deepest, against the rectouterine pouch',
          x: 275,
          y: 165,
        },
        {
          id: 'vaginal-artery',
          label: 'Vaginal artery',
          name: 'Vaginal artery of the internal iliac, with the uterine above',
          x: 275,
          y: 230,
        },
        {
          id: 'lymph',
          label: 'External, internal\niliac, inguinal',
          name: 'Lymph: upper third external iliac, middle internal iliac, lower superficial inguinal',
          x: 275,
          y: 295,
        },
        {
          id: 'pudendal',
          label: 'Lower third:\npudendal, painful',
          name: 'The lower third, supplied by the pudendal nerve, feels pain',
          x: 275,
          y: 360,
        },
        {
          id: 'autonomic',
          label: 'Upper two-thirds:\nautonomic',
          name: 'The upper two-thirds have autonomic nerves only and feel no pain',
          x: 275,
          y: 420,
        },
      ],
      edges: [
        { from: 'vagina', to: 'anterior-wall' },
        { from: 'anterior-wall', to: 'pouch' },
        { from: 'pouch', to: 'rectum' },
        { from: 'rectum', to: 'perineal-body' },
        { from: 'perineal-body', to: 'ureter' },
        { from: 'ureter', to: 'levator' },
        { from: 'vagina', to: 'fornices' },
        { from: 'fornices', to: 'posterior-fornix' },
        { from: 'posterior-fornix', to: 'vaginal-artery' },
        { from: 'vaginal-artery', to: 'lymph' },
        { from: 'lymph', to: 'pudendal' },
        { from: 'pudendal', to: 'autonomic' },
      ],
    },
    lesions: [
      {
        id: 'colpotomy',
        label: 'Pus in the pouch',
        nodeIds: ['posterior-fornix', 'pouch'],
        explanation:
          'The rectouterine pouch, the lowest part of the peritoneal cavity, lies just behind the posterior fornix: pus collecting there can be drained by a cut through the fornix (posterior colpotomy).',
      },
      {
        id: 'prolapse',
        label: 'Prolapsed walls',
        nodeIds: ['anterior-wall', 'rectum'],
        explanation:
          'A weakened front wall sags and drags down the bladder (cystocoele) and urethra (urethrocoele); a weakened back wall brings the rectum with it (rectocoele). Injury to the walls can leave fistulae into the bladder, urethra or rectum.',
      },
      {
        id: 'ureter-hysterectomy',
        label: 'Ureter at the cervix',
        nodeIds: ['ureter', 'fornices'],
        explanation:
          'Just above the lateral fornix the ureter passes forward 2 cm from the cervix under the uterine artery; it is at risk when the artery is tied or the vault is clamped, the left one most, as it lies closer to the vagina.',
      },
    ],
    drill: [
      {
        id: 'relations',
        title: 'Relations',
        hint: 'What lies in front, then behind from top to bottom, then at the side from top down.',
        nodeIds: ['anterior-wall', 'pouch', 'rectum', 'perineal-body', 'ureter', 'levator'],
      },
      {
        id: 'vault-supply',
        title: 'Vault, supply and nerves',
        hint: 'The groove round the cervix and its deepest part, then the artery, the three lymph routes and the two nerve supplies.',
        nodeIds: [
          'fornices',
          'posterior-fornix',
          'vaginal-artery',
          'lymph',
          'pudendal',
          'autonomic',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: FEMALE_PELVIS_CREDIT,
      parts: pelvisParts(
        [...PELVIS_SKELETON, ...PELVIC_FLOOR, 'urinary-bladder', 'rectum', 'ureters'],
        ['hip-bones', 'obturator-internus', 'levator-ani', 'urinary-bladder', 'rectum'],
      ),
      traces: [
        { id: 'vagina', ...TRACES.vagina },
        { id: 'fornices', ...TRACES.uterusSagittal },
        { id: 'ureter', ...TRACES.uterineArteries },
        { id: 'perineal-body', ...TRACES.perinealBody },
      ],
      stops: [VAGINA_OBLIQUE, FEMALE_ORGANS_SIDE],
    },
  },
  lesson: [
    {
      id: 'canal',
      title: 'Direction and size',
      body: 'The vagina is a fibromuscular canal from the vulva to the uterus. It lies behind the bladder and urethra and in front of the rectum and anal canal, and runs up and back, meeting the axis of the uterus at about 90 degrees. Its front wall is about 8 cm long and its back wall about 10 cm. It widens from about 2.5 cm below to about 5 cm at the vault and stretches enough for the fetal head. Its lumen is round at the top round the cervix, a transverse slit in the middle and H-shaped below; the hymen partly closes its lower end.',
      focus: ['anterior-wall'],
    },
    {
      id: 'fornices',
      title: 'The fornices',
      body: 'The cervix projects through the upper front wall, so the vault forms a circular groove round it, deepening from front to back. It is divided into the anterior fornix, the shallowest, the posterior fornix, the deepest, and a lateral fornix on each side. Through the posterior fornix the finger reaches the rectouterine pouch (of Douglas), the lowest part of the peritoneal cavity.',
      focus: ['fornices', 'posterior-fornix'],
    },
    {
      id: 'relations',
      title: 'Relations',
      body: 'In front, the upper half of the vagina lies against the bladder base and the lower half against the urethra. Behind, its upper quarter is covered by the rectouterine pouch, its middle half lies on the rectum with loose tissue between, and its lower quarter is separated from the anal canal by the perineal body. At each side, the upper third lies against the cardinal ligament, with its vaginal veins and the ureter crossed by the uterine artery. The middle third lies against pubococcygeus. The lower third pierces the perineal membrane and meets the bulb of the vestibule, bulbospongiosus and the duct of the greater vestibular gland.',
      focus: ['anterior-wall', 'pouch', 'rectum', 'perineal-body', 'ureter', 'levator'],
    },
    {
      id: 'supply',
      title: 'Supply and nerves',
      body: 'The vagina is very vascular. Its main artery is the vaginal artery of the internal iliac, with the cervicovaginal branch of the uterine artery above and the middle rectal and internal pudendal arteries below; their branches join into midline vaginal azygos arteries. A venous plexus drains to the internal iliac veins. Lymph from the upper third goes to the external iliac nodes, from the middle third to the internal iliac, and from the lower third to the medial superficial inguinal nodes. The lower third feels pain, through branches of the pudendal nerve; the upper two-thirds, with autonomic supply only (sympathetic L1, L2 and parasympathetic S2 to S4), do not. Its lining is non-keratinised stratified squamous epithelium without glands, kept acid by bacteria fermenting glycogen.',
      focus: ['vaginal-artery', 'lymph', 'pudendal', 'autonomic'],
    },
    {
      id: 'ureter',
      title: 'The ureter in the female pelvis',
      body: 'The ureter crosses the brim in front of the internal iliac artery and runs down behind the ovary, forming the back of the ovarian fossa, as far as the ischial spine. It then turns forward and medially in the base of the broad ligament. There the uterine artery runs above and in front of it, then crosses it, about 2 cm lateral to the supravaginal cervix and just above the lateral fornix. It then passes beside the vagina to the bladder; the left ureter is often the closer, as the uterus leans right. On vaginal examination one can feel the urethra, bladder and symphysis in front, the rectum and pouch behind, the ovary, tube, ligaments and ureters at the sides, and the cervix above.',
      focus: ['ureter', 'fornices'],
    },
  ],
  questions: [
    {
      id: 'vg-deepest',
      prompt: 'The deepest fornix of the vagina is the:',
      options: [
        { id: 'posterior', text: 'Posterior fornix' },
        { id: 'anterior', text: 'Anterior fornix' },
        { id: 'lateral', text: 'Lateral fornix' },
        { id: 'same', text: 'All are equally deep' },
      ],
      answerId: 'posterior',
      explanation: 'It lies against the rectouterine pouch, which can be drained through it.',
    },
    {
      id: 'vg-lymph-lower',
      prompt: 'Lymph from the lower third of the vagina drains to the:',
      options: [
        { id: 'inguinal', text: 'Superficial inguinal nodes' },
        { id: 'external-iliac', text: 'External iliac nodes' },
        { id: 'internal-iliac', text: 'Internal iliac nodes' },
        { id: 'aortic', text: 'Aortic nodes' },
      ],
      answerId: 'inguinal',
      explanation: 'Upper third to external iliac, middle third to internal iliac.',
    },
    {
      id: 'vg-posterior-lower',
      prompt:
        'The lower quarter of the back wall of the vagina is separated from the anal canal by the:',
      options: [
        { id: 'perineal-body', text: 'Perineal body' },
        { id: 'pouch', text: 'Rectouterine pouch' },
        { id: 'loose', text: 'Loose connective tissue only' },
        { id: 'levator', text: 'Iliococcygeus' },
      ],
      answerId: 'perineal-body',
      explanation: 'The pouch covers the upper quarter, the rectum lies behind the middle half.',
    },
    {
      id: 'vg-pain',
      prompt: 'Which part of the vagina is sensitive to pain?',
      options: [
        { id: 'lower', text: 'The lower third, through the pudendal nerve' },
        { id: 'upper', text: 'The upper third, through sympathetic nerves' },
        { id: 'vault', text: 'The vault round the cervix' },
        { id: 'all', text: 'All of it equally' },
      ],
      answerId: 'lower',
      explanation: 'The upper two-thirds have autonomic supply only and do not feel pain.',
    },
  ],
  cards: [
    {
      id: 'vg-length',
      front: 'Lengths of the vaginal walls?',
      back: 'Front wall about 8 cm, back wall about 10 cm.',
    },
    {
      id: 'vg-anterior',
      front: 'Anterior relations of the vagina?',
      back: 'Bladder base for the upper half, urethra for the lower half.',
    },
    {
      id: 'vg-lateral',
      front: 'Lateral relations of the vagina, top to bottom?',
      back: 'Cardinal ligament with the ureter and uterine artery; pubococcygeus; below the perineal membrane, the bulb of the vestibule, bulbospongiosus and the greater vestibular gland.',
    },
    {
      id: 'vg-artery',
      front: 'Main artery of the vagina?',
      back: 'The vaginal artery of the internal iliac; also the uterine, middle rectal and internal pudendal arteries.',
    },
    {
      id: 'vg-ureter',
      front: 'Where does the uterine artery cross the ureter?',
      back: 'About 2 cm lateral to the supravaginal cervix, just above the lateral fornix; the artery passes above the ureter.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 31 Female Reproductive Organs',
      pages: '457–460',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '473–474' },
  ],
};
