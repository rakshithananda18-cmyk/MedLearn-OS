import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  CARDIAC_VEINS,
  CORONARY_ARTERIES,
  GREAT_VESSELS,
  HEART_BACK,
  HEART_FRONT,
  HEART_MODEL_CREDIT,
  HEART_MODEL_SRC,
  heartParts,
  WALLS,
} from './heart-3d';

// Thorax batch 3. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const heartExternalFeatures: Topic = {
  slug: 'heart-external-features',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Heart: position, surfaces and borders',
  summary:
    'How the heart lies in the chest, its apex and base, the borders seen on an X-ray, its three surfaces, and the grooves that carry its vessels.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 18 Pericardium and Heart, pages 286 to 288'),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: heart, orientation, surfaces, margins and sulci, pages 189 to 195',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Heart, coronary vessels and great vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The heart lies obliquely in the middle mediastinum: one-third right of the midline, two-thirds left. About 12 × 9 cm, 300 g in men.',
    'Apex: left ventricle, in the left fifth space 9 cm from the midline. Base: mostly left atrium, opposite T5–T8.',
    'Borders: right = right atrium; left = left ventricle and auricle; inferior = right ventricle; upper = the atria.',
    'Sternocostal surface mostly right atrium and ventricle; diaphragmatic surface two-thirds left ventricle; left surface left ventricle.',
    'The coronary sulcus rings the heart between atria and ventricles; the interventricular grooves meet near the apex. The crux is where the posterior grooves cross.',
  ],
  visual: {
    kind: 'path',
    // The heart's ends, borders, surfaces and grooves, each groove lit by the vessels in it.
    diagram: {
      width: 360,
      height: 380,
      nodes: [
        { id: 'heart', label: 'Heart', name: 'The heart', x: 50, y: 30 },
        {
          id: 'apex',
          label: 'Apex',
          name: 'Apex: left ventricle, left fifth space',
          x: 145,
          y: 30,
        },
        {
          id: 'base',
          label: 'Base',
          name: 'Base: left atrium and a little right atrium',
          x: 225,
          y: 30,
        },
        {
          id: 'crux',
          label: 'Crux',
          name: 'Crux, where the posterior grooves cross',
          x: 305,
          y: 30,
        },
        { id: 'borders', label: 'Borders', name: 'Borders of the heart', x: 50, y: 106 },
        { id: 'right-border', label: 'Right', name: 'Right border: right atrium', x: 145, y: 106 },
        {
          id: 'left-border',
          label: 'Left',
          name: 'Left border: left ventricle and left auricle',
          x: 225,
          y: 106,
        },
        {
          id: 'inferior-border',
          label: 'Inferior',
          name: 'Inferior border: right ventricle, and left ventricle near the apex',
          x: 305,
          y: 106,
        },
        {
          id: 'upper-border',
          label: 'Upper',
          name: 'Upper border: the atria, chiefly the left',
          x: 225,
          y: 162,
        },
        { id: 'surfaces', label: 'Surfaces', name: 'Surfaces of the heart', x: 50, y: 242 },
        {
          id: 'sternocostal',
          label: 'Sterno-\ncostal',
          name: 'Sternocostal surface: right atrium and ventricle, part of the left ventricle',
          x: 145,
          y: 242,
        },
        {
          id: 'diaphragmatic',
          label: 'Diaphrag-\nmatic',
          name: 'Diaphragmatic surface: two-thirds left ventricle, one-third right',
          x: 225,
          y: 242,
        },
        {
          id: 'left-surface',
          label: 'Left',
          name: 'Left surface: left ventricle and auricle',
          x: 305,
          y: 242,
        },
        { id: 'grooves', label: 'Grooves', name: 'Grooves (sulci)', x: 50, y: 330 },
        {
          id: 'coronary-sinus',
          label: 'Coronary\nsulcus',
          name: 'Coronary sulcus, with the coronary arteries and the coronary sinus',
          x: 145,
          y: 330,
        },
        {
          id: 'anterior-interventricular-artery',
          label: 'Anterior\ngroove',
          name: 'Anterior interventricular groove, with its artery and the great cardiac vein',
          x: 225,
          y: 330,
        },
        {
          id: 'posterior-interventricular-artery',
          label: 'Posterior\ngroove',
          name: 'Posterior interventricular groove, with its artery and the middle cardiac vein',
          x: 305,
          y: 330,
        },
      ],
      edges: [
        { from: 'heart', to: 'apex' },
        { from: 'heart', to: 'base' },
        { from: 'heart', to: 'crux' },
        { from: 'borders', to: 'right-border' },
        { from: 'borders', to: 'left-border' },
        { from: 'borders', to: 'inferior-border' },
        { from: 'borders', to: 'upper-border' },
        { from: 'surfaces', to: 'sternocostal' },
        { from: 'surfaces', to: 'diaphragmatic' },
        { from: 'surfaces', to: 'left-surface' },
        { from: 'grooves', to: 'coronary-sinus' },
        { from: 'grooves', to: 'anterior-interventricular-artery' },
        { from: 'grooves', to: 'posterior-interventricular-artery' },
      ],
    },
    lesions: [
      {
        id: 'dextrocardia',
        label: 'Dextrocardia',
        nodeIds: ['apex'],
        explanation:
          'The heart is a mirror image, its apex beat in the right fifth space. It may be part of situs inversus, in which all the thoracic and abdominal organs are reversed.',
      },
      {
        id: 'big-left-atrium',
        label: 'Enlarged left atrium',
        nodeIds: ['base'],
        explanation:
          'In mitral stenosis the left atrium swells. As it forms the base of the heart, right in front of the oesophagus, it can press on it and make swallowing difficult; a barium swallow shows the dent.',
      },
    ],
    drill: [
      {
        id: 'borders',
        title: 'Borders',
        hint: 'Which chamber makes each edge of the heart’s shadow.',
        nodeIds: ['right-border', 'left-border', 'inferior-border', 'upper-border'],
      },
      {
        id: 'surfaces',
        title: 'Surfaces and grooves',
        hint: 'Three surfaces, then the grooves that carry the vessels.',
        nodeIds: [
          'sternocostal',
          'diaphragmatic',
          'left-surface',
          'coronary-sinus',
          'anterior-interventricular-artery',
          'posterior-interventricular-artery',
        ],
      },
    ],
    model3d: {
      src: HEART_MODEL_SRC,
      credit: HEART_MODEL_CREDIT,
      parts: heartParts([...WALLS, ...GREAT_VESSELS, ...CORONARY_ARTERIES, ...CARDIAC_VEINS]),
      traces: [],
      stops: [
        HEART_FRONT,
        {
          id: 'apex',
          title: 'Apex',
          description:
            'The left ventricle alone makes the apex, which points down, forwards and to the left. The anterior interventricular groove reaches the inferior border just to its right.',
          target: [50, -150, 1195],
          position: [260, -560, 1080],
        },
        HEART_BACK,
        {
          id: 'left',
          title: 'Left surface',
          description:
            'The left ventricle and, high up, the left auricle; the circumflex artery and great cardiac vein curve round in the coronary sulcus.',
          target: [40, -120, 1225],
          position: [520, -250, 1250],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'position',
      title: 'In the chest',
      body: 'A hollow muscular cone in the middle mediastinum, inside the pericardium, behind the sternum and costal cartilages. It lies obliquely, a third to the right of the midline and two-thirds to the left, so blood flows from the atria down, forwards and to the left into the ventricles. It is about 12 by 9 cm and weighs about 300 g in men and 250 g in women.',
      focus: ['heart'],
    },
    {
      id: 'apex',
      title: 'Apex',
      body: 'Formed by the left ventricle alone, pointing down, forwards and left, in the left fifth intercostal space about 9 cm from the midline, just inside the midclavicular line. The apex beat is felt here; in children under two it is a space higher.',
      focus: ['apex'],
    },
    {
      id: 'base',
      title: 'Base and crux',
      body: 'The base is the back of the heart: mostly the left atrium with its four pulmonary veins, and a little of the right atrium with the venae cavae. It faces T5 to T8 lying down. The crux is the point on the back where the interatrial, coronary and posterior interventricular grooves meet.',
      focus: ['base', 'crux'],
    },
    {
      id: 'borders',
      title: 'Borders',
      body: 'The right border, almost vertical, is the right atrium from the superior to the inferior vena cava. The inferior border is mainly right ventricle, with left ventricle near the apex. The left border is left ventricle and, at the top, the left auricle. The upper border is the atria, chiefly the left.',
      focus: ['borders', 'right-border', 'left-border', 'inferior-border', 'upper-border'],
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      body: 'The sternocostal surface is mostly right atrium and right ventricle, with a strip of left ventricle and the left auricle; the lungs cover most of it except behind the cardiac notch. The diaphragmatic surface rests on the central tendon: two-thirds left ventricle, one-third right. The left surface is left ventricle and auricle, against the left phrenic nerve.',
      focus: ['surfaces', 'sternocostal', 'diaphragmatic', 'left-surface'],
    },
    {
      id: 'grooves',
      title: 'Grooves',
      body: 'The coronary sulcus rings the heart between atria and ventricles, holding the right coronary artery on the right, the circumflex artery on the left, and the coronary sinus behind. The anterior interventricular groove, near the left margin, carries its artery and the great cardiac vein; the posterior groove, near the right margin of the diaphragmatic surface, carries its artery and the middle cardiac vein. The two meet near the apex.',
      focus: [
        'grooves',
        'coronary-sinus',
        'anterior-interventricular-artery',
        'posterior-interventricular-artery',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Turn the heart round with the guided views and select a groove to light the vessels lying in it.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'right-border-chamber',
      prompt: 'The right border of the heart is formed by:',
      options: [
        { id: 'right-atrium', text: 'The right atrium' },
        { id: 'right-ventricle', text: 'The right ventricle' },
        { id: 'svc', text: 'The superior vena cava alone' },
        { id: 'left-atrium', text: 'The left atrium' },
      ],
      answerId: 'right-atrium',
      explanation:
        'It runs from the superior to the inferior vena cava. The right ventricle forms most of the inferior border.',
    },
    {
      id: 'base-of-heart',
      prompt: 'The base of the heart is formed mainly by:',
      options: [
        { id: 'left-atrium', text: 'The left atrium' },
        { id: 'left-ventricle', text: 'The left ventricle' },
        { id: 'right-ventricle', text: 'The right ventricle' },
        { id: 'aorta', text: 'The ascending aorta' },
      ],
      answerId: 'left-atrium',
      explanation:
        'The base is the back of the heart, mostly left atrium with its four pulmonary veins and a little right atrium.',
    },
    {
      id: 'apex-beat-site',
      prompt: 'In an adult the apex beat is felt in:',
      options: [
        { id: 'fifth-space', text: 'The left fifth intercostal space, 9 cm from the midline' },
        { id: 'fourth-space', text: 'The left fourth intercostal space in the midclavicular line' },
        {
          id: 'sixth-space',
          text: 'The left sixth intercostal space in the anterior axillary line',
        },
        { id: 'second-space', text: 'The left second intercostal space beside the sternum' },
      ],
      answerId: 'fifth-space',
      explanation:
        'The fourth space in the midclavicular line is where it lies in children under two.',
    },
    {
      id: 'diaphragmatic-surface',
      prompt: 'The diaphragmatic surface of the heart is formed by:',
      options: [
        { id: 'both-ventricles', text: 'Left ventricle two-thirds, right ventricle one-third' },
        { id: 'right-mostly', text: 'Right ventricle two-thirds, left ventricle one-third' },
        { id: 'atria', text: 'Both atria' },
        { id: 'left-only', text: 'The left ventricle alone' },
      ],
      answerId: 'both-ventricles',
      explanation:
        'The posterior interventricular groove crosses it nearer its right edge, marking off the smaller right share.',
    },
  ],
  cards: [
    {
      id: 'heart-borders',
      front: 'Chambers forming the borders of the heart?',
      back: 'Right: right atrium. Left: left ventricle and auricle. Inferior: right ventricle (left ventricle near the apex). Upper: the atria, chiefly left.',
    },
    {
      id: 'sternocostal-surface',
      front: 'What forms the sternocostal surface of the heart?',
      back: 'Mostly the right atrium and right ventricle, with part of the left ventricle and the left auricle.',
    },
    {
      id: 'crux-of-heart',
      front: 'What is the crux of the heart?',
      back: 'The point on the back where the interatrial, coronary and posterior interventricular grooves meet.',
    },
    {
      id: 'superficial-cardiac-dullness',
      front: 'What is the area of superficial cardiac dullness?',
      back: 'The part of the sternocostal surface behind the cardiac notch of the left lung, not covered by lung, dull to percussion.',
    },
    {
      id: 'heart-size',
      front: 'Size, weight and position of the heart?',
      back: 'About 12 × 9 cm, 300 g (men) or 250 g (women); one-third right and two-thirds left of the midline.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 18 Pericardium and Heart', pages: '286–288' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '189–195' },
  ],
};
