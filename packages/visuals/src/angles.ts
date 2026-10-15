/** The angles a lesson can let the student set, by the id a lesson step names. */
export type AngleId = 'neck-shaft' | 'carrying';

/** A stretch of the angle's range, up to and including `upTo` degrees, and what it means. */
export interface AngleZone {
  upTo: number;
  name: string;
  note: string;
  /** Within the normal range. */
  normal: boolean;
}

export interface AngleSpec {
  id: AngleId;
  title: string;
  min: number;
  max: number;
  /** Where the slider starts: the usual adult value. */
  start: number;
  /** In order; the last reaches `max`. */
  zones: AngleZone[];
  /** Values worth knowing, ticked under the slider. */
  marks: { at: number; label: string }[];
  /** The bone drawing: the upper femur from the front, or the arm and forearm from the front. */
  shape: 'femur' | 'elbow';
}

// Facts in our own words (BD Chaurasia Vol 1 p 166 to 167; Vol 2 p 21 and 202); not yet reviewed.
export const ANGLES: Record<AngleId, AngleSpec> = {
  'neck-shaft': {
    id: 'neck-shaft',
    title: 'Neck-shaft angle of the femur',
    min: 95,
    max: 160,
    start: 125,
    zones: [
      {
        upTo: 119,
        name: 'Coxa vara',
        note: 'The neck droops towards the shaft. The limb is shorter, the greater trochanter rides higher, and the hip abductors pull at a poorer angle, so the gait may lurch.',
        normal: false,
      },
      {
        upTo: 135,
        name: 'Normal adult',
        note: 'About 125 degrees, a little less in women. The angle holds the shaft clear of the pelvis so the hip can swing, and passes weight from the head down the shaft, braced on its inner side by the calcar femorale.',
        normal: true,
      },
      {
        upTo: 160,
        name: 'Wider than an adult’s',
        note: 'About 140 degrees is normal in a young child; the angle narrows with growth. In an adult this is coxa valga: the neck stands more upright and the limb is a little longer.',
        normal: false,
      },
    ],
    marks: [
      { at: 125, label: 'Adult' },
      { at: 140, label: 'Child' },
    ],
    shape: 'femur',
  },
  carrying: {
    id: 'carrying',
    title: 'Carrying angle of the elbow',
    min: -20,
    max: 35,
    start: 13,
    zones: [
      {
        upTo: 4,
        name: 'Cubitus varus',
        note: 'The angle is lost or reversed, the forearm pointing towards the body (a gunstock deformity), most often after a supracondylar fracture in a child that joins tilted.',
        normal: false,
      },
      {
        upTo: 20,
        name: 'Normal',
        note: 'About 13 degrees: 10 to 15 in men, more than 15 in women. It comes from the medial flange of the trochlea reaching about 6 mm lower than the lateral, and it vanishes in full flexion and in pronation.',
        normal: true,
      },
      {
        upTo: 35,
        name: 'Cubitus valgus',
        note: 'The forearm angles out too far. Over the years the ulnar nerve, behind the medial epicondyle, is stretched, and the small muscles of the hand weaken.',
        normal: false,
      },
    ],
    marks: [
      { at: 0, label: 'Straight' },
      { at: 13, label: 'Average' },
    ],
    shape: 'elbow',
  },
};

/** Which zone an angle falls in. */
export function zoneAt(spec: AngleSpec, angle: number): AngleZone {
  const last = spec.zones.at(-1);
  if (!last) throw new Error(`${spec.id} has no zones`);
  return spec.zones.find((zone) => angle <= zone.upTo) ?? last;
}

/**
 * The end of a bone drawn from `from`, `length` long, turned `degrees` from straight down: to the
 * viewer's left for a positive angle (the femoral neck towards the body's midline), to the right
 * for `side` -1 (the forearm away from the body). SVG coordinates, y down.
 */
export function boneEnd(
  from: [number, number],
  length: number,
  degrees: number,
  side: 1 | -1 = 1,
): [number, number] {
  const radians = (degrees * Math.PI) / 180;
  return [from[0] - side * length * Math.sin(radians), from[1] + length * Math.cos(radians)];
}
