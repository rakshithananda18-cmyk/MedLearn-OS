// What the 3D studio needs of the X-ray films without the films themselves (content/xrays.ts,
// handed to it by the server): the regions, the bones each region's films light on the body,
// and the credit shown under every film.

export type FilmRegion = 'shoulder' | 'elbow' | 'wrist' | 'hand' | 'hip' | 'ankle';

const rightBones = (...names: string[]) => names.map((name) => `skeleton/right-${name}`);
const CARPALS = ['scaphoid', 'lunate', 'pisiform', 'trapezium', 'trapezoid', 'capitate', 'hamate'];
const METACARPALS = ['first', 'second', 'third', 'fourth', 'fifth'].map(
  (place) => `${place}-metacarpal-bone`,
);

/**
 * The bones each region's films show, on the one body (its right side, like the topic models):
 * lit while a film is open on the whole body, and where the camera turns.
 */
export const FILM_BONES: Record<FilmRegion, string[]> = {
  shoulder: rightBones('humerus', 'scapula', 'clavicle'),
  elbow: rightBones('humerus', 'radius', 'ulna'),
  wrist: rightBones('radius', 'ulna', ...CARPALS),
  hand: rightBones(...CARPALS, ...METACARPALS),
  hip: rightBones('hip-bone', 'femur'),
  ankle: rightBones('tibia', 'fibula', 'talus', 'calcaneus'),
};

/** Who made the films, and their licence: shown under every film. */
export const XRAY_CREDIT = 'Radiographs: Mikael Häggström, CC0, via Wikimedia Commons';
