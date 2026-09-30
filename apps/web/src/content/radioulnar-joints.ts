import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { ANNULAR_LIGAMENT, RADIOULNAR_DISC } from './joints-3d';
import {
  HAND_BONES,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 5 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const radioulnarJoints: Topic = {
  slug: 'radioulnar-joints',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Radioulnar joints: pronation and supination',
  summary:
    'The superior, middle and inferior radioulnar joints, how the radius turns round the ulna, the muscles that turn the palm, and pulled elbow.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 10 Joints of Upper Limb, pages 168 to 170'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, forearm, pages 764 to 766'),
    {
      title: 'TeachMeAnatomy: The Radioulnar Joints',
      url: 'https://teachmeanatomy.info/upper-limb/joints/radioulnar-joints/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones, membrane and muscles in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Superior radioulnar joint: a pivot joint where the radial head turns in a ring made by the radial notch of the ulna and the annular ligament.',
    'Middle radioulnar joint: the interosseous membrane, whose fibres run down and medially from radius to ulna, passing force from the hand to the ulna and humerus.',
    'Inferior radioulnar joint: a pivot joint between the head of the ulna and the ulnar notch of the radius, held by a triangular articular disc that also shuts it off from the wrist joint.',
    'In pronation and supination the radius, carrying the hand, turns round the ulna about a line from the centre of the radial head to the base of the ulnar styloid.',
    'Pronators: pronator quadratus (main) and pronator teres. Supinators: supinator and biceps, the strongest with the elbow bent. Brachioradialis brings the forearm to the midway position from either side.',
  ],
  visual: {
    kind: 'path',
    // Top: the three joints and what holds them. Bottom: the two movements and their muscles.
    diagram: {
      width: 360,
      height: 360,
      nodes: [
        {
          id: 'superior-radioulnar',
          label: 'Superior\nradioulnar',
          name: 'Superior radioulnar joint',
          x: 60,
          y: 40,
        },
        {
          id: 'interosseous-membrane',
          label: 'Interosseous\nmembrane',
          name: 'Interosseous membrane (middle radioulnar joint)',
          x: 180,
          y: 40,
        },
        {
          id: 'inferior-radioulnar',
          label: 'Inferior\nradioulnar',
          name: 'Inferior radioulnar joint',
          x: 300,
          y: 40,
        },
        {
          id: 'annular-ligament',
          label: 'Annular\nligament',
          name: 'Annular ligament',
          x: 60,
          y: 110,
        },
        {
          id: 'articular-disc',
          label: 'Articular\ndisc',
          name: 'Triangular articular disc',
          x: 300,
          y: 110,
        },
        { id: 'pronation', label: 'Pronation', name: 'Pronation', x: 90, y: 190 },
        { id: 'supination', label: 'Supination', name: 'Supination', x: 270, y: 190 },
        {
          id: 'pronator-quadratus',
          label: 'Pronator\nquadratus',
          name: 'Pronator quadratus',
          x: 40,
          y: 260,
        },
        {
          id: 'pronator-teres',
          label: 'Pronator\nteres',
          name: 'Pronator teres',
          x: 130,
          y: 260,
        },
        { id: 'supinator', label: 'Supinator', name: 'Supinator', x: 230, y: 260 },
        { id: 'biceps-long', label: 'Biceps', name: 'Biceps brachii', x: 320, y: 260 },
        {
          id: 'brachioradialis',
          label: 'Brachio-\nradialis',
          name: 'Brachioradialis, to the midway position',
          x: 180,
          y: 330,
        },
      ],
      edges: [
        { from: 'superior-radioulnar', to: 'annular-ligament' },
        { from: 'inferior-radioulnar', to: 'articular-disc' },
        { from: 'pronation', to: 'pronator-quadratus' },
        { from: 'pronation', to: 'pronator-teres' },
        { from: 'supination', to: 'supinator' },
        { from: 'supination', to: 'biceps-long' },
        { from: 'pronation', to: 'brachioradialis' },
        { from: 'supination', to: 'brachioradialis' },
      ],
    },
    lesions: [
      {
        id: 'pulled-elbow',
        label: 'Pulled elbow',
        nodeIds: ['superior-radioulnar', 'annular-ligament'],
        explanation:
          'In a child under about five, the radial head is small and the annular ligament loose. A sudden pull on the hand, as when lifting the child by the arm, slides the head partly out of the ligament. The child holds the forearm pronated and will not use it. Turning the forearm into supination while bending the elbow usually slips it back with a click.',
      },
      {
        id: 'forearm-fracture',
        label: 'Fracture of both forearm bones',
        nodeIds: ['interosseous-membrane', 'pronation', 'supination'],
        explanation:
          'If the radius and ulna heal out of alignment, or a bridge of bone forms across the interosseous membrane, the radius can no longer turn round the ulna and pronation and supination are lost. Such fractures are set so that the curve of each bone and the width of the membrane are restored.',
      },
    ],
    drill: [
      {
        id: 'joints',
        title: 'Three joints',
        hint: 'Top, middle and bottom, and what holds the pivots.',
        nodeIds: [
          'superior-radioulnar',
          'interosseous-membrane',
          'inferior-radioulnar',
          'annular-ligament',
          'articular-disc',
        ],
      },
      {
        id: 'muscles',
        title: 'Turning the palm',
        hint: 'Two pronators, two supinators, and the muscle that brings it to midway.',
        nodeIds: [
          'pronation',
          'supination',
          'pronator-quadratus',
          'pronator-teres',
          'supinator',
          'biceps-long',
          'brachioradialis',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Ligament and disc: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'radius',
        'ulna',
        'humerus',
        'interosseous-membrane',
        'pronator-quadratus',
        'pronator-teres',
        'supinator',
        'biceps-long',
        'biceps-short',
        'brachioradialis',
        ...HAND_BONES,
      ]),
      traces: [
        { id: 'annular-ligament', kind: 'outline', paths: ANNULAR_LIGAMENT },
        { id: 'articular-disc', kind: 'outline', paths: RADIOULNAR_DISC },
      ],
      stops: [
        {
          id: 'front',
          title: 'Two bones, three joints',
          description:
            'The radius and ulna meet at the elbow, along the interosseous membrane, and at the wrist. The radius carries the hand as it turns.',
          target: [-235, -95, 920],
          position: [-421, -684, 970],
        },
        {
          id: 'superior',
          title: 'Radial head',
          description:
            'The radial head spins inside the annular ligament against the radial notch of the ulna. Supinator wraps round the neck just below.',
          target: [-231, -73, 1027],
          position: [-384, -264, 1078],
        },
        {
          id: 'inferior',
          title: 'Lower end',
          description:
            'The ulnar notch of the radius swings round the head of the ulna, tied by the triangular disc. Pronator quadratus crosses the front of both bones just above.',
          target: [-245, -115, 808],
          position: [-308, -341, 720],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'superior',
      title: 'Superior radioulnar joint',
      body: 'A pivot joint. The disc-shaped head of the radius turns within a ring formed by the radial notch of the ulna (one fifth) and the annular ligament (four fifths). The ligament is cupped, narrower below, so the head cannot pull out in adults. The joint shares its cavity with the elbow.',
      focus: ['superior-radioulnar', 'annular-ligament'],
    },
    {
      id: 'middle',
      title: 'Interosseous membrane',
      body: 'A sheet of fibres binds the shafts of the radius and ulna, running downwards and medially from radius to ulna. A push on the hand reaches the radius at the wrist; the membrane passes it to the ulna, which carries it to the humerus. It also gives origin to deep forearm muscles.',
      focus: ['interosseous-membrane'],
    },
    {
      id: 'inferior',
      title: 'Inferior radioulnar joint',
      body: 'A pivot joint between the head of the ulna and the ulnar notch of the radius. A triangular articular disc runs from the radius to the base of the ulnar styloid; it holds the two bones together and separates this joint from the wrist joint.',
      focus: ['inferior-radioulnar', 'articular-disc'],
    },
    {
      id: 'movement',
      title: 'How the palm turns',
      body: 'In pronation the lower end of the radius, carrying the hand, swings across in front of the ulna; in supination it swings back. The axis runs from the centre of the radial head to the base of the ulnar styloid. With the elbow bent the humerus stays still; with it straight, rotation of the humerus adds to the range.',
      focus: ['pronation', 'supination'],
    },
    {
      id: 'muscles',
      title: 'Muscles',
      body: 'Pronator quadratus is the main pronator; pronator teres joins in for speed or force. Supinator supinates on its own for light work; biceps, the strongest supinator, joins in with the elbow bent, as when turning a screwdriver. Brachioradialis brings the forearm to the midway position from either direction.',
      focus: [
        'pronator-quadratus',
        'pronator-teres',
        'supinator',
        'biceps-long',
        'brachioradialis',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each joint and muscle to see where it lies, then turn on an injury to see what is lost.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'radioulnar-pulled-elbow',
      prompt: 'In pulled elbow, the radial head slips out of the:',
      options: [
        { id: 'annular', text: 'Annular ligament' },
        { id: 'rcl', text: 'Radial collateral ligament' },
        { id: 'disc', text: 'Articular disc' },
        { id: 'capsule', text: 'Capsule of the wrist joint' },
      ],
      answerId: 'annular',
      explanation:
        'In young children the radial head is small and the annular ligament loose; a sudden pull slides the head partly out of it.',
    },
    {
      id: 'radioulnar-strongest-supinator',
      prompt: 'The strongest supinator of the forearm, most effective with the elbow bent, is:',
      options: [
        { id: 'biceps', text: 'Biceps brachii' },
        { id: 'supinator', text: 'Supinator' },
        { id: 'brachioradialis', text: 'Brachioradialis' },
        { id: 'apl', text: 'Abductor pollicis longus' },
      ],
      answerId: 'biceps',
      explanation:
        'Biceps pulls on the radial tuberosity; with the elbow bent at a right angle it turns the radius most effectively.',
    },
    {
      id: 'radioulnar-membrane',
      prompt: 'The fibres of the interosseous membrane run from the radius:',
      options: [
        { id: 'down-medial', text: 'Downwards and medially to the ulna' },
        { id: 'up-medial', text: 'Upwards and medially to the ulna' },
        { id: 'horizontal', text: 'Horizontally to the ulna' },
        { id: 'humerus', text: 'Upwards to the humerus' },
      ],
      answerId: 'down-medial',
      explanation:
        'That direction passes force from the radius at the wrist to the ulna, which carries it to the humerus.',
    },
    {
      id: 'radioulnar-disc',
      prompt: 'The triangular articular disc of the inferior radioulnar joint is attached to the:',
      options: [
        { id: 'radius-styloid', text: 'Radius and the base of the ulnar styloid' },
        { id: 'scaphoid', text: 'Scaphoid and lunate' },
        { id: 'pisiform', text: 'Pisiform and hamate' },
        { id: 'humerus', text: 'Humerus and ulna' },
      ],
      answerId: 'radius-styloid',
      explanation:
        'It binds the lower ends of the two bones and separates the inferior radioulnar joint from the wrist joint.',
    },
  ],
  cards: [
    {
      id: 'radioulnar-types',
      front: 'Types of the three radioulnar joints?',
      back: 'Superior and inferior: pivot synovial joints. Middle: a fibrous joint (the interosseous membrane).',
    },
    {
      id: 'radioulnar-axis',
      front: 'Axis of pronation and supination?',
      back: 'From the centre of the radial head to the base of the ulnar styloid.',
    },
    {
      id: 'radioulnar-muscles',
      front: 'Pronators and supinators of the forearm?',
      back: 'Pronators: pronator quadratus, pronator teres. Supinators: supinator, biceps. Brachioradialis to midway.',
    },
    {
      id: 'radioulnar-annular',
      front: 'What forms the ring for the radial head?',
      back: 'The radial notch of the ulna and the annular ligament.',
    },
    {
      id: 'radioulnar-pulled',
      front: 'Pulled elbow: who, how and treatment?',
      back: 'A young child pulled by the hand; the radial head slips out of the annular ligament; reduced by supinating while bending the elbow.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 10 Joints of Upper Limb', pages: '168–170' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '764–766' },
  ],
};
