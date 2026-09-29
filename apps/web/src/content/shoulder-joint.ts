import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { plexusNerve } from './brachial-plexus-3d';
import { CORACOACROMIAL_ARCH, GLENOID_LABRUM, SUBACROMIAL_BURSA } from './joints-3d';
import { SHOULDER_MODEL_CREDIT, SHOULDER_MODEL_SRC, shoulderParts } from './shoulder-3d';

// Upper limb batch 5 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const shoulderJoint: Topic = {
  slug: 'shoulder-joint',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Shoulder joint',
  summary:
    'A shallow ball and socket held by muscles: the labrum, the coracoacromial arch, the rotator cuff, how the arm is raised, and why the joint dislocates downwards and forwards.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 10 Joints of Upper Limb, pages 158 to 163'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, shoulder, pages 695 to 702'),
    {
      title: 'TeachMeAnatomy: The Shoulder Joint',
      url: 'https://teachmeanatomy.info/upper-limb/joints/shoulder/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones and muscles in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'A ball and socket synovial joint between the large head of the humerus and the small, shallow glenoid cavity, deepened a little by the glenoid labrum.',
    'The capsule is loose, most of all below, to allow the widest range of movement of any joint; the rotator cuff (supraspinatus, infraspinatus, teres minor, subscapularis) is its chief stabiliser.',
    'The coracoacromial arch above stops the head moving upwards; the subacromial bursa lets the supraspinatus tendon glide beneath it.',
    'Abduction: supraspinatus starts it, deltoid carries it to 90 degrees, and trapezius with serratus anterior rotate the scapula to raise the arm above the head.',
    'The lower part of the capsule has no cuff support, so dislocation is usually downwards and then forwards, stretching the axillary nerve.',
  ],
  visual: {
    kind: 'path',
    // Top: what holds the head in the socket. Middle: the rotator cuff. Bottom: how abduction is
    // shared between the cuff, deltoid and the scapular rotators, with the nerve at risk.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'glenoid-labrum',
          label: 'Glenoid\nlabrum',
          name: 'Glenoid labrum',
          x: 60,
          y: 40,
        },
        {
          id: 'coracoacromial-arch',
          label: 'Coraco-\nacromial arch',
          name: 'Coracoacromial arch',
          x: 180,
          y: 40,
        },
        {
          id: 'subacromial-bursa',
          label: 'Subacromial\nbursa',
          name: 'Subacromial bursa',
          x: 300,
          y: 40,
        },
        {
          id: 'glenohumeral',
          label: 'Shoulder\njoint',
          name: 'Shoulder (glenohumeral) joint',
          x: 180,
          y: 115,
        },
        {
          id: 'supraspinatus',
          label: 'Supra-\nspinatus',
          name: 'Supraspinatus',
          x: 45,
          y: 190,
        },
        {
          id: 'infraspinatus',
          label: 'Infra-\nspinatus',
          name: 'Infraspinatus',
          x: 135,
          y: 190,
        },
        { id: 'teres-minor', label: 'Teres\nminor', name: 'Teres minor', x: 225, y: 190 },
        {
          id: 'subscapularis',
          label: 'Sub-\nscapularis',
          name: 'Subscapularis',
          x: 315,
          y: 190,
        },
        { id: 'abduction', label: 'Abduction', name: 'Abduction of the arm', x: 50, y: 270 },
        {
          id: 'deltoid',
          label: 'Deltoid',
          name: 'Deltoid, abducting to 90 degrees',
          x: 170,
          y: 270,
        },
        {
          id: 'scapular-rotation',
          label: 'Scapula\nrotates',
          name: 'Upward rotation of the scapula, beyond 90 degrees',
          x: 300,
          y: 270,
        },
        { id: 'axillary', label: 'Axillary\nnerve', name: 'Axillary nerve', x: 60, y: 345 },
        { id: 'trapezius', label: 'Trapezius', name: 'Trapezius', x: 220, y: 345 },
        {
          id: 'serratus',
          label: 'Serratus\nanterior',
          name: 'Serratus anterior',
          x: 320,
          y: 345,
        },
      ],
      edges: [
        { from: 'glenoid-labrum', to: 'glenohumeral' },
        { from: 'coracoacromial-arch', to: 'glenohumeral' },
        { from: 'subacromial-bursa', to: 'glenohumeral' },
        { from: 'glenohumeral', to: 'supraspinatus' },
        { from: 'glenohumeral', to: 'infraspinatus' },
        { from: 'glenohumeral', to: 'teres-minor' },
        { from: 'glenohumeral', to: 'subscapularis' },
        { from: 'abduction', to: 'supraspinatus' },
        { from: 'abduction', to: 'deltoid' },
        { from: 'abduction', to: 'scapular-rotation' },
        { from: 'scapular-rotation', to: 'trapezius' },
        { from: 'scapular-rotation', to: 'serratus' },
        { from: 'axillary', to: 'deltoid' },
      ],
    },
    lesions: [
      {
        id: 'dislocation',
        label: 'Anterior dislocation',
        nodeIds: ['glenohumeral', 'axillary', 'deltoid'],
        explanation:
          'A fall on the hand with the arm raised and turned out drives the head through the weak lower capsule; it then slips forwards to lie below the coracoid. The shoulder looks flat instead of round. The axillary nerve, running just below the joint, can be stretched: deltoid weakens and a patch of skin over it (the regimental badge area) goes numb.',
      },
      {
        id: 'supraspinatus-tear',
        label: 'Torn supraspinatus tendon',
        nodeIds: ['supraspinatus', 'subacromial-bursa'],
        explanation:
          'The tendon wears where it passes under the coracoacromial arch, and can tear in older adults. The student cannot start abduction, though the arm can be held up once passively raised. A milder form, with an inflamed bursa, gives a painful arc between about 60 and 120 degrees.',
      },
      {
        id: 'frozen-shoulder',
        label: 'Frozen shoulder',
        nodeIds: ['glenohumeral'],
        explanation:
          'The capsule becomes inflamed, thickened and contracted, often in middle age or with diabetes. Movement in every direction becomes painful and then stiff, lateral rotation most of all; the scapula moves the arm instead.',
      },
    ],
    drill: [
      {
        id: 'stability',
        title: 'What holds it',
        hint: 'The rim of the socket, the roof above, and the bursa between.',
        nodeIds: ['glenoid-labrum', 'coracoacromial-arch', 'subacromial-bursa'],
      },
      {
        id: 'cuff',
        title: 'Rotator cuff',
        hint: 'Four muscles that hold the head in the socket.',
        nodeIds: ['supraspinatus', 'infraspinatus', 'teres-minor', 'subscapularis'],
      },
      {
        id: 'abduction',
        title: 'Raising the arm',
        hint: 'Who starts it, who carries it to 90 degrees, and what happens beyond.',
        nodeIds: ['abduction', 'deltoid', 'scapular-rotation', 'trapezius', 'serratus', 'axillary'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Labrum, arch, bursa and nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'humerus',
        'scapula',
        'clavicle',
        'supraspinatus',
        'infraspinatus',
        'teres-minor',
        'subscapularis',
        'deltoid',
        'biceps-long',
        'trapezius',
        'serratus',
        'posterior-circumflex-humeral-artery',
      ]),
      traces: [
        { id: 'glenoid-labrum', kind: 'outline', paths: GLENOID_LABRUM },
        { id: 'coracoacromial-arch', kind: 'outline', paths: CORACOACROMIAL_ARCH },
        { id: 'subacromial-bursa', kind: 'outline', paths: SUBACROMIAL_BURSA },
        { id: 'axillary', kind: 'nerve', paths: plexusNerve('axillary') },
      ],
      stops: [
        {
          id: 'front',
          title: 'Ball and socket',
          description:
            'The humeral head is about four times the area of the glenoid cavity, so only part of it touches the socket at a time. The cuff muscles wrap it on every side except below.',
          target: [-150, -80, 1310],
          position: [-275, -476, 1373],
        },
        {
          id: 'arch',
          title: 'Coracoacromial arch',
          description:
            'The coracoid, the acromion and the ligament between them roof the joint. Supraspinatus runs beneath, cushioned by the subacromial bursa.',
          target: [-155, -78, 1340],
          position: [-333, -256, 1503],
        },
        {
          id: 'back',
          title: 'From behind',
          description:
            'Supraspinatus above the spine of the scapula, infraspinatus and teres minor below it; the axillary nerve winds round the surgical neck of the humerus just under the joint.',
          target: [-140, -40, 1300],
          position: [-275, 387, 1345],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'type',
      title: 'Mobility over stability',
      body: 'The shoulder is a ball and socket synovial joint between the head of the humerus and the glenoid cavity of the scapula. The head is large and the socket small and shallow, even with its rim of fibrocartilage, the glenoid labrum. The capsule is loose, especially below. The result is the freest joint in the body, and the most often dislocated.',
      focus: ['glenohumeral', 'glenoid-labrum'],
    },
    {
      id: 'cuff',
      title: 'The rotator cuff',
      body: 'Supraspinatus above, infraspinatus and teres minor behind, and subscapularis in front blend with the capsule and hold the head against the socket in every movement. The lower part of the capsule has no such support.',
      focus: ['supraspinatus', 'infraspinatus', 'teres-minor', 'subscapularis'],
    },
    {
      id: 'arch',
      title: 'Roof and bursa',
      body: 'The coracoid process, the acromion and the coracoacromial ligament between them form an arch over the joint that stops the head being pushed upwards. The subacromial bursa lies between the arch and the supraspinatus tendon so the tendon can slide. The tendon of the long head of biceps runs over the head inside the capsule.',
      focus: ['coracoacromial-arch', 'subacromial-bursa', 'supraspinatus'],
    },
    {
      id: 'movements',
      title: 'Movements',
      body: 'Flexion: pectoralis major (clavicular part), front of deltoid, coracobrachialis. Extension: back of deltoid, latissimus dorsi, teres major. Adduction: pectoralis major, latissimus dorsi, teres major. Medial rotation: subscapularis, pectoralis major, latissimus dorsi, teres major. Lateral rotation: infraspinatus, teres minor, back of deltoid.',
      focus: ['deltoid', 'subscapularis', 'infraspinatus', 'teres-minor'],
    },
    {
      id: 'abduction',
      title: 'Raising the arm sideways',
      body: 'Supraspinatus starts abduction; deltoid then carries the arm to about 90 degrees while the cuff holds the head down in the socket. Beyond that the scapula must turn: trapezius and serratus anterior rotate it so the glenoid faces up, and the arm reaches overhead. Throughout, the scapula moves about one degree for every two at the joint.',
      focus: [
        'abduction',
        'supraspinatus',
        'deltoid',
        'scapular-rotation',
        'trapezius',
        'serratus',
      ],
    },
    {
      id: 'nerve',
      title: 'Nerve supply and risk',
      body: 'The axillary nerve supplies deltoid and teres minor and gives a branch to the joint. It runs through the quadrangular space and round the surgical neck just below the capsule, where a dislocation or a fracture of the neck can stretch it.',
      focus: ['axillary', 'deltoid', 'teres-minor'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each structure to see where it lies, then turn on an injury to see what fails.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'shoulder-joint-dislocation',
      prompt: 'The shoulder joint most often dislocates in which direction first?',
      options: [
        { id: 'inferior', text: 'Downwards, through the weak lower capsule' },
        { id: 'superior', text: 'Upwards, under the acromion' },
        { id: 'posterior', text: 'Backwards, behind the glenoid' },
        { id: 'medial', text: 'Medially, towards the chest' },
      ],
      answerId: 'inferior',
      explanation:
        'The lower capsule lacks cuff support, so the head slips down and then usually forwards below the coracoid.',
    },
    {
      id: 'shoulder-joint-initiate',
      prompt: 'Which muscle starts abduction of the arm?',
      options: [
        { id: 'supraspinatus', text: 'Supraspinatus' },
        { id: 'deltoid', text: 'Deltoid' },
        { id: 'serratus', text: 'Serratus anterior' },
        { id: 'trapezius', text: 'Trapezius' },
      ],
      answerId: 'supraspinatus',
      explanation:
        'Supraspinatus starts the movement; deltoid carries it to about 90 degrees; trapezius and serratus anterior take it overhead.',
    },
    {
      id: 'shoulder-joint-upward',
      prompt: 'Upward displacement of the humeral head is prevented by the:',
      options: [
        { id: 'arch', text: 'Coracoacromial arch' },
        { id: 'labrum', text: 'Glenoid labrum' },
        { id: 'teres-major', text: 'Teres major' },
        { id: 'capsule', text: 'Lower part of the capsule' },
      ],
      answerId: 'arch',
      explanation: 'The coracoid, acromion and coracoacromial ligament form a roof above the head.',
    },
    {
      id: 'shoulder-joint-nerve',
      prompt: 'Which nerve is most at risk in a dislocated shoulder?',
      options: [
        { id: 'axillary', text: 'Axillary nerve' },
        { id: 'radial', text: 'Radial nerve' },
        { id: 'suprascapular', text: 'Suprascapular nerve' },
        { id: 'long-thoracic', text: 'Long thoracic nerve' },
      ],
      answerId: 'axillary',
      explanation:
        'It lies just below the joint round the surgical neck; deltoid weakens and the regimental badge area goes numb.',
    },
  ],
  cards: [
    {
      id: 'shoulder-joint-type',
      front: 'Type of the shoulder joint and why it is unstable?',
      back: 'Ball and socket synovial joint; large head, small shallow glenoid, loose capsule weakest below.',
    },
    {
      id: 'shoulder-joint-cuff',
      front: 'Muscles of the rotator cuff?',
      back: 'Supraspinatus, infraspinatus, teres minor, subscapularis.',
    },
    {
      id: 'shoulder-joint-abduction',
      front: 'How is abduction of the arm shared?',
      back: 'Supraspinatus starts it, deltoid to about 90 degrees, then trapezius and serratus anterior rotate the scapula to go overhead.',
    },
    {
      id: 'shoulder-joint-rotators',
      front: 'Medial and lateral rotators of the shoulder?',
      back: 'Medial: subscapularis, pectoralis major, latissimus dorsi, teres major. Lateral: infraspinatus, teres minor, back of deltoid.',
    },
    {
      id: 'shoulder-joint-biceps',
      front: 'Where does the tendon of the long head of biceps run?',
      back: 'From the supraglenoid tubercle over the humeral head inside the capsule, then out through the intertubercular groove.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 10 Joints of Upper Limb', pages: '158–163' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '695–702' },
  ],
};
