/**
 * Teaching model of the oxygen–haemoglobin dissociation curve (sample content, not medically
 * reviewed). Saturation follows the Hill equation; each condition shifts the P50 on a log scale.
 * CO2 acts through the pH it produces at a fixed bicarbonate, so each slider can be shown alone.
 */
export interface BloodConditions {
  /** Partial pressure of CO2, mmHg. */
  pco2: number;
  ph: number;
  /** Body temperature, degrees Celsius. */
  temperature: number;
  /** 2,3-bisphosphoglycerate, mmol/L of red cells. */
  bpg: number;
}

export const NORMAL_BLOOD: BloodConditions = { pco2: 40, ph: 7.4, temperature: 37, bpg: 5 };
export const HILL_COEFFICIENT = 2.7;
/** P50 of adult haemoglobin under normal conditions, mmHg. */
export const NORMAL_P50 = 26.8;
/** Typical oxygen partial pressures, mmHg. */
export const ARTERIAL_PO2 = 100;
export const VENOUS_PO2 = 40;

const BOHR_FACTOR = 0.48;
const TEMPERATURE_FACTOR = 0.024;
const BPG_FACTOR = 0.04;

/** P50 in mmHg. Higher is a right shift: haemoglobin lets go of oxygen more easily. */
export function p50(conditions: BloodConditions): number {
  const shift =
    BOHR_FACTOR * (NORMAL_BLOOD.ph - conditions.ph) +
    BOHR_FACTOR * Math.log10(conditions.pco2 / NORMAL_BLOOD.pco2) +
    TEMPERATURE_FACTOR * (conditions.temperature - NORMAL_BLOOD.temperature) +
    BPG_FACTOR * (conditions.bpg - NORMAL_BLOOD.bpg);
  return NORMAL_P50 * 10 ** shift;
}

/** Haemoglobin saturation (0–100 %) at an oxygen partial pressure in mmHg. */
export function saturation(po2: number, conditions: BloodConditions): number {
  if (po2 <= 0) return 0;
  const ratio = (po2 / p50(conditions)) ** HILL_COEFFICIENT;
  return (100 * ratio) / (1 + ratio);
}

export type CurveShift = 'left' | 'none' | 'right';

/** Direction of the shift from normal, ignoring changes under half a mmHg. */
export function curveShift(conditions: BloodConditions): CurveShift {
  const difference = p50(conditions) - NORMAL_P50;
  if (Math.abs(difference) < 0.5) return 'none';
  return difference > 0 ? 'right' : 'left';
}

/** Oxygen released between arteries and veins, in saturation percentage points. */
export function oxygenUnloaded(conditions: BloodConditions): number {
  return saturation(ARTERIAL_PO2, conditions) - saturation(VENOUS_PO2, conditions);
}
