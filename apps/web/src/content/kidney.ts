import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  KIDNEYS_BACK,
  KIDNEYS_FRONT,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const kidney: Topic = {
  slug: 'kidney',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The kidney',
  summary:
    'Where the kidneys lie, their hilum and its order, what lies in front of and behind each, their four coverings, their inner structure, the five vascular segments, and why the twelfth rib matters at operation.',
  estimatedMinutes: 15,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 24 Kidney and Ureter: kidney, pages 365 to 374'),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: kidneys, pages 374 to 379'),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Kidneys, renal pelvis, renal vessels, psoas, diaphragm and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Retroperitoneal on the posterior wall, one each side of the spine, from the upper border of T12 to the middle of L3; the right a little lower, the left a little nearer the midline. Each is about 11 cm long, 6 cm broad, 3 cm thick and 150 g. The transpyloric plane crosses the upper hilum of the right kidney and the lower hilum of the left.',
    'At the hilum, from front to back: renal vein, renal artery, renal pelvis (VAU). The upper poles lie nearer the midline than the lower, which lie about 2.5 cm above the iliac crests.',
    'Behind both: the diaphragm, the medial and lateral arcuate ligaments, psoas major, quadratus lumborum, transversus abdominis, the subcostal vessels and the subcostal, iliohypogastric and ilioinguinal nerves; the twelfth rib behind the right kidney, the eleventh and twelfth behind the left.',
    'In front of the right: suprarenal, liver, second part of the duodenum, hepatic flexure, small intestine. In front of the left: suprarenal, spleen, stomach, pancreas, splenic vessels, splenic flexure and descending colon, jejunum. Coverings from inside out: fibrous capsule, perirenal fat, renal fascia, pararenal fat.',
    'Inside: cortex, a medulla of about ten pyramids whose papillae open into 7 to 13 minor calyces, 2 or 3 major calyces and the pelvis, all in the renal sinus. The renal artery’s anterior division supplies four segments (apical, upper, middle, lower), its posterior division one (posterior): end arteries. Lymph to the lateral aortic nodes at L2; nerves from the renal plexus, T10 to L1.',
  ],
  visual: {
    kind: 'path',
    // Left: position, hilum and inner structure. Right: relations, coverings and the renal angle.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'kidneys',
          label: 'Kidney: T12 to L3',
          name: 'Kidney, from T12 to L3',
          x: 180,
          y: 30,
        },
        {
          id: 'position',
          label: 'Right lower, left\nnearer midline',
          name: 'The right kidney lies a little lower, the left a little nearer the midline',
          x: 85,
          y: 100,
        },
        {
          id: 'hilum',
          label: 'Hilum: vein, artery,\npelvis',
          name: 'Hilum, from front to back: renal vein, renal artery, renal pelvis',
          x: 85,
          y: 165,
        },
        {
          id: 'renal-arteries',
          label: 'Five segmental\narteries',
          name: 'Renal artery: four segments from the anterior division, one from the posterior',
          x: 85,
          y: 230,
        },
        {
          id: 'renal-veins',
          label: 'Renal veins to IVC',
          name: 'Renal veins, to the inferior vena cava',
          x: 85,
          y: 290,
        },
        {
          id: 'ureters',
          label: 'Pelvis, major and\nminor calyces',
          name: 'Renal pelvis, major and minor calyces',
          x: 85,
          y: 350,
        },
        {
          id: 'cortex-medulla',
          label: 'Cortex, pyramids,\ncolumns',
          name: 'Cortex, medullary pyramids and renal columns',
          x: 85,
          y: 415,
        },
        {
          id: 'diaphragm',
          label: 'Behind: diaphragm,\nribs 11 and 12',
          name: 'Behind: diaphragm, arcuate ligaments, the twelfth rib (and eleventh on the left)',
          x: 275,
          y: 100,
        },
        {
          id: 'psoas-major',
          label: 'Psoas, quadratus\nlumborum',
          name: 'Behind: psoas major, quadratus lumborum, transversus abdominis, nerves',
          x: 275,
          y: 165,
        },
        {
          id: 'right-relations',
          label: 'Right in front:\nliver, duodenum',
          name: 'In front of the right kidney: suprarenal, liver, duodenum, hepatic flexure, small intestine',
          x: 275,
          y: 230,
        },
        {
          id: 'left-relations',
          label: 'Left in front:\nspleen, pancreas',
          name: 'In front of the left kidney: suprarenal, spleen, stomach, pancreas, splenic vessels, colon, jejunum',
          x: 275,
          y: 295,
        },
        {
          id: 'renal-fascia',
          label: 'Renal fascia and\nperirenal fat',
          name: 'Coverings: fibrous capsule, perirenal fat, renal fascia, pararenal fat',
          x: 275,
          y: 355,
        },
        {
          id: 'renal-angle',
          label: 'Renal angle',
          name: 'Renal angle, between the twelfth rib and erector spinae',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'kidneys', to: 'position' },
        { from: 'position', to: 'hilum' },
        { from: 'hilum', to: 'renal-arteries' },
        { from: 'renal-arteries', to: 'renal-veins' },
        { from: 'renal-veins', to: 'ureters' },
        { from: 'ureters', to: 'cortex-medulla' },
        { from: 'kidneys', to: 'diaphragm' },
        { from: 'diaphragm', to: 'psoas-major' },
        { from: 'psoas-major', to: 'right-relations' },
        { from: 'right-relations', to: 'left-relations' },
        { from: 'left-relations', to: 'renal-fascia' },
        { from: 'renal-fascia', to: 'renal-angle' },
      ],
    },
    lesions: [
      {
        id: 'pleura',
        label: 'Opening the pleura',
        nodeIds: ['diaphragm', 'renal-angle'],
        explanation:
          'Behind the kidney the pleura dips below the twelfth rib, between the rib and the diaphragm. Removing the rib to reach the kidney risks opening it, all the more if a short twelfth rib is missed and the eleventh taken for it.',
      },
      {
        id: 'perinephric',
        label: 'Blood or pus round the kidney',
        nodeIds: ['renal-fascia'],
        explanation:
          'Blood from a torn kidney or pus from a perinephric abscess first fills the renal fascia, then tracks down inside it towards the pelvis; it cannot cross to the other side, where the fascia is fixed in the midline.',
      },
      {
        id: 'segments',
        label: 'Segmental infarcts',
        nodeIds: ['renal-arteries'],
        explanation:
          'The five segmental arteries do not join one another, so a blocked one kills its own segment, and each segment can be removed on its own.',
      },
    ],
    drill: [
      {
        id: 'kidney',
        title: 'Position, hilum and inside',
        hint: 'How the two lie, the hilum front to back, its vessels, then inside.',
        nodeIds: [
          'position',
          'hilum',
          'renal-arteries',
          'renal-veins',
          'ureters',
          'cortex-medulla',
        ],
      },
      {
        id: 'relations',
        title: 'Relations and coverings',
        hint: 'Behind both, in front of each, then its coverings and the renal angle.',
        nodeIds: [
          'diaphragm',
          'psoas-major',
          'right-relations',
          'left-relations',
          'renal-fascia',
          'renal-angle',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [
          'lumbar-spine',
          'lower-ribs',
          'hip-bones',
          'diaphragm',
          'psoas-major',
          'kidneys',
          'ureters',
          'suprarenal-glands',
          'renal-arteries',
          'renal-veins',
          'abdominal-aorta',
          'inferior-vena-cava',
          'testicular-arteries',
          'testicular-veins',
        ],
        ['kidneys', 'diaphragm'],
      ),
      traces: [],
      stops: [KIDNEYS_FRONT, KIDNEYS_BACK],
    },
  },
  lesson: [
    {
      id: 'position',
      title: 'Where they lie',
      body: 'The kidneys lie behind the peritoneum on the posterior wall, one each side of the spine, from the upper border of T12 to the middle of L3. The right is a little lower (the liver above it), the left a little nearer the midline. Each is about 11 by 6 by 3 cm and 150 g; their long axes slope down and out, so the upper poles are nearer the midline. The transpyloric plane crosses the upper part of the right hilum and the lower part of the left.',
      focus: ['position'],
    },
    {
      id: 'hilum',
      title: 'Hilum and inside',
      body: 'On the medial border, the hilum leads into the renal sinus. From front to back: renal vein, renal artery, renal pelvis (often a branch of the artery passes behind the pelvis). That order tells you front from back, and the pelvis running down tells you top from bottom, so a loose kidney can be sided. Cut open, it shows a reddish cortex and a pale medulla of about ten pyramids. Each papilla opens into a minor calyx; 7 to 13 minor calyces join into 2 or 3 major calyces, which form the pelvis.',
      focus: ['hilum', 'ureters', 'cortex-medulla'],
    },
    {
      id: 'relations',
      title: 'What lies around them',
      body: 'Behind both: the diaphragm, the arcuate ligaments, psoas, quadratus lumborum and transversus abdominis, the subcostal vessels and the subcostal, iliohypogastric and ilioinguinal nerves; the twelfth rib behind the right, the eleventh and twelfth behind the left. In front of the right: its suprarenal, the liver, the second part of the duodenum, the hepatic flexure and small intestine. In front of the left: its suprarenal, the spleen, stomach, pancreas and splenic vessels, the splenic flexure and descending colon, and jejunum.',
      focus: ['diaphragm', 'psoas-major', 'right-relations', 'left-relations'],
    },
    {
      id: 'coverings',
      title: 'Coverings',
      body: 'From inside out: a thin fibrous capsule that strips off easily from a healthy kidney; perirenal fat, thickest at the borders; the renal fascia, now seen as one layered sheet joined to the fascia of psoas and quadratus lumborum behind, thin in front of the kidney, open above towards the bare area of the liver on the right, and running down along the ureter; and pararenal fat, a cushion behind. A floating kidney can move up and down inside the fascia but not across.',
      focus: ['renal-fascia'],
    },
    {
      id: 'vessels',
      title: 'Segments, lymph and nerves',
      body: 'The renal artery splits into an anterior division, supplying four segments (apical, upper, middle, lower), and a posterior division, supplying the posterior segment. These segmental arteries are end arteries. Lymph runs to the lateral aortic nodes at L2. The renal plexus, from the coeliac plexus, carries sympathetic fibres (T10 to L1), mostly to the vessels; pain fibres enter T10 to T12.',
      focus: ['renal-arteries', 'renal-veins'],
    },
    {
      id: 'surgery',
      title: 'At the bedside and in theatre',
      body: 'The renal angle, between the twelfth rib and the outer border of erector spinae, overlies the lower kidney: pressing it with the thumb shows kidney tenderness. To reach the kidney from behind, the surgeon goes through the posterior layer of thoracolumbar fascia with latissimus dorsi, erector spinae, the middle layer, quadratus lumborum and the anterior layer, minding the pleura below the twelfth rib. Kidneys are felt between two hands, the lower pole on deep breathing in.',
      focus: ['renal-angle'],
    },
  ],
  questions: [
    {
      id: 'kd-hilum',
      prompt: 'At the hilum of the kidney, from front to back, the order is:',
      options: [
        { id: 'vau', text: 'Renal vein, renal artery, renal pelvis' },
        { id: 'avu', text: 'Renal artery, renal vein, renal pelvis' },
        { id: 'uav', text: 'Renal pelvis, renal artery, renal vein' },
        { id: 'vua', text: 'Renal vein, renal pelvis, renal artery' },
      ],
      answerId: 'vau',
      explanation: 'VAU, with the pelvis behind.',
    },
    {
      id: 'kd-ribs',
      prompt: 'Behind the left kidney lie the:',
      options: [
        { id: 'eleven-twelve', text: 'Eleventh and twelfth ribs' },
        { id: 'twelve', text: 'Twelfth rib only' },
        { id: 'ten-eleven', text: 'Tenth and eleventh ribs' },
        { id: 'none', text: 'No ribs' },
      ],
      answerId: 'eleven-twelve',
      explanation: 'The right kidney, lower, has only the twelfth behind it.',
    },
    {
      id: 'kd-segments',
      prompt: 'The posterior division of the renal artery supplies:',
      options: [
        { id: 'one', text: 'One segment, the posterior' },
        { id: 'four', text: 'Four segments' },
        { id: 'two', text: 'The upper and lower poles' },
        { id: 'all', text: 'All five segments in part' },
      ],
      answerId: 'one',
      explanation: 'The anterior division supplies the apical, upper, middle and lower segments.',
    },
    {
      id: 'kd-right-front',
      prompt: 'Which is not in front of the right kidney?',
      options: [
        { id: 'spleen', text: 'Spleen' },
        { id: 'liver', text: 'Liver' },
        { id: 'duodenum', text: 'Second part of the duodenum' },
        { id: 'hepatic-flexure', text: 'Hepatic flexure' },
      ],
      answerId: 'spleen',
      explanation: 'The spleen lies in front of the left kidney.',
    },
  ],
  cards: [
    {
      id: 'kd-position',
      front: 'Position of the kidneys?',
      back: 'From the upper border of T12 to the middle of L3; right slightly lower, left nearer the midline. Transpyloric plane: upper right hilum, lower left hilum.',
    },
    {
      id: 'kd-posterior',
      front: 'Posterior relations of the kidneys?',
      back: 'Diaphragm, medial and lateral arcuate ligaments, psoas, quadratus lumborum, transversus abdominis, subcostal vessels, subcostal, iliohypogastric and ilioinguinal nerves; rib 12 (right), ribs 11 and 12 (left).',
    },
    {
      id: 'kd-coverings',
      front: 'Coverings of the kidney, inside out?',
      back: 'Fibrous capsule, perirenal fat, renal fascia, pararenal fat.',
    },
    {
      id: 'kd-structure',
      front: 'Inside the kidney?',
      back: 'Cortex, medulla of about 10 pyramids, papillae into 7 to 13 minor calyces, 2 or 3 major calyces, renal pelvis; all in the renal sinus.',
    },
    {
      id: 'kd-segments-card',
      front: 'Vascular segments of the kidney?',
      back: 'Apical, upper, middle and lower (anterior division); posterior (posterior division). End arteries.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 24 Kidney and Ureter',
      pages: '365–374',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '374–379' },
  ],
};
