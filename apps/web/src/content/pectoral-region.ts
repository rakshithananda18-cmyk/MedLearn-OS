import type { Point3, Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  LYMPH_GROUPS,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// BodyParts3D has no breast: the 3D view outlines it on the chest wall, from the 2nd to the 6th
// rib and from the edge of the sternum to the midaxillary line, with its axillary tail.
const BREAST_OUTLINE: Point3[] = Array.from({ length: 17 }, (_, step) => {
  const angle = (step / 16) * 2 * Math.PI;
  return [-82 + 60 * Math.cos(angle), -212, 1210 + 68 * Math.sin(angle)];
});
const AXILLARY_TAIL: Point3[] = [
  [-140, -200, 1215],
  [-150, -170, 1240],
  [-138, -140, 1256],
];

// Upper limb batch 1 (Blueprint v0.5, Section 34), in BD Chaurasia's chapter order. Facts in our
// own words; `reviewed: false` until a student checks the topic against the book pages.
export const pectoralRegion: Topic = {
  slug: 'pectoral-region',
  subjectSlug: 'anatomy',
  regions: ['upper-limb', 'thorax'],
  title: 'Pectoral region and breast',
  summary: 'The chest-wall muscles, the clavipectoral fascia, and where the breast drains.',
  estimatedMinutes: 15,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 3 Pectoral Region'),
    bookSource('grays-anatomy', 'Chapter 3 Thorax, pectoral region'),
    {
      title: 'TeachMeAnatomy: The Breasts',
      url: 'https://teachmeanatomy.info/thorax/organs/breasts/',
      licence: 'Cited, not copied',
    },
    {
      title: 'TeachMeAnatomy: Muscles of the Pectoral Region',
      url: 'https://teachmeanatomy.info/upper-limb/muscles/pectoral-region/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail:
        'Bones, muscles and vessels in the 3D view; the breast outline and lymph nodes there are a MedLearn schematic',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The breast lies in the superficial fascia from the 2nd to the 6th rib, sternal edge to midaxillary line, with an axillary tail.',
    'About three quarters of its lymph drains to the axillary nodes, pectoral group first; most of the rest to the parasternal nodes.',
    'Suspensory ligaments explain skin dimpling over a cancer; blocked skin lymphatics give peau d’orange.',
    'Pectoralis major adducts and medially rotates the arm; the lateral and medial pectoral nerves supply it.',
    'The clavipectoral fascia is pierced by the cephalic vein, lymphatics, the thoracoacromial artery and the lateral pectoral nerve.',
  ],
  visual: {
    kind: 'path',
    diagram: {
      width: 360,
      height: 400,
      nodes: [
        { id: 'breast', label: 'Breast', name: 'Breast', x: 180, y: 30 },
        { id: 'parasternal', label: 'Parasternal', name: 'Parasternal nodes', x: 60, y: 120 },
        {
          id: 'pectoral',
          label: 'Pectoral',
          name: 'Pectoral (anterior) axillary nodes',
          x: 180,
          y: 120,
        },
        {
          id: 'posterior-intercostal',
          label: 'Posterior\nintercostal',
          name: 'Posterior intercostal nodes',
          x: 300,
          y: 120,
        },
        { id: 'central', label: 'Central', name: 'Central axillary nodes', x: 180, y: 200 },
        { id: 'apical', label: 'Apical', name: 'Apical axillary nodes', x: 180, y: 280 },
        {
          id: 'subclavian-trunk',
          label: 'Subclavian\ntrunk',
          name: 'Subclavian lymph trunk',
          x: 180,
          y: 360,
        },
      ],
      edges: [
        { from: 'breast', to: 'parasternal' },
        { from: 'breast', to: 'pectoral' },
        { from: 'breast', to: 'posterior-intercostal' },
        { from: 'pectoral', to: 'central' },
        { from: 'central', to: 'apical' },
        { from: 'apical', to: 'subclavian-trunk' },
      ],
    },
    lesions: [
      {
        id: 'axillary-spread',
        label: 'Cancer spread to the axilla',
        nodeIds: ['pectoral'],
        explanation:
          'Cancer cells follow the main lymph route: the pectoral nodes first, then the central and apical nodes. The axillary nodes are the first place breast cancer usually spreads to and the main guide to prognosis, so the axilla is examined with every breast lump.',
      },
      {
        id: 'medial-spread',
        label: 'Spread from the medial breast',
        nodeIds: ['parasternal'],
        explanation:
          'Lymph from the medial part of the breast drains to the parasternal nodes along the internal thoracic vessels, inside the chest. A cancer there can spread without any lump in the axilla.',
      },
    ],
    drill: [
      {
        id: 'routes',
        title: 'Three routes out',
        hint: 'Most lymph goes to the axilla; the rest runs beside the sternum or back beside the spine.',
        nodeIds: ['breast', 'pectoral', 'parasternal', 'posterior-intercostal'],
      },
      {
        id: 'axilla',
        title: 'Through the axilla',
        hint: 'From the pectoral group, deep to pectoralis minor, then up to the apex.',
        nodeIds: ['central', 'apical'],
      },
      {
        id: 'trunk',
        title: 'Out to the veins',
        hint: 'The apical nodes form one lymph trunk on each side.',
        nodeIds: ['subclavian-trunk'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Breast outline and lymph nodes: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'clavicle',
        'humerus',
        'first-rib',
        'upper-ribs',
        'sternum',
        'pec-major',
        'pec-minor',
        'subclavius',
        'serratus',
        'axillary-artery',
        'thoracoacromial-artery',
        'lateral-thoracic-artery',
        'internal-thoracic-artery',
        'subclavian-vein',
        'axillary-vein',
        'cephalic-vein',
      ]),
      traces: [
        { id: 'breast', kind: 'outline', paths: [BREAST_OUTLINE, AXILLARY_TAIL] },
        { id: 'pectoral', kind: 'lymph', paths: [LYMPH_GROUPS.pectoral] },
        { id: 'central', kind: 'lymph', paths: [LYMPH_GROUPS.central] },
        { id: 'apical', kind: 'lymph', paths: [LYMPH_GROUPS.apical] },
        { id: 'subclavian-trunk', kind: 'lymph', paths: [LYMPH_GROUPS.trunk] },
        { id: 'parasternal', kind: 'lymph', paths: [LYMPH_GROUPS.parasternal] },
      ],
      stops: [
        {
          id: 'front',
          title: 'The chest wall',
          description:
            'Pectoralis major covers the front of the chest; the breast lies on it from the 2nd to the 6th rib, its tail reaching up into the axilla.',
          target: [-80, -150, 1230],
          position: [-120, -700, 1300],
        },
        {
          id: 'deep',
          title: 'Under pectoralis major',
          description:
            'Pectoralis minor runs from ribs 3 to 5 up to the coracoid process; subclavius lies under the clavicle. Turn off muscles to see the vessels.',
          target: [-100, -130, 1270],
          position: [-180, -480, 1330],
        },
        {
          id: 'drainage',
          title: 'Where the lymph goes',
          description:
            'Most lymph runs to the pectoral nodes, then the central and apical nodes; the medial part drains beside the sternum to the parasternal nodes.',
          target: [-80, -140, 1280],
          position: [-240, -560, 1380],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'extent',
      title: 'Where the breast lies',
      body: 'The breast lies in the superficial fascia of the front of the chest, from the 2nd to the 6th rib and from the edge of the sternum to the midaxillary line. Its axillary tail runs up along the lower border of pectoralis major into the axilla. Behind it, loose tissue (the retromammary space) lets it glide on the deep fascia.',
      focus: ['breast'],
    },
    {
      id: 'support',
      title: 'Lobes and ligaments',
      body: 'Fibrous bands, the suspensory (Cooper’s) ligaments, run from the skin to the deep fascia between 15 to 20 lobes, each with its own duct opening on the nipple. A cancer that shortens these bands dimples the skin; blocked skin lymphatics give an orange-peel look (peau d’orange); a cancer along the ducts can pull the nipple in.',
      focus: [],
    },
    {
      id: 'supply',
      title: 'Arteries and nerves',
      body: 'Arteries: perforating branches of the internal thoracic artery, the lateral thoracic and thoracoacromial branches of the axillary artery, and the posterior intercostal arteries. Veins follow the arteries. Nerves: anterior and lateral cutaneous branches of the 4th to 6th intercostal nerves.',
      focus: [],
    },
    {
      id: 'lymph-axilla',
      title: 'Most lymph goes to the axilla',
      body: 'About three quarters of the lymph, mainly from the lateral part of the breast, drains to the axillary nodes: the pectoral group first, then the central and apical groups, and on into the subclavian lymph trunk.',
      focus: ['pectoral', 'central', 'apical', 'subclavian-trunk'],
    },
    {
      id: 'lymph-other',
      title: 'The rest drains inward',
      body: 'Most of the rest, mainly from the medial part, drains to the parasternal nodes along the internal thoracic vessels; a little reaches the posterior intercostal nodes. Lymph can also cross to the opposite breast or run down towards the abdomen, routes a cancer can take.',
      focus: ['parasternal', 'posterior-intercostal'],
    },
    {
      id: 'muscles',
      title: 'Muscles of the region',
      body: 'Pectoralis major runs from the clavicle, sternum and upper costal cartilages to the lateral lip of the intertubercular groove; it adducts and medially rotates the arm, and its clavicular head flexes it (lateral and medial pectoral nerves). Pectoralis minor runs from ribs 3 to 5 to the coracoid process and steadies the scapula (mainly the medial pectoral nerve). Subclavius runs from the first rib to the clavicle.',
      focus: [],
    },
    {
      id: 'clavipectoral',
      title: 'Clavipectoral fascia',
      body: 'Deep to pectoralis major, a sheet of fascia runs from the clavicle, where it encloses subclavius, down to pectoralis minor. Four structures pierce it: the cephalic vein and lymphatics pass in towards the axilla; the thoracoacromial artery and the lateral pectoral nerve come out.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select any group of nodes to trace lymph through it. Then turn on a spread pattern to see which nodes a cancer reaches.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'breast-lymph-main',
      prompt: 'Most of the lymph from the breast drains to which nodes?',
      options: [
        { id: 'axillary', text: 'Axillary nodes' },
        { id: 'parasternal', text: 'Parasternal nodes' },
        { id: 'posterior-intercostal', text: 'Posterior intercostal nodes' },
      ],
      answerId: 'axillary',
      explanation:
        'About three quarters goes to the axillary nodes, reaching the pectoral group first. Most of the rest goes to the parasternal nodes.',
    },
    {
      id: 'clavipectoral-pierce',
      prompt: 'Which of these does NOT pierce the clavipectoral fascia?',
      options: [
        { id: 'cephalic', text: 'Cephalic vein' },
        { id: 'thoracoacromial', text: 'Thoracoacromial artery' },
        { id: 'lateral-pectoral', text: 'Lateral pectoral nerve' },
        { id: 'medial-pectoral', text: 'Medial pectoral nerve' },
      ],
      answerId: 'medial-pectoral',
      explanation:
        'The medial pectoral nerve pierces pectoralis minor instead. The fascia is pierced by the cephalic vein, lymphatics, the thoracoacromial artery and the lateral pectoral nerve.',
    },
    {
      id: 'peau-d-orange',
      prompt: 'Peau d’orange over a breast cancer is caused by:',
      options: [
        { id: 'lymphatics', text: 'Blocked skin lymphatics' },
        { id: 'ligaments', text: 'Shortened suspensory ligaments' },
        { id: 'ducts', text: 'Cancer spreading along the ducts' },
      ],
      answerId: 'lymphatics',
      explanation:
        'Blocked lymphatics make the skin swell around the hair follicles, which stay pinned down. Shortened suspensory ligaments cause dimpling; spread along the ducts retracts the nipple.',
    },
    {
      id: 'pec-major-insertion',
      prompt: 'Pectoralis major is inserted into:',
      options: [
        { id: 'lateral-lip', text: 'Lateral lip of the intertubercular groove' },
        { id: 'medial-lip', text: 'Medial lip of the intertubercular groove' },
        { id: 'floor', text: 'Floor of the intertubercular groove' },
        { id: 'coracoid', text: 'Coracoid process' },
      ],
      answerId: 'lateral-lip',
      explanation:
        'Pectoralis major takes the lateral lip, teres major the medial lip and latissimus dorsi the floor between them. Pectoralis minor is the one inserted into the coracoid.',
    },
  ],
  cards: [
    {
      id: 'breast-extent',
      front: 'Extent of the breast?',
      back: '2nd to 6th rib, edge of the sternum to the midaxillary line, with an axillary tail into the axilla.',
    },
    {
      id: 'breast-arteries',
      front: 'Arteries of the breast?',
      back: 'Internal thoracic (perforating branches), lateral thoracic and thoracoacromial (from the axillary), posterior intercostal.',
    },
    {
      id: 'skin-dimpling',
      front: 'Why does the skin dimple over a breast cancer?',
      back: 'The cancer shortens the suspensory (Cooper’s) ligaments that tie the skin to the deep fascia.',
    },
    {
      id: 'clavipectoral-structures',
      front: 'Four structures that pierce the clavipectoral fascia?',
      back: 'Cephalic vein, lymphatics, thoracoacromial artery, lateral pectoral nerve.',
    },
    {
      id: 'pec-minor-attachments',
      front: 'Attachments of pectoralis minor?',
      back: 'Ribs 3 to 5 to the coracoid process of the scapula.',
    },
  ],
  // Gray's covers the breast and pectoral region in its thorax chapter; pages to add on review.
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 3 Pectoral Region', pages: '36–50' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax (pectoral region)' },
  ],
};
