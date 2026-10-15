import type { Topic } from '@medlearn/schemas';

import {
  ABDOMEN_FRONT,
  ABDOMINAL_WALL_MODEL_CREDIT,
  ABDOMINAL_WALL_MODEL_SRC,
  abdominalWallParts,
  INGUINAL_RIGHT,
  RECTUS_FRONT,
  WALL_NERVES,
} from './abdominal-wall-3d';
import { bookSource } from './books';

// Abdomen batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const abdominalWallSuperficial: Topic = {
  slug: 'abdominal-wall-superficial',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Abdominal wall: superficial fascia, umbilicus, nerves and vessels',
  summary:
    'The skin and two-layered fascia of the front of the abdomen, the umbilicus as a watershed and a portosystemic junction, and the nerves, vessels and lymphatics that run in the fascia.',
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
      'Volume 2, Chapter 16 Anterior Abdominal Wall: skin, superficial fascia, umbilicus, cutaneous nerves, vessels and lymphatics, pages 234 to 239',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: superficial fascia, innervation, arterial supply and lymphatic drainage of the wall, pages 276 to 277 and 285 to 288',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Muscles and nerves of the wall in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones and vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Below the umbilicus the superficial fascia has a fatty outer layer (Camper’s) and a membranous inner layer (Scarpa’s). The membranous layer continues into the perineum as Colles’ fascia and is fixed to the fascia lata of the thigh just below the inguinal ligament, so urine from a ruptured urethra spreads up the abdominal wall but not into the thigh.',
    'The umbilicus lies at the disc between L3 and L4 and its skin is supplied by T10. It is a watershed: above it, blood and lymph flow upwards (lymph to the axillary nodes); below it, downwards (to the superficial inguinal nodes).',
    'At the umbilicus portal tributaries meet systemic veins; in portal hypertension they swell into veins radiating from it, the caput medusae. In caval obstruction the thoracoepigastric vein links the superficial epigastric and lateral thoracic veins, and blood crosses the watershed.',
    'The skin is supplied by T7 to T12 and L1 in bands: T7 near the xiphoid, T10 at the umbilicus, L1 (the iliohypogastric and ilioinguinal nerves) above the pubis and in the groin.',
    'Below the umbilicus the skin is fed by three superficial branches of the femoral artery: superficial epigastric, superficial circumflex iliac and superficial external pudendal.',
  ],
  visual: {
    kind: 'path',
    // Left: the layers and the nerves. Right: the vessels and lymph, either side of the watershed.
    diagram: {
      width: 360,
      height: 480,
      nodes: [
        {
          id: 'superficial-layers',
          label: 'Skin and\nsuperficial fascia',
          name: 'Skin and superficial fascia of the anterior abdominal wall',
          x: 180,
          y: 30,
        },
        {
          id: 'camper-fascia',
          label: 'Fatty layer\n(Camper)',
          name: 'Fatty layer of superficial fascia (Camper’s fascia)',
          x: 80,
          y: 100,
        },
        {
          id: 'scarpa-fascia',
          label: 'Membranous\nlayer (Scarpa)',
          name: 'Membranous layer of superficial fascia (Scarpa’s fascia), continuous with Colles’ fascia',
          x: 80,
          y: 165,
        },
        {
          id: 'umbilicus',
          label: 'Umbilicus: T10,\na watershed',
          name: 'Umbilicus: skin from T10, the watershed for blood and lymph',
          x: 80,
          y: 230,
        },
        {
          id: 'thoracoabdominal-nerves',
          label: 'T7 to T11\nin bands',
          name: 'Lower intercostal nerves T7 to T11, and the subcostal nerve T12',
          x: 80,
          y: 295,
        },
        {
          id: 'iliohypogastric-nerve',
          label: 'Iliohypogastric:\nabove the pubis',
          name: 'Iliohypogastric nerve (L1): skin above the pubis',
          x: 80,
          y: 360,
        },
        {
          id: 'ilioinguinal-nerve',
          label: 'Ilioinguinal:\ngroin, genitalia',
          name: 'Ilioinguinal nerve (L1): skin of the groin and external genitalia',
          x: 80,
          y: 425,
        },
        {
          id: 'superficial-epigastric-artery',
          label: 'Superficial\nepigastric artery',
          name: 'Superficial epigastric artery, from the femoral artery, up to the umbilicus',
          x: 275,
          y: 100,
        },
        {
          id: 'superficial-epigastric-vein',
          label: 'Superficial\nepigastric vein',
          name: 'Superficial epigastric vein, to the great saphenous vein',
          x: 275,
          y: 165,
        },
        {
          id: 'thoracoepigastric-vein',
          label: 'Thoracoepigastric\nvein',
          name: 'Thoracoepigastric vein, linking the superficial epigastric and lateral thoracic veins',
          x: 275,
          y: 230,
        },
        {
          id: 'paraumbilical-veins',
          label: 'Paraumbilical\nveins (portal)',
          name: 'Paraumbilical veins, portal tributaries meeting systemic veins at the umbilicus',
          x: 275,
          y: 295,
        },
        {
          id: 'lymph-above',
          label: 'Above: axillary\nnodes',
          name: 'Lymph above the umbilicus: to the axillary nodes',
          x: 275,
          y: 360,
        },
        {
          id: 'lymph-below',
          label: 'Below: superficial\ninguinal nodes',
          name: 'Lymph below the umbilicus: to the superficial inguinal nodes',
          x: 275,
          y: 425,
        },
      ],
      edges: [
        { from: 'superficial-layers', to: 'camper-fascia' },
        { from: 'camper-fascia', to: 'scarpa-fascia' },
        { from: 'superficial-layers', to: 'umbilicus' },
        { from: 'superficial-layers', to: 'thoracoabdominal-nerves' },
        { from: 'thoracoabdominal-nerves', to: 'iliohypogastric-nerve' },
        { from: 'iliohypogastric-nerve', to: 'ilioinguinal-nerve' },
        { from: 'superficial-layers', to: 'superficial-epigastric-artery' },
        { from: 'superficial-epigastric-artery', to: 'superficial-epigastric-vein' },
        { from: 'superficial-epigastric-vein', to: 'thoracoepigastric-vein' },
        { from: 'umbilicus', to: 'paraumbilical-veins' },
        { from: 'umbilicus', to: 'lymph-above' },
        { from: 'umbilicus', to: 'lymph-below' },
      ],
    },
    lesions: [
      {
        id: 'caput-medusae',
        label: 'Caput medusae',
        nodeIds: ['paraumbilical-veins', 'umbilicus', 'superficial-epigastric-vein'],
        explanation:
          'In portal hypertension the paraumbilical veins carry portal blood to the veins of the wall, which swell into a spray round the umbilicus. Blood still flows up above the umbilicus and down below it: the watershed holds.',
      },
      {
        id: 'caval-obstruction',
        label: 'Caval obstruction',
        nodeIds: ['thoracoepigastric-vein', 'superficial-epigastric-vein'],
        explanation:
          'The thoracoepigastric vein opens up between the superficial epigastric vein (to the great saphenous) and the lateral thoracic vein (to the axillary). In superior caval block blood flows down it; in inferior caval block, up it: either way it crosses the watershed.',
      },
      {
        id: 'ruptured-urethra',
        label: 'Ruptured urethra',
        nodeIds: ['scarpa-fascia'],
        explanation:
          'Urine leaking from a ruptured spongy urethra fills the superficial perineal pouch, the scrotum and penis, and rises up the front of the abdomen deep to the membranous layer. Its attachments to the fascia lata and the perineal membrane stop it entering the thigh or the ischiorectal fossa.',
      },
      {
        id: 'umbilical-anomalies',
        label: 'Fistula at the umbilicus',
        nodeIds: ['umbilicus'],
        explanation:
          'The umbilicus is where the gut (vitellointestinal duct), the bladder (urachus) and the umbilical vessels once met. A patent vitellointestinal duct discharges faeces there, a patent urachus urine; a remnant can form a red umbilical tumour.',
      },
    ],
    drill: [
      {
        id: 'layers-nerves',
        title: 'Layers and nerves',
        hint: 'Two layers, the umbilicus, then the nerves from above down.',
        nodeIds: [
          'camper-fascia',
          'scarpa-fascia',
          'umbilicus',
          'thoracoabdominal-nerves',
          'iliohypogastric-nerve',
          'ilioinguinal-nerve',
        ],
      },
      {
        id: 'vessels-lymph',
        title: 'Vessels and lymph',
        hint: 'Artery, vein, the two links that open in disease, then lymph either side.',
        nodeIds: [
          'superficial-epigastric-artery',
          'superficial-epigastric-vein',
          'thoracoepigastric-vein',
          'paraumbilical-veins',
          'lymph-above',
          'lymph-below',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_WALL_MODEL_SRC,
      credit: ABDOMINAL_WALL_MODEL_CREDIT,
      parts: abdominalWallParts([
        'lower-ribs',
        'costal-cartilages',
        'sternum',
        'hip-bones',
        'femurs',
        'external-oblique',
        'rectus-abdominis',
        'linea-alba',
        'inguinal-ligament',
        ...WALL_NERVES,
        'superficial-epigastric-artery',
        'superficial-epigastric-vein',
        'femoral-vessels',
      ]),
      traces: [],
      stops: [
        {
          ...ABDOMEN_FRONT,
          description:
            'The nerves of the wall fan out in bands from above down; the superficial epigastric vessels climb from the groin towards the umbilicus.',
        },
        RECTUS_FRONT,
        {
          ...INGUINAL_RIGHT,
          description:
            'The superficial epigastric artery leaving the femoral artery below the inguinal ligament; the iliohypogastric and ilioinguinal nerves above it.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'skin',
      title: 'Skin',
      body: 'The skin of the front of the abdomen stretches enormously, in pregnancy, obesity, ascites or a large tumour. Overstretched, it leaves whitish streaks low down, the lineae albicantes.',
      focus: ['superficial-layers'],
    },
    {
      id: 'fascia',
      title: 'Two layers of fascia',
      body: 'Below the umbilicus the superficial fascia splits into a fatty layer (Camper’s), continuous with the fat elsewhere, and a membranous layer (Scarpa’s) deep to it, with the nerves and vessels between. The membranous layer is fixed just below the inguinal ligament (Holden’s line), to the pubis, the pubic arch and the back of the perineal membrane, and continues into the perineum as Colles’ fascia; in the midline it forms the suspensory and fundiform ligaments of the penis or clitoris.',
      focus: ['camper-fascia', 'scarpa-fascia'],
    },
    {
      id: 'umbilicus',
      title: 'The umbilicus',
      body: 'The scar of the umbilical cord, at the disc between L3 and L4, supplied by T10. It is a watershed for blood and lymph, a junction of portal and systemic veins, and in the embryo the meeting place of the gut (vitellointestinal duct), the bladder (urachus) and the umbilical vessels: two arteries and one vein at birth.',
      focus: ['umbilicus', 'paraumbilical-veins'],
    },
    {
      id: 'nerves',
      title: 'Cutaneous nerves',
      body: 'Seven anterior cutaneous nerves, from the lower five intercostals, the subcostal and the iliohypogastric, emerge near the midline in order: T7 near the xiphoid, T10 at the umbilicus, the iliohypogastric 2.5 cm above the superficial inguinal ring. Lateral cutaneous branches (T10, T11) supply the side; the ilioinguinal leaves through the superficial ring for the genitalia and upper medial thigh.',
      focus: ['thoracoabdominal-nerves', 'iliohypogastric-nerve', 'ilioinguinal-nerve'],
    },
    {
      id: 'vessels',
      title: 'Vessels',
      body: 'Above, the skin is fed by branches of the superior and inferior epigastric arteries with the nerves; below the umbilicus by three superficial branches of the femoral artery: superficial epigastric (up towards the umbilicus), superficial circumflex iliac (out along the inguinal ligament) and superficial external pudendal (to the genitalia). The veins follow them to the great saphenous vein.',
      focus: ['superficial-epigastric-artery', 'superficial-epigastric-vein'],
    },
    {
      id: 'lymph',
      title: 'Lymph respects the watershed',
      body: 'Superficial lymph above the umbilicus drains up to the axillary nodes; below it, down to the superficial inguinal nodes. So a skin cancer below the umbilicus spreads to the groin.',
      focus: ['lymph-above', 'lymph-below', 'umbilicus'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'Follow the bands of nerves from the costal margin to the groin, and the superficial epigastric vessels up from the femoral. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'aws-t10',
      prompt: 'The skin round the umbilicus is supplied by:',
      options: [
        { id: 't10', text: 'T10' },
        { id: 't7', text: 'T7' },
        { id: 't12', text: 'T12' },
        { id: 'l1', text: 'L1' },
      ],
      answerId: 't10',
      explanation: 'T7 is near the xiphoid, L1 above the pubis.',
    },
    {
      id: 'aws-lymph',
      prompt: 'Lymph from the skin below the umbilicus drains to the:',
      options: [
        { id: 'superficial-inguinal', text: 'Superficial inguinal nodes' },
        { id: 'axillary', text: 'Axillary nodes' },
        { id: 'para-aortic', text: 'Para-aortic nodes' },
        { id: 'deep-inguinal', text: 'Deep inguinal nodes only' },
      ],
      answerId: 'superficial-inguinal',
      explanation: 'Above the umbilicus it goes to the axillary nodes.',
    },
    {
      id: 'aws-caput',
      prompt: 'Caput medusae is a sign of:',
      options: [
        { id: 'portal', text: 'Portal hypertension' },
        { id: 'svc', text: 'Superior vena caval obstruction only' },
        { id: 'heart', text: 'Right heart failure' },
        { id: 'saphenous', text: 'Varicose great saphenous vein' },
      ],
      answerId: 'portal',
      explanation:
        'Portal blood reaches the wall through the paraumbilical veins; the flow still respects the umbilical watershed.',
    },
    {
      id: 'aws-urine',
      prompt: 'Urine from a ruptured spongy urethra cannot pass into the thigh because the:',
      options: [
        {
          id: 'membranous',
          text: 'Membranous layer of superficial fascia is fixed to the fascia lata',
        },
        { id: 'fatty', text: 'Fatty layer is fixed to the inguinal ligament' },
        { id: 'deep-fascia', text: 'Deep fascia of the abdomen is fixed to the pubis' },
        { id: 'peritoneum', text: 'Peritoneum blocks the way' },
      ],
      answerId: 'membranous',
      explanation:
        'Scarpa’s fascia is fixed just below the inguinal ligament and to the back of the perineal membrane.',
    },
  ],
  cards: [
    {
      id: 'aws-layers',
      front: 'Two layers of superficial fascia below the umbilicus?',
      back: 'Fatty (Camper’s) and membranous (Scarpa’s); the membranous continues as Colles’ fascia of the perineum.',
    },
    {
      id: 'aws-watershed',
      front: 'Why is the umbilicus called a watershed?',
      back: 'Blood and lymph above it flow upwards (lymph to axillary nodes); below it, downwards (to superficial inguinal nodes).',
    },
    {
      id: 'aws-three-systems',
      front: 'Three systems that meet at the umbilicus in the embryo?',
      back: 'Digestive (vitellointestinal duct), excretory (urachus) and vascular (umbilical vessels).',
    },
    {
      id: 'aws-femoral-branches',
      front: 'Superficial branches of the femoral artery to the lower abdominal wall?',
      back: 'Superficial epigastric, superficial circumflex iliac and superficial external pudendal.',
    },
    {
      id: 'aws-thoracoepigastric',
      front: 'The thoracoepigastric vein links which veins, and when does it open up?',
      back: 'The superficial epigastric (to the great saphenous) and the lateral thoracic (to the axillary); in superior or inferior caval obstruction.',
    },
    {
      id: 'aws-nerve-bands',
      front: 'Cutaneous nerves at the xiphoid, umbilicus and above the pubis?',
      back: 'T7, T10 and L1 (iliohypogastric).',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 16 Anterior Abdominal Wall',
      pages: '234–239',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '276–277, 285–288' },
  ],
};
