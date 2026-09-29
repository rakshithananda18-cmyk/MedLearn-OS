import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { between, SUPERFICIAL_RADIAL_NERVE } from './forearm-3d';
import { EXTENSOR_RETINACULUM, SNUFFBOX } from './hand-3d';
import {
  HAND_BONES,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

const COMPARTMENTS = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

// Upper limb batch 4 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const wristBack: Topic = {
  slug: 'wrist-back',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Wrist: extensor retinaculum and anatomical snuffbox',
  summary:
    'The six tunnels under the extensor retinaculum, the anatomical snuffbox with the radial artery in its floor, and the veins on the back of the hand.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 9 Forearm and Hand, pages 144 to 147'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, hand, pages 792 to 794'),
    {
      title: 'TeachMeAnatomy: The Anatomical Snuffbox',
      url: 'https://teachmeanatomy.info/upper-limb/areas/anatomical-snuffbox/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones, tendons, arteries and veins in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The extensor retinaculum is a band of deep fascia across the back of the wrist, from the lower radius laterally to the pisiform and triquetral medially.',
    'Septa divide the space under it into six compartments, lateral to medial: (1) abductor pollicis longus and extensor pollicis brevis; (2) extensor carpi radialis longus and brevis; (3) extensor pollicis longus; (4) extensor digitorum and extensor indicis; (5) extensor digiti minimi; (6) extensor carpi ulnaris.',
    'The anatomical snuffbox lies between the tendons of abductor pollicis longus and extensor pollicis brevis in front and extensor pollicis longus behind.',
    'Its floor is the scaphoid and trapezium, with the radial artery crossing it; the cephalic vein begins and the superficial radial nerve crosses over its roof.',
    'Tenderness in the snuffbox after a fall suggests a fractured scaphoid.',
  ],
  visual: {
    kind: 'path',
    // Top: the retinaculum and its six compartments with their tendons. Bottom: the snuffbox,
    // its floor and contents, and the veins over it.
    diagram: {
      width: 380,
      height: 570,
      nodes: [
        {
          id: 'extensor-retinaculum',
          label: 'Extensor\nretinaculum',
          name: 'Extensor retinaculum',
          x: 50,
          y: 205,
        },
        ...COMPARTMENTS.map((label, index) => ({
          id: `c${index + 1}`,
          label,
          name: `${label} compartment`,
          x: 130,
          y: 80 + index * 50,
        })),
        {
          id: 'abductor-pollicis-longus',
          label: 'Abd. pollicis\nlongus',
          name: 'Abductor pollicis longus',
          x: 225,
          y: 80,
        },
        {
          id: 'extensor-pollicis-brevis',
          label: 'Ext. pollicis\nbrevis',
          name: 'Extensor pollicis brevis',
          x: 327,
          y: 80,
        },
        {
          id: 'extensor-carpi-radialis-longus',
          label: 'Ext. carpi\nrad. longus',
          name: 'Extensor carpi radialis longus',
          x: 225,
          y: 130,
        },
        {
          id: 'extensor-carpi-radialis-brevis',
          label: 'Ext. carpi\nrad. brevis',
          name: 'Extensor carpi radialis brevis',
          x: 327,
          y: 130,
        },
        {
          id: 'extensor-pollicis-longus',
          label: 'Ext. pollicis\nlongus',
          name: 'Extensor pollicis longus',
          x: 225,
          y: 180,
        },
        {
          id: 'extensor-digitorum',
          label: 'Extensor\ndigitorum',
          name: 'Extensor digitorum',
          x: 225,
          y: 230,
        },
        {
          id: 'extensor-indicis',
          label: 'Extensor\nindicis',
          name: 'Extensor indicis',
          x: 327,
          y: 230,
        },
        {
          id: 'extensor-digiti-minimi',
          label: 'Ext. digiti\nminimi',
          name: 'Extensor digiti minimi',
          x: 225,
          y: 280,
        },
        {
          id: 'extensor-carpi-ulnaris',
          label: 'Ext. carpi\nulnaris',
          name: 'Extensor carpi ulnaris',
          x: 225,
          y: 330,
        },
        {
          id: 'snuffbox',
          label: 'Anatomical\nsnuffbox',
          name: 'Anatomical snuffbox',
          x: 190,
          y: 400,
        },
        { id: 'radial-artery', label: 'Radial\nartery', name: 'Radial artery', x: 60, y: 470 },
        { id: 'scaphoid', label: 'Scaphoid', name: 'Scaphoid, in the floor', x: 160, y: 470 },
        { id: 'trapezium', label: 'Trapezium', name: 'Trapezium, in the floor', x: 250, y: 470 },
        {
          id: 'superficial-radial',
          label: 'Superficial\nradial n.',
          name: 'Superficial branch of the radial nerve',
          x: 335,
          y: 470,
        },
        {
          id: 'cephalic-vein',
          label: 'Cephalic\nvein',
          name: 'Cephalic vein',
          x: 190,
          y: 540,
        },
        {
          id: 'dorsal-venous-network',
          label: 'Dorsal venous\nnetwork',
          name: 'Dorsal venous network of the hand',
          x: 320,
          y: 540,
        },
      ],
      edges: [
        ...COMPARTMENTS.map((_, index) => ({ from: 'extensor-retinaculum', to: `c${index + 1}` })),
        { from: 'c1', to: 'abductor-pollicis-longus' },
        { from: 'c1', to: 'extensor-pollicis-brevis' },
        { from: 'c2', to: 'extensor-carpi-radialis-longus' },
        { from: 'c2', to: 'extensor-carpi-radialis-brevis' },
        { from: 'c3', to: 'extensor-pollicis-longus' },
        { from: 'c4', to: 'extensor-digitorum' },
        { from: 'c4', to: 'extensor-indicis' },
        { from: 'c5', to: 'extensor-digiti-minimi' },
        { from: 'c6', to: 'extensor-carpi-ulnaris' },
        { from: 'snuffbox', to: 'radial-artery' },
        { from: 'snuffbox', to: 'scaphoid' },
        { from: 'snuffbox', to: 'trapezium' },
        { from: 'snuffbox', to: 'superficial-radial' },
        { from: 'snuffbox', to: 'cephalic-vein' },
        { from: 'dorsal-venous-network', to: 'cephalic-vein' },
      ],
    },
    lesions: [
      {
        id: 'de-quervain',
        label: 'De Quervain tenosynovitis',
        nodeIds: ['c1', 'abductor-pollicis-longus', 'extensor-pollicis-brevis'],
        explanation:
          'The sheath of the first compartment thickens and narrows, often in new mothers and with repeated thumb use. The radial side of the wrist hurts over the styloid of the radius. Bending the thumb into the palm and then tilting the wrist towards the little finger brings on sharp pain (Finkelstein test).',
      },
      {
        id: 'scaphoid-fracture',
        label: 'Fractured scaphoid',
        nodeIds: ['scaphoid', 'snuffbox'],
        explanation:
          'A fall on the outstretched hand can break the waist of the scaphoid. The snuffbox is tender, but the first X-ray may look normal. Blood enters the scaphoid mainly from its distal end, so the proximal fragment can lose its supply and die (avascular necrosis) if the fracture is missed.',
      },
      {
        id: 'epl-rupture',
        label: 'Ruptured extensor pollicis longus',
        nodeIds: ['c3', 'extensor-pollicis-longus'],
        explanation:
          'The tendon turns round the dorsal tubercle of the radius in the third compartment. Weeks after a fracture of the lower radius it can fray there and snap. The student cannot lift the thumb off a flat table, and the back edge of the snuffbox disappears.',
      },
    ],
    drill: [
      {
        id: 'compartments',
        title: 'Six compartments',
        hint: 'Lateral to medial, with the tendons in each.',
        nodeIds: [
          'c1',
          'c2',
          'c3',
          'c4',
          'c5',
          'c6',
          'abductor-pollicis-longus',
          'extensor-pollicis-brevis',
          'extensor-carpi-radialis-longus',
          'extensor-carpi-radialis-brevis',
          'extensor-pollicis-longus',
          'extensor-digitorum',
          'extensor-indicis',
          'extensor-digiti-minimi',
          'extensor-carpi-ulnaris',
        ],
      },
      {
        id: 'snuffbox',
        title: 'Anatomical snuffbox',
        hint: 'Two bones in the floor, the artery on them, and what crosses the roof.',
        nodeIds: [
          'radial-artery',
          'scaphoid',
          'trapezium',
          'superficial-radial',
          'cephalic-vein',
          'dorsal-venous-network',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Retinaculum, snuffbox and nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'abductor-pollicis-longus',
        'extensor-pollicis-brevis',
        'extensor-carpi-radialis-longus',
        'extensor-carpi-radialis-brevis',
        'extensor-pollicis-longus',
        'extensor-digitorum',
        'extensor-indicis',
        'extensor-digiti-minimi',
        'extensor-carpi-ulnaris',
        'radial-artery',
        'dorsal-carpal-branches',
        'dorsal-metacarpal-arteries',
        'dorsal-venous-network',
        'cephalic-vein',
        'basilic-vein',
        'radius',
        'ulna',
        ...HAND_BONES,
      ]),
      traces: [
        { id: 'extensor-retinaculum', kind: 'outline', paths: EXTENSOR_RETINACULUM },
        { id: 'snuffbox', kind: 'outline', paths: SNUFFBOX },
        {
          id: 'superficial-radial',
          kind: 'nerve',
          paths: between(SUPERFICIAL_RADIAL_NERVE, 700, 900),
        },
      ],
      stops: [
        {
          id: 'back',
          title: 'Back of the wrist',
          description:
            'The retinaculum crosses the back of the wrist, holding the extensor tendons down in six tunnels as they pass from the forearm to the hand.',
          target: [-258, -105, 800],
          position: [-334, 263, 857],
        },
        {
          id: 'snuffbox',
          title: 'Anatomical snuffbox',
          description:
            'With the thumb stretched out, a hollow appears between the tendons: abductor pollicis longus and extensor pollicis brevis in front, extensor pollicis longus behind. The radial artery crosses its floor on the scaphoid and trapezium.',
          target: [-284, -118, 795],
          position: [-544, 19, 856],
        },
        {
          id: 'dorsum',
          title: 'Back of the hand',
          description:
            'The dorsal venous network drains to the cephalic vein on the thumb side and the basilic vein on the little finger side. The extensor tendons fan out beneath it to the fingers.',
          target: [-262, -115, 760],
          position: [-299, 251, 853],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'retinaculum',
      title: 'Extensor retinaculum',
      body: 'A thickened band of deep fascia runs obliquely across the back of the wrist, from the front edge of the lower radius on the lateral side to the pisiform and triquetral on the medial side. It keeps the extensor tendons from bowstringing when the wrist bends back.',
      focus: ['extensor-retinaculum'],
    },
    {
      id: 'compartments',
      title: 'Six compartments',
      body: 'Septa from its deep surface to the radius and ulna make six tunnels, each with a synovial sheath. Lateral to medial: abductor pollicis longus and extensor pollicis brevis; the two radial wrist extensors; extensor pollicis longus, turning round the dorsal tubercle of the radius; extensor digitorum and extensor indicis, with the posterior interosseous nerve; extensor digiti minimi; and extensor carpi ulnaris in the groove beside the ulnar styloid.',
      focus: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'],
    },
    {
      id: 'snuffbox',
      title: 'Anatomical snuffbox',
      body: 'Stretch the thumb out and a triangular hollow appears on the back of the wrist at its base. Its front boundary is the tendons of abductor pollicis longus and extensor pollicis brevis, its back boundary the tendon of extensor pollicis longus, and its base the styloid of the radius.',
      focus: [
        'snuffbox',
        'abductor-pollicis-longus',
        'extensor-pollicis-brevis',
        'extensor-pollicis-longus',
      ],
    },
    {
      id: 'floor-roof',
      title: 'Floor, contents and roof',
      body: 'Its floor is the scaphoid and trapezium, with the radial artery crossing them on its way to the back of the hand; its pulse can be felt here. Over the roof run the start of the cephalic vein and branches of the superficial radial nerve.',
      focus: ['scaphoid', 'trapezium', 'radial-artery', 'cephalic-vein', 'superficial-radial'],
    },
    {
      id: 'dorsum',
      title: 'Back of the hand',
      body: 'The skin of the back of the hand is thin and loose, so swelling from an infection in the palm often shows here. The dorsal venous network drains to the cephalic and basilic veins. The superficial radial nerve supplies the lateral half of the back of the hand and the ulnar nerve the medial half.',
      focus: ['dorsal-venous-network', 'cephalic-vein', 'superficial-radial'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each compartment to see its tendons, and the snuffbox to see its walls. Then turn on an injury to see what happens.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'wrist-back-first-compartment',
      prompt: 'The first compartment under the extensor retinaculum holds:',
      options: [
        { id: 'apl-epb', text: 'Abductor pollicis longus and extensor pollicis brevis' },
        { id: 'ecrl-ecrb', text: 'The two radial wrist extensors' },
        { id: 'epl', text: 'Extensor pollicis longus' },
        { id: 'ecu', text: 'Extensor carpi ulnaris' },
      ],
      answerId: 'apl-epb',
      explanation: 'Its sheath is the one that narrows in De Quervain tenosynovitis.',
    },
    {
      id: 'wrist-back-snuffbox-floor',
      prompt: 'Which artery crosses the floor of the anatomical snuffbox?',
      options: [
        { id: 'radial', text: 'Radial artery' },
        { id: 'ulnar', text: 'Ulnar artery' },
        { id: 'anterior-interosseous', text: 'Anterior interosseous artery' },
        { id: 'princeps', text: 'Princeps pollicis artery' },
      ],
      answerId: 'radial',
      explanation:
        'The radial artery winds round the wrist over the scaphoid and trapezium, then enters the palm through the first dorsal interosseous.',
    },
    {
      id: 'wrist-back-snuffbox-posterior',
      prompt: 'The back (medial) boundary of the anatomical snuffbox is the tendon of:',
      options: [
        { id: 'epl', text: 'Extensor pollicis longus' },
        { id: 'epb', text: 'Extensor pollicis brevis' },
        { id: 'apl', text: 'Abductor pollicis longus' },
        { id: 'ecrl', text: 'Extensor carpi radialis longus' },
      ],
      answerId: 'epl',
      explanation:
        'Extensor pollicis longus behind; abductor pollicis longus and extensor pollicis brevis in front.',
    },
    {
      id: 'wrist-back-scaphoid',
      prompt: 'Why can the proximal part of a fractured scaphoid die?',
      options: [
        { id: 'distal-supply', text: 'Its blood enters mainly from the distal end' },
        { id: 'no-supply', text: 'The scaphoid has no blood supply of its own' },
        { id: 'ulnar', text: 'It is supplied only by the ulnar artery' },
        { id: 'tendons', text: 'Tendons compress it' },
      ],
      answerId: 'distal-supply',
      explanation:
        'Vessels enter the scaphoid mainly at its distal end, so a break across its waist can cut off the proximal fragment.',
    },
  ],
  cards: [
    {
      id: 'wrist-back-compartments',
      front: 'The six extensor compartments, lateral to medial?',
      back: '1 APL, EPB. 2 ECRL, ECRB. 3 EPL. 4 extensor digitorum, extensor indicis. 5 extensor digiti minimi. 6 ECU.',
    },
    {
      id: 'wrist-back-attachments',
      front: 'Attachments of the extensor retinaculum?',
      back: 'Laterally the front edge of the lower radius; medially the pisiform and triquetral.',
    },
    {
      id: 'wrist-back-snuffbox-boundaries',
      front: 'Boundaries of the anatomical snuffbox?',
      back: 'Front: abductor pollicis longus and extensor pollicis brevis. Back: extensor pollicis longus. Base: radial styloid.',
    },
    {
      id: 'wrist-back-snuffbox-contents',
      front: 'Floor and contents of the anatomical snuffbox?',
      back: 'Floor: scaphoid and trapezium. Contents: radial artery. Roof: cephalic vein and superficial radial nerve.',
    },
    {
      id: 'wrist-back-finkelstein',
      front: 'What does the Finkelstein test detect?',
      back: 'De Quervain tenosynovitis of the first extensor compartment (abductor pollicis longus and extensor pollicis brevis).',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 9 Forearm and Hand', pages: '144–147' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '792–794' },
  ],
};
