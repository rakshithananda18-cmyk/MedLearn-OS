import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';

// Physiology batch 1 (general physiology, NMC PY1.6). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const bodyFluidCompartments: Topic = {
  slug: 'body-fluid-compartments',
  subjectSlug: 'physiology',
  regions: [],
  title: 'Body fluid compartments',
  summary:
    'Where the body’s water is: total body water, the intracellular and extracellular fluid and its parts, the ions that set them apart, and how each volume is measured by indicator dilution or worked out by subtraction.',
  estimatedMinutes: 13,
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
      'Chapter 25 Regulation of Body Fluid Compartments: compartments, composition and measurement, pages 305 to 310',
    ),
    bookSource('ak-jain', 'Chapter 3 Body Water and Body Fluids, pages 27 to 29'),
  ],
  keyFacts: [
    'Total body water is about 60% of body weight, 42 litres in a 70 kg man: less in women (about 50%) and with age and fat, more in newborns (70 to 75%).',
    'Intracellular fluid is about 40% of body weight (28 L); extracellular fluid about 20% (14 L), of which interstitial fluid is about three quarters (11 L) and plasma one quarter (3 L). Transcellular fluid (CSF, synovial, pleural, eye) adds 1 to 2 L. Blood is about 7% of body weight, 5 L.',
    'Extracellular fluid is rich in Na⁺ (142), Cl⁻ (about 106) and HCO₃⁻ (24 mEq/L); intracellular fluid in K⁺ (about 140), Mg²⁺, phosphate and protein. Plasma has more protein than interstitial fluid.',
    'Indicator dilution: volume = amount injected ÷ concentration after mixing (minus any lost). Total body water: deuterium or tritium water, antipyrine. ECF: inulin, radioactive sodium, thiosulfate. Plasma: Evans blue (T-1824) or ¹²⁵I-albumin. Red cells: ⁵¹Cr.',
    'Intracellular fluid and interstitial fluid cannot be measured directly: ICF = total body water − ECF; interstitial = ECF − plasma; blood volume = plasma ÷ (1 − haematocrit).',
  ],
  visual: {
    kind: 'path',
    // Left: intracellular fluid, then how volumes are measured. Right: extracellular fluid and its
    // parts, then the volumes found by subtraction.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'total-body-water',
          label: 'Total body water:\n60%, 42 L',
          name: 'Total body water: 60% of body weight, 42 litres in a 70 kg man',
          x: 180,
          y: 30,
        },
        {
          id: 'icf',
          label: 'ICF: 40%, 28 L',
          name: 'Intracellular fluid: 40% of body weight, 28 litres',
          x: 85,
          y: 100,
        },
        {
          id: 'icf-ions',
          label: 'K⁺ 140, Mg²⁺,\nphosphate, protein',
          name: 'Intracellular fluid is rich in potassium, magnesium, phosphate and protein',
          x: 85,
          y: 165,
        },
        {
          id: 'indicator-dilution',
          label: 'Indicator dilution:\namount ÷ conc.',
          name: 'Indicator dilution: volume equals the amount injected divided by its concentration after mixing',
          x: 85,
          y: 225,
        },
        {
          id: 'tbw-indicator',
          label: 'TBW: D₂O, ³H₂O,\nantipyrine',
          name: 'Total body water is measured with deuterium or tritium water, or antipyrine',
          x: 85,
          y: 290,
        },
        {
          id: 'ecf-indicator',
          label: 'ECF: inulin, ²²Na,\nthiosulfate',
          name: 'Extracellular fluid is measured with inulin, radioactive sodium or thiosulfate',
          x: 85,
          y: 355,
        },
        {
          id: 'plasma-indicator',
          label: 'Plasma: Evans blue,\n¹²⁵I-albumin',
          name: 'Plasma is measured with Evans blue dye (T-1824) or radioiodinated albumin',
          x: 85,
          y: 415,
        },
        {
          id: 'ecf',
          label: 'ECF: 20%, 14 L',
          name: 'Extracellular fluid: 20% of body weight, 14 litres',
          x: 275,
          y: 100,
        },
        {
          id: 'ecf-ions',
          label: 'Na⁺ 142, Cl⁻ 106,\nHCO₃⁻ 24',
          name: 'Extracellular fluid is rich in sodium, chloride and bicarbonate',
          x: 275,
          y: 165,
        },
        {
          id: 'interstitial',
          label: 'Interstitial: 11 L',
          name: 'Interstitial fluid: about three quarters of the extracellular fluid, 11 litres',
          x: 275,
          y: 225,
        },
        {
          id: 'plasma',
          label: 'Plasma: 3 L',
          name: 'Plasma: about a quarter of the extracellular fluid, 3 litres',
          x: 275,
          y: 290,
        },
        {
          id: 'transcellular',
          label: 'Transcellular: 1–2 L',
          name: 'Transcellular fluid: cerebrospinal, synovial, pleural, peritoneal and eye fluids, 1 to 2 litres',
          x: 275,
          y: 355,
        },
        {
          id: 'by-subtraction',
          label: 'ICF, interstitial:\nby subtraction',
          name: 'Intracellular and interstitial fluid volumes are found by subtraction',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'total-body-water', to: 'icf' },
        { from: 'icf', to: 'icf-ions' },
        { from: 'icf-ions', to: 'indicator-dilution' },
        { from: 'indicator-dilution', to: 'tbw-indicator' },
        { from: 'tbw-indicator', to: 'ecf-indicator' },
        { from: 'ecf-indicator', to: 'plasma-indicator' },
        { from: 'total-body-water', to: 'ecf' },
        { from: 'ecf', to: 'ecf-ions' },
        { from: 'ecf-ions', to: 'interstitial' },
        { from: 'interstitial', to: 'plasma' },
        { from: 'plasma', to: 'transcellular' },
        { from: 'transcellular', to: 'by-subtraction' },
      ],
    },
    lesions: [
      {
        id: 'diarrhoea',
        label: 'Diarrhoea and vomiting',
        nodeIds: ['ecf', 'plasma', 'interstitial'],
        explanation:
          'Gut fluid is roughly isotonic, so losing it shrinks the extracellular fluid while the cells keep their water. Plasma volume falls with it: thirst, a fast pulse, low blood pressure and, if severe, shock. Isotonic saline replaces it.',
      },
      {
        id: 'oedema',
        label: 'Oedema',
        nodeIds: ['interstitial'],
        explanation:
          'Oedema is excess interstitial fluid. Heart failure raises capillary pressure, low albumin lowers oncotic pressure, and blocked lymphatics fail to drain it; each lets fluid gather in the tissues.',
      },
      {
        id: 'age-and-sex',
        label: 'Newborns, women, the elderly',
        nodeIds: ['total-body-water'],
        explanation:
          'Fat holds little water. Newborns are 70 to 75% water and dehydrate fast; women average about 50% and older or obese people less, so water-soluble drugs reach higher concentrations for the same dose per kilogram.',
      },
    ],
    drill: [
      {
        id: 'icf-measure',
        title: 'Inside the cells, and measuring',
        hint: 'The intracellular fluid and its ions, then the method and the indicator for each volume.',
        nodeIds: [
          'icf',
          'icf-ions',
          'indicator-dilution',
          'tbw-indicator',
          'ecf-indicator',
          'plasma-indicator',
        ],
      },
      {
        id: 'ecf-parts',
        title: 'Outside the cells',
        hint: 'The extracellular fluid and its ions, its three parts, then what cannot be measured directly.',
        nodeIds: ['ecf', 'ecf-ions', 'interstitial', 'plasma', 'transcellular', 'by-subtraction'],
      },
    ],
  },
  lesson: [
    {
      id: 'total',
      title: 'Sixty, forty, twenty',
      body: 'In a 70 kg man about 60% of the weight, 42 litres, is water. Two thirds of it, 40% of the weight (28 L), is inside the cells; one third, 20% (14 L), is outside. Fat holds little water, so women (about 50%) and older people have less; newborns have 70 to 75%.',
      focus: ['total-body-water', 'icf', 'ecf'],
    },
    {
      id: 'ecf-parts',
      title: 'The extracellular fluid',
      body: 'Three quarters of the extracellular fluid, 11 L, is interstitial fluid around the cells; a quarter, 3 L, is plasma. They mix freely through the capillary walls, except for protein. Transcellular fluid, 1 to 2 L, is held in special spaces: CSF, the joints, the pleura, peritoneum and the eye. Blood, plasma plus cells, is about 5 L.',
      focus: ['interstitial', 'plasma', 'transcellular'],
    },
    {
      id: 'ions',
      title: 'Different ions inside and out',
      body: 'Outside the cells sodium leads (142 mEq/L) with chloride and bicarbonate. Inside, potassium leads (about 140) with magnesium, phosphate and protein, and sodium is only about 14. The Na⁺-K⁺ pump keeps them apart; water keeps the total osmolarity equal, about 300 mOsm/L.',
      focus: ['ecf-ions', 'icf-ions'],
    },
    {
      id: 'dilution',
      title: 'Measuring by dilution',
      body: 'Inject a known amount of an indicator that stays in one compartment, let it mix, and measure its concentration: volume = amount ÷ concentration. If 10 mg is injected and the plasma holds 0.01 mg per mL after mixing, the volume is 1000 mL. The indicator must spread evenly, stay in that compartment, and not be broken down, or be corrected for.',
      focus: ['indicator-dilution'],
    },
    {
      id: 'indicators',
      title: 'An indicator for each',
      body: 'Total body water: heavy water (D₂O), tritium water or antipyrine, which cross every membrane. Extracellular fluid: inulin, radioactive sodium or thiosulfate, which stay out of the cells. Plasma: Evans blue (T-1824) or ¹²⁵I-albumin, which stay in the vessels. Red cells: ⁵¹Cr.',
      focus: ['tbw-indicator', 'ecf-indicator', 'plasma-indicator'],
    },
    {
      id: 'subtraction',
      title: 'What is worked out',
      body: 'No indicator stays only inside cells or only between them, so those volumes are calculated: intracellular fluid = total body water − extracellular fluid; interstitial fluid = extracellular fluid − plasma. Blood volume = plasma volume ÷ (1 − haematocrit): 3 L of plasma at a haematocrit of 0.40 makes 5 L of blood.',
      focus: ['by-subtraction'],
    },
  ],
  questions: [
    {
      id: 'bf-ecf-volume',
      prompt: 'In a 70 kg man, about how much extracellular fluid is there?',
      options: [
        { id: 'bf-ecf-14', text: '14 L' },
        { id: 'bf-ecf-28', text: '28 L' },
        { id: 'bf-ecf-42', text: '42 L' },
        { id: 'bf-ecf-3', text: '3 L' },
      ],
      answerId: 'bf-ecf-14',
      explanation:
        'ECF is about 20% of body weight: 14 L. 28 L is the intracellular fluid, 42 L total body water, 3 L the plasma.',
    },
    {
      id: 'bf-plasma-indicator',
      prompt: 'Which indicator measures plasma volume?',
      options: [
        { id: 'bf-ind-evans', text: 'Evans blue dye (T-1824)' },
        { id: 'bf-ind-inulin', text: 'Inulin' },
        { id: 'bf-ind-d2o', text: 'Heavy water (D₂O)' },
        { id: 'bf-ind-antipyrine', text: 'Antipyrine' },
      ],
      answerId: 'bf-ind-evans',
      explanation:
        'Evans blue binds plasma albumin and stays in the vessels. Inulin spreads through all the ECF; D₂O and antipyrine through all body water.',
    },
    {
      id: 'bf-icf-calc',
      prompt:
        'Total body water is 40 L and the inulin space is 13 L. What is the intracellular volume?',
      options: [
        { id: 'bf-calc-27', text: '27 L' },
        { id: 'bf-calc-53', text: '53 L' },
        { id: 'bf-calc-13', text: '13 L' },
        { id: 'bf-calc-10', text: '10 L' },
      ],
      answerId: 'bf-calc-27',
      explanation:
        'Inulin measures the extracellular fluid, so ICF = total body water − ECF = 40 − 13 = 27 L.',
    },
    {
      id: 'bf-main-cation',
      prompt: 'The main cation of intracellular fluid is…',
      options: [
        { id: 'bf-cation-k', text: 'Potassium' },
        { id: 'bf-cation-na', text: 'Sodium' },
        { id: 'bf-cation-ca', text: 'Calcium' },
        { id: 'bf-cation-mg', text: 'Magnesium' },
      ],
      answerId: 'bf-cation-k',
      explanation:
        'Potassium is about 140 mEq/L inside the cells and about 4 outside; sodium is the reverse.',
    },
    {
      id: 'bf-blood-volume',
      prompt: 'Plasma volume is 3 L and the haematocrit is 0.40. What is the blood volume?',
      options: [
        { id: 'bf-bv-5', text: '5 L' },
        { id: 'bf-bv-42', text: '4.2 L' },
        { id: 'bf-bv-75', text: '7.5 L' },
        { id: 'bf-bv-12', text: '1.2 L' },
      ],
      answerId: 'bf-bv-5',
      explanation: 'Blood volume = plasma ÷ (1 − haematocrit) = 3 ÷ 0.6 = 5 L.',
    },
  ],
  cards: [
    {
      id: 'bf-card-rule',
      front: 'The 60–40–20 rule',
      back: 'Total body water 60% of body weight (42 L), ICF 40% (28 L), ECF 20% (14 L) in a 70 kg man.',
    },
    {
      id: 'bf-card-ecf',
      front: 'Parts of the ECF and their volumes',
      back: 'Interstitial about 11 L (three quarters), plasma about 3 L (a quarter), transcellular 1 to 2 L.',
    },
    {
      id: 'bf-card-indicators',
      front: 'Indicators for total body water, ECF and plasma',
      back: 'TBW: D₂O, tritium water, antipyrine. ECF: inulin, ²²Na, thiosulfate. Plasma: Evans blue, ¹²⁵I-albumin.',
    },
    {
      id: 'bf-card-subtraction',
      front: 'Which volumes are calculated, and how?',
      back: 'ICF = TBW − ECF. Interstitial = ECF − plasma. Blood = plasma ÷ (1 − haematocrit).',
    },
  ],
  readIn: [
    {
      bookId: 'guyton-hall',
      chapter: 'Chapter 25 Regulation of Body Fluid Compartments',
      pages: '305–310',
    },
    { bookId: 'ak-jain', chapter: 'Chapter 3 Body Water and Body Fluids', pages: '27–29' },
  ],
};
