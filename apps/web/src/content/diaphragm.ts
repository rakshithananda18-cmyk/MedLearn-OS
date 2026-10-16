import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  DIAPHRAGM_BELOW,
  DIAPHRAGM_FRONT,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 5 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const diaphragm: Topic = {
  slug: 'diaphragm',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The diaphragm',
  summary:
    'Where it arises, the crura and arcuate ligaments, the central tendon, the three main openings and the small passages, its nerve, how it moves, and the hernias through it.',
  estimatedMinutes: 15,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 26 Diaphragm, pages 388 to 393'),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: diaphragm, pages 369 to 373'),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Diaphragm, ribs, spine and the structures through it in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'A dome of muscle between thorax and abdomen. It arises from the back of the xiphoid process (two slips), the inner surfaces of the lower six costal cartilages and ribs (interdigitating with transversus abdominis), and the lumbar spine through the crura and arcuate ligaments. All its fibres run to the trilobed central tendon, fused to the pericardium above.',
    'Right crus from the bodies of L1 to L3 and their discs, larger because it pulls the liver down; left crus from L1 and L2. The median arcuate ligament joins them in front of the aorta. Medial arcuate ligament: thickened psoas fascia, from the body to the transverse process of L1. Lateral arcuate ligament: thickened fascia on quadratus lumborum, from that transverse process to the twelfth rib.',
    'Three main openings: vena caval at T8, in the central tendon, for the IVC and branches of the right phrenic nerve; oesophageal at T10, through the right crus, for the oesophagus, vagal trunks and oesophageal branches of the left gastric vessels; aortic at T12, behind the median arcuate ligament, for the aorta, thoracic duct and azygos vein.',
    'Small passages: the splanchnic nerves through each crus and the hemiazygos through the left; the sympathetic trunk behind the medial arcuate ligament; the subcostal nerve and vessels behind the lateral; the superior epigastric vessels between the xiphoid and seventh costal origins (the space of Larrey); the musculophrenic vessels at the ninth costal cartilage.',
    'The phrenic nerves (C3 to C5) are its only motor nerves and carry sensation from its centre; the lower six thoracic nerves carry sensation from its edge. Contracting, it descends about 1.5 cm in quiet breathing and 6 to 10 cm in deep breathing: the main muscle of inspiration. It sits highest lying down and lowest sitting up.',
  ],
  visual: {
    kind: 'path',
    // Left: origins, tendon, nerve and movement. Right: the openings and the hernias.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'diaphragm', label: 'Diaphragm', name: 'Diaphragm', x: 180, y: 30 },
        {
          id: 'sternal-costal',
          label: 'Xiphoid and lower\nsix cartilages',
          name: 'Sternal and costal origins: the xiphoid process and the lower six costal cartilages and ribs',
          x: 85,
          y: 100,
        },
        {
          id: 'crura',
          label: 'Crura: right L1 to\nL3, left L1 to L2',
          name: 'Crura: the right from L1 to L3, the left from L1 and L2',
          x: 85,
          y: 165,
        },
        {
          id: 'arcuate',
          label: 'Median, medial,\nlateral arcuate',
          name: 'Median, medial and lateral arcuate ligaments',
          x: 85,
          y: 230,
        },
        {
          id: 'central-tendon',
          label: 'Central tendon',
          name: 'Central tendon, trilobed, fused to the pericardium',
          x: 85,
          y: 290,
        },
        {
          id: 'phrenic-nerve',
          label: 'Phrenic nerves,\nC3 to C5',
          name: 'Phrenic nerves (C3 to C5): the only motor supply',
          x: 85,
          y: 350,
        },
        {
          id: 'movement',
          label: 'Descends in\ninspiration',
          name: 'Descends in inspiration: about 1.5 cm quietly, 6 to 10 cm deeply',
          x: 85,
          y: 415,
        },
        {
          id: 'inferior-vena-cava',
          label: 'Caval T8: IVC,\nright phrenic',
          name: 'Vena caval opening at T8: IVC and branches of the right phrenic nerve',
          x: 275,
          y: 100,
        },
        {
          id: 'abdominal-oesophagus',
          label: 'Oesophageal T10:\noesophagus, vagi',
          name: 'Oesophageal opening at T10: oesophagus, vagal trunks, left gastric branches',
          x: 275,
          y: 165,
        },
        {
          id: 'abdominal-aorta',
          label: 'Aortic T12: aorta,\nthoracic duct',
          name: 'Aortic opening at T12: aorta, thoracic duct, azygos vein',
          x: 275,
          y: 230,
        },
        {
          id: 'sympathetic-trunks',
          label: 'Splanchnics and\nsympathetic trunk',
          name: 'Splanchnic nerves through the crura; sympathetic trunk behind the medial arcuate ligament',
          x: 275,
          y: 295,
        },
        {
          id: 'larrey',
          label: 'Superior\nepigastric gap',
          name: 'Superior epigastric vessels between the xiphoid and costal origins (space of Larrey)',
          x: 275,
          y: 355,
        },
        {
          id: 'hernias',
          label: 'Congenital and\nhiatal hernias',
          name: 'Hernias: congenital (posterolateral, retrosternal) and hiatal',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'diaphragm', to: 'sternal-costal' },
        { from: 'sternal-costal', to: 'crura' },
        { from: 'crura', to: 'arcuate' },
        { from: 'arcuate', to: 'central-tendon' },
        { from: 'central-tendon', to: 'phrenic-nerve' },
        { from: 'phrenic-nerve', to: 'movement' },
        { from: 'diaphragm', to: 'inferior-vena-cava' },
        { from: 'inferior-vena-cava', to: 'abdominal-oesophagus' },
        { from: 'abdominal-oesophagus', to: 'abdominal-aorta' },
        { from: 'abdominal-aorta', to: 'sympathetic-trunks' },
        { from: 'sympathetic-trunks', to: 'larrey' },
        { from: 'larrey', to: 'hernias' },
      ],
    },
    lesions: [
      {
        id: 'phrenic-palsy',
        label: 'Paralysed half',
        nodeIds: ['phrenic-nerve', 'movement'],
        explanation:
          'A phrenic nerve damaged anywhere along its long course paralyses its half of the diaphragm. That half rises, and moves the wrong way, up as the other side goes down: paradoxical movement, seen on screening.',
      },
      {
        id: 'shoulder-tip',
        label: 'Shoulder-tip pain',
        nodeIds: ['phrenic-nerve', 'central-tendon'],
        explanation:
          'Blood or pus under the centre of the diaphragm irritates phrenic sensory fibres. The pain is felt at the tip of the shoulder, whose skin is supplied by the supraclavicular nerves from the same segments, C3 and C4.',
      },
      {
        id: 'bochdalek',
        label: 'Hernia in the newborn',
        nodeIds: ['hernias', 'crura'],
        explanation:
          'The commonest congenital hernia goes through the posterolateral gap of the pleuroperitoneal canal (foramen of Bochdalek), usually on the left. Gut fills the chest and the newborn struggles to breathe; it needs early operation. A retrosternal hernia through the space of Larrey is rarer and often silent.',
      },
      {
        id: 'hiatal',
        label: 'Hiatal hernia',
        nodeIds: ['abdominal-oesophagus', 'hernias'],
        explanation:
          'In the common sliding type, a weak phrenico-oesophageal membrane lets the cardia slide up through the hiatus, so acid refluxes into the oesophagus; obesity favours it. In the rolling type the fundus rolls up beside a junction that stays in place.',
      },
    ],
    drill: [
      {
        id: 'origins',
        title: 'Origins, nerve and movement',
        hint: 'From the front round to the spine, the ligaments, the tendon, then its nerve and how it moves.',
        nodeIds: [
          'sternal-costal',
          'crura',
          'arcuate',
          'central-tendon',
          'phrenic-nerve',
          'movement',
        ],
      },
      {
        id: 'openings',
        title: 'Openings and hernias',
        hint: 'The three main openings from T8 down to T12, the small passages, then hernias.',
        nodeIds: [
          'inferior-vena-cava',
          'abdominal-oesophagus',
          'abdominal-aorta',
          'sympathetic-trunks',
          'larrey',
          'hernias',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [
          'lumbar-spine',
          'lower-ribs',
          'costal-cartilages',
          'diaphragm',
          'abdominal-oesophagus',
          'abdominal-aorta',
          'inferior-vena-cava',
          'azygos-veins',
          'inferior-phrenic-arteries',
          'sympathetic-trunks',
          'psoas-major',
          'kidneys',
          'suprarenal-glands',
        ],
        ['kidneys'],
      ),
      traces: [],
      stops: [DIAPHRAGM_FRONT, DIAPHRAGM_BELOW],
    },
  },
  lesson: [
    {
      id: 'origins',
      title: 'Where it arises',
      body: 'The diaphragm is a sheet of muscle round a central tendon, closing the lower opening of the thorax. Its sternal part arises by two slips from the back of the xiphoid process; its costal part from the inner surfaces of the lower six costal cartilages and ribs, interdigitating with transversus abdominis; its lumbar part from the crura and the arcuate ligaments. The fibres arch up into right and left domes, the right higher, over the liver and the fundus of the stomach.',
      focus: ['sternal-costal'],
    },
    {
      id: 'crura',
      title: 'Crura and arcuate ligaments',
      body: 'The right crus comes from the bodies of L1 to L3 and their discs, the left from L1 and L2; the right is larger because it pulls the liver down, and its fibres loop round the oesophagus. The crura meet in front of the aorta as the median arcuate ligament. The medial arcuate ligament is thickened fascia over psoas, from the body of L1 to its transverse process; the lateral arcuate ligament, thickened fascia over quadratus lumborum, from that transverse process to the twelfth rib.',
      focus: ['crura', 'arcuate'],
    },
    {
      id: 'tendon',
      title: 'Central tendon',
      body: 'The fibres converge on the central tendon, shaped like a trefoil: a middle leaflet pointing to the xiphoid and two tongue-shaped side leaflets. It lies under the heart, fused with the fibrous pericardium. In full expiration the right dome rises to about the fourth intercostal space (BD; Gray’s puts it at the fifth rib in quiet expiration), the left a little lower, and the central tendon is level with the lower end of the sternum.',
      focus: ['central-tendon'],
    },
    {
      id: 'openings',
      title: 'Openings',
      body: '“I 8 eggs 10 at 12”: the IVC (8) passes through the central tendon at T8 with branches of the right phrenic nerve, and the opening widens in inspiration, helping blood back to the heart. The oesophagus passes through the right crus at T10 (eggs, 10) with the vagal trunks and the oesophageal branches of the left gastric vessels; the crus acts as a sphincter there. The aorta passes behind the median arcuate ligament at T12 (at 12) with the thoracic duct and azygos vein, untouched by the diaphragm’s contraction.',
      focus: ['inferior-vena-cava', 'abdominal-oesophagus', 'abdominal-aorta'],
    },
    {
      id: 'small',
      title: 'Small passages',
      body: 'The greater and lesser splanchnic nerves pierce the crura, and the hemiazygos vein the left crus. The sympathetic trunk passes behind the medial arcuate ligament, the subcostal nerve and vessels behind the lateral. The superior epigastric vessels pass between the xiphoid and seventh costal origins, the space of Larrey or foramen of Morgagni. The musculophrenic vessels pierce it at the ninth costal cartilage, and the lower intercostal nerves pass between its slips and those of transversus abdominis.',
      focus: ['sympathetic-trunks', 'larrey'],
    },
    {
      id: 'nerve',
      title: 'Nerve and movement',
      body: 'The diaphragm forms in the neck and keeps its nerves as it descends: the phrenic nerves (C3 to C5) are its only motor supply and carry sensation from the central part; the lower six thoracic nerves carry sensation from the edge. Contracting, it pulls the central tendon down, lengthening the thorax: about 1.5 cm in quiet breathing, 6 to 10 cm in deep breathing. It also adds force to coughing, vomiting, defaecation and childbirth after a deep breath in. Lying down the viscera push it highest; breathless patients sit up.',
      focus: ['phrenic-nerve', 'movement'],
    },
    {
      id: 'hernias',
      title: 'Development and hernias',
      body: 'It develops from the septum transversum (central tendon), the pleuroperitoneal membranes, the dorsal mesentery of the oesophagus (the crura) and the body wall (the rim). Congenital hernias pass through gaps between these: posterolateral (Bochdalek, commonest, usually left), retrosternal (Morgagni, through the space of Larrey), posterior or central. Acquired ones are traumatic or hiatal; the sliding hiatal hernia is the commonest of all internal hernias.',
      focus: ['hernias'],
    },
  ],
  questions: [
    {
      id: 'dg-not-through',
      prompt: 'Which does not pass through the diaphragm?',
      options: [
        { id: 'cisterna', text: 'Cisterna chyli' },
        { id: 'oesophagus', text: 'Oesophagus' },
        { id: 'aorta', text: 'Aorta' },
        { id: 'ivc', text: 'Inferior vena cava' },
      ],
      answerId: 'cisterna',
      explanation:
        'The cisterna chyli lies below it; its continuation, the thoracic duct, goes through the aortic opening.',
    },
    {
      id: 'dg-tendon-opening',
      prompt: 'Which opening lies in the central tendon?',
      options: [
        { id: 'caval', text: 'Vena caval' },
        { id: 'oesophageal', text: 'Oesophageal' },
        { id: 'aortic', text: 'Aortic' },
        { id: 'none', text: 'None of them' },
      ],
      answerId: 'caval',
      explanation: 'At T8; it widens when the diaphragm contracts.',
    },
    {
      id: 'dg-hiatus',
      prompt: 'Which does not pass through the oesophageal opening?',
      options: [
        { id: 'thoracic-duct', text: 'Thoracic duct' },
        { id: 'vagal', text: 'Vagal trunks' },
        { id: 'oesophagus', text: 'Oesophagus' },
        { id: 'left-gastric', text: 'Oesophageal branches of the left gastric artery' },
      ],
      answerId: 'thoracic-duct',
      explanation: 'The thoracic duct goes through the aortic opening.',
    },
    {
      id: 'dg-motor',
      prompt: 'The motor nerve of the diaphragm is:',
      options: [
        { id: 'phrenic', text: 'The phrenic nerve only' },
        { id: 'intercostal', text: 'The lower six intercostal nerves' },
        { id: 'both', text: 'Phrenic and lower intercostal nerves' },
        { id: 'vagus', text: 'The vagus' },
      ],
      answerId: 'phrenic',
      explanation: 'The lower intercostal nerves carry only sensation from its edge.',
    },
  ],
  cards: [
    {
      id: 'dg-openings',
      front: 'Main openings of the diaphragm, levels and contents?',
      back: 'Caval T8 (IVC, right phrenic branches); oesophageal T10 (oesophagus, vagal trunks, left gastric branches); aortic T12 (aorta, thoracic duct, azygos).',
    },
    {
      id: 'dg-crura',
      front: 'Attachments of the crura?',
      back: 'Right: bodies of L1 to L3 and discs. Left: L1 and L2. Joined in front of the aorta by the median arcuate ligament.',
    },
    {
      id: 'dg-arcuate',
      front: 'Medial and lateral arcuate ligaments?',
      back: 'Medial: psoas fascia, body to transverse process of L1 (sympathetic trunk behind). Lateral: quadratus lumborum fascia, L1 transverse process to rib 12 (subcostal nerve and vessels behind).',
    },
    {
      id: 'dg-nerves',
      front: 'Nerve supply of the diaphragm?',
      back: 'Motor: phrenic only (C3 to C5). Sensory: phrenic centrally, lower six thoracic nerves peripherally.',
    },
    {
      id: 'dg-development',
      front: 'Parts the diaphragm develops from?',
      back: 'Septum transversum (central tendon), pleuroperitoneal membranes, dorsal mesentery of the oesophagus, body wall.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 26 Diaphragm', pages: '388–393' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '369–373' },
  ],
};
