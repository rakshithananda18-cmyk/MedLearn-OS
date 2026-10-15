import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  DUODENUM_VIEW,
  ORGANS_SIDE,
  ORGANS_SKELETON,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const duodenum: Topic = {
  slug: 'duodenum',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The duodenum',
  summary:
    'The C-shaped first part of the small intestine round the head of the pancreas: its four parts and their relations, the papillae, the suspensory muscle, and its supply from foregut and midgut.',
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
      'Volume 2, Chapter 20 Small and Large Intestines: small intestine and duodenum, pages 303 to 310',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: duodenum, pages 309 to 312'),
    {
      title: 'Z-Anatomy',
      detail: 'Bile duct in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Duodenum, pancreas, vessels and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The shortest, widest and most fixed part of the small intestine: 25 cm, curved as a C round the head of the pancreas from the pylorus to the duodenojejunal flexure, opposite L1 to L3, above the umbilicus.',
    'First (superior) part 5 cm, back, up and to the right; second (descending) 7.5 cm, down to the lower border of L3; third (horizontal) 10 cm, across in front of the inferior vena cava and aorta; fourth (ascending) 2.5 cm, up to the upper border of L2.',
    'Retroperitoneal and fixed, except its two ends: the first 2.5 cm, held by the lesser omentum above and the greater omentum below, and the end of the fourth part, held by the top of the mesentery.',
    'The bile and main pancreatic ducts open on the major duodenal papilla on the back of the inner wall of the second part, 8 to 10 cm from the pylorus; the accessory pancreatic duct on the minor papilla, 6 to 8 cm from it.',
    'That opening marks the junction of foregut and midgut. Above it the duodenum is supplied by the superior pancreaticoduodenal arteries (from the coeliac trunk, through the gastroduodenal), below it by the inferior pancreaticoduodenal (from the superior mesenteric).',
  ],
  visual: {
    kind: 'path',
    // Left: the four parts in order. Right: peritoneum, relations, suspension and supply.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'duodenum', label: 'Duodenum: 25 cm', name: 'Duodenum, 25 cm', x: 180, y: 30 },
        {
          id: 'first-part',
          label: 'First part: 5 cm,\nat L1',
          name: 'First (superior) part, 5 cm, at L1',
          x: 85,
          y: 100,
        },
        {
          id: 'gastroduodenal-artery',
          label: 'Behind first part:\ngastroduodenal',
          name: 'Behind the first part: gastroduodenal artery, bile duct and portal vein',
          x: 85,
          y: 165,
        },
        {
          id: 'second-part',
          label: 'Second part:\n7.5 cm, L1 to L3',
          name: 'Second (descending) part, 7.5 cm, from L1 to the lower border of L3',
          x: 85,
          y: 230,
        },
        {
          id: 'major-papilla',
          label: 'Major papilla:\nbile, pancreatic',
          name: 'Major duodenal papilla, opening of the bile and main pancreatic ducts',
          x: 85,
          y: 295,
        },
        {
          id: 'third-part',
          label: 'Third part: 10 cm\nacross at L3',
          name: 'Third (horizontal) part, 10 cm, across at L3',
          x: 85,
          y: 355,
        },
        {
          id: 'fourth-part',
          label: 'Fourth part:\n2.5 cm, up to L2',
          name: 'Fourth (ascending) part, 2.5 cm, up to the duodenojejunal flexure at L2',
          x: 85,
          y: 415,
        },
        {
          id: 'peritoneum',
          label: 'Retroperitoneal\nexcept its ends',
          name: 'Retroperitoneal and fixed except the first 2.5 cm and the end',
          x: 275,
          y: 100,
        },
        {
          id: 'pancreas',
          label: 'Head of pancreas\nin its curve',
          name: 'Head of the pancreas, in the concavity of the C',
          x: 275,
          y: 165,
        },
        {
          id: 'kidneys',
          label: 'Behind second:\nright kidney',
          name: 'Behind the second part: right kidney, renal vessels, inferior vena cava, psoas',
          x: 275,
          y: 230,
        },
        {
          id: 'superior-mesenteric-artery',
          label: 'In front of third:\nSMA, mesentery',
          name: 'In front of the third part: superior mesenteric vessels and the root of the mesentery',
          x: 275,
          y: 295,
        },
        {
          id: 'suspensory-muscle',
          label: 'Suspensory muscle\n(Treitz)',
          name: 'Suspensory muscle of the duodenum (ligament of Treitz)',
          x: 275,
          y: 355,
        },
        {
          id: 'superior-pancreaticoduodenal-arteries',
          label: 'Superior, inferior\npancreaticoduodenal',
          name: 'Superior pancreaticoduodenal (foregut) and inferior pancreaticoduodenal (midgut) arteries',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'duodenum', to: 'first-part' },
        { from: 'first-part', to: 'gastroduodenal-artery' },
        { from: 'gastroduodenal-artery', to: 'second-part' },
        { from: 'second-part', to: 'major-papilla' },
        { from: 'major-papilla', to: 'third-part' },
        { from: 'third-part', to: 'fourth-part' },
        { from: 'duodenum', to: 'peritoneum' },
        { from: 'peritoneum', to: 'pancreas' },
        { from: 'pancreas', to: 'kidneys' },
        { from: 'kidneys', to: 'superior-mesenteric-artery' },
        { from: 'superior-mesenteric-artery', to: 'suspensory-muscle' },
        { from: 'suspensory-muscle', to: 'superior-pancreaticoduodenal-arteries' },
      ],
    },
    lesions: [
      {
        id: 'duodenal-ulcer',
        label: 'Duodenal ulcer',
        nodeIds: ['first-part', 'gastroduodenal-artery'],
        explanation:
          'The first part takes acid straight from the stomach and is the commonest site of peptic ulcer. The pain sits in the right epigastrium, eased by food and back when the stomach empties. An ulcer of the back wall can erode the gastroduodenal artery behind it and bleed; one of the front wall perforates into the greater sac.',
      },
      {
        id: 'sma-compression',
        label: 'Third part trapped',
        nodeIds: ['third-part', 'superior-mesenteric-artery'],
        explanation:
          'The third part passes between the aorta behind and the superior mesenteric artery in front, like a nut between the arms of a nutcracker. If the angle between the two arteries closes, the duodenum is squeezed and obstructed above it.',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'The four parts',
        hint: 'Each part with its length and level, and what opens into the second.',
        nodeIds: [
          'first-part',
          'gastroduodenal-artery',
          'second-part',
          'major-papilla',
          'third-part',
          'fourth-part',
        ],
      },
      {
        id: 'relations',
        title: 'Relations and supply',
        hint: 'Peritoneum, the pancreas, what lies behind and in front, what holds it up, what feeds it.',
        nodeIds: [
          'peritoneum',
          'pancreas',
          'kidneys',
          'superior-mesenteric-artery',
          'suspensory-muscle',
          'superior-pancreaticoduodenal-arteries',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [
          ...ORGANS_SKELETON,
          'gallbladder',
          'bile-duct',
          'stomach',
          'duodenum',
          'pancreas',
          'spleen',
          'kidneys',
          'suprarenal-glands',
          'ureters',
          'abdominal-aorta',
          'inferior-vena-cava',
          'coeliac-trunk',
          'hepatic-artery',
          'gastroduodenal-artery',
          'superior-pancreaticoduodenal-arteries',
          'inferior-pancreaticoduodenal-artery',
          'superior-mesenteric-artery',
          'superior-mesenteric-vein',
          'portal-vein',
          'splenic-vein',
        ],
        ['stomach', 'spleen', 'kidneys'],
      ),
      traces: [],
      stops: [
        DUODENUM_VIEW,
        {
          ...ORGANS_SIDE,
          id: 'aorta-sma-angle',
          title: 'Between the aorta and the artery',
          description:
            'From the left and below: the third part of the duodenum passes in the angle between the aorta behind and the superior mesenteric artery in front.',
          target: [0, -125, 1000],
          position: [600, -420, 940],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'shape',
      title: 'A C round the pancreas',
      body: 'The duodenum (twelve fingers long) is the shortest, widest and most fixed part of the small intestine, 25 cm from the pylorus to the duodenojejunal flexure. It curves as a C round the head of the pancreas, opposite L1 to L3, above the umbilicus. It is retroperitoneal and fixed, except for the first 2.5 cm, held by the lesser omentum above and the greater omentum below, and the end of the fourth part, held by the top of the mesentery.',
      focus: ['peritoneum', 'pancreas'],
    },
    {
      id: 'first',
      title: 'The first part',
      body: 'Five centimetres from the pylorus, back, up and to the right, at L1. In front: the quadrate lobe of the liver and the gallbladder. Behind: the gastroduodenal artery, the bile duct and the portal vein. Above: the epiploic foramen. Below: the head and neck of the pancreas. In a barium meal it shows as a triangular shadow, the duodenal cap.',
      focus: ['first-part', 'gastroduodenal-artery'],
    },
    {
      id: 'second',
      title: 'The second part and its papillae',
      body: 'From the superior flexure 7.5 cm down to the lower border of L3. In front: the right lobe of the liver, the transverse colon and its mesocolon, small intestine. Behind: the right kidney near its hilum, the renal vessels, the edge of the inferior vena cava and the psoas. Medially: the head of the pancreas and the bile duct. Inside, on its back inner wall, the major papilla, 8 to 10 cm from the pylorus, takes the bile and main pancreatic ducts through the hepatopancreatic ampulla; the minor papilla, 6 to 8 cm from it, the accessory duct.',
      focus: ['second-part', 'major-papilla', 'kidneys'],
    },
    {
      id: 'third-fourth',
      title: 'The third and fourth parts',
      body: 'The third part runs 10 cm across from the right of L3, in front of the right ureter, psoas, gonadal vessels, inferior vena cava and aorta, with the head and uncinate process of the pancreas above. The superior mesenteric vessels and the root of the mesentery cross in front of it. The fourth part rises 2.5 cm on the left of the aorta to the upper border of L2 and turns forward as the duodenojejunal flexure, with the left sympathetic chain, left renal and gonadal arteries and inferior mesenteric vein behind it.',
      focus: ['third-part', 'superior-mesenteric-artery', 'fourth-part'],
    },
    {
      id: 'suspension-supply',
      title: 'Held up and fed',
      body: 'The suspensory muscle (ligament of Treitz) runs from the right crus of the diaphragm behind the pancreas to the duodenojejunal flexure: striped muscle above, elastic tissue in the middle, smooth muscle below. Its pull opens the angle of the flexure. The duodenum is foregut above the opening of the bile duct and midgut below it, so the superior pancreaticoduodenal arteries (through the gastroduodenal from the coeliac trunk) supply the upper half and the inferior pancreaticoduodenal (from the superior mesenteric) the lower. The first part also gets the right gastric, supraduodenal and right gastroepiploic arteries.',
      focus: ['suspensory-muscle', 'superior-pancreaticoduodenal-arteries'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the front, follow the C from the pylorus round the head of the pancreas to the flexure; from the left, see the third part between the aorta and the superior mesenteric artery. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'du-papilla',
      prompt: 'The major duodenal papilla lies in the:',
      options: [
        { id: 'second', text: 'Second part' },
        { id: 'first', text: 'First part' },
        { id: 'third', text: 'Third part' },
        { id: 'fourth', text: 'Fourth part' },
      ],
      answerId: 'second',
      explanation: 'On the back of its inner wall, 8 to 10 cm from the pylorus.',
    },
    {
      id: 'du-longest',
      prompt: 'The longest part of the duodenum is the:',
      options: [
        { id: 'third', text: 'Third (horizontal) part, 10 cm' },
        { id: 'second', text: 'Second (descending) part' },
        { id: 'first', text: 'First (superior) part' },
        { id: 'fourth', text: 'Fourth (ascending) part' },
      ],
      answerId: 'third',
      explanation: 'First 5 cm, second 7.5 cm, third 10 cm, fourth 2.5 cm.',
    },
    {
      id: 'du-crossed',
      prompt: 'The third part of the duodenum is crossed in front by the:',
      options: [
        { id: 'sma', text: 'Superior mesenteric vessels' },
        { id: 'ima', text: 'Inferior mesenteric artery' },
        { id: 'gda', text: 'Gastroduodenal artery' },
        { id: 'ivc', text: 'Inferior vena cava' },
      ],
      answerId: 'sma',
      explanation:
        'With the root of the mesentery; the inferior vena cava and aorta lie behind it.',
    },
    {
      id: 'du-treitz',
      prompt: 'The suspensory muscle of the duodenum arises from the:',
      options: [
        { id: 'right-crus', text: 'Right crus of the diaphragm' },
        { id: 'left-crus', text: 'Left crus of the diaphragm' },
        { id: 'pancreas', text: 'Neck of the pancreas' },
        { id: 'mesentery', text: 'Root of the mesentery' },
      ],
      answerId: 'right-crus',
      explanation:
        'Beside the oesophagus, passing behind the pancreas to the duodenojejunal flexure.',
    },
  ],
  cards: [
    {
      id: 'du-parts',
      front: 'Parts of the duodenum and their lengths?',
      back: 'First (superior) 5 cm, second (descending) 7.5 cm, third (horizontal) 10 cm, fourth (ascending) 2.5 cm: 25 cm in all.',
    },
    {
      id: 'du-mobile',
      front: 'Which parts of the duodenum are mobile?',
      back: 'The first 2.5 cm (lesser omentum above, greater omentum below) and the end of the fourth part (on the mesentery). The rest is retroperitoneal.',
    },
    {
      id: 'du-papillae',
      front: 'Duodenal papillae?',
      back: 'Major: bile and main pancreatic ducts, 8 to 10 cm from the pylorus. Minor: accessory pancreatic duct, 6 to 8 cm from it. Both in the second part.',
    },
    {
      id: 'du-supply',
      front: 'Arterial supply of the duodenum?',
      back: 'Above the bile duct opening (foregut): superior pancreaticoduodenal arteries. Below it (midgut): inferior pancreaticoduodenal. First part also: right gastric, supraduodenal, right gastroepiploic.',
    },
    {
      id: 'du-cap',
      front: 'Duodenal cap?',
      back: 'The triangular shadow of the first part of the duodenum in a barium meal.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 20 Small and Large Intestines',
      pages: '303–310',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '309–312' },
  ],
};
