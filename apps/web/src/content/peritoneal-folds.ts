import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  GUT_VESSELS,
  LESSER_OMENTUM_VIEW,
  MESENTERY_VIEW,
  ORGANS_FRONT,
  ORGANS_SKELETON,
  PERITONEAL_FOLDS,
  VISCERA,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const peritonealFolds: Topic = {
  slug: 'peritoneal-folds',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Peritoneal folds: omenta, mesentery and mesocolons',
  summary:
    'Where the folds come from (the mesenteries of the embryonic gut), and each in turn: greater and lesser omentum, the mesentery and its root, the mesoappendix, the transverse and sigmoid mesocolons and the falciform ligament.',
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
      'Volume 2, Chapter 18 Abdominal Cavity and Peritoneum: peritoneal folds, pages 274 to 279 and 288',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: omenta, mesenteries and ligaments, pages 301 to 306',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Greater and lesser omentum, transverse mesocolon and liver in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Organs, mesentery, mesoappendix and vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The gut has three parts, each with its own ventral branch of the aorta: foregut (coeliac trunk), midgut (superior mesenteric), hindgut (inferior mesenteric). Only the abdominal foregut has a ventral mesentery as well as a dorsal one.',
    'The ventral mesogastrium, split by the liver, gives the lesser omentum, falciform ligament, coronary and triangular ligaments. The dorsal mesogastrium gives the greater omentum, gastrosplenic, lienorenal and gastrophrenic ligaments.',
    'The greater omentum hangs from the greater curvature as four fused layers, folded back up to the transverse colon and pancreas; the gastroepiploic vessels run between its first two layers. The lesser omentum runs from the lesser curvature and first 2 cm of the duodenum to the liver; its free right margin holds the portal vein, hepatic artery and bile duct.',
    'The root of the mesentery, 15 cm long, runs from the duodenojejunal flexure left of L2 to the right sacroiliac joint, crossing the third part of the duodenum, aorta, inferior vena cava, right ureter and right psoas; its free border is about 6 m long.',
    'The transverse mesocolon hangs from the head and anterior border of the body of the pancreas (middle colic vessels). The sigmoid mesocolon’s root is an inverted V whose apex lies over the left ureter at the division of the left common iliac artery.',
  ],
  visual: {
    kind: 'path',
    // Left: the embryonic mesenteries and what each gives. Right: the folds of the midgut and hindgut.
    diagram: {
      width: 360,
      height: 480,
      nodes: [
        {
          id: 'gut-mesenteries',
          label: 'Mesenteries of\nthe embryonic gut',
          name: 'Mesenteries of the embryonic gut',
          x: 180,
          y: 30,
        },
        {
          id: 'ventral-mesogastrium',
          label: 'Ventral\nmesogastrium',
          name: 'Ventral mesogastrium (foregut only)',
          x: 85,
          y: 100,
        },
        {
          id: 'lesser-omentum',
          label: 'Lesser omentum',
          name: 'Lesser omentum: lesser curvature and first 2 cm of duodenum to the liver',
          x: 85,
          y: 160,
        },
        {
          id: 'falciform-ligament',
          label: 'Falciform ligament,\nligamentum teres',
          name: 'Falciform ligament, with the ligamentum teres in its free border',
          x: 85,
          y: 220,
        },
        {
          id: 'dorsal-mesogastrium',
          label: 'Dorsal\nmesogastrium',
          name: 'Dorsal mesogastrium',
          x: 85,
          y: 290,
        },
        {
          id: 'greater-omentum',
          label: 'Greater omentum:\nfour layers',
          name: 'Greater omentum: four fused layers from the greater curvature',
          x: 85,
          y: 355,
        },
        {
          id: 'splenic-ligaments',
          label: 'Gastrosplenic,\nlienorenal',
          name: 'Gastrosplenic and lienorenal ligaments',
          x: 85,
          y: 420,
        },
        {
          id: 'mesentery',
          label: 'Mesentery:\nroot 15 cm',
          name: 'Mesentery of the small intestine: root 15 cm, border 6 m',
          x: 275,
          y: 100,
        },
        {
          id: 'mesentery-root',
          label: 'Root crosses\nfive structures',
          name: 'The root crosses the third part of the duodenum, aorta, IVC, right ureter and right psoas',
          x: 275,
          y: 165,
        },
        {
          id: 'mesoappendix',
          label: 'Mesoappendix',
          name: 'Mesoappendix, from the back of the lower end of the mesentery',
          x: 275,
          y: 225,
        },
        {
          id: 'transverse-mesocolon',
          label: 'Transverse\nmesocolon',
          name: 'Transverse mesocolon, from the pancreas',
          x: 275,
          y: 290,
        },
        {
          id: 'sigmoid-mesocolon',
          label: 'Sigmoid meso-\ncolon: inverted V',
          name: 'Sigmoid mesocolon: an inverted V over the left ureter',
          x: 275,
          y: 355,
        },
        {
          id: 'lost-mesenteries',
          label: 'Lost: duodenum,\nascending, descending',
          name: 'Mesenteries lost in development: duodenum, ascending and descending colon, rectum',
          x: 270,
          y: 420,
        },
      ],
      edges: [
        { from: 'gut-mesenteries', to: 'ventral-mesogastrium' },
        { from: 'ventral-mesogastrium', to: 'lesser-omentum' },
        { from: 'lesser-omentum', to: 'falciform-ligament' },
        { from: 'gut-mesenteries', to: 'dorsal-mesogastrium' },
        { from: 'dorsal-mesogastrium', to: 'greater-omentum' },
        { from: 'greater-omentum', to: 'splenic-ligaments' },
        { from: 'gut-mesenteries', to: 'mesentery' },
        { from: 'mesentery', to: 'mesentery-root' },
        { from: 'mesentery-root', to: 'mesoappendix' },
        { from: 'gut-mesenteries', to: 'transverse-mesocolon' },
        { from: 'transverse-mesocolon', to: 'sigmoid-mesocolon' },
        { from: 'sigmoid-mesocolon', to: 'lost-mesenteries' },
      ],
    },
    lesions: [
      {
        id: 'omentum-policeman',
        label: 'The omentum seals a leak',
        nodeIds: ['greater-omentum'],
        explanation:
          'Its macrophages (milky spots) and its mobility let the greater omentum wrap a burst appendix or a perforated ulcer and delay generalized peritonitis: the policeman of the abdomen.',
      },
      {
        id: 'free-margin',
        label: 'Bleeding from the liver',
        nodeIds: ['lesser-omentum'],
        explanation:
          'The free right margin of the lesser omentum holds the portal vein, hepatic artery and bile duct. Squeezing it between finger and thumb through the epiploic foramen controls bleeding from the liver at operation.',
      },
      {
        id: 'mesentery-volvulus',
        label: 'Twisting on a fold',
        nodeIds: ['sigmoid-mesocolon', 'mesentery'],
        explanation:
          'A loop on a long fold with a narrow root, above all the sigmoid colon on its mesocolon, can twist (volvulus), kinking its vessels and blocking the bowel.',
      },
    ],
    drill: [
      {
        id: 'foregut',
        title: 'Foregut folds',
        hint: 'Ventral mesogastrium and what it gives; dorsal mesogastrium and what it gives.',
        nodeIds: [
          'ventral-mesogastrium',
          'lesser-omentum',
          'falciform-ligament',
          'dorsal-mesogastrium',
          'greater-omentum',
          'splenic-ligaments',
        ],
      },
      {
        id: 'midgut-hindgut',
        title: 'Midgut and hindgut folds',
        hint: 'The mesentery and its root, the mesoappendix, the two mesocolons, and those lost.',
        nodeIds: [
          'mesentery',
          'mesentery-root',
          'mesoappendix',
          'transverse-mesocolon',
          'sigmoid-mesocolon',
          'lost-mesenteries',
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
        ...GUT_VESSELS,
      ]),
      traces: [],
      stops: [
        {
          ...ORGANS_FRONT,
          description:
            'The greater omentum hangs like an apron from the greater curvature over the coils of intestine. Hide it in Layers, or pick it, to see the transverse mesocolon and the mesentery behind.',
        },
        LESSER_OMENTUM_VIEW,
        MESENTERY_VIEW,
      ],
    },
  },
  lesson: [
    {
      id: 'embryology',
      title: 'Where the folds come from',
      body: 'The gut is hung in the embryo from the back wall by a dorsal mesentery; the abdominal foregut also has a ventral one. Each part has its artery: the coeliac trunk for the foregut (to the opening of the bile duct), the superior mesenteric for the midgut (to the right two thirds of the transverse colon), the inferior mesenteric for the hindgut. The folds of the adult are what is left of these mesenteries.',
      focus: ['gut-mesenteries'],
    },
    {
      id: 'mesogastria',
      title: 'Ventral and dorsal mesogastrium',
      body: 'The liver grows into the ventral mesogastrium and splits it: in front, the falciform, coronary and triangular ligaments; behind, the lesser omentum. The dorsal mesogastrium balloons out as the greater omentum; the spleen grows in its upper part and divides it into the gastrosplenic and lienorenal ligaments; its top forms the gastrophrenic ligament. The mesenteries of the duodenum, ascending and descending colon and rectum are lost.',
      focus: [
        'ventral-mesogastrium',
        'dorsal-mesogastrium',
        'splenic-ligaments',
        'lost-mesenteries',
      ],
    },
    {
      id: 'greater-omentum',
      title: 'Greater omentum',
      body: 'Four fused layers: the front two come down from the greater curvature, fold back on themselves and the back two go up to the head and anterior border of the body of the pancreas, fusing with the transverse colon and its mesocolon. The lesser sac between the second and third layers is mostly obliterated. The right and left gastroepiploic vessels meet between the first two layers. It stores fat, guards against infection and divides the supracolic from the infracolic compartment.',
      focus: ['greater-omentum'],
    },
    {
      id: 'lesser-omentum',
      title: 'Lesser omentum',
      body: 'From the lesser curvature and the first 2 cm of the duodenum to the liver along an inverted L: the fissure for the ligamentum venosum and the porta hepatis. It has a hepatogastric and a hepatoduodenal part. Along the curvature run the right and left gastric vessels with their nodes and nerves; its free right margin holds the hepatic artery, portal vein and bile duct, with the epiploic foramen behind.',
      focus: ['lesser-omentum'],
    },
    {
      id: 'mesentery',
      title: 'The mesentery',
      body: 'A fan from the posterior wall to the jejunum and ileum. Its root, 15 cm long, runs from the duodenojejunal flexure on the left of L2 down to the upper part of the right sacroiliac joint, crossing the third part of the duodenum (where the superior mesenteric vessels enter it), the aorta, the inferior vena cava, the right ureter and the right psoas. Its border, pleated, is about 6 m long. It carries the jejunal and ileal vessels, nerves, lacteals and 100 to 200 lymph nodes; its fat is thickest low down.',
      focus: ['mesentery', 'mesentery-root'],
    },
    {
      id: 'mesocolons',
      title: 'Mesoappendix and mesocolons',
      body: 'The mesoappendix is a small triangle from the back of the lower end of the mesentery, carrying the appendicular vessels; it may stop short of the tip. The transverse mesocolon hangs the transverse colon from the head and anterior border of the body of the pancreas and carries the middle colic vessels. The sigmoid mesocolon’s root is an inverted V: its apex over the left ureter at the division of the left common iliac artery, its left limb along the external iliac artery, its right limb down to S3.',
      focus: ['mesoappendix', 'transverse-mesocolon', 'sigmoid-mesocolon'],
    },
    {
      id: 'falciform',
      title: 'The falciform ligament',
      body: 'A sickle-shaped fold from the front of the liver to the anterior abdominal wall and diaphragm, raised by the ligamentum teres (the obliterated left umbilical vein), which runs from the umbilicus to the left branch of the portal vein.',
      focus: ['falciform-ligament'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the front, lift away the greater omentum; from below on the right, find the lesser omentum’s free edge; then follow the root of the mesentery across the posterior wall. Turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'pf-lesser-margin',
      prompt: 'The free right margin of the lesser omentum contains all of these except the:',
      options: [
        { id: 'ivc', text: 'Inferior vena cava' },
        { id: 'portal', text: 'Portal vein' },
        { id: 'bile-duct', text: 'Bile duct' },
        { id: 'hepatic-artery', text: 'Proper hepatic artery' },
      ],
      answerId: 'ivc',
      explanation:
        'The inferior vena cava lies behind the epiploic foramen, forming its posterior wall.',
    },
    {
      id: 'pf-root',
      prompt: 'The root of the mesentery does not cross the:',
      options: [
        { id: 'left-ureter', text: 'Left ureter' },
        { id: 'duodenum', text: 'Third part of the duodenum' },
        { id: 'aorta', text: 'Aorta' },
        { id: 'right-ureter', text: 'Right ureter' },
      ],
      answerId: 'left-ureter',
      explanation:
        'It runs down to the right: duodenum, aorta, IVC, right ureter, right psoas. The sigmoid mesocolon crosses the left ureter.',
    },
    {
      id: 'pf-dorsal',
      prompt: 'Which comes from the dorsal mesogastrium?',
      options: [
        { id: 'lienorenal', text: 'Lienorenal ligament' },
        { id: 'falciform', text: 'Falciform ligament' },
        { id: 'lesser-omentum', text: 'Lesser omentum' },
        { id: 'coronary', text: 'Coronary ligament' },
      ],
      answerId: 'lienorenal',
      explanation:
        'With the greater omentum, gastrosplenic and gastrophrenic ligaments; the others come from the ventral mesogastrium.',
    },
    {
      id: 'pf-transverse-mesocolon',
      prompt: 'The transverse mesocolon is attached to the:',
      options: [
        { id: 'pancreas', text: 'Head and anterior border of the body of the pancreas' },
        { id: 'greater-curvature', text: 'Greater curvature of the stomach' },
        { id: 'duodenum', text: 'Third part of the duodenum' },
        { id: 'diaphragm', text: 'Diaphragm' },
      ],
      answerId: 'pancreas',
      explanation: 'It carries the middle colic vessels to the transverse colon.',
    },
  ],
  cards: [
    {
      id: 'pf-ventral',
      front: 'Derivatives of the ventral mesogastrium?',
      back: 'Lesser omentum; falciform, coronary and triangular ligaments of the liver.',
    },
    {
      id: 'pf-dorsal-card',
      front: 'Derivatives of the dorsal mesogastrium?',
      back: 'Greater omentum; gastrosplenic, lienorenal and gastrophrenic ligaments.',
    },
    {
      id: 'pf-mesentery-root',
      front: 'Root of the mesentery: length, extent, what it crosses?',
      back: '15 cm, from the duodenojejunal flexure (left of L2) to the right sacroiliac joint; crosses D3, aorta, IVC, right ureter, right psoas.',
    },
    {
      id: 'pf-greater-layers',
      front: 'How are the layers of the greater omentum arranged?',
      back: 'Two layers down from the greater curvature fold back as layers 3 and 4 up to the pancreas (layer 1 becomes 4, layer 2 becomes 3); gastroepiploic vessels between 1 and 2.',
    },
    {
      id: 'pf-sigmoid',
      front: 'Root of the sigmoid mesocolon?',
      back: 'An inverted V: apex over the left ureter at the division of the left common iliac artery; left limb along the external iliac artery; right limb down to S3.',
    },
    {
      id: 'pf-lesser-attachment',
      front: 'Attachments of the lesser omentum?',
      back: 'Below: lesser curvature and first 2 cm of the duodenum. Above: the liver along an inverted L (fissure for the ligamentum venosum, porta hepatis).',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 18 Abdominal Cavity and Peritoneum',
      pages: '274–279, 288',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '301–306' },
  ],
};
