/** A lecture on YouTube, played embedded beside the topic (from youtube-nocookie.com). */
export interface TopicVideo {
  /** The YouTube video id. */
  id: string;
  title: string;
  channel: string;
  seconds: number;
}

const video = (id: string, title: string, channel: string, seconds: number): TopicVideo => ({
  id,
  title,
  channel,
  seconds,
});

const ANATOMY_ZONE = 'AnatomyZone';
const KENHUB = 'Kenhub';
const KNOWLEDGE = 'Anatomy Knowledge';
const CATALYST = 'Catalyst University';
const TAIM = 'Taim Talks Med';
const KHANFOUR = 'Dr Ayman Khanfour Anatomy Teaching';
const DAVINCI = 'DaVinci Academy';
const NOTED = 'The Noted Anatomist';
const BLUELINK = 'BlueLink Anatomy';
const MEDICOSIS = 'Medicosis Perfectionalis';
const ARMANDO = 'Armando Hasudungan';
const BHANU = 'Dr G Bhanu Prakash';
const SANYAL = 'Sanjoy Sanyal';
const TONY = 'Tony’s Tutorial';
const HASANA = 'Dr Hasana';
const EBRAHEIM = 'Dr Nabil Ebraheim';

/**
 * Lectures for each topic, the fullest first. Chosen from teaching channels on 29 Sep 2026 (the
 * thorax and lower limb on 13 to 15 Oct 2026, the abdomen from 15 Oct 2026, the last of the pelvis on 18 Oct 2026); each
 * id was checked to allow embedding (YouTube's oEmbed answers for it) and its length read then.
 * ponytail: hand-picked; a reviewer screens new ones before they are added here.
 */
