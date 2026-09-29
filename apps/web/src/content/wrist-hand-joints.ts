import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { RADIOULNAR_DISC, THUMB_CMC_JOINT, WRIST_JOINT_LINE } from './joints-3d';
import {
  HAND_BONES,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 5 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const wristHandJoints: Topic = {
  slug: 'wrist-hand-joints',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Wrist and hand joints',
  summary:
    'The wrist joint and its movers, the saddle joint at the base of the thumb that makes opposition possible, and the knuckle and finger joints.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 10 Joints of Upper Limb, pages 172 to 178'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, hand, pages 783 to 787'),
    {
      title: 'TeachMeAnatomy: The Wrist Joint',
      url: 'https://teachmeanatomy.info/upper-limb/joints/wrist-joint/',
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
    'The wrist (radiocarpal) joint is an ellipsoid synovial joint between the lower end of the radius with the articular disc above, and the scaphoid, lunate and triquetral below. The ulna does not take part.',
    'It allows flexion, extension, abduction and adduction, and so circumduction, but no rotation; adduction goes further than abduction because the radial styloid reaches lower.',
    'Much of wrist flexion and extension also happens at the midcarpal joint, between the two rows of carpal bones.',
    'The carpometacarpal joint of the thumb is a saddle joint between the trapezium and the first metacarpal. Its rotation lets the thumb pad meet the finger pads: opposition.',
    'The knuckle (metacarpophalangeal) joints are condyloid, bending and spreading; the finger (interphalangeal) joints are hinges that only bend and straighten.',
  ],
  visual: {
    kind: 'path',
    // Top: the wrist, its four movements and the muscles that make them. Bottom: the joints of
    // the hand and their type.
    diagram: {
      width: 360,
      height: 490,
      nodes: [
        {
          id: 'wrist-joint',
          label: 'Wrist\njoint',
          name: 'Wrist (radiocarpal) joint',
          x: 180,
          y: 35,
        },
        { id: 'flexion', label: 'Flexion', name: 'Flexion of the wrist', x: 45, y: 110 },
        { id: 'extension', label: 'Extension', name: 'Extension of the wrist', x: 135, y: 110 },
        {
          id: 'abduction',
          label: 'Abduction',
          name: 'Abduction (radial deviation)',
          x: 225,
          y: 110,
        },
        {
          id: 'adduction',
          label: 'Adduction',
          name: 'Adduction (ulnar deviation)',
          x: 315,
          y: 110,
        },
        {
          id: 'flexor-carpi-radialis',
          label: 'Flexor carpi\nradialis',
          name: 'Flexor carpi radialis',
          x: 60,
          y: 190,
        },
        {
          id: 'flexor-carpi-ulnaris',
          label: 'Flexor carpi\nulnaris',
          name: 'Flexor carpi ulnaris',
          x: 180,
          y: 190,
        },
        {
          id: 'extensor-carpi-ulnaris',
          label: 'Ext. carpi\nulnaris',
          name: 'Extensor carpi ulnaris',
          x: 300,
          y: 190,
        },
        {
          id: 'extensor-carpi-radialis-longus',
          label: 'Ext. carpi\nrad. longus',
          name: 'Extensor carpi radialis longus',
          x: 110,
          y: 255,
        },
        {
          id: 'extensor-carpi-radialis-brevis',
          label: 'Ext. carpi\nrad. brevis',
          name: 'Extensor carpi radialis brevis',
          x: 250,
          y: 255,
        },
        {
          id: 'first-cmc',
          label: 'Thumb\nCMC joint',
          name: 'Carpometacarpal joint of the thumb',
          x: 60,
          y: 335,
        },
        {
          id: 'mcp-joints',
          label: 'Knuckle\n(MCP) joints',
          name: 'Metacarpophalangeal joints',
          x: 180,
          y: 335,
        },
        {
          id: 'ip-joints',
          label: 'Finger\n(IP) joints',
          name: 'Interphalangeal joints',
          x: 300,
          y: 335,
        },
        { id: 'saddle', label: 'Saddle', name: 'Saddle joint', x: 60, y: 400 },
        { id: 'condyloid', label: 'Condyloid', name: 'Condyloid joint', x: 180, y: 400 },
        { id: 'hinge', label: 'Hinge', name: 'Hinge joint', x: 300, y: 400 },
        {
          id: 'opposition',
          label: 'Opposition',
          name: 'Opposition of the thumb',
          x: 60,
          y: 460,
        },
      ],
      edges: [
        { from: 'wrist-joint', to: 'flexion' },
        { from: 'wrist-joint', to: 'extension' },
        { from: 'wrist-joint', to: 'abduction' },
        { from: 'wrist-joint', to: 'adduction' },
        { from: 'flexion', to: 'flexor-carpi-radialis' },
        { from: 'flexion', to: 'flexor-carpi-ulnaris' },
        { from: 'extension', to: 'extensor-carpi-radialis-longus' },
        { from: 'extension', to: 'extensor-carpi-radialis-brevis' },
        { from: 'extension', to: 'extensor-carpi-ulnaris' },
        { from: 'abduction', to: 'flexor-carpi-radialis' },
        { from: 'abduction', to: 'extensor-carpi-radialis-longus' },
        { from: 'abduction', to: 'extensor-carpi-radialis-brevis' },
        { from: 'adduction', to: 'flexor-carpi-ulnaris' },
        { from: 'adduction', to: 'extensor-carpi-ulnaris' },
        { from: 'first-cmc', to: 'saddle' },
        { from: 'saddle', to: 'opposition' },
        { from: 'mcp-joints', to: 'condyloid' },
        { from: 'ip-joints', to: 'hinge' },
      ],
    },
    lesions: [
      {
        id: 'colles',
        label: 'Colles fracture',
        nodeIds: ['wrist-joint'],
        explanation:
          'A fall on the outstretched hand in an older adult with thin bones breaks the lower end of the radius about 2.5 cm above the wrist. The lower fragment tilts backwards and outwards, giving a dinner-fork deformity, and the ulnar styloid is often torn off. Wrist and finger stiffness, and later rupture of the extensor pollicis longus tendon, can follow.',
      },
      {
        id: 'thumb-arthritis',
        label: 'Arthritis at the base of the thumb',
        nodeIds: ['first-cmc', 'saddle', 'opposition'],
        explanation:
          'The saddle joint takes great force in pinching and gripping and often wears in older adults, especially women. The base of the thumb aches with pinching, opening jars or turning keys, and opposition becomes weak and painful.',
      },
    ],
    drill: [
      {
        id: 'wrist',
        title: 'Wrist movements',
        hint: 'Four movements of the wrist.',
        nodeIds: ['flexion', 'extension', 'abduction', 'adduction'],
      },
      {
        id: 'muscles',
        title: 'Muscles',
        hint: 'Each wrist muscle takes part in two movements.',
        nodeIds: [
          'flexor-carpi-radialis',
          'flexor-carpi-ulnaris',
          'extensor-carpi-ulnaris',
          'extensor-carpi-radialis-longus',
          'extensor-carpi-radialis-brevis',
        ],
      },
      {
        id: 'hand',
        title: 'Joints of the hand',
        hint: 'Three joints, their types, and what the thumb joint allows.',
        nodeIds: [
          'first-cmc',
          'mcp-joints',
          'ip-joints',
          'saddle',
          'condyloid',
          'hinge',
          'opposition',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Joint outlines: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'radius',
        'ulna',
        ...HAND_BONES,
        'flexor-carpi-radialis',
        'flexor-carpi-ulnaris',
        'extensor-carpi-ulnaris',
        'extensor-carpi-radialis-longus',
        'extensor-carpi-radialis-brevis',
        'thenar-muscles',
      ]),
      traces: [
        { id: 'wrist-joint', kind: 'outline', paths: [...WRIST_JOINT_LINE, ...RADIOULNAR_DISC] },
        { id: 'first-cmc', kind: 'outline', paths: THUMB_CMC_JOINT },
      ],
      stops: [
        {
          id: 'palm',
          title: 'The wrist from the front',
          description:
            'The lower end of the radius and the articular disc meet the scaphoid, lunate and triquetral. The ulna stops short, separated by the disc.',
          target: [-258, -125, 790],
          position: [-324, -447, 823],
        },
        {
          id: 'thumb',
          title: 'Base of the thumb',
          description:
            'The first metacarpal sits on the saddle-shaped trapezium, turned so the thumb faces across the palm. Its rotation lets the thumb pad meet each fingertip.',
          target: [-277, -128, 791],
          position: [-466, -258, 815],
        },
        {
          id: 'back',
          title: 'From behind',
          description:
            'The wrist extensors run to the bases of the second, third and fifth metacarpals. The knuckles are the heads of the metacarpals.',
          target: [-258, -110, 795],
          position: [-324, 210, 844],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'wrist',
      title: 'The wrist joint',
      body: 'An ellipsoid synovial joint. Above: the lower end of the radius and the triangular articular disc. Below: the scaphoid, lunate and triquetral. The ulna does not reach the joint; the disc lies between them.',
      focus: ['wrist-joint'],
    },
    {
      id: 'movements',
      title: 'Wrist movements',
      body: 'Flexion, extension, abduction (towards the thumb) and adduction (towards the little finger), and so circumduction, but no rotation: turning the hand is done at the radioulnar joints. Adduction goes further than abduction, because the radial styloid reaches lower than the ulnar. Much of flexion and extension happens at the midcarpal joint between the two carpal rows.',
      focus: ['flexion', 'extension', 'abduction', 'adduction'],
    },
    {
      id: 'muscles',
      title: 'Muscles of the wrist',
      body: 'Flexors: flexor carpi radialis and flexor carpi ulnaris, with palmaris longus and the finger flexors. Extensors: extensor carpi radialis longus and brevis and extensor carpi ulnaris. A flexor and an extensor of the same side together move the hand sideways: the radial pair abducts, the ulnar pair adducts.',
      focus: [
        'flexor-carpi-radialis',
        'flexor-carpi-ulnaris',
        'extensor-carpi-radialis-longus',
        'extensor-carpi-radialis-brevis',
        'extensor-carpi-ulnaris',
      ],
    },
    {
      id: 'thumb',
      title: 'The thumb joint',
      body: 'The carpometacarpal joint of the thumb is a saddle joint between the trapezium and the first metacarpal, with its own loose capsule. It flexes, extends, abducts and adducts, and its rotation during flexion lets the thumb pad face each fingertip: opposition, the movement that makes the human hand so useful.',
      focus: ['first-cmc', 'saddle', 'opposition'],
    },
    {
      id: 'fingers',
      title: 'Knuckles and finger joints',
      body: 'The metacarpophalangeal joints are condyloid: they bend and straighten, and spread and close the fingers when straight. Strong palmar plates and collateral ligaments tighten in flexion, which is why a gripped fist is firm. The interphalangeal joints are hinges that only bend and straighten.',
      focus: ['mcp-joints', 'condyloid', 'ip-joints', 'hinge'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a movement to see its muscles and a joint to see its type. Then turn on an injury to see what happens.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'wrist-joints-no-ulna',
      prompt: 'Which bone does not take part in the wrist (radiocarpal) joint?',
      options: [
        { id: 'ulna', text: 'Ulna' },
        { id: 'radius', text: 'Radius' },
        { id: 'scaphoid', text: 'Scaphoid' },
        { id: 'lunate', text: 'Lunate' },
      ],
      answerId: 'ulna',
      explanation: 'The articular disc lies between the ulna and the carpal bones.',
    },
    {
      id: 'wrist-joints-thumb-type',
      prompt: 'The carpometacarpal joint of the thumb is a:',
      options: [
        { id: 'saddle', text: 'Saddle joint' },
        { id: 'hinge', text: 'Hinge joint' },
        { id: 'pivot', text: 'Pivot joint' },
        { id: 'ball', text: 'Ball and socket joint' },
      ],
      answerId: 'saddle',
      explanation:
        'Between the trapezium and the first metacarpal; its movement includes the rotation needed for opposition.',
    },
    {
      id: 'wrist-joints-adduction',
      prompt: 'Adduction of the wrist is produced by:',
      options: [
        { id: 'ulnar-pair', text: 'Flexor carpi ulnaris and extensor carpi ulnaris' },
        { id: 'radial-pair', text: 'Flexor carpi radialis and the radial extensors' },
        { id: 'flexors', text: 'The finger flexors' },
        { id: 'palmaris', text: 'Palmaris longus' },
      ],
      answerId: 'ulnar-pair',
      explanation:
        'A flexor and an extensor on the same side work together; the ulnar pair pulls the hand towards the little finger.',
    },
    {
      id: 'wrist-joints-rotation',
      prompt: 'Why can the wrist joint not rotate?',
      options: [
        { id: 'ellipsoid', text: 'It is an ellipsoid joint, with oval surfaces' },
        { id: 'hinge', text: 'It is a hinge joint' },
        { id: 'disc', text: 'The disc locks it' },
        { id: 'fibrous', text: 'It is a fibrous joint' },
      ],
      answerId: 'ellipsoid',
      explanation:
        'Oval surfaces allow movement in two planes but not spinning; turning the hand happens at the radioulnar joints.',
    },
  ],
  cards: [
    {
      id: 'wrist-joints-surfaces',
      front: 'Articular surfaces of the wrist joint?',
      back: 'Above: lower end of the radius and the articular disc. Below: scaphoid, lunate, triquetral.',
    },
    {
      id: 'wrist-joints-movers',
      front: 'Abductors and adductors of the wrist?',
      back: 'Abductors: flexor carpi radialis, extensor carpi radialis longus and brevis. Adductors: flexor and extensor carpi ulnaris.',
    },
    {
      id: 'wrist-joints-midcarpal',
      front: 'Where does much of wrist flexion and extension happen besides the wrist joint?',
      back: 'At the midcarpal joint, between the two rows of carpal bones.',
    },
    {
      id: 'wrist-joints-thumb',
      front: 'Type and key movement of the thumb carpometacarpal joint?',
      back: 'Saddle joint between the trapezium and first metacarpal; its rotation allows opposition.',
    },
    {
      id: 'wrist-joints-fingers',
      front: 'Types of the knuckle and finger joints?',
      back: 'Metacarpophalangeal: condyloid. Interphalangeal: hinge.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 10 Joints of Upper Limb', pages: '172–178' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '783–787' },
  ],
};
