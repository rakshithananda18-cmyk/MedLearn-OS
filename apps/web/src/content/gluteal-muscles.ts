import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  GLUTEAL_BACK,
  GLUTEAL_MUSCLES,
  HAMSTRINGS,
  HIP_THIGH_BONES,
  HIP_THIGH_MODEL_CREDIT,
  HIP_THIGH_MODEL_SRC,
  hipThighParts,
} from './hip-thigh-3d';

// Lower limb batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student
// checks the topic against the book pages.
export const glutealMuscles: Topic = {
  slug: 'gluteal-muscles',
  subjectSlug: 'anatomy',
  regions: ['lower-limb'],
  title: 'Gluteal region: muscles and the abductor mechanism',
  summary:
    'Gluteus maximus, medius and minimus, the small lateral rotators, how the glutei keep the pelvis level in walking, Trendelenburg’s sign, and where to give an injection.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 5 Gluteal Region, pages 74 to 82'),
    bookSource(
      'grays-anatomy',
      'Chapter 6 Lower Limb, regional anatomy: gluteal region, muscles, pages 566 to 571',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Bones and muscles (BodyParts3D, CC BY 4.0); nerves (Z-Anatomy, CC BY-SA 4.0)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 and CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Gluteus maximus: the chief extensor of the hip, used to rise from sitting; three-quarters inserts into the iliotibial tract. Inferior gluteal nerve.',
    'Gluteus medius and minimus: abductors and medial rotators; they hold the pelvis level when the other foot is off the ground. Superior gluteal nerve, with tensor fasciae latae.',
    'Lateral rotators: piriformis, obturator internus with the gemelli, quadratus femoris, obturator externus.',
    'Trendelenburg’s sign: standing on one leg, the opposite side of the pelvis drops if power (glutei), fulcrum (hip joint) or lever (femoral neck) fails.',
    'Injections go into the upper outer quadrant of the gluteal region, into gluteus medius, away from the sciatic nerve.',
  ],
  visual: {
    kind: 'path',
    // The three glutei and tensor, the lateral rotators, and the three parts of the abductor mechanism.
    diagram: {
      width: 360,
      height: 350,
      nodes: [
        { id: 'gluteal-region', label: 'Gluteal\nregion', name: 'Gluteal region', x: 50, y: 30 },
        {
          id: 'gluteus-maximus',
          label: 'Gluteus\nmaximus',
          name: 'Gluteus maximus',
          x: 145,
          y: 30,
        },
        { id: 'gluteus-medius', label: 'Gluteus\nmedius', name: 'Gluteus medius', x: 225, y: 30 },
        {
          id: 'gluteus-minimus',
          label: 'Gluteus\nminimus',
          name: 'Gluteus minimus',
          x: 305,
          y: 30,
        },
        {
          id: 'tensor-fasciae-latae',
          label: 'Tensor\nfasciae latae',
          name: 'Tensor fasciae latae',
          x: 205,
          y: 100,
        },
        {
          id: 'iliotibial-tract',
          label: 'Iliotibial\ntract',
          name: 'Iliotibial tract',
          x: 305,
          y: 100,
        },
        {
          id: 'lateral-rotators',
          label: 'Lateral\nrotators',
          name: 'Small lateral rotators of the hip',
          x: 50,
          y: 180,
        },
        { id: 'piriformis', label: 'Piri-\nformis', name: 'Piriformis', x: 145, y: 180 },
        {
          id: 'obturator-internus',
          label: 'Obturator\ninternus',
          name: 'Obturator internus',
          x: 225,
          y: 180,
        },
        { id: 'gemelli', label: 'Gemelli', name: 'Superior and inferior gemelli', x: 305, y: 180 },
        {
          id: 'quadratus-femoris',
          label: 'Quadratus\nfemoris',
          name: 'Quadratus femoris',
          x: 185,
          y: 240,
        },
        {
          id: 'obturator-externus',
          label: 'Obturator\nexternus',
          name: 'Obturator externus',
          x: 285,
          y: 240,
        },
        {
          id: 'abductor-mechanism',
          label: 'Abductor\nmechanism',
          name: 'The abductor mechanism of the hip',
          x: 50,
          y: 320,
        },
        {
          id: 'power',
          label: 'Power:\nglutei',
          name: 'Power: gluteus medius and minimus',
          x: 145,
          y: 320,
        },
        {
          id: 'fulcrum',
          label: 'Fulcrum:\nhip joint',
          name: 'Fulcrum: the head of the femur in the acetabulum',
          x: 235,
          y: 320,
        },
        {
          id: 'lever',
          label: 'Lever:\nneck',
          name: 'Weight carried through the neck of the femur',
          x: 320,
          y: 320,
        },
      ],
      edges: [
        { from: 'gluteal-region', to: 'gluteus-maximus' },
        { from: 'gluteal-region', to: 'gluteus-medius' },
        { from: 'gluteal-region', to: 'gluteus-minimus' },
        { from: 'gluteal-region', to: 'tensor-fasciae-latae' },
        { from: 'tensor-fasciae-latae', to: 'iliotibial-tract' },
        { from: 'lateral-rotators', to: 'piriformis' },
        { from: 'lateral-rotators', to: 'obturator-internus' },
        { from: 'lateral-rotators', to: 'gemelli' },
        { from: 'lateral-rotators', to: 'quadratus-femoris' },
        { from: 'lateral-rotators', to: 'obturator-externus' },
        { from: 'abductor-mechanism', to: 'power' },
        { from: 'abductor-mechanism', to: 'fulcrum' },
        { from: 'abductor-mechanism', to: 'lever' },
      ],
    },
    lesions: [
      {
        id: 'trendelenburg',
        label: 'Trendelenburg’s sign',
        nodeIds: [
          'gluteus-medius',
          'gluteus-minimus',
          'abductor-mechanism',
          'power',
          'fulcrum',
          'lever',
        ],
        explanation:
          'Standing on one leg, the glutei of that side normally lift the other side of the pelvis. If they are paralysed (power), the hip is dislocated (fulcrum) or the femoral neck has not united (lever), the unsupported side drops instead: a positive sign.',
      },
      {
        id: 'lurching-gait',
        label: 'Lurching gait',
        nodeIds: ['gluteus-medius', 'gluteus-minimus'],
        explanation:
          'With the glutei medius and minimus of one side paralysed, the patient leans over to that side at each step to lift the other foot clear: a lurching gait. On both sides it becomes a waddling gait.',
      },
      {
        id: 'maximus-weak',
        label: 'Weak gluteus maximus',
        nodeIds: ['gluteus-maximus'],
        explanation:
          'In muscular dystrophy, without gluteus maximus the patient cannot rise from sitting unaided and climbs up their own legs with their hands.',
      },
      {
        id: 'injection',
        label: 'Gluteal injection',
        nodeIds: ['gluteus-medius'],
        explanation:
          'The gluteal region reaches up to the iliac crest. Injections go into its upper outer quadrant, into gluteus medius and minimus; the lower and medial parts hold the sciatic nerve and large vessels.',
      },
    ],
    drill: [
      {
        id: 'glutei',
        title: 'Glutei and tensor',
        hint: 'Three glutei, the muscle in front of them, and the band they pull on.',
        nodeIds: [
          'gluteus-maximus',
          'gluteus-medius',
          'gluteus-minimus',
          'tensor-fasciae-latae',
          'iliotibial-tract',
        ],
      },
      {
        id: 'rotators',
        title: 'Rotators and the abductor mechanism',
        hint: 'Five lateral rotators top to bottom, then the three parts that keep the pelvis level.',
        nodeIds: [
          'piriformis',
          'obturator-internus',
          'gemelli',
          'quadratus-femoris',
          'obturator-externus',
          'power',
          'fulcrum',
          'lever',
        ],
      },
    ],
    model3d: {
      src: HIP_THIGH_MODEL_SRC,
      credit: HIP_THIGH_MODEL_CREDIT,
      parts: hipThighParts([
        ...HIP_THIGH_BONES,
        ...GLUTEAL_MUSCLES,
        'obturator-externus',
        'iliotibial-tract',
        ...HAMSTRINGS,
        'adductor-magnus',
        'superior-gluteal-nerve',
        'sciatic-nerve',
      ]),
      traces: [],
      stops: [
        GLUTEAL_BACK,
        {
          id: 'side',
          title: 'From the side',
          description:
            'Gluteus medius fans over the side of the ilium above the greater trochanter; tensor fasciae latae lies in front, and both glutei and tensor feed the iliotibial tract.',
          target: [-120, -70, 790],
          position: [-1213, -179, 845],
        },
        {
          id: 'rotators',
          title: 'Lateral rotators',
          description:
            'From behind and below: piriformis, obturator internus with the gemelli and quadratus femoris run across to the greater trochanter under gluteus maximus.',
          target: [-85, -45, 805],
          position: [-343, 782, 560],
        },
        {
          id: 'hip-front',
          title: 'Hip from the front',
          description:
            'Gluteus minimus and medius reach forwards to the front of the greater trochanter, which is why their front fibres rotate the hip medially.',
          target: [-100, -100, 800],
          position: [-503, -957, 876],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'region',
      title: 'The gluteal region',
      body: 'From the iliac crest down to the gluteal fold, over the side and back of the pelvis. Standing upright made gluteus maximus one of the most powerful and bulky muscles in the body. The fascia is thick over gluteus medius and thin over gluteus maximus, which it splits to enclose.',
      focus: ['gluteal-region'],
    },
    {
      id: 'maximus',
      title: 'Gluteus maximus',
      body: 'From the back of the ilium, sacrum, coccyx and sacrotuberous ligament to the iliotibial tract (three-quarters) and the gluteal tuberosity (a quarter). It is the chief extensor of the hip, rising from a chair or climbing stairs, keeps the body erect, rotates the thigh laterally and, through the tract, steadies the knee. Inferior gluteal nerve.',
      focus: ['gluteus-maximus', 'iliotibial-tract'],
    },
    {
      id: 'medius-minimus',
      title: 'Gluteus medius and minimus',
      body: 'Fan-shaped, from the gluteal surface of the ilium between the gluteal lines to the greater trochanter, minimus deep to medius. They abduct the hip and their front fibres rotate it medially, but their real work is in walking: when one foot is off the ground they stop that side of the pelvis sagging. Tensor fasciae latae, from the front of the iliac crest into the iliotibial tract, joins them. All three: superior gluteal nerve.',
      focus: ['gluteus-medius', 'gluteus-minimus', 'tensor-fasciae-latae'],
    },
    {
      id: 'rotators',
      title: 'Lateral rotators',
      body: 'Piriformis, from inside the sacrum through the greater sciatic foramen to the top of the greater trochanter. Obturator internus, from inside the pelvis, turning round the lesser sciatic notch to the medial side of the trochanter, with a gemellus along each border. Quadratus femoris, from the ischial tuberosity to the quadrate tubercle. Obturator externus, from the outside of the obturator membrane to the trochanteric fossa.',
      focus: [
        'lateral-rotators',
        'piriformis',
        'obturator-internus',
        'gemelli',
        'quadratus-femoris',
        'obturator-externus',
      ],
    },
    {
      id: 'mechanism',
      title: 'The abductor mechanism',
      body: 'Walking needs three things at the hip that bears the weight: power, from gluteus medius and minimus; a fulcrum, the head of the femur sitting in the acetabulum; and a lever, the neck of the femur carrying the weight. If any one fails, the pelvis drops on the other side.',
      focus: ['abductor-mechanism', 'power', 'fulcrum', 'lever'],
    },
    {
      id: 'injection',
      title: 'Where to inject',
      body: 'The upper outer quadrant of the gluteal region, which runs up to the iliac crest, puts the needle into gluteus medius and minimus. The lower and medial parts, under gluteus maximus, hold the sciatic nerve and gluteal vessels.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each muscle to light it, and switch gluteus maximus off in Layers to see the rotators beneath.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'injection-muscle',
      prompt: 'Intramuscular injections in the upper outer quadrant of the gluteal region go into:',
      options: [
        { id: 'medius', text: 'Gluteus medius' },
        { id: 'maximus', text: 'Gluteus maximus' },
        { id: 'maximus-minimus', text: 'Glutei maximus and minimus' },
        { id: 'erector', text: 'Gluteus maximus and erector spinae' },
      ],
      answerId: 'medius',
      explanation: 'With gluteus minimus beneath; the sciatic nerve lies in the lower medial part.',
    },
    {
      id: 'lurching-cause',
      prompt: 'A lurching gait is due to paralysis of:',
      options: [
        { id: 'medius-minimus', text: 'Glutei medius and minimus' },
        { id: 'maximus-minimus', text: 'Glutei maximus and minimus' },
        { id: 'maximus-medius', text: 'Glutei maximus and medius' },
        { id: 'maximus', text: 'Gluteus maximus alone' },
      ],
      answerId: 'medius-minimus',
      explanation: 'They hold the pelvis level when the other foot is lifted.',
    },
    {
      id: 'not-superior-gluteal',
      prompt: 'Which muscle is not supplied by the superior gluteal nerve?',
      options: [
        { id: 'maximus', text: 'Gluteus maximus' },
        { id: 'medius', text: 'Gluteus medius' },
        { id: 'minimus', text: 'Gluteus minimus' },
        { id: 'tfl', text: 'Tensor fasciae latae' },
      ],
      answerId: 'maximus',
      explanation: 'Gluteus maximus is supplied by the inferior gluteal nerve alone.',
    },
    {
      id: 'not-under-maximus',
      prompt: 'Which of these does not lie under cover of gluteus maximus?',
      options: [
        { id: 'sartorius', text: 'Sartorius' },
        { id: 'piriformis', text: 'Piriformis' },
        { id: 'quadratus', text: 'Quadratus femoris' },
        { id: 'oi', text: 'Obturator internus with the gemelli' },
      ],
      answerId: 'sartorius',
      explanation: 'Sartorius is on the front of the thigh.',
    },
  ],
  cards: [
    {
      id: 'gluteus-maximus-card',
      front: 'Gluteus maximus: insertion, nerve and main action?',
      back: 'Iliotibial tract (three-quarters) and gluteal tuberosity; inferior gluteal nerve; chief extensor of the hip.',
    },
    {
      id: 'medius-minimus-card',
      front: 'Most important action of gluteus medius and minimus?',
      back: 'Keeping the pelvis level when the opposite foot is off the ground in walking and running.',
    },
    {
      id: 'superior-gluteal-supply',
      front: 'Muscles supplied by the superior gluteal nerve?',
      back: 'Gluteus medius, gluteus minimus, tensor fasciae latae.',
    },
    {
      id: 'lateral-rotators-card',
      front: 'Lateral rotators of the hip in the gluteal region?',
      back: 'Piriformis, obturator internus, superior and inferior gemelli, quadratus femoris, obturator externus (and gluteus maximus).',
    },
    {
      id: 'trendelenburg-card',
      front: 'Causes of a positive Trendelenburg sign?',
      back: 'Loss of power (paralysed glutei medius and minimus), of the fulcrum (dislocated hip) or of the lever (ununited fracture of the femoral neck).',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 5 Gluteal Region', pages: '74–82' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 6 Lower Limb', pages: '566–571' },
  ],
};
