import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { CAGE_BONES, THORAX_MODEL_CREDIT, THORAX_MODEL_SRC, thoraxParts } from './thorax-3d';

// Thorax batch 1. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const sternumThoracicVertebrae: Topic = {
  slug: 'sternum-thoracic-vertebrae',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Sternum and thoracic vertebrae',
  summary:
    'The three parts of the sternum and what lies behind them, and how to tell a thoracic vertebra and its special members.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 13 Bones and Joints of Thorax, pages 224 to 231'),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: thoracic vertebrae and sternum, pages 144 to 148',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Sternum, vertebrae, discs and aorta in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Sternum: manubrium, body and xiphoid, about 17 cm long; the manubriosternal joint is secondary cartilaginous.',
    'The lower half of the manubrium lies over the arch of the aorta: sternal puncture goes into the upper half.',
    'A thoracic vertebra is known by the costal facets on the side of its body.',
    'Typical (T2–T8): heart-shaped body, small round foramen, long spine sloping down, facets on the transverse processes.',
    'T1 has a whole facet for rib 1; T10 to T12 have one facet each and T11, T12 none on the transverse process.',
  ],
  visual: {
    kind: 'path',
    // The sternum's parts and what lies behind, then the vertebrae and the discs between them.
    diagram: {
      width: 360,
      height: 380,
      nodes: [
        { id: 'sternum', label: 'Sternum', name: 'Sternum', x: 50, y: 30 },
        { id: 'manubrium', label: 'Manubrium', name: 'Manubrium of sternum', x: 145, y: 30 },
        { id: 'body-of-sternum', label: 'Body', name: 'Body of sternum', x: 225, y: 30 },
        { id: 'xiphoid-process', label: 'Xiphoid', name: 'Xiphoid process', x: 305, y: 30 },
        {
          id: 'sternal-angle',
          label: 'Sternal\nangle',
          name: 'Sternal angle, the manubriosternal joint',
          x: 185,
          y: 100,
        },
        {
          id: 'arch-of-aorta',
          label: 'Aortic arch\nbehind',
          name: 'Arch of aorta, behind the lower half of the manubrium',
          x: 290,
          y: 100,
        },
        {
          id: 'thoracic-vertebrae',
          label: 'Thoracic\nvertebrae',
          name: 'Thoracic vertebrae',
          x: 50,
          y: 186,
        },
        {
          id: 'typical-vertebra',
          label: 'T2–T8\ntypical',
          name: 'Typical thoracic vertebrae, T2 to T8',
          x: 145,
          y: 186,
        },
        {
          id: 'costal-facets',
          label: 'Costal\nfacets',
          name: 'Costal facets on the body and transverse process',
          x: 225,
          y: 186,
        },
        {
          id: 'long-spine',
          label: 'Long\nspine',
          name: 'Long spinous process sloping down',
          x: 305,
          y: 186,
        },
        { id: 't1', label: 'T1', name: 'First thoracic vertebra', x: 145, y: 262 },
        {
          id: 't9-t10',
          label: 'T9, T10',
          name: 'Ninth and tenth thoracic vertebrae',
          x: 225,
          y: 262,
        },
        {
          id: 't11-t12',
          label: 'T11, T12',
          name: 'Eleventh and twelfth thoracic vertebrae',
          x: 305,
          y: 262,
        },
        {
          id: 'thoracic-discs',
          label: 'Discs',
          name: 'Intervertebral discs',
          x: 50,
          y: 340,
        },
        {
          id: 'nucleus-pulposus',
          label: 'Nucleus\npulposus',
          name: 'Nucleus pulposus, the soft centre',
          x: 145,
          y: 340,
        },
        {
          id: 'annulus-fibrosus',
          label: 'Annulus\nfibrosus',
          name: 'Annulus fibrosus, the rings around it',
          x: 225,
          y: 340,
        },
      ],
      edges: [
        { from: 'sternum', to: 'manubrium' },
        { from: 'sternum', to: 'body-of-sternum' },
        { from: 'sternum', to: 'xiphoid-process' },
        { from: 'manubrium', to: 'sternal-angle' },
        { from: 'body-of-sternum', to: 'sternal-angle' },
        { from: 'manubrium', to: 'arch-of-aorta' },
        { from: 'thoracic-vertebrae', to: 'typical-vertebra' },
        { from: 'typical-vertebra', to: 'costal-facets' },
        { from: 'costal-facets', to: 'long-spine' },
        { from: 'thoracic-vertebrae', to: 't1' },
        { from: 'thoracic-vertebrae', to: 't9-t10' },
        { from: 'thoracic-vertebrae', to: 't11-t12' },
        { from: 'thoracic-discs', to: 'nucleus-pulposus' },
        { from: 'thoracic-discs', to: 'annulus-fibrosus' },
      ],
    },
    lesions: [
      {
        id: 'sternal-puncture',
        label: 'Sternal puncture',
        nodeIds: ['manubrium', 'arch-of-aorta'],
        explanation:
          'Marrow for examination is drawn through the manubrium, in its upper half: the arch of the aorta lies behind the lower half, and a needle pushed too far there could enter it.',
      },
      {
        id: 'disc-prolapse',
        label: 'Disc prolapse',
        nodeIds: ['nucleus-pulposus', 'annulus-fibrosus'],
        explanation:
          'After the second decade the annulus weakens; under strain it can tear and the nucleus bulges out, usually backwards and to one side, pressing on a nerve root. It is rare in the thorax and common in the lower lumbar and lower cervical spine.',
      },
      {
        id: 'hemivertebra',
        label: 'Hemivertebra',
        nodeIds: ['thoracic-vertebrae'],
        explanation:
          'When one of the two primary centres for the body fails, half the body is missing and the spine bends sideways at that level (scoliosis). Failure of the two halves of the neural arch to fuse is spina bifida.',
      },
    ],
    drill: [
      {
        id: 'sternum',
        title: 'Sternum',
        hint: 'Its three parts, the joint between the first two, and what lies behind the first.',
        nodeIds: [
          'manubrium',
          'body-of-sternum',
          'xiphoid-process',
          'sternal-angle',
          'arch-of-aorta',
        ],
      },
      {
        id: 'vertebrae',
        title: 'Thoracic vertebrae',
        hint: 'The typical ones and how to know them, then the special ones.',
        nodeIds: ['typical-vertebra', 'costal-facets', 'long-spine', 't1', 't9-t10', 't11-t12'],
      },
    ],
    model3d: {
      src: THORAX_MODEL_SRC,
      credit: THORAX_MODEL_CREDIT,
      parts: thoraxParts([...CAGE_BONES, 'thoracic-discs', 'clavicles', 'arch-of-aorta']),
      traces: [],
      stops: [
        {
          id: 'sternum',
          title: 'The sternum',
          description:
            'Manubrium above, body in the middle and the small xiphoid below, with the costal cartilages meeting its sides.',
          target: [0, -190, 1240],
          position: [-240, -896, 1315],
        },
        {
          id: 'behind-manubrium',
          title: 'Behind the manubrium',
          description:
            'From the left: the arch of the aorta curves behind the lower half of the manubrium, which is why marrow is taken from the upper half.',
          target: [10, -130, 1295],
          position: [622, -462, 1368],
        },
        {
          id: 'vertebrae',
          title: 'Thoracic vertebrae',
          description:
            'From behind: twelve vertebrae with long spines sloping down and overlapping, and a rib meeting each side.',
          target: [0, -40, 1210],
          position: [0, 959, 1257],
        },
        {
          id: 'side',
          title: 'Bodies and discs',
          description:
            'From the side: the heart-shaped bodies stack with thin discs of even thickness between them; the thoracic curve is concave forwards.',
          target: [0, -60, 1210],
          position: [-999, -60, 1242],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'sternum',
      title: 'A short sword',
      body: 'The sternum, about 17 cm long, makes the middle of the front of the cage. Its handle is the manubrium, its blade the body and its point the xiphoid process.',
      focus: ['sternum'],
    },
    {
      id: 'manubrium',
      title: 'Manubrium',
      body: 'The thickest, strongest part. Its upper border has the suprasternal notch in the middle and a clavicular notch on each side for the sternoclavicular joint. Each side joins the first costal cartilage and part of the second. Pectoralis major and sternocleidomastoid arise in front; sternohyoid and sternothyroid behind.',
      focus: ['manubrium'],
    },
    {
      id: 'behind',
      title: 'What lies behind it',
      body: 'The back of the manubrium forms the front of the superior mediastinum. The arch of the aorta lies behind its lower half; the left brachiocephalic vein and the three branches of the arch behind its upper half. Sternal puncture for marrow is done in the upper half for this reason.',
      focus: ['arch-of-aorta'],
    },
    {
      id: 'angle',
      title: 'Sternal angle',
      body: 'The manubrium meets the body at a secondary cartilaginous joint, usually unfused for life, angled forwards. Its slight movement lets the ribs move in breathing.',
      focus: ['sternal-angle'],
    },
    {
      id: 'body',
      title: 'Body and xiphoid',
      body: 'The body is four fused sternebrae, widest near the fifth cartilage, with synovial joints along its sides for cartilages 2 to 7. Behind it on the left, its lower half lies against the pericardium. The xiphoid is cartilage at first and ossifies near its top in adults; the diaphragm arises from its back. The manubrium ossifies from two centres in the fifth fetal month, the xiphoid from one in the third year that joins the body around 40.',
      focus: ['body-of-sternum', 'xiphoid-process'],
    },
    {
      id: 'vertebrae',
      title: 'Knowing a thoracic vertebra',
      body: 'Costal facets on the sides of the body mark a thoracic vertebra. A typical one, T2 to T8, has a heart-shaped body with a larger upper demifacet for its own rib and a smaller lower one for the rib below, a small round vertebral foramen, and a facet on each transverse process for the tubercle of its rib.',
      focus: ['thoracic-vertebrae', 'typical-vertebra', 'costal-facets'],
    },
    {
      id: 'spine',
      title: 'Spines and facets',
      body: 'The spines are long and point down, T5 to T9 most steeply, overlapping like tiles. The upper articular facets are flat and face backwards, which allows rotation; flexion and extension are limited in the thorax.',
      focus: ['long-spine'],
    },
    {
      id: 'atypical',
      title: 'The special ones',
      body: 'T1 has a complete facet for the first rib and a demifacet for the second, and a body like a cervical vertebra. T9 has only upper demifacets; T10 one whole facet. T11 has one large facet and no facet on its transverse process. T12 looks lumbar below: its lower articular facets face sideways like a lumbar vertebra’s.',
      focus: ['t1', 't9-t10', 't11-t12'],
    },
    {
      id: 'discs',
      title: 'Discs',
      body: 'Between the bodies are discs of fibrocartilage, a soft nucleus pulposus held in rings of annulus fibrosus. In the thorax they are thin and even in thickness, thinnest in the upper thorax. Together the discs make a fifth of the length of the spine.',
      focus: ['thoracic-discs', 'nucleus-pulposus', 'annulus-fibrosus'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a part to light it in the model. Then turn on sternal puncture to see why the needle stays high.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'manubriosternal-type',
      prompt: 'The manubriosternal joint is:',
      options: [
        { id: 'secondary-cartilaginous', text: 'A secondary cartilaginous joint' },
        { id: 'primary-cartilaginous', text: 'A primary cartilaginous joint' },
        { id: 'synovial', text: 'A plane synovial joint' },
        { id: 'fibrous', text: 'A fibrous joint' },
      ],
      answerId: 'secondary-cartilaginous',
      explanation:
        'Like the joints between vertebral bodies, it has a fibrocartilage plate between hyaline-covered surfaces and usually stays unfused for life.',
    },
    {
      id: 'sternal-puncture-site',
      prompt:
        'Sternal puncture is done in the upper half of the manubrium because the lower half lies over:',
      options: [
        { id: 'arch', text: 'The arch of the aorta' },
        { id: 'svc', text: 'The superior vena cava' },
        { id: 'trachea', text: 'The trachea' },
        { id: 'thymus', text: 'The thymus' },
      ],
      answerId: 'arch',
      explanation:
        'The arch of the aorta lies behind the lower half of the manubrium; the needle is kept above it.',
    },
    {
      id: 'thoracic-vertebra-feature',
      prompt: 'The one feature that marks any vertebra as thoracic is:',
      options: [
        { id: 'costal-facets', text: 'Costal facets on the body' },
        { id: 'heart-shaped', text: 'A heart-shaped body' },
        { id: 'long-spine', text: 'A long, oblique spine' },
        { id: 'round-foramen', text: 'A small round vertebral foramen' },
      ],
      answerId: 'costal-facets',
      explanation:
        'Every thoracic vertebra, typical or not, carries facets for ribs on its body. The other features belong to the typical ones only.',
    },
    {
      id: 'no-transverse-facet',
      prompt: 'Which thoracic vertebra has no facet on its transverse process?',
      options: [
        { id: 't11', text: 'T11' },
        { id: 't1', text: 'T1' },
        { id: 't5', text: 'T5' },
        { id: 't9', text: 'T9' },
      ],
      answerId: 't11',
      explanation:
        'Ribs 11 and 12 have no tubercles, so T11 and T12 have no facets on their transverse processes.',
    },
  ],
  cards: [
    {
      id: 'sternum-parts',
      front: 'Parts of the sternum and the joints between them?',
      back: 'Manubrium, body, xiphoid. Manubriosternal: secondary cartilaginous. Xiphisternal: primary cartilaginous.',
    },
    {
      id: 'manubrium-behind',
      front: 'What lies behind the manubrium?',
      back: 'Lower half: arch of the aorta. Upper half: left brachiocephalic vein, and the brachiocephalic, left common carotid and left subclavian arteries.',
    },
    {
      id: 'typical-thoracic-vertebra',
      front: 'Features of a typical thoracic vertebra?',
      back: 'Heart-shaped body with two demifacets each side, small round foramen, transverse process with a facet for the rib tubercle, long spine sloping down.',
    },
    {
      id: 'atypical-thoracic-vertebrae',
      front: 'Which thoracic vertebrae are atypical?',
      back: 'T1, T9, T10, T11 and T12.',
    },
    {
      id: 'xiphoid-fusion',
      front: 'When does the xiphoid join the body of the sternum?',
      back: 'Around 40 years; its centre appears in the third year or later.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 13 Bones and Joints of Thorax', pages: '224–231' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '144–148' },
  ],
};
