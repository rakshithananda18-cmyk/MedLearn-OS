import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { plexusNerve } from './brachial-plexus-3d';
import { between, ULNAR_FOREARM_MAIN } from './forearm-3d';
import {
  ANNULAR_LIGAMENT,
  RADIAL_COLLATERAL_LIGAMENT,
  ULNAR_COLLATERAL_LIGAMENT,
} from './joints-3d';
import { SHOULDER_MODEL_CREDIT, SHOULDER_MODEL_SRC, shoulderParts } from './shoulder-3d';

// Upper limb batch 5 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const elbowJoint: Topic = {
  slug: 'elbow-joint',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Elbow joint',
  summary:
    'A hinge between the humerus and the ulna and radius: its surfaces, collateral ligaments, carrying angle, the muscles that bend and straighten it, and dislocation.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 10 Joints of Upper Limb, pages 165 to 169'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, elbow joint, pages 753 to 757'),
    {
      title: 'TeachMeAnatomy: The Elbow Joint',
      url: 'https://teachmeanatomy.info/upper-limb/joints/elbow-joint/',
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
    'A hinge synovial joint: the trochlea of the humerus fits the trochlear notch of the ulna, and the capitulum meets the head of the radius. It shares one capsule with the superior radioulnar joint.',
    'The ulnar collateral ligament (anterior, posterior and oblique bands) holds the medial side, with the ulnar nerve on it; the radial collateral ligament runs from the lateral epicondyle to the annular ligament.',
    'With the elbow straight and the palm forward, the forearm angles outwards from the arm: the carrying angle, about 10 to 15 degrees, a little larger in women. It disappears when the elbow bends.',
    'Flexion: brachialis, biceps and brachioradialis. Extension: triceps and anconeus.',
    'In a straight elbow the olecranon and the two epicondyles lie in a line; bent, they form a triangle. A dislocation upsets this; a supracondylar fracture does not.',
  ],
  visual: {
    kind: 'path',
    // Top: the bones and their surfaces. Middle: the ligaments. Bottom: movements and muscles,
    // with the ulnar nerve on the medial ligament.
    diagram: {
      width: 360,
      height: 420,
      nodes: [
        { id: 'humerus', label: 'Humerus', name: 'Lower end of the humerus', x: 180, y: 40 },
        { id: 'trochlea', label: 'Trochlea', name: 'Trochlea of the humerus', x: 90, y: 110 },
        {
          id: 'capitulum',
          label: 'Capitulum',
          name: 'Capitulum of the humerus',
          x: 270,
          y: 110,
        },
        { id: 'ulna', label: 'Ulna', name: 'Trochlear notch of the ulna', x: 90, y: 180 },
        { id: 'radius', label: 'Radial\nhead', name: 'Head of the radius', x: 270, y: 180 },
        {
          id: 'ulnar-collateral',
          label: 'Ulnar\ncollateral lig.',
          name: 'Ulnar collateral ligament',
          x: 60,
          y: 250,
        },
        {
          id: 'annular-ligament',
          label: 'Annular\nligament',
          name: 'Annular ligament',
          x: 190,
          y: 250,
        },
        {
          id: 'radial-collateral',
          label: 'Radial\ncollateral lig.',
          name: 'Radial collateral ligament',
          x: 305,
          y: 250,
        },
        { id: 'flexion', label: 'Flexion', name: 'Flexion of the elbow', x: 90, y: 320 },
        { id: 'ulnar', label: 'Ulnar\nnerve', name: 'Ulnar nerve', x: 180, y: 320 },
        { id: 'extension', label: 'Extension', name: 'Extension of the elbow', x: 270, y: 320 },
        { id: 'brachialis', label: 'Brachialis', name: 'Brachialis', x: 40, y: 390 },
        { id: 'biceps-long', label: 'Biceps', name: 'Biceps brachii', x: 115, y: 390 },
        {
          id: 'brachioradialis',
          label: 'Brachio-\nradialis',
          name: 'Brachioradialis',
          x: 190,
          y: 390,
        },
        { id: 'triceps-long', label: 'Triceps', name: 'Triceps brachii', x: 262, y: 390 },
        { id: 'anconeus', label: 'Anconeus', name: 'Anconeus', x: 326, y: 390 },
      ],
      edges: [
        { from: 'humerus', to: 'trochlea' },
        { from: 'humerus', to: 'capitulum' },
        { from: 'trochlea', to: 'ulna' },
        { from: 'capitulum', to: 'radius' },
        { from: 'ulna', to: 'ulnar-collateral' },
        { from: 'radius', to: 'annular-ligament' },
        { from: 'radius', to: 'radial-collateral' },
        { from: 'ulnar', to: 'ulnar-collateral' },
        { from: 'flexion', to: 'brachialis' },
        { from: 'flexion', to: 'biceps-long' },
        { from: 'flexion', to: 'brachioradialis' },
        { from: 'extension', to: 'triceps-long' },
        { from: 'extension', to: 'anconeus' },
      ],
    },
    lesions: [
      {
        id: 'posterior-dislocation',
        label: 'Posterior dislocation',
        nodeIds: ['humerus', 'ulna', 'radius'],
        explanation:
          'A fall on the outstretched hand with the elbow slightly bent drives the ulna and radius backwards off the humerus. The olecranon juts out behind, and the normal line or triangle of the olecranon and the two epicondyles is lost, which tells it apart from a supracondylar fracture. The brachial artery and the median and ulnar nerves must be checked.',
      },
      {
        id: 'ulnar-nerve-elbow',
        label: 'Ulnar nerve squeezed at the elbow',
        nodeIds: ['ulnar', 'ulnar-collateral'],
        explanation:
          'Behind the medial epicondyle the ulnar nerve lies on the ulnar collateral ligament, under a fibrous arch (the cubital tunnel). Leaning on the elbow, a deformity that widens the carrying angle, or arthritis can press it: the ring and little fingers tingle and the small hand muscles weaken. Knocking it gives the familiar funny-bone jolt.',
      },
    ],
    drill: [
      {
        id: 'surfaces',
        title: 'Joint surfaces',
        hint: 'Two surfaces on the humerus and what each meets.',
        nodeIds: ['trochlea', 'capitulum', 'ulna', 'radius'],
      },
      {
        id: 'ligaments',
        title: 'Ligaments',
        hint: 'One on each side, and the ring round the radial head.',
        nodeIds: ['ulnar-collateral', 'annular-ligament', 'radial-collateral', 'ulnar'],
      },
      {
        id: 'movements',
        title: 'Movements and muscles',
        hint: 'Three flexors, two extensors.',
        nodeIds: [
          'flexion',
          'extension',
          'brachialis',
          'biceps-long',
          'brachioradialis',
          'triceps-long',
          'anconeus',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Ligaments and nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'humerus',
        'radius',
        'ulna',
        'brachialis',
        'biceps-long',
        'biceps-short',
        'brachioradialis',
        'triceps-long',
        'triceps-lateral',
        'triceps-medial',
        'anconeus',
        'brachial-artery',
      ]),
      traces: [
        { id: 'annular-ligament', kind: 'outline', paths: ANNULAR_LIGAMENT },
        { id: 'ulnar-collateral', kind: 'outline', paths: ULNAR_COLLATERAL_LIGAMENT },
        { id: 'radial-collateral', kind: 'outline', paths: RADIAL_COLLATERAL_LIGAMENT },
        {
          id: 'ulnar',
          kind: 'nerve',
          paths: [
            ...between(plexusNerve('ulnar'), 1000, 1300),
            ...between(ULNAR_FOREARM_MAIN, 980, 1070),
          ],
        },
      ],
      stops: [
        {
          id: 'front',
          title: 'Front of the elbow',
          description:
            'The trochlea meets the ulna on the medial side and the capitulum meets the radial head on the lateral side. Brachialis and biceps cross in front.',
          target: [-212, -72, 1040],
          position: [-311, -385, 1073],
        },
        {
          id: 'medial',
          title: 'Medial side',
          description:
            'The ulnar collateral ligament fans from the medial epicondyle to the coronoid process and olecranon, with the ulnar nerve lying on it.',
          target: [-195, -68, 1040],
          position: [58, -226, 1072],
        },
        {
          id: 'back',
          title: 'From behind',
          description:
            'Triceps inserts into the olecranon, with anconeus beside it. With the elbow straight, the olecranon tip lies in line with the two epicondyles.',
          target: [-208, -55, 1045],
          position: [-274, 267, 1078],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'surfaces',
      title: 'Two joints in one',
      body: 'The elbow is a hinge synovial joint. Medially the pulley-shaped trochlea of the humerus sits in the trochlear notch of the ulna; laterally the rounded capitulum meets the cupped head of the radius. One capsule encloses both and the superior radioulnar joint.',
      focus: ['humerus', 'trochlea', 'capitulum', 'ulna', 'radius'],
    },
    {
      id: 'ligaments',
      title: 'Collateral ligaments',
      body: 'The ulnar collateral ligament is a triangle on the medial side: an anterior band to the coronoid process, a posterior band to the olecranon, and an oblique band joining the two. The ulnar nerve lies on it. The radial collateral ligament runs from the lateral epicondyle to the annular ligament that rings the radial head, leaving the radius free to turn.',
      focus: ['ulnar-collateral', 'radial-collateral', 'annular-ligament', 'ulnar'],
    },
    {
      id: 'carrying-angle',
      title: 'Carrying angle',
      body: 'With the elbow straight and the palm forward, the forearm points slightly away from the body, about 10 to 15 degrees, because the trochlea projects lower than the capitulum. It keeps a carried load clear of the hip, is a little larger in women, and vanishes when the elbow bends or the forearm is pronated.',
      focus: ['trochlea', 'ulna'],
    },
    {
      id: 'movements',
      title: 'Bending and straightening',
      body: 'Brachialis is the main flexor in every position, helped by biceps (strongest with the palm up) and brachioradialis (strongest with the thumb up). Triceps extends, helped by anconeus. Extension stops when the olecranon meets the olecranon fossa.',
      focus: [
        'flexion',
        'extension',
        'brachialis',
        'biceps-long',
        'brachioradialis',
        'triceps-long',
        'anconeus',
      ],
    },
    {
      id: 'three-points',
      title: 'Three bony points',
      body: 'Feel the olecranon tip and the two epicondyles. With the elbow straight they lie in a line; bent to a right angle they form a triangle. A dislocation of the elbow disturbs this relation; a supracondylar fracture of the humerus leaves it intact.',
      focus: ['humerus', 'ulna'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each ligament and muscle to see where it lies, then turn on an injury to see what happens.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'elbow-joint-main-flexor',
      prompt: 'The main flexor of the elbow in every position of the forearm is:',
      options: [
        { id: 'brachialis', text: 'Brachialis' },
        { id: 'biceps', text: 'Biceps' },
        { id: 'brachioradialis', text: 'Brachioradialis' },
        { id: 'pronator', text: 'Pronator teres' },
      ],
      answerId: 'brachialis',
      explanation:
        'Brachialis inserts into the ulna, which does not turn, so it flexes equally well whatever the forearm position.',
    },
    {
      id: 'elbow-joint-three-points',
      prompt: 'The normal relation of the olecranon and the two epicondyles is lost in:',
      options: [
        { id: 'dislocation', text: 'Posterior dislocation of the elbow' },
        { id: 'supracondylar', text: 'Supracondylar fracture of the humerus' },
        { id: 'pulled', text: 'Pulled elbow' },
        { id: 'tennis', text: 'Tennis elbow' },
      ],
      answerId: 'dislocation',
      explanation:
        'All three points lie on the humerus and ulna together; a fracture above them keeps their relation, a dislocation separates them.',
    },
    {
      id: 'elbow-joint-ulnar-nerve',
      prompt: 'The ulnar nerve at the elbow lies on the:',
      options: [
        { id: 'ucl', text: 'Ulnar collateral ligament' },
        { id: 'rcl', text: 'Radial collateral ligament' },
        { id: 'annular', text: 'Annular ligament' },
        { id: 'capitulum', text: 'Capitulum' },
      ],
      answerId: 'ucl',
      explanation: 'It passes behind the medial epicondyle, on the ulnar collateral ligament.',
    },
    {
      id: 'elbow-joint-carrying-angle',
      prompt: 'The carrying angle disappears when:',
      options: [
        { id: 'flexed', text: 'The elbow is fully bent' },
        { id: 'extended', text: 'The elbow is straight and the palm faces forward' },
        { id: 'supinated', text: 'The forearm is supinated' },
        { id: 'abducted', text: 'The arm is abducted' },
      ],
      answerId: 'flexed',
      explanation:
        'It shows only with the elbow straight and the palm forward; it vanishes in flexion and in pronation.',
    },
  ],
  cards: [
    {
      id: 'elbow-joint-surfaces',
      front: 'Articular surfaces of the elbow joint?',
      back: 'Trochlea with the trochlear notch of the ulna; capitulum with the head of the radius.',
    },
    {
      id: 'elbow-joint-ucl',
      front: 'Bands of the ulnar collateral ligament?',
      back: 'Anterior (to the coronoid), posterior (to the olecranon) and oblique (between them).',
    },
    {
      id: 'elbow-joint-carrying',
      front: 'Carrying angle: size and cause?',
      back: 'About 10 to 15 degrees, larger in women; the trochlea projects lower than the capitulum.',
    },
    {
      id: 'elbow-joint-muscles',
      front: 'Flexors and extensors of the elbow?',
      back: 'Flexors: brachialis, biceps, brachioradialis. Extensors: triceps, anconeus.',
    },
    {
      id: 'elbow-joint-bony-points',
      front: 'The three bony points of the elbow in extension and flexion?',
      back: 'Olecranon tip and both epicondyles: in a line when straight, a triangle when bent at a right angle.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 10 Joints of Upper Limb', pages: '165–169' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '753–757' },
  ],
};
