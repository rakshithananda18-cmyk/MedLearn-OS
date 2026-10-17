import type { BodyRegion, Model3D, Point3 } from '@medlearn/schemas';
import type { LayerKind } from '@medlearn/visuals/viewer3d';

export interface BodyRegionInfo {
  id: BodyRegion;
  name: string;
  /** Where the region's name points on the body (BodyParts3D frame, millimetres). */
  marker: Point3;
  /** How far the region reaches from there, in millimetres: picking it brings it this close. */
  reach: number;
}

// The points sit just off the body surface, measured from the model; the limbs are marked on the
// right side, as in the topic models. The body file has each region's surface as a part with the
// region's id (scripts/models/build-models.mjs).
/** Body regions in the order of the standard books' volumes. */
export const BODY_REGIONS: BodyRegionInfo[] = [
  { id: 'upper-limb', name: 'Upper limb', marker: [-228, -128, 1130], reach: 260 },
  { id: 'thorax', name: 'Thorax', marker: [0, -228, 1240], reach: 180 },
  { id: 'abdomen', name: 'Abdomen', marker: [0, -232, 1060], reach: 150 },
  { id: 'pelvis', name: 'Pelvis', marker: [0, -218, 905], reach: 130 },
  { id: 'lower-limb', name: 'Lower limb', marker: [-95, -190, 600], reach: 300 },
  { id: 'head-neck', name: 'Head and neck', marker: [0, -200, 1540], reach: 120 },
  { id: 'back', name: 'Back', marker: [0, 42, 1210], reach: 200 },
];

export type BodySystemId =
  'skin' | 'skeleton' | 'muscles' | 'arteries' | 'veins' | 'nerves' | 'lymph' | 'organs';

/** One system of the body: its name, what it is made of, and its file (none for the skin). */
export interface BodySystem {
  id: BodySystemId;
  name: string;
  kind: LayerKind;
  /** The system's file, loaded the first time it is switched on; the skin is in the body file. */
  src: string | null;
}

// A new version in the address whenever the files are rebuilt, so phones fetch them again.
const SYSTEMS_VERSION = 3;
const systemFile = (id: string) => `/models/body-${id}.glb?v=${SYSTEMS_VERSION}`;

/** The one body's systems, from the surface in; each can be switched on and off. */
export const BODY_SYSTEMS: BodySystem[] = [
  { id: 'skin', name: 'Skin', kind: 'skin', src: null },
  { id: 'skeleton', name: 'Skeleton', kind: 'bone', src: systemFile('skeleton') },
  { id: 'muscles', name: 'Muscles', kind: 'muscle', src: systemFile('muscles') },
  { id: 'arteries', name: 'Arteries', kind: 'artery', src: systemFile('arteries') },
  { id: 'veins', name: 'Veins', kind: 'vein', src: systemFile('veins') },
  { id: 'nerves', name: 'Nervous system', kind: 'nerve', src: systemFile('nerves') },
  { id: 'lymph', name: 'Lymph nodes', kind: 'lymph', src: systemFile('lymph') },
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
    'Body and its systems: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP). Nervous system, lymph nodes, lungs and liver: Z-Anatomy, CC BY-SA 4.0.',
  parts: [
    // The surface, region by region: a region tints under the pointer and opens its topics when
    // picked.
    ...BODY_REGIONS.map((region) => ({
      id: region.id,
      name: region.name,
      kind: 'skin' as const,
      about: `The ${region.name.toLowerCase()} of the body in the anatomical position. Pick it to see its topics, then tap inside it for its structures.`,
    })),
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
