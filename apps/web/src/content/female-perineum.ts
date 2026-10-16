import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  PELVIC_FLOOR,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  PERINEUM_BELOW,
  PUDENDAL_ROUTE,
  TRACES,
} from './pelvis-3d';

// Pelvis batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const femalePerineum: Topic = {
  slug: 'female-perineum',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The female perineum',
  summary:
    'The vulva: mons, labia, clitoris, vestibule and its openings, the bulbs and greater vestibular glands; then the female urogenital region, how it differs from the male, the perineal membrane split by the vagina, and its nerves.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 2, Chapter 28 Perineum: female perineum, pages 419 to 423'),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: urogenital triangle, pages 501 to 506',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'The bony outlet, pelvic floor and pudendal nerves in the 3D view (the female organs are not modelled yet)',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The vulva (pudendum): the mons pubis, fat over the symphysis; the labia majora, folds of skin and fat, hairy outside with sebaceous glands inside, joined by anterior and posterior commissures; the labia minora, thin folds forming the prepuce and frenulum of the clitoris in front and the frenulum of the labia behind; the clitoris; the vestibule; the bulbs of the vestibule; and the greater vestibular glands.',
    'The clitoris, homologue of the penis, has two corpora cavernosa fixed to the ischiopubic rami, no corpus spongiosum and no urethra; its glans is erectile tissue joined to the bulbs. The vestibule, between the labia minora, holds from front to back the clitoris, the urethral orifice about 2.5 cm behind it, the vaginal orifice with the hymen, and beside that the openings of the greater vestibular ducts.',
    'The bulbs of the vestibule, the two halves of the male bulb, lie each side of the vaginal and urethral openings on the perineal membrane, under the two bulbospongiosus muscles, which stay apart. The greater vestibular (Bartholin’s) glands, homologues of the bulbourethral glands, lie at the back ends of the bulbs in the superficial space; each 2 cm duct opens between the hymen and labium minus.',
    'The perineal membrane is weaker than in the male and divided by the vagina into two side triangles; the urethra and vagina pierce it. In the thin deep space the urethral sphincter lies in the urethral wall, with compressor urethrae from the ischiopubic rami and sphincter urethrovaginalis from the perineal body round the urethra and vagina; the deep transverse perinei are mostly smooth muscle.',
    'Nerves: the dorsal nerve of the clitoris; the ilioinguinal and the genital branch of the genitofemoral to the front third of the labium majus; the perineal branch of the posterior cutaneous nerve of the thigh to its outer part; the posterior labial nerves to the rest. The 2.5 cm between the posterior commissure and the anus is the gynaecological perineum.',
  ],
  visual: {
    kind: 'path',
    // Left: the vulva, outside in. Right: the urogenital region and its nerves.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'female-perineum',
          label: 'Female perineum',
          name: 'Female perineum',
          x: 180,
          y: 30,
        },
        {
          id: 'mons-labia',
          label: 'Mons, labia\nmajora',
          name: 'Mons pubis and labia majora',
          x: 85,
          y: 100,
        },
        {
          id: 'labia-minora',
          label: 'Labia minora',
          name: 'Labia minora, forming the prepuce and frenulum of the clitoris',
          x: 85,
          y: 160,
        },
        {
          id: 'clitoris',
          label: 'Clitoris: two\ncorpora',
          name: 'Clitoris: two corpora cavernosa, no corpus spongiosum, no urethra',
          x: 85,
          y: 225,
        },
        {
          id: 'vestibule',
          label: 'Vestibule: urethra,\nvagina',
          name: 'Vestibule: clitoris, urethral orifice, vaginal orifice, gland openings',
          x: 85,
          y: 290,
        },
        {
          id: 'bulbs',
          label: 'Bulbs of the\nvestibule',
          name: 'Bulbs of the vestibule, each side of the openings',
          x: 85,
          y: 355,
        },
        {
          id: 'bartholin',
          label: 'Greater vestibular\nglands',
          name: 'Greater vestibular (Bartholin’s) glands',
          x: 85,
          y: 415,
        },
        {
          id: 'perineal-membrane',
          label: 'Membrane split\nby vagina',
          name: 'Perineal membrane, split by the vagina into two triangles',
          x: 275,
          y: 100,
        },
        {
          id: 'superficial-space',
          label: 'Superficial space:\nbulbs, muscles',
          name: 'Superficial space: crura, bulbs, glands, ischiocavernosus, bulbospongiosus',
          x: 275,
          y: 165,
        },
        {
          id: 'deep-space',
          label: 'Deep space: thin,\nopen above',
          name: 'Deep space: urethra, vagina, sphincters, vessels and nerves of the clitoris',
          x: 275,
          y: 230,
        },
        {
          id: 'sphincters',
          label: 'Compressor,\nurethrovaginalis',
          name: 'Compressor urethrae and sphincter urethrovaginalis',
          x: 275,
          y: 295,
        },
        {
          id: 'nerves',
          label: 'Dorsal and labial\nnerves',
          name: 'Dorsal nerve of the clitoris, labial nerves, ilioinguinal, posterior cutaneous of thigh',
          x: 275,
          y: 355,
        },
        {
          id: 'gynaecological',
          label: 'Gynaecological\nperineum',
          name: 'Gynaecological perineum: 2.5 cm from the posterior commissure to the anus',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'female-perineum', to: 'mons-labia' },
        { from: 'mons-labia', to: 'labia-minora' },
        { from: 'labia-minora', to: 'clitoris' },
        { from: 'clitoris', to: 'vestibule' },
        { from: 'vestibule', to: 'bulbs' },
        { from: 'bulbs', to: 'bartholin' },
        { from: 'female-perineum', to: 'perineal-membrane' },
        { from: 'perineal-membrane', to: 'superficial-space' },
        { from: 'superficial-space', to: 'deep-space' },
        { from: 'deep-space', to: 'sphincters' },
        { from: 'sphincters', to: 'nerves' },
        { from: 'nerves', to: 'gynaecological' },
      ],
    },
    lesions: [
      {
        id: 'bartholin-cyst',
        label: 'Bartholin’s cyst',
        nodeIds: ['bartholin'],
        explanation:
          'A blocked duct of a greater vestibular gland swells into a cyst, or if infected an abscess, at the back of the labium majus beside the vaginal opening.',
      },
      {
        id: 'episiotomy',
        label: 'Episiotomy',
        nodeIds: ['gynaecological', 'superficial-space'],
        explanation:
          'A mediolateral cut at about 45 degrees from the back of the vaginal opening, through skin, vaginal wall and bulbospongiosus, widens the outlet in delivery while sparing the perineal body and anal sphincter.',
      },
      {
        id: 'pudendal-block',
        label: 'Pudendal block',
        nodeIds: ['nerves'],
        explanation:
          'A pudendal block near the ischial spine numbs most of the perineum. The front of the labia (ilioinguinal and genitofemoral) and their outer part (posterior cutaneous nerve of the thigh) need extra local injection along the labia majora.',
      },
    ],
    drill: [
      {
        id: 'vulva',
        title: 'The vulva',
        hint: 'From the outside in, then the erectile tissue and glands deep to the vestibule.',
        nodeIds: ['mons-labia', 'labia-minora', 'clitoris', 'vestibule', 'bulbs', 'bartholin'],
      },
      {
        id: 'region',
        title: 'The urogenital region',
        hint: 'The membrane, the two spaces, the sphincters, the nerves, then the obstetric perineum.',
        nodeIds: [
          'perineal-membrane',
          'superficial-space',
          'deep-space',
          'sphincters',
          'nerves',
          'gynaecological',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          ...PELVIS_SKELETON,
          'femurs',
          ...PELVIC_FLOOR,
          'rectum',
          'internal-pudendal-vessels',
          'pudendal-nerves',
        ],
        ['obturator-internus'],
      ),
      traces: [{ id: 'perineal-membrane', ...TRACES.perinealMembrane }],
      stops: [PERINEUM_BELOW, PUDENDAL_ROUTE],
    },
  },
  lesson: [
    {
      id: 'outer',
      title: 'Mons and labia',
      body: 'The mons pubis is a rounded pad of fat in front of the symphysis, covered with hair with a nearly horizontal upper edge. The labia majora are two thick folds of skin and fat, hairy outside and rich in sebaceous glands inside, bounding the pudendal cleft; they meet in front at the anterior commissure and behind at the posterior commissure. The labia minora are thin folds inside the cleft: in front each splits, the upper layers forming the prepuce and the lower the frenulum of the clitoris; behind they meet at the frenulum of the labia.',
      focus: ['mons-labia', 'labia-minora'],
    },
    {
      id: 'clitoris',
      title: 'Clitoris',
      body: 'An erectile organ homologous with the penis but not traversed by the urethra. Its body is two corpora cavernosa in a fibrous sheath, partly separated by a septum, each attached to an ischiopubic ramus as a crus under ischiocavernosus. There is no corpus spongiosum. Its glans, a small tubercle capping the corpora, is erectile tissue continuous with the bulbs of the vestibule and is highly sensitive.',
      focus: ['clitoris'],
    },
    {
      id: 'vestibule',
      title: 'Vestibule',
      body: 'The space between the labia minora. From front to back: the clitoris; the urethral orifice about 2.5 cm behind it; the vaginal orifice, partly closed in the virgin by the hymen; and one each side between the hymen and labium minus, the openings of the greater vestibular glands. Lesser vestibular glands open on its surface. Behind the vaginal opening lies the shallow vestibular fossa.',
      focus: ['vestibule'],
    },
    {
      id: 'bulbs',
      title: 'Bulbs and glands',
      body: 'The bulbs of the vestibule are two oval masses of erectile tissue, the halves of the male bulb, lying each side of the vaginal and urethral openings on the perineal membrane, joined in front by the bulbar commissure. The two bulbospongiosus muscles cover them and stay apart, letting the urethra and vagina through; they narrow the vaginal opening. The greater vestibular glands, homologues of the bulbourethral glands but lying in the superficial space, sit at the back ends of the bulbs.',
      focus: ['bulbs', 'bartholin', 'superficial-space'],
    },
    {
      id: 'region',
      title: 'The female urogenital region',
      body: 'Its layers match the male’s: Colles’ fascia, the superficial space, the perineal membrane and the thin deep space. But the membrane is less defined and split by the vagina into two side triangles; both urethra and vagina pierce it. In the deep space the urethral sphincter lies in the urethral wall over more than its middle third; compressor urethrae arises from the ischiopubic rami and sphincter urethrovaginalis from the perineal body, both meeting in front of the urethra. They lengthen and compress the urethra and aid continence.',
      focus: ['perineal-membrane', 'deep-space', 'sphincters'],
    },
    {
      id: 'nerves',
      title: 'Nerves',
      body: 'The dorsal nerve of the clitoris supplies its skin. The ilioinguinal nerve and the genital branch of the genitofemoral supply the front third of the labium majus; the perineal branch of the posterior cutaneous nerve of the thigh the outer part of the rest; the posterior labial nerves the inner part and the labium minus. The urethral lining is supplied by the perineal nerve. All come from S2 to S4 except the L1 and L2 nerves in front.',
      focus: ['nerves'],
    },
  ],
  questions: [
    {
      id: 'fp-bartholin',
      prompt: 'The duct of the greater vestibular gland opens:',
      options: [
        { id: 'hymen', text: 'Between the hymen and the labium minus' },
        { id: 'urethra', text: 'Beside the urethral orifice' },
        { id: 'clitoris', text: 'Under the prepuce of the clitoris' },
        { id: 'fornix', text: 'Into the posterior fornix of the vagina' },
      ],
      answerId: 'hymen',
      explanation: 'One on each side of the vaginal orifice.',
    },
    {
      id: 'fp-clitoris',
      prompt: 'The clitoris differs from the penis in having:',
      options: [
        { id: 'no-spongiosum', text: 'No corpus spongiosum and no urethra' },
        { id: 'one-cavernosum', text: 'One corpus cavernosum only' },
        { id: 'no-glans', text: 'No glans' },
        { id: 'no-crura', text: 'No crura' },
      ],
      answerId: 'no-spongiosum',
      explanation: 'The bulbs of the vestibule stand for the corpus spongiosum’s bulb.',
    },
    {
      id: 'fp-membrane',
      prompt: 'The female perineal membrane is pierced by the vagina and the:',
      options: [
        { id: 'urethra', text: 'Urethra' },
        { id: 'bulb-ducts', text: 'Bulbourethral ducts' },
        { id: 'pudendal', text: 'Pudendal nerve' },
        { id: 'round', text: 'Round ligament' },
      ],
      answerId: 'urethra',
      explanation: 'The vagina divides it into two side triangles.',
    },
    {
      id: 'fp-urethral-orifice',
      prompt: 'The external urethral orifice lies:',
      options: [
        { id: 'behind-clitoris', text: 'About 2.5 cm behind the clitoris, in front of the vagina' },
        { id: 'behind-vagina', text: 'Behind the vaginal orifice' },
        { id: 'in-clitoris', text: 'On the glans clitoris' },
        { id: 'labia', text: 'On the labium minus' },
      ],
      answerId: 'behind-clitoris',
      explanation: 'In the vestibule, between the clitoris and the vaginal opening.',
    },
  ],
  cards: [
    {
      id: 'fp-vulva',
      front: 'Parts of the vulva?',
      back: 'Mons pubis, labia majora, labia minora, clitoris, vestibule, bulbs of the vestibule, greater vestibular glands.',
    },
    {
      id: 'fp-vestibule',
      front: 'Openings in the vestibule?',
      back: 'Urethra, vagina and the two greater vestibular ducts (plus the lesser vestibular glands).',
    },
    {
      id: 'fp-homologues',
      front: 'Female homologues of the bulb and bulbourethral glands?',
      back: 'Bulbs of the vestibule; greater vestibular (Bartholin’s) glands, which lie in the superficial space.',
    },
    {
      id: 'fp-deep-muscles',
      front: 'Muscles of the female deep perineal space?',
      back: 'Urethral sphincter (in the urethral wall), compressor urethrae, sphincter urethrovaginalis, deep transverse perinei (mainly smooth).',
    },
    {
      id: 'fp-labium-nerves',
      front: 'Nerves of the labium majus?',
      back: 'Front third: ilioinguinal and genital branch of genitofemoral. Rest: posterior labial nerves and the perineal branch of the posterior cutaneous nerve of the thigh.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 28 Perineum', pages: '419–423' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '501–506' },
  ],
};
