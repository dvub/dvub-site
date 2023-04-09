/* eslint-disable react/no-unknown-property */;
import * as THREE from "three";
import mathUtils from '../utils/math'
import { Metadata } from "../types/metadata";

const Cone = (args: {
  position: THREE.Vector3,
  index: number,
  handleOnPointerOver(meta: Metadata | null): any,
  meta: Metadata,
}) => {
  const { position, index, handleOnPointerOver, meta } = args;
  const { x, y, z } = position;
  const randRad = (): number => {
    return Math.random() * (2 * Math.PI);
  }
  const rotation = new THREE.Euler(randRad(), randRad(), randRad(), 'XYZ');
  return (
    <mesh
      position={[x, y, z]}
      rotation={rotation}
      onPointerOver={() => { handleOnPointerOver(meta) }}
      onPointerLeave={() => { handleOnPointerOver(null)}}
    >
      <coneGeometry args={[1, 1.5, 3, 1]} />
      <meshStandardMaterial color={`rgb(${62 + index},${146 + index},${230 + index})`} />
    </mesh>
  );
}

const Sphere = (props: {
  handleOnPointerOver(meta: Metadata | null): any,
  metas: Metadata[],
}) => {
  // declare variables
  const position = new THREE.Vector3(0, 0, 0);
  const pointCount = props.metas.length;
  const radius = 20;

  const cones = new Array(pointCount).fill(null!).map((x, i) => {
    return (
      <Cone
        key={i}
        position={mathUtils.randomSpherePoint(position, radius)}
        index={i}
        handleOnPointerOver={props.handleOnPointerOver}
        meta={props.metas[i]}
      />
    );
  });
  return (
    <group>
      {cones}
    </group>
  );
}

export default Sphere;  