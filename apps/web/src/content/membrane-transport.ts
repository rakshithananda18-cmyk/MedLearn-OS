import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';

// Physiology batch 1 (general physiology, NMC PY1.5). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const membraneTransport: Topic = {
  slug: 'membrane-transport',
  subjectSlug: 'physiology',
  regions: [],
  title: 'Transport across cell membranes',
  summary:
    'How substances cross the cell membrane: simple diffusion through the lipid and through channels, facilitated diffusion on carriers, primary active transport by the Na⁺-K⁺ pump, secondary active co-transport and counter-transport, and vesicles.',
  estimatedMinutes: 15,
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
      'Chapter 4 Transport of Substances Through Cell Membranes, pages 51 to 61; Chapter 2: endocytosis and exocytosis, pages 21 to 22',
    ),
    bookSource('ak-jain', 'Chapter 2 Transport Across Cell Membranes, pages 14 to 21'),
  ],
  keyFacts: [
    'Passive transport runs down an electrochemical gradient and needs no energy: simple diffusion through the lipid bilayer (oxygen, CO₂, alcohol) or through protein channels (ions, water through aquaporins), and facilitated diffusion on carriers (glucose on GLUT).',
    'Channels are selective and gated, by voltage (Na⁺ channels in nerve) or by a ligand (the acetylcholine receptor). Diffusion speeds up with the gradient, area, temperature and lipid solubility and slows with thickness (Fick’s law).',
    'Facilitated diffusion saturates: once every carrier is busy the rate stops rising (a Vmax), unlike simple diffusion, which rises in proportion to the gradient.',
    'Primary active transport uses ATP directly: the Na⁺-K⁺ pump moves 3 Na⁺ out and 2 K⁺ in for each ATP, keeping cells low in sodium and making the inside negative; others pump Ca²⁺ and H⁺.',
    'Secondary active transport uses the sodium gradient the pump makes: co-transport carries glucose or amino acids in with Na⁺ (SGLT); counter-transport sends Ca²⁺ or H⁺ out as Na⁺ comes in. Vesicles move large particles: endocytosis in, exocytosis out.',
  ],
  visual: {
    kind: 'path',
    // Left: passive transport, down the gradient. Right: active transport, against it, and vesicles.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'membrane-transport',
          label: 'Across the membrane',
          name: 'Transport across the cell membrane',
          x: 180,
          y: 30,
        },
        {
          id: 'passive',
          label: 'Passive: down the\ngradient, no ATP',
          name: 'Passive transport: down the electrochemical gradient, no energy used',
          x: 85,
          y: 100,
        },
        {
          id: 'simple-diffusion',
          label: 'Simple diffusion:\nthrough the lipid',
          name: 'Simple diffusion through the lipid bilayer: oxygen, carbon dioxide, alcohol',
          x: 85,
          y: 165,
        },
        {
          id: 'channels',
          label: 'Channels: voltage\nor ligand gated',
          name: 'Diffusion through protein channels, gated by voltage or a ligand',
          x: 85,
          y: 225,
        },
        {
          id: 'facilitated',
          label: 'Facilitated: carrier,\nhas a Vmax',
          name: 'Facilitated diffusion on a carrier, which saturates at a maximum rate',
          x: 85,
          y: 290,
        },
        {
          id: 'osmosis',
          label: 'Osmosis: water',
          name: 'Osmosis: diffusion of water towards more solute',
          x: 85,
          y: 355,
        },
        {
          id: 'fick',
          label: 'Rate: gradient × area\n÷ thickness',
          name: 'Rate of diffusion (Fick’s law): gradient times area and permeability, divided by thickness',
          x: 85,
          y: 415,
        },
        {
          id: 'active',
          label: 'Active: against\nthe gradient',
          name: 'Active transport: against the gradient, using energy',
          x: 275,
          y: 100,
        },
        {
          id: 'primary-active',
          label: 'Primary: Na⁺-K⁺ pump,\n3 Na⁺ out, 2 K⁺ in',
          name: 'Primary active transport: the Na⁺-K⁺ ATPase moves 3 sodium out and 2 potassium in per ATP',
          x: 275,
          y: 165,
        },
        {
          id: 'secondary-active',
          label: 'Secondary: uses the\nNa⁺ gradient',
          name: 'Secondary active transport: driven by the sodium gradient the pump makes',
          x: 275,
          y: 225,
        },
        {
          id: 'cotransport',
          label: 'Co-transport: Na⁺\nwith glucose (SGLT)',
          name: 'Co-transport (symport): sodium with glucose or amino acids, as SGLT',
          x: 275,
          y: 290,
        },
        {
          id: 'countertransport',
          label: 'Counter-transport:\nNa⁺-Ca²⁺, Na⁺-H⁺',
          name: 'Counter-transport (antiport): sodium in, calcium or hydrogen ions out',
          x: 275,
          y: 355,
        },
        {
          id: 'vesicular',
          label: 'Vesicles: endo-,\nexocytosis',
          name: 'Vesicular transport: endocytosis into the cell, exocytosis out of it',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'membrane-transport', to: 'passive' },
        { from: 'passive', to: 'simple-diffusion' },
        { from: 'simple-diffusion', to: 'channels' },
        { from: 'channels', to: 'facilitated' },
        { from: 'facilitated', to: 'osmosis' },
        { from: 'osmosis', to: 'fick' },
        { from: 'membrane-transport', to: 'active' },
        { from: 'active', to: 'primary-active' },
        { from: 'primary-active', to: 'secondary-active' },
        { from: 'secondary-active', to: 'cotransport' },
        { from: 'cotransport', to: 'countertransport' },
        { from: 'countertransport', to: 'vesicular' },
      ],
    },
    lesions: [
      {
        id: 'digoxin',
        label: 'Digoxin',
        nodeIds: ['primary-active', 'countertransport'],
        explanation:
          'Digoxin blocks the Na⁺-K⁺ pump in heart muscle. Sodium builds up inside, so the Na⁺-Ca²⁺ exchanger pushes less calcium out; the extra calcium strengthens each beat.',
      },
      {
        id: 'oral-rehydration',
        label: 'Oral rehydration',
        nodeIds: ['cotransport'],
        explanation:
          'In cholera the gut pours out salt and water, but its SGLT1 co-transporters still work. Drinking glucose with salt carries sodium in with the glucose, and water follows: oral rehydration solution saves lives.',
      },
      {
        id: 'cystic-fibrosis',
        label: 'Cystic fibrosis',
        nodeIds: ['channels'],
        explanation:
          'The CFTR chloride channel is faulty, so airway and pancreatic secretions are short of chloride and water. The mucus is thick: chest infections, blocked pancreatic ducts and a salty sweat.',
      },
      {
        id: 'proton-pump-inhibitor',
        label: 'Proton pump inhibitors',
        nodeIds: ['primary-active'],
        explanation:
          'Omeprazole blocks the H⁺-K⁺ ATPase, the primary active pump of the stomach’s parietal cells, and so the last step of acid secretion.',
      },
    ],
    drill: [
      {
        id: 'passive-routes',
        title: 'Passive transport',
        hint: 'Down the gradient: through the lipid, channels, carriers, water, then the rate.',
        nodeIds: ['passive', 'simple-diffusion', 'channels', 'facilitated', 'osmosis', 'fick'],
      },
      {
        id: 'active-routes',
        title: 'Active transport',
        hint: 'Against the gradient: the pump, what rides on its gradient, then vesicles.',
        nodeIds: [
          'active',
          'primary-active',
          'secondary-active',
          'cotransport',
          'countertransport',
          'vesicular',
        ],
      },
    ],
  },
  lesson: [
    {
      id: 'lipid',
      title: 'Through the lipid',
      body: 'Lipid-soluble substances such as oxygen, carbon dioxide, nitrogen and alcohol dissolve in the bilayer and diffuse straight through. The rate rises with the concentration gradient, the area and the lipid solubility, and falls with the membrane’s thickness: Fick’s law.',
      focus: ['passive', 'simple-diffusion', 'fick'],
    },
    {
      id: 'channels',
      title: 'Through channels',
      body: 'Ions and water cannot cross the lipid, so they use protein channels. Each channel is selective, by its size and the charges lining it, and many are gated: voltage-gated Na⁺ channels open as a nerve depolarises; the acetylcholine receptor opens when acetylcholine binds. Water uses aquaporins.',
      focus: ['channels'],
    },
    {
      id: 'carriers',
      title: 'On carriers',
      body: 'Glucose and amino acids are too large for channels. A carrier binds the molecule and changes shape to release it on the other side, still down the gradient: facilitated diffusion. As every carrier becomes busy, the rate levels off at a maximum, the Vmax; simple diffusion never levels off.',
      focus: ['facilitated'],
    },
    {
      id: 'pump',
      title: 'The Na⁺-K⁺ pump',
      body: 'Active transport moves substances against their gradient, so it needs energy. The Na⁺-K⁺ ATPase uses one ATP to move 3 Na⁺ out and 2 K⁺ in. It keeps sodium low and potassium high inside, takes one more positive charge out than in, and stops cells swelling. Calcium and H⁺ pumps work the same way.',
      focus: ['active', 'primary-active'],
    },
    {
      id: 'secondary',
      title: 'Riding the sodium gradient',
      body: 'Sodium is always trying to get in. Co-transporters let it in only with a partner going the same way: glucose on SGLT in the gut and kidney, or amino acids. Counter-transporters let it in only if something else goes out: Ca²⁺ by the Na⁺-Ca²⁺ exchanger, H⁺ by the Na⁺-H⁺ exchanger. The ATP was spent earlier, by the pump.',
      focus: ['secondary-active', 'cotransport', 'countertransport'],
    },
    {
      id: 'vesicles',
      title: 'In vesicles',
      body: 'Large molecules and particles cross in vesicles. Endocytosis takes them in: pinocytosis for fluid and proteins, often after binding receptors in coated pits; phagocytosis for bacteria and dead cells. Exocytosis sends secretions out. Transcytosis carries antibodies across cells.',
      focus: ['vesicular'],
    },
  ],
  questions: [
    {
      id: 'tra-pump-ratio',
      prompt: 'For each ATP split, the Na⁺-K⁺ pump moves…',
      options: [
        { id: 'tra-ratio-3-2', text: '3 Na⁺ out and 2 K⁺ in' },
        { id: 'tra-ratio-2-3', text: '2 Na⁺ out and 3 K⁺ in' },
        { id: 'tra-ratio-3-2-in', text: '3 Na⁺ in and 2 K⁺ out' },
        { id: 'tra-ratio-1-1', text: '1 Na⁺ out and 1 K⁺ in' },
      ],
      answerId: 'tra-ratio-3-2',
      explanation:
        'Three sodium out, two potassium in: one positive charge leaves each cycle, so the pump is electrogenic.',
    },
    {
      id: 'tra-saturation',
      prompt: 'Which kind of transport reaches a maximum rate however steep the gradient?',
      options: [
        { id: 'tra-sat-facilitated', text: 'Facilitated diffusion on a carrier' },
        { id: 'tra-sat-simple', text: 'Simple diffusion through the lipid' },
        { id: 'tra-sat-osmosis', text: 'Osmosis' },
        { id: 'tra-sat-oxygen', text: 'Diffusion of oxygen' },
      ],
      answerId: 'tra-sat-facilitated',
      explanation:
        'Carriers can all be occupied, so facilitated diffusion saturates at a Vmax. Simple diffusion rises in proportion to the gradient.',
    },
    {
      id: 'tra-sglt',
      prompt: 'Glucose enters intestinal cells against its gradient by…',
      options: [
        { id: 'tra-sglt-secondary', text: 'Secondary active co-transport with Na⁺' },
        { id: 'tra-sglt-primary', text: 'A glucose ATPase pump' },
        { id: 'tra-sglt-simple', text: 'Simple diffusion' },
        { id: 'tra-sglt-endo', text: 'Endocytosis' },
      ],
      answerId: 'tra-sglt-secondary',
      explanation:
        'SGLT1 carries glucose in with sodium, driven by the sodium gradient that the Na⁺-K⁺ pump on the other side of the cell maintains.',
    },
    {
      id: 'tra-digoxin',
      prompt: 'Digoxin strengthens the heartbeat because blocking the Na⁺-K⁺ pump…',
      options: [
        { id: 'tra-dig-calcium', text: 'Reduces calcium removal by the Na⁺-Ca²⁺ exchanger' },
        { id: 'tra-dig-potassium', text: 'Raises potassium inside the cells' },
        { id: 'tra-dig-atp', text: 'Gives the cell more ATP' },
        { id: 'tra-dig-channels', text: 'Opens more sodium channels' },
      ],
      answerId: 'tra-dig-calcium',
      explanation:
        'With sodium higher inside, the exchanger has less gradient to push calcium out; more calcium means stronger contraction.',
    },
    {
      id: 'tra-lipid',
      prompt: 'Which substance crosses the membrane mainly by simple diffusion through the lipid?',
      options: [
        { id: 'tra-lipid-oxygen', text: 'Oxygen' },
        { id: 'tra-lipid-glucose', text: 'Glucose' },
        { id: 'tra-lipid-sodium', text: 'Sodium ions' },
        { id: 'tra-lipid-protein', text: 'Albumin' },
      ],
      answerId: 'tra-lipid-oxygen',
      explanation:
        'Oxygen is small and lipid-soluble. Glucose needs carriers, ions need channels or pumps, and proteins need vesicles.',
    },
  ],
  cards: [
    {
      id: 'tra-card-types',
      front: 'Passive versus active transport',
      back: 'Passive: down the gradient, no energy (simple and facilitated diffusion, osmosis). Active: against it, with energy (primary, secondary, vesicular).',
    },
    {
      id: 'tra-card-pump',
      front: 'The Na⁺-K⁺ pump: ratio and three jobs',
      back: '3 Na⁺ out, 2 K⁺ in per ATP. Keeps Na⁺ low and K⁺ high inside, adds to the negative potential, controls cell volume.',
    },
    {
      id: 'tra-card-secondary',
      front: 'Co-transport and counter-transport: an example of each',
      back: 'Co-transport: Na⁺ with glucose (SGLT). Counter-transport: Na⁺ in, Ca²⁺ or H⁺ out.',
    },
    {
      id: 'tra-card-fick',
      front: 'What speeds up simple diffusion?',
      back: 'A steeper gradient, more area, higher lipid solubility and temperature, a thinner membrane, a smaller molecule.',
    },
  ],
  readIn: [
    {
      bookId: 'guyton-hall',
      chapter: 'Chapter 4 Transport of Substances Through Cell Membranes',
      pages: '51–61',
    },
    { bookId: 'ak-jain', chapter: 'Chapter 2 Transport Across Cell Membranes', pages: '14–21' },
  ],
};
