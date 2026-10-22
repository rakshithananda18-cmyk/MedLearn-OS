import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';

// Physiology batch 1 (general physiology, NMC PY1.7). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const phBuffers: Topic = {
  slug: 'ph-buffers',
  subjectSlug: 'physiology',
  regions: [],
  title: 'pH and buffer systems',
  summary:
    'What pH means for the body’s tiny hydrogen ion concentration, the three lines of defence against a change, and the bicarbonate, phosphate and protein buffers, with the Henderson–Hasselbalch equation worked through.',
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
      'Chapter 31 Acid–Base Regulation: hydrogen ion concentration, buffer systems and respiratory regulation, pages 403 to 408',
    ),
    bookSource('ak-jain', 'Chapter 3: pH and the concept of buffer systems, pages 30 to 32'),
  ],
  keyFacts: [
    'pH = −log [H⁺]. Arterial blood is pH 7.4, [H⁺] only 40 nEq/L; venous blood and interstitial fluid about 7.35. Life lasts no more than a few hours outside about 6.8 to 8.0.',
    'Three lines of defence: chemical buffers act within seconds, the lungs within minutes by blowing off CO₂, and the kidneys over hours to days, the slowest but most powerful, by excreting acid or base.',
    'Bicarbonate buffer: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻, pK 6.1. pH = 6.1 + log (HCO₃⁻ ÷ 0.03 × PCO₂) = 6.1 + log (24 ÷ 1.2) = 6.1 + log 20 = 7.4. Its pK is far from 7.4, but the lungs and kidneys set both its parts, which makes it the most important buffer of the ECF.',
    'Phosphate buffer (pK 6.8) matters in the tubular fluid and inside cells; proteins, including haemoglobin in red cells, are the most plentiful buffers: 60 to 70% of all chemical buffering happens inside cells.',
    'Isohydric principle: all buffers in one fluid share the same [H⁺], so a change in one shifts them all, and measuring one tells the state of all.',
  ],
  visual: {
    kind: 'path',
    // Left: normal pH and the three lines of defence, then the two directions of error. Right:
    // the buffers, bicarbonate worked through first.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'ph',
          label: 'pH = −log [H⁺]',
          name: 'pH, the negative log of the hydrogen ion concentration',
          x: 180,
          y: 30,
        },
        {
          id: 'normal-ph',
          label: 'Normal 7.4,\n[H⁺] 40 nEq/L',
          name: 'Normal arterial pH 7.4, a hydrogen ion concentration of 40 nanoequivalents per litre',
          x: 85,
          y: 100,
        },
        {
          id: 'buffers',
          label: '1. Buffers: seconds',
          name: 'First line of defence: chemical buffers, within seconds',
          x: 85,
          y: 165,
        },
        {
          id: 'lungs',
          label: '2. Lungs: minutes',
          name: 'Second line: the lungs blow off carbon dioxide within minutes',
          x: 85,
          y: 225,
        },
        {
          id: 'kidneys',
          label: '3. Kidneys: hours\nto days',
          name: 'Third line: the kidneys excrete acid or base over hours to days, the most powerful',
          x: 85,
          y: 290,
        },
        {
          id: 'acidosis',
          label: 'Acidosis: below 7.35',
          name: 'Acidosis: pH below 7.35',
          x: 85,
          y: 355,
        },
        {
          id: 'alkalosis',
          label: 'Alkalosis: above 7.45',
          name: 'Alkalosis: pH above 7.45',
          x: 85,
          y: 415,
        },
        {
          id: 'bicarbonate',
          label: 'Bicarbonate: pK 6.1',
          name: 'Bicarbonate buffer system, pK 6.1',
          x: 275,
          y: 100,
        },
        {
          id: 'henderson',
          label: 'pH = 6.1 + log\nHCO₃⁻ ÷ 0.03 PCO₂',
          name: 'Henderson–Hasselbalch: pH equals 6.1 plus the log of bicarbonate over 0.03 times PCO₂',
          x: 275,
          y: 165,
        },
        {
          id: 'ratio',
          label: 'HCO₃⁻ : CO₂ = 20 : 1',
          name: 'Bicarbonate to dissolved carbon dioxide, 24 to 1.2, a ratio of 20 to 1, gives pH 7.4',
          x: 275,
          y: 225,
        },
        {
          id: 'phosphate',
          label: 'Phosphate: pK 6.8,\ncells and urine',
          name: 'Phosphate buffer, pK 6.8, important in the tubular fluid and inside cells',
          x: 275,
          y: 290,
        },
        {
          id: 'proteins',
          label: 'Proteins, haemoglobin:\nmost buffering',
          name: 'Proteins and haemoglobin: 60 to 70% of chemical buffering is inside cells',
          x: 275,
          y: 355,
        },
        {
          id: 'isohydric',
          label: 'Isohydric principle',
          name: 'Isohydric principle: all buffers in one fluid share the same hydrogen ion concentration',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'ph', to: 'normal-ph' },
        { from: 'normal-ph', to: 'buffers' },
        { from: 'buffers', to: 'lungs' },
        { from: 'lungs', to: 'kidneys' },
        { from: 'kidneys', to: 'acidosis' },
        { from: 'acidosis', to: 'alkalosis' },
        { from: 'ph', to: 'bicarbonate' },
        { from: 'bicarbonate', to: 'henderson' },
        { from: 'henderson', to: 'ratio' },
        { from: 'ratio', to: 'phosphate' },
        { from: 'phosphate', to: 'proteins' },
        { from: 'proteins', to: 'isohydric' },
      ],
    },
    lesions: [
      {
        id: 'ketoacidosis',
        label: 'Diabetic ketoacidosis',
        nodeIds: ['acidosis', 'bicarbonate', 'lungs'],
        explanation:
          'Ketoacids use up bicarbonate, so HCO₃⁻ and pH fall: metabolic acidosis. The lungs answer within minutes with deep, fast Kussmaul breathing that blows off CO₂ and brings the ratio back towards 20 : 1.',
      },
      {
        id: 'respiratory-acidosis',
        label: 'Hypoventilation',
        nodeIds: ['acidosis', 'lungs', 'kidneys'],
        explanation:
          'In severe COPD or opioid overdose CO₂ is retained and the pH falls: respiratory acidosis. Over days the kidneys compensate by excreting acid and keeping more bicarbonate.',
      },
      {
        id: 'vomiting',
        label: 'Persistent vomiting',
        nodeIds: ['alkalosis', 'bicarbonate'],
        explanation:
          'Losing stomach acid leaves bicarbonate behind in the blood: metabolic alkalosis. Breathing slows a little to retain CO₂.',
      },
      {
        id: 'hyperventilation',
        label: 'Anxious overbreathing',
        nodeIds: ['alkalosis', 'lungs'],
        explanation:
          'Blowing off too much CO₂ raises the pH: respiratory alkalosis. Less calcium is ionised, causing tingling round the mouth and carpopedal spasm.',
      },
    ],
    drill: [
      {
        id: 'defence-lines',
        title: 'Normal pH and its defences',
        hint: 'The normal value, the three lines of defence from fastest to slowest, then the two errors.',
        nodeIds: ['normal-ph', 'buffers', 'lungs', 'kidneys', 'acidosis', 'alkalosis'],
      },
      {
        id: 'buffer-systems',
        title: 'The buffers',
        hint: 'Bicarbonate worked through, then the other two buffers and the rule that links them.',
        nodeIds: ['bicarbonate', 'henderson', 'ratio', 'phosphate', 'proteins', 'isohydric'],
      },
    ],
  },
  lesson: [
    {
      id: 'tiny',
      title: 'A tiny concentration',
      body: 'Blood holds only 40 nEq of H⁺ per litre, about a millionth of its sodium, yet enzymes depend on it. pH is the negative log of [H⁺], so a lower pH means more acid, and each unit is a tenfold change. Arterial blood is 7.4; venous blood 7.35. Below about 6.8 or above 8.0, life lasts only hours.',
      focus: ['normal-ph', 'acidosis', 'alkalosis'],
    },
    {
      id: 'three-lines',
      title: 'Three lines of defence',
      body: 'Buffers bind or release H⁺ within seconds but cannot remove it. The lungs change breathing within minutes to blow off or keep CO₂. The kidneys excrete acid or base over hours to days: the slowest line, but the only one that truly rids the body of acid.',
      focus: ['buffers', 'lungs', 'kidneys'],
    },
    {
      id: 'bicarbonate',
      title: 'The bicarbonate buffer',
      body: 'CO₂ dissolves and, with carbonic anhydrase, forms carbonic acid, which splits into H⁺ and HCO₃⁻. Added acid is soaked up by HCO₃⁻ and leaves as CO₂ through the lungs. Its pK of 6.1 is far from 7.4, yet it is the main ECF buffer because the lungs set its CO₂ and the kidneys its HCO₃⁻.',
      focus: ['bicarbonate'],
    },
    {
      id: 'henderson',
      title: 'Henderson–Hasselbalch, worked through',
      body: 'pH = 6.1 + log (HCO₃⁻ ÷ 0.03 × PCO₂). With HCO₃⁻ 24 mEq/L and PCO₂ 40 mmHg, dissolved CO₂ is 1.2: the ratio is 20 : 1, log 20 is 1.3, and pH = 7.4. The pH depends on the ratio, not the amounts: double both and the pH does not move.',
      focus: ['henderson', 'ratio'],
    },
    {
      id: 'others',
      title: 'Phosphate and proteins',
      body: 'The phosphate buffer, HPO₄²⁻ and H₂PO₄⁻, has a pK of 6.8, close to the pH it works at, but there is little of it in plasma. It matters in the tubular fluid, where it is concentrated, and inside cells. Proteins are the most plentiful buffers: haemoglobin in red cells, and 60 to 70% of all chemical buffering happens inside cells.',
      focus: ['phosphate', 'proteins'],
    },
    {
      id: 'isohydric',
      title: 'All buffers together',
      body: 'Every buffer in a fluid shares the same H⁺ concentration, so a change that shifts one shifts them all: the isohydric principle. That is why measuring the bicarbonate system, as a blood gas does, shows the state of all of them.',
      focus: ['isohydric'],
    },
  ],
  questions: [
    {
      id: 'ph-calc',
      prompt: 'HCO₃⁻ is 24 mEq/L and PCO₂ is 40 mmHg. Using pK 6.1, what is the pH?',
      options: [
        { id: 'ph-calc-74', text: '7.4' },
        { id: 'ph-calc-71', text: '7.1' },
        { id: 'ph-calc-77', text: '7.7' },
        { id: 'ph-calc-61', text: '6.1' },
      ],
      answerId: 'ph-calc-74',
      explanation:
        'Dissolved CO₂ = 0.03 × 40 = 1.2; 24 ÷ 1.2 = 20; pH = 6.1 + log 20 = 6.1 + 1.3 = 7.4.',
    },
    {
      id: 'ph-slowest',
      prompt: 'Which line of defence is slowest but most powerful?',
      options: [
        { id: 'ph-line-kidneys', text: 'The kidneys' },
        { id: 'ph-line-lungs', text: 'The lungs' },
        { id: 'ph-line-bicarb', text: 'The bicarbonate buffer' },
        { id: 'ph-line-protein', text: 'Plasma proteins' },
      ],
      answerId: 'ph-line-kidneys',
      explanation:
        'Buffers act in seconds and the lungs in minutes; the kidneys take hours to days but can excrete any excess acid or base.',
    },
    {
      id: 'ph-phosphate',
      prompt: 'The phosphate buffer is most important in…',
      options: [
        { id: 'ph-phos-tubular', text: 'Renal tubular fluid and inside cells' },
        { id: 'ph-phos-plasma', text: 'Plasma' },
        { id: 'ph-phos-csf', text: 'Cerebrospinal fluid' },
        { id: 'ph-phos-saliva', text: 'Saliva' },
      ],
      answerId: 'ph-phos-tubular',
      explanation:
        'Its plasma concentration is low, but phosphate is concentrated in the tubules and plentiful in cells, and its pK of 6.8 suits the pH there.',
    },
    {
      id: 'ph-dka',
      prompt: 'In diabetic ketoacidosis, the fast deep breathing…',
      options: [
        { id: 'ph-dka-blows', text: 'Blows off CO₂ to bring the pH back up' },
        { id: 'ph-dka-oxygen', text: 'Takes in more oxygen to burn the ketones' },
        { id: 'ph-dka-cause', text: 'Causes the acidosis' },
        { id: 'ph-dka-bicarb', text: 'Raises the plasma bicarbonate' },
      ],
      answerId: 'ph-dka-blows',
      explanation:
        'Bicarbonate is used up; lowering PCO₂ brings the HCO₃⁻ : CO₂ ratio back towards 20 : 1, a respiratory compensation.',
    },
  ],
  cards: [
    {
      id: 'ph-card-normal',
      front: 'Normal arterial pH and [H⁺]',
      back: 'pH 7.4 (7.35 to 7.45), [H⁺] 40 nEq/L. Venous and interstitial about 7.35.',
    },
    {
      id: 'ph-card-lines',
      front: 'Three lines of defence and their speed',
      back: 'Buffers: seconds. Lungs: minutes. Kidneys: hours to days, most powerful.',
    },
    {
      id: 'ph-card-hh',
      front: 'Henderson–Hasselbalch for bicarbonate',
      back: 'pH = 6.1 + log (HCO₃⁻ ÷ 0.03 × PCO₂) = 6.1 + log (24 ÷ 1.2) = 7.4. Ratio 20 : 1.',
    },
    {
      id: 'ph-card-buffers',
      front: 'Three buffer systems and where each matters',
      back: 'Bicarbonate (pK 6.1): ECF. Phosphate (pK 6.8): tubular fluid and cells. Proteins and haemoglobin: inside cells, most of all buffering.',
    },
  ],
  readIn: [
    { bookId: 'guyton-hall', chapter: 'Chapter 31 Acid–Base Regulation', pages: '403–408' },
    { bookId: 'ak-jain', chapter: 'Chapter 3 Body Water and Body Fluids', pages: '30–32' },
  ],
};
