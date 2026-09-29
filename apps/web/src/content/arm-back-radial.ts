import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { plexusNerve } from './brachial-plexus-3d';
import { SHOULDER_MODEL_CREDIT, SHOULDER_MODEL_SRC, shoulderParts } from './shoulder-3d';

// Upper limb batch 2 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const armBackRadial: Topic = {
  slug: 'arm-back-radial',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Arm: the back compartment and the radial nerve',
  summary:
    'Triceps and anconeus, and the radial nerve winding round the humerus: why the level of an injury decides whether triceps survives.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 8 Arm, pages 105 to 110'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, arm, pages 745 to 752'),
    {
      title: 'TeachMeAnatomy: The Radial Nerve',
      url: 'https://teachmeanatomy.info/upper-limb/nerves/radial-nerve/',
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
    'The back compartment holds triceps and anconeus, both supplied by the radial nerve.',
    'Triceps: long head from the infraglenoid tubercle, lateral head above the radial groove, medial head below it; all insert into the olecranon and extend the elbow.',
    'The radial nerve (posterior cord, C5 to T1) leaves the axilla through the lower triangular space and winds round the humerus in the radial groove with the profunda brachii artery.',
    'It pierces the lateral intermuscular septum and divides in front of the lateral epicondyle, between brachialis and brachioradialis, into superficial and deep branches.',
    'Injury in the axilla paralyses triceps too; a mid-shaft fracture usually spares triceps (its branches arise higher) but causes wrist drop.',
  ],
  visual: {
    kind: 'path',
    // The radial nerve from the axilla down, with the branches it gives at each level.
    diagram: {
      width: 360,
      height: 380,
      nodes: [
        { id: 'radial', label: 'Radial\nnerve', name: 'Radial nerve', x: 60, y: 110 },
        {
          id: 'triceps-long',
          label: 'Triceps\nlong head',
          name: 'Long head of triceps',
          x: 180,
          y: 30,
        },
        {
          id: 'triceps-lateral',
          label: 'Triceps\nlat. head',
          name: 'Lateral head of triceps',
          x: 180,
          y: 80,
        },
        {
          id: 'triceps-medial',
          label: 'Triceps\nmed. head',
          name: 'Medial head of triceps',
          x: 180,
          y: 130,
        },
        {
          id: 'extend-elbow',
          label: 'Extend the\nelbow',
          name: 'Extension of the elbow',
          x: 300,
          y: 80,
        },
        {
          id: 'spiral-groove',
          label: 'Radial\ngroove',
          name: 'Radial nerve in the radial (spiral) groove',
          x: 60,
          y: 230,
        },
        { id: 'anconeus', label: 'Anconeus', name: 'Anconeus', x: 180, y: 200 },
        {
          id: 'lateral-epicondyle',
          label: 'Front of lat.\nepicondyle',
          name: 'Radial nerve in front of the lateral epicondyle',
          x: 180,
          y: 270,
        },
        {
          id: 'brachioradialis',
          label: 'Brachio-\nradialis',
          name: 'Brachioradialis',
          x: 300,
          y: 230,
        },
        {
          id: 'wrist-extensors',
          label: 'Wrist\nextensors',
          name: 'Extensors of the wrist and fingers',
          x: 300,
          y: 290,
        },
        {
          id: 'hand-skin',
          label: 'Back of\nhand skin',
          name: 'Skin on the back of the hand at the first web space',
          x: 300,
          y: 350,
        },
      ],
      edges: [
        { from: 'radial', to: 'triceps-long' },
        { from: 'radial', to: 'triceps-lateral' },
        { from: 'radial', to: 'triceps-medial' },
        { from: 'triceps-long', to: 'extend-elbow' },
        { from: 'triceps-lateral', to: 'extend-elbow' },
        { from: 'triceps-medial', to: 'extend-elbow' },
        { from: 'radial', to: 'spiral-groove' },
        { from: 'spiral-groove', to: 'anconeus' },
        { from: 'spiral-groove', to: 'lateral-epicondyle' },
        { from: 'lateral-epicondyle', to: 'brachioradialis' },
        { from: 'lateral-epicondyle', to: 'wrist-extensors' },
        { from: 'lateral-epicondyle', to: 'hand-skin' },
      ],
    },
    lesions: [
      {
        id: 'crutch-palsy',
        label: 'Injury in the axilla (crutch palsy)',
        nodeIds: ['radial'],
        explanation:
          'Pressure from a badly fitted crutch, or an injury high in the axilla, catches the nerve before any branch leaves it. Triceps is paralysed as well as the forearm extensors: the elbow cannot be straightened against gravity, the wrist drops, and the skin of the back of the arm, forearm and hand goes numb.',
      },
      {
        id: 'shaft-fracture',
        label: 'Mid-shaft fracture of the humerus',
        nodeIds: ['spiral-groove'],
        explanation:
          'The nerve lies against the bone in the radial groove, so a fracture of the shaft, or sleeping with the arm over a chair back (Saturday night palsy), can injure it there. Triceps is usually spared because its branches arose higher, but the wrist and fingers drop and a patch of skin on the back of the hand at the first web space goes numb.',
      },
    ],
    drill: [
      {
        id: 'triceps',
        title: 'Triceps',
        hint: 'Three heads and what they do together.',
        nodeIds: ['triceps-long', 'triceps-lateral', 'triceps-medial', 'extend-elbow'],
      },
      {
        id: 'course',
        title: 'The course',
        hint: 'Round the back of the humerus, then in front of the elbow.',
        nodeIds: ['spiral-groove', 'lateral-epicondyle'],
      },
      {
        id: 'below',
        title: 'Lower branches',
        hint: 'One muscle at the back of the elbow, one in front, then the forearm and hand.',
        nodeIds: ['anconeus', 'brachioradialis', 'wrist-extensors', 'hand-skin'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve path: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'triceps-long',
        'triceps-lateral',
        'triceps-medial',
        'anconeus',
        'brachioradialis',
        'brachialis',
        'teres-major',
        'humerus',
        'radius',
        'ulna',
        'scapula',
        'clavicle',
        'brachial-artery',
        'deep-brachial-artery',
        'radial-collateral-artery',
        'middle-collateral-artery',
      ]),
      traces: [{ id: 'radial', kind: 'nerve', paths: plexusNerve('radial') }],
      stops: [
        {
          id: 'back',
          title: 'Back of the arm',
          description:
            'Triceps fills the back of the arm: the long head from the scapula, the lateral head beside it, the medial head deep. All three reach the olecranon.',
          target: [-190, -50, 1160],
          position: [-420, 460, 1220],
        },
        {
          id: 'groove',
          title: 'Radial groove',
          description:
            'The radial nerve and profunda brachii artery wind round the back of the humerus between the lateral and medial heads of triceps, right against the bone.',
          target: [-195, -55, 1150],
          position: [-470, 260, 1140],
        },
        {
          id: 'elbow',
          title: 'In front of the elbow',
          description:
            'Below the groove the nerve comes to the front, between brachialis and brachioradialis, and divides in front of the lateral epicondyle.',
          target: [-228, -72, 1040],
          position: [-620, -160, 1060],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'compartment',
      title: 'The back compartment',
      body: 'Behind the intermuscular septa lie triceps and, at the elbow, anconeus. Both are supplied by the radial nerve, and the profunda brachii artery runs with the nerve round the back of the humerus.',
      focus: ['radial', 'triceps-long', 'triceps-lateral', 'triceps-medial', 'anconeus'],
    },
    {
      id: 'triceps',
      title: 'Triceps brachii',
      body: 'The long head arises from the infraglenoid tubercle of the scapula, so it also steadies the shoulder. The lateral head arises from the back of the humerus above the radial groove and the medial head below it. They share a tendon into the olecranon and extend the elbow.',
      focus: ['triceps-long', 'triceps-lateral', 'triceps-medial', 'extend-elbow'],
    },
    {
      id: 'course',
      title: 'Round the humerus',
      body: 'The radial nerve is the largest branch of the posterior cord (C5 to T1). It starts behind the axillary artery, leaves the axilla through the lower triangular space with the profunda brachii artery, and winds round the back of the humerus in the radial (spiral) groove, between the lateral and medial heads of triceps.',
      focus: ['radial', 'spiral-groove'],
    },
    {
      id: 'front',
      title: 'Back to the front',
      body: 'At the junction of the middle and lower thirds of the arm it pierces the lateral intermuscular septum and runs down in front of the lateral epicondyle, between brachialis and brachioradialis. There it divides into a superficial (skin) branch and a deep branch to the extensors of the forearm.',
      focus: [
        'spiral-groove',
        'lateral-epicondyle',
        'brachioradialis',
        'wrist-extensors',
        'hand-skin',
      ],
    },
    {
      id: 'branches',
      title: 'Branches in the arm',
      body: 'Muscular branches go to all three heads of triceps (mostly before the groove), to anconeus, and above the elbow to brachioradialis, extensor carpi radialis longus and part of brachialis. Skin branches supply the back of the arm and forearm.',
      focus: ['triceps-long', 'triceps-lateral', 'triceps-medial', 'anconeus', 'brachioradialis'],
    },
    {
      id: 'level',
      title: 'The level decides',
      body: 'Injured in the axilla, as with a badly fitted crutch, the nerve loses all its branches, so triceps fails as well as the wrist. Injured in the radial groove, by a mid-shaft fracture, triceps usually survives because its branches arose higher, but the wrist and fingers drop.',
      focus: ['radial', 'spiral-groove', 'wrist-extensors'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Turn on each injury and compare what is lost. Select any branch to see where it leaves the nerve.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'radial-groove-artery',
      prompt: 'In the radial groove the radial nerve is accompanied by the:',
      options: [
        { id: 'profunda', text: 'Profunda brachii artery' },
        { id: 'posterior-circumflex', text: 'Posterior circumflex humeral artery' },
        { id: 'brachial', text: 'Brachial artery' },
        { id: 'superior-ulnar', text: 'Superior ulnar collateral artery' },
      ],
      answerId: 'profunda',
      explanation:
        'The profunda brachii runs with it through the lower triangular space and round the radial groove. The posterior circumflex humeral goes with the axillary nerve.',
    },
    {
      id: 'radial-shaft-fracture',
      prompt: 'A mid-shaft fracture of the humerus most typically causes:',
      options: [
        { id: 'wrist-drop', text: 'Wrist drop with triceps spared' },
        { id: 'triceps', text: 'Paralysis of triceps only' },
        { id: 'claw', text: 'Claw hand' },
        { id: 'abduction', text: 'Loss of abduction of the arm' },
      ],
      answerId: 'wrist-drop',
      explanation:
        'The radial nerve is injured in the groove; the branches to triceps arose higher, so triceps is usually spared but the wrist and fingers drop.',
    },
    {
      id: 'radial-triceps-long',
      prompt: 'The long head of triceps arises from the:',
      options: [
        { id: 'infraglenoid', text: 'Infraglenoid tubercle of the scapula' },
        { id: 'supraglenoid', text: 'Supraglenoid tubercle of the scapula' },
        { id: 'above-groove', text: 'Back of the humerus above the radial groove' },
        { id: 'below-groove', text: 'Back of the humerus below the radial groove' },
      ],
      answerId: 'infraglenoid',
      explanation:
        'The long head comes from the infraglenoid tubercle; the lateral head from above the groove; the medial head from below it. The long head of biceps is the one from the supraglenoid tubercle.',
    },
    {
      id: 'radial-division',
      prompt: 'The radial nerve divides into its superficial and deep branches:',
      options: [
        { id: 'lateral-epicondyle', text: 'In front of the lateral epicondyle' },
        { id: 'groove', text: 'In the radial groove' },
        { id: 'axilla', text: 'In the axilla' },
        { id: 'wrist', text: 'At the wrist' },
      ],
      answerId: 'lateral-epicondyle',
      explanation:
        'After piercing the lateral intermuscular septum it runs between brachialis and brachioradialis and divides in front of the lateral epicondyle.',
    },
  ],
  cards: [
    {
      id: 'radial-heads',
      front: 'Origins of the three heads of triceps?',
      back: 'Long: infraglenoid tubercle. Lateral: back of the humerus above the radial groove. Medial: below the groove.',
    },
    {
      id: 'radial-root',
      front: 'Root values and cord of the radial nerve?',
      back: 'C5 to T1, from the posterior cord.',
    },
    {
      id: 'radial-course-card',
      front: 'Course of the radial nerve in the arm?',
      back: 'Lower triangular space, radial groove with the profunda brachii, through the lateral intermuscular septum, then in front of the lateral epicondyle between brachialis and brachioradialis.',
    },
    {
      id: 'radial-crutch',
      front: 'Radial nerve injury in the axilla vs in the radial groove?',
      back: 'Axilla (crutch palsy): triceps and wrist extensors paralysed. Groove (mid-shaft fracture): wrist drop, triceps usually spared.',
    },
    {
      id: 'radial-sensory',
      front: 'Reliable area of numbness in radial nerve injury?',
      back: 'The skin on the back of the hand over the first web space.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 8 Arm', pages: '105–110' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '745–752' },
  ],
};
