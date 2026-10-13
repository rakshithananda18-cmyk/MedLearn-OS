import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  CAGE_BONES,
  FRONT_OF_CAGE,
  THORAX_MODEL_CREDIT,
  THORAX_MODEL_SRC,
  thoraxParts,
} from './thorax-3d';

// Thorax batch 1. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const ribs: Topic = {
  slug: 'ribs',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Ribs and costal cartilages',
  summary:
    'True, false and floating ribs, the parts of a typical rib, the special ribs and the cartilages that close the cage in front.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 13 Bones and Joints of Thorax, pages 219 to 224'),
    bookSource('grays-anatomy', 'Chapter 3 Thorax, regional anatomy: ribs, pages 145 to 148'),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Ribs, cartilages and vertebrae in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'True ribs 1–7 reach the sternum by their own cartilages; false ribs 8–10 join the cartilage above; 11 and 12 float.',
    'Typical ribs 3–9: a head with two facets and a crest, a neck, a tubercle, and a shaft bent at the angle.',
    'The costal groove under the lower border holds vein, artery and nerve, from above down (VAN).',
    'First rib: shortest, broadest, most curved, flat, no costal groove; scalene tubercle between the subclavian vein and artery.',
    'The angle is the weakest part of a rib and the commonest site of fracture.',
  ],
  visual: {
    kind: 'path',
    // The kinds of rib, the parts of a typical rib, the special ribs and the cartilages.
    diagram: {
      width: 360,
      height: 380,
      nodes: [
        { id: 'ribs', label: 'Ribs', name: 'Twelve pairs of ribs', x: 50, y: 30 },
        {
          id: 'true-ribs',
          label: 'True\n1–7',
          name: 'True (vertebrosternal) ribs 1 to 7',
          x: 145,
          y: 30,
        },
        {
          id: 'false-ribs',
          label: 'False\n8–10',
          name: 'False (vertebrochondral) ribs 8 to 10',
          x: 225,
          y: 30,
        },
        {
          id: 'floating-ribs',
          label: 'Floating\n11, 12',
          name: 'Floating (vertebral) ribs 11 and 12',
          x: 305,
          y: 30,
        },
        { id: 'typical-ribs', label: 'Ribs 3–9', name: 'Typical ribs, 3 to 9', x: 50, y: 116 },
        {
          id: 'head',
          label: 'Head,\ntwo facets',
          name: 'Head, with two facets separated by a crest',
          x: 145,
          y: 116,
        },
        {
          id: 'neck-tubercle',
          label: 'Neck and\ntubercle',
          name: 'Neck and tubercle, at the costotransverse joint',
          x: 225,
          y: 116,
        },
        {
          id: 'costal-groove',
          label: 'Costal\ngroove',
          name: 'Costal groove, holding the intercostal vein, artery and nerve',
          x: 305,
          y: 116,
        },
        {
          id: 'atypical-ribs',
          label: 'Atypical',
          name: 'Atypical ribs: 1, 2, 10, 11 and 12',
          x: 50,
          y: 202,
        },
        { id: 'first-rib', label: 'First rib', name: 'First rib', x: 145, y: 202 },
        { id: 'second-rib', label: 'Second rib', name: 'Second rib', x: 225, y: 202 },
        { id: 'tenth-rib', label: 'Tenth rib', name: 'Tenth rib', x: 305, y: 202 },
        { id: 'eleventh-rib', label: 'Eleventh rib', name: 'Eleventh rib', x: 145, y: 252 },
        { id: 'twelfth-rib', label: 'Twelfth rib', name: 'Twelfth rib', x: 250, y: 252 },
        {
          id: 'costal-cartilages',
          label: 'Costal\ncartilages',
          name: 'Costal cartilages',
          x: 50,
          y: 338,
        },
        {
          id: 'to-sternum',
          label: '1–7 to\nsternum',
          name: 'Cartilages 1 to 7, reaching the sternum',
          x: 145,
          y: 338,
        },
        {
          id: 'to-margin',
          label: '8–10\nmargin',
          name: 'Cartilages 8 to 10, joining the cartilage above to make the costal margin',
          x: 225,
          y: 338,
        },
        {
          id: 'free-ends',
          label: '11, 12\nfree',
          name: 'Cartilages 11 and 12, ending free in the abdominal wall muscles',
          x: 305,
          y: 338,
        },
      ],
      edges: [
        { from: 'ribs', to: 'true-ribs' },
        { from: 'ribs', to: 'false-ribs' },
        { from: 'ribs', to: 'floating-ribs' },
        { from: 'typical-ribs', to: 'head' },
        { from: 'typical-ribs', to: 'neck-tubercle' },
        { from: 'typical-ribs', to: 'costal-groove' },
        { from: 'atypical-ribs', to: 'first-rib' },
        { from: 'atypical-ribs', to: 'second-rib' },
        { from: 'atypical-ribs', to: 'tenth-rib' },
        { from: 'atypical-ribs', to: 'eleventh-rib' },
        { from: 'atypical-ribs', to: 'twelfth-rib' },
        { from: 'costal-cartilages', to: 'to-sternum' },
        { from: 'costal-cartilages', to: 'to-margin' },
        { from: 'costal-cartilages', to: 'free-ends' },
      ],
    },
    lesions: [
      {
        id: 'rib-fracture',
        label: 'Fractured rib',
        nodeIds: ['typical-ribs'],
        explanation:
          'The angle is the weakest part of a rib and breaks most often, usually in the middle ribs. Breathing and coughing hurt because the broken ends move with every breath; a sharp end can tear the pleura or lung below.',
      },
      {
        id: 'rachitic-rosary',
        label: 'Rickets',
        nodeIds: ['costal-cartilages', 'to-sternum'],
        explanation:
          'In rickets the bone matrix at the growth plates is not mineralised, so the costochondral junctions swell into a row of knobs down each side of the chest, the rachitic rosary, with widened wrists.',
      },
    ],
    drill: [
      {
        id: 'kinds',
        title: 'Kinds of rib',
        hint: 'Sorted by how each reaches the front: on its own, through the cartilage above, or not at all.',
        nodeIds: ['true-ribs', 'false-ribs', 'floating-ribs'],
      },
      {
        id: 'typical',
        title: 'A typical rib',
        hint: 'The back end, from the vertebra outwards, then the groove under the shaft.',
        nodeIds: ['head', 'neck-tubercle', 'costal-groove'],
      },
      {
        id: 'atypical',
        title: 'The special ribs',
        hint: 'The first two, and the last three.',
        nodeIds: ['first-rib', 'second-rib', 'tenth-rib', 'eleventh-rib', 'twelfth-rib'],
      },
    ],
    model3d: {
      src: THORAX_MODEL_SRC,
      credit: THORAX_MODEL_CREDIT,
      parts: thoraxParts([...CAGE_BONES, 'thoracic-discs']),
      traces: [],
      stops: [
        FRONT_OF_CAGE,
        {
          id: 'first-rib',
          title: 'First rib',
          description:
            'From above: the first rib is flat and sharply curved, its head on T1 and its cartilage reaching the manubrium. The subclavian vessels cross its upper surface.',
          target: [-35, -97, 1335],
          position: [-322, -508, 1749],
        },
        {
          id: 'heads',
          title: 'Heads and tubercles',
          description:
            'From behind: each rib head sits on the side of the vertebral bodies and its tubercle on the transverse process, then the shaft runs out to the angle.',
          target: [-40, -40, 1210],
          position: [-314, 657, 1260],
        },
        {
          id: 'floating',
          title: 'Floating ribs',
          description:
            'The eleventh and twelfth ribs end free in the muscles of the back and flank; their short cartilages never reach the front.',
          target: [-60, -50, 1060],
          position: [-582, 485, 998],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'ribs',
      title: 'Twelve pairs',
      body: 'Twelve ribs on each side make most of the cage, with the intercostal spaces between them. They grow longer from the first to the seventh and shorter after that, and slope more steeply down to the ninth. The number can rise with a cervical or lumbar rib, or fall to eleven.',
      focus: ['ribs'],
    },
    {
      id: 'kinds',
      title: 'True, false and floating',
      body: 'Ribs 1 to 7 reach the sternum through their own cartilages: the true or vertebrosternal ribs. The other five are false. Cartilages 8, 9 and 10 join the cartilage above (vertebrochondral ribs); 11 and 12 end free in the abdominal wall (floating or vertebral ribs).',
      focus: ['true-ribs', 'false-ribs', 'floating-ribs'],
    },
    {
      id: 'typical',
      title: 'A typical rib',
      body: 'Ribs 3 to 9 share a pattern. The head has a lower, larger facet for its own vertebra and an upper one for the vertebra above, split by a crest. The neck lies in front of the transverse process, and the tubercle joins the transverse process of its own vertebra. The shaft is bent at the angle, about 5 cm out from the tubercle, and twisted there.',
      focus: ['typical-ribs', 'head', 'neck-tubercle'],
    },
    {
      id: 'groove',
      title: 'The costal groove',
      body: 'Under the lower border of the inner surface runs the costal groove, so the lower border is thin and the upper rounded: that is how to tell the side of a loose rib. In the groove lie the posterior intercostal vein, artery and nerve, from above down. A typical rib ossifies from one primary centre near the angle and three secondary ones, for the head and the two parts of the tubercle.',
      focus: ['costal-groove'],
    },
    {
      id: 'first',
      title: 'First rib',
      body: 'The shortest, broadest and most curved rib, flattened from above down, with no costal groove and no twist. Its head joins T1 alone. On its upper surface the scalene tubercle takes scalenus anterior, with a groove in front for the subclavian vein and one behind for the subclavian artery and lower trunk of the brachial plexus. In front of its neck lie the sympathetic trunk, the first posterior intercostal vein, the superior intercostal artery and the first thoracic nerve.',
      focus: ['atypical-ribs', 'first-rib'],
    },
    {
      id: 'second-tenth',
      title: 'Second and tenth ribs',
      body: 'The second rib is twice as long as the first and just as curved, with a rough tubercle near the middle of its outer surface for serratus anterior. The tenth is like a typical rib but shorter, with one facet on its head for T10 alone.',
      focus: ['second-rib', 'tenth-rib'],
    },
    {
      id: 'floating',
      title: 'Eleventh and twelfth ribs',
      body: 'Short ribs with pointed free ends, one facet on the head, and no neck or tubercle. The eleventh has a faint angle and groove; the twelfth has neither. Quadratus lumborum inserts on the twelfth rib, and the pleura dips below its medial part, which matters in kidney surgery from behind.',
      focus: ['eleventh-rib', 'twelfth-rib'],
    },
    {
      id: 'cartilages',
      title: 'Costal cartilages',
      body: 'The unossified front ends of the ribs, made of hyaline cartilage, which keep the chest wall springy. Cartilages 1 to 7 reach the sternum; 8 to 10 join the one above and make the costal margin; 11 and 12 end free. Each joins its rib by a primary cartilaginous joint. The first joins the manubrium by cartilage too; the second to seventh meet the sternum at synovial joints.',
      focus: ['costal-cartilages', 'to-sternum', 'to-margin', 'free-ends'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each rib in the diagram to light it in the model. Then turn on a fracture to see where ribs break.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'vertebrochondral-ribs',
      prompt: 'Which ribs are vertebrochondral?',
      options: [
        { id: 'eight-to-ten', text: '8, 9 and 10' },
        { id: 'one-to-seven', text: '1 to 7' },
        { id: 'eleven-twelve', text: '11 and 12' },
        { id: 'three-to-nine', text: '3 to 9' },
      ],
      answerId: 'eight-to-ten',
      explanation:
        'The cartilages of ribs 8 to 10 join the cartilage above instead of reaching the sternum. Ribs 1 to 7 are vertebrosternal; 11 and 12 float.',
    },
    {
      id: 'one-vertebra-rib',
      prompt: 'Which rib’s head articulates with one vertebra only?',
      options: [
        { id: 'first', text: 'First' },
        { id: 'second', text: 'Second' },
        { id: 'fourth', text: 'Fourth' },
        { id: 'ninth', text: 'Ninth' },
      ],
      answerId: 'first',
      explanation:
        'The first rib’s head joins T1 alone; so do those of ribs 10, 11 and 12. Typical ribs meet their own vertebra and the one above.',
    },
    {
      id: 'scalene-tubercle',
      prompt: 'On the first rib, the groove behind the scalene tubercle lodges:',
      options: [
        { id: 'artery-trunk', text: 'Subclavian artery and lower trunk of the brachial plexus' },
        { id: 'vein', text: 'Subclavian vein' },
        { id: 'thoracic-duct', text: 'Thoracic duct' },
        { id: 'phrenic', text: 'Phrenic nerve' },
      ],
      answerId: 'artery-trunk',
      explanation:
        'Scalenus anterior inserts on the tubercle; the subclavian vein crosses in front of it and the artery with the lower trunk behind it.',
    },
    {
      id: 'rib-fracture-site',
      prompt: 'The commonest site for a rib to break is:',
      options: [
        { id: 'angle', text: 'The angle' },
        { id: 'neck', text: 'The neck' },
        { id: 'tubercle', text: 'The tubercle' },
        { id: 'costochondral', text: 'The costochondral junction' },
      ],
      answerId: 'angle',
      explanation: 'The shaft bends and twists at the angle, its weakest point.',
    },
  ],
  cards: [
    {
      id: 'rib-classes',
      front: 'True, false and floating ribs?',
      back: 'True 1–7 (to the sternum); false 8–12, of which 8–10 join the cartilage above and 11–12 float.',
    },
    {
      id: 'typical-rib-head',
      front: 'Facets on the head of a typical rib?',
      back: 'Lower, larger facet for its own vertebra; upper, smaller one for the vertebra above; a crest between for the intra-articular ligament.',
    },
    {
      id: 'first-rib-neck',
      front: 'In front of the neck of the first rib, medial to lateral?',
      back: 'Sympathetic trunk, first posterior intercostal vein, superior intercostal artery, first thoracic nerve.',
    },
    {
      id: 'second-rib-tubercle',
      front: 'The feature unique to the second rib?',
      back: 'A rough tubercle near the middle of its outer surface, for serratus anterior.',
    },
    {
      id: 'costal-margin',
      front: 'Which cartilages form the costal margin?',
      back: 'Seventh to tenth: 8, 9 and 10 each join the cartilage above.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 13 Bones and Joints of Thorax', pages: '219–224' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '145–148' },
  ],
};
