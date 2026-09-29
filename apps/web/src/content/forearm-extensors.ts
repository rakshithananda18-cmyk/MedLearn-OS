import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { plexusNerve } from './brachial-plexus-3d';
import { between, DEEP_RADIAL_NERVE } from './forearm-3d';
import {
  HAND_BONES,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 4 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const forearmExtensors: Topic = {
  slug: 'forearm-extensors',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Forearm: the back compartment',
  summary:
    'Seven superficial and five deep muscles on the back of the forearm, and the posterior interosseous nerve that supplies most of them.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 9 Forearm and Hand, pages 147 to 151'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, forearm, pages 775 to 782'),
    {
      title: 'TeachMeAnatomy: Muscles of the Posterior Forearm',
      url: 'https://teachmeanatomy.info/upper-limb/muscles/posterior-forearm/',
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
    'Superficial layer: anconeus, brachioradialis, extensor carpi radialis longus and brevis, extensor digitorum, extensor digiti minimi and extensor carpi ulnaris. Most arise from the common extensor origin on the lateral epicondyle.',
    'Deep layer: supinator, abductor pollicis longus, extensor pollicis brevis, extensor pollicis longus and extensor indicis.',
    'The radial nerve itself supplies anconeus, brachioradialis and extensor carpi radialis longus; its deep branch, the posterior interosseous nerve, supplies all the rest.',
    'The posterior interosseous nerve winds round the radius through supinator, then runs down between the superficial and deep layers to the back of the wrist.',
    'Cutting the posterior interosseous nerve drops the fingers and thumb but not the wrist, and nothing goes numb.',
  ],
  visual: {
    kind: 'path',
    // The radial nerve and its deep branch in the middle; superficial muscles on the left, deep
    // muscles on the right.
    diagram: {
      width: 360,
      height: 400,
      nodes: [
        { id: 'radial', label: 'Radial\nnerve', name: 'Radial nerve', x: 180, y: 40 },
        {
          id: 'deep-radial',
          label: 'Posterior\ninterosseous',
          name: 'Posterior interosseous nerve (deep branch of the radial nerve)',
          x: 180,
          y: 205,
        },
        { id: 'anconeus', label: 'Anconeus', name: 'Anconeus', x: 60, y: 40 },
        {
          id: 'brachioradialis',
          label: 'Brachio-\nradialis',
          name: 'Brachioradialis',
          x: 60,
          y: 95,
        },
        {
          id: 'extensor-carpi-radialis-longus',
          label: 'Ext. carpi\nrad. longus',
          name: 'Extensor carpi radialis longus',
          x: 60,
          y: 150,
        },
        {
          id: 'extensor-carpi-radialis-brevis',
          label: 'Ext. carpi\nrad. brevis',
          name: 'Extensor carpi radialis brevis',
          x: 60,
          y: 205,
        },
        {
          id: 'extensor-digitorum',
          label: 'Extensor\ndigitorum',
          name: 'Extensor digitorum',
          x: 60,
          y: 260,
        },
        {
          id: 'extensor-digiti-minimi',
          label: 'Ext. digiti\nminimi',
          name: 'Extensor digiti minimi',
          x: 60,
          y: 315,
        },
        {
          id: 'extensor-carpi-ulnaris',
          label: 'Ext. carpi\nulnaris',
          name: 'Extensor carpi ulnaris',
          x: 60,
          y: 370,
        },
        { id: 'supinator', label: 'Supinator', name: 'Supinator', x: 300, y: 95 },
        {
          id: 'abductor-pollicis-longus',
          label: 'Abd. pollicis\nlongus',
          name: 'Abductor pollicis longus',
          x: 300,
          y: 150,
        },
        {
          id: 'extensor-pollicis-brevis',
          label: 'Ext. pollicis\nbrevis',
          name: 'Extensor pollicis brevis',
          x: 300,
          y: 205,
        },
        {
          id: 'extensor-pollicis-longus',
          label: 'Ext. pollicis\nlongus',
          name: 'Extensor pollicis longus',
          x: 300,
          y: 260,
        },
        {
          id: 'extensor-indicis',
          label: 'Extensor\nindicis',
          name: 'Extensor indicis',
          x: 300,
          y: 315,
        },
      ],
      edges: [
        { from: 'radial', to: 'anconeus' },
        { from: 'radial', to: 'brachioradialis' },
        { from: 'radial', to: 'extensor-carpi-radialis-longus' },
        { from: 'radial', to: 'deep-radial' },
        { from: 'deep-radial', to: 'extensor-carpi-radialis-brevis' },
        { from: 'deep-radial', to: 'extensor-digitorum' },
        { from: 'deep-radial', to: 'extensor-digiti-minimi' },
        { from: 'deep-radial', to: 'extensor-carpi-ulnaris' },
        { from: 'deep-radial', to: 'supinator' },
        { from: 'deep-radial', to: 'abductor-pollicis-longus' },
        { from: 'deep-radial', to: 'extensor-pollicis-brevis' },
        { from: 'deep-radial', to: 'extensor-pollicis-longus' },
        { from: 'deep-radial', to: 'extensor-indicis' },
      ],
    },
    lesions: [
      {
        id: 'pin-palsy',
        label: 'Posterior interosseous nerve injury',
        nodeIds: ['deep-radial'],
        explanation:
          'A fracture of the radial head or a swelling in supinator can damage it. The fingers and thumb cannot be straightened at the knuckles (finger drop). The wrist can still be lifted by extensor carpi radialis longus, supplied above the injury, but it drifts to the radial side because extensor carpi ulnaris is lost. The nerve carries no skin fibres, so nothing goes numb.',
      },
      {
        id: 'wrist-drop',
        label: 'Radial nerve cut in the radial groove',
        nodeIds: ['radial', 'deep-radial'],
        explanation:
          'A fracture of the shaft of the humerus can cut the nerve before it reaches the forearm. Every extensor of the wrist and fingers is lost, so the hand hangs: wrist drop. Triceps is largely spared because its branches leave higher up. The back of the thumb web goes numb.',
      },
      {
        id: 'tennis-elbow',
        label: 'Tennis elbow',
        nodeIds: ['extensor-carpi-radialis-brevis'],
        explanation:
          'Overuse strains the common extensor origin on the lateral epicondyle, mostly the tendon of extensor carpi radialis brevis. The lateral elbow is tender and gripping or lifting with the palm down hurts. No nerve is involved.',
      },
    ],
    drill: [
      {
        id: 'superficial',
        title: 'Superficial layer',
        hint: 'Seven muscles, from the elbow to the ulnar side.',
        nodeIds: [
          'anconeus',
          'brachioradialis',
          'extensor-carpi-radialis-longus',
          'extensor-carpi-radialis-brevis',
          'extensor-digitorum',
          'extensor-digiti-minimi',
          'extensor-carpi-ulnaris',
        ],
      },
      {
        id: 'deep',
        title: 'Deep layer',
        hint: 'Supinator, three muscles to the thumb, and one to the index finger.',
        nodeIds: [
          'supinator',
          'abductor-pollicis-longus',
          'extensor-pollicis-brevis',
          'extensor-pollicis-longus',
          'extensor-indicis',
        ],
      },
      {
        id: 'nerves',
        title: 'Nerves',
        hint: 'The nerve that takes three muscles, and its deep branch that takes the rest.',
        nodeIds: ['radial', 'deep-radial'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'anconeus',
        'brachioradialis',
        'extensor-carpi-radialis-longus',
        'extensor-carpi-radialis-brevis',
        'extensor-digitorum',
        'extensor-digiti-minimi',
        'extensor-carpi-ulnaris',
        'supinator',
        'abductor-pollicis-longus',
        'extensor-pollicis-brevis',
        'extensor-pollicis-longus',
        'extensor-indicis',
        'humerus',
        'radius',
        'ulna',
        ...HAND_BONES,
        'recurrent-interosseous-artery',
      ]),
      traces: [
        { id: 'radial', kind: 'nerve', paths: between(plexusNerve('radial'), 1000, 1200) },
        { id: 'deep-radial', kind: 'nerve', paths: DEEP_RADIAL_NERVE },
      ],
      stops: [
        {
          id: 'back',
          title: 'Back of the forearm',
          description:
            'Seen from behind: brachioradialis and the two radial wrist extensors on the thumb side, then extensor digitorum, extensor digiti minimi and extensor carpi ulnaris; anconeus at the elbow.',
          target: [-240, -80, 900],
          position: [-456, 603, 972],
        },
        {
          id: 'origin',
          title: 'Common extensor origin',
          description:
            'Most superficial extensors share a tendon from the lateral epicondyle. Overuse here is tennis elbow.',
          target: [-238, -62, 1050],
          position: [-470, 228, 1127],
        },
        {
          id: 'deep',
          title: 'The deep layer',
          description:
            'Supinator wraps the upper radius; below it abductor pollicis longus, the two thumb extensors and extensor indicis. The posterior interosseous nerve runs down between the layers.',
          target: [-252, -95, 860],
          position: [-400, 298, 881],
        },
        {
          id: 'thumb',
          title: 'Muscles to the thumb',
          description:
            'Abductor pollicis longus and extensor pollicis brevis cross over the radial wrist extensors to reach the thumb; extensor pollicis longus runs round the dorsal tubercle of the radius.',
          target: [-272, -102, 845],
          position: [-583, 112, 884],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'layers',
      title: 'Two layers',
      body: 'The back of the forearm holds the muscles that straighten the wrist, fingers and thumb, and supinator. They lie in a superficial layer of seven and a deep layer of five. Brachioradialis belongs here by its nerve, though it bends the elbow.',
      focus: [],
    },
    {
      id: 'superficial',
      title: 'The superficial seven',
      body: 'Brachioradialis and extensor carpi radialis longus arise from the lateral supracondylar ridge. Extensor carpi radialis brevis, extensor digitorum, extensor digiti minimi and extensor carpi ulnaris share the common extensor origin on the lateral epicondyle. Anconeus, a small triangle behind the elbow, helps triceps. The three wrist extensors lift and steady the wrist, which a strong grip needs.',
      focus: [
        'anconeus',
        'brachioradialis',
        'extensor-carpi-radialis-longus',
        'extensor-carpi-radialis-brevis',
        'extensor-digitorum',
        'extensor-digiti-minimi',
        'extensor-carpi-ulnaris',
      ],
    },
    {
      id: 'deep',
      title: 'The deep five',
      body: 'Supinator wraps round the upper radius and turns the palm up. Abductor pollicis longus, extensor pollicis brevis and extensor pollicis longus arise from the backs of the radius, ulna and interosseous membrane and pass to the thumb. Extensor indicis joins the extensor expansion of the index finger, letting it point alone.',
      focus: [
        'supinator',
        'abductor-pollicis-longus',
        'extensor-pollicis-brevis',
        'extensor-pollicis-longus',
        'extensor-indicis',
      ],
    },
    {
      id: 'expansion',
      title: 'Extensor expansion',
      body: 'On the back of each finger the extensor tendon spreads into a hood over the knuckle, joined by the lumbrical and interossei. Its central slip reaches the middle phalanx and two side slips join to reach the distal phalanx. That is how the small muscles of the hand can straighten the finger joints.',
      focus: ['extensor-digitorum', 'extensor-indicis', 'extensor-digiti-minimi'],
    },
    {
      id: 'nerve',
      title: 'Posterior interosseous nerve',
      body: 'In front of the lateral epicondyle the radial nerve supplies brachioradialis and extensor carpi radialis longus (and, higher up, anconeus), then divides. Its deep branch, the posterior interosseous nerve, supplies extensor carpi radialis brevis and supinator, winds round the radius through supinator, and runs down between the two layers supplying all the rest. It ends on the back of the wrist.',
      focus: ['radial', 'deep-radial', 'supinator'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select the nerve to see its muscles. Then turn on an injury to see what is lost.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'forearm-extensors-pin-wrist',
      prompt:
        'After posterior interosseous nerve injury the wrist can still extend because of which muscle?',
      options: [
        { id: 'ecrl', text: 'Extensor carpi radialis longus' },
        { id: 'ecu', text: 'Extensor carpi ulnaris' },
        { id: 'ed', text: 'Extensor digitorum' },
        { id: 'ecrb', text: 'Extensor carpi radialis brevis' },
      ],
      answerId: 'ecrl',
      explanation:
        'Extensor carpi radialis longus is supplied by the radial nerve before it divides, so it survives and pulls the wrist up and towards the radial side.',
    },
    {
      id: 'forearm-extensors-supinator-nerve',
      prompt:
        'The posterior interosseous nerve reaches the back of the forearm by passing through:',
      options: [
        { id: 'supinator', text: 'Supinator' },
        { id: 'pronator', text: 'Pronator teres' },
        { id: 'fcu', text: 'Flexor carpi ulnaris' },
        { id: 'triceps', text: 'Triceps' },
      ],
      answerId: 'supinator',
      explanation: 'It winds round the lateral side of the radius within supinator.',
    },
    {
      id: 'forearm-extensors-deep-layer',
      prompt: 'Which of these belongs to the deep layer of the back of the forearm?',
      options: [
        { id: 'epl', text: 'Extensor pollicis longus' },
        { id: 'edm', text: 'Extensor digiti minimi' },
        { id: 'ecu', text: 'Extensor carpi ulnaris' },
        { id: 'anconeus', text: 'Anconeus' },
      ],
      answerId: 'epl',
      explanation:
        'Deep: supinator, abductor pollicis longus, extensor pollicis brevis and longus, extensor indicis.',
    },
    {
      id: 'forearm-extensors-tennis',
      prompt: 'Tennis elbow mainly involves the origin of:',
      options: [
        { id: 'ecrb', text: 'Extensor carpi radialis brevis' },
        { id: 'fcr', text: 'Flexor carpi radialis' },
        { id: 'biceps', text: 'Biceps' },
        { id: 'anconeus', text: 'Anconeus' },
      ],
      answerId: 'ecrb',
      explanation:
        'The common extensor origin on the lateral epicondyle is strained, mostly the tendon of extensor carpi radialis brevis.',
    },
  ],
  cards: [
    {
      id: 'forearm-extensors-superficial',
      front: 'The seven superficial muscles of the back of the forearm?',
      back: 'Anconeus, brachioradialis, extensor carpi radialis longus and brevis, extensor digitorum, extensor digiti minimi, extensor carpi ulnaris.',
    },
    {
      id: 'forearm-extensors-deep',
      front: 'The five deep muscles of the back of the forearm?',
      back: 'Supinator, abductor pollicis longus, extensor pollicis brevis, extensor pollicis longus, extensor indicis.',
    },
    {
      id: 'forearm-extensors-radial-direct',
      front: 'Which back-of-forearm muscles does the radial nerve supply before it divides?',
      back: 'Anconeus, brachioradialis and extensor carpi radialis longus.',
    },
    {
      id: 'forearm-extensors-pin-signs',
      front: 'Signs of posterior interosseous nerve injury?',
      back: 'Finger and thumb drop, wrist extends with radial deviation, no sensory loss.',
    },
    {
      id: 'forearm-extensors-expansion',
      front: 'What inserts into the extensor expansion of a finger?',
      back: 'The extensor tendon, with a lumbrical and interossei; its central slip reaches the middle phalanx and side slips the distal phalanx.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 9 Forearm and Hand', pages: '147–151' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '775–782' },
  ],
};
