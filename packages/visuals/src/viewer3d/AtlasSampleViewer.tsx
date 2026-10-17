'use client';

import { useGLTF } from '@react-three/drei';

import Viewer3D, { type Viewer3DProps } from './Viewer3D';

/** Resolve the sample asset before mounting the canvas and its initial camera/label effects. */
export default function AtlasSampleViewer(props: Readonly<Viewer3DProps>) {
  useGLTF(props.model.src, false, true);
  return <Viewer3D {...props} />;
}
