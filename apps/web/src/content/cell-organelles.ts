import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';

// Physiology batch 1 (general physiology, NMC PY1.1). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const cellOrganelles: Topic = {
  slug: 'cell-organelles',
  subjectSlug: 'physiology',
  regions: [],
  title: 'The cell and its organelles',
  summary:
    'The cell membrane, the nucleus and the organelles in the cytoplasm: the route a secreted protein takes from gene to outside the cell, and what mitochondria, lysosomes, peroxisomes, the cytoskeleton and the cell junctions do.',
  estimatedMinutes: 14,
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
      'Chapter 2 The Cell and Its Functions: membrane, organelles and their functional systems, pages 14 to 26',
    ),
    bookSource(
      'ak-jain',
      'Chapter 1 The Structure and Function of a Cell: cell membrane, organelles and junctional complexes, pages 5 to 11',
    ),
  ],
  keyFacts: [
    'The cell membrane is a lipid bilayer (phospholipids and cholesterol) with proteins floating in it: the fluid mosaic. Integral proteins make channels, carriers, pumps and receptors; carbohydrate chains on the outer surface form the glycocalyx.',
    'A secreted protein follows one route: gene in the nucleus, mRNA, ribosomes on the rough endoplasmic reticulum, the Golgi apparatus, a secretory vesicle, and exocytosis through the membrane.',
    'Smooth endoplasmic reticulum makes lipids and steroids, stores calcium (the sarcoplasmic reticulum in muscle) and detoxifies drugs in the liver.',
    'Lysosomes, budded from the Golgi, digest with acid hydrolases what the cell takes in and its own worn-out parts. Peroxisomes oxidise with oxygen, making and then breaking down hydrogen peroxide.',
    'Mitochondria make most of the cell’s ATP by oxidative phosphorylation and carry their own DNA, inherited from the mother. Microfilaments, microtubules and intermediate filaments form the cytoskeleton; tight junctions, desmosomes and gap junctions join cells.',
  ],
  visual: {
    kind: 'path',
    // Left: a secreted protein's route from the nucleus out of the cell. Right: the other
    // organelles and how cells are held together.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'cell', label: 'The cell', name: 'The cell', x: 180, y: 30 },
        {
          id: 'nucleus',
          label: 'Nucleus: DNA, mRNA',
          name: 'Nucleus: DNA is copied into messenger RNA',
          x: 85,
          y: 100,
        },
        {
          id: 'rough-er',
          label: 'Rough ER: proteins',
          name: 'Rough endoplasmic reticulum: ribosomes on its surface make proteins',
          x: 85,
          y: 165,
        },
        {
          id: 'golgi',
          label: 'Golgi: sort, package',
          name: 'Golgi apparatus: modifies, sorts and packages the proteins',
          x: 85,
          y: 225,
        },
        {
          id: 'secretory-vesicles',
          label: 'Secretory vesicles',
          name: 'Secretory vesicles carry the proteins to the cell surface',
          x: 85,
          y: 290,
        },
        {
          id: 'exocytosis',
          label: 'Exocytosis',
          name: 'Exocytosis: the vesicle fuses with the cell membrane and empties outside',
          x: 85,
          y: 355,
        },
        {
          id: 'cell-membrane',
          label: 'Cell membrane:\nfluid mosaic',
          name: 'Cell membrane: a lipid bilayer with proteins and a glycocalyx, the fluid mosaic',
          x: 85,
          y: 415,
        },
        {
          id: 'mitochondria',
          label: 'Mitochondria: ATP',
          name: 'Mitochondria: make ATP by oxidative phosphorylation',
          x: 275,
          y: 100,
        },
        {
          id: 'smooth-er',
          label: 'Smooth ER: lipids,\ncalcium, detox',
          name: 'Smooth endoplasmic reticulum: lipids and steroids, calcium store, detoxification',
          x: 275,
          y: 165,
        },
        {
          id: 'lysosomes',
          label: 'Lysosomes: digest',
          name: 'Lysosomes: acid hydrolases digest what the cell takes in and its worn-out parts',
          x: 275,
          y: 225,
        },
        {
          id: 'peroxisomes',
          label: 'Peroxisomes: oxidise',
          name: 'Peroxisomes: oxidise fatty acids and toxins, making and breaking down hydrogen peroxide',
          x: 275,
          y: 290,
        },
        {
          id: 'cytoskeleton',
          label: 'Cytoskeleton',
          name: 'Cytoskeleton: microfilaments, microtubules and intermediate filaments',
          x: 275,
          y: 355,
        },
        {
          id: 'junctions',
          label: 'Junctions: tight,\ndesmosome, gap',
          name: 'Cell junctions: tight junctions, desmosomes and gap junctions',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'cell', to: 'nucleus' },
        { from: 'nucleus', to: 'rough-er' },
        { from: 'rough-er', to: 'golgi' },
        { from: 'golgi', to: 'secretory-vesicles' },
        { from: 'secretory-vesicles', to: 'exocytosis' },
        { from: 'exocytosis', to: 'cell-membrane' },
        { from: 'cell', to: 'mitochondria' },
        { from: 'rough-er', to: 'smooth-er' },
        { from: 'golgi', to: 'lysosomes' },
        { from: 'mitochondria', to: 'smooth-er' },
        { from: 'smooth-er', to: 'lysosomes' },
        { from: 'lysosomes', to: 'peroxisomes' },
        { from: 'peroxisomes', to: 'cytoskeleton' },
        { from: 'cytoskeleton', to: 'junctions' },
      ],
    },
    lesions: [
      {
        id: 'lysosomal-storage',
        label: 'Lysosomal storage disease',
        nodeIds: ['lysosomes', 'golgi'],
        explanation:
          'When one lysosomal enzyme is missing, what it should digest piles up inside the cells: in Tay–Sachs disease, a ganglioside in the neurons. In I-cell disease the Golgi cannot tag the enzymes with mannose-6-phosphate, so they are sent out of the cell instead of to the lysosomes.',
      },
      {
        id: 'mitochondrial-disease',
        label: 'Mitochondrial disease',
        nodeIds: ['mitochondria'],
        explanation:
          'A fault in mitochondrial DNA passes from a mother to all her children, never from a father. Tissues that use the most ATP suffer most: muscle weakness, poor vision and brain disease.',
      },
      {
        id: 'peroxisome-disorder',
        label: 'Zellweger syndrome',
        nodeIds: ['peroxisomes'],
        explanation:
          'Without working peroxisomes, very long chain fatty acids cannot be broken down and build up in the brain, liver and kidneys; affected infants rarely survive the first year.',
      },
      {
        id: 'pemphigus',
        label: 'Pemphigus vulgaris',
        nodeIds: ['junctions', 'cytoskeleton'],
        explanation:
          'Antibodies attack desmoglein, the protein that holds desmosomes together. The cells of the epidermis come apart and the skin and mouth blister.',
      },
    ],
    drill: [
      {
        id: 'secretory-route',
        title: 'A secreted protein’s route',
        hint: 'From the gene to outside the cell, in order.',
        nodeIds: [
          'nucleus',
          'rough-er',
          'golgi',
          'secretory-vesicles',
          'exocytosis',
          'cell-membrane',
        ],
      },
      {
        id: 'other-organelles',
        title: 'The other organelles',
        hint: 'Energy, lipids, digestion, oxidation, shape and joining cells.',
        nodeIds: [
          'mitochondria',
          'smooth-er',
          'lysosomes',
          'peroxisomes',
          'cytoskeleton',
          'junctions',
        ],
      },
    ],
  },
  lesson: [
    {
      id: 'membrane',
      title: 'A fluid mosaic',
      body: 'The membrane is a bilayer of phospholipids, their water-loving heads outside and fatty tails inside, stiffened by cholesterol. Proteins float in it: integral proteins cross it as channels, carriers, pumps and receptors; peripheral proteins sit on its faces. Sugar chains on the outside make the glycocalyx, which gives cells their negative charge and lets them recognise each other.',
      focus: ['cell-membrane'],
    },
    {
      id: 'nucleus-er',
      title: 'From gene to protein',
      body: 'In the nucleus DNA is copied into messenger RNA, which goes out to the ribosomes. Ribosomes on the rough endoplasmic reticulum make proteins for export, for the membrane and for lysosomes, threading them into its channels.',
      focus: ['nucleus', 'rough-er'],
    },
    {
      id: 'golgi-out',
      title: 'Golgi and out of the cell',
      body: 'The Golgi apparatus adds sugars, sorts the proteins and packs them into vesicles. Secretory vesicles carry them to the surface, fuse with the membrane and empty outside: exocytosis. Each fusion also adds new membrane to the surface.',
      focus: ['golgi', 'secretory-vesicles', 'exocytosis'],
    },
    {
      id: 'smooth-er-lysosomes',
      title: 'Smooth ER and lysosomes',
      body: 'Smooth endoplasmic reticulum has no ribosomes. It makes lipids and steroid hormones, stores calcium (in muscle it is the sarcoplasmic reticulum) and in liver cells detoxifies drugs. Lysosomes bud off the Golgi full of acid hydrolases: they digest what the cell takes in and its own worn-out parts (autophagy).',
      focus: ['smooth-er', 'lysosomes'],
    },
    {
      id: 'energy',
      title: 'Mitochondria and peroxisomes',
      body: 'Mitochondria burn food with oxygen and make most of the ATP. They have their own DNA, passed down only from the mother. Peroxisomes also use oxygen: they oxidise fatty acids and toxins such as alcohol, making hydrogen peroxide, which their catalase then breaks down.',
      focus: ['mitochondria', 'peroxisomes'],
    },
    {
      id: 'skeleton-junctions',
      title: 'Shape and joining cells',
      body: 'Microfilaments (actin) move the cell, microtubules move vesicles and build cilia and the spindle, and intermediate filaments resist stretch. Tight junctions seal neighbouring cells, desmosomes rivet them together through their intermediate filaments, and gap junctions let ions pass straight from one cell to the next.',
      focus: ['cytoskeleton', 'junctions'],
    },
  ],
  questions: [
    {
      id: 'cell-secretory-route',
      prompt: 'Which is the correct route for a protein the cell secretes?',
      options: [
        { id: 'cell-route-rer-golgi', text: 'Rough ER, Golgi, secretory vesicle, exocytosis' },
        { id: 'cell-route-golgi-rer', text: 'Golgi, rough ER, lysosome, exocytosis' },
        { id: 'cell-route-ser', text: 'Smooth ER, mitochondria, secretory vesicle' },
        { id: 'cell-route-free', text: 'Free ribosomes, peroxisome, exocytosis' },
      ],
      answerId: 'cell-route-rer-golgi',
      explanation:
        'Proteins for export are made on the rough ER, modified and packed in the Golgi, and leave in secretory vesicles by exocytosis.',
    },
    {
      id: 'cell-mitochondrial-inheritance',
      prompt: 'A disease caused by a mutation in mitochondrial DNA is inherited…',
      options: [
        { id: 'cell-inherit-mother', text: 'Only from the mother' },
        { id: 'cell-inherit-father', text: 'Only from the father' },
        { id: 'cell-inherit-both', text: 'From either parent equally' },
        { id: 'cell-inherit-x', text: 'As an X-linked recessive trait' },
      ],
      answerId: 'cell-inherit-mother',
      explanation:
        'The mitochondria of the embryo all come from the egg, so mitochondrial DNA passes from a mother to every child.',
    },
    {
      id: 'cell-smooth-er',
      prompt: 'Which job belongs to the smooth endoplasmic reticulum?',
      options: [
        { id: 'cell-ser-steroids', text: 'Making steroid hormones and storing calcium' },
        { id: 'cell-ser-proteins', text: 'Making proteins for export' },
        { id: 'cell-ser-atp', text: 'Making most of the cell’s ATP' },
        { id: 'cell-ser-digest', text: 'Digesting worn-out organelles' },
      ],
      answerId: 'cell-ser-steroids',
      explanation:
        'Smooth ER has no ribosomes; it makes lipids and steroids, stores calcium and detoxifies drugs. Proteins for export are made on the rough ER.',
    },
    {
      id: 'cell-junction-ions',
      prompt: 'Which junction lets ions pass directly from one cell to the next?',
      options: [
        { id: 'cell-junction-gap', text: 'Gap junction' },
        { id: 'cell-junction-tight', text: 'Tight junction' },
        { id: 'cell-junction-desmosome', text: 'Desmosome' },
        { id: 'cell-junction-hemi', text: 'Hemidesmosome' },
      ],
      answerId: 'cell-junction-gap',
      explanation:
        'Gap junctions are channels of connexin joining two cells, so ions spread straight across, as in heart and smooth muscle. Tight junctions seal; desmosomes hold cells together.',
    },
    {
      id: 'cell-i-cell',
      prompt:
        'In I-cell disease, lysosomal enzymes are found in the blood instead of the lysosomes. Which organelle fails?',
      options: [
        { id: 'cell-icell-golgi', text: 'The Golgi apparatus' },
        { id: 'cell-icell-mito', text: 'The mitochondria' },
        { id: 'cell-icell-perox', text: 'The peroxisomes' },
        { id: 'cell-icell-nucleus', text: 'The nucleolus' },
      ],
      answerId: 'cell-icell-golgi',
      explanation:
        'The Golgi tags lysosomal enzymes with mannose-6-phosphate, the address label for lysosomes. Without it the enzymes are secreted.',
    },
  ],
  cards: [
    {
      id: 'cell-card-route',
      front: 'Route of a secreted protein',
      back: 'Nucleus (mRNA), rough ER, Golgi, secretory vesicle, exocytosis.',
    },
    {
      id: 'cell-card-membrane',
      front: 'What is the cell membrane made of?',
      back: 'A phospholipid bilayer with cholesterol, proteins (integral and peripheral) and a carbohydrate glycocalyx outside: the fluid mosaic.',
    },
    {
      id: 'cell-card-ser',
      front: 'Three jobs of smooth ER',
      back: 'Lipids and steroids, calcium storage (sarcoplasmic reticulum), detoxifying drugs in the liver.',
    },
    {
      id: 'cell-card-peroxisome',
      front: 'What do peroxisomes do?',
      back: 'Oxidise fatty acids and toxins such as alcohol, making hydrogen peroxide, which catalase breaks down.',
    },
    {
      id: 'cell-card-junctions',
      front: 'Tight junction, desmosome, gap junction: one job each',
      back: 'Tight: seals the gap between cells. Desmosome: rivets cells together. Gap: lets ions pass from cell to cell.',
    },
  ],
  readIn: [
    { bookId: 'guyton-hall', chapter: 'Chapter 2 The Cell and Its Functions', pages: '14–26' },
    { bookId: 'ak-jain', chapter: 'Chapter 1 The Structure and Function of a Cell', pages: '5–11' },
  ],
};
