import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';

// Physiology batch 1 (general physiology, NMC PY1.5 and 1.6). Facts in our own words;
// `reviewed: false` until a student checks the topic against the book pages.
export const osmosisTonicity: Topic = {
  slug: 'osmosis-tonicity',
  subjectSlug: 'physiology',
  regions: [],
  title: 'Osmosis, osmolarity and tonicity',
  summary:
    'Why water moves between cells and the fluid around them: osmosis and osmotic pressure, osmolarity and osmolality, oncotic pressure, and what isotonic, hypotonic and hypertonic fluids do to a cell, with the drips used on the ward.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource(
      'guyton-hall',
      'Chapter 4: osmosis and osmotic pressure, pages 57 to 58; Chapter 25: osmotic equilibrium and tonicity, pages 310 to 313',
    ),
    bookSource('ak-jain', 'Chapter 2: osmosis, osmotic pressure and tonicity, pages 16 to 17'),
  ],
  keyFacts: [
    'Osmosis is the diffusion of water across a membrane towards the side with more solute particles, that is less water. Osmotic pressure is the pressure that would just stop it.',
    'Osmotic pressure depends on the number of particles, not their size: each milliosmole per litre exerts about 19.3 mmHg. NaCl gives two particles per molecule.',
    'Osmolarity is osmoles per litre of solution; osmolality, per kilogram of water. In body fluids they are nearly the same, about 300 mOsm/L (about 282 after correcting for ions attracting each other).',
    'Tonicity is what a solution does to a cell’s volume, which depends only on solutes that cannot cross the membrane. Isotonic (0.9% saline, 5% glucose in the bag): no change; hypotonic: the cell swells; hypertonic: it shrinks. Urea crosses membranes, so it adds to osmolarity but not tonicity.',
    'Plasma proteins, which cannot leave the capillaries, exert the oncotic (colloid osmotic) pressure of about 25 to 28 mmHg that holds water in the blood.',
  ],
  visual: {
    kind: 'path',
    // Left: osmosis and how it is measured. Right: tonicity and what each kind of fluid does.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'osmosis', label: 'Osmosis', name: 'Osmosis', x: 180, y: 30 },
        {
          id: 'water-moves',
          label: 'Water moves towards\nmore solute',
          name: 'Water diffuses across the membrane towards the side with more solute',
          x: 85,
          y: 100,
        },
        {
          id: 'osmotic-pressure',
          label: 'Osmotic pressure:\n19.3 mmHg/mOsm',
          name: 'Osmotic pressure: about 19.3 mmHg for each milliosmole per litre',
          x: 85,
          y: 165,
        },
        {
          id: 'particles',
          label: 'Counts particles,\nnot their size',
          name: 'Osmotic pressure depends on the number of particles, not their size',
          x: 85,
          y: 225,
        },
        {
          id: 'osmolarity',
          label: 'Osmolarity: per litre;\nosmolality: per kg',
          name: 'Osmolarity per litre of solution; osmolality per kilogram of water',
          x: 85,
          y: 290,
        },
        {
          id: 'body-osmolarity',
          label: 'Body fluids:\nabout 300 mOsm/L',
          name: 'Every body fluid compartment has about 300 milliosmoles per litre',
          x: 85,
          y: 355,
        },
        {
          id: 'oncotic',
          label: 'Oncotic: proteins,\n25 to 28 mmHg',
          name: 'Oncotic pressure of the plasma proteins, about 25 to 28 mmHg',
          x: 85,
          y: 415,
        },
        {
          id: 'tonicity',
          label: 'Tonicity: effect\non cell volume',
          name: 'Tonicity: what a solution does to a cell’s volume',
          x: 275,
          y: 100,
        },
        {
          id: 'isotonic',
          label: 'Isotonic: 0.9% NaCl,\nno change',
          name: 'Isotonic, such as 0.9% saline: the cell keeps its volume',
          x: 275,
          y: 165,
        },
        {
          id: 'hypotonic',
          label: 'Hypotonic: swells',
          name: 'Hypotonic: water enters and the cell swells',
          x: 275,
          y: 225,
        },
        {
          id: 'hypertonic',
          label: 'Hypertonic: shrinks',
          name: 'Hypertonic: water leaves and the cell shrinks',
          x: 275,
          y: 290,
        },
        {
          id: 'urea',
          label: 'Urea crosses:\nnot effective',
          name: 'Urea crosses cell membranes, so it is not an effective osmole',
          x: 275,
          y: 355,
        },
        {
          id: 'glucose-drip',
          label: '5% glucose: becomes\nfree water',
          name: '5% glucose is isotonic in the bag but becomes free water once the glucose is used',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'osmosis', to: 'water-moves' },
        { from: 'water-moves', to: 'osmotic-pressure' },
        { from: 'osmotic-pressure', to: 'particles' },
        { from: 'particles', to: 'osmolarity' },
        { from: 'osmolarity', to: 'body-osmolarity' },
        { from: 'body-osmolarity', to: 'oncotic' },
        { from: 'osmosis', to: 'tonicity' },
        { from: 'tonicity', to: 'isotonic' },
        { from: 'isotonic', to: 'hypotonic' },
        { from: 'hypotonic', to: 'hypertonic' },
        { from: 'hypertonic', to: 'urea' },
        { from: 'urea', to: 'glucose-drip' },
      ],
    },
    lesions: [
      {
        id: 'water-iv',
        label: 'Pure water into a vein',
        nodeIds: ['hypotonic'],
        explanation:
          'Water with no solute is strongly hypotonic. Red cells next to the drip swell and burst (haemolysis), which is why water is never given straight into a vein.',
      },
      {
        id: 'hyponatraemia',
        label: 'Low sodium',
        nodeIds: ['hypotonic', 'glucose-drip'],
        explanation:
          'Too much water, often from hypotonic drips after an operation, dilutes the extracellular fluid. Water moves into the cells; brain cells swell inside the skull, causing headache, confusion and fits.',
      },
      {
        id: 'mannitol',
        label: 'Mannitol for brain swelling',
        nodeIds: ['hypertonic', 'osmotic-pressure'],
        explanation:
          'Mannitol stays outside the cells and does not cross the blood–brain barrier. Given as a hypertonic drip it draws water out of the swollen brain.',
      },
      {
        id: 'nephrotic-oedema',
        label: 'Low plasma albumin',
        nodeIds: ['oncotic'],
        explanation:
          'In nephrotic syndrome or starvation albumin falls, oncotic pressure falls, and water leaves the capillaries for the tissues: oedema.',
      },
    ],
    drill: [
      {
        id: 'osmosis-measure',
        title: 'Osmosis and its measures',
        hint: 'Which way water moves, the pressure it makes, what counts, and the numbers.',
        nodeIds: [
          'water-moves',
          'osmotic-pressure',
          'particles',
          'osmolarity',
          'body-osmolarity',
          'oncotic',
        ],
      },
      {
        id: 'tonicity-kinds',
        title: 'Tonicity',
        hint: 'What tonicity means, the three kinds, then two traps.',
        nodeIds: ['tonicity', 'isotonic', 'hypotonic', 'hypertonic', 'urea', 'glucose-drip'],
      },
    ],
  },
  lesson: [
    {
      id: 'water-follows',
      title: 'Water follows solute',
      body: 'Cell membranes let water through easily but hold back most solutes. Where there is more solute, there is less water, so water diffuses towards it until both sides are equal. That is osmosis; the pressure needed to stop it is the osmotic pressure.',
      focus: ['water-moves', 'osmotic-pressure'],
    },
    {
      id: 'particles',
      title: 'Particles, not weight',
      body: 'Osmotic pressure depends on how many particles there are, not how heavy they are. One molecule of glucose gives one particle; one of NaCl gives two. A gradient of 1 mOsm/L of a solute that cannot cross pulls with about 19.3 mmHg, so small changes move a lot of water.',
      focus: ['particles', 'osmotic-pressure'],
    },
    {
      id: 'units',
      title: 'Osmolarity and osmolality',
      body: 'Osmolarity counts osmoles per litre of solution; osmolality, per kilogram of water. In body fluids the difference is tiny. Plasma, interstitial fluid and the fluid in cells are all about 300 mOsm/L: water moves until they match.',
      focus: ['osmolarity', 'body-osmolarity'],
    },
    {
      id: 'tonicity',
      title: 'Tonicity: what happens to the cell',
      body: 'Tonicity counts only the solutes that cannot cross the membrane. In an isotonic fluid such as 0.9% saline the cell keeps its size. In a hypotonic fluid water rushes in and it swells, even bursts; in a hypertonic fluid it shrinks.',
      focus: ['tonicity', 'isotonic', 'hypotonic', 'hypertonic'],
    },
    {
      id: 'traps',
      title: 'Two traps',
      body: 'Urea crosses cell membranes, so it raises osmolarity without moving water: it is not an effective osmole. And 5% glucose is isotonic in the bag, but the cells take up and burn the glucose, leaving pure water: in the body it acts as a hypotonic fluid.',
      focus: ['urea', 'glucose-drip'],
    },
    {
      id: 'oncotic',
      title: 'Oncotic pressure',
      body: 'Small solutes cross capillary walls freely, so between plasma and interstitial fluid only the proteins count. Albumin and the other plasma proteins exert about 25 to 28 mmHg of oncotic pressure, which holds water inside the vessels.',
      focus: ['oncotic'],
    },
  ],
  questions: [
    {
      id: 'osm-hypotonic',
      prompt: 'A red cell is placed in 0.45% saline. What happens?',
      options: [
        { id: 'osm-hypo-swells', text: 'It swells and may burst' },
        { id: 'osm-hypo-shrinks', text: 'It shrinks' },
        { id: 'osm-hypo-same', text: 'Nothing: saline is isotonic' },
        { id: 'osm-hypo-salt', text: 'It gains salt but keeps its volume' },
      ],
      answerId: 'osm-hypo-swells',
      explanation:
        '0.45% saline has half the solute of plasma: it is hypotonic, so water enters the cell.',
    },
    {
      id: 'osm-urea',
      prompt: 'Why does a rise in blood urea not shrink cells?',
      options: [
        {
          id: 'osm-urea-crosses',
          text: 'Urea crosses cell membranes, so it is not an effective osmole',
        },
        { id: 'osm-urea-small', text: 'Urea molecules are too small to exert osmotic pressure' },
        { id: 'osm-urea-bound', text: 'Urea is bound to albumin' },
        { id: 'osm-urea-excreted', text: 'Urea is excreted before it can act' },
      ],
      answerId: 'osm-urea-crosses',
      explanation:
        'Urea reaches the same concentration on both sides of the membrane, so it adds to osmolarity but not to tonicity.',
    },
    {
      id: 'osm-glucose',
      prompt: 'Once given into a vein, 5% glucose behaves as…',
      options: [
        { id: 'osm-glu-free-water', text: 'Free water, because the glucose is taken up and used' },
        { id: 'osm-glu-isotonic', text: 'An isotonic fluid that stays in the plasma' },
        { id: 'osm-glu-hypertonic', text: 'A hypertonic fluid' },
        { id: 'osm-glu-colloid', text: 'A colloid' },
      ],
      answerId: 'osm-glu-free-water',
      explanation:
        'It is isotonic in the bag, but the cells remove the glucose, leaving water that spreads through every compartment.',
    },
    {
      id: 'osm-particles',
      prompt: 'Which solution has the highest osmotic pressure?',
      options: [
        { id: 'osm-part-nacl', text: '100 mmol/L NaCl' },
        { id: 'osm-part-glucose', text: '100 mmol/L glucose' },
        { id: 'osm-part-urea', text: '100 mmol/L urea' },
        { id: 'osm-part-albumin', text: '1 mmol/L albumin' },
      ],
      answerId: 'osm-part-nacl',
      explanation:
        'NaCl splits into two particles, giving about 200 mOsm/L; glucose and urea give 100; albumin, being one large molecule, very little.',
    },
  ],
  cards: [
    {
      id: 'osm-card-definitions',
      front: 'Osmolarity versus osmolality',
      back: 'Osmolarity: osmoles per litre of solution. Osmolality: osmoles per kilogram of water. Body fluids about 300 mOsm/L.',
    },
    {
      id: 'osm-card-tonicity',
      front: 'Isotonic, hypotonic, hypertonic: what happens to the cell',
      back: 'Isotonic: no change (0.9% saline). Hypotonic: swells. Hypertonic: shrinks.',
    },
    {
      id: 'osm-card-pressure',
      front: 'Osmotic pressure per milliosmole',
      back: 'About 19.3 mmHg for each mOsm/L of a solute that cannot cross the membrane.',
    },
    {
      id: 'osm-card-traps',
      front: 'Urea and 5% glucose: why are they traps?',
      back: 'Urea crosses membranes, so it is not an effective osmole. 5% glucose is isotonic in the bag but acts as free water once the glucose is used.',
    },
  ],
  readIn: [
    {
      bookId: 'guyton-hall',
      chapter: 'Chapter 4 Transport of Substances Through Cell Membranes; Chapter 25',
      pages: '57–58, 310–313',
    },
    { bookId: 'ak-jain', chapter: 'Chapter 2 Transport Across Cell Membranes', pages: '16–17' },
  ],
};
