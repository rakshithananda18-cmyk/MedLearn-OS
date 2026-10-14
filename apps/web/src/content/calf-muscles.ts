import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  CALF_DEEP,
  CALF_SUPERFICIAL,
  LEG_BACK,
  LEG_FOOT_BONES,
  LEG_FOOT_MODEL_CREDIT,
  LEG_FOOT_MODEL_SRC,
  legFootParts,
} from './leg-foot-3d';

// Lower limb batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const calfMuscles: Topic = {
  slug: 'calf-muscles',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Back of leg: the calf muscles',
  summary:
    'The superficial and deep muscles of the posterior compartment, the septa between them, the tendo calcaneus and the soleus as the peripheral heart.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 9 Back of Leg, pages 124 to 130'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: posterior compartment of leg, superficial and deep groups, pages 615 to 619',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'Bones, muscles and vessels (BodyParts3D, CC BY 4.0); nerves (Z-Anatomy, CC BY-SA 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 and CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The superficial and deep transverse fascial septa split the posterior compartment into superficial, middle and deep parts.',
    'Superficial group: gastrocnemius, soleus and plantaris. Gastrocnemius and soleus (triceps surae) form the tendo calcaneus to the middle of the back of the calcaneus.',
    'Deep group: popliteus, flexor digitorum longus, flexor hallucis longus and tibialis posterior. Every calf muscle is supplied by the tibial nerve.',
    'Soleus is the strong, slow postural plantar flexor and, with the valveless venous sinuses in it, the peripheral heart; gastrocnemius is the quicker one and also flexes the knee.',
    'Tendo calcaneus: the thickest and strongest tendon, about 15 cm long; tapping it gives the ankle jerk (S1, S2); it can rupture about 5 cm above its insertion.',
  ],
  visual: {
    kind: 'path',
    // Superficial group and its tendon, deep group, tibialis posterior, the septa and the pump.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'superficial-group',
          label: 'Super-\nficial',
          name: 'Superficial group',
          x: 50,
          y: 30,
        },
        {
          id: 'gastrocnemius',
          label: 'Gastroc-\nnemius',
          name: 'Gastrocnemius, two heads from the femur',
          x: 145,
          y: 30,
        },
        { id: 'soleus', label: 'Soleus', name: 'Soleus, from the tibia and fibula', x: 225, y: 30 },
        { id: 'plantaris', label: 'Plantaris', name: 'Plantaris', x: 305, y: 30 },
        {
          id: 'calcaneal-tendon',
          label: 'Tendo\ncalcaneus',
          name: 'Tendo calcaneus',
          x: 50,
          y: 110,
        },
        {
          id: 'heel',
          label: 'Calcaneus',
          name: 'Middle of the back of the calcaneus',
          x: 145,
          y: 110,
        },
        { id: 'ankle-jerk', label: 'Ankle\njerk', name: 'Ankle jerk, S1 and S2', x: 225, y: 110 },
        {
          id: 'plantar-flexion',
          label: 'Plantar\nflexion',
          name: 'Plantar-flexes the foot, raising the heel',
          x: 305,
          y: 110,
        },
        { id: 'deep-group', label: 'Deep', name: 'Deep group', x: 50, y: 186 },
        { id: 'popliteus', label: 'Popliteus', name: 'Popliteus', x: 145, y: 186 },
        {
          id: 'flexor-digitorum-longus',
          label: 'Flexor\ndigitorum',
          name: 'Flexor digitorum longus, on the tibia',
          x: 225,
          y: 186,
        },
        {
          id: 'flexor-hallucis-longus',
          label: 'Flexor\nhallucis',
          name: 'Flexor hallucis longus, on the fibula',
          x: 305,
          y: 186,
        },
        { id: 'deepest', label: 'Deepest', name: 'The deepest muscle', x: 50, y: 262 },
        {
          id: 'tibialis-posterior',
          label: 'Tibialis\nposterior',
          name: 'Tibialis posterior',
          x: 145,
          y: 262,
        },
        {
          id: 'navicular',
          label: 'Navicular',
          name: 'Inserts mainly on the tuberosity of the navicular',
          x: 225,
          y: 262,
        },
        {
          id: 'medial-arch',
          label: 'Medial\narch',
          name: 'Inverts the foot and holds up its medial arch',
          x: 305,
          y: 262,
        },
        { id: 'septa', label: 'Septa', name: 'Transverse fascial septa', x: 50, y: 340 },
        {
          id: 'superficial-septum',
          label: 'Super-\nficial',
          name: 'Superficial septum: between the superficial and deep muscles, enclosing the posterior tibial vessels and tibial nerve',
          x: 145,
          y: 340,
        },
        {
          id: 'deep-septum',
          label: 'Deep',
          name: 'Deep septum: between tibialis posterior and the long flexors',
          x: 225,
          y: 340,
        },
        { id: 'calf-pump', label: 'Calf\npump', name: 'The venous pump', x: 50, y: 416 },
        {
          id: 'peripheral-heart',
          label: 'Peripheral\nheart',
          name: 'Soleus, the peripheral heart: its venous sinuses pumped upwards',
          x: 145,
          y: 416,
        },
        {
          id: 'tibial-nerve',
          label: 'Tibial\nnerve',
          name: 'Tibial nerve, which supplies every calf muscle',
          x: 225,
          y: 416,
        },
      ],
      edges: [
        { from: 'superficial-group', to: 'gastrocnemius' },
        { from: 'superficial-group', to: 'soleus' },
        { from: 'superficial-group', to: 'plantaris' },
        { from: 'calcaneal-tendon', to: 'heel' },
        { from: 'calcaneal-tendon', to: 'ankle-jerk' },
        { from: 'calcaneal-tendon', to: 'plantar-flexion' },
        { from: 'deep-group', to: 'popliteus' },
        { from: 'deep-group', to: 'flexor-digitorum-longus' },
        { from: 'deep-group', to: 'flexor-hallucis-longus' },
        { from: 'deepest', to: 'tibialis-posterior' },
        { from: 'deepest', to: 'navicular' },
        { from: 'deepest', to: 'medial-arch' },
        { from: 'septa', to: 'superficial-septum' },
        { from: 'septa', to: 'deep-septum' },
        { from: 'calf-pump', to: 'peripheral-heart' },
        { from: 'calf-pump', to: 'tibial-nerve' },
      ],
    },
    lesions: [
      {
        id: 'tendo-rupture',
        label: 'Ruptured tendo calcaneus',
        nodeIds: ['calcaneal-tendon', 'plantar-flexion'],
        explanation:
          'A sudden push-off, as in tennis, can tear the tendon about 5 cm above the heel. The foot can no longer be pointed or the heel raised, and the ends have to be stitched.',
      },
      {
        id: 'soleal-thrombosis',
        label: 'Clot in the calf',
        nodeIds: ['soleus', 'peripheral-heart'],
        explanation:
          'Sitting still for hours, as on a long flight, stops the soleal pump and blood can clot in its venous sinuses; a clot that breaks off can block an artery elsewhere. Stretching the legs keeps the pump going.',
      },
    ],
    drill: [
      {
        id: 'calf-superficial',
        title: 'Superficial group',
        hint: 'Three muscles, the tendon two of them make, where it ends and what it does.',
        nodeIds: ['gastrocnemius', 'soleus', 'plantaris', 'heel', 'ankle-jerk', 'plantar-flexion'],
      },
      {
        id: 'calf-deep',
        title: 'Deep group',
        hint: 'Popliteus and the long flexors, then the deepest muscle and what it does.',
        nodeIds: [
          'popliteus',
          'flexor-digitorum-longus',
          'flexor-hallucis-longus',
          'tibialis-posterior',
          'navicular',
          'medial-arch',
        ],
      },
    ],
    model3d: {
      src: LEG_FOOT_MODEL_SRC,
      credit: LEG_FOOT_MODEL_CREDIT,
      parts: legFootParts([
        ...LEG_FOOT_BONES,
        ...CALF_SUPERFICIAL,
        ...CALF_DEEP,
        'popliteal-artery',
        'posterior-tibial-artery',
        'tibial-nerve',
      ]),
      traces: [],
      stops: [
        LEG_BACK,
        {
          id: 'soleus',
          title: 'Under gastrocnemius',
          description:
            'From behind and laterally: soleus lies under gastrocnemius, its upper edge arching from the fibula to the tibia. Switch gastrocnemius off in Layers to see it whole.',
          target: [-80, -50, 230],
          position: [-500, 780, 260],
        },
        {
          id: 'deep',
          title: 'Deep muscles',
          description:
            'From behind and medially, with the superficial muscles switched off: flexor digitorum longus on the tibia, flexor hallucis longus on the fibula, tibialis posterior deepest between them.',
          target: [-75, -60, 170],
          position: [450, 760, 220],
        },
        {
          id: 'ankle',
          title: 'Behind the medial malleolus',
          description:
            'Tibialis posterior, flexor digitorum longus and flexor hallucis longus turn forwards behind the medial malleolus into the sole; the tendo calcaneus goes straight down to the heel.',
          target: [-70, -60, 20],
          position: [520, 380, 120],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'compartment',
      title: 'The posterior compartment',
      body: 'The calf is the bulkiest compartment, like the front of the forearm. Two transverse fascial septa divide it: the superficial septum separates the superficial muscles from the deep ones and encloses the posterior tibial vessels and tibial nerve; the deep septum separates tibialis posterior from the long flexors. Near the ankle the fascia thickens into the flexor and superior peroneal retinacula.',
      focus: ['septa', 'superficial-septum', 'deep-septum'],
    },
    {
      id: 'superficial',
      title: 'Superficial group',
      body: 'Gastrocnemius has two heads from the femur just above the condyles, the medial head larger. Soleus, under it, arises from the back of the fibular head and upper fibula, the soleal line of the tibia and a tendinous arch between them. Their tendons join as the tendo calcaneus on the middle of the back of the calcaneus. Plantaris has a small belly and a long thin tendon running between them to the calcaneus.',
      focus: ['superficial-group', 'gastrocnemius', 'soleus', 'plantaris'],
    },
    {
      id: 'actions',
      title: 'Two gears and a pump',
      body: 'Both are strong plantar flexors; gastrocnemius also flexes the knee. Soleus is the stronger but slower one, the bottom gear that starts the body moving and steadies the leg on the foot when standing; gastrocnemius, quicker, takes over once moving. Soleus is full of valveless venous sinuses: each contraction pushes their blood upwards and each relaxation draws blood in from the superficial veins, so it is called the peripheral heart.',
      focus: ['calf-pump', 'peripheral-heart', 'plantar-flexion'],
    },
    {
      id: 'tendon',
      title: 'Tendo calcaneus',
      body: 'The thickest and strongest tendon of the body, about 15 cm long, beginning near the middle of the leg and taking soleus fibres almost to its lower end. Tapping it gives the ankle jerk, testing S1 and S2.',
      focus: ['calcaneal-tendon', 'heel', 'ankle-jerk'],
    },
    {
      id: 'deep',
      title: 'Deep group',
      body: 'Popliteus, above the soleal line, unlocks the knee. Flexor digitorum longus arises from the tibia and goes to the distal phalanges of the lateral four toes, crossing tibialis posterior above the ankle; flexor hallucis longus arises from the fibula and goes to the big toe, grooving the back of the talus and running under the sustentaculum tali. Tibialis posterior, the deepest, arises from the membrane and both bones and inserts mainly on the navicular tuberosity: it inverts the foot and holds up the medial arch.',
      focus: [
        'deep-group',
        'popliteus',
        'flexor-digitorum-longus',
        'flexor-hallucis-longus',
        'deepest',
        'tibialis-posterior',
        'navicular',
        'medial-arch',
      ],
    },
    {
      id: 'nerve',
      title: 'One nerve',
      body: 'The two leg bones have an artery each, the posterior tibial and the peroneal, but the calf has a single nerve: the tibial nerve supplies every muscle in it.',
      focus: ['tibial-nerve'],
    },
    {
      id: 'explore',
      title: 'Find it yourself',
      body: 'Switch gastrocnemius off, then soleus, to uncover the deep muscles layer by layer, and follow each tendon to the ankle.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'peripheral-heart-muscle',
      prompt: 'Which muscle is called the peripheral heart?',
      options: [
        { id: 'soleus', text: 'Soleus' },
        { id: 'gastrocnemius', text: 'Gastrocnemius' },
        { id: 'plantaris', text: 'Plantaris' },
        { id: 'tibialis-posterior', text: 'Tibialis posterior' },
      ],
      answerId: 'soleus',
      explanation: 'Its venous sinuses are emptied upwards each time it contracts.',
    },
    {
      id: 'tibialis-posterior-insertion',
      prompt: 'Tibialis posterior is chiefly inserted into the:',
      options: [
        { id: 'navicular', text: 'Tuberosity of the navicular' },
        { id: 'big-toe', text: 'Distal phalanx of the big toe' },
        { id: 'calcaneus', text: 'Back of the calcaneus' },
        { id: 'fifth-metatarsal', text: 'Base of the fifth metatarsal' },
      ],
      answerId: 'navicular',
      explanation:
        'With slips to the other tarsal bones except the talus and to the middle metatarsals.',
    },
    {
      id: 'calf-nerve',
      prompt: 'The deep muscles of the back of the leg are supplied by the:',
      options: [
        { id: 'tibial', text: 'Tibial nerve' },
        { id: 'deep-peroneal', text: 'Deep peroneal nerve' },
        { id: 'sural', text: 'Sural nerve' },
        { id: 'common-peroneal', text: 'Common peroneal nerve' },
      ],
      answerId: 'tibial',
      explanation: 'The tibial nerve supplies every muscle of the calf, superficial and deep.',
    },
    {
      id: 'ankle-jerk-segments',
      prompt: 'The ankle jerk tests the spinal segments:',
      options: [
        { id: 's1-s2', text: 'S1 and S2' },
        { id: 'l3-l4', text: 'L3 and L4' },
        { id: 'l4-l5', text: 'L4 and L5' },
        { id: 's3-s4', text: 'S3 and S4' },
      ],
      answerId: 's1-s2',
      explanation: 'L3 and L4 are the knee jerk.',
    },
  ],
  cards: [
    {
      id: 'calf-superficial-card',
      front: 'Superficial muscles of the back of the leg?',
      back: 'Gastrocnemius, soleus, plantaris; gastrocnemius and soleus form the tendo calcaneus to the back of the calcaneus.',
    },
    {
      id: 'calf-deep-card',
      front: 'Deep muscles of the back of the leg?',
      back: 'Popliteus, flexor digitorum longus, flexor hallucis longus, tibialis posterior; all tibial nerve.',
    },
    {
      id: 'soleus-roles-card',
      front: 'Why is soleus important?',
      back: 'The strong postural plantar flexor that steadies the leg on the foot, and the peripheral heart pumping venous blood up from its sinuses.',
    },
    {
      id: 'calf-septa-card',
      front: 'Transverse fascial septa of the calf?',
      back: 'Superficial: between the superficial and deep muscles, enclosing the posterior tibial vessels and tibial nerve. Deep: between tibialis posterior and the long flexors.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 9 Back of Leg', pages: '124–130' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '615–619' },
  ],
};
