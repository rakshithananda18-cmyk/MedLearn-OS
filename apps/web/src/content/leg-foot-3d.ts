import type { CameraStop, ModelPart } from '@medlearn/schemas';

// The right leg and foot model shared by the leg topics. Coordinates are the BodyParts3D frame:
// millimetres, X towards the right side (negative), Y towards the back (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const LEG_FOOT_MODEL_SRC = '/models/leg-foot.glb?v=2';

/** Credit for the model, shown wherever it is. */
export const LEG_FOOT_MODEL_CREDIT =
  'Bones, muscles and vessels: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP); it has no peroneal artery, so its vein shows the path, of extensor digitorum brevis only the slip to the big toe, and of the interossei only the plantar ones. Nerves: Z-Anatomy, CC BY-SA 4.0.';

/**
 * Every mesh in the model file (built by scripts/models/build-models.mjs), by part id, with what
 * a student sees on picking it. Facts in our own words; not yet medically reviewed.
 */
const PARTS = {
  femur: {
    name: 'Femur (lower end)',
    kind: 'bone',
    about:
      'Its condyles carry the knee; gastrocnemius arises from just above them and plantaris from the lateral supracondylar line.',
  },
  patella: {
    name: 'Patella',
    kind: 'bone',
    about: 'The kneecap, in the quadriceps tendon, in front of the knee joint.',
  },
  tibia: {
    name: 'Tibia',
    kind: 'bone',
    about:
      'The weight-bearing bone of the leg. Its medial surface lies under the skin all the way down; the medial malleolus is its lower end.',
  },
  fibula: {
    name: 'Fibula',
    kind: 'bone',
    about:
      'The slender lateral bone, mainly for muscle attachment. The common peroneal nerve winds round its neck; the lateral malleolus is its lower end.',
  },
  talus: {
    name: 'Talus',
    kind: 'bone',
    about:
      'Sits in the socket made by the two malleoli and carries the body’s weight from the tibia to the rest of the foot. No muscle is attached to it.',
  },
  calcaneus: {
    name: 'Calcaneus',
    kind: 'bone',
    about:
      'The heel bone: the tendo calcaneus inserts on the middle of its back; its sustentaculum tali, under the medial malleolus, is a pulley for flexor hallucis longus.',
  },
  navicular: {
    name: 'Navicular',
    kind: 'bone',
    about:
      'On the medial side of the foot in front of the talus; its tuberosity, felt in front of the medial malleolus, takes the main insertion of tibialis posterior.',
  },
  cuboid: {
    name: 'Cuboid',
    kind: 'bone',
    about:
      'On the lateral side of the foot; the tendon of peroneus longus runs in the groove on its underside.',
  },
  cuneiforms: {
    name: 'Cuneiform bones',
    kind: 'bone',
    about:
      'Medial, intermediate and lateral. Tibialis anterior and peroneus longus both insert on the medial cuneiform and the base of the first metatarsal.',
  },
  metatarsals: {
    name: 'Metatarsals',
    kind: 'bone',
    about:
      'Five long bones of the forefoot. Peroneus brevis inserts on the tuberosity of the fifth, peroneus tertius on its dorsal surface.',
  },
  phalanges: {
    name: 'Phalanges of the toes',
    kind: 'bone',
    about:
      'Two in the big toe, three in each of the others; the long extensors and flexors reach their middle and distal phalanges.',
  },
  'tibialis-anterior': {
    name: 'Tibialis anterior',
    kind: 'muscle',
    about:
      'The most medial muscle of the front of the leg, from the lateral surface of the tibia to the medial cuneiform and first metatarsal. Dorsiflexes and inverts the foot. Deep peroneal nerve.',
  },
  'extensor-hallucis-longus': {
    name: 'Extensor hallucis longus',
    kind: 'muscle',
    about:
      'From the middle of the fibula to the distal phalanx of the big toe; its tendon crosses the anterior tibial artery from lateral to medial. Deep peroneal nerve.',
  },
  'extensor-digitorum-longus': {
    name: 'Extensor digitorum longus',
    kind: 'muscle',
    about:
      'From the lateral tibial condyle and fibula to the lateral four toes through the dorsal digital expansions. Deep peroneal nerve.',
  },
  'peroneus-tertius': {
    name: 'Peroneus tertius',
    kind: 'muscle',
    about:
      'A separated part of extensor digitorum longus, to the base of the fifth metatarsal; it dorsiflexes and everts the foot.',
  },
  'extensor-hallucis-brevis': {
    name: 'Extensor hallucis brevis',
    kind: 'muscle',
    about:
      'The medial slip of extensor digitorum brevis, the only muscle on the dorsum of the foot, from the calcaneus to the big toe. The model lacks the rest of the muscle.',
  },
  'peroneus-longus': {
    name: 'Peroneus longus',
    kind: 'muscle',
    about:
      'Superficial muscle of the lateral side, from the head and upper fibula; its tendon goes behind the lateral malleolus, under the cuboid and across the sole to the first metatarsal. Everts the foot. Superficial peroneal nerve.',
  },
  'peroneus-brevis': {
    name: 'Peroneus brevis',
    kind: 'muscle',
    about:
      'Under peroneus longus, from the lower fibula to the tuberosity of the fifth metatarsal. Everts the foot. Superficial peroneal nerve.',
  },
  gastrocnemius: {
    name: 'Gastrocnemius',
    kind: 'muscle',
    about:
      'The two-headed superficial calf muscle from above the femoral condyles; it joins soleus in the tendo calcaneus. Plantar-flexes the foot and flexes the knee. Tibial nerve.',
  },
  soleus: {
    name: 'Soleus',
    kind: 'muscle',
    about:
      'The broad flat muscle under gastrocnemius, from the fibula, the soleal line and the tendinous arch between them. The steady postural plantar flexor, and with its venous sinuses the peripheral heart.',
  },
  plantaris: {
    name: 'Plantaris',
    kind: 'muscle',
    about:
      'A small belly with the longest tendon in the body, running between gastrocnemius and soleus to the calcaneus; surgeons borrow the tendon for grafts.',
  },
  'calcaneal-tendon': {
    name: 'Tendo calcaneus',
    kind: 'muscle',
    about:
      'The thickest and strongest tendon of the body, about 15 cm long, formed by gastrocnemius and soleus and inserted on the middle of the back of the calcaneus.',
  },
  popliteus: {
    name: 'Popliteus',
    kind: 'muscle',
    about:
      'From the lateral femoral condyle, inside the joint capsule, to the back of the tibia above the soleal line; it unlocks the straightened knee.',
  },
  'flexor-digitorum-longus': {
    name: 'Flexor digitorum longus',
    kind: 'muscle',
    about:
      'Deep muscle from the back of the tibia to the distal phalanges of the lateral four toes; it crosses tibialis posterior above the ankle. Tibial nerve.',
  },
  'flexor-hallucis-longus': {
    name: 'Flexor hallucis longus',
    kind: 'muscle',
    about:
      'Deep muscle from the back of the fibula to the distal phalanx of the big toe; its tendon runs under the sustentaculum tali. Tibial nerve.',
  },
  'tibialis-posterior': {
    name: 'Tibialis posterior',
    kind: 'muscle',
    about:
      'The deepest muscle of the calf, from the interosseous membrane and both bones to the navicular tuberosity and most tarsal bones. Inverts the foot and holds up its medial arch. Tibial nerve.',
  },
  'abductor-hallucis': {
    name: 'Abductor hallucis',
    kind: 'muscle',
    about:
      'First layer of the sole, along its medial border from the calcaneus and flexor retinaculum to the big toe; it covers the plantar vessels and nerves as they enter. Medial plantar nerve.',
  },
  'flexor-digitorum-brevis': {
    name: 'Flexor digitorum brevis',
    kind: 'muscle',
    about:
      'First layer, in the middle under the plantar aponeurosis; its tendons split to let the long flexor tendons through and insert on the middle phalanges of the lateral four toes. Medial plantar nerve.',
  },
  'abductor-digiti-minimi': {
    name: 'Abductor digiti minimi',
    kind: 'muscle',
    about:
      'First layer, along the lateral border of the sole from the calcaneus to the little toe. Lateral plantar nerve.',
  },
  'flexor-accessorius': {
    name: 'Flexor digitorum accessorius',
    kind: 'muscle',
    about:
      'Second layer: two heads from the calcaneus into the tendon of flexor digitorum longus, straightening its oblique pull. Lateral plantar nerve.',
  },
  lumbricals: {
    name: 'Lumbricals',
    kind: 'muscle',
    about:
      'Second layer: four small muscles from the tendons of flexor digitorum longus to the extensor expansions of the lateral four toes; they keep the toes from buckling when walking. The first by the medial plantar nerve, the rest by the lateral.',
  },
  'flexor-hallucis-brevis': {
    name: 'Flexor hallucis brevis',
    kind: 'muscle',
    about:
      'Third layer, under the first metatarsal; its two tendons go to either side of the base of the big toe, each with a sesamoid. Medial plantar nerve.',
  },
  'adductor-hallucis': {
    name: 'Adductor hallucis',
    kind: 'muscle',
    about:
      'Third layer: an oblique head from the bases of the middle metatarsals and a transverse head across the toe joints, both to the lateral side of the big toe; it holds the transverse arch. Deep branch of the lateral plantar nerve.',
  },
  'flexor-digiti-minimi-brevis': {
    name: 'Flexor digiti minimi brevis',
    kind: 'muscle',
    about:
      'Third layer, along the fifth metatarsal to the little toe. Superficial branch of the lateral plantar nerve.',
  },
  'plantar-interossei': {
    name: 'Plantar interossei',
    kind: 'muscle',
    about:
      'Fourth layer: three muscles on the third to fifth metatarsals that pull those toes towards the second toe. Lateral plantar nerve. The model has no dorsal interossei.',
  },
  sartorius: {
    name: 'Sartorius (lower end)',
    kind: 'muscle',
    about:
      'With gracilis and semitendinosus it inserts on the upper medial tibia: the three guy ropes, one from each compartment of the thigh.',
  },
  gracilis: {
    name: 'Gracilis (lower end)',
    kind: 'muscle',
    about: 'The middle of the three guy ropes on the upper medial tibia; obturator nerve.',
  },
  semitendinosus: {
    name: 'Semitendinosus (lower end)',
    kind: 'muscle',
    about:
      'The lowest of the three guy ropes on the upper medial tibia; the anserine bursa separates their tendons.',
  },
  'popliteal-artery': {
    name: 'Popliteal artery',
    kind: 'artery',
    about:
      'Ends at the lower border of popliteus by dividing into the anterior and posterior tibial arteries.',
  },
  'anterior-tibial-artery': {
    name: 'Anterior tibial artery',
    kind: 'artery',
    about:
      'The artery of the front of the leg: through the top of the interosseous membrane, down on the membrane and tibia, and on as the dorsalis pedis midway between the malleoli.',
  },
  'dorsalis-pedis-artery': {
    name: 'Dorsalis pedis artery',
    kind: 'artery',
    about:
      'The continuation of the anterior tibial on the dorsum of the foot; its pulse is felt lateral to the tendon of extensor hallucis longus. It dips into the sole at the first intermetatarsal space.',
  },
  'arcuate-artery': {
    name: 'Arcuate artery',
    kind: 'artery',
    about:
      'A branch of the dorsalis pedis running laterally over the bases of the metatarsals; it gives the second to fourth dorsal metatarsal arteries.',
  },
  'lateral-tarsal-artery': {
    name: 'Lateral tarsal artery',
    kind: 'artery',
    about:
      'A branch of the dorsalis pedis over the navicular, under extensor digitorum brevis, to the lateral malleolar network.',
  },
  'posterior-tibial-artery': {
    name: 'Posterior tibial artery',
    kind: 'artery',
    about:
      'The artery of the back of the leg, from the lower border of popliteus to under the flexor retinaculum, where it divides into the medial and lateral plantar arteries. Its pulse is felt behind the medial malleolus.',
  },
  'plantar-arch': {
    name: 'Plantar arch',
    kind: 'artery',
    about:
      'The continuation of the lateral plantar artery across the bases of the metatarsals between the third and fourth layers of the sole, completed by the dorsalis pedis; it gives the plantar metatarsal arteries.',
  },
  'deep-plantar-artery': {
    name: 'Deep plantar artery',
    kind: 'artery',
    about:
      'The end of the dorsalis pedis, dipping through the first intermetatarsal space to complete the plantar arch.',
  },
  'medial-plantar-artery': {
    name: 'Medial plantar artery',
    kind: 'artery',
    about: 'The smaller terminal branch of the posterior tibial artery, along the medial sole.',
  },
  'lateral-plantar-artery': {
    name: 'Lateral plantar artery',
    kind: 'artery',
    about:
      'The larger terminal branch of the posterior tibial artery; it crosses the sole to form the plantar arch.',
  },
  'popliteal-vein': {
    name: 'Popliteal vein',
    kind: 'vein',
    about:
      'Formed at the lower border of popliteus from the veins of the tibial arteries; it receives the small saphenous vein.',
  },
  'peroneal-vein': {
    name: 'Peroneal vein',
    kind: 'vein',
    about:
      'With the peroneal artery, the largest branch of the posterior tibial, down along the fibula behind the ankle. The model has no peroneal artery: this vein shows its path.',
  },
  'anterior-tibial-vein': {
    name: 'Anterior tibial veins',
    kind: 'vein',
    about:
      'Deep veins with the anterior tibial artery; they join the posterior tibial veins at the lower border of popliteus to form the popliteal vein.',
  },
  'posterior-tibial-vein': {
    name: 'Posterior tibial veins',
    kind: 'vein',
    about:
      'Deep veins with the posterior tibial artery; the medial perforating veins above the ankle drain into them from the great saphenous system.',
  },
  'great-saphenous-vein': {
    name: 'Great saphenous vein',
    kind: 'vein',
    about:
      'From the medial end of the dorsal venous arch, in front of the medial malleolus, across the lower third of the tibia and up its medial border, with the saphenous nerve in front of it.',
  },
  'small-saphenous-vein': {
    name: 'Small saphenous vein',
    kind: 'vein',
    about:
      'From the lateral end of the dorsal venous arch, behind the lateral malleolus and up the middle of the calf with the sural nerve, to the popliteal vein.',
  },
  'dorsal-venous-arch': {
    name: 'Dorsal venous arch',
    kind: 'vein',
    about:
      'Across the dorsum of the foot over the metatarsals; its medial end starts the great saphenous vein, its lateral end the small.',
  },
  'tibial-nerve': {
    name: 'Tibial nerve',
    kind: 'nerve',
    about:
      'The nerve of the back of the leg: with the posterior tibial artery under soleus, on tibialis posterior, to under the flexor retinaculum, where it divides into the plantar nerves.',
  },
  'common-peroneal-nerve': {
    name: 'Common peroneal (fibular) nerve',
    kind: 'nerve',
    about:
      'Winds round the neck of the fibula under peroneus longus and divides into the superficial and deep peroneal nerves; injured there it gives foot drop.',
  },
  'superficial-peroneal-nerve': {
    name: 'Superficial peroneal nerve',
    kind: 'nerve',
    about:
      'The nerve of the lateral compartment: supplies the two peronei, pierces the deep fascia in the lower third of the leg and supplies most of the dorsum of the foot.',
  },
  'deep-peroneal-nerve': {
    name: 'Deep peroneal nerve',
    kind: 'nerve',
    about:
      'The nerve of the front of the leg and dorsum of the foot, beside the anterior tibial artery; it ends in the skin of the first toe cleft.',
  },
  'sural-nerve': {
    name: 'Sural nerve',
    kind: 'nerve',
    about:
      'From the tibial nerve between the heads of gastrocnemius, with the small saphenous vein behind the lateral malleolus, to the lateral border of the foot. Purely sensory, so it is used for nerve grafts.',
  },
  'sural-communicating-nerve': {
    name: 'Sural communicating nerve',
    kind: 'nerve',
    about:
      'From the common peroneal nerve, over the lateral head of gastrocnemius, to join the sural nerve about 5 cm above the heel.',
  },
  'saphenous-nerve': {
    name: 'Saphenous nerve',
    kind: 'nerve',
    about:
      'The branch of the femoral nerve that reaches the foot: down the medial leg in front of the great saphenous vein to the medial border of the foot.',
  },
  'medial-plantar-nerve': {
    name: 'Medial plantar nerve',
    kind: 'nerve',
    about:
      'The larger terminal branch of the tibial nerve, between abductor hallucis and flexor digitorum brevis; four muscles and the skin of the medial sole and medial three and a half toes, like the median nerve in the hand.',
  },
  'lateral-plantar-nerve': {
    name: 'Lateral plantar nerve',
    kind: 'nerve',
    about:
      'The smaller terminal branch of the tibial nerve, across the sole between the first and second layers; the other fourteen muscles of the sole and the lateral one and a half toes, like the ulnar nerve.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type LegFootPartId = keyof typeof PARTS;

/** Every part id, for checking the catalogue against the model build. */
export const LEG_FOOT_PART_IDS = Object.keys(PARTS) as LegFootPartId[];

/** The parts a topic shows, in the order given. */
export function legFootParts(ids: LegFootPartId[]): ModelPart[] {
  return ids.map((id) => ({ id, ...PARTS[id] }));
}

export const LEG_FOOT_BONES: LegFootPartId[] = [
  'femur',
  'patella',
  'tibia',
  'fibula',
  'talus',
  'calcaneus',
  'navicular',
  'cuboid',
  'cuneiforms',
  'metatarsals',
  'phalanges',
];

export const FRONT_LEG_MUSCLES: LegFootPartId[] = [
  'tibialis-anterior',
  'extensor-hallucis-longus',
  'extensor-digitorum-longus',
  'peroneus-tertius',
  'extensor-hallucis-brevis',
];

export const PERONEI: LegFootPartId[] = ['peroneus-longus', 'peroneus-brevis'];

export const CALF_SUPERFICIAL: LegFootPartId[] = [
  'gastrocnemius',
  'soleus',
  'plantaris',
  'calcaneal-tendon',
];

export const CALF_DEEP: LegFootPartId[] = [
  'popliteus',
  'flexor-digitorum-longus',
  'flexor-hallucis-longus',
  'tibialis-posterior',
];

export const SOLE_LAYER_1: LegFootPartId[] = [
  'abductor-hallucis',
  'flexor-digitorum-brevis',
  'abductor-digiti-minimi',
];

export const SOLE_LAYER_2: LegFootPartId[] = [
  'flexor-accessorius',
  'lumbricals',
  'flexor-digitorum-longus',
  'flexor-hallucis-longus',
];

export const SOLE_LAYER_3: LegFootPartId[] = [
  'flexor-hallucis-brevis',
  'adductor-hallucis',
  'flexor-digiti-minimi-brevis',
];

export const SOLE_LAYER_4: LegFootPartId[] = [
  'plantar-interossei',
  'tibialis-posterior',
  'peroneus-longus',
];

/** The right sole from below and in front. */
export const SOLE_BELOW: CameraStop = {
  id: 'sole',
  title: 'The sole from below',
  description:
    'Looking up at the sole: the toes at the top, the heel at the bottom, the big toe on the right.',
  target: [-85, -130, -45],
  position: [-97, -433, -517],
};

/** The right leg from the front. */
export const LEG_FRONT: CameraStop = {
  id: 'front',
  title: 'The leg from the front',
  description:
    'From the knee to the toes: the bare medial surface of the tibia, the muscles of the front between it and the fibula, and the dorsum of the foot.',
  target: [-85, -100, 180],
  position: [-138, -1198, 238],
};

/** The right leg from behind. */
export const LEG_BACK: CameraStop = {
  id: 'back',
  title: 'The leg from behind',
  description:
    'The calf: gastrocnemius and soleus joining in the tendo calcaneus, which ends on the heel.',
  target: [-80, -50, 200],
  position: [-138, 1046, 258],
};
