import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  ORGANS_FRONT,
  ORGANS_SKELETON,
  PELVIC_POUCHES,
  PERITONEAL_FOLDS,
  VISCERA,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 2 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const peritonealSpaces: Topic = {
  slug: 'peritoneal-spaces',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Subphrenic spaces, pouches, gutters and recesses',
  summary:
    'The surgical map of the peritoneal cavity: supracolic and infracolic compartments, the spaces under the diaphragm and the hepatorenal pouch, the paracolic gutters, the pelvic pouches, and the small recesses where gut can be trapped.',
  estimatedMinutes: 13,
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
      'Volume 2, Chapter 18 Abdominal Cavity and Peritoneum: special regions of the peritoneal cavity and peritoneal fossae, pages 284 to 288',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: subphrenic recesses and paracolic gutters, pages 320 and 328; Chapter 5: pelvic pouches, pages 471 to 479',
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
    'The transverse colon and its mesocolon divide the abdominal cavity into a supracolic compartment, subdivided round the liver into subphrenic spaces, and an infracolic compartment, divided by the mesentery into right and left parts; the paracolic gutters run outside the ascending and descending colon.',
    'Four intraperitoneal subphrenic spaces: left anterior (left subphrenic), left posterior (the lesser sac), right anterior (right subphrenic) and right posterior (hepatorenal pouch of Morison). Three extraperitoneal: right and left, round the upper poles of the kidneys, and the midline bare area of the liver.',
    'The hepatorenal pouch lies between the right lobe of the liver and gallbladder in front and the right kidney, suprarenal, duodenum, hepatic flexure and pancreas behind. It is the lowest part of the abdomen proper when lying down, so fluid and pus collect there: the commonest site of subphrenic abscess.',
    'The right paracolic gutter opens up into the hepatorenal pouch; the left opens down into the pelvis and is closed above by the phrenicocolic ligament. Sitting up, infected fluid runs down to the rectouterine pouch (5.5 cm from the anus) or the rectovesical pouch (7.5 cm), the lowest parts of the cavity.',
    'Small recesses lie where mesenteries were absorbed: duodenal (superior, inferior, paraduodenal with the inferior mesenteric vein in its fold, retroduodenal), caecal (superior and inferior ileocaecal, retrocaecal) and intersigmoid. Gut can slip into them: internal hernia.',
  ],
  visual: {
    kind: 'path',
    // Left: the compartments and spaces from above down. Right: gutters, pouches and recesses.
    diagram: {
      width: 360,
      height: 480,
      nodes: [
        {
          id: 'peritoneal-map',
          label: 'Peritoneal\ncavity',
          name: 'The peritoneal cavity, mapped surgically',
          x: 180,
          y: 30,
        },
        {
          id: 'supracolic',
          label: 'Supracolic\ncompartment',
          name: 'Supracolic compartment, above the transverse mesocolon',
          x: 85,
          y: 100,
        },
        {
          id: 'left-subphrenic',
          label: 'Left anterior\n(subphrenic)',
          name: 'Left anterior space: left subphrenic',
          x: 85,
          y: 165,
        },
        {
          id: 'right-subphrenic',
          label: 'Right anterior\n(subphrenic)',
          name: 'Right anterior space: right subphrenic',
          x: 85,
          y: 230,
        },
        {
          id: 'hepatorenal-pouch',
          label: 'Hepatorenal\npouch (Morison)',
          name: 'Right posterior space: hepatorenal pouch of Morison',
          x: 85,
          y: 295,
        },
        {
          id: 'extraperitoneal-spaces',
          label: 'Extraperitoneal:\nbare area, kidneys',
          name: 'Extraperitoneal spaces: bare area of the liver, round the upper poles of the kidneys',
          x: 85,
          y: 360,
        },
        {
          id: 'infracolic',
          label: 'Infracolic: right\nand left',
          name: 'Infracolic compartment, divided by the mesentery',
          x: 85,
          y: 425,
        },
        {
          id: 'right-paracolic',
          label: 'Right gutter: up\nto Morison',
          name: 'Right paracolic gutter, open above into the hepatorenal pouch',
          x: 275,
          y: 100,
        },
        {
          id: 'left-paracolic',
          label: 'Left gutter: down\nto the pelvis',
          name: 'Left paracolic gutter, open below into the pelvis, closed above by the phrenicocolic ligament',
          x: 275,
          y: 165,
        },
        {
          id: 'rectouterine-pouch',
          label: 'Rectouterine pouch\n(Douglas)',
          name: 'Rectouterine pouch of Douglas, 5.5 cm from the anus',
          x: 275,
          y: 230,
        },
        {
          id: 'rectovesical-pouch',
          label: 'Rectovesical\npouch (male)',
          name: 'Rectovesical pouch in the male, 7.5 cm from the anus',
          x: 275,
          y: 295,
        },
        {
          id: 'duodenal-recesses',
          label: 'Duodenal\nrecesses',
          name: 'Duodenal recesses: superior, inferior, paraduodenal, retroduodenal, duodenojejunal',
          x: 275,
          y: 360,
        },
        {
          id: 'caecal-recesses',
          label: 'Caecal and\nintersigmoid',
          name: 'Caecal recesses (superior and inferior ileocaecal, retrocaecal) and the intersigmoid recess',
          x: 275,
          y: 425,
        },
      ],
      edges: [
        { from: 'peritoneal-map', to: 'supracolic' },
        { from: 'supracolic', to: 'left-subphrenic' },
        { from: 'left-subphrenic', to: 'right-subphrenic' },
        { from: 'right-subphrenic', to: 'hepatorenal-pouch' },
        { from: 'hepatorenal-pouch', to: 'extraperitoneal-spaces' },
        { from: 'peritoneal-map', to: 'infracolic' },
        { from: 'hepatorenal-pouch', to: 'right-paracolic' },
        { from: 'right-paracolic', to: 'left-paracolic' },
        { from: 'left-paracolic', to: 'rectouterine-pouch' },
        { from: 'rectouterine-pouch', to: 'rectovesical-pouch' },
        { from: 'peritoneal-map', to: 'duodenal-recesses' },
        { from: 'duodenal-recesses', to: 'caecal-recesses' },
      ],
    },
    lesions: [
      {
        id: 'subphrenic-abscess',
        label: 'Subphrenic abscess',
        nodeIds: ['hepatorenal-pouch', 'right-subphrenic', 'right-paracolic'],
        explanation:
          'Pus from the gallbladder, appendix or an operation on the upper abdomen collects under the diaphragm, most often in the hepatorenal pouch, the lowest point when lying flat; the right gutter carries infection up to it from the appendix.',
      },
      {
        id: 'pelvic-abscess',
        label: 'Pus in the pelvis',
        nodeIds: ['rectouterine-pouch', 'rectovesical-pouch', 'left-paracolic'],
        explanation:
          'With the patient propped up, infected fluid runs down the gutters into the lowest pouch: rectouterine in the female, rectovesical in the male. It can be felt, and drained, through the rectum or the posterior fornix of the vagina.',
      },
      {
        id: 'paraduodenal-hernia',
        label: 'Paraduodenal hernia',
        nodeIds: ['duodenal-recesses'],
        explanation:
          'Gut slipping into a duodenal recess can strangle. The inferior mesenteric vein runs in the free edge of the paraduodenal fold, so it must be kept safe when the neck is cut to free the loop.',
      },
    ],
    drill: [
      {
        id: 'spaces',
        title: 'Compartments and spaces',
        hint: 'Above the mesocolon and its spaces, the extraperitoneal ones, then below.',
        nodeIds: [
          'supracolic',
          'left-subphrenic',
          'right-subphrenic',
          'hepatorenal-pouch',
          'extraperitoneal-spaces',
          'infracolic',
        ],
      },
      {
        id: 'gutters',
        title: 'Gutters, pouches, recesses',
        hint: 'Two gutters, two pouches, then the recesses.',
        nodeIds: [
          'right-paracolic',
          'left-paracolic',
          'rectouterine-pouch',
          'rectovesical-pouch',
          'duodenal-recesses',
          'caecal-recesses',
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
        'inferior-mesenteric-vein',
      ]),
      traces: [],
      stops: [
        {
          id: 'hepatorenal',
          title: 'Under the right lobe of the liver',
          description:
            'Between the liver and gallbladder above and in front, and the right kidney, duodenum and hepatic flexure behind: the hepatorenal pouch, where fluid gathers in a patient lying flat.',
          target: [-60, -100, 1040],
          position: [-560, -520, 900],
        },
        {
          ...ORGANS_FRONT,
          title: 'Compartments and gutters',
          description:
            'The transverse colon and its mesocolon divide supracolic from infracolic; the ascending and descending colon frame the paracolic gutters at the sides.',
        },
        PELVIC_POUCHES,
      ],
    },
  },
  lesson: [
    {
      id: 'map',
      title: 'A surgical map',
      body: 'The cavity has an abdominal part and a pelvic part. The transverse colon and its mesocolon divide the abdominal part into a supracolic compartment, subdivided by the peritoneum round the liver into subphrenic spaces, and an infracolic compartment, divided by the mesentery into right and left halves. Outside the ascending and descending colon run the paracolic gutters.',
      focus: ['supracolic', 'infracolic'],
    },
    {
      id: 'subphrenic',
      title: 'Spaces under the diaphragm',
      body: 'Intraperitoneal: the left anterior (between the left lobe and the diaphragm, reaching the spleen), the left posterior (the lesser sac), the right anterior (between the right lobe and the diaphragm, in front of the coronary and right triangular ligaments) and the right posterior (the hepatorenal pouch). Extraperitoneal: round the upper pole of each kidney (where a perinephric abscess forms), and the midline bare area of the liver between the layers of the coronary ligament.',
      focus: ['left-subphrenic', 'right-subphrenic', 'hepatorenal-pouch', 'extraperitoneal-spaces'],
    },
    {
      id: 'morison',
      title: 'The hepatorenal pouch',
      body: 'In front: the underside of the right lobe of the liver and the gallbladder. Behind: the right suprarenal and upper right kidney, the second part of the duodenum, the hepatic flexure, the transverse mesocolon and part of the head of the pancreas. Above: the inferior layer of the coronary ligament. It opens below into the general cavity and on the left into the lesser sac. Lying flat it is the lowest part of the abdomen proper.',
      focus: ['hepatorenal-pouch'],
    },
    {
      id: 'gutters',
      title: 'Infracolic spaces and gutters',
      body: 'The right infracolic space, between the ascending colon and the mesentery, is a triangle pointing down; the left, between the descending colon and the mesentery, points up and opens freely into the pelvis. The right paracolic gutter opens above into the hepatorenal pouch; the left opens below into the pelvis and is shut off above from the spleen by the phrenicocolic ligament.',
      focus: ['infracolic', 'right-paracolic', 'left-paracolic'],
    },
    {
      id: 'pouches',
      title: 'The pelvic pouches',
      body: 'In the female the rectouterine pouch (of Douglas) lies between the uterus and posterior fornix in front and the rectum behind, its floor 5.5 cm from the anus; it is the lowest part of the cavity when upright. In the male the rectovesical pouch lies between the rectum and bladder, 7.5 cm from the anus. Both can be examined through the rectum (or the vagina).',
      focus: ['rectouterine-pouch', 'rectovesical-pouch'],
    },
    {
      id: 'recesses',
      title: 'Peritoneal recesses',
      body: 'Small pockets where a mesentery was absorbed, clearest in the fetus. Duodenal: superior (about 50 percent, at L2), inferior (75 percent, L3), paraduodenal (20 percent, with the inferior mesenteric vein in its fold), retroduodenal (rare, the largest) and duodenojejunal. Caecal: superior ileocaecal, inferior ileocaecal (under the bloodless fold of Treves) and retrocaecal, which often holds the appendix. The intersigmoid recess lies behind the apex of the sigmoid mesocolon.',
      focus: ['duodenal-recesses', 'caecal-recesses'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'Find the hepatorenal pouch under the right lobe, follow the gutters beside the colon, then look into the pelvis from the side. Turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'ps-supine',
      prompt:
        'In a patient lying on the back, the lowest part of the abdominal cavity proper is the:',
      options: [
        { id: 'hepatorenal', text: 'Hepatorenal pouch' },
        { id: 'rectovesical', text: 'Rectovesical pouch' },
        { id: 'left-subphrenic', text: 'Left subphrenic space' },
        { id: 'lesser-sac', text: 'Lesser sac' },
      ],
      answerId: 'hepatorenal',
      explanation: 'Pus collects there; sitting up, fluid runs instead to the pelvic pouches.',
    },
    {
      id: 'ps-left-gutter',
      prompt: 'The left paracolic gutter:',
      options: [
        {
          id: 'pelvis',
          text: 'Opens below into the pelvis and is closed above by the phrenicocolic ligament',
        },
        { id: 'morison', text: 'Opens above into the hepatorenal pouch' },
        { id: 'lesser-sac', text: 'Opens into the lesser sac' },
        { id: 'closed', text: 'Is closed at both ends' },
      ],
      answerId: 'pelvis',
      explanation: 'The right gutter is the one that opens up into the hepatorenal pouch.',
    },
    {
      id: 'ps-paraduodenal',
      prompt: 'Which vessel lies in the free edge of the paraduodenal fold?',
      options: [
        { id: 'imv', text: 'Inferior mesenteric vein' },
        { id: 'smv', text: 'Superior mesenteric vein' },
        { id: 'sma', text: 'Superior mesenteric artery' },
        { id: 'splenic', text: 'Splenic vein' },
      ],
      answerId: 'imv',
      explanation: 'It must be protected when releasing a paraduodenal hernia.',
    },
    {
      id: 'ps-douglas',
      prompt: 'The floor of the rectouterine pouch lies about how far from the anus?',
      options: [
        { id: 'five', text: '5.5 cm' },
        { id: 'seven', text: '7.5 cm' },
        { id: 'two', text: '2 cm' },
        { id: 'twelve', text: '12 cm' },
      ],
      answerId: 'five',
      explanation: 'The male rectovesical pouch is about 7.5 cm up.',
    },
  ],
  cards: [
    {
      id: 'ps-subphrenic-list',
      front: 'Subphrenic spaces?',
      back: 'Intraperitoneal: left anterior, left posterior (lesser sac), right anterior, right posterior (hepatorenal pouch). Extraperitoneal: right and left (upper poles of kidneys), midline (bare area of liver).',
    },
    {
      id: 'ps-morison',
      front: 'Boundaries of the hepatorenal pouch?',
      back: 'Front: right lobe of liver, gallbladder. Back: right suprarenal and kidney, D2, hepatic flexure, transverse mesocolon, head of pancreas. Above: inferior layer of coronary ligament.',
    },
    {
      id: 'ps-gutters',
      front: 'Where do the paracolic gutters lead?',
      back: 'Right: up into the hepatorenal pouch. Left: down into the pelvis (closed above by the phrenicocolic ligament).',
    },
    {
      id: 'ps-pouch-distances',
      front: 'Distance of the pelvic pouches from the anus?',
      back: 'Rectouterine (female) about 5.5 cm; rectovesical (male) about 7.5 cm.',
    },
    {
      id: 'ps-recesses-card',
      front: 'Peritoneal recesses where internal hernia occurs?',
      back: 'Lesser sac; duodenal (superior, inferior, paraduodenal, retroduodenal, duodenojejunal); caecal (superior and inferior ileocaecal, retrocaecal); intersigmoid.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 18 Abdominal Cavity and Peritoneum',
      pages: '284–288',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '320, 328' },
  ],
};
