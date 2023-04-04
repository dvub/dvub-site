/* eslint-disable react/no-unknown-property */
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { ConeGeometry } from "three";
import mathUtils from '../utils/math'

interface args {
  position: THREE.Vector3;
  index: number;
}
const Cone = (args: args) => {
  const { x, y, z } = args.position;
  const randomRadian = (): number => {
    return Math.random() * (2 * Math.PI);
  }
  const rotation = new THREE.Euler( randomRadian(), randomRadian(), randomRadian(), 'XYZ' );

  

  return (
    <mesh position={[x, y, z]} rotation={rotation}>
      <coneGeometry args={[1,1.5,3,1]}/>

      <meshStandardMaterial color={`rgb(${62+args.index},${146+args.index},${230+args.index})`}/>
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
      index={i}
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