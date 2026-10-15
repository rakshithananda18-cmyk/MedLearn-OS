import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  ILEOCAECAL_VIEW,
  ORGANS_FRONT,
  ORGANS_SKELETON,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const largeIntestine: Topic = {
  slug: 'large-intestine',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Large intestine: caecum and colon',
  summary:
    'The parts of the large intestine and how to tell it from the small, its taeniae and their positions, the caecum and ileocaecal valve, the colon from flexure to flexure, and its blood, lymph and nerves.',
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
      'Volume 2, Chapter 20 Small and Large Intestines: large intestine, caecum, ileocaecal valve and colon, pages 312 to 316 and 319 to 320',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: large intestine, cecum and colon, pages 316 to 321',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Liver, transverse mesocolon and sigmoid colon in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Caecum, colon, taeniae coli, vessels and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'About 1.5 m from the ileocaecal junction to the anus: caecum (with the appendix), ascending colon, right colic flexure, transverse colon, left colic flexure, descending colon, sigmoid colon, rectum and anal canal.',
    'Told from the small intestine by three taeniae coli, the sacculations they cause, and the appendices epiploicae (fat-filled tags, absent on the caecum, appendix and rectum). It is wider, mostly fixed, and has no villi.',
    'Taenia libera lies in front, taenia mesocolica behind and medially, taenia omentalis behind and laterally; in the twisted transverse colon they come to lie below, behind and above. All three meet at the base of the appendix.',
    'The caecum, in the right iliac fossa, is wider (7.5 cm) than it is long (6 cm). The ileum opens on its back inner side through the ileocaecal valve, two lips and two frenula, closed by sympathetic tone and by a full caecum.',
    'Ascending colon 12.5 cm; transverse colon 50 cm, hanging on the transverse mesocolon, the most mobile part; descending colon 25 cm; sigmoid colon 37.5 cm on the sigmoid mesocolon, ending at S3. The left flexure is higher, more acute, further back, and tied to the diaphragm by the phrenicocolic ligament.',
  ],
  visual: {
    kind: 'path',
    // Left: the parts in order. Right: its features and supply.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'large-intestine',
          label: 'Large intestine:\n1.5 m',
          name: 'Large intestine, about 1.5 m',
          x: 180,
          y: 30,
        },
        {
          id: 'ascending-colon',
          label: 'Caecum, right\niliac fossa',
          name: 'Caecum in the right iliac fossa, and the ascending colon',
          x: 85,
          y: 100,
        },
        {
          id: 'ileocaecal-valve',
          label: 'Ileocaecal valve',
          name: 'Ileocaecal valve: two lips and two frenula',
          x: 85,
          y: 160,
        },
        {
          id: 'right-colic-flexure',
          label: 'Right flexure:\nunder the liver',
          name: 'Right colic (hepatic) flexure, on the right kidney under the liver',
          x: 85,
          y: 220,
        },
        {
          id: 'transverse-colon',
          label: 'Transverse colon:\n50 cm, mobile',
          name: 'Transverse colon, 50 cm, on the transverse mesocolon',
          x: 85,
          y: 285,
        },
        {
          id: 'left-colic-flexure',
          label: 'Left flexure:\nhigher, tied up',
          name: 'Left colic (splenic) flexure, held by the phrenicocolic ligament',
          x: 85,
          y: 350,
        },
        {
          id: 'descending-colon',
          label: 'Descending, then\nsigmoid colon',
          name: 'Descending colon, 25 cm, and sigmoid colon, 37.5 cm',
          x: 85,
          y: 415,
        },
        {
          id: 'taeniae-coli',
          label: 'Three taeniae coli',
          name: 'Taeniae coli: libera, mesocolica and omentalis',
          x: 275,
          y: 100,
        },
        {
          id: 'sacculations',
          label: 'Sacculations',
          name: 'Sacculations (haustra), from taeniae shorter than the gut',
          x: 275,
          y: 160,
        },
        {
          id: 'appendices-epiploicae',
          label: 'Appendices\nepiploicae',
          name: 'Appendices epiploicae, peritoneal tags of fat',
          x: 275,
          y: 220,
        },
        {
          id: 'no-villi',
          label: 'Wide, fixed,\nno villi',
          name: 'Wider, mostly fixed, without villi',
          x: 275,
          y: 285,
        },
        {
          id: 'marginal-artery',
          label: 'Marginal artery\nand vasa recta',
          name: 'Marginal artery, with long and short vessels to the wall',
          x: 275,
          y: 350,
        },
        {
          id: 'colic-nodes',
          label: 'Four sets of\nlymph nodes',
          name: 'Epicolic, paracolic, intermediate and terminal nodes',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'large-intestine', to: 'ascending-colon' },
        { from: 'ascending-colon', to: 'ileocaecal-valve' },
        { from: 'ileocaecal-valve', to: 'right-colic-flexure' },
        { from: 'right-colic-flexure', to: 'transverse-colon' },
        { from: 'transverse-colon', to: 'left-colic-flexure' },
        { from: 'left-colic-flexure', to: 'descending-colon' },
        { from: 'large-intestine', to: 'taeniae-coli' },
        { from: 'taeniae-coli', to: 'sacculations' },
        { from: 'sacculations', to: 'appendices-epiploicae' },
        { from: 'appendices-epiploicae', to: 'no-villi' },
        { from: 'no-villi', to: 'marginal-artery' },
        { from: 'marginal-artery', to: 'colic-nodes' },
      ],
    },
    lesions: [
      {
        id: 'colon-cancer',
        label: 'Cancer of the colon',
        nodeIds: ['marginal-artery', 'colic-nodes'],
        explanation:
          'The paracolic and intermediate nodes lie along the main colic arteries, so removing them means tying the artery; then the whole stretch of colon that artery feeds must come out too, or it would die. Cancer is commonest at the junction of the sigmoid colon and rectum.',
      },
      {
        id: 'diverticulosis',
        label: 'Diverticula',
        nodeIds: ['sacculations', 'appendices-epiploicae'],
        explanation:
          'The wall is weakest where vessels pierce it and where the appendices epiploicae attach. Mucosa bulges out there as diverticula, which can inflame (diverticulitis), scar and narrow the bowel.',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'Its parts',
        hint: 'From the caecum round to the sigmoid colon.',
        nodeIds: [
          'ascending-colon',
          'ileocaecal-valve',
          'right-colic-flexure',
          'transverse-colon',
          'left-colic-flexure',
          'descending-colon',
        ],
      },
      {
        id: 'features',
        title: 'How to tell it',
        hint: 'Three features on the outside, what it lacks, then its blood and lymph.',
        nodeIds: [
          'taeniae-coli',
          'sacculations',
          'appendices-epiploicae',
          'no-villi',
          'marginal-artery',
          'colic-nodes',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts([
        ...ORGANS_SKELETON,
        'liver',
        'gallbladder',
        'spleen',
        'kidneys',
        'duodenum',
        'ileum',
        'ascending-colon',
        'appendix',
        'transverse-colon',
        'descending-colon',
        'sigmoid-colon',
        'rectum',
        'taeniae-coli',
        'transverse-mesocolon',
        'mesoappendix',
        'urinary-bladder',
        'marginal-artery',
      ]),
      traces: [],
      stops: [
        {
          ...ORGANS_FRONT,
          title: 'The colon framing the abdomen',
          description:
            'Up the right side from the caecum, across as the hanging transverse colon from the right flexure under the liver to the higher left flexure by the spleen, then down the left side to the sigmoid colon.',
        },
        {
          ...ILEOCAECAL_VIEW,
          title: 'The caecum and its taeniae',
          description:
            'The caecum in the right iliac fossa, the ileum opening on its inner side, and the taeniae running down it to meet at the base of the appendix.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'parts',
      title: 'Its parts',
      body: 'About 1.5 m long, the large intestine frames the coils of small intestine: caecum and appendix in the right iliac fossa, ascending colon, right colic flexure, transverse colon, left colic flexure, descending colon, sigmoid colon, then the rectum and anal canal in the pelvis. It stores what reaches it and takes back water and salts; mucus from its goblet cells lubricates the contents.',
      focus: ['ascending-colon', 'transverse-colon', 'descending-colon'],
    },
    {
      id: 'features',
      title: 'How to tell it from the small intestine',
      body: 'Most of its longitudinal muscle is gathered into three ribbons, the taeniae coli. Being shorter than the gut, they pucker it into sacculations. Fat-filled peritoneal tags, the appendices epiploicae, hang from it except on the caecum, appendix and rectum, most on the sigmoid colon. It is wider, mostly fixed (except the appendix, transverse and sigmoid colon), and has no villi; its circular folds vanish when the taeniae relax.',
      focus: ['taeniae-coli', 'sacculations', 'appendices-epiploicae', 'no-villi'],
    },
    {
      id: 'taeniae',
      title: 'Where the taeniae lie',
      body: 'On the caecum, ascending, descending and sigmoid colon: taenia libera in front, taenia mesocolica behind and medially, taenia omentalis behind and laterally. The transverse colon is twisted, so there the libera lies below, the mesocolica behind (where the mesocolon attaches) and the omentalis above (where the greater omentum joins it). They meet at the base of the appendix and spread out again at the end of the sigmoid colon.',
      focus: ['taeniae-coli'],
    },
    {
      id: 'caecum',
      title: 'The caecum and ileocaecal valve',
      body: 'A blind pouch in the right iliac fossa above the lateral half of the inguinal ligament, 6 cm long and 7.5 cm wide. Behind it: the iliacus and psoas, the femoral, genitofemoral and lateral femoral cutaneous nerves, the gonadal vessels, and often the appendix. The ileum opens on its back inner side through the ileocaecal valve: an upper and a longer lower lip, joined at each end as frenula. Sympathetic tone and a full caecum close it, so contents cannot run back and ileal contents pass on slowly.',
      focus: ['ascending-colon', 'ileocaecal-valve'],
    },
    {
      id: 'colon',
      title: 'The colon',
      body: 'The ascending colon (12.5 cm), covered on three sides, rises on the iliacus, quadratus lumborum and right kidney to the right colic flexure under the liver. The transverse colon (50 cm) hangs on the transverse mesocolon from the pancreas. The left colic flexure lies higher, at a sharper angle, further back on the left kidney below the spleen, and the phrenicocolic ligament ties it to the diaphragm. The descending colon (25 cm) is narrower; the sigmoid colon (37.5 cm) loops on its mesocolon from the pelvic brim to S3.',
      focus: ['right-colic-flexure', 'transverse-colon', 'left-colic-flexure', 'descending-colon'],
    },
    {
      id: 'supply',
      title: 'Blood, lymph and nerves',
      body: 'The colic arteries join in the marginal artery near the gut. From it, long vessels run round under the serosa to the far taeniae and short ones sink in at once, so the wall opposite the mesentery is the poorest supplied. Lymph passes through epicolic nodes on the wall, paracolic beside it, intermediate on the main branches and terminal on the mesenteric vessels. Up to the left third of the transverse colon (midgut) nerves are vagal and T11 to L1; beyond (hindgut), pelvic splanchnic and L1, L2.',
      focus: ['marginal-artery', 'colic-nodes'],
    },
  ],
  questions: [
    {
      id: 'li-not-feature',
      prompt: 'Which is not a feature of the large intestine?',
      options: [
        { id: 'villi', text: 'Villi' },
        { id: 'taeniae', text: 'Taeniae coli' },
        { id: 'sacculations', text: 'Sacculations' },
        { id: 'appendices', text: 'Appendices epiploicae' },
      ],
      answerId: 'villi',
      explanation: 'Villi belong to the small intestine.',
    },
    {
      id: 'li-taenia-transverse',
      prompt: 'On the transverse colon, the taenia libera lies:',
      options: [
        { id: 'inferior', text: 'Below' },
        { id: 'anterior', text: 'In front' },
        { id: 'posterior', text: 'Behind' },
        { id: 'superior', text: 'Above' },
      ],
      answerId: 'inferior',
      explanation:
        'The twist of the transverse colon puts the mesocolica behind and the omentalis above.',
    },
    {
      id: 'li-phrenicocolic',
      prompt: 'The phrenicocolic ligament is attached to the:',
      options: [
        { id: 'left-flexure', text: 'Left colic flexure' },
        { id: 'right-flexure', text: 'Right colic flexure' },
        { id: 'caecum', text: 'Caecum' },
        { id: 'sigmoid', text: 'Sigmoid colon' },
      ],
      answerId: 'left-flexure',
      explanation: 'It ties the flexure to the diaphragm and supports the spleen.',
    },
    {
      id: 'li-no-appendices',
      prompt: 'Appendices epiploicae are absent from the:',
      options: [
        { id: 'caecum', text: 'Caecum' },
        { id: 'sigmoid', text: 'Sigmoid colon' },
        { id: 'transverse', text: 'Transverse colon' },
        { id: 'descending', text: 'Descending colon' },
      ],
      answerId: 'caecum',
      explanation: 'And from the appendix and rectum; they are most numerous on the sigmoid colon.',
    },
  ],
  cards: [
    {
      id: 'li-lengths',
      front: 'Lengths of the parts of the colon?',
      back: 'Ascending 12.5 cm, transverse 50 cm, descending 25 cm, sigmoid 37.5 cm. The whole large intestine about 1.5 m.',
    },
    {
      id: 'li-features',
      front: 'Large intestine versus small: on the outside?',
      back: 'Taeniae coli, sacculations, appendices epiploicae; wider and mostly fixed. Inside: no villi.',
    },
    {
      id: 'li-taeniae',
      front: 'Positions of the three taeniae?',
      back: 'Caecum, ascending, descending, sigmoid: libera in front, mesocolica behind and medial, omentalis behind and lateral. Transverse colon: libera below, mesocolica behind, omentalis above.',
    },
    {
      id: 'li-ileocaecal',
      front: 'Ileocaecal valve?',
      back: 'Two lips (upper, and a longer lower) and two frenula. Closed by sympathetic tone and a distended caecum; stops reflux and slows ileal emptying.',
    },
    {
      id: 'li-flexures',
      front: 'Right versus left colic flexure?',
      back: 'Right: lower (L2), front, right-angled, on the right kidney under the liver, right colic artery. Left: higher (T12), back, acute, by the spleen, phrenicocolic ligament, left colic artery.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 20 Small and Large Intestines',
      pages: '312–316, 319–320',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '316–321' },
  ],
};
