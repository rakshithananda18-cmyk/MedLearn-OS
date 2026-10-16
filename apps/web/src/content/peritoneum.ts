import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  ORGANS_FRONT,
  ORGANS_SIDE,
  ORGANS_SKELETON,
  PERITONEAL_FOLDS,
  VISCERA,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const peritoneum: Topic = {
  slug: 'peritoneum',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Peritoneum: layers, relations and functions',
  summary:
    'The serous sac of the abdomen: its parietal and visceral layers and why they hurt differently, which organs lie inside it and which behind it, what it does, and fluid, air and infection in the cavity.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.1',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource(
      'bd-chaurasia',
      'Volume 2, Chapter 18 Abdominal Cavity and Peritoneum: peritoneum, its functions and clinical anatomy, pages 271 to 274 and 288',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: peritoneum and peritoneal cavity, pages 300 to 301',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Organs, mesentery and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
    {
      title: 'Z-Anatomy',
      detail: 'Liver, omenta, transverse mesocolon and sigmoid colon in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Parietal peritoneum lines the walls and the underside of the diaphragm; it shares the walls’ somatic nerves, so it is pain-sensitive and pain from it is sharp and localized. Visceral peritoneum covers the organs, shares their autonomic nerves and hurts only when they are stretched, distended or ischaemic.',
    'Intraperitoneal (on a fold): stomach, jejunum, ileum, caecum, appendix, transverse and sigmoid colon. Partly covered: ascending and descending colon and rectum. Retroperitoneal: duodenum, pancreas, kidneys, ureters, suprarenals. Subperitoneal: bladder, prostate, seminal vesicles, cervix and vagina.',
    'The peritoneal cavity is a potential space with a film of fluid: the large greater sac and, behind the stomach, the lesser sac, joined by the epiploic foramen. In the male it is closed; in the female it opens to the exterior through the uterine tubes.',
    'Functions: a slippery surface for moving viscera; defence (macrophages; the greater omentum walls off infection); absorption and dialysis; healing and adhesions; fat storage; a route for vessels and nerves.',
    'Gut pain is referred by origin: foregut to the epigastrium, midgut round the umbilicus, hindgut to the suprapubic region.',
  ],
  visual: {
    kind: 'path',
    // Left: the two layers and the cavity. Right: organs by their relation, and what it does.
    diagram: {
      width: 360,
      height: 480,
      nodes: [
        { id: 'peritoneum-overview', label: 'Peritoneum', name: 'Peritoneum', x: 180, y: 30 },
        {
          id: 'parietal-peritoneum',
          label: 'Parietal: somatic,\nsharp pain',
          name: 'Parietal peritoneum: lines the walls, somatic nerves, sharp localized pain',
          x: 85,
          y: 100,
        },
        {
          id: 'visceral-peritoneum',
          label: 'Visceral:\nautonomic',
          name: 'Visceral peritoneum: covers organs, autonomic nerves, pain on stretch',
          x: 85,
          y: 165,
        },
        {
          id: 'peritoneal-cavity',
          label: 'Cavity: a\npotential space',
          name: 'Peritoneal cavity: a potential space with a film of fluid',
          x: 85,
          y: 230,
        },
        {
          id: 'greater-sac',
          label: 'Greater sac',
          name: 'Greater sac',
          x: 85,
          y: 290,
        },
        {
          id: 'lesser-sac',
          label: 'Lesser sac',
          name: 'Lesser sac (omental bursa), behind the stomach',
          x: 85,
          y: 345,
        },
        {
          id: 'female-opening',
          label: 'Female: open via\nuterine tubes',
          name: 'In the female the cavity opens to the exterior through the uterine tubes',
          x: 85,
          y: 410,
        },
        {
          id: 'intraperitoneal',
          label: 'Intraperitoneal:\non a fold',
          name: 'Intraperitoneal: stomach, jejunum, ileum, caecum, appendix, transverse and sigmoid colon',
          x: 275,
          y: 100,
        },
        {
          id: 'partly-covered',
          label: 'Partly covered:\nascending, descending',
          name: 'Partly covered: ascending and descending colon, rectum',
          x: 270,
          y: 165,
        },
        {
          id: 'retroperitoneal',
          label: 'Retroperitoneal',
          name: 'Retroperitoneal: duodenum, pancreas, kidneys, ureters, suprarenals',
          x: 275,
          y: 225,
        },
        {
          id: 'subperitoneal',
          label: 'Subperitoneal:\nbladder, prostate',
          name: 'Subperitoneal: bladder, prostate, seminal vesicles, cervix, vagina',
          x: 275,
          y: 290,
        },
        {
          id: 'peritoneal-functions',
          label: 'Movement, defence,\nabsorption',
          name: 'Functions: movement, defence, absorption and dialysis, healing, fat storage, passage of vessels',
          x: 275,
          y: 355,
        },
        {
          id: 'referred-gut-pain',
          label: 'Gut pain: epi-,\numbilical, supra-',
          name: 'Referred gut pain: foregut epigastric, midgut umbilical, hindgut suprapubic',
          x: 275,
          y: 420,
        },
      ],
      edges: [
        { from: 'peritoneum-overview', to: 'parietal-peritoneum' },
        { from: 'parietal-peritoneum', to: 'visceral-peritoneum' },
        { from: 'visceral-peritoneum', to: 'peritoneal-cavity' },
        { from: 'peritoneal-cavity', to: 'greater-sac' },
        { from: 'greater-sac', to: 'lesser-sac' },
        { from: 'lesser-sac', to: 'female-opening' },
        { from: 'peritoneum-overview', to: 'intraperitoneal' },
        { from: 'intraperitoneal', to: 'partly-covered' },
        { from: 'partly-covered', to: 'retroperitoneal' },
        { from: 'retroperitoneal', to: 'subperitoneal' },
        { from: 'subperitoneal', to: 'peritoneal-functions' },
        { from: 'visceral-peritoneum', to: 'referred-gut-pain' },
      ],
    },
    lesions: [
      {
        id: 'ascites',
        label: 'Ascites and tapping',
        nodeIds: ['peritoneal-cavity'],
        explanation:
          'Free fluid in the cavity, from cirrhosis, tuberculous peritonitis, heart failure or cancer. It is drained (paracentesis) in the midline halfway between the umbilicus and the pubic symphysis, or just above the anterior superior iliac spine, after the bladder has been emptied.',
      },
      {
        id: 'peritonitis',
        label: 'Peritonitis',
        nodeIds: ['parietal-peritoneum', 'peritoneal-functions'],
        explanation:
          'Infection from a perforated appendix, ulcer or typhoid ulcer, a wound, or up the female genital tract. Inflamed parietal peritoneum gives sharp local pain, rebound tenderness and board-like rigidity of the wall; the greater omentum moves in to seal the leak.',
      },
      {
        id: 'pneumoperitoneum',
        label: 'Air under the diaphragm',
        nodeIds: ['peritoneal-cavity', 'intraperitoneal'],
        explanation:
          'A perforated stomach or intestine lets air into the cavity (pneumoperitoneum), seen under the diaphragm on an erect X-ray.',
      },
    ],
    drill: [
      {
        id: 'layers',
        title: 'Layers and cavity',
        hint: 'Two layers, the space, its two sacs, and the female difference.',
        nodeIds: [
          'parietal-peritoneum',
          'visceral-peritoneum',
          'peritoneal-cavity',
          'greater-sac',
          'lesser-sac',
          'female-opening',
        ],
      },
      {
        id: 'relations',
        title: 'Organs and functions',
        hint: 'Four relations of organs, the functions, and where gut pain is felt.',
        nodeIds: [
          'intraperitoneal',
          'partly-covered',
          'retroperitoneal',
          'subperitoneal',
          'peritoneal-functions',
          'referred-gut-pain',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts([
        ...ORGANS_SKELETON,
        'diaphragm',
        ...VISCERA,
        ...PERITONEAL_FOLDS,
        'abdominal-aorta',
        'inferior-vena-cava',
      ]),
      traces: [],
      stops: [
        ORGANS_FRONT,
        {
          ...ORGANS_SIDE,
          description:
            'Front to back: the intraperitoneal organs hang forward on their folds; the kidneys, duodenum, pancreas, aorta and inferior vena cava lie flat on the posterior wall, behind the peritoneum.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'sac',
      title: 'A closed sac',
      body: 'The peritoneum is a serous membrane, fibrous tissue lined by mesothelium, shaped like a closed sac into which the organs have pushed. So it has a parietal layer on the walls, a visceral layer on the organs, and folds that suspend them. The cavity between the layers is only a potential space, with a film of fluid that lets the organs slide.',
      focus: ['peritoneum-overview', 'peritoneal-cavity'],
    },
    {
      id: 'layers',
      title: 'Parietal and visceral',
      body: 'Parietal peritoneum lines the abdominal and pelvic walls and the diaphragm, loosely attached so it strips easily. It comes from somatopleure and shares the walls’ vessels and somatic nerves (T7 to L1; the obturator nerve in the pelvis): pain from it is sharp and well placed. Visceral peritoneum is part of the organ it covers, comes from splanchnopleure, and shares the organ’s autonomic nerves: it hurts only on stretch, distension or ischaemia.',
      focus: ['parietal-peritoneum', 'visceral-peritoneum'],
    },
    {
      id: 'relations',
      title: 'Organs and the peritoneum',
      body: 'Organs on a fold are mobile: stomach, jejunum, ileum, caecum, appendix, transverse and sigmoid colon. The ascending and descending colon and the rectum are only partly covered. The duodenum, pancreas, kidneys, ureters and suprarenals are retroperitoneal, some having lost a mesentery in development. The bladder, prostate, seminal vesicles, cervix and vagina are subperitoneal.',
      focus: ['intraperitoneal', 'partly-covered', 'retroperitoneal', 'subperitoneal'],
    },
    {
      id: 'cavity',
      title: 'Greater and lesser sacs',
      body: 'The cavity has a large greater sac and a smaller lesser sac (omental bursa) behind the stomach, lesser omentum and liver, joined by the epiploic foramen. Small recesses off the cavity can trap gut (internal hernia). In the male the sac is closed; in the female it opens through the uterine tubes, and the peritoneum on the ovaries is cubical.',
      focus: ['greater-sac', 'lesser-sac', 'female-opening'],
    },
    {
      id: 'functions',
      title: 'What it does',
      body: 'It lets the viscera move: peristalsis, breathing, filling and emptying. It defends: phagocytes and lymphocytes in its fluid, and the greater omentum, which moves to wall off infection. It absorbs fluid, best below the diaphragm, which allows peritoneal dialysis. Its cells turn into fibroblasts to heal, which also makes adhesions. Its folds store fat and carry vessels and nerves.',
      focus: ['peritoneal-functions'],
    },
    {
      id: 'pain',
      title: 'Where gut pain is felt',
      body: 'Pain from foregut organs (stomach, upper duodenum, liver, pancreas) is felt in the epigastrium; from the midgut (small intestine to the right two thirds of the transverse colon) round the umbilicus; from the hindgut in the suprapubic region. When inflammation reaches the parietal peritoneum the pain moves to the organ’s own site.',
      focus: ['referred-gut-pain'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the front, find the organs hung on folds; from the side, those flat on the back wall. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'pt-parietal-pain',
      prompt:
        'Pain from inflamed parietal peritoneum is sharp and well localized because it is supplied by:',
      options: [
        { id: 'somatic', text: 'Somatic nerves of the body wall' },
        { id: 'sympathetic', text: 'Sympathetic nerves' },
        { id: 'vagus', text: 'The vagus' },
        { id: 'pelvic-splanchnic', text: 'Pelvic splanchnic nerves' },
      ],
      answerId: 'somatic',
      explanation: 'Visceral peritoneum has autonomic nerves and gives vague pain on stretch.',
    },
    {
      id: 'pt-retroperitoneal',
      prompt: 'Which of these is retroperitoneal?',
      options: [
        { id: 'pancreas', text: 'Pancreas' },
        { id: 'transverse-colon', text: 'Transverse colon' },
        { id: 'jejunum', text: 'Jejunum' },
        { id: 'spleen', text: 'Spleen' },
      ],
      answerId: 'pancreas',
      explanation: 'With the duodenum (beyond its first part), kidneys, ureters and suprarenals.',
    },
    {
      id: 'pt-female',
      prompt: 'In the female the peritoneal cavity communicates with the exterior through the:',
      options: [
        { id: 'tubes', text: 'Uterine tubes' },
        { id: 'umbilicus', text: 'Umbilicus' },
        { id: 'inguinal', text: 'Inguinal canals' },
        { id: 'none', text: 'Nowhere: it is closed' },
      ],
      answerId: 'tubes',
      explanation: 'Through the uterus and vagina; the male sac is closed.',
    },
    {
      id: 'pt-midgut-pain',
      prompt: 'Pain from a midgut organ is first felt:',
      options: [
        { id: 'umbilical', text: 'Round the umbilicus' },
        { id: 'epigastric', text: 'In the epigastrium' },
        { id: 'suprapubic', text: 'Above the pubis' },
        { id: 'loin', text: 'In the loin' },
      ],
      answerId: 'umbilical',
      explanation: 'Foregut pain is epigastric, hindgut pain suprapubic.',
    },
  ],
  cards: [
    {
      id: 'pt-layers-card',
      front: 'Parietal against visceral peritoneum?',
      back: 'Parietal: lines walls, somatopleure, somatic nerves, sharp localized pain, strips easily. Visceral: covers organs, splanchnopleure, autonomic nerves, pain only on stretch or ischaemia.',
    },
    {
      id: 'pt-relations-card',
      front: 'Retroperitoneal organs?',
      back: 'Duodenum (most of it), pancreas, kidneys, ureters, suprarenal glands; partly covered: ascending and descending colon, rectum.',
    },
    {
      id: 'pt-functions-card',
      front: 'Functions of the peritoneum?',
      back: 'Movement of viscera; defence (macrophages, omentum); absorption and dialysis; healing and adhesions; fat storage; passage of vessels and nerves.',
    },
    {
      id: 'pt-paracentesis',
      front: 'Sites for paracentesis?',
      back: 'Midline halfway between umbilicus and pubic symphysis, or just above the anterior superior iliac spine; empty the bladder first.',
    },
    {
      id: 'pt-referred',
      front: 'Where is pain from foregut, midgut and hindgut felt?',
      back: 'Epigastric, periumbilical and suprapubic.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 18 Abdominal Cavity and Peritoneum',
      pages: '271–274, 288',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '300–301' },
  ],
};
