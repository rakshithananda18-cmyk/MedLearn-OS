import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_WALL_MODEL_CREDIT,
  ABDOMINAL_WALL_MODEL_SRC,
  abdominalWallParts,
  INGUINAL_RIGHT,
  PELVIS_FRONT,
} from './abdominal-wall-3d';
import { bookSource } from './books';

// Abdomen batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const inguinalCanal: Topic = {
  slug: 'inguinal-canal',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Inguinal canal, spermatic cord and hernia',
  summary:
    'The oblique passage above the inguinal ligament: its rings and walls, what runs through it, the coverings the cord picks up, how the canal stays shut, and how direct, indirect and femoral hernias differ.',
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
      'Volume 2, Chapter 16 Anterior Abdominal Wall: inguinal canal, spermatic cord and hernia, pages 249 to 254',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: inguinal region, spermatic cord and inguinal hernias, pages 289 to 299',
    ),
    {
      title: 'Z-Anatomy',
      detail:
        'Muscles, inguinal ligament, fascia, nerves, testis and ductus deferens in the 3D view',
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
    'An oblique passage about 4 cm long, above the medial half of the inguinal ligament, running down, forwards and in from the deep inguinal ring (in fascia transversalis, 1.2 cm above the midinguinal point, lateral to the inferior epigastric artery) to the superficial ring (a triangular gap in the external oblique aponeurosis above the pubic crest).',
    'Front wall: external oblique aponeurosis, with internal oblique fibres in its lateral third. Back wall: fascia transversalis, with the conjoint tendon in its medial two thirds. Roof: the arching fibres of internal oblique and transversus. Floor: the grooved inguinal ligament, and the lacunar ligament medially.',
    'Through it run the spermatic cord (or the round ligament of the uterus) and the ilioinguinal nerve, which enters between the obliques and stays outside the cord.',
    'The cord holds three arteries (testicular, cremasteric, to the ductus), three nerves (genital branch of genitofemoral, sympathetic, ilioinguinal alongside) and three other things (ductus deferens, pampiniform plexus, remains of the processus vaginalis). Its coverings, inside out: internal spermatic fascia, cremasteric fascia, external spermatic fascia.',
    'An indirect hernia enters the deep ring lateral to the inferior epigastric artery, follows the canal and may reach the scrotum, through an open processus vaginalis. A direct hernia pushes through the back wall in Hesselbach’s triangle, medial to the artery. Both lie above and medial to the pubic tubercle; a femoral hernia lies below and lateral to it.',
  ],
  visual: {
    kind: 'path',
    // Left: the canal, its two rings and four walls. Right: what runs through, and its coverings.
    diagram: {
      width: 360,
      height: 480,
      nodes: [
        {
          id: 'inguinal-canal',
          label: 'Inguinal canal\n4 cm, oblique',
          name: 'Inguinal canal: about 4 cm, down, forwards and medially',
          x: 180,
          y: 30,
        },
        {
          id: 'deep-inguinal-ring',
          label: 'Deep ring: in\nfascia transversalis',
          name: 'Deep inguinal ring, in fascia transversalis, lateral to the inferior epigastric artery',
          x: 85,
          y: 100,
        },
        {
          id: 'canal-front-wall',
          label: 'Front: EO, plus\nIO laterally',
          name: 'Anterior wall: external oblique aponeurosis, with internal oblique in its lateral third',
          x: 85,
          y: 165,
        },
        {
          id: 'canal-back-wall',
          label: 'Back: fascia, plus\nconjoint medially',
          name: 'Posterior wall: fascia transversalis, with the conjoint tendon in its medial two thirds',
          x: 85,
          y: 230,
        },
        {
          id: 'canal-roof',
          label: 'Roof: arching\nIO and TA',
          name: 'Roof: arching fibres of internal oblique and transversus abdominis',
          x: 85,
          y: 295,
        },
        {
          id: 'inguinal-ligament',
          label: 'Floor: inguinal\nligament',
          name: 'Floor: grooved inguinal ligament, and the lacunar ligament medially',
          x: 85,
          y: 360,
        },
        {
          id: 'superficial-inguinal-ring',
          label: 'Superficial ring:\nin EO aponeurosis',
          name: 'Superficial inguinal ring, a triangular gap in the external oblique aponeurosis above the pubic crest',
          x: 85,
          y: 425,
        },
        {
          id: 'ductus-deferens',
          label: 'Ductus\ndeferens',
          name: 'Ductus deferens, in the back of the cord',
          x: 275,
          y: 100,
        },
        {
          id: 'testicular-artery',
          label: 'Testicular artery,\npampiniform plexus',
          name: 'Testicular artery and the pampiniform plexus of veins',
          x: 275,
          y: 165,
        },
        {
          id: 'genitofemoral-nerve',
          label: 'Genital branch of\ngenitofemoral',
          name: 'Genital branch of the genitofemoral nerve, to the cremaster',
          x: 275,
          y: 230,
        },
        {
          id: 'ilioinguinal-nerve',
          label: 'Ilioinguinal:\noutside the cord',
          name: 'Ilioinguinal nerve, through the canal outside the cord',
          x: 275,
          y: 295,
        },
        {
          id: 'cord-coverings',
          label: 'Coverings: internal,\ncremasteric, external',
          name: 'Coverings: internal spermatic fascia, cremasteric fascia, external spermatic fascia',
          x: 275,
          y: 360,
        },
        {
          id: 'canal-mechanisms',
          label: 'Kept shut:\nflap, shutter, valves',
          name: 'Flap valve, shutter of internal oblique, ball valve of cremaster, slit valve of external oblique',
          x: 275,
          y: 425,
        },
      ],
      edges: [
        { from: 'inguinal-canal', to: 'deep-inguinal-ring' },
        { from: 'deep-inguinal-ring', to: 'canal-front-wall' },
        { from: 'canal-front-wall', to: 'canal-back-wall' },
        { from: 'canal-back-wall', to: 'canal-roof' },
        { from: 'canal-roof', to: 'inguinal-ligament' },
        { from: 'inguinal-ligament', to: 'superficial-inguinal-ring' },
        { from: 'inguinal-canal', to: 'ductus-deferens' },
        { from: 'ductus-deferens', to: 'testicular-artery' },
        { from: 'testicular-artery', to: 'genitofemoral-nerve' },
        { from: 'inguinal-canal', to: 'ilioinguinal-nerve' },
        { from: 'genitofemoral-nerve', to: 'cord-coverings' },
        { from: 'canal-roof', to: 'canal-mechanisms' },
      ],
    },
    lesions: [
      {
        id: 'indirect-hernia',
        label: 'Indirect inguinal hernia',
        nodeIds: ['deep-inguinal-ring', 'canal-front-wall', 'superficial-inguinal-ring'],
        explanation:
          'A loop enters the deep ring, lateral to the inferior epigastric artery, inside a processus vaginalis that never closed, runs the length of the canal and may reach the scrotum. Its neck is narrow, so it obstructs easily; it is the hernia of boys and young men, and pressing over the deep ring holds it in.',
      },
      {
        id: 'direct-hernia',
        label: 'Direct inguinal hernia',
        nodeIds: ['canal-back-wall'],
        explanation:
          'It pushes straight forward through a weak back wall, in Hesselbach’s triangle (inferior epigastric artery, edge of rectus, inguinal ligament), medial to the artery. Wide-necked, seldom obstructing, in older men who strain (chronic cough, an enlarged prostate); it bulges on standing even with the deep ring held.',
      },
      {
        id: 'femoral-hernia',
        label: 'Femoral hernia',
        nodeIds: ['inguinal-ligament'],
        explanation:
          'Through the femoral ring, under the inguinal ligament beside the lacunar ligament, so its neck lies below and lateral to the pubic tubercle (an inguinal hernia’s lies above and medial). Commoner in women, with their wider pelvis, and never congenital; it needs surgery.',
      },
    ],
    drill: [
      {
        id: 'canal',
        title: 'Rings and walls',
        hint: 'Deep ring, four walls, superficial ring.',
        nodeIds: [
          'deep-inguinal-ring',
          'canal-front-wall',
          'canal-back-wall',
          'canal-roof',
          'inguinal-ligament',
          'superficial-inguinal-ring',
        ],
      },
      {
        id: 'cord',
        title: 'Through the canal',
        hint: 'The cord’s main contents, the nerve outside it, the coverings, the safeguards.',
        nodeIds: [
          'ductus-deferens',
          'testicular-artery',
          'genitofemoral-nerve',
          'ilioinguinal-nerve',
          'cord-coverings',
          'canal-mechanisms',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_WALL_MODEL_SRC,
      credit: ABDOMINAL_WALL_MODEL_CREDIT,
      parts: abdominalWallParts([
        'hip-bones',
        'femurs',
        'sacrum',
        'external-oblique',
        'internal-oblique',
        'transversus-abdominis',
        'rectus-abdominis',
        'inguinal-ligament',
        'transversalis-fascia',
        'ductus-deferens',
        'testis',
        'epididymis',
        'testicular-artery',
        'testicular-vein',
        'inferior-epigastric-artery',
        'inferior-epigastric-vein',
        'external-iliac-artery',
        'external-iliac-vein',
        'femoral-vessels',
        'iliohypogastric-nerve',
        'ilioinguinal-nerve',
        'genitofemoral-nerve',
      ]),
      traces: [],
      stops: [
        {
          ...INGUINAL_RIGHT,
          description:
            'The ductus deferens climbs from the testis through the canal above the medial half of the inguinal ligament, then turns into the pelvis round the inferior epigastric artery at the deep ring. Hide the obliques in Layers to see it.',
        },
        {
          ...PELVIS_FRONT,
          id: 'groin-front',
          title: 'Both groins from the front',
          description:
            'The inguinal ligaments from the anterior superior iliac spines to the pubic tubercles: an inguinal hernia appears above and medial to the tubercle, a femoral hernia below and lateral to it.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'canal',
      title: 'An oblique passage',
      body: 'About 4 cm long, above the medial half of the inguinal ligament, running down, forwards and in. It is the track the gubernaculum made, and the testis followed, through the wall. Larger in the male.',
      focus: ['inguinal-canal'],
    },
    {
      id: 'rings',
      title: 'Two rings',
      body: 'The deep ring is an oval opening in fascia transversalis, 1.2 cm above the midinguinal point, immediately lateral to the inferior epigastric artery. The superficial ring is a triangular gap in the external oblique aponeurosis just above the pubic crest, about 2.5 cm long and 1.2 cm wide at its base; its two crura are held together by intercrural fibres.',
      focus: ['deep-inguinal-ring', 'superficial-inguinal-ring'],
    },
    {
      id: 'walls',
      title: 'Four walls',
      body: 'Front: skin, superficial fascia and the external oblique aponeurosis throughout, with fleshy internal oblique in the lateral third. Back: fascia transversalis, extraperitoneal tissue and peritoneum throughout, with the conjoint tendon in the medial two thirds and the reflected part of the inguinal ligament at its end. Roof: the arching fibres of internal oblique and transversus. Floor: the grooved upper surface of the inguinal ligament, and the lacunar ligament medially.',
      focus: ['canal-front-wall', 'canal-back-wall', 'canal-roof', 'inguinal-ligament'],
    },
    {
      id: 'cord',
      title: 'The spermatic cord',
      body: 'Three arteries: testicular, cremasteric and the artery to the ductus. Three nerves: the genital branch of the genitofemoral, the sympathetic plexus, and the ilioinguinal running alongside, outside the cord. Three other things: the ductus deferens (felt as a firm cord in its back), the pampiniform plexus of veins, and the remains of the processus vaginalis; with the lymph vessels of the testis. In the female, the round ligament of the uterus takes its place.',
      focus: ['ductus-deferens', 'testicular-artery', 'genitofemoral-nerve', 'ilioinguinal-nerve'],
    },
    {
      id: 'coverings',
      title: 'Coverings picked up on the way',
      body: 'Each layer of the wall it passes lends the cord a coat: fascia transversalis at the deep ring gives the internal spermatic fascia; internal oblique and transversus give the cremasteric fascia with its muscle loops; the external oblique at the superficial ring gives the external spermatic fascia.',
      focus: ['cord-coverings'],
    },
    {
      id: 'mechanisms',
      title: 'How the canal stays shut',
      body: 'The rings do not face each other, so a rise in pressure presses the front and back walls together (flap valve). The superficial ring is guarded behind by the conjoint tendon and reflected ligament, the deep ring in front by internal oblique. Internal oblique, forming front, roof and back, lowers its arch onto the floor like a shutter. Cremaster pulls the cord up into the superficial ring (ball valve), and external oblique draws its crura together (slit valve).',
      focus: ['canal-mechanisms', 'canal-roof'],
    },
    {
      id: 'hernias',
      title: 'Indirect, direct and femoral',
      body: 'An indirect hernia follows the cord from the deep ring, lateral to the inferior epigastric artery, inside an unclosed processus vaginalis; its coverings are those of the cord. A direct hernia comes through the back wall in Hesselbach’s triangle, medial to the artery. Both lie above and medial to the pubic tubercle; a femoral hernia, below and lateral to it.',
      focus: ['deep-inguinal-ring', 'canal-back-wall'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the groin, hide the obliques and follow the ductus deferens from the testis to the deep ring; see the inferior epigastric artery beside the ring. Then turn on each hernia.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'ic-deep-ring',
      prompt: 'The deep inguinal ring is an opening in the:',
      options: [
        { id: 'fascia', text: 'Fascia transversalis' },
        { id: 'eo', text: 'External oblique aponeurosis' },
        { id: 'io', text: 'Internal oblique' },
        { id: 'conjoint', text: 'Conjoint tendon' },
      ],
      answerId: 'fascia',
      explanation: '1.2 cm above the midinguinal point, lateral to the inferior epigastric artery.',
    },
    {
      id: 'ic-triple',
      prompt:
        'Which muscle forms the front wall, the roof and the back wall of the inguinal canal?',
      options: [
        { id: 'io', text: 'Internal oblique' },
        { id: 'eo', text: 'External oblique' },
        { id: 'ta', text: 'Transversus abdominis' },
        { id: 'rectus', text: 'Rectus abdominis' },
      ],
      answerId: 'io',
      explanation:
        'Fleshy fibres in front laterally, arching fibres as the roof, and the conjoint tendon behind medially.',
    },
    {
      id: 'ic-ilioinguinal',
      prompt: 'The ilioinguinal nerve in the inguinal canal lies:',
      options: [
        { id: 'outside', text: 'Outside the spermatic cord' },
        { id: 'inside', text: 'Inside the internal spermatic fascia' },
        { id: 'cremasteric', text: 'Within the cremasteric fascia' },
        { id: 'not', text: 'It does not enter the canal' },
      ],
      answerId: 'outside',
      explanation:
        'It enters between the obliques, not through the deep ring, and leaves through the superficial ring.',
    },
    {
      id: 'ic-direct',
      prompt: 'A direct inguinal hernia passes:',
      options: [
        {
          id: 'hesselbach',
          text: 'Through Hesselbach’s triangle, medial to the inferior epigastric artery',
        },
        { id: 'deep-ring', text: 'Through the deep ring, lateral to the artery' },
        { id: 'femoral', text: 'Below the inguinal ligament' },
        { id: 'umbilicus', text: 'Through the umbilicus' },
      ],
      answerId: 'hesselbach',
      explanation: 'It pushes the weak back wall forward; it does not use the deep ring.',
    },
    {
      id: 'ic-femoral-site',
      prompt: 'The neck of a femoral hernia lies:',
      options: [
        { id: 'below-lateral', text: 'Below and lateral to the pubic tubercle' },
        { id: 'above-medial', text: 'Above and medial to the pubic tubercle' },
        { id: 'deep-ring', text: 'At the deep inguinal ring' },
        { id: 'scrotum', text: 'In the scrotum' },
      ],
      answerId: 'below-lateral',
      explanation: 'An inguinal hernia’s neck is above and medial to the tubercle.',
    },
  ],
  cards: [
    {
      id: 'ic-walls',
      front: 'Walls of the inguinal canal?',
      back: 'Front: EO aponeurosis (+ IO laterally). Back: fascia transversalis (+ conjoint tendon medially). Roof: arching IO and TA. Floor: inguinal ligament (+ lacunar ligament medially).',
    },
    {
      id: 'ic-cord-333',
      front: 'Contents of the spermatic cord, 3-3-3?',
      back: 'Arteries: testicular, cremasteric, to the ductus. Nerves: genital branch of genitofemoral, sympathetic, ilioinguinal (alongside). Others: ductus deferens, pampiniform plexus, processus vaginalis remnant.',
    },
    {
      id: 'ic-coverings',
      front: 'Coverings of the cord and where each comes from?',
      back: 'Internal spermatic fascia (fascia transversalis), cremasteric fascia (internal oblique and transversus), external spermatic fascia (external oblique).',
    },
    {
      id: 'ic-hesselbach',
      front: 'Boundaries of Hesselbach’s triangle?',
      back: 'Inferior epigastric artery (lateral), lateral border of rectus (medial), inguinal ligament (base).',
    },
    {
      id: 'ic-mechanisms',
      front: 'What keeps the inguinal canal shut?',
      back: 'Obliquity (flap valve), conjoint tendon and reflected ligament behind the superficial ring, internal oblique in front of the deep ring, its shutter action, cremaster (ball valve), external oblique crura (slit valve).',
    },
    {
      id: 'ic-indirect-direct',
      front: 'Indirect against direct inguinal hernia?',
      back: 'Indirect: preformed sac (processus vaginalis), through the deep ring lateral to the inferior epigastric artery, narrow neck, obstructs. Direct: weak back wall, Hesselbach’s triangle, medial to the artery, wide neck, older men.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 16 Anterior Abdominal Wall',
      pages: '249–254',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '289–299' },
  ],
};
