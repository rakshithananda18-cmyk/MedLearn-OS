import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  HEART,
  ORGANS_MODEL_CREDIT,
  ORGANS_MODEL_SRC,
  organsParts,
  PHRENIC_CREDIT,
  PHRENIC_PATHS,
} from './thoracic-organs-3d';

// Thorax batch 3. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const pericardium: Topic = {
  slug: 'pericardium',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Pericardium and its sinuses',
  summary:
    'The fibrous and serous sacs round the heart, the transverse and oblique sinuses between its great vessels, and why pericardial pain and fluid matter.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 18 Pericardium and Heart, pages 283 to 286'),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: pericardium, pages 185 to 189',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Heart and great vessels in the 3D view (the model has no pericardium)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Fibrous pericardium: a tough cone, its apex fused with the great vessels at the sternal angle, its base blended with the central tendon of the diaphragm.',
    'Serous pericardium: parietal layer lining the fibrous sac, visceral layer (epicardium) on the heart, a film of fluid between.',
    'Transverse sinus: behind the aorta and pulmonary trunk, in front of the superior vena cava, above the left atrium.',
    'Oblique sinus: a cul-de-sac behind the left atrium, in front of the oesophagus.',
    'Fibrous and parietal layers: phrenic nerves, painful. Epicardium: autonomic, painless.',
  ],
  visual: {
    kind: 'path',
    // The layers and what holds the sac, the cavity with its two sinuses and their walls, the nerves.
    diagram: {
      width: 360,
      height: 380,
      nodes: [
        { id: 'pericardium', label: 'Peri-\ncardium', name: 'Pericardium', x: 50, y: 30 },
        { id: 'fibrous', label: 'Fibrous', name: 'Fibrous pericardium', x: 145, y: 30 },
        {
          id: 'parietal-serous',
          label: 'Parietal\nserous',
          name: 'Parietal layer of serous pericardium',
          x: 225,
          y: 30,
        },
        {
          id: 'epicardium',
          label: 'Epi-\ncardium',
          name: 'Visceral layer of serous pericardium (epicardium)',
          x: 305,
          y: 30,
        },
        {
          id: 'great-vessels',
          label: 'Great\nvessels',
          name: 'Apex fused with the great vessels and pretracheal fascia',
          x: 145,
          y: 106,
        },
        {
          id: 'central-tendon',
          label: 'Central\ntendon',
          name: 'Base blended with the central tendon of the diaphragm',
          x: 225,
          y: 106,
        },
        {
          id: 'sternopericardial',
          label: 'Sterno-\npericardial',
          name: 'Sternopericardial ligaments to the body of the sternum',
          x: 305,
          y: 106,
        },
        { id: 'pericardial-cavity', label: 'Cavity', name: 'Pericardial cavity', x: 50, y: 186 },
        {
          id: 'transverse-sinus',
          label: 'Transverse\nsinus',
          name: 'Transverse sinus, between the arterial and venous ends',
          x: 145,
          y: 186,
        },
        {
          id: 'oblique-sinus',
          label: 'Oblique\nsinus',
          name: 'Oblique sinus, behind the left atrium',
          x: 225,
          y: 186,
        },
        {
          id: 'ascending-aorta',
          label: 'Aorta,\ntrunk\nin front',
          name: 'Ascending aorta and pulmonary trunk, in front of the transverse sinus',
          x: 105,
          y: 262,
        },
        {
          id: 'superior-vena-cava',
          label: 'SVC\nbehind',
          name: 'Superior vena cava, behind the transverse sinus',
          x: 185,
          y: 256,
        },
        {
          id: 'left-atrium',
          label: 'Left\natrium',
          name: 'Left atrium: below the transverse sinus, in front of the oblique sinus',
          x: 260,
          y: 256,
        },
        {
          id: 'oesophagus',
          label: 'Oeso-\nphagus\nbehind',
          name: 'Oesophagus, behind the oblique sinus',
          x: 330,
          y: 262,
        },
        { id: 'nerve-supply', label: 'Nerves', name: 'Nerve supply', x: 50, y: 346 },
        {
          id: 'phrenic-nerves',
          label: 'Phrenic',
          name: 'Phrenic nerves: fibrous and parietal layers, sensitive to pain',
          x: 145,
          y: 346,
        },
        {
          id: 'autonomic',
          label: 'Autonomic',
          name: 'Autonomic nerves of the heart: epicardium, insensitive to pain',
          x: 235,
          y: 346,
        },
      ],
      edges: [
        { from: 'pericardium', to: 'fibrous' },
        { from: 'pericardium', to: 'parietal-serous' },
        { from: 'pericardium', to: 'epicardium' },
        { from: 'fibrous', to: 'great-vessels' },
        { from: 'fibrous', to: 'central-tendon' },
        { from: 'fibrous', to: 'sternopericardial' },
        { from: 'pericardial-cavity', to: 'transverse-sinus' },
        { from: 'pericardial-cavity', to: 'oblique-sinus' },
        { from: 'transverse-sinus', to: 'ascending-aorta' },
        { from: 'transverse-sinus', to: 'superior-vena-cava' },
        { from: 'transverse-sinus', to: 'left-atrium' },
        { from: 'oblique-sinus', to: 'left-atrium' },
        { from: 'oblique-sinus', to: 'oesophagus' },
        { from: 'nerve-supply', to: 'phrenic-nerves' },
        { from: 'nerve-supply', to: 'autonomic' },
      ],
    },
    lesions: [
      {
        id: 'tamponade',
        label: 'Cardiac tamponade',
        nodeIds: ['pericardial-cavity', 'fibrous'],
        explanation:
          'Fluid or blood in the pericardial cavity cannot stretch the tough fibrous sac, so it squeezes the heart: the atria cannot fill, output falls and the neck veins swell. It is drained through the left fifth or sixth space beside the sternum, or from below the xiphoid with the needle aimed up, back and to the left.',
      },
      {
        id: 'pericarditis',
        label: 'Pericarditis',
        nodeIds: ['parietal-serous', 'phrenic-nerves'],
        explanation:
          'The pain comes from the parietal layer, which the phrenic nerves supply, so it can be felt at the shoulder tip; the epicardium itself feels nothing. Angina, by contrast, comes from the heart muscle.',
      },
      {
        id: 'ligature',
        label: 'Clamping the great arteries',
        nodeIds: ['transverse-sinus', 'ascending-aorta'],
        explanation:
          'In heart surgery a finger or ligature passed through the transverse sinus goes round the aorta and pulmonary trunk together, so both can be clamped before the patient goes on bypass.',
      },
    ],
    drill: [
      {
        id: 'layers',
        title: 'Layers',
        hint: 'One tough sac, and the two layers of a serous one.',
        nodeIds: ['fibrous', 'parietal-serous', 'epicardium'],
      },
      {
        id: 'sinuses',
        title: 'Sinuses',
        hint: 'Two recesses of the cavity and the walls that bound them.',
        nodeIds: [
          'transverse-sinus',
          'oblique-sinus',
          'ascending-aorta',
          'superior-vena-cava',
          'left-atrium',
          'oesophagus',
        ],
      },
    ],
    model3d: {
      src: ORGANS_MODEL_SRC,
      credit: `${ORGANS_MODEL_CREDIT} ${PHRENIC_CREDIT}`,
      parts: organsParts([
        'diaphragm',
        ...HEART,
        'ascending-aorta',
        'arch-of-aorta',
        'descending-aorta',
        'pulmonary-trunk',
        'right-pulmonary-artery',
        'left-pulmonary-artery',
        'right-pulmonary-veins',
        'left-pulmonary-veins',
        'superior-vena-cava',
        'inferior-vena-cava',
        'oesophagus',
      ]),
      traces: [
        {
          id: 'phrenic-nerves',
          kind: 'nerve',
          paths: [...PHRENIC_PATHS.right, ...PHRENIC_PATHS.left],
        },
      ],
      stops: [
        {
          id: 'front',
          title: 'Heart in the middle mediastinum',
          description:
            'The pericardium wraps the heart and the roots of the great vessels; its base sits on the diaphragm and the phrenic nerves run down its sides.',
          target: [15, -125, 1235],
          position: [15, -860, 1270],
        },
        {
          id: 'transverse',
          title: 'Transverse sinus',
          description:
            'From above: the gap behind the ascending aorta and pulmonary trunk and in front of the superior vena cava and left atrium, open at both ends.',
          target: [5, -118, 1270],
          position: [-160, -600, 1520],
        },
        {
          id: 'oblique',
          title: 'Oblique sinus',
          description:
            'From behind: the cul-de-sac between the left atrium with its four pulmonary veins and the oesophagus, which lets the atrium pulsate freely.',
          target: [20, -100, 1225],
          position: [70, 620, 1160],
        },
        {
          id: 'left',
          title: 'From the left',
          description:
            'The left phrenic nerve runs down over the pericardium of the left ventricle to the diaphragm, which it and the right phrenic supply.',
          target: [20, -120, 1230],
          position: [760, -310, 1250],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'sac',
      title: 'A double sac',
      body: 'The pericardium is a fibroserous sac round the heart and the roots of the great vessels, in the middle mediastinum. As the heart grows it pushes into a serous sac without breaking it, and a tough fibrous sac surrounds the whole. It stops the heart overfilling.',
      focus: ['pericardium'],
    },
    {
      id: 'fibrous',
      title: 'Fibrous pericardium',
      body: 'A cone of tough fibrous tissue. Its blunt apex, at the sternal angle, fuses with the great vessels and the pretracheal fascia; its broad base blends with the central tendon of the diaphragm. Weak sternopericardial ligaments tie it to the sternum. At its sides lie the pleura, lungs and phrenic nerves; behind, the principal bronchi, oesophagus and descending aorta.',
      focus: ['fibrous', 'great-vessels', 'central-tendon', 'sternopericardial'],
    },
    {
      id: 'serous',
      title: 'Serous pericardium',
      body: 'Its parietal layer lines the fibrous sac; its visceral layer, the epicardium, covers the heart. The two meet round the roots of the aorta, pulmonary trunk, venae cavae and pulmonary veins, and enclose the pericardial cavity, a film of fluid that lets the heart beat smoothly.',
      focus: ['parietal-serous', 'epicardium', 'pericardial-cavity'],
    },
    {
      id: 'transverse',
      title: 'Transverse sinus',
      body: 'The epicardium wraps the aorta and pulmonary trunk in one tube and the veins in another. The passage between the two tubes is the transverse sinus: the ascending aorta and pulmonary trunk in front, the superior vena cava behind, the left atrium below, open to the cavity at each side.',
      focus: ['transverse-sinus', 'ascending-aorta', 'superior-vena-cava', 'left-atrium'],
    },
    {
      id: 'oblique',
      title: 'Oblique sinus',
      body: 'A cul-de-sac behind the heart, walled off by the pericardial reflections round the pulmonary veins and inferior vena cava: the left atrium in front, the parietal pericardium and oesophagus behind, open below and to the left. It lets the left atrium pulsate.',
      focus: ['oblique-sinus', 'left-atrium', 'oesophagus'],
    },
    {
      id: 'supply',
      title: 'Nerves and vessels',
      body: 'The fibrous and parietal layers are supplied by the phrenic nerves and feel pain; the epicardium has the heart’s autonomic nerves and does not. Their arteries come from the internal thoracic, musculophrenic and descending aorta. The fibrous pericardium develops from the septum transversum.',
      focus: ['nerve-supply', 'phrenic-nerves', 'autonomic'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'The model has no pericardium: imagine it round the heart and the vessel roots. Use the guided views to find the gap of each sinus, then turn on tamponade.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'transverse-sinus-front',
      prompt: 'In front of the transverse sinus lie:',
      options: [
        { id: 'aorta-trunk', text: 'The ascending aorta and pulmonary trunk' },
        { id: 'svc', text: 'The superior vena cava' },
        { id: 'left-atrium', text: 'The left atrium' },
        { id: 'pulmonary-veins', text: 'The pulmonary veins' },
      ],
      answerId: 'aorta-trunk',
      explanation: 'The superior vena cava is behind it and the left atrium below.',
    },
    {
      id: 'oblique-sinus-front',
      prompt: 'The oblique sinus lies directly behind:',
      options: [
        { id: 'left-atrium', text: 'The left atrium' },
        { id: 'right-atrium', text: 'The right atrium' },
        { id: 'left-ventricle', text: 'The left ventricle' },
        { id: 'pulmonary-trunk', text: 'The pulmonary trunk' },
      ],
      answerId: 'left-atrium',
      explanation:
        'The oesophagus lies behind the sinus, so an enlarged left atrium can press on it.',
    },
    {
      id: 'pericardium-nerve',
      prompt: 'Pain from the fibrous and parietal pericardium travels in:',
      options: [
        { id: 'phrenic', text: 'The phrenic nerves' },
        { id: 'vagus', text: 'The vagus nerves' },
        { id: 'intercostal', text: 'The intercostal nerves' },
        { id: 'cardiac', text: 'The sympathetic cardiac nerves' },
      ],
      answerId: 'phrenic',
      explanation: 'The epicardium has only autonomic nerves and is not sensitive to pain.',
    },
    {
      id: 'fibrous-base',
      prompt: 'The base of the fibrous pericardium blends with:',
      options: [
        { id: 'central-tendon', text: 'The central tendon of the diaphragm' },
        { id: 'pretracheal', text: 'The pretracheal fascia' },
        { id: 'sternum', text: 'The body of the sternum' },
        { id: 'arch', text: 'The arch of the aorta' },
      ],
      answerId: 'central-tendon',
      explanation:
        'Its apex fuses with the great vessels and the pretracheal fascia; the sternopericardial ligaments are weak bands to the sternum.',
    },
  ],
  cards: [
    {
      id: 'pericardium-layers',
      front: 'Layers of the pericardium?',
      back: 'Fibrous pericardium outside; serous pericardium inside, with a parietal layer on the fibrous sac and a visceral layer (epicardium) on the heart.',
    },
    {
      id: 'transverse-sinus-walls',
      front: 'Boundaries of the transverse sinus?',
      back: 'In front: ascending aorta and pulmonary trunk. Behind: superior vena cava. Below: left atrium. Open at each side.',
    },
    {
      id: 'pericardium-contents',
      front: 'Contents of the pericardium?',
      back: 'Heart, ascending aorta, pulmonary trunk, lower half of the SVC, the end of the IVC and the ends of the pulmonary veins.',
    },
    {
      id: 'pericardiocentesis',
      front: 'Where is fluid drawn from the pericardium?',
      back: 'Left fifth or sixth space beside the sternum, or below the xiphoid with the needle up, back and to the left.',
    },
    {
      id: 'pericardium-arteries',
      front: 'Arteries of the fibrous and parietal pericardium?',
      back: 'Internal thoracic, musculophrenic and descending thoracic aorta.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 18 Pericardium and Heart', pages: '283–286' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '185–189' },
  ],
};
