import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  FRAME,
  HEART,
  LOBES,
  ORGANS_MODEL_CREDIT,
  ORGANS_MODEL_SRC,
  organsParts,
} from './thoracic-organs-3d';

// Thorax batch 4. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const thoraxSurfaceXray: Topic = {
  slug: 'thorax-surface-xray',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Surface marking and the chest X-ray',
  summary:
    'Where the pleura, lungs, heart and valves lie under the chest wall, where to listen to each valve, and what makes each edge of the shadow on a PA chest X-ray.',
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
      'Volume 1, Chapter 21 Surface Marking and Radiological Anatomy of Thorax, pages 330 to 337',
    ),
    bookSource('grays-anatomy', 'Chapter 3 Thorax, surface anatomy, pages 236 to 245'),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'Cage, heart and vessels (BodyParts3D, CC BY 4.0); lungs and pleurae (Z-Anatomy, CC BY-SA 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 and CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Pleura: rib 8 in the midclavicular line, rib 10 midaxillary, rib 12 at the back. Lung: two ribs higher, 6, 8 and 10.',
    'Heart borders: left 2nd cartilage to right 3rd (upper), right 3rd to 6th cartilage (right), right 6th to the apex in the left 5th space 9 cm out (inferior).',
    'Listen where the blood goes: pulmonary in the left 2nd space, aortic in the right 2nd space, mitral at the apex, tricuspid at the lower sternum.',
    'PA X-ray, right edge of the mediastinum: right brachiocephalic vein, SVC, right atrium, IVC. Left edge: aortic knuckle, pulmonary trunk, left auricle, left ventricle.',
    'The heart’s width is normally about half the chest’s; a fluid level or blunting at a costophrenic angle means fluid.',
  ],
  visual: {
    kind: 'path',
    // Pleural and lung lines, the valve areas, and the edges of the shadow on an X-ray.
    diagram: {
      width: 360,
      height: 340,
      nodes: [
        {
          id: 'right-pleura',
          label: 'Pleura',
          name: 'Lower limit of the parietal pleura',
          x: 50,
          y: 30,
        },
        {
          id: 'pleura-8',
          label: 'Rib 8\nMCL',
          name: 'Eighth rib in the midclavicular line',
          x: 145,
          y: 30,
        },
        {
          id: 'pleura-10',
          label: 'Rib 10\nMAL',
          name: 'Tenth rib in the midaxillary line',
          x: 225,
          y: 30,
        },
        { id: 'pleura-12', label: 'Rib 12\nback', name: 'Twelfth rib at the back', x: 305, y: 30 },
        { id: 'right-lower-lobe', label: 'Lung', name: 'Lower border of the lung', x: 50, y: 100 },
        {
          id: 'lung-6',
          label: 'Rib 6\nMCL',
          name: 'Sixth rib in the midclavicular line',
          x: 145,
          y: 100,
        },
        {
          id: 'lung-8',
          label: 'Rib 8\nMAL',
          name: 'Eighth rib in the midaxillary line',
          x: 225,
          y: 100,
        },
        { id: 'lung-10', label: 'Rib 10\nback', name: 'Tenth rib at the back', x: 305, y: 100 },
        {
          id: 'valve-areas',
          label: 'Listen',
          name: 'Auscultatory areas of the valves',
          x: 50,
          y: 180,
        },
        {
          id: 'pulmonary-area',
          label: 'Pulmonary:\nL 2nd space',
          name: 'Pulmonary area: left second space beside the sternum',
          x: 145,
          y: 180,
        },
        {
          id: 'aortic-area',
          label: 'Aortic:\nR 2nd space',
          name: 'Aortic area: right second space beside the sternum',
          x: 240,
          y: 180,
        },
        {
          id: 'mitral-area',
          label: 'Mitral:\napex',
          name: 'Mitral area: the apex',
          x: 320,
          y: 180,
        },
        {
          id: 'tricuspid-area',
          label: 'Tricuspid:\nlower sternum',
          name: 'Tricuspid area: the lower end of the sternum',
          x: 200,
          y: 236,
        },
        { id: 'pa-xray', label: 'PA\nX-ray', name: 'Posteroanterior chest X-ray', x: 50, y: 310 },
        {
          id: 'superior-vena-cava',
          label: 'Right edge:\nSVC, RA, IVC',
          name: 'Right edge of the mediastinal shadow: right brachiocephalic vein, SVC, right atrium, IVC',
          x: 150,
          y: 310,
        },
        {
          id: 'arch-of-aorta',
          label: 'Left edge:\nknuckle, LV',
          name: 'Left edge: aortic knuckle, pulmonary trunk, left auricle, left ventricle',
          x: 255,
          y: 310,
        },
        {
          id: 'costophrenic',
          label: 'Costo-\nphrenic',
          name: 'Costophrenic angles',
          x: 330,
          y: 310,
        },
      ],
      edges: [
        { from: 'right-pleura', to: 'pleura-8' },
        { from: 'right-pleura', to: 'pleura-10' },
        { from: 'right-pleura', to: 'pleura-12' },
        { from: 'right-lower-lobe', to: 'lung-6' },
        { from: 'right-lower-lobe', to: 'lung-8' },
        { from: 'right-lower-lobe', to: 'lung-10' },
        { from: 'valve-areas', to: 'pulmonary-area' },
        { from: 'valve-areas', to: 'aortic-area' },
        { from: 'valve-areas', to: 'mitral-area' },
        { from: 'valve-areas', to: 'tricuspid-area' },
        { from: 'pa-xray', to: 'superior-vena-cava' },
        { from: 'pa-xray', to: 'arch-of-aorta' },
        { from: 'pa-xray', to: 'costophrenic' },
      ],
    },
    lesions: [
      {
        id: 'kidney-surgery',
        label: 'Pleura below rib 12',
        nodeIds: ['pleura-12'],
        explanation:
          'At the back the pleura dips below the twelfth rib at the costovertebral angle, behind the upper pole of the kidney, so it can be opened by mistake in kidney surgery from behind.',
      },
      {
        id: 'blunted-angle',
        label: 'Blunted angle',
        nodeIds: ['costophrenic'],
        explanation:
          'Fluid in the pleural cavity first fills the costodiaphragmatic recess and blunts the sharp costophrenic angle on an X-ray.',
      },
      {
        id: 'big-heart',
        label: 'Enlarged heart',
        nodeIds: ['superior-vena-cava', 'arch-of-aorta'],
        explanation:
          'The transverse width of the heart’s shadow is normally about half the width of the chest. A wider shadow suggests an enlarged heart or a pericardial effusion.',
      },
    ],
    drill: [
      {
        id: 'lines',
        title: 'Pleura and lung lines',
        hint: 'The even ribs for the pleura, two ribs higher for the lung.',
        nodeIds: ['pleura-8', 'pleura-10', 'pleura-12', 'lung-6', 'lung-8', 'lung-10'],
      },
      {
        id: 'listen',
        title: 'Where to listen',
        hint: 'Each valve is heard downstream of where it lies.',
        nodeIds: ['pulmonary-area', 'aortic-area', 'mitral-area', 'tricuspid-area'],
      },
    ],
    model3d: {
      src: ORGANS_MODEL_SRC,
      credit: ORGANS_MODEL_CREDIT,
      parts: organsParts([
        ...FRAME,
        'right-pleura',
        'left-pleura',
        ...LOBES,
        ...HEART,
        'ascending-aorta',
        'arch-of-aorta',
        'descending-aorta',
        'pulmonary-trunk',
        'superior-vena-cava',
        'inferior-vena-cava',
        'brachiocephalic-veins',
        'trachea',
        'right-main-bronchus',
        'left-main-bronchus',
      ]),
      traces: [],
      stops: [
        {
          id: 'front',
          title: 'Under the chest wall',
          description:
            'The lungs and pleurae fill the cage; the heart lies behind the sternum and left cartilages, its apex in the left fifth space.',
          target: [0, -110, 1225],
          position: [0, -1060, 1285],
        },
        {
          id: 'heart',
          title: 'Heart and great vessels',
          description:
            'Turn on See-through in the tools to look past the ribs: the superior vena cava and right atrium make the right edge of the shadow, the arch, pulmonary trunk and left ventricle the left.',
          target: [12, -125, 1250],
          position: [12, -800, 1270],
        },
        {
          id: 'side',
          title: 'From the side',
          description:
            'In the midaxillary line the lung reaches rib 8 and the pleura rib 10; between them lies the costodiaphragmatic recess.',
          target: [-110, -110, 1170],
          position: [-1000, -320, 1190],
        },
        {
          id: 'back',
          title: 'From behind',
          description:
            'At the back the lung stops at rib 10 and the pleura at rib 12, dipping below it beside the spine.',
          target: [0, -50, 1170],
          position: [0, 950, 1200],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'pleura',
      title: 'Pleura',
      body: 'The cervical pleura domes 2.5 cm above the medial third of the clavicle. In front, both pleurae run from the sternoclavicular joints to meet at the sternal angle; the right goes straight down to the xiphisternum, the left swings out at the fourth cartilage to the sixth. The lower limit crosses rib 8 in the midclavicular line, rib 10 in the midaxillary line and rib 12 at the back, ending beside the T12 spine.',
      focus: ['right-pleura', 'pleura-8', 'pleura-10', 'pleura-12'],
    },
    {
      id: 'lungs',
      title: 'Lungs',
      body: 'The apex and anterior borders follow the pleura, except the cardiac notch of the left lung, which runs out 3.5 cm from the sternum at the fourth cartilage and back to the sixth 4 cm from the midline. The lower border is two ribs higher than the pleura: rib 6, rib 8, rib 10. The oblique fissure runs from 2 cm beside the T3 spine through the fifth rib in the midaxillary line to the sixth cartilage; the horizontal fissure follows the fourth cartilage.',
      focus: ['right-lower-lobe', 'lung-6', 'lung-8', 'lung-10'],
    },
    {
      id: 'heart',
      title: 'Heart',
      body: 'Join four points and the apex: the lower border of the left second cartilage 1.3 cm from the sternum, the upper border of the right third cartilage 0.8 cm out, the right fourth space 3.8 cm from the midline, the right sixth cartilage 2 cm out, and the apex in the left fifth space 9 cm from the midline. The right border bulges most in the fourth space.',
      focus: [],
    },
    {
      id: 'valves',
      title: 'Valves and where to listen',
      body: 'The valves lie close together behind the sternum: pulmonary at the left third cartilage, aortic a little lower, mitral at the left fourth, tricuspid nearly vertical behind the right half of the sternum at the fourth and fifth spaces. Each is heard best downstream: pulmonary in the left second space, aortic in the right second space, mitral at the apex, tricuspid at the lower sternum.',
      focus: ['valve-areas', 'pulmonary-area', 'aortic-area', 'mitral-area', 'tricuspid-area'],
    },
    {
      id: 'vessels',
      title: 'Great vessels and airway',
      body: 'The superior vena cava runs down beside the right edge of the sternum from the first to the third cartilage. The arch lies behind the lower half of the manubrium, from the right end of the sternal angle to the left second cartilage. The trachea runs down from the cricoid to the sternal angle, slightly to the right.',
      focus: [],
    },
    {
      id: 'xray',
      title: 'The PA chest X-ray',
      body: 'X-rays pass from back to front. The lungs are dark, with vessels and bronchi branching out from the dense roots. The right dome of the diaphragm sits a little higher than the left, with the stomach gas under the left. The mediastinal shadow’s right edge is the right brachiocephalic vein, superior vena cava, right atrium and inferior vena cava; its left edge is the aortic knuckle, pulmonary trunk, left auricle and left ventricle. Its width is about half the chest’s.',
      focus: ['pa-xray', 'superior-vena-cava', 'arch-of-aorta', 'costophrenic'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Turn on the ribs and the lungs and use the guided views to count the ribs each line crosses.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'mitral-area',
      prompt: 'The mitral valve is best heard:',
      options: [
        { id: 'apex', text: 'At the apex' },
        { id: 'left-second', text: 'In the left second space' },
        { id: 'lower-sternum', text: 'At the lower end of the sternum' },
        { id: 'right-second', text: 'In the right second space' },
      ],
      answerId: 'apex',
      explanation:
        'Pulmonary: left second space. Aortic: right second space. Tricuspid: lower sternum.',
    },
    {
      id: 'lung-midaxillary',
      prompt: 'In the midaxillary line the lower border of the lung crosses:',
      options: [
        { id: 'eighth', text: 'The eighth rib' },
        { id: 'sixth', text: 'The sixth rib' },
        { id: 'tenth', text: 'The tenth rib' },
        { id: 'twelfth', text: 'The twelfth rib' },
      ],
      answerId: 'eighth',
      explanation: 'The pleura reaches the tenth rib there, two ribs lower.',
    },
    {
      id: 'right-edge-xray',
      prompt: 'Which does not form part of the right edge of the mediastinal shadow on a PA X-ray?',
      options: [
        { id: 'left-auricle', text: 'Left auricle' },
        { id: 'svc', text: 'Superior vena cava' },
        { id: 'right-atrium', text: 'Right atrium' },
        { id: 'ivc', text: 'Inferior vena cava' },
      ],
      answerId: 'left-auricle',
      explanation:
        'The left auricle forms part of the left edge, between the pulmonary trunk and the left ventricle.',
    },
    {
      id: 'heart-ratio',
      prompt: 'On a normal PA chest X-ray, the width of the heart is about:',
      options: [
        { id: 'half', text: 'Half the width of the chest' },
        { id: 'third', text: 'A third of the width of the chest' },
        { id: 'two-thirds', text: 'Two-thirds of the width of the chest' },
        { id: 'quarter', text: 'A quarter of the width of the chest' },
      ],
      answerId: 'half',
      explanation: 'A wider shadow suggests an enlarged heart or pericardial fluid.',
    },
  ],
  cards: [
    {
      id: 'auscultatory-areas',
      front: 'Auscultatory areas of the four valves?',
      back: 'Pulmonary: left 2nd space. Aortic: right 2nd space. Mitral: apex. Tricuspid: lower end of the sternum.',
    },
    {
      id: 'heart-surface-points',
      front: 'Surface marking of the heart: the five points?',
      back: 'Left 2nd cartilage 1.3 cm out; right 3rd cartilage 0.8 cm out; right 4th space 3.8 cm from the midline; right 6th cartilage 2 cm out; apex in the left 5th space 9 cm out.',
    },
    {
      id: 'mediastinal-shadow-left',
      front: 'What forms the left edge of the mediastinal shadow on a PA X-ray?',
      back: 'Aortic knuckle, pulmonary trunk, left auricle and left ventricle, top to bottom.',
    },
    {
      id: 'lung-zones',
      front: 'Zones of the lung on a chest X-ray?',
      back: 'Upper: apex to the 2nd cartilage. Middle: 2nd to 4th cartilage, including the hilum. Lower: 4th cartilage to the base.',
    },
    {
      id: 'valve-surface',
      front: 'Where do the heart valves lie under the chest wall?',
      back: 'Pulmonary: left 3rd cartilage. Aortic: just below, behind the left half of the sternum. Mitral: left 4th cartilage. Tricuspid: behind the right half of the sternum at the 4th and 5th spaces.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Chapter 21 Surface Marking and Radiological Anatomy of Thorax',
      pages: '330–337',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '236–245' },
  ],
};
