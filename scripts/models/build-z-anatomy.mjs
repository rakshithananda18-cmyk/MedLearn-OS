// Builds the body's nervous system and lymph nodes in apps/web/public/models/body-<system>.glb
// from Z-Anatomy, which has what BodyParts3D lacks: the peripheral nerves, and the lymph nodes by
// group. Every structure is one mesh named as Z-Anatomy names it, so a tap anywhere can say what
// it is, and each joins the body index for search.
//
// Source: Z-Anatomy by Gauthier Kervyn and Lluís Vinent Juanico, built on BodyParts3D, licensed
// CC BY-SA 4.0: the FBX set at github.com/LluisV/Z-Anatomy (Resources/Models/FBX). The originals
// stay in models-src/z-anatomy; the layers built from them are shared under the same licence
// (body-z-anatomy.LICENSE.txt).
// Usage: node scripts/models/build-z-anatomy.mjs [folder with the FBX files, default
// models-src/z-anatomy]
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';

import { FBXLoader } from '../../packages/visuals/node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { fail } from '../lib/cli.mjs';
import { indexEntry, layerIO, updateIndex, writeLayer } from './build-body-systems.mjs';

/** Each layer's source file, triangles across the whole body, and the download it may take. */
export const LAYERS = {
  nerves: { file: 'NervousSystem100.fbx', triangles: 200_000, maxBytes: 2_600_000 },
  lymph: { file: 'LymphoidOrgans100.fbx', triangles: 40_000, maxBytes: 800_000 },
};

// Below this many triangles a mesh is one of Z-Anatomy's label anchors, not a structure.
const MIN_TRIANGLES = 24;

/**
 * Z-Anatomy's frame (Y up, centimetres) to BodyParts3D's (Z up, millimetres), so the layers sit
 * on the same body: fitted on the kidneys, pancreas and corpus callosum, which both sets have, to
 * within a few millimetres.
 */
export const toBodyParts3D = ([x, y, z]) => [10 * x, -10 * z - 97, 10 * y - 72];

// Words a structure's name can end with, before Z-Anatomy's side letter.
const SIDED_WORD = /(nerve|nodes?|branch(es)?|ganglion|plexus|root|artery|vein|lobe)$/i;

/**
 * A plain name from Z-Anatomy's: a trailing l or r is the side when the other side is there too,
 * or when it follows a whole word ("Median_nervel" becomes "Left median nerve"), and a trailing prime marks a further piece of the
 * same structure ("Central_canal'" is the canal's part in the medulla). Section planes are not
 * structures.
 */
export function plainName(meshName, names) {
  if (/^Cross_Section/i.test(meshName)) return null;
  const raw = meshName.replace(/'+$/, '');
  const words = (text) => text.replaceAll('_', ' ').replaceAll(/\s+/g, ' ').trim();
  const side = raw.at(-1);
  const stem = raw.slice(0, -1);
  const paired = (side === 'l' && names.has(`${stem}r`)) || (side === 'r' && names.has(`${stem}l`));
  // A structure drawn on one side only still ends in a whole word ("Cochlear_nervel").
  const sided = (side === 'l' || side === 'r') && SIDED_WORD.test(stem);
  if (!paired && !sided) return words(raw);
  const name = words(stem);
  return `${side === 'l' ? 'Left' : 'Right'} ${name.charAt(0).toLowerCase()}${name.slice(1)}`;
}

/** One mesh's triangles in BodyParts3D millimetres, with its place in the file applied. */
function trianglesOf(mesh) {
  const source = mesh.geometry.attributes.position;
  const positions = new Float32Array(source.count * 3);
  const point = [0, 0, 0];
  const elements = mesh.matrixWorld.elements;
  for (let at = 0; at < source.count; at++) {
    const [x, y, z] = [source.getX(at), source.getY(at), source.getZ(at)];
    point[0] = elements[0] * x + elements[4] * y + elements[8] * z + elements[12];
    point[1] = elements[1] * x + elements[5] * y + elements[9] * z + elements[13];
    point[2] = elements[2] * x + elements[6] * y + elements[10] * z + elements[14];
    positions.set(toBodyParts3D(point), at * 3);
  }
  const indices = mesh.geometry.index
    ? Uint32Array.from(mesh.geometry.index.array)
    : Uint32Array.from({ length: source.count }, (_, at) => at);
  return { positions, indices };
}

/** Joins several meshes of one structure into one. */
function joined(parts) {
  const positions = new Float32Array(parts.reduce((n, part) => n + part.positions.length, 0));
  const indices = new Uint32Array(parts.reduce((n, part) => n + part.indices.length, 0));
  let positionAt = 0;
  let indexAt = 0;
  for (const part of parts) {
    positions.set(part.positions, positionAt);
    indices.set(
      part.indices.map((index) => index + positionAt / 3),
      indexAt,
    );
    positionAt += part.positions.length;
    indexAt += part.indices.length;
  }
  return { positions, indices };
}

/** A layer's structures from its FBX file: `[name, { positions, indices }][]`. */
export function structuresOf(path) {
  const buffer = readFileSync(path);
  const scene = new FBXLoader().parse(
    buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
    '',
  );
  scene.updateMatrixWorld(true);
  const meshes = [];
  scene.traverse((child) => {
    if (!child.isMesh) return;
    const count = child.geometry.index?.count ?? child.geometry.attributes.position.count;
    if (count / 3 >= MIN_TRIANGLES) meshes.push(child);
  });
  const names = new Set(meshes.map((mesh) => mesh.name));
  const byName = new Map();
  for (const mesh of meshes) {
    const name = plainName(mesh.name, names);
    if (name) byName.set(name, [...(byName.get(name) ?? []), trianglesOf(mesh)]);
  }
  return [...byName].map(([name, parts]) => [name, joined(parts)]);
}

async function main() {
  const folder = process.argv[2] ?? 'models-src/z-anatomy';
  await MeshoptEncoder.ready;
  await MeshoptSimplifier.ready;
  const io = layerIO();
  const entries = [];
  for (const [system, layer] of Object.entries(LAYERS)) {
    let meshes;
    try {
      meshes = structuresOf(join(folder, layer.file));
    } catch (error) {
      fail(`Could not read ${layer.file} in ${folder}: ${error.message}`);
    }
    entries.push(...meshes.map(([name, mesh]) => indexEntry(system, name, mesh.positions)));
    await writeLayer(system, meshes, layer, io);
  }
  updateIndex(Object.keys(LAYERS), entries);
}

if (process.argv[1]?.endsWith('build-z-anatomy.mjs')) await main();
