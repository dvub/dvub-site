import type { NextPage } from 'next'
import { Canvas, MeshProps, ReactThreeFiber, useFrame } from '@react-three/fiber'
import { meshBounds, OrbitControls, Point, PointMaterial, Points, Stars } from '@react-three/drei'
import CSS from 'csstype'
import * as THREE from 'three'
import { Ref, useRef, useState } from 'react'
import { BufferAttribute, BufferGeometry, PointsMaterial, Vector3 } from 'three'
import mathUtils from '../utils/math'

// todo:
// use head to add titles to pages other than posts
// todo sphere: randomize rotation for each point
// add slight random position offset ?
// add lerp to random points, back to sphere, and so on
// change color, maybe change sprite?
// 

// other todos: remove orbitcontrols, position camera

const Home: NextPage = () => {
  const canvasStyle: CSS.Properties = {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-100',
  }
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{}}>Welcome</h1>
        <Canvas style={canvasStyle}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 15, 10]}
            angle={0.3}
          />
          <Sphere />
        </Canvas>
        
      </div>
    </div>
  );
}

const Sphere = () => {

  const rotationAxis = new Vector3(1, 1, 1);

  const position = new Vector3(0,0,0);

  const pointCount = 250;
  const radius = 20;
  const points = new Float32Array(pointCount * 3);

  for (let i = 0; i < points.length; i+=3) {

    const point = mathUtils.randomSpherePoint(position,radius);
    
    points[i] = point[0];
    points[i+1] = point[1];
    points[i+2] = point[2];

  }  


  const attribute = new BufferAttribute(points, 3);
  const ref = useRef<BufferAttribute>(attribute);


  useFrame(() => {
    ref.current.needsUpdate = true;
    for (let i = 0; i < ref.current.count; i++) {
      const x = ref.current.getX(i);
      const y = ref.current.getY(i);
      const z = ref.current.getZ(i);

      const currentVector = new Vector3(x, y, z);

      // 0.1 degrees * 60 = 6 degrees every second
      // 6 degrees in 60 seconds (6 * 60) = 360 = 1 full rotation
      const radRotation = mathUtils.toRadians(0.1);
      

      const newPos = mathUtils.rotateAboutPoint(currentVector, position, rotationAxis, radRotation);

      ref.current.setXYZ(i, newPos.x, newPos.y, newPos.z);
    }

  });


  return (
    <points >
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} ref={ref} {...attribute}/>
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={0xff00ff}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default Home
