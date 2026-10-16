import type { CameraStop, ModelPart } from '@medlearn/schemas';

// The abdominal viscera in place, with their peritoneal folds and the great vessels of the gut,
// shared by the peritoneum and gut topics. Coordinates are the BodyParts3D frame: millimetres,
// X towards the right side (negative), Y towards the back (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const ABDOMINAL_ORGANS_MODEL_SRC = '/models/abdominal-organs.glb?v=4';

/** Credit for the model, shown wherever it is. */
export const ABDOMINAL_ORGANS_MODEL_CREDIT =
  'Organs, vessels, mesentery and bones: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP). Liver and its segments, pancreatic ducts, greater and lesser omentum, transverse mesocolon and sigmoid colon: Z-Anatomy, CC BY-SA 4.0. Lumbar plexus nerves, sympathetic trunks, thoracolumbar fascia and lymph nodes: Z-Anatomy, CC BY-SA 4.0. The parietal peritoneum and the small folds and recesses are not modelled; the lumbar sympathetic chains, the cisterna chyli and quadratus lumborum, which neither set has, are drawn as lines.';

/**
 * Every mesh in the model file (built by scripts/models/build-models.mjs), by part id, with what a
 * student sees on picking it. Facts in our own words; not yet medically reviewed.
 */
const PARTS = {
  'lumbar-spine': {
    name: 'Lumbar vertebrae',
    kind: 'bone',
    about:
      'The posterior abdominal wall’s spine: L1 at the transpyloric plane, L3 behind the umbilicus.',
  },
  sacrum: {
    name: 'Sacrum',
    kind: 'bone',
    about: 'The back of the pelvis; the sigmoid mesocolon’s root ends in front of its third piece.',
  },
  'hip-bones': {
    name: 'Hip bones',
    kind: 'bone',
    about: 'The iliac fossae hold the caecum on the right and the sigmoid colon on the left.',
  },
  'lower-ribs': {
    name: 'Seventh to twelfth ribs',
    kind: 'bone',
    about: 'The lower ribs shelter the liver, spleen, stomach and the upper poles of the kidneys.',
  },
  'costal-cartilages': {
    name: 'Costal cartilages',
    kind: 'bone',
    about: 'The costal margin, under which the liver and stomach lie.',
  },
  diaphragm: {
    name: 'Diaphragm',
    kind: 'muscle',
    about:
      'The roof of the abdominal cavity. Its undersurface is lined by parietal peritoneum; between it and the liver lie the subphrenic spaces.',
  },
  liver: {
    name: 'Liver',
    kind: 'organ',
    about:
      'Fills the right hypochondrium. Its peritoneal reflections, the falciform, coronary and triangular ligaments and the lesser omentum, come from the ventral mesogastrium; its bare area has no peritoneum.',
  },
  gallbladder: {
    name: 'Gallbladder',
    kind: 'organ',
    about:
      'Under the right lobe of the liver, its fundus at the tip of the ninth costal cartilage.',
  },
  'bile-duct': {
    name: 'Common hepatic and bile duct',
    kind: 'organ',
    about:
      'The common hepatic duct (about 3 cm) is joined by the cystic duct to form the bile duct (8 cm), which runs down the free margin of the lesser omentum, behind the first part of the duodenum and through the head of the pancreas, to open with the pancreatic duct on the major papilla.',
  },
  'hepatic-ducts': {
    name: 'Right and left hepatic ducts',
    kind: 'organ',
    about: 'Leave the liver at the porta hepatis, in front of the hepatic artery and portal vein.',
  },
  'cystic-duct': {
    name: 'Cystic duct',
    kind: 'organ',
    about:
      '3 to 4 cm from the neck of the gallbladder to the common hepatic duct; its lining forms the spiral valve of Heister.',
  },
  'pancreatic-ducts': {
    name: 'Main and accessory pancreatic ducts',
    kind: 'organ',
    about:
      'The main duct runs the length of the gland to join the bile duct at the major papilla; the accessory duct drains the upper head to the minor papilla.',
  },
  'liver-segment-1': {
    name: 'Segment I (caudate lobe)',
    kind: 'organ',
    about:
      'The caudate lobe, on the back between the IVC and the fissure for the ligamentum venosum; its veins drain straight into the IVC.',
  },
  'liver-segment-2': {
    name: 'Segment II',
    kind: 'organ',
    about: 'Left lateral, upper: left of the falciform ligament.',
  },
  'liver-segment-3': {
    name: 'Segment III',
    kind: 'organ',
    about: 'Left lateral, lower: left of the falciform ligament.',
  },
  'liver-segment-4': {
    name: 'Segment IV',
    kind: 'organ',
    about:
      'Left medial: between the falciform ligament and the gallbladder line; it includes the quadrate lobe.',
  },
  'liver-segment-5': {
    name: 'Segment V',
    kind: 'organ',
    about: 'Right anterior, lower, beside the gallbladder.',
  },
  'liver-segment-6': {
    name: 'Segment VI',
    kind: 'organ',
    about: 'Right posterior, lower.',
  },
  'liver-segment-7': {
    name: 'Segment VII',
    kind: 'organ',
    about: 'Right posterior, upper, under the dome of the diaphragm.',
  },
  'liver-segment-8': {
    name: 'Segment VIII',
    kind: 'organ',
    about: 'Right anterior, upper.',
  },
  'abdominal-oesophagus': {
    name: 'Abdominal oesophagus',
    kind: 'organ',
    about:
      'About 1.25 cm long, from the hiatus at T10 to the cardiac orifice at T11. A site of portosystemic anastomosis: its veins drain both to the left gastric (portal) and to the azygos (systemic).',
  },
  stomach: {
    name: 'Stomach',
    kind: 'organ',
    about:
      'Intraperitoneal: the lesser omentum hangs from its lesser curvature, the greater omentum from its greater curvature.',
  },
  spleen: {
    name: 'Spleen',
    kind: 'organ',
    about:
      'In the left hypochondrium, held by the gastrosplenic and lienorenal ligaments, both from the dorsal mesogastrium.',
  },
  pancreas: {
    name: 'Pancreas',
    kind: 'organ',
    about:
      'Retroperitoneal across the posterior wall; the transverse mesocolon is attached along its head and the anterior border of its body.',
  },
  duodenum: {
    name: 'Duodenum',
    kind: 'organ',
    about:
      'Retroperitoneal except its first 2.5 cm, which the hepatoduodenal ligament (lesser omentum) reaches; the root of the mesentery crosses its third part.',
  },
  jejunum: {
    name: 'Jejunum',
    kind: 'organ',
    about:
      'Intraperitoneal coils in the upper left of the infracolic compartment, on the mesentery.',
  },
  ileum: {
    name: 'Ileum',
    kind: 'organ',
    about:
      'Intraperitoneal coils lower and to the right, ending at the caecum; also on the mesentery.',
  },
  'ascending-colon': {
    name: 'Caecum and ascending colon',
    kind: 'organ',
    about:
      'Covered by peritoneum in front and at the sides only: its mesentery is lost in development. The right paracolic gutter runs along its lateral side.',
  },
  appendix: {
    name: 'Vermiform appendix',
    kind: 'organ',
    about: 'Hung by the mesoappendix from the back of the lower end of the mesentery.',
  },
  'transverse-colon': {
    name: 'Transverse colon',
    kind: 'organ',
    about:
      'Intraperitoneal, hung on the transverse mesocolon, which divides the greater sac into supracolic and infracolic compartments.',
  },
  'descending-colon': {
    name: 'Descending colon',
    kind: 'organ',
    about:
      'Partly covered by peritoneum, its mesentery lost; the left paracolic gutter runs along its lateral side down into the pelvis.',
  },
  'taeniae-coli': {
    name: 'Taeniae coli',
    kind: 'muscle',
    about:
      'Three ribbons of longitudinal muscle that pucker the colon into sacculations. They meet at the base of the appendix, a guide to finding it at operation, and spread out again at the end of the sigmoid colon.',
  },
  'sigmoid-colon': {
    name: 'Sigmoid colon',
    kind: 'organ',
    about:
      'Intraperitoneal on the sigmoid mesocolon, whose root is an inverted V over the left common iliac artery and the left ureter.',
  },
  rectum: {
    name: 'Rectum',
    kind: 'organ',
    about:
      'Peritoneum covers its upper parts in front and at the sides; below, it turns forward onto the bladder or uterus, making the deepest pouch of the cavity.',
  },
  kidneys: {
    name: 'Kidneys',
    kind: 'organ',
    about:
      'Retroperitoneal on the posterior wall; the hepatorenal pouch lies in front of the upper part of the right one.',
  },
  'suprarenal-glands': {
    name: 'Suprarenal glands',
    kind: 'organ',
    about:
      'Retroperitoneal on the upper poles of the kidneys; the right lies behind the epiploic foramen.',
  },
  ureters: {
    name: 'Ureters',
    kind: 'organ',
    about:
      'Retroperitoneal; the root of the mesentery crosses the right, the sigmoid mesocolon the left.',
  },
  'urinary-bladder': {
    name: 'Urinary bladder',
    kind: 'organ',
    about:
      'Subperitoneal: peritoneum covers only its upper surface, then passes back onto the rectum (rectovesical pouch).',
  },
  'greater-omentum': {
    name: 'Greater omentum',
    kind: 'membrane',
    about:
      'An apron of four fused layers from the greater curvature of the stomach, folded back up to the transverse colon and pancreas. Fat, macrophages (milky spots) and a habit of sealing off infection: the policeman of the abdomen.',
  },
  'lesser-omentum': {
    name: 'Lesser omentum',
    kind: 'membrane',
    about:
      'From the lesser curvature and the first 2 cm of the duodenum to the liver (fissure for the ligamentum venosum and porta hepatis). Its free right margin holds the portal vein, hepatic artery and bile duct, in front of the epiploic foramen.',
  },
  'transverse-mesocolon': {
    name: 'Transverse mesocolon',
    kind: 'membrane',
    about:
      'Suspends the transverse colon from the head and anterior border of the body of the pancreas; it carries the middle colic vessels.',
  },
  mesentery: {
    name: 'Mesentery of the small intestine',
    kind: 'membrane',
    about:
      'A fan with a 15 cm root, from the duodenojejunal flexure left of L2 to the right sacroiliac joint, and a 6 m pleated border on the jejunum and ileum.',
  },
  mesoappendix: {
    name: 'Mesoappendix',
    kind: 'membrane',
    about:
      'A small triangle from the back of the lower end of the mesentery, carrying the appendicular artery.',
  },
  'abdominal-aorta': {
    name: 'Abdominal aorta',
    kind: 'artery',
    about:
      'Retroperitoneal; its three ventral branches supply the three parts of the gut: coeliac trunk (foregut), superior mesenteric (midgut), inferior mesenteric (hindgut).',
  },
  'inferior-vena-cava': {
    name: 'Inferior vena cava',
    kind: 'vein',
    about:
      'Retroperitoneal, to the right of the aorta; it forms the back wall of the epiploic foramen.',
  },
  'coeliac-trunk': {
    name: 'Coeliac trunk',
    kind: 'artery',
    about:
      'The artery of the foregut, at the transpyloric plane: left gastric, common hepatic and splenic.',
  },
  'splenic-artery': {
    name: 'Splenic artery',
    kind: 'artery',
    about: 'Along the upper border of the pancreas to the spleen through the lienorenal ligament.',
  },
  'superior-mesenteric-artery': {
    name: 'Superior mesenteric artery',
    kind: 'artery',
    about: 'The artery of the midgut, running down in the root of the mesentery.',
  },
  'inferior-mesenteric-artery': {
    name: 'Inferior mesenteric artery',
    kind: 'artery',
    about: 'The artery of the hindgut, behind the peritoneum of the left infracolic compartment.',
  },
  'portal-vein': {
    name: 'Portal vein',
    kind: 'vein',
    about: 'In the free margin of the lesser omentum, behind the bile duct and hepatic artery.',
  },
  'splenic-vein': {
    name: 'Splenic vein',
    kind: 'vein',
    about: 'Behind the pancreas, joining the superior mesenteric vein to form the portal vein.',
  },
  'superior-mesenteric-vein': {
    name: 'Superior mesenteric vein',
    kind: 'vein',
    about: 'To the right of its artery in the root of the mesentery.',
  },
  'inferior-mesenteric-vein': {
    name: 'Inferior mesenteric vein',
    kind: 'vein',
    about: 'Up behind the peritoneum; it lies in the fold beside the paraduodenal recess.',
  },
  'left-gastric-artery': {
    name: 'Left gastric artery',
    kind: 'artery',
    about:
      'The smallest branch of the coeliac trunk: up to the cardiac end, giving oesophageal branches, then down the lesser curvature in the lesser omentum to meet the right gastric.',
  },
  'hepatic-artery': {
    name: 'Common and proper hepatic artery',
    kind: 'artery',
    about:
      'The common hepatic runs right to the first part of the duodenum; after giving the gastroduodenal it goes up as the proper hepatic in the free margin of the lesser omentum, left of the bile duct and in front of the portal vein.',
  },
  'gastroduodenal-artery': {
    name: 'Gastroduodenal artery',
    kind: 'artery',
    about:
      'Behind the first part of the duodenum, where a posterior duodenal ulcer can erode it; it ends as the right gastroepiploic and superior pancreaticoduodenal arteries.',
  },
  'right-gastric-artery': {
    name: 'Right gastric artery',
    kind: 'artery',
    about: 'From the proper hepatic artery, left along the lesser curvature to the left gastric.',
  },
  'right-gastroepiploic-artery': {
    name: 'Right gastroepiploic artery',
    kind: 'artery',
    about:
      'From the gastroduodenal, along the greater curvature in the greater omentum, supplying both and meeting the left gastroepiploic.',
  },
  'left-gastroepiploic-artery': {
    name: 'Left gastroepiploic artery',
    kind: 'artery',
    about: 'From the end of the splenic artery, down the greater curvature to the right one.',
  },
  'superior-pancreaticoduodenal-arteries': {
    name: 'Superior pancreaticoduodenal arteries',
    kind: 'artery',
    about:
      'Anterior and posterior, from the gastroduodenal, down the groove between the duodenum and the head of the pancreas: the foregut supply of the duodenum.',
  },
  'inferior-pancreaticoduodenal-artery': {
    name: 'Inferior pancreaticoduodenal artery',
    kind: 'artery',
    about:
      'The first branch of the superior mesenteric, up in the same groove to meet the superior arteries: foregut meets midgut at the major papilla.',
  },
  'middle-colic-artery': {
    name: 'Middle colic artery',
    kind: 'artery',
    about:
      'From the superior mesenteric just below the pancreas, forward in the transverse mesocolon to the right two-thirds of the transverse colon.',
  },
  'right-colic-artery': {
    name: 'Right colic artery',
    kind: 'artery',
    about: 'Behind the peritoneum to the ascending colon and the right colic flexure.',
  },
  'ileocolic-artery': {
    name: 'Ileocolic artery',
    kind: 'artery',
    about:
      'The last branch on the right of the superior mesenteric: to the end of the ileum, the caecum (anterior and posterior caecal arteries), the start of the ascending colon and, through the appendicular artery, the appendix.',
  },
  'appendicular-artery': {
    name: 'Appendicular artery',
    kind: 'artery',
    about:
      'From the lower division of the ileocolic, behind the end of the ileum and along the free edge of the mesoappendix. An end artery: if it clots, the appendix becomes gangrenous.',
  },
  'marginal-artery': {
    name: 'Marginal artery',
    kind: 'artery',
    about:
      'The arcade along the inner border of the colon joining the ileocolic, right, middle and left colic and sigmoid arteries; it can carry the supply of a colon whose main artery is tied.',
  },
  'left-colic-artery': {
    name: 'Left colic artery',
    kind: 'artery',
    about:
      'The first branch of the inferior mesenteric: up and left behind the peritoneum to the left third of the transverse colon and the descending colon.',
  },
  'sigmoid-arteries': {
    name: 'Sigmoid arteries',
    kind: 'artery',
    about: 'Two to four, down and left in the sigmoid mesocolon to the sigmoid colon.',
  },
  'superior-rectal-artery': {
    name: 'Superior rectal artery',
    kind: 'artery',
    about:
      'The inferior mesenteric continued over the left common iliac vessels into the pelvis, to the rectum and the upper anal canal.',
  },
  'left-gastric-vein': {
    name: 'Left gastric vein',
    kind: 'vein',
    about:
      'Along the lesser curvature to the portal vein; it receives oesophageal veins, so it is the portal side of the anastomosis that swells into oesophageal varices.',
  },
  'right-gastric-vein': {
    name: 'Right gastric vein',
    kind: 'vein',
    about: 'Along the lesser curvature to the portal vein; it receives the prepyloric vein.',
  },
  'hepatic-veins': {
    name: 'Hepatic veins',
    kind: 'vein',
    about:
      'Right, middle and left, running between the segments to open straight into the IVC behind the liver; they help hold the liver in place.',
  },
  'renal-arteries': {
    name: 'Renal arteries',
    kind: 'artery',
    about:
      'From the aorta at L2; each divides into an anterior division (four segmental arteries) and a posterior division (one), all end arteries.',
  },
  'renal-veins': {
    name: 'Renal veins',
    kind: 'vein',
    about:
      'In front of the arteries at the hilum, to the IVC; the longer left vein crosses in front of the aorta below the superior mesenteric artery.',
  },
  'testicular-arteries': {
    name: 'Testicular arteries',
    kind: 'artery',
    about:
      'From the aorta below the renal arteries, down the posterior wall, crossing in front of the ureters, to the deep inguinal rings.',
  },
  'testicular-veins': {
    name: 'Testicular veins',
    kind: 'vein',
    about:
      'Up beside the arteries, in front of the ureters; the left ends in the left renal vein, the right in the IVC.',
  },
  'common-iliac-vessels': {
    name: 'Common iliac vessels',
    kind: 'artery',
    about:
      'The ureter enters the pelvis by crossing in front of the end of the common iliac artery.',
  },
  'psoas-major': {
    name: 'Psoas major',
    kind: 'muscle',
    about:
      'From the sides of T12 to L5, their discs and the lumbar transverse processes, down over the pelvic brim to the lesser trochanter. The kidneys and ureters lie on it; the lumbar plexus forms inside it.',
  },
  iliacus: {
    name: 'Iliacus',
    kind: 'muscle',
    about:
      'Fills the iliac fossa and joins the psoas tendon to the lesser trochanter: together, iliopsoas, the strongest flexor of the hip. Supplied by the femoral nerve.',
  },
  'inferior-phrenic-arteries': {
    name: 'Inferior phrenic arteries',
    kind: 'artery',
    about:
      'The first branches of the abdominal aorta, just above the coeliac trunk; up on the crura to the diaphragm, giving the superior suprarenal arteries.',
  },
  'suprarenal-arteries': {
    name: 'Middle and inferior suprarenal arteries',
    kind: 'artery',
    about:
      'The middle from the aorta beside the superior mesenteric artery, the inferior from the renal artery; with the superior (from the inferior phrenic), three arteries to each gland.',
  },
  'suprarenal-veins': {
    name: 'Suprarenal veins',
    kind: 'vein',
    about:
      'One vein from each gland’s hilum: the short right one straight into the IVC, the left one down into the left renal vein.',
  },
  'lumbar-arteries': {
    name: 'Lumbar arteries',
    kind: 'artery',
    about:
      'Four pairs from the back of the aorta, round the sides of L1 to L4 behind psoas and quadratus lumborum, to the muscles of the back and the abdominal wall.',
  },
  'lumbar-veins': {
    name: 'Lumbar and ascending lumbar veins',
    kind: 'vein',
    about:
      'The third and fourth lumbar veins open into the IVC; the first and second into the ascending lumbar vein, which links the common iliac veins to the azygos and hemiazygos.',
  },
  'azygos-veins': {
    name: 'Azygos and hemiazygos veins',
    kind: 'vein',
    about:
      'Begin in the abdomen from the back of the IVC and the left renal vein (or the ascending lumbar and subcostal veins); the azygos goes up through the aortic opening, the hemiazygos through the left crus.',
  },
  'iliac-arteries': {
    name: 'External and internal iliac arteries',
    kind: 'artery',
    about:
      'The two ends of each common iliac artery, in front of the sacroiliac joint: the external to the lower limb, the internal into the pelvis.',
  },
  'iliohypogastric-nerves': {
    name: 'Iliohypogastric nerves (L1)',
    kind: 'nerve',
    about:
      'Out of the lateral border of psoas, across quadratus lumborum behind the kidney, through transversus abdominis above the iliac crest; to the abdominal muscles and the skin over the buttock and above the pubis.',
  },
  'ilioinguinal-nerves': {
    name: 'Ilioinguinal nerves (L1)',
    kind: 'nerve',
    about:
      'Below the iliohypogastric on the same course, then through the inguinal canal and out of the superficial ring, to the upper medial thigh and the front of the scrotum or labium majus.',
  },
  'genitofemoral-nerves': {
    name: 'Genitofemoral nerves (L1, L2)',
    kind: 'nerve',
    about:
      'The only branch through the front of psoas; it splits into a genital branch (through the deep ring, to cremaster) and a femoral branch (in the femoral sheath, to the skin below the inguinal ligament).',
  },
  'lateral-femoral-cutaneous-nerves': {
    name: 'Lateral cutaneous nerves of the thigh (L2, L3)',
    kind: 'nerve',
    about:
      'Out of the lateral border of psoas, across iliacus to the anterior superior iliac spine, behind the inguinal ligament into the thigh; pressed there it causes meralgia paraesthetica.',
  },
  'femoral-nerves': {
    name: 'Femoral nerves (L2 to L4, dorsal divisions)',
    kind: 'nerve',
    about:
      'The largest branch: out of the lateral border of psoas low down, in the groove between psoas and iliacus under the fascia iliaca, behind the inguinal ligament outside the femoral sheath.',
  },
  'obturator-nerves': {
    name: 'Obturator nerves (L2 to L4, ventral divisions)',
    kind: 'nerve',
    about:
      'The only branch out of the medial border of psoas: behind the common iliac vessels, along the side wall of the pelvis to the obturator canal and the adductors.',
  },
  'sympathetic-trunks': {
    name: 'Sympathetic trunks (to L1)',
    kind: 'nerve',
    about:
      'The thoracic chains entering the abdomen behind the medial arcuate ligaments. Below this the lumbar chains run down the fronts of the vertebral bodies, drawn here as lines.',
  },
  'thoracolumbar-fascia': {
    name: 'Thoracolumbar fascia',
    kind: 'membrane',
    about:
      'Three layers in the loin: the posterior behind erector spinae, the middle between it and quadratus lumborum, the anterior in front of quadratus lumborum, thickened above as the lateral arcuate ligament.',
  },
  'aortic-lymph-nodes': {
    name: 'Aortic lymph nodes',
    kind: 'organ',
    about:
      'Pre-aortic nodes (coeliac, superior and inferior mesenteric) drain the gut and form the intestinal trunk; lateral aortic nodes drain the kidneys, suprarenals, gonads and body wall and form the lumbar trunks.',
  },
  'iliac-lymph-nodes': {
    name: 'Common and external iliac lymph nodes',
    kind: 'organ',
    about:
      'Along the iliac arteries; the external from the inguinal nodes, the deep lower abdominal wall and some pelvic organs, the common from both external and internal iliac groups, on to the lateral aortic nodes.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type AbdominalOrgansPartId = keyof typeof PARTS;

// The viscera are all of kind organ: each gets its own colour, solid, so they read apart; the
// peritoneal folds a see-through fatty yellow. The X-ray tool still sees through all of them.
const solid = (colour: string) => ({ colour: `--color-viscus-${colour}`, opacity: 1 });
const fold = (opacity: number) => ({ colour: '--color-viscus-omentum', opacity });
const LOOK: Partial<Record<AbdominalOrgansPartId, Pick<ModelPart, 'colour' | 'opacity'>>> = {
  liver: solid('liver'),
  gallbladder: solid('gallbladder'),
  'bile-duct': solid('gallbladder'),
  'abdominal-oesophagus': solid('stomach'),
  'hepatic-ducts': solid('gallbladder'),
  'cystic-duct': solid('gallbladder'),
  'pancreatic-ducts': solid('gallbladder'),
  // Eight segments in eight colours, so their borders show.
  'liver-segment-1': solid('suprarenal'),
  'liver-segment-2': solid('spleen'),
  'liver-segment-3': solid('stomach'),
  'liver-segment-4': solid('pancreas'),
  'liver-segment-5': solid('gallbladder'),
  'liver-segment-6': solid('kidney'),
  'liver-segment-7': solid('colon'),
  'liver-segment-8': solid('liver'),
  stomach: solid('stomach'),
  spleen: solid('spleen'),
  pancreas: solid('pancreas'),
  duodenum: solid('small-bowel'),
  jejunum: solid('small-bowel'),
  ileum: solid('small-bowel'),
  'ascending-colon': solid('colon'),
  appendix: solid('colon'),
  'transverse-colon': solid('colon'),
  'descending-colon': solid('colon'),
  'sigmoid-colon': solid('colon'),
  rectum: solid('colon'),
  kidneys: solid('kidney'),
  'suprarenal-glands': solid('suprarenal'),
  ureters: solid('ureter'),
  'urinary-bladder': solid('bladder'),
  'greater-omentum': fold(0.45),
  'lesser-omentum': fold(0.5),
  'transverse-mesocolon': fold(0.5),
  mesentery: fold(0.4),
  mesoappendix: fold(0.5),
  'aortic-lymph-nodes': { colour: '--color-anat-lymph', opacity: 1 },
  'iliac-lymph-nodes': { colour: '--color-anat-lymph', opacity: 1 },
};

/**
 * The model's parts with these ids, in this order; those in `faint` see-through, so the vessels
 * behind a solid organ show.
 */
export function abdominalOrgansParts(
  ids: AbdominalOrgansPartId[],
  faint: AbdominalOrgansPartId[] = [],
): ModelPart[] {
  return ids.map((id) => ({
    id,
    ...PARTS[id],
    ...LOOK[id],
    ...(faint.includes(id) && { opacity: 0.3 }),
  }));
}

export const ORGANS_SKELETON: AbdominalOrgansPartId[] = [
  'lumbar-spine',
  'sacrum',
  'hip-bones',
  'lower-ribs',
  'costal-cartilages',
];

export const VISCERA: AbdominalOrgansPartId[] = [
  'liver',
  'gallbladder',
  'stomach',
  'spleen',
  'pancreas',
  'duodenum',
  'jejunum',
  'ileum',
  'ascending-colon',
  'appendix',
  'transverse-colon',
  'descending-colon',
  'sigmoid-colon',
  'rectum',
  'kidneys',
  'suprarenal-glands',
  'ureters',
  'urinary-bladder',
];

export const PERITONEAL_FOLDS: AbdominalOrgansPartId[] = [
  'greater-omentum',
  'lesser-omentum',
  'transverse-mesocolon',
  'mesentery',
  'mesoappendix',
];

export const GUT_VESSELS: AbdominalOrgansPartId[] = [
  'abdominal-aorta',
  'inferior-vena-cava',
  'coeliac-trunk',
  'splenic-artery',
  'superior-mesenteric-artery',
  'inferior-mesenteric-artery',
  'portal-vein',
  'splenic-vein',
  'superior-mesenteric-vein',
  'inferior-mesenteric-vein',
];

/** The coeliac trunk's branches, which supply the stomach. */
export const COELIAC_BRANCHES: AbdominalOrgansPartId[] = [
  'left-gastric-artery',
  'hepatic-artery',
  'gastroduodenal-artery',
  'right-gastric-artery',
  'right-gastroepiploic-artery',
  'left-gastroepiploic-artery',
  'superior-pancreaticoduodenal-arteries',
];

/** The branches of the superior and inferior mesenteric arteries. */
export const MESENTERIC_BRANCHES: AbdominalOrgansPartId[] = [
  'inferior-pancreaticoduodenal-artery',
  'middle-colic-artery',
  'right-colic-artery',
  'ileocolic-artery',
  'appendicular-artery',
  'marginal-artery',
  'left-colic-artery',
  'sigmoid-arteries',
  'superior-rectal-artery',
];

/** The viscera from the front. */
export const ORGANS_FRONT: CameraStop = {
  id: 'organs-front',
  title: 'The abdomen opened from the front',
  description:
    'The liver and stomach above, the greater omentum hanging from the stomach over the coils of intestine, the colon framing them.',
  target: [0, -140, 975],
  position: [0, -1150, 1010],
};

/** The upper abdomen from below and to the right: the lesser omentum and its free margin. */
export const LESSER_OMENTUM_VIEW: CameraStop = {
  id: 'lesser-omentum',
  title: 'The lesser omentum',
  description:
    'Lift the liver in the mind’s eye: the lesser omentum runs from the lesser curvature up to the liver, its free right margin holding the portal vein, with the epiploic foramen behind it.',
  target: [-15, -135, 1080],
  position: [-170, -470, 690],
};

/** From the left side, to see front-to-back layering. */
export const ORGANS_SIDE: CameraStop = {
  id: 'organs-side',
  title: 'From the side',
  description:
    'Front to back: the greater omentum and intestines, then the mesentery and the retroperitoneal kidneys, aorta and inferior vena cava on the posterior wall.',
  target: [0, -110, 960],
  position: [950, -110, 980],
};

/** The posterior abdominal wall and the root of the mesentery. */
export const MESENTERY_VIEW: CameraStop = {
  id: 'mesentery-root',
  title: 'The root of the mesentery',
  description:
    'From the duodenojejunal flexure, left of L2, down and to the right to the right sacroiliac joint, crossing the duodenum, aorta, inferior vena cava, right ureter and psoas.',
  target: [0, -130, 930],
  position: [180, -820, 1150],
};

/** The pelvis from the side: the pouches behind and in front of the rectum. */
export const PELVIC_POUCHES: CameraStop = {
  id: 'pelvic-pouches',
  title: 'The pelvis from the side',
  description:
    'The rectum against the sacrum and the bladder behind the pubis: the peritoneum dips between them as the rectovesical pouch, the lowest part of the cavity in a man sitting up.',
  target: [0, -70, 815],
  position: [-650, -90, 860],
};

/** The stomach from in front and a little to the left. */
export const STOMACH_FRONT: CameraStop = {
  id: 'stomach-front',
  title: 'The stomach',
  description:
    'J-shaped under the left costal margin: the oesophagus enters at the cardiac end, the fundus bulges above it, and the body and pyloric part curve down and right to the duodenum.',
  target: [35, -150, 1095],
  position: [110, -800, 1140],
};

/** The duodenal loop round the head of the pancreas. */
export const DUODENUM_VIEW: CameraStop = {
  id: 'duodenum-loop',
  title: 'The duodenal loop',
  description:
    'A C round the head of the pancreas, from the pylorus at L1 down the right side of L2 and L3, across in front of the inferior vena cava and aorta, and up to the duodenojejunal flexure at L2.',
  target: [-15, -130, 1030],
  position: [-110, -720, 1010],
};

/** The right iliac fossa: the end of the ileum, the caecum and the appendix. */
export const ILEOCAECAL_VIEW: CameraStop = {
  id: 'ileocaecal',
  title: 'The ileocaecal region',
  description:
    'The ileum joins the large intestine on its left, the caecum hangs below the junction, and the appendix leaves the caecum where its taeniae meet.',
  target: [-55, -105, 860],
  position: [-170, -600, 810],
};

/** The upper abdomen from below and in front: the coeliac trunk and its branches. */
export const COELIAC_VIEW: CameraStop = {
  id: 'coeliac',
  title: 'The coeliac trunk',
  description:
    'A short trunk from the front of the aorta at T12 and L1, dividing at once into the left gastric (up), common hepatic (right) and splenic (left) arteries.',
  target: [5, -130, 1075],
  position: [40, -760, 960],
};

/** The mesenteric arteries from the front, the small intestine set aside. */
export const MESENTERIC_VIEW: CameraStop = {
  id: 'mesenteric',
  title: 'The mesenteric arteries',
  description:
    'The superior mesenteric down into the root of the mesentery with its colic branches to the right; the inferior mesenteric down and left to the descending and sigmoid colon.',
  target: [-5, -130, 975],
  position: [0, -980, 1000],
};

/** From behind and to the right: the portal vein forming behind the pancreas. */
export const PORTAL_BACK: CameraStop = {
  id: 'portal-back',
  title: 'Behind the pancreas',
  description:
    'Seen from behind: the splenic vein runs along the back of the pancreas and meets the superior mesenteric vein behind its neck, at L2, to form the portal vein.',
  target: [-10, -125, 1060],
  position: [-350, 650, 1200],
};

/** The liver's eight segments, I to VIII. */
export const LIVER_SEGMENTS: AbdominalOrgansPartId[] = [
  'liver-segment-1',
  'liver-segment-2',
  'liver-segment-3',
  'liver-segment-4',
  'liver-segment-5',
  'liver-segment-6',
  'liver-segment-7',
  'liver-segment-8',
];

/** The bile ducts from the porta hepatis to the duodenum, with the pancreatic ducts. */
export const BILIARY_TREE: AbdominalOrgansPartId[] = [
  'gallbladder',
  'hepatic-ducts',
  'cystic-duct',
  'bile-duct',
  'pancreatic-ducts',
];

/** The porta hepatis and gallbladder from below and in front, the liver lifted in the mind. */
export const BILIARY_VIEW: CameraStop = {
  id: 'biliary',
  title: 'The bile ducts',
  description:
    'The hepatic ducts leave the porta hepatis and join; the cystic duct from the gallbladder meets them, and the bile duct runs down behind the duodenum to the head of the pancreas.',
  target: [-25, -135, 1060],
  position: [-230, -640, 900],
};

/** The left upper abdomen from the left: the spleen against the diaphragm. */
export const SPLEEN_VIEW: CameraStop = {
  id: 'spleen-side',
  title: 'The spleen',
  description:
    'Tucked under the left ribs 9 to 11, along the tenth rib, against the diaphragm, with the stomach in front, the left kidney behind and the splenic flexure below.',
  target: [80, -100, 1085],
  position: [720, -420, 1170],
};

/** The pancreas across the posterior wall, from the front. */
export const PANCREAS_FRONT: CameraStop = {
  id: 'pancreas-front',
  title: 'The pancreas',
  description:
    'Across the back wall at L1 and L2: the head in the curve of the duodenum, the neck in front of the portal vein, the body over the aorta and left kidney, the tail to the spleen.',
  target: [10, -120, 1045],
  position: [0, -780, 1070],
};

/** The liver from the front. */
export const LIVER_FRONT: CameraStop = {
  id: 'liver-front',
  title: 'The liver',
  description:
    'Filling the right hypochondrium and most of the epigastrium under the diaphragm, the falciform ligament dividing its right and left lobes in front.',
  target: [-15, -125, 1105],
  position: [-60, -900, 1160],
};

/** The liver's underside from below and in front. */
export const LIVER_BELOW: CameraStop = {
  id: 'liver-below',
  title: 'The inferior surface',
  description:
    'From below: the gallbladder fossa, the porta hepatis with its ducts and vessels, and the impressions of the stomach, duodenum, colon and right kidney.',
  target: [-20, -125, 1090],
  position: [-60, -520, 700],
};

/** Both kidneys from the front, the bowel set aside. */
export const KIDNEYS_FRONT: CameraStop = {
  id: 'kidneys-front',
  title: 'The kidneys',
  description:
    'On the posterior wall from T12 to L3, the right a little lower; their hila face forwards and medially, the renal veins in front of the arteries and the pelvis behind.',
  target: [0, -90, 1030],
  position: [0, -820, 1045],
};

/** Both kidneys from behind. */
export const KIDNEYS_BACK: CameraStop = {
  id: 'kidneys-back',
  title: 'From behind',
  description:
    'Behind the kidneys: the diaphragm and the twelfth rib above (and the eleventh on the left), then psoas, quadratus lumborum and transversus abdominis.',
  target: [0, -80, 1030],
  position: [0, 760, 1070],
};

/** The ureters from the kidneys to the bladder. */
export const URETERS_FRONT: CameraStop = {
  id: 'ureters-front',
  title: 'The ureters',
  description:
    'Down on the psoas and the tips of the transverse processes, over the end of the common iliac artery into the pelvis, and forward to the bladder.',
  target: [0, -90, 915],
  position: [0, -960, 935],
};

/** The posterior abdominal wall's skeleton and muscles (abdomen batch 5). */
export const POSTERIOR_WALL: AbdominalOrgansPartId[] = [
  'lumbar-spine',
  'sacrum',
  'hip-bones',
  'lower-ribs',
  'diaphragm',
  'psoas-major',
  'iliacus',
];

/** The lumbar plexus's six branches, both sides. */
export const LUMBAR_PLEXUS: AbdominalOrgansPartId[] = [
  'iliohypogastric-nerves',
  'ilioinguinal-nerves',
  'genitofemoral-nerves',
  'lateral-femoral-cutaneous-nerves',
  'femoral-nerves',
  'obturator-nerves',
];

/** Both suprarenal glands from the front, on the upper poles of the kidneys. */
export const SUPRARENALS_FRONT: CameraStop = {
  id: 'suprarenals-front',
  title: 'The suprarenal glands',
  description:
    'On the upper poles of the kidneys, in front of the crura: the right a pyramid behind the IVC, the left a crescent along the kidney’s medial border down to its hilum.',
  target: [0, -95, 1075],
  position: [0, -560, 1095],
};

/** The diaphragm from below and in front, the viscera set aside. */
export const DIAPHRAGM_BELOW: CameraStop = {
  id: 'diaphragm-below',
  title: 'From below',
  description:
    'The domes and the central tendon, the crura on the upper lumbar bodies, and the three openings: the IVC through the tendon (T8), the oesophagus through the right crus (T10), the aorta behind the median arcuate ligament (T12).',
  target: [0, -80, 1110],
  position: [0, -260, 740],
};

/** The diaphragm from the front, its domes over the liver and stomach. */
export const DIAPHRAGM_FRONT: CameraStop = {
  id: 'diaphragm-front',
  title: 'The domes',
  description:
    'The right dome higher than the left, the central tendon between them under the heart; the costal fibres arise from the lower six costal cartilages.',
  target: [0, -110, 1130],
  position: [0, -820, 1160],
};

/** The aorta and IVC down the posterior wall, from the front. */
export const GREAT_VESSELS_FRONT: CameraStop = {
  id: 'great-vessels-front',
  title: 'The aorta and IVC',
  description:
    'The aorta down the front of the lumbar bodies, a little left of the midline, from the aortic opening (T12) to its division at L4; the IVC on its right, from L5 up to the caval opening.',
  target: [0, -110, 1045],
  position: [0, -760, 1060],
};

/** The aorta's division and the iliac arteries. */
export const AORTIC_BIFURCATION: CameraStop = {
  id: 'aortic-bifurcation',
  title: 'The division',
  description:
    'The aorta divides in front of L4 into the common iliac arteries, which divide in front of the sacroiliac joints into external and internal iliac arteries; the IVC begins behind the right common iliac artery at L5.',
  target: [0, -110, 950],
  position: [0, -560, 990],
};

/** The posterior wall's muscles from the front. */
export const POSTERIOR_WALL_FRONT: CameraStop = {
  id: 'posterior-wall-front',
  title: 'The posterior wall',
  description:
    'Psoas beside the lumbar bodies, quadratus lumborum lateral to it between the twelfth rib and the iliac crest, iliacus in the iliac fossa joining psoas below.',
  target: [0, -80, 990],
  position: [0, -800, 1000],
};

/** The lumbar plexus's branches round psoas, from the front. */
export const LUMBAR_PLEXUS_FRONT: CameraStop = {
  id: 'lumbar-plexus-front',
  title: 'Round psoas',
  description:
    'Lateral to psoas, from above down: iliohypogastric, ilioinguinal, lateral cutaneous nerve of the thigh, femoral. On its front, genitofemoral. Medial to it, obturator.',
  target: [0, -85, 960],
  position: [0, -760, 975],
};

/** The right side of the plexus, closer. */
export const LUMBAR_PLEXUS_RIGHT: CameraStop = {
  id: 'lumbar-plexus-right',
  title: 'The right side',
  description:
    'The femoral nerve in the groove between psoas and iliacus; the lateral cutaneous nerve crossing iliacus to the anterior superior iliac spine; the obturator nerve on the medial side over the pelvic brim.',
  target: [-60, -85, 950],
  position: [-420, -560, 990],
};

/** The plexuses round the aorta, from the front and right. */
export const AORTIC_PLEXUSES: CameraStop = {
  id: 'aortic-plexuses',
  title: 'Round the aorta',
  description:
    'The coeliac plexus round the coeliac trunk and the superior mesenteric artery, the aortic plexus down to the inferior mesenteric artery, the superior hypogastric plexus below the division; the lumbar chains on the vertebral bodies.',
  target: [0, -110, 1030],
  position: [-260, -640, 1060],
};

/** The lumbar sympathetic chains, which the model lacks: on from Z-Anatomy's trunks at L1, forward
 * onto the vertebral bodies along the medial edge of psoas, to the sacral promontory. */
export const LUMBAR_CHAIN_PATHS = [1, -1].map((side) =>
  (
    [
      [23, -55, 1062],
      [26, -82, 1045],
      [28, -104, 1010],
      [30, -108, 975],
      [30, -108, 945],
      [26, -104, 918],
      [21, -98, 898],
    ] as const
  ).map(([x, y, z]) => [side * x, y, z] as [number, number, number]),
);

/** The cisterna chyli, right of the aorta in front of L1 and L2, on up as the thoracic duct. */
export const CISTERNA_CHYLI_PATHS: [number, number, number][][] = [
  [
    [-4, -112, 1035],
    [-4, -111, 1060],
    [-3, -109, 1090],
    [-2, -102, 1130],
  ],
];

/** Quadratus lumborum, which the model lacks, outlined on each side: from the iliolumbar ligament
 * and iliac crest up to the twelfth rib and the tips of the upper lumbar transverse processes. */
export const QUADRATUS_LUMBORUM_PATHS = [1, -1].map((side) =>
  (
    [
      [45, -62, 1040],
      [75, -62, 1022],
      [100, -62, 965],
      [62, -62, 942],
      [48, -62, 990],
      [45, -62, 1040],
    ] as const
  ).map(([x, y, z]) => [side * x, y, z] as [number, number, number]),
);
