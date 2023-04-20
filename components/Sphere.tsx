/* eslint-disable react/no-unknown-property */;
import * as THREE from "three";
import mathUtils from '../utils/math'
import { Metadata } from "../types/metadata";
import { Html, Line } from "@react-three/drei";
import { useRouter } from "next/router";
import { CSSProperties, memo, useRef, useState } from "react";

const Cone = (args: {
  position: THREE.Vector3,
  index: number,
  meta: Metadata,
}) => {
  const { meta } = args;
  const [rotation, setRotation] = useState(new THREE.Euler(mathUtils.randomRad(), mathUtils.randomRad(), mathUtils.randomRad(), 'XYZ'));
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0).copy(args.position).multiplyScalar(mathUtils.randomRange(0.75, 1)));
  const [style, setStyle] = useState<CSSProperties>({
    fontSize: '13px',
    opacity: '0%',
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '4px',
    transition: 'opacity 0.1s ease',
    whiteSpace: 'nowrap',
    position: 'relative',
    left: '1rem'
  });
  const router = useRouter();

  return (
    <>
      <mesh
        position={position}
        rotation={rotation}
        onClick={() => { router.push(`/posts/${meta.fileName}`); }}
        onPointerOver={() => {
          setStyle({ ...style, opacity: '100%' });
          console.log(position)
        }}
        onPointerLeave={() => {
          setStyle({ ...style, opacity: '0%' });
        }}
      >
        <Html style={style} center={false}>
          <div className='mono'>{meta.title}</div>
        </Html>
        <coneGeometry args={[1, 1.5, 3, 1]} />
        <meshStandardMaterial wireframe={true} color='black' />
      </mesh>
      <Line
        points={[[0, 0, 0],
        [position.x, position.y, position.z]]}
        matrixWorldAutoUpdate={undefined}
        getObjectsByProperty={undefined}
        forceSinglePass={undefined}
        getVertexPosition={undefined}
      />
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