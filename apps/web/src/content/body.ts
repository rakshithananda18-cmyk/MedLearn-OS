import type { BodyRegion, Model3D, Point3 } from '@medlearn/schemas';
import type { LayerKind } from '@medlearn/visuals/viewer3d';

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

export type BodySystemId =
  'skin' | 'skeleton' | 'muscles' | 'arteries' | 'veins' | 'nerves' | 'organs';

/** One system of the body: its name, what it is made of, and its file (none for the skin). */
export interface BodySystem {
  id: BodySystemId;
  name: string;
  kind: LayerKind;
  /** The system's file, loaded the first time it is switched on; the skin is in the body file. */
  src: string | null;
}

// A new version in the address whenever the files are rebuilt, so phones fetch them again.
const SYSTEMS_VERSION = 1;
const systemFile = (id: string) => `/models/body-${id}.glb?v=${SYSTEMS_VERSION}`;

/** The one body's systems, from the surface in; each can be switched on and off. */
export const BODY_SYSTEMS: BodySystem[] = [
  { id: 'skin', name: 'Skin', kind: 'skin', src: null },
  { id: 'skeleton', name: 'Skeleton', kind: 'bone', src: systemFile('skeleton') },
  { id: 'muscles', name: 'Muscles', kind: 'muscle', src: systemFile('muscles') },
  { id: 'arteries', name: 'Arteries', kind: 'artery', src: systemFile('arteries') },
  { id: 'veins', name: 'Veins', kind: 'vein', src: systemFile('veins') },
  { id: 'nerves', name: 'Nervous system', kind: 'nerve', src: systemFile('nerves') },
  { id: 'organs', name: 'Organs', kind: 'organ', src: systemFile('organs') },
];

/** What the body opens with: the surface over the skeleton. */
export const FIRST_SYSTEMS: ReadonlySet<BodySystemId> = new Set(['skin', 'skeleton']);

/**
 * A structure picked on the body, from its id ("skeleton/left-humerus"): its system and its name
 * ("Left humerus"), and the words to look it up by, without the side ("humerus").
 */
export function bodyStructure(id: string) {
  const [systemId, slug = ''] = id.split('/');
  const system = BODY_SYSTEMS.find((item) => item.id === systemId);
  const words = slug.replaceAll('-', ' ');
  return {
    system,
    name: words.charAt(0).toUpperCase() + words.slice(1),
    search: words.replace(/^(left|right) /, ''),
  };
}

export const BODY_MODEL: Model3D = {
  src: '/models/body.glb',
  credit:
    'Body and its systems: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP).',
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
