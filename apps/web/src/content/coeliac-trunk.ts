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
export const coeliacTrunk: Topic = {
  slug: 'coeliac-trunk',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The coeliac trunk',
  summary:
    'The artery of the foregut: where it arises and what surrounds it, then its three branches, the left gastric, common hepatic and splenic, and everything they give off.',
  estimatedMinutes: 13,
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
      'Volume 2, Chapter 21 Large Blood Vessels of the Gut: coeliac trunk and its branches, pages 323 to 325',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: celiac trunk, pages 343 to 347'),
    {
      title: 'Z-Anatomy',
      detail: 'Liver in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Coeliac trunk and its branches, organs and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The artery of the foregut. It leaves the front of the aorta just below the aortic opening of the diaphragm, at the disc between T12 and L1, and after only about 1.25 cm divides into the left gastric, common hepatic and splenic arteries.',
    'It supplies the lower oesophagus, the stomach, the duodenum down to the opening of the bile duct, the liver and gallbladder, the spleen and most of the pancreas.',
    'Around it lies the coeliac plexus; in front, the lesser sac and lesser omentum; on the right, the right crus, right coeliac ganglion and caudate process; on the left, the left crus, left coeliac ganglion and cardiac end of the stomach; below, the body of the pancreas and the splenic vein.',
    'Left gastric: the smallest, up and left to the cardiac end, oesophageal branches, then down the lesser curvature. Common hepatic: right to the duodenum, giving the gastroduodenal (right gastroepiploic, superior pancreaticoduodenal), then up as the proper hepatic in the lesser omentum, giving the right gastric and dividing at the porta hepatis; the right hepatic gives the cystic artery.',
    'Splenic: the largest, winding left along the upper border of the pancreas behind the lesser sac, over the left suprarenal and kidney into the lienorenal ligament, dividing into five to seven branches at the hilum; it gives pancreatic branches (the arteria pancreatica magna among them), five to seven short gastrics and the left gastroepiploic.',
  ],
  visual: {
    kind: 'path',
    // A tree: the left gastric and common hepatic on the left, the hepatic's other branches and the
    // splenic on the right.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'coeliac-trunk',
          label: 'Coeliac trunk\nat T12 and L1',
          name: 'Coeliac trunk, from the aorta at the T12 and L1 disc',
          x: 180,
          y: 30,
        },
        {
          id: 'left-gastric-artery',
          label: 'Left gastric:\nsmallest',
          name: 'Left gastric artery, the smallest branch',
          x: 85,
          y: 100,
        },
        {
          id: 'oesophageal-branches',
          label: 'Oesophageal\nbranches',
          name: 'Oesophageal branches of the left gastric artery',
          x: 85,
          y: 165,
        },
        {
          id: 'hepatic-artery',
          label: 'Common hepatic',
          name: 'Common hepatic artery, continuing as the proper hepatic',
          x: 85,
          y: 225,
        },
        {
          id: 'gastroduodenal-artery',
          label: 'Gastroduodenal',
          name: 'Gastroduodenal artery, behind the first part of the duodenum',
          x: 85,
          y: 285,
        },
        {
          id: 'right-gastroepiploic-artery',
          label: 'Right\ngastroepiploic',
          name: 'Right gastroepiploic artery',
          x: 85,
          y: 345,
        },
        {
          id: 'superior-pancreaticoduodenal-arteries',
          label: 'Superior pancreatico-\nduodenal',
          name: 'Superior pancreaticoduodenal arteries, anterior and posterior',
          x: 85,
          y: 410,
        },
        {
          id: 'right-gastric-artery',
          label: 'Right gastric',
          name: 'Right gastric artery, from the proper hepatic',
          x: 275,
          y: 100,
        },
        {
          id: 'cystic-artery',
          label: 'Cystic, from the\nright hepatic',
          name: 'Cystic artery, from the right hepatic artery',
          x: 275,
          y: 165,
        },
        {
          id: 'splenic-artery',
          label: 'Splenic: largest',
          name: 'Splenic artery, the largest branch',
          x: 275,
          y: 225,
        },
        {
          id: 'pancreatic-branches',
          label: 'Pancreatic\nbranches',
          name: 'Pancreatic branches, including the arteria pancreatica magna',
          x: 275,
          y: 285,
        },
        {
          id: 'short-gastric',
          label: 'Short gastric\narteries',
          name: 'Five to seven short gastric arteries',
          x: 275,
          y: 345,
        },
        {
          id: 'left-gastroepiploic-artery',
          label: 'Left\ngastroepiploic',
          name: 'Left gastroepiploic artery',
          x: 275,
          y: 410,
        },
      ],
      edges: [
        { from: 'coeliac-trunk', to: 'left-gastric-artery' },
        { from: 'left-gastric-artery', to: 'oesophageal-branches' },
        { from: 'coeliac-trunk', to: 'hepatic-artery' },
        { from: 'hepatic-artery', to: 'gastroduodenal-artery' },
        { from: 'gastroduodenal-artery', to: 'right-gastroepiploic-artery' },
        { from: 'gastroduodenal-artery', to: 'superior-pancreaticoduodenal-arteries' },
        { from: 'hepatic-artery', to: 'right-gastric-artery' },
        { from: 'hepatic-artery', to: 'cystic-artery' },
        { from: 'coeliac-trunk', to: 'splenic-artery' },
        { from: 'splenic-artery', to: 'pancreatic-branches' },
        { from: 'splenic-artery', to: 'short-gastric' },
        { from: 'splenic-artery', to: 'left-gastroepiploic-artery' },
      ],
    },
    lesions: [
      {
        id: 'bleeding-duodenal-ulcer',
        label: 'Bleeding duodenal ulcer',
        nodeIds: ['gastroduodenal-artery', 'hepatic-artery'],
        explanation:
          'An ulcer on the back wall of the first part of the duodenum can eat into the gastroduodenal artery lying behind it. The bleeding is brisk: blood is vomited or passed as black stools.',
      },
      {
        id: 'bleeding-gastric-ulcer',
        label: 'Bleeding gastric ulcer',
        nodeIds: ['left-gastric-artery', 'splenic-artery'],
        explanation:
          'A lesser curvature ulcer can erode the left gastric artery; one on the back wall, deep through the lesser sac, the splenic artery running along the pancreas in the stomach bed.',
      },
    ],
    drill: [
      {
        id: 'hepatic',
        title: 'Left gastric and hepatic',
        hint: 'The smallest branch first, then the common hepatic and its gastroduodenal branch.',
        nodeIds: [
          'left-gastric-artery',
          'oesophageal-branches',
          'hepatic-artery',
          'gastroduodenal-artery',
          'right-gastroepiploic-artery',
          'superior-pancreaticoduodenal-arteries',
        ],
      },
      {
        id: 'splenic',
        title: 'The rest',
        hint: 'Two more from the hepatic, then the splenic and its branches.',
        nodeIds: [
          'right-gastric-artery',
          'cystic-artery',
          'splenic-artery',
          'pancreatic-branches',
          'short-gastric',
          'left-gastroepiploic-artery',
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
          'kidneys',
          'suprarenal-glands',
          'abdominal-aorta',
          'inferior-vena-cava',
          'coeliac-trunk',
          ...COELIAC_BRANCHES,
          'splenic-artery',
          'superior-mesenteric-artery',
        ],
        ['liver', 'stomach'],
      ),
      traces: [],
      stops: [
        COELIAC_VIEW,
        {
          ...STOMACH_FRONT,
          title: 'Round the stomach',
          description:
            'Its branches ring the stomach: the gastric arteries along the lesser curvature, the gastroepiploic arteries along the greater, the short gastrics to the fundus.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'trunk',
      title: 'The trunk',
      body: 'The first ventral branch of the abdominal aorta and the artery of the foregut: it supplies the lower oesophagus, the stomach, the duodenum down to the bile duct opening, the liver and gallbladder, the spleen and most of the pancreas. It arises just below the aortic opening of the diaphragm, at the disc between T12 and L1, and after only about 1.25 cm splits into three.',
      focus: ['coeliac-trunk'],
    },
    {
      id: 'relations',
      title: 'What surrounds it',
      body: 'The coeliac plexus wraps it. In front lie the lesser sac and lesser omentum; on the right, the right crus, right coeliac ganglion and caudate process of the liver; on the left, the left crus, left coeliac ganglion and cardiac end of the stomach; below, the body of the pancreas and the splenic vein.',
      focus: ['coeliac-trunk'],
    },
    {
      id: 'left-gastric',
      title: 'The left gastric artery',
      body: 'The smallest branch. It runs up and left behind the lesser sac to the cardiac end of the stomach, gives two or three oesophageal branches through the hiatus, then turns forward into the lesser omentum and down the lesser curvature, giving gastric branches, to join the right gastric.',
      focus: ['left-gastric-artery', 'oesophageal-branches'],
    },
    {
      id: 'hepatic',
      title: 'The hepatic artery',
      body: 'The common hepatic runs down, forward and right behind the lesser sac to the top of the first part of the duodenum. There it gives the gastroduodenal, which passes behind the duodenum and divides into the right gastroepiploic and the superior pancreaticoduodenal arteries. Beyond that it is the proper hepatic, rising in the free margin of the lesser omentum, left of the bile duct and in front of the portal vein; it gives the right gastric and divides at the porta hepatis into right and left hepatic arteries. The right hepatic gives the cystic artery, which passes behind the hepatic and cystic ducts to the neck of the gallbladder.',
      focus: [
        'hepatic-artery',
        'gastroduodenal-artery',
        'right-gastroepiploic-artery',
        'superior-pancreaticoduodenal-arteries',
        'right-gastric-artery',
        'cystic-artery',
      ],
    },
    {
      id: 'splenic',
      title: 'The splenic artery',
      body: 'The largest branch, winding left along the upper border of the pancreas behind the lesser sac, across the left suprarenal and the top of the left kidney, into the lienorenal ligament to the hilum of the spleen, where it splits into five to seven branches. On the way it feeds the body and tail of the pancreas (one large branch is the arteria pancreatica magna), and from its end come five to seven short gastrics to the fundus and the left gastroepiploic along the greater curvature.',
      focus: [
        'splenic-artery',
        'pancreatic-branches',
        'short-gastric',
        'left-gastroepiploic-artery',
      ],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From below and in front, find the short trunk on the aorta and follow its three branches; then from the front, trace them round both curvatures of the stomach. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'ct-level',
      prompt: 'The coeliac trunk arises at the level of the:',
      options: [
        { id: 't12-l1', text: 'Disc between T12 and L1' },
        { id: 'l1', text: 'Body of L1' },
        { id: 'l3', text: 'Body of L3' },
        { id: 't10', text: 'Body of T10' },
      ],
      answerId: 't12-l1',
      explanation: 'Just below the aortic opening; the superior mesenteric follows 1 cm lower.',
    },
    {
      id: 'ct-not-branch',
      prompt: 'Which is not a direct branch of the coeliac trunk?',
      options: [
        { id: 'gastroduodenal', text: 'Gastroduodenal artery' },
        { id: 'left-gastric', text: 'Left gastric artery' },
        { id: 'splenic', text: 'Splenic artery' },
        { id: 'common-hepatic', text: 'Common hepatic artery' },
      ],
      answerId: 'gastroduodenal',
      explanation: 'It comes from the common hepatic artery.',
    },
    {
      id: 'ct-cystic',
      prompt: 'The cystic artery usually arises from the:',
      options: [
        { id: 'right-hepatic', text: 'Right hepatic artery' },
        { id: 'left-hepatic', text: 'Left hepatic artery' },
        { id: 'gastroduodenal', text: 'Gastroduodenal artery' },
        { id: 'coeliac', text: 'Coeliac trunk' },
      ],
      answerId: 'right-hepatic',
      explanation: 'It passes behind the common hepatic and cystic ducts to the gallbladder.',
    },
    {
      id: 'ct-largest',
      prompt: 'The largest branch of the coeliac trunk is the:',
      options: [
        { id: 'splenic', text: 'Splenic artery' },
        { id: 'common-hepatic', text: 'Common hepatic artery' },
        { id: 'left-gastric', text: 'Left gastric artery' },
        { id: 'right-gastric', text: 'Right gastric artery' },
      ],
      answerId: 'splenic',
      explanation: 'The left gastric is the smallest; the right gastric is not a direct branch.',
    },
  ],
  cards: [
    {
      id: 'ct-origin',
      front: 'Coeliac trunk: origin, length, branches?',
      back: 'Front of the aorta at the T12 and L1 disc; about 1.25 cm; left gastric, common hepatic, splenic.',
    },
    {
      id: 'ct-territory',
      front: 'What does the coeliac trunk supply?',
      back: 'The foregut: lower oesophagus, stomach, duodenum to the bile duct opening, liver and gallbladder, spleen, most of the pancreas.',
    },
    {
      id: 'ct-relations',
      front: 'Relations of the coeliac trunk?',
      back: 'Coeliac plexus around; lesser sac and omentum in front; right crus, ganglion, caudate process on the right; left crus, ganglion, cardiac end on the left; pancreas and splenic vein below.',
    },
    {
      id: 'ct-hepatic',
      front: 'Branches of the hepatic artery?',
      back: 'Gastroduodenal (right gastroepiploic, superior pancreaticoduodenal), right gastric, right and left hepatic; the right hepatic gives the cystic.',
    },
    {
      id: 'ct-splenic',
      front: 'Branches of the splenic artery?',
      back: 'Pancreatic (arteria pancreatica magna, caudae pancreatis), five to seven short gastrics, left gastroepiploic, and five to seven terminal splenic branches.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 21 Large Blood Vessels of the Gut',
      pages: '323–325',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '343–347' },
  ],
};
