'use client';

import type { Model3D, ModelNerve } from '@medlearn/schemas';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, type ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
  CatmullRomCurve3,
  Color,
  type Mesh,
  MeshStandardMaterial,
  TubeGeometry,
  Vector3,
} from 'three';

import { MODEL_GROUP, toScene } from './scene';

export interface Viewer3DProps {
  model: Model3D;
  /** Structures to glow: a nerve's whole path or one part. Everything else dims. */
  highlight: ReadonlySet<string>;
  onSelect: (id: string | null) => void;
  stopId: string;
  showBones: boolean;
  showArteries: boolean;
  reducedMotion: boolean;
}

const NERVE_RADIUS_MM = 1.8;
const DIMMED = 0.3;

/** Anatomical colours come from the design tokens, so 2D and 3D always match. */
function tokenColour(name: string): Color {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value ? new Color(value) : new Color();
}

function material(colour: Color, lit: boolean, dimmed: boolean): MeshStandardMaterial {
  return new MeshStandardMaterial({
    color: colour,
    roughness: 0.6,
    emissive: lit ? tokenColour('--ml-gold') : new Color('black'),
    emissiveIntensity: lit ? 0.6 : 0,
    transparent: dimmed,
    opacity: dimmed ? DIMMED : 1,
  });
}

function Nerve({
  nerve,
  lit,
  dimmed,
  onSelect,
}: Readonly<{ nerve: ModelNerve; lit: boolean; dimmed: boolean; onSelect: (id: string) => void }>) {
  const geometries = useMemo(
    () =>
      nerve.paths.map((points) => {
        const curve = new CatmullRomCurve3(points.map((point) => new Vector3(...point)));
        return new TubeGeometry(curve, points.length * 12, NERVE_RADIUS_MM, 8, false);
      }),
    [nerve],
  );
  const nerveMaterial = useMemo(
    () => material(tokenColour('--color-anat-nerve'), lit, dimmed),
    [lit, dimmed],
  );
  const select = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(nerve.id);
  };
  return (
    <>
      {geometries.map((geometry) => (
        <mesh key={geometry.uuid} geometry={geometry} material={nerveMaterial} onClick={select} />
      ))}
    </>
  );
}

function Parts({
  model,
  highlight,
  onSelect,
  showBones,
  showArteries,
}: Readonly<Omit<Viewer3DProps, 'stopId' | 'reducedMotion'>>) {
  const { scene } = useGLTF(model.src, false, true);
  const selecting = highlight.size > 0;

  useEffect(() => {
    for (const part of model.parts) {
      const node = scene.getObjectByName(part.id) as Mesh | undefined;
      if (!node) continue;
      node.visible = part.kind === 'bone' ? showBones : showArteries;
      node.traverse((child) => {
        const mesh = child as Mesh;
        if (!mesh.isMesh) return;
        if (!mesh.geometry.getAttribute('normal')) mesh.geometry.computeVertexNormals();
        const colour = tokenColour(
          part.kind === 'bone' ? '--color-anat-bone' : '--color-anat-artery',
        );
        mesh.material = material(
          colour,
          highlight.has(part.id),
          selecting && !highlight.has(part.id),
        );
        mesh.userData.partId = part.id;
      });
    }
  }, [scene, model.parts, highlight, selecting, showBones, showArteries]);

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

/**
 * The 3D view: bones and arteries from the model file, nerves drawn from content data in the
 * same frame. Renders only on demand (orbit, selection or camera moves), to spare the battery.
 */
export default function Viewer3D({
  model,
  highlight,
  onSelect,
  stopId,
  showBones,
  showArteries,
  reducedMotion,
}: Readonly<Viewer3DProps>) {
  const selecting = highlight.size > 0;
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ fov: 35, near: 0.005, far: 5, position: [0.3, 0.2, 0.6] }}
      onPointerMissed={() => onSelect(null)}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[1, 1.5, 1.2]} intensity={1.4} />
      <directionalLight position={[-1, 0.5, -1]} intensity={0.4} />
      <group
        position={MODEL_GROUP.position}
        rotation={MODEL_GROUP.rotation}
        scale={MODEL_GROUP.scale}
      >
        <Parts
          model={model}
          highlight={highlight}
          onSelect={onSelect}
          showBones={showBones}
          showArteries={showArteries}
        />
        {model.nerves.map((nerve) => (
          <Nerve
            key={nerve.id}
            nerve={nerve}
            lit={highlight.has(nerve.id)}
            dimmed={selecting && !highlight.has(nerve.id)}
            onSelect={onSelect}
          />
        ))}
      </group>
      <OrbitControls
        makeDefault
        enableDamping={!reducedMotion}
        minDistance={0.08}
        maxDistance={1.5}
      />
      <CameraRig model={model} stopId={stopId} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
