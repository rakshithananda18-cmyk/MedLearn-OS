import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  KIDNEYS_BACK,
  SUPRARENALS_FRONT,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 5 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const suprarenalGland: Topic = {
  slug: 'suprarenal-gland',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The suprarenal gland',
  summary:
    'Where the suprarenals lie, how the right and left differ in shape and relations, their cortex and medulla, three arteries but one vein, and the chromaffin tissue elsewhere.',
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
      'Volume 2, Chapter 25 Suprarenal Gland and Chromaffin System, pages 382 to 386',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: suprarenal glands, pages 386 to 387'),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Suprarenals, kidneys, their vessels and the aortic lymph nodes in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Endocrine glands behind the peritoneum on the upper poles of the kidneys, in front of the crura of the diaphragm, opposite the eleventh intercostal space and twelfth rib. Each is about 50 by 30 by 10 mm and 5 g: a third of the kidney’s size at birth, a thirtieth in the adult.',
    'The right is pyramidal, its apex against the bare area of the liver; in front, the IVC and bare area; behind, the right crus and kidney. The left is a crescent along the kidney’s medial border down to its hilum; in front, the cardiac end of the stomach and the pancreas with the splenic artery; behind, the left crus and kidney.',
    'Cortex, nine-tenths of the gland, from the mesoderm of the coelomic epithelium, in three zones: glomerulosa (mineralocorticoids), fasciculata (glucocorticoids), reticularis (sex hormones). Medulla, one-tenth, from the neural crest: chromaffin cells making adrenaline and noradrenaline, with a few ganglion cells.',
    'Three arteries to each gland: superior suprarenal from the inferior phrenic, middle from the aorta, inferior from the renal artery. One vein from each hilum: the right, very short, straight into the IVC; the left down into the left renal vein. Lymph to the lateral aortic nodes.',
    'The medulla gets preganglionic sympathetic fibres that end on the chromaffin cells, which count as postganglionic neurons (Gray’s gives T8 to L1). Chromaffin tissue also forms paraganglia beside the sympathetic ganglia and the para-aortic bodies beside the inferior mesenteric artery, largest in early childhood and gone by about 14.',
  ],
  visual: {
    kind: 'path',
    // Left: position, the two glands and their inside. Right: coverings, supply and nerves.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'suprarenal-glands',
          label: 'Suprarenal glands',
          name: 'Suprarenal glands',
          x: 180,
          y: 30,
        },
        {
          id: 'position',
          label: 'Upper pole, in\nfront of crus',
          name: 'On the upper pole of the kidney, in front of the crus of the diaphragm',
          x: 85,
          y: 100,
        },
        {
          id: 'right-gland',
          label: 'Right: pyramid,\nbehind IVC',
          name: 'Right gland: pyramidal, behind the IVC and the bare area of the liver',
          x: 85,
          y: 165,
        },
        {
          id: 'left-gland',
          label: 'Left: crescent,\nto renal hilum',
          name: 'Left gland: a crescent down the kidney’s medial border to its hilum',
          x: 85,
          y: 230,
        },
        {
          id: 'cortex',
          label: 'Cortex: three\nzones',
          name: 'Cortex: zona glomerulosa, fasciculata and reticularis',
          x: 85,
          y: 295,
        },
        {
          id: 'medulla',
          label: 'Medulla:\nchromaffin cells',
          name: 'Medulla: chromaffin cells, making adrenaline and noradrenaline',
          x: 85,
          y: 355,
        },
        {
          id: 'chromaffin',
          label: 'Other chromaffin\ntissue',
          name: 'Other chromaffin tissue: paraganglia and the para-aortic bodies',
          x: 85,
          y: 415,
        },
        {
          id: 'renal-fascia',
          label: 'In renal fascia,\nown septum',
          name: 'Inside the renal fascia, a septum between it and the kidney',
          x: 275,
          y: 100,
        },
        {
          id: 'inferior-phrenic-arteries',
          label: 'Superior: from\ninferior phrenic',
          name: 'Superior suprarenal arteries, from the inferior phrenic artery',
          x: 275,
          y: 165,
        },
        {
          id: 'suprarenal-arteries',
          label: 'Middle: aorta;\ninferior: renal',
          name: 'Middle suprarenal from the aorta, inferior suprarenal from the renal artery',
          x: 275,
          y: 230,
        },
        {
          id: 'suprarenal-veins',
          label: 'One vein each\nside',
          name: 'One vein each: the right to the IVC, the left to the left renal vein',
          x: 275,
          y: 295,
        },
        {
          id: 'aortic-lymph-nodes',
          label: 'Lymph: lateral\naortic nodes',
          name: 'Lymph to the lateral aortic nodes',
          x: 275,
          y: 355,
        },
        {
          id: 'nerves',
          label: 'Preganglionic\nsympathetic',
          name: 'Preganglionic sympathetic fibres, ending on the chromaffin cells',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'suprarenal-glands', to: 'position' },
        { from: 'position', to: 'right-gland' },
        { from: 'right-gland', to: 'left-gland' },
        { from: 'left-gland', to: 'cortex' },
        { from: 'cortex', to: 'medulla' },
        { from: 'medulla', to: 'chromaffin' },
        { from: 'suprarenal-glands', to: 'renal-fascia' },
        { from: 'renal-fascia', to: 'inferior-phrenic-arteries' },
        { from: 'inferior-phrenic-arteries', to: 'suprarenal-arteries' },
        { from: 'suprarenal-arteries', to: 'suprarenal-veins' },
        { from: 'suprarenal-veins', to: 'aortic-lymph-nodes' },
        { from: 'aortic-lymph-nodes', to: 'nerves' },
      ],
    },
    lesions: [
      {
        id: 'addison',
        label: 'Addison’s disease',
        nodeIds: ['cortex'],
        explanation:
          'When the cortex is destroyed, by tuberculosis or atrophy, too little of its hormones is made: muscle weakness, low blood pressure, anaemia and dark pigmented skin, ending in circulatory and renal failure.',
      },
      {
        id: 'cushing',
        label: 'Too much cortical hormone',
        nodeIds: ['cortex'],
        explanation:
          'An overactive cortex making glucocorticoids gives Cushing’s syndrome: obesity, hirsutism, diabetes and hypogonadism. Excess sex hormones masculinise women, feminise men, and in children give the adrenogenital syndrome.',
      },
      {
        id: 'phaeochromocytoma',
        label: 'Phaeochromocytoma',
        nodeIds: ['medulla', 'suprarenal-veins'],
        explanation:
          'A tumour of the medulla releases bursts of adrenaline and noradrenaline: attacks of high blood pressure with palpitation, headache, sweating and pallor. It is confirmed by blood and urine tests and CT; at operation the right vein is short, going straight into the IVC.',
      },
    ],
    drill: [
      {
        id: 'glands',
        title: 'Position and structure',
        hint: 'Where they lie, the right and the left, then cortex, medulla and other chromaffin tissue.',
        nodeIds: ['position', 'right-gland', 'left-gland', 'cortex', 'medulla', 'chromaffin'],
      },
      {
        id: 'supply',
        title: 'Coverings, vessels and nerves',
        hint: 'Its fascia, three arteries, one vein, lymph, then nerves.',
        nodeIds: [
          'renal-fascia',
          'inferior-phrenic-arteries',
          'suprarenal-arteries',
          'suprarenal-veins',
          'aortic-lymph-nodes',
          'nerves',
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
          'diaphragm',
          'kidneys',
          'suprarenal-glands',
          'inferior-phrenic-arteries',
          'suprarenal-arteries',
          'suprarenal-veins',
          'renal-arteries',
          'renal-veins',
          'abdominal-aorta',
          'coeliac-trunk',
          'superior-mesenteric-artery',
          'inferior-vena-cava',
          'aortic-lymph-nodes',
        ],
        ['kidneys', 'diaphragm'],
      ),
      traces: [],
      stops: [SUPRARENALS_FRONT, KIDNEYS_BACK],
    },
  },
  lesson: [
    {
      id: 'position',
      title: 'Where they lie',
      body: 'The suprarenal (adrenal) glands sit behind the peritoneum on the upper poles of the kidneys, in front of the crura of the diaphragm, at the level of the eleventh intercostal space and twelfth rib near the spine. Each is about 5 cm tall, 3 cm broad and 1 cm thick and weighs about 5 g. At birth a gland is a third the size of the kidney; in the adult, a thirtieth. Each lies in fat inside the renal fascia, with a septum between it and the kidney.',
      focus: ['position', 'renal-fascia'],
    },
    {
      id: 'right-left',
      title: 'Right and left',
      body: 'The right gland is a pyramid: its apex reaches the bare area of the liver, its base sits on the kidney. In front lie the IVC and the bare area; behind, the right crus and the kidney; its vein leaves from a hilum on the front. The left gland is a crescent along the medial border of the kidney down to its hilum, where its vein leaves. In front lie the cardiac end of the stomach and the pancreas with the splenic artery; behind, the left crus and the kidney.',
      focus: ['right-gland', 'left-gland'],
    },
    {
      id: 'inside',
      title: 'Cortex and medulla',
      body: 'Cut across, a gland shows a thick yellowish cortex and a thin medulla, about a tenth of it. They differ in origin and work. The cortex, from the mesoderm lining the coelom, has three zones: the outer glomerulosa makes mineralocorticoids that keep salt and water, the middle fasciculata glucocorticoids, the inner reticularis sex hormones. The medulla comes from neural crest cells, like the sympathetic ganglia: its chromaffin cells make adrenaline and noradrenaline.',
      focus: ['cortex', 'medulla'],
    },
    {
      id: 'vessels',
      title: 'Three arteries, one vein',
      body: 'Each gland has three arteries: the superior suprarenal arteries from the inferior phrenic, the middle suprarenal from the aorta at the level of the superior mesenteric artery, the inferior suprarenal from the renal artery. Blood leaves by a single vein. The right is very short and opens straight into the back of the IVC; the left runs down to the left renal vein. Lymph goes to the lateral aortic nodes.',
      focus: ['inferior-phrenic-arteries', 'suprarenal-arteries', 'suprarenal-veins'],
    },
    {
      id: 'nerves',
      title: 'Nerves and the chromaffin system',
      body: 'Preganglionic sympathetic fibres reach the medulla through the splanchnic nerves and coeliac plexus without relaying, and end on the chromaffin cells, which act as postganglionic neurons pouring their transmitter into the blood. Chromaffin cells, which stain with chromic salts, are also found as paraganglia by the sympathetic ganglia, as the para-aortic bodies beside the origin of the inferior mesenteric artery (largest in the first years, gone by about 14), and in the autonomic plexuses.',
      focus: ['nerves', 'chromaffin'],
    },
    {
      id: 'clinic',
      title: 'In the clinic',
      body: 'Too little cortex gives Addison’s disease: weakness, low blood pressure and pigmented skin. Too much gives Cushing’s syndrome, or virilism, feminisation or the adrenogenital syndrome from sex hormones. A tumour of the medulla, phaeochromocytoma, gives attacks of high blood pressure with headache, palpitation and sweating. CT shows the glands. Small islands of cortex sometimes lie nearby, in the spermatic cord, epididymis or broad ligament.',
      focus: ['cortex', 'medulla'],
    },
  ],
  questions: [
    {
      id: 'sr-right-vein',
      prompt: 'The right suprarenal vein drains into the:',
      options: [
        { id: 'ivc', text: 'Inferior vena cava' },
        { id: 'right-renal', text: 'Right renal vein' },
        { id: 'left-renal', text: 'Left renal vein' },
        { id: 'lumbar', text: 'A lumbar vein' },
      ],
      answerId: 'ivc',
      explanation: 'Short and direct; the left suprarenal vein goes to the left renal vein.',
    },
    {
      id: 'sr-not-artery',
      prompt: 'The suprarenal gland does not get blood from the:',
      options: [
        { id: 'sma', text: 'Superior mesenteric artery' },
        { id: 'phrenic', text: 'Inferior phrenic artery' },
        { id: 'aorta', text: 'Abdominal aorta' },
        { id: 'renal', text: 'Renal artery' },
      ],
      answerId: 'sma',
      explanation:
        'Superior from the inferior phrenic, middle from the aorta, inferior from the renal.',
    },
    {
      id: 'sr-glomerulosa',
      prompt: 'The zona glomerulosa makes:',
      options: [
        { id: 'mineralo', text: 'Mineralocorticoids' },
        { id: 'gluco', text: 'Glucocorticoids' },
        { id: 'sex', text: 'Sex hormones' },
        { id: 'catechol', text: 'Adrenaline and noradrenaline' },
      ],
      answerId: 'mineralo',
      explanation: 'Fasciculata glucocorticoids, reticularis sex hormones, medulla catecholamines.',
    },
    {
      id: 'sr-medulla-origin',
      prompt: 'The suprarenal medulla develops from:',
      options: [
        { id: 'crest', text: 'Neural crest cells' },
        { id: 'coelomic', text: 'Coelomic epithelium' },
        { id: 'endoderm', text: 'Endoderm of the gut' },
        { id: 'intermediate', text: 'Intermediate mesoderm' },
      ],
      answerId: 'crest',
      explanation: 'The cortex comes from the mesoderm of the coelomic epithelium.',
    },
  ],
  cards: [
    {
      id: 'sr-shapes',
      front: 'Shapes of the two suprarenals?',
      back: 'Right pyramidal (apex to the bare area of the liver); left semilunar, down to the renal hilum.',
    },
    {
      id: 'sr-relations',
      front: 'In front of each suprarenal?',
      back: 'Right: IVC and bare area of the liver. Left: cardiac end of the stomach, pancreas and splenic artery.',
    },
    {
      id: 'sr-arteries',
      front: 'Arteries of the suprarenal gland?',
      back: 'Superior (inferior phrenic), middle (aorta), inferior (renal).',
    },
    {
      id: 'sr-zones',
      front: 'Zones of the suprarenal cortex and their hormones?',
      back: 'Glomerulosa: mineralocorticoids. Fasciculata: glucocorticoids. Reticularis: sex hormones.',
    },
    {
      id: 'sr-chromaffin',
      front: 'Parts of the chromaffin system?',
      back: 'Suprarenal medulla, paraganglia, para-aortic bodies, small masses in the autonomic plexuses (the coccygeal body is not truly chromaffin).',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 25 Suprarenal Gland and Chromaffin System',
      pages: '382–386',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '386–387' },
  ],
};
