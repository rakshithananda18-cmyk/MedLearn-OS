import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  ORGANS_SKELETON,
  SPLEEN_VIEW,
  STOMACH_FRONT,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const spleen: Topic = {
  slug: 'spleen',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The spleen',
  summary:
    'Where the spleen lies and how big it is, its ends, borders, surfaces and hilum, the impressions on its visceral surface, its ligaments and vessels, what it does, and how it behaves when enlarged or torn.',
  estimatedMinutes: 12,
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
      'Volume 2, Chapter 23 Spleen, Pancreas and Liver: spleen, pages 344 to 349',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: spleen, pages 337 to 338'),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Spleen, organs, vessels and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'A soft, dark purple, wedge-shaped organ in the left hypochondrium (partly the epigastrium), between the fundus of the stomach and the diaphragm, along the left tenth rib at about 45 degrees. The odd numbers: 1 inch thick, 3 broad, 5 long, 7 ounces, over ribs 9 to 11. A normal spleen cannot be felt.',
    'Two ends (the anterior end reaches the midaxillary line; the posterior rests on the upper pole of the left kidney), three borders (superior, notched near its front; inferior; intermediate), two surfaces (diaphragmatic and visceral), and a hilum.',
    'Its visceral surface bears the gastric impression (largest), renal, colic and pancreatic impressions. Its diaphragmatic surface lies on the diaphragm, which separates it from the left pleural recess, lung and ribs 9 to 11.',
    'The gastrosplenic ligament (short gastric and left gastroepiploic vessels) runs to the stomach, the lienorenal ligament (splenic vessels, tail of the pancreas) to the left kidney; the phrenicocolic ligament supports its anterior end without being attached to it.',
    'The tortuous splenic artery divides at the hilum into branches to superior and inferior segments, with end arteries within; the splenic vein runs behind the pancreas to the portal vein. Only its capsule and trabeculae have lymphatics. It filters blood, removes old red cells, makes lymphocytes and antibodies, and made blood in the fetus.',
  ],
  visual: {
    kind: 'path',
    // Left: its place and shape. Right: its impressions and ligaments.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'spleen', label: 'Spleen', name: 'Spleen', x: 180, y: 30 },
        {
          id: 'location',
          label: 'Left ribs 9 to 11,\nalong the 10th',
          name: 'Under the left ninth to eleventh ribs, along the tenth rib',
          x: 85,
          y: 100,
        },
        {
          id: 'size',
          label: 'Odd numbers:\n1, 3, 5, 7, 9, 11',
          name: '1 inch thick, 3 broad, 5 long, 7 ounces, ribs 9 to 11',
          x: 85,
          y: 165,
        },
        {
          id: 'anterior-end',
          label: 'Anterior end:\nmidaxillary line',
          name: 'Anterior end, reaching the midaxillary line',
          x: 85,
          y: 230,
        },
        {
          id: 'superior-border',
          label: 'Notched superior\nborder',
          name: 'Superior border, notched near its anterior end',
          x: 85,
          y: 295,
        },
        {
          id: 'diaphragm',
          label: 'Diaphragmatic\nsurface',
          name: 'Diaphragmatic surface, on the diaphragm over ribs 9 to 11',
          x: 85,
          y: 355,
        },
        {
          id: 'hilum',
          label: 'Hilum',
          name: 'Hilum, for the splenic vessels and the two ligaments',
          x: 85,
          y: 415,
        },
        {
          id: 'stomach',
          label: 'Gastric impression',
          name: 'Gastric impression, the largest',
          x: 275,
          y: 100,
        },
        {
          id: 'kidneys',
          label: 'Renal impression',
          name: 'Renal impression, for the left kidney',
          x: 275,
          y: 160,
        },
        {
          id: 'descending-colon',
          label: 'Colic impression',
          name: 'Colic impression, for the splenic flexure',
          x: 275,
          y: 220,
        },
        {
          id: 'pancreas',
          label: 'Pancreatic\nimpression',
          name: 'Pancreatic impression, for the tail of the pancreas',
          x: 275,
          y: 285,
        },
        {
          id: 'gastrosplenic-ligament',
          label: 'Gastrosplenic\nligament',
          name: 'Gastrosplenic ligament, with the short gastric and left gastroepiploic vessels',
          x: 275,
          y: 350,
        },
        {
          id: 'splenic-artery',
          label: 'Lienorenal: splenic\nvessels, tail',
          name: 'Lienorenal ligament, with the splenic vessels and the tail of the pancreas',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'spleen', to: 'location' },
        { from: 'location', to: 'size' },
        { from: 'size', to: 'anterior-end' },
        { from: 'anterior-end', to: 'superior-border' },
        { from: 'superior-border', to: 'diaphragm' },
        { from: 'diaphragm', to: 'hilum' },
        { from: 'spleen', to: 'stomach' },
        { from: 'stomach', to: 'kidneys' },
        { from: 'kidneys', to: 'descending-colon' },
        { from: 'descending-colon', to: 'pancreas' },
        { from: 'pancreas', to: 'gastrosplenic-ligament' },
        { from: 'gastrosplenic-ligament', to: 'splenic-artery' },
      ],
    },
    lesions: [
      {
        id: 'splenomegaly',
        label: 'Enlarged spleen',
        nodeIds: ['superior-border', 'anterior-end', 'location'],
        explanation:
          'It has to double before it can be felt under the left costal margin on breathing in, then grows along the tenth rib towards the right iliac fossa; the phrenicocolic ligament stops it going straight down. Its notched border tells it apart from an enlarged kidney.',
      },
      {
        id: 'rupture',
        label: 'Ruptured spleen',
        nodeIds: ['location', 'hilum', 'splenic-artery', 'gastrosplenic-ligament'],
        explanation:
          'A blow to the left ribs 9 to 11 can tear it, with heavy bleeding. To remove it, the surgeon frees two pedicles: the short gastric vessels in the gastrosplenic ligament, and the splenic vessels and the tail of the pancreas (rich in islets) in the lienorenal ligament.',
      },
      {
        id: 'kehr',
        label: 'Pain in the left shoulder',
        nodeIds: ['diaphragm'],
        explanation:
          'Its branches inside are end arteries, so a blocked branch infarcts a wedge. Blood or an infarct irritating the diaphragm refers pain to the left shoulder (Kehr’s sign).',
      },
    ],
    drill: [
      {
        id: 'shape',
        title: 'Where and what shape',
        hint: 'Its place, the odd numbers, then its end, border, surface and hilum.',
        nodeIds: ['location', 'size', 'anterior-end', 'superior-border', 'diaphragm', 'hilum'],
      },
      {
        id: 'relations',
        title: 'Impressions and ligaments',
        hint: 'Four impressions on the visceral surface, then the two ligaments.',
        nodeIds: [
          'stomach',
          'kidneys',
          'descending-colon',
          'pancreas',
          'gastrosplenic-ligament',
          'splenic-artery',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [
          ...ORGANS_SKELETON,
          'spleen',
          'stomach',
          'pancreas',
          'kidneys',
          'suprarenal-glands',
          'transverse-colon',
          'descending-colon',
          'abdominal-aorta',
          'splenic-artery',
          'splenic-vein',
          'left-gastroepiploic-artery',
        ],
        ['stomach'],
      ),
      traces: [],
      stops: [
        SPLEEN_VIEW,
        {
          ...STOMACH_FRONT,
          title: 'Behind the stomach',
          description:
            'Through the stomach: the spleen far back on the left, the tail of the pancreas reaching its hilum with the splenic vessels, the left kidney behind and the splenic flexure below.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'place',
      title: 'Where it lies',
      body: 'The spleen lies in the left hypochondrium, a little in the epigastrium, wedged between the fundus of the stomach and the diaphragm. It lies along the left tenth rib, sloping down, forward and out at about 45 degrees. The odd numbers help: 1 inch thick, 3 inches broad, 5 inches long, 7 ounces, over ribs 9 to 11. It moves with breathing and cannot normally be felt.',
      focus: ['location', 'size'],
    },
    {
      id: 'shape',
      title: 'Ends, borders and surfaces',
      body: 'The anterior end is broad, almost a border, and reaches the midaxillary line; the posterior end is rounded and rests on the upper pole of the left kidney. The superior border is notched near its front end, the inferior and intermediate borders rounded. The diaphragmatic surface is smooth and convex; the visceral surface concave, with the hilum along it. The front of the superior border, where it meets the anterior end, projects furthest and is felt first when the spleen enlarges.',
      focus: ['anterior-end', 'superior-border', 'diaphragm', 'hilum'],
    },
    {
      id: 'relations',
      title: 'What touches it',
      body: 'On the visceral surface, the gastric impression (largest and most hollow) between the superior and intermediate borders, the renal impression between the inferior and intermediate borders, the colic impression for the splenic flexure near the anterior end, and the pancreatic impression for the tail between the hilum and the colic impression. The diaphragm separates the diaphragmatic surface from the left pleural recess, the lung and ribs 9 to 11.',
      focus: ['stomach', 'kidneys', 'descending-colon', 'pancreas', 'diaphragm'],
    },
    {
      id: 'ligaments',
      title: 'Ligaments',
      body: 'Peritoneum covers it, and two folds from the dorsal mesogastrium hold it. The gastrosplenic ligament runs from the hilum to the greater curvature, carrying the short gastric and left gastroepiploic vessels. The lienorenal ligament runs from the hilum to the front of the left kidney, carrying the splenic vessels and the tail of the pancreas. The phrenicocolic ligament, from the splenic flexure to the diaphragm, is not attached to it but supports its anterior end.',
      focus: ['gastrosplenic-ligament', 'splenic-artery'],
    },
    {
      id: 'vessels',
      title: 'Vessels and function',
      body: 'The splenic artery, the largest branch of the coeliac trunk, winds along the pancreas to divide at the hilum into five or more branches, supplying an upper and a lower segment separated by a bloodless plane; inside, its branches are end arteries. The splenic vein runs straight behind the pancreas, takes the short gastric, left gastroepiploic, pancreatic and inferior mesenteric veins, and joins the superior mesenteric vein to form the portal vein. Only its capsule has lymphatics, to the pancreaticosplenic nodes. It filters the blood and clears old cells, makes lymphocytes and antibodies, stores some red cells, and made blood before birth.',
      focus: ['hilum', 'splenic-artery'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the left, find the spleen under ribs 9 to 11 against the diaphragm; then from the front, see the tail of the pancreas reach its hilum behind the stomach. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'sp-ribs',
      prompt: 'The spleen lies along the axis of the left:',
      options: [
        { id: 'tenth', text: 'Tenth rib' },
        { id: 'eighth', text: 'Eighth rib' },
        { id: 'twelfth', text: 'Twelfth rib' },
        { id: 'sixth', text: 'Sixth rib' },
      ],
      answerId: 'tenth',
      explanation: 'Over ribs 9 to 11, sloping at about 45 degrees.',
    },
    {
      id: 'sp-lienorenal',
      prompt: 'The lienorenal ligament contains the splenic vessels and the:',
      options: [
        { id: 'tail', text: 'Tail of the pancreas' },
        { id: 'short-gastric', text: 'Short gastric vessels' },
        { id: 'left-gastric', text: 'Left gastric artery' },
        { id: 'splenic-flexure', text: 'Splenic flexure' },
      ],
      answerId: 'tail',
      explanation: 'The short gastric vessels run in the gastrosplenic ligament.',
    },
    {
      id: 'sp-largest-impression',
      prompt: 'The largest impression on the visceral surface of the spleen is the:',
      options: [
        { id: 'gastric', text: 'Gastric' },
        { id: 'renal', text: 'Renal' },
        { id: 'colic', text: 'Colic' },
        { id: 'pancreatic', text: 'Pancreatic' },
      ],
      answerId: 'gastric',
      explanation: 'For the fundus, between the superior and intermediate borders.',
    },
    {
      id: 'sp-notch',
      prompt: 'An enlarged spleen is recognised by its:',
      options: [
        { id: 'notch', text: 'Notched superior border' },
        { id: 'hilum', text: 'Palpable hilum' },
        { id: 'smooth', text: 'Smooth inferior border' },
        { id: 'pulse', text: 'Pulsation' },
      ],
      answerId: 'notch',
      explanation: 'The notches are felt as it grows towards the right iliac fossa.',
    },
  ],
  cards: [
    {
      id: 'sp-odd-numbers',
      front: 'The spleen’s odd numbers?',
      back: '1 inch thick, 3 inches broad, 5 inches long, 7 ounces, over ribs 9 to 11.',
    },
    {
      id: 'sp-features',
      front: 'External features of the spleen?',
      back: 'Two ends (anterior, posterior), three borders (superior notched, inferior, intermediate), two surfaces (diaphragmatic, visceral), a hilum.',
    },
    {
      id: 'sp-impressions',
      front: 'Impressions on its visceral surface?',
      back: 'Gastric (largest), renal, colic (splenic flexure), pancreatic (tail).',
    },
    {
      id: 'sp-ligaments',
      front: 'Ligaments of the spleen and their contents?',
      back: 'Gastrosplenic: short gastric and left gastroepiploic vessels. Lienorenal: splenic vessels and tail of the pancreas. Phrenicocolic supports its anterior end.',
    },
    {
      id: 'sp-functions',
      front: 'Functions of the spleen?',
      back: 'Phagocytosis (filters blood, removes old red cells), lymphopoiesis and immune responses, storage of red cells, haemopoiesis in the fetus.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 23 Spleen, Pancreas and Liver',
      pages: '344–349',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '337–338' },
  ],
};
