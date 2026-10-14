import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  DUCT_NERVE_CREDIT,
  ORGANS_MODEL_CREDIT,
  ORGANS_MODEL_SRC,
  organsParts,
  SPINE_FRAME,
  THORACIC_DUCT_PATHS,
} from './thoracic-organs-3d';

// Thorax batch 4. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const thoracicDuct: Topic = {
  slug: 'thoracic-duct',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Thoracic duct',
  summary:
    'The body’s largest lymph vessel, from the cisterna chyli to the left venous angle: its course through the posterior and superior mediastinum, its relations, and what it drains.',
  estimatedMinutes: 10,
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
      'Volume 1, Chapter 20 Trachea, Oesophagus and Thoracic Duct, pages 327 to 328',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: thoracic duct in the superior and posterior mediastinum, pages 227 and 233',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Aorta, veins and oesophagus in the 3D view (the duct is drawn schematically)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'About 45 cm long and beaded with valves; it begins at the cisterna chyli near the lower border of T12.',
    'Enters the thorax through the aortic opening, between the aorta on its left and the azygos vein on its right.',
    'Climbs behind the oesophagus to T5, crosses to the left, and runs up the left edge of the oesophagus into the neck.',
    'Arches about 3–4 cm above the clavicle and ends in the angle between the left subclavian and internal jugular veins.',
    'Drains everything below the diaphragm and the left half above it; the right lymphatic duct drains the right upper quarter.',
  ],
  visual: {
    kind: 'path',
    // Its course, its relations on the way up, where it ends, and what it drains.
    diagram: {
      width: 360,
      height: 360,
      nodes: [
        {
          id: 'cisterna-chyli',
          label: 'Cisterna\nchyli',
          name: 'Cisterna chyli, at T12',
          x: 50,
          y: 30,
        },
        {
          id: 'aortic-opening',
          label: 'Aortic\nopening',
          name: 'Aortic opening of the diaphragm',
          x: 145,
          y: 30,
        },
        { id: 'thoracic-duct', label: 'Thoracic\nduct', name: 'Thoracic duct', x: 225, y: 30 },
        {
          id: 'crosses-t5',
          label: 'Crosses\nat T5',
          name: 'Crosses from right to left at T5',
          x: 305,
          y: 30,
        },
        {
          id: 'posterior-relations',
          label: 'Posterior\nmediastinum',
          name: 'Relations in the posterior mediastinum',
          x: 50,
          y: 110,
        },
        {
          id: 'descending-aorta',
          label: 'Aorta\non left',
          name: 'Descending aorta, on its left',
          x: 150,
          y: 110,
        },
        {
          id: 'azygos-vein',
          label: 'Azygos\non right',
          name: 'Azygos vein, on its right',
          x: 230,
          y: 110,
        },
        {
          id: 'oesophagus',
          label: 'Oesophagus\nin front',
          name: 'Oesophagus, in front (to its right higher up)',
          x: 310,
          y: 110,
        },
        {
          id: 'superior-relations',
          label: 'Superior\nmediastinum',
          name: 'Relations in the superior mediastinum',
          x: 50,
          y: 190,
        },
        {
          id: 'arch-of-aorta',
          label: 'Arch in\nfront',
          name: 'Arch of the aorta and origin of the left subclavian artery, in front',
          x: 150,
          y: 190,
        },
        {
          id: 'left-pleura',
          label: 'Pleura\non left',
          name: 'Left pleura, on its left',
          x: 230,
          y: 190,
        },
        { id: 'termination', label: 'Ends', name: 'Termination', x: 50, y: 270 },
        {
          id: 'brachiocephalic-veins',
          label: 'Left venous\nangle',
          name: 'Angle between the left subclavian and internal jugular veins',
          x: 150,
          y: 270,
        },
        { id: 'drains', label: 'Drains', name: 'What it drains', x: 50, y: 336 },
        {
          id: 'below-diaphragm',
          label: 'All below\ndiaphragm',
          name: 'Both lower limbs, the abdomen and pelvis',
          x: 150,
          y: 336,
        },
        {
          id: 'left-above',
          label: 'Left half\nabove',
          name: 'The left half of the thorax, left upper limb and left side of head and neck',
          x: 240,
          y: 336,
        },
      ],
      edges: [
        { from: 'cisterna-chyli', to: 'aortic-opening' },
        { from: 'aortic-opening', to: 'thoracic-duct' },
        { from: 'thoracic-duct', to: 'crosses-t5' },
        { from: 'posterior-relations', to: 'descending-aorta' },
        { from: 'posterior-relations', to: 'azygos-vein' },
        { from: 'posterior-relations', to: 'oesophagus' },
        { from: 'superior-relations', to: 'arch-of-aorta' },
        { from: 'superior-relations', to: 'left-pleura' },
        { from: 'termination', to: 'brachiocephalic-veins' },
        { from: 'drains', to: 'below-diaphragm' },
        { from: 'drains', to: 'left-above' },
      ],
    },
    lesions: [
      {
        id: 'chylothorax',
        label: 'Chylothorax',
        nodeIds: ['thoracic-duct', 'left-pleura'],
        explanation:
          'A torn duct, from injury, surgery or a tumour, leaks milky chyle into the pleural cavity. Because it crosses at T5, damage below that level tends to fill the right pleural cavity, and above it the left.',
      },
      {
        id: 'blocked-duct',
        label: 'Blocked duct',
        nodeIds: ['crosses-t5', 'oesophagus'],
        explanation:
          'A growth in the posterior mediastinum, such as an oesophageal cancer, can press on the duct as it lies behind and beside the oesophagus, and lymph backs up.',
      },
    ],
    drill: [
      {
        id: 'course',
        title: 'Course',
        hint: 'Where it starts, how it enters the thorax, and where it changes sides.',
        nodeIds: ['cisterna-chyli', 'aortic-opening', 'crosses-t5', 'brachiocephalic-veins'],
      },
      {
        id: 'relations',
        title: 'Relations and drainage',
        hint: 'Its neighbours on the way up, and its share of the body.',
        nodeIds: [
          'descending-aorta',
          'azygos-vein',
          'oesophagus',
          'arch-of-aorta',
          'left-pleura',
          'below-diaphragm',
          'left-above',
        ],
      },
    ],
    model3d: {
      src: ORGANS_MODEL_SRC,
      credit: `${ORGANS_MODEL_CREDIT} ${DUCT_NERVE_CREDIT}`,
      parts: organsParts([
        ...SPINE_FRAME,
        'oesophagus',
        'descending-aorta',
        'arch-of-aorta',
        'left-subclavian-artery',
        'left-common-carotid',
        'brachiocephalic-trunk',
        'azygos-vein',
        'brachiocephalic-veins',
        'superior-vena-cava',
        'trachea',
        'left-pleura',
      ]),
      traces: [{ id: 'thoracic-duct', kind: 'lymph', paths: THORACIC_DUCT_PATHS }],
      stops: [
        {
          id: 'front',
          title: 'Its whole course',
          description:
            'From the aortic opening up behind the oesophagus, across to the left at T5, and up into the neck to arch down into the left venous angle.',
          target: [10, -90, 1230],
          position: [0, -950, 1260],
        },
        {
          id: 'posterior',
          title: 'In the posterior mediastinum',
          description:
            'From behind and the right: between the aorta on its left and the azygos vein on its right, on the vertebrae behind the oesophagus.',
          target: [2, -82, 1160],
          position: [-560, 640, 1180],
        },
        {
          id: 'superior',
          title: 'In the superior mediastinum',
          description:
            'From the left: up the left edge of the oesophagus, behind the arch and the start of the left subclavian artery, against the left pleura.',
          target: [16, -92, 1310],
          position: [720, -260, 1340],
        },
        {
          id: 'ending',
          title: 'Ending',
          description:
            'From above and in front: it arches over above the clavicle and ends where the left subclavian and internal jugular veins meet.',
          target: [28, -105, 1365],
          position: [120, -600, 1600],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'duct',
      title: 'The largest lymph vessel',
      body: 'About 45 cm long, beaded by its many valves. It runs from the upper abdomen through the posterior and superior mediastinum to the root of the neck.',
      focus: ['thoracic-duct'],
    },
    {
      id: 'start',
      title: 'Start and entry',
      body: 'It continues up from the cisterna chyli near the lower border of T12 and enters the thorax through the aortic opening of the diaphragm, with the diaphragm in front, the vertebrae behind, the azygos vein on its right and the aorta on its left.',
      focus: ['cisterna-chyli', 'aortic-opening'],
    },
    {
      id: 'posterior',
      title: 'Posterior mediastinum',
      body: 'It climbs from T12 to T5 behind the oesophagus, on the right posterior intercostal arteries and the ends of the hemiazygos veins, between the aorta and the azygos vein. At T5 it crosses to the left.',
      focus: ['posterior-relations', 'descending-aorta', 'azygos-vein', 'oesophagus', 'crosses-t5'],
    },
    {
      id: 'superior',
      title: 'Superior mediastinum',
      body: 'It runs up along the left edge of the oesophagus, behind the arch of the aorta and the start of the left subclavian artery, with the left pleura on its left.',
      focus: ['superior-relations', 'arch-of-aorta', 'left-pleura'],
    },
    {
      id: 'end',
      title: 'In the neck',
      body: 'It arches out at the level of C7, rising 3 to 4 cm above the clavicle in front of the vertebral vessels, sympathetic trunk and left phrenic nerve and behind the carotid sheath, then drops in front of the left subclavian artery to end in the angle between the left subclavian and left internal jugular veins.',
      focus: ['termination', 'brachiocephalic-veins'],
    },
    {
      id: 'drainage',
      title: 'What it drains',
      body: 'Lymph from both lower limbs, the abdomen and pelvis, the left half of the thorax, the left upper limb and the left side of the head and neck; the left jugular, subclavian and bronchomediastinal trunks join it near its end. The right lymphatic duct, from the right jugular, subclavian and bronchomediastinal trunks, drains the rest into the right venous angle.',
      focus: ['drains', 'below-diaphragm', 'left-above'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'The model has no duct of its own: follow the drawn path with the guided views and select its neighbours to light them.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'duct-begins',
      prompt: 'The thoracic duct begins as a continuation of:',
      options: [
        { id: 'cisterna', text: 'The cisterna chyli' },
        { id: 'right-duct', text: 'The right lymphatic duct' },
        { id: 'jugular-trunk', text: 'The left jugular trunk' },
        { id: 'intestinal', text: 'The intestinal trunk alone' },
      ],
      answerId: 'cisterna',
      explanation: 'Near the lower border of T12; it enters the thorax through the aortic opening.',
    },
    {
      id: 'duct-crosses',
      prompt: 'The thoracic duct crosses from right to left at the level of:',
      options: [
        { id: 't5', text: 'T5' },
        { id: 't8', text: 'T8' },
        { id: 't12', text: 'T12' },
        { id: 't2', text: 'T2' },
      ],
      answerId: 't5',
      explanation:
        'Below that it lies right of the midline between the aorta and azygos; above, along the left edge of the oesophagus.',
    },
    {
      id: 'duct-ends',
      prompt: 'The thoracic duct ends in:',
      options: [
        {
          id: 'left-angle',
          text: 'The angle between the left subclavian and left internal jugular veins',
        },
        { id: 'svc', text: 'The superior vena cava' },
        { id: 'right-angle', text: 'The right venous angle' },
        { id: 'azygos', text: 'The azygos vein' },
      ],
      answerId: 'left-angle',
      explanation: 'The right lymphatic duct ends in the corresponding angle on the right.',
    },
    {
      id: 'duct-not-drain',
      prompt: 'Which region does the thoracic duct not drain?',
      options: [
        { id: 'right-arm', text: 'The right upper limb' },
        { id: 'left-arm', text: 'The left upper limb' },
        { id: 'right-leg', text: 'The right lower limb' },
        { id: 'abdomen', text: 'The abdomen' },
      ],
      answerId: 'right-arm',
      explanation:
        'The right upper limb, right side of the head and neck and right half of the thorax drain to the right lymphatic duct.',
    },
  ],
  cards: [
    {
      id: 'duct-course',
      front: 'Course of the thoracic duct?',
      back: 'Cisterna chyli (T12) → aortic opening → up behind the oesophagus to T5 → crosses left → left edge of the oesophagus → arches in the neck → left venous angle.',
    },
    {
      id: 'duct-posterior-relations',
      front: 'Relations of the thoracic duct in the posterior mediastinum?',
      back: 'In front: diaphragm, oesophagus. Behind: vertebrae, right posterior intercostal arteries, hemiazygos veins. Right: azygos. Left: descending aorta.',
    },
    {
      id: 'duct-drainage',
      front: 'Areas drained by the thoracic duct?',
      back: 'Everything below the diaphragm, plus the left half of the thorax, left upper limb and left side of the head and neck.',
    },
    {
      id: 'right-lymphatic-duct',
      front: 'Right lymphatic duct?',
      back: 'Formed by the right jugular, subclavian and bronchomediastinal trunks; ends in the right venous angle; drains the right upper quarter of the body.',
    },
    {
      id: 'duct-length',
      front: 'Length and appearance of the thoracic duct?',
      back: 'About 45 cm, beaded from its many valves.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Chapter 20 Trachea, Oesophagus and Thoracic Duct',
      pages: '327–328',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '227, 233' },
  ],
};
