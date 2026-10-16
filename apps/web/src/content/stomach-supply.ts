import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  COELIAC_BRANCHES,
  COELIAC_VIEW,
  ORGANS_SKELETON,
  STOMACH_FRONT,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const stomachSupply: Topic = {
  slug: 'stomach-supply',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Vessels, lymph and nerves of the stomach',
  summary:
    'The arteries along each curvature and to the fundus, where its veins drain, its four lymph territories, its sympathetic and vagal nerves, and the interior where ulcers form.',
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
      'Volume 2, Chapter 19 Abdominal Part of Oesophagus and Stomach: blood supply, lymphatic drainage, nerve supply and interior, pages 295 to 299',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: arterial supply of the stomach from the celiac trunk, pages 344 to 347',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Stomach, organs, gastric arteries and veins in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Along the lesser curvature: the left gastric artery (from the coeliac trunk) and the right gastric (from the proper hepatic). Along the greater curvature: the right gastroepiploic (from the gastroduodenal) and the left gastroepiploic (from the splenic). To the fundus: five to seven short gastric arteries (from the splenic).',
    'The veins follow the arteries: the right and left gastric veins into the portal vein, the right gastroepiploic into the superior mesenteric vein, the left gastroepiploic and short gastric veins into the splenic vein.',
    'Four lymph territories: the upper left third to the pancreaticosplenic nodes; the right two-thirds to the left gastric nodes; the lower left third to the right gastroepiploic and subpyloric nodes; the pyloric part to the pyloric, hepatic and left gastric nodes. All of it ends in the coeliac nodes.',
    'Sympathetic fibres from T6 to T10 through the greater splanchnic nerves and coeliac plexus are vasomotor, close the pyloric sphincter and carry pain. The vagi supply it through the anterior gastric nerve (mainly left vagus) and posterior gastric nerve (mainly right vagus): they drive movement and the secretion of acid and pepsin, and relax the pylorus.',
    'Inside, the empty stomach lies in folds, the rugae, running lengthwise along the lesser curvature as the gastric canal that carries swallowed fluids straight down. Its muscle is outer longitudinal, middle circular (thickened as the pyloric sphincter) and an inner oblique layer.',
  ],
  visual: {
    kind: 'path',
    // Left: the arteries and veins. Right: lymph, nerves and the interior.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'stomach', label: 'Stomach', name: 'Stomach', x: 180, y: 30 },
        {
          id: 'left-gastric-artery',
          label: 'Left gastric',
          name: 'Left gastric artery, from the coeliac trunk, along the lesser curvature',
          x: 85,
          y: 100,
        },
        {
          id: 'right-gastric-artery',
          label: 'Right gastric',
          name: 'Right gastric artery, from the proper hepatic, along the lesser curvature',
          x: 85,
          y: 155,
        },
        {
          id: 'right-gastroepiploic-artery',
          label: 'Right gastroepiploic',
          name: 'Right gastroepiploic artery, from the gastroduodenal, along the greater curvature',
          x: 85,
          y: 210,
        },
        {
          id: 'left-gastroepiploic-artery',
          label: 'Left gastroepiploic',
          name: 'Left gastroepiploic artery, from the splenic, along the greater curvature',
          x: 85,
          y: 265,
        },
        {
          id: 'short-gastric',
          label: 'Short gastric\narteries',
          name: 'Five to seven short gastric arteries, from the splenic, to the fundus',
          x: 85,
          y: 325,
        },
        {
          id: 'gastric-veins',
          label: 'Veins: portal, SMV,\nsplenic',
          name: 'Veins to the portal, superior mesenteric and splenic veins',
          x: 85,
          y: 395,
        },
        {
          id: 'lymph-territories',
          label: 'Four lymph\nterritories',
          name: 'Four lymph territories of the stomach',
          x: 275,
          y: 100,
        },
        {
          id: 'coeliac-nodes',
          label: 'All to coeliac\nnodes',
          name: 'Coeliac nodes, which receive all the lymph of the stomach',
          x: 275,
          y: 165,
        },
        {
          id: 'sympathetic',
          label: 'Sympathetic T6 to\nT10: pain',
          name: 'Sympathetic supply from T6 to T10 through the coeliac plexus, carrying pain',
          x: 275,
          y: 230,
        },
        {
          id: 'gastric-nerves',
          label: 'Vagal gastric\nnerves',
          name: 'Anterior (left vagus) and posterior (right vagus) gastric nerves',
          x: 275,
          y: 295,
        },
        {
          id: 'rugae',
          label: 'Rugae and the\ngastric canal',
          name: 'Gastric rugae and the gastric canal along the lesser curvature',
          x: 275,
          y: 355,
        },
        {
          id: 'muscle-coats',
          label: 'Three muscle coats',
          name: 'Longitudinal, circular (pyloric sphincter) and oblique muscle coats',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'stomach', to: 'left-gastric-artery' },
        { from: 'left-gastric-artery', to: 'right-gastric-artery' },
        { from: 'right-gastric-artery', to: 'right-gastroepiploic-artery' },
        { from: 'right-gastroepiploic-artery', to: 'left-gastroepiploic-artery' },
        { from: 'left-gastroepiploic-artery', to: 'short-gastric' },
        { from: 'short-gastric', to: 'gastric-veins' },
        { from: 'stomach', to: 'lymph-territories' },
        { from: 'lymph-territories', to: 'coeliac-nodes' },
        { from: 'coeliac-nodes', to: 'sympathetic' },
        { from: 'sympathetic', to: 'gastric-nerves' },
        { from: 'gastric-nerves', to: 'rugae' },
        { from: 'rugae', to: 'muscle-coats' },
      ],
    },
    lesions: [
      {
        id: 'gastric-ulcer',
        label: 'Gastric ulcer',
        nodeIds: ['rugae', 'left-gastric-artery', 'sympathetic'],
        explanation:
          'Ulcers favour the lesser curvature: the gastric canal funnels irritant drinks along it, its mucosa is thin and fixed to the muscle, and its blood supply sparser. Pain is felt in the epigastrium, the skin of the same segments (T6 to T9); an ulcer that erodes the left gastric artery bleeds heavily.',
      },
      {
        id: 'gastric-cancer',
        label: 'Cancer of the stomach',
        nodeIds: ['lymph-territories', 'coeliac-nodes'],
        explanation:
          'Commoner along the greater curvature. It spreads through the lymph territories towards the coeliac nodes, so the nodes come out with the stomach; through the thoracic duct it can reach the left supraclavicular node (Virchow’s node), a sign named after Troisier.',
      },
    ],
    drill: [
      {
        id: 'supply',
        title: 'Arteries and veins',
        hint: 'Lesser curvature, greater curvature, fundus, then where the veins go.',
        nodeIds: [
          'left-gastric-artery',
          'right-gastric-artery',
          'right-gastroepiploic-artery',
          'left-gastroepiploic-artery',
          'short-gastric',
          'gastric-veins',
        ],
      },
      {
        id: 'lymph-nerves',
        title: 'Lymph, nerves and the interior',
        hint: 'Territories and their end, the two kinds of nerve, then the inside.',
        nodeIds: [
          'lymph-territories',
          'coeliac-nodes',
          'sympathetic',
          'gastric-nerves',
          'rugae',
          'muscle-coats',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [
          ...ORGANS_SKELETON,
          'abdominal-oesophagus',
          'stomach',
          'spleen',
          'pancreas',
          'duodenum',
          'kidneys',
          'abdominal-aorta',
          'inferior-vena-cava',
          'coeliac-trunk',
          ...COELIAC_BRANCHES,
          'splenic-artery',
          'portal-vein',
          'splenic-vein',
          'superior-mesenteric-vein',
          'left-gastric-vein',
          'right-gastric-vein',
        ],
        ['stomach'],
      ),
      traces: [],
      stops: [
        {
          ...STOMACH_FRONT,
          title: 'Arcades on both curvatures',
          description:
            'The left and right gastric arteries meet along the lesser curvature, the two gastroepiploic arteries along the greater; the liver is lifted away.',
        },
        {
          ...COELIAC_VIEW,
          title: 'Where they come from',
          description:
            'All from the coeliac trunk: the left gastric directly, the right gastric and right gastroepiploic through the hepatic artery, the left gastroepiploic and short gastrics through the splenic.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'lesser-curvature',
      title: 'Along the lesser curvature',
      body: 'The left gastric artery, a direct branch of the coeliac trunk, climbs to the cardiac end, gives oesophageal branches, and turns down the lesser curvature between the layers of the lesser omentum. The right gastric artery, from the proper hepatic, runs to the left along the same curvature, and the two join in an arcade.',
      focus: ['left-gastric-artery', 'right-gastric-artery'],
    },
    {
      id: 'greater-curvature',
      title: 'Along the greater curvature and the fundus',
      body: 'The right gastroepiploic artery, from the gastroduodenal behind the first part of the duodenum, runs left in the greater omentum along the greater curvature, and the left gastroepiploic, from the end of the splenic artery, runs right to meet it. Both feed the stomach and the omentum. The fundus gets five to seven short gastric arteries from the end of the splenic artery through the gastrosplenic ligament.',
      focus: ['right-gastroepiploic-artery', 'left-gastroepiploic-artery', 'short-gastric'],
    },
    {
      id: 'veins',
      title: 'The veins',
      body: 'The right and left gastric veins drain straight into the portal vein; the left gastric also takes oesophageal veins, which makes it part of the portosystemic anastomosis at the lower oesophagus. The right gastroepiploic vein ends in the superior mesenteric vein; the left gastroepiploic and short gastric veins in the splenic vein.',
      focus: ['gastric-veins'],
    },
    {
      id: 'lymph',
      title: 'Four lymph territories',
      body: 'Divide the stomach by a vertical line a third of the way from the left, and the left third by a horizontal line. The upper left third drains along the splenic artery to the pancreaticosplenic nodes; the right two-thirds to the left gastric nodes, with the abdominal oesophagus; the lower left third to the right gastroepiploic nodes and on to the subpyloric and hepatic nodes; the pyloric part to the pyloric, hepatic and left gastric nodes. Every path ends in the coeliac nodes, then the intestinal trunk and cisterna chyli.',
      focus: ['lymph-territories', 'coeliac-nodes'],
    },
    {
      id: 'nerves',
      title: 'Nerves',
      body: 'Sympathetic fibres from T6 to T10 reach it along its arteries from the greater splanchnic nerves and coeliac plexus: they narrow the vessels, close the pyloric sphincter, relax the rest, and carry its pain. The vagi come through the oesophageal plexus as the anterior gastric nerve (mainly left vagus: gastric and pyloric branches) and posterior gastric nerve (mainly right vagus: gastric and large coeliac branches). They stir the muscle and the secretion of acid and pepsin, and relax the pylorus.',
      focus: ['sympathetic', 'gastric-nerves'],
    },
    {
      id: 'interior',
      title: 'Inside the stomach',
      body: 'The mucosa of the empty stomach is folded into rugae, which flatten as it fills. Along the lesser curvature they run lengthwise as the gastric canal (magenstrasse), which carries swallowed fluids straight down, so this curvature takes the brunt of hot, cold or irritant drinks. Gastric pits on the surface lead into the gastric glands. The muscle has three coats: outer longitudinal, middle circular, thickened at the pylorus as the sphincter, and inner oblique, looping over the cardiac notch.',
      focus: ['rugae', 'muscle-coats'],
    },
  ],
  questions: [
    {
      id: 'ss-fundus',
      prompt: 'The fundus of the stomach is supplied by the:',
      options: [
        { id: 'short-gastric', text: 'Short gastric arteries' },
        { id: 'right-gastric', text: 'Right gastric artery' },
        { id: 'gastroduodenal', text: 'Gastroduodenal artery' },
        { id: 'right-gastroepiploic', text: 'Right gastroepiploic artery' },
      ],
      answerId: 'short-gastric',
      explanation: 'Five to seven, from the splenic artery through the gastrosplenic ligament.',
    },
    {
      id: 'ss-right-gastroepiploic',
      prompt: 'The right gastroepiploic artery is a branch of the:',
      options: [
        { id: 'gastroduodenal', text: 'Gastroduodenal artery' },
        { id: 'splenic', text: 'Splenic artery' },
        { id: 'left-gastric', text: 'Left gastric artery' },
        { id: 'superior-mesenteric', text: 'Superior mesenteric artery' },
      ],
      answerId: 'gastroduodenal',
      explanation: 'The left gastroepiploic comes from the splenic.',
    },
    {
      id: 'ss-lymph',
      prompt: 'Lymph from every part of the stomach finally reaches the:',
      options: [
        { id: 'coeliac', text: 'Coeliac nodes' },
        { id: 'superior-mesenteric', text: 'Superior mesenteric nodes' },
        { id: 'para-aortic', text: 'Para-aortic nodes' },
        { id: 'supraclavicular', text: 'Left supraclavicular nodes' },
      ],
      answerId: 'coeliac',
      explanation:
        'Through the pancreaticosplenic, left gastric, gastroepiploic, subpyloric, pyloric and hepatic nodes on the way.',
    },
    {
      id: 'ss-posterior-nerve',
      prompt: 'The posterior gastric nerve carries mainly fibres of the:',
      options: [
        { id: 'right-vagus', text: 'Right vagus' },
        { id: 'left-vagus', text: 'Left vagus' },
        { id: 'greater-splanchnic', text: 'Greater splanchnic nerve' },
        { id: 'phrenic', text: 'Phrenic nerve' },
      ],
      answerId: 'right-vagus',
      explanation:
        'The oesophagus turns as it descends, so the left vagus comes to lie in front (anterior gastric nerve) and the right behind.',
    },
  ],
  cards: [
    {
      id: 'ss-lesser',
      front: 'Arteries along the lesser curvature?',
      back: 'Left gastric (from the coeliac trunk) and right gastric (from the proper hepatic).',
    },
    {
      id: 'ss-greater',
      front: 'Arteries along the greater curvature and to the fundus?',
      back: 'Right gastroepiploic (from the gastroduodenal), left gastroepiploic and five to seven short gastrics (from the splenic).',
    },
    {
      id: 'ss-veins',
      front: 'Where do the gastric veins drain?',
      back: 'Right and left gastric: portal vein. Right gastroepiploic: superior mesenteric vein. Left gastroepiploic and short gastrics: splenic vein.',
    },
    {
      id: 'ss-ulcer-site',
      front: 'Why do gastric ulcers favour the lesser curvature?',
      back: 'The gastric canal funnels fluids along it; its mucosa is thin and fixed; its blood supply is sparser with fewer anastomoses; and Helicobacter pylori.',
    },
    {
      id: 'ss-nerves',
      front: 'Nerve supply of the stomach?',
      back: 'Sympathetic T6 to T10 (vasomotor, closes the pylorus, carries pain). Vagus: anterior gastric nerve mainly left vagus, posterior mainly right (motor, secretomotor, relaxes the pylorus).',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 19 Abdominal Part of Oesophagus and Stomach',
      pages: '295–299',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '344–347' },
  ],
};
