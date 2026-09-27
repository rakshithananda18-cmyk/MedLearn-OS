import type { Topic } from '@medlearn/schemas';

// Sample content for the prototype. `reviewed: false` keeps the "not medically reviewed" label
// on every screen until a medical reviewer approves it.
// Checked against the Topic schema by topics.test.ts rather than at runtime, so the schema
// library stays out of the phone's download.
export const oxygenCurve: Topic = {
  slug: 'oxygen-haemoglobin-curve',
  subjectSlug: 'physiology',
  title: 'Oxygen–haemoglobin curve',
  summary: 'Why haemoglobin loads oxygen in the lungs and lets it go in the tissues.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'Sample content for the prototype; awaiting medical review',
      licence: 'All rights reserved',
    },
    {
      title: 'OpenStax Anatomy and Physiology 2e',
      detail: '22.5 Transport of Gases',
      url: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/22-5-transport-of-gases',
      licence: 'CC BY-NC-SA 4.0; cited, not copied',
    },
  ],
  keyFacts: [
    'Cooperative binding makes the curve S-shaped.',
    'Normal P50 is about 27 mmHg; a higher P50 is a right shift.',
    'Right shift (CADET): CO₂, acid, 2,3-BPG, exercise, temperature. Oxygen is released more easily.',
    'Left shift: alkalosis, cold, low 2,3-BPG, fetal haemoglobin and carbon monoxide.',
  ],
  visual: { kind: 'oxygen-curve' },
  lesson: [
    {
      id: 'sigmoid',
      title: 'An S-shaped curve',
      body: 'Each haemoglobin carries four oxygen molecules, and every one that binds makes the next bind more easily. So saturation climbs steeply between about 20 and 60 mmHg and flattens near the top.',
      focus: [],
    },
    {
      id: 'p50',
      title: 'P50, the half-way mark',
      body: 'P50 is the oxygen pressure at which haemoglobin is half saturated: about 27 mmHg in adults. A higher P50 means the curve has shifted to the right.',
      focus: [],
    },
    {
      id: 'acid-co2',
      title: 'Acid and CO₂ shift it right',
      body: 'Working tissues make CO₂ and acid, which lower haemoglobin’s grip on oxygen (the Bohr effect). Oxygen is released exactly where it is needed.',
      focus: [],
      conditions: { pco2: 55, ph: 7.25 },
    },
    {
      id: 'heat-bpg',
      title: 'Heat and 2,3-BPG do the same',
      body: 'A warm muscle and more 2,3-BPG, for example after days at high altitude, also shift the curve right. Remember CADET, face right: CO₂, Acid, 2,3-DPG, Exercise, Temperature.',
      focus: [],
      conditions: { temperature: 40, bpg: 7 },
    },
    {
      id: 'left-shift',
      title: 'A left shift holds on',
      body: 'Alkalosis, cold and low 2,3-BPG, as in stored blood, shift the curve left: haemoglobin picks oxygen up easily but gives less of it to the tissues.',
      focus: [],
      conditions: { ph: 7.55, temperature: 35, bpg: 2 },
    },
    {
      id: 'explore',
      title: 'Try it yourself',
      body: 'Pick a situation or move the sliders. Watch the P50 marker, and how much oxygen is released between the lungs and the tissues.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'o2-right-shift',
      prompt: 'Which change shifts the oxygen–haemoglobin curve to the right?',
      options: [
        { id: 'alkalosis', text: 'Alkalosis' },
        { id: 'hypothermia', text: 'Hypothermia' },
        { id: 'raised-bpg', text: 'Raised 2,3-BPG' },
        { id: 'fetal-haemoglobin', text: 'Fetal haemoglobin' },
      ],
      answerId: 'raised-bpg',
      explanation:
        '2,3-BPG binds deoxyhaemoglobin and lowers its oxygen affinity, so P50 rises. Alkalosis, cold and fetal haemoglobin all shift the curve left.',
    },
    {
      id: 'o2-p50',
      prompt: 'What is the normal P50 of adult haemoglobin?',
      options: [
        { id: 'p50-13', text: 'About 13 mmHg' },
        { id: 'p50-27', text: 'About 27 mmHg' },
        { id: 'p50-40', text: 'About 40 mmHg' },
        { id: 'p50-100', text: 'About 100 mmHg' },
      ],
      answerId: 'p50-27',
      explanation:
        'Under normal conditions haemoglobin is half saturated at a PO₂ of about 26–27 mmHg.',
    },
    {
      id: 'o2-bohr',
      prompt: 'The Bohr effect describes how…',
      options: [
        { id: 'bohr-affinity', text: 'CO₂ and acid lower haemoglobin’s affinity for oxygen' },
        { id: 'bohr-haldane', text: 'Oxygen displaces CO₂ from haemoglobin' },
        { id: 'bohr-monoxide', text: 'Carbon monoxide binds haemoglobin' },
        { id: 'bohr-solubility', text: 'Temperature changes how much oxygen dissolves' },
      ],
      answerId: 'bohr-affinity',
      explanation:
        'Rising CO₂ and acid in the tissues lower oxygen affinity, so more oxygen is unloaded. Oxygen displacing CO₂ is the Haldane effect.',
    },
    {
      id: 'o2-stored-blood',
      prompt: 'Why does freshly transfused stored blood deliver less oxygen to the tissues?',
      options: [
        { id: 'stored-bpg', text: 'Its 2,3-BPG is depleted, shifting the curve left' },
        { id: 'stored-haemoglobin', text: 'Its haemoglobin breaks down in storage' },
        { id: 'stored-acid', text: 'It is too acidic' },
        { id: 'stored-warm', text: 'It is too warm' },
      ],
      answerId: 'stored-bpg',
      explanation:
        'Stored red cells lose 2,3-BPG, so their haemoglobin holds on to oxygen (a left shift) until the 2,3-BPG is rebuilt over about a day.',
    },
  ],
  cards: [
    {
      id: 'o2-card-shape',
      front: 'Why is the oxygen–haemoglobin curve S-shaped?',
      back: 'Cooperative binding: each oxygen that binds makes the next one bind more easily.',
    },
    {
      id: 'o2-card-right-shift',
      front: 'Causes of a right shift (CADET, face right)',
      back: 'CO₂, Acid, 2,3-DPG (BPG), Exercise, Temperature.',
    },
    {
      id: 'o2-card-p50',
      front: 'Normal P50 of adult haemoglobin',
      back: 'About 27 mmHg (26.8).',
    },
    {
      id: 'o2-card-left-shift',
      front: 'Three causes of a left shift',
      back: 'Alkalosis, hypothermia and low 2,3-BPG (stored blood); also fetal haemoglobin and carbon monoxide.',
    },
  ],
  // Chapter and page references are added from the group's textbooks.
  readIn: [],
};
