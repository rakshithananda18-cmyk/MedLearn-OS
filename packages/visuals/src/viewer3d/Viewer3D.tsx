'use client';

import type { Model3D, ModelTrace, PartKind, Point3 } from '@medlearn/schemas';
import { Line, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, type ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { type RefObject, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box3,
  BufferAttribute,
  type BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  FrontSide,
  type Group,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  MOUSE,
  type Object3D,
  type PerspectiveCamera,
  Plane,
  SphereGeometry,
  TOUCH,
  TubeGeometry,
  Vector3,
} from 'three';

import { poseMatrix, type PoseTwist, stretchWeights, tension } from './pose';
import { MODEL_GROUP, toScene } from './scene';

/** A tappable spot on the model, such as a body region on the whole-body map. */
export interface Viewer3DMarker {
  id: string;
  position: Point3;
}

/** A name pinned to a part, a trace or a marker, with a short leader line. */
export interface Viewer3DLabel {
  id: string;
  text: string;
  /** The picked one: filled in the accent colour. */
  active?: boolean;
}

/** What a whole-body system layer is made of, which sets its colour. */
export type LayerKind = PartKind | 'lymph';

/**
 * One body system drawn from its own file (skeleton, muscles, vessels, nerves, lymph nodes, organs) on the same
 * body. Every mesh in it is a named structure; a tap reports `<layer id>/<structure id>`.
 */
export interface Viewer3DLayer {
  id: string;
  kind: LayerKind;
  src: string;
  /** Only this structure of the layer is drawn (the picked one, isolated). */
  only?: string;
}

/** A structure to turn the camera to: its middle and its radius, in the model frame. */
export interface Viewer3DFocus {
  point: Point3;
  radius: number;
}

/**
 * A joint movement: the structures that turn, about an axis through a point (model frame), by an
 * angle in radians. Playing, the angle swings between none and `range` by itself.
 */
export interface Viewer3DPose {
  ids: ReadonlySet<string>;
  pivot: Point3;
  axis: Point3;
  angle: number;
  range: number;
  playing: boolean;
  /** Parts that cross the joint (ligaments, a capsule): each point follows the nearer bone. */
  stretch?: ReadonlySet<string>;
  /** A turn about the moving bone's own axis over the first part of the movement. */
  twist?: PoseTwist;
  /** Ligaments tinted as they tighten: taut at the start of the movement, or at its end. */
  taut?: { start: ReadonlySet<string>; end: ReadonlySet<string> };
}

/** The three anatomical planes a section can cut along. */
export type SectionPlane = 'transverse' | 'coronal' | 'sagittal';

/**
 * A cut through the whole model along one plane, `at` 0 to 1 across the model: feet to head
 * (transverse), back to front (coronal) or one side to the other (sagittal). What lies above, in
 * front of, or beyond the cut is taken away so the inside shows.
 */
export interface Viewer3DSection {
  plane: SectionPlane;
  at: number;
}

/** A line a student drew on the model's surface, in the model's frame. */
export interface Stroke {
  /** The pen's colour token, such as --color-pen-ink. */
  colour: string;
  points: Point3[];
}

export interface Viewer3DProps {
  model: Model3D;
  /** Structures to glow: a traced path or one part. Everything else dims. */
  highlight: ReadonlySet<string>;
  onSelect: (id: string | null) => void;
  stopId: string;
  /** Kinds of part switched off by the student. */
  hiddenKinds: ReadonlySet<PartKind>;
  /** Single parts or traces switched off by the student. */
  hiddenIds?: ReadonlySet<string>;
  /** Everything see-through, to look inside. */
  xray?: boolean;
  reducedMotion: boolean;
  markers?: Viewer3DMarker[];
  /** How far the camera may pull back, in metres. */
  maxDistance?: number;
  /** While set, dragging over the model draws on its surface instead of turning it. */
  pen?: { colour: string; onStroke: (stroke: Stroke) => void } | null;
  strokes?: Stroke[];
  labels?: Viewer3DLabel[];
  /** Changing it sends the camera back to the current stop. */
  resetToken?: number;
  /** Pixel ratio: the device's up to 2 for a sharp picture, or 1 to save battery. */
  dpr?: number | [number, number];
  /** Body systems shown on the model, each loaded when it first appears. */
  layers?: Viewer3DLayer[];
  /** A cut through the model to see inside it. */
  section?: Viewer3DSection | null;
  /** Turns the camera to this structure whenever it changes. */
  focus?: Viewer3DFocus | null;
  /** Turns the camera to the structure with this id (a part, trace or system structure). */
  focusId?: string | null;
  /** A joint movement shown on the model. */
  pose?: Viewer3DPose | null;
  /**
   * How much of the view's right edge a panel covers, in pixels: the model keeps to the middle of
   * what is left, sliding there and back as the panel opens and closes.
   */
  insetRight?: number;
  /** The same for a sheet over the bottom edge (phones): the model keeps above it. */
  insetBottom?: number;
  /** The same for a header over the top edge (phones): the model keeps below it. */
  insetTop?: number;
  /** One finger or the left button moves the model instead of turning it (the right turns it). */
  pan?: boolean;
}

const TRACE_RADIUS_MM: Record<ModelTrace['kind'], number> = {
  nerve: 1.8,
  lymph: 3.2,
  outline: 1.4,
};
const MARKER_RADIUS_MM = 28;
/** A press that travels further than this (in pixels) turned or moved the model: not a tap. */
const TAP_SLOP_PX = 6;
const dragged = (event: ThreeEvent<MouseEvent>) => event.delta > TAP_SLOP_PX;
/** How far past the model's bounds the view may be moved, in metres. */
const PAN_MARGIN_M = 0.05;
/**
 * The angle the guided views were framed to fill: the shorter side of the uncovered view on a
 * laptop. A narrower view (a phone held upright, half under its sheet) zooms out until its shorter
 * side spans as much, so a view keeps its whole model instead of cropping it twice as close.
 */
const FRAMED_VIEW_DEG = 25;
const DIMMED = 0.3;
const XRAY = 0.3;
const NONE: ReadonlySet<string> = new Set();
// Drawn points sit just off the surface so the line is not hidden inside it, and closer points
// are dropped so a stroke stays light.
const PEN_LIFT_MM = 1.5;
const PEN_STEP_MM = 2;

const PART_COLOUR: Record<PartKind, string> = {
  bone: '--color-anat-bone',
  muscle: '--color-anat-muscle',
  artery: '--color-anat-artery',
  vein: '--color-anat-vein',
  nerve: '--color-anat-nerve',
  skin: '--color-anat-skin',
  organ: '--color-anat-organ',
  airway: '--color-anat-airway',
  membrane: '--color-anat-membrane',
  valve: '--color-anat-valve',
  ligament: '--color-anat-ligament',
  capsule: '--color-anat-capsule',
  cartilage: '--color-anat-cartilage',
};
const TRACE_COLOUR: Record<ModelTrace['kind'], string> = {
  nerve: '--color-anat-nerve',
  lymph: '--color-anat-lymph',
  outline: '--color-fg-muted',
};
// Muscles, skin, organs, membranes and joint capsules are see-through, so what lies in them stays
// visible: the vessels under a muscle, the bronchi in a lung, the lung in its pleura, the cruciate
// ligaments in the knee's capsule.
const PART_OPACITY: Record<PartKind, number> = {
  bone: 1,
  muscle: 0.45,
  artery: 1,
  vein: 1,
  nerve: 1,
  skin: 0.35,
  organ: 0.5,
  airway: 1,
  membrane: 0.2,
  valve: 1,
  ligament: 0.9,
  capsule: 0.25,
  cartilage: 1,
};

const LAYER_COLOUR: Record<LayerKind, string> = {
  ...PART_COLOUR,
  lymph: '--color-anat-lymph',
};

/** Anatomical colours come from the design tokens, so 2D and 3D always match. */
function tokenColour(name: string): Color {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value ? new Color(value) : new Color();
}

function material(
  colour: Color,
  lit: boolean,
  opacity: number,
  sectioned = false,
): MeshStandardMaterial {
  return new MeshStandardMaterial({
    // A cut shows the inner faces too, so a sliced bone or organ is not an empty shell.
    side: sectioned ? DoubleSide : FrontSide,
    color: colour,
    roughness: 0.6,
    emissive: lit ? tokenColour('--ml-gold') : new Color('black'),
    emissiveIntensity: lit ? 0.6 : 0,
    transparent: opacity < 1,
    opacity,
    // See-through surfaces must not hide what lies behind them.
    depthWrite: opacity === 1,
  });
}

function Trace({
  trace,
  lit,
  dimmed,
  onSelect,
}: Readonly<{ trace: ModelTrace; lit: boolean; dimmed: boolean; onSelect: (id: string) => void }>) {
  const geometries = useMemo(
    () =>
      trace.paths.map((points) => {
        const curve = new CatmullRomCurve3(points.map((point) => new Vector3(...point)));
        return new TubeGeometry(curve, points.length * 12, TRACE_RADIUS_MM[trace.kind], 8);
      }),
    [trace],
  );
  // Meshes are built here and handed over whole, like the model's own parts.
  const meshes = useMemo(() => {
    const traceMaterial = material(tokenColour(TRACE_COLOUR[trace.kind]), lit, dimmed ? DIMMED : 1);
    return geometries.map((geometry) => {
      const mesh = new Mesh(geometry, traceMaterial);
      // Named like the model's parts, so the camera can find it.
      mesh.userData.partId = trace.id;
      return mesh;
    });
  }, [geometries, trace.kind, trace.id, lit, dimmed]);
  const select = (event: ThreeEvent<MouseEvent>) => {
    if (dragged(event)) return;
    event.stopPropagation();
    onSelect(trace.id);
  };
  return (
    <>
      {meshes.map((mesh) => (
        <primitive
          key={mesh.uuid}
          object={mesh} // NOSONAR: a React Three Fiber prop, not a DOM attribute
          onClick={select}
        />
      ))}
    </>
  );
}

function Marker({
  marker,
  lit,
  onSelect,
}: Readonly<{ marker: Viewer3DMarker; lit: boolean; onSelect: (id: string) => void }>) {
  const geometry = useMemo(() => new SphereGeometry(MARKER_RADIUS_MM, 24, 16), []);
  const sphere = useMemo(() => {
    const mesh = new Mesh(geometry, material(tokenColour('--ml-gold'), lit, 1));
    mesh.position.set(...marker.position);
    mesh.scale.setScalar(lit ? 1.3 : 1);
    return mesh;
  }, [geometry, marker.position, lit]);
  return (
    <primitive
      object={sphere} // NOSONAR: a React Three Fiber prop, not a DOM attribute
      onClick={(event: ThreeEvent<MouseEvent>) => {
        if (dragged(event)) return;
        event.stopPropagation();
        onSelect(marker.id);
      }}
    />
  );
}

/** A stroke never changes once drawn, so its colour, start and length identify it. */
function strokeKey(stroke: Stroke): string {
  return `${stroke.colour}:${stroke.points[0]?.join(',') ?? ''}:${stroke.points.length}`;
}

/** Whether an object is drawn: it and every object above it are visible. */
function shown(object: Object3D | null): boolean {
  for (let node = object; node; node = node.parent) if (!node.visible) return false;
  return true;
}

/** Whether a tap landed on something drawn: shown, and not cut away by a section. */
function drawn(hit: { object: Object3D; point: Vector3 }, planes: Plane[]): boolean {
  return shown(hit.object) && planes.every((plane) => plane.distanceToPoint(hit.point) >= 0);
}

/** A stretching part's mesh at rest: where its points were, and how far each follows the move. */
interface Stretched {
  mesh: Mesh;
  position: BufferGeometry['attributes'][string];
  normal: BufferGeometry['attributes'][string] | undefined;
  /** Its points at rest in the model frame, and the way back into the mesh's own frame. */
  points: Float32Array;
  weights: Float32Array;
  inverse: Matrix4;
}

/** A mesh's points in the model frame, placed by its resting matrix. */
function restPoints(mesh: Mesh): Float32Array {
  const matrix = (mesh.userData.rest as Matrix4 | undefined) ?? mesh.matrix;
  const source = mesh.geometry.getAttribute('position');
  const points = new Float32Array(source.count * 3);
  const point = new Vector3();
  for (let i = 0; i < source.count; i++) {
    point.fromBufferAttribute(source, i).applyMatrix4(matrix);
    points.set([point.x, point.y, point.z], i * 3);
  }
  return points;
}

/**
 * Readies the parts that cross the joint: each point is weighted by how near it lies to the
 * bones that turn and to those that stay, and the mesh gets its own points to bend.
 */
function stretchable(group: Group, pose: Viewer3DPose): Stretched[] {
  const moving: number[] = [];
  const fixed: number[] = [];
  const meshes: Mesh[] = [];
  group.traverse((child) => {
    const mesh = child as Mesh;
    const id = mesh.userData.partId as string | undefined;
    if (!mesh.isMesh || !id) return;
    if (pose.stretch?.has(id)) meshes.push(mesh);
    else (pose.ids.has(id) ? moving : fixed).push(...restPoints(mesh));
  });
  return meshes.map((mesh) => {
    const points = restPoints(mesh);
    const { geometry } = mesh;
    const position = geometry.getAttribute('position');
    const normal = geometry.getAttribute('normal');
    // Quantised files store small integers: bend a float copy, and put the original back after.
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(position.count * 3), 3));
    return {
      mesh,
      position,
      normal,
      points,
      weights: stretchWeights(points, moving, fixed),
      inverse: mesh.matrix.clone().invert(),
    };
  });
}

