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

  const points = new Float32Array(pointCount * 3);
  const randomPoints = new Float32Array(pointCount * 3);
  // iterate and set points, random points
  for (let i = 0; i < randomPoints.length; i+=3) {
    randomPoints[i] = mathUtils.randomRange(-20, 20);
    randomPoints[i+1] = mathUtils.randomRange(-20, 20);
    randomPoints[i+2] = mathUtils.randomRange(-20, 20);
  } 

  for (let i = 0; i < points.length; i+=3) {
    const point = mathUtils.randomSpherePoint(position,radius);
    points[i] = point.x;
    points[i+1] = point.y;
    points[i+2] = point.z;
  }  

  // get our buffer attribute setup
  const randomPointsAttribute = new THREE.BufferAttribute(randomPoints, 3);
  const attribute = new THREE.BufferAttribute(points, 3);
  const ref = useRef<THREE.BufferAttribute>(attribute);
  const lerpFactor = useRef<number>(1);

  // animation loop
  useFrame((state) => {

    ref.current.needsUpdate = true;
    
    for (let i = 0; i < ref.current.count; i++) {

      const x = ref.current.getX(i);
      const y = ref.current.getY(i);
      const z = ref.current.getZ(i);
      
      const randX = randomPointsAttribute.getX(i);
      const randY = randomPointsAttribute.getY(i);
      const randZ = randomPointsAttribute.getZ(i);


      const currentPosition = new THREE.Vector3(x, y, z);
      const randPosition = new THREE.Vector3(randX, randY, randZ);

      const lerped = currentPosition.lerp(randPosition, lerpFactor.current);
      if (lerpFactor.current > 0) {
        lerpFactor.current -= 0.0001;
      }
      // 0.1 degrees * 60 = 6 degrees every second
      // 6 degrees in 60 seconds (6 * 60) = 360 = 1 full rotation
      const radRotation = mathUtils.toRadians(0.1);
      
      const newPos = mathUtils.rotateAboutPoint(lerped, position, rotationAxis, radRotation);
      ref.current.setXYZ(i, newPos.x, newPos.y, newPos.z);
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
