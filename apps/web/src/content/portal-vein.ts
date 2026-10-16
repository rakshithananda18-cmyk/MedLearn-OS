import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  LESSER_OMENTUM_VIEW,
  PORTAL_BACK,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const portalVein: Topic = {
  slug: 'portal-vein',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Portal vein and portosystemic anastomoses',
  summary:
    'How the portal vein forms, its three parts and their relations, its branches and tributaries, and the places where portal and systemic veins meet, which swell when portal pressure rises.',
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
      'Volume 2, Chapter 21 Large Blood Vessels of the Gut: portal vein and portosystemic communications, pages 330 to 334',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: portal vein and portacaval anastomoses, pages 354 to 357',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Liver and lesser omentum in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Portal vein and its tributaries, organs and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'About 8 cm long, formed behind the neck of the pancreas at L2 by the union of the superior mesenteric and splenic veins; the inferior mesenteric vein usually joins the splenic. It brings blood from the abdominal gut, gallbladder, pancreas and spleen to the liver sinusoids, and gives the liver about 80% of its blood.',
    'Three parts. Infraduodenal: behind the neck of the pancreas, the inferior vena cava behind. Retroduodenal: behind the first part of the duodenum, with the bile duct and gastroduodenal artery in front. Supraduodenal: in the free margin of the lesser omentum, behind the bile duct and hepatic artery, with the epiploic foramen between it and the inferior vena cava.',
    'At the right end of the porta hepatis it divides. The right branch is short and wide and takes the cystic vein; the left is long and narrow, crosses the porta, supplies the caudate and quadrate lobes, and is joined by the ligamentum teres and ligamentum venosum.',
    'Its direct tributaries are the left and right gastric veins, the superior pancreaticoduodenal vein, the cystic vein (into the right branch) and the paraumbilical veins (into the left branch).',
    'Portal and systemic veins meet at the lower end of the oesophagus, the anal canal, the umbilicus, the bare area of the liver, the back of the abdomen (colic and splenic with renal and lumbar veins) and a patent ductus venosus. When portal pressure rises, they open up as oesophageal varices, rectal varices and caput medusae.',
  ],
  visual: {
    kind: 'path',
    // Left: formation and course. Right: portal hypertension and the anastomoses.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'portal-vein',
          label: 'Portal vein: 8 cm',
          name: 'Portal vein, about 8 cm',
          x: 180,
          y: 30,
        },
        {
          id: 'superior-mesenteric-vein',
          label: 'Superior mesenteric\nvein',
          name: 'Superior mesenteric vein',
          x: 85,
          y: 100,
        },
        {
          id: 'splenic-vein',
          label: 'Splenic vein',
          name: 'Splenic vein',
          x: 85,
          y: 160,
        },
        {
          id: 'inferior-mesenteric-vein',
          label: 'Inferior mesenteric\ninto splenic',
          name: 'Inferior mesenteric vein, usually into the splenic vein',
          x: 85,
          y: 220,
        },
        {
          id: 'infraduodenal',
          label: 'Behind neck of\npancreas, L2',
          name: 'Infraduodenal part, behind the neck of the pancreas at L2',
          x: 85,
          y: 285,
        },
        {
          id: 'retroduodenal',
          label: 'Behind first part\nof duodenum',
          name: 'Retroduodenal part, behind the first part of the duodenum',
          x: 85,
          y: 350,
        },
        {
          id: 'lesser-omentum',
          label: 'In free margin of\nlesser omentum',
          name: 'Supraduodenal part, in the free margin of the lesser omentum',
          x: 85,
          y: 415,
        },
        {
          id: 'portal-hypertension',
          label: 'Portal hypertension',
          name: 'Portal hypertension, as in cirrhosis of the liver',
          x: 275,
          y: 100,
        },
        {
          id: 'left-gastric-vein',
          label: 'Lower oesophagus:\nvarices',
          name: 'Lower oesophagus: left gastric vein with oesophageal veins to the azygos',
          x: 275,
          y: 160,
        },
        {
          id: 'anal-canal',
          label: 'Anal canal: rectal\nvarices',
          name: 'Anal canal: superior rectal vein with the middle and inferior rectal veins',
          x: 275,
          y: 220,
        },
        {
          id: 'umbilicus',
          label: 'Umbilicus: caput\nmedusae',
          name: 'Umbilicus: paraumbilical veins with the epigastric veins',
          x: 275,
          y: 285,
        },
        {
          id: 'bare-area',
          label: 'Bare area of liver',
          name: 'Bare area of the liver: portal radicles with diaphragmatic veins',
          x: 275,
          y: 350,
        },
        {
          id: 'retroperitoneal',
          label: 'Colic, splenic with\nrenal, lumbar',
          name: 'Back of the abdomen: colic and splenic veins with renal and lumbar veins',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'portal-vein', to: 'superior-mesenteric-vein' },
        { from: 'superior-mesenteric-vein', to: 'splenic-vein' },
        { from: 'splenic-vein', to: 'inferior-mesenteric-vein' },
        { from: 'inferior-mesenteric-vein', to: 'infraduodenal' },
        { from: 'infraduodenal', to: 'retroduodenal' },
        { from: 'retroduodenal', to: 'lesser-omentum' },
        { from: 'portal-vein', to: 'portal-hypertension' },
        { from: 'portal-hypertension', to: 'left-gastric-vein' },
        { from: 'left-gastric-vein', to: 'anal-canal' },
        { from: 'anal-canal', to: 'umbilicus' },
        { from: 'umbilicus', to: 'bare-area' },
        { from: 'bare-area', to: 'retroperitoneal' },
      ],
    },
    lesions: [
      {
        id: 'oesophageal-varices',
        label: 'Oesophageal varices',
        nodeIds: ['portal-hypertension', 'left-gastric-vein'],
        explanation:
          'When cirrhosis blocks flow through the liver, portal blood escapes through the left gastric vein into the oesophageal veins that drain to the azygos. They swell under the mucosa of the lower oesophagus; if they burst, the patient vomits blood, sometimes fatally.',
      },
      {
        id: 'caput-medusae',
        label: 'Caput medusae',
        nodeIds: ['portal-hypertension', 'umbilicus'],
        explanation:
          'The paraumbilical veins along the ligamentum teres open up and fill the veins round the umbilicus, which radiate over the abdominal wall towards the epigastric and thoracic veins.',
      },
      {
        id: 'rectal-varices',
        label: 'Rectal varices',
        nodeIds: ['portal-hypertension', 'anal-canal'],
        explanation:
          'The superior rectal vein (portal) meets the middle and inferior rectal veins (systemic) in the wall of the anal canal; raised portal pressure dilates the meeting veins, with bleeding from the rectum.',
      },
      {
        id: 'streamline',
        label: 'Streamline flow',
        nodeIds: ['superior-mesenteric-vein', 'splenic-vein'],
        explanation:
          'Portal blood flows slowly and does not fully mix: the superior mesenteric stream goes mainly to the right lobe, the splenic and inferior mesenteric to the left. So infection absorbed from the small intestine, such as an amoebic abscess, tends to reach the right lobe.',
      },
    ],
    drill: [
      {
        id: 'formation',
        title: 'Formation and course',
        hint: 'The two veins that form it and the one that joins the splenic, then its three parts.',
        nodeIds: [
          'superior-mesenteric-vein',
          'splenic-vein',
          'inferior-mesenteric-vein',
          'infraduodenal',
          'retroduodenal',
          'lesser-omentum',
        ],
      },
      {
        id: 'anastomoses',
        title: 'Where portal meets systemic',
        hint: 'Start with what makes them matter, then the sites from top to bottom and the quieter ones.',
        nodeIds: [
          'portal-hypertension',
          'left-gastric-vein',
          'anal-canal',
          'umbilicus',
          'bare-area',
          'retroperitoneal',
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
          'liver',
          'gallbladder',
          'bile-duct',
          'abdominal-oesophagus',
          'stomach',
          'spleen',
          'pancreas',
          'duodenum',
          'kidneys',
          'lesser-omentum',
          'abdominal-aorta',
          'inferior-vena-cava',
          'hepatic-artery',
          'portal-vein',
          'splenic-vein',
          'superior-mesenteric-vein',
          'inferior-mesenteric-vein',
          'left-gastric-vein',
          'right-gastric-vein',
        ],
        ['liver', 'stomach', 'duodenum', 'pancreas'],
      ),
      traces: [],
      stops: [
        {
          ...LESSER_OMENTUM_VIEW,
          title: 'In the free margin',
          description:
            'Lift the liver in the mind’s eye: the portal vein rises in the free edge of the lesser omentum, behind the bile duct and hepatic artery, with the epiploic foramen behind it.',
        },
        PORTAL_BACK,
      ],
    },
  },
  lesson: [
    {
      id: 'formation',
      title: 'How it forms',
      body: 'The portal vein carries blood from the abdominal part of the gut, the gallbladder, pancreas and spleen to the liver. It is about 8 cm long and forms behind the neck of the pancreas, at L2, where the superior mesenteric vein meets the splenic vein; the inferior mesenteric vein usually joins the splenic first. It is called portal because it begins in one bed of capillaries, in the gut, and ends in another, the sinusoids of the liver.',
      focus: ['superior-mesenteric-vein', 'splenic-vein', 'inferior-mesenteric-vein'],
    },
    {
      id: 'course',
      title: 'Its three parts',
      body: 'It runs up and a little to the right. Infraduodenal part: behind the neck of the pancreas, the inferior vena cava behind it. Retroduodenal part: behind the first part of the duodenum, with the bile duct and gastroduodenal artery in front and the inferior vena cava behind. Supraduodenal part: in the free right margin of the lesser omentum, behind the bile duct (right) and hepatic artery (left), with the epiploic foramen between it and the inferior vena cava.',
      focus: ['infraduodenal', 'retroduodenal', 'lesser-omentum'],
    },
    {
      id: 'branches',
      title: 'Branches and tributaries',
      body: 'At the right end of the porta hepatis it divides. The right branch is short and wide, takes the cystic vein and enters the right lobe. The left branch is long and narrow, runs across the porta, gives branches to the caudate and quadrate lobes, and before entering the left lobe is joined by the ligamentum teres and ligamentum venosum, remains of the umbilical vein and ductus venosus. Inside the liver its branches end in the sinusoids with those of the hepatic artery. Directly it receives the left and right gastric veins, the superior pancreaticoduodenal vein and the paraumbilical veins.',
      focus: ['portal-vein'],
    },
    {
      id: 'anastomoses',
      title: 'Where portal meets systemic',
      body: 'At the lower oesophagus: the left gastric vein (portal) with oesophageal veins draining to the azygos. In the anal canal: the superior rectal vein with the middle and inferior rectal veins. At the umbilicus: paraumbilical veins along the ligamentum teres with the superior and inferior epigastric veins. At the bare area of the liver: portal radicles with diaphragmatic veins. Behind the colon and spleen: colic and splenic veins with renal and lumbar veins. And, if it stays open, the ductus venosus joining the left branch to the inferior vena cava.',
      focus: ['left-gastric-vein', 'anal-canal', 'umbilicus', 'bare-area', 'retroperitoneal'],
    },
    {
      id: 'hypertension',
      title: 'Portal hypertension',
      body: 'Normal portal pressure is about 5 to 15 mm Hg. When cirrhosis scars the liver, or the portal vein clots, the pressure rises: the spleen swells, fluid collects in the peritoneal cavity (ascites), and the anastomoses open up as oesophageal varices, rectal varices and caput medusae. A shunt operation joins a portal channel to the inferior vena cava or left renal vein to take the pressure off.',
      focus: ['portal-hypertension'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From below and in front, find the portal vein in the free edge of the lesser omentum; from behind, watch the splenic and superior mesenteric veins meet behind the pancreas. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'pv-formation',
      prompt: 'The portal vein is formed by the union of the:',
      options: [
        { id: 'smv-splenic', text: 'Superior mesenteric and splenic veins' },
        { id: 'imv-splenic', text: 'Inferior mesenteric and splenic veins' },
        { id: 'smv-imv', text: 'Superior and inferior mesenteric veins' },
        { id: 'splenic-left-gastric', text: 'Splenic and left gastric veins' },
      ],
      answerId: 'smv-splenic',
      explanation: 'Behind the neck of the pancreas at L2.',
    },
    {
      id: 'pv-supraduodenal',
      prompt: 'In the free margin of the lesser omentum, the portal vein lies:',
      options: [
        { id: 'behind', text: 'Behind the bile duct and hepatic artery' },
        { id: 'front', text: 'In front of the bile duct' },
        { id: 'left', text: 'To the left of the hepatic artery' },
        { id: 'below', text: 'Below the epiploic foramen' },
      ],
      answerId: 'behind',
      explanation:
        'The bile duct is on the right, the hepatic artery on the left, both in front of it; the epiploic foramen lies behind it.',
    },
    {
      id: 'pv-not-site',
      prompt: 'Portal and systemic veins do not meet at the:',
      options: [
        { id: 'greater-curvature', text: 'Greater curvature of the stomach' },
        { id: 'oesophagus', text: 'Lower end of the oesophagus' },
        { id: 'umbilicus', text: 'Umbilicus' },
        { id: 'bare-area', text: 'Bare area of the liver' },
      ],
      answerId: 'greater-curvature',
      explanation:
        'The gastroepiploic veins drain only to the portal system; the others are classic sites.',
    },
    {
      id: 'pv-venosum',
      prompt: 'The ligamentum venosum is attached to the:',
      options: [
        { id: 'left-branch', text: 'Left branch of the portal vein' },
        { id: 'right-branch', text: 'Right branch of the portal vein' },
        { id: 'splenic', text: 'Splenic vein' },
        { id: 'smv', text: 'Superior mesenteric vein' },
      ],
      answerId: 'left-branch',
      explanation: 'With the ligamentum teres; both are remains of fetal channels.',
    },
  ],
  cards: [
    {
      id: 'pv-formation-card',
      front: 'Portal vein: formation?',
      back: 'Superior mesenteric plus splenic veins, behind the neck of the pancreas at L2; about 8 cm long. The inferior mesenteric usually joins the splenic.',
    },
    {
      id: 'pv-parts',
      front: 'Parts of the portal vein and their relations?',
      back: 'Infraduodenal (behind the neck of the pancreas), retroduodenal (behind the first part of the duodenum, bile duct and GDA in front), supraduodenal (free margin of the lesser omentum, behind the bile duct and hepatic artery). IVC behind throughout.',
    },
    {
      id: 'pv-tributaries',
      front: 'Direct tributaries of the portal vein?',
      back: 'Left and right gastric, superior pancreaticoduodenal, cystic (right branch), paraumbilical (left branch).',
    },
    {
      id: 'pv-sites',
      front: 'Sites of portosystemic anastomosis?',
      back: 'Lower oesophagus, anal canal, umbilicus, bare area of the liver, retroperitoneum (colic and splenic with renal and lumbar), falciform ligament, patent ductus venosus.',
    },
    {
      id: 'pv-hypertension',
      front: 'Effects of portal hypertension?',
      back: 'Congestive splenomegaly, ascites, and collaterals: oesophageal varices (haematemesis), rectal varices, caput medusae.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 21 Large Blood Vessels of the Gut',
      pages: '330–334',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '354–357' },
  ],
};