/** Bends a stretching part: each point moves its weight's share of the way the bones move. */
function bend(part: Stretched, turn: Matrix4) {
  const { points, weights, inverse, mesh } = part;
  const position = mesh.geometry.getAttribute('position') as BufferAttribute;
  const rest = new Vector3();
  const moved = new Vector3();
  for (let i = 0; i < weights.length; i++) {
    rest.fromArray(points, i * 3);
    moved.copy(rest).applyMatrix4(turn);
    rest.lerp(moved, weights[i] ?? 0).applyMatrix4(inverse);
    position.setXYZ(i, rest.x, rest.y, rest.z);
  }
  position.needsUpdate = true;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeBoundingSphere();
}

function unbend(part: Stretched) {
  const { geometry } = part.mesh;
  geometry.setAttribute('position', part.position);
  if (part.normal) geometry.setAttribute('normal', part.normal);
  else geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
}

// A played movement goes there and back in this many seconds.
const SWING_SECONDS = 4;
// How far a fully taut ligament's colour moves towards the taut colour.
const TAUT_TINT = 0.85;

/**
 * Turns a movement's structures about its axis, as rigid parts: each keeps its resting place to
 * return to. Parts that cross the joint bend with it, and its ligaments warm as they tighten.
 * Applied on every frame drawn while a movement shows, so systems switched on meanwhile join in;
 * playing, it swings by itself.
 */
