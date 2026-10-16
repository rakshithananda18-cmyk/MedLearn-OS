import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  PANCREAS_FRONT,
  PORTAL_BACK,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const pancreas: Topic = {
  slug: 'pancreas',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The pancreas',
  summary:
    'The pancreas across the posterior wall: its head, uncinate process, neck, body and tail with their relations, its two ducts, its blood from both foregut and midgut arteries, and how it develops from two buds.',
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
      'Volume 2, Chapter 23 Spleen, Pancreas and Liver: pancreas, pages 349 to 355',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: pancreas, pages 332 to 335'),
    {
      title: 'Z-Anatomy',
      detail: 'Pancreatic ducts in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Pancreas, duodenum, organs, vessels and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Partly exocrine (pancreatic juice) and partly endocrine (insulin and glucagon from the islets of Langerhans, most numerous in the tail). Retroperitoneal across the posterior wall at L1 and L2, J-shaped, 15 to 20 cm long, about 90 g, behind the stomach across the lesser sac.',
    'The head lies in the C of the duodenum; its uncinate process passes behind the superior mesenteric vessels and in front of the aorta. Behind the head: the IVC, the ends of the renal veins, the right crus and the bile duct, often buried in it.',
    'The neck lies in front of the start of the portal vein, with the pylorus in front of it. The body runs left over the aorta, the origin of the superior mesenteric artery, the left crus, left suprarenal, left kidney and renal vessels, with the splenic vein on its back; the transverse mesocolon is attached to its anterior border. The tail lies in the lienorenal ligament and reaches the spleen.',
    'The main duct (of Wirsung) runs from tail to head and joins the bile duct in the hepatopancreatic ampulla on the major papilla, 8 to 10 cm from the pylorus. The accessory duct (of Santorini) begins in the lower head, crosses the main duct and opens on the minor papilla, 6 to 8 cm from the pylorus. The two ducts recall its two buds.',
    'It is fed by the splenic artery’s pancreatic branches and the superior and inferior pancreaticoduodenal arteries: like the duodenum, it straddles foregut and midgut. Veins go to the splenic, superior mesenteric and portal veins; lymph to the pancreaticosplenic, coeliac and superior mesenteric nodes.',
  ],
  visual: {
    kind: 'path',
    // Left: its parts and their relations. Right: ducts, supply, islets and development.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'pancreas',
          label: 'Pancreas: L1 and L2',
          name: 'Pancreas, across L1 and L2',
          x: 180,
          y: 30,
        },
        {
          id: 'head',
          label: 'Head in the\nduodenal C',
          name: 'Head, in the curve of the duodenum',
          x: 85,
          y: 100,
        },
        {
          id: 'uncinate-process',
          label: 'Uncinate process',
          name: 'Uncinate process, behind the superior mesenteric vessels',
          x: 85,
          y: 160,
        },
        {
          id: 'bile-duct',
          label: 'Behind head:\nbile duct, IVC',
          name: 'Behind the head: bile duct, IVC, renal veins, right crus',
          x: 85,
          y: 220,
        },
        {
          id: 'portal-vein',
          label: 'Neck: over the\nportal vein',
          name: 'Neck, in front of the start of the portal vein',
          x: 85,
          y: 285,
        },
        {
          id: 'body',
          label: 'Body: over aorta,\nleft kidney',
          name: 'Body, over the aorta, left crus, left suprarenal and kidney, splenic vein',
          x: 85,
          y: 350,
        },
        {
          id: 'spleen',
          label: 'Tail: lienorenal,\nto the spleen',
          name: 'Tail, in the lienorenal ligament, reaching the spleen',
          x: 85,
          y: 415,
        },
        {
          id: 'pancreatic-ducts',
          label: 'Main duct to\nmajor papilla',
          name: 'Main pancreatic duct, joining the bile duct at the major papilla',
          x: 275,
          y: 100,
        },
        {
          id: 'accessory-duct',
          label: 'Accessory duct to\nminor papilla',
          name: 'Accessory pancreatic duct, to the minor papilla',
          x: 275,
          y: 165,
        },
        {
          id: 'splenic-artery',
          label: 'Splenic: pancreatic\nbranches',
          name: 'Pancreatic branches of the splenic artery',
          x: 275,
          y: 230,
        },
        {
          id: 'superior-pancreaticoduodenal-arteries',
          label: 'Pancreatico-\nduodenal arteries',
          name: 'Superior and inferior pancreaticoduodenal arteries',
          x: 275,
          y: 295,
        },
        {
          id: 'islets',
          label: 'Islets: most in\nthe tail',
          name: 'Islets of Langerhans, most numerous in the tail',
          x: 275,
          y: 355,
        },
        {
          id: 'development',
          label: 'Dorsal and ventral\nbuds',
          name: 'Development from dorsal and ventral pancreatic buds',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'pancreas', to: 'head' },
        { from: 'head', to: 'uncinate-process' },
        { from: 'uncinate-process', to: 'bile-duct' },
        { from: 'bile-duct', to: 'portal-vein' },
        { from: 'portal-vein', to: 'body' },
        { from: 'body', to: 'spleen' },
        { from: 'pancreas', to: 'pancreatic-ducts' },
        { from: 'pancreatic-ducts', to: 'accessory-duct' },
        { from: 'accessory-duct', to: 'splenic-artery' },
        { from: 'splenic-artery', to: 'superior-pancreaticoduodenal-arteries' },
        { from: 'superior-pancreaticoduodenal-arteries', to: 'islets' },
        { from: 'islets', to: 'development' },
      ],
    },
    lesions: [
      {
        id: 'head-cancer',
        label: 'Cancer of the head',
        nodeIds: ['head', 'bile-duct', 'portal-vein'],
        explanation:
          'Commonest in the head. Pressing on the bile duct behind, it causes steadily deepening jaundice, often with a distended gallbladder; pressing on the portal vein, ascites; spreading to the stomach, obstruction at the pylorus.',
      },
      {
        id: 'pancreatitis',
        label: 'Acute pancreatitis',
        nodeIds: ['pancreatic-ducts', 'body'],
        explanation:
          'Often set off by a gallstone at the ampulla. Pain is felt in the epigastrium and through to the back. Fluid can collect in the lesser sac as a pseudocyst, and the superior mesenteric vessels and splenic vein nearby can clot.',
      },
      {
        id: 'annular-pancreas',
        label: 'Annular pancreas',
        nodeIds: ['development', 'head'],
        explanation:
          'A ring of pancreatic tissue surrounds the second part of the duodenum and can obstruct it, a fault in how the ventral bud rotates to meet the dorsal one.',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'Parts and relations',
        hint: 'Head to tail, with what lies behind or in front of each.',
        nodeIds: ['head', 'uncinate-process', 'bile-duct', 'portal-vein', 'body', 'spleen'],
      },
      {
        id: 'ducts',
        title: 'Ducts, supply and origin',
        hint: 'The two ducts, two sources of blood, the islets, then the buds.',
        nodeIds: [
          'pancreatic-ducts',
          'accessory-duct',
          'splenic-artery',
          'superior-pancreaticoduodenal-arteries',
          'islets',
          'development',
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
          'gallbladder',
          'bile-duct',
          'duodenum',
          'pancreas',
          'pancreatic-ducts',
          'spleen',
          'kidneys',
          'suprarenal-glands',
          'abdominal-aorta',
          'inferior-vena-cava',
          'coeliac-trunk',
          'hepatic-artery',
          'gastroduodenal-artery',
          'splenic-artery',
          'superior-pancreaticoduodenal-arteries',
          'inferior-pancreaticoduodenal-artery',
          'superior-mesenteric-artery',
          'superior-mesenteric-vein',
          'splenic-vein',
          'portal-vein',
        ],
        ['pancreas'],
      ),
      traces: [],
      stops: [
        PANCREAS_FRONT,
        {
          ...PORTAL_BACK,
          title: 'From behind',
          description:
            'Behind the pancreas: the splenic vein along its body, the portal vein forming behind its neck, the bile duct in the back of its head, and the aorta and kidneys behind.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'overview',
      title: 'A gland in two parts',
      body: 'The pancreas makes pancreatic juice for digestion (its exocrine part) and hormones such as insulin and glucagon (its endocrine islets). It lies retroperitoneal across the posterior wall at L1 and L2, J-shaped, 15 to 20 cm long and about 90 g, behind the stomach with the lesser sac between. From right to left: head, neck, body and tail.',
      focus: ['pancreas'],
    },
    {
      id: 'head',
      title: 'The head and uncinate process',
      body: 'The head fills the C of the duodenum: the first part overlaps its upper border, the third runs along its lower border, the second along its right. In front of it lie the first part of the duodenum, the transverse colon and jejunum; behind it, the IVC, the ends of the renal veins, the right crus, and the bile duct running down in a groove or inside it. The uncinate process hooks left from its lower part, behind the superior mesenteric vessels and in front of the aorta.',
      focus: ['head', 'uncinate-process', 'bile-duct'],
    },
    {
      id: 'neck-body-tail',
      title: 'Neck, body and tail',
      body: 'The neck, a short narrowing, has the pylorus and lesser sac in front and the end of the superior mesenteric vein and the start of the portal vein behind. The body runs left and a little up; its anterior border carries the root of the transverse mesocolon, its upper border the coeliac trunk (over the tuber omentale), hepatic artery and splenic artery. Behind it lie the aorta with the superior mesenteric artery, the left crus, left suprarenal, left kidney and renal vessels, and the splenic vein. The tail runs in the lienorenal ligament to touch the spleen.',
      focus: ['portal-vein', 'body', 'spleen'],
    },
    {
      id: 'ducts',
      title: 'Its ducts',
      body: 'The main duct (of Wirsung), 3 mm wide and white, runs near the back of the gland from tail to head, taking side ducts in a herringbone pattern, and turns down in the head beside the bile duct. The two enter the wall of the second part of the duodenum and join as the hepatopancreatic ampulla on the major papilla. The accessory duct (of Santorini) drains the lower head, crosses in front of the main duct and opens on the minor papilla, above and in front of the major.',
      focus: ['pancreatic-ducts', 'accessory-duct'],
    },
    {
      id: 'supply',
      title: 'Vessels, nerves and buds',
      body: 'Its blood comes mainly from the pancreatic branches of the splenic artery (one large one is the arteria pancreatica magna), and from the superior (coeliac) and inferior (superior mesenteric) pancreaticoduodenal arteries, since it grows where foregut meets midgut. Veins drain to the splenic, superior mesenteric and portal veins; lymph to the pancreaticosplenic, coeliac and superior mesenteric nodes. The vagus drives secretion. A large dorsal bud forms the upper head, neck, body and tail; a small ventral bud swings round to form the uncinate process and lower head, and its duct becomes the main duct.',
      focus: ['splenic-artery', 'superior-pancreaticoduodenal-arteries', 'islets', 'development'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the front, follow it from the duodenal C to the spleen with the main duct inside; from behind, find the splenic and portal veins on its back. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'pa-uncinate',
      prompt: 'The uncinate process of the pancreas lies:',
      options: [
        { id: 'behind-sma', text: 'Behind the superior mesenteric vessels' },
        { id: 'front-sma', text: 'In front of the superior mesenteric vessels' },
        { id: 'behind-aorta', text: 'Behind the aorta' },
        { id: 'in-ligament', text: 'In the lienorenal ligament' },
      ],
      answerId: 'behind-sma',
      explanation: 'And in front of the aorta.',
    },
    {
      id: 'pa-neck',
      prompt: 'The portal vein begins behind the pancreas at its:',
      options: [
        { id: 'neck', text: 'Neck' },
        { id: 'head', text: 'Head' },
        { id: 'body', text: 'Body' },
        { id: 'tail', text: 'Tail' },
      ],
      answerId: 'neck',
      explanation: 'Where the superior mesenteric and splenic veins meet.',
    },
    {
      id: 'pa-islets',
      prompt: 'The islets of Langerhans are most numerous in the pancreatic:',
      options: [
        { id: 'tail', text: 'Tail' },
        { id: 'head', text: 'Head' },
        { id: 'neck', text: 'Neck' },
        { id: 'uncinate', text: 'Uncinate process' },
      ],
      answerId: 'tail',
      explanation: 'Which is why the tail is spared when the spleen is removed.',
    },
    {
      id: 'pa-ventral-bud',
      prompt: 'The ventral pancreatic bud forms the:',
      options: [
        { id: 'uncinate', text: 'Uncinate process and lower head' },
        { id: 'body-tail', text: 'Body and tail' },
        { id: 'neck', text: 'Neck' },
        { id: 'accessory-duct', text: 'Accessory duct' },
      ],
      answerId: 'uncinate',
      explanation: 'The dorsal bud forms the rest; the accessory duct is its old duct.',
    },
  ],
  cards: [
    {
      id: 'pa-parts',
      front: 'Parts of the pancreas?',
      back: 'Head (with the uncinate process), neck, body, tail; J-shaped, 15 to 20 cm, about 90 g, at L1 and L2.',
    },
    {
      id: 'pa-head-relations',
      front: 'Posterior relations of the head of the pancreas?',
      back: 'IVC, ends of the renal veins, right crus, bile duct (often embedded).',
    },
    {
      id: 'pa-body-relations',
      front: 'Posterior relations of the body of the pancreas?',
      back: 'Aorta with the superior mesenteric artery, left crus, left suprarenal, left kidney, left renal vessels, splenic vein.',
    },
    {
      id: 'pa-ducts',
      front: 'Pancreatic ducts and where they open?',
      back: 'Main (Wirsung): with the bile duct at the major papilla, 8 to 10 cm from the pylorus. Accessory (Santorini): minor papilla, 6 to 8 cm from the pylorus.',
    },
    {
      id: 'pa-supply',
      front: 'Arterial supply of the pancreas?',
      back: 'Pancreatic branches of the splenic (arteria pancreatica magna), superior and inferior pancreaticoduodenal arteries.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 23 Spleen, Pancreas and Liver',
      pages: '349–355',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '332–335' },
  ],
};
