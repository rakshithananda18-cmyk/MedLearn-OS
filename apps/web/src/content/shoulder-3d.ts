import type { ModelPart, Point3 } from '@medlearn/schemas';

// The upper limb and chest model shared by the upper limb topics. Coordinates are the BodyParts3D
// frame: millimetres, X towards the right side (negative), Y towards the back (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const SHOULDER_MODEL_SRC = '/models/upper-limb.glb?v=6';

/** Credit for the model's bones, muscles and vessels, shown wherever the model is. */
export const SHOULDER_MODEL_CREDIT =
  'Bones, muscles and vessels: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP).';

/**
 * Every mesh in the model file (built by scripts/models/build-models.mjs), by part id, with what
 * a student sees on picking it. Facts in our own words; not yet medically reviewed.
 */
const PARTS = {
  clavicle: {
    name: 'Clavicle',
    kind: 'bone',
    about:
      'S-shaped strut from the sternum to the acromion that holds the upper limb away from the trunk. It forms the front of the apex of the axilla.',
  },
  scapula: {
    name: 'Scapula',
    kind: 'bone',
    about:
      'Flat triangular bone on the back of the chest wall. Subscapularis on its front forms the posterior wall of the axilla; its superior border bounds the apex.',
  },
  humerus: {
    name: 'Humerus',
    kind: 'bone',
    about:
      'Bone of the arm. Its intertubercular groove forms the narrow lateral wall of the axilla, and the axillary nerve winds round its surgical neck.',
  },
  'first-rib': {
    name: 'First rib',
    kind: 'bone',
    about:
      'The subclavian artery and vein become axillary at its outer border. With the clavicle and scapula it bounds the apex of the axilla.',
  },
  'upper-ribs': {
    name: 'Ribs 2 to 6',
    kind: 'bone',
    about:
      'With their costal cartilages and intercostal muscles, and covered by serratus anterior, they form the medial wall of the axilla. The breast lies over ribs 2 to 6.',
  },
  sternum: {
    name: 'Sternum',
    kind: 'bone',
    about:
      'Breastbone: manubrium, body and xiphoid process. The internal thoracic artery runs just lateral to its edge.',
  },
  'vertebra-c5': {
    name: 'C5 vertebra',
    kind: 'bone',
    about:
      'Fifth cervical vertebra. The C5 root of the brachial plexus leaves the spine just above it.',
  },
  'vertebra-c6': {
    name: 'C6 vertebra',
    kind: 'bone',
    about:
      'Sixth cervical vertebra. The C6 root of the brachial plexus leaves the spine just above it.',
  },
  'vertebra-c7': {
    name: 'C7 vertebra',
    kind: 'bone',
    about:
      'Seventh cervical vertebra. The C7 root leaves the spine just above it and the C8 root just below it.',
  },
  'vertebra-t1': {
    name: 'T1 vertebra',
    kind: 'bone',
    about:
      'First thoracic vertebra. The T1 root of the brachial plexus leaves the spine just below it.',
  },
  'pec-major': {
    name: 'Pectoralis major',
    kind: 'muscle',
    about:
      'Fan-shaped muscle from the clavicle, sternum and upper costal cartilages to the lateral lip of the intertubercular groove. Adducts and medially rotates the arm and forms the anterior axillary fold. Lateral and medial pectoral nerves.',
  },
  'pec-minor': {
    name: 'Pectoralis minor',
    kind: 'muscle',
    about:
      'From ribs 3 to 5 to the coracoid process; steadies the scapula. The key landmark of the axilla: it divides the axillary artery into three parts and the axillary nodes into three levels. Medial pectoral nerve.',
  },
  subclavius: {
    name: 'Subclavius',
    kind: 'muscle',
    about:
      'Small muscle from the first rib to the underside of the clavicle, enclosed by the clavipectoral fascia. Steadies the clavicle. Nerve to subclavius.',
  },
  serratus: {
    name: 'Serratus anterior',
    kind: 'muscle',
    about:
      'From the upper eight ribs to the medial border of the scapula. Holds the scapula to the chest and rotates it to raise the arm overhead. Long thoracic nerve: injury wings the scapula. Forms the medial wall of the axilla.',
  },
  subscapularis: {
    name: 'Subscapularis',
    kind: 'muscle',
    about:
      'Fills the front of the scapula and inserts into the lesser tubercle. A rotator cuff muscle and medial rotator of the arm. Upper and lower subscapular nerves. Posterior wall of the axilla.',
  },
  'teres-major': {
    name: 'Teres major',
    kind: 'muscle',
    about:
      'From the inferior angle of the scapula to the medial lip of the intertubercular groove; adducts and medially rotates the arm. At its lower border the axillary artery becomes the brachial artery.',
  },
  coracobrachialis: {
    name: 'Coracobrachialis',
    kind: 'muscle',
    about:
      'From the coracoid process to the middle of the humerus; flexes and adducts the arm. The musculocutaneous nerve pierces it. Part of the lateral wall of the axilla.',
  },
  'biceps-short': {
    name: 'Short head of biceps',
    kind: 'muscle',
    about:
      'Arises from the coracoid process with coracobrachialis and lies in the lateral wall of the axilla. Musculocutaneous nerve.',
  },
  'subclavian-artery': {
    name: 'Subclavian artery',
    kind: 'artery',
    about:
      'Arches over the first rib behind scalenus anterior and becomes the axillary artery at the outer border of the rib.',
  },
  'axillary-artery': {
    name: 'Axillary artery',
    kind: 'artery',
    about:
      'From the outer border of the first rib to the lower border of teres major. Pectoralis minor divides it into three parts, with one, two and three branches.',
  },
  // The same artery split where pectoralis minor crosses it.
  'axillary-artery-1': {
    name: 'First part of the axillary artery',
    kind: 'artery',
    about: 'Above pectoralis minor. One branch: the superior thoracic artery.',
  },
  'axillary-artery-2': {
    name: 'Second part of the axillary artery',
    kind: 'artery',
    about:
      'Behind pectoralis minor. Two branches: thoracoacromial and lateral thoracic. The cords of the brachial plexus are named by their position around it.',
  },
  'axillary-artery-3': {
    name: 'Third part of the axillary artery',
    kind: 'artery',
    about:
      'Below pectoralis minor. Three branches: subscapular, anterior and posterior circumflex humeral.',
  },
  'brachial-artery': {
    name: 'Brachial artery',
    kind: 'artery',
    about: 'Continues the axillary artery from the lower border of teres major down the arm.',
  },
  'thoracoacromial-artery': {
    name: 'Thoracoacromial artery',
    kind: 'artery',
    about:
      'Short trunk from the second part that pierces the clavipectoral fascia and splits into pectoral, deltoid, acromial and clavicular branches (the model shows the branches).',
  },
  'lateral-thoracic-artery': {
    name: 'Lateral thoracic artery',
    kind: 'artery',
    about:
      'From the second part, along the lower border of pectoralis minor; helps supply the breast. The pectoral lymph nodes lie along it.',
  },
  'subscapular-artery': {
    name: 'Subscapular artery',
    kind: 'artery',
    about:
      'The largest branch, from the third part along the lower border of subscapularis. Divides into the circumflex scapular and thoracodorsal arteries.',
  },
  'circumflex-scapular-artery': {
    name: 'Circumflex scapular artery',
    kind: 'artery',
    about:
      'Winds round the lateral border of the scapula to its back and joins the scapular anastomosis.',
  },
  'thoracodorsal-artery': {
    name: 'Thoracodorsal artery',
    kind: 'artery',
    about: 'Runs with the thoracodorsal nerve to latissimus dorsi.',
  },
  'anterior-circumflex-humeral-artery': {
    name: 'Anterior circumflex humeral artery',
    kind: 'artery',
    about:
      'Small branch of the third part that winds in front of the surgical neck of the humerus.',
  },
  'posterior-circumflex-humeral-artery': {
    name: 'Posterior circumflex humeral artery',
    kind: 'artery',
    about:
      'Passes with the axillary nerve through the quadrangular space and round the surgical neck, where a fracture can injure both.',
  },
  'internal-thoracic-artery': {
    name: 'Internal thoracic artery',
    kind: 'artery',
    about:
      'From the subclavian artery, down behind the costal cartilages about a finger’s breadth from the sternum. Its perforating branches supply the medial breast; the parasternal nodes lie along it.',
  },
  'subclavian-vein': {
    name: 'Subclavian vein',
    kind: 'vein',
    about:
      'Continues the axillary vein from the outer border of the first rib and joins the internal jugular vein to form the brachiocephalic vein.',
  },
  'axillary-vein': {
    name: 'Axillary vein',
    kind: 'vein',
    about:
      'Formed at the lower border of teres major by the basilic and brachial veins. Lies medial to the artery and receives the cephalic vein.',
  },
  'cephalic-vein': {
    name: 'Cephalic vein',
    kind: 'vein',
    about:
      'Superficial vein on the lateral side of the arm. Runs in the deltopectoral groove and pierces the clavipectoral fascia to join the axillary vein.',
  },
  'basilic-vein': {
    name: 'Basilic vein',
    kind: 'vein',
    about:
      'Superficial vein on the medial side of the arm. Pierces the deep fascia and joins the brachial veins to form the axillary vein.',
  },
  // Back, scapular region and arm (upper limb batch 2).
  'thoracic-vertebrae': {
    name: 'T2 to T12 vertebrae',
    kind: 'bone',
    about:
      'Their spines give origin to trapezius (all twelve), the rhomboids (T2 to T5 for rhomboid major) and latissimus dorsi (T7 to T12).',
  },
  'lower-ribs': {
    name: 'Ribs 7 to 12',
    kind: 'bone',
    about:
      'Latissimus dorsi takes a few slips from the lowest three or four ribs. The triangle of auscultation lies over ribs 6 and 7.',
  },
  radius: {
    name: 'Radius',
    kind: 'bone',
    about:
      'Lateral bone of the forearm. Biceps inserts into its tuberosity, which is why biceps is the strongest supinator.',
  },
  ulna: {
    name: 'Ulna',
    kind: 'bone',
    about:
      'Medial bone of the forearm. Triceps inserts into its olecranon and brachialis into its coronoid process and tuberosity.',
  },
  trapezius: {
    name: 'Trapezius',
    kind: 'muscle',
    about:
      'Flat triangular muscle from the skull, ligamentum nuchae and spines of C7 to T12 to the lateral third of the clavicle, acromion and spine of the scapula. Shrugs, braces back and rotates the scapula upwards so the arm can go above the head. Spinal accessory nerve.',
  },
  'levator-scapulae': {
    name: 'Levator scapulae',
    kind: 'muscle',
    about:
      'From the transverse processes of C1 to C4 to the medial border of the scapula above the spine. Raises the scapula. Dorsal scapular nerve and C3, C4.',
  },
  'rhomboid-major': {
    name: 'Rhomboid major',
    kind: 'muscle',
    about:
      'From the spines of T2 to T5 to the medial border of the scapula below the spine. Pulls the scapula back towards the spine and holds it to the chest wall. Dorsal scapular nerve.',
  },
  'rhomboid-minor': {
    name: 'Rhomboid minor',
    kind: 'muscle',
    about:
      'From the lower ligamentum nuchae and the spines of C7 and T1 to the medial border at the root of the spine of the scapula. Works with rhomboid major. Dorsal scapular nerve.',
  },
  deltoid: {
    name: 'Deltoid',
    kind: 'muscle',
    about:
      'Gives the shoulder its round contour. From the lateral third of the clavicle, the acromion and the spine of the scapula to the deltoid tuberosity of the humerus. The middle fibres abduct the arm from about 15 to 90 degrees. Axillary nerve.',
  },
  supraspinatus: {
    name: 'Supraspinatus',
    kind: 'muscle',
    about:
      'Rotator cuff muscle from the supraspinous fossa to the top of the greater tubercle, passing under the acromion. Starts abduction. Suprascapular nerve. Its tendon is the one most often inflamed or torn.',
  },
  infraspinatus: {
    name: 'Infraspinatus',
    kind: 'muscle',
    about:
      'Rotator cuff muscle from the infraspinous fossa to the middle facet of the greater tubercle. Rotates the arm laterally. Suprascapular nerve.',
  },
  'teres-minor': {
    name: 'Teres minor',
    kind: 'muscle',
    about:
      'Rotator cuff muscle from the upper lateral border of the scapula to the lowest facet of the greater tubercle. Rotates the arm laterally. Axillary nerve. Forms the upper border of the quadrangular space.',
  },
  'biceps-long': {
    name: 'Long head of biceps',
    kind: 'muscle',
    about:
      'Arises from the supraglenoid tubercle; its tendon runs inside the shoulder joint and down the intertubercular groove. With the short head it inserts into the radial tuberosity: flexes the elbow and is the strongest supinator. Musculocutaneous nerve.',
  },
  brachialis: {
    name: 'Brachialis',
    kind: 'muscle',
    about:
      'From the lower half of the front of the humerus to the coronoid process and tuberosity of the ulna. The main flexor of the elbow in every position. Musculocutaneous nerve (with a small radial nerve supply).',
  },
  'triceps-long': {
    name: 'Long head of triceps',
    kind: 'muscle',
    about:
      'From the infraglenoid tubercle of the scapula, so it also crosses the shoulder. It runs between teres minor and teres major and bounds the quadrangular and triangular spaces. Radial nerve.',
  },
  'triceps-lateral': {
    name: 'Lateral head of triceps',
    kind: 'muscle',
    about:
      'From the back of the humerus above the radial groove. Joins the common tendon to the olecranon. Radial nerve.',
  },
  'triceps-medial': {
    name: 'Medial head of triceps',
    kind: 'muscle',
    about:
      'The deep head, from the back of the humerus below the radial groove. Joins the common tendon to the olecranon. Radial nerve.',
  },
  anconeus: {
    name: 'Anconeus',
    kind: 'muscle',
    about:
      'Small muscle from the back of the lateral epicondyle to the olecranon; helps triceps extend the elbow. Radial nerve (through the nerve to the medial head of triceps).',
  },
  brachioradialis: {
    name: 'Brachioradialis',
    kind: 'muscle',
    about:
      'From the lateral supracondylar ridge to the lower end of the radius. Flexes the elbow with the forearm midway between pronation and supination. Radial nerve, which lies between it and brachialis above the elbow.',
  },
  'deep-brachial-artery': {
    name: 'Profunda brachii artery',
    kind: 'artery',
    about:
      'The largest branch of the brachial artery. It runs with the radial nerve through the lower triangular space and the radial groove, and ends as the radial and middle collateral arteries.',
  },
  'radial-collateral-artery': {
    name: 'Radial collateral artery',
    kind: 'artery',
    about:
      'Terminal branch of the profunda brachii that follows the radial nerve through the lateral intermuscular septum to the anastomosis round the elbow.',
  },
  'middle-collateral-artery': {
    name: 'Middle collateral artery',
    kind: 'artery',
    about:
      'Terminal branch of the profunda brachii that descends in the medial head of triceps to the anastomosis behind the elbow.',
  },
  'suprascapular-artery': {
    name: 'Suprascapular artery',
    kind: 'artery',
    about:
      'From the thyrocervical trunk of the first part of the subclavian. It crosses above the superior transverse scapular ligament (the nerve passes below it) and supplies both fossae. Part of the scapular anastomosis.',
  },
  'dorsal-scapular-artery': {
    name: 'Dorsal scapular artery',
    kind: 'artery',
    about:
      'From the subclavian artery (or the transverse cervical artery). Runs down along the medial border of the scapula with the dorsal scapular nerve. Part of the scapular anastomosis.',
  },
  // Elbow, front of the forearm and hand (upper limb batch 3).
  scaphoid: {
    name: 'Scaphoid',
    kind: 'bone',
    about:
      'Lateral bone of the proximal carpal row, felt in the anatomical snuffbox. Its tubercle takes the lateral end of the flexor retinaculum. The most often fractured carpal bone.',
  },
  lunate: {
    name: 'Lunate',
    kind: 'bone',
    about:
      'Middle bone of the proximal carpal row. The carpal bone most often dislocated: it slips forwards into the carpal tunnel and presses on the median nerve.',
  },
  triquetral: {
    name: 'Triquetral',
    kind: 'bone',
    about: 'Medial bone of the proximal carpal row, with the pisiform on its front.',
  },
  pisiform: {
    name: 'Pisiform',
    kind: 'bone',
    about:
      'Pea-shaped bone in the tendon of flexor carpi ulnaris. The medial end of the flexor retinaculum attaches to it; the ulnar nerve and artery pass just lateral to it.',
  },
  trapezium: {
    name: 'Trapezium',
    kind: 'bone',
    about:
      'Lateral bone of the distal carpal row. It carries the saddle joint of the thumb, and its crest takes the lateral end of the flexor retinaculum.',
  },
  trapezoid: {
    name: 'Trapezoid',
    kind: 'bone',
    about: 'Small bone of the distal carpal row, between the trapezium and the capitate.',
  },
  capitate: {
    name: 'Capitate',
    kind: 'bone',
    about: 'The largest carpal bone, in the middle of the distal row. It ossifies first.',
  },
  hamate: {
    name: 'Hamate',
    kind: 'bone',
    about:
      'Medial bone of the distal carpal row. Its hook takes the medial end of the flexor retinaculum; the deep branch of the ulnar nerve curls round it.',
  },
  metacarpals: {
    name: 'Metacarpals',
    kind: 'bone',
    about: 'The five bones of the palm, numbered from the thumb.',
  },
  phalanges: {
    name: 'Phalanges',
    kind: 'bone',
    about:
      'Bones of the digits: two in the thumb, three in each finger. Superficialis tendons insert into the middle phalanges and profundus tendons into the distal ones.',
  },
  'pronator-teres': {
    name: 'Pronator teres',
    kind: 'muscle',
    about:
      'Humeral head from the medial epicondyle, ulnar head from the coronoid process; the median nerve passes between them. Inserts into the middle of the lateral side of the radius and pronates the forearm. Median nerve.',
  },
  'flexor-carpi-radialis': {
    name: 'Flexor carpi radialis',
    kind: 'muscle',
    about:
      'From the medial epicondyle to the bases of the second and third metacarpals, its tendon in its own groove on the trapezium. Flexes and abducts the wrist. Median nerve. The radial pulse is felt just lateral to its tendon.',
  },
  'palmaris-longus': {
    name: 'Palmaris longus',
    kind: 'muscle',
    about:
      'From the medial epicondyle to the palmar aponeurosis, passing in front of the flexor retinaculum. Missing in some people, on one or both sides. Median nerve. Its tendon is a common graft.',
  },
  'flexor-carpi-ulnaris': {
    name: 'Flexor carpi ulnaris',
    kind: 'muscle',
    about:
      'Humeral head from the medial epicondyle, ulnar head from the olecranon and back of the ulna; the ulnar nerve enters the forearm between them. Inserts through the pisiform into the hamate and fifth metacarpal. Flexes and adducts the wrist. Ulnar nerve.',
  },
  'flexor-digitorum-superficialis': {
    name: 'Flexor digitorum superficialis',
    kind: 'muscle',
    about:
      'Middle layer. Humero-ulnar and radial heads joined by a fibrous arch the median nerve and ulnar artery pass under. Four tendons split to insert into the middle phalanges of the fingers. Median nerve.',
  },
  'flexor-digitorum-profundus': {
    name: 'Flexor digitorum profundus',
    kind: 'muscle',
    about:
      'Deep layer, from the front and medial side of the ulna and the interosseous membrane. Its tendons pierce the superficialis tendons to reach the distal phalanges. Medial half ulnar nerve, lateral half anterior interosseous nerve.',
  },
  'flexor-pollicis-longus': {
    name: 'Flexor pollicis longus',
    kind: 'muscle',
    about:
      'Deep layer, from the front of the radius, to the distal phalanx of the thumb. The only muscle that bends the tip of the thumb. Anterior interosseous nerve.',
  },
  'pronator-quadratus': {
    name: 'Pronator quadratus',
    kind: 'muscle',
    about:
      'Square muscle across the lower quarter of the front of the radius and ulna, the deepest in the forearm. The main pronator. Anterior interosseous nerve.',
  },
  supinator: {
    name: 'Supinator',
    kind: 'muscle',
    about:
      'Wraps round the upper radius and forms the lateral part of the floor of the cubital fossa. The deep branch of the radial nerve passes through it.',
  },
  'flexor-retinaculum': {
    name: 'Flexor retinaculum',
    kind: 'muscle',
    about:
      'Thick fibrous band from the pisiform and hook of the hamate to the scaphoid tubercle and trapezium. It roofs the carpal tunnel. Shown with the muscles because it is soft tissue, not bone.',
  },
  'thenar-muscles': {
    name: 'Thenar muscles',
    kind: 'muscle',
    about:
      'Abductor pollicis brevis, flexor pollicis brevis and opponens pollicis, the ball of the thumb. The recurrent branch of the median nerve supplies them after the carpal tunnel.',
  },
  'hypothenar-muscles': {
    name: 'Hypothenar muscles',
    kind: 'muscle',
    about:
      'Abductor, flexor and opponens digiti minimi, the ball of the little finger. The deep branch of the ulnar nerve supplies them.',
  },
  'radial-artery': {
    name: 'Radial artery',
    kind: 'artery',
    about:
      'The smaller terminal branch of the brachial artery. Under brachioradialis down the lateral forearm, then on the lower radius lateral to the flexor carpi radialis tendon, where its pulse is felt. It ends mainly as the deep palmar arch.',
  },
  'ulnar-artery': {
    name: 'Ulnar artery',
    kind: 'artery',
    about:
      'The larger terminal branch of the brachial artery. Under pronator teres and the superficialis arch, then with the ulnar nerve on its medial side under flexor carpi ulnaris. It crosses in front of the retinaculum and ends mainly as the superficial palmar arch.',
  },
  'radial-recurrent-artery': {
    name: 'Radial recurrent artery',
    kind: 'artery',
    about:
      'From the radial artery just below the elbow; it runs up to join the radial collateral artery in the anastomosis round the elbow.',
  },
  'ulnar-recurrent-arteries': {
    name: 'Ulnar recurrent arteries',
    kind: 'artery',
    about:
      'Anterior and posterior branches of the ulnar artery just below the elbow, running up in front of and behind the medial epicondyle to join the anastomosis round the elbow.',
  },
  'common-interosseous-artery': {
    name: 'Common interosseous artery',
    kind: 'artery',
    about:
      'A short trunk from the ulnar artery just below the elbow. It splits into the anterior and posterior interosseous arteries at the upper border of the interosseous membrane.',
  },
  'anterior-interosseous-artery': {
    name: 'Anterior interosseous artery',
    kind: 'artery',
    about:
      'Runs down on the front of the interosseous membrane with the anterior interosseous nerve, between flexor digitorum profundus and flexor pollicis longus, to pronator quadratus.',
  },
  'superficial-palmar-arch': {
    name: 'Superficial palmar arch',
    kind: 'artery',
    about:
      'Mainly the end of the ulnar artery, completed by a branch of the radial. It lies under the palmar aponeurosis, level with the fully stretched-out thumb.',
  },
  'deep-palmar-arch': {
    name: 'Deep palmar arch',
    kind: 'artery',
    about:
      'Mainly the end of the radial artery, completed by the deep branch of the ulnar. It lies on the bases of the metacarpals, about a finger breadth above the superficial arch.',
  },
  'median-cubital-vein': {
    name: 'Median cubital vein',
    kind: 'vein',
    about:
      'Joins the cephalic to the basilic vein across the front of the elbow. The bicipital aponeurosis separates it from the brachial artery and median nerve. The usual vein for taking blood.',
  },
  'median-antebrachial-vein': {
    name: 'Median vein of the forearm',
    kind: 'vein',
    about:
      'Drains the front of the palm up the middle of the forearm into the median cubital or basilic vein.',
  },
  // Back of the forearm and the hand (upper limb batch 4).
  'extensor-carpi-radialis-longus': {
    name: 'Extensor carpi radialis longus',
    kind: 'muscle',
    about:
      'From the lateral supracondylar ridge to the base of the second metacarpal, through the second compartment under the extensor retinaculum. Extends and abducts the wrist. Radial nerve, above its division, so it still works when the posterior interosseous nerve is cut.',
  },
  'extensor-carpi-radialis-brevis': {
    name: 'Extensor carpi radialis brevis',
    kind: 'muscle',
    about:
      'From the common extensor origin on the lateral epicondyle to the base of the third metacarpal, in the second compartment. Extends and abducts the wrist. Its origin is the usual site of tennis elbow. Deep branch of the radial nerve.',
  },
  'extensor-digitorum': {
    name: 'Extensor digitorum',
    kind: 'muscle',
    about:
      'From the common extensor origin to the extensor expansions of the four fingers, through the fourth compartment. Its tendons are linked on the back of the hand. Extends the fingers and wrist. Posterior interosseous nerve.',
  },
  'extensor-digiti-minimi': {
    name: 'Extensor digiti minimi',
    kind: 'muscle',
    about:
      'A slip from the common extensor origin to the extensor expansion of the little finger, through its own fifth compartment. Posterior interosseous nerve.',
  },
  'extensor-carpi-ulnaris': {
    name: 'Extensor carpi ulnaris',
    kind: 'muscle',
    about:
      'From the common extensor origin and the back of the ulna to the base of the fifth metacarpal, in the groove beside the ulnar styloid (sixth compartment). Extends and adducts the wrist. Posterior interosseous nerve.',
  },
  'abductor-pollicis-longus': {
    name: 'Abductor pollicis longus',
    kind: 'muscle',
    about:
      'Deep muscle from the backs of the radius, ulna and interosseous membrane to the base of the first metacarpal, through the first compartment with extensor pollicis brevis. Abducts the thumb. Posterior interosseous nerve.',
  },
  'extensor-pollicis-brevis': {
    name: 'Extensor pollicis brevis',
    kind: 'muscle',
    about:
      'Deep muscle from the back of the radius to the base of the proximal phalanx of the thumb, in the first compartment. Forms the front boundary of the anatomical snuffbox with abductor pollicis longus. Posterior interosseous nerve.',
  },
  'extensor-pollicis-longus': {
    name: 'Extensor pollicis longus',
    kind: 'muscle',
    about:
      'Deep muscle from the back of the ulna to the base of the distal phalanx of the thumb. Its tendon hooks round the dorsal tubercle of the radius (third compartment) and forms the back boundary of the anatomical snuffbox. Posterior interosseous nerve.',
  },
  'extensor-indicis': {
    name: 'Extensor indicis',
    kind: 'muscle',
    about:
      'Deep muscle from the back of the ulna to the extensor expansion of the index finger, in the fourth compartment beside extensor digitorum. Lets the index finger point on its own. Posterior interosseous nerve.',
  },
  'adductor-pollicis': {
    name: 'Adductor pollicis',
    kind: 'muscle',
    about:
      'Oblique head from the capitate and bases of the second and third metacarpals, transverse head from the shaft of the third metacarpal; both reach the base of the proximal phalanx of the thumb. Pulls the thumb against the palm, as in gripping a card. Deep branch of the ulnar nerve.',
  },
  lumbricals: {
    name: 'Lumbricals',
    kind: 'muscle',
    about:
      'Four slender muscles from the profundus tendons to the radial side of the extensor expansions. They bend the knuckles and straighten the finger joints, the position for writing. First and second: median nerve; third and fourth: deep branch of the ulnar nerve.',
  },
  'dorsal-interossei': {
    name: 'Dorsal interossei',
    kind: 'muscle',
    about:
      'Four two-headed muscles between the metacarpals, to the extensor expansions. They spread the fingers away from the middle finger (dorsal abduct), and help the lumbricals. Deep branch of the ulnar nerve.',
  },
  'palmar-interossei': {
    name: 'Palmar interossei',
    kind: 'muscle',
    about:
      'Small muscles on the palm side of the metacarpals. They bring the fingers together towards the middle finger (palmar adduct). Deep branch of the ulnar nerve.',
  },
  'princeps-pollicis-artery': {
    name: 'Princeps pollicis artery',
    kind: 'artery',
    about:
      'From the radial artery as it enters the palm; it splits into two branches along the palm side of the thumb.',
  },
  'radialis-indicis-artery': {
    name: 'Radialis indicis artery',
    kind: 'artery',
    about: 'From the radial artery in the palm, along the lateral side of the index finger.',
  },
  'palmar-metacarpal-arteries': {
    name: 'Palmar metacarpal arteries',
    kind: 'artery',
    about:
      'Three branches of the deep palmar arch on the interossei; they join the common palmar digital arteries of the superficial arch.',
  },
  'palmar-digital-arteries': {
    name: 'Palmar digital arteries',
    kind: 'artery',
    about:
      'Common digital arteries from the superficial palmar arch, each splitting into proper digital arteries along the adjacent sides of two fingers.',
  },
  'dorsal-carpal-branches': {
    name: 'Dorsal carpal branches',
    kind: 'artery',
    about:
      'Branches of the radial and ulnar arteries that form the dorsal carpal arch on the back of the wrist; it gives the dorsal metacarpal arteries.',
  },
  'dorsal-metacarpal-arteries': {
    name: 'Dorsal metacarpal arteries',
    kind: 'artery',
    about:
      'From the dorsal carpal arch and the radial artery, down the backs of the interosseous spaces to the fingers.',
  },
  'recurrent-interosseous-artery': {
    name: 'Recurrent interosseous artery',
    kind: 'artery',
    about:
      'From the posterior interosseous artery; it climbs behind the lateral epicondyle to the anastomosis round the elbow.',
  },
  'dorsal-venous-network': {
    name: 'Dorsal venous network',
    kind: 'vein',
    about:
      'The veins on the back of the hand. The cephalic vein leaves its lateral end and the basilic vein its medial end. A common site for a cannula.',
  },
  // Joints (upper limb batch 5).
  'interosseous-membrane': {
    name: 'Interosseous membrane',
    kind: 'muscle',
    about:
      'Fibrous sheet between the radius and ulna, its fibres running down and medially from radius to ulna, so force from the hand passes to the ulna and on to the humerus. It forms the middle radioulnar joint. Shown with the muscles because it is soft tissue, not bone.',
  },
  // Anastomosis round the elbow (upper limb batch 6).
  'superior-ulnar-collateral-artery': {
    name: 'Superior ulnar collateral artery',
    kind: 'artery',
    about:
      'From the brachial artery in the middle of the arm; it runs with the ulnar nerve behind the medial epicondyle and joins the posterior ulnar recurrent artery.',
  },
  'inferior-ulnar-collateral-artery': {
    name: 'Inferior ulnar collateral artery',
    kind: 'artery',
    about:
      'From the brachial artery just above the elbow; it passes in front of the medial epicondyle and joins the anterior ulnar recurrent artery.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type ShoulderPartId = keyof typeof PARTS;

/** Every part id, for checking the catalogue against the model build. */
export const SHOULDER_PART_IDS = Object.keys(PARTS) as ShoulderPartId[];

/** The parts a topic shows, in the order given. */
export function shoulderParts(ids: ShoulderPartId[]): ModelPart[] {
  return ids.map((id) => ({ id, ...PARTS[id] }));
}

/** The bones around the axilla, shown by every upper limb topic for orientation. */
export const AXILLA_BONES: ShoulderPartId[] = [
  'clavicle',
  'scapula',
  'humerus',
  'first-rib',
  'upper-ribs',
];

/** The bones of the wrist and hand, shown by the forearm and hand topics. */
export const HAND_BONES: ShoulderPartId[] = [
  'scaphoid',
  'lunate',
  'triquetral',
  'pisiform',
  'trapezium',
  'trapezoid',
  'capitate',
  'hamate',
  'metacarpals',
  'phalanges',
];

// Lymph node groups have no meshes in BodyParts3D: they are a MedLearn schematic, each a short
// chain placed along the vessels it lies beside in the model. Not yet medically reviewed.
export const LYMPH_GROUPS = {
  // Medial wall, along the lateral thoracic artery at the lower border of pectoralis minor.
  pectoral: [
    [-124, -132, 1228],
    [-122, -124, 1244],
    [-118, -116, 1260],
  ],
  // Lateral wall, behind the distal axillary vein.
  lateral: [
    [-150, -92, 1262],
    [-146, -95, 1276],
    [-141, -98, 1290],
  ],
  // Posterior wall, along the subscapular and thoracodorsal vessels.
  subscapular: [
    [-135, -70, 1240],
    [-135, -75, 1254],
    [-136, -81, 1268],
  ],
  // Deep to pectoralis minor, below the second part of the axillary artery.
  central: [
    [-112, -96, 1296],
    [-120, -94, 1290],
    [-128, -92, 1286],
  ],
  // At the apex, beside the first part of the axillary artery and vein.
  apical: [
    [-100, -112, 1336],
    [-90, -114, 1339],
    [-80, -116, 1342],
  ],
  // In the infraclavicular fossa, on the cephalic vein.
  deltopectoral: [
    [-158, -116, 1294],
    [-150, -119, 1302],
  ],
  // From the apical nodes along the subclavian vein towards the root of the neck.
  trunk: [
    [-80, -116, 1342],
    [-60, -118, 1346],
    [-40, -118, 1350],
    [-28, -120, 1350],
  ],
  // Beside the sternum, along the internal thoracic artery.
  parasternal: [
    [-22, -190, 1215],
    [-22, -180, 1240],
    [-22, -168, 1265],
  ],
} satisfies Record<string, Point3[]>;