function Movement({
  pose,
  groupRef,
}: Readonly<{ pose: Viewer3DPose | null; groupRef: RefObject<Group | null> }>) {
  const { invalidate } = useThree();
  const posed = useRef(false);
  const turn = useMemo(() => new Matrix4(), []);
  const stretched = useRef<{ key: ReadonlySet<string>; parts: Stretched[] } | null>(null);
  const taut = useMemo(() => tokenColour('--color-anat-taut'), []);

  useEffect(() => {
    invalidate();
  }, [pose, invalidate]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group || (!pose && !posed.current)) return;
    let angle = pose?.angle ?? 0;
    if (pose?.playing) {
      const swing = (state.clock.elapsedTime * 2 * Math.PI) / SWING_SECONDS;
      angle = (pose.range * (1 - Math.cos(swing))) / 2;
    }
    if (pose) poseMatrix(pose, angle, turn);
    group.traverse((child) => {
      const id = child.userData.partId as string | undefined;
      const rest = child.userData.rest as Matrix4 | undefined;
      if (pose && id && pose.ids.has(id)) {
        child.userData.rest = rest ?? child.matrix.clone();
        child.matrixAutoUpdate = false;
        child.matrix.multiplyMatrices(turn, child.userData.rest as Matrix4);
      } else if (rest) {
        child.matrix.copy(rest);
        child.matrixAutoUpdate = true;
        delete child.userData.rest;
      }
      // A ligament's colour: warmer the tighter it is, back to its own when the joint rests.
      const material = (child as Mesh).material as MeshStandardMaterial | undefined;
      if (!id || !material?.color) return;
      const start = pose?.taut?.start.has(id) ?? false;
      if (pose && (start || pose.taut?.end.has(id))) {
        material.userData.colour ??= material.color.clone();
        // Squared, so a half-taut ligament keeps most of its own colour rather than a muddy mix.
        const level = tension(angle, pose.range, start) ** 2 * TAUT_TINT;
        material.color.lerpColors(material.userData.colour as Color, taut, level);
      } else if (material.userData.colour) {
        material.color.copy(material.userData.colour as Color);
        delete material.userData.colour;
      }
    });
    // Parts crossing the joint: readied once for each movement, bent on every frame.
    const key = pose?.stretch;
    if (stretched.current && stretched.current.key !== key) {
      stretched.current.parts.forEach(unbend);
      stretched.current = null;
    }
    if (pose && key?.size) {
      stretched.current ??= { key, parts: stretchable(group, pose) };
      for (const part of stretched.current.parts) bend(part, turn);
    }
    posed.current = pose !== null;
    if (pose?.playing) invalidate();
  });
  return null;
}

const SECTION_AXIS: Record<SectionPlane, 'x' | 'y' | 'z'> = {
  transverse: 'y',
  coronal: 'z',
  sagittal: 'x',
};

/**
 * Cuts everything drawn with one plane across the model's extent, keeping what lies below,
 * behind, or to one side of it. The renderer clips every material at once.
 */
function Section({
  section,
  groupRef,
}: Readonly<{ section: Viewer3DSection | null; groupRef: RefObject<Group | null> }>) {
  // The renderer is read when the cut changes, not held from render.
  const get = useThree((state) => state.get);
  useEffect(() => {
    const group = groupRef.current;
    if (!section || !group) return;
    const { gl, invalidate } = get();
    const box = new Box3().setFromObject(group);
    const axis = SECTION_AXIS[section.plane];
    const normal = new Vector3();
    normal[axis] = -1;
    const at = box.min[axis] + (box.max[axis] - box.min[axis]) * section.at;
    gl.clippingPlanes = [new Plane(normal, at)];
    invalidate();
    return () => {
      gl.clippingPlanes = [];
      invalidate();
    };
  }, [section, groupRef, get]);
  return null;
}

function Parts({
  model,
  highlight,
  selecting,
  onSelect,
  hiddenKinds,
  hiddenIds,
  xray,
  sectioned,
}: Readonly<
  Pick<Viewer3DProps, 'model' | 'highlight' | 'onSelect' | 'hiddenKinds'> & {
    selecting: boolean;
    hiddenIds: ReadonlySet<string>;
    xray: boolean;
    sectioned: boolean;
  }
>) {
  const { scene } = useGLTF(model.src, false, true);
  const { gl } = useThree();

  useEffect(() => {
    // One model file serves several topics; each shows only the parts it lists.
    scene.traverse((child) => {
      if (child.parent === scene) child.visible = false;
    });
    for (const part of model.parts) {
      const node = scene.getObjectByName(part.id) as Mesh | undefined;
      if (!node) continue;
      node.visible = !hiddenKinds.has(part.kind) && !hiddenIds.has(part.id);
      const lit = highlight.has(part.id);
      const opacity =
        (part.opacity ?? PART_OPACITY[part.kind]) *
        (selecting && !lit ? DIMMED : 1) *
        (xray && !lit ? XRAY : 1);
      node.traverse((child) => {
        const mesh = child as Mesh;
        if (!mesh.isMesh) return;
        if (!mesh.geometry.getAttribute('normal')) mesh.geometry.computeVertexNormals();
        const colour = tokenColour(part.colour ?? PART_COLOUR[part.kind]);
        mesh.material = material(colour, lit, opacity, sectioned);
        mesh.userData.partId = part.id;
      });
    }
  }, [scene, model.parts, highlight, selecting, hiddenKinds, hiddenIds, xray, sectioned]);

  const select = (event: ThreeEvent<MouseEvent>) => {
    const id = event.object.userData.partId as string | undefined;
    // Hidden or cut-away parts are still in the way of the ray: let the tap through.
    if (!id || dragged(event) || !drawn(event, gl.clippingPlanes)) return;
    // The see-through skin lets a tap through to whatever shows under it.
    const skin = model.parts.find((part) => part.id === id)?.kind === 'skin';
    const under = event.intersections.some(
      (hit) =>
        hit.object !== event.object && hit.object.userData.partId && drawn(hit, gl.clippingPlanes),
    );
    if (skin && under) return;
    event.stopPropagation();
    onSelect(id);
  };
  return <primitive object={scene} onClick={select} />;
}

