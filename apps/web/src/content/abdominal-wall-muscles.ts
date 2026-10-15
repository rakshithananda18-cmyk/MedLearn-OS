import type { Topic } from '@medlearn/schemas';

import {
  ABDOMEN_FRONT,
  ABDOMINAL_WALL_MODEL_CREDIT,
  ABDOMINAL_WALL_MODEL_SRC,
  abdominalWallParts,
  INGUINAL_RIGHT,
  RECTUS_FRONT,
  WALL_MUSCLES,
} from './abdominal-wall-3d';
import { bookSource } from './books';

// Abdomen batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const abdominalWallMuscles: Topic = {
  slug: 'abdominal-wall-muscles',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Muscles of the anterior abdominal wall',
  summary:
    'The three flat muscles and the rectus, with pyramidalis and cremaster: where each runs, what it does, the inguinal ligament and its extensions, and where to cut the wall safely.',
  estimatedMinutes: 15,
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
      'Volume 2, Chapter 16 Anterior Abdominal Wall: muscles, inguinal ligament, conjoint tendon, cremaster, pages 239 to 244',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: anterolateral muscles, pages 278 to 282'),
    {
      title: 'Z-Anatomy',
      detail: 'Muscles, inguinal ligament and linea alba in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Three flat muscles, outside in: external oblique (from the lower eight ribs, fibres down and in, like hands in front pockets), internal oblique (fibres up and in, across them) and transversus abdominis (fibres across). Their aponeuroses meet in the linea alba and wrap the rectus.',
    'Rectus abdominis runs from the pubic crest and symphysis to the fifth to seventh costal cartilages, crossed by three tendinous intersections (at the xiphoid, the umbilicus and halfway between) that stick to the front of its sheath. Pyramidalis, often absent, lies in front of its lower end.',
    'All are supplied by the lower six thoracic nerves; the internal oblique and transversus also by L1. Cremaster, from the internal oblique, is supplied by the genital branch of the genitofemoral nerve (L1), the efferent side of the cremasteric reflex.',
    'The inguinal ligament is the rolled-under lower edge of the external oblique aponeurosis, from the anterior superior iliac spine to the pubic tubercle. From its medial end the lacunar ligament runs back to the pecten pubis and continues along it as the pectineal ligament (of Cooper).',
    'The lowest fibres of the internal oblique and transversus join as the conjoint tendon to the pubic crest and pecten, guarding the superficial inguinal ring from behind.',
  ],
  visual: {
    kind: 'path',
    // Left: the muscles, outside in, then the small ones. Right: the ligaments and tendons they make.
    diagram: {
      width: 360,
      height: 470,
      nodes: [
        {
          id: 'anterior-wall-muscles',
          label: 'Muscles of the\nanterior wall',
          name: 'Muscles of the anterolateral abdominal wall',
          x: 180,
          y: 30,
        },
        {
          id: 'external-oblique',
          label: 'External oblique:\ndown and in',
          name: 'External oblique: from the lower eight ribs, fibres downwards and medially',
          x: 85,
          y: 100,
        },
        {
          id: 'internal-oblique',
          label: 'Internal oblique:\nup and in',
          name: 'Internal oblique: fibres upwards and medially, across the external oblique',
          x: 85,
          y: 165,
        },
        {
          id: 'transversus-abdominis',
          label: 'Transversus:\nacross',
          name: 'Transversus abdominis: fibres horizontal',
          x: 85,
          y: 230,
        },
        {
          id: 'rectus-abdominis',
          label: 'Rectus abdominis:\nup the front',
          name: 'Rectus abdominis: from the pubis to the fifth to seventh costal cartilages',
          x: 85,
          y: 295,
        },
        {
          id: 'pyramidalis',
          label: 'Pyramidalis',
          name: 'Pyramidalis: pubis to linea alba, subcostal nerve',
          x: 85,
          y: 360,
        },
        {
          id: 'cremaster',
          label: 'Cremaster',
          name: 'Cremaster: loops of the internal oblique round the cord, genitofemoral nerve',
          x: 85,
          y: 420,
        },
        {
          id: 'inguinal-ligament',
          label: 'Inguinal\nligament',
          name: 'Inguinal ligament: rolled lower edge of the external oblique aponeurosis',
          x: 275,
          y: 100,
        },
        {
          id: 'lacunar-ligament',
          label: 'Lacunar\nligament',
          name: 'Lacunar ligament: back from the medial end of the inguinal ligament to the pecten pubis',
          x: 275,
          y: 165,
        },
        {
          id: 'pectineal-ligament',
          label: 'Pectineal\n(Cooper’s)',
          name: 'Pectineal ligament of Cooper, along the pecten pubis',
          x: 275,
          y: 230,
        },
        {
          id: 'conjoint-tendon',
          label: 'Conjoint\ntendon',
          name: 'Conjoint tendon: lowest fibres of internal oblique and transversus',
          x: 275,
          y: 295,
        },
        {
          id: 'linea-alba',
          label: 'Linea alba',
          name: 'Linea alba: the midline raphe of the aponeuroses',
          x: 275,
          y: 360,
        },
        {
          id: 'tendinous-intersections',
          label: 'Tendinous\nintersections',
          name: 'Three tendinous intersections of rectus',
          x: 275,
          y: 420,
        },
      ],
      edges: [
        { from: 'anterior-wall-muscles', to: 'external-oblique' },
        { from: 'external-oblique', to: 'internal-oblique' },
        { from: 'internal-oblique', to: 'transversus-abdominis' },
        { from: 'anterior-wall-muscles', to: 'rectus-abdominis' },
        { from: 'rectus-abdominis', to: 'pyramidalis' },
        { from: 'internal-oblique', to: 'cremaster' },
        { from: 'external-oblique', to: 'inguinal-ligament' },
        { from: 'inguinal-ligament', to: 'lacunar-ligament' },
        { from: 'lacunar-ligament', to: 'pectineal-ligament' },
        { from: 'internal-oblique', to: 'conjoint-tendon' },
        { from: 'transversus-abdominis', to: 'conjoint-tendon' },
        { from: 'transversus-abdominis', to: 'linea-alba' },
        { from: 'rectus-abdominis', to: 'tendinous-intersections' },
      ],
    },
    lesions: [
      {
        id: 'midline-incision',
        label: 'Median incision',
        nodeIds: ['linea-alba'],
        explanation:
          'A cut through the linea alba above the umbilicus bleeds little and spares muscles and nerves, but leaves a weak scar through which a ventral (incisional) hernia may push. Below the umbilicus the recti lie close, so the scar holds better.',
      },
      {
        id: 'cremasteric-reflex',
        label: 'Lost cremasteric reflex',
        nodeIds: ['cremaster'],
        explanation:
          'Stroking the upper inner thigh (ilioinguinal, L1) makes the cremaster lift the testis (genital branch of the genitofemoral, L1). The reflex is brisk in children and lost in upper motor neuron lesions above L1.',
      },
      {
        id: 'visceroptosis',
        label: 'Weak wall',
        nodeIds: ['internal-oblique', 'external-oblique'],
        explanation:
          'The tone of the oblique muscles, above all the internal oblique, holds the viscera up. With little exercise the tone falls and the wall bulges forward (visceroptosis); in multiparous women the recti may also part (divarication).',
      },
    ],
    drill: [
      {
        id: 'muscles',
        title: 'The muscles',
        hint: 'Three flat ones outside in, the strap, then the two small ones.',
        nodeIds: [
          'external-oblique',
          'internal-oblique',
          'transversus-abdominis',
          'rectus-abdominis',
          'pyramidalis',
          'cremaster',
        ],
      },
      {
        id: 'ligaments',
        title: 'What they make',
        hint: 'Inguinal ligament and its two extensions, the conjoint tendon, the midline and the intersections.',
        nodeIds: [
          'inguinal-ligament',
          'lacunar-ligament',
          'pectineal-ligament',
          'conjoint-tendon',
          'linea-alba',
          'tendinous-intersections',
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
        'sacrum',
        'fifth-lumbar-vertebra',
        ...WALL_MUSCLES,
        'inguinal-ligament',
        'linea-alba',
      ]),
      traces: [],
      stops: [
        {
          ...ABDOMEN_FRONT,
          description:
            'The external oblique outermost, its fibres running down and in to an aponeurosis that meets its fellow at the linea alba. Hide it in Layers, or pick each muscle, to see the internal oblique and transversus under it.',
        },
        RECTUS_FRONT,
        {
          ...INGUINAL_RIGHT,
          description:
            'The inguinal ligament from the anterior superior iliac spine to the pubic tubercle; the internal oblique and transversus arise from its lateral part and arch over the cord.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'plan',
      title: 'The plan of the wall',
      body: 'On each side of the midline are four large muscles: three flat ones in layers at the front and side, external oblique, internal oblique and transversus abdominis, and the vertical rectus abdominis in front. Each flat muscle ends medially in an aponeurosis; those of both sides cross in the midline as the linea alba and wrap the rectus as its sheath. Two small muscles, cremaster and pyramidalis, complete the list.',
      focus: ['anterior-wall-muscles', 'linea-alba'],
    },
    {
      id: 'external-oblique',
      title: 'External oblique',
      body: 'Eight fleshy slips from the lower eight ribs, interdigitating with serratus anterior above and latissimus dorsi below; fibres run down, forward and in. The lowest go to the anterior two thirds of the iliac crest; the rest end in an aponeurosis to the xiphoid, linea alba, pubic symphysis, crest and pecten. Between the spine and the pubic tubercle its free lower edge rolls under as the inguinal ligament, and above the pubic crest it opens at the superficial inguinal ring. Nerves: lower six thoracic.',
      focus: ['external-oblique', 'inguinal-ligament'],
    },
    {
      id: 'internal-oblique',
      title: 'Internal oblique',
      body: 'From the lateral two thirds of the inguinal ligament, the anterior two thirds of the iliac crest and the thoracolumbar fascia, its fibres run up and in, at right angles to the external oblique. The upper ones reach the lower three or four ribs; the rest form an aponeurosis that splits round the rectus above the arcuate line. Its lowest fibres join transversus as the conjoint tendon, and its loops round the cord make the cremaster. Nerves: T7 to T12 and L1.',
      focus: ['internal-oblique', 'conjoint-tendon', 'cremaster'],
    },
    {
      id: 'transversus',
      title: 'Transversus abdominis',
      body: 'From the lateral third of the inguinal ligament, the iliac crest, the thoracolumbar fascia and the inner surfaces of the lower six costal cartilages (interdigitating with the diaphragm), its fibres run across to the xiphoid, linea alba, pubic crest and pecten. The nerves and vessels of the wall run in the plane between it and the internal oblique. Nerves: T7 to T12 and L1.',
      focus: ['transversus-abdominis', 'conjoint-tendon'],
    },
    {
      id: 'rectus',
      title: 'Rectus abdominis and pyramidalis',
      body: 'Rectus arises by two heads from the pubic crest and the front of the symphysis and inserts into the fifth, sixth and seventh costal cartilages. Three tendinous intersections, at the xiphoid, the umbilicus and halfway between, cross its front half and bind it to the front of its sheath. Nerves: lower six or seven thoracic. Pyramidalis is a small triangle from the pubis to the linea alba, supplied by the subcostal nerve, and often absent.',
      focus: ['rectus-abdominis', 'tendinous-intersections', 'pyramidalis'],
    },
    {
      id: 'actions',
      title: 'What they do',
      body: 'Their tone, chiefly the internal oblique’s, holds the viscera up. Squeezing together they aid every expulsive act: passing urine and stool, childbirth, vomiting. The external oblique pulls down the lower ribs in forced expiration: coughing, sneezing, shouting. Rectus flexes the trunk; one side’s obliques bend it sideways; the external oblique with the opposite internal oblique turns it. Examine the abdomen with the hips and knees bent, to relax them.',
      focus: ['external-oblique', 'internal-oblique', 'rectus-abdominis'],
    },
    {
      id: 'ligaments',
      title: 'Inguinal ligament and its extensions',
      body: 'The inguinal ligament (Poupart’s) runs from the anterior superior iliac spine to the pubic tubercle, pulled into a downward curve by the fascia lata on its lower edge. Its grooved upper surface is the floor of the inguinal canal. The lacunar ligament runs back from its medial end to the pecten pubis, forming the medial edge of the femoral ring, and continues along the pecten as the pectineal ligament of Cooper. The reflected part runs up behind the superficial ring to the linea alba; intercrural fibres hold the ring’s crura together.',
      focus: ['inguinal-ligament', 'lacunar-ligament', 'pectineal-ligament'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'Peel the layers in Layers or by picking: external oblique, then internal oblique, then transversus, with rectus in front. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'awm-ligament',
      prompt: 'The inguinal ligament is formed by the:',
      options: [
        { id: 'eo', text: 'Lower border of the external oblique aponeurosis' },
        { id: 'io', text: 'Lowest fibres of the internal oblique' },
        { id: 'ta', text: 'Transversus abdominis aponeurosis' },
        { id: 'fascia', text: 'Fascia transversalis' },
      ],
      answerId: 'eo',
      explanation:
        'Its free lower edge folds back on itself between the spine and the pubic tubercle.',
    },
    {
      id: 'awm-conjoint',
      prompt: 'The conjoint tendon is formed by the:',
      options: [
        { id: 'io-ta', text: 'Internal oblique and transversus abdominis' },
        { id: 'eo-io', text: 'External and internal obliques' },
        { id: 'rectus', text: 'Rectus abdominis and pyramidalis' },
        { id: 'eo-ta', text: 'External oblique and transversus' },
      ],
      answerId: 'io-ta',
      explanation: 'Their lowest aponeurotic fibres reach the pubic crest and pecten together.',
    },
    {
      id: 'awm-cremaster-nerve',
      prompt: 'Cremaster is supplied by the:',
      options: [
        { id: 'genitofemoral', text: 'Genital branch of the genitofemoral nerve' },
        { id: 'ilioinguinal', text: 'Ilioinguinal nerve' },
        { id: 'iliohypogastric', text: 'Iliohypogastric nerve' },
        { id: 'subcostal', text: 'Subcostal nerve' },
      ],
      answerId: 'genitofemoral',
      explanation:
        'L1 through the genitofemoral nerve; the ilioinguinal carries the sensory side of the cremasteric reflex.',
    },
    {
      id: 'awm-intersections',
      prompt: 'The tendinous intersections of rectus abdominis are adherent to:',
      options: [
        { id: 'anterior', text: 'The anterior wall of the rectus sheath' },
        { id: 'posterior', text: 'The posterior wall of the rectus sheath' },
        { id: 'both', text: 'Both walls of the sheath' },
        { id: 'linea', text: 'Only the linea alba' },
      ],
      answerId: 'anterior',
      explanation:
        'They cross only the front half of the muscle; the posterior wall is free of it.',
    },
    {
      id: 'awm-expiration',
      prompt: 'Which muscle chiefly pulls down the lower ribs in a cough?',
      options: [
        { id: 'eo', text: 'External oblique' },
        { id: 'rectus', text: 'Rectus abdominis' },
        { id: 'pyramidalis', text: 'Pyramidalis' },
        { id: 'cremaster', text: 'Cremaster' },
      ],
      answerId: 'eo',
      explanation: 'It depresses and compresses the lower thorax in forced expiration.',
    },
  ],
  cards: [
    {
      id: 'awm-eo',
      front: 'External oblique: origin, direction, nerve?',
      back: 'Eight slips from the lower eight ribs; fibres down, forward and in; lower six thoracic nerves.',
    },
    {
      id: 'awm-io',
      front: 'Internal oblique: origin and what it forms?',
      back: 'Lateral two thirds of the inguinal ligament, iliac crest, thoracolumbar fascia; forms the cremaster, the conjoint tendon (with transversus) and splits round rectus above the arcuate line.',
    },
    {
      id: 'awm-ta',
      front: 'Transversus abdominis: origin and the plane it makes?',
      back: 'Lateral third of the inguinal ligament, iliac crest, thoracolumbar fascia, inner surfaces of the lower six costal cartilages; the neurovascular plane lies between it and the internal oblique.',
    },
    {
      id: 'awm-rectus',
      front: 'Rectus abdominis: attachments and intersections?',
      back: 'Pubic crest and symphysis to the fifth to seventh costal cartilages; three intersections, at the xiphoid, the umbilicus and halfway between.',
    },
    {
      id: 'awm-lacunar',
      front: 'Lacunar and pectineal ligaments?',
      back: 'Lacunar: from the medial end of the inguinal ligament back to the pecten pubis (medial edge of the femoral ring). Pectineal (Cooper’s): its continuation along the pecten.',
    },
    {
      id: 'awm-reflex',
      front: 'Cremasteric reflex: afferent, efferent, segment?',
      back: 'Afferent: ilioinguinal (skin of the upper inner thigh). Efferent: genital branch of the genitofemoral. Segment L1.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 16 Anterior Abdominal Wall',
      pages: '239–244',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '278–282' },
  ],
};
