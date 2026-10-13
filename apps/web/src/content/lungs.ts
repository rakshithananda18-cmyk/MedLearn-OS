import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  HEART,
  LOBES,
  LUNGS_FRONT,
  OPEN_FRAME,
  ORGANS_MODEL_CREDIT,
  ORGANS_MODEL_SRC,
  organsParts,
} from './thoracic-organs-3d';

// Thorax batch 2. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const lungs: Topic = {
  slug: 'lungs',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Lungs: surfaces, lobes and fissures',
  summary:
    'The apex, base, borders and surfaces of a lung, how the fissures cut the right lung into three lobes and the left into two, and what each lung touches.',
  estimatedMinutes: 15,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 16 Lungs, pages 264 to 268'),
    bookSource('grays-anatomy', 'Chapter 3 Thorax, regional anatomy: lungs, pages 170 to 173'),
    {
      title: 'Z-Anatomy',
      detail: 'Lungs, airways and oesophagus in the 3D view',
      url: 'https://www.z-anatomy.com/',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Cage, heart and vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Each lung has an apex, a base, anterior, posterior and inferior borders, and costal and medial surfaces.',
    'The apex rises about 2.5 cm above the medial third of the clavicle; the base rests on the diaphragm.',
    'Right lung: oblique and horizontal fissures, three lobes. Left lung: one oblique fissure, two lobes, a cardiac notch and a lingula.',
    'Horizontal fissure: along the fourth costal cartilage to the oblique fissure in the midaxillary line.',
    'The right lung is shorter, wider and heavier (about 700 g); the left is longer and narrower.',
  ],
  visual: {
    kind: 'path',
    // The parts of any lung, then each lung's lobes and fissures.
    diagram: {
      width: 360,
      height: 400,
      nodes: [
        { id: 'lung', label: 'A lung', name: 'Parts of a lung', x: 50, y: 30 },
        { id: 'apex', label: 'Apex', name: 'Apex, above the clavicle', x: 145, y: 30 },
        { id: 'base', label: 'Base', name: 'Base, on the diaphragm', x: 225, y: 30 },
        {
          id: 'hilum',
          label: 'Hilum',
          name: 'Hilum, where the root enters the medial surface',
          x: 305,
          y: 30,
        },
        { id: 'borders', label: 'Borders', name: 'Borders of a lung', x: 50, y: 96 },
        {
          id: 'anterior-border',
          label: 'Anterior',
          name: 'Anterior border: thin, with the cardiac notch on the left',
          x: 145,
          y: 96,
        },
        {
          id: 'posterior-border',
          label: 'Posterior',
          name: 'Posterior border: thick and rounded, beside the vertebrae',
          x: 225,
          y: 96,
        },
        {
          id: 'inferior-border',
          label: 'Inferior',
          name: 'Inferior border, round the base',
          x: 305,
          y: 96,
        },
        { id: 'right-lung', label: 'Right\nlung', name: 'Right lung', x: 50, y: 172 },
        {
          id: 'right-upper-lobe',
          label: 'Upper',
          name: 'Upper lobe of the right lung',
          x: 145,
          y: 172,
        },
        {
          id: 'right-middle-lobe',
          label: 'Middle',
          name: 'Middle lobe of the right lung',
          x: 225,
          y: 172,
        },
        {
          id: 'right-lower-lobe',
          label: 'Lower',
          name: 'Lower lobe of the right lung',
          x: 305,
          y: 172,
        },
        {
          id: 'horizontal-fissure',
          label: 'Horizontal\nfissure',
          name: 'Horizontal fissure, along the fourth costal cartilage',
          x: 185,
          y: 230,
        },
        {
          id: 'right-oblique-fissure',
          label: 'Oblique\nfissure',
          name: 'Oblique fissure of the right lung',
          x: 290,
          y: 230,
        },
        { id: 'left-lung', label: 'Left\nlung', name: 'Left lung', x: 50, y: 306 },
        {
          id: 'left-upper-lobe',
          label: 'Upper',
          name: 'Upper lobe of the left lung',
          x: 145,
          y: 306,
        },
        {
          id: 'lingula',
          label: 'Lingula',
          name: 'Lingula, the tongue below the cardiac notch',
          x: 225,
          y: 306,
        },
        {
          id: 'left-lower-lobe',
          label: 'Lower',
          name: 'Lower lobe of the left lung',
          x: 305,
          y: 306,
        },
        {
          id: 'cardiac-notch',
          label: 'Cardiac\nnotch',
          name: 'Cardiac notch on the anterior border',
          x: 185,
          y: 366,
        },
        {
          id: 'left-oblique-fissure',
          label: 'Oblique\nfissure',
          name: 'Oblique fissure of the left lung',
          x: 290,
          y: 366,
        },
      ],
      edges: [
        { from: 'lung', to: 'apex' },
        { from: 'lung', to: 'base' },
        { from: 'lung', to: 'hilum' },
        { from: 'borders', to: 'anterior-border' },
        { from: 'borders', to: 'posterior-border' },
        { from: 'borders', to: 'inferior-border' },
        { from: 'right-lung', to: 'right-upper-lobe' },
        { from: 'right-lung', to: 'right-middle-lobe' },
        { from: 'right-lung', to: 'right-lower-lobe' },
        { from: 'right-lung', to: 'horizontal-fissure' },
        { from: 'right-lung', to: 'right-oblique-fissure' },
        { from: 'left-lung', to: 'left-upper-lobe' },
        { from: 'left-upper-lobe', to: 'lingula' },
        { from: 'left-lung', to: 'left-lower-lobe' },
        { from: 'left-upper-lobe', to: 'cardiac-notch' },
        { from: 'left-lung', to: 'left-oblique-fissure' },
      ],
    },
    lesions: [
      {
        id: 'apex-wound',
        label: 'Wound above the clavicle',
        nodeIds: ['apex'],
        explanation:
          'The apex and its cervical pleura rise into the root of the neck, so a stab wound or a needle above the medial clavicle can enter the pleural cavity and collapse the lung.',
      },
      {
        id: 'hoarse-voice',
        label: 'Left upper lobe cancer',
        nodeIds: ['left-upper-lobe', 'hilum'],
        explanation:
          'A bronchial cancer of the left upper lobe spreads to the nodes at the hilum and in the mediastinum. Enlarged nodes can press on the left recurrent laryngeal nerve as it hooks under the arch of the aorta, and the voice turns hoarse.',
      },
      {
        id: 'azygos-lobe',
        label: 'Azygos lobe',
        nodeIds: ['right-upper-lobe'],
        explanation:
          'Sometimes the azygos vein cuts down into the apex of the right upper lobe in a fold of pleura, marking off a small extra lobe seen on X-ray as a fine curved line.',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'Parts of a lung',
        hint: 'Its ends, then its three borders.',
        nodeIds: [
          'apex',
          'base',
          'hilum',
          'anterior-border',
          'posterior-border',
          'inferior-border',
        ],
      },
      {
        id: 'right',
        title: 'Right lung',
        hint: 'Three lobes and the two fissures that part them.',
        nodeIds: [
          'right-upper-lobe',
          'right-middle-lobe',
          'right-lower-lobe',
          'horizontal-fissure',
          'right-oblique-fissure',
        ],
      },
      {
        id: 'left',
        title: 'Left lung',
        hint: 'Two lobes, one fissure, and what the heart does to the front of the upper lobe.',
        nodeIds: [
          'left-upper-lobe',
          'lingula',
          'left-lower-lobe',
          'cardiac-notch',
          'left-oblique-fissure',
        ],
      },
    ],
    model3d: {
      src: ORGANS_MODEL_SRC,
      credit: ORGANS_MODEL_CREDIT,
      parts: organsParts([
        ...OPEN_FRAME,
        ...LOBES,
        ...HEART,
        'trachea',
        'right-main-bronchus',
        'left-main-bronchus',
        'arch-of-aorta',
        'descending-aorta',
        'superior-vena-cava',
        'inferior-vena-cava',
        'azygos-vein',
        'oesophagus',
      ]),
      traces: [],
      stops: [
        LUNGS_FRONT,
        {
          id: 'right-side',
          title: 'Right lung from the side',
          description:
            'The oblique fissure runs down and forwards from behind; the horizontal fissure leaves it in the midaxillary line and runs forwards at the fourth cartilage, cutting off the middle lobe.',
          target: [-70, -110, 1225],
          position: [-1010, -300, 1250],
        },
        {
          id: 'left-side',
          title: 'Left lung from the side',
          description:
            'One oblique fissure parts the upper and lower lobes. Below the cardiac notch, the lingula curls round the front of the heart.',
          target: [70, -110, 1225],
          position: [1010, -300, 1250],
        },
        {
          id: 'back',
          title: 'From behind',
          description:
            'Most of what you hear at the back is lower lobe: the oblique fissure starts high, near the level of the third thoracic spine.',
          target: [0, -60, 1215],
          position: [0, 960, 1260],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'lungs',
      title: 'Two cones',
      body: 'The lungs fill most of the chest, one on each side of the mediastinum, each in its pleural sac. They are spongy, grey or mottled black from inhaled carbon in adults. The right weighs about 700 g, a little more than the left.',
      focus: ['lung'],
    },
    {
      id: 'ends',
      title: 'Apex, base and hilum',
      body: 'The blunt apex rises about 2.5 cm above the medial third of the clavicle, under the cervical pleura, grooved by the subclavian artery. The concave base rests on the diaphragm, over the liver on the right and the liver, stomach and spleen on the left. The hilum on the medial surface is where the root enters.',
      focus: ['apex', 'base', 'hilum'],
    },
    {
      id: 'borders',
      title: 'Borders and surfaces',
      body: 'The anterior border is thin; on the left it is cut back below the fourth cartilage by the cardiac notch. The posterior border is thick and rounded beside the vertebral bodies, from C7 to T10. The inferior border runs round the base. The costal surface is large and smooth against the wall; the medial surface has a vertebral part and a mediastinal part marked by the heart and great vessels.',
      focus: ['borders', 'anterior-border', 'posterior-border', 'inferior-border'],
    },
    {
      id: 'right',
      title: 'Right lung',
      body: 'Two fissures, three lobes. The oblique fissure starts behind about 6 cm below the apex, near the third thoracic spine, and runs down and forwards to meet the inferior border about 5 cm from the midline. The horizontal fissure runs forwards from it in the midaxillary line along the fourth costal cartilage, cutting off the wedge of the middle lobe.',
      focus: [
        'right-lung',
        'right-upper-lobe',
        'right-middle-lobe',
        'right-lower-lobe',
        'horizontal-fissure',
        'right-oblique-fissure',
      ],
    },
    {
      id: 'left',
      title: 'Left lung',
      body: 'One oblique fissure, two lobes. The heart pushes the anterior border of the upper lobe back into the cardiac notch, leaving the pericardium covered only by pleura there, the area of superficial cardiac dullness. The tongue of upper lobe below the notch is the lingula, the counterpart of the right middle lobe.',
      focus: [
        'left-lung',
        'left-upper-lobe',
        'lingula',
        'cardiac-notch',
        'left-oblique-fissure',
        'left-lower-lobe',
      ],
    },
    {
      id: 'relations',
      title: 'What the medial surfaces touch',
      body: 'The right lung bears the right atrium, a little of the right ventricle, the superior and inferior venae cavae, the azygos vein arching over its root, the trachea, oesophagus and right vagus. The left bears the left ventricle, the pulmonary trunk, the arch and descending aorta, the left subclavian artery, the oesophagus low down, and the left vagus and recurrent laryngeal nerves.',
      focus: ['hilum'],
    },
    {
      id: 'differences',
      title: 'Right and left',
      body: 'The right lung is shorter and wider, because the liver pushes its base up, and heavier; its anterior border is straight and its cardiac impression shallow. The left is longer and narrower, with a deep cardiac impression, a cardiac notch and a lingula.',
      focus: ['right-lung', 'left-lung'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a lobe to light it in the model, and use the guided views from each side to follow the fissures.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'horizontal-fissure-level',
      prompt: 'The horizontal fissure of the right lung lies at the level of:',
      options: [
        { id: 'fourth', text: 'The fourth costal cartilage' },
        { id: 'second', text: 'The second costal cartilage' },
        { id: 'sixth', text: 'The sixth costal cartilage' },
        { id: 'third-spine', text: 'The third thoracic spine' },
      ],
      answerId: 'fourth',
      explanation:
        'It runs from the anterior border at the fourth costal cartilage to the oblique fissure in the midaxillary line, on the fifth rib.',
    },
    {
      id: 'lingula-counterpart',
      prompt: 'The lingula of the left lung corresponds to:',
      options: [
        { id: 'middle-lobe', text: 'The middle lobe of the right lung' },
        { id: 'upper-lobe', text: 'The upper lobe of the right lung' },
        { id: 'azygos-lobe', text: 'The azygos lobe' },
        { id: 'lower-lobe', text: 'The lower lobe of the right lung' },
      ],
      answerId: 'middle-lobe',
      explanation: 'The lingula is the part of the left upper lobe below the cardiac notch.',
    },
    {
      id: 'right-lung-not-related',
      prompt: 'Which of these is not related to the mediastinal surface of the right lung?',
      options: [
        { id: 'thoracic-duct', text: 'Thoracic duct' },
        { id: 'svc', text: 'Superior vena cava' },
        { id: 'trachea', text: 'Trachea' },
        { id: 'oesophagus', text: 'Oesophagus' },
      ],
      answerId: 'thoracic-duct',
      explanation:
        'The thoracic duct lies to the left in the upper thorax and marks the left lung; the others lie against the right lung.',
    },
    {
      id: 'right-lung-feature',
      prompt: 'Compared with the left lung, the right lung is:',
      options: [
        { id: 'shorter-wider', text: 'Shorter, wider and heavier' },
        { id: 'longer-narrower', text: 'Longer, narrower and lighter' },
        { id: 'cardiac-notch', text: 'Marked by a cardiac notch' },
        { id: 'two-lobes', text: 'Divided into two lobes' },
      ],
      answerId: 'shorter-wider',
      explanation:
        'The liver raises the right dome of the diaphragm, so the right lung is shorter; it is wider because the heart lies more to the left.',
    },
  ],
  cards: [
    {
      id: 'lung-parts',
      front: 'Parts of a lung?',
      back: 'Apex, base, three borders (anterior, posterior, inferior) and two surfaces (costal, medial, the medial having vertebral and mediastinal parts).',
    },
    {
      id: 'oblique-fissure-marking',
      front: 'Surface marking of the oblique fissure?',
      back: 'From 2 cm lateral to the third thoracic spine, through the fifth rib in the midaxillary line, to the sixth costal cartilage 7.5 cm from the midline.',
    },
    {
      id: 'lung-lower-border',
      front: 'Lower border of the lung in three lines?',
      back: 'Rib 6 midclavicular, rib 8 midaxillary, rib 10 at the back: two ribs above the pleura.',
    },
    {
      id: 'right-left-lung',
      front: 'Three differences between the right and left lungs?',
      back: 'Right: shorter, wider, heavier, three lobes, straight anterior border. Left: longer, narrower, two lobes, cardiac notch and lingula.',
    },
    {
      id: 'left-lung-impressions',
      front: 'Name four impressions on the mediastinal surface of the left lung.',
      back: 'Left ventricle, arch of aorta, descending aorta and left subclavian artery (also the pulmonary trunk and oesophagus).',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 16 Lungs', pages: '264–268' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '170–173' },
  ],
};
