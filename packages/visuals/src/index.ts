export { DiagramTrainer, type DiagramTrainerProps } from './DiagramTrainer';
export {
  CURVE_PRESETS,
  type CurvePreset,
  DissociationCurve,
  type DissociationCurveProps,
} from './DissociationCurve';
export { affectedBy, ancestors, descendants, pathThrough } from './graph';
export {
  ARTERIAL_PO2,
  type BloodConditions,
  type CurveShift,
  curveShift,
  NORMAL_BLOOD,
  NORMAL_P50,
  oxygenUnloaded,
  p50,
  saturation,
  VENOUS_PO2,
} from './oxygen';
export { PathTracer, type PathTracerProps } from './PathTracer';
export { pillSize } from './pill';
// The 3D viewer itself is a separate entry ('@medlearn/visuals/viewer3d') so three.js loads only on 3D screens.
export {
  blanks,
  type DrillState,
  isDrillDone,
  isStepDone,
  labelBank,
  labelText,
  nextStep,
  placeLabel,
  selectBlank,
  startDrill,
} from './trainer';
export { MODEL_ORIGIN, supports3D, toScene } from './viewer3d/scene';
