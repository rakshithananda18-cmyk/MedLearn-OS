import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { CORD_PATHS } from './brachial-plexus-3d';
import {
  AXILLA_BONES,
  LYMPH_GROUPS,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 1 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const axilla: Topic = {
  slug: 'axilla',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Axilla: walls and contents',
  summary: 'The pyramid-shaped space that carries vessels and nerves from the neck into the arm.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 4 Axilla'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, axilla'),
    {
      title: 'TeachMeAnatomy: The Axilla',
      url: 'https://teachmeanatomy.info/upper-limb/areas/axilla/',
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
    'Apex: clavicle in front, outer border of the first rib medially, superior border of the scapula behind.',
    'Anterior wall: pectoralis major and minor, subclavius. Posterior wall: subscapularis, teres major, latissimus dorsi.',
    'Medial wall: serratus anterior over the upper ribs. Lateral wall: intertubercular groove, coracobrachialis, short head of biceps.',
    'Contents: axillary artery and vein, cords and branches of the brachial plexus, axillary lymph nodes, all in fat.',
    'The long thoracic nerve runs on the medial wall; injury paralyses serratus anterior and wings the scapula.',
  ],
  visual: {
    kind: 'path',
    // Each wall on the left, with what forms it to the right.
    diagram: {
      width: 360,
      height: 400,
      nodes: [
        { id: 'apex', label: 'Apex', name: 'Apex of the axilla', x: 50, y: 30 },
        { id: 'clavicle', label: 'Clavicle', name: 'Clavicle, in front', x: 145, y: 30 },
        {
          id: 'first-rib',
          label: 'First rib',
          name: 'Outer border of the first rib, medially',
          x: 225,
          y: 30,
        },
        {
          id: 'scapula-border',
          label: 'Scapula',
          name: 'Superior border of the scapula, behind',
          x: 305,
          y: 30,
        },
        { id: 'anterior-wall', label: 'Anterior\nwall', name: 'Anterior wall', x: 50, y: 86 },
        { id: 'pec-major', label: 'Pectoralis\nmajor', name: 'Pectoralis major', x: 145, y: 86 },
        { id: 'pec-minor', label: 'Pectoralis\nminor', name: 'Pectoralis minor', x: 225, y: 86 },
        { id: 'subclavius', label: 'Subclavius', name: 'Subclavius', x: 305, y: 86 },
        {
          id: 'posterior-wall',
          label: 'Posterior\nwall',
          name: 'Posterior wall',
          x: 50,
          y: 142,
        },
        {
          id: 'subscapularis',
          label: 'Subscap-\nularis',
          name: 'Subscapularis',
          x: 145,
          y: 142,
        },
        { id: 'teres-major', label: 'Teres\nmajor', name: 'Teres major', x: 225, y: 142 },
        {
          id: 'latissimus',
          label: 'Latissimus\ndorsi',
          name: 'Latissimus dorsi',
          x: 305,
          y: 142,
        },
        { id: 'medial-wall', label: 'Medial\nwall', name: 'Medial wall', x: 50, y: 198 },
        {
          id: 'serratus',
          label: 'Serratus\nanterior',
          name: 'Serratus anterior',
          x: 145,
          y: 198,
        },
        {
          id: 'upper-ribs',
          label: 'Upper ribs',
          name: 'Upper ribs and intercostal muscles',
          x: 225,
          y: 198,
        },
        { id: 'lateral-wall', label: 'Lateral\nwall', name: 'Lateral wall', x: 50, y: 254 },
        {
          id: 'bicipital-groove',
          label: 'Bicipital\ngroove',
          name: 'Intertubercular (bicipital) groove of the humerus',
          x: 145,
          y: 254,
        },
        {
          id: 'coracobrachialis',
          label: 'Coraco-\nbrachialis',
          name: 'Coracobrachialis',
          x: 225,
          y: 254,
        },
        {
          id: 'biceps-short',
          label: 'Biceps\nshort head',
          name: 'Short head of biceps',
          x: 305,
          y: 254,
        },
        { id: 'base', label: 'Base', name: 'Base of the axilla', x: 50, y: 310 },
        {
          id: 'axillary-fascia',
          label: 'Axillary\nfascia',
          name: 'Axillary fascia',
          x: 145,
          y: 310,
        },
        { id: 'skin', label: 'Skin', name: 'Skin of the armpit', x: 225, y: 310 },
        { id: 'contents', label: 'Contents', name: 'Contents of the axilla', x: 50, y: 366 },
        { id: 'axillary-artery', label: 'Artery', name: 'Axillary artery', x: 125, y: 366 },
        { id: 'axillary-vein', label: 'Vein', name: 'Axillary vein', x: 185, y: 366 },
        { id: 'cords', label: 'Cords', name: 'Cords of the brachial plexus', x: 245, y: 366 },
        { id: 'lymph-nodes', label: 'Nodes', name: 'Axillary lymph nodes', x: 305, y: 366 },
      ],
      edges: [
        { from: 'apex', to: 'clavicle' },
        { from: 'apex', to: 'first-rib' },
        { from: 'apex', to: 'scapula-border' },
        { from: 'anterior-wall', to: 'pec-major' },
        { from: 'anterior-wall', to: 'pec-minor' },
        { from: 'anterior-wall', to: 'subclavius' },
        { from: 'posterior-wall', to: 'subscapularis' },
        { from: 'posterior-wall', to: 'teres-major' },
        { from: 'posterior-wall', to: 'latissimus' },
        { from: 'medial-wall', to: 'serratus' },
        { from: 'medial-wall', to: 'upper-ribs' },
        { from: 'lateral-wall', to: 'bicipital-groove' },
        { from: 'lateral-wall', to: 'coracobrachialis' },
        { from: 'lateral-wall', to: 'biceps-short' },
        { from: 'base', to: 'axillary-fascia' },
        { from: 'base', to: 'skin' },
        { from: 'contents', to: 'axillary-artery' },
        { from: 'contents', to: 'axillary-vein' },
        { from: 'contents', to: 'cords' },
        { from: 'contents', to: 'lymph-nodes' },
      ],
    },
    lesions: [
      {
        id: 'long-thoracic',
        label: 'Long thoracic nerve injury',
        nodeIds: ['serratus'],
        explanation:
          'The long thoracic nerve runs down the medial wall on the surface of serratus anterior, where axillary surgery, a blow or a heavy load on the shoulder can injure it. Serratus anterior is paralysed: the medial border of the scapula lifts off the chest (winged scapula), most clearly when pushing against a wall, and the arm cannot be raised fully above the head.',
      },
      {
        id: 'thoracodorsal',
        label: 'Thoracodorsal nerve injury',
        nodeIds: ['latissimus'],
        explanation:
          'The thoracodorsal nerve runs on the posterior wall to latissimus dorsi and is at risk when axillary lymph nodes are cleared. Latissimus dorsi weakens, so extending, adducting and medially rotating the arm (as in climbing or swimming) becomes harder.',
      },
    ],
    drill: [],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Cords and lymph nodes: MedLearn schematic, not yet medically reviewed. The source model has no latissimus dorsi.`,
      parts: shoulderParts([
        ...AXILLA_BONES,
        'pec-major',
        'pec-minor',
        'subclavius',
        'serratus',
        'subscapularis',
        'teres-major',
        'coracobrachialis',
        'biceps-short',
        'axillary-artery',
        'axillary-vein',
      ]),
      traces: [
        { id: 'cords', kind: 'nerve', paths: CORD_PATHS },
        { id: 'lymph-nodes', kind: 'lymph', paths: [LYMPH_GROUPS.central] },
      ],
      stops: [
        {
          id: 'overview',
          title: 'The space',
          description:
            'The axilla lies between the upper humerus, the scapula and the upper ribs. The axillary artery runs through it from the first rib into the arm.',
          target: [-120, -80, 1250],
          position: [-300, -620, 1380],
        },
        {
          id: 'apex',
          title: 'Apex',
          description:
            'Clavicle in front, first rib medially, top of the scapula behind: the gap through which vessels and nerves enter the axilla from the neck.',
          target: [-110, -88, 1325],
          position: [-220, -360, 1370],
        },
        {
          id: 'lateral-wall',
          title: 'Lateral wall',
          description:
            'The narrow lateral wall is the upper humerus, where the intertubercular groove lies.',
          target: [-175, -80, 1190],
          position: [-360, -430, 1240],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'shape',
      title: 'A pyramid-shaped space',
      body: 'The axilla is the space between the upper arm and the side of the chest. It is shaped like a pyramid, with an apex, a base and four walls, and it carries the vessels and nerves of the upper limb from the neck into the arm.',
      focus: [],
    },
    {
      id: 'apex',
      title: 'Apex: the way in',
      body: 'The apex points up into the neck. It is bounded by the clavicle in front, the outer border of the first rib medially and the superior border of the scapula behind. The axillary artery and vein and the brachial plexus pass through it.',
      focus: ['apex', 'clavicle', 'first-rib', 'scapula-border'],
    },
    {
      id: 'front-back',
      title: 'Anterior and posterior walls',
      body: 'The anterior wall is pectoralis major, with pectoralis minor and subclavius deep to it, joined by the clavipectoral fascia. The posterior wall is subscapularis above, with teres major and latissimus dorsi below.',
      focus: [
        'anterior-wall',
        'pec-major',
        'pec-minor',
        'subclavius',
        'posterior-wall',
        'subscapularis',
        'teres-major',
        'latissimus',
      ],
    },
    {
      id: 'medial-lateral',
      title: 'Medial and lateral walls',
      body: 'The medial wall is serratus anterior over the upper ribs and their intercostal muscles. The narrow lateral wall is the intertubercular (bicipital) groove of the humerus, with coracobrachialis and the short head of biceps.',
      focus: [
        'medial-wall',
        'serratus',
        'upper-ribs',
        'lateral-wall',
        'bicipital-groove',
        'coracobrachialis',
        'biceps-short',
      ],
    },
    {
      id: 'base',
      title: 'Base: the armpit',
      body: 'The base is the skin of the armpit with the axillary fascia beneath it, stretched between the two axillary folds. Pectoralis major forms the anterior fold; latissimus dorsi and teres major form the posterior fold.',
      focus: ['base', 'axillary-fascia', 'skin'],
    },
    {
      id: 'contents',
      title: 'Contents',
      body: 'The axillary artery and vein, the cords and branches of the brachial plexus and the axillary lymph nodes, packed in fat. The vein lies medial to the artery, and the cords are named by their position around it. The artery and the cords are wrapped in the axillary sheath, a sleeve of fascia from the neck.',
      focus: ['contents', 'axillary-artery', 'axillary-vein', 'cords', 'lymph-nodes'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select any wall to see what forms it. Then turn on a nerve injury to see which muscle loses its nerve.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'axilla-apex',
      prompt: 'Which of these does NOT bound the apex of the axilla?',
      options: [
        { id: 'clavicle', text: 'Clavicle' },
        { id: 'first-rib', text: 'Outer border of the first rib' },
        { id: 'scapula', text: 'Superior border of the scapula' },
        { id: 'coracoid', text: 'Coracoid process' },
      ],
      answerId: 'coracoid',
      explanation:
        'The apex is bounded by the clavicle in front, the outer border of the first rib medially and the superior border of the scapula behind.',
    },
    {
      id: 'axilla-medial-wall',
      prompt: 'The medial wall of the axilla is formed mainly by:',
      options: [
        { id: 'serratus', text: 'Serratus anterior' },
        { id: 'subscapularis', text: 'Subscapularis' },
        { id: 'pec-minor', text: 'Pectoralis minor' },
        { id: 'coracobrachialis', text: 'Coracobrachialis' },
      ],
      answerId: 'serratus',
      explanation:
        'Serratus anterior covers the upper ribs on the medial wall. Subscapularis is on the posterior wall, pectoralis minor on the anterior wall and coracobrachialis on the lateral wall.',
    },
    {
      id: 'winged-scapula',
      prompt: 'A winged scapula after axillary surgery points to injury of which nerve?',
      options: [
        { id: 'long-thoracic', text: 'Long thoracic nerve' },
        { id: 'thoracodorsal', text: 'Thoracodorsal nerve' },
        { id: 'axillary', text: 'Axillary nerve' },
        { id: 'medial-pectoral', text: 'Medial pectoral nerve' },
      ],
      answerId: 'long-thoracic',
      explanation:
        'The long thoracic nerve supplies serratus anterior, which holds the scapula against the chest wall.',
    },
    {
      id: 'posterior-fold',
      prompt: 'The posterior axillary fold is formed by:',
      options: [
        { id: 'lat-teres', text: 'Latissimus dorsi and teres major' },
        { id: 'pec-major', text: 'Pectoralis major' },
        { id: 'subscapularis', text: 'Subscapularis' },
        { id: 'serratus', text: 'Serratus anterior' },
      ],
      answerId: 'lat-teres',
      explanation:
        'Latissimus dorsi winding around teres major forms the posterior fold; pectoralis major forms the anterior fold.',
    },
  ],
  cards: [
    {
      id: 'axilla-apex-boundaries',
      front: 'Boundaries of the apex of the axilla?',
      back: 'Clavicle in front, outer border of the first rib medially, superior border of the scapula behind.',
    },
    {
      id: 'axilla-posterior-wall',
      front: 'Muscles of the posterior wall of the axilla?',
      back: 'Subscapularis, teres major, latissimus dorsi.',
    },
    {
      id: 'axilla-lateral-wall',
      front: 'Lateral wall of the axilla?',
      back: 'Intertubercular groove of the humerus, with coracobrachialis and the short head of biceps.',
    },
    {
      id: 'axilla-contents',
      front: 'Contents of the axilla?',
      back: 'Axillary artery and vein, cords and branches of the brachial plexus, axillary lymph nodes, fat.',
    },
    {
      id: 'long-thoracic-sign',
      front: 'Nerve at risk on the medial wall of the axilla, and its sign?',
      back: 'Long thoracic nerve: winged scapula from a paralysed serratus anterior.',
    },
  ],
  // Chapter-level until a reviewer adds the pages for this section.
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 4 Axilla' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb' },
  ],
};
