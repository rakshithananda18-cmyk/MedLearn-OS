import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { plexusNerve } from './brachial-plexus-3d';
import { SHOULDER_MODEL_CREDIT, SHOULDER_MODEL_SRC, shoulderParts } from './shoulder-3d';

// Upper limb batch 2 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const armFront: Topic = {
  slug: 'arm-front',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Arm: the front compartment',
  summary:
    'Biceps, brachialis and coracobrachialis with the musculocutaneous nerve, and the brachial artery from the axilla to the elbow.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 8 Arm, pages 95 to 103'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, arm, pages 742 to 749'),
    {
      title: 'TeachMeAnatomy: Muscles of the Arm',
      url: 'https://teachmeanatomy.info/upper-limb/muscles/arm/',
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
    'Medial and lateral intermuscular septa split the arm into a front (flexor) and a back (extensor) compartment.',
    'The front holds coracobrachialis, biceps and brachialis, all supplied by the musculocutaneous nerve, which ends as the lateral cutaneous nerve of the forearm.',
    'Biceps inserts into the radial tuberosity: it flexes the elbow and is the strongest supinator. Brachialis is the main flexor of the elbow in every position.',
    'The brachial artery runs from the lower border of teres major to the cubital fossa, where it divides into the radial and ulnar arteries at the level of the neck of the radius.',
    'The median nerve crosses in front of the brachial artery from its lateral to its medial side in the middle of the arm.',
  ],
  visual: {
    kind: 'path',
    // The musculocutaneous nerve with its muscles and what they do; below, the brachial artery.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'musculocutaneous',
          label: 'Musculo-\ncutaneous n.',
          name: 'Musculocutaneous nerve',
          x: 60,
          y: 90,
        },
        {
          id: 'coracobrachialis',
          label: 'Coraco-\nbrachialis',
          name: 'Coracobrachialis',
          x: 180,
          y: 30,
        },
        {
          id: 'biceps-short',
          label: 'Biceps\nshort head',
          name: 'Short head of biceps',
          x: 180,
          y: 80,
        },
        {
          id: 'biceps-long',
          label: 'Biceps\nlong head',
          name: 'Long head of biceps',
          x: 180,
          y: 130,
        },
        { id: 'brachialis', label: 'Brachialis', name: 'Brachialis', x: 180, y: 180 },
        {
          id: 'lateral-cutaneous',
          label: 'Lateral cut.\nn. forearm',
          name: 'Lateral cutaneous nerve of the forearm',
          x: 180,
          y: 230,
        },
        {
          id: 'flex-arm',
          label: 'Flex arm at\nshoulder',
          name: 'Flexing and adducting the arm at the shoulder',
          x: 300,
          y: 30,
        },
        {
          id: 'supination',
          label: 'Supinate\nforearm',
          name: 'Supination of the forearm',
          x: 300,
          y: 80,
        },
        {
          id: 'flex-elbow',
          label: 'Flex the\nelbow',
          name: 'Flexion of the elbow',
          x: 300,
          y: 150,
        },
        {
          id: 'axillary-artery-3',
          label: 'Axillary a.\n3rd part',
          name: 'Third part of the axillary artery',
          x: 60,
          y: 300,
        },
        {
          id: 'brachial-artery',
          label: 'Brachial\nartery',
          name: 'Brachial artery',
          x: 180,
          y: 300,
        },
        {
          id: 'deep-brachial-artery',
          label: 'Profunda\nbrachii a.',
          name: 'Profunda brachii artery',
          x: 300,
          y: 280,
        },
        {
          id: 'cubital',
          label: 'At the\nelbow',
          name: 'Brachial artery in the cubital fossa',
          x: 180,
          y: 360,
        },
        {
          id: 'radial-ulnar',
          label: 'Radial and\nulnar aa.',
          name: 'Radial and ulnar arteries',
          x: 300,
          y: 360,
        },
        { id: 'median', label: 'Median\nnerve', name: 'Median nerve', x: 60, y: 420 },
        { id: 'ulnar', label: 'Ulnar\nnerve', name: 'Ulnar nerve', x: 180, y: 420 },
      ],
      edges: [
        { from: 'musculocutaneous', to: 'coracobrachialis' },
        { from: 'musculocutaneous', to: 'biceps-short' },
        { from: 'musculocutaneous', to: 'biceps-long' },
        { from: 'musculocutaneous', to: 'brachialis' },
        { from: 'musculocutaneous', to: 'lateral-cutaneous' },
        { from: 'coracobrachialis', to: 'flex-arm' },
        { from: 'biceps-short', to: 'supination' },
        { from: 'biceps-long', to: 'supination' },
        { from: 'biceps-long', to: 'flex-elbow' },
        { from: 'brachialis', to: 'flex-elbow' },
        { from: 'axillary-artery-3', to: 'brachial-artery' },
        { from: 'brachial-artery', to: 'deep-brachial-artery' },
        { from: 'brachial-artery', to: 'cubital' },
        { from: 'cubital', to: 'radial-ulnar' },
      ],
    },
    lesions: [
      {
        id: 'musculocutaneous-injury',
        label: 'Musculocutaneous nerve injury',
        nodeIds: ['musculocutaneous'],
        explanation:
          'Rare on its own, as it lies deep, but a stab wound or a fracture can cut it. Coracobrachialis, biceps and brachialis are paralysed: flexing the elbow is weak (brachioradialis still helps), supination is weak (supinator still works), and the skin of the lateral forearm goes numb.',
      },
      {
        id: 'supracondylar',
        label: 'Supracondylar fracture',
        nodeIds: ['cubital'],
        explanation:
          'A fracture just above the elbow, common in children, can press on or tear the brachial artery. The forearm muscles lose their blood supply; if it is not restored they die and scar, pulling the wrist and fingers into a fixed bent position (Volkmann ischaemic contracture). Check the radial pulse after every such fracture.',
      },
    ],
    drill: [
      {
        id: 'muscles',
        title: 'Nerve and muscles',
        hint: 'Three muscles, and the skin branch the nerve ends as.',
        nodeIds: [
          'coracobrachialis',
          'biceps-short',
          'biceps-long',
          'brachialis',
          'lateral-cutaneous',
        ],
      },
      {
        id: 'actions',
        title: 'What they do',
        hint: 'At the shoulder, at the elbow, and turning the forearm.',
        nodeIds: ['flex-arm', 'supination', 'flex-elbow'],
      },
      {
        id: 'artery',
        title: 'The artery',
        hint: 'The artery of the arm, its largest branch, and how it ends at the elbow.',
        nodeIds: ['brachial-artery', 'deep-brachial-artery', 'cubital', 'radial-ulnar'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'coracobrachialis',
        'biceps-short',
        'biceps-long',
        'brachialis',
        'humerus',
        'radius',
        'ulna',
        'scapula',
        'clavicle',
        'axillary-artery-3',
        'brachial-artery',
        'deep-brachial-artery',
        'cephalic-vein',
        'basilic-vein',
      ]),
      traces: [
        { id: 'musculocutaneous', kind: 'nerve', paths: plexusNerve('musculocutaneous') },
        { id: 'median', kind: 'nerve', paths: plexusNerve('median') },
        { id: 'ulnar', kind: 'nerve', paths: plexusNerve('ulnar') },
      ],
      stops: [
        {
          id: 'front',
          title: 'Front of the arm',
          description:
            'Biceps on the surface, brachialis beneath its lower half, and coracobrachialis high on the inner side. The brachial artery runs down the inner edge of biceps.',
          target: [-190, -80, 1150],
          position: [-420, -620, 1210],
        },
        {
          id: 'biceps',
          title: 'Two heads of biceps',
          description:
            'The long head from above the glenoid cavity and the short head from the coracoid join in the arm and insert into the radius.',
          target: [-195, -90, 1180],
          position: [-330, -500, 1250],
        },
        {
          id: 'elbow',
          title: 'At the elbow',
          description:
            'Brachialis reaches the ulna and biceps the radius. The brachial artery lies medial to the biceps tendon, where its pulse is felt.',
          target: [-215, -85, 1030],
          position: [-380, -420, 1020],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'compartments',
      title: 'Two compartments',
      body: 'Deep fascia wraps the arm and sends medial and lateral intermuscular septa to the supracondylar ridges of the humerus, splitting the arm into a front and a back compartment. The front holds coracobrachialis, biceps and brachialis, all supplied by the musculocutaneous nerve.',
      focus: ['musculocutaneous', 'coracobrachialis', 'biceps-short', 'biceps-long', 'brachialis'],
    },
    {
      id: 'biceps',
      title: 'Biceps brachii',
      body: 'The long head arises from the supraglenoid tubercle and its tendon runs through the shoulder joint and down the intertubercular groove; the short head arises from the coracoid process. They insert into the radial tuberosity and, through the bicipital aponeurosis, into the forearm fascia. Biceps flexes the elbow and is the strongest supinator, most of all with the elbow bent.',
      focus: ['biceps-short', 'biceps-long', 'supination', 'flex-elbow'],
    },
    {
      id: 'brachialis-coracobrachialis',
      title: 'Brachialis and coracobrachialis',
      body: 'Brachialis runs from the lower half of the front of the humerus to the coronoid process and tuberosity of the ulna, and flexes the elbow in every position. Coracobrachialis runs from the coracoid process to the middle of the medial side of the humerus; it flexes and adducts the arm.',
      focus: ['brachialis', 'coracobrachialis', 'flex-elbow', 'flex-arm'],
    },
    {
      id: 'musculocutaneous',
      title: 'Musculocutaneous nerve',
      body: 'A branch of the lateral cord (C5 to C7). It pierces coracobrachialis, runs down between biceps and brachialis supplying all three, and comes out lateral to the biceps tendon above the elbow as the lateral cutaneous nerve of the forearm.',
      focus: ['musculocutaneous', 'lateral-cutaneous'],
    },
    {
      id: 'brachial-artery',
      title: 'Brachial artery',
      body: 'It continues the axillary artery from the lower border of teres major and runs down the medial side of the arm, then in front of the elbow. The median nerve crosses in front of it from lateral to medial in the middle of the arm. Its largest branch, the profunda brachii, goes to the back of the arm with the radial nerve.',
      focus: ['axillary-artery-3', 'brachial-artery', 'deep-brachial-artery', 'median'],
    },
    {
      id: 'elbow',
      title: 'At the elbow',
      body: 'In the cubital fossa the artery lies medial to the biceps tendon, where its pulse is felt and blood pressure is measured. At the level of the neck of the radius it divides into the radial and ulnar arteries. A fracture just above the elbow can injure it.',
      focus: ['cubital', 'radial-ulnar'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select the nerve to see its muscles and what they do. Then turn on an injury to see what is lost.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'arm-front-supinator',
      prompt: 'The strongest supinator of the forearm is:',
      options: [
        { id: 'biceps', text: 'Biceps brachii' },
        { id: 'brachialis', text: 'Brachialis' },
        { id: 'brachioradialis', text: 'Brachioradialis' },
        { id: 'coracobrachialis', text: 'Coracobrachialis' },
      ],
      answerId: 'biceps',
      explanation:
        'Biceps pulls on the radial tuberosity, turning the radius outwards, most strongly with the elbow bent. Supinator helps; brachialis only flexes.',
    },
    {
      id: 'arm-front-pierces',
      prompt: 'Which muscle does the musculocutaneous nerve pierce?',
      options: [
        { id: 'coracobrachialis', text: 'Coracobrachialis' },
        { id: 'brachialis', text: 'Brachialis' },
        { id: 'biceps', text: 'Biceps' },
        { id: 'pec-minor', text: 'Pectoralis minor' },
      ],
      answerId: 'coracobrachialis',
      explanation: 'It pierces coracobrachialis, then runs between biceps and brachialis.',
    },
    {
      id: 'arm-front-brachial-end',
      prompt: 'The brachial artery divides into the radial and ulnar arteries:',
      options: [
        { id: 'neck-radius', text: 'In the cubital fossa, at the level of the neck of the radius' },
        { id: 'teres-major', text: 'At the lower border of teres major' },
        { id: 'mid-arm', text: 'In the middle of the arm' },
        { id: 'wrist', text: 'At the wrist' },
      ],
      answerId: 'neck-radius',
      explanation:
        'It begins at the lower border of teres major and ends in the cubital fossa, at the level of the neck of the radius.',
    },
    {
      id: 'arm-front-median',
      prompt: 'In the middle of the arm the median nerve:',
      options: [
        { id: 'crosses', text: 'Crosses in front of the brachial artery from lateral to medial' },
        { id: 'behind', text: 'Passes behind the humerus in the radial groove' },
        { id: 'pierces', text: 'Pierces coracobrachialis' },
        { id: 'septum', text: 'Pierces the lateral intermuscular septum' },
      ],
      answerId: 'crosses',
      explanation:
        'The median nerve starts lateral to the brachial artery and ends medial to it, crossing in front of it on the way.',
    },
  ],
  cards: [
    {
      id: 'arm-front-muscles',
      front: 'Muscles of the front of the arm and their nerve?',
      back: 'Coracobrachialis, biceps and brachialis: the musculocutaneous nerve.',
    },
    {
      id: 'arm-front-biceps',
      front: 'Origins and insertion of biceps?',
      back: 'Long head: supraglenoid tubercle. Short head: coracoid process. Inserts into the radial tuberosity and the bicipital aponeurosis.',
    },
    {
      id: 'arm-front-brachialis',
      front: 'Main flexor of the elbow in every position?',
      back: 'Brachialis, from the lower front of the humerus to the coronoid process and tuberosity of the ulna.',
    },
    {
      id: 'arm-front-lateral-cutaneous',
      front: 'What does the musculocutaneous nerve end as?',
      back: 'The lateral cutaneous nerve of the forearm, lateral to the biceps tendon at the elbow.',
    },
    {
      id: 'arm-front-volkmann',
      front: 'Volkmann ischaemic contracture follows injury to which artery, and how?',
      back: 'The brachial artery, usually from a supracondylar fracture of the humerus.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 8 Arm', pages: '95–103' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '742–749' },
  ],
};
