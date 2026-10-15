import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  ANKLE_INSIDE,
  ANKLE_LATERAL,
  ANKLE_LIGAMENTS,
  LOWER_LIMB_JOINTS_MODEL_CREDIT,
  LOWER_LIMB_JOINTS_MODEL_SRC,
  lowerLimbJointParts,
} from './lower-limb-joints-3d';

// Lower limb batch 7 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const ankleTibiofibularJoints: Topic = {
  slug: 'ankle-tibiofibular-joints',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Ankle and tibiofibular joints',
  summary:
    'The hinge of the ankle in its bony mortise, the ligaments either side of it, why it sprains on the outside, and the three joints that bind the tibia and fibula.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource(
      'bd-chaurasia',
      'Volume 2, Chapter 12 Joints of Lower Limb: ankle and tibiofibular joints, pages 175 to 180',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb: tibiofibular joint and ankle joint, pages 609, 633 to 635 and 637',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'Ligaments in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The ankle is a synovial hinge: the trochlea of the talus in a mortise made by the lower end of the tibia with its medial malleolus, the lateral malleolus and the inferior tibiofibular ligaments.',
    'The trochlea is wider in front, so the ankle is most stable in dorsiflexion and loosest in plantar flexion, when most injuries happen.',
    'The deltoid ligament on the medial side is so strong that the malleolus breaks before it tears. The lateral ligament has three bands: anterior talofibular, calcaneofibular and posterior talofibular; the anterior talofibular is the one torn in the common inversion sprain.',
    'Dorsiflexion: tibialis anterior, the long extensors and peroneus tertius. Plantar flexion: gastrocnemius and soleus, helped by tibialis posterior and the long flexors.',
    'The tibia and fibula meet at three joints: superior, a plane synovial joint; middle, the interosseous membrane; inferior, a fibrous joint (syndesmosis) that keeps the mortise tight.',
  ],
  visual: {
    kind: 'path',
    // Above: the ankle's ligaments, movements and stability. Below: the three tibiofibular joints.
    diagram: {
      width: 360,
      height: 400,
      nodes: [
        { id: 'ankle', label: 'Ankle joint', name: 'Ankle joint: a hinge', x: 180, y: 30 },
        {
          id: 'deltoid-ligament',
          label: 'Deltoid\n(medial)',
          name: 'Deltoid (medial) ligament',
          x: 80,
          y: 95,
        },
        {
          id: 'anterior-talofibular-ligament',
          label: 'Anterior\ntalofibular',
          name: 'Anterior talofibular ligament',
          x: 80,
          y: 160,
        },
        {
          id: 'calcaneofibular-ligament',
          label: 'Calcaneo-\nfibular',
          name: 'Calcaneofibular ligament',
          x: 80,
          y: 225,
        },
        {
          id: 'posterior-talofibular-ligament',
          label: 'Posterior\ntalofibular',
          name: 'Posterior talofibular ligament',
          x: 80,
          y: 290,
        },
        {
          id: 'ankle-dorsiflexion',
          label: 'Dorsiflexion:\ntibialis\nanterior',
          name: 'Dorsiflexion: tibialis anterior, the long extensors, peroneus tertius',
          x: 270,
          y: 100,
        },
        {
          id: 'ankle-plantarflexion',
          label: 'Plantarflexion:\ncalf muscles',
          name: 'Plantar flexion: gastrocnemius and soleus, with tibialis posterior and the long flexors',
          x: 270,
          y: 170,
        },
        {
          id: 'ankle-stable',
          label: 'Stable when\ndorsiflexed',
          name: 'The wider front of the trochlea is gripped in dorsiflexion',
          x: 270,
          y: 235,
        },
        {
          id: 'tibiofibular',
          label: 'Tibiofibular\njoints',
          name: 'The three tibiofibular joints',
          x: 180,
          y: 300,
        },
        {
          id: 'superior-tibiofibular-joint',
          label: 'Superior\n(synovial)',
          name: 'Superior tibiofibular joint: plane synovial',
          x: 70,
          y: 370,
        },
        {
          id: 'interosseous-membrane-of-leg',
          label: 'Middle\n(membrane)',
          name: 'Middle tibiofibular joint: the interosseous membrane',
          x: 180,
          y: 370,
        },
        {
          id: 'inferior-tibiofibular-ligaments',
          label: 'Inferior\n(fibrous)',
          name: 'Inferior tibiofibular joint: a syndesmosis',
          x: 290,
          y: 370,
        },
      ],
      edges: [
        { from: 'ankle', to: 'deltoid-ligament' },
        { from: 'ankle', to: 'anterior-talofibular-ligament' },
        { from: 'ankle', to: 'calcaneofibular-ligament' },
        { from: 'ankle', to: 'posterior-talofibular-ligament' },
        { from: 'ankle', to: 'ankle-dorsiflexion' },
        { from: 'ankle', to: 'ankle-plantarflexion' },
        { from: 'ankle-dorsiflexion', to: 'ankle-stable' },
        { from: 'tibiofibular', to: 'superior-tibiofibular-joint' },
        { from: 'tibiofibular', to: 'interosseous-membrane-of-leg' },
        { from: 'tibiofibular', to: 'inferior-tibiofibular-ligaments' },
      ],
    },
    lesions: [
      {
        id: 'inversion-sprain',
        label: 'Inversion sprain',
        nodeIds: ['anterior-talofibular-ligament', 'calcaneofibular-ligament'],
        explanation:
          'The commonest joint injury of the limb. With the foot pointed down, the narrow back of the talus sits loosely in the mortise; turning the sole inwards then tears the anterior talofibular ligament, and with more force the calcaneofibular.',
      },
      {
        id: 'potts-fracture',
        label: 'Pott’s fracture',
        nodeIds: ['deltoid-ligament', 'inferior-tibiofibular-ligaments'],
        explanation:
          'The foot forced outwards: the strong deltoid ligament pulls off the medial malleolus, the talus pushes the lateral malleolus and breaks the fibula, and the tibiofibular ligaments may tear; with the back of the tibia also broken, it is a trimalleolar fracture.',
      },
    ],
    drill: [
      {
        id: 'ankle-ligaments-drill',
        title: 'The ankle',
        hint: 'One ligament inside, three outside; then the movements and when it is stable.',
        nodeIds: [
          'deltoid-ligament',
          'anterior-talofibular-ligament',
          'calcaneofibular-ligament',
          'posterior-talofibular-ligament',
          'ankle-dorsiflexion',
          'ankle-plantarflexion',
          'ankle-stable',
        ],
      },
      {
        id: 'tibiofibular-drill',
        title: 'The tibiofibular joints',
        hint: 'Superior, middle, inferior: synovial, membrane, fibrous.',
        nodeIds: [
          'superior-tibiofibular-joint',
          'interosseous-membrane-of-leg',
          'inferior-tibiofibular-ligaments',
        ],
      },
    ],
    model3d: {
      src: LOWER_LIMB_JOINTS_MODEL_SRC,
      credit: LOWER_LIMB_JOINTS_MODEL_CREDIT,
      parts: lowerLimbJointParts([
        ...ANKLE_LIGAMENTS,
        'superior-tibiofibular-joint',
        'interosseous-membrane-of-leg',
      ]),
      traces: [],
      stops: [
        ANKLE_LATERAL,
        ANKLE_INSIDE,
        {
          id: 'tibiofibular',
          title: 'The tibiofibular joints',
          description:
            'The head of the fibula against the tibia below the knee, the interosseous membrane between the shafts, and the ligaments binding the lower ends above the ankle.',
          target: [-95, -65, 180],
          position: [-600, -520, 260],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'mortise',
      title: 'A hinge in a mortise',
      body: 'The upper surface of the talus, the trochlea, fits into a box-like socket: the lower end of the tibia above, the medial malleolus inside, the lateral malleolus outside, held together by the inferior tibiofibular ligaments. The ankle only hinges, up (dorsiflexion) and down (plantar flexion).',
      focus: ['ankle', 'inferior-tibiofibular-ligaments'],
    },
    {
      id: 'stability',
      title: 'Why it is weakest pointing down',
      body: 'The trochlea is wider in front than behind. In dorsiflexion the wide front is wedged into the mortise and the joint is stable; in plantar flexion the narrow back is loose and the talus can rock, so most sprains happen with the foot pointed down.',
      focus: ['ankle-stable', 'ankle-dorsiflexion'],
    },
    {
      id: 'ligaments',
      title: 'The ligaments',
      body: 'Medially, the deltoid ligament fans down from the medial malleolus to the navicular, the sustentaculum tali and the talus: strong enough that the bone breaks first. Laterally, three separate bands leave the lateral malleolus: the anterior talofibular forwards to the talus, the calcaneofibular down to the calcaneus, the posterior talofibular back to the talus.',
      focus: [
        'deltoid-ligament',
        'anterior-talofibular-ligament',
        'calcaneofibular-ligament',
        'posterior-talofibular-ligament',
      ],
    },
    {
      id: 'movements',
      title: 'Movements and supply',
      body: 'Dorsiflexion by tibialis anterior, extensor hallucis longus, extensor digitorum longus and peroneus tertius; plantar flexion by gastrocnemius and soleus, helped by plantaris, tibialis posterior and the long flexors. The deep peroneal and tibial nerves supply the joint, and branches of the anterior and posterior tibial and peroneal arteries feed it.',
      focus: ['ankle-dorsiflexion', 'ankle-plantarflexion'],
    },
    {
      id: 'tibiofibular',
      title: 'The tibiofibular joints',
      body: 'The fibula meets the tibia three times. The superior joint, between the head of the fibula and the lateral condyle of the tibia, is a small plane synovial joint. The middle is the interosseous membrane joining the shafts. The inferior is a strong fibrous joint, a syndesmosis, whose ligaments keep the malleoli gripping the talus; a little give there lets the mortise widen in dorsiflexion.',
      focus: [
        'tibiofibular',
        'superior-tibiofibular-joint',
        'interosseous-membrane-of-leg',
        'inferior-tibiofibular-ligaments',
      ],
    },
    {
      id: 'clinical',
      title: 'Sprains and fractures',
      body: 'Inversion sprains are far commoner than eversion ones and tear the anterior talofibular ligament first. Forcing the foot outwards gives Pott’s fracture: the medial malleolus pulled off by the deltoid ligament, the fibula broken above the ankle.',
      focus: ['anterior-talofibular-ligament', 'deltoid-ligament'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'Compare the single fan of the deltoid ligament inside with the three separate bands outside, then look up the leg at the tibiofibular joints.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'ankle-commonest-ligament',
      prompt: 'The ankle ligament most often torn in a sprain is the:',
      options: [
        { id: 'atfl', text: 'Anterior talofibular ligament' },
        { id: 'deltoid', text: 'Deltoid ligament' },
        { id: 'cfl', text: 'Calcaneofibular ligament' },
        { id: 'ptfl', text: 'Posterior talofibular ligament' },
      ],
      answerId: 'atfl',
      explanation: 'In inversion with the foot pointed down.',
    },
    {
      id: 'ankle-stable-position',
      prompt: 'The ankle joint is most stable in:',
      options: [
        { id: 'dorsiflexion', text: 'Dorsiflexion' },
        { id: 'plantarflexion', text: 'Plantar flexion' },
        { id: 'inversion', text: 'Inversion' },
        { id: 'eversion', text: 'Eversion' },
      ],
      answerId: 'dorsiflexion',
      explanation: 'The wider front of the trochlea is then wedged in the mortise.',
    },
    {
      id: 'inferior-tibiofibular-type',
      prompt: 'The inferior tibiofibular joint is a:',
      options: [
        { id: 'syndesmosis', text: 'Syndesmosis (fibrous joint)' },
        { id: 'plane', text: 'Plane synovial joint' },
        { id: 'hinge', text: 'Hinge joint' },
        { id: 'cartilaginous', text: 'Cartilaginous joint' },
      ],
      answerId: 'syndesmosis',
      explanation: 'The superior one is the plane synovial joint.',
    },
    {
      id: 'potts-medial-malleolus',
      prompt: 'In Pott’s fracture, the medial malleolus is pulled off by the:',
      options: [
        { id: 'deltoid', text: 'Deltoid ligament' },
        { id: 'atfl', text: 'Anterior talofibular ligament' },
        { id: 'cfl', text: 'Calcaneofibular ligament' },
        { id: 'spring', text: 'Spring ligament' },
      ],
      answerId: 'deltoid',
      explanation: 'It is stronger than the bone it is attached to.',
    },
  ],
  cards: [
    {
      id: 'ankle-mortise-card',
      front: 'The ankle mortise?',
      back: 'The lower end of the tibia, the medial and lateral malleoli and the inferior tibiofibular ligaments, gripping the trochlea of the talus.',
    },
    {
      id: 'ankle-ligaments-card',
      front: 'Ligaments of the ankle?',
      back: 'Medial: the deltoid, to the navicular, calcaneus and talus. Lateral: anterior talofibular (the one sprained), calcaneofibular, posterior talofibular.',
    },
    {
      id: 'ankle-stability-card',
      front: 'Why is the ankle unstable in plantar flexion?',
      back: 'The trochlea is narrower behind, so pointing the foot down leaves it loose in the mortise: most sprains happen then.',
    },
    {
      id: 'tibiofibular-joints-card',
      front: 'The three tibiofibular joints?',
      back: 'Superior: plane synovial. Middle: the interosseous membrane. Inferior: a syndesmosis holding the malleoli together.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 12 Joints of Lower Limb',
      pages: '175–180',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '609, 633–635, 637' },
  ],
};
