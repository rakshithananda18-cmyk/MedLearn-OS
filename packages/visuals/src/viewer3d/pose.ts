import type { Point3 } from '@medlearn/schemas';
import { Matrix4, Vector3 } from 'three';

/**
 * A turn about a bone's own long axis that comes with a movement over its first part: the knee
 * unlocking as it starts to bend. Angles in radians.
 */
export interface PoseTwist {
  pivot: Point3;
  axis: Point3;
  /** The whole twist, reached once the movement has gone `over`. */
  angle: number;
  over: number;
}

const step = new Matrix4();
const twisted = new Matrix4();

/** A turn of `angle` about an axis through `pivot`, as a matrix in the model frame. */
function turnAbout(pivot: Point3, axis: Point3, angle: number, out: Matrix4): Matrix4 {
  const [x, y, z] = pivot;
  return out
    .makeTranslation(x, y, z)
    .multiply(step.makeRotationAxis(new Vector3(...axis).normalize(), angle))
    .multiply(step.makeTranslation(-x, -y, -z));
}

/**
 * Where a movement puts the parts that turn: the joint's turn by `angle`, after the twist about
 * the bone's own axis that has built up so far.
 */
export function poseMatrix(
  pose: { pivot: Point3; axis: Point3; twist?: PoseTwist | undefined },
  angle: number,
  out: Matrix4,
): Matrix4 {
  turnAbout(pose.pivot, pose.axis, angle, out);
  const twist = pose.twist;
  if (!twist) return out;
  const share = twist.over > 0 ? Math.min(Math.max(angle, 0), twist.over) / twist.over : 1;
  return out.multiply(turnAbout(twist.pivot, twist.axis, twist.angle * share, twisted));
}

// Only bone within this distance of a stretching part can hold it, in model millimetres.
const REACH_MM = 40;

/**
 * How far each point of a part that crosses a joint follows the bones that move: 0 where it is
 * fixed to a bone that stays, 1 where it is fixed to one that turns, and in between along its
 * length, by how near each kind of bone is. Points are flat x, y, z lists in the model frame.
 */
export function stretchWeights(
  points: ArrayLike<number>,
  moving: ArrayLike<number>,
  fixed: ArrayLike<number>,
): Float32Array {
  const count = points.length / 3;
  const near = (reference: ArrayLike<number>) => {
    // ponytail: brute force over the bone points within reach; a spatial grid if parts grow large.
    const lo = [Infinity, Infinity, Infinity];
    const hi = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < points.length; i++) {
      const k = i % 3;
      lo[k] = Math.min(lo[k] ?? Infinity, points[i] ?? 0);
      hi[k] = Math.max(hi[k] ?? -Infinity, points[i] ?? 0);
    }
    const kept: number[] = [];
    for (let i = 0; i < reference.length; i += 3) {
      const inside = [0, 1, 2].every((k) => {
        const value = reference[i + k] ?? 0;
        return value >= (lo[k] ?? 0) - REACH_MM && value <= (hi[k] ?? 0) + REACH_MM;
      });
      if (inside) kept.push(reference[i] ?? 0, reference[i + 1] ?? 0, reference[i + 2] ?? 0);
    }
    const squared = new Float32Array(count).fill(REACH_MM * REACH_MM);
    for (let p = 0; p < count; p++) {
      const x = points[p * 3] ?? 0;
      const y = points[p * 3 + 1] ?? 0;
      const z = points[p * 3 + 2] ?? 0;
      for (let r = 0; r < kept.length; r += 3) {
        const dx = (kept[r] ?? 0) - x;
        const dy = (kept[r + 1] ?? 0) - y;
        const dz = (kept[r + 2] ?? 0) - z;
        const d = dx * dx + dy * dy + dz * dz;
        if (d < (squared[p] ?? 0)) squared[p] = d;
      }
    }
    return squared;
  };
  const toMoving = near(moving);
  const toFixed = near(fixed);
  const weights = new Float32Array(count);
  for (let p = 0; p < count; p++) {
    const m = toMoving[p] ?? 0;
    const f = toFixed[p] ?? 0;
    weights[p] = m + f === 0 ? 0.5 : f / (m + f);
  }
  return weights;
}

/**
 * How taut a ligament is at this point of the movement, 0 to 1: one taut at the start (`start`)
 * slackens as the joint moves; one taut at the end tightens.
 */
export function tension(angle: number, range: number, start: boolean): number {
  const share = range > 0 ? Math.min(Math.max(angle / range, 0), 1) : 0;
  return start ? 1 - share : share;
}
