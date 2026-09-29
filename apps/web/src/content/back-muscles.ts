import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  DORSAL_SCAPULAR_NERVE,
  LATISSIMUS_OUTLINE,
  SPINAL_ACCESSORY_NERVE,
  THORACODORSAL_NERVE,
} from './scapular-3d';
import { SHOULDER_MODEL_CREDIT, SHOULDER_MODEL_SRC, shoulderParts } from './shoulder-3d';

// Upper limb batch 2 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const backMuscles: Topic = {
  slug: 'back-muscles',
  subjectSlug: 'anatomy',
  // Listed with the upper limb in the studio; the back marker on the body shows it too.
  regions: ['upper-limb', 'back'],
  title: 'Back: muscles of the upper limb',
  summary:
    'Trapezius, latissimus dorsi, levator scapulae and the rhomboids: how they tie the upper limb to the spine, their nerves, and the triangle of auscultation.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 5 Back, pages 68 to 71'),
    bookSource('grays-anatomy', 'Chapter 2 Back, superficial back muscles, pages 86 to 91'),
    {
      title: 'TeachMeAnatomy: The Superficial Back Muscles',
      url: 'https://teachmeanatomy.info/back/muscles/superficial/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones, muscles and vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Four muscles tie the upper limb to the spine: trapezius and latissimus dorsi on the surface, levator scapulae and the two rhomboids under trapezius.',
    'Trapezius: skull and spines of C7 to T12 to the lateral clavicle, acromion and spine of the scapula. Spinal accessory nerve. With serratus anterior it turns the scapula up so the arm can go overhead.',
    'Latissimus dorsi: spines of T7 to T12, thoracolumbar fascia, iliac crest and lower ribs to the floor of the intertubercular groove. Thoracodorsal nerve. Extends, adducts and medially rotates the arm.',
    'Levator scapulae (C1 to C4) and the rhomboids (C7 to T5) insert along the medial border of the scapula. Dorsal scapular nerve.',
    'Triangle of auscultation: latissimus dorsi below, trapezius medially, the medial border of the scapula laterally. Breath sounds are clearest here.',
  ],
  visual: {
    kind: 'path',
    // Each nerve on the left, the muscle it supplies, and what that muscle does.
    diagram: {
      width: 360,
      height: 350,
      nodes: [
        {
          id: 'spinal-accessory',
          label: 'Accessory\nnerve',
          name: 'Spinal accessory nerve',
          x: 60,
          y: 40,
        },
        { id: 'trapezius', label: 'Trapezius', name: 'Trapezius', x: 180, y: 40 },
        {
          id: 'upward-rotation',
          label: 'Shrug; turn\nscapula up',
          name: 'Shrugging, bracing the shoulders and turning the scapula up',
          x: 300,
          y: 40,
        },
        {
          id: 'thoracodorsal',
          label: 'Thoraco-\ndorsal n.',
          name: 'Thoracodorsal nerve',
          x: 60,
          y: 110,
        },
        {
          id: 'latissimus',
          label: 'Latissimus\ndorsi',
          name: 'Latissimus dorsi',
          x: 180,
          y: 110,
        },
        {
          id: 'arm-pull',
          label: 'Pull arm\ndown, back',
          name: 'Extending, adducting and medially rotating the arm',
          x: 300,
          y: 110,
        },
        { id: 'c3-c4', label: 'C3, C4', name: 'Branches of C3 and C4', x: 60, y: 180 },
        {
          id: 'levator-scapulae',
          label: 'Levator\nscapulae',
          name: 'Levator scapulae',
          x: 180,
          y: 200,
        },
        {
          id: 'elevation',
          label: 'Raise\nscapula',
          name: 'Raising the scapula',
          x: 300,
          y: 200,
        },
        {
          id: 'dorsal-scapular',
          label: 'Dorsal\nscapular n.',
          name: 'Dorsal scapular nerve',
          x: 60,
          y: 260,
        },
        {
          id: 'rhomboid-minor',
          label: 'Rhomboid\nminor',
          name: 'Rhomboid minor',
          x: 180,
          y: 260,
        },
        {
          id: 'rhomboid-major',
          label: 'Rhomboid\nmajor',
          name: 'Rhomboid major',
          x: 180,
          y: 320,
        },
        {
          id: 'retraction',
          label: 'Brace\nscapula back',
          name: 'Pulling the scapula back towards the spine',
          x: 300,
          y: 290,
        },
      ],
      edges: [
        { from: 'spinal-accessory', to: 'trapezius' },
        { from: 'trapezius', to: 'upward-rotation' },
        { from: 'thoracodorsal', to: 'latissimus' },
        { from: 'latissimus', to: 'arm-pull' },
        { from: 'c3-c4', to: 'levator-scapulae' },
        { from: 'dorsal-scapular', to: 'levator-scapulae' },
        { from: 'levator-scapulae', to: 'elevation' },
        { from: 'dorsal-scapular', to: 'rhomboid-minor' },
        { from: 'dorsal-scapular', to: 'rhomboid-major' },
        { from: 'rhomboid-minor', to: 'retraction' },
        { from: 'rhomboid-major', to: 'retraction' },
      ],
    },
    lesions: [
      {
        id: 'accessory-injury',
        label: 'Spinal accessory nerve injury',
        nodeIds: ['spinal-accessory'],
        explanation:
          'The spinal accessory nerve crosses the posterior triangle of the neck just under the skin, so a lymph node biopsy or neck surgery there can cut it. Trapezius is paralysed: the shoulder droops, the patient cannot shrug against resistance, and raising the arm above the head is hard because the scapula no longer turns up.',
      },
      {
        id: 'dorsal-scapular-injury',
        label: 'Dorsal scapular nerve injury',
        nodeIds: ['dorsal-scapular'],
        explanation:
          'Levator scapulae and the rhomboids weaken. The scapula drifts away from the spine and the patient cannot brace the shoulder back; the upper part of levator scapulae keeps some supply from C3 and C4.',
      },
      {
        id: 'thoracodorsal-injury',
        label: 'Thoracodorsal nerve injury',
        nodeIds: ['thoracodorsal'],
        explanation:
          'The thoracodorsal nerve runs down the posterior wall of the axilla and is at risk when axillary lymph nodes are cleared. Latissimus dorsi weakens, so pulling the arm down and back, as in climbing or swimming, becomes harder.',
      },
    ],
    drill: [
      {
        id: 'nerves',
        title: 'Nerves',
        hint: 'One cranial nerve, one from the posterior cord, one from the C5 root, and two cervical branches.',
        nodeIds: ['spinal-accessory', 'thoracodorsal', 'c3-c4', 'dorsal-scapular'],
      },
      {
        id: 'muscles',
        title: 'Muscles',
        hint: 'Two on the surface, three under trapezius.',
        nodeIds: [
          'trapezius',
          'latissimus',
          'levator-scapulae',
          'rhomboid-minor',
          'rhomboid-major',
        ],
      },
      {
        id: 'actions',
        title: 'What they do',
        hint: 'Think of what each muscle does to the scapula, or to the arm for latissimus.',
        nodeIds: ['upward-rotation', 'arm-pull', 'elevation', 'retraction'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerves and the latissimus dorsi outline: MedLearn schematic, not yet medically reviewed. The source model has no latissimus dorsi.`,
      parts: shoulderParts([
        'trapezius',
        'levator-scapulae',
        'rhomboid-minor',
        'rhomboid-major',
        'teres-major',
        'scapula',
        'clavicle',
        'humerus',
        'vertebra-c5',
        'vertebra-c6',
        'vertebra-c7',
        'vertebra-t1',
        'thoracic-vertebrae',
        'upper-ribs',
        'lower-ribs',
      ]),
      traces: [
        { id: 'spinal-accessory', kind: 'nerve', paths: SPINAL_ACCESSORY_NERVE },
        { id: 'thoracodorsal', kind: 'nerve', paths: THORACODORSAL_NERVE },
        { id: 'dorsal-scapular', kind: 'nerve', paths: DORSAL_SCAPULAR_NERVE },
        { id: 'latissimus', kind: 'outline', paths: LATISSIMUS_OUTLINE },
      ],
      stops: [
        {
          id: 'overview',
          title: 'From behind',
          description:
            'The back of the right shoulder: trapezius spreads from the spine to the scapula, and latissimus dorsi (outlined) sweeps up from the lower back to the arm.',
          target: [-60, -10, 1250],
          position: [-180, 620, 1330],
        },
        {
          id: 'trapezius',
          title: 'Trapezius',
          description:
            'Its fibres converge from the skull and the spine onto the clavicle, acromion and spine of the scapula. The spinal accessory nerve runs down on its deep surface.',
          target: [-40, -5, 1300],
          position: [-110, 560, 1420],
        },
        {
          id: 'deep-layer',
          title: 'Under trapezius',
          description:
            'Levator scapulae and the rhomboids line the medial border of the scapula. Tap trapezius and hide it to see them, with the dorsal scapular nerve beside them.',
          target: [-50, -10, 1310],
          position: [-160, 420, 1340],
        },
        {
          id: 'latissimus',
          title: 'Latissimus dorsi',
          description:
            'From the lower spine and back it crosses the inferior angle of the scapula and winds round teres major to reach the front of the humerus.',
          target: [-90, 0, 1170],
          position: [-260, 560, 1150],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'layers',
      title: 'Two layers, one job',
      body: 'Four muscles tie the upper limb to the vertebral column. Trapezius and latissimus dorsi form the surface layer; levator scapulae and the two rhomboids lie under trapezius. Although they sit on the back, they belong to the limb: they move the scapula or the humerus.',
      focus: ['trapezius', 'latissimus', 'levator-scapulae', 'rhomboid-minor', 'rhomboid-major'],
    },
    {
      id: 'trapezius',
      title: 'Trapezius',
      body: 'Trapezius arises from the back of the skull, the ligamentum nuchae and the spines of C7 to T12, and inserts into the lateral third of the clavicle, the acromion and the spine of the scapula. Its upper fibres shrug, its middle fibres brace the shoulders back, and its upper and lower fibres together turn the scapula up, which the arm needs to rise above the head. Its motor nerve is the spinal accessory nerve.',
      focus: ['spinal-accessory', 'trapezius', 'upward-rotation'],
    },
    {
      id: 'latissimus',
      title: 'Latissimus dorsi',
      body: 'Latissimus dorsi arises from the spines of T7 to T12, the thoracolumbar fascia, the iliac crest and the lowest ribs. It sweeps up over the inferior angle of the scapula, winds round teres major and inserts into the floor of the intertubercular groove. It pulls the arm down and back and turns it in, as in climbing or swimming. Thoracodorsal nerve.',
      focus: ['thoracodorsal', 'latissimus', 'arm-pull'],
    },
    {
      id: 'levator',
      title: 'Levator scapulae',
      body: 'Levator scapulae runs from the transverse processes of C1 to C4 down to the medial border of the scapula above its spine. It raises the scapula. It is supplied by the dorsal scapular nerve and by branches of C3 and C4.',
      focus: ['c3-c4', 'dorsal-scapular', 'levator-scapulae', 'elevation'],
    },
    {
      id: 'rhomboids',
      title: 'The rhomboids',
      body: 'Rhomboid minor comes from the spines of C7 and T1 and inserts at the root of the spine of the scapula; rhomboid major comes from the spines of T2 to T5 and inserts along the medial border below it. Together they brace the scapula back towards the spine and hold it against the chest wall. Dorsal scapular nerve.',
      focus: ['dorsal-scapular', 'rhomboid-minor', 'rhomboid-major', 'retraction'],
    },
    {
      id: 'triangles',
      title: 'Two triangles',
      body: 'The triangle of auscultation lies between the upper border of latissimus dorsi, the lateral border of trapezius and the medial border of the scapula. Its floor is thin, so breath sounds are clearest here, especially when the patient folds the arms and leans forward. Lower down, the lumbar triangle between latissimus dorsi, the external oblique and the iliac crest is a rare site of hernia.',
      focus: ['trapezius', 'latissimus'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a nerve to see the muscle it supplies and what that muscle does. Then turn on a nerve injury to see what the patient loses.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'back-trapezius-nerve',
      prompt: 'Trapezius gets its motor supply from the:',
      options: [
        { id: 'accessory', text: 'Spinal accessory nerve' },
        { id: 'dorsal-scapular', text: 'Dorsal scapular nerve' },
        { id: 'thoracodorsal', text: 'Thoracodorsal nerve' },
        { id: 'suprascapular', text: 'Suprascapular nerve' },
      ],
      answerId: 'accessory',
      explanation:
        'The spinal accessory nerve is its motor nerve; C3 and C4 carry sensation from it. The dorsal scapular nerve supplies levator scapulae and the rhomboids.',
    },
    {
      id: 'back-latissimus-insertion',
      prompt: 'Latissimus dorsi inserts into the:',
      options: [
        { id: 'floor', text: 'Floor of the intertubercular groove' },
        { id: 'lateral-lip', text: 'Lateral lip of the intertubercular groove' },
        { id: 'medial-lip', text: 'Medial lip of the intertubercular groove' },
        { id: 'lesser-tubercle', text: 'Lesser tubercle' },
      ],
      answerId: 'floor',
      explanation:
        'Latissimus dorsi goes to the floor of the groove, with pectoralis major on the lateral lip and teres major on the medial lip ("a lady between two majors").',
    },
    {
      id: 'back-auscultation',
      prompt: 'Which of these does NOT bound the triangle of auscultation?',
      options: [
        { id: 'latissimus', text: 'Upper border of latissimus dorsi' },
        { id: 'trapezius', text: 'Lateral border of trapezius' },
        { id: 'scapula', text: 'Medial border of the scapula' },
        { id: 'external-oblique', text: 'Posterior border of the external oblique' },
      ],
      answerId: 'external-oblique',
      explanation:
        'The external oblique bounds the lumbar triangle, lower down. The triangle of auscultation lies between latissimus dorsi, trapezius and the scapula.',
    },
    {
      id: 'back-rhomboid-major',
      prompt: 'Rhomboid major arises from the spines of:',
      options: [
        { id: 't2-t5', text: 'T2 to T5' },
        { id: 'c7-t1', text: 'C7 and T1' },
        { id: 'c1-c4', text: 'C1 to C4 (transverse processes)' },
        { id: 't7-t12', text: 'T7 to T12' },
      ],
      answerId: 't2-t5',
      explanation:
        'Rhomboid major comes from T2 to T5, rhomboid minor from C7 and T1, levator scapulae from the transverse processes of C1 to C4, and latissimus dorsi from T7 to T12.',
    },
    {
      id: 'back-shoulder-droop',
      prompt:
        'After a lymph node biopsy in the posterior triangle of the neck, a patient cannot shrug one shoulder. Which nerve was injured?',
      options: [
        { id: 'accessory', text: 'Spinal accessory nerve' },
        { id: 'long-thoracic', text: 'Long thoracic nerve' },
        { id: 'axillary', text: 'Axillary nerve' },
        { id: 'dorsal-scapular', text: 'Dorsal scapular nerve' },
      ],
      answerId: 'accessory',
      explanation:
        'The spinal accessory nerve lies just under the skin as it crosses the posterior triangle. Losing trapezius makes the shoulder droop and stops the shrug.',
    },
  ],
  cards: [
    {
      id: 'back-trapezius-attachments',
      front: 'Attachments and nerve of trapezius?',
      back: 'Skull, ligamentum nuchae, spines of C7 to T12 to the lateral third of the clavicle, acromion and spine of the scapula. Spinal accessory nerve.',
    },
    {
      id: 'back-latissimus',
      front: 'What does latissimus dorsi do, and what supplies it?',
      back: 'Extends, adducts and medially rotates the arm (climbing, swimming). Thoracodorsal nerve, from the posterior cord.',
    },
    {
      id: 'back-dorsal-scapular',
      front: 'Muscles supplied by the dorsal scapular nerve?',
      back: 'Levator scapulae (with C3 and C4), rhomboid minor and rhomboid major.',
    },
    {
      id: 'back-auscultation-triangle',
      front: 'Boundaries of the triangle of auscultation?',
      back: 'Upper border of latissimus dorsi, lateral border of trapezius, medial border of the scapula.',
    },
    {
      id: 'back-lumbar-triangle',
      front: 'Boundaries of the lumbar triangle?',
      back: 'Latissimus dorsi, the external oblique and the iliac crest. A rare site of hernia.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 5 Back', pages: '68–71' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 2 Back', pages: '86–91' },
  ],
};