export const VIDEOS: Record<string, TopicVideo[]> = {
  'pectoral-region': [
    video('drSy0ez0puo', 'Pectoral region anatomy', 'Easy Anatomy for Medicos', 1257),
    video('obWpkAZUSVc', 'Lymphatic drainage of the breast', KENHUB, 121),
  ],
  axilla: [video('0R-UmyjGVN0', 'Anatomy of the axilla in two minutes', 'TeachMeAnatomy', 129)],
  'axillary-vessels': [
    video('qZBISp-JRUc', 'The axillary artery', 'Stanford Center for Health Education', 326),
    video('LPOK2jLNAsA', 'Axillary artery: location and branches', KENHUB, 116),
  ],
  'axillary-lymph-nodes': [
    video('AXpYNVLQhO0', 'Axillary lymph nodes', 'Dr Adel Bondok Anatomy Channel', 458),
  ],
  'brachial-plexus': [
    video('hrKesc_XSzo', 'Brachial plexus: structure and location', ANATOMY_ZONE, 513),
    video('qsjUz4ID_Ss', 'Brachial plexus: terminal branches', ANATOMY_ZONE, 338),
  ],
  'back-muscles': [video('dYw8JxT8QYo', 'Superficial back muscles', NOTED, 573)],
  'deltoid-rotator-cuff': [
    video('RaIt79pPfgE', 'The rotator cuff', ANATOMY_ZONE, 626),
    video('FSSGkYrYwqM', 'Deltoid: origin, insertion and action', KENHUB, 234),
  ],
  'scapular-spaces': [
    video('2QnVWQwXyz0', 'Quadrangular space, triangular space and interval', CATALYST, 676),
  ],
  'arm-front': [
    video('fPx5Sl-j8oI', 'The front compartment of the arm', CATALYST, 845),
    video('W6UQNlR9x-M', 'Coracobrachialis, brachialis and biceps (animation)', BHANU, 114),
  ],
  'arm-back-radial': [
    video('3M6dzH1i-GI', 'The radial nerve', ANATOMY_ZONE, 421),
    video(
      'rL04wzHpYJI',
      'Back of the arm: triceps, radial nerve, profunda brachii',
      'Medical Research Foundation',
      189,
    ),
  ],
  'cubital-fossa': [video('Nb_P7o_3clk', 'Cubital fossa: borders and contents', KNOWLEDGE, 187)],
  'elbow-joint': [video('S1Jo3Asc68g', 'The elbow joint', ANATOMY_ZONE, 612)],
  'forearm-flexors': [
    video('BjIab-huqgU', 'Forearm muscles: the front (flexor) compartment', ANATOMY_ZONE, 968),
  ],
  'forearm-extensors': [
    video('7F4dHDwwvhQ', 'Forearm muscles: the back (extensor) compartment', ANATOMY_ZONE, 918),
  ],
  'forearm-vessels-nerves': [
    video('kQSxpwNjgfI', 'Radial and ulnar arteries: course and branches', KNOWLEDGE, 189),
    video('1zA6TeMx2vc', 'Nerves of the forearm and hand muscles', 'The Noted Anatomist', 396),
  ],
  'carpal-tunnel': [
    video('48xySIuOpYI', 'Flexor retinaculum and the carpal tunnel', 'PT Exam Prep', 234),
    video('uas4vqUqr-g', 'Anatomy of carpal tunnel syndrome', 'Dr Nabil Ebraheim', 136),
  ],
  'wrist-back': [
    video('Sr1_BvpWEso', 'The anatomical snuffbox', KENHUB, 137),
    video(
      'DCTn5T3zLQ0',
      'Compartments of the extensor retinaculum',
      'Human Anatomy Education',
      240,
    ),
  ],
  'hand-muscles': [
    video('RKMA2bVmTE0', 'Thenar muscles of the hand', KENHUB, 209),
    video('31BYxnRWgRg', 'Interossei and lumbricals (animated)', 'Chris Yip', 170),
  ],
  'palm-vessels-nerves': [
    video('NbrrHxHlFCk', 'Palmar arterial arches', KNOWLEDGE, 321),
    video('EoTfDy8T5vM', 'The ulnar nerve', ANATOMY_ZONE, 342),
  ],
  'palm-spaces': [
    video('1pNpIPa-Ygs', 'Palmar aponeurosis and fibrous flexor sheaths', 'Raaonline', 418),
    video('1EgAjrjaYUY', 'Palmar aponeurosis of the hand', 'Novice Medic', 152),
  ],
  'elbow-anastomosis': [
    video('V9mKhHRDRbw', 'Anastomosis around the elbow joint', 'Dr Mohit Sheoran', 821),
  ],
  'shoulder-girdle': [
    video('CXAIhJPJVgI', 'The sternoclavicular joint', ANATOMY_ZONE, 228),
    video('lJ814afN3iI', 'The acromioclavicular joint', KENHUB, 95),
  ],
  'shoulder-joint': [video('vG1XQkj3Yx0', 'The shoulder (glenohumeral) joint', ANATOMY_ZONE, 698)],
  'radioulnar-joints': [
    video('L4VN67kFaLQ', 'Movements and muscles of the radioulnar joints', CATALYST, 723),
  ],
  'wrist-hand-joints': [video('LPU6-YF89xY', 'Wrist and hand joints', TAIM, 615)],
  'skin-veins-lymph': [
    video('N3CIyTJCo6U', 'Superficial veins: basilic and cephalic', KNOWLEDGE, 234),
  ],
  'surface-marking': [video('0GFx9HOE2Ss', 'Surface anatomy of the upper limb', KENHUB, 188)],
  'upper-limb-xrays': [
    video(
      '4vJRh1VS-Xo',
      'Reading X-rays of the elbow, forearm, wrist and hand',
      'TeachMeAnatomy',
      675,
    ),
    video('_PBhCQB4tMQ', 'Elbow ossification centres (CRITOE)', 'Radiology Channel', 361),
  ],
  'upper-limb-development': [
    video('eCY-KE3xxHA', 'Limb development and muscle migration', 'Lecturio', 630),
  ],
  'nerve-injuries': [
    video(
      '0AAligXLJ1A',
      'Claw hand, ape hand and the sign of benediction',
      'FSU College of Medicine',
      537,
    ),
  ],
  'thorax-introduction': [
    video('bXOrg-Fbgds', 'Thoracic cage: inlet, cavity and outlet', KHANFOUR, 2401),
    video('Z-TMJPst69w', 'Ribs and sternum: classification and landmarks', TAIM, 642),
  ],
  ribs: [
    video('Z-TMJPst69w', 'Ribs and sternum: classification and landmarks', TAIM, 642),
    video('EOXfnRK0-Ic', 'Thoracic cage: ribs, sternum and thoracic vertebrae', DAVINCI, 980),
  ],
  'sternum-thoracic-vertebrae': [
    video('EOXfnRK0-Ic', 'Thoracic cage: ribs, sternum and thoracic vertebrae', DAVINCI, 980),
    video('Ok8-nwVLysM', 'Thoracic vertebrae, typical and atypical', 'Med Tube', 325),
  ],
  'thoracic-joints-respiration': [
    video('ocj8C8yAg2E', 'How breathing actually works', KENHUB, 1133),
    video('dxEDGK4nAZM', 'Pump-handle and bucket-handle movements', 'Medical Lecture', 598),
  ],
  'intercostal-spaces': [
    video('A6rk-HArtmc', 'Intercostal spaces: muscles, vessels and nerves', KHANFOUR, 2382),
    video('CDegVLKtu28', 'Intercostal neurovascular bundle', 'Sam Webster', 1624),
  ],
  'internal-thoracic-azygos': [
    video('D4vcdePoRX4', 'Vessels of the thorax', DAVINCI, 1072),
    video('KXNsaZO9B1Q', 'Internal thoracic artery', 'Human Anatomy Lessons', 266),
    video('_H4gu8lnkoM', 'Azygos and hemiazygos veins', BHANU, 343),
  ],
  pleura: [
    video('FXp0EywEbFA', 'Anatomy of the pleura', 'Dr Adel Bondok Anatomy Channel', 670),
    video('sHNxOzXCHtc', 'The pleura: layers, recesses and clinical notes', NOTED, 543),
  ],
  lungs: [
    video('FSlPEK_E3FI', 'Lungs: lobes, fissures and blood supply', DAVINCI, 1206),
    video('LqA3LWhrtQo', 'The lungs: lobes, surfaces and clinical notes', NOTED, 644),
  ],
  'lung-root-bronchial-tree': [
    video('iSPEBBIK71c', 'Root of the lung', 'Dopamine Education', 1764),
    video('FSlPEK_E3FI', 'Lungs: lobes, fissures and blood supply', DAVINCI, 1206),
  ],
  'bronchopulmonary-segments': [
    video('h__5_UrKhfY', 'Bronchopulmonary segments', 'Quick Anatomy Revision', 1235),
    video('HswYNsu_nAg', 'Bronchopulmonary segments', 'Pulse Academy', 973),
  ],
  mediastinum: [
    video('41CVqLbPh-0', 'Anatomy of the mediastinum', 'Ninja Nerd', 2228),
    video('RBQyxZ0FOW4', 'The mediastinum: superior and inferior', MEDICOSIS, 1980),
  ],
  pericardium: [video('pKjx5Iqi2jQ', 'Pericardium, its cavity and sinuses', SANYAL, 516)],
  'heart-external-features': [
    video('NsBQSY-Ynws', 'Surfaces and borders of the heart', BLUELINK, 720),
    video('fCOZTNeB7kA', 'External features of the heart', 'Med Master Class', 391),
  ],
  'heart-chambers': [
    video('uhSBFOTwzDQ', 'The heart: external and internal structures', TAIM, 1099),
    video(
      'eFCK7IoV_sQ',
      'External and internal features of the heart',
      'Human Anatomy Education',
      753,
    ),
  ],
  'heart-valves-conduction': [
    video('kO8-hZ5-CeY', 'Cardiac valves', 'Radiology Tutorials', 1357),
    video('YNDqDqd2WkY', 'Cardiac conduction system', 'Dr Matt & Dr Mike', 965),
  ],
  'coronary-circulation': [
    video('WMp81Xds4DM', 'Coronary arteries and cardiac veins', BLUELINK, 1589),
    video('xuIFY3onWPQ', 'Coronary artery anatomy in 3D', 'Geeky Medics', 332),
    video('BiV5XJ0HWZI', 'Cardiac veins', KNOWLEDGE, 292),
  ],
  'fetal-circulation': [
    video('J56OcWZhZXQ', 'Fetal circulation', MEDICOSIS, 674),
    video('HVBu9HhTkD4', 'Fetal circulation', 'OPENPediatrics', 367),
  ],
  'svc-pulmonary-trunk': [
    video('paf-euzgW5o', 'The superior and inferior venae cavae', 'Sam Webster', 988),
    video(
      'aM4wm0Qpst0',
      'Arch branches, venae cavae and brachiocephalic veins',
      'Witty Anatomy',
      209,
    ),
  ],
  aorta: [
    video('-soBqyJdq40', 'The aorta, its sections and branches', ARMANDO, 756),
    video('oJhocDkExZ4', 'Arch of aorta: branches and relations', 'Air Anatomy', 750),
  ],
  trachea: [
    video('Dvxln66NrpY', 'Trachea', 'Angelina Issac', 566),
    video('e71FvCfVv9E', 'Trachea, bronchi and the respiratory tree', DAVINCI, 493),
  ],
  oesophagus: [
    video('qi126uCoE-8', 'The oesophagus', 'PAALS Anatomy', 1068),
    video('BZ0JBiPeek8', 'The oesophagus: clinical anatomy', ARMANDO, 911),
  ],
  'thoracic-duct': [
    video('qaw5VHOW_Ig', 'Thoracic duct in the posterior mediastinum', BLUELINK, 334),
    video('FfHouZJ9IH4', 'Thoracic duct: course, relations and tributaries', BHANU, 329),
    video('dqRGzbEUBHA', 'Thoracic duct', KNOWLEDGE, 147),
  ],
  'thorax-surface-xray': [
    video('C52UENd2xZU', 'Anatomy of the chest X-ray', 'The Radiologist', 1147),
    video('L6bnD2wOEmg', 'Reading a chest X-ray: method and anatomy', 'Strong Medicine', 611),
    video('sHFmxtxQelA', 'Surface anatomy of the thorax', 'sqadia.com', 295),
  ],
  'thigh-superficial': [
    video('urcNdYka2FI', 'Sensory nerves of the lower limb', 'Knockout Anatomy', 710),
    video('Kv6cQEc_Ijg', 'Superficial veins of the lower limb', KENHUB, 197),
  ],
  'femoral-triangle': [
    video('xBIjoo4lBcA', 'Femoral triangle', 'Angelina Issac', 1002),
    video('NMXdU4UIu9Y', 'Femoral triangle, canal and sheath', BHANU, 822),
  ],
  'femoral-vessels-nerve': [
    video('y6HEdcgR1i0', 'Femoral artery, vein, nerve and profunda femoris', SANYAL, 567),
    video('X6HPU4_5LME', 'Femoral nerve', BHANU, 239),
    video('wNRr37lZVaA', 'Femoral artery: course, branches and relations', BHANU, 234),
  ],
  'thigh-front-muscles': [
    video('BljfaN9tmTA', 'Anterior thigh muscles', NOTED, 293),
    video('8yZBBpOx-mU', 'Boundaries of the adductor canal', KENHUB, 236),
  ],
  'thigh-medial': [
    video('kXpD4xblBUI', 'Medial side of thigh and adductor canal', 'Dr Ahmed Farid', 3301),
    video('bYzIQfzlBRA', 'Muscles of the adductor compartment', TONY, 2025),
  ],
  'gluteal-muscles': [
    video('9dLw2mYcjt0', 'Muscles of the gluteal region', TONY, 1854),
    video('cF0zy4ub1V4', 'Muscles of the gluteal region', ANATOMY_ZONE, 856),
  ],
  'gluteal-nerves-vessels': [
    video('C8D-04qegXo', 'Gluteal region: greater and lesser sciatic foramina', KNOWLEDGE, 162),
  ],
  'popliteal-fossa': [
    video('IpSEdJrLBYc', 'Popliteal fossa', BHANU, 2484),
    video('-QsTZy2gga8', 'Popliteal fossa', ANATOMY_ZONE, 212),
  ],
  'popliteal-vessels-nerves': [
    video('VkgO_MuxxN8', 'Popliteal artery', BHANU, 311),
    video('WfKgB5q5Wjs', 'Common peroneal nerve and its branches', KNOWLEDGE, 214),
    video('7HO486qXxzw', 'Tibial nerve', KNOWLEDGE, 114),
  ],
  'knee-anastomoses': [
    video('_IoPNg1q0to', 'Anastomosis round the knee joint', BHANU, 912),
    video('zzr-8w_oLcM', 'Anastomosis round the knee: genicular arteries', HASANA, 405),
  ],
  hamstrings: [
    video('8TmbmENX7Fc', 'Muscles of the back of the thigh', BHANU, 1111),
    video('fCaQJRh-R4U', 'Posterior compartment of the thigh: hamstrings', KNOWLEDGE, 147),
  ],
  'sciatic-nerve-thigh': [
    video('dKsnNi2APDA', 'Sciatic nerve: course, branches and clinical points', KENHUB, 852),
    video('SyCwjOMZ91E', 'Sciatic nerve: course, relations and branches', BHANU, 416),
    video('pWl3s6X9cSk', 'Sciatic nerve', KNOWLEDGE, 200),
  ],
  'leg-superficial': [
    video('s8AdnKPkdSc', 'Leg: superficial fascia, cutaneous nerves and veins', HASANA, 576),
    video('RKZkHZLbUZw', 'Great saphenous vein', BHANU, 389),
    video('jZ-U-2v9X6U', 'Great and small saphenous veins', KNOWLEDGE, 278),
  ],
  'leg-front-muscles': [
    video(
      '83_ctEOFkhM',
      'Muscles of the leg: anterior and lateral compartments',
      ANATOMY_ZONE,
      971,
    ),
    video('XZA8yR1cDPI', 'Anterior compartment of the leg', 'Dr Divya N Pai', 281),
  ],
  'anterior-tibial-dorsalis-pedis': [
    video('AsCbJ5400m8', 'Anterior and posterior tibial arteries', TAIM, 428),
    video('kkID0CIvoLE', 'Dorsalis pedis artery', BHANU, 238),
    video('DHMCb4M-qeQ', 'Anterior tibial and dorsalis pedis arteries', KNOWLEDGE, 162),
  ],
  'leg-lateral-medial': [
    video(
      'wGjTcG4foIo',
      'Lateral compartment of the leg and superficial peroneal nerve',
      HASANA,
      378,
    ),
    video('LKk2TFRbLro', 'Lateral compartment of the leg', NOTED, 133),
  ],
  'calf-muscles': [
    video('F1J0HbV2n5s', 'Muscles of the leg: posterior compartment', ANATOMY_ZONE, 993),
    video('2sBUudzLNTI', 'Posterior compartment of the leg', NOTED, 274),
  ],
  'posterior-tibial-tibial-nerve': [
    video('rzmix1hwL_w', 'Tibial nerve and the tarsal tunnel', BHANU, 306),
    video('qsr4DnWT0a0', 'Tarsal tunnel anatomy', 'Vincent Stevenson', 183),
    video('kPA4i6xPn9s', 'Posterior tibial artery', KNOWLEDGE, 141),
  ],
  'sole-skin-fascia': [
    video('HYLJrlVIh9g', 'Plantar aponeurosis', 'ONE VISION MBBS', 649),
    video('Fc9F3yoVyvg', 'Sole of the foot: layers, nerves and plantar aponeurosis', HASANA, 651),
  ],
  'sole-layers-1-2': [
    video('P0_5ChpOnlU', 'Muscles of the sole of the foot', 'Angelina Issac', 1597),
    video('ftU9Utfmsxo', 'The four layers of the sole', 'VB Anatomy', 627),
  ],
  'sole-layers-3-4': [
    video(
      's0flRrM3gHw',
      'Sole of the foot: layers, muscles, nerves and blood supply',
      'Medvisor',
      1427,
    ),
    video('dg4QDyZmFoc', 'Muscles of the foot', TAIM, 420),
  ],
  'plantar-vessels-nerves': [
    video('a2qpCaC4itA', 'Plantar arch and the medial and lateral plantar nerves', HASANA, 568),
    video('__yEug8KHc0', 'Medial and lateral plantar nerves', 'Medical Research Foundation', 330),
    video('jsQErjPwmgY', 'Plantar arteries', KNOWLEDGE, 131),
  ],
  'lower-limb-veins': [
    video('v5edTHVz30s', 'Venous drainage of the lower limb', BHANU, 2027),
    video('AinzrO_qnHw', 'Veins of the lower limb', ANATOMY_ZONE, 517),
  ],
  'lower-limb-lymphatics': [
    video('IR-SsLxyRUw', 'Lymphatic drainage of the lower limb', 'Knowing Anatomy', 701),
    video('GhfWqCZ4miY', 'Lymphatic drainage of the lower limb', 'Dr Adel Bondok', 297),
  ],
  'lower-limb-dermatomes': [
    video('kJHXs0jee9M', 'Dermatomes and myotomes', MEDICOSIS, 734),
    video('SzAyUsA25MQ', 'Dermatomes of the lower limb', 'Physiotutors', 231),
    video('ptO9ZvsUPDg', 'Myotomes of the lower limb', 'Physiotutors', 174),
  ],
  'hip-joint': [
    video('RhDOCdZf1Fk', 'Hip joint: bones, ligaments, blood and nerve supply', KENHUB, 419),
    video(
      'G4w3lK_s63E',
      'Hip joint: ligaments, supply, movements and clinical anatomy',
      'Medical Research Foundation',
      688,
    ),
  ],
  'knee-joint': [
    video('ScVcCZP87xE', 'Anatomy of the knee joint', 'Human Anatomy Education', 1396),
    video('VvQig6CaPcE', 'Knee joint and its ligaments', 'Prof. Sanjaya Adikari', 761),
    video('fuEc_hSuX5Y', 'Locking and unlocking of the knee', 'medCampus', 149),
  ],
  'ankle-tibiofibular-joints': [video('2q0pG88bp0c', 'Ankle joint anatomy', 'Sam Webster', 1156)],
  'foot-joints': [
    video('QFGLp6rrxAE', 'Subtalar and transverse tarsal joints', TONY, 2081),
    video('tWMi-fi3KZo', 'Ankle and foot: muscle actions', 'Dr Jacob Goodin', 708),
  ],
  'foot-arches': [
    video('4VCecnBw_6E', 'Arches of the foot', 'Angelina Issac', 1235),
    video(
      'nQ3I_qi0sSQ',
      'Medial, lateral and transverse arches of the foot',
      'Medical Research Foundation',
      818,
    ),
  ],
  'lower-limb-surface-marking': [
    video('JNczJx2ju3I', 'Arteries of the lower limb: an overview', ANATOMY_ZONE, 315),
    video('6EsHOruv2SM', 'Feeling the lower limb pulses', 'Geeky Medics', 130),
  ],
  'lower-limb-xrays': [
    video('baiuVGGwXmQ', 'Lower limb X-rays: hip, knee, ankle and foot', 'Anatomy Decoded', 445),
    video('2fNmJHQYHMs', 'How to read a hip X-ray', 'Medicine Made Simple', 677),
    video('OqXgq7C_CYk', 'Interpreting X-rays of the knee', 'TeachMeAnatomy', 706),
  ],
  'lower-limb-nerve-injuries': [
    video('TpyGVLHp-g0', 'Lower limb nerve injuries', 'Sam Webster', 976),
    video('DnBJhTfUVgs', 'Foot drop: common peroneal nerve injury', EBRAHEIM, 403),
    video('HE0lk5MVFEg', 'Trendelenburg gait', EBRAHEIM, 215),
  ],
  'lower-limb-development': [
    video('EYCoaCtz9Is', 'Limb development', 'SCRUBS BSOM', 1019),
    video('eCY-KE3xxHA', 'Limb development and muscle migration', 'Lecturio', 630),
  ],
  'lumbar-vertebrae-sacrum': [
    video('cJcvFU83cSc', 'The vertebral column: thoracic and lumbar vertebrae', 'Rob Swatski', 427),
    video('7MD_nZdPA-Y', 'Lumbar vertebrae, sacrum and coccyx', 'Learn Medicine Asap', 128),
  ],
  'intervertebral-disc': [
    video(
      'wxL8K8hZUyU',
      'The nucleus pulposus and annulus fibrosus, and annular tears',
      'Douglas Gillard',
      1875,
    ),
  ],
  'bony-pelvis': [
    video(
      'SyLYjNh-E2Y',
      'Differences between the male and female bony pelvis',
      'Student Friendly Anatomy',
      903,
    ),
    video('n8rguEXAyd4', 'Male and female pelvis differences', 'Let’s Talk Anatomy', 429),
  ],
  'abdominal-regions': [
    video('IvIF2cRnV8c', 'Planes, regions and quadrants of the abdomen', 'Doc Jana', 181),
  ],
  'abdominal-wall-superficial': [
    video('4lVllncF73E', 'Superficial veins of the abdominal wall', KENHUB, 155),
    video('lprR429VFdg', 'Caput medusae and the paraumbilical veins', 'Dr Sushant', 475),
    video('zexQzpjyHjo', 'The anterior abdominal wall', 'More Than Skin Deep', 211),
  ],
  'abdominal-wall-muscles': [
    video('vZQTtRrDFmY', 'Anterolateral abdominal wall muscles', 'Sam Webster', 1351),
    video('6XTSK0BLAg4', 'Anterior abdominal wall: dissection', 'Human Anatomy Education', 621),
  ],
  'rectus-sheath': [
    video(
      '7ZyUOuvR2Kk',
      'Muscles of the anterior abdominal wall and the rectus sheath',
      'Prof. Sanjaya Adikari',
      425,
    ),
    video('aALGL0CDcLA', 'The arcuate line and the rectus sheath', 'Sam Webster', 829),
  ],
  'inguinal-canal': [
    video('Bu_1wh7ycVA', 'Inguinal canal and spermatic cord', 'The Noted Anatomist', 549),
    video('_gU8HJ-VSOE', 'Inguinal canal anatomy and hernias', 'DaVinci Academy', 833),
  ],
  penis: [
    video('razkCzuRgak', 'The penis', 'AnatomyZone', 226),
    video('7om6hv0wUHM', 'Anatomy of the penis', 'UroChannel', 513),
  ],
  'scrotum-testis': [
    video('ty6a_WTSnoc', 'The testis', 'Sam Webster', 1139),
    video('pU_ordJsXl4', 'Testes anatomy', 'DaVinci Academy', 1149),
  ],
  'testis-descent': [
    video('r9pqhl_c66g', 'Descent of the testes: embryology', 'Dr Sumit Gupta', 1965),
  ],
  peritoneum: [
    video('w2IIFHSw1dU', 'Intraperitoneal and retroperitoneal organs', 'AnatomyZone', 73),
    video(
      'i0vysDh9lo0',
      'Intraperitoneal, extraperitoneal and retroperitoneal organs',
      'Holly Peters',
      177,
    ),
  ],
  'peritoneal-folds': [
    video('1LvksU4bapk', 'Greater and lesser omentum', 'Anatomy 4 Students', 696),
    video('32do1LPhVd0', 'Structure and function of the greater omentum', KENHUB, 123),
    video('QaFx-BNky34', 'The lesser omentum', 'Sam Webster', 889),
  ],
  'lesser-sac': [
    video('_O10W3Xopc0', 'The lesser sac and epiploic foramen', 'Dr Sumit Gupta', 2310),
  ],
  'peritoneal-spaces': [
    video(
      '-rPaM_fBRuc',
      'Subphrenic and subhepatic spaces and the hepatorenal recess',
      'Anatomy 4 Students',
      827,
    ),
    video('1LbWgFzVJtM', 'The right and left paracolic gutters', 'Crystal Clear Anatomy', 503),
  ],
  stomach: [
    video('rIibe60_iJI', 'Stomach and duodenum anatomy', 'DaVinci Academy', 847),
    video('KR8yCSB-RXc', 'The oesophagus and stomach in 3D', 'AnatomyZone', 359),
  ],
  'stomach-supply': [
    video('wHhpTSxghYQ', 'The stomach: parts, supply and histology', 'EasyMedEdHub', 567),
    video(
      'KGD_0-LwH68',
      'The coeliac trunk: arterial supply to the stomach',
      'Anatomy Knowledge',
      430,
    ),
  ],
  duodenum: [
    video('hzMM6TTWRI8', 'The duodenum', 'Dr Ahmed Farid', 2293),
    video('jUS8usSbHkI', 'Duodenum: gross anatomy', 'Sam Webster', 1110),
  ],
  'jejunum-ileum': [video('FoUPBToJ6uo', 'The jejunum and ileum', 'Dr Ahmed Farid', 700)],
  'large-intestine': [
    video('BPS6g0arS0w', 'Large intestine: parts, topography and layers', 'Taim Talks Med', 1296),
    video('bH1gnPbbWXA', 'Anatomy of the caecum and appendix', 'Anatomy 4 Students', 1833),
  ],
  appendix: [
    video('E1fn1IJQGPo', 'Anatomy of the vermiform appendix', 'Dr Yusuf', 1393),
    video('bH1gnPbbWXA', 'Anatomy of the caecum and appendix', 'Anatomy 4 Students', 1833),
  ],
  'coeliac-trunk': [
    video('u3AtYI2_JIw', 'The coeliac trunk and its branches in 3D', 'AnatomyZone', 488),
    video('9NrtTj2Zrs4', 'The coeliac trunk in 4 minutes', 'AnatomySimplified', 239),
  ],
  'mesenteric-vessels': [
    video('VyqBPOCzbP4', 'Superior and inferior mesenteric arteries', 'Dr Adel Bondok', 1472),
    video('9UCJS98ibRQ', 'The inferior mesenteric artery', 'Dr Ahmed Farid', 1207),
    video('oSOqovLNYrA', 'The mesenteric arteries', 'Anatomy Knowledge', 221),
  ],
  'portal-vein': [
    video('k1UaVpXIq54', 'The portal vein and portacaval anastomoses', 'Dr Yusuf', 2236),
    video('VhZWLmAmPO0', 'The portal venous system', 'Dr Adel Bondok', 1439),
    video('YDY2UUmqrLg', 'Portocaval anastomoses in 8 minutes', 'Eva Sweeney', 472),
  ],
  'biliary-apparatus': [
    video('cTxAXonhLdI', 'Extrahepatic biliary apparatus', 'Creative Medicine', 1311),
    video('sryf2xz27UA', 'Biliary apparatus anatomy', 'medishare tips', 2428),
  ],
  spleen: [
    video('Ku0DSRDYlH4', 'The spleen: ligaments, relations and vessels', 'Sanjoy Sanyal', 576),
    video('muBNoer_aYI', 'The spleen and its peritoneal relations', 'Anatomy 4 Students', 551),
    video(
      '8Q0W34Q9skM',
      'Spleen: surfaces, borders, relations and ligaments',
      'Dr Shankar Dey',
      229,
    ),
  ],
  pancreas: [
    video('Ekj9TKd0O-4', 'The pancreas', 'Dr Yusuf', 2322),
    video('Rx8uTLKyG-Q', 'The pancreas: relations, vessels and lymph', 'Dr G Bhanu Prakash', 1111),
    video('4XXLZOg49Sg', 'Blood supply of the pancreas', 'Anatomy Knowledge', 286),
  ],
  liver: [
    video('FVNV8rEvDbA', 'Lobes of the liver', 'Anatomy 4 Students', 1373),
    video(
      'E9zTnGxLZ_s',
      'Liver: topography, external features and ligaments',
      'Taim Talks Med',
      785,
    ),
    video('6mU5aZnNl1Q', 'Gross anatomy of the liver', 'Human Anatomy Education', 381),
  ],
  'liver-segments': [
    video('4759zbY3PlA', 'Couinaud segments and liver resection', 'Dr Sajan Skaria', 934),
    video('7YMqdbLCgWc', 'Liver: surfaces and Couinaud segments', 'AyurEdge', 1794),
  ],
  kidney: [
    video('GmqOWi9sMkE', 'Kidney: coverings, blood and nerve supply', 'Dr Sumit Gupta', 1992),
    video('uXCqm8LFWH4', 'Coverings of the kidney', 'miniMEDSCHOOL', 363),
  ],
  ureter: [
    video('WDjXD_720gY', 'The ureter', 'Dr Sumit Gupta', 3167),
    video('-OWriKAZXc0', 'Anatomy of the ureter', 'Dr Adel Bondok', 624),
    video(
      'r2oyREsgGTU',
      'Ureter: constrictions, relations and blood supply',
      'Dr Ankit Singh',
      506,
    ),
  ],
  'suprarenal-gland': [
    video('0SwNu0_b0eA', 'The suprarenal (adrenal) gland', 'Dr Sumit Gupta', 2209),
    video('jbjK1uaRZQE', 'The adrenal gland', NOTED, 1170),
  ],
  diaphragm: [
    video('oDq8UDGw2P0', 'Diaphragm: origins, openings and coverings', TAIM, 426),
    video('6IK-YHK1ToM', 'The diaphragm', KENHUB, 272),
  ],
  'abdominal-aorta': [
    video('y2YfD7elRPo', 'The abdominal aorta', 'Dr Sumit Gupta', 2391),
    video('xKBqenJNtRY', 'Abdominal aorta: course, branches and mnemonics', TAIM, 546),
  ],
  'inferior-vena-cava': [
    video('V6kgaQkepI4', 'The inferior vena cava and its tributaries', TAIM, 274),
    video('CcSNk_jBfss', 'The inferior vena cava and its tributaries', KNOWLEDGE, 162),
  ],
  'posterior-abdominal-wall': [
    video('ovQYBAiv8cI', 'Muscles of the posterior abdominal wall in 3D', ANATOMY_ZONE, 450),
    video('AJ15tcu16Mw', 'Posterior abdominal wall muscles', 'Sam Webster', 490),
    video('tqd4dkurTog', 'The thoracolumbar fascia', 'Dr Sumit Gupta', 1687),
  ],
  'lumbar-plexus': [
    video('UmIDCHd0Ai4', 'The lumbar plexus: structure and branches', ANATOMY_ZONE, 575),
    video('CZ0t2mZL3os', 'The lumbar plexus', 'Ninja Nerd', 1550),
  ],
  'abdominal-autonomic-nerves': [
    video('WXO_nyFY9oM', 'Autonomic nerves of the abdomen', 'Access Anatomy', 665),
    video('3Oh5hp8Lt6Y', 'The coeliac plexus and ganglia', 'Sam Webster', 695),
  ],
  perineum: [
    video('AgRe2m-uaGI', 'The perineum: an overview', 'Dr Sumit Gupta', 3166),
    video('LTCzTMkYBkU', 'Anatomy of the perineum in 3D', 'Geeky Medics', 629),
  ],
  'ischioanal-fossa': [
    video('Nu9Dj2adtbs', 'The ischioanal fossa', 'Dr Sumit Gupta', 1630),
    video('SFq0hA3PwK4', 'The ischiorectal fossa', KENHUB, 337),
  ],
  'male-urogenital-region': [
    video('q0Ax3rLFc6M', 'The perineal membrane and deep perineal pouch in 3D', ANATOMY_ZONE, 437),
    video('uWnfxv3JQAU', 'The perineum and perineal pouches', 'Let’s Talk Anatomy', 951),
  ],
  'female-perineum': [
    video('0NFZUrDNadc', 'Female external genitalia in 3D', ANATOMY_ZONE, 264),
    video('WNRV8jES2_A', 'Female external genitalia', 'OB-GYN Simplified', 765),
  ],
  'pudendal-nerve-vessels': [
    video('EqMEpjMACYU', 'The pudendal nerve: course and branches', 'Dr Sumit Gupta', 1808),
    video('vB95a3W-w-o', 'The pudendal nerve and arteries', 'Sam Webster', 935),
  ],
  'pelvic-cavity': [
    video('NB0-8WCo9X4', 'The true pelvis: inlet and outlet', 'About Medicine', 275),
    video('P3BBAMWm2Eo', 'The pelvic diaphragm in 3D', ANATOMY_ZONE, 626),
    video('30m-27ZC5l0', 'Muscles of the pelvic walls', KENHUB, 222),
  ],
  'urinary-bladder': [
    video('tGouMldaQgU', 'The urinary bladder: supply and nerves', KENHUB, 509),
    video('g_ffnX9k5W4', 'Bladder anatomy', 'Sam Webster', 1164),
  ],
  urethra: [
    video('vkABAIc9n4E', 'The male urethra', 'Dr Mohit Sheoran', 601),
    video('frwhyFsSRBc', 'Parts of the urethra and extravasation of urine', 'Dr Hasana', 626),
  ],
  prostate: [
    video('4DmElNKDLN8', 'The prostate', 'Dr Sumit Gupta', 2580),
    video('W8zj-ewpVXU', 'Prostate gland anatomy', 'Sam Webster', 1269),
  ],
  'ductus-deferens': [
    video('39OKrzU3i1w', 'The vas deferens and accessory glands in 3D', ANATOMY_ZONE, 430),
    video(
      'v763U0tHXDU',
      'Ductus deferens, seminal vesicle and ejaculatory duct',
      'Medical Knowledge',
      485,
    ),
  ],
  'ovary-uterine-tube': [
    video('sNxBYJgANJE', 'The ovary and uterine tubes in 3D', ANATOMY_ZONE, 348),
    video(
      'kCKiFl6O8ac',
      'The ovary: fossa, features, relations and supply',
      'Bajrang Singh MBBS',
      2395,
    ),
  ],
  uterus: [
    video('J3oky60tXCc', 'Anatomy of the uterus in 3D', 'Geeky Medics', 671),
    video('drMAVw3R8DU', 'Parts of the uterus', 'Dr Mohit Sheoran', 948),
  ],
  'uterine-supports': [
    video('_Lt6NeRqkDM', 'The broad ligament of the uterus', 'Dr Sumit Gupta', 2210),
    video('cE336BTR9QQ', 'Ligaments of the female pelvis', '3D Anatomy Lyon', 301),
  ],
  vagina: [
    video('nXzVHaeBHxA', 'The vagina: relations, supports and supply', 'Dr Kanhu Dash', 746),
  ],
  rectum: [
    video('uiigShhQyH4', 'The rectum and anal canal', KENHUB, 446),
    video('xNyxbW9Np90', 'The rectum: supply, lymph and nerves', 'Emotional Medico', 373),
  ],
  'anal-canal': [
    video(
      'xD6vo3SHusk',
      'The anal canal: features, supply and lymph',
      'Let’s make medicine easy',
      1011,
    ),
    video('vuXN2g469-8', 'The anal canal, simplified', 'Human Anatomy Education', 710),
  ],
  'internal-iliac-vessels': [
    video('_kLR_Zegyok', 'Pelvic blood vessels: the internal iliac artery', DAVINCI, 1040),
    video('4Fp2gLbwBDs', 'The internal iliac artery', ANATOMY_ZONE, 510),
  ],
  'sacral-plexus': [
    video('f7Zig8eBCqY', 'The sacral plexus', 'Ninja Nerd', 1723),
    video('DZ0IL1tHNxo', 'The sacral plexus', ANATOMY_ZONE, 654),
  ],
  'pelvic-diaphragm': [
    video('nhfThLLe_m4', 'The pelvic floor muscles', 'Dr Mae Hughes', 337),
    video('M1HoJp7sc5I', 'Levator ani and its three parts', 'Abuja Orthopedics', 169),
  ],
  'pelvic-joints': [
    video('n4z8pXhVqWU', 'The sacroiliac joint', EBRAHEIM, 300),
    video('w_wNbPdR0YM', 'The pubic symphysis and sacroiliac joint', 'Lynh Lee', 231),
  ],
  'oxygen-haemoglobin-curve': [
    video('BYGPkRFvzOc', 'The oxygen–haemoglobin dissociation curve', ARMANDO, 712),
    video('bhJarMGNFw4', 'Oxygen–haemoglobin dissociation curve', 'Ninja Nerd', 1451),
  ],
};

export const videosOf = (slug: string): TopicVideo[] => VIDEOS[slug] ?? [];

/** "8 min", rounded up, as the lesson lengths are. */
export const videoMinutes = (video: TopicVideo): number =>
  Math.max(1, Math.ceil(video.seconds / 60));
