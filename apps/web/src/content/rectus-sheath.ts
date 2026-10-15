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
export const rectusSheath: Topic = {
  slug: 'rectus-sheath',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Rectus sheath, deep vessels and fascia transversalis',
  summary:
    'How the three flat aponeuroses build the sheath of rectus differently above the costal margin, down to the arcuate line and below it, what runs inside, and the fascia that lines the wall.',
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
      'Volume 2, Chapter 16 Anterior Abdominal Wall: deep nerves and arteries, rectus sheath, fascia transversalis, pages 244 to 248',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: rectus sheath, transversalis fascia, innervation and arterial supply, pages 283 to 287',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Muscles, linea alba, fascia transversalis and nerves in the 3D view',
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
    'Above the costal margin the sheath has only a front wall, the external oblique aponeurosis; rectus lies on the fifth to seventh costal cartilages.',
    'From the costal margin to the arcuate line, the internal oblique aponeurosis splits: its front lamina joins the external oblique in front of rectus, its back lamina joins transversus behind it.',
    'Below the arcuate line, midway between the umbilicus and the pubic symphysis, all three aponeuroses pass in front; behind rectus is only fascia transversalis. The front wall is complete and bound to the tendinous intersections; the back wall is incomplete and free.',
    'Inside: rectus, pyramidalis, the superior epigastric artery (from the internal thoracic) meeting the inferior epigastric (from the external iliac, entering in front of the arcuate line), their veins, and the terminal parts of the lower six thoracic nerves.',
    'Fascia transversalis lines transversus; the deep inguinal ring is an opening in it 1.2 cm above the midinguinal point, lateral to the inferior epigastric artery. The main arteries lie inside this layer of fascia, the main nerves outside it.',
  ],
  visual: {
    kind: 'path',
    // Left: the three levels of the sheath. Right: what runs inside, and the fascia behind.
    diagram: {
      width: 360,
      height: 460,
      nodes: [
        { id: 'rectus-sheath', label: 'Rectus sheath', name: 'Rectus sheath', x: 180, y: 30 },
        {
          id: 'sheath-above-margin',
          label: 'Above costal margin:\nexternal oblique only',
          name: 'Above the costal margin: front wall the external oblique aponeurosis; no back wall',
          x: 90,
          y: 105,
        },
        {
          id: 'sheath-middle',
          label: 'To arcuate line:\nIO splits round',
          name: 'Costal margin to arcuate line: internal oblique aponeurosis splits round rectus',
          x: 90,
          y: 175,
        },
        {
          id: 'arcuate-line',
          label: 'Arcuate line',
          name: 'Arcuate line: lower free edge of the back wall, midway from umbilicus to pubis',
          x: 90,
          y: 240,
        },
        {
          id: 'sheath-below',
          label: 'Below it: all three\nin front',
          name: 'Below the arcuate line: all three aponeuroses in front; behind only fascia transversalis',
          x: 90,
          y: 305,
        },
        {
          id: 'transversalis-fascia',
          label: 'Fascia\ntransversalis',
          name: 'Fascia transversalis, behind rectus below the arcuate line',
          x: 90,
          y: 375,
        },
        {
          id: 'rectus-abdominis',
          label: 'Rectus\nabdominis',
          name: 'Rectus abdominis, the chief content',
          x: 280,
          y: 105,
        },
        {
          id: 'pyramidalis',
          label: 'Pyramidalis',
          name: 'Pyramidalis, in front of the lower rectus',
          x: 280,
          y: 165,
        },
        {
          id: 'superior-epigastric-artery',
          label: 'Superior\nepigastric',
          name: 'Superior epigastric artery, from the internal thoracic',
          x: 280,
          y: 225,
        },
        {
          id: 'inferior-epigastric-artery',
          label: 'Inferior\nepigastric',
          name: 'Inferior epigastric artery, from the external iliac',
          x: 280,
          y: 295,
        },
        {
          id: 'thoracoabdominal-nerves',
          label: 'T7 to T12\nnerves',
          name: 'Terminal parts of the lower six thoracic nerves',
          x: 280,
          y: 365,
        },
        {
          id: 'deep-inguinal-ring',
          label: 'Deep inguinal ring',
          name: 'Deep inguinal ring, an opening in fascia transversalis lateral to the inferior epigastric artery',
          x: 180,
          y: 430,
        },
      ],
      edges: [
        { from: 'rectus-sheath', to: 'sheath-above-margin' },
        { from: 'sheath-above-margin', to: 'sheath-middle' },
        { from: 'sheath-middle', to: 'arcuate-line' },
        { from: 'arcuate-line', to: 'sheath-below' },
        { from: 'sheath-below', to: 'transversalis-fascia' },
        { from: 'rectus-sheath', to: 'rectus-abdominis' },
        { from: 'rectus-abdominis', to: 'pyramidalis' },
        { from: 'rectus-abdominis', to: 'superior-epigastric-artery' },
        { from: 'superior-epigastric-artery', to: 'inferior-epigastric-artery' },
        { from: 'inferior-epigastric-artery', to: 'arcuate-line' },
        { from: 'rectus-abdominis', to: 'thoracoabdominal-nerves' },
        { from: 'transversalis-fascia', to: 'deep-inguinal-ring' },
        { from: 'inferior-epigastric-artery', to: 'deep-inguinal-ring' },
      ],
    },
    lesions: [
      {
        id: 'paramedian-incision',
        label: 'Paramedian incision',
        nodeIds: ['rectus-abdominis', 'thoracoabdominal-nerves'],
        explanation:
          'The preferred way in above the umbilicus: open the front of the sheath beside the midline and pull rectus laterally. Its nerves enter from the lateral side, so drawing it outwards spares them, and the closed sheath with the muscle in front of the scar seldom gives way to a hernia.',
      },
      {
        id: 'epigastric-anastomosis',
        label: 'A bypass round the aorta',
        nodeIds: ['superior-epigastric-artery', 'inferior-epigastric-artery'],
        explanation:
          'Behind rectus the superior epigastric (from the subclavian through the internal thoracic) meets the inferior epigastric (from the external iliac). When the aorta is narrowed above, this link carries blood to the lower limbs.',
      },
      {
        id: 'divarication',
        label: 'Divarication of recti',
        nodeIds: ['rectus-abdominis', 'sheath-middle'],
        explanation:
          'In women who have borne several children, with weak muscles, the recti draw apart and the linea alba stretches; a bulge rises between them on coughing and falls back.',
      },
    ],
    drill: [
      {
        id: 'levels',
        title: 'The sheath at three levels',
        hint: 'Above the costal margin, down to the arcuate line, below it, and what lies behind.',
        nodeIds: [
          'sheath-above-margin',
          'sheath-middle',
          'arcuate-line',
          'sheath-below',
          'transversalis-fascia',
        ],
      },
      {
        id: 'contents',
        title: 'Contents',
        hint: 'Two muscles, two arteries that meet, the nerves, and the ring in the fascia.',
        nodeIds: [
          'rectus-abdominis',
          'pyramidalis',
          'superior-epigastric-artery',
          'inferior-epigastric-artery',
          'thoracoabdominal-nerves',
          'deep-inguinal-ring',
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
        ...WALL_MUSCLES,
        'linea-alba',
        'transversalis-fascia',
        'superior-epigastric-artery',
        'musculophrenic-artery',
        'inferior-epigastric-artery',
        'inferior-epigastric-vein',
        'external-iliac-artery',
        'external-iliac-vein',
        'thoracoabdominal-nerves',
      ]),
      traces: [],
      stops: [
        {
          ...RECTUS_FRONT,
          description:
            'Rectus inside its sheath; hide the oblique muscles in Layers to see the superior and inferior epigastric arteries meeting behind it.',
        },
        ABDOMEN_FRONT,
        {
          ...INGUINAL_RIGHT,
          title: 'The inferior epigastric artery',
          description:
            'Rising from the external iliac just above the inguinal ligament, medial to the deep inguinal ring, to enter the sheath in front of the arcuate line.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'walls',
      title: 'Two walls',
      body: 'The sheath is made of the aponeuroses of the three flat muscles, which cross the midline as the linea alba and reach laterally to the linea semilunaris. Its front wall is complete and stuck to the tendinous intersections of rectus. Its back wall is incomplete, missing above the costal margin and below the arcuate line, and free of the muscle.',
      focus: ['rectus-sheath'],
    },
    {
      id: 'above',
      title: 'Above the costal margin',
      body: 'Front: the external oblique aponeurosis alone. Back: none; rectus lies directly on the fifth, sixth and seventh costal cartilages.',
      focus: ['sheath-above-margin'],
    },
    {
      id: 'middle',
      title: 'Costal margin to arcuate line',
      body: 'The internal oblique aponeurosis splits at the edge of rectus. Front wall: external oblique aponeurosis with the front lamina of the internal oblique. Back wall: the back lamina of the internal oblique with the transversus aponeurosis.',
      focus: ['sheath-middle'],
    },
    {
      id: 'below',
      title: 'Below the arcuate line',
      body: 'Midway between the umbilicus and the pubic symphysis, the back wall ends in a free curved edge, the arcuate line. Below it all three aponeuroses pass in front (internal oblique and transversus fused, external oblique separate) and rectus rests on fascia transversalis.',
      focus: ['arcuate-line', 'sheath-below', 'transversalis-fascia'],
    },
    {
      id: 'contents',
      title: 'Contents',
      body: 'Rectus is the chief content, with pyramidalis in front of its lower end. The superior epigastric artery, a terminal branch of the internal thoracic, enters behind the seventh costal cartilage between the costal and xiphoid slips of the diaphragm; the inferior epigastric, from the external iliac, enters in front of the arcuate line; they meet behind rectus, with their veins. The lower five intercostal nerves and the subcostal nerve pierce the back wall, then the muscle and the front wall.',
      focus: [
        'rectus-abdominis',
        'pyramidalis',
        'superior-epigastric-artery',
        'inferior-epigastric-artery',
        'thoracoabdominal-nerves',
      ],
    },
    {
      id: 'deep-arteries',
      title: 'Deep arteries of the wall',
      body: 'Two from above, the superior epigastric and the musculophrenic (along the costal margin); two from below, the inferior epigastric and the deep circumflex iliac (back along the iliac crest); and small branches of the intercostal, subcostal and lumbar arteries with the nerves. The inferior epigastric gives a cremasteric branch to the cord and a pubic branch that may replace the obturator artery.',
      focus: ['superior-epigastric-artery', 'inferior-epigastric-artery'],
    },
    {
      id: 'fascia',
      title: 'Fascia transversalis',
      body: 'The fascia lining transversus, separated from the peritoneum by extraperitoneal tissue. It joins the diaphragmatic fascia above and the fascia iliaca below. An oval opening in it 1.2 cm above the midinguinal point, just lateral to the inferior epigastric artery, is the deep inguinal ring; it lends the cord its internal spermatic fascia and the femoral sheath its front wall.',
      focus: ['transversalis-fascia', 'deep-inguinal-ring'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'Hide the obliques and transversus to see rectus and the two epigastric arteries; then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'rs-below-arcuate',
      prompt: 'Below the arcuate line the posterior wall of the rectus sheath is formed by:',
      options: [
        { id: 'none', text: 'Nothing: rectus rests on fascia transversalis' },
        { id: 'ta', text: 'The transversus aponeurosis' },
        { id: 'io-ta', text: 'Internal oblique and transversus' },
        { id: 'eo', text: 'The external oblique aponeurosis' },
      ],
      answerId: 'none',
      explanation: 'All three aponeuroses pass in front below the arcuate line.',
    },
    {
      id: 'rs-above-margin',
      prompt: 'Above the costal margin the anterior wall of the rectus sheath is formed by:',
      options: [
        { id: 'eo', text: 'External oblique aponeurosis only' },
        { id: 'eo-io', text: 'External oblique and internal oblique' },
        { id: 'all', text: 'All three flat muscles' },
        { id: 'io', text: 'Internal oblique only' },
      ],
      answerId: 'eo',
      explanation:
        'The internal oblique does not reach above the costal margin; there is no back wall there.',
    },
    {
      id: 'rs-inferior-epigastric',
      prompt: 'The inferior epigastric artery enters the rectus sheath:',
      options: [
        { id: 'front-arcuate', text: 'In front of the arcuate line' },
        { id: 'behind-seventh', text: 'Behind the seventh costal cartilage' },
        { id: 'through-linea', text: 'Through the linea alba' },
        { id: 'deep-ring', text: 'Through the deep inguinal ring' },
      ],
      answerId: 'front-arcuate',
      explanation:
        'It pierces the fascia transversalis at the edge of rectus and passes in front of the arcuate line.',
    },
    {
      id: 'rs-deep-ring',
      prompt: 'The deep inguinal ring lies:',
      options: [
        { id: 'lateral', text: 'Lateral to the inferior epigastric artery' },
        { id: 'medial', text: 'Medial to the inferior epigastric artery' },
        { id: 'pubic', text: 'Just above the pubic tubercle' },
        { id: 'below', text: 'Below the inguinal ligament' },
      ],
      answerId: 'lateral',
      explanation: '1.2 cm above the midinguinal point, in fascia transversalis.',
    },
  ],
  cards: [
    {
      id: 'rs-three-levels',
      front: 'Walls of the rectus sheath at its three levels?',
      back: 'Above the costal margin: front EO, no back. To the arcuate line: front EO + IO front lamina, back IO back lamina + TA. Below: front all three, back fascia transversalis.',
    },
    {
      id: 'rs-arcuate',
      front: 'Arcuate line?',
      back: 'The free lower edge of the back wall of the sheath, midway between the umbilicus and the pubic symphysis, concave downwards.',
    },
    {
      id: 'rs-contents',
      front: 'Contents of the rectus sheath?',
      back: 'Rectus, pyramidalis, superior and inferior epigastric vessels, and the lower six thoracic nerves.',
    },
    {
      id: 'rs-deep-arteries',
      front: 'Deep arteries of the anterior abdominal wall?',
      back: 'From above: superior epigastric and musculophrenic. From below: inferior epigastric and deep circumflex iliac. Plus intercostal, subcostal and lumbar branches.',
    },
    {
      id: 'rs-fascia-rule',
      front: 'Arteries and nerves in relation to fascia transversalis?',
      back: 'The main arteries lie inside it, the nerves outside: so the femoral vessels are in the femoral sheath and the femoral nerve is not.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 16 Anterior Abdominal Wall',
      pages: '244–248',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '283–287' },
  ],
};
