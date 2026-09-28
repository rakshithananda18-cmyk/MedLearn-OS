'use client';

import type { Model3D, ModelTrace, PartKind, Point3 } from '@medlearn/schemas';
import { Line, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, type ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CatmullRomCurve3,
  Color,
  type Group,
  Mesh,
  MeshStandardMaterial,
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

/** Anatomical colours come from the design tokens, so 2D and 3D always match. */
function tokenColour(name: string): Color {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value ? new Color(value) : new Color();
}

function material(colour: Color, lit: boolean, opacity: number): MeshStandardMaterial {
  return new MeshStandardMaterial({
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

function Parts({
  model,
  highlight,
  selecting,
  onSelect,
  hiddenKinds,
  hiddenIds,
  xray,
}: Readonly<
  Pick<Viewer3DProps, 'model' | 'highlight' | 'onSelect' | 'hiddenKinds'> & {
    selecting: boolean;
    hiddenIds: ReadonlySet<string>;
    xray: boolean;
  }
>) {
  const { scene } = useGLTF(model.src, false, true);

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
        mesh.material = material(tokenColour(PART_COLOUR[part.kind]), lit, opacity);
        mesh.userData.partId = part.id;
      });
    }
  }, [scene, model.parts, highlight, selecting, hiddenKinds, hiddenIds, xray]);

  const select = (event: ThreeEvent<MouseEvent>) => {
    const id = event.object.userData.partId as string | undefined;
    if (!id) return;
    event.stopPropagation();
    onSelect(id);
  };
  return <primitive object={scene} onClick={select} />;
}

/** Moves the camera to a guided stop: eased, or at once when motion is reduced. */
function CameraRig({
  model,
  stopId,
  reducedMotion,
}: Readonly<Pick<Viewer3DProps, 'model' | 'stopId' | 'reducedMotion'>>) {
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
  }, [model.stops, stopId, reducedMotion, camera, controls, invalidate]);

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
}: Readonly<Viewer3DProps>) {
  // Only a lit part or trace dims the rest; a lit marker leaves the model as it is.
  const selecting = [...model.parts, ...model.traces].some((item) => highlight.has(item.id));
  const group = useRef<Group>(null);
  const [draft, setDraft] = useState<Point3[]>([]);
  const drawing = useRef<Point3[] | null>(null);

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
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
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
        />
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
      <OrbitControls
        makeDefault
        enabled={!pen}
        enableDamping={!reducedMotion}
        minDistance={0.08}
        maxDistance={maxDistance}
      />
      <CameraRig model={model} stopId={stopId} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
