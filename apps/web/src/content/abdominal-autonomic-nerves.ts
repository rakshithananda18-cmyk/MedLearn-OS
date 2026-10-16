import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  AORTIC_BIFURCATION,
  AORTIC_PLEXUSES,
  LUMBAR_CHAIN_PATHS,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 5 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const abdominalAutonomicNerves: Topic = {
  slug: 'abdominal-autonomic-nerves',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Autonomic nerves of the abdomen',
  summary:
    'The lumbar sympathetic chains, the coeliac ganglia and plexus with its offshoots, the aortic and hypogastric plexuses, where the parasympathetic comes from, and visceral and referred pain.',
  estimatedMinutes: 14,
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
      'Volume 2, Chapter 27 Posterior Abdominal Wall: abdominal part of the autonomic nervous system, pages 403 to 406',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: nervous system in the posterior abdominal region, pages 394 to 397',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'The aorta and its branches, the spine and the sympathetic trunks to L1 in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Sympathetic fibres reach the abdomen two ways: the lumbar sympathetic chains, for the body wall, the lower limb and the pelvic organs; and the coeliac plexus, fed by the thoracic splanchnic nerves, for all the abdominal organs including the gonads. Parasympathetic fibres come from the vagi, into the coeliac plexus, and from the pelvic splanchnic nerves (S2 to S4), into the inferior hypogastric plexuses and up to the hindgut.',
    'Each lumbar chain, four or five ganglia, enters behind the medial arcuate ligament, runs down the lumbar bodies along the medial edge of psoas (overlapped by the IVC on the right, by the lateral aortic nodes on the left) and passes behind the common iliac vessels to the sacral chain. L1 and L2 send it white rami; all five lumbar nerves take grey rami from it. About four lumbar splanchnic nerves go to the coeliac, aortic and superior hypogastric plexuses.',
    'The coeliac ganglia, the largest in the body, lie one each side of the coeliac trunk on the crura. Each takes the greater splanchnic nerve; its lower part, the aorticorenal ganglion, the lesser. The coeliac plexus round the coeliac trunk and superior mesenteric artery also takes the posterior vagal trunk and sensory fibres from the diaphragm, and sends plexuses along the aorta’s branches: phrenic, hepatic, left gastric, splenic, suprarenal, renal, gonadal and superior mesenteric.',
    'Below it the aortic (intermesenteric) plexus covers the aorta between the superior and inferior mesenteric arteries, with the inferior mesenteric plexus along that artery. The superior hypogastric plexus, the “presacral nerve”, lies in front of the aortic division and L5 between the common iliac arteries; it divides into the right and left hypogastric nerves to the inferior hypogastric (pelvic) plexuses beside the rectum and bladder.',
    'Sympathetic fibres narrow the vessels, close the sphincters, slow peristalsis and carry most pain from the viscera; parasympathetic fibres drive the gut and its glands. Viscera feel nothing when cut or burnt but hurt when stretched, cramped or short of blood: dull, poorly placed pain, often referred to the skin of the same spinal segments, and sharp and local once the parietal peritoneum is inflamed.',
  ],
  visual: {
    kind: 'path',
    // Left: the sympathetic routes down to the coeliac plexus. Right: the plexuses below it and
    // the parasympathetic.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'autonomic',
          label: 'Autonomic nerves',
          name: 'Autonomic nerves of the abdomen',
          x: 180,
          y: 30,
        },
        {
          id: 'lumbar-chain',
          label: 'Lumbar chains: 4\nto 5 ganglia',
          name: 'Lumbar sympathetic chains, four or five ganglia, on the lumbar bodies',
          x: 85,
          y: 100,
        },
        {
          id: 'rami',
          label: 'White rami L1, L2;\ngrey to all',
          name: 'White rami from L1 and L2; grey rami to all five lumbar nerves',
          x: 85,
          y: 165,
        },
        {
          id: 'splanchnic',
          label: 'Thoracic\nsplanchnics',
          name: 'Greater and lesser thoracic splanchnic nerves, through the crura',
          x: 85,
          y: 230,
        },
        {
          id: 'coeliac-ganglia',
          label: 'Coeliac ganglia',
          name: 'Coeliac ganglia, one each side of the coeliac trunk',
          x: 85,
          y: 290,
        },
        {
          id: 'coeliac-trunk',
          label: 'Coeliac plexus',
          name: 'Coeliac plexus, round the coeliac trunk and superior mesenteric artery',
          x: 85,
          y: 350,
        },
        {
          id: 'branch-plexuses',
          label: 'Plexuses along\nthe branches',
          name: 'Plexuses along the aorta’s branches: hepatic, gastric, splenic, renal and more',
          x: 85,
          y: 415,
        },
        {
          id: 'abdominal-aorta',
          label: 'Aortic plexus',
          name: 'Aortic (intermesenteric) plexus, between the two mesenteric arteries',
          x: 275,
          y: 100,
        },
        {
          id: 'inferior-mesenteric-artery',
          label: 'Inferior\nmesenteric plexus',
          name: 'Inferior mesenteric plexus, along the inferior mesenteric artery',
          x: 275,
          y: 165,
        },
        {
          id: 'superior-hypogastric',
          label: 'Superior\nhypogastric plexus',
          name: 'Superior hypogastric plexus, in front of the aortic division and L5',
          x: 275,
          y: 230,
        },
        {
          id: 'inferior-hypogastric',
          label: 'Inferior\nhypogastric plexus',
          name: 'Inferior hypogastric (pelvic) plexuses, beside the rectum and bladder',
          x: 275,
          y: 295,
        },
        {
          id: 'vagus',
          label: 'Vagi to coeliac\nplexus',
          name: 'Vagal fibres, mostly from the posterior trunk, to the coeliac plexus',
          x: 275,
          y: 355,
        },
        {
          id: 'pelvic-splanchnic',
          label: 'Pelvic splanchnics\nS2 to S4',
          name: 'Pelvic splanchnic nerves (S2 to S4), to the pelvis and hindgut',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'autonomic', to: 'lumbar-chain' },
        { from: 'lumbar-chain', to: 'rami' },
        { from: 'rami', to: 'splanchnic' },
        { from: 'splanchnic', to: 'coeliac-ganglia' },
        { from: 'coeliac-ganglia', to: 'coeliac-trunk' },
        { from: 'coeliac-trunk', to: 'branch-plexuses' },
        { from: 'autonomic', to: 'abdominal-aorta' },
        { from: 'abdominal-aorta', to: 'inferior-mesenteric-artery' },
        { from: 'inferior-mesenteric-artery', to: 'superior-hypogastric' },
        { from: 'superior-hypogastric', to: 'inferior-hypogastric' },
        { from: 'inferior-hypogastric', to: 'vagus' },
        { from: 'vagus', to: 'pelvic-splanchnic' },
      ],
    },
    lesions: [
      {
        id: 'sympathectomy',
        label: 'Lumbar sympathectomy',
        nodeIds: ['lumbar-chain', 'rami'],
        explanation:
          'For blocked arteries of the leg, as in Buerger’s disease, the second to fourth lumbar ganglia are removed through an approach outside the peritoneum; the foot becomes warm, pink and dry. The first lumbar ganglion is kept: it closes the neck of the bladder during ejaculation, and without it ejaculation fails.',
      },
      {
        id: 'presacral',
        label: 'Presacral neurectomy',
        nodeIds: ['superior-hypogastric', 'pelvic-splanchnic'],
        explanation:
          'Cutting the superior hypogastric plexus relieves severe period pain, whose fibres from the body of the uterus run in it; it cannot relieve all pelvic pain, as many pain fibres travel in the pelvic splanchnic nerves. In men it ends ejaculation, cutting the sympathetic supply to the seminal vesicles, vasa and prostate.',
      },
      {
        id: 'referred',
        label: 'Referred pain',
        nodeIds: ['splanchnic', 'branch-plexuses'],
        explanation:
          'Pain from a viscus comes in through the same spinal segments as the skin of a certain area, and is felt there: the stomach in the epigastrium, the small gut round the umbilicus, the colon below it. Once inflammation reaches the parietal peritoneum the pain becomes sharp and local.',
      },
    ],
    drill: [
      {
        id: 'sympathetic',
        title: 'Sympathetic routes',
        hint: 'The lumbar chains and their rami, then the splanchnics down to the coeliac plexus and its offshoots.',
        nodeIds: [
          'lumbar-chain',
          'rami',
          'splanchnic',
          'coeliac-ganglia',
          'coeliac-trunk',
          'branch-plexuses',
        ],
      },
      {
        id: 'lower',
        title: 'Lower plexuses and the parasympathetic',
        hint: 'Down the aorta to the pelvis, then where the parasympathetic fibres come from.',
        nodeIds: [
          'abdominal-aorta',
          'inferior-mesenteric-artery',
          'superior-hypogastric',
          'inferior-hypogastric',
          'vagus',
          'pelvic-splanchnic',
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
          'diaphragm',
          'psoas-major',
          'kidneys',
          'suprarenal-glands',
          'abdominal-oesophagus',
          'abdominal-aorta',
          'coeliac-trunk',
          'superior-mesenteric-artery',
          'inferior-mesenteric-artery',
          'renal-arteries',
          'common-iliac-vessels',
          'inferior-vena-cava',
          'sympathetic-trunks',
        ],
        ['kidneys', 'diaphragm', 'psoas-major', 'inferior-vena-cava'],
      ),
      traces: [{ id: 'lumbar-chain', kind: 'nerve', paths: LUMBAR_CHAIN_PATHS }],
      stops: [AORTIC_PLEXUSES, AORTIC_BIFURCATION],
    },
  },
  lesson: [
    {
      id: 'sources',
      title: 'Where the fibres come from',
      body: 'Sympathetic fibres arrive by two routes. The thoracic splanchnic nerves pierce the crura to the coeliac plexus, which supplies every abdominal organ, the gonads too. The lumbar sympathetic chains supply the lower abdominal wall and the lower limb through grey rami, and the pelvic organs through lumbar splanchnic nerves. Parasympathetic fibres come from the vagi, which join the coeliac plexus, and from the pelvic splanchnic nerves (S2 to S4), which join the inferior hypogastric plexuses and climb to the hindgut.',
      focus: ['splanchnic', 'vagus', 'pelvic-splanchnic'],
    },
    {
      id: 'chain',
      title: 'The lumbar sympathetic chain',
      body: 'Continuous with the thoracic chain behind the medial arcuate ligament, each lumbar chain of four or five ganglia runs down the front of the lumbar bodies along the medial edge of psoas, crossing in front of the lumbar vessels. On the right the IVC overlaps it, on the left the lateral aortic nodes. It passes behind the common iliac vessels to become the sacral chain. White rami reach it only from L1 and L2; grey rami go back to all five lumbar nerves; about four lumbar splanchnic nerves go medially, the upper two to the coeliac and aortic plexuses, the lower two to the superior hypogastric plexus.',
      focus: ['lumbar-chain', 'rami'],
    },
    {
      id: 'coeliac',
      title: 'Coeliac ganglia and plexus',
      body: 'The coeliac ganglia, the largest in the body, lie one each side of the coeliac trunk on the crura, overlapped by the IVC on the right and the pancreas. The greater splanchnic nerve ends in the upper part; the lower part, the aorticorenal ganglion, takes the lesser. The coeliac (solar) plexus round the coeliac trunk and the root of the superior mesenteric artery holds the preganglionic sympathetic fibres, the postganglionic fibres from the ganglia, vagal fibres from the posterior vagal trunk (mainly right vagus), and sensory fibres from the diaphragm.',
      focus: ['coeliac-ganglia', 'coeliac-trunk'],
    },
    {
      id: 'offshoots',
      title: 'Plexuses along the branches',
      body: 'From the coeliac plexus, secondary plexuses follow the arteries: phrenic (to the diaphragm and suprarenal), hepatic (liver, gallbladder, bile ducts), left gastric, splenic, suprarenal (preganglionic fibres ending on the chromaffin cells), renal (kidney and upper ureter), testicular or ovarian, and superior mesenteric with its own ganglion. So each organ’s nerves reach it along its artery.',
      focus: ['branch-plexuses'],
    },
    {
      id: 'lower',
      title: 'Aortic and hypogastric plexuses',
      body: 'The aortic (intermesenteric) plexus, four to twelve nerves joined by oblique twigs, covers the sides and front of the aorta between the superior and inferior mesenteric arteries, and gives the inferior mesenteric plexus. Below the division, in front of L5 and the sacral promontory between the common iliac arteries, lies the superior hypogastric plexus, the “presacral nerve”, which is neither one nerve nor presacral. It divides into the right and left hypogastric nerves, which go down to the inferior hypogastric plexuses beside the rectum, bladder and prostate or cervix.',
      focus: [
        'abdominal-aorta',
        'inferior-mesenteric-artery',
        'superior-hypogastric',
        'inferior-hypogastric',
      ],
    },
    {
      id: 'pain',
      title: 'What they do, and visceral pain',
      body: 'Sympathetic nerves narrow the vessels, close the sphincters, slow peristalsis and carry most visceral sensation; parasympathetic nerves are motor and secretomotor to the gut and its glands. Viscera are not hurt by cutting, crushing or burning, but by stretching, cramping of their muscle and lack of blood. The pain is dull and vague, felt in the midline and often referred to the skin supplied by the same spinal segments; when the parietal peritoneum is involved it becomes sharp and local.',
      focus: ['splanchnic'],
    },
  ],
  questions: [
    {
      id: 'au-white-rami',
      prompt: 'White rami communicantes reach the lumbar sympathetic chain from:',
      options: [
        { id: 'one-two', text: 'L1 and L2 only' },
        { id: 'all-five', text: 'All five lumbar nerves' },
        { id: 'three-five', text: 'L3 to L5' },
        { id: 'none', text: 'None of the lumbar nerves' },
      ],
      answerId: 'one-two',
      explanation: 'The sympathetic outflow ends at L2; grey rami go back to all five.',
    },
    {
      id: 'au-largest',
      prompt: 'The largest autonomic ganglion in the body is the:',
      options: [
        { id: 'coeliac', text: 'Coeliac ganglion' },
        { id: 'superior-cervical', text: 'Superior cervical ganglion' },
        { id: 'stellate', text: 'Cervicothoracic ganglion' },
        { id: 'impar', text: 'Ganglion impar' },
      ],
      answerId: 'coeliac',
      explanation: 'One each side of the coeliac trunk, on the crura.',
    },
    {
      id: 'au-pelvic',
      prompt: 'The pelvic splanchnic nerves arise from:',
      options: [
        { id: 'sacral', text: 'S2 to S4' },
        { id: 'lumbar', text: 'L1 and L2' },
        { id: 'thoracic', text: 'T10 to L2' },
        { id: 'coccygeal', text: 'S5 and the coccygeal nerve' },
      ],
      answerId: 'sacral',
      explanation: 'Parasympathetic, to the pelvic organs and the hindgut.',
    },
    {
      id: 'au-kept',
      prompt: 'In lumbar sympathectomy the first lumbar ganglion is kept because it:',
      options: [
        { id: 'ejaculation', text: 'Closes the bladder neck during ejaculation' },
        { id: 'sweating', text: 'Controls sweating of the foot' },
        { id: 'vessels', text: 'Supplies the vessels of the calf' },
        { id: 'bowel', text: 'Controls the anal sphincter' },
      ],
      answerId: 'ejaculation',
      explanation: 'It plays no part in the vessels and sweat glands below the knee.',
    },
  ],
  cards: [
    {
      id: 'au-sources',
      front: 'Sympathetic and parasympathetic sources for the abdomen?',
      back: 'Sympathetic: thoracic splanchnics (coeliac plexus) and lumbar chains. Parasympathetic: vagi (coeliac plexus) and pelvic splanchnics S2 to S4 (inferior hypogastric plexus, hindgut).',
    },
    {
      id: 'au-coeliac-plexus',
      front: 'Fibres in the coeliac plexus?',
      back: 'Preganglionic sympathetic (greater and lesser splanchnics), postganglionic from the coeliac ganglia, vagal (posterior trunk), sensory from the diaphragm.',
    },
    {
      id: 'au-offshoots',
      front: 'Secondary plexuses from the coeliac plexus?',
      back: 'Phrenic, hepatic, left gastric, splenic, suprarenal, renal, gonadal, superior mesenteric; then the aortic plexus.',
    },
    {
      id: 'au-superior-hypogastric',
      front: 'Where is the superior hypogastric plexus?',
      back: 'In front of the aortic division, L5 and the promontory, between the common iliac arteries; gives the hypogastric nerves to the pelvic plexuses.',
    },
    {
      id: 'au-visceral-pain',
      front: 'What causes visceral pain?',
      back: 'Stretching, spasm of smooth muscle, ischaemia; not cutting, crushing or burning.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 27 Posterior Abdominal Wall',
      pages: '403–406',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '394–397' },
  ],
};
