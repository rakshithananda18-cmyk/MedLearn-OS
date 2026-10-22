import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';

// Physiology batch 1 (general physiology, NMC PY1.4). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const apoptosis: Topic = {
  slug: 'apoptosis',
  subjectSlug: 'physiology',
  regions: [],
  title: 'Apoptosis: programmed cell death',
  summary:
    'How a cell dismantles itself without harming its neighbours: the intrinsic, mitochondrial pathway and the extrinsic, death receptor pathway meeting at the executioner caspases, how it differs from necrosis, and what goes wrong in cancer and autoimmunity.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('guyton-hall', 'Chapter 3: apoptosis, programmed cell death, pages 45 to 46'),
    bookSource('ak-jain', 'Chapter 1: apoptosis, programmed cell death, pages 11 to 12'),
  ],
  keyFacts: [
    'Apoptosis is orderly, gene-directed suicide of a cell: it shrinks, its chromatin condenses, it breaks into membrane-bound apoptotic bodies and macrophages eat them before anything leaks, so there is no inflammation.',
    'Necrosis is death from injury: the cell swells and bursts, spills its contents and inflames the tissue around it.',
    'Caspases, proteases stored as inactive procaspases, carry it out: initiator caspases (8 and 9) activate executioner caspases (3), which cut the cell’s proteins and its DNA.',
    'Intrinsic pathway: DNA damage or loss of growth factors tips the balance from Bcl-2 (which guards the mitochondrion) to Bax and Bak, cytochrome c leaks out and with Apaf-1 activates caspase 9. Extrinsic pathway: Fas ligand or TNF binds a death receptor and activates caspase 8.',
    'Apoptosis shapes the embryo (separating fingers), removes billions of cells an hour in gut and marrow, deletes self-reactive lymphocytes and kills infected cells. Too little allows cancer and autoimmunity; too much takes neurons in Alzheimer disease.',
  ],
  visual: {
    kind: 'path',
    // Left: the intrinsic pathway to the apoptotic bodies. Right: the extrinsic pathway, then how
    // apoptosis differs from necrosis and what it is for.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'apoptosis', label: 'Apoptosis', name: 'Apoptosis', x: 180, y: 30 },
        {
          id: 'cell-stress',
          label: 'DNA damage, no\ngrowth factors',
          name: 'Trigger of the intrinsic pathway: DNA damage, loss of growth factors, stress',
          x: 85,
          y: 100,
        },
        {
          id: 'bcl2-bax',
          label: 'Bcl-2 loses to\nBax, Bak',
          name: 'Bcl-2 family: the protective Bcl-2 loses to Bax and Bak',
          x: 85,
          y: 165,
        },
        {
          id: 'cytochrome-c',
          label: 'Cytochrome c leaks\nfrom mitochondria',
          name: 'Cytochrome c leaks out of the mitochondria',
          x: 85,
          y: 225,
        },
        {
          id: 'caspase-9',
          label: 'Apaf-1: caspase 9',
          name: 'Cytochrome c and Apaf-1 activate caspase 9',
          x: 85,
          y: 290,
        },
        {
          id: 'executioner',
          label: 'Caspase 3:\nexecutioner',
          name: 'Executioner caspase 3 cuts the cell’s proteins and DNA',
          x: 85,
          y: 355,
        },
        {
          id: 'apoptotic-bodies',
          label: 'Apoptotic bodies,\neaten',
          name: 'Apoptotic bodies, eaten by macrophages before anything leaks',
          x: 85,
          y: 415,
        },
        {
          id: 'death-ligand',
          label: 'Fas ligand, TNF',
          name: 'Trigger of the extrinsic pathway: Fas ligand or TNF',
          x: 275,
          y: 100,
        },
        {
          id: 'death-receptor',
          label: 'Death receptor:\nFas, TNF receptor',
          name: 'Death receptors on the cell: Fas and the TNF receptor',
          x: 275,
          y: 165,
        },
        {
          id: 'caspase-8',
          label: 'Caspase 8',
          name: 'The death receptor activates caspase 8, which activates caspase 3',
          x: 275,
          y: 225,
        },
        {
          id: 'no-inflammation',
          label: 'No inflammation',
          name: 'No inflammation: the neighbours stay healthy',
          x: 275,
          y: 290,
        },
        {
          id: 'necrosis',
          label: 'Necrosis: swells,\nbursts, inflames',
          name: 'Necrosis, by contrast: the cell swells, bursts and inflames the tissue',
          x: 275,
          y: 355,
        },
        {
          id: 'roles',
          label: 'Shapes, renews,\ndefends',
          name: 'What apoptosis is for: shaping the embryo, renewing tissues, defence',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'apoptosis', to: 'cell-stress' },
        { from: 'cell-stress', to: 'bcl2-bax' },
        { from: 'bcl2-bax', to: 'cytochrome-c' },
        { from: 'cytochrome-c', to: 'caspase-9' },
        { from: 'caspase-9', to: 'executioner' },
        { from: 'executioner', to: 'apoptotic-bodies' },
        { from: 'apoptosis', to: 'death-ligand' },
        { from: 'death-ligand', to: 'death-receptor' },
        { from: 'death-receptor', to: 'caspase-8' },
        { from: 'caspase-8', to: 'executioner' },
        { from: 'apoptotic-bodies', to: 'no-inflammation' },
        { from: 'no-inflammation', to: 'necrosis' },
        { from: 'necrosis', to: 'roles' },
      ],
    },
    lesions: [
      {
        id: 'follicular-lymphoma',
        label: 'Too much Bcl-2',
        nodeIds: ['bcl2-bax'],
        explanation:
          'In follicular lymphoma a translocation, t(14;18), puts the BCL2 gene beside the immunoglobulin gene. B cells make too much Bcl-2, never get the signal to die, and pile up.',
      },
      {
        id: 'p53-loss',
        label: 'Loss of p53',
        nodeIds: ['cell-stress', 'bcl2-bax'],
        explanation:
          'p53 senses DNA damage and switches on Bax. When both copies are lost, as in many cancers and in Li–Fraumeni syndrome, damaged cells survive and divide.',
      },
      {
        id: 'fas-defect',
        label: 'Faulty Fas',
        nodeIds: ['death-receptor', 'caspase-8'],
        explanation:
          'Lymphocytes that react against the body are normally removed through Fas. When Fas does not work (autoimmune lymphoproliferative syndrome) they survive: the nodes and spleen enlarge and autoimmune disease follows.',
      },
      {
        id: 'neurodegeneration',
        label: 'Alzheimer disease',
        nodeIds: ['executioner'],
        explanation:
          'Too much apoptosis loses cells that cannot be replaced: neurons die in Alzheimer disease and other neurodegenerative diseases.',
      },
    ],
    drill: [
      {
        id: 'intrinsic',
        title: 'The intrinsic pathway',
        hint: 'From the trigger to the remains, through the mitochondrion.',
        nodeIds: [
          'cell-stress',
          'bcl2-bax',
          'cytochrome-c',
          'caspase-9',
          'executioner',
          'apoptotic-bodies',
        ],
      },
      {
        id: 'extrinsic-contrast',
        title: 'Extrinsic pathway and contrasts',
        hint: 'The death receptor route, then how apoptosis differs from necrosis and why it matters.',
        nodeIds: [
          'death-ligand',
          'death-receptor',
          'caspase-8',
          'no-inflammation',
          'necrosis',
          'roles',
        ],
      },
    ],
  },
  lesson: [
    {
      id: 'tidy-death',
      title: 'A tidy death',
      body: 'A cell that is no longer needed, or is a danger, kills itself. It shrinks, its chromatin condenses and its DNA is cut into pieces; it buds into apoptotic bodies wrapped in membrane, and macrophages eat them before anything leaks. Neighbouring cells stay healthy.',
      focus: ['apoptotic-bodies', 'no-inflammation'],
    },
    {
      id: 'not-necrosis',
      title: 'Not necrosis',
      body: 'A cell killed by injury, such as lack of blood, swells and bursts. Its contents spill and inflame the tissue around it. Necrosis is always harmful; apoptosis is part of normal life.',
      focus: ['necrosis'],
    },
    {
      id: 'caspases',
      title: 'Caspases do the work',
      body: 'Caspases are protein-cutting enzymes stored as inactive procaspases. Initiator caspases, 8 and 9, activate the executioner caspase 3, which cuts the cytoskeleton, the nuclear lamina and the DNA repair enzymes, and frees the enzyme that cuts DNA.',
      focus: ['caspase-9', 'caspase-8', 'executioner'],
    },
    {
      id: 'intrinsic',
      title: 'The intrinsic pathway',
      body: 'DNA damage, loss of growth factors or other stress tips the Bcl-2 family balance. Bcl-2 normally guards the mitochondrial membrane; Bax and Bak punch holes in it. Cytochrome c leaks out, joins Apaf-1 and activates caspase 9.',
      focus: ['cell-stress', 'bcl2-bax', 'cytochrome-c', 'caspase-9'],
    },
    {
      id: 'extrinsic',
      title: 'The extrinsic pathway',
      body: 'Fas ligand on a killer T cell, or TNF, binds a death receptor on the target cell. The receptor gathers adaptor proteins and activates caspase 8, which activates caspase 3 directly. This is how T cells kill infected cells and how self-reactive lymphocytes are removed.',
      focus: ['death-ligand', 'death-receptor', 'caspase-8'],
    },
    {
      id: 'roles',
      title: 'Why the body needs it',
      body: 'Apoptosis separates the fingers in the embryo, removes billions of cells an hour in the gut and bone marrow to balance new ones, shrinks the endometrium when hormones fall, deletes self-reactive lymphocytes and kills infected or damaged cells. Many cancer drugs work by triggering it.',
      focus: ['roles'],
    },
  ],
  questions: [
    {
      id: 'apo-vs-necrosis',
      prompt: 'Which feature belongs to apoptosis rather than necrosis?',
      options: [
        { id: 'apo-feat-shrink', text: 'The cell shrinks and is eaten without inflammation' },
        { id: 'apo-feat-swell', text: 'The cell swells and bursts' },
        { id: 'apo-feat-inflame', text: 'Neighbouring tissue becomes inflamed' },
        { id: 'apo-feat-groups', text: 'Large groups of cells die together after injury' },
      ],
      answerId: 'apo-feat-shrink',
      explanation:
        'Apoptotic cells shrink and are phagocytosed whole; necrotic cells swell, burst and cause inflammation.',
    },
    {
      id: 'apo-cytochrome',
      prompt: 'Release of cytochrome c from mitochondria starts which pathway?',
      options: [
        { id: 'apo-cyt-intrinsic', text: 'Intrinsic, through Apaf-1 and caspase 9' },
        { id: 'apo-cyt-extrinsic', text: 'Extrinsic, through Fas and caspase 8' },
        { id: 'apo-cyt-necrosis', text: 'Necrosis' },
        { id: 'apo-cyt-autophagy', text: 'Autophagy' },
      ],
      answerId: 'apo-cyt-intrinsic',
      explanation:
        'Cytochrome c joins Apaf-1 to activate caspase 9: the mitochondrial, intrinsic pathway.',
    },
    {
      id: 'apo-bcl2',
      prompt: 'In follicular lymphoma, B cells survive too long because of too much…',
      options: [
        { id: 'apo-bcl-bcl2', text: 'Bcl-2' },
        { id: 'apo-bcl-bax', text: 'Bax' },
        { id: 'apo-bcl-p53', text: 'p53' },
        { id: 'apo-bcl-casp', text: 'Caspase 3' },
      ],
      answerId: 'apo-bcl-bcl2',
      explanation:
        'The t(14;18) translocation drives Bcl-2, which keeps the mitochondrial membrane closed so the intrinsic pathway never starts.',
    },
    {
      id: 'apo-executioner',
      prompt: 'Both pathways of apoptosis meet at…',
      options: [
        { id: 'apo-exec-3', text: 'Caspase 3' },
        { id: 'apo-exec-8', text: 'Caspase 8' },
        { id: 'apo-exec-9', text: 'Caspase 9' },
        { id: 'apo-exec-fas', text: 'The Fas receptor' },
      ],
      answerId: 'apo-exec-3',
      explanation:
        'Caspase 9 (intrinsic) and caspase 8 (extrinsic) both activate the executioner caspase 3.',
    },
  ],
  cards: [
    {
      id: 'apo-card-vs',
      front: 'Apoptosis versus necrosis',
      back: 'Apoptosis: shrinks, apoptotic bodies, eaten, no inflammation, programmed. Necrosis: swells, bursts, spills, inflammation, injury.',
    },
    {
      id: 'apo-card-intrinsic',
      front: 'Intrinsic pathway in order',
      back: 'DNA damage or no growth factor, Bax and Bak beat Bcl-2, cytochrome c leaks, Apaf-1 activates caspase 9, then caspase 3.',
    },
    {
      id: 'apo-card-extrinsic',
      front: 'Extrinsic pathway in order',
      back: 'Fas ligand or TNF binds a death receptor, caspase 8, then caspase 3.',
    },
    {
      id: 'apo-card-disease',
      front: 'Too little and too much apoptosis: one disease each',
      back: 'Too little: follicular lymphoma (Bcl-2), autoimmunity (Fas). Too much: Alzheimer disease.',
    },
  ],
  readIn: [
    {
      bookId: 'guyton-hall',
      chapter: 'Chapter 3 Genetic Control of Protein Synthesis',
      pages: '45–46',
    },
    {
      bookId: 'ak-jain',
      chapter: 'Chapter 1 The Structure and Function of a Cell',
      pages: '11–12',
    },
  ],
};
