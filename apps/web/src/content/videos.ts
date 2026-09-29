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

/**
 * Lectures for each topic, the fullest first. Chosen from teaching channels on 29 Sep 2026; each
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
  'back-muscles': [video('dYw8JxT8QYo', 'Superficial back muscles', 'The Noted Anatomist', 573)],
  'deltoid-rotator-cuff': [
    video('RaIt79pPfgE', 'The rotator cuff', ANATOMY_ZONE, 626),
    video('FSSGkYrYwqM', 'Deltoid: origin, insertion and action', KENHUB, 234),
  ],
  'scapular-spaces': [
    video('2QnVWQwXyz0', 'Quadrangular space, triangular space and interval', CATALYST, 676),
  ],
  'arm-front': [
    video('fPx5Sl-j8oI', 'The front compartment of the arm', CATALYST, 845),
    video(
      'W6UQNlR9x-M',
      'Coracobrachialis, brachialis and biceps (animation)',
      'Dr G Bhanu Prakash',
      114,
    ),
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
  'wrist-hand-joints': [video('LPU6-YF89xY', 'Wrist and hand joints', 'Taim Talks Med', 615)],
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
  'oxygen-haemoglobin-curve': [
    video('BYGPkRFvzOc', 'The oxygen–haemoglobin dissociation curve', 'Armando Hasudungan', 712),
    video('bhJarMGNFw4', 'Oxygen–haemoglobin dissociation curve', 'Ninja Nerd', 1451),
  ],
};

export const videosOf = (slug: string): TopicVideo[] => VIDEOS[slug] ?? [];

/** "8 min", rounded up, as the lesson lengths are. */
export const videoMinutes = (video: TopicVideo): number =>
  Math.max(1, Math.ceil(video.seconds / 60));
