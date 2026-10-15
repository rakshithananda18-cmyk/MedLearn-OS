import type { CameraStop, ModelPart, ModelTrace } from '@medlearn/schemas';

// The anterior abdominal wall over its skeleton, both sides, with the right inguinal region in
// detail, shared by the abdomen's first topics. Coordinates are the BodyParts3D frame:
// millimetres, X towards the right side (negative), Y towards the back (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const ABDOMINAL_WALL_MODEL_SRC = '/models/abdominal-wall.glb?v=2';

/** Credit for the model, shown wherever it is. */
export const ABDOMINAL_WALL_MODEL_CREDIT =
  'Bones, vessels and the penis: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP). Muscles, inguinal ligament, linea alba, fascia transversalis, nerves, testis and the abdominal regions: Z-Anatomy, CC BY-SA 4.0, moved low down to sit on the BodyParts3D pelvis. Neither has a coccyx, a cremaster or a separate rectus sheath: the aponeuroses of the flat muscles form the sheath here.';

/**
 * Every mesh in the model file (built by scripts/models/build-models.mjs), by part id, with what a
 * student sees on picking it. Facts in our own words; not yet medically reviewed.
 */
const PARTS = {
  'first-lumbar-vertebra': {
    name: 'First lumbar vertebra (L1)',
    kind: 'bone',
    about:
      'Its body lies at the transpyloric plane. The canal at this level holds the lower end of the spinal cord, the conus medullaris; the tip of its transverse process takes the arcuate ligaments of the diaphragm.',
  },
  'second-lumbar-vertebra': {
    name: 'Second lumbar vertebra (L2)',
    kind: 'bone',
    about:
      'A typical lumbar vertebra: a large kidney-shaped body, short strong pedicles, a triangular canal and a square, backward-pointing spine.',
  },
  'third-lumbar-vertebra': {
    name: 'Third lumbar vertebra (L3)',
    kind: 'bone',
    about:
      'It has the longest transverse processes of the lumbar vertebrae. The subcostal plane crosses it, and the umbilicus lies at the disc below it.',
  },
  'fourth-lumbar-vertebra': {
    name: 'Fourth lumbar vertebra (L4)',
    kind: 'bone',
    about:
      'Level with the highest points of the iliac crests, a landmark for lumbar puncture between L3 and L4 or L4 and L5.',
  },
  'fifth-lumbar-vertebra': {
    name: 'Fifth lumbar vertebra (L5)',
    kind: 'bone',
    about:
      'The atypical and largest lumbar vertebra: thick pyramidal transverse processes joined to the whole pedicle and the side of the body, and a body taller in front, which makes the lumbosacral angle.',
  },
  'lumbar-discs': {
    name: 'Lumbar intervertebral discs',
    kind: 'cartilage',
    about:
      'A soft nucleus pulposus held in rings of annulus fibrosus, thicker in front than behind in the lumbar region. A disc that bursts through the annulus usually goes backwards and to one side, onto a nerve root.',
  },
  sacrum: {
    name: 'Sacrum',
    kind: 'bone',
    about:
      'Five fused vertebrae forming the back of the pelvis, wedged between the hip bones at the sacroiliac joints. Its promontory juts forward at the pelvic inlet; its canal opens below at the sacral hiatus.',
  },
  'hip-bones': {
    name: 'Hip bones',
    kind: 'bone',
    about:
      'Ilium, ischium and pubis fused at the acetabulum. With the sacrum they make the bony pelvis; the iliac crests and anterior superior iliac spines are landmarks of the abdominal wall.',
  },
  femurs: {
    name: 'Heads of the femurs',
    kind: 'bone',
    about: 'The upper ends of the thigh bones in their sockets, below the inguinal ligaments.',
  },
  'lower-ribs': {
    name: 'Seventh to twelfth ribs',
    kind: 'bone',
    about:
      'The lower ribs overlap the upper abdomen, so the liver, spleen, stomach and kidneys lie partly under the ribs. The external oblique arises from the lower eight.',
  },
  'costal-cartilages': {
    name: 'Costal cartilages and costal margin',
    kind: 'bone',
    about:
      'The seventh to tenth cartilages make each costal margin, lowest at the tenth in the midaxillary line, where the subcostal plane passes.',
  },
  sternum: {
    name: 'Lower sternum and xiphoid process',
    kind: 'bone',
    about:
      'The xiphoid process sits at the top of the abdominal wall, at the apex of the infrasternal angle, level with the ninth thoracic vertebra.',
  },
  'external-oblique': {
    name: 'External oblique',
    kind: 'muscle',
    about:
      'The largest, outermost flat muscle: from the lower eight ribs, fibres downwards, forwards and inwards (hands in pockets). Its aponeurosis forms the inguinal ligament and the superficial inguinal ring. Nerves: lower six thoracic.',
  },
  'internal-oblique': {
    name: 'Internal oblique',
    kind: 'muscle',
    about:
      'From the lateral two thirds of the inguinal ligament, the iliac crest and the thoracolumbar fascia, fibres upwards and inwards across the external oblique. It splits round rectus above the arcuate line, forms the cremaster and, with transversus, the conjoint tendon. Nerves: T7 to L1.',
  },
  'transversus-abdominis': {
    name: 'Transversus abdominis',
    kind: 'muscle',
    about:
      'The innermost flat muscle, fibres running across, from the lower six costal cartilages, the thoracolumbar fascia, the iliac crest and the lateral third of the inguinal ligament to the linea alba. The nerves of the wall run between it and the internal oblique.',
  },
  'rectus-abdominis': {
    name: 'Rectus abdominis',
    kind: 'muscle',
    about:
      'The strap muscle either side of the linea alba, from the pubic crest and symphysis up to the fifth to seventh costal cartilages, crossed by three tendinous intersections. It flexes the trunk. Nerves: lower six or seven thoracic.',
  },
  pyramidalis: {
    name: 'Pyramidalis',
    kind: 'muscle',
    about:
      'A small triangle in front of the lower rectus, from the pubis to the linea alba; often absent. Nerve: subcostal (T12).',
  },
  'inguinal-ligament': {
    name: 'Inguinal ligament',
    kind: 'ligament',
    about:
      'The lower edge of the external oblique aponeurosis, folded back on itself from the anterior superior iliac spine to the pubic tubercle. Its grooved upper surface is the floor of the inguinal canal; the lacunar ligament extends back from its medial end.',
  },
  'linea-alba': {
    name: 'Linea alba',
    kind: 'ligament',
    about:
      'The midline raphe where the aponeuroses of both sides cross, from the xiphoid process to the pubic symphysis; wider above the umbilicus. Incisions through it bleed little but can leave a ventral hernia.',
  },
  'transversalis-fascia': {
    name: 'Fascia transversalis',
    kind: 'membrane',
    about:
      'The fascia lining transversus abdominis, the posterior wall of the inguinal canal. The deep inguinal ring is an opening in it 1.2 cm above the midinguinal point, and it lends the spermatic cord its internal spermatic fascia.',
  },
  'psoas-major': {
    name: 'Psoas major',
    kind: 'muscle',
    about:
      'From the bodies, discs and transverse processes of the lumbar vertebrae, down across the pelvic brim to the lesser trochanter: the main flexor of the hip.',
  },
  'superior-epigastric-artery': {
    name: 'Superior epigastric artery',
    kind: 'artery',
    about:
      'A terminal branch of the internal thoracic artery: it enters the rectus sheath behind the seventh costal cartilage and runs down behind rectus to meet the inferior epigastric.',
  },
  'musculophrenic-artery': {
    name: 'Musculophrenic artery',
    kind: 'artery',
    about:
      'The other terminal branch of the internal thoracic, along the costal margin behind the cartilages, to the diaphragm and the lower intercostal spaces.',
  },
  'inferior-epigastric-artery': {
    name: 'Inferior epigastric artery',
    kind: 'artery',
    about:
      'From the external iliac just above the inguinal ligament, up and in, medial to the deep inguinal ring, into the rectus sheath in front of the arcuate line. It marks the lateral side of Hesselbach’s triangle.',
  },
  'inferior-epigastric-vein': {
    name: 'Inferior epigastric vein',
    kind: 'vein',
    about: 'Beside its artery, draining into the external iliac vein.',
  },
  'superficial-epigastric-artery': {
    name: 'Superficial epigastric artery',
    kind: 'artery',
    about:
      'From the femoral artery below the inguinal ligament, up in the superficial fascia towards the umbilicus.',
  },
  'superficial-epigastric-vein': {
    name: 'Superficial epigastric vein',
    kind: 'vein',
    about:
      'Drains the lower wall into the great saphenous vein; in caval obstruction it links with the lateral thoracic vein through the thoracoepigastric vein.',
  },
  'external-iliac-artery': {
    name: 'External iliac artery',
    kind: 'artery',
    about:
      'Along the pelvic brim to the inguinal ligament, where it becomes the femoral artery; it gives the inferior epigastric and deep circumflex iliac arteries.',
  },
  'external-iliac-vein': {
    name: 'External iliac vein',
    kind: 'vein',
    about: 'Medial to its artery, continuing the femoral vein above the inguinal ligament.',
  },
  'testicular-artery': {
    name: 'Testicular artery',
    kind: 'artery',
    about:
      'From the abdominal aorta, down the posterior wall to the deep inguinal ring and through the inguinal canal in the spermatic cord.',
  },
  'testicular-vein': {
    name: 'Testicular vein',
    kind: 'vein',
    about:
      'Formed from the pampiniform plexus of the cord; the right drains into the inferior vena cava.',
  },
  'femoral-vessels': {
    name: 'Femoral artery and vein',
    kind: 'artery',
    about:
      'Below the inguinal ligament at the midinguinal point, the artery lateral to the vein, inside the femoral sheath.',
  },
  'thoracoabdominal-nerves': {
    name: 'Lower intercostal (thoracoabdominal) nerves',
    kind: 'nerve',
    about:
      'T7 to T11 leave their intercostal spaces for the wall, between internal oblique and transversus, into the rectus sheath; they supply the muscles and the skin in bands, T10 at the umbilicus.',
  },
  'iliohypogastric-nerve': {
    name: 'Iliohypogastric nerve (L1)',
    kind: 'nerve',
    about:
      'Runs between the flat muscles and pierces the external oblique aponeurosis 2.5 cm above the superficial inguinal ring, to the skin above the pubis.',
  },
  'ilioinguinal-nerve': {
    name: 'Ilioinguinal nerve (L1)',
    kind: 'nerve',
    about:
      'Enters the inguinal canal between the oblique muscles and leaves through the superficial ring, outside the spermatic cord, to the skin of the external genitalia and upper medial thigh.',
  },
  'genitofemoral-nerve': {
    name: 'Genitofemoral nerve and its genital branch (L1, L2)',
    kind: 'nerve',
    about:
      'Its genital branch runs in the spermatic cord and supplies the cremaster: the motor side of the cremasteric reflex.',
  },
  testis: {
    name: 'Testes',
    kind: 'organ',
    about:
      'Each develops in the lumbar region and descends through the inguinal canal behind the processus vaginalis, which is why an open processus means an indirect hernia.',
  },
  epididymis: {
    name: 'Epididymis',
    kind: 'organ',
    about:
      'A coiled tube along the lateral part of the back of each testis: head (the efferent ductules), body and tail, continuing as the ductus deferens. It stores the spermatozoa.',
  },
  'corpora-cavernosa': {
    name: 'Corpora cavernosa',
    kind: 'organ',
    about:
      'The two dorsal masses of erectile tissue, continuing forward from the crura on the pubic arch and ending under the glans. Each has a deep artery whose helicine branches fill it in erection.',
  },
  'corpus-spongiosum': {
    name: 'Corpus spongiosum',
    kind: 'organ',
    about:
      'The median erectile mass on the underside, continuing forward from the bulb, carrying the urethra, and expanding into the glans.',
  },
  'glans-penis': {
    name: 'Glans penis',
    kind: 'organ',
    about:
      'The expanded end of the corpus spongiosum; its rim is the corona, its lymph drains to the deep inguinal nodes (Cloquet’s node).',
  },
  'dorsal-arteries-of-penis': {
    name: 'Dorsal arteries of the penis',
    kind: 'artery',
    about:
      'Branches of the internal pudendal artery on the dorsum, deep to Buck’s fascia, either side of the deep dorsal vein, to the glans and the skin.',
  },
  'deep-dorsal-vein': {
    name: 'Deep dorsal vein of the penis',
    kind: 'vein',
    about:
      'Unpaired, in the midline deep to Buck’s fascia; it passes under the symphysis to the prostatic plexus.',
  },
  'ductus-deferens': {
    name: 'Ductus deferens',
    kind: 'organ',
    about:
      'The firm cord felt in the back of the spermatic cord, up through the inguinal canal to the deep ring and into the pelvis.',
  },
  'epigastric-region': {
    name: 'Epigastric region',
    kind: 'skin',
    about: 'Upper middle region, below the xiphoid: stomach, duodenum and pancreas.',
  },
  'right-hypochondriac-region': {
    name: 'Right hypochondriac region',
    kind: 'skin',
    about: 'Upper right, under the costal margin: liver and gallbladder.',
  },
  'left-hypochondriac-region': {
    name: 'Left hypochondriac region',
    kind: 'skin',
    about: 'Upper left, under the costal margin: stomach, spleen and the left colic flexure.',
  },
  'umbilical-region': {
    name: 'Umbilical region',
    kind: 'skin',
    about:
      'The centre, round the umbilicus: aorta, inferior vena cava and coils of small intestine.',
  },
  'right-lumbar-region': {
    name: 'Right lumbar (lateral) region',
    kind: 'skin',
    about: 'Right flank: right kidney and ureter, ascending colon.',
  },
  'left-lumbar-region': {
    name: 'Left lumbar (lateral) region',
    kind: 'skin',
    about: 'Left flank: left kidney and ureter, descending colon.',
  },
  'hypogastric-region': {
    name: 'Hypogastric (suprapubic) region',
    kind: 'skin',
    about: 'Lower middle, above the pubis: the bladder when full, an enlarged uterus.',
  },
  'right-iliac-region': {
    name: 'Right iliac (inguinal) region',
    kind: 'skin',
    about: 'Lower right, the right iliac fossa: caecum and appendix.',
  },
  'left-iliac-region': {
    name: 'Left iliac (inguinal) region',
    kind: 'skin',
    about: 'Lower left, the left iliac fossa: sigmoid colon.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type AbdominalWallPartId = keyof typeof PARTS;

/** The model's parts with these ids, in this order. */
export function abdominalWallParts(ids: AbdominalWallPartId[]): ModelPart[] {
  return ids.map((id) => ({ id, ...PARTS[id] }));
}

export const LUMBAR_VERTEBRAE: AbdominalWallPartId[] = [
  'first-lumbar-vertebra',
  'second-lumbar-vertebra',
  'third-lumbar-vertebra',
  'fourth-lumbar-vertebra',
  'fifth-lumbar-vertebra',
];

/** The skeleton of the abdomen: lumbar spine, pelvis, lower ribs and the costal margin. */
export const ABDOMINAL_SKELETON: AbdominalWallPartId[] = [
  ...LUMBAR_VERTEBRAE,
  'lumbar-discs',
  'sacrum',
  'hip-bones',
  'femurs',
  'lower-ribs',
  'costal-cartilages',
  'sternum',
];

export const WALL_MUSCLES: AbdominalWallPartId[] = [
  'external-oblique',
  'internal-oblique',
  'transversus-abdominis',
  'rectus-abdominis',
  'pyramidalis',
];

export const NINE_REGIONS: AbdominalWallPartId[] = [
  'epigastric-region',
  'right-hypochondriac-region',
  'left-hypochondriac-region',
  'umbilical-region',
  'right-lumbar-region',
  'left-lumbar-region',
  'hypogastric-region',
  'right-iliac-region',
  'left-iliac-region',
];

export const WALL_NERVES: AbdominalWallPartId[] = [
  'thoracoabdominal-nerves',
  'iliohypogastric-nerve',
  'ilioinguinal-nerve',
];

/**
 * The lines that divide the nine regions, drawn 2 mm in front of the region patches (measured on
 * the model): the subcostal plane at the top of L3, the transtubercular plane at L5, and the right
 * and left lateral vertical planes.
 */
export const REGION_LINES: ModelTrace[] = [
  {
    id: 'subcostal-plane',
    kind: 'outline',
    paths: [
      [
        [-150, -134, 1022],
        [-120, -180, 1022],
        [-90, -198, 1022],
        [-60, -213, 1022],
        [-30, -223, 1022],
        [0, -225, 1022],
        [30, -223, 1022],
        [60, -213, 1022],
        [90, -198, 1022],
        [120, -180, 1022],
        [150, -134, 1022],
      ],
    ],
  },
  {
    id: 'transtubercular-plane',
    kind: 'outline',
    paths: [
      [
        [-120, -157, 902],
        [-90, -160, 902],
        [-60, -182, 902],
        [-30, -191, 902],
        [0, -192, 902],
        [30, -191, 902],
        [60, -182, 902],
        [90, -160, 902],
        [120, -157, 902],
      ],
    ],
  },
  {
    id: 'lateral-planes',
    kind: 'outline',
    paths: [
      [
        [-73, -153, 810],
        [-73, -172, 860],
        [-73, -181, 910],
        [-73, -193, 960],
        [-73, -204, 1010],
        [-73, -220, 1060],
        [-73, -227, 1110],
      ],
      [
        [73, -153, 810],
        [73, -172, 860],
        [73, -181, 910],
        [73, -193, 960],
        [73, -204, 1010],
        [73, -220, 1060],
        [73, -227, 1110],
      ],
    ],
  },
];

/** The whole front of the abdomen. */
export const ABDOMEN_FRONT: CameraStop = {
  id: 'abdomen-front',
  title: 'The abdomen from the front',
  description:
    'From the xiphoid process and the costal margins above to the iliac crests, inguinal ligaments and pubic symphysis below.',
  target: [0, -150, 960],
  position: [0, -1250, 1000],
};

/** The lumbar spine and sacrum from the side. */
export const LUMBAR_SIDE: CameraStop = {
  id: 'lumbar-side',
  title: 'The lumbar spine and sacrum from the side',
  description:
    'Five large bodies, taller in front so the spine curves forward, with the discs between them; the fifth meets the sacrum at the lumbosacral angle.',
  target: [0, -60, 960],
  position: [-820, -60, 980],
};

/** The lumbar spine and sacrum from behind. */
export const LUMBAR_BACK: CameraStop = {
  id: 'lumbar-back',
  title: 'The lumbar spine and sacrum from behind',
  description:
    'Square spines, long transverse processes (longest at L3), the thick ones of L5, and below them the sacrum with its foramina and the hiatus at its lower end.',
  target: [0, -40, 900],
  position: [0, 820, 940],
};

/** The bony pelvis from the front. */
export const PELVIS_FRONT: CameraStop = {
  id: 'pelvis-front',
  title: 'The bony pelvis from the front',
  description:
    'The hip bones meeting at the pubic symphysis in front and holding the sacrum behind. The angle under the symphysis, the subpubic angle, is the clearest sign of sex.',
  target: [0, -80, 840],
  position: [0, -900, 880],
};

/** The pelvic inlet from above. */
export const PELVIS_ABOVE: CameraStop = {
  id: 'pelvis-above',
  title: 'The pelvic inlet from above',
  description:
    'Looking down into the true pelvis: the sacral promontory behind, the arcuate lines at the sides and the pubic crests in front ring the inlet.',
  target: [0, -70, 840],
  position: [0, -260, 1520],
};

export const MALE_GENITALIA: AbdominalWallPartId[] = [
  'testis',
  'epididymis',
  'ductus-deferens',
  'corpora-cavernosa',
  'corpus-spongiosum',
  'glans-penis',
  'dorsal-arteries-of-penis',
  'deep-dorsal-vein',
  'testicular-artery',
  'testicular-vein',
];

/** The external genitalia from the front. */
export const GENITALIA_FRONT: CameraStop = {
  id: 'genitalia-front',
  title: 'The external genitalia from the front',
  description:
    'The penis below the pubic symphysis, the testes below and behind it, and each ductus deferens climbing from the epididymis to the superficial inguinal ring.',
  target: [0, -150, 715],
  position: [0, -640, 780],
};

/** The penis and testis from the side. */
export const GENITALIA_SIDE: CameraStop = {
  id: 'genitalia-side',
  title: 'From the side',
  description:
    'The corpora cavernosa above, the corpus spongiosum below with the glans at its end; the testis hangs behind, the epididymis on its back.',
  target: [0, -150, 715],
  position: [-600, -190, 740],
};

/** The right inguinal region, close. */
export const INGUINAL_RIGHT: CameraStop = {
  id: 'inguinal-right',
  title: 'The right inguinal region',
  description:
    'The inguinal ligament from the anterior superior iliac spine to the pubic tubercle, with the ductus deferens in the canal above its medial half and the inferior epigastric artery behind.',
  target: [-55, -145, 820],
  position: [-260, -640, 880],
};

/** The rectus and its sheath from in front and to the right. */
export const RECTUS_FRONT: CameraStop = {
  id: 'rectus-front',
  title: 'Rectus abdominis and its sheath',
  description:
    'Rectus either side of the linea alba, wrapped by the aponeuroses of the three flat muscles; the epigastric arteries run behind it.',
  target: [-30, -190, 980],
  position: [-260, -800, 1050],
};
