import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';

// Physiology batch 1 (general physiology, NMC PY1.3). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const cellSignalling: Topic = {
  slug: 'cell-signalling',
  subjectSlug: 'physiology',
  regions: [],
  title: 'Intercellular communication and receptors',
  summary:
    'How cells signal to each other, from neurotransmitters to hormones, paracrine and autocrine messengers and gap junctions, and how receptors pass the message on: ion channels, G proteins with cAMP or IP3 and calcium, enzyme-linked receptors and receptors inside the cell.',
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
      'Chapter 75 Introduction to Endocrinology: chemical messengers, page 915; hormone receptors and second messengers, pages 920 to 925',
    ),
    bookSource(
      'ak-jain',
      'Chapter 2: intercellular communication and chemical messengers, pages 21 to 26',
    ),
  ],
  keyFacts: [
    'Chemical messengers: neurotransmitters across a synapse, endocrine hormones in the blood, neuroendocrine hormones from neurons into the blood (ADH, oxytocin), paracrines to neighbouring cells, autocrines back to the same cell, and cytokines. Gap junctions pass ions directly from cell to cell.',
    'Water-soluble messengers (peptides, catecholamines) bind receptors on the membrane; lipid-soluble ones (steroids, thyroid hormone) cross it and bind receptors in the cytoplasm or nucleus.',
    'Ion channel receptors open a channel at once (acetylcholine at the neuromuscular junction). G protein receptors act through a second messenger: Gs raises cAMP to activate protein kinase A, Gi lowers it, and Gq activates phospholipase C to make IP3, which releases calcium, and DAG, which activates protein kinase C.',
    'Enzyme-linked receptors are enzymes themselves or switch one on: insulin’s receptor is a tyrosine kinase; leptin’s uses JAK kinases; ANP’s makes cGMP.',
    'Steroid and thyroid hormones act slowly: the hormone–receptor complex binds DNA and changes which genes are read, so new proteins are made over hours.',
  ],
  visual: {
    kind: 'path',
    // Left: the kinds of chemical signal, near to far. Right: the receptors, from the fastest to
    // the slowest.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'chemical-messengers',
          label: 'Chemical messengers',
          name: 'Chemical messengers between cells',
          x: 180,
          y: 30,
        },
        {
          id: 'neurotransmitters',
          label: 'Neurotransmitters',
          name: 'Neurotransmitters, released by axon terminals across a synapse',
          x: 85,
          y: 100,
        },
        {
          id: 'endocrine',
          label: 'Endocrine: in blood',
          name: 'Endocrine hormones, carried by the blood to distant cells',
          x: 85,
          y: 165,
        },
        {
          id: 'neuroendocrine',
          label: 'Neuroendocrine:\nADH, oxytocin',
          name: 'Neuroendocrine hormones, released by neurons into the blood, such as ADH and oxytocin',
          x: 85,
          y: 225,
        },
        {
          id: 'paracrine',
          label: 'Paracrine: neighbours',
          name: 'Paracrines, acting on neighbouring cells',
          x: 85,
          y: 290,
        },
        {
          id: 'autocrine',
          label: 'Autocrine: same cell',
          name: 'Autocrines, acting back on the cell that made them',
          x: 85,
          y: 355,
        },
        {
          id: 'gap-junctions',
          label: 'Gap junctions:\ncell to cell',
          name: 'Gap junctions, passing ions and small molecules straight from cell to cell',
          x: 85,
          y: 415,
        },
        {
          id: 'ion-channel-receptor',
          label: 'Ion channel receptor',
          name: 'Ion channel receptors, which open a channel when the messenger binds',
          x: 275,
          y: 100,
        },
        {
          id: 'g-protein-receptor',
          label: 'G protein receptor',
          name: 'G protein-coupled receptors, seven times across the membrane',
          x: 275,
          y: 165,
        },
        {
          id: 'camp',
          label: 'Gs, Gi: cAMP,\nprotein kinase A',
          name: 'Gs raises and Gi lowers cyclic AMP, which activates protein kinase A',
          x: 275,
          y: 225,
        },
        {
          id: 'ip3-dag',
          label: 'Gq: IP3, calcium,\nDAG',
          name: 'Gq activates phospholipase C: IP3 releases calcium, DAG activates protein kinase C',
          x: 275,
          y: 290,
        },
        {
          id: 'enzyme-receptor',
          label: 'Enzyme-linked:\ntyrosine kinase',
          name: 'Enzyme-linked receptors, such as the insulin receptor tyrosine kinase',
          x: 275,
          y: 355,
        },
        {
          id: 'intracellular-receptor',
          label: 'Inside the cell:\nsteroid, thyroid',
          name: 'Receptors inside the cell for steroid and thyroid hormones, which change gene transcription',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'chemical-messengers', to: 'neurotransmitters' },
        { from: 'neurotransmitters', to: 'endocrine' },
        { from: 'endocrine', to: 'neuroendocrine' },
        { from: 'neuroendocrine', to: 'paracrine' },
        { from: 'paracrine', to: 'autocrine' },
        { from: 'autocrine', to: 'gap-junctions' },
        { from: 'chemical-messengers', to: 'ion-channel-receptor' },
        { from: 'ion-channel-receptor', to: 'g-protein-receptor' },
        { from: 'g-protein-receptor', to: 'camp' },
        { from: 'camp', to: 'ip3-dag' },
        { from: 'ip3-dag', to: 'enzyme-receptor' },
        { from: 'enzyme-receptor', to: 'intracellular-receptor' },
      ],
    },
    lesions: [
      {
        id: 'cholera-toxin',
        label: 'Cholera toxin',
        nodeIds: ['g-protein-receptor', 'camp'],
        explanation:
          'The toxin locks Gs in its active state in the cells lining the gut. cAMP stays high, the CFTR chloride channels stay open, and chloride, sodium and water pour into the bowel: litres of watery diarrhoea.',
      },
      {
        id: 'nephrogenic-di',
        label: 'Nephrogenic diabetes insipidus',
        nodeIds: ['g-protein-receptor', 'camp'],
        explanation:
          'A faulty V2 receptor in the collecting duct cannot raise cAMP when ADH binds, so no water channels reach the membrane and large volumes of dilute urine are passed despite plenty of ADH.',
      },
      {
        id: 'myasthenia',
        label: 'Myasthenia gravis',
        nodeIds: ['ion-channel-receptor', 'neurotransmitters'],
        explanation:
          'Antibodies destroy the acetylcholine receptors, ion channels on the muscle at the neuromuscular junction, so each nerve impulse opens fewer channels and the muscles tire with use.',
      },
      {
        id: 'androgen-insensitivity',
        label: 'Androgen insensitivity',
        nodeIds: ['intracellular-receptor'],
        explanation:
          'An XY person whose androgen receptor, inside the cell, does not work cannot respond to testosterone however much is made, and develops a female body form.',
      },
    ],
    drill: [
      {
        id: 'signal-kinds',
        title: 'Kinds of signal',
        hint: 'From a synapse to the blood, to neighbours, to the same cell, to direct contact.',
        nodeIds: [
          'neurotransmitters',
          'endocrine',
          'neuroendocrine',
          'paracrine',
          'autocrine',
          'gap-junctions',
        ],
      },
      {
        id: 'receptor-kinds',
        title: 'Kinds of receptor',
        hint: 'From the fastest, a channel, to the slowest, in the nucleus.',
        nodeIds: [
          'ion-channel-receptor',
          'g-protein-receptor',
          'camp',
          'ip3-dag',
          'enzyme-receptor',
          'intracellular-receptor',
        ],
      },
    ],
  },
  lesson: [
    {
      id: 'kinds',
      title: 'Six ways to send a message',
      body: 'Neurotransmitters cross a synapse; endocrine hormones travel in the blood; neuroendocrine hormones such as ADH and oxytocin are made by neurons and released into the blood. Paracrines act on neighbours, autocrines on the cell that made them, and cytokines do both or act far away. Gap junctions skip the messenger altogether.',
      focus: ['neurotransmitters', 'endocrine', 'neuroendocrine', 'paracrine', 'autocrine'],
    },
    {
      id: 'where',
      title: 'Where the receptor sits',
      body: 'A messenger that dissolves in water, a peptide or a catecholamine, cannot cross the membrane, so its receptor is on the surface. Lipid-soluble steroids and thyroid hormone cross it, and their receptors are in the cytoplasm or the nucleus.',
      focus: ['ion-channel-receptor', 'intracellular-receptor'],
    },
    {
      id: 'channels',
      title: 'Ion channel receptors: fastest',
      body: 'Acetylcholine binds the nicotinic receptor on skeletal muscle, which is itself a channel: it opens in a millisecond and sodium rushes in. GABA and glycine receptors open chloride channels the same way.',
      focus: ['ion-channel-receptor'],
    },
    {
      id: 'g-proteins',
      title: 'G proteins and second messengers',
      body: 'A G protein receptor crosses the membrane seven times. When the messenger binds, the G protein swaps GDP for GTP and switches on an enzyme. Gs activates adenylyl cyclase, making cAMP, which activates protein kinase A; Gi inhibits it. Gq activates phospholipase C, which splits a membrane lipid into IP3, releasing calcium from the ER, and DAG, which activates protein kinase C.',
      focus: ['g-protein-receptor', 'camp', 'ip3-dag'],
    },
    {
      id: 'enzymes',
      title: 'Enzyme-linked receptors',
      body: 'Some receptors are enzymes. The insulin receptor phosphorylates tyrosines on itself and its substrates; growth factors work the same way. Leptin and growth hormone receptors borrow JAK kinases. The ANP receptor makes cGMP.',
      focus: ['enzyme-receptor'],
    },
    {
      id: 'nucleus',
      title: 'Receptors inside the cell: slowest',
      body: 'Cortisol, aldosterone, the sex steroids and thyroid hormone bind receptors inside the cell. The complex binds DNA and switches genes on or off, so the effect builds over hours as new proteins are made, and lasts.',
      focus: ['intracellular-receptor'],
    },
  ],
  questions: [
    {
      id: 'sig-gq',
      prompt: 'A hormone acts through Gq. Which second messengers does it produce?',
      options: [
        { id: 'sig-gq-ip3', text: 'IP3 and DAG, raising intracellular calcium' },
        { id: 'sig-gq-camp', text: 'cAMP only' },
        { id: 'sig-gq-cgmp', text: 'cGMP only' },
        { id: 'sig-gq-none', text: 'None: it binds DNA directly' },
      ],
      answerId: 'sig-gq-ip3',
      explanation:
        'Gq activates phospholipase C, which splits PIP2 into IP3 (releases calcium from the ER) and DAG (activates protein kinase C).',
    },
    {
      id: 'sig-intracellular',
      prompt: 'Which hormone acts on a receptor inside the cell?',
      options: [
        { id: 'sig-in-cortisol', text: 'Cortisol' },
        { id: 'sig-in-insulin', text: 'Insulin' },
        { id: 'sig-in-adrenaline', text: 'Adrenaline' },
        { id: 'sig-in-glucagon', text: 'Glucagon' },
      ],
      answerId: 'sig-in-cortisol',
      explanation:
        'Cortisol is a lipid-soluble steroid and binds a cytoplasmic receptor; the others bind receptors on the membrane.',
    },
    {
      id: 'sig-insulin',
      prompt: 'The insulin receptor is…',
      options: [
        { id: 'sig-ins-tk', text: 'A tyrosine kinase' },
        { id: 'sig-ins-gs', text: 'A Gs-coupled receptor' },
        { id: 'sig-ins-channel', text: 'A ligand-gated ion channel' },
        { id: 'sig-ins-nuclear', text: 'A nuclear receptor' },
      ],
      answerId: 'sig-ins-tk',
      explanation:
        'Binding insulin makes the receptor phosphorylate tyrosines on itself and on insulin receptor substrates, starting the cascade.',
    },
    {
      id: 'sig-cholera',
      prompt: 'Cholera toxin causes watery diarrhoea because it…',
      options: [
        { id: 'sig-chol-gs', text: 'Keeps Gs active, so cAMP stays high in gut cells' },
        { id: 'sig-chol-gi', text: 'Keeps Gi active, so cAMP falls' },
        { id: 'sig-chol-pump', text: 'Blocks the Na⁺-K⁺ pump' },
        { id: 'sig-chol-junction', text: 'Opens tight junctions between gut cells' },
      ],
      answerId: 'sig-chol-gs',
      explanation:
        'High cAMP opens the CFTR chloride channels; chloride, sodium and water follow into the gut lumen.',
    },
    {
      id: 'sig-paracrine',
      prompt: 'A messenger that acts on neighbouring cells without entering the blood is called…',
      options: [
        { id: 'sig-para-para', text: 'Paracrine' },
        { id: 'sig-para-auto', text: 'Autocrine' },
        { id: 'sig-para-endo', text: 'Endocrine' },
        { id: 'sig-para-neuroendo', text: 'Neuroendocrine' },
      ],
      answerId: 'sig-para-para',
      explanation:
        'Paracrines act on neighbours, autocrines on the cell that made them; endocrine and neuroendocrine hormones travel in the blood.',
    },
  ],
  cards: [
    {
      id: 'sig-card-kinds',
      front: 'Six kinds of chemical messenger (Guyton)',
      back: 'Neurotransmitters, endocrine hormones, neuroendocrine hormones, paracrines, autocrines, cytokines.',
    },
    {
      id: 'sig-card-g',
      front: 'Gs, Gi and Gq: what each does',
      back: 'Gs raises cAMP (protein kinase A). Gi lowers cAMP. Gq activates phospholipase C: IP3 (calcium) and DAG (protein kinase C).',
    },
    {
      id: 'sig-card-where',
      front: 'Where are the receptors for peptides and for steroids?',
      back: 'Peptides and catecholamines: on the membrane. Steroids: in the cytoplasm. Thyroid hormone: in the nucleus.',
    },
    {
      id: 'sig-card-speed',
      front: 'Fastest and slowest receptor types',
      back: 'Fastest: ion channel receptors (milliseconds). Slowest: receptors inside the cell that change gene transcription (hours).',
    },
  ],
  readIn: [
    {
      bookId: 'guyton-hall',
      chapter: 'Chapter 75 Introduction to Endocrinology',
      pages: '915, 920–925',
    },
    { bookId: 'ak-jain', chapter: 'Chapter 2 Transport Across Cell Membranes', pages: '21–26' },
  ],
};
