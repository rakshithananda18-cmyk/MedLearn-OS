import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  HAND_BONES,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 6 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const upperLimbDevelopment: Topic = {
  slug: 'upper-limb-development',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Development of the upper limb',
  summary:
    'How the limb bud grows and is patterned, why the limb rotates, what the axis artery becomes, and the common birth defects of the limb.',
  estimatedMinutes: 10,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 12, embryology of the upper limb, page 200'),
    {
      title: 'OpenStax Anatomy and Physiology 2e',
      detail: '8.5 Development of the Appendicular Skeleton',
      url: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/8-5-development-of-the-appendicular-skeleton',
      licence: 'CC BY-NC-SA 4.0; cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones and arteries in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The upper limb bud appears at the end of the fourth week on the side of the body wall, opposite the lower cervical segments; it is supplied by the ventral rami of C5 to T1.',
    'The apical ectodermal ridge at its tip (FGF8) drives growth from shoulder to fingertips; the zone of polarising activity at its back edge (sonic hedgehog) patterns the thumb-to-little-finger axis; the dorsal ectoderm (WNT7a) makes the back of the hand different from the palm.',
    'Bone, cartilage and tendon form from the mesoderm of the bud itself; muscle cells migrate in from the somites.',
    'The axis artery, from the seventh cervical intersegmental artery, persists as the axillary, brachial and anterior interosseous arteries and the deep palmar arch.',
    'In the seventh week the upper limb turns 90 degrees laterally, so the extensors face back, the elbow points back and the thumb lies laterally. Fingers separate as the cells between them die.',
  ],
  visual: {
    kind: 'path',
    // Top: the bud and its three signalling centres with the axis each sets. Left below: the
    // axis artery and what it becomes. Right below: rotation, and the fingers separating.
    diagram: {
      width: 360,
      height: 560,
      nodes: [
        {
          id: 'limb-bud',
          label: 'Limb bud,\nweek 4',
          name: 'Upper limb bud at the end of the fourth week',
          x: 180,
          y: 35,
        },
        {
          id: 'aer',
          label: 'Apical ridge\n(FGF8)',
          name: 'Apical ectodermal ridge',
          x: 60,
          y: 105,
        },
        {
          id: 'zpa',
          label: 'Polarising\nzone (SHH)',
          name: 'Zone of polarising activity',
          x: 180,
          y: 105,
        },
        {
          id: 'dorsal-ectoderm',
          label: 'Dorsal\nectoderm (WNT7a)',
          name: 'Dorsal ectoderm',
          x: 300,
          y: 105,
        },
        {
          id: 'proximodistal',
          label: 'Shoulder to\nfingertips',
          name: 'Proximal to distal growth',
          x: 60,
          y: 175,
        },
        {
          id: 'thumb-to-little',
          label: 'Thumb to\nlittle finger',
          name: 'Thumb to little finger pattern',
          x: 180,
          y: 175,
        },
        {
          id: 'back-to-palm',
          label: 'Back of hand\nto palm',
          name: 'Back to front pattern',
          x: 300,
          y: 175,
        },
        { id: 'axis-artery', label: 'Axis\nartery', name: 'Axis artery', x: 70, y: 255 },
        {
          id: 'axillary-artery',
          label: 'Axillary',
          name: 'Axillary artery',
          x: 70,
          y: 320,
        },
        {
          id: 'brachial-artery',
          label: 'Brachial',
          name: 'Brachial artery',
          x: 70,
          y: 380,
        },
        {
          id: 'anterior-interosseous-artery',
          label: 'Anterior\ninterosseous',
          name: 'Anterior interosseous artery',
          x: 70,
          y: 445,
        },
        {
          id: 'deep-palmar-arch',
          label: 'Deep\npalmar arch',
          name: 'Deep palmar arch',
          x: 70,
          y: 515,
        },
        {
          id: 'rotation',
          label: 'Turns 90°\nlaterally',
          name: 'Lateral rotation of the upper limb in week 7',
          x: 265,
          y: 255,
        },
        {
          id: 'dermatomes',
          label: 'Dermatome\npattern',
          name: 'Dermatome pattern of the limb',
          x: 265,
          y: 325,
        },
        {
          id: 'digits',
          label: 'Fingers\nseparate',
          name: 'Separation of the fingers by cell death',
          x: 265,
          y: 400,
        },
        { id: 'syndactyly', label: 'Syndactyly', name: 'Webbed or joined fingers', x: 210, y: 475 },
        { id: 'polydactyly', label: 'Polydactyly', name: 'Extra fingers', x: 310, y: 475 },
      ],
      edges: [
        { from: 'limb-bud', to: 'aer' },
        { from: 'limb-bud', to: 'zpa' },
        { from: 'limb-bud', to: 'dorsal-ectoderm' },
        { from: 'aer', to: 'proximodistal' },
        { from: 'zpa', to: 'thumb-to-little' },
        { from: 'dorsal-ectoderm', to: 'back-to-palm' },
        { from: 'axis-artery', to: 'axillary-artery' },
        { from: 'axillary-artery', to: 'brachial-artery' },
        { from: 'brachial-artery', to: 'anterior-interosseous-artery' },
        { from: 'anterior-interosseous-artery', to: 'deep-palmar-arch' },
        { from: 'rotation', to: 'dermatomes' },
        { from: 'digits', to: 'syndactyly' },
        { from: 'digits', to: 'polydactyly' },
      ],
    },
    lesions: [
      {
        id: 'phocomelia',
        label: 'Short or absent limbs',
        nodeIds: ['limb-bud', 'aer', 'proximodistal'],
        explanation:
          'Damage to the bud in weeks 4 to 6, when it is growing out, can leave a limb missing (amelia) or the hand attached almost directly to the shoulder (phocomelia). Thalidomide, a sedative given to pregnant women around 1960, caused thousands of such births, which is why drug safety in pregnancy is now tested so strictly.',
      },
      {
        id: 'polydactyly',
        label: 'Extra fingers',
        nodeIds: ['zpa', 'polydactyly'],
        explanation:
          'Extra sonic hedgehog signalling on the thumb side of the bud, or extra splitting of the hand plate, gives an extra finger, most often beside the little finger or the thumb. It often runs in families.',
      },
      {
        id: 'syndactyly',
        label: 'Joined fingers',
        nodeIds: ['digits', 'syndactyly'],
        explanation:
          'If the cells between the finger rays fail to die in weeks 6 to 8, the fingers stay joined by skin, or sometimes by bone, most often the middle and ring fingers. It is separated by surgery.',
      },
    ],
    drill: [
      {
        id: 'patterning',
        title: 'Growth and patterning',
        hint: 'Three signalling centres and the direction each controls.',
        nodeIds: [
          'aer',
          'zpa',
          'dorsal-ectoderm',
          'proximodistal',
          'thumb-to-little',
          'back-to-palm',
        ],
      },
      {
        id: 'axis-artery',
        title: 'The axis artery',
        hint: 'What it becomes, from the axilla to the palm.',
        nodeIds: [
          'axis-artery',
          'axillary-artery',
          'brachial-artery',
          'anterior-interosseous-artery',
          'deep-palmar-arch',
        ],
      },
      {
        id: 'later',
        title: 'Rotation and fingers',
        hint: 'What rotation explains, and what goes wrong when fingers do not separate or form too many.',
        nodeIds: ['rotation', 'dermatomes', 'digits', 'syndactyly', 'polydactyly'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: SHOULDER_MODEL_CREDIT,
      parts: shoulderParts([
        'axillary-artery',
        'brachial-artery',
        'common-interosseous-artery',
        'anterior-interosseous-artery',
        'deep-palmar-arch',
        'clavicle',
        'scapula',
        'humerus',
        'radius',
        'ulna',
        ...HAND_BONES,
      ]),
      traces: [],
      stops: [
        {
          id: 'limb',
          title: 'From bud to limb',
          description:
            'Everything here grew from a small bud in the fourth week: the bones from its own mesoderm, the muscles from cells that migrated in, and the nerves from C5 to T1.',
          target: [-160, -95, 1060],
          position: [-634, -1354, 1168],
        },
        {
          id: 'axis',
          title: 'The axis artery',
          description:
            'The first artery of the limb ran down its middle. It survives as the axillary, brachial and anterior interosseous arteries and the deep palmar arch; the radial and ulnar arteries came later.',
          target: [-200, -90, 1050],
          position: [-410, -755, 1106],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'bud',
      title: 'The limb bud',
      body: 'At the end of the fourth week a bulge appears on the side of the body wall opposite the lower cervical segments: the upper limb bud, a core of mesoderm covered by ectoderm. The ventral rami of C5 to T1 grow into it, which is why these segments form the brachial plexus. The upper limb develops a few days ahead of the lower limb.',
      focus: ['limb-bud'],
    },
    {
      id: 'centres',
      title: 'Three signalling centres',
      body: 'The apical ectodermal ridge at the tip releases FGF8 and keeps the bud growing outwards, laying down the arm, forearm and hand in that order. The zone of polarising activity at the back edge releases sonic hedgehog, which sets the thumb-to-little-finger axis. The dorsal ectoderm releases WNT7a, making the back of the hand different from the palm.',
      focus: ['aer', 'zpa', 'dorsal-ectoderm', 'proximodistal', 'thumb-to-little', 'back-to-palm'],
    },
    {
      id: 'tissues',
      title: 'Where the tissues come from',
      body: 'The mesoderm of the bud forms cartilage models that later ossify, and the tendons and connective tissue. Muscle cells migrate into the bud from the somites and gather into a dorsal mass (the future extensors) and a ventral mass (the future flexors), supplied by the posterior and anterior divisions of the plexus.',
      focus: [],
    },
    {
      id: 'axis-artery',
      title: 'The axis artery',
      body: 'The first artery of the limb grows from the seventh cervical intersegmental artery down the middle of the bud. It persists as the axillary and brachial arteries, the anterior interosseous artery and the deep palmar arch. The radial and ulnar arteries sprout from it later.',
      focus: [
        'axis-artery',
        'axillary-artery',
        'brachial-artery',
        'anterior-interosseous-artery',
        'deep-palmar-arch',
      ],
    },
    {
      id: 'rotation',
      title: 'Rotation and dermatomes',
      body: 'In the seventh week the upper limb turns 90 degrees laterally: the elbow comes to point backwards, the extensors lie behind and the thumb lies laterally. Because the limb grew out and turned, its dermatomes run in a regular order down the lateral side (C5, C6, C7) and back up the medial side (C8, T1).',
      focus: ['rotation', 'dermatomes'],
    },
    {
      id: 'digits',
      title: 'Fingers',
      body: 'The end of the bud flattens into a hand plate with five thickened rays. Between weeks 6 and 8 the cells between the rays die in a planned way, freeing the fingers. Failure leaves them joined (syndactyly); extra rays give extra fingers (polydactyly).',
      focus: ['digits', 'syndactyly', 'polydactyly'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select the axis artery to see what it became in the adult, then turn on a defect to see which step went wrong.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'development-zpa',
      prompt: 'The thumb-to-little-finger pattern of the limb is set by the:',
      options: [
        { id: 'zpa', text: 'Zone of polarising activity (sonic hedgehog)' },
        { id: 'aer', text: 'Apical ectodermal ridge (FGF8)' },
        { id: 'dorsal', text: 'Dorsal ectoderm (WNT7a)' },
        { id: 'somites', text: 'The somites' },
      ],
      answerId: 'zpa',
      explanation:
        'The zone of polarising activity at the back edge of the bud releases sonic hedgehog; the apical ridge drives outgrowth; the dorsal ectoderm sets back versus palm.',
    },
    {
      id: 'development-axis-artery',
      prompt: 'The axis artery of the upper limb persists in the adult as all of these except the:',
      options: [
        { id: 'radial', text: 'Radial artery' },
        { id: 'brachial', text: 'Brachial artery' },
        { id: 'anterior-interosseous', text: 'Anterior interosseous artery' },
        { id: 'deep-arch', text: 'Deep palmar arch' },
      ],
      answerId: 'radial',
      explanation:
        'The radial and ulnar arteries sprout later; the axis artery survives as the axillary, brachial and anterior interosseous arteries and the deep palmar arch.',
    },
    {
      id: 'development-rotation',
      prompt: 'During development the upper limb rotates:',
      options: [
        { id: 'lateral', text: '90 degrees laterally' },
        { id: 'medial', text: '90 degrees medially' },
        { id: 'none', text: 'Not at all' },
        { id: 'half', text: '180 degrees' },
      ],
      answerId: 'lateral',
      explanation:
        'The upper limb turns laterally, bringing the thumb to the lateral side and the elbow to point back; the lower limb turns medially.',
    },
    {
      id: 'development-timing',
      prompt: 'The upper limb bud first appears at about:',
      options: [
        { id: 'week4', text: 'The end of the fourth week' },
        { id: 'week2', text: 'The second week' },
        { id: 'week8', text: 'The eighth week' },
        { id: 'month3', text: 'The third month' },
      ],
      answerId: 'week4',
      explanation:
        'It appears at the end of the fourth week, opposite the lower cervical segments, a little before the lower limb bud.',
    },
  ],
  cards: [
    {
      id: 'development-centres',
      front: 'The three signalling centres of the limb bud and their jobs?',
      back: 'Apical ectodermal ridge (FGF8): outgrowth. Zone of polarising activity (sonic hedgehog): thumb to little finger. Dorsal ectoderm (WNT7a): back of hand versus palm.',
    },
    {
      id: 'development-axis',
      front: 'Origin and adult remnants of the axis artery?',
      back: 'From the seventh cervical intersegmental artery; persists as the axillary, brachial and anterior interosseous arteries and the deep palmar arch.',
    },
    {
      id: 'development-origin-tissues',
      front: 'Where do the bones and the muscles of the limb come from?',
      back: 'Bones, cartilage and tendons from the mesoderm of the bud; muscle cells from the somites.',
    },
    {
      id: 'development-rotation-card',
      front: 'Direction of rotation of the upper limb and its result?',
      back: '90 degrees laterally in week 7: extensors behind, elbow pointing back, thumb lateral.',
    },
    {
      id: 'development-defects',
      front: 'Amelia, phocomelia, syndactyly, polydactyly?',
      back: 'Absent limb; hand near the shoulder (thalidomide); joined fingers; extra fingers.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Chapter 12 Nerves, Arteries and Clinical Terms',
      pages: '200',
    },
  ],
};
