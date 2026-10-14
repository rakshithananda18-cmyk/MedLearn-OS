import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  HEART,
  ORGANS_MODEL_CREDIT,
  ORGANS_MODEL_SRC,
  organsParts,
  PHRENIC_CREDIT,
  PHRENIC_PATHS,
  SPINE_FRAME,
} from './thoracic-organs-3d';

// Thorax batch 4. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const svcPulmonaryTrunk: Topic = {
  slug: 'svc-pulmonary-trunk',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Superior vena cava, pulmonary trunk and phrenic nerves',
  summary:
    'How the superior vena cava forms and what happens when it blocks, the pulmonary trunk and its twist round the aorta, and the two phrenic nerves on either side of the heart.',
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
      'Volume 1, Chapter 19 Superior Vena Cava, Aorta and Pulmonary Trunk, pages 310 to 311 and 316 to 318',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: superior mediastinum, veins and nerves, pages 217 to 220 and 223 to 226',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Heart, great vessels and veins in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Superior vena cava: about 7 cm, no valves; formed by the brachiocephalic veins behind the right first costal cartilage, enters the right atrium behind the third.',
    'Each brachiocephalic vein forms behind its sternoclavicular joint from the internal jugular and subclavian veins.',
    'The azygos vein joins the superior vena cava at the second right costal cartilage, just before it enters the pericardium.',
    'Pulmonary trunk: from the infundibulum, divides under the arch at the sternal angle. It lies first in front of the aorta, then to its left; the right pulmonary artery passes behind the aorta.',
    'Phrenic nerves (C3–C5): the right short and vertical along the veins, through the caval opening; the left longer, along the arteries, through the left dome.',
  ],
  visual: {
    kind: 'path',
    // The venous channel to the right atrium, the pulmonary trunk and its branches, and the phrenics.
    diagram: {
      width: 360,
      height: 330,
      nodes: [
        {
          id: 'brachiocephalic-veins',
          label: 'Brachio-\ncephalic\nveins',
          name: 'Right and left brachiocephalic veins',
          x: 50,
          y: 36,
        },
        {
          id: 'superior-vena-cava',
          label: 'Superior\nvena cava',
          name: 'Superior vena cava',
          x: 145,
          y: 30,
        },
        { id: 'right-atrium', label: 'Right\natrium', name: 'Right atrium', x: 235, y: 30 },
        {
          id: 'azygos-vein',
          label: 'Azygos\nvein',
          name: 'Azygos vein, joining from behind',
          x: 145,
          y: 100,
        },
        {
          id: 'pulmonary-trunk',
          label: 'Pulmonary\ntrunk',
          name: 'Pulmonary trunk',
          x: 50,
          y: 180,
        },
        {
          id: 'right-pulmonary-artery',
          label: 'Right\npulmonary',
          name: 'Right pulmonary artery, behind the aorta and SVC',
          x: 145,
          y: 180,
        },
        {
          id: 'left-pulmonary-artery',
          label: 'Left\npulmonary',
          name: 'Left pulmonary artery, joined to the arch by the ligamentum arteriosum',
          x: 225,
          y: 180,
        },
        {
          id: 'phrenic-nerves',
          label: 'Phrenic\nC3–C5',
          name: 'Phrenic nerves, C3 to C5',
          x: 50,
          y: 270,
        },
        {
          id: 'right-phrenic',
          label: 'Right:\nveins',
          name: 'Right phrenic nerve, along the veins to the caval opening',
          x: 145,
          y: 270,
        },
        {
          id: 'left-phrenic',
          label: 'Left:\narteries',
          name: 'Left phrenic nerve, along the arteries to the left dome',
          x: 225,
          y: 270,
        },
        {
          id: 'phrenic-supply',
          label: 'Diaphragm,\npleura,\npericardium',
          name: 'Motor to the diaphragm; sensory from the mediastinal pleura, pericardium and peritoneum',
          x: 305,
          y: 276,
        },
      ],
      edges: [
        { from: 'brachiocephalic-veins', to: 'superior-vena-cava' },
        { from: 'superior-vena-cava', to: 'right-atrium' },
        { from: 'azygos-vein', to: 'superior-vena-cava' },
        { from: 'pulmonary-trunk', to: 'right-pulmonary-artery' },
        { from: 'pulmonary-trunk', to: 'left-pulmonary-artery' },
        { from: 'phrenic-nerves', to: 'right-phrenic' },
        { from: 'phrenic-nerves', to: 'left-phrenic' },
        { from: 'phrenic-nerves', to: 'phrenic-supply' },
      ],
    },
    lesions: [
      {
        id: 'svc-above-azygos',
        label: 'Block above the azygos',
        nodeIds: ['superior-vena-cava', 'azygos-vein'],
        explanation:
          'Blood from the upper body finds its way through the veins round the scapula and the intercostal veins into the azygos, and so into the cava below the block. The chest veins swell down to the costal margin.',
      },
      {
        id: 'svc-below-azygos',
        label: 'Block below the azygos',
        nodeIds: ['superior-vena-cava', 'right-atrium'],
        explanation:
          'Now the azygos cannot help. Blood goes down the body wall through the thoracoepigastric veins to the great saphenous and femoral veins and the inferior vena cava, and veins swell over the chest and abdomen. These are the first signs of the mediastinal syndrome.',
      },
      {
        id: 'phrenic-palsy',
        label: 'Phrenic nerve palsy',
        nodeIds: ['phrenic-nerves', 'left-phrenic'],
        explanation:
          'A mediastinal tumour or injury to the phrenic nerve paralyses its half of the diaphragm, which rises and moves the wrong way on breathing in.',
      },
    ],
    drill: [
      {
        id: 'veins',
        title: 'Superior vena cava',
        hint: 'What forms it, what joins it, and where it ends.',
        nodeIds: ['brachiocephalic-veins', 'azygos-vein', 'right-atrium'],
      },
      {
        id: 'trunk-phrenics',
        title: 'Pulmonary trunk and phrenics',
        hint: 'Two branches of the trunk, then the two phrenic nerves and what they serve.',
        nodeIds: [
          'right-pulmonary-artery',
          'left-pulmonary-artery',
          'right-phrenic',
          'left-phrenic',
          'phrenic-supply',
        ],
      },
    ],
    model3d: {
      src: ORGANS_MODEL_SRC,
      credit: `${ORGANS_MODEL_CREDIT} ${PHRENIC_CREDIT}`,
      parts: organsParts([
        ...SPINE_FRAME,
        ...HEART,
        'superior-vena-cava',
        'brachiocephalic-veins',
        'inferior-vena-cava',
        'azygos-vein',
        'ascending-aorta',
        'arch-of-aorta',
        'brachiocephalic-trunk',
        'pulmonary-trunk',
        'right-pulmonary-artery',
        'left-pulmonary-artery',
        'right-pulmonary-veins',
        'left-pulmonary-veins',
        'trachea',
      ]),
      traces: [
        { id: 'right-phrenic', kind: 'nerve', paths: PHRENIC_PATHS.right },
        { id: 'left-phrenic', kind: 'nerve', paths: PHRENIC_PATHS.left },
      ],
      stops: [
        {
          id: 'front',
          title: 'From the front',
          description:
            'Veins on the right, arteries on the left: the brachiocephalic veins and superior vena cava beside the ascending aorta and pulmonary trunk, a phrenic nerve on each side.',
          target: [5, -115, 1270],
          position: [5, -900, 1300],
        },
        {
          id: 'svc',
          title: 'Superior vena cava',
          description:
            'From the right: the two brachiocephalic veins join behind the first costal cartilage; the azygos arches forward to join the cava, which enters the right atrium behind the third.',
          target: [-15, -112, 1295],
          position: [-700, -400, 1340],
        },
        {
          id: 'pulmonary-trunk',
          title: 'Pulmonary trunk',
          description:
            'From above and in front: the trunk climbs in front of and then to the left of the aorta, and divides under the arch; the right pulmonary artery passes behind the aorta and cava.',
          target: [20, -115, 1275],
          position: [150, -640, 1460],
        },
        {
          id: 'left-phrenic',
          title: 'Left phrenic nerve',
          description:
            'From the left: longer and more oblique than the right, it crosses the arch and runs over the left ventricle to pierce the left dome of the diaphragm.',
          target: [40, -115, 1265],
          position: [760, -300, 1290],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'brachiocephalic',
      title: 'Brachiocephalic veins',
      body: 'Each forms behind its sternoclavicular joint from the internal jugular and subclavian veins. The left is longer and crosses behind the upper manubrium, over the three branches of the arch; the two join behind the lower border of the right first costal cartilage.',
      focus: ['brachiocephalic-veins'],
    },
    {
      id: 'svc',
      title: 'Superior vena cava',
      body: 'About 7 cm long, without valves. It begins behind the right first costal cartilage, enters the pericardium opposite the second and opens into the upper right atrium behind the third. The azygos vein arches over the right lung root to join it at the second cartilage. Its upper half develops from the right anterior cardinal vein, its lower half from the right common cardinal vein.',
      focus: ['superior-vena-cava', 'azygos-vein', 'right-atrium'],
    },
    {
      id: 'svc-relations',
      title: 'Round the superior vena cava',
      body: 'In front: the chest wall, internal thoracic vessels and the edge of the right lung and pleura. Behind: the trachea and right vagus above, the right lung root below. Medially: the ascending aorta and brachiocephalic trunk. Laterally: the right phrenic nerve and the right pleura and lung.',
      focus: ['superior-vena-cava'],
    },
    {
      id: 'pulmonary-trunk',
      title: 'Pulmonary trunk',
      body: 'From the top of the infundibulum of the right ventricle it runs up and to the left, sharing a pericardial sleeve with the ascending aorta in front of the transverse sinus, and divides under the arch at the sternal angle. The two came from one truncus arteriosus, split by a spiral septum, so they twist: the trunk starts in front of the aorta, then lies to its left, and the right pulmonary artery passes behind it.',
      focus: ['pulmonary-trunk', 'right-pulmonary-artery', 'left-pulmonary-artery'],
    },
    {
      id: 'pulmonary-arteries',
      title: 'Pulmonary arteries',
      body: 'The right runs behind the ascending aorta and superior vena cava and in front of the oesophagus into the right lung root, giving an upper lobe branch first. The left runs in front of the descending aorta to the left root; at its start the ligamentum arteriosum ties it to the arch.',
      focus: ['right-pulmonary-artery', 'left-pulmonary-artery'],
    },
    {
      id: 'phrenics',
      title: 'Phrenic nerves',
      body: 'From C3 to C5, motor to the diaphragm and sensory from the mediastinal pleura, pericardium and part of the peritoneum. The right is shorter, vertical and deep: it runs on the venous side (right brachiocephalic vein, superior vena cava, right atrium) and through the caval opening. The left is longer and more oblique: it runs on the arterial side (left subclavian, arch of the aorta, left ventricle) and pierces the left dome. Both pass in front of the lung roots.',
      focus: ['phrenic-nerves', 'right-phrenic', 'left-phrenic', 'phrenic-supply'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each vessel and nerve to light it, then use the views from each side to follow the phrenic nerves down to the diaphragm.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'svc-formed',
      prompt: 'The superior vena cava is formed behind:',
      options: [
        { id: 'right-first', text: 'The lower border of the right first costal cartilage' },
        { id: 'right-sc', text: 'The right sternoclavicular joint' },
        { id: 'right-third', text: 'The right third costal cartilage' },
        { id: 'sternal-angle', text: 'The sternal angle' },
      ],
      answerId: 'right-first',
      explanation:
        'The brachiocephalic veins form behind the sternoclavicular joints; the SVC enters the right atrium behind the third right costal cartilage.',
    },
    {
      id: 'azygos-joins-svc',
      prompt: 'The azygos vein joins the superior vena cava at the level of:',
      options: [
        { id: 'second', text: 'The second right costal cartilage' },
        { id: 'first', text: 'The first right costal cartilage' },
        { id: 'third', text: 'The third right costal cartilage' },
        { id: 'fourth', text: 'The fourth right costal cartilage' },
      ],
      answerId: 'second',
      explanation:
        'Just before the cava enters the pericardium; the azygos arches over the right lung root to get there.',
    },
    {
      id: 'pulmonary-trunk-divides',
      prompt: 'The pulmonary trunk divides:',
      options: [
        { id: 'under-arch', text: 'Under the concavity of the arch, at the sternal angle' },
        { id: 'behind-manubrium', text: 'Behind the upper manubrium' },
        { id: 'at-hilum', text: 'At the hilum of the left lung' },
        { id: 't6', text: 'At the level of T6' },
      ],
      answerId: 'under-arch',
      explanation:
        'The left pulmonary artery there is tied to the arch by the ligamentum arteriosum.',
    },
    {
      id: 'right-phrenic-exit',
      prompt: 'The right phrenic nerve passes through:',
      options: [
        { id: 'caval', text: 'The vena caval opening of the diaphragm' },
        { id: 'oesophageal', text: 'The oesophageal opening' },
        { id: 'aortic', text: 'The aortic opening' },
        { id: 'dome', text: 'The muscle of the right dome directly' },
      ],
      answerId: 'caval',
      explanation: 'The left phrenic pierces the muscle of the left dome.',
    },
  ],
  cards: [
    {
      id: 'right-cartilage-veins',
      front: 'Veins behind the right costal cartilages, 1 to 3?',
      back: 'Behind the 1st: the SVC begins. Behind the 2nd: the azygos ends and the SVC enters the pericardium. Behind the 3rd: the SVC ends in the right atrium.',
    },
    {
      id: 'svc-relations-card',
      front: 'Relations of the superior vena cava?',
      back: 'Front: chest wall, internal thoracic vessels, right lung and pleura. Behind: trachea, right vagus, right lung root. Medial: ascending aorta, brachiocephalic trunk. Lateral: right phrenic nerve, right pleura.',
    },
    {
      id: 'triple-relation',
      front: 'Triple relation of the pulmonary trunk and ascending aorta?',
      back: 'Near the heart the trunk is in front of the aorta; at the upper border it is to the left; above that the right pulmonary artery is behind the aorta.',
    },
    {
      id: 'phrenic-compared',
      front: 'Right and left phrenic nerves compared?',
      back: 'Right: shorter, vertical, along the veins, through the caval opening. Left: longer, oblique, along the arteries, through the left dome.',
    },
    {
      id: 'svc-development',
      front: 'Development of the superior vena cava?',
      back: 'Upper (extrapericardial) half from the right anterior cardinal vein; lower (intrapericardial) half from the right common cardinal vein.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Chapter 19 Superior Vena Cava, Aorta and Pulmonary Trunk',
      pages: '310–311, 316–318',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '217–220, 223–226' },
  ],
};
