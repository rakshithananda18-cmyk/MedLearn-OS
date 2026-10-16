import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  LESSER_OMENTUM_VIEW,
  ORGANS_SIDE,
  ORGANS_SKELETON,
  PERITONEAL_FOLDS,
  VISCERA,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const lesserSac: Topic = {
  slug: 'lesser-sac',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Greater and lesser sacs and the epiploic foramen',
  summary:
    'Tracing the peritoneum down and across the abdomen, the opening between the two sacs and its four boundaries, the walls and recesses of the lesser sac, and the folds on the back of the anterior wall.',
  estimatedMinutes: 14,
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
      'Volume 2, Chapter 18 Abdominal Cavity and Peritoneum: peritoneal cavity, epiploic foramen and lesser sac, pages 279 to 284',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: greater and lesser sacs, omental foramen, pages 301 to 305',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Liver, omenta and transverse mesocolon in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Organs, vessels and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Traced downwards in the midline, the peritoneum goes from the anterior wall and diaphragm round the liver, down as the lesser omentum to the stomach, on as the greater omentum, back up round the transverse colon as the transverse mesocolon, over the posterior wall, round the small intestine as the mesentery, and into the pelvis over the rectum and bladder (and uterus in the female).',
    'The epiploic foramen, at the level of T12, joins the greater and lesser sacs. In front: the free margin of the lesser omentum (portal vein, hepatic artery, bile duct). Behind: the inferior vena cava, right suprarenal and T12. Above: the caudate process of the liver. Below: the first part of the duodenum and the hepatic artery.',
    'The lesser sac lies behind the caudate lobe, lesser omentum, stomach and the first two layers of the greater omentum; behind it lie the third layer of the greater omentum, the transverse colon and mesocolon, the pancreas, left kidney and suprarenal, splenic vessels and diaphragm.',
    'The hepatic and left gastric arteries raise gastropancreatic folds that divide it into a superior recess (behind the lesser omentum and liver; its vestibule), an inferior recess (behind the stomach, into the greater omentum) and a splenic recess (between the gastrosplenic and lienorenal ligaments).',
    'On the back of the lower anterior wall: the median umbilical fold (urachus), medial umbilical folds (obliterated umbilical arteries) and lateral umbilical folds (inferior epigastric vessels), with the supravesical, medial and lateral inguinal fossae and the femoral fossa between and beside them.',
  ],
  visual: {
    kind: 'path',
    // Left: the epiploic foramen and its four boundaries. Right: the lesser sac's walls and recesses.
    diagram: {
      width: 360,
      height: 470,
      nodes: [
        {
          id: 'two-sacs',
          label: 'Greater and\nlesser sacs',
          name: 'Greater and lesser sacs of the peritoneal cavity',
          x: 180,
          y: 30,
        },
        {
          id: 'epiploic-foramen',
          label: 'Epiploic foramen\nat T12',
          name: 'Epiploic foramen (of Winslow) at the level of T12',
          x: 85,
          y: 100,
        },
        {
          id: 'lesser-omentum',
          label: 'Front: free margin\nof lesser omentum',
          name: 'Anterior: free right margin of the lesser omentum with the portal triad',
          x: 85,
          y: 165,
        },
        {
          id: 'inferior-vena-cava',
          label: 'Behind: IVC',
          name: 'Posterior: inferior vena cava, right suprarenal gland, T12',
          x: 85,
          y: 225,
        },
        {
          id: 'caudate-process',
          label: 'Above: caudate\nprocess',
          name: 'Superior: caudate process of the liver',
          x: 85,
          y: 285,
        },
        {
          id: 'duodenum',
          label: 'Below: first part\nof duodenum',
          name: 'Inferior: first part of the duodenum and the hepatic artery',
          x: 85,
          y: 350,
        },
        {
          id: 'peritoneal-tracing',
          label: 'Tracing down\nthe midline',
          name: 'Vertical tracing of the peritoneum',
          x: 85,
          y: 415,
        },
        {
          id: 'lesser-sac-front',
          label: 'Front: stomach,\nlesser omentum',
          name: 'Front of the lesser sac: caudate lobe, lesser omentum, stomach, greater omentum layer 2',
          x: 275,
          y: 100,
        },
        {
          id: 'pancreas',
          label: 'Behind: pancreas,\nleft kidney',
          name: 'Back of the lesser sac: transverse colon and mesocolon, pancreas, left kidney and suprarenal, splenic vessels',
          x: 275,
          y: 165,
        },
        {
          id: 'superior-recess',
          label: 'Superior recess\n(vestibule)',
          name: 'Superior recess, behind the lesser omentum and liver; its vestibule',
          x: 275,
          y: 230,
        },
        {
          id: 'inferior-recess',
          label: 'Inferior recess',
          name: 'Inferior recess, behind the stomach into the greater omentum',
          x: 275,
          y: 290,
        },
        {
          id: 'splenic-recess',
          label: 'Splenic recess',
          name: 'Splenic recess, between the gastrosplenic and lienorenal ligaments',
          x: 275,
          y: 345,
        },
        {
          id: 'umbilical-folds',
          label: 'Umbilical folds\nand fossae',
          name: 'Median, medial and lateral umbilical folds, with the supravesical, inguinal and femoral fossae',
          x: 275,
          y: 410,
        },
      ],
      edges: [
        { from: 'two-sacs', to: 'epiploic-foramen' },
        { from: 'epiploic-foramen', to: 'lesser-omentum' },
        { from: 'lesser-omentum', to: 'inferior-vena-cava' },
        { from: 'inferior-vena-cava', to: 'caudate-process' },
        { from: 'caudate-process', to: 'duodenum' },
        { from: 'two-sacs', to: 'peritoneal-tracing' },
        { from: 'two-sacs', to: 'lesser-sac-front' },
        { from: 'lesser-sac-front', to: 'pancreas' },
        { from: 'pancreas', to: 'superior-recess' },
        { from: 'superior-recess', to: 'inferior-recess' },
        { from: 'inferior-recess', to: 'splenic-recess' },
        { from: 'two-sacs', to: 'umbilical-folds' },
      ],
    },
    lesions: [
      {
        id: 'internal-hernia',
        label: 'Hernia into the lesser sac',
        nodeIds: ['epiploic-foramen', 'lesser-omentum', 'inferior-vena-cava'],
        explanation:
          'A loop of gut can slip through the epiploic foramen and strangle. The foramen cannot be cut wider, with the portal triad in front and the inferior vena cava behind, so the sac is opened through the greater omentum instead.',
      },
      {
        id: 'posterior-ulcer',
        label: 'Posterior gastric ulcer',
        nodeIds: ['lesser-sac-front', 'pancreas'],
        explanation:
          'An ulcer of the back of the stomach perforates into the lesser sac. The fluid escapes through the epiploic foramen to the hepatorenal pouch; if the foramen is sealed by adhesions the sac swells and is drained through the lesser omentum. Such an ulcer may also erode the pancreas or splenic artery behind.',
      },
    ],
    drill: [
      {
        id: 'foramen',
        title: 'The epiploic foramen',
        hint: 'Its level, then front, back, above, below; then the midline tracing.',
        nodeIds: [
          'epiploic-foramen',
          'lesser-omentum',
          'inferior-vena-cava',
          'caudate-process',
          'duodenum',
          'peritoneal-tracing',
        ],
      },
      {
        id: 'sac',
        title: 'The lesser sac',
        hint: 'Front, back, three recesses, then the folds on the anterior wall.',
        nodeIds: [
          'lesser-sac-front',
          'pancreas',
          'superior-recess',
          'inferior-recess',
          'splenic-recess',
          'umbilical-folds',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts([
        ...ORGANS_SKELETON,
        ...VISCERA,
        ...PERITONEAL_FOLDS,
        'inferior-vena-cava',
        'abdominal-aorta',
        'portal-vein',
        'coeliac-trunk',
        'splenic-artery',
        'splenic-vein',
      ]),
      traces: [],
      stops: [
        {
          ...LESSER_OMENTUM_VIEW,
          title: 'The epiploic foramen',
          description:
            'Behind the free right edge of the lesser omentum, with the portal vein in it, and in front of the inferior vena cava: the slit into the lesser sac, at T12.',
        },
        {
          ...ORGANS_SIDE,
          description:
            'The lesser sac lies between the stomach and lesser omentum in front and the pancreas, left kidney and splenic vessels behind.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'vertical',
      title: 'Tracing down the midline',
      body: 'Start on the back of the anterior wall and go up onto the diaphragm, then round the liver (front and back layers), which meet at the porta hepatis as the lesser omentum. Its two layers enclose the stomach and go on down as the greater omentum, which folds back up (the first layer becoming the fourth) and encloses the transverse colon as the transverse mesocolon. One layer lines the upper posterior wall; the other wraps the small intestine as the mesentery, then lines the lower posterior wall and dips into the pelvis over the rectum, onto the bladder (rectovesical pouch) or the uterus (rectouterine and vesicouterine pouches), and back up the anterior wall.',
      focus: ['peritoneal-tracing'],
    },
    {
      id: 'horizontal',
      title: 'Tracing across',
      body: 'Above the transverse colon: from the anterior wall the falciform ligament reaches the liver; at the porta hepatis the lesser omentum passes to the stomach, whose two layers run left to the spleen as the gastrosplenic ligament and then back to the left kidney as the lienorenal ligament, before lining the posterior wall. Below it: on the back of the anterior wall run the median umbilical fold (urachus), the medial umbilical folds (obliterated umbilical arteries) and the lateral umbilical folds (inferior epigastric vessels), with fossae between them; further back the peritoneum reaches the mesentery.',
      focus: ['umbilical-folds'],
    },
    {
      id: 'foramen',
      title: 'The epiploic foramen',
      body: 'A vertical slit at the level of T12, behind the free right margin of the lesser omentum, from the greater sac into the lesser. In front: that margin, with the portal vein, proper hepatic artery and bile duct. Behind: the inferior vena cava, the right suprarenal and T12. Above: the caudate process of the liver. Below: the first part of the duodenum and the horizontal part of the hepatic artery.',
      focus: [
        'epiploic-foramen',
        'lesser-omentum',
        'inferior-vena-cava',
        'caudate-process',
        'duodenum',
      ],
    },
    {
      id: 'lesser-sac',
      title: 'The lesser sac',
      body: 'A large closed pocket behind the stomach, open only at the foramen. In front: the peritoneum on the caudate lobe, the lesser omentum, the back of the stomach and the second layer of the greater omentum. Behind: the third layer of the greater omentum, the transverse colon and the upper layer of its mesocolon, then the pancreas, left suprarenal, left kidney, splenic vessels and diaphragm. Its fluid lets the full stomach slide without pressing the organs behind it.',
      focus: ['lesser-sac-front', 'pancreas'],
    },
    {
      id: 'recesses',
      title: 'Its recesses',
      body: 'The common hepatic artery, running forward, and the left gastric artery, running up, raise the right and left gastropancreatic folds, which divide the sac. Above them, the superior recess lies behind the lesser omentum and liver; its part behind the lesser omentum is the vestibule. Below them, the inferior recess lies behind the stomach and runs down into the greater omentum. To the left, the splenic recess lies between the gastrosplenic and lienorenal ligaments.',
      focus: ['superior-recess', 'inferior-recess', 'splenic-recess'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From below on the right, find the free edge of the lesser omentum and the inferior vena cava behind it; from the side, place the lesser sac between the stomach and pancreas. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'ls-posterior',
      prompt: 'The posterior boundary of the epiploic foramen is the:',
      options: [
        { id: 'ivc', text: 'Inferior vena cava' },
        { id: 'portal', text: 'Portal vein' },
        { id: 'caudate', text: 'Caudate process' },
        { id: 'duodenum', text: 'First part of the duodenum' },
      ],
      answerId: 'ivc',
      explanation:
        'With the right suprarenal and T12; the portal vein is in front, the caudate process above, the duodenum below.',
    },
    {
      id: 'ls-level',
      prompt: 'The epiploic foramen lies at the level of:',
      options: [
        { id: 't12', text: 'T12' },
        { id: 'l1', text: 'L1' },
        { id: 't10', text: 'T10' },
        { id: 'l3', text: 'L3' },
      ],
      answerId: 't12',
      explanation: 'Behind the free right margin of the lesser omentum.',
    },
    {
      id: 'ls-splenic-recess',
      prompt: 'The splenic recess of the lesser sac lies between the:',
      options: [
        { id: 'gs-lr', text: 'Gastrosplenic and lienorenal ligaments' },
        { id: 'lesser-greater', text: 'Lesser and greater omenta' },
        { id: 'stomach-pancreas', text: 'Stomach and pancreas' },
        { id: 'coronary', text: 'Layers of the coronary ligament' },
      ],
      answerId: 'gs-lr',
      explanation: 'Both come from the dorsal mesogastrium, split by the spleen.',
    },
    {
      id: 'ls-medial-fold',
      prompt: 'The medial umbilical fold is raised by the:',
      options: [
        { id: 'umbilical-artery', text: 'Obliterated umbilical artery' },
        { id: 'urachus', text: 'Urachus' },
        { id: 'inferior-epigastric', text: 'Inferior epigastric vessels' },
        { id: 'umbilical-vein', text: 'Obliterated umbilical vein' },
      ],
      answerId: 'umbilical-artery',
      explanation:
        'The median fold holds the urachus, the lateral folds the inferior epigastric vessels.',
    },
  ],
  cards: [
    {
      id: 'ls-foramen-boundaries',
      front: 'Boundaries of the epiploic foramen?',
      back: 'Front: free margin of lesser omentum (portal vein, hepatic artery, bile duct). Back: IVC, right suprarenal, T12. Above: caudate process. Below: first part of duodenum, hepatic artery.',
    },
    {
      id: 'ls-walls',
      front: 'Anterior and posterior walls of the lesser sac?',
      back: 'Front: caudate lobe, lesser omentum, stomach, greater omentum layer 2. Back: greater omentum layer 3, transverse colon and mesocolon, pancreas, left kidney and suprarenal, splenic vessels, diaphragm.',
    },
    {
      id: 'ls-recesses',
      front: 'Recesses of the lesser sac?',
      back: 'Superior (behind lesser omentum and liver; vestibule), inferior (behind stomach, into greater omentum), splenic (between gastrosplenic and lienorenal ligaments).',
    },
    {
      id: 'ls-folds',
      front: 'Folds on the back of the lower anterior abdominal wall?',
      back: 'Median umbilical (urachus), medial umbilical (obliterated umbilical arteries), lateral umbilical (inferior epigastric vessels).',
    },
    {
      id: 'ls-pouches-tracing',
      front: 'Pouches met when tracing the peritoneum into the pelvis?',
      back: 'Male: rectovesical. Female: rectouterine (Douglas) and vesicouterine.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 18 Abdominal Cavity and Peritoneum',
      pages: '279–284',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '301–305' },
  ],
};
