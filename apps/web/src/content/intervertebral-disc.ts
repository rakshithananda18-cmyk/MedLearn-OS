import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_WALL_MODEL_CREDIT,
  ABDOMINAL_WALL_MODEL_SRC,
  abdominalWallParts,
  LUMBAR_BACK,
  LUMBAR_SIDE,
  LUMBAR_VERTEBRAE,
} from './abdominal-wall-3d';
import { bookSource } from './books';

// Abdomen batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const intervertebralDisc: Topic = {
  slug: 'intervertebral-disc',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Intervertebral disc and disc prolapse',
  summary:
    'The shock absorber between two vertebrae: its three parts, how it ages, the joints and ligaments beside it, and why a lumbar disc bursts backwards onto a nerve root.',
  estimatedMinutes: 10,
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
      'Volume 2, Chapter 15 Introduction and Osteology: intervertebral joints and disc, pages 223 to 224 and 230 to 231',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 2 Back: vertebrae and intervertebral discs, pages 70 to 71',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Vertebrae and discs in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Each disc binds two vertebral bodies, from the axis down to the sacrum, in a secondary cartilaginous joint. Together the discs make about a fifth of the length of the spine.',
    'Three parts: a soft central nucleus pulposus (the remains of the notochord, about 90 percent water at birth and 70 in old age), a ring of annulus fibrosus round it, and a cartilaginous plate above and below, through which the disc is fed.',
    'Lumbar and cervical discs are thicker in front than behind, which shapes the forward curves there; thoracic discs are even.',
    'With age the nucleus dries and turns fibrous and the annulus weakens; a strain can then burst the annulus, usually backwards and to one side, where the nucleus presses on a nerve root: sciatica from the lower lumbar discs.',
    'The lumbar spine extends most, flexes and bends sideways well, and rotates least.',
  ],
  visual: {
    kind: 'path',
    // Left: the disc and its parts. Right: the joints and ligaments beside it, and the movements.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'lumbar-discs',
          label: 'Intervertebral\ndisc',
          name: 'Intervertebral disc',
          x: 180,
          y: 30,
        },
        {
          id: 'nucleus-pulposus',
          label: 'Nucleus\npulposus',
          name: 'Nucleus pulposus: soft, gelatinous, the remains of the notochord',
          x: 80,
          y: 100,
        },
        {
          id: 'annulus-fibrosus',
          label: 'Annulus\nfibrosus',
          name: 'Annulus fibrosus: rings of collagen outside, fibrocartilage inside',
          x: 80,
          y: 165,
        },
        {
          id: 'cartilage-plates',
          label: 'Cartilage\nplates',
          name: 'Cartilaginous plates above and below, through which the disc is fed',
          x: 80,
          y: 230,
        },
        {
          id: 'disc-shape',
          label: 'Thicker in front:\nlumbar, cervical',
          name: 'Lumbar and cervical discs thicker in front; thoracic even',
          x: 80,
          y: 295,
        },
        {
          id: 'disc-shock',
          label: 'Shock absorber',
          name: 'A hydraulic shock absorber: the nucleus under tension',
          x: 80,
          y: 360,
        },
        {
          id: 'longitudinal-ligaments',
          label: 'Anterior and\nposterior ligaments',
          name: 'Anterior and posterior longitudinal ligaments along the bodies',
          x: 275,
          y: 100,
        },
        {
          id: 'facet-joints',
          label: 'Facet joints:\nplane synovial',
          name: 'Joints between the articular processes: plane synovial joints',
          x: 275,
          y: 165,
        },
        {
          id: 'arch-ligaments',
          label: 'Flava, inter- and\nsupraspinous',
          name: 'Ligamenta flava, interspinous, supraspinous and intertransverse ligaments',
          x: 275,
          y: 230,
        },
        {
          id: 'lumbar-movements',
          label: 'Extends most,\nrotates least',
          name: 'Lumbar movements: extension most, then flexion and side bending, rotation least',
          x: 275,
          y: 295,
        },
        {
          id: 'disc-ageing',
          label: 'Ageing: nucleus\ndries, annulus weak',
          name: 'With age the nucleus dries and the annulus weakens',
          x: 275,
          y: 360,
        },
      ],
      edges: [
        { from: 'lumbar-discs', to: 'nucleus-pulposus' },
        { from: 'nucleus-pulposus', to: 'annulus-fibrosus' },
        { from: 'annulus-fibrosus', to: 'cartilage-plates' },
        { from: 'lumbar-discs', to: 'disc-shape' },
        { from: 'nucleus-pulposus', to: 'disc-shock' },
        { from: 'lumbar-discs', to: 'longitudinal-ligaments' },
        { from: 'lumbar-discs', to: 'facet-joints' },
        { from: 'facet-joints', to: 'arch-ligaments' },
        { from: 'facet-joints', to: 'lumbar-movements' },
        { from: 'annulus-fibrosus', to: 'disc-ageing' },
      ],
    },
    lesions: [
      {
        id: 'disc-prolapse',
        label: 'Prolapsed disc',
        nodeIds: ['nucleus-pulposus', 'annulus-fibrosus', 'disc-ageing'],
        explanation:
          'In a young adult the disc is too strong to fail alone. Later the nucleus degenerates and the annulus softens, so a sudden bend can burst it. The nucleus usually goes backwards and to one side, beside the posterior longitudinal ligament, and presses on a nerve root: between L5 and S1 this gives sciatica, worse on sneezing, with a positive straight leg raising test.',
      },
      {
        id: 'cauda-equina',
        label: 'Cauda equina syndrome',
        nodeIds: ['longitudinal-ligaments'],
        explanation:
          'A fracture-dislocation of the lumbar spine, or a large central prolapse, crushes the cauda equina: flaccid weakness of the legs, numbness in a saddle-shaped area, loss of bladder and bowel control.',
      },
      {
        id: 'abnormal-curves',
        label: 'Abnormal curves',
        nodeIds: ['disc-shape', 'lumbar-movements'],
        explanation:
          'A spine bent to one side is scoliosis; spines thrust backwards as weakened bodies collapse (as in osteoporosis) is kyphosis; an exaggerated forward lumbar curve is lumbar lordosis.',
      },
    ],
    drill: [
      {
        id: 'disc',
        title: 'The disc',
        hint: 'Its three parts, its shape, its job.',
        nodeIds: [
          'nucleus-pulposus',
          'annulus-fibrosus',
          'cartilage-plates',
          'disc-shape',
          'disc-shock',
        ],
      },
      {
        id: 'beside',
        title: 'Beside the disc',
        hint: 'Ligaments of the bodies, the facet joints, the arch ligaments, the movements and ageing.',
        nodeIds: [
          'longitudinal-ligaments',
          'facet-joints',
          'arch-ligaments',
          'lumbar-movements',
          'disc-ageing',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_WALL_MODEL_SRC,
      credit: ABDOMINAL_WALL_MODEL_CREDIT,
      parts: abdominalWallParts([...LUMBAR_VERTEBRAE, 'lumbar-discs', 'sacrum']),
      traces: [],
      stops: [
        {
          ...LUMBAR_SIDE,
          description:
            'From the side: each disc is wedge-shaped, thicker in front, so together they curve the lumbar spine forward. The nerves leave through the foramina just behind the discs.',
        },
        LUMBAR_BACK,
      ],
    },
  },
  lesson: [
    {
      id: 'joint',
      title: 'A joint of two kinds',
      body: 'Neighbouring vertebrae meet twice. Their bodies are bound by the disc, a secondary cartilaginous joint, with the anterior and posterior longitudinal ligaments along the front and back. Their arches meet at the facet joints, small plane synovial joints between the articular processes, held by the ligamenta flava and the interspinous, supraspinous and intertransverse ligaments.',
      focus: ['lumbar-discs', 'longitudinal-ligaments', 'facet-joints', 'arch-ligaments'],
    },
    {
      id: 'parts',
      title: 'Three parts',
      body: 'The nucleus pulposus in the centre is soft and gelatinous, about 90 percent water at birth, kept under pressure: the remains of the notochord. Round it the annulus fibrosus is rings of collagen outside and fibrocartilage inside, its layers crossing like a coiled spring. Cartilaginous plates cover it above and below; the disc has no blood vessels in the adult and is fed through them.',
      focus: ['nucleus-pulposus', 'annulus-fibrosus', 'cartilage-plates'],
    },
    {
      id: 'shape',
      title: 'Shape and job',
      body: 'Discs are thinnest in the upper thoracic spine and thickest in the lumbar, where, like the cervical discs, they are thicker in front: together they make the forward curves. They make a fifth of the spine’s length and act as a chain of shock absorbers.',
      focus: ['disc-shape', 'disc-shock'],
    },
    {
      id: 'ageing',
      title: 'Ageing and prolapse',
      body: 'From the second decade the nucleus loses water and is replaced by fibrocartilage; the annulus softens. A strain can now rupture it. The nucleus escapes backwards and to one side, where the posterior longitudinal ligament is narrow, onto the nerve root in the foramen. Lumbar discs (L4 to S1) and lower cervical discs (C5 to C7) fail most.',
      focus: ['disc-ageing', 'annulus-fibrosus', 'nucleus-pulposus'],
    },
    {
      id: 'movements',
      title: 'Movements of the lumbar spine',
      body: 'Extension is freest, flexion and side bending considerable, and rotation least, because the concave facets of the superior articular processes cup the convex inferior ones.',
      focus: ['lumbar-movements', 'facet-joints'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the side, find the wedge of each disc; from behind, see how close the lower discs lie to the nerves’ exits. Then turn on a prolapse.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'ivd-nucleus',
      prompt: 'The nucleus pulposus is a remnant of the:',
      options: [
        { id: 'notochord', text: 'Notochord' },
        { id: 'sclerotome', text: 'Sclerotome' },
        { id: 'neural-crest', text: 'Neural crest' },
        { id: 'somite-muscle', text: 'Myotome' },
      ],
      answerId: 'notochord',
      explanation: 'It contains a few notochordal cells in the first decade of life.',
    },
    {
      id: 'ivd-direction',
      prompt: 'A lumbar disc usually prolapses:',
      options: [
        { id: 'posterolateral', text: 'Backwards and to one side' },
        { id: 'anterior', text: 'Forwards' },
        { id: 'upward', text: 'Up into the vertebral body' },
        { id: 'central', text: 'Straight back in the midline' },
      ],
      answerId: 'posterolateral',
      explanation:
        'The posterior longitudinal ligament covers the midline, so the nucleus escapes beside it, onto a nerve root.',
    },
    {
      id: 'ivd-joint-type',
      prompt: 'The joint between two vertebral bodies is a:',
      options: [
        { id: 'secondary', text: 'Secondary cartilaginous joint' },
        { id: 'primary', text: 'Primary cartilaginous joint' },
        { id: 'plane', text: 'Plane synovial joint' },
        { id: 'syndesmosis', text: 'Syndesmosis' },
      ],
      answerId: 'secondary',
      explanation:
        'A symphysis held by the disc; the facet joints between the arches are plane synovial.',
    },
    {
      id: 'ivd-least',
      prompt: 'Which movement does the lumbar spine allow least?',
      options: [
        { id: 'rotation', text: 'Rotation' },
        { id: 'extension', text: 'Extension' },
        { id: 'flexion', text: 'Flexion' },
        { id: 'lateral', text: 'Side bending' },
      ],
      answerId: 'rotation',
      explanation: 'The curved facets lock against turning; extension is freest.',
    },
  ],
  cards: [
    {
      id: 'ivd-parts',
      front: 'Three parts of an intervertebral disc?',
      back: 'Nucleus pulposus (centre), annulus fibrosus (ring), cartilaginous plates (above and below).',
    },
    {
      id: 'ivd-water',
      front: 'Water content of the nucleus pulposus?',
      back: 'About 90 percent at birth, about 70 percent in old age.',
    },
    {
      id: 'ivd-thicker',
      front: 'Where are discs thicker in front than behind?',
      back: 'In the cervical and lumbar regions; thoracic discs are even.',
    },
    {
      id: 'ivd-sciatica',
      front: 'Signs of a prolapsed lower lumbar disc on a nerve root?',
      back: 'Pain along the sciatic nerve, worse on coughing or sneezing; positive straight leg raising; later weakness and lost reflexes.',
    },
    {
      id: 'ivd-cauda',
      front: 'Cauda equina syndrome?',
      back: 'Flaccid paraplegia, saddle anaesthesia, loss of bladder and bowel control, impotence.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 15 Introduction and Osteology',
      pages: '223–224, 230–231',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 2 Back', pages: '70–71' },
  ],
};
