import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  DUCT_NERVE_CREDIT,
  ORGANS_MODEL_CREDIT,
  ORGANS_MODEL_SRC,
  organsParts,
  RECURRENT_LARYNGEAL_PATHS,
  SPINE_FRAME,
} from './thoracic-organs-3d';

// Thorax batch 4. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const trachea: Topic = {
  slug: 'trachea',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Trachea',
  summary:
    'The windpipe from C6 to its bifurcation: its rings and trachealis, what lies round its thoracic part, its supply, and why its position matters at the bedside.',
  estimatedMinutes: 11,
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
      'Volume 1, Chapter 20 Trachea, Oesophagus and Thoracic Duct, pages 321 to 323',
    ),
    bookSource('grays-anatomy', 'Chapter 3 Thorax, regional anatomy: trachea, pages 222 to 223'),
    {
      title: 'Z-Anatomy',
      detail: 'Trachea, bronchi, oesophagus and vagus nerves in the 3D view',
      url: 'https://www.z-anatomy.com/',
      licence: 'CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The trachea runs from the lower border of the cricoid (C6) to its bifurcation at the lower border of T4 in the cadaver (about T6 standing, lower on breathing in).',
    '10 to 15 cm long, about 2 cm wide; 16 to 20 C-shaped cartilage rings, open behind where the trachealis muscle closes the gap.',
    'In front of its thoracic part: manubrium, thymus remains, left brachiocephalic vein, arch of the aorta, brachiocephalic and left common carotid arteries.',
    'Behind: oesophagus. Right: lung, right vagus, azygos. Left: arch and its left branches, left recurrent laryngeal nerve.',
    'Supply: inferior thyroid arteries; veins to the left brachiocephalic; vagus and recurrent laryngeal nerves.',
  ],
  visual: {
    kind: 'path',
    // The tube itself, what lies in front, behind and beside it, and where it divides.
    diagram: {
      width: 360,
      height: 300,
      nodes: [
        { id: 'trachea', label: 'Trachea', name: 'Trachea', x: 50, y: 30 },
        {
          id: 'extent',
          label: 'C6 to T4',
          name: 'From C6 to the lower border of T4',
          x: 145,
          y: 30,
        },
        {
          id: 'c-rings',
          label: 'C-shaped\nrings',
          name: '16 to 20 C-shaped hyaline rings',
          x: 225,
          y: 30,
        },
        {
          id: 'trachealis',
          label: 'Trachealis',
          name: 'Trachealis, smooth muscle closing the rings behind',
          x: 305,
          y: 30,
        },
        { id: 'in-front', label: 'In front', name: 'Anterior relations', x: 50, y: 110 },
        {
          id: 'arch-of-aorta',
          label: 'Arch and\nbranches',
          name: 'Arch of the aorta, brachiocephalic and left common carotid arteries',
          x: 145,
          y: 110,
        },
        {
          id: 'brachiocephalic-veins',
          label: 'Left brachio-\ncephalic vein',
          name: 'Left brachiocephalic vein',
          x: 230,
          y: 110,
        },
        { id: 'thymus', label: 'Thymus', name: 'Remains of the thymus', x: 310, y: 110 },
        {
          id: 'behind-beside',
          label: 'Behind and\nbeside',
          name: 'Posterior and lateral relations',
          x: 50,
          y: 190,
        },
        {
          id: 'oesophagus',
          label: 'Oesophagus\nbehind',
          name: 'Oesophagus, behind',
          x: 145,
          y: 190,
        },
        {
          id: 'azygos-vein',
          label: 'Azygos,\nright vagus',
          name: 'Azygos vein and right vagus, on the right',
          x: 235,
          y: 190,
        },
        {
          id: 'left-recurrent-laryngeal',
          label: 'Left\nrecurrent',
          name: 'Left recurrent laryngeal nerve, on the left in the groove with the oesophagus',
          x: 315,
          y: 190,
        },
        {
          id: 'bifurcation',
          label: 'Bifurcation',
          name: 'Bifurcation of the trachea',
          x: 50,
          y: 270,
        },
        {
          id: 'right-main-bronchus',
          label: 'Right\nbronchus',
          name: 'Right principal bronchus',
          x: 145,
          y: 270,
        },
        {
          id: 'left-main-bronchus',
          label: 'Left\nbronchus',
          name: 'Left principal bronchus',
          x: 225,
          y: 270,
        },
        {
          id: 'carina',
          label: 'Carina',
          name: 'Carina, the ridge inside the bifurcation',
          x: 305,
          y: 270,
        },
      ],
      edges: [
        { from: 'trachea', to: 'extent' },
        { from: 'trachea', to: 'c-rings' },
        { from: 'trachea', to: 'trachealis' },
        { from: 'in-front', to: 'arch-of-aorta' },
        { from: 'in-front', to: 'brachiocephalic-veins' },
        { from: 'in-front', to: 'thymus' },
        { from: 'behind-beside', to: 'oesophagus' },
        { from: 'behind-beside', to: 'azygos-vein' },
        { from: 'behind-beside', to: 'left-recurrent-laryngeal' },
        { from: 'bifurcation', to: 'right-main-bronchus' },
        { from: 'bifurcation', to: 'left-main-bronchus' },
        { from: 'bifurcation', to: 'carina' },
      ],
    },
    lesions: [
      {
        id: 'tracheal-shift',
        label: 'Shifted trachea',
        nodeIds: ['trachea', 'extent'],
        explanation:
          'The trachea is felt in the suprasternal notch and is normally central. Pushed or pulled to one side, it shows the mediastinum has shifted: away from a large effusion or tension pneumothorax, towards a collapsed lung.',
      },
      {
        id: 'compressed-trachea',
        label: 'Compressed trachea',
        nodeIds: ['arch-of-aorta', 'thymus'],
        explanation:
          'An enlarged thyroid, thymus or lymph nodes, or an aneurysm of the arch, can squeeze the trachea: breathlessness, an irritating cough and often a husky voice. An aneurysm pulling down on the bifurcation gives a tracheal tug.',
      },
      {
        id: 'tracheostomy',
        label: 'Tracheostomy',
        nodeIds: ['trachea'],
        explanation:
          'When the nose or larynx is blocked, an opening is made in the trachea in the neck, below the larynx, so air enters directly.',
      },
    ],
    drill: [
      {
        id: 'structure',
        title: 'The tube',
        hint: 'How far it runs and what keeps it open.',
        nodeIds: ['extent', 'c-rings', 'trachealis'],
      },
      {
        id: 'relations',
        title: 'Relations',
        hint: 'What lies in front, behind and on each side of its thoracic part.',
        nodeIds: [
          'arch-of-aorta',
          'brachiocephalic-veins',
          'thymus',
          'oesophagus',
          'azygos-vein',
          'left-recurrent-laryngeal',
        ],
      },
    ],
    model3d: {
      src: ORGANS_MODEL_SRC,
      credit: `${ORGANS_MODEL_CREDIT} ${DUCT_NERVE_CREDIT}`,
      parts: organsParts([
        ...SPINE_FRAME,
        'trachea',
        'right-main-bronchus',
        'left-main-bronchus',
        'right-upper-lobar-bronchus',
        'right-middle-lobar-bronchus',
        'right-lower-lobar-bronchus',
        'left-upper-lobar-bronchus',
        'left-lower-lobar-bronchus',
        'oesophagus',
        'arch-of-aorta',
        'brachiocephalic-trunk',
        'left-common-carotid',
        'left-subclavian-artery',
        'brachiocephalic-veins',
        'superior-vena-cava',
        'azygos-vein',
        'thymus',
        'right-vagus',
        'left-vagus',
      ]),
      traces: [{ id: 'left-recurrent-laryngeal', kind: 'nerve', paths: RECURRENT_LARYNGEAL_PATHS }],
      stops: [
        {
          id: 'front',
          title: 'From the front',
          description:
            'The trachea in the midline behind the manubrium, the thymus, left brachiocephalic vein and arch of the aorta lying across its front.',
          target: [0, -95, 1320],
          position: [0, -780, 1340],
        },
        {
          id: 'right',
          title: 'From the right',
          description:
            'The right vagus runs down its side and the azygos vein arches forwards beside it to the superior vena cava.',
          target: [-5, -95, 1315],
          position: [-700, -300, 1340],
        },
        {
          id: 'left',
          title: 'From the left',
          description:
            'The arch and its left branches lie against it, and the left recurrent laryngeal nerve climbs in the groove between it and the oesophagus.',
          target: [5, -95, 1315],
          position: [700, -300, 1340],
        },
        {
          id: 'bifurcation',
          title: 'Bifurcation',
          description:
            'From below and in front: the trachea divides at the lower border of T4 into the short, steep right bronchus and the long left bronchus.',
          target: [0, -88, 1280],
          position: [-160, -600, 1140],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'tube',
      title: 'The windpipe',
      body: 'A wide tube always kept open, in the lower neck and superior mediastinum. It starts at the lower border of the cricoid cartilage, at C6, and divides at the lower border of T4 in the cadaver, level with the sternal angle; standing up it reaches T6 and drops further on breathing in. It is 10 to 15 cm long and about 2 cm across, bending slightly right near its end.',
      focus: ['trachea', 'extent'],
    },
    {
      id: 'rings',
      title: 'Rings and trachealis',
      body: 'Sixteen to twenty C-shaped hyaline rings hold it open in front and at the sides. Behind, the gap is closed by fibroelastic tissue and the trachealis muscle, so the oesophagus can bulge forwards when swallowing, and trachealis can narrow the tube to make a cough more forceful. It is lined by ciliated columnar epithelium with mucous glands.',
      focus: ['c-rings', 'trachealis'],
    },
    {
      id: 'front',
      title: 'In front',
      body: 'The manubrium and sternothyroid muscles, remains of the thymus, the left brachiocephalic and inferior thyroid veins, the arch of the aorta with the brachiocephalic and left common carotid arteries, the deep cardiac plexus and some nodes.',
      focus: ['in-front', 'arch-of-aorta', 'brachiocephalic-veins', 'thymus'],
    },
    {
      id: 'around',
      title: 'Behind and beside',
      body: 'Behind lies the oesophagus, then the vertebral column. On the right: the right lung and pleura, right vagus and azygos vein. On the left: the arch of the aorta, the left common carotid and subclavian arteries, and the left recurrent laryngeal nerve.',
      focus: ['behind-beside', 'oesophagus', 'azygos-vein', 'left-recurrent-laryngeal'],
    },
    {
      id: 'bifurcation',
      title: 'Bifurcation',
      body: 'It divides into the right and left principal bronchi. Inside the fork the lowest ring projects back as the carina, a sensitive ridge that sets off coughing.',
      focus: ['bifurcation', 'right-main-bronchus', 'left-main-bronchus', 'carina'],
    },
    {
      id: 'supply',
      title: 'Supply',
      body: 'Arteries from the inferior thyroid arteries; veins to the left brachiocephalic vein; lymph to the pretracheal and paratracheal nodes. The vagus and recurrent laryngeal nerves are sensory and secretomotor to its lining and motor to trachealis; sympathetic fibres from the middle cervical ganglion are vasomotor.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each relation to light it, and view the trachea from each side.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'trachea-begins',
      prompt: 'The trachea begins at:',
      options: [
        { id: 'c6', text: 'The lower border of the cricoid cartilage, C6' },
        { id: 'c4', text: 'The upper border of the thyroid cartilage, C4' },
        { id: 't1', text: 'The thoracic inlet, T1' },
        { id: 'hyoid', text: 'The hyoid bone, C3' },
      ],
      answerId: 'c6',
      explanation:
        'It continues down from the larynx and divides at the lower border of T4 in the cadaver.',
    },
    {
      id: 'trachea-venous',
      prompt: 'Veins of the trachea drain into:',
      options: [
        { id: 'left-brachiocephalic', text: 'The left brachiocephalic vein' },
        { id: 'azygos', text: 'The azygos vein' },
        { id: 'svc', text: 'The superior vena cava' },
        { id: 'internal-jugular', text: 'The internal jugular veins' },
      ],
      answerId: 'left-brachiocephalic',
      explanation: 'Its arteries come from the inferior thyroid arteries.',
    },
    {
      id: 'trachea-left-relation',
      prompt: 'On the left of the thoracic trachea lies:',
      options: [
        { id: 'left-recurrent', text: 'The left recurrent laryngeal nerve' },
        { id: 'azygos', text: 'The azygos vein' },
        { id: 'right-vagus', text: 'The right vagus nerve' },
        { id: 'svc', text: 'The superior vena cava' },
      ],
      answerId: 'left-recurrent',
      explanation: 'The azygos vein and right vagus lie on its right.',
    },
    {
      id: 'rings-open-behind',
      prompt: 'The tracheal rings are open behind so that:',
      options: [
        { id: 'oesophagus', text: 'The oesophagus can expand when swallowing' },
        { id: 'vessels', text: 'Vessels can enter the trachea' },
        { id: 'bend', text: 'The neck can bend forwards' },
        { id: 'thyroid', text: 'The thyroid can sit in the gap' },
      ],
      answerId: 'oesophagus',
      explanation: 'The trachealis in the gap can also narrow the tube to strengthen a cough.',
    },
  ],
  cards: [
    {
      id: 'trachea-extent',
      front: 'Extent, length and width of the trachea?',
      back: 'C6 (lower border of cricoid) to T4 (sternal angle) in the cadaver; 10–15 cm long; about 2 cm wide in men.',
    },
    {
      id: 'trachea-anterior',
      front: 'Anterior relations of the thoracic trachea?',
      back: 'Manubrium, sternothyroids, thymus remains, left brachiocephalic and inferior thyroid veins, arch of aorta, brachiocephalic and left common carotid arteries, deep cardiac plexus.',
    },
    {
      id: 'trachea-supply',
      front: 'Blood and nerve supply of the trachea?',
      back: 'Inferior thyroid arteries; left brachiocephalic vein; vagus and recurrent laryngeal nerves; sympathetic from the middle cervical ganglion.',
    },
    {
      id: 'tracheal-tug',
      front: 'What is a tracheal tug?',
      back: 'A downward pull on the trachea with each beat, from an aneurysm of the arch pressing on the bifurcation.',
    },
    {
      id: 'trachea-xray',
      front: 'How does the trachea look on a chest X-ray?',
      back: 'A vertical dark (air) band in the midline in front of the lower cervical and upper thoracic spine.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Chapter 20 Trachea, Oesophagus and Thoracic Duct',
      pages: '321–323',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '222–223' },
  ],
};
