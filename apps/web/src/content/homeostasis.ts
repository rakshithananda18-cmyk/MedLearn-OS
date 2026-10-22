import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';

// Physiology batch 1 (general physiology, NMC PY1.2). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const homeostasis: Topic = {
  slug: 'homeostasis',
  subjectSlug: 'physiology',
  regions: [],
  title: 'Homeostasis and control systems',
  summary:
    'How the body keeps its internal environment steady: the parts of a negative feedback loop and its gain, when positive feedback helps and when it kills, and feed-forward and adaptive control.',
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
      'Chapter 1 Functional Organization of the Human Body and Control of the “Internal Environment”, pages 3 to 10',
    ),
    bookSource('ak-jain', 'Chapter 1: homeostasis and feedback mechanisms, pages 3 to 5'),
  ],
  keyFacts: [
    'Homeostasis is keeping the internal environment, the extracellular fluid that bathes every cell, nearly constant (Claude Bernard’s milieu intérieur; Cannon named homeostasis).',
    'Most control is negative feedback: a sensor detects a change, a control centre compares it with a set point, and an effector makes a response that opposes the change.',
    'Gain = correction ÷ error. The baroreceptor system has a gain of about −2; temperature control in the cold about −33, so it is far more effective.',
    'Positive feedback amplifies a change. It is useful when it is kept within bounds (blood clotting, childbirth, the rising phase of a nerve action potential, the LH surge) but makes a vicious cycle when it overwhelms negative feedback, as after heavy bleeding.',
    'Feed-forward control acts before an error appears, as the brain does for fast movements; adaptive control corrects the next movement from the last one’s errors, a delayed negative feedback.',
  ],
  visual: {
    kind: 'path',
    // Left: the parts of a negative feedback loop, then its gain. Right: positive feedback, then
    // the more complex controls.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'homeostasis', label: 'Homeostasis', name: 'Homeostasis', x: 180, y: 30 },
        {
          id: 'negative-feedback',
          label: 'Negative feedback',
          name: 'Negative feedback, the commonest control',
          x: 85,
          y: 100,
        },
        {
          id: 'sensor',
          label: 'Sensor: receptor',
          name: 'Sensor, a receptor that detects the change',
          x: 85,
          y: 165,
        },
        {
          id: 'control-centre',
          label: 'Control centre:\nset point',
          name: 'Control centre, which compares the value with its set point',
          x: 85,
          y: 225,
        },
        {
          id: 'effector',
          label: 'Effector',
          name: 'Effector, the muscle or gland that responds',
          x: 85,
          y: 290,
        },
        {
          id: 'correction',
          label: 'Response opposes\nthe change',
          name: 'Response that opposes the change and brings the value back',
          x: 85,
          y: 355,
        },
        {
          id: 'gain',
          label: 'Gain = correction\n÷ error',
          name: 'Gain of the system: correction divided by the error that remains',
          x: 85,
          y: 415,
        },
        {
          id: 'positive-feedback',
          label: 'Positive feedback',
          name: 'Positive feedback, which amplifies the change',
          x: 275,
          y: 100,
        },
        {
          id: 'vicious-cycle',
          label: 'Vicious cycle:\nheavy bleeding',
          name: 'Vicious cycle, as after losing 2 litres of blood',
          x: 275,
          y: 165,
        },
        {
          id: 'useful-positive',
          label: 'Useful: clotting,\nchildbirth',
          name: 'Useful positive feedback: blood clotting and childbirth',
          x: 275,
          y: 225,
        },
        {
          id: 'nerve-signal',
          label: 'Nerve signal: Na⁺\nchannels, LH surge',
          name: 'Positive feedback in the nerve action potential and the LH surge before ovulation',
          x: 275,
          y: 290,
        },
        {
          id: 'feed-forward',
          label: 'Feed-forward control',
          name: 'Feed-forward control, acting before an error appears',
          x: 275,
          y: 355,
        },
        {
          id: 'adaptive',
          label: 'Adaptive control',
          name: 'Adaptive control, a delayed negative feedback that corrects the next movement',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'homeostasis', to: 'negative-feedback' },
        { from: 'negative-feedback', to: 'sensor' },
        { from: 'sensor', to: 'control-centre' },
        { from: 'control-centre', to: 'effector' },
        { from: 'effector', to: 'correction' },
        { from: 'correction', to: 'gain' },
        { from: 'homeostasis', to: 'positive-feedback' },
        { from: 'positive-feedback', to: 'vicious-cycle' },
        { from: 'vicious-cycle', to: 'useful-positive' },
        { from: 'useful-positive', to: 'nerve-signal' },
        { from: 'nerve-signal', to: 'feed-forward' },
        { from: 'feed-forward', to: 'adaptive' },
      ],
    },
    lesions: [
      {
        id: 'haemorrhage',
        label: 'Losing 2 litres of blood',
        nodeIds: ['positive-feedback', 'vicious-cycle'],
        explanation:
          'After 1 litre, negative feedback (the baroreceptors) restores the pressure. After 2 litres the heart pumps so little that its own coronary flow falls, it weakens further and pumps even less: positive feedback, which ends in death unless blood is given.',
      },
      {
        id: 'fever',
        label: 'Fever',
        nodeIds: ['control-centre', 'effector'],
        explanation:
          'Pyrogens raise the hypothalamus’s set point. The body now reads its normal temperature as too cold, so it shivers and narrows skin vessels until the temperature reaches the new set point.',
      },
      {
        id: 'heatstroke',
        label: 'Heatstroke',
        nodeIds: ['positive-feedback', 'vicious-cycle'],
        explanation:
          'Above about 41 °C the heat speeds up the cells’ metabolism, which makes still more heat. Once this overcomes the body’s cooling, the temperature climbs out of control.',
      },
    ],
    drill: [
      {
        id: 'negative-loop',
        title: 'A negative feedback loop',
        hint: 'The loop’s parts in order, then how well it works.',
        nodeIds: [
          'negative-feedback',
          'sensor',
          'control-centre',
          'effector',
          'correction',
          'gain',
        ],
      },
      {
        id: 'other-controls',
        title: 'Positive feedback and beyond',
        hint: 'When positive feedback harms and helps, then two controls that look ahead.',
        nodeIds: [
          'positive-feedback',
          'vicious-cycle',
          'useful-positive',
          'nerve-signal',
          'feed-forward',
          'adaptive',
        ],
      },
    ],
  },
  lesson: [
    {
      id: 'internal-environment',
      title: 'The internal environment',
      body: 'Every cell lives in extracellular fluid. Its oxygen, glucose, ions, pH and temperature must stay within narrow limits for the cells to work: keeping them there is homeostasis. Nearly every organ helps: the lungs supply oxygen, the gut nutrients, the kidneys clear wastes and set the ions.',
      focus: [],
    },
    {
      id: 'loop',
      title: 'A negative feedback loop',
      body: 'A sensor detects a change, for example a rise in blood pressure at the baroreceptors. A control centre compares it with a set point and sends signals to the effectors, here the heart and vessels, which lower the pressure. The response opposes the change: that is negative feedback.',
      focus: ['negative-feedback', 'sensor', 'control-centre', 'effector', 'correction'],
    },
    {
      id: 'gain',
      title: 'How good is the control?',
      body: 'Gain = correction ÷ error. Transfuse blood and the pressure would rise 75 mmHg without baroreceptors but only 25 with them: the correction is −50 and the error +25, a gain of −2. Temperature control in the cold has a gain of about −33, far more effective.',
      focus: ['gain'],
    },
    {
      id: 'vicious',
      title: 'Positive feedback can kill',
      body: 'Positive feedback amplifies a change. After losing 2 litres of blood, the heart pumps less, its own coronary flow falls, it weakens and pumps still less, until death. A smaller loss is corrected because negative feedback is stronger.',
      focus: ['positive-feedback', 'vicious-cycle'],
    },
    {
      id: 'useful',
      title: 'Positive feedback can help',
      body: 'Kept within bounds, positive feedback finishes a job quickly. Clotting factors activate more factors until the leak is plugged; stretch of the cervix releases oxytocin, which strengthens contractions until the baby is born; sodium entry opens more sodium channels to fire a nerve impulse; oestrogen sets off the LH surge.',
      focus: ['useful-positive', 'nerve-signal'],
    },
    {
      id: 'ahead',
      title: 'Feed-forward and adaptive control',
      body: 'Fast movements are over before feedback could act, so the brain sends the commands ahead: feed-forward control. Signals from the moving parts tell it how well that went, and it corrects the next attempt: adaptive control, a delayed negative feedback, much of it by the cerebellum.',
      focus: ['feed-forward', 'adaptive'],
    },
  ],
  questions: [
    {
      id: 'hom-gain',
      prompt:
        'Without feedback a disturbance would raise the pressure by 60 mmHg; with it, by 20 mmHg. What is the gain?',
      options: [
        { id: 'hom-gain-2', text: '−2' },
        { id: 'hom-gain-3', text: '−3' },
        { id: 'hom-gain-033', text: '−0.33' },
        { id: 'hom-gain-40', text: '−40' },
      ],
      answerId: 'hom-gain-2',
      explanation:
        'The correction is −40 mmHg (from +60 to +20) and the error left is +20 mmHg: gain = −40 ÷ 20 = −2.',
    },
    {
      id: 'hom-positive',
      prompt: 'Which is an example of positive feedback?',
      options: [
        { id: 'hom-pos-oxytocin', text: 'Oxytocin release during labour' },
        { id: 'hom-pos-baroreceptor', text: 'The baroreceptor reflex' },
        { id: 'hom-pos-insulin', text: 'Insulin release after a meal' },
        { id: 'hom-pos-sweating', text: 'Sweating in the heat' },
      ],
      answerId: 'hom-pos-oxytocin',
      explanation:
        'Stretch of the cervix releases oxytocin, which strengthens contractions, which stretch the cervix more until birth. The others oppose the change.',
    },
    {
      id: 'hom-set-point',
      prompt: 'In fever, which part of the temperature control loop changes?',
      options: [
        { id: 'hom-set-raised', text: 'The set point in the hypothalamus is raised' },
        { id: 'hom-set-sensor', text: 'The skin’s temperature sensors fail' },
        { id: 'hom-set-effector', text: 'The sweat glands stop working' },
        { id: 'hom-set-gain', text: 'The loop switches to positive feedback' },
      ],
      answerId: 'hom-set-raised',
      explanation:
        'Pyrogens raise the set point, so the loop works normally but defends a higher temperature: the person shivers until it is reached.',
    },
    {
      id: 'hom-adaptive',
      prompt: 'Adaptive control is best described as…',
      options: [
        {
          id: 'hom-adaptive-delayed',
          text: 'Delayed negative feedback that corrects the next action',
        },
        { id: 'hom-adaptive-positive', text: 'A form of positive feedback' },
        { id: 'hom-adaptive-hormonal', text: 'Control by hormones only' },
        { id: 'hom-adaptive-local', text: 'Control by the cells themselves without nerves' },
      ],
      answerId: 'hom-adaptive-delayed',
      explanation:
        'The brain learns from the error of one movement and adjusts its feed-forward signals for the next: negative feedback that acts late.',
    },
  ],
  cards: [
    {
      id: 'hom-card-loop',
      front: 'Parts of a negative feedback loop',
      back: 'Sensor (receptor), control centre with a set point, effector; the response opposes the change.',
    },
    {
      id: 'hom-card-gain',
      front: 'Gain of a control system, and two examples',
      back: 'Correction ÷ error. Baroreceptors about −2; temperature control in the cold about −33.',
    },
    {
      id: 'hom-card-positive',
      front: 'Four useful positive feedbacks',
      back: 'Blood clotting, childbirth (oxytocin), the rising phase of the nerve action potential, the LH surge.',
    },
    {
      id: 'hom-card-vicious',
      front: 'When does bleeding become a vicious cycle?',
      back: 'After about 2 litres: the weakened heart pumps less, coronary flow falls, it weakens more. After 1 litre, negative feedback wins.',
    },
  ],
  readIn: [
    {
      bookId: 'guyton-hall',
      chapter: 'Chapter 1 Functional Organization of the Human Body',
      pages: '3–10',
    },
    { bookId: 'ak-jain', chapter: 'Chapter 1 The Structure and Function of a Cell', pages: '3–5' },
  ],
};
