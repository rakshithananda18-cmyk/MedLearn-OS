import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  FRONT_LEG_MUSCLES,
  LEG_FOOT_BONES,
  LEG_FOOT_MODEL_CREDIT,
  LEG_FOOT_MODEL_SRC,
  LEG_FRONT,
  legFootParts,
  PERONEI,
} from './leg-foot-3d';

// Lower limb batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const legFrontMuscles: Topic = {
  slug: 'leg-front-muscles',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Front of leg: compartments, extensor retinacula and muscles',
  summary:
    'How the deep fascia divides the leg, the four muscles of the anterior compartment and the one on the dorsum of the foot, and the retinacula that hold their tendons at the ankle.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 8 Front of Leg, pages 108 to 112'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: leg compartments, anterior compartment, extensor retinacula and extensor digitorum brevis, pages 612, 624, 625, 643 and 647',
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
    'Septa from the deep fascia to the fibula divide the leg into anterior, lateral and posterior compartments; over the bare medial surface of the tibia and the malleoli the fascia is replaced by periosteum.',
    'Anterior compartment: tibialis anterior, extensor hallucis longus, extensor digitorum longus and peroneus tertius, all dorsiflexors, all supplied by the deep peroneal nerve.',
    'Superior extensor retinaculum: between the lower anterior borders of the tibia and fibula. Inferior: a Y lying on its side, its stem on the calcaneus, upper band to the medial malleolus, lower band to the plantar aponeurosis.',
    'Under the retinacula, medial to lateral: tibialis anterior, extensor hallucis longus, anterior tibial vessels, deep peroneal nerve, extensor digitorum longus, peroneus tertius.',
    'Extensor digitorum brevis, from the calcaneus, is the only muscle on the dorsum of the foot; its medial slip, extensor hallucis brevis, goes to the big toe.',
  ],
  visual: {
    kind: 'path',
    // Compartments, the leg muscles, the dorsum, the retinacula and what passes under them.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        {
          id: 'compartments',
          label: 'Compart-\nments',
          name: 'Compartments of the leg',
          x: 50,
          y: 30,
        },
        {
          id: 'anterior-compartment',
          label: 'Anterior',
          name: 'Anterior compartment: the extensors, deep peroneal nerve',
          x: 145,
          y: 30,
        },
        {
          id: 'lateral-compartment',
          label: 'Lateral',
          name: 'Lateral compartment: the peronei, superficial peroneal nerve',
          x: 225,
          y: 30,
        },
        {
          id: 'posterior-compartment',
          label: 'Posterior',
          name: 'Posterior compartment: the calf muscles, tibial nerve',
          x: 305,
          y: 30,
        },
        {
          id: 'tibialis-anterior',
          label: 'Tibialis\nanterior',
          name: 'Tibialis anterior',
          x: 50,
          y: 110,
        },
        {
          id: 'extensor-hallucis-longus',
          label: 'Extensor\nhallucis',
          name: 'Extensor hallucis longus',
          x: 130,
          y: 110,
        },
        {
          id: 'extensor-digitorum-longus',
          label: 'Extensor\ndigitorum',
          name: 'Extensor digitorum longus',
          x: 210,
          y: 110,
        },
        {
          id: 'peroneus-tertius',
          label: 'Peroneus\ntertius',
          name: 'Peroneus tertius',
          x: 290,
          y: 110,
        },
        { id: 'dorsum', label: 'Dorsum', name: 'Dorsum of the foot', x: 50, y: 186 },
        {
          id: 'extensor-hallucis-brevis',
          label: 'Extensor\nbrevis',
          name: 'Extensor digitorum brevis, with extensor hallucis brevis',
          x: 145,
          y: 186,
        },
        {
          id: 'deep-peroneal-nerve',
          label: 'Deep\nperoneal',
          name: 'Deep peroneal nerve, to all five',
          x: 225,
          y: 186,
        },
        {
          id: 'retinacula',
          label: 'Retinacula',
          name: 'Extensor retinacula',
          x: 50,
          y: 262,
        },
        {
          id: 'superior-retinaculum',
          label: 'Superior',
          name: 'Superior extensor retinaculum, tibia to fibula above the ankle',
          x: 145,
          y: 262,
        },
        {
          id: 'inferior-retinaculum',
          label: 'Inferior\n(Y)',
          name: 'Inferior extensor retinaculum, a Y with its stem on the calcaneus',
          x: 225,
          y: 262,
        },
        {
          id: 'under',
          label: 'Under',
          name: 'Passing under them, medial to lateral',
          x: 50,
          y: 340,
        },
        {
          id: 'under-medial',
          label: 'Two\ntendons',
          name: 'Tibialis anterior and extensor hallucis longus',
          x: 145,
          y: 340,
        },
        {
          id: 'under-middle',
          label: 'Vessels,\nnerve',
          name: 'Anterior tibial vessels and deep peroneal nerve',
          x: 225,
          y: 340,
        },
        {
          id: 'under-lateral',
          label: 'Two more\ntendons',
          name: 'Extensor digitorum longus and peroneus tertius',
          x: 305,
          y: 340,
        },
      ],
      edges: [
        { from: 'compartments', to: 'anterior-compartment' },
        { from: 'compartments', to: 'lateral-compartment' },
        { from: 'compartments', to: 'posterior-compartment' },
        { from: 'anterior-compartment', to: 'tibialis-anterior' },
        { from: 'anterior-compartment', to: 'extensor-hallucis-longus' },
        { from: 'anterior-compartment', to: 'extensor-digitorum-longus' },
        { from: 'anterior-compartment', to: 'peroneus-tertius' },
        { from: 'dorsum', to: 'extensor-hallucis-brevis' },
        { from: 'dorsum', to: 'deep-peroneal-nerve' },
        { from: 'retinacula', to: 'superior-retinaculum' },
        { from: 'retinacula', to: 'inferior-retinaculum' },
        { from: 'under', to: 'under-medial' },
        { from: 'under', to: 'under-middle' },
        { from: 'under', to: 'under-lateral' },
      ],
    },
    lesions: [
      {
        id: 'anterior-compartment-syndrome',
        label: 'Compartment syndrome',
        nodeIds: ['anterior-compartment', 'tibialis-anterior'],
        explanation:
          'The anterior compartment is boxed in by bone and tight fascia. Sudden hard exercise, like a fresher made to run every day, swells its muscles and they become painful and tender; severe swelling can cut off their blood.',
      },
      {
        id: 'front-foot-drop',
        label: 'Foot drop',
        nodeIds: ['deep-peroneal-nerve', 'tibialis-anterior', 'extensor-digitorum-longus'],
        explanation:
          'With the anterior compartment paralysed the foot cannot be dorsiflexed: it hangs plantar flexed and the toes catch the ground, so the patient lifts the knee high to walk.',
      },
    ],
    drill: [
      {
        id: 'front-muscles',
        title: 'Muscles and nerve',
        hint: 'Four in the leg from medial to lateral, one on the dorsum, one nerve for all.',
        nodeIds: [
          'tibialis-anterior',
          'extensor-hallucis-longus',
          'extensor-digitorum-longus',
          'peroneus-tertius',
          'extensor-hallucis-brevis',
          'deep-peroneal-nerve',
        ],
      },
      {
        id: 'extensor-retinacula',
        title: 'Extensor retinacula',
        hint: 'Two retinacula, then what passes under them from medial to lateral.',
        nodeIds: [
          'superior-retinaculum',
          'inferior-retinaculum',
          'under-medial',
          'under-middle',
          'under-lateral',
        ],
      },
    ],
    model3d: {
      src: LEG_FOOT_MODEL_SRC,
      credit: LEG_FOOT_MODEL_CREDIT,
      parts: legFootParts([
        ...LEG_FOOT_BONES,
        ...FRONT_LEG_MUSCLES,
        ...PERONEI,
        'anterior-tibial-artery',
        'dorsalis-pedis-artery',
        'common-peroneal-nerve',
        'deep-peroneal-nerve',
        'superficial-peroneal-nerve',
      ]),
      traces: [],
      stops: [
        LEG_FRONT,
        {
          id: 'between-bones',
          title: 'Between the bones',
          description:
            'From the front and laterally: the four muscles lie between the tibia and the fibula on the interosseous membrane; peroneus tertius carries on from extensor digitorum longus to the fifth metatarsal.',
          target: [-95, -90, 180],
          position: [-700, -700, 240],
        },
        {
          id: 'ankle',
          title: 'Front of the ankle',
          description:
            'The tendons cross the ankle side by side, tibialis anterior most medial; the retinacula that bind them down are not in the model.',
          target: [-85, -110, 20],
          position: [-120, -640, 200],
        },
        {
          id: 'dorsum',
          title: 'Dorsum of the foot',
          description:
            'The long extensor tendons fan out to the toes; extensor hallucis brevis, the slip of extensor digitorum brevis to the big toe, lies under them.',
          target: [-95, -140, -30],
          position: [-170, -560, 400],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'fascia',
      title: 'Deep fascia and compartments',
      body: 'Anterior and posterior intermuscular septa run from the deep fascia to the borders of the fibula and, with the tibia, fibula and interosseous membrane, divide the leg into anterior, lateral and posterior compartments; transverse septa split the posterior one further. Over the bare medial surface of the tibia and the malleoli the fascia blends with periosteum, and round the ankle it thickens into retinacula that keep the tendons in place.',
      focus: [
        'compartments',
        'anterior-compartment',
        'lateral-compartment',
        'posterior-compartment',
      ],
    },
    {
      id: 'muscles',
      title: 'Muscles of the front',
      body: 'From medial to lateral: tibialis anterior from the lateral surface of the tibia to the medial cuneiform and first metatarsal; extensor hallucis longus from the middle of the fibula to the distal phalanx of the big toe; extensor digitorum longus from the lateral tibial condyle and upper fibula to the lateral four toes through the dorsal digital expansions; and peroneus tertius, a split-off part of it, to the fifth metatarsal. All dorsiflex the foot; tibialis anterior also inverts it and helps hold up the medial arch, peroneus tertius everts it.',
      focus: [
        'tibialis-anterior',
        'extensor-hallucis-longus',
        'extensor-digitorum-longus',
        'peroneus-tertius',
      ],
    },
    {
      id: 'dorsum',
      title: 'The dorsum of the foot',
      body: 'Extensor digitorum brevis arises from the upper surface of the calcaneus and is the only muscle on the dorsum (the back of the hand has none). Its medial slip, extensor hallucis brevis, goes to the proximal phalanx of the big toe; the other three join the long extensor tendons of the second to fourth toes. Every muscle in this topic is supplied by the deep peroneal nerve.',
      focus: ['dorsum', 'extensor-hallucis-brevis', 'deep-peroneal-nerve'],
    },
    {
      id: 'retinacula',
      title: 'Extensor retinacula',
      body: 'The superior retinaculum is a band across the front of the leg above the ankle, from the anterior border of the tibia to that of the fibula; it splits to enclose tibialis anterior. The inferior retinaculum is a Y lying on its side in front of the ankle: its stem loops round extensor digitorum longus and peroneus tertius on the calcaneus, its upper band goes to the medial malleolus and its lower band to the plantar aponeurosis.',
      focus: ['retinacula', 'superior-retinaculum', 'inferior-retinaculum'],
    },
    {
      id: 'under',
      title: 'What passes under',
      body: 'From medial to lateral: tibialis anterior, extensor hallucis longus, the anterior tibial vessels, the deep peroneal nerve, extensor digitorum longus and peroneus tertius. BD remembers them as "Tall Himalayas are never dry places".',
      focus: ['under', 'under-medial', 'under-middle', 'under-lateral'],
    },
    {
      id: 'explore',
      title: 'Find it yourself',
      body: 'Select each muscle from medial to lateral and follow its tendon over the ankle to the foot; the retinacula themselves are not in the model.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'only-dorsum-muscle',
      prompt: 'The only muscle on the dorsum of the foot is:',
      options: [
        { id: 'edb', text: 'Extensor digitorum brevis' },
        { id: 'peroneus-tertius', text: 'Peroneus tertius' },
        { id: 'peroneus-brevis', text: 'Peroneus brevis' },
        { id: 'soleus', text: 'Soleus' },
      ],
      answerId: 'edb',
      explanation:
        'From the calcaneus to the medial four toes, supplied by the lateral terminal branch of the deep peroneal nerve.',
    },
    {
      id: 'tibialis-anterior-insertion',
      prompt: 'Tibialis anterior is inserted into the:',
      options: [
        { id: 'medial-cuneiform', text: 'Medial cuneiform and base of the first metatarsal' },
        { id: 'navicular', text: 'Tuberosity of the navicular' },
        { id: 'fifth-metatarsal', text: 'Base of the fifth metatarsal' },
        { id: 'big-toe', text: 'Distal phalanx of the big toe' },
      ],
      answerId: 'medial-cuneiform',
      explanation:
        'The same two bones as peroneus longus, from the other side: together they sling the foot.',
    },
    {
      id: 'front-compartment-nerve',
      prompt: 'The muscles of the anterior compartment of the leg are supplied by the:',
      options: [
        { id: 'deep-peroneal', text: 'Deep peroneal nerve' },
        { id: 'superficial-peroneal', text: 'Superficial peroneal nerve' },
        { id: 'tibial', text: 'Tibial nerve' },
        { id: 'saphenous', text: 'Saphenous nerve' },
      ],
      answerId: 'deep-peroneal',
      explanation:
        'The superficial peroneal supplies the lateral compartment, the tibial the posterior.',
    },
    {
      id: 'inferior-retinaculum-stem',
      prompt: 'The stem of the inferior extensor retinaculum is attached to the:',
      options: [
        { id: 'calcaneus', text: 'Upper surface of the calcaneus' },
        { id: 'medial-malleolus', text: 'Medial malleolus' },
        { id: 'plantar-aponeurosis', text: 'Plantar aponeurosis' },
        { id: 'fibula', text: 'Anterior border of the fibula' },
      ],
      answerId: 'calcaneus',
      explanation:
        'Its upper band goes to the medial malleolus and its lower band to the plantar aponeurosis.',
    },
  ],
  cards: [
    {
      id: 'front-leg-muscles-card',
      front: 'Muscles of the anterior compartment of the leg, medial to lateral?',
      back: 'Tibialis anterior, extensor hallucis longus, extensor digitorum longus, peroneus tertius; all deep peroneal nerve, all dorsiflexors.',
    },
    {
      id: 'extensor-retinacula-under-card',
      front: 'Structures passing under the extensor retinacula, medial to lateral?',
      back: 'Tibialis anterior, extensor hallucis longus, anterior tibial vessels, deep peroneal nerve, extensor digitorum longus, peroneus tertius.',
    },
    {
      id: 'inferior-extensor-card',
      front: 'Shape and attachments of the inferior extensor retinaculum?',
      back: 'A Y on its side: stem on the upper surface of the calcaneus, upper band to the medial malleolus, lower band to the plantar aponeurosis.',
    },
    {
      id: 'tibialis-anterior-actions-card',
      front: 'Actions of tibialis anterior?',
      back: 'Dorsiflexes and inverts the foot, keeps the leg upright when walking on uneven ground, and supports the medial longitudinal arch.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 8 Front of Leg and Dorsum of Foot',
      pages: '108–112',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '612, 624–625, 643, 647' },
  ],
};
