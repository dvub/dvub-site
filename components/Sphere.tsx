/* eslint-disable react/no-unknown-property */;
import * as THREE from "three";
import mathUtils from '../utils/math'
import { Metadata } from "../types/metadata";
import { Html, Line } from "@react-three/drei";
import 'react-tooltip/dist/react-tooltip.css'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useRef } from "react";

const Cone = (args: {
  position: THREE.Vector3,
  index: number,
  meta: Metadata,
}) => {
  const { position, index, meta } = args;
  const positionScale = 0.75 + (Math.random() * 0.25);

  const randRad = (): number => {
    return Math.random() * (2 * Math.PI);
  }
  const rotation = new THREE.Euler(randRad(), randRad(), randRad(), 'XYZ');
  const router = useRouter();


  return (
    <>
    <mesh
      position={position.multiplyScalar(positionScale)}
      rotation={rotation}
      onClick={() => {router.push(`/posts/${meta.fileName}`);}}
    >
      <Html>
        <div
          data-tooltip-id="my-tooltip"
          data-tooltip-content={meta.title}
          style={{fontSize:'12px'}}
        >
          <p >...</p>
        </div>
      </Html>
      <coneGeometry args={[1, 1.5, 3, 1]} />
      <meshStandardMaterial color={`rgb(${62 + index},${146 + index},${230 + index})`} />

    </mesh>
    <Line points={[[0,0,0], [position.x,position.y,position.z]]} />
    </>
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