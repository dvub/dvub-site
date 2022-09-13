import type { NextPage } from 'next'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CSS from 'csstype'
import * as THREE from 'three'
import { Ref, useRef, useState } from 'react'
import mathUtils from '../utils/math'

// todo:
// use head to add titles to pages other than posts
// todo sphere: randomize rotation for each point
// add slight random position offset ?
// add lerp to random points, back to sphere, and so on
// change color, maybe change sprite?

// kind of weird technique ?
const SetCamera = () => {
  const { camera } = useThree();
  camera.position.set(0,0,-50);
  return (
    <>
    </>
  )
}

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
          <OrbitControls/>
          <SetCamera/>
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
  // declare variables
  const rotationAxis = new THREE.Vector3(1, 1, 0);
  const position = new THREE.Vector3(0,0,0);
  const pointCount = 250;
  const radius = 20;
  const min = -1 * radius;
  const max = radius;
  const randomPoints = Array<THREE.Vector3>(pointCount);
  for (let i = 0; i < randomPoints.length; i++) {
    const x = mathUtils.randomRange(min, max);
    const y = mathUtils.randomRange(min, max);
    const z = mathUtils.randomRange(min, max);
    randomPoints[i] = new THREE.Vector3(x, y, z);
  }

  const spherePoints = Array<THREE.Vector3>(pointCount);
  for (let i = 0; i < spherePoints.length; i++) {
    spherePoints[i] = mathUtils.randomSpherePoint(position, radius);
  }
  const currentPoints = new Float32Array(pointCount * 3);
  for (let i = 0; i < currentPoints.length; i+=3) {
    const p = randomPoints[i / 3];
    currentPoints[i] = p.x;
    currentPoints[i + 1] = p.y;
    currentPoints[i + 2] = p.z;
  }


  // get our buffer attribute setup
  const attribute = new THREE.BufferAttribute(currentPoints, 3);
  const ref = useRef<THREE.BufferAttribute>(attribute);
  const lerpFactor = useRef<number>(0.0);

  // animation loop
  useFrame((state, delta) => {
    ref.current.needsUpdate = true;
    
    for (let i = 0; i < ref.current.count; i++) {

      const randomPosition = randomPoints[i];
      const spherePosition = spherePoints[i];
      const x = ref.current.getX(i);
      const y = ref.current.getY(i);
      const z = ref.current.getZ(i);
      let curr = new THREE.Vector3(x,y,z);

      
      if (lerpFactor.current < 1) {
        
        lerpFactor.current += (0.0005 * delta);
        curr = randomPosition.lerp(spherePosition, lerpFactor.current);
        
      }



      // 0.1 degrees * 60 = 6 degrees every second
      // 6 degrees in 60 seconds (6 * 60) = 360 = 1 full rotation
      const radRotation = mathUtils.toRadians(0.1);
      
       const np = mathUtils.rotateAboutPoint(curr, position, rotationAxis, radRotation);
      ref.current.setXYZ(i, np.x, np.y, np.z);
    }

  });

  // return our buffergeometry using the attribute
  return (
    <points >
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} ref={ref} {...attribute}/>
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={0xB372DC}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default Home
