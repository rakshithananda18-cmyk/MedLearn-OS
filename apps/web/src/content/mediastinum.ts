import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  HEART,
  OPEN_FRAME,
  ORGANS_MODEL_CREDIT,
  ORGANS_MODEL_SRC,
  organsParts,
  PHRENIC_CREDIT,
  PHRENIC_PATHS,
} from './thoracic-organs-3d';

// Thorax batch 2. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const mediastinum: Topic = {
  slug: 'mediastinum',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Mediastinum: divisions and contents',
  summary:
    'The partition between the two pleural sacs, its four divisions, and what lies in each, from the arch of the aorta to the oesophagus.',
  estimatedMinutes: 15,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 17 Mediastinum, pages 278 to 282'),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: mediastinum, pages 184 to 185',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Cage, heart, great vessels and thymus in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
    {
      title: 'Z-Anatomy',
      detail: 'Pleurae, airways, oesophagus and vagus nerves in the 3D view',
      url: 'https://www.z-anatomy.com/',
      licence: 'CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Boundaries: sternum in front, vertebral column behind, inlet above, diaphragm below, mediastinal pleura at the sides.',
    'A plane from the sternal angle to the lower border of T4 separates the superior from the inferior mediastinum.',
    'The pericardium splits the inferior mediastinum into anterior, middle (the heart) and posterior parts.',
    'Superior: arch and its three branches, brachiocephalic veins and upper SVC, trachea, oesophagus, thymus, vagi, phrenics, left recurrent laryngeal, thoracic duct.',
    'Posterior: oesophagus, descending aorta, azygos and hemiazygos veins, vagi, splanchnic nerves, thoracic duct.',
  ],
  visual: {
    kind: 'path',
    // The partition and its dividing plane, then each division with what it holds.
    diagram: {
      width: 360,
      height: 420,
      nodes: [
        { id: 'mediastinum', label: 'Medi-\nastinum', name: 'Mediastinum', x: 50, y: 30 },
        {
          id: 'sternal-angle-plane',
          label: 'Angle to\nT4 plane',
          name: 'Plane from the sternal angle to the lower border of T4',
          x: 145,
          y: 30,
        },
        {
          id: 'right-pleura',
          label: 'Pleura\neach side',
          name: 'Mediastinal pleura, on each side',
          x: 245,
          y: 30,
        },
        {
          id: 'superior-mediastinum',
          label: 'Superior',
          name: 'Superior mediastinum',
          x: 50,
          y: 110,
        },
        {
          id: 'arch-of-aorta',
          label: 'Arch of\naorta',
          name: 'Arch of the aorta and its three branches',
          x: 145,
          y: 110,
        },
        {
          id: 'brachiocephalic-veins',
          label: 'Great\nveins',
          name: 'Brachiocephalic veins and the upper half of the superior vena cava',
          x: 225,
          y: 110,
        },
        { id: 'trachea', label: 'Trachea', name: 'Trachea', x: 305, y: 110 },
        { id: 'thymus', label: 'Thymus', name: 'Thymus', x: 145, y: 176 },
        { id: 'left-vagus', label: 'Left\nvagus', name: 'Vagus nerves', x: 225, y: 176 },
        { id: 'left-phrenic', label: 'Left\nphrenic', name: 'Phrenic nerves', x: 305, y: 176 },
        {
          id: 'anterior-mediastinum',
          label: 'Anterior',
          name: 'Anterior mediastinum, in front of the pericardium',
          x: 50,
          y: 250,
        },
        { id: 'middle-mediastinum', label: 'Middle', name: 'Middle mediastinum', x: 50, y: 316 },
        { id: 'ventricles', label: 'Heart', name: 'Heart in its pericardium', x: 145, y: 316 },
        {
          id: 'ascending-aorta',
          label: 'Ascending\naorta',
          name: 'Ascending aorta',
          x: 225,
          y: 316,
        },
        {
          id: 'pulmonary-trunk',
          label: 'Pulmonary\ntrunk',
          name: 'Pulmonary trunk and arteries',
          x: 305,
          y: 316,
        },
        {
          id: 'posterior-mediastinum',
          label: 'Posterior',
          name: 'Posterior mediastinum',
          x: 50,
          y: 390,
        },
        { id: 'oesophagus', label: 'Oeso-\nphagus', name: 'Oesophagus', x: 145, y: 390 },
        {
          id: 'descending-aorta',
          label: 'Descending\naorta',
          name: 'Descending thoracic aorta',
          x: 225,
          y: 390,
        },
        { id: 'azygos-vein', label: 'Azygos', name: 'Azygos and hemiazygos veins', x: 305, y: 390 },
      ],
      edges: [
        { from: 'mediastinum', to: 'sternal-angle-plane' },
        { from: 'mediastinum', to: 'right-pleura' },
        { from: 'superior-mediastinum', to: 'arch-of-aorta' },
        { from: 'superior-mediastinum', to: 'brachiocephalic-veins' },
        { from: 'superior-mediastinum', to: 'trachea' },
        { from: 'superior-mediastinum', to: 'thymus' },
        { from: 'superior-mediastinum', to: 'left-vagus' },
        { from: 'superior-mediastinum', to: 'left-phrenic' },
        { from: 'anterior-mediastinum', to: 'thymus' },
        { from: 'middle-mediastinum', to: 'ventricles' },
        { from: 'middle-mediastinum', to: 'ascending-aorta' },
        { from: 'middle-mediastinum', to: 'pulmonary-trunk' },
        { from: 'posterior-mediastinum', to: 'oesophagus' },
        { from: 'posterior-mediastinum', to: 'descending-aorta' },
        { from: 'posterior-mediastinum', to: 'azygos-vein' },
      ],
    },
    lesions: [
      {
        id: 'mediastinal-syndrome',
        label: 'Mediastinal syndrome',
        nodeIds: [
          'superior-mediastinum',
          'brachiocephalic-veins',
          'trachea',
          'oesophagus',
          'left-vagus',
          'left-phrenic',
        ],
        explanation:
          'A mass in the mediastinum (bronchial cancer, enlarged nodes in lymphoma, an aortic aneurysm) presses on what is packed round it: swollen neck and arm veins from a blocked superior vena cava, breathlessness and cough from the trachea, difficulty swallowing from the oesophagus, a hoarse voice from the left recurrent laryngeal nerve, a paralysed half of the diaphragm from the phrenic nerve.',
      },
      {
        id: 'mediastinitis',
        label: 'Mediastinitis',
        nodeIds: ['superior-mediastinum', 'posterior-mediastinum'],
        explanation:
          'Infection in the neck between the pretracheal and prevertebral fasciae can track down into the superior mediastinum and on into the posterior mediastinum. Behind the prevertebral fascia it stops at T4, where the fascia is attached.',
      },
      {
        id: 'right-side-masses',
        label: 'Masses bulge right',
        nodeIds: ['brachiocephalic-veins'],
        explanation:
          'In the superior mediastinum the large veins lie on the right and the arteries on the left. Veins give way, so a tumour or fluid tends to bulge to the right.',
      },
    ],
    drill: [
      {
        id: 'superior',
        title: 'Superior mediastinum',
        hint: 'Vessels, tubes, a gland and the nerves running down beside them.',
        nodeIds: [
          'arch-of-aorta',
          'brachiocephalic-veins',
          'trachea',
          'thymus',
          'left-vagus',
          'left-phrenic',
        ],
      },
      {
        id: 'middle',
        title: 'Middle mediastinum',
        hint: 'The heart and the two great arteries leaving it.',
        nodeIds: ['ventricles', 'ascending-aorta', 'pulmonary-trunk'],
      },
      {
        id: 'posterior',
        title: 'Posterior mediastinum',
        hint: 'A tube, an artery and a vein in front of the vertebrae.',
        nodeIds: ['oesophagus', 'descending-aorta', 'azygos-vein'],
      },
    ],
    model3d: {
      src: ORGANS_MODEL_SRC,
      credit: `${ORGANS_MODEL_CREDIT} ${PHRENIC_CREDIT}`,
      parts: organsParts([
        ...OPEN_FRAME,
        'right-pleura',
        'left-pleura',
        ...HEART,
        'ascending-aorta',
        'arch-of-aorta',
        'descending-aorta',
        'brachiocephalic-trunk',
        'left-common-carotid',
        'left-subclavian-artery',
        'pulmonary-trunk',
        'right-pulmonary-artery',
        'left-pulmonary-artery',
        'right-pulmonary-veins',
        'left-pulmonary-veins',
        'superior-vena-cava',
        'brachiocephalic-veins',
        'inferior-vena-cava',
        'azygos-vein',
        'trachea',
        'right-main-bronchus',
        'left-main-bronchus',
        'thymus',
        'oesophagus',
        'right-vagus',
        'left-vagus',
      ]),
      traces: [
        {
          id: 'left-phrenic',
          kind: 'nerve',
          paths: [...PHRENIC_PATHS.left, ...PHRENIC_PATHS.right],
        },
      ],
      stops: [
        {
          id: 'front',
          title: 'Between the pleural sacs',
          description:
            'With the lungs taken away, the mediastinum stands between the two pleural sacs: the heart below, the great vessels and trachea above.',
          target: [0, -115, 1250],
          position: [0, -1010, 1300],
        },
        {
          id: 'superior',
          title: 'Superior mediastinum',
          description:
            'Behind the manubrium: the thymus in front, then the brachiocephalic veins, the arch of the aorta with its three branches, the trachea, and the oesophagus at the back.',
          target: [0, -110, 1320],
          position: [-180, -740, 1520],
        },
        {
          id: 'right-side',
          title: 'From the right',
          description:
            'The superior vena cava and right atrium in front, the azygos arching over the root, the trachea and oesophagus behind, the right vagus crossing the trachea.',
          target: [-15, -100, 1245],
          position: [-880, -320, 1270],
        },
        {
          id: 'left-side',
          title: 'From the left',
          description:
            'The arch of the aorta over the left root, the left phrenic in front and the left vagus behind crossing it, and the descending aorta running down behind the root.',
          target: [20, -100, 1245],
          position: [880, -320, 1270],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'partition',
      title: 'The middle space',
      body: 'The mediastinum is the thick partition between the two pleural sacs: sternum in front, vertebral column behind, the thoracic inlet above, the diaphragm below and the mediastinal pleura at each side. Its organs are mobile and loosely packed, so fluid, pus or a growth spreads easily in it.',
      focus: ['mediastinum', 'right-pleura'],
    },
    {
      id: 'divisions',
      title: 'Four divisions',
      body: 'A plane through the sternal angle and the lower border of T4 cuts off the superior mediastinum. Below it, the pericardium splits the inferior mediastinum into anterior (in front of it), middle (the pericardium and heart) and posterior (behind it).',
      focus: [
        'sternal-angle-plane',
        'superior-mediastinum',
        'anterior-mediastinum',
        'middle-mediastinum',
        'posterior-mediastinum',
      ],
    },
    {
      id: 'superior',
      title: 'Superior mediastinum',
      body: 'Behind the manubrium, in front of T1 to T4. From front to back: the thymus; the brachiocephalic veins and upper superior vena cava; the arch of the aorta with the brachiocephalic trunk, left common carotid and left subclavian; the trachea; the oesophagus; with the vagus and phrenic nerves, the left recurrent laryngeal nerve, cardiac nerves and the thoracic duct.',
      focus: [
        'superior-mediastinum',
        'arch-of-aorta',
        'brachiocephalic-veins',
        'trachea',
        'thymus',
        'left-vagus',
        'left-phrenic',
      ],
    },
    {
      id: 'anterior',
      title: 'Anterior mediastinum',
      body: 'A narrow slit between the body of the sternum and the pericardium, overlapped by the anterior borders of the lungs. It holds the sternopericardial ligaments, a few nodes, small branches of the internal thoracic artery and the lowest part of the thymus.',
      focus: ['anterior-mediastinum', 'thymus'],
    },
    {
      id: 'middle',
      title: 'Middle mediastinum',
      body: 'The pericardium and heart, with the ascending aorta, the pulmonary trunk and its two arteries, the lower half of the superior vena cava, the end of the azygos vein, the pulmonary veins, the phrenic nerves on the sides of the pericardium, and the deep cardiac plexus.',
      focus: ['middle-mediastinum', 'ventricles', 'ascending-aorta', 'pulmonary-trunk'],
    },
    {
      id: 'posterior',
      title: 'Posterior mediastinum',
      body: 'Behind the pericardium and in front of T5 to T12. It holds the oesophagus with the vagi on it, the descending thoracic aorta, the azygos, hemiazygos and accessory hemiazygos veins, the thoracic duct, posterior mediastinal nodes, and the splanchnic nerves.',
      focus: ['posterior-mediastinum', 'oesophagus', 'descending-aorta', 'azygos-vein'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a division to light what it holds, then view it from each side. Turn on mediastinal syndrome to see what a mass presses on.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'mediastinum-boundary',
      prompt: 'Which of these is not a boundary of the mediastinum?',
      options: [
        { id: 'cervical-vertebrae', text: 'Cervical vertebrae' },
        { id: 'sternum', text: 'Sternum' },
        { id: 'inlet', text: 'Thoracic inlet' },
        { id: 'diaphragm', text: 'Diaphragm' },
      ],
      answerId: 'cervical-vertebrae',
      explanation:
        'Behind it lie the thoracic vertebrae; above it is the inlet, at the level of T1.',
    },
    {
      id: 'superior-inferior-plane',
      prompt:
        'The superior and inferior mediastinum are separated by a plane through the sternal angle and:',
      options: [
        { id: 't4', text: 'The lower border of T4' },
        { id: 't2', text: 'The lower border of T2' },
        { id: 't6', text: 'The upper border of T6' },
        { id: 't8', text: 'The body of T8' },
      ],
      answerId: 't4',
      explanation:
        'The disc between T4 and T5, at the level of the second costal cartilage in front.',
    },
    {
      id: 'middle-mediastinum-content',
      prompt: 'Which lies in the middle mediastinum?',
      options: [
        { id: 'ascending-aorta', text: 'Ascending aorta' },
        { id: 'descending-aorta', text: 'Descending thoracic aorta' },
        { id: 'thoracic-duct', text: 'Thoracic duct' },
        { id: 'arch', text: 'Arch of the aorta' },
      ],
      answerId: 'ascending-aorta',
      explanation:
        'The ascending aorta is inside the pericardium. The arch is in the superior mediastinum, the descending aorta and thoracic duct in the posterior.',
    },
    {
      id: 'hoarse-mediastinal',
      prompt: 'A mediastinal mass causing a hoarse voice is pressing on:',
      options: [
        { id: 'left-recurrent', text: 'The left recurrent laryngeal nerve' },
        { id: 'phrenic', text: 'The phrenic nerve' },
        { id: 'right-recurrent', text: 'The right recurrent laryngeal nerve' },
        { id: 'sympathetic', text: 'The sympathetic trunk' },
      ],
      answerId: 'left-recurrent',
      explanation:
        'The left recurrent laryngeal nerve hooks under the arch of the aorta in the superior mediastinum; the right one turns round the subclavian artery in the neck.',
    },
  ],
  cards: [
    {
      id: 'mediastinum-divisions',
      front: 'Divisions of the mediastinum?',
      back: 'Superior, and inferior split by the pericardium into anterior, middle and posterior.',
    },
    {
      id: 'superior-mediastinum-contents',
      front: 'Contents of the superior mediastinum?',
      back: 'Arch of the aorta and its three branches, brachiocephalic veins and upper SVC, trachea, oesophagus, thymus, vagi, phrenics, left recurrent laryngeal nerve, thoracic duct, nodes.',
    },
    {
      id: 'posterior-mediastinum-contents',
      front: 'Contents of the posterior mediastinum?',
      back: 'Oesophagus, descending aorta, azygos and hemiazygos veins, vagi, splanchnic nerves, thoracic duct, posterior mediastinal nodes.',
    },
    {
      id: 'anterior-mediastinum-contents',
      front: 'Contents of the anterior mediastinum?',
      back: 'Sternopericardial ligaments, lymph nodes, mediastinal branches of the internal thoracic artery and the lowest part of the thymus.',
    },
    {
      id: 'mediastinal-syndrome-signs',
      front: 'Signs of mediastinal syndrome?',
      back: 'Swollen veins (SVC), breathlessness and cough (trachea), difficulty swallowing (oesophagus), hoarseness (left recurrent laryngeal), paralysed hemidiaphragm (phrenic).',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 17 Mediastinum', pages: '278–282' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '184–185' },
  ],
};
