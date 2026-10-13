import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  FRAME,
  LOBES,
  ORGANS_MODEL_CREDIT,
  ORGANS_MODEL_SRC,
  organsParts,
  PHRENIC_CREDIT,
  PHRENIC_PATHS,
} from './thoracic-organs-3d';

// Thorax batch 2. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const pleura: Topic = {
  slug: 'pleura',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Pleura: layers, recesses and nerve supply',
  summary:
    'The serous sac around each lung, its four parietal parts, the recesses the lung fills on a deep breath, and why pleural pain can be felt in the shoulder.',
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
      'Volume 1, Chapter 15 Thoracic Cavity and Pleurae, pages 255 to 263',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: pleural cavities, pages 165 to 170',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Pleurae and lungs in the 3D view',
      url: 'https://www.z-anatomy.com/',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Cage and diaphragm in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Visceral pleura covers the lung and its fissures; parietal pleura lines the wall as cervical, costal, mediastinal and diaphragmatic parts.',
    'The two layers meet around the lung root and hang below it as the pulmonary ligament.',
    'Parietal pleura reaches rib 8 in the midclavicular line, rib 10 in the midaxillary line and rib 12 at the back; the lung stops two ribs higher.',
    'Costal and peripheral diaphragmatic pleura: intercostal nerves. Mediastinal and central diaphragmatic: phrenic (C4), so pain goes to the shoulder tip.',
    'Visceral pleura has autonomic nerves only and feels no pain.',
  ],
  visual: {
    kind: 'path',
    // The sac and its two layers, the parts of the parietal layer, the recesses and the nerves.
    diagram: {
      width: 360,
      height: 380,
      nodes: [
        { id: 'right-pleura', label: 'Pleura', name: 'Pleural sac (one each side)', x: 50, y: 30 },
        {
          id: 'visceral',
          label: 'Visceral',
          name: 'Visceral (pulmonary) pleura, on the lung',
          x: 145,
          y: 30,
        },
        {
          id: 'pleural-cavity',
          label: 'Cavity',
          name: 'Pleural cavity, a film of fluid between the layers',
          x: 225,
          y: 30,
        },
        {
          id: 'pulmonary-ligament',
          label: 'Pulmonary\nligament',
          name: 'Pulmonary ligament, the fold hanging below the lung root',
          x: 305,
          y: 36,
        },
        { id: 'parietal', label: 'Parietal', name: 'Parietal pleura, on the walls', x: 50, y: 110 },
        {
          id: 'cervical',
          label: 'Cervical',
          name: 'Cervical pleura, the dome over the apex',
          x: 145,
          y: 110,
        },
        {
          id: 'costal',
          label: 'Costal',
          name: 'Costal pleura, on the ribs and spaces',
          x: 225,
          y: 110,
        },
        {
          id: 'mediastinal',
          label: 'Medi-\nastinal',
          name: 'Mediastinal pleura, on the side of the mediastinum',
          x: 305,
          y: 116,
        },
        {
          id: 'diaphragmatic',
          label: 'Diaphrag-\nmatic',
          name: 'Diaphragmatic pleura, on the diaphragm',
          x: 185,
          y: 176,
        },
        { id: 'recesses', label: 'Recesses', name: 'Recesses of the pleura', x: 50, y: 256 },
        {
          id: 'costodiaphragmatic',
          label: 'Costo-\ndiaphragmatic',
          name: 'Costodiaphragmatic recess, ribs 8 to 10 in the midaxillary line',
          x: 165,
          y: 256,
        },
        {
          id: 'costomediastinal',
          label: 'Costo-\nmediastinal',
          name: 'Costomediastinal recess, behind the sternum at the cardiac notch',
          x: 290,
          y: 256,
        },
        { id: 'nerve-supply', label: 'Nerves', name: 'Nerve supply', x: 50, y: 340 },
        {
          id: 'intercostal-nerves',
          label: 'Intercostal',
          name: 'Intercostal nerves: costal and peripheral diaphragmatic pleura',
          x: 145,
          y: 340,
        },
        {
          id: 'right-phrenic',
          label: 'Phrenic',
          name: 'Phrenic nerve (C3–C5): mediastinal and central diaphragmatic pleura',
          x: 225,
          y: 340,
        },
        {
          id: 'autonomic',
          label: 'Autonomic',
          name: 'Autonomic nerves of the lung: visceral pleura, no pain',
          x: 305,
          y: 340,
        },
      ],
      edges: [
        { from: 'right-pleura', to: 'visceral' },
        { from: 'right-pleura', to: 'pleural-cavity' },
        { from: 'right-pleura', to: 'pulmonary-ligament' },
        { from: 'parietal', to: 'cervical' },
        { from: 'parietal', to: 'costal' },
        { from: 'parietal', to: 'mediastinal' },
        { from: 'parietal', to: 'diaphragmatic' },
        { from: 'recesses', to: 'costodiaphragmatic' },
        { from: 'recesses', to: 'costomediastinal' },
        { from: 'nerve-supply', to: 'intercostal-nerves' },
        { from: 'nerve-supply', to: 'right-phrenic' },
        { from: 'nerve-supply', to: 'autonomic' },
      ],
    },
    lesions: [
      {
        id: 'pleural-effusion',
        label: 'Pleural effusion',
        nodeIds: ['pleural-cavity', 'costodiaphragmatic'],
        explanation:
          'Fluid in the pleural cavity sinks first into the costodiaphragmatic recess and blunts it on an X-ray. It is drained through the eighth space in the midaxillary line, the needle kept to the lower part of the space, clear of the vein, artery and nerve under the rib above.',
      },
      {
        id: 'pneumothorax',
        label: 'Pneumothorax',
        nodeIds: ['pleural-cavity', 'visceral'],
        explanation:
          'Air in the pleural cavity breaks the seal between the layers and the lung recoils. With blood it is a haemothorax, with pus an empyema, with fluid and air a hydropneumothorax.',
      },
      {
        id: 'shoulder-pain',
        label: 'Pain in the shoulder',
        nodeIds: ['mediastinal', 'diaphragmatic', 'right-phrenic'],
        explanation:
          'Irritated mediastinal or central diaphragmatic pleura hurts at the tip of the shoulder: the phrenic nerve (C4) shares its segment with the supraclavicular nerves to the skin there. Irritated costal pleura hurts along the intercostal nerves, as far as the abdominal wall.',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'Parietal pleura',
        hint: 'Four parts, named for what each one lines.',
        nodeIds: ['cervical', 'costal', 'mediastinal', 'diaphragmatic'],
      },
      {
        id: 'recesses',
        title: 'Recesses',
        hint: 'Two spare spaces the lung expands into on a deep breath.',
        nodeIds: ['costodiaphragmatic', 'costomediastinal'],
      },
      {
        id: 'nerves',
        title: 'Nerve supply',
        hint: 'Two somatic nerves for the parietal layer, and what supplies the visceral layer.',
        nodeIds: ['intercostal-nerves', 'right-phrenic', 'autonomic'],
      },
    ],
    model3d: {
      src: ORGANS_MODEL_SRC,
      credit: `${ORGANS_MODEL_CREDIT} ${PHRENIC_CREDIT}`,
      parts: organsParts([...FRAME, 'right-pleura', 'left-pleura', ...LOBES]),
      traces: [{ id: 'right-phrenic', kind: 'nerve', paths: PHRENIC_PATHS.right }],
      stops: [
        {
          id: 'sacs',
          title: 'Two pleural sacs',
          description:
            'Each lung sits in its own pleural sac, the mediastinum between them. The parietal layer reaches lower than the lungs.',
          target: [0, -110, 1225],
          position: [0, -1060, 1285],
        },
        {
          id: 'cervical',
          title: 'Cervical pleura',
          description:
            'The dome of pleura over the apex of the lung rises about 2.5 cm above the medial third of the clavicle, into the root of the neck.',
          target: [-60, -100, 1335],
          position: [-320, -690, 1560],
        },
        {
          id: 'recess',
          title: 'Costodiaphragmatic recess',
          description:
            'From the side: below the lung, the costal and diaphragmatic pleura lie against each other for about 5 cm, from the eighth to the tenth rib in the midaxillary line.',
          target: [-110, -110, 1120],
          position: [-990, -330, 1120],
        },
        {
          id: 'back',
          title: 'From behind',
          description:
            'The pleura reaches below the twelfth rib at the costovertebral angles, behind the upper poles of the kidneys, where it can be opened in kidney surgery.',
          target: [0, -50, 1120],
          position: [0, 900, 1170],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'sac',
      title: 'A sac around each lung',
      body: 'The pleura is a serous membrane lined by mesothelium. Each lung pushes into its sac from the medial side, so the sac has an inner, visceral layer on the lung and an outer, parietal layer on the walls, with a potential space, the pleural cavity, between them.',
      focus: ['right-pleura'],
    },
    {
      id: 'visceral',
      title: 'Visceral pleura',
      body: 'It covers the lung and dips into its fissures, and cannot be peeled off it. It meets the parietal layer around the root of the lung, and below the root the two layers hang as the pulmonary ligament, a dead space into which the pulmonary veins can swell and the root can descend.',
      focus: ['visceral', 'pleural-cavity', 'pulmonary-ligament'],
    },
    {
      id: 'parietal',
      title: 'Parietal pleura',
      body: 'Thicker, and named for what it lines. Costal pleura lines the ribs and spaces, loosely held by the endothoracic fascia. Mediastinal pleura covers the side of the mediastinum. Diaphragmatic pleura covers the diaphragm. Cervical pleura domes up into the neck over the apex, under the suprapleural membrane.',
      focus: ['parietal', 'cervical', 'costal', 'mediastinal', 'diaphragmatic'],
    },
    {
      id: 'lines',
      title: 'Where it reaches',
      body: 'In front, both pleurae meet behind the sternum at the second cartilage; the left swings out at the fourth for the heart. Below, the parietal pleura crosses rib 8 in the midclavicular line, rib 10 in the midaxillary line and rib 12 at the back: the even ribs. The lung stops two ribs higher. The pleura lies outside the cage at the root of the neck, the right xiphicostal angle and both costovertebral angles.',
      focus: ['costal'],
    },
    {
      id: 'recesses',
      title: 'Recesses',
      body: 'Where the lung does not reach, two layers of parietal pleura touch, and the lung slides in on a deep breath. The costodiaphragmatic recess, about 5 cm deep, lies between ribs 8 and 10 in the midaxillary line. The costomediastinal recess lies behind the sternum and cartilages, clearest at the cardiac notch.',
      focus: ['recesses', 'costodiaphragmatic', 'costomediastinal'],
    },
    {
      id: 'nerves',
      title: 'Nerve supply',
      body: 'The parietal pleura comes from somatopleure and has somatic nerves, so it is sharply painful: intercostal nerves for the costal and peripheral diaphragmatic pleura, the phrenic for the mediastinal and central diaphragmatic pleura. The visceral pleura comes from splanchnopleure and has only autonomic nerves, from the vagus and the second to fifth sympathetic ganglia, and feels no pain.',
      focus: ['nerve-supply', 'intercostal-nerves', 'right-phrenic', 'autonomic'],
    },
    {
      id: 'vessels',
      title: 'Blood and lymph',
      body: 'Parietal pleura is part of the wall: intercostal, internal thoracic and musculophrenic arteries, and intercostal and mediastinal nodes. Visceral pleura belongs to the lung: bronchial vessels and bronchopulmonary nodes.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a part to light it, then turn on an effusion or shoulder pain to see the anatomy behind it.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'mediastinal-pleura-nerve',
      prompt: 'The mediastinal pleura is supplied by:',
      options: [
        { id: 'phrenic', text: 'The phrenic nerve' },
        { id: 'intercostal', text: 'The intercostal nerves' },
        { id: 'vagus', text: 'The vagus nerve' },
        { id: 'splanchnic', text: 'The splanchnic nerves' },
      ],
      answerId: 'phrenic',
      explanation:
        'The phrenic supplies the mediastinal and central diaphragmatic pleura; the intercostals supply the costal and peripheral diaphragmatic pleura.',
    },
    {
      id: 'visceral-pleura-artery',
      prompt: 'The visceral pleura is supplied by:',
      options: [
        { id: 'bronchial', text: 'Bronchial arteries' },
        { id: 'internal-thoracic', text: 'Internal thoracic artery' },
        { id: 'musculophrenic', text: 'Musculophrenic artery' },
        { id: 'intercostal', text: 'Posterior intercostal arteries' },
      ],
      answerId: 'bronchial',
      explanation:
        'The visceral pleura shares the lung’s supply; the other three supply the parietal pleura with the chest wall.',
    },
    {
      id: 'pleura-midaxillary',
      prompt: 'In the midaxillary line, the lower limit of the parietal pleura crosses:',
      options: [
        { id: 'tenth', text: 'The tenth rib' },
        { id: 'eighth', text: 'The eighth rib' },
        { id: 'sixth', text: 'The sixth rib' },
        { id: 'twelfth', text: 'The twelfth rib' },
      ],
      answerId: 'tenth',
      explanation:
        'Pleura: rib 8 midclavicular, rib 10 midaxillary, rib 12 at the back. The lower border of the lung is two ribs higher: 6, 8 and 10.',
    },
    {
      id: 'not-major-recess',
      prompt: 'Which of these is not one of the large recesses of the pleura?',
      options: [
        { id: 'right-costomediastinal', text: 'Right costomediastinal recess' },
        { id: 'left-costomediastinal', text: 'Left costomediastinal recess' },
        { id: 'right-costodiaphragmatic', text: 'Right costodiaphragmatic recess' },
        { id: 'left-costodiaphragmatic', text: 'Left costodiaphragmatic recess' },
      ],
      answerId: 'right-costomediastinal',
      explanation:
        'The right anterior border of the lung fills its costomediastinal recess; only on the left, at the cardiac notch, is the recess large.',
    },
  ],
  cards: [
    {
      id: 'parietal-pleura-parts',
      front: 'Parts of the parietal pleura?',
      back: 'Cervical, costal, mediastinal and diaphragmatic.',
    },
    {
      id: 'pleura-lines',
      front: 'Lower limit of the parietal pleura in three lines?',
      back: 'Rib 8 midclavicular, rib 10 midaxillary, rib 12 at the back. The lung is two ribs higher.',
    },
    {
      id: 'pleura-beyond-cage',
      front: 'Where does the pleura lie beyond the thoracic cage?',
      back: 'Root of the neck on both sides, the right xiphicostal angle, and both costovertebral angles below rib 12.',
    },
    {
      id: 'pleura-nerves',
      front: 'Nerve supply of the pleura?',
      back: 'Parietal: intercostal (costal, peripheral diaphragmatic) and phrenic (mediastinal, central diaphragmatic). Visceral: autonomic only, painless.',
    },
    {
      id: 'paracentesis-thoracis',
      front: 'Where is fluid drawn from the pleural cavity?',
      back: 'Eighth space in the midaxillary line, through the lower part of the space, away from the bundle under the rib above.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 15 Thoracic Cavity and Pleurae', pages: '255–263' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '165–170' },
  ],
};
