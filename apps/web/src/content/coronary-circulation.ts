import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  CARDIAC_VEINS,
  CORONARY_ARTERIES,
  HEART_BACK,
  HEART_FRONT,
  HEART_MODEL_CREDIT,
  HEART_MODEL_SRC,
  heartParts,
  WALLS,
} from './heart-3d';

// Thorax batch 3. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const coronaryCirculation: Topic = {
  slug: 'coronary-circulation',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Coronary arteries, cardiac veins and nerves of the heart',
  summary:
    'The two coronary arteries, their branches and territories, dominance, the veins that drain into the coronary sinus, the cardiac plexuses, and why heart pain is felt in the left arm.',
  estimatedMinutes: 16,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 18 Pericardium and Heart, pages 298 to 303'),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: coronary arteries, cardiac veins and cardiac innervation, pages 202 to 213',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Heart, coronary arteries and cardiac veins in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Right coronary: from the anterior aortic sinus, round the right coronary sulcus; gives the right marginal and usually the posterior interventricular artery.',
    'Left coronary: from the left posterior aortic sinus; divides into the anterior interventricular and circumflex arteries.',
    'The artery giving the posterior interventricular branch is dominant: the right in most hearts, the left in about 10%.',
    'Most cardiac veins drain into the coronary sinus, which opens into the right atrium; anterior cardiac veins and venae cordis minimae open into the chambers directly.',
    'Coronary arteries are functional end arteries and fill in diastole. Heart pain reaches T1–T5 and is felt in the chest and medial left arm.',
  ],
  visual: {
    kind: 'path',
    // Each coronary artery with its branches, then the veins into the coronary sinus and those that bypass it.
    diagram: {
      width: 360,
      height: 430,
      nodes: [
        {
          id: 'right-coronary-artery',
          label: 'Right\ncoronary',
          name: 'Right coronary artery',
          x: 50,
          y: 36,
        },
        {
          id: 'right-marginal-artery',
          label: 'Right\nmarginal',
          name: 'Right marginal artery',
          x: 145,
          y: 36,
        },
        {
          id: 'posterior-interventricular-artery',
          label: 'Posterior\ninterven-\ntricular',
          name: 'Posterior interventricular artery',
          x: 225,
          y: 36,
        },
        {
          id: 'dominance',
          label: 'Dominant\nartery',
          name: 'The dominant artery gives the posterior interventricular branch',
          x: 305,
          y: 36,
        },
        {
          id: 'left-coronary-artery',
          label: 'Left\ncoronary',
          name: 'Left coronary artery',
          x: 50,
          y: 126,
        },
        {
          id: 'anterior-interventricular-artery',
          label: 'Anterior\ninterven-\ntricular',
          name: 'Anterior interventricular artery',
          x: 145,
          y: 126,
        },
        {
          id: 'circumflex-artery',
          label: 'Circum-\nflex',
          name: 'Circumflex artery',
          x: 225,
          y: 126,
        },
        {
          id: 'diagonal-arteries',
          label: 'Diagonal',
          name: 'Diagonal branches of the anterior interventricular artery',
          x: 185,
          y: 190,
        },
        { id: 'coronary-sinus', label: 'Coronary\nsinus', name: 'Coronary sinus', x: 50, y: 270 },
        { id: 'great-cardiac-vein', label: 'Great', name: 'Great cardiac vein', x: 145, y: 270 },
        { id: 'middle-cardiac-vein', label: 'Middle', name: 'Middle cardiac vein', x: 225, y: 270 },
        { id: 'small-cardiac-vein', label: 'Small', name: 'Small cardiac vein', x: 305, y: 270 },
        {
          id: 'posterior-vein-of-left-ventricle',
          label: 'Posterior\nLV vein',
          name: 'Posterior vein of the left ventricle',
          x: 185,
          y: 330,
        },
        {
          id: 'direct-veins',
          label: 'Straight\ninto atria',
          name: 'Veins opening straight into the chambers',
          x: 50,
          y: 400,
        },
        {
          id: 'anterior-cardiac-veins',
          label: 'Anterior\ncardiac',
          name: 'Anterior cardiac veins',
          x: 145,
          y: 400,
        },
        {
          id: 'venae-cordis-minimae',
          label: 'Venae cordis\nminimae',
          name: 'Venae cordis minimae, in the walls of all four chambers',
          x: 240,
          y: 400,
        },
      ],
      edges: [
        { from: 'right-coronary-artery', to: 'right-marginal-artery' },
        { from: 'right-coronary-artery', to: 'posterior-interventricular-artery' },
        { from: 'posterior-interventricular-artery', to: 'dominance' },
        { from: 'left-coronary-artery', to: 'anterior-interventricular-artery' },
        { from: 'left-coronary-artery', to: 'circumflex-artery' },
        { from: 'anterior-interventricular-artery', to: 'diagonal-arteries' },
        { from: 'coronary-sinus', to: 'great-cardiac-vein' },
        { from: 'coronary-sinus', to: 'middle-cardiac-vein' },
        { from: 'coronary-sinus', to: 'small-cardiac-vein' },
        { from: 'coronary-sinus', to: 'posterior-vein-of-left-ventricle' },
        { from: 'direct-veins', to: 'anterior-cardiac-veins' },
        { from: 'direct-veins', to: 'venae-cordis-minimae' },
      ],
    },
    lesions: [
      {
        id: 'anterior-infarct',
        label: 'Anterior infarct',
        nodeIds: ['left-coronary-artery', 'anterior-interventricular-artery'],
        explanation:
          'The coronary arteries anastomose, but too little to save muscle when one is suddenly blocked: they are functional end arteries. A clot in the anterior interventricular artery kills the front of the left ventricle and the front two-thirds of the septum, and can stop the heart in ventricular fibrillation.',
      },
      {
        id: 'angina',
        label: 'Angina',
        nodeIds: ['right-coronary-artery', 'left-coronary-artery'],
        explanation:
          'A narrowed artery starves the muscle on effort. The pain travels with sympathetic fibres to cord segments T1 to T5, mostly on the left, which also take in the skin of the chest and the medial arm and forearm, so the pain is felt there.',
      },
      {
        id: 'bypass',
        label: 'Stent or bypass',
        nodeIds: ['anterior-interventricular-artery', 'circumflex-artery', 'right-coronary-artery'],
        explanation:
          'Angiography shows where an artery narrows. A short block is opened with a balloon and stent passed up from the femoral artery; long or multiple blocks are bypassed with the great saphenous vein or the internal thoracic artery.',
      },
    ],
    drill: [
      {
        id: 'arteries',
        title: 'Coronary arteries',
        hint: 'Each coronary artery and its main branches.',
        nodeIds: [
          'right-marginal-artery',
          'posterior-interventricular-artery',
          'anterior-interventricular-artery',
          'circumflex-artery',
          'diagonal-arteries',
        ],
      },
      {
        id: 'veins',
        title: 'Cardiac veins',
        hint: 'Four into the coronary sinus, two straight into the chambers.',
        nodeIds: [
          'great-cardiac-vein',
          'middle-cardiac-vein',
          'small-cardiac-vein',
          'posterior-vein-of-left-ventricle',
          'anterior-cardiac-veins',
          'venae-cordis-minimae',
        ],
      },
    ],
    model3d: {
      src: HEART_MODEL_SRC,
      credit: HEART_MODEL_CREDIT,
      parts: heartParts([
        ...WALLS,
        ...CORONARY_ARTERIES,
        ...CARDIAC_VEINS,
        'ascending-aorta',
        'pulmonary-trunk',
        'superior-vena-cava',
        'inferior-vena-cava',
      ]),
      traces: [],
      stops: [
        {
          ...HEART_FRONT,
          description:
            'Both coronary arteries leave the root of the aorta: the right between the pulmonary trunk and right auricle, the left between the trunk and left auricle.',
        },
        {
          id: 'anterior-groove',
          title: 'Anterior groove',
          description:
            'The anterior interventricular artery runs down to the apex with the great cardiac vein beside it, sending diagonal branches across the left ventricle.',
          target: [42, -150, 1215],
          position: [180, -560, 1255],
        },
        {
          id: 'right-groove',
          title: 'Right coronary sulcus',
          description:
            'From the right: the right coronary artery runs down the sulcus between the right atrium and ventricle with the small cardiac vein, giving the right marginal artery at the inferior border.',
          target: [0, -140, 1220],
          position: [-440, -420, 1220],
        },
        {
          ...HEART_BACK,
          description:
            'From behind and below: the coronary sinus in the posterior sulcus, the circumflex artery reaching it from the left, and the posterior interventricular artery and middle cardiac vein running down to the apex.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'coronaries',
      title: 'Two coronary arteries',
      body: 'Both arise from the ascending aorta just above the aortic valve and run in the coronary sulcus. They fill in diastole, when the muscle relaxes. The left is larger and feeds more muscle. Their branches anastomose, but not enough to stand in for each other when one is suddenly blocked.',
      focus: [],
    },
    {
      id: 'right',
      title: 'Right coronary artery',
      body: 'From the anterior aortic sinus it comes out between the pulmonary trunk and the right auricle, runs down the right coronary sulcus, turns round the inferior border onto the diaphragmatic surface and ends near the crux. It gives atrial branches (often the SA nodal artery), a conus artery, the right marginal artery along the inferior border, ventricular branches, and usually the posterior interventricular artery, which supplies the back third of the septum and the AV node.',
      focus: [
        'right-coronary-artery',
        'right-marginal-artery',
        'posterior-interventricular-artery',
      ],
    },
    {
      id: 'right-territory',
      title: 'Right territory',
      body: 'The right atrium, most of the right ventricle, a strip of left ventricle beside the posterior groove, the back third of the septum, and nearly all of the conducting system.',
      focus: ['right-coronary-artery'],
    },
    {
      id: 'left',
      title: 'Left coronary artery',
      body: 'From the left posterior aortic sinus it comes out between the pulmonary trunk and the left auricle and soon divides. The anterior interventricular artery runs down its groove to the apex, giving diagonal branches to the left ventricle and septal branches to the front two-thirds of the septum. The circumflex artery follows the coronary sulcus round the left border, giving the left marginal artery, and ends near the crux.',
      focus: [
        'left-coronary-artery',
        'anterior-interventricular-artery',
        'circumflex-artery',
        'diagonal-arteries',
      ],
    },
    {
      id: 'dominance',
      title: 'Dominance',
      body: 'Whichever artery gives the posterior interventricular branch is dominant. In most hearts it is the right; in about one in ten the right is small and the circumflex gives it, and the AV node artery too: a left-dominant heart.',
      focus: ['dominance', 'posterior-interventricular-artery'],
    },
    {
      id: 'veins',
      title: 'Cardiac veins',
      body: 'The coronary sinus, about 3 cm long in the posterior coronary sulcus, opens into the right atrium. Into it run the great cardiac vein (up the anterior groove, then round the left), the middle cardiac vein (in the posterior groove), the small cardiac vein (with the right coronary artery), the posterior vein of the left ventricle and the small oblique vein of the left atrium. The anterior cardiac veins open straight into the right atrium, and the venae cordis minimae into every chamber.',
      focus: [
        'coronary-sinus',
        'great-cardiac-vein',
        'middle-cardiac-vein',
        'small-cardiac-vein',
        'posterior-vein-of-left-ventricle',
        'direct-veins',
        'anterior-cardiac-veins',
        'venae-cordis-minimae',
      ],
    },
    {
      id: 'nerves',
      title: 'Nerves and lymph',
      body: 'The vagus slows the heart; sympathetic fibres from T1 to T5 speed it and widen the coronary arteries. Both form the superficial cardiac plexus, below the arch of the aorta, and the deep cardiac plexus, in front of the tracheal bifurcation, whose branches follow the coronary arteries. Lymph drains to the brachiocephalic and tracheobronchial nodes.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select an artery or vein to light it, and turn the heart round to follow each one along its groove.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'dominant-artery',
      prompt: 'The dominant coronary artery is the one that gives:',
      options: [
        { id: 'piv', text: 'The posterior interventricular artery' },
        { id: 'sa-nodal', text: 'The SA nodal artery' },
        { id: 'aiv', text: 'The anterior interventricular artery' },
        { id: 'marginal', text: 'The right marginal artery' },
      ],
      answerId: 'piv',
      explanation:
        'Usually the right coronary; in about 10% of hearts the circumflex gives it instead.',
    },
    {
      id: 'septum-front-supply',
      prompt: 'The front two-thirds of the interventricular septum is supplied by:',
      options: [
        { id: 'aiv', text: 'The anterior interventricular artery' },
        { id: 'piv', text: 'The posterior interventricular artery' },
        { id: 'circumflex', text: 'The circumflex artery' },
        { id: 'marginal', text: 'The right marginal artery' },
      ],
      answerId: 'aiv',
      explanation:
        'Its septal branches; the back third comes from the posterior interventricular artery.',
    },
    {
      id: 'not-into-sinus',
      prompt: 'Which vein does not drain into the coronary sinus?',
      options: [
        { id: 'anterior-cardiac', text: 'The anterior cardiac veins' },
        { id: 'great', text: 'The great cardiac vein' },
        { id: 'middle', text: 'The middle cardiac vein' },
        { id: 'small', text: 'The small cardiac vein' },
      ],
      answerId: 'anterior-cardiac',
      explanation:
        'They open straight into the right atrium, like the venae cordis minimae into every chamber.',
    },
    {
      id: 'left-coronary-origin',
      prompt: 'The left coronary artery arises from:',
      options: [
        { id: 'left-posterior', text: 'The left posterior aortic sinus' },
        { id: 'anterior', text: 'The anterior aortic sinus' },
        { id: 'right-posterior', text: 'The right posterior aortic sinus' },
        { id: 'pulmonary', text: 'The pulmonary trunk' },
      ],
      answerId: 'left-posterior',
      explanation: 'The right coronary arises from the anterior aortic sinus.',
    },
  ],
  cards: [
    {
      id: 'rca-branches',
      front: 'Branches of the right coronary artery?',
      back: 'Atrial (often the SA nodal), right conus, right marginal, anterior and posterior ventricular, and usually the posterior interventricular.',
    },
    {
      id: 'lca-branches',
      front: 'Branches of the left coronary artery?',
      back: 'Anterior interventricular (with diagonal, septal and left conus branches) and circumflex (with the left marginal).',
    },
    {
      id: 'coronary-sinus-tributaries',
      front: 'Tributaries of the coronary sinus?',
      back: 'Great, middle and small cardiac veins, posterior vein of the left ventricle, oblique vein of the left atrium.',
    },
    {
      id: 'cardiac-plexuses',
      front: 'Where are the superficial and deep cardiac plexuses?',
      back: 'Superficial: below the arch of the aorta, in front of the right pulmonary artery. Deep: in front of the tracheal bifurcation, behind the arch.',
    },
    {
      id: 'rca-territory',
      front: 'What does the right coronary artery supply?',
      back: 'Right atrium, most of the right ventricle, a strip of left ventricle by the posterior groove, the back third of the septum, and nearly all the conducting system.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 18 Pericardium and Heart', pages: '298–303' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '202–213' },
  ],
};
