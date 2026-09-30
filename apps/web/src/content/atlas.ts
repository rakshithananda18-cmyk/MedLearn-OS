/** One illustrated plate of the whole body, labelled by its artist. */
export interface AtlasPlate {
  id: string;
  /** "Front", "Back", or what the plate shows. */
  view: string;
  /** The body drawn: male, female, or either (a plate that does not show which). */
  body: 'male' | 'female' | 'either';
  width: number;
  height: number;
  credit: string;
  /** The original on Wikimedia Commons. */
  source: string;
}

/** A body system: its plates, a line on what it does, and the topics that study it. */
export interface AtlasSystem {
  id: string;
  name: string;
  about: string;
  plates: AtlasPlate[];
  /** Topics in the app that go into this system in the upper limb. */
  topics: string[];
}

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(' ', '_'))}`;

const RUIZ = 'Mariana Ruiz Villarreal (LadyofHats), public domain';
const BLAUSEN = 'BruceBlaus (Blausen Medical), CC BY 3.0';

export const ATLAS: AtlasSystem[] = [
  {
    id: 'skeleton',
    name: 'Skeleton',
    about:
      'The frame: 206 bones in the adult, the axial skeleton down the middle and the limbs hung from the girdles.',
    plates: [
      {
        id: 'skeleton-front',
        view: 'Front',
        body: 'either',
        width: 828,
        height: 1600,
        credit: RUIZ,
        source: commons('Human skeleton front en.svg'),
      },
      {
        id: 'skeleton-back',
        view: 'Back',
        body: 'either',
        width: 828,
        height: 1600,
        credit: RUIZ,
        source: commons('Human skeleton back en.svg'),
      },
    ],
    topics: [
      'shoulder-girdle',
      'shoulder-joint',
      'elbow-joint',
      'wrist-hand-joints',
      'upper-limb-xrays',
    ],
  },
  {
    id: 'muscles',
    name: 'Muscles',
    about:
      'The muscles that move the skeleton, seen from the front: superficial on one side of the body, deeper on the other.',
    plates: [
      {
        id: 'muscles-front',
        view: 'Front',
        body: 'male',
        width: 1600,
        height: 1569,
        credit: 'Mikael Häggström, public domain',
        source: commons('Muscles anterior labeled.png'),
      },
    ],
    topics: [
      'pectoral-region',
      'deltoid-rotator-cuff',
      'arm-front',
      'forearm-flexors',
      'hand-muscles',
    ],
  },
  {
    id: 'circulation',
    name: 'Circulation',
    about:
      'Arteries (red) carry blood out from the heart; veins (blue) bring it back. In the limbs they run together in pairs.',
    plates: [
      {
        id: 'circulation',
        view: 'Front',
        body: 'either',
        width: 1060,
        height: 1600,
        credit: RUIZ,
        source: commons('Circulatory System en.svg'),
      },
    ],
    topics: [
      'axillary-vessels',
      'forearm-vessels-nerves',
      'palm-vessels-nerves',
      'elbow-anastomosis',
      'skin-veins-lymph',
    ],
  },
  {
    id: 'nerves',
    name: 'Nerves',
    about:
      'The brain and spinal cord, and the nerves they send out: plexuses gather the roots for each limb, like the brachial plexus for the arm.',
    plates: [
      {
        id: 'nerves',
        view: 'Front',
        body: 'either',
        width: 1440,
        height: 1600,
        credit: 'Medium69 and Jmarchn, CC BY-SA 4.0',
        source: commons('Nervous system diagram-en.svg'),
      },
    ],
    topics: ['brachial-plexus', 'arm-back-radial', 'nerve-injuries'],
  },
  {
    id: 'lymph',
    name: 'Lymph',
    about:
      'Lymph vessels drain tissue fluid through chains of nodes back into the veins of the neck; the breast drains mostly to the axillary nodes.',
    plates: [
      {
        id: 'lymph-female',
        view: 'Front',
        body: 'female',
        width: 1600,
        height: 1477,
        credit: BLAUSEN,
        source: commons('Blausen 0623 LymphaticSystem Female.png'),
      },
    ],
    topics: ['axillary-lymph-nodes', 'pectoral-region', 'skin-veins-lymph'],
  },
  {
    id: 'digestion',
    name: 'Digestion',
    about: 'The gut from mouth to anus, with the liver, gallbladder and pancreas that serve it.',
    plates: [
      {
        id: 'digestion',
        view: 'Front',
        body: 'either',
        width: 1132,
        height: 1600,
        credit: 'Mariana Ruiz Villarreal and Jmarchn, public domain',
        source: commons('Digestive system diagram en.svg'),
      },
    ],
    topics: [],
  },
  {
    id: 'reproductive',
    name: 'Reproductive',
    about: 'The female reproductive organs: ovaries, uterine tubes, uterus, cervix and vagina.',
    plates: [
      {
        id: 'reproductive-female',
        view: 'Female',
        body: 'female',
        width: 1600,
        height: 1600,
        credit: BLAUSEN,
        source: commons('Blausen 0399 FemaleReproSystem 01.png'),
      },
    ],
    topics: [],
  },
];

export type AtlasBody = 'male' | 'female';

/**
 * A system's plates for the body chosen: those drawn for that body or for either. With none, the
 * plates it has are shown anyway, with a note that the other body is still to come.
 */
export function platesFor(
  system: AtlasSystem,
  body: AtlasBody,
): { plates: AtlasPlate[]; missing: boolean } {
  const fit = system.plates.filter((plate) => plate.body === body || plate.body === 'either');
  return fit.length > 0
    ? { plates: fit, missing: false }
    : { plates: system.plates, missing: true };
}
