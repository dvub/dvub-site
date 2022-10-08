/* eslint-disable react/no-unknown-property */
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { ConeGeometry } from "three";
import mathUtils from '../utils/math'

interface args {
  position: THREE.Vector3;
}

const Cone = (args: args) => {
  const { x, y, z } = args.position;
  const a = new THREE.Euler( 0, 0, 1.57, 'XYZ' );
  return (
    <mesh position={[x, y, z]} rotation={a}>
      <coneGeometry args={[1,1.5,3,1]}/>
      <meshStandardMaterial color={'gray'}/>
    </mesh>
  );
}
const Sphere = () => {
  // declare variables

  const position = new THREE.Vector3(0, 0, 0);
  const pointCount = 100;
  const radius = 20;

  const cones = new Array(pointCount).fill(null!).map((x, i) => {
    return (
    <Cone 
      key={i} 
      position={mathUtils.randomSpherePoint(position, radius)}
    />
    );
  });

  // return our buffergeometry using the attribute
  return (
    <group>
      {cones}
    </group>
  );
}
export default Sphere;  