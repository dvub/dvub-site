import type { NextPage } from 'next'
import { Canvas, MeshProps, ReactThreeFiber, useFrame } from '@react-three/fiber'
import { meshBounds, OrbitControls, Point, PointMaterial, Points, Stars } from '@react-three/drei'
import CSS from 'csstype'
import * as THREE from 'three'
import { Ref, useRef, useState } from 'react'
import { BufferAttribute, BufferGeometry, PointsMaterial } from 'three'
// todo:
// use head to add titles to pages other than posts

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
          <Box/>
        </Canvas>
        
      </div>
    </div>
  );
}

const Sphere = () => {
  const pointCount = 1000;
  const radius = 20;
  const points = new Float32Array(pointCount * 3);
  for (let i = 0; i < points.length; i+=3) {
    const point = randomSpherePoint(0,0,0,radius);
    
    points[i] = point[0];
    points[i+1] = point[1];
    points[i+2] = point[2];

  }  
  const attribute = new BufferAttribute(points, 3);
  const ref = useRef<BufferAttribute>(attribute);
  

  useFrame(() => {
    for (let i = 0; i < ref.current.array.length; i+=3) {
      const positions = ref.current.array;
      const x = positions[i];
      const y = positions[i+1];
      const z = positions[i+2];

      const newY = y+ 0.1;
      const positionAttribute = ref.current;
      positionAttribute.setXYZ(i, x, newY, z);
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
function Box() {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
     <mesh ref={mesh}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color={"orange"} />
     </mesh>
  );
}


function randomSpherePoint(x0: number, y0: number, z0: number, radius: number): [number, number, number] {
  var u = Math.random();
  var v = Math.random();
  var theta = 2 * Math.PI * u;
  var phi = Math.acos(2 * v - 1);
  var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
  var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
  var z = z0 + (radius * Math.cos(phi));
  return [x, y, z];
}

export default Home