/**
 * A body system from its own file. Its structures share three materials (as it is, picked, and
 * dimmed while something else is picked), so hundreds of structures stay cheap to draw; see-through
 * (x-ray) fades them all.
 */
function SystemLayer({
  layer,
  highlight,
  selecting,
  xray,
  sectioned,
  onSelect,
}: Readonly<{
  layer: Viewer3DLayer;
  highlight: ReadonlySet<string>;
  selecting: boolean;
  xray: boolean;
  sectioned: boolean;
  onSelect: (id: string) => void;
}>) {
  const { scene } = useGLTF(layer.src, false, true);
  const { gl, invalidate } = useThree();

  useEffect(() => {
    const colour = tokenColour(LAYER_COLOUR[layer.kind]);
    const opacity = xray ? XRAY : 1;
    const plain = material(colour, false, selecting ? opacity * DIMMED : opacity, sectioned);
    const picked = material(colour, true, 1, sectioned);
    scene.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      if (!mesh.geometry.getAttribute('normal')) mesh.geometry.computeVertexNormals();
      const id = `${layer.id}/${mesh.name}`;
      mesh.userData.partId = id;
      mesh.material = highlight.has(id) ? picked : plain;
      mesh.visible = !layer.only || mesh.name === layer.only;
    });
    invalidate();
  }, [scene, layer, highlight, selecting, xray, sectioned, invalidate]);

  return (
    <primitive
      object={scene} // NOSONAR: a React Three Fiber prop, not a DOM attribute
      onClick={(event: ThreeEvent<MouseEvent>) => {
        const id = event.object.userData.partId as string | undefined;
        if (!id || dragged(event) || !drawn(event, gl.clippingPlanes)) return;
        event.stopPropagation();
        onSelect(id);
      }}
    />
  );
}

/**
 * What a label points at: a point in the model frame (the middle of a trace, a marker), or a
 * part of the model file, whose own transform is applied when it is measured.
 */
type Anchor = { point: Point3 } | { node: Object3D } | null;

function anchorOf(id: string, scene: Group, model: Model3D, markers: Viewer3DMarker[]): Anchor {
  const marker = markers.find((item) => item.id === id);
  if (marker) return { point: marker.position };
  const path = model.traces.find((item) => item.id === id)?.paths[0];
  const middle = path?.[Math.floor(path.length / 2)];
  if (middle) return { point: middle };
  const node = scene.getObjectByName(id);
  return node ? { node } : null;
}

/**
 * Keeps each name over its structure: projects the anchors to the screen on every rendered frame
 * and moves the label elements there. The labels are plain page elements beside the canvas
 * (see LabelLayer), so React owns them; only their position is set here.
 */
function LabelTracker({
  model,
  labels,
  markers,
  groupRef,
  nodesRef,
  redrawRef,
}: Readonly<{
  model: Model3D;
  labels: Viewer3DLabel[];
  markers: Viewer3DMarker[];
  groupRef: RefObject<Group | null>;
  nodesRef: RefObject<Map<string, HTMLElement>>;
  redrawRef: RefObject<() => void>;
}>) {
  const { scene } = useGLTF(model.src, false, true);
  const { camera, size, invalidate } = useThree();
  // The label layer lives outside the canvas and asks for a frame once its elements exist.
  useEffect(() => {
    redrawRef.current = invalidate;
  }, [redrawRef, invalidate]);
  const anchors = useMemo(
    () => labels.map((label) => [label.id, anchorOf(label.id, scene, model, markers)] as const),
    [labels, scene, model, markers],
  );
  const point = useMemo(() => new Vector3(), []);
  const box = useMemo(() => new Box3(), []);
  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    const placed: Array<{ node: HTMLElement; x: number; y: number }> = [];
    for (const [id, anchor] of anchors) {
      const node = nodesRef.current.get(id);
      if (!node) continue;
      if (anchor && 'point' in anchor) group.localToWorld(point.set(...anchor.point));
      if (anchor && 'node' in anchor) box.setFromObject(anchor.node).getCenter(point);
      point.project(camera);
      // Behind the camera or off the edge: hidden.
      const shown =
        anchor !== null && point.z < 1 && Math.abs(point.x) < 1 && Math.abs(point.y) < 1;
      node.style.visibility = shown ? 'visible' : 'hidden';
      const x = ((point.x + 1) / 2) * size.width;
      const y = ((1 - point.y) / 2) * size.height;
      node.style.transform = `translate(${x}px, ${y}px)`;
      if (shown) placed.push({ node, x, y });
    }
    separateLabels(placed);
  });
  return null;
}

/** The leader line's length (w-6) and the room kept between two names. */
const LEADER_PX = 24;
const LABEL_GAP_PX = 4;

/**
 * Names whose structures sit close together on the screen would overlap: top to bottom, each pill
 * that would cover one already placed moves down until it is clear, and its leader line turns to
 * still meet it. The dots stay on their structures.
 */
