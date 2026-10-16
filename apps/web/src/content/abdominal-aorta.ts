import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  AORTIC_BIFURCATION,
  CISTERNA_CHYLI_PATHS,
  GREAT_VESSELS_FRONT,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 5 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const abdominalAorta: Topic = {
  slug: 'abdominal-aorta',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The abdominal aorta',
  summary:
    'Its course from T12 to L4, what lies in front and to each side, its branches in four sets, the common iliac arteries, and the lymph nodes and cisterna chyli beside it.',
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
      'Volume 2, Chapter 27 Posterior Abdominal Wall: abdominal aorta, common iliac arteries, lymph nodes and cisterna chyli, pages 395 to 399',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: abdominal aorta, pages 387 to 389; lymphatic system, pages 392 to 393',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Aorta, its branches, the iliac arteries and the lymph nodes in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Begins at the aortic opening, at the lower border of T12, in the midline; runs down the front of the lumbar bodies, a little to the left; divides in front of the lower part of L4, about 1.25 cm left of the midline, into the common iliac arteries. With the lumbar spine bulging forward, its pulse can be felt near the umbilicus in thin people.',
    'In front, from above: the coeliac and aortic plexuses, the body of the pancreas with the splenic vein, the left renal vein, the third part of the duodenum. On the right: the IVC, the right crus, and above, the cisterna chyli and azygos vein. On the left: the left crus, the pancreas, the fourth part of the duodenum. Behind: L1 to L4, their discs, and the left lumbar veins.',
    'Branches in four sets. Ventral, unpaired, to the gut: coeliac trunk, superior and inferior mesenteric. Lateral, paired, to the organs of the intermediate mesoderm: inferior phrenic, middle suprarenal, renal, gonadal. Dorsal, to the body wall: four pairs of lumbar arteries and the median sacral. Terminal: the common iliac arteries.',
    'Each common iliac artery runs down and out to divide in front of the sacroiliac joint, at the lumbosacral disc, into external and internal iliac arteries. The right crosses in front of the beginning of the IVC; the left, shorter, is crossed by the inferior mesenteric vessels, and has the left common iliac vein on its medial side.',
    'Pre-aortic nodes (coeliac, superior and inferior mesenteric) drain the gut, liver, pancreas and spleen and form the intestinal trunks; lateral aortic nodes drain the kidneys, suprarenals, gonads and body wall, with the common iliac nodes, and form the lumbar trunks. All end in the cisterna chyli, a sac 5 to 7 cm long right of the aorta in front of L1 and L2, under the right crus, which goes on as the thoracic duct.',
  ],
  visual: {
    kind: 'path',
    // Left: the branches, top to bottom. Right: relations, then the lymph beside it.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'abdominal-aorta',
          label: 'Aorta: T12 to L4',
          name: 'Abdominal aorta, from T12 to L4',
          x: 180,
          y: 30,
        },
        {
          id: 'coeliac-trunk',
          label: 'Ventral: coeliac,\ntwo mesenterics',
          name: 'Ventral branches: coeliac trunk, superior and inferior mesenteric arteries',
          x: 85,
          y: 100,
        },
        {
          id: 'renal-arteries',
          label: 'Lateral: phrenic,\nsuprarenal, renal',
          name: 'Lateral branches: inferior phrenic, middle suprarenal and renal arteries',
          x: 85,
          y: 165,
        },
        {
          id: 'testicular-arteries',
          label: 'Gonadal, below\nthe renals',
          name: 'Gonadal (testicular or ovarian) arteries, just below the renal arteries',
          x: 85,
          y: 230,
        },
        {
          id: 'lumbar-arteries',
          label: 'Dorsal: four\nlumbar pairs',
          name: 'Dorsal branches: four pairs of lumbar arteries',
          x: 85,
          y: 295,
        },
        {
          id: 'median-sacral',
          label: 'Median sacral',
          name: 'Median sacral artery, from the back just above the division',
          x: 85,
          y: 355,
        },
        {
          id: 'common-iliac-vessels',
          label: 'Common iliacs\nat L4',
          name: 'Common iliac arteries, from the division at L4',
          x: 85,
          y: 415,
        },
        {
          id: 'front',
          label: 'In front: pancreas,\nleft renal vein',
          name: 'In front: the plexuses, pancreas and splenic vein, the left renal vein',
          x: 275,
          y: 100,
        },
        {
          id: 'duodenum',
          label: 'Third part of\nduodenum',
          name: 'In front, lower down: the third part of the duodenum',
          x: 275,
          y: 165,
        },
        {
          id: 'inferior-vena-cava',
          label: 'Right: IVC,\nright crus',
          name: 'On the right: the IVC and the right crus',
          x: 275,
          y: 230,
        },
        {
          id: 'left-side',
          label: 'Left: left crus,\nduodenum',
          name: 'On the left: the left crus, pancreas and the fourth part of the duodenum',
          x: 275,
          y: 295,
        },
        {
          id: 'aortic-lymph-nodes',
          label: 'Pre- and lateral\naortic nodes',
          name: 'Pre-aortic and lateral aortic lymph nodes',
          x: 275,
          y: 355,
        },
        {
          id: 'cisterna-chyli',
          label: 'Cisterna chyli:\nL1, L2',
          name: 'Cisterna chyli, right of the aorta in front of L1 and L2',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'abdominal-aorta', to: 'coeliac-trunk' },
        { from: 'coeliac-trunk', to: 'renal-arteries' },
        { from: 'renal-arteries', to: 'testicular-arteries' },
        { from: 'testicular-arteries', to: 'lumbar-arteries' },
        { from: 'lumbar-arteries', to: 'median-sacral' },
        { from: 'median-sacral', to: 'common-iliac-vessels' },
        { from: 'abdominal-aorta', to: 'front' },
        { from: 'front', to: 'duodenum' },
        { from: 'duodenum', to: 'inferior-vena-cava' },
        { from: 'inferior-vena-cava', to: 'left-side' },
        { from: 'left-side', to: 'aortic-lymph-nodes' },
        { from: 'aortic-lymph-nodes', to: 'cisterna-chyli' },
      ],
    },
    lesions: [
      {
        id: 'aneurysm',
        label: 'Aortic aneurysm',
        nodeIds: ['renal-arteries', 'common-iliac-vessels'],
        explanation:
          'Most abdominal aortic aneurysms lie between the renal arteries and the division. As it widens the risk of rupture rises; at about 5.5 cm it is repaired, by an open graft or by a stent graft passed up from the femoral artery.',
      },
      {
        id: 'pulse',
        label: 'A pulse at the umbilicus',
        nodeIds: ['abdominal-aorta'],
        explanation:
          'The lumbar spine bulges forward, so the aorta lies close under the abdominal wall near the umbilicus, and its pulse is felt there in thin people. A pulse that is wide and expands sideways suggests an aneurysm.',
      },
      {
        id: 'testis-nodes',
        label: 'Spread from the testis',
        nodeIds: ['testicular-arteries', 'aortic-lymph-nodes'],
        explanation:
          'The testis develops beside the kidney and keeps its lymph there: cancer of the testis spreads first to the lateral aortic nodes at the level of the renal vessels, not to the inguinal nodes.',
      },
    ],
    drill: [
      {
        id: 'branches',
        title: 'Branches',
        hint: 'Ventral, lateral, gonadal, dorsal, the median sacral, then the terminal pair.',
        nodeIds: [
          'coeliac-trunk',
          'renal-arteries',
          'testicular-arteries',
          'lumbar-arteries',
          'median-sacral',
          'common-iliac-vessels',
        ],
      },
      {
        id: 'relations',
        title: 'Relations and lymph',
        hint: 'In front from above down, right, left, then the nodes and where their lymph gathers.',
        nodeIds: [
          'front',
          'duodenum',
          'inferior-vena-cava',
          'left-side',
          'aortic-lymph-nodes',
          'cisterna-chyli',
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
          'abdominal-aorta',
          'coeliac-trunk',
          'superior-mesenteric-artery',
          'inferior-mesenteric-artery',
          'inferior-phrenic-arteries',
          'suprarenal-arteries',
          'renal-arteries',
          'testicular-arteries',
          'lumbar-arteries',
          'common-iliac-vessels',
          'iliac-arteries',
          'inferior-vena-cava',
          'aortic-lymph-nodes',
          'iliac-lymph-nodes',
        ],
        ['kidneys', 'diaphragm', 'inferior-vena-cava'],
      ),
      traces: [{ id: 'cisterna-chyli', kind: 'lymph', paths: CISTERNA_CHYLI_PATHS }],
      stops: [GREAT_VESSELS_FRONT, AORTIC_BIFURCATION],
    },
  },
  lesson: [
    {
      id: 'course',
      title: 'Course',
      body: 'The abdominal aorta enters through the aortic opening behind the median arcuate ligament, at the lower border of T12, and runs down the front of the lumbar vertebral bodies a little to the left of the midline. In front of the lower part of L4, about 1.25 cm left of the midline, it divides into the two common iliac arteries. The bifurcation lies at about the level of the iliac crests and a little below and left of the umbilicus.',
      focus: ['common-iliac-vessels'],
    },
    {
      id: 'relations',
      title: 'Relations',
      body: 'In front, from above down: the coeliac plexus and the aortic plexus, the body of the pancreas with the splenic vein behind it, the left renal vein crossing to the IVC, and the third part of the duodenum. On its right: the IVC, the right crus and, higher up, the cisterna chyli and azygos vein. On its left: the left crus, the pancreas and the fourth part of the duodenum. Behind: the bodies of L1 to L4 and their discs, the anterior longitudinal ligament and the left lumbar veins on their way to the IVC.',
      focus: ['front', 'duodenum', 'inferior-vena-cava', 'left-side'],
    },
    {
      id: 'ventral-lateral',
      title: 'Branches to the gut and the organs',
      body: 'The ventral branches, from the vitelline arteries, supply the gut: the coeliac trunk at T12, the superior mesenteric at L1, the inferior mesenteric at L3. The lateral branches, from the mesonephric arteries, supply what grew from the intermediate mesoderm: the inferior phrenic arteries just above the coeliac trunk (giving the superior suprarenals), the middle suprarenal arteries beside the superior mesenteric, the renal arteries just below it, and the gonadal arteries a little lower, from the front.',
      focus: ['coeliac-trunk', 'renal-arteries', 'testicular-arteries'],
    },
    {
      id: 'dorsal',
      title: 'Branches to the body wall',
      body: 'Four pairs of lumbar arteries leave the back of the aorta opposite L1 to L4 (the fifth pair usually comes from the iliolumbar arteries). They wind round the vertebral bodies, under the crura above and behind psoas and quadratus lumborum, to the abdominal wall, each giving a dorsal branch with a spinal twig to the vertebral canal and then the back. The median sacral artery, the continuation of the embryo’s dorsal aorta, leaves the back just above the division and runs down to the coccyx.',
      focus: ['lumbar-arteries', 'median-sacral'],
    },
    {
      id: 'iliac',
      title: 'Common iliac arteries',
      body: 'Each runs down and out to end in front of the sacroiliac joint, at the level of the lumbosacral disc, by dividing into external and internal iliac arteries. The right crosses in front of the beginning of the IVC, the right common iliac vein behind it above and medial to it below. The left, a little shorter, is crossed by the inferior mesenteric vessels; deep to it on the sacral ala lie the sympathetic trunk, lumbosacral trunk, iliolumbar artery and obturator nerve.',
      focus: ['common-iliac-vessels'],
    },
    {
      id: 'lymph',
      title: 'Lymph nodes and the cisterna chyli',
      body: 'External iliac nodes collect from the inguinal nodes, the deep lower abdominal wall and some pelvic organs, and drain to the common iliac nodes, which pass lymph on to the lateral aortic nodes. These also drain what the lateral and dorsal branches supply, and form a lumbar trunk each side. The pre-aortic nodes, coeliac, superior and inferior mesenteric, drain the gut and form the intestinal trunks. The trunks join in the cisterna chyli, in front of L1 and L2 to the right of the aorta under the right crus; it continues up as the thoracic duct.',
      focus: ['aortic-lymph-nodes', 'cisterna-chyli'],
    },
  ],
  questions: [
    {
      id: 'ao-not-ventral',
      prompt: 'Which is not a ventral branch of the abdominal aorta?',
      options: [
        { id: 'gonadal', text: 'Gonadal artery' },
        { id: 'coeliac', text: 'Coeliac trunk' },
        { id: 'sma', text: 'Superior mesenteric artery' },
        { id: 'ima', text: 'Inferior mesenteric artery' },
      ],
      answerId: 'gonadal',
      explanation:
        'The gonadal arteries are paired lateral branches, though they leave from the front.',
    },
    {
      id: 'ao-division',
      prompt: 'The abdominal aorta divides in front of:',
      options: [
        { id: 'fourth', text: 'The fourth lumbar vertebra' },
        { id: 'second', text: 'The second lumbar vertebra' },
        { id: 'fifth', text: 'The fifth lumbar vertebra' },
        { id: 'sacrum', text: 'The first piece of the sacrum' },
      ],
      answerId: 'fourth',
      explanation: 'The IVC begins lower, on the right of L5.',
    },
    {
      id: 'ao-cisterna',
      prompt: 'The cisterna chyli lies:',
      options: [
        { id: 'right-l1', text: 'Right of the aorta, in front of L1 and L2' },
        { id: 'left-l1', text: 'Left of the aorta, in front of L1 and L2' },
        { id: 'front-l4', text: 'In front of the aortic division at L4' },
        { id: 'thorax', text: 'In the posterior mediastinum at T10' },
      ],
      answerId: 'right-l1',
      explanation: 'Overlapped by the right crus; it continues up as the thoracic duct.',
    },
    {
      id: 'ao-ovarian',
      prompt: 'The ovarian artery is a branch of the:',
      options: [
        { id: 'aorta', text: 'Abdominal aorta' },
        { id: 'internal-iliac', text: 'Internal iliac artery' },
        { id: 'common-iliac', text: 'Common iliac artery' },
        { id: 'renal', text: 'Renal artery' },
      ],
      answerId: 'aorta',
      explanation: 'Like the testicular artery, a little below the renal arteries.',
    },
  ],
  cards: [
    {
      id: 'ao-extent',
      front: 'Where does the abdominal aorta begin and end?',
      back: 'Aortic opening, lower border of T12; divides in front of L4, 1.25 cm left of the midline.',
    },
    {
      id: 'ao-branch-sets',
      front: 'The four sets of branches of the abdominal aorta?',
      back: 'Ventral: coeliac, SMA, IMA. Lateral: inferior phrenic, middle suprarenal, renal, gonadal. Dorsal: lumbar (4 pairs), median sacral. Terminal: common iliacs.',
    },
    {
      id: 'ao-common-iliac',
      front: 'Where does the common iliac artery divide?',
      back: 'In front of the sacroiliac joint, at the lumbosacral disc, into external and internal iliac arteries.',
    },
    {
      id: 'ao-trunks',
      front: 'Which lymph trunks form the cisterna chyli?',
      back: 'Right and left lumbar trunks (lateral aortic nodes) and the intestinal trunks (pre-aortic nodes).',
    },
    {
      id: 'ao-front',
      front: 'In front of the abdominal aorta, above down?',
      back: 'Coeliac and aortic plexuses, body of pancreas with splenic vein, left renal vein, third part of duodenum.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 27 Posterior Abdominal Wall',
      pages: '395–397, 399',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '387–389, 392–393' },
  ],
};
