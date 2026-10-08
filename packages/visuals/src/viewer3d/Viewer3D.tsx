'use client';

import type { Model3D, ModelTrace, PartKind, Point3 } from '@medlearn/schemas';
import { Line, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, type ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { type RefObject, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box3,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  FrontSide,
  type Group,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  type Object3D,
  Plane,
  SphereGeometry,
  TubeGeometry,
  Vector3,
} from 'three';

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
export type LayerKind = PartKind | 'nerve' | 'lymph' | 'organ';

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
  /** A joint movement shown on the model. */
  pose?: Viewer3DPose | null;
}

const TRACE_RADIUS_MM: Record<ModelTrace['kind'], number> = {
  nerve: 1.8,
  lymph: 3.2,
  outline: 1.4,
};
const MARKER_RADIUS_MM = 28;
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
  skin: '--color-anat-skin',
};
const TRACE_COLOUR: Record<ModelTrace['kind'], string> = {
  nerve: '--color-anat-nerve',
  lymph: '--color-anat-lymph',
  outline: '--color-fg-muted',
};
// Muscles and skin are see-through, so the vessels and nerves under them stay visible.
const PART_OPACITY: Record<PartKind, number> = {
  bone: 1,
  muscle: 0.45,
  artery: 1,
  vein: 1,
  skin: 0.35,
};

const LAYER_COLOUR: Record<LayerKind, string> = {
  ...PART_COLOUR,
  nerve: '--color-anat-nerve',
  lymph: '--color-anat-lymph',
  organ: '--color-anat-organ',
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
    return geometries.map((geometry) => new Mesh(geometry, traceMaterial));
  }, [geometries, trace.kind, lit, dimmed]);
  const select = (event: ThreeEvent<MouseEvent>) => {
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

// A played movement goes there and back in this many seconds.
const SWING_SECONDS = 4;

/**
 * Turns a movement's structures about its axis, as rigid parts: each keeps its resting place to
 * return to. Applied on every frame drawn while a movement shows, so systems switched on
 * meanwhile join in; playing, it swings by itself.
 */
function Movement({
  pose,
  groupRef,
}: Readonly<{ pose: Viewer3DPose | null; groupRef: RefObject<Group | null> }>) {
  const { invalidate } = useThree();
  const posed = useRef(false);
  const turn = useMemo(() => new Matrix4(), []);
  const step = useMemo(() => new Matrix4(), []);

  useEffect(() => {
    invalidate();
  }, [pose, invalidate]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group || (!pose && !posed.current)) return;
    if (pose) {
      const angle = pose.playing
        ? (pose.range * (1 - Math.cos((state.clock.elapsedTime * 2 * Math.PI) / SWING_SECONDS))) / 2
        : pose.angle;
      const [x, y, z] = pose.pivot;
      turn
        .makeTranslation(x, y, z)
        .multiply(step.makeRotationAxis(new Vector3(...pose.axis).normalize(), angle))
        .multiply(step.makeTranslation(-x, -y, -z));
    }
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
    });
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
        PART_OPACITY[part.kind] * (selecting && !lit ? DIMMED : 1) * (xray && !lit ? XRAY : 1);
      node.traverse((child) => {
        const mesh = child as Mesh;
        if (!mesh.isMesh) return;
        if (!mesh.geometry.getAttribute('normal')) mesh.geometry.computeVertexNormals();
        mesh.material = material(tokenColour(PART_COLOUR[part.kind]), lit, opacity, sectioned);
        mesh.userData.partId = part.id;
      });
    }
  }, [scene, model.parts, highlight, selecting, hiddenKinds, hiddenIds, xray, sectioned]);

  const select = (event: ThreeEvent<MouseEvent>) => {
    const id = event.object.userData.partId as string | undefined;
    // Hidden or cut-away parts are still in the way of the ray: let the tap through.
    if (!id || !drawn(event, gl.clippingPlanes)) return;
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
        if (!id || !drawn(event, gl.clippingPlanes)) return;
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
      node.style.transform = `translate(${((point.x + 1) / 2) * size.width}px, ${((1 - point.y) / 2) * size.height}px)`;
    }
  });
  return null;
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
}: Readonly<
  Pick<Viewer3DProps, 'model' | 'stopId' | 'reducedMotion' | 'resetToken'> & {
    focus: Viewer3DFocus | null;
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
  pose = null,
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
        />
        <CameraRig
          model={model}
          stopId={stopId}
          reducedMotion={reducedMotion}
          resetToken={resetToken}
          focus={focus}
        />
      </Canvas>
      <LabelLayer labels={labels} nodesRef={labelNodes} redrawRef={redraw} />
    </div>
  );
}
