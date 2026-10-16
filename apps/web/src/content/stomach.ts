import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  ORGANS_SIDE,
  ORGANS_SKELETON,
  STOMACH_FRONT,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const stomach: Topic = {
  slug: 'stomach',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Abdominal oesophagus and the stomach',
  summary:
    'The short abdominal oesophagus, then the stomach: its two orifices, two curvatures and two parts, its peritoneum, what lies in front of it, and the stomach bed behind.',
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
      'Volume 2, Chapter 19 Abdominal Part of Oesophagus and Stomach: oesophagus, stomach, external features and relations, pages 291 to 295',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: abdominal oesophagus and stomach, pages 307 to 309',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Liver and omenta in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Oesophagus, stomach, organs, vessels and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The abdominal oesophagus is only about 1.25 cm long. It passes through the diaphragm at T10, a little left of the midline, runs down and left in front of the left crus, and opens into the cardiac end of the stomach at T11, 2.5 cm left of the midline.',
    'The cardiac orifice lies behind the left seventh costal cartilage, 2.5 cm from the sternum, at T11. The pyloric orifice lies 1.2 cm right of the midline at the lower border of L1 (the transpyloric plane), marked by the pyloric constriction and the prepyloric vein in front of it.',
    'A line from the cardiac orifice down to the angular notch on the lesser curvature divides the stomach into a cardiac part (fundus above the level of the cardiac orifice, then body) and a pyloric part (antrum, 7.5 cm, then canal, 2.5 cm).',
    'The lesser curvature carries the lesser omentum. The greater curvature, five times as long, carries the greater omentum, the gastrosplenic ligament and the gastrophrenic ligament; above the gastrophrenic ligament a small bare area lies on the left crus.',
    'In front: the liver, diaphragm and anterior abdominal wall. Behind, across the lesser sac, the stomach bed: diaphragm, left kidney, left suprarenal, pancreas, transverse mesocolon, splenic flexure and splenic artery. The spleen also touches it, but across the greater sac.',
  ],
  visual: {
    kind: 'path',
    // Left: the oesophagus, orifices, curvatures and parts. Right: peritoneum and relations.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'stomach', label: 'Stomach', name: 'Stomach', x: 180, y: 30 },
        {
          id: 'abdominal-oesophagus',
          label: 'Abdominal\noesophagus',
          name: 'Abdominal oesophagus, about 1.25 cm, from T10 to T11',
          x: 85,
          y: 100,
        },
        {
          id: 'cardiac-orifice',
          label: 'Cardiac orifice\nat T11',
          name: 'Cardiac orifice, behind the left seventh costal cartilage at T11',
          x: 85,
          y: 165,
        },
        {
          id: 'pyloric-orifice',
          label: 'Pyloric orifice\nat L1',
          name: 'Pyloric orifice, 1.2 cm right of the midline at the lower border of L1',
          x: 85,
          y: 230,
        },
        {
          id: 'curvatures',
          label: 'Lesser and greater\ncurvatures',
          name: 'Lesser and greater curvatures, with the angular notch',
          x: 85,
          y: 295,
        },
        {
          id: 'cardiac-part',
          label: 'Fundus and body',
          name: 'Cardiac part: fundus and body',
          x: 85,
          y: 355,
        },
        {
          id: 'pyloric-part',
          label: 'Pyloric antrum\nand canal',
          name: 'Pyloric part: pyloric antrum and pyloric canal',
          x: 85,
          y: 415,
        },
        {
          id: 'lesser-omentum',
          label: 'Lesser curvature:\nlesser omentum',
          name: 'Lesser omentum, from the lesser curvature',
          x: 275,
          y: 100,
        },
        {
          id: 'greater-omentum',
          label: 'Greater curvature:\ngreater omentum',
          name: 'Greater omentum, gastrosplenic and gastrophrenic ligaments, from the greater curvature',
          x: 275,
          y: 165,
        },
        {
          id: 'liver',
          label: 'Front: liver,\ndiaphragm, wall',
          name: 'Anterior relations: liver, diaphragm and anterior abdominal wall',
          x: 275,
          y: 230,
        },
        {
          id: 'stomach-bed',
          label: 'Stomach bed\nbehind lesser sac',
          name: 'Stomach bed, behind the lesser sac',
          x: 275,
          y: 295,
        },
        {
          id: 'pancreas',
          label: 'Bed: pancreas,\nleft kidney',
          name: 'Pancreas, left kidney and suprarenal, splenic artery, transverse mesocolon, splenic flexure, diaphragm',
          x: 275,
          y: 355,
        },
        {
          id: 'spleen',
          label: 'Spleen: across\nthe greater sac',
          name: 'Spleen, related to the stomach across the greater sac',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'stomach', to: 'abdominal-oesophagus' },
        { from: 'abdominal-oesophagus', to: 'cardiac-orifice' },
        { from: 'cardiac-orifice', to: 'pyloric-orifice' },
        { from: 'pyloric-orifice', to: 'curvatures' },
        { from: 'curvatures', to: 'cardiac-part' },
        { from: 'cardiac-part', to: 'pyloric-part' },
        { from: 'stomach', to: 'lesser-omentum' },
        { from: 'lesser-omentum', to: 'greater-omentum' },
        { from: 'greater-omentum', to: 'liver' },
        { from: 'liver', to: 'stomach-bed' },
        { from: 'stomach-bed', to: 'pancreas' },
        { from: 'pancreas', to: 'spleen' },
      ],
    },
    lesions: [
      {
        id: 'hiatal-hernia',
        label: 'Hiatal hernia',
        nodeIds: ['abdominal-oesophagus', 'cardiac-orifice'],
        explanation:
          'Stomach rises through the oesophageal opening of the diaphragm. In a sliding hernia the cardiac end itself goes up into the thorax and acid refluxes into the oesophagus; in a rolling (paraoesophageal) hernia the fundus rolls up beside an oesophagus that stays in place.',
      },
      {
        id: 'posterior-perforation',
        label: 'Ulcer on the back wall',
        nodeIds: ['stomach-bed', 'pancreas'],
        explanation:
          'An ulcer of the posterior wall perforates into the lesser sac rather than the greater sac. Going deeper, it can erode the pancreas, with pain felt in the back, or the splenic artery in the stomach bed, with heavy bleeding.',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'Parts of the stomach',
        hint: 'From the oesophagus down: the two orifices, the curvatures, then the two parts.',
        nodeIds: [
          'abdominal-oesophagus',
          'cardiac-orifice',
          'pyloric-orifice',
          'curvatures',
          'cardiac-part',
          'pyloric-part',
        ],
      },
      {
        id: 'relations',
        title: 'Its relations',
        hint: 'The fold on each curvature, then what lies in front, the bed behind, and the spleen.',
        nodeIds: [
          'lesser-omentum',
          'greater-omentum',
          'liver',
          'stomach-bed',
          'pancreas',
          'spleen',
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
          'gallbladder',
          'abdominal-oesophagus',
          'stomach',
          'spleen',
          'pancreas',
          'duodenum',
          'transverse-colon',
          'kidneys',
          'suprarenal-glands',
          'lesser-omentum',
          'greater-omentum',
          'transverse-mesocolon',
          'abdominal-aorta',
          'inferior-vena-cava',
          'splenic-artery',
        ],
        ['liver'],
      ),
      traces: [],
      stops: [
        STOMACH_FRONT,
        {
          ...ORGANS_SIDE,
          title: 'The stomach bed',
          description:
            'From the left: behind the stomach lie the pancreas, left kidney and suprarenal and the splenic artery, with the lesser sac between; the spleen lies against it further back and to the left.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'oesophagus',
      title: 'The abdominal oesophagus',
      body: 'Only about 1.25 cm of the oesophagus lies in the abdomen. It comes through the diaphragm at T10, a little left of the midline, with the two gastric nerves and the oesophageal branches of the left gastric vessels, runs down and left in front of the left crus and behind the left lobe of the liver, and enters the stomach at T11. Its right border runs smoothly into the lesser curvature; on the left the cardiac notch separates it from the fundus. Peritoneum covers it only in front and on the left.',
      focus: ['abdominal-oesophagus'],
    },
    {
      id: 'orifices',
      title: 'Two orifices',
      body: 'The cardiac orifice lies behind the left seventh costal cartilage, 2.5 cm from the sternum, at T11; it acts like a sphincter though none can be dissected. The pyloric orifice opens into the duodenum 1.2 cm right of the midline at the lower border of L1 (empty stomach, lying down). Feel for the firm ring of the pyloric sphincter, and look for the prepyloric vein of Mayo crossing in front of it.',
      focus: ['cardiac-orifice', 'pyloric-orifice'],
    },
    {
      id: 'parts',
      title: 'Curvatures and parts',
      body: 'The lesser curvature is the short concave right border, with the angular notch at its lowest point; the greater curvature is the long convex left border, with the cardiac notch at its top. A line from the cardiac orifice to the angular notch divides the stomach. The larger cardiac part is the fundus, the dome above the level of the cardiac orifice that holds the gas bubble under the left dome of the diaphragm, and the body. The pyloric part is the antrum (7.5 cm) and the narrow canal (2.5 cm) ending at the pylorus.',
      focus: ['curvatures', 'cardiac-part', 'pyloric-part'],
    },
    {
      id: 'peritoneum',
      title: 'Its peritoneum',
      body: 'Peritoneum covers both surfaces. At the lesser curvature the two layers meet and go up to the liver as the lesser omentum; along most of the greater curvature they meet as the greater omentum, near the fundus as the gastrosplenic ligament, and at the cardiac end the back layer turns onto the diaphragm as the gastrophrenic ligament. Above that ligament a small bare area of the back of the stomach lies directly on the left crus.',
      focus: ['lesser-omentum', 'greater-omentum'],
    },
    {
      id: 'relations',
      title: 'In front and behind',
      body: 'In front: the left lobe of the liver, the diaphragm (beyond which lie the left pleura, pericardium and sixth to ninth ribs) and the anterior abdominal wall. Over the stomach between the left costal margin and the lower edge of the left lung is Traube’s space, resonant to percussion unless the spleen is enlarged or the left pleura holds fluid. Behind, across the lesser sac, is the stomach bed: diaphragm, left kidney, left suprarenal, pancreas, transverse mesocolon, splenic flexure and splenic artery. The spleen lies against it too, but across the greater sac.',
      focus: ['liver', 'stomach-bed', 'pancreas', 'spleen'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the front, follow the oesophagus into the cardiac end and trace both curvatures to the pylorus; from the left, put the pancreas, left kidney and splenic artery behind it. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'st-bed',
      prompt: 'All of these lie in the stomach bed except the:',
      options: [
        { id: 'coeliac', text: 'Coeliac trunk' },
        { id: 'pancreas', text: 'Pancreas' },
        { id: 'left-kidney', text: 'Left kidney' },
        { id: 'splenic-artery', text: 'Splenic artery' },
      ],
      answerId: 'coeliac',
      explanation:
        'The bed is the diaphragm, left kidney and suprarenal, pancreas, transverse mesocolon, splenic flexure and splenic artery.',
    },
    {
      id: 'st-cardiac',
      prompt: 'The cardiac orifice of the stomach lies behind the:',
      options: [
        { id: 'seventh', text: 'Left seventh costal cartilage' },
        { id: 'fifth', text: 'Left fifth costal cartilage' },
        { id: 'ninth', text: 'Left ninth costal cartilage' },
        { id: 'xiphoid', text: 'Xiphoid process' },
      ],
      answerId: 'seventh',
      explanation: '2.5 cm from the sternum, at the level of T11.',
    },
    {
      id: 'st-pylorus',
      prompt: 'At operation the pylorus is recognised by the:',
      options: [
        { id: 'prepyloric', text: 'Prepyloric vein in front of it' },
        { id: 'angular-notch', text: 'Angular notch' },
        { id: 'cardiac-notch', text: 'Cardiac notch' },
        { id: 'short-gastric', text: 'Short gastric arteries' },
      ],
      answerId: 'prepyloric',
      explanation:
        'With the firm ring of the pyloric sphincter; the notches are on the curvatures, the short gastrics at the fundus.',
    },
    {
      id: 'st-greater-curvature',
      prompt: 'Which is not attached to the greater curvature?',
      options: [
        { id: 'lesser-omentum', text: 'Lesser omentum' },
        { id: 'greater-omentum', text: 'Greater omentum' },
        { id: 'gastrosplenic', text: 'Gastrosplenic ligament' },
        { id: 'gastrophrenic', text: 'Gastrophrenic ligament' },
      ],
      answerId: 'lesser-omentum',
      explanation: 'The lesser omentum hangs from the lesser curvature.',
    },
  ],
  cards: [
    {
      id: 'st-oesophagus',
      front: 'Abdominal oesophagus: length and levels?',
      back: 'About 1.25 cm. Through the diaphragm at T10, into the cardiac end at T11, 2.5 cm left of the midline.',
    },
    {
      id: 'st-parts',
      front: 'Parts of the stomach?',
      back: 'Cardiac part: fundus and body. Pyloric part: antrum (7.5 cm) and canal (2.5 cm). Divided by a line from the cardiac orifice to the angular notch.',
    },
    {
      id: 'st-pyloric-orifice',
      front: 'Where is the pyloric orifice?',
      back: '1.2 cm right of the midline at the lower border of L1, the transpyloric plane (empty stomach, lying down).',
    },
    {
      id: 'st-bed-card',
      front: 'Structures in the stomach bed?',
      back: 'Diaphragm, left kidney, left suprarenal, pancreas, transverse mesocolon, splenic flexure, splenic artery. The spleen too, but across the greater sac.',
    },
    {
      id: 'st-traube',
      front: 'Traube’s space?',
      back: 'Over the stomach between the left costal margin and the lower edge of the left lung: resonant normally, dull with an enlarged spleen or a left pleural effusion.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 19 Abdominal Part of Oesophagus and Stomach',
      pages: '291–295',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '307–309' },
  ],
};
