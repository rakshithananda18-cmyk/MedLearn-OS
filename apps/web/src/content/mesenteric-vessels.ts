import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  MESENTERIC_BRANCHES,
  MESENTERIC_VIEW,
  MESENTERY_VIEW,
  ORGANS_SKELETON,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const mesentericVessels: Topic = {
  slug: 'mesenteric-vessels',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Superior and inferior mesenteric vessels',
  summary:
    'The arteries of the midgut and hindgut: where each arises, its course and relations, its branches to the intestine, the marginal artery that joins them along the colon, and the veins that go with them.',
  estimatedMinutes: 15,
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
      'Volume 2, Chapter 21 Large Blood Vessels of the Gut: superior and inferior mesenteric vessels, marginal artery, pages 325 to 330',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: superior and inferior mesenteric arteries, pages 348 to 353',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Sigmoid colon in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Mesenteric arteries and veins, intestine and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The superior mesenteric artery, the artery of the midgut, leaves the aorta at L1, 1 cm below the coeliac trunk, behind the body of the pancreas and the splenic vein. It passes in front of the left renal vein, the uncinate process and the third part of the duodenum into the root of the mesentery, crosses the inferior vena cava and right psoas, and ends in the right iliac fossa.',
    'From its right side: inferior pancreaticoduodenal, middle colic (in the transverse mesocolon), right colic and ileocolic (caecal, appendicular and ileal branches). From its left: 12 to 15 jejunal and ileal arteries, joined in arcades that send vasa recta to the gut. It feeds the gut from the bile duct opening to the right two-thirds of the transverse colon.',
    'The inferior mesenteric artery, the artery of the hindgut, leaves the aorta at L3 behind the third part of the duodenum, 3 to 4 cm above the bifurcation. It runs down and left behind the peritoneum, crosses the left common iliac artery medial to the left ureter and continues as the superior rectal artery. Branches: left colic, two to four sigmoid, superior rectal.',
    'The marginal artery runs along the inner border of the colon, 2.5 to 3.8 cm from it, joining the ileocolic, right, middle and left colic and sigmoid arteries; it can keep the colon alive when one main artery is tied.',
    'The superior mesenteric vein lies right of its artery and joins the splenic vein behind the neck of the pancreas to form the portal vein. The inferior mesenteric vein begins as the superior rectal, rises lateral to its artery, beside the duodenojejunal flexure, and ends behind the pancreas in the splenic vein.',
  ],
  visual: {
    kind: 'path',
    // Left: the superior mesenteric and its branches. Right: the inferior mesenteric, the marginal
    // artery and the veins.
    diagram: {
      width: 360,
      height: 490,
      nodes: [
        {
          id: 'abdominal-aorta',
          label: 'Abdominal aorta',
          name: 'Abdominal aorta, with its three ventral branches to the gut',
          x: 180,
          y: 30,
        },
        {
          id: 'superior-mesenteric-artery',
          label: 'Superior mesenteric:\nmidgut, L1',
          name: 'Superior mesenteric artery, the artery of the midgut, at L1',
          x: 85,
          y: 100,
        },
        {
          id: 'inferior-pancreaticoduodenal-artery',
          label: 'Inferior pancreatico-\nduodenal',
          name: 'Inferior pancreaticoduodenal artery',
          x: 85,
          y: 165,
        },
        {
          id: 'middle-colic-artery',
          label: 'Middle colic',
          name: 'Middle colic artery, in the transverse mesocolon',
          x: 85,
          y: 225,
        },
        {
          id: 'right-colic-artery',
          label: 'Right colic',
          name: 'Right colic artery',
          x: 85,
          y: 280,
        },
        {
          id: 'ileocolic-artery',
          label: 'Ileocolic',
          name: 'Ileocolic artery: caecal, appendicular, ileal and colic branches',
          x: 85,
          y: 335,
        },
        {
          id: 'jejunal-ileal',
          label: 'Jejunal and ileal:\n12 to 15',
          name: 'Twelve to fifteen jejunal and ileal arteries, from its left side',
          x: 85,
          y: 395,
        },
        {
          id: 'superior-mesenteric-vein',
          label: 'SMV joins splenic:\nportal vein',
          name: 'Superior mesenteric vein, joining the splenic vein to form the portal vein',
          x: 85,
          y: 455,
        },
        {
          id: 'inferior-mesenteric-artery',
          label: 'Inferior mesenteric:\nhindgut, L3',
          name: 'Inferior mesenteric artery, the artery of the hindgut, at L3',
          x: 275,
          y: 100,
        },
        {
          id: 'left-colic-artery',
          label: 'Left colic',
          name: 'Left colic artery',
          x: 275,
          y: 165,
        },
        {
          id: 'sigmoid-arteries',
          label: 'Sigmoid arteries',
          name: 'Two to four sigmoid arteries',
          x: 275,
          y: 225,
        },
        {
          id: 'superior-rectal-artery',
          label: 'Superior rectal',
          name: 'Superior rectal artery, the continuation of the inferior mesenteric',
          x: 275,
          y: 280,
        },
        {
          id: 'marginal-artery',
          label: 'Marginal artery',
          name: 'Marginal artery, along the inner border of the colon',
          x: 275,
          y: 340,
        },
        {
          id: 'inferior-mesenteric-vein',
          label: 'IMV to the splenic\nvein',
          name: 'Inferior mesenteric vein, ending in the splenic vein',
          x: 275,
          y: 400,
        },
      ],
      edges: [
        { from: 'abdominal-aorta', to: 'superior-mesenteric-artery' },
        { from: 'superior-mesenteric-artery', to: 'inferior-pancreaticoduodenal-artery' },
        { from: 'inferior-pancreaticoduodenal-artery', to: 'middle-colic-artery' },
        { from: 'middle-colic-artery', to: 'right-colic-artery' },
        { from: 'right-colic-artery', to: 'ileocolic-artery' },
        { from: 'ileocolic-artery', to: 'jejunal-ileal' },
        { from: 'jejunal-ileal', to: 'superior-mesenteric-vein' },
        { from: 'abdominal-aorta', to: 'inferior-mesenteric-artery' },
        { from: 'inferior-mesenteric-artery', to: 'left-colic-artery' },
        { from: 'left-colic-artery', to: 'sigmoid-arteries' },
        { from: 'sigmoid-arteries', to: 'superior-rectal-artery' },
        { from: 'superior-rectal-artery', to: 'marginal-artery' },
        { from: 'marginal-artery', to: 'inferior-mesenteric-vein' },
      ],
    },
    lesions: [
      {
        id: 'mesenteric-occlusion',
        label: 'Mesenteric occlusion',
        nodeIds: ['superior-mesenteric-artery', 'jejunal-ileal', 'superior-mesenteric-vein'],
        explanation:
          'An embolus or clot in the superior mesenteric artery or vein starves the small intestine and right colon. Its vasa recta do not join one another, so the gut infarcts quickly, with obstruction and shock.',
      },
      {
        id: 'colectomy',
        label: 'Tying a colic artery',
        nodeIds: ['marginal-artery', 'left-colic-artery', 'middle-colic-artery'],
        explanation:
          'When a main colic artery is tied, blood reaches its stretch of colon along the marginal artery from its neighbours. Where two territories meet, the arcade can be thin, so these junctions are the first to fail when flow falls.',
      },
      {
        id: 'paraduodenal-hernia',
        label: 'Paraduodenal hernia',
        nodeIds: ['inferior-mesenteric-vein'],
        explanation:
          'Gut caught in the recess beside the duodenojejunal flexure is freed by cutting the fold that bounds it. The inferior mesenteric vein, without its artery, runs in the fold’s free edge and must be tied first.',
      },
    ],
    drill: [
      {
        id: 'superior',
        title: 'The superior mesenteric',
        hint: 'Its level, then its branches from the right side top to bottom, those from the left, and its vein.',
        nodeIds: [
          'superior-mesenteric-artery',
          'inferior-pancreaticoduodenal-artery',
          'middle-colic-artery',
          'right-colic-artery',
          'ileocolic-artery',
          'jejunal-ileal',
          'superior-mesenteric-vein',
        ],
      },
      {
        id: 'inferior',
        title: 'The inferior mesenteric',
        hint: 'Its level and three branches, the arcade along the colon, and its vein.',
        nodeIds: [
          'inferior-mesenteric-artery',
          'left-colic-artery',
          'sigmoid-arteries',
          'superior-rectal-artery',
          'marginal-artery',
          'inferior-mesenteric-vein',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [
          ...ORGANS_SKELETON,
          'pancreas',
          'duodenum',
          'ascending-colon',
          'appendix',
          'transverse-colon',
          'descending-colon',
          'sigmoid-colon',
          'rectum',
          'kidneys',
          'ureters',
          'abdominal-aorta',
          'inferior-vena-cava',
          'coeliac-trunk',
          'superior-mesenteric-artery',
          'inferior-mesenteric-artery',
          ...MESENTERIC_BRANCHES,
          'superior-mesenteric-vein',
          'inferior-mesenteric-vein',
          'splenic-vein',
          'portal-vein',
        ],
        ['transverse-colon', 'pancreas'],
      ),
      traces: [],
      stops: [
        MESENTERIC_VIEW,
        {
          ...MESENTERY_VIEW,
          title: 'In the root of the mesentery',
          description:
            'The superior mesenteric vessels cross the third part of the duodenum into the root of the mesentery, the vein on the right of the artery.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'three-arteries',
      title: 'Three arteries for three parts of the gut',
      body: 'The coeliac trunk feeds the foregut, the superior mesenteric the midgut and the inferior mesenteric the hindgut, and they join where their territories meet. The midgut runs from the opening of the bile duct in the duodenum to the right two-thirds of the transverse colon (and the lower head of the pancreas); the hindgut from there to the upper anal canal.',
      focus: ['abdominal-aorta', 'superior-mesenteric-artery', 'inferior-mesenteric-artery'],
    },
    {
      id: 'sma-course',
      title: 'The superior mesenteric: course',
      body: 'It leaves the aorta at L1, 1 cm below the coeliac trunk, behind the body of the pancreas and the splenic vein. Going down and to the right in a curve bulging left, it passes in front of the left renal vein, the uncinate process and the third part of the duodenum, enters the root of the mesentery, crosses the inferior vena cava and right psoas, and ends in the right iliac fossa by joining a branch of the ileocolic. Its vein lies on its right all the way; a plexus of nerves surrounds it.',
      focus: ['superior-mesenteric-artery'],
    },
    {
      id: 'sma-branches',
      title: 'The superior mesenteric: branches',
      body: 'From its right side: the inferior pancreaticoduodenal, up the groove between duodenum and pancreas to meet the superior; the middle colic, forward in the transverse mesocolon, its two branches joining the right and left colic; the right colic, behind the peritoneum to the ascending colon and hepatic flexure; and the ileocolic, to the end of the ileum, the caecum (anterior and posterior caecal), the start of the ascending colon, and the appendix (appendicular). From its left side: 12 to 15 jejunal and ileal arteries, whose arcades grow from one row to as many as five towards the ileum.',
      focus: [
        'inferior-pancreaticoduodenal-artery',
        'middle-colic-artery',
        'right-colic-artery',
        'ileocolic-artery',
        'jejunal-ileal',
      ],
    },
    {
      id: 'ima',
      title: 'The inferior mesenteric',
      body: 'It leaves the aorta at L3 behind the third part of the duodenum, 3 to 4 cm above the bifurcation, and runs down and left behind the peritoneum. Its first branch, the left colic, goes up and left to the left third of the transverse colon (joining the middle colic) and the descending colon (joining the highest sigmoid). Two to four sigmoid arteries go down and left to the sigmoid colon. Crossing the left common iliac artery medial to the left ureter, it becomes the superior rectal, which runs down the sigmoid mesocolon and divides at S3 into branches on either side of the rectum.',
      focus: [
        'inferior-mesenteric-artery',
        'left-colic-artery',
        'sigmoid-arteries',
        'superior-rectal-artery',
      ],
    },
    {
      id: 'marginal',
      title: 'The marginal artery',
      body: 'Along the inner border of the whole colon, 2.5 to 3.8 cm from it (closest along the descending and sigmoid colon), runs an arcade made by the ileocolic, right colic, middle colic, left colic and sigmoid arteries. Straight vessels from it supply the colon. It can carry a stretch of colon whose own artery is tied, but its links between neighbouring territories vary in strength.',
      focus: ['marginal-artery'],
    },
    {
      id: 'veins',
      title: 'The veins',
      body: 'The superior mesenteric vein begins in the right iliac fossa, rises on the right of its artery, takes the veins matching its branches plus the right gastroepiploic and pancreaticoduodenal veins, and joins the splenic vein behind the neck of the pancreas to form the portal vein. The inferior mesenteric vein begins as the superior rectal vein, rises lateral to its artery and beside the duodenojejunal flexure in the paraduodenal fold, and goes behind the body of the pancreas into the splenic vein.',
      focus: ['superior-mesenteric-vein', 'inferior-mesenteric-vein'],
    },
  ],
  questions: [
    {
      id: 'ma-sma-level',
      prompt: 'The superior mesenteric artery arises at the level of:',
      options: [
        { id: 'l1', text: 'L1, 1 cm below the coeliac trunk' },
        { id: 'l3', text: 'L3, behind the third part of the duodenum' },
        { id: 't12', text: 'T12, at the aortic hiatus' },
        { id: 'l4', text: 'L4, at the aortic bifurcation' },
      ],
      answerId: 'l1',
      explanation: 'The inferior mesenteric arises at L3.',
    },
    {
      id: 'ma-hepatic-flexure',
      prompt: 'The right colic (hepatic) flexure is supplied mainly by the:',
      options: [
        { id: 'right-colic', text: 'Right colic artery' },
        { id: 'ileocolic', text: 'Ileocolic artery' },
        { id: 'middle-colic', text: 'Middle colic artery' },
        { id: 'jejunal', text: 'Jejunal arteries' },
      ],
      answerId: 'right-colic',
      explanation:
        'Its arch supplies the upper two-thirds of the ascending colon and the right flexure.',
    },
    {
      id: 'ma-superior-rectal',
      prompt: 'The superior rectal artery is the continuation of the:',
      options: [
        { id: 'ima', text: 'Inferior mesenteric artery' },
        { id: 'sma', text: 'Superior mesenteric artery' },
        { id: 'internal-iliac', text: 'Internal iliac artery' },
        { id: 'median-sacral', text: 'Median sacral artery' },
      ],
      answerId: 'ima',
      explanation: 'Beyond the left common iliac vessels, in the sigmoid mesocolon.',
    },
    {
      id: 'ma-imv',
      prompt: 'The inferior mesenteric vein usually ends in the:',
      options: [
        { id: 'splenic', text: 'Splenic vein' },
        { id: 'portal', text: 'Portal vein' },
        { id: 'ivc', text: 'Inferior vena cava' },
        { id: 'left-renal', text: 'Left renal vein' },
      ],
      answerId: 'splenic',
      explanation: 'Behind the body of the pancreas.',
    },
  ],
  cards: [
    {
      id: 'ma-sma-course',
      front: 'Course of the superior mesenteric artery?',
      back: 'From the aorta at L1 behind the pancreas and splenic vein; in front of the left renal vein, uncinate process and third part of the duodenum; into the root of the mesentery over the IVC and right psoas; ends in the right iliac fossa.',
    },
    {
      id: 'ma-sma-branches',
      front: 'Branches of the superior mesenteric artery?',
      back: 'Right side: inferior pancreaticoduodenal, middle colic, right colic, ileocolic. Left side: 12 to 15 jejunal and ileal.',
    },
    {
      id: 'ma-ima',
      front: 'Inferior mesenteric artery: origin and branches?',
      back: 'Aorta at L3, 3 to 4 cm above the bifurcation. Left colic, two to four sigmoid, and superior rectal (its continuation).',
    },
    {
      id: 'ma-marginal',
      front: 'Marginal artery of Drummond?',
      back: 'An arcade along the inner border of the colon, 2.5 to 3.8 cm away, from the ileocolic, right, middle and left colic and sigmoid arteries.',
    },
    {
      id: 'ma-veins',
      front: 'Where do the mesenteric veins end?',
      back: 'Superior mesenteric: joins the splenic behind the neck of the pancreas to form the portal vein. Inferior mesenteric: into the splenic vein behind the body of the pancreas.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 21 Large Blood Vessels of the Gut',
      pages: '325–330',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '348–353' },
  ],
};
