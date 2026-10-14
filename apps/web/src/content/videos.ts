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

/**
 * Lectures for each topic, the fullest first. Chosen from teaching channels on 29 Sep 2026 (the
 * thorax and lower limb on 13 and 14 Oct 2026); each
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
  'oxygen-haemoglobin-curve': [
    video('BYGPkRFvzOc', 'The oxygen–haemoglobin dissociation curve', ARMANDO, 712),
    video('bhJarMGNFw4', 'Oxygen–haemoglobin dissociation curve', 'Ninja Nerd', 1451),
  ],
};

export const videosOf = (slug: string): TopicVideo[] => VIDEOS[slug] ?? [];

/** "8 min", rounded up, as the lesson lengths are. */
export const videoMinutes = (video: TopicVideo): number =>
  Math.max(1, Math.ceil(video.seconds / 60));
