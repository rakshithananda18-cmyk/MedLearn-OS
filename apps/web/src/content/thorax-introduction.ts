import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  CAGE_BONES,
  FRONT_OF_CAGE,
  THORAX_MODEL_CREDIT,
  THORAX_MODEL_SRC,
  thoraxParts,
} from './thorax-3d';

// Thorax batch 1 (Blueprint v0.6: after the upper limb, BD Volume 1 Section 2). Facts in our own
// words; `reviewed: false` until a student checks the topic against the book pages.
export const thoraxIntroduction: Topic = {
  slug: 'thorax-introduction',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Thorax: landmarks, inlet and outlet',
  summary:
    'The bony landmarks that locate everything in the chest, and the openings at its top and bottom.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 12 Introduction (Thorax), pages 209 to 218'),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, conceptual overview: thoracic wall and apertures, pages 125 to 132',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones and muscles in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Sternal angle: second costal cartilage in front, disc between T4 and T5 behind. Count ribs from here.',
    'Suprasternal notch at the lower border of T2; xiphisternal joint at T9.',
    'Inlet: upper border of the manubrium, body of T1 and the first ribs, sloping down and forwards; Sibson’s fascia roofs it over the lung apex.',
    'Outlet: infrasternal angle, body of T12 and the costal margins, closed by the diaphragm.',
    'Diaphragm openings: vena caval at T8, oesophageal at T10, aortic at T12.',
  ],
  visual: {
    kind: 'path',
    // Each feature on the left, with what makes or passes through it to the right.
    diagram: {
      width: 360,
      height: 400,
      nodes: [
        {
          id: 'landmarks',
          label: 'Landmarks',
          name: 'Landmarks of the front of the chest',
          x: 50,
          y: 30,
        },
        {
          id: 'notch',
          label: 'Supra-\nsternal notch',
          name: 'Suprasternal notch, at the lower border of T2',
          x: 145,
          y: 30,
        },
        {
          id: 'sternal-angle',
          label: 'Sternal\nangle',
          name: 'Sternal angle, at the second costal cartilage and the T4–T5 disc',
          x: 225,
          y: 30,
        },
        {
          id: 'xiphisternal',
          label: 'Xiphi-\nsternal joint',
          name: 'Xiphisternal joint, at T9',
          x: 305,
          y: 30,
        },
        {
          id: 'inlet',
          label: 'Inlet',
          name: 'Inlet (superior aperture) of the thorax',
          x: 50,
          y: 116,
        },
        {
          id: 'manubrium-border',
          label: 'Manubrium',
          name: 'Upper border of the manubrium, in front',
          x: 145,
          y: 116,
        },
        {
          id: 'first-rib',
          label: 'First ribs',
          name: 'First ribs and their cartilages, at the sides',
          x: 225,
          y: 116,
        },
        {
          id: 't1',
          label: 'T1 body',
          name: 'Body of the first thoracic vertebra, behind',
          x: 305,
          y: 116,
        },
        {
          id: 'sibson',
          label: 'Sibson’s\nfascia',
          name: 'Suprapleural membrane (Sibson’s fascia), over the lung apex',
          x: 185,
          y: 176,
        },
        {
          id: 'inlet-contents',
          label: 'Passing\nthrough',
          name: 'Trachea, oesophagus, great vessels, phrenic and vagus nerves, passing through the inlet',
          x: 285,
          y: 176,
        },
        {
          id: 'outlet',
          label: 'Outlet',
          name: 'Outlet (inferior aperture) of the thorax',
          x: 50,
          y: 262,
        },
        {
          id: 'infrasternal-angle',
          label: 'Infra-\nsternal angle',
          name: 'Infrasternal angle, in front',
          x: 145,
          y: 262,
        },
        {
          id: 'costal-margin',
          label: 'Costal\nmargins',
          name: 'Costal margins: cartilages of ribs 7 to 12, at the sides',
          x: 225,
          y: 262,
        },
        {
          id: 't12',
          label: 'T12 body',
          name: 'Body of the twelfth thoracic vertebra, behind',
          x: 305,
          y: 262,
        },
        {
          id: 'diaphragm',
          label: 'Diaphragm',
          name: 'Diaphragm, closing the outlet',
          x: 50,
          y: 352,
        },
        {
          id: 'caval-opening',
          label: 'Vena caval\nT8',
          name: 'Vena caval opening at T8: inferior vena cava, right phrenic nerve',
          x: 145,
          y: 352,
        },
        {
          id: 'oesophageal-opening',
          label: 'Oeso-\nphageal\nT10',
          name: 'Oesophageal opening at T10: oesophagus, vagal trunks, left gastric vessels',
          x: 225,
          y: 352,
        },
        {
          id: 'aortic-opening',
          label: 'Aortic\nT12',
          name: 'Aortic opening at T12: aorta, thoracic duct, azygos vein',
          x: 305,
          y: 352,
        },
      ],
      edges: [
        { from: 'landmarks', to: 'notch' },
        { from: 'landmarks', to: 'sternal-angle' },
        { from: 'landmarks', to: 'xiphisternal' },
        { from: 'inlet', to: 'manubrium-border' },
        { from: 'inlet', to: 'first-rib' },
        { from: 'inlet', to: 't1' },
        { from: 'inlet', to: 'sibson' },
        { from: 'inlet', to: 'inlet-contents' },
        { from: 'outlet', to: 'infrasternal-angle' },
        { from: 'outlet', to: 'costal-margin' },
        { from: 'outlet', to: 't12' },
        { from: 'outlet', to: 'diaphragm' },
        { from: 'diaphragm', to: 'caval-opening' },
        { from: 'diaphragm', to: 'oesophageal-opening' },
        { from: 'diaphragm', to: 'aortic-opening' },
      ],
    },
    lesions: [
      {
        id: 'cervical-rib',
        label: 'Cervical rib',
        nodeIds: ['first-rib', 'inlet-contents'],
        explanation:
          'In about 0.5% of people an extra rib grows from the seventh cervical vertebra. The lower trunk of the brachial plexus arches over it and can be stretched: tingling along the ulnar side of the forearm and wasting of the small muscles of the hand (T1). The subclavian artery can be pressed too, so the thoracic inlet syndrome can be neural, vascular or both.',
      },
      {
        id: 'hiccups',
        label: 'Hiccups',
        nodeIds: ['diaphragm'],
        explanation:
          'Sudden involuntary contractions of the diaphragm against a closed glottis, usually from gastric irritation, but also from irritation of the phrenic nerve, uraemia or anxiety.',
      },
    ],
    drill: [
      {
        id: 'landmarks',
        title: 'Landmarks',
        hint: 'Three points down the front of the sternum, each level with a vertebra.',
        nodeIds: ['notch', 'sternal-angle', 'xiphisternal'],
      },
      {
        id: 'inlet',
        title: 'Inlet',
        hint: 'Its boundary in front, at the sides and behind, the membrane over it and what passes.',
        nodeIds: ['manubrium-border', 'first-rib', 't1', 'sibson', 'inlet-contents'],
      },
      {
        id: 'outlet',
        title: 'Outlet and diaphragm',
        hint: 'The boundary, the muscle that closes it, and its three openings with their levels.',
        nodeIds: [
          'infrasternal-angle',
          'costal-margin',
          't12',
          'diaphragm',
          'caval-opening',
          'oesophageal-opening',
          'aortic-opening',
        ],
      },
    ],
    model3d: {
      src: THORAX_MODEL_SRC,
      credit: THORAX_MODEL_CREDIT,
      parts: thoraxParts([...CAGE_BONES, 'clavicles', 'diaphragm']),
      traces: [],
      stops: [
        FRONT_OF_CAGE,
        {
          id: 'sternal-angle',
          title: 'Sternal angle',
          description:
            'The ridge where the manubrium meets the body of the sternum. The second costal cartilage joins here: count the ribs and spaces down from it.',
          target: [0, -165, 1290],
          position: [-315, -731, 1347],
        },
        {
          id: 'inlet',
          title: 'Inlet',
          description:
            'Looking down into the top of the cage: the manubrium in front, the first ribs at the sides and the first thoracic vertebra behind. The plane slopes down and forwards.',
          target: [0, -100, 1335],
          position: [0, -459, 1936],
        },
        {
          id: 'outlet',
          title: 'Outlet and diaphragm',
          description:
            'The wide lower opening between the costal margins, closed by the dome of the diaphragm, which rises well up inside the cage.',
          target: [0, -116, 1090],
          position: [0, -1016, 787],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'cage',
      title: 'The chest and its cage',
      body: 'The thorax is the upper part of the trunk, above the diaphragm. Its skeleton, the thoracic cage, is the twelve thoracic vertebrae behind, twelve pairs of ribs with their cartilages at the sides and the sternum in front. It holds the lungs and the heart, and it moves with every breath.',
      focus: [],
    },
    {
      id: 'notch',
      title: 'Suprasternal notch',
      body: 'Felt above the manubrium between the inner ends of the clavicles, at the level of the lower border of T2. The trachea can be felt in it.',
      focus: ['landmarks', 'notch'],
    },
    {
      id: 'sternal-angle',
      title: 'Sternal angle',
      body: 'A transverse ridge about 5 cm below the notch, where the manubrium meets the body of the sternum. The second costal cartilage joins here, so ribs and spaces are counted down from it. Behind, it lies at the disc between T4 and T5. Its plane divides the superior from the inferior mediastinum; the arch of the aorta begins and ends there, the trachea divides and the azygos vein joins the superior vena cava.',
      focus: ['sternal-angle'],
    },
    {
      id: 'lower-landmarks',
      title: 'Xiphisternal joint and costal margin',
      body: 'The xiphisternal joint lies at the top of the infrasternal angle, at the level of T9. Each costal margin is formed by the cartilages of ribs 7 to 10; the tenth rib is the lowest point of the cage in front, at L3. The apex beat is felt in the left fifth space, about 9 cm from the midline.',
      focus: ['xiphisternal', 'costal-margin'],
    },
    {
      id: 'inlet',
      title: 'Inlet: boundaries',
      body: 'The kidney-shaped upper opening, about 10 to 12.5 cm wide and 5 cm deep. In front, the upper border of the manubrium; behind, the body of T1; at each side, the first rib and its cartilage. It slopes down and forwards, so the manubrium lies level with T3.',
      focus: ['inlet', 'manubrium-border', 'first-rib', 't1'],
    },
    {
      id: 'sibson',
      title: 'Sibson’s fascia and what passes',
      body: 'Each half of the inlet is roofed by the suprapleural membrane, from the transverse process of C7 to the inner border of the first rib, over the cervical pleura and the apex of the lung. It stops the root of the neck puffing up and down with breathing. Through the inlet pass the trachea and oesophagus, the great arteries and brachiocephalic veins, the internal thoracic arteries, the phrenic and vagus nerves, the sympathetic trunks and the first thoracic nerves.',
      focus: ['sibson', 'inlet-contents'],
    },
    {
      id: 'outlet',
      title: 'Outlet and the diaphragm',
      body: 'The wide lower opening: the infrasternal angle in front, the body of T12 behind and the costal margins at the sides. The diaphragm closes it. Its vena caval opening at T8 carries the inferior vena cava and right phrenic nerve; the oesophageal opening at T10 the oesophagus and both vagal trunks; the aortic opening at T12 the aorta, thoracic duct and azygos vein.',
      focus: [
        'outlet',
        'infrasternal-angle',
        'costal-margin',
        't12',
        'diaphragm',
        'caval-opening',
        'oesophageal-opening',
        'aortic-opening',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a landmark or an opening to see its level. Then turn on a cervical rib to see what it presses on.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'sternal-angle-level',
      prompt: 'The sternal angle lies at the level of:',
      options: [
        { id: 'second-cartilage', text: 'Second costal cartilage and the T4–T5 disc' },
        { id: 'first-cartilage', text: 'First costal cartilage and T2' },
        { id: 'third-cartilage', text: 'Third costal cartilage and T6' },
        { id: 'xiphoid', text: 'Xiphisternal joint and T9' },
      ],
      answerId: 'second-cartilage',
      explanation:
        'The manubriosternal joint is level with the second costal cartilage in front and the disc between T4 and T5 behind; ribs are counted from there.',
    },
    {
      id: 'inlet-behind',
      prompt: 'Behind, the inlet of the thorax is bounded by:',
      options: [
        { id: 't1', text: 'Body of the first thoracic vertebra' },
        { id: 'c7', text: 'Body of the seventh cervical vertebra' },
        { id: 't2', text: 'Body of the second thoracic vertebra' },
        { id: 'first-rib-neck', text: 'Necks of the first ribs' },
      ],
      answerId: 't1',
      explanation:
        'The inlet is the upper border of the manubrium in front, the first ribs and cartilages at the sides and the body of T1 behind.',
    },
    {
      id: 'aortic-opening',
      prompt: 'Which of these passes through the aortic opening of the diaphragm?',
      options: [
        { id: 'thoracic-duct', text: 'Thoracic duct' },
        { id: 'ivc', text: 'Inferior vena cava' },
        { id: 'vagal-trunks', text: 'Vagal trunks' },
        { id: 'right-phrenic', text: 'Right phrenic nerve' },
      ],
      answerId: 'thoracic-duct',
      explanation:
        'At T12 the aortic opening carries the aorta, thoracic duct and azygos vein. The IVC and right phrenic nerve use the T8 opening; the vagal trunks pass with the oesophagus at T10.',
    },
    {
      id: 'cervical-rib-signs',
      prompt: 'A cervical rib with wasting of the small muscles of the hand presses on:',
      options: [
        { id: 'lower-trunk', text: 'Lower trunk of the brachial plexus' },
        { id: 'upper-trunk', text: 'Upper trunk of the brachial plexus' },
        { id: 'phrenic', text: 'Phrenic nerve' },
        { id: 'long-thoracic', text: 'Long thoracic nerve' },
      ],
      answerId: 'lower-trunk',
      explanation:
        'The lower trunk (C8, T1) arches over a cervical rib; T1 supplies the small muscles of the hand, and its skin territory is the ulnar side of the forearm.',
    },
  ],
  cards: [
    {
      id: 'sternal-angle-levels',
      front: 'Sternal angle: level in front and behind?',
      back: 'Second costal cartilage in front; disc between T4 and T5 behind.',
    },
    {
      id: 'thoracic-inlet-boundaries',
      front: 'Boundaries of the inlet of the thorax?',
      back: 'Upper border of the manubrium in front, first ribs and cartilages at the sides, body of T1 behind.',
    },
    {
      id: 'sibson-fascia',
      front: 'Attachments of Sibson’s fascia?',
      back: 'Apex to the transverse process of C7; base to the inner border of the first rib and its cartilage. It lies over the cervical pleura and lung apex.',
    },
    {
      id: 'diaphragm-openings',
      front: 'The three large openings of the diaphragm and their levels?',
      back: 'Vena caval T8, oesophageal T10, aortic T12.',
    },
    {
      id: 'apex-beat',
      front: 'Where is the apex beat felt?',
      back: 'Left fifth intercostal space, about 9 cm from the midline, medial to the midclavicular line.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 12 Introduction (Thorax)', pages: '209–218' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '125–132' },
  ],
};
