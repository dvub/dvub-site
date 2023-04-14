/* eslint-disable react/no-unknown-property */;
import * as THREE from "three";
import mathUtils from '../utils/math'
import { Metadata } from "../types/metadata";
import { Html } from "@react-three/drei";

const Cone = (args: {
  position: THREE.Vector3,
  index: number,
  meta: Metadata,
}) => {
  const { position, index, meta } = args;
  const { x, y, z } = position;
  const randRad = (): number => {
    return Math.random() * (2 * Math.PI);
  }
  const rotation = new THREE.Euler(randRad(), randRad(), randRad(), 'XYZ');
  return (
    <Html as='div'>
      
      <mesh
        position={[x, y, z]}
        rotation={rotation}
      >
        <coneGeometry args={[1, 1.5, 3, 1]} />
        <meshStandardMaterial color={`rgb(${62 + index},${146 + index},${230 + index})`} />
      </mesh>
    </Html>
  );
}

const Sphere = (props: {
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