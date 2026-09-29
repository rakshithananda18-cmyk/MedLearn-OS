import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  ACROMIOCLAVICULAR_JOINT,
  CORACOCLAVICULAR_LIGAMENT,
  COSTOCLAVICULAR_LIGAMENT,
  STERNOCLAVICULAR_DISC,
} from './joints-3d';
import { SHOULDER_MODEL_CREDIT, SHOULDER_MODEL_SRC, shoulderParts } from './shoulder-3d';

// Upper limb batch 5 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const shoulderGirdle: Topic = {
  slug: 'shoulder-girdle',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Shoulder girdle: sternoclavicular and acromioclavicular joints',
  summary:
    'The two joints of the clavicle, the ligaments that hold the upper limb to the trunk, and the muscles that move the scapula.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 10 Joints of Upper Limb, pages 156 to 159'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, shoulder, pages 693 to 694'),
    {
      title: 'TeachMeAnatomy: The Sternoclavicular Joint',
      url: 'https://teachmeanatomy.info/upper-limb/joints/sternoclavicular/',
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
    'The sternoclavicular joint is the only bony joint between the upper limb and the trunk: a saddle-type synovial joint between the clavicle, the manubrium and the first costal cartilage.',
    'An articular disc divides it into two cavities and stops the clavicle being driven into the sternum when a fall on the hand pushes it medially.',
    'The costoclavicular ligament, from the clavicle to the first costal cartilage, is its main stabiliser and the pivot of clavicle movements.',
    'The acromioclavicular joint is a small plane joint; its strength is the coracoclavicular ligament (conoid and trapezoid parts), from which the scapula and upper limb hang.',
    'The scapula is elevated by trapezius and levator scapulae, protracted by serratus anterior, retracted by the rhomboids and trapezius, and rotated upwards by trapezius with serratus anterior for raising the arm overhead.',
  ],
  visual: {
    kind: 'path',
    // Left: the movements of the scapula and the muscles that make them. Right: the two joints
    // and the ligaments that hold them.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        { id: 'elevation', label: 'Elevation', name: 'Elevation of the scapula', x: 55, y: 30 },
        {
          id: 'depression',
          label: 'Depression',
          name: 'Depression of the scapula',
          x: 55,
          y: 85,
        },
        {
          id: 'protraction',
          label: 'Protraction',
          name: 'Protraction of the scapula',
          x: 55,
          y: 140,
        },
        {
          id: 'retraction',
          label: 'Retraction',
          name: 'Retraction of the scapula',
          x: 55,
          y: 195,
        },
        {
          id: 'upward-rotation',
          label: 'Upward\nrotation',
          name: 'Upward (lateral) rotation of the scapula',
          x: 55,
          y: 255,
        },
        {
          id: 'downward-rotation',
          label: 'Downward\nrotation',
          name: 'Downward (medial) rotation of the scapula',
          x: 55,
          y: 320,
        },
        { id: 'trapezius', label: 'Trapezius', name: 'Trapezius', x: 180, y: 40 },
        {
          id: 'levator-scapulae',
          label: 'Levator\nscapulae',
          name: 'Levator scapulae',
          x: 180,
          y: 100,
        },
        {
          id: 'rhomboid-minor',
          label: 'Rhomboid\nminor',
          name: 'Rhomboid minor',
          x: 180,
          y: 160,
        },
        {
          id: 'rhomboid-major',
          label: 'Rhomboid\nmajor',
          name: 'Rhomboid major',
          x: 180,
          y: 220,
        },
        { id: 'serratus', label: 'Serratus\nanterior', name: 'Serratus anterior', x: 180, y: 280 },
        {
          id: 'pec-minor',
          label: 'Pectoralis\nminor',
          name: 'Pectoralis minor',
          x: 180,
          y: 340,
        },
        {
          id: 'sternoclavicular',
          label: 'Sterno-\nclavicular',
          name: 'Sternoclavicular joint',
          x: 305,
          y: 60,
        },
        {
          id: 'sc-disc',
          label: 'Articular\ndisc',
          name: 'Articular disc of the sternoclavicular joint',
          x: 305,
          y: 130,
        },
        {
          id: 'costoclavicular',
          label: 'Costoclav.\nligament',
          name: 'Costoclavicular ligament',
          x: 305,
          y: 200,
        },
        {
          id: 'acromioclavicular',
          label: 'Acromio-\nclavicular',
          name: 'Acromioclavicular joint',
          x: 305,
          y: 270,
        },
        {
          id: 'coracoclavicular',
          label: 'Coracoclav.\nligament',
          name: 'Coracoclavicular ligament (conoid and trapezoid)',
          x: 305,
          y: 340,
        },
      ],
      edges: [
        { from: 'elevation', to: 'trapezius' },
        { from: 'elevation', to: 'levator-scapulae' },
        { from: 'depression', to: 'pec-minor' },
        { from: 'protraction', to: 'serratus' },
        { from: 'protraction', to: 'pec-minor' },
        { from: 'retraction', to: 'rhomboid-minor' },
        { from: 'retraction', to: 'rhomboid-major' },
        { from: 'retraction', to: 'trapezius' },
        { from: 'upward-rotation', to: 'trapezius' },
        { from: 'upward-rotation', to: 'serratus' },
        { from: 'downward-rotation', to: 'levator-scapulae' },
        { from: 'downward-rotation', to: 'rhomboid-major' },
        { from: 'downward-rotation', to: 'pec-minor' },
        { from: 'sternoclavicular', to: 'sc-disc' },
        { from: 'sternoclavicular', to: 'costoclavicular' },
        { from: 'acromioclavicular', to: 'coracoclavicular' },
      ],
    },
    lesions: [
      {
        id: 'winged-scapula',
        label: 'Long thoracic nerve injury',
        nodeIds: ['serratus', 'protraction', 'upward-rotation'],
        explanation:
          'Serratus anterior is paralysed, often after surgery in the axilla. The medial border of the scapula lifts off the chest when the student pushes against a wall (winged scapula), and the arm cannot be raised above the head because the scapula no longer rotates upwards.',
      },
      {
        id: 'accessory-nerve',
        label: 'Spinal accessory nerve injury',
        nodeIds: ['trapezius', 'elevation', 'upward-rotation'],
        explanation:
          'A cut in the posterior triangle of the neck, often during lymph node biopsy, paralyses trapezius. The shoulder droops, shrugging is weak, and raising the arm above the head is difficult.',
      },
      {
        id: 'ac-separation',
        label: 'Acromioclavicular dislocation',
        nodeIds: ['acromioclavicular', 'coracoclavicular'],
        explanation:
          'A fall on the point of the shoulder tears the acromioclavicular ligament and, in a severe injury, the coracoclavicular ligament. The scapula and limb then drop away from the clavicle, whose lateral end stands up as a step under the skin (shoulder separation).',
      },
    ],
    drill: [
      {
        id: 'movements',
        title: 'Movements of the scapula',
        hint: 'Up and down, forwards and back, and the two rotations.',
        nodeIds: [
          'elevation',
          'depression',
          'protraction',
          'retraction',
          'upward-rotation',
          'downward-rotation',
        ],
      },
      {
        id: 'muscles',
        title: 'Muscles',
        hint: 'Six muscles that move the scapula.',
        nodeIds: [
          'trapezius',
          'levator-scapulae',
          'rhomboid-minor',
          'rhomboid-major',
          'serratus',
          'pec-minor',
        ],
      },
      {
        id: 'joints',
        title: 'Joints and ligaments',
        hint: 'Each joint of the clavicle, and what holds it.',
        nodeIds: [
          'sternoclavicular',
          'sc-disc',
          'costoclavicular',
          'acromioclavicular',
          'coracoclavicular',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Discs and ligaments: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'clavicle',
        'sternum',
        'first-rib',
        'upper-ribs',
        'scapula',
        'humerus',
        'trapezius',
        'levator-scapulae',
        'rhomboid-minor',
        'rhomboid-major',
        'serratus',
        'pec-minor',
        'subclavius',
      ]),
      traces: [
        { id: 'sc-disc', kind: 'outline', paths: STERNOCLAVICULAR_DISC },
        { id: 'costoclavicular', kind: 'outline', paths: COSTOCLAVICULAR_LIGAMENT },
        { id: 'acromioclavicular', kind: 'outline', paths: ACROMIOCLAVICULAR_JOINT },
        { id: 'coracoclavicular', kind: 'outline', paths: CORACOCLAVICULAR_LIGAMENT },
      ],
      stops: [
        {
          id: 'front',
          title: 'The shoulder girdle',
          description:
            'The clavicle is a strut from the sternum to the acromion. The scapula hangs from its lateral end and glides on the back of the chest wall.',
          target: [-80, -110, 1320],
          position: [-200, -691, 1410],
        },
        {
          id: 'sternoclavicular',
          title: 'Sternoclavicular joint',
          description:
            'The medial end of the clavicle sits on the manubrium and first costal cartilage, with a disc between them. The costoclavicular ligament ties it down to the first rib.',
          target: [-12, -133, 1316],
          position: [-78, -342, 1338],
        },
        {
          id: 'acromioclavicular',
          title: 'Acromioclavicular joint',
          description:
            'A small joint between the clavicle and acromion. The strong coracoclavicular ligament runs from the coracoid process up to the underside of the clavicle.',
          target: [-138, -80, 1338],
          position: [-189, -323, 1415],
        },
        {
          id: 'back',
          title: 'Muscles that move the scapula',
          description:
            'From behind: trapezius over the top, levator scapulae and the rhomboids along the medial border, and serratus anterior wrapping round to the front.',
          target: [-90, -20, 1250],
          position: [-235, 682, 1322],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'girdle',
      title: 'The shoulder girdle',
      body: 'The clavicle and scapula form the shoulder girdle. The only bony link between the upper limb and the trunk is the sternoclavicular joint; everything else is held by muscles, which is why the shoulder moves so freely.',
      focus: ['sternoclavicular', 'acromioclavicular'],
    },
    {
      id: 'sternoclavicular',
      title: 'Sternoclavicular joint',
      body: 'A saddle-type synovial joint between the medial end of the clavicle, the clavicular notch of the manubrium and the first costal cartilage. An articular disc, attached above to the clavicle and below to the first costal cartilage, divides it into two cavities and resists the clavicle being pushed into the sternum. The costoclavicular ligament is its main stabiliser and the pivot for its movements.',
      focus: ['sternoclavicular', 'sc-disc', 'costoclavicular'],
    },
    {
      id: 'acromioclavicular',
      title: 'Acromioclavicular joint',
      body: 'A plane synovial joint between the lateral end of the clavicle and the acromion, allowing the scapula to glide and rotate. Its own ligament is weak; its strength comes from the coracoclavicular ligament, whose conoid and trapezoid parts run from the coracoid process to the clavicle and suspend the scapula and limb from it.',
      focus: ['acromioclavicular', 'coracoclavicular'],
    },
    {
      id: 'movements',
      title: 'Moving the scapula',
      body: 'Trapezius (upper fibres) and levator scapulae elevate the scapula; gravity and pectoralis minor depress it. Serratus anterior and pectoralis minor protract it, as in pushing; the rhomboids and middle trapezius retract it, bracing the shoulders.',
      focus: [
        'elevation',
        'depression',
        'protraction',
        'retraction',
        'trapezius',
        'levator-scapulae',
        'serratus',
        'pec-minor',
        'rhomboid-minor',
        'rhomboid-major',
      ],
    },
    {
      id: 'rotation',
      title: 'Rotating the scapula',
      body: 'To lift the arm above the head the glenoid cavity must turn upwards. Upper and lower trapezius with the lower fibres of serratus anterior rotate the scapula upwards; levator scapulae, the rhomboids and pectoralis minor, helped by gravity, rotate it back.',
      focus: [
        'upward-rotation',
        'downward-rotation',
        'trapezius',
        'serratus',
        'levator-scapulae',
        'rhomboid-major',
        'pec-minor',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a movement to see the muscles that make it. Then turn on an injury to see what is lost.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'shoulder-girdle-only-joint',
      prompt: 'The only bony joint between the upper limb and the trunk is the:',
      options: [
        { id: 'sc', text: 'Sternoclavicular joint' },
        { id: 'ac', text: 'Acromioclavicular joint' },
        { id: 'gh', text: 'Shoulder (glenohumeral) joint' },
        { id: 'st', text: 'Scapulothoracic joint' },
      ],
      answerId: 'sc',
      explanation:
        'The scapula is held to the chest wall by muscles only; the sternoclavicular joint is the one bony link.',
    },
    {
      id: 'shoulder-girdle-coracoclavicular',
      prompt: 'The main strength of the acromioclavicular joint comes from the:',
      options: [
        { id: 'coracoclavicular', text: 'Coracoclavicular ligament' },
        { id: 'costoclavicular', text: 'Costoclavicular ligament' },
        { id: 'coracoacromial', text: 'Coracoacromial ligament' },
        { id: 'capsule', text: 'Its own capsule' },
      ],
      answerId: 'coracoclavicular',
      explanation:
        'Its conoid and trapezoid parts suspend the scapula from the clavicle; the joint capsule itself is weak.',
    },
    {
      id: 'shoulder-girdle-overhead',
      prompt: 'Upward rotation of the scapula is produced by:',
      options: [
        { id: 'trap-serratus', text: 'Trapezius and serratus anterior' },
        { id: 'rhomboids', text: 'The rhomboids' },
        { id: 'levator', text: 'Levator scapulae and pectoralis minor' },
        { id: 'deltoid', text: 'Deltoid' },
      ],
      answerId: 'trap-serratus',
      explanation:
        'Upper and lower trapezius with the lower serratus anterior turn the glenoid cavity upwards, letting the arm rise above the head.',
    },
    {
      id: 'shoulder-girdle-disc',
      prompt: 'The articular disc of the sternoclavicular joint mainly prevents:',
      options: [
        { id: 'medial', text: 'Medial displacement of the clavicle into the sternum' },
        { id: 'lateral', text: 'Lateral displacement of the scapula' },
        { id: 'rotation', text: 'Rotation of the clavicle' },
        { id: 'elevation', text: 'Elevation of the clavicle' },
      ],
      answerId: 'medial',
      explanation:
        'Force from a fall on the hand drives the clavicle medially; the disc, anchored to the clavicle above and the first costal cartilage below, resists it.',
    },
  ],
  cards: [
    {
      id: 'shoulder-girdle-sc-type',
      front: 'Type and parts of the sternoclavicular joint?',
      back: 'Saddle-type synovial joint between the clavicle, manubrium and first costal cartilage, divided by an articular disc into two cavities.',
    },
    {
      id: 'shoulder-girdle-cc-ligament',
      front: 'Parts and role of the coracoclavicular ligament?',
      back: 'Conoid (medial) and trapezoid (lateral); it suspends the scapula and upper limb from the clavicle.',
    },
    {
      id: 'shoulder-girdle-protraction',
      front: 'Muscles that protract and retract the scapula?',
      back: 'Protract: serratus anterior, pectoralis minor. Retract: rhomboids, middle trapezius.',
    },
    {
      id: 'shoulder-girdle-winging',
      front: 'Cause and sign of a winged scapula?',
      back: 'Long thoracic nerve injury paralysing serratus anterior; the medial border lifts when pushing against a wall.',
    },
    {
      id: 'shoulder-girdle-elevation',
      front: 'Muscles that elevate the scapula?',
      back: 'Upper trapezius and levator scapulae.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 10 Joints of Upper Limb', pages: '156–159' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '693–694' },
  ],
};
