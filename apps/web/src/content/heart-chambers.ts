import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  CHAMBERS,
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
export const heartChambers: Topic = {
  slug: 'heart-chambers',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Chambers of the heart',
  summary:
    'Inside the four chambers: the crista terminalis and fossa ovalis of the right atrium, the moderator band and infundibulum of the right ventricle, and the smooth left atrium and thick left ventricle.',
  estimatedMinutes: 16,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 18 Pericardium and Heart, pages 288 to 294'),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: cardiac chambers, pages 195 to 201',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Heart walls, chamber cavities, valves and papillary muscles in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Right atrium: smooth sinus venarum behind, musculi pectinati in front, divided by the crista terminalis; fossa ovalis on the septum.',
    'Inlets of the right atrium: SVC, IVC, coronary sinus, anterior cardiac veins, venae cordis minimae.',
    'Right ventricle: rough inflow with trabeculae, three papillary muscles and the moderator band (right bundle branch); smooth infundibulum to the pulmonary trunk.',
    'Left atrium: mostly smooth, four pulmonary veins, musculi pectinati only in the auricle.',
    'Left ventricle: wall three times thicker than the right, circular cavity, two papillary muscles, smooth aortic vestibule.',
  ],
  visual: {
    kind: 'path',
    // Each chamber on the left with what to find inside it; each chamber lights its blood cast.
    diagram: {
      width: 360,
      height: 430,
      nodes: [
        { id: 'right-atrium', label: 'Right\natrium', name: 'Right atrium', x: 50, y: 30 },
        {
          id: 'crista-terminalis',
          label: 'Crista\nterminalis',
          name: 'Crista terminalis, between the smooth and rough parts',
          x: 145,
          y: 30,
        },
        {
          id: 'fossa-ovalis',
          label: 'Fossa\novalis',
          name: 'Fossa ovalis on the interatrial septum, with its limbus',
          x: 225,
          y: 30,
        },
        {
          id: 'coronary-sinus-opening',
          label: 'Coronary\nsinus',
          name: 'Opening of the coronary sinus, between the IVC and the tricuspid orifice',
          x: 305,
          y: 30,
        },
        {
          id: 'musculi-pectinati',
          label: 'Musculi\npectinati',
          name: 'Musculi pectinati, in the rough front part and auricle',
          x: 185,
          y: 96,
        },
        {
          id: 'sinus-venarum',
          label: 'Sinus\nvenarum',
          name: 'Sinus venarum, the smooth back part receiving the venae cavae',
          x: 285,
          y: 96,
        },
        {
          id: 'right-ventricle',
          label: 'Right\nventricle',
          name: 'Right ventricle',
          x: 50,
          y: 176,
        },
        {
          id: 'right-papillary-muscles',
          label: 'Papillary\nmuscles',
          name: 'Anterior, posterior and septal papillary muscles',
          x: 145,
          y: 176,
        },
        {
          id: 'moderator-band',
          label: 'Moderator\nband',
          name: 'Septomarginal trabecula (moderator band), carrying the right bundle branch',
          x: 225,
          y: 176,
        },
        {
          id: 'infundibulum',
          label: 'Infundi-\nbulum',
          name: 'Infundibulum, the smooth outflow to the pulmonary trunk',
          x: 305,
          y: 176,
        },
        {
          id: 'trabeculae-carneae',
          label: 'Trabeculae\ncarneae',
          name: 'Trabeculae carneae: ridges, bridges and pillars',
          x: 185,
          y: 236,
        },
        { id: 'left-atrium', label: 'Left\natrium', name: 'Left atrium', x: 50, y: 316 },
        {
          id: 'pulmonary-veins',
          label: 'Four\npulmonary\nveins',
          name: 'Four pulmonary veins opening into its back wall',
          x: 145,
          y: 316,
        },
        {
          id: 'left-auricle',
          label: 'Auricle',
          name: 'Left auricle, the only part with musculi pectinati',
          x: 225,
          y: 316,
        },
        { id: 'left-ventricle', label: 'Left\nventricle', name: 'Left ventricle', x: 50, y: 396 },
        {
          id: 'left-papillary-muscles',
          label: 'Papillary\nmuscles',
          name: 'Anterior and posterior papillary muscles',
          x: 145,
          y: 396,
        },
        {
          id: 'aortic-vestibule',
          label: 'Aortic\nvestibule',
          name: 'Aortic vestibule, the smooth outflow below the aortic valve',
          x: 225,
          y: 396,
        },
        {
          id: 'thick-wall',
          label: 'Wall 3×\nthicker',
          name: 'Wall three times as thick as the right ventricle’s',
          x: 305,
          y: 396,
        },
      ],
      edges: [
        { from: 'right-atrium', to: 'crista-terminalis' },
        { from: 'right-atrium', to: 'fossa-ovalis' },
        { from: 'right-atrium', to: 'coronary-sinus-opening' },
        { from: 'right-atrium', to: 'musculi-pectinati' },
        { from: 'right-atrium', to: 'sinus-venarum' },
        { from: 'right-ventricle', to: 'right-papillary-muscles' },
        { from: 'right-ventricle', to: 'moderator-band' },
        { from: 'right-ventricle', to: 'infundibulum' },
        { from: 'right-ventricle', to: 'trabeculae-carneae' },
        { from: 'left-atrium', to: 'pulmonary-veins' },
        { from: 'left-atrium', to: 'left-auricle' },
        { from: 'left-ventricle', to: 'left-papillary-muscles' },
        { from: 'left-ventricle', to: 'aortic-vestibule' },
        { from: 'left-ventricle', to: 'thick-wall' },
      ],
    },
    lesions: [
      {
        id: 'atrial-septal-defect',
        label: 'Atrial septal defect',
        nodeIds: ['fossa-ovalis'],
        explanation:
          'If the septum primum and septum secundum fail to fuse, a hole remains at the fossa ovalis and blood flows from the left atrium to the right. A small slit, a probe-patent foramen ovale, is common and harmless.',
      },
      {
        id: 'heart-failure',
        label: 'Right heart failure',
        nodeIds: ['right-atrium', 'right-ventricle'],
        explanation:
          'Any chamber can fail, but back pressure ends in right-sided failure: raised venous pressure, swollen neck veins, oedema of the feet and breathlessness on effort. Right failure from lung disease is cor pulmonale.',
      },
    ],
    drill: [
      {
        id: 'right-atrium',
        title: 'Right atrium',
        hint: 'The ridge, the two parts it divides, the mark of the fetal shunt, and one more opening.',
        nodeIds: [
          'crista-terminalis',
          'musculi-pectinati',
          'sinus-venarum',
          'fossa-ovalis',
          'coronary-sinus-opening',
        ],
      },
      {
        id: 'right-ventricle',
        title: 'Right ventricle',
        hint: 'The rough inflow and what is in it, then the smooth outflow.',
        nodeIds: [
          'right-papillary-muscles',
          'moderator-band',
          'trabeculae-carneae',
          'infundibulum',
        ],
      },
      {
        id: 'left-heart',
        title: 'Left atrium and ventricle',
        hint: 'What enters the atrium, its one rough part, and what marks the left ventricle.',
        nodeIds: [
          'pulmonary-veins',
          'left-auricle',
          'left-papillary-muscles',
          'aortic-vestibule',
          'thick-wall',
        ],
      },
    ],
    model3d: {
      src: HEART_MODEL_SRC,
      credit: HEART_MODEL_CREDIT,
      parts: heartParts([
        ...WALLS,
        ...CHAMBERS,
        'tricuspid-valve',
        'mitral-valve',
        'pulmonary-valve',
        'aortic-valve',
        'right-papillary-muscles',
        'left-papillary-muscles',
        ...GREAT_VESSELS,
      ]),
      traces: [],
      stops: [
        {
          ...HEART_FRONT,
          description:
            'The blood in each chamber: blue in the right atrium and ventricle, red in the left. The right ventricle lies in front; the left atrium is hidden behind.',
        },
        {
          id: 'right',
          title: 'From the right',
          description:
            'The right atrium between the two venae cavae, its auricle reaching forwards round the root of the aorta.',
          target: [-15, -125, 1235],
          position: [-470, -330, 1255],
        },
        {
          id: 'left',
          title: 'From the left',
          description:
            'The left ventricle with its thick wall and the left auricle above it; the pulmonary trunk rises from the infundibulum in front.',
          target: [40, -118, 1225],
          position: [470, -260, 1245],
        },
        {
          ...HEART_BACK,
          description:
            'From behind: the left atrium, smooth-walled, receiving the four pulmonary veins, with the right atrium to its right.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'right-atrium',
      title: 'Right atrium',
      body: 'It receives blood from the whole body and passes it through the tricuspid orifice. Outside, the sulcus terminalis runs from the superior to the inferior vena cava, with the SA node at its top; the auricle reaches forwards over the root of the aorta.',
      focus: ['right-atrium'],
    },
    {
      id: 'right-atrium-inside',
      title: 'Inside the right atrium',
      body: 'The crista terminalis divides it. Behind is the smooth sinus venarum, from the sinus venosus, where the superior and inferior venae cavae open (the IVC with its Eustachian valve) and the coronary sinus opens between the IVC and the tricuspid orifice. In front, musculi pectinati run like the teeth of a comb into the auricle.',
      focus: ['crista-terminalis', 'sinus-venarum', 'musculi-pectinati', 'coronary-sinus-opening'],
    },
    {
      id: 'septum',
      title: 'Interatrial septum',
      body: 'Its lower part shows the fossa ovalis, the floor formed by the septum primum, ringed above and at the sides by the limbus, the free edge of the septum secundum. A small slit above the fossa may remain open.',
      focus: ['fossa-ovalis'],
    },
    {
      id: 'right-ventricle',
      title: 'Right ventricle',
      body: 'Triangular, forming most of the sternocostal surface and the inferior border, crescentic in section because the septum bulges into it. The rough inflow has trabeculae carneae (ridges, bridges and pillars) and three papillary muscles, anterior, posterior and septal. The moderator band runs from the septum to the anterior papillary muscle carrying the right bundle branch. The smooth infundibulum leads up to the pulmonary valve; a muscular crest separates the two parts.',
      focus: [
        'right-ventricle',
        'trabeculae-carneae',
        'right-papillary-muscles',
        'moderator-band',
        'infundibulum',
      ],
    },
    {
      id: 'left-atrium',
      title: 'Left atrium',
      body: 'Quadrangular, at the back, forming most of the base. Two pulmonary veins enter on each side of its back wall. Inside it is smooth, built from absorbed pulmonary veins, except the auricle with its musculi pectinati. The septal wall shows the fossa lunata, opposite the fossa ovalis.',
      focus: ['left-atrium', 'pulmonary-veins', 'left-auricle'],
    },
    {
      id: 'left-ventricle',
      title: 'Left ventricle',
      body: 'It forms the apex and most of the left and diaphragmatic surfaces. Its wall is three times as thick as the right’s and its cavity circular in section. The lower part is rough with trabeculae and two strong papillary muscles, each sending chordae to both mitral cusps; the upper, smooth aortic vestibule leads to the aortic valve.',
      focus: ['left-ventricle', 'left-papillary-muscles', 'aortic-vestibule', 'thick-wall'],
    },
    {
      id: 'septum-ventricles',
      title: 'Interventricular septum',
      body: 'Placed obliquely, marked outside by the two interventricular grooves. Its lower part is thick and muscular; its upper part is thin and membranous, separating not only the ventricles but also the right atrium from the left ventricle.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a chamber to light its blood, or switch the walls off in Layers to see the chambers and valves alone.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'moderator-band-content',
      prompt: 'The moderator band carries:',
      options: [
        { id: 'right-branch', text: 'The right branch of the AV bundle' },
        { id: 'left-branch', text: 'The left branch of the AV bundle' },
        { id: 'av-node', text: 'The AV node' },
        { id: 'coronary', text: 'A branch of the right coronary artery only' },
      ],
      answerId: 'right-branch',
      explanation:
        'It crosses from the septum to the anterior papillary muscle, letting the impulse reach it quickly.',
    },
    {
      id: 'fossa-ovalis-floor',
      prompt: 'The floor of the fossa ovalis is formed by:',
      options: [
        { id: 'primum', text: 'The septum primum' },
        { id: 'secundum', text: 'The septum secundum' },
        { id: 'endocardial-cushion', text: 'The endocardial cushions' },
        { id: 'sinus-venosus', text: 'The sinus venosus' },
      ],
      answerId: 'primum',
      explanation: 'The septum secundum makes the limbus round its upper edge.',
    },
    {
      id: 'crista-divides',
      prompt: 'The crista terminalis separates:',
      options: [
        { id: 'smooth-rough', text: 'The smooth sinus venarum from the rough pectinate part' },
        { id: 'atria', text: 'The right atrium from the left atrium' },
        { id: 'inflow-outflow', text: 'The inflow from the outflow of the right ventricle' },
        { id: 'auricle', text: 'The auricle from the left atrium' },
      ],
      answerId: 'smooth-rough',
      explanation: 'Outside it shows as the sulcus terminalis, with the SA node at its upper end.',
    },
    {
      id: 'right-ventricle-section',
      prompt: 'In cross-section the cavity of the right ventricle is:',
      options: [
        { id: 'crescentic', text: 'Crescentic' },
        { id: 'circular', text: 'Circular' },
        { id: 'triangular', text: 'Triangular' },
        { id: 'slit', text: 'A narrow slit' },
      ],
      answerId: 'crescentic',
      explanation:
        'The septum bulges into it from the high-pressure left ventricle, whose cavity is circular.',
    },
  ],
  cards: [
    {
      id: 'right-atrium-inlets',
      front: 'What opens into the right atrium?',
      back: 'Superior and inferior venae cavae, coronary sinus, anterior cardiac veins and venae cordis minimae.',
    },
    {
      id: 'right-ventricle-parts',
      front: 'Two parts of the right ventricle and what separates them?',
      back: 'Rough inflow with trabeculae and papillary muscles, smooth infundibulum to the pulmonary trunk, separated by the supraventricular crest.',
    },
    {
      id: 'ventricles-compared',
      front: 'Right and left ventricles compared?',
      back: 'Right: thin wall, crescentic cavity, three small papillary muscles. Left: three times thicker, circular cavity, two strong papillary muscles.',
    },
    {
      id: 'left-atrium-features',
      front: 'Features of the left atrium?',
      back: 'Forms most of the base; four pulmonary veins enter its back; smooth inside except the auricle; fossa lunata on the septum.',
    },
    {
      id: 'interventricular-septum',
      front: 'Parts of the interventricular septum?',
      back: 'Thick muscular lower part; thin membranous upper part, which also separates the right atrium from the left ventricle.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 18 Pericardium and Heart', pages: '288–294' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '195–201' },
  ],
};