function separateLabels(labels: Array<{ node: HTMLElement; x: number; y: number }>) {
  const taken: Array<{ left: number; right: number; top: number; bottom: number }> = [];
  for (const { node, x, y } of labels.toSorted((a, b) => a.y - b.y)) {
    const line = node.children[1] as HTMLElement | undefined;
    const pill = node.children[2] as HTMLElement | undefined;
    if (!line || !pill) continue;
    const half = pill.offsetHeight / 2;
    const left = x + LEADER_PX;
    const right = left + pill.offsetWidth;
    let shift = 0;
    for (const other of taken.toSorted((a, b) => a.top - b.top)) {
      const top = y + shift - half;
      const bottom = y + shift + half;
      if (left < other.right && right > other.left && top < other.bottom && bottom > other.top) {
        shift = other.bottom + LABEL_GAP_PX + half - y;
      }
    }
    taken.push({ left, right, top: y + shift - half, bottom: y + shift + half });
    pill.style.transform = shift ? `translateY(${shift}px)` : '';
    line.style.transformOrigin = '0 50%';
    line.style.width = shift ? `${Math.hypot(LEADER_PX, shift)}px` : '';
    line.style.transform = shift ? `rotate(${Math.atan2(shift, LEADER_PX)}rad)` : '';
  }
}

