import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  LIVER_BELOW,
  LIVER_FRONT,
  ORGANS_SKELETON,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const liver: Topic = {
  slug: 'liver',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The liver: lobes, surfaces and relations',
  summary:
    'Where the liver lies, its five surfaces and sharp inferior border, the right, left, caudate and quadrate lobes, the porta hepatis, its bare areas, and the organs that mark its surfaces.',
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
      'Volume 2, Chapter 23 Spleen, Pancreas and Liver: liver, features, lobes and relations, pages 355 to 358',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: liver, surfaces and lobes, pages 328 to 331'),
    {
      title: 'Z-Anatomy',
      detail: 'Liver and lesser omentum in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Organs, vessels, bile ducts and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The largest gland, about 1600 g in men and 1300 g in women, reddish brown and friable. It fills the right hypochondrium and most of the epigastrium and reaches into the left hypochondrium; ribs and cartilages cover it except in the upper epigastrium. In the midline its inferior border crosses from the left eighth to the right ninth costal cartilage.',
    'Wedge-shaped, with five surfaces (anterior, posterior, superior, inferior, right). Only the inferior surface is sharply bounded, by the inferior border with its notch for the ligamentum teres and its cystic notch for the fundus of the gallbladder.',
    'The falciform ligament in front, the fissure for the ligamentum teres below and the fissure for the ligamentum venosum behind divide a right lobe (five-sixths) from a left lobe. The right lobe carries the caudate lobe (behind, between the IVC groove and the fissure for the ligamentum venosum) and the quadrate lobe (below, between the gallbladder fossa and the fissure for the ligamentum teres).',
    'The porta hepatis, a 5 cm transverse fissure between the caudate lobe above and the quadrate lobe in front, transmits from behind forwards the portal vein, hepatic artery and hepatic ducts; the lesser omentum is attached to its lips.',
    'Not covered by peritoneum: the triangular bare area between the layers of the coronary ligament, the groove for the IVC, the gallbladder fossa, and where the lesser omentum attaches. The inferior surface is marked by the stomach (gastric impression), duodenum, colon and right kidney.',
  ],
  visual: {
    kind: 'path',
    // Left: place, surfaces and lobes. Right: porta hepatis, peritoneum and impressions.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'liver', label: 'Liver: 1600 g', name: 'Liver, about 1600 g', x: 180, y: 30 },
        {
          id: 'location',
          label: 'Right hypochondrium,\nepigastrium',
          name: 'Right hypochondrium, most of the epigastrium, part of the left hypochondrium',
          x: 85,
          y: 100,
        },
        {
          id: 'surfaces',
          label: 'Five surfaces',
          name: 'Anterior, posterior, superior, inferior and right surfaces',
          x: 85,
          y: 160,
        },
        {
          id: 'inferior-border',
          label: 'Sharp inferior\nborder',
          name: 'Inferior border, with the notch for the ligamentum teres and the cystic notch',
          x: 85,
          y: 220,
        },
        {
          id: 'falciform-ligament',
          label: 'Falciform ligament:\nright, left lobes',
          name: 'Falciform ligament, dividing the right and left lobes',
          x: 85,
          y: 285,
        },
        {
          id: 'caudate-lobe',
          label: 'Caudate lobe',
          name: 'Caudate lobe, between the IVC groove and the fissure for the ligamentum venosum',
          x: 85,
          y: 350,
        },
        {
          id: 'quadrate-lobe',
          label: 'Quadrate lobe',
          name: 'Quadrate lobe, between the gallbladder fossa and the fissure for the ligamentum teres',
          x: 85,
          y: 410,
        },
        {
          id: 'porta-hepatis',
          label: 'Porta hepatis',
          name: 'Porta hepatis, a 5 cm transverse fissure',
          x: 275,
          y: 100,
        },
        {
          id: 'portal-vein',
          label: 'Back to front: vein,\nartery, ducts',
          name: 'From behind forwards: portal vein, hepatic artery, hepatic ducts',
          x: 275,
          y: 160,
        },
        {
          id: 'lesser-omentum',
          label: 'Lesser omentum\non its lips',
          name: 'Lesser omentum, attached to the lips of the porta hepatis',
          x: 275,
          y: 225,
        },
        {
          id: 'bare-area',
          label: 'Bare area',
          name: 'Bare area, between the layers of the coronary ligament',
          x: 275,
          y: 285,
        },
        {
          id: 'inferior-vena-cava',
          label: 'Groove for the IVC',
          name: 'Groove for the inferior vena cava, with the hepatic veins opening into it',
          x: 275,
          y: 345,
        },
        {
          id: 'impressions',
          label: 'Gastric, duodenal,\nrenal impressions',
          name: 'Gastric, duodenal, colic and renal impressions on the inferior surface',
          x: 275,
          y: 410,
        },
      ],
      edges: [
        { from: 'liver', to: 'location' },
        { from: 'location', to: 'surfaces' },
        { from: 'surfaces', to: 'inferior-border' },
        { from: 'inferior-border', to: 'falciform-ligament' },
        { from: 'falciform-ligament', to: 'caudate-lobe' },
        { from: 'caudate-lobe', to: 'quadrate-lobe' },
        { from: 'liver', to: 'porta-hepatis' },
        { from: 'porta-hepatis', to: 'portal-vein' },
        { from: 'portal-vein', to: 'lesser-omentum' },
        { from: 'lesser-omentum', to: 'bare-area' },
        { from: 'bare-area', to: 'inferior-vena-cava' },
        { from: 'inferior-vena-cava', to: 'impressions' },
      ],
    },
    lesions: [
      {
        id: 'hepatomegaly',
        label: 'Enlarged liver',
        nodeIds: ['inferior-border', 'location'],
        explanation:
          'A healthy liver is hard to feel: in the midline its border lies on the transpyloric plane, a hand’s breadth below the xiphisternal joint, a little lower in women and children. When it enlarges it grows down towards the right iliac fossa and moves with breathing.',
      },
      {
        id: 'liver-biopsy',
        label: 'Liver biopsy',
        nodeIds: ['surfaces', 'location'],
        explanation:
          'The needle goes in through the right ninth intercostal space on the right surface, and on its way crosses both the pleural and the peritoneal cavities.',
      },
      {
        id: 'pringle',
        label: 'Stopping liver bleeding',
        nodeIds: ['lesser-omentum', 'portal-vein'],
        explanation:
          'Squeezing the free edge of the lesser omentum, which holds the hepatic artery and portal vein, stops bleeding from the liver (the Pringle manoeuvre). If bleeding goes on, the IVC behind is probably torn.',
      },
    ],
    drill: [
      {
        id: 'lobes',
        title: 'Place, surfaces and lobes',
        hint: 'Where it lies, its surfaces and border, then the four lobes.',
        nodeIds: [
          'location',
          'surfaces',
          'inferior-border',
          'falciform-ligament',
          'caudate-lobe',
          'quadrate-lobe',
        ],
      },
      {
        id: 'porta',
        title: 'Porta, peritoneum and relations',
        hint: 'The porta and its contents, the bare parts, then the impressions.',
        nodeIds: [
          'porta-hepatis',
          'portal-vein',
          'lesser-omentum',
          'bare-area',
          'inferior-vena-cava',
          'impressions',
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
        'hepatic-ducts',
        'bile-duct',
        'stomach',
        'duodenum',
        'kidneys',
        'suprarenal-glands',
        'lesser-omentum',
        'inferior-vena-cava',
        'abdominal-aorta',
        'portal-vein',
        'hepatic-artery',
      ]),
      traces: [],
      stops: [LIVER_FRONT, LIVER_BELOW],
    },
  },
  lesson: [
    {
      id: 'place',
      title: 'Where it lies',
      body: 'The largest gland in the body, about 1600 g in men and 1300 g in women. It fills the right hypochondrium and most of the epigastrium and reaches into the left hypochondrium. Ribs and costal cartilages cover it, except in the upper epigastrium, where it touches the anterior wall; its inferior border crosses from the left eighth to the right ninth costal cartilage.',
      focus: ['location'],
    },
    {
      id: 'surfaces',
      title: 'Surfaces and border',
      body: 'Think of a four-sided pyramid lying on its side. Its five surfaces (anterior, posterior, superior, inferior and right) run into one another, except the inferior surface, which a sharp inferior border separates from the anterior. That border carries the notch for the ligamentum teres and the cystic notch for the fundus of the gallbladder. The superior surface has a cardiac impression in the middle, under the heart, with the diaphragm between.',
      focus: ['surfaces', 'inferior-border'],
    },
    {
      id: 'lobes',
      title: 'Lobes',
      body: 'The falciform ligament in front, the fissure for the ligamentum teres below and the fissure for the ligamentum venosum behind divide the liver into a large right lobe (five-sixths) and a small left lobe. The right lobe carries two more. The caudate lobe, on the back, lies between the groove for the IVC and the fissure for the ligamentum venosum, with the caudate process joining it to the right lobe behind the porta. The quadrate lobe, below, lies between the gallbladder fossa and the fissure for the ligamentum teres.',
      focus: ['falciform-ligament', 'caudate-lobe', 'quadrate-lobe'],
    },
    {
      id: 'porta',
      title: 'The porta hepatis',
      body: 'A deep transverse fissure about 5 cm long on the inferior surface, between the caudate lobe above and the quadrate lobe in front. The portal vein, hepatic artery and hepatic nerves go in; the hepatic ducts and some lymphatics come out. From behind forwards: portal vein, hepatic artery, hepatic ducts. The lesser omentum attaches to its lips and runs on into the fissure for the ligamentum venosum.',
      focus: ['porta-hepatis', 'portal-vein', 'lesser-omentum'],
    },
    {
      id: 'peritoneum',
      title: 'Peritoneum and relations',
      body: 'Peritoneum covers most of it, but not the triangular bare area on the back of the right lobe between the layers of the coronary ligament, the groove for the IVC, the gallbladder fossa, or the attachment of the lesser omentum. The bare area touches the diaphragm and the right suprarenal; the IVC groove takes the hepatic veins. Below, the left lobe bears the gastric impression; the quadrate lobe touches the pylorus and duodenum; the right lobe bears the colic, renal and duodenal impressions.',
      focus: ['bare-area', 'inferior-vena-cava', 'impressions'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the front, find the right and left lobes under the ribs; from below, find the gallbladder, the porta hepatis with its ducts and vessels, and the organs pressed against it. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'lv-porta-order',
      prompt: 'At the porta hepatis, the most posterior structure is the:',
      options: [
        { id: 'portal-vein', text: 'Portal vein' },
        { id: 'hepatic-artery', text: 'Hepatic artery' },
        { id: 'hepatic-ducts', text: 'Hepatic ducts' },
        { id: 'ivc', text: 'Inferior vena cava' },
      ],
      answerId: 'portal-vein',
      explanation: 'Then the hepatic artery, then the hepatic ducts in front.',
    },
    {
      id: 'lv-quadrate',
      prompt: 'The quadrate lobe lies between the gallbladder fossa and the fissure for the:',
      options: [
        { id: 'teres', text: 'Ligamentum teres' },
        { id: 'venosum', text: 'Ligamentum venosum' },
        { id: 'ivc', text: 'Inferior vena cava' },
        { id: 'falciform', text: 'Falciform ligament' },
      ],
      answerId: 'teres',
      explanation:
        'The caudate lobe lies between the IVC groove and the fissure for the ligamentum venosum.',
    },
    {
      id: 'lv-bare',
      prompt: 'Which part of the liver is not covered by peritoneum?',
      options: [
        { id: 'bare-area', text: 'The area between the layers of the coronary ligament' },
        { id: 'quadrate', text: 'The quadrate lobe' },
        { id: 'left-lobe', text: 'The inferior surface of the left lobe' },
        { id: 'anterior', text: 'The anterior surface' },
      ],
      answerId: 'bare-area',
      explanation:
        'Also the IVC groove, the gallbladder fossa and the lesser omentum’s attachment.',
    },
    {
      id: 'lv-biopsy',
      prompt: 'A liver biopsy needle is usually passed through the right:',
      options: [
        { id: 'ninth', text: 'Ninth intercostal space' },
        { id: 'fifth', text: 'Fifth intercostal space' },
        { id: 'subcostal', text: 'Subcostal margin in front' },
        { id: 'twelfth', text: 'Twelfth intercostal space' },
      ],
      answerId: 'ninth',
      explanation: 'Crossing both the pleural and peritoneal cavities on its way.',
    },
  ],
  cards: [
    {
      id: 'lv-lobes',
      front: 'Lobes of the liver and what divides them?',
      back: 'Right and left, divided by the falciform ligament, fissure for the ligamentum teres and fissure for the ligamentum venosum. The right lobe carries the caudate and quadrate lobes.',
    },
    {
      id: 'lv-porta',
      front: 'Porta hepatis: position and contents?',
      back: 'Transverse fissure, 5 cm, between the caudate lobe and the quadrate lobe. From behind forwards: portal vein, hepatic artery, hepatic ducts; hepatic nerves and lymphatics.',
    },
    {
      id: 'lv-bare-areas',
      front: 'Parts of the liver not covered by peritoneum?',
      back: 'The bare area (between the layers of the coronary ligament), the IVC groove, the gallbladder fossa, the attachment of the lesser omentum.',
    },
    {
      id: 'lv-inferior-relations',
      front: 'Relations of the inferior surface of the liver?',
      back: 'Stomach (left lobe), pylorus and duodenum (quadrate lobe), gallbladder, then on the right lobe the hepatic flexure, right kidney and second part of the duodenum.',
    },
    {
      id: 'lv-border',
      front: 'Surface marking of the inferior border in the midline?',
      back: 'From the left eighth to the right ninth costal cartilage; on the transpyloric plane, a hand’s breadth below the xiphisternal joint.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 23 Spleen, Pancreas and Liver',
      pages: '355–358',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '328–331' },
  ],
};
