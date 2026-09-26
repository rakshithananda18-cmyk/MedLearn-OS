import type { Point3 } from '@medlearn/schemas';

/** Centre of the region of interest in the model frame (BodyParts3D millimetres, Z up). */
export const MODEL_ORIGIN: Point3 = [-120, -80, 1250];
const METRES_PER_MM = 0.001;

/**
 * Model frame to scene frame: centred on the shoulder, millimetres to metres, Z up to Y up
 * (the back of the body faces away from the camera). Meshes and nerves stay in model units
 * inside one group; this is the same mapping, used for camera stops.
 */
export function toScene([x, y, z]: Point3): [number, number, number] {
  return [
    (x - MODEL_ORIGIN[0]) * METRES_PER_MM,
    (z - MODEL_ORIGIN[2]) * METRES_PER_MM,
    -(y - MODEL_ORIGIN[1]) * METRES_PER_MM,
  ];
}

/** The group transform that applies toScene to everything drawn in model units. */
export const MODEL_GROUP = {
  position: toScene([0, 0, 0]),
  rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
  scale: METRES_PER_MM,
};

/** True when this device can show the 3D view: WebGL2 and more than 2 GB of memory. */
export function supports3D(
  canvas: { getContext: (type: 'webgl2') => unknown } = document.createElement('canvas'),
  memoryGb: number | undefined = (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
): boolean {
  if (memoryGb !== undefined && memoryGb <= 2) return false;
  try {
    return canvas.getContext('webgl2') !== null;
  } catch {
    return false;
  }
}
