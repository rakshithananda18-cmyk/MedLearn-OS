import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  CONDUCTION_PATHS,
  HEART_FRONT,
  HEART_MODEL_CREDIT,
  HEART_MODEL_SRC,
  heartParts,
  SCHEMATIC_CREDIT,
  WALLS,
} from './heart-3d';

// Thorax batch 3. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const heartValvesConduction: Topic = {
  slug: 'heart-valves-conduction',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Valves, fibrous skeleton and conducting system',
  summary:
    'The two atrioventricular and two semilunar valves and what keeps them shut, the fibrous rings they hang from, and the path of each heartbeat from the SA node to the Purkinje fibres.',
  estimatedMinutes: 15,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 18 Pericardium and Heart, pages 294 to 298'),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: valves, cardiac skeleton and conduction system, pages 197 to 202 and 211 to 213',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Heart walls, valves and papillary muscles in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Tricuspid: three cusps, admits three fingers. Mitral: two cusps (large anterior, small posterior), admits two.',
    'Chordae tendineae and papillary muscles keep the AV cusps from turning inside out in systole.',
    'Semilunar valves: three cusps each, no fibrous ring; the coronary arteries arise from the anterior and left posterior aortic sinuses.',
    'First heart sound: AV valves closing. Second: semilunar valves closing.',
    'SA node (pacemaker, 70–100/min) → AV node (40–60) → bundle of His → right and left branches → Purkinje fibres. The right coronary supplies nearly all of it.',
  ],
  visual: {
    kind: 'path',
    // The valves and what holds them, the fibrous skeleton, and the conducting system in order.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        { id: 'av-valves', label: 'AV\nvalves', name: 'Atrioventricular valves', x: 50, y: 30 },
        {
          id: 'tricuspid-valve',
          label: 'Tricuspid',
          name: 'Tricuspid valve: anterior, posterior and septal cusps',
          x: 145,
          y: 30,
        },
        {
          id: 'mitral-valve',
          label: 'Mitral',
          name: 'Mitral valve: anterior (aortic) and posterior cusps',
          x: 225,
          y: 30,
        },
        {
          id: 'chordae-tendineae',
          label: 'Chordae\ntendineae',
          name: 'Chordae tendineae and papillary muscles',
          x: 305,
          y: 30,
        },
        { id: 'semilunar-valves', label: 'Semi-\nlunar', name: 'Semilunar valves', x: 50, y: 100 },
        {
          id: 'pulmonary-valve',
          label: 'Pulmonary',
          name: 'Pulmonary valve, three cusps',
          x: 145,
          y: 100,
        },
        { id: 'aortic-valve', label: 'Aortic', name: 'Aortic valve, three cusps', x: 225, y: 100 },
        {
          id: 'aortic-sinuses',
          label: 'Aortic\nsinuses',
          name: 'Aortic sinuses, behind the cusps, giving the coronary arteries',
          x: 305,
          y: 100,
        },
        {
          id: 'fibrous-skeleton',
          label: 'Fibrous\nskeleton',
          name: 'Fibrous skeleton of the heart',
          x: 50,
          y: 180,
        },
        {
          id: 'fibrous-rings',
          label: 'Fibrous\nrings',
          name: 'Fibrous rings round the AV orifices, in a figure of eight',
          x: 145,
          y: 180,
        },
        {
          id: 'fibrous-trigones',
          label: 'Trigones',
          name: 'Right and left fibrous trigones',
          x: 225,
          y: 180,
        },
        {
          id: 'conducting-system',
          label: 'Conducting\nsystem',
          name: 'Conducting system',
          x: 50,
          y: 264,
        },
        { id: 'sa-node', label: 'SA node', name: 'Sinuatrial node, the pacemaker', x: 145, y: 264 },
        { id: 'av-node', label: 'AV node', name: 'Atrioventricular node', x: 225, y: 264 },
        {
          id: 'av-bundle',
          label: 'Bundle\nof His',
          name: 'Atrioventricular bundle (bundle of His)',
          x: 305,
          y: 264,
        },
        {
          id: 'right-bundle-branch',
          label: 'Right\nbranch',
          name: 'Right branch, through the moderator band',
          x: 185,
          y: 336,
        },
        {
          id: 'left-bundle-branch',
          label: 'Left\nbranch',
          name: 'Left branch, down the left side of the septum',
          x: 255,
          y: 336,
        },
        {
          id: 'purkinje',
          label: 'Purkinje',
          name: 'Purkinje fibres under the endocardium',
          x: 320,
          y: 336,
        },
      ],
      edges: [
        { from: 'av-valves', to: 'tricuspid-valve' },
        { from: 'av-valves', to: 'mitral-valve' },
        { from: 'av-valves', to: 'chordae-tendineae' },
        { from: 'semilunar-valves', to: 'pulmonary-valve' },
        { from: 'semilunar-valves', to: 'aortic-valve' },
        { from: 'semilunar-valves', to: 'aortic-sinuses' },
        { from: 'fibrous-skeleton', to: 'fibrous-rings' },
        { from: 'fibrous-skeleton', to: 'fibrous-trigones' },
        { from: 'conducting-system', to: 'sa-node' },
        { from: 'sa-node', to: 'av-node' },
        { from: 'av-node', to: 'av-bundle' },
        { from: 'av-bundle', to: 'right-bundle-branch' },
        { from: 'av-bundle', to: 'left-bundle-branch' },
        { from: 'av-bundle', to: 'purkinje' },
      ],
    },
    lesions: [
      {
        id: 'mitral-stenosis',
        label: 'Mitral stenosis',
        nodeIds: ['mitral-valve'],
        explanation:
          'Fused cusps narrow the orifice. The left atrium has to push harder and swells; it can press on the oesophagus behind it, and the back pressure reaches the lungs.',
      },
      {
        id: 'aortic-regurgitation',
        label: 'Aortic regurgitation',
        nodeIds: ['aortic-valve', 'aortic-sinuses'],
        explanation:
          'A widened orifice or stiff cusps cannot close, so blood falls back into the left ventricle in diastole: incompetence, or regurgitation.',
      },
      {
        id: 'heart-block',
        label: 'Heart block',
        nodeIds: ['av-node', 'av-bundle'],
        explanation:
          'The right coronary artery supplies almost all of the conducting system, including the AV node through its posterior interventricular branch, so a block in it can stop impulses reaching the ventricles; they then beat slowly on their own rhythm.',
      },
    ],
    drill: [
      {
        id: 'valves',
        title: 'Valves',
        hint: 'Two between atria and ventricles, two at the exits, and what holds the first pair.',
        nodeIds: [
          'tricuspid-valve',
          'mitral-valve',
          'chordae-tendineae',
          'pulmonary-valve',
          'aortic-valve',
          'aortic-sinuses',
        ],
      },
      {
        id: 'conduction',
        title: 'Conducting system',
        hint: 'Follow one beat from the pacemaker to the ventricular muscle.',
        nodeIds: [
          'sa-node',
          'av-node',
          'av-bundle',
          'right-bundle-branch',
          'left-bundle-branch',
          'purkinje',
        ],
      },
    ],
    model3d: {
      src: HEART_MODEL_SRC,
      credit: `${HEART_MODEL_CREDIT} ${SCHEMATIC_CREDIT}`,
      parts: heartParts([
        ...WALLS,
        'tricuspid-valve',
        'mitral-valve',
        'pulmonary-valve',
        'aortic-valve',
        'right-papillary-muscles',
        'left-papillary-muscles',
        'ascending-aorta',
        'pulmonary-trunk',
        'superior-vena-cava',
        'inferior-vena-cava',
        'coronary-sinus',
      ]),
      traces: [
        { id: 'sa-node', kind: 'nerve', paths: CONDUCTION_PATHS['sa-node'] },
        { id: 'av-node', kind: 'nerve', paths: CONDUCTION_PATHS['av-node'] },
        { id: 'av-bundle', kind: 'nerve', paths: CONDUCTION_PATHS['av-bundle'] },
        {
          id: 'right-bundle-branch',
          kind: 'nerve',
          paths: CONDUCTION_PATHS['right-bundle-branch'],
        },
        { id: 'left-bundle-branch', kind: 'nerve', paths: CONDUCTION_PATHS['left-bundle-branch'] },
      ],
      stops: [
        {
          ...HEART_FRONT,
          description:
            'Through the see-through walls: the pulmonary valve highest and furthest forward, the aortic valve behind and to its right, the tricuspid and mitral valves lower down.',
        },
        {
          id: 'valves-above',
          title: 'Valves from above',
          description:
            'From above, through the atria: the four valves sit close together on the fibrous skeleton, the pulmonary valve highest and furthest forward.',
          target: [15, -128, 1235],
          position: [-60, -380, 1560],
        },
        {
          id: 'conduction-right',
          title: 'Conducting system',
          description:
            'From the right: the SA node where the superior vena cava meets the right atrium, the AV node above the coronary sinus, and the bundle running into the septum.',
          target: [8, -125, 1225],
          position: [-470, -380, 1265],
        },
        {
          id: 'bundle-branches',
          title: 'Bundle branches',
          description:
            'From the front and left: a branch down each side of the septum towards the apex, the right one crossing in the moderator band to the anterior papillary muscle.',
          target: [28, -138, 1205],
          position: [320, -540, 1260],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'av-valves',
      title: 'Atrioventricular valves',
      body: 'Each has a fibrous ring, flat cusps hanging into the ventricle, chordae tendineae from the cusps’ free edges and ventricular surfaces, and papillary muscles. In systole the cusps meet along their rough edges; the papillary muscles contract and pull on the chordae so the cusps cannot balloon back into the atrium.',
      focus: ['av-valves', 'chordae-tendineae'],
    },
    {
      id: 'tricuspid-mitral',
      title: 'Tricuspid and mitral',
      body: 'The tricuspid valve has anterior, posterior and septal cusps and admits three fingertips; each papillary muscle holds the touching halves of two cusps. The mitral valve has a large anterior (aortic) cusp lying between the mitral and aortic orifices and a small posterior cusp; it admits two fingertips. Only the base of each cusp has vessels; the rest is fed from the blood.',
      focus: ['tricuspid-valve', 'mitral-valve'],
    },
    {
      id: 'semilunar',
      title: 'Semilunar valves',
      body: 'The pulmonary and aortic valves each have three half-moon cusps fixed straight to the wall, with no fibrous ring. Each cusp is a pocket opening away from the ventricle, with a nodule in the middle of its free edge and a thin lunule either side. In diastole the pockets fill and shut. Behind the cusps the wall bulges into sinuses; the coronary arteries arise from the anterior and left posterior aortic sinuses.',
      focus: ['semilunar-valves', 'pulmonary-valve', 'aortic-valve', 'aortic-sinuses'],
    },
    {
      id: 'sounds',
      title: 'Heart sounds',
      body: 'The first sound is the AV valves closing as the ventricles contract; the second is the semilunar valves closing as they relax. A valve that will not open fully is stenosed; one that will not close is incompetent, letting blood regurgitate.',
      focus: [],
    },
    {
      id: 'skeleton',
      title: 'Fibrous skeleton',
      body: 'The fibrous rings round the AV orifices, shaped like a figure of eight, with the rings of the aortic and pulmonary orifices and the fibrous trigones between them. Atrial and ventricular muscle both attach to it, but nowhere cross it except through the AV bundle, so the atria and ventricles beat in turn. It also keeps the valves in shape.',
      focus: ['fibrous-skeleton', 'fibrous-rings', 'fibrous-trigones'],
    },
    {
      id: 'conduction',
      title: 'Conducting system',
      body: 'Specialised heart muscle. The horseshoe-shaped SA node at the top of the sulcus terminalis fires at 70 to 100 a minute and sets the pace. The impulse spreads through the atria to the AV node, low in the atrial septum just above the coronary sinus opening. The AV bundle of His, the only muscular link across the fibrous skeleton, runs along the membranous septum and splits at the muscular septum into a right branch, mostly through the moderator band, and a left branch. Purkinje fibres spread under the endocardium.',
      focus: [
        'conducting-system',
        'sa-node',
        'av-node',
        'av-bundle',
        'right-bundle-branch',
        'left-bundle-branch',
        'purkinje',
      ],
    },
    {
      id: 'supply',
      title: 'Blood supply of the conducting system',
      body: 'The right coronary artery supplies all of it except part of the left bundle branch. The SA node artery comes from the right coronary in about 60% of hearts and the left in 40%.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each part of the conducting system to light its path; switch the walls off in Layers to see the valves clearly.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'first-heart-sound',
      prompt: 'The first heart sound is produced by closure of:',
      options: [
        { id: 'av', text: 'The atrioventricular valves' },
        { id: 'semilunar', text: 'The semilunar valves' },
        { id: 'aortic', text: 'The aortic valve alone' },
        { id: 'eustachian', text: 'The valve of the inferior vena cava' },
      ],
      answerId: 'av',
      explanation: 'The second sound is the semilunar valves closing.',
    },
    {
      id: 'conduction-supply',
      prompt: 'Most of the conducting system is supplied by:',
      options: [
        { id: 'rca', text: 'The right coronary artery' },
        { id: 'lad', text: 'The anterior interventricular artery' },
        { id: 'circumflex', text: 'The circumflex artery' },
        { id: 'internal-thoracic', text: 'The internal thoracic artery' },
      ],
      answerId: 'rca',
      explanation:
        'Everything except part of the left bundle branch, which the left coronary supplies.',
    },
    {
      id: 'mitral-cusps',
      prompt: 'The mitral valve has:',
      options: [
        { id: 'two', text: 'Two cusps, anterior and posterior' },
        { id: 'three', text: 'Three cusps, like the tricuspid' },
        { id: 'semilunar', text: 'Three semilunar cusps' },
        { id: 'one', text: 'One cusp and a fibrous ring' },
      ],
      answerId: 'two',
      explanation: 'The large anterior (aortic) cusp lies between the mitral and aortic orifices.',
    },
    {
      id: 'pacemaker-site',
      prompt: 'The SA node lies:',
      options: [
        {
          id: 'sulcus-terminalis',
          text: 'At the upper end of the sulcus terminalis, where the SVC meets the right atrium',
        },
        { id: 'septum', text: 'In the lower interatrial septum above the coronary sinus' },
        { id: 'moderator', text: 'In the moderator band' },
        { id: 'membranous', text: 'In the membranous interventricular septum' },
      ],
      answerId: 'sulcus-terminalis',
      explanation:
        'The AV node is the one low in the atrial septum just above the opening of the coronary sinus.',
    },
  ],
  cards: [
    {
      id: 'valve-cusps',
      front: 'Number of cusps in each heart valve?',
      back: 'Tricuspid 3, mitral 2, pulmonary 3, aortic 3.',
    },
    {
      id: 'av-valve-parts',
      front: 'Parts of an atrioventricular valve complex?',
      back: 'Fibrous ring, cusps, chordae tendineae and papillary muscles.',
    },
    {
      id: 'conduction-order',
      front: 'Order of the conducting system?',
      back: 'SA node → atrial muscle → AV node → AV bundle (His) → right and left branches → Purkinje fibres.',
    },
    {
      id: 'conduction-rates',
      front: 'Intrinsic rates of the SA node, AV node and Purkinje fibres?',
      back: 'SA 70–100, AV 40–60, Purkinje 20–35 beats a minute.',
    },
    {
      id: 'fibrous-skeleton-role',
      front: 'What does the fibrous skeleton of the heart do?',
      back: 'Anchors the cardiac muscle and valves, keeps the valves competent, and insulates the atria from the ventricles except through the AV bundle.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 18 Pericardium and Heart', pages: '294–298' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '197–202, 211–213' },
  ],
};