/** The names themselves: a dot on the structure, a short line, and a pill. */
function LabelLayer({
  labels,
  nodesRef,
  redrawRef,
}: Readonly<{
  labels: Viewer3DLabel[];
  nodesRef: RefObject<Map<string, HTMLElement>>;
  redrawRef: RefObject<() => void>;
}>) {
  // The canvas draws only on demand: one more frame places names that just appeared.
  useEffect(() => redrawRef.current(), [labels, redrawRef]);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {labels.map((label) => (
        <span
          key={label.id}
          ref={(node) => {
            if (node) nodesRef.current.set(label.id, node);
            else nodesRef.current.delete(label.id);
          }}
          className="invisible absolute top-0 left-0 flex items-center"
        >
          <span
            className={`absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${label.active ? 'bg-primary' : 'bg-ink'}`}
          />
          <span
            className={`absolute h-px w-6 -translate-y-1/2 ${label.active ? 'bg-primary' : 'bg-ink'}`}
          />
          <span
            className={`absolute left-6 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold shadow-glass ${
              label.active
                ? 'bg-primary text-on-primary'
                : 'border border-glass-border bg-surface text-ink'
            }`}
          >
            {label.text}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Moves the camera to a guided stop: eased, or at once when motion is reduced. */
function CameraRig({
  model,
  stopId,
  reducedMotion,
  resetToken,
  focus,
  focusId,
  groupRef,
}: Readonly<
  Pick<Viewer3DProps, 'model' | 'stopId' | 'reducedMotion' | 'resetToken'> & {
    focus: Viewer3DFocus | null;
    focusId: string | null;
    groupRef: RefObject<Group | null>;
  }
>) {
  const { camera, invalidate } = useThree();
  const controls = useThree((state) => state.controls) as unknown as {
    target: Vector3;
    update: () => void;
  } | null;
  const goal = useRef<{ position: Vector3; target: Vector3 } | null>(null);

  useEffect(() => {
    const stop = model.stops.find((item) => item.id === stopId) ?? model.stops[0];
    if (!stop || !controls) return;
    const position = new Vector3(...toScene(stop.position));
    const target = new Vector3(...toScene(stop.target));
    if (reducedMotion) {
      camera.position.copy(position);
      controls.target.copy(target);
      controls.update();
      goal.current = null;
    } else {
      goal.current = { position, target };
    }
    invalidate();
    // resetToken is read only to rerun this: a new token returns the camera to the stop.
  }, [model.stops, stopId, reducedMotion, camera, controls, invalidate, resetToken]);

  // A structure found by name: face it from the front, far enough back to see all of it.
  useEffect(() => {
    if (!focus || !controls) return;
    const target = new Vector3(...toScene(focus.point));
    const distance = Math.min(1.2, Math.max(0.35, (focus.radius / 1000) * 5));
    const position = target.clone().add(new Vector3(0, distance * 0.15, distance));
    if (reducedMotion) {
      camera.position.copy(position);
      controls.target.copy(target);
      controls.update();
      goal.current = null;
    } else {
      goal.current = { position, target };
    }
    invalidate();
  }, [focus, reducedMotion, camera, controls, invalidate]);

  // A structure asked for by its id: turn to it from where the camera is, close enough to see it.
  useEffect(() => {
    if (!focusId || !controls || !groupRef.current) return;
    const bounds = new Box3();
    groupRef.current.traverse((object) => {
      if (object.userData.partId === focusId) bounds.expandByObject(object);
    });
    if (bounds.isEmpty()) return;
    const target = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3()).length();
    const distance = Math.min(1.2, Math.max(0.3, size * 1.6));
    const away = camera.position.clone().sub(controls.target).normalize();
    const position = target.clone().add(away.multiplyScalar(distance));
    if (reducedMotion) {
      camera.position.copy(position);
      controls.target.copy(target);
      controls.update();
      goal.current = null;
    } else {
      goal.current = { position, target };
    }
    invalidate();
  }, [focusId, reducedMotion, camera, controls, invalidate, groupRef]);

  useFrame((_, delta) => {
    if (!goal.current || !controls) return;
    const ease = 1 - Math.exp(-delta * 6);
    camera.position.lerp(goal.current.position, ease);
    controls.target.lerp(goal.current.target, ease);
    controls.update();
    if (camera.position.distanceTo(goal.current.position) < 0.0005) goal.current = null;
    else invalidate();
  });
  return null;
}

/** One step of easing towards a goal (straight there when motion is reduced). */
function easeToward(from: number, goal: number, delta: number, reducedMotion: boolean): number {
  const next = reducedMotion ? goal : from + (goal - from) * (1 - Math.exp(-delta * 8));
  return Math.abs(next - goal) < 0.5 ? goal : next;
}

/**
 * Keeps the model in the middle of the view left uncovered: a panel over the right edge shifts
 * the picture left by half its width, a sheet over the bottom shifts it up by half its height,
 * easing there and back (at once when motion is reduced). The camera's own view is shifted, so
 * taps still land true. When the uncovered view is narrower than the guided views were framed for
 * (FRAMED_VIEW_DEG), the camera zooms out to match; pinch and wheel zoom still work on top.
 */
function ViewInset({
  right,
  bottom,
  top,
  reducedMotion,
}: Readonly<{ right: number; bottom: number; top: number; reducedMotion: boolean }>) {
  const { size, invalidate } = useThree();
  const shift = useRef({ x: 0, y: 0 });
  const applied = useRef({ x: 0, y: 0, width: 0, height: 0, zoom: 1 });
  useEffect(() => invalidate(), [right, bottom, top, invalidate]);
  // The frame's own camera, so the projection is set where the frame is drawn.
  useFrame((state, delta) => {
    // A header over the top pushes the middle down as a sheet over the bottom pushes it up.
    const goal = { x: right / 2, y: (bottom - top) / 2 };
    const x = easeToward(shift.current.x, goal.x, delta, reducedMotion);
    const y = easeToward(shift.current.y, goal.y, delta, reducedMotion);
    shift.current = { x, y };
    if (x !== goal.x || y !== goal.y) invalidate();
    const view = state.camera as PerspectiveCamera;
    const uncovered = Math.max(1, Math.min(size.width - 2 * x, size.height - bottom - top));
    const spans = (view.fov * uncovered) / Math.max(1, size.height);
    const zoom = Math.min(1, spans / FRAMED_VIEW_DEG);
    const last = applied.current;
    if (
      last.x === x &&
      last.y === y &&
      last.width === size.width &&
      last.height === size.height &&
      last.zoom === zoom
    ) {
      return;
    }
    view.zoom = zoom;
    // Both of these update the projection, the zoom with it.
    if (x === 0 && y === 0) view.clearViewOffset();
    else view.setViewOffset(size.width, size.height, x, y, size.width, size.height);
    applied.current = { x, y, width: size.width, height: size.height, zoom };
  });
  return null;
}

/**
 * Keeps moving the model within its own bounds: the point the camera turns about stays inside
 * the model, so it can never be dragged off the screen and lost. The bounds are measured as a
 * drag starts, so they follow the systems switched on.
 */
function PanLimit({ groupRef }: Readonly<{ groupRef: RefObject<Group | null> }>) {
  const { camera } = useThree();
  const controls = useThree((state) => state.controls) as unknown as {
    target: Vector3;
    addEventListener: (type: string, listener: () => void) => void;
    removeEventListener: (type: string, listener: () => void) => void;
  } | null;
  useEffect(() => {
    if (!controls) return;
    const bounds = new Box3();
    const before = new Vector3();
    const measure = () => {
      // A little room around it: guided views may look at a point just off the surface.
      if (groupRef.current) bounds.setFromObject(groupRef.current).expandByScalar(PAN_MARGIN_M);
    };
    const keep = () => {
      if (bounds.isEmpty()) return;
      before.copy(controls.target);
      controls.target.clamp(bounds.min, bounds.max);
      // The camera moves back by as much, so the view slides rather than swings.
      camera.position.add(controls.target).sub(before);
    };
    controls.addEventListener('start', measure);
    controls.addEventListener('change', keep);
    return () => {
      controls.removeEventListener('start', measure);
      controls.removeEventListener('change', keep);
    };
  }, [controls, camera, groupRef]);
  return null;
}

/** A surface point in the model frame, lifted a little along the surface normal. */
function surfacePoint(event: ThreeEvent<PointerEvent>, group: Group): Point3 {
  const local = group.worldToLocal(event.point.clone());
  const normal = event.face?.normal ?? new Vector3();
  return [
    local.x + normal.x * PEN_LIFT_MM,
    local.y + normal.y * PEN_LIFT_MM,
    local.z + normal.z * PEN_LIFT_MM,
  ];
}

function distance(a: Point3, b: Point3): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

/**
 * The 3D view: parts from the model file, traces (nerves, lymph node groups) drawn from content
 * data in the same frame, optional markers, and the student's own drawings. Renders only on
 * demand (orbit, selection, drawing or camera moves), to spare the battery.
 */
export default function Viewer3D({
  model,
  highlight,
  onSelect,
  stopId,
  hiddenKinds,
  hiddenIds = NONE,
  xray = false,
  reducedMotion,
  markers = [],
  maxDistance = 1.5,
  pen = null,
  strokes = [],
  labels = [],
  resetToken = 0,
  dpr = [1, 2],
  layers = [],
  section = null,
  focus = null,
  focusId = null,
  pose = null,
  insetRight = 0,
  insetBottom = 0,
  insetTop = 0,
  pan = false,
}: Readonly<Viewer3DProps>) {
  // Only a lit part, trace or system structure dims the rest; a lit marker leaves the model as is.
  const selecting =
    [...model.parts, ...model.traces].some((item) => highlight.has(item.id)) ||
    [...highlight].some((id) => id.includes('/'));
  const group = useRef<Group>(null);
  const [draft, setDraft] = useState<Point3[]>([]);
  const drawing = useRef<Point3[] | null>(null);
  const labelNodes = useRef(new Map<string, HTMLElement>());
  const redraw = useRef<() => void>(() => {});

  const finishStroke = () => {
    const points = drawing.current;
    drawing.current = null;
    setDraft([]);
    if (pen && points && points.length > 1) pen.onStroke({ colour: pen.colour, points });
  };
  const penHandlers = pen
    ? {
        onPointerDown: (event: ThreeEvent<PointerEvent>) => {
          if (!group.current) return;
          event.stopPropagation();
          drawing.current = [surfacePoint(event, group.current)];
          setDraft(drawing.current);
        },
        onPointerMove: (event: ThreeEvent<PointerEvent>) => {
          const points = drawing.current;
          if (!points || !group.current) return;
          const point = surfacePoint(event, group.current);
          const last = points.at(-1);
          if (last && distance(last, point) < PEN_STEP_MM) return;
          drawing.current = [...points, point];
          setDraft(drawing.current);
        },
      }
    : {};

  return (
    <div className="relative size-full">
      <Canvas
        frameloop="demand"
        dpr={dpr}
        camera={{ fov: 35, near: 0.005, far: 10, position: [0.3, 0.2, 0.6] }}
        onPointerMissed={() => {
          if (!pen) onSelect(null);
        }}
        // A stroke ends wherever the finger lifts, on the model or off it.
        onPointerUp={pen ? finishStroke : undefined}
        onPointerLeave={pen ? finishStroke : undefined}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[1, 1.5, 1.2]} intensity={1.4} />
        <directionalLight position={[-1, 0.5, -1]} intensity={0.4} />
        <group
          ref={group}
          position={MODEL_GROUP.position}
          rotation={MODEL_GROUP.rotation}
          scale={MODEL_GROUP.scale}
          {...penHandlers}
        >
          <Parts
            model={model}
            highlight={highlight}
            selecting={selecting}
            onSelect={pen ? () => {} : onSelect}
            hiddenKinds={hiddenKinds}
            hiddenIds={hiddenIds}
            xray={xray}
            sectioned={section !== null}
          />
          {layers.map((layer) => (
            // Each system arrives on its own; the body is usable while the rest load.
            <Suspense key={layer.id} fallback={null}>
              <SystemLayer
                layer={layer}
                highlight={highlight}
                selecting={selecting}
                xray={xray}
                sectioned={section !== null}
                onSelect={pen ? () => {} : onSelect}
              />
            </Suspense>
          ))}
          {model.traces
            .filter((trace) => !hiddenIds.has(trace.id))
            .map((trace) => (
              <Trace
                key={trace.id}
                trace={trace}
                lit={highlight.has(trace.id)}
                dimmed={selecting && !highlight.has(trace.id)}
                onSelect={pen ? () => {} : onSelect}
              />
            ))}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              marker={marker}
              lit={highlight.has(marker.id)}
              onSelect={pen ? () => {} : onSelect}
            />
          ))}
          {strokes.map((stroke) => (
            <Line
              key={strokeKey(stroke)}
              points={stroke.points}
              color={tokenColour(stroke.colour)}
              lineWidth={3}
            />
          ))}
          {draft.length > 1 && pen ? (
            <Line points={draft} color={tokenColour(pen.colour)} lineWidth={3} />
          ) : null}
        </group>
        <Section section={section} groupRef={group} />
        <Movement pose={pose} groupRef={group} />
        <LabelTracker
          model={model}
          labels={labels}
          markers={markers}
          groupRef={group}
          nodesRef={labelNodes}
          redrawRef={redraw}
        />
        <OrbitControls
          makeDefault
          enabled={!pen}
          enableDamping={!reducedMotion}
          minDistance={0.08}
          maxDistance={maxDistance}
          // Turning is the plain drag; moving is the right button or two fingers, or the plain
          // drag while the Move tool is on.
          mouseButtons={
            pan
              ? { LEFT: MOUSE.PAN, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.ROTATE }
              : { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }
          }
          touches={
            pan
              ? { ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE }
              : { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }
          }
        />
        <PanLimit groupRef={group} />
        <ViewInset
          right={insetRight}
          bottom={insetBottom}
          top={insetTop}
          reducedMotion={reducedMotion}
        />
        <CameraRig
          model={model}
          stopId={stopId}
          reducedMotion={reducedMotion}
          resetToken={resetToken}
          focus={focus}
          focusId={focusId}
          groupRef={group}
        />
      </Canvas>
      <LabelLayer labels={labels} nodesRef={labelNodes} redrawRef={redraw} />
    </div>
  );
}
