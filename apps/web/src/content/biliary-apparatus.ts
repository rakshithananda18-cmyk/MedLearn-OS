import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  BILIARY_TREE,
  BILIARY_VIEW,
  DUODENUM_VIEW,
  ORGANS_SKELETON,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const biliaryApparatus: Topic = {
  slug: 'biliary-apparatus',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Gallbladder and the bile ducts',
  summary:
    'The extrahepatic biliary apparatus: the hepatic, cystic and bile ducts, the gallbladder and its parts, the four parts of the bile duct and its sphincters, the cystic artery in Calot’s triangle, and where gallbladder pain is felt.',
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
      'Volume 2, Chapter 22 Extrahepatic Biliary Apparatus, pages 336 to 342',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: gallbladder and duct system for bile, pages 336 to 337 and 340 to 341',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Liver and pancreatic ducts in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Gallbladder, bile ducts, organs, vessels and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The extrahepatic biliary apparatus collects bile from the liver, stores and concentrates it, and delivers it to the second part of the duodenum: right and left hepatic ducts, common hepatic duct, gallbladder, cystic duct and bile duct.',
    'At the porta hepatis, from behind forwards: portal vein, hepatic artery, hepatic ducts. The hepatic ducts join near its right end as the common hepatic duct (about 3 cm), which the cystic duct joins on its right at an acute angle to form the bile duct.',
    'The gallbladder, 7 to 10 cm long and holding 30 to 50 ml, lies in its fossa under the right lobe. Its fundus projects at the tip of the right ninth costal cartilage (lateral edge of the rectus); its neck bulges as Hartmann’s pouch, where stones lodge. The cystic duct, 3 to 4 cm, carries the spiral valve of Heister.',
    'The bile duct, 8 cm long and 6 mm wide, is supraduodenal (free margin of the lesser omentum, portal vein behind, hepatic artery on its left), retroduodenal, infraduodenal (in a groove on the back of the head of the pancreas) and intraduodenal, where it joins the pancreatic duct in the hepatopancreatic ampulla on the major papilla.',
    'The cystic artery, usually from the right hepatic, passes behind the common hepatic and cystic ducts to the neck of the gallbladder; it lies in Calot’s triangle (cystic duct, common hepatic duct, liver) with the cystic node. Gallbladder pain is referred to the epigastrium, the inferior angle of the right scapula (T7 to T9) and the right shoulder (phrenic, C4).',
  ],
  visual: {
    kind: 'path',
    // Left: the ducts in order. Right: the gallbladder, its artery and its pain.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'biliary-apparatus',
          label: 'Biliary apparatus',
          name: 'Extrahepatic biliary apparatus',
          x: 180,
          y: 30,
        },
        {
          id: 'hepatic-ducts',
          label: 'Right and left\nhepatic ducts',
          name: 'Right and left hepatic ducts',
          x: 85,
          y: 100,
        },
        {
          id: 'porta-hepatis',
          label: 'Porta: vein, artery,\nducts',
          name: 'Porta hepatis, from behind forwards: portal vein, hepatic artery, hepatic ducts',
          x: 85,
          y: 165,
        },
        {
          id: 'common-hepatic-duct',
          label: 'Common hepatic\nduct: 3 cm',
          name: 'Common hepatic duct, about 3 cm',
          x: 85,
          y: 230,
        },
        {
          id: 'cystic-duct',
          label: 'Cystic duct:\nspiral valve',
          name: 'Cystic duct, 3 to 4 cm, with the spiral valve of Heister',
          x: 85,
          y: 295,
        },
        {
          id: 'bile-duct',
          label: 'Bile duct: 8 cm,\nfour parts',
          name: 'Bile duct, 8 cm: supraduodenal, retroduodenal, infraduodenal, intraduodenal',
          x: 85,
          y: 355,
        },
        {
          id: 'ampulla',
          label: 'Ampulla and\nsphincters',
          name: 'Hepatopancreatic ampulla, with the sphincters of the bile duct and of Oddi',
          x: 85,
          y: 415,
        },
        {
          id: 'gallbladder',
          label: 'Gallbladder:\n30 to 50 ml',
          name: 'Gallbladder, 7 to 10 cm, 30 to 50 ml',
          x: 275,
          y: 100,
        },
        {
          id: 'fundus',
          label: 'Fundus at right 9th\ncartilage',
          name: 'Fundus at the tip of the right ninth costal cartilage',
          x: 275,
          y: 165,
        },
        {
          id: 'hartmanns-pouch',
          label: 'Neck: Hartmann’s\npouch',
          name: 'Neck of the gallbladder with Hartmann’s pouch',
          x: 275,
          y: 230,
        },
        {
          id: 'cystic-artery',
          label: 'Cystic artery',
          name: 'Cystic artery, usually from the right hepatic',
          x: 275,
          y: 295,
        },
        {
          id: 'calots-triangle',
          label: 'Calot’s triangle',
          name: 'Calot’s triangle: cystic duct, common hepatic duct and liver',
          x: 275,
          y: 355,
        },
        {
          id: 'referred-pain',
          label: 'Pain: epigastrium,\nscapula, shoulder',
          name: 'Referred pain: epigastrium, right scapula, right shoulder',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'biliary-apparatus', to: 'hepatic-ducts' },
        { from: 'hepatic-ducts', to: 'porta-hepatis' },
        { from: 'porta-hepatis', to: 'common-hepatic-duct' },
        { from: 'common-hepatic-duct', to: 'cystic-duct' },
        { from: 'cystic-duct', to: 'bile-duct' },
        { from: 'bile-duct', to: 'ampulla' },
        { from: 'biliary-apparatus', to: 'gallbladder' },
        { from: 'gallbladder', to: 'fundus' },
        { from: 'fundus', to: 'hartmanns-pouch' },
        { from: 'hartmanns-pouch', to: 'cystic-artery' },
        { from: 'cystic-artery', to: 'calots-triangle' },
        { from: 'calots-triangle', to: 'referred-pain' },
      ],
    },
    lesions: [
      {
        id: 'gallstones',
        label: 'Gallstones and cholecystitis',
        nodeIds: ['gallbladder', 'hartmanns-pouch', 'referred-pain'],
        explanation:
          'Stones form where bile is stored and concentrated. One stuck in Hartmann’s pouch or the cystic duct causes biliary colic. An inflamed gallbladder hurts under the right costal margin and towards the right scapula and shoulder, and pressing below the costal margin at the ninth cartilage stops the breath short on inspiration (Murphy’s sign).',
      },
      {
        id: 'obstructive-jaundice',
        label: 'Obstructive jaundice',
        nodeIds: ['bile-duct', 'ampulla'],
        explanation:
          'A stone in the bile duct or a cancer of the head of the pancreas blocks the bile: pale stools, dark urine, yellow skin. With bouts of pain think of a stone; with weight loss, a cancer, and then the gallbladder is often distended (Courvoisier’s law).',
      },
      {
        id: 'cholecystectomy',
        label: 'Removing the gallbladder',
        nodeIds: ['calots-triangle', 'cystic-artery', 'common-hepatic-duct'],
        explanation:
          'The cystic artery is found and tied in Calot’s triangle. The artery and ducts vary a great deal, and the common hepatic duct must not be taken for the cystic duct. Accessory hepatic ducts can leak bile afterwards, so a drain is left.',
      },
    ],
    drill: [
      {
        id: 'ducts',
        title: 'The ducts',
        hint: 'From the porta hepatis down to the duodenum.',
        nodeIds: [
          'hepatic-ducts',
          'porta-hepatis',
          'common-hepatic-duct',
          'cystic-duct',
          'bile-duct',
          'ampulla',
        ],
      },
      {
        id: 'gallbladder',
        title: 'The gallbladder',
        hint: 'Its size, fundus and neck, its artery and triangle, then its pain.',
        nodeIds: [
          'gallbladder',
          'fundus',
          'hartmanns-pouch',
          'cystic-artery',
          'calots-triangle',
          'referred-pain',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [
          ...ORGANS_SKELETON,
          'liver',
          ...BILIARY_TREE,
          'duodenum',
          'pancreas',
          'kidneys',
          'inferior-vena-cava',
          'abdominal-aorta',
          'portal-vein',
          'hepatic-artery',
          'gastroduodenal-artery',
        ],
        ['liver', 'pancreas'],
      ),
      traces: [],
      stops: [
        BILIARY_VIEW,
        {
          ...DUODENUM_VIEW,
          title: 'Down to the duodenum',
          description:
            'The bile duct passes behind the first part of the duodenum, then in a groove on the back of the head of the pancreas, to meet the pancreatic duct in the wall of the second part.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'ducts',
      title: 'Hepatic and common hepatic ducts',
      body: 'Bile leaves the liver at the porta hepatis in the right and left hepatic ducts, which lie in front of the hepatic artery and portal vein (from behind forwards: vein, artery, ducts). Near the right end of the porta they join as the common hepatic duct, which runs down about 3 cm before the cystic duct joins it from the right at an acute angle. About one person in seven has an accessory hepatic duct from the right lobe.',
      focus: ['hepatic-ducts', 'porta-hepatis', 'common-hepatic-duct'],
    },
    {
      id: 'gallbladder',
      title: 'The gallbladder',
      body: 'A pear-shaped bag, 7 to 10 cm long and 3 cm wide, holding 30 to 50 ml, in its fossa under the right lobe. The fundus projects beyond the liver’s border at the tip of the right ninth costal cartilage, wrapped in peritoneum, against the anterior wall and the transverse colon. The body lies on the liver, bare above, with the colon and duodenum below. The neck curves at the porta; its mucosa folds spirally and its wall bulges as Hartmann’s pouch. It stores bile and concentrates it up to ten times.',
      focus: ['gallbladder', 'fundus', 'hartmanns-pouch'],
    },
    {
      id: 'cystic-bile',
      title: 'Cystic duct and bile duct',
      body: 'The cystic duct, 3 to 4 cm, runs down, back and left from the neck; its lining forms 5 to 12 crescentic folds, the spiral valve of Heister. The bile duct, 8 cm long and 6 mm wide, runs first in the free margin of the lesser omentum (portal vein behind, hepatic artery to its left), then behind the first part of the duodenum (gastroduodenal artery on its left), then in a groove on the back of the head of the pancreas (IVC behind), and finally obliquely through the wall of the second part.',
      focus: ['cystic-duct', 'bile-duct'],
    },
    {
      id: 'ampulla',
      title: 'Ampulla and sphincters',
      body: 'In the duodenal wall the bile and pancreatic ducts usually unite as the hepatopancreatic ampulla (of Vater), opening on the major papilla 8 to 10 cm from the pylorus. The sphincter of the bile duct (choledochus) is always present and keeps bile in the gallbladder between meals; a weaker sphincter may ring the pancreatic duct; the sphincter of the ampulla is the sphincter of Oddi. A fatty meal releases cholecystokinin, which contracts the gallbladder and relaxes the sphincters.',
      focus: ['ampulla'],
    },
    {
      id: 'supply',
      title: 'Vessels, lymph and Calot’s triangle',
      body: 'The cystic artery, usually from the right hepatic, passes behind the common hepatic and cystic ducts to the neck, where it splits into superficial and deep branches; it also feeds the ducts and the top of the bile duct, while the posterior superior pancreaticoduodenal feeds its lower part. Cystic veins drain into the right branch of the portal vein, and the bed of the gallbladder straight into the liver. Lymph goes to the cystic node, in the angle between the cystic and common hepatic ducts, and the node of the epiploic foramen. Calot’s triangle, bounded by the cystic duct, the common hepatic duct and the liver, holds the cystic artery and node.',
      focus: ['cystic-artery', 'calots-triangle'],
    },
    {
      id: 'pain',
      title: 'Where its pain is felt',
      body: 'Its nerves come from the hepatic plexus (coeliac, both vagi, right phrenic). Sympathetic fibres from T7 to T9 carry its pain: to the epigastrium, the skin of the foregut’s segments, and to the inferior angle of the right scapula (T7). When the peritoneum over it is inflamed, the right phrenic nerve (C3, C4) carries pain that is felt at the right shoulder, the territory of the supraclavicular nerves.',
      focus: ['referred-pain'],
    },
  ],
  questions: [
    {
      id: 'ba-porta',
      prompt: 'At the porta hepatis, the structure lying furthest forward is the:',
      options: [
        { id: 'ducts', text: 'Hepatic ducts' },
        { id: 'artery', text: 'Hepatic artery' },
        { id: 'vein', text: 'Portal vein' },
        { id: 'ivc', text: 'Inferior vena cava' },
      ],
      answerId: 'ducts',
      explanation: 'From behind forwards: portal vein, hepatic artery, hepatic ducts.',
    },
    {
      id: 'ba-capacity',
      prompt: 'The gallbladder holds about:',
      options: [
        { id: 'thirty', text: '30 to 50 ml' },
        { id: 'hundred', text: '100 to 150 ml' },
        { id: 'five', text: '5 to 10 ml' },
        { id: 'three-hundred', text: '300 ml' },
      ],
      answerId: 'thirty',
      explanation: 'It stores bile and concentrates it up to ten times.',
    },
    {
      id: 'ba-calot',
      prompt: 'Calot’s triangle is bounded by the cystic duct, the liver and the:',
      options: [
        { id: 'chd', text: 'Common hepatic duct' },
        { id: 'bile-duct', text: 'Bile duct' },
        { id: 'portal', text: 'Portal vein' },
        { id: 'duodenum', text: 'First part of the duodenum' },
      ],
      answerId: 'chd',
      explanation: 'It contains the cystic artery and the cystic lymph node.',
    },
    {
      id: 'ba-referred',
      prompt: 'Gallbladder pain is not usually referred to the:',
      options: [
        { id: 'left-scapula', text: 'Inferior angle of the left scapula' },
        { id: 'right-shoulder', text: 'Tip of the right shoulder' },
        { id: 'epigastrium', text: 'Epigastrium' },
        { id: 'right-scapula', text: 'Inferior angle of the right scapula' },
      ],
      answerId: 'left-scapula',
      explanation:
        'Right scapula through T7 sympathetic fibres; right shoulder through the right phrenic.',
    },
  ],
  cards: [
    {
      id: 'ba-parts',
      front: 'Parts of the extrahepatic biliary apparatus?',
      back: 'Right and left hepatic ducts, common hepatic duct, gallbladder, cystic duct, bile duct.',
    },
    {
      id: 'ba-gallbladder',
      front: 'Gallbladder: size, capacity, parts?',
      back: '7 to 10 cm long, 3 cm wide, 30 to 50 ml. Fundus (tip of the right ninth costal cartilage), body, neck (Hartmann’s pouch).',
    },
    {
      id: 'ba-bile-duct',
      front: 'Parts of the bile duct?',
      back: 'Supraduodenal (free margin of the lesser omentum), retroduodenal, infraduodenal (groove in the head of the pancreas), intraduodenal (ampulla on the major papilla). 8 cm long.',
    },
    {
      id: 'ba-sphincters',
      front: 'Sphincters at the end of the bile duct?',
      back: 'Sphincter of the bile duct (choledochus, always present), sphincter of the pancreatic duct (not always), sphincter of the ampulla (Oddi).',
    },
    {
      id: 'ba-cystic-artery',
      front: 'Cystic artery?',
      back: 'Usually from the right hepatic; behind the common hepatic and cystic ducts in Calot’s triangle to the neck of the gallbladder.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 22 Extrahepatic Biliary Apparatus',
      pages: '336–342',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '336–337, 340–341' },
  ],
};
