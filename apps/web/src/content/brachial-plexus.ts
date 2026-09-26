import { Topic } from '@medlearn/schemas';

// Sample content for the prototype. `reviewed: false` keeps the "not medically reviewed" label
// on every screen until a medical reviewer approves it.
export const brachialPlexus = Topic.parse({
  slug: 'brachial-plexus',
  subjectSlug: 'anatomy',
  title: 'Brachial plexus',
  summary: 'How five nerve roots regroup into the nerves of the upper limb.',
  estimatedMinutes: 15,
  reviewed: false,
  visual: {
    kind: 'path',
    diagram: {
      width: 360,
      height: 400,
      nodes: [
        { id: 'c5', label: 'C5', name: 'C5 root', x: 40, y: 30 },
        { id: 'c6', label: 'C6', name: 'C6 root', x: 110, y: 30 },
        { id: 'c7', label: 'C7', name: 'C7 root', x: 180, y: 30 },
        { id: 'c8', label: 'C8', name: 'C8 root', x: 250, y: 30 },
        { id: 't1', label: 'T1', name: 'T1 root', x: 320, y: 30 },
        { id: 'upper', label: 'Upper', name: 'Upper trunk', x: 75, y: 110 },
        { id: 'middle', label: 'Middle', name: 'Middle trunk', x: 180, y: 110 },
        { id: 'lower', label: 'Lower', name: 'Lower trunk', x: 285, y: 110 },
        { id: 'upper-ant', label: 'A', name: 'Upper trunk, anterior division', x: 50, y: 190 },
        { id: 'upper-post', label: 'P', name: 'Upper trunk, posterior division', x: 100, y: 190 },
        { id: 'middle-ant', label: 'A', name: 'Middle trunk, anterior division', x: 155, y: 190 },
        { id: 'middle-post', label: 'P', name: 'Middle trunk, posterior division', x: 205, y: 190 },
        { id: 'lower-ant', label: 'A', name: 'Lower trunk, anterior division', x: 260, y: 190 },
        { id: 'lower-post', label: 'P', name: 'Lower trunk, posterior division', x: 310, y: 190 },
        { id: 'lateral', label: 'Lateral', name: 'Lateral cord', x: 70, y: 270 },
        { id: 'posterior', label: 'Posterior', name: 'Posterior cord', x: 180, y: 270 },
        { id: 'medial', label: 'Medial', name: 'Medial cord', x: 290, y: 270 },
        {
          id: 'musculocutaneous',
          label: 'Musculo-\ncutaneous',
          name: 'Musculocutaneous nerve',
          x: 38,
          y: 355,
        },
        { id: 'axillary', label: 'Axillary', name: 'Axillary nerve', x: 108, y: 355 },
        { id: 'radial', label: 'Radial', name: 'Radial nerve', x: 180, y: 355 },
        { id: 'median', label: 'Median', name: 'Median nerve', x: 252, y: 355 },
        { id: 'ulnar', label: 'Ulnar', name: 'Ulnar nerve', x: 324, y: 355 },
      ],
      edges: [
        { from: 'c5', to: 'upper' },
        { from: 'c6', to: 'upper' },
        { from: 'c7', to: 'middle' },
        { from: 'c8', to: 'lower' },
        { from: 't1', to: 'lower' },
        { from: 'upper', to: 'upper-ant' },
        { from: 'upper', to: 'upper-post' },
        { from: 'middle', to: 'middle-ant' },
        { from: 'middle', to: 'middle-post' },
        { from: 'lower', to: 'lower-ant' },
        { from: 'lower', to: 'lower-post' },
        { from: 'upper-ant', to: 'lateral' },
        { from: 'middle-ant', to: 'lateral' },
        { from: 'lower-ant', to: 'medial' },
        { from: 'upper-post', to: 'posterior' },
        { from: 'middle-post', to: 'posterior' },
        { from: 'lower-post', to: 'posterior' },
        { from: 'lateral', to: 'musculocutaneous' },
        { from: 'lateral', to: 'median' },
        { from: 'medial', to: 'median' },
        { from: 'medial', to: 'ulnar' },
        { from: 'posterior', to: 'axillary' },
        { from: 'posterior', to: 'radial' },
      ],
    },
    lesions: [
      {
        id: 'erb',
        label: "Erb's palsy (C5–C6)",
        nodeIds: ['c5', 'c6', 'upper'],
        explanation:
          'Upper trunk injury, often from a difficult birth or a fall on the shoulder. Muscles supplied by C5–C6 weaken, so the arm hangs medially rotated with the forearm pronated: the "waiter\'s tip" position.',
      },
      {
        id: 'klumpke',
        label: "Klumpke's palsy (C8–T1)",
        nodeIds: ['c8', 't1', 'lower'],
        explanation:
          'Lower trunk injury, often from the arm being pulled upward. The small muscles of the hand weaken, giving a claw hand.',
      },
    ],
    drill: [
      {
        id: 'roots',
        title: 'Roots',
        hint: 'Five ventral rami, from the fifth cervical to the first thoracic.',
        nodeIds: ['c5', 'c6', 'c7', 'c8', 't1'],
      },
      {
        id: 'trunks',
        title: 'Trunks',
        hint: 'C5 and C6 join, C7 continues alone, C8 and T1 join.',
        nodeIds: ['upper', 'middle', 'lower'],
      },
      {
        id: 'divisions',
        title: 'Divisions',
        hint: 'Every trunk splits into an anterior (A) and a posterior (P) division.',
        nodeIds: [
          'upper-ant',
          'upper-post',
          'middle-ant',
          'middle-post',
          'lower-ant',
          'lower-post',
        ],
      },
      {
        id: 'cords',
        title: 'Cords',
        hint: 'Named by their position around the axillary artery.',
        nodeIds: ['lateral', 'posterior', 'medial'],
      },
      {
        id: 'branches',
        title: 'Terminal branches',
        hint: 'Five nerves: two from the posterior cord, one each from lateral and medial, one shared.',
        nodeIds: ['musculocutaneous', 'axillary', 'radial', 'median', 'ulnar'],
      },
    ],
  },
  lesson: [
    {
      id: 'roots',
      title: 'Five roots',
      body: 'The plexus begins as the ventral rami of C5, C6, C7, C8 and T1.',
      focus: ['c5', 'c6', 'c7', 'c8', 't1'],
    },
    {
      id: 'trunks',
      title: 'Three trunks',
      body: 'C5 and C6 join to form the upper trunk, C7 continues as the middle trunk, and C8 and T1 join to form the lower trunk.',
      focus: ['upper', 'middle', 'lower'],
    },
    {
      id: 'divisions',
      title: 'Six divisions',
      body: 'Each trunk splits into an anterior division (flexor compartments) and a posterior division (extensor compartments).',
      focus: ['upper-ant', 'upper-post', 'middle-ant', 'middle-post', 'lower-ant', 'lower-post'],
    },
    {
      id: 'cords',
      title: 'Three cords',
      body: 'The anterior divisions of the upper and middle trunks form the lateral cord. The anterior division of the lower trunk forms the medial cord. All three posterior divisions form the posterior cord.',
      focus: ['lateral', 'posterior', 'medial'],
    },
    {
      id: 'branches',
      title: 'Five terminal branches',
      body: 'Lateral cord: musculocutaneous nerve. Posterior cord: axillary and radial nerves. Medial cord: ulnar nerve. The median nerve takes a root from both the lateral and the medial cord.',
      focus: ['musculocutaneous', 'axillary', 'radial', 'median', 'ulnar'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select any root or nerve to trace its path through the plexus. Then turn on a lesion to see which parts are affected.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'ulnar-cord',
      prompt: 'The ulnar nerve arises from which cord?',
      options: [
        { id: 'lateral', text: 'Lateral cord' },
        { id: 'medial', text: 'Medial cord' },
        { id: 'posterior', text: 'Posterior cord' },
      ],
      answerId: 'medial',
      explanation:
        'The ulnar nerve continues from the medial cord, so it carries fibres from C8 and T1.',
    },
    {
      id: 'erb-roots',
      prompt: "Erb's palsy results from injury to which roots?",
      options: [
        { id: 'c5-c6', text: 'C5 and C6' },
        { id: 'c7', text: 'C7' },
        { id: 'c8-t1', text: 'C8 and T1' },
      ],
      answerId: 'c5-c6',
      explanation:
        "Erb's palsy is an upper trunk injury: C5 and C6. C8 and T1 are Klumpke's palsy.",
    },
    {
      id: 'posterior-cord',
      prompt: 'Which cord gives rise to the axillary and radial nerves?',
      options: [
        { id: 'lateral', text: 'Lateral cord' },
        { id: 'medial', text: 'Medial cord' },
        { id: 'posterior', text: 'Posterior cord' },
      ],
      answerId: 'posterior',
      explanation:
        'Both come from the posterior cord, which is formed by all three posterior divisions.',
    },
    {
      id: 'two-cords',
      prompt: 'Which nerve receives contributions from both the lateral and the medial cord?',
      options: [
        { id: 'musculocutaneous', text: 'Musculocutaneous nerve' },
        { id: 'median', text: 'Median nerve' },
        { id: 'ulnar', text: 'Ulnar nerve' },
      ],
      answerId: 'median',
      explanation:
        'The median nerve forms from a lateral root (lateral cord) and a medial root (medial cord).',
    },
  ],
  cards: [
    {
      id: 'plexus-roots',
      front: 'Which roots form the brachial plexus?',
      back: 'The ventral rami of C5, C6, C7, C8 and T1.',
    },
    { id: 'upper-trunk', front: 'Which roots form the upper trunk?', back: 'C5 and C6.' },
    {
      id: 'ulnar-origin',
      front: 'Which cord continues as the ulnar nerve?',
      back: 'The medial cord (C8–T1).',
    },
    {
      id: 'klumpke-sign',
      front: "Classic sign of Klumpke's palsy?",
      back: 'Claw hand, from weakness of the small muscles of the hand (C8–T1).',
    },
  ],
});
