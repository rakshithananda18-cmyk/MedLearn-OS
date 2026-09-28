import type { BodyRegion, Model3D, Point3 } from '@medlearn/schemas';

export interface BodyRegionInfo {
  id: BodyRegion;
  name: string;
  /** Where the region's marker sits on the body model (BodyParts3D frame, millimetres). */
  marker: Point3;
}

// Markers sit just off the body surface, measured from the model; the limbs are marked on the
// right side, as in the topic models.
/** Body regions in the order of the standard books' volumes. */
export const BODY_REGIONS: BodyRegionInfo[] = [
  { id: 'upper-limb', name: 'Upper limb', marker: [-228, -128, 1130] },
  { id: 'thorax', name: 'Thorax', marker: [0, -228, 1240] },
  { id: 'abdomen', name: 'Abdomen', marker: [0, -232, 1060] },
  { id: 'pelvis', name: 'Pelvis', marker: [0, -218, 905] },
  { id: 'lower-limb', name: 'Lower limb', marker: [-95, -190, 600] },
  { id: 'head-neck', name: 'Head and neck', marker: [0, -200, 1540] },
  { id: 'back', name: 'Back', marker: [0, 42, 1210] },
];

export const BODY_MODEL: Model3D = {
  src: '/models/body.glb',
  credit:
    'Body surface and skeleton: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP).',
  parts: [
    {
      id: 'skin',
      name: 'Body surface',
      kind: 'skin',
      about: 'The whole body in the anatomical position. Pick a region to see its topics.',
    },
    {
      id: 'skeleton',
      name: 'Skeleton',
      kind: 'bone',
      about: 'The bones of the whole body, the frame every region is built on.',
    },
  ],
  traces: [],
  stops: [
    {
      id: 'front',
      title: 'Front',
      description: 'The body from the front.',
      target: [0, -100, 850],
      position: [0, -3300, 1000],
    },
    {
      id: 'back',
      title: 'Back',
      description: 'The body from behind.',
      target: [0, -100, 850],
      position: [0, 3100, 1000],
    },
  ],
};
