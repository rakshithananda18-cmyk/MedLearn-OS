import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { between, DEEP_RADIAL_NERVE, MEDIAN_FOREARM, SUPERFICIAL_RADIAL_NERVE } from './forearm-3d';
import { SHOULDER_MODEL_CREDIT, SHOULDER_MODEL_SRC, shoulderParts } from './shoulder-3d';

// Upper limb batch 3 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const cubitalFossa: Topic = {
  slug: 'cubital-fossa',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Cubital fossa',
  summary:
    'The hollow in front of the elbow: its boundaries, roof and floor, and the nerve, artery and tendon that pass through it.',
  estimatedMinutes: 10,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 8 Arm, pages 103 to 105'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, elbow, pages 759 to 760'),
    {
      title: 'TeachMeAnatomy: The Cubital Fossa',
      url: 'https://teachmeanatomy.info/upper-limb/areas/cubital-fossa/',
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
    'A triangular hollow in front of the elbow. Its base is a line joining the two epicondyles; brachioradialis is its lateral side and pronator teres its medial side, meeting at the apex.',
    'Roof: skin, superficial fascia with the median cubital vein and the medial and lateral cutaneous nerves of the forearm, and deep fascia strengthened by the bicipital aponeurosis.',
    'Floor: brachialis medially and supinator laterally.',
    'Contents from medial to lateral: median nerve, brachial artery dividing into the radial and ulnar arteries, biceps tendon, and the radial nerve under the edge of brachioradialis.',
    'The bicipital aponeurosis lies between the median cubital vein above and the brachial artery and median nerve below, guarding them during an injection into the vein.',
  ],
  visual: {
    kind: 'path',
    // Top: the boundaries, floor and roof. Middle: the contents, lateral on the left as the right
    // limb is seen from the front. Bottom: the veins of the roof.
    diagram: {
      width: 360,
      height: 380,
      nodes: [
        {
          id: 'brachioradialis',
          label: 'Brachio-\nradialis',
          name: 'Brachioradialis, the lateral boundary',
          x: 60,
          y: 40,
        },
        { id: 'fossa', label: 'Cubital\nfossa', name: 'Cubital fossa', x: 180, y: 40 },
        {
          id: 'pronator-teres',
          label: 'Pronator\nteres',
          name: 'Pronator teres, the medial boundary',
          x: 300,
          y: 40,
        },
        { id: 'supinator', label: 'Supinator', name: 'Supinator, in the floor', x: 60, y: 110 },
        {
          id: 'bicipital-aponeurosis',
          label: 'Bicipital\naponeurosis',
          name: 'Bicipital aponeurosis, in the roof',
          x: 180,
          y: 110,
        },
        { id: 'brachialis', label: 'Brachialis', name: 'Brachialis, in the floor', x: 300, y: 110 },
        { id: 'radial', label: 'Radial\nnerve', name: 'Radial nerve', x: 45, y: 190 },
        { id: 'biceps-tendon', label: 'Biceps\ntendon', name: 'Tendon of biceps', x: 135, y: 190 },
        {
          id: 'brachial-artery',
          label: 'Brachial\nartery',
          name: 'Brachial artery',
          x: 225,
          y: 190,
        },
        { id: 'median', label: 'Median\nnerve', name: 'Median nerve', x: 315, y: 190 },
        { id: 'radial-artery', label: 'Radial\nartery', name: 'Radial artery', x: 180, y: 260 },
        { id: 'ulnar-artery', label: 'Ulnar\nartery', name: 'Ulnar artery', x: 280, y: 260 },
        {
          id: 'cephalic-vein',
          label: 'Cephalic\nvein',
          name: 'Cephalic vein',
          x: 60,
          y: 340,
        },
        {
          id: 'median-cubital-vein',
          label: 'Median\ncubital v.',
          name: 'Median cubital vein',
          x: 180,
          y: 340,
        },
        { id: 'basilic-vein', label: 'Basilic\nvein', name: 'Basilic vein', x: 300, y: 340 },
      ],
      edges: [
        { from: 'brachioradialis', to: 'fossa' },
        { from: 'pronator-teres', to: 'fossa' },
        { from: 'fossa', to: 'supinator' },
        { from: 'fossa', to: 'bicipital-aponeurosis' },
        { from: 'fossa', to: 'brachialis' },
        { from: 'fossa', to: 'radial' },
        { from: 'fossa', to: 'biceps-tendon' },
        { from: 'fossa', to: 'brachial-artery' },
        { from: 'fossa', to: 'median' },
        { from: 'brachial-artery', to: 'radial-artery' },
        { from: 'brachial-artery', to: 'ulnar-artery' },
        { from: 'cephalic-vein', to: 'median-cubital-vein' },
        { from: 'median-cubital-vein', to: 'basilic-vein' },
      ],
    },
    lesions: [
      {
        id: 'supracondylar',
        label: 'Supracondylar fracture',
        nodeIds: ['brachial-artery', 'median'],
        explanation:
          'In a child who falls on the outstretched hand, the lower fragment of the humerus is pushed backwards and the sharp upper fragment presses on the brachial artery and median nerve in the fossa. Blood flow to the forearm can stop, leading to Volkmann ischaemic contracture, and the median nerve can be bruised. Check the radial pulse and the hand after every such fracture.',
      },
      {
        id: 'pronator-syndrome',
        label: 'Median nerve squeezed at the elbow',
        nodeIds: ['median'],
        explanation:
          'The median nerve can be compressed where it passes between the two heads of pronator teres or under the edge of the bicipital aponeurosis. The front of the forearm aches, and the thumb, index and middle fingers tingle, including the palm, which carpal tunnel syndrome spares.',
      },
    ],
    drill: [
      {
        id: 'boundaries',
        title: 'Boundaries',
        hint: 'The muscle on each side of the hollow.',
        nodeIds: ['brachioradialis', 'pronator-teres'],
      },
      {
        id: 'roof-floor',
        title: 'Roof and floor',
        hint: 'Two muscles in the floor and the sheet of fascia in the roof.',
        nodeIds: ['supinator', 'bicipital-aponeurosis', 'brachialis'],
      },
      {
        id: 'contents',
        title: 'Contents',
        hint: 'Four structures, lateral to medial, then how the artery ends.',
        nodeIds: [
          'radial',
          'biceps-tendon',
          'brachial-artery',
          'median',
          'radial-artery',
          'ulnar-artery',
        ],
      },
      {
        id: 'veins',
        title: 'Veins of the roof',
        hint: 'The vein that joins the two main superficial veins.',
        nodeIds: ['cephalic-vein', 'median-cubital-vein', 'basilic-vein'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'brachioradialis',
        'pronator-teres',
        'brachialis',
        'supinator',
        'biceps-long',
        'biceps-short',
        'humerus',
        'radius',
        'ulna',
        'brachial-artery',
        'radial-artery',
        'ulnar-artery',
        'radial-recurrent-artery',
        'ulnar-recurrent-arteries',
        'common-interosseous-artery',
        'median-cubital-vein',
        'cephalic-vein',
        'basilic-vein',
      ]),
      traces: [
        { id: 'median', kind: 'nerve', paths: between(MEDIAN_FOREARM, 930, 1100) },
        {
          id: 'radial',
          kind: 'nerve',
          paths: between([...SUPERFICIAL_RADIAL_NERVE, ...DEEP_RADIAL_NERVE], 930, 1100),
        },
      ],
      stops: [
        {
          id: 'front',
          title: 'Front of the elbow',
          description:
            'Brachioradialis on the lateral side and pronator teres on the medial side meet below, closing the triangle. The median cubital vein crosses its roof.',
          target: [-212, -88, 1030],
          position: [-356, -542, 1087],
        },
        {
          id: 'contents',
          title: 'Contents',
          description:
            'From medial to lateral: the median nerve, the brachial artery dividing into radial and ulnar arteries, the biceps tendon, and the radial nerve tucked under brachioradialis.',
          target: [-215, -90, 1015],
          position: [-287, -441, 1051],
        },
        {
          id: 'floor',
          title: 'Floor',
          description:
            'Brachialis forms the medial part of the floor and supinator the lateral part, wrapped round the upper radius.',
          target: [-225, -78, 1010],
          position: [-399, -407, 933],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'shape',
      title: 'A triangle in front of the elbow',
      body: 'The cubital fossa is a triangular hollow in front of the elbow. Its base is an imaginary line joining the medial and lateral epicondyles of the humerus. Its lateral side is the medial border of brachioradialis and its medial side the lateral border of pronator teres. The two meet at the apex, below.',
      focus: ['fossa', 'brachioradialis', 'pronator-teres'],
    },
    {
      id: 'roof',
      title: 'The roof',
      body: 'Over the fossa lie skin and superficial fascia holding the median cubital vein and the medial and lateral cutaneous nerves of the forearm. Beneath them the deep fascia is strengthened by the bicipital aponeurosis, a sheet that fans out from the biceps tendon to the medial side of the forearm.',
      focus: ['bicipital-aponeurosis', 'median-cubital-vein', 'cephalic-vein', 'basilic-vein'],
    },
    {
      id: 'floor',
      title: 'The floor',
      body: 'Brachialis forms the medial part of the floor, on its way to the ulna. Supinator forms the lateral part, wrapped round the upper end of the radius.',
      focus: ['brachialis', 'supinator'],
    },
    {
      id: 'contents',
      title: 'Four contents',
      body: 'From medial to lateral: the median nerve; the brachial artery, which divides into the radial and ulnar arteries at the level of the neck of the radius; the biceps tendon on its way to the radial tuberosity; and the radial nerve, partly hidden under brachioradialis, where it splits into superficial and deep branches.',
      focus: [
        'median',
        'brachial-artery',
        'radial-artery',
        'ulnar-artery',
        'biceps-tendon',
        'radial',
      ],
    },
    {
      id: 'clinical',
      title: 'Why it matters',
      body: 'The median cubital vein is the usual vein for taking blood, and the bicipital aponeurosis keeps the needle away from the artery and nerve beneath. Blood pressure is measured by listening over the brachial artery just medial to the biceps tendon. A supracondylar fracture can injure the artery and median nerve here.',
      focus: ['median-cubital-vein', 'bicipital-aponeurosis', 'brachial-artery'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each content to see where it lies, then turn on an injury to see what is at risk.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'cubital-fossa-lateral',
      prompt: 'The lateral boundary of the cubital fossa is formed by:',
      options: [
        { id: 'brachioradialis', text: 'Brachioradialis' },
        { id: 'pronator-teres', text: 'Pronator teres' },
        { id: 'biceps', text: 'Biceps' },
        { id: 'supinator', text: 'Supinator' },
      ],
      answerId: 'brachioradialis',
      explanation:
        'Brachioradialis is the lateral side and pronator teres the medial side. Supinator lies in the floor.',
    },
    {
      id: 'cubital-fossa-medial-content',
      prompt: 'The most medial content of the cubital fossa is the:',
      options: [
        { id: 'median', text: 'Median nerve' },
        { id: 'artery', text: 'Brachial artery' },
        { id: 'tendon', text: 'Biceps tendon' },
        { id: 'radial', text: 'Radial nerve' },
      ],
      answerId: 'median',
      explanation:
        'From medial to lateral: median nerve, brachial artery, biceps tendon, radial nerve.',
    },
    {
      id: 'cubital-fossa-floor',
      prompt: 'The floor of the cubital fossa is formed by:',
      options: [
        { id: 'brachialis-supinator', text: 'Brachialis and supinator' },
        { id: 'biceps-brachialis', text: 'Biceps and brachialis' },
        { id: 'pronator-supinator', text: 'Pronator teres and supinator' },
        { id: 'aponeurosis', text: 'The bicipital aponeurosis' },
      ],
      answerId: 'brachialis-supinator',
      explanation:
        'Brachialis medially and supinator laterally. The bicipital aponeurosis is part of the roof.',
    },
    {
      id: 'cubital-fossa-aponeurosis',
      prompt: 'The bicipital aponeurosis separates the median cubital vein from the:',
      options: [
        { id: 'artery-nerve', text: 'Brachial artery and median nerve' },
        { id: 'radial', text: 'Radial nerve' },
        { id: 'cephalic', text: 'Cephalic vein' },
        { id: 'ulnar', text: 'Ulnar nerve' },
      ],
      answerId: 'artery-nerve',
      explanation:
        'The vein lies on the aponeurosis; the brachial artery and median nerve lie beneath it, protected from a needle.',
    },
  ],
  cards: [
    {
      id: 'cubital-fossa-boundaries',
      front: 'Boundaries of the cubital fossa?',
      back: 'Base: line joining the epicondyles. Lateral: brachioradialis. Medial: pronator teres. Apex where they meet.',
    },
    {
      id: 'cubital-fossa-contents',
      front: 'Contents of the cubital fossa, medial to lateral?',
      back: 'Median nerve, brachial artery (dividing into radial and ulnar), biceps tendon, radial nerve.',
    },
    {
      id: 'cubital-fossa-roof-floor',
      front: 'Roof and floor of the cubital fossa?',
      back: 'Roof: skin, superficial fascia with the median cubital vein and cutaneous nerves, deep fascia with the bicipital aponeurosis. Floor: brachialis and supinator.',
    },
    {
      id: 'cubital-fossa-division',
      front: 'Where does the brachial artery divide?',
      back: 'In the cubital fossa, at the level of the neck of the radius, into the radial and ulnar arteries.',
    },
    {
      id: 'cubital-fossa-venepuncture',
      front: 'Why is the median cubital vein used for taking blood?',
      back: 'It is superficial, large and held in place by a deep connection, and the bicipital aponeurosis shields the artery and nerve beneath it.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 8 Arm', pages: '103–105' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '759–760' },
  ],
};
