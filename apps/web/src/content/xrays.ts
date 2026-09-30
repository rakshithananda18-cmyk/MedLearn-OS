/** A structure marked on a film: where it is, as a share of the film's width and height. */
export interface XrayMark {
  label: string;
  x: number;
  y: number;
}

/** One radiograph, with what to look for on it. */
export interface XrayFilm {
  id: string;
  region: 'shoulder' | 'elbow' | 'wrist' | 'hand';
  /** The joint or part, and the view: "Elbow, lateral". */
  title: string;
  width: number;
  height: number;
  lookFor: string[];
  /** Structures placed with confidence; the rest are left unmarked. */
  marks: XrayMark[];
  /** The original on Wikimedia Commons. */
  source: string;
}

/** Who made the films, and their licence: shown under every film. */
export const XRAY_CREDIT = 'Radiographs: Mikael Häggström, CC0, via Wikimedia Commons';

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(' ', '_'))}`;

export const XRAYS: XrayFilm[] = [
  {
    id: 'shoulder-grashey',
    region: 'shoulder',
    title: 'Shoulder, true AP (Grashey)',
    width: 928,
    height: 1400,
    lookFor: [
      'The beam is angled along the glenoid, so the joint space between the humeral head and the glenoid shows as a clear gap.',
      'The humeral head sits evenly against the glenoid; an uneven gap is a clue to dislocation.',
      'The greater tubercle forms the lateral bump of the humeral head, where supraspinatus inserts.',
    ],
    marks: [
      { label: 'Head of humerus', x: 0.45, y: 0.28 },
      { label: 'Greater tubercle', x: 0.3, y: 0.3 },
      { label: 'Glenoid cavity', x: 0.7, y: 0.3 },
      { label: 'Acromion', x: 0.5, y: 0.12 },
      { label: 'Lateral border of scapula', x: 0.83, y: 0.55 },
      { label: 'Shaft of humerus', x: 0.42, y: 0.72 },
    ],
    source: commons('Anteroposterior glenoid (Grashey view) X-ray of a normal shoulder.jpg'),
  },
  {
    id: 'shoulder-y',
    region: 'shoulder',
    title: 'Shoulder, scapular Y view',
    width: 954,
    height: 1400,
    lookFor: [
      'The scapula makes a Y: its body is the stem, the acromion the arm behind and the coracoid the arm in front.',
      'The humeral head sits over the centre of the Y, where the glenoid is.',
      'Anterior dislocation moves the head under the coracoid; posterior dislocation, under the acromion.',
    ],
    marks: [
      { label: 'Head of humerus', x: 0.41, y: 0.33 },
      { label: 'Acromion', x: 0.34, y: 0.21 },
      { label: 'Clavicle', x: 0.72, y: 0.13 },
      { label: 'Body of scapula', x: 0.53, y: 0.55 },
      { label: 'Shaft of humerus', x: 0.44, y: 0.75 },
    ],
    source: commons('Y-projection X-ray of a normal shoulder.jpg'),
  },
  {
    id: 'elbow-ap',
    region: 'elbow',
    title: 'Elbow, AP',
    width: 849,
    height: 1138,
    lookFor: [
      'The forearm angles away from the body at the elbow: the carrying angle, about 10 to 15 degrees in extension.',
      'The olecranon fossa shows as a thin, dark area of the humerus just above the joint.',
      'The radial head lines up with the capitulum; the ulna meets the trochlea.',
    ],
    marks: [
      { label: 'Shaft of humerus', x: 0.57, y: 0.09 },
      { label: 'Olecranon fossa', x: 0.45, y: 0.29 },
      { label: 'Medial epicondyle', x: 0.18, y: 0.28 },
      { label: 'Lateral epicondyle', x: 0.68, y: 0.4 },
      { label: 'Head of radius', x: 0.55, y: 0.52 },
      { label: 'Ulna', x: 0.38, y: 0.79 },
    ],
    source: commons('X-ray of normal elbow by anteroposterior projection.jpg'),
  },
  {
    id: 'elbow-lateral',
    region: 'elbow',
    title: 'Elbow, lateral',
    width: 1086,
    height: 1103,
    lookFor: [
      'A line along the front of the humerus (the anterior humeral line) passes through the middle third of the capitulum.',
      'A line along the neck of the radius points at the capitulum in every view; if it misses, the radial head is out of place.',
      'A visible posterior fat pad, or an anterior one lifted like a sail, means fluid in the joint: look hard for a hidden fracture.',
    ],
    marks: [
      { label: 'Shaft of humerus', x: 0.74, y: 0.25 },
      { label: 'Capitulum and trochlea (overlapping)', x: 0.7, y: 0.73 },
      { label: 'Head of radius', x: 0.56, y: 0.69 },
      { label: 'Olecranon', x: 0.765, y: 0.8 },
      { label: 'Radius', x: 0.3, y: 0.74 },
      { label: 'Ulna', x: 0.3, y: 0.88 },
    ],
    source: commons('X-ray of normal elbow by lateral projection.jpg'),
  },
  {
    id: 'elbow-external-oblique',
    region: 'elbow',
    title: 'Elbow, external oblique',
    width: 770,
    height: 1133,
    lookFor: [
      'Turning the arm outwards clears the radial head and capitulum of the ulna, the view for a radial head fracture.',
    ],
    marks: [],
    source: commons('X-ray of normal elbow by 30 degrees external oblique projection.jpg'),
  },
  {
    id: 'elbow-internal-oblique',
    region: 'elbow',
    title: 'Elbow, internal oblique',
    width: 693,
    height: 1135,
    lookFor: [
      'Turning the arm inwards shows the coronoid process of the ulna clear of the radial head.',
    ],
    marks: [],
    source: commons('X-ray of normal elbow by 30 degrees internal oblique projection.jpg'),
  },
  {
    id: 'wrist-pa',
    region: 'wrist',
    title: 'Wrist and forearm, PA',
    width: 455,
    height: 1400,
    lookFor: [
      'The radial styloid reaches further down than the ulnar styloid.',
      'The carpal bones form smooth arcs; a break in an arc points to a carpal dislocation.',
      'The waist of the scaphoid is the commonest carpal fracture: it can be invisible at first, so tenderness in the snuffbox is treated as a fracture.',
    ],
    marks: [
      { label: 'Radius', x: 0.72, y: 0.55 },
      { label: 'Radial styloid', x: 0.85, y: 0.33 },
      { label: 'Ulna', x: 0.28, y: 0.55 },
      { label: 'Ulnar styloid', x: 0.31, y: 0.335 },
      { label: 'Scaphoid', x: 0.7, y: 0.27 },
      { label: 'Lunate', x: 0.48, y: 0.31 },
      { label: 'Capitate', x: 0.55, y: 0.235 },
    ],
    source: commons('X-ray of normal wrist by dorsoplantar projection.jpg'),
  },
  {
    id: 'wrist-lateral',
    region: 'wrist',
    title: 'Wrist, lateral',
    width: 446,
    height: 1400,
    lookFor: [
      'The radius, lunate and capitate sit in one column; a lunate tipped out of line suggests a dislocation.',
      'The end of the radius tilts slightly towards the palm (palmar tilt, about 11 degrees); a Colles fracture tilts it backwards.',
    ],
    marks: [],
    source: commons('X-ray of normal wrist by lateral projection.jpg'),
  },
  {
    id: 'hand-pa',
    region: 'hand',
    title: 'Hand, PA',
    width: 986,
    height: 1400,
    lookFor: [
      'Count the bones: 8 carpals, 5 metacarpals and 14 phalanges.',
      'A small sesamoid bone at the thumb’s metacarpophalangeal joint is normal.',
      'The joint spaces between the phalanges should be even and clear.',
    ],
    marks: [
      { label: 'Radius', x: 0.4, y: 0.925 },
      { label: 'Ulna', x: 0.23, y: 0.925 },
      { label: 'Capitate', x: 0.37, y: 0.78 },
      { label: 'First metacarpal', x: 0.64, y: 0.685 },
      { label: 'Sesamoid bone', x: 0.69, y: 0.62 },
      { label: 'Third metacarpal', x: 0.4, y: 0.575 },
      { label: 'Proximal phalanx', x: 0.43, y: 0.325 },
      { label: 'Middle phalanx', x: 0.44, y: 0.165 },
      { label: 'Distal phalanx', x: 0.45, y: 0.065 },
    ],
    source: commons('X-ray of normal hand by dorsoplantar projection.jpg'),
  },
  {
    id: 'hand-lateral',
    region: 'hand',
    title: 'Hand, lateral',
    width: 452,
    height: 1400,
    lookFor: [
      'The fingers overlap, but the view shows whether a bone or joint has moved towards the palm or the back of the hand.',
    ],
    marks: [],
    source: commons('X-ray of normal hand by lateral projection.jpg'),
  },
  {
    id: 'hand-oblique',
    region: 'hand',
    title: 'Hand, oblique',
    width: 669,
    height: 1400,
    lookFor: [
      'Tilting the hand separates metacarpals that overlap on the PA view, the view for metacarpal fractures.',
    ],
    marks: [],
    source: commons('X-ray of normal hand by oblique projection.jpg'),
  },
];

/** Which films each topic shows, by the region of the limb it covers. */
const REGIONS_BY_TOPIC: Record<string, XrayFilm['region'][]> = {
  'shoulder-joint': ['shoulder'],
  'shoulder-girdle': ['shoulder'],
  'deltoid-rotator-cuff': ['shoulder'],
  'scapular-spaces': ['shoulder'],
  'surface-marking': ['shoulder', 'elbow', 'wrist', 'hand'],
  'upper-limb-xrays': ['shoulder', 'elbow', 'wrist', 'hand'],
  'elbow-joint': ['elbow'],
  'cubital-fossa': ['elbow'],
  'elbow-anastomosis': ['elbow'],
  'arm-front': ['elbow'],
  'arm-back-radial': ['elbow'],
  'radioulnar-joints': ['elbow', 'wrist'],
  'forearm-flexors': ['wrist'],
  'forearm-extensors': ['wrist'],
  'forearm-vessels-nerves': ['wrist'],
  'carpal-tunnel': ['wrist'],
  'wrist-back': ['wrist'],
  'wrist-hand-joints': ['wrist', 'hand'],
  'hand-muscles': ['hand'],
  'palm-spaces': ['hand'],
  'palm-vessels-nerves': ['hand'],
};

export function filmsFor(slug: string): XrayFilm[] {
  const regions = REGIONS_BY_TOPIC[slug] ?? [];
  return XRAYS.filter((film) => regions.includes(film.region));
}
