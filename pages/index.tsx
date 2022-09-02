import type { NextPage } from 'next'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { meshBounds, OrbitControls, Stars } from '@react-three/drei'
import CSS from 'csstype'
import * as THREE from 'three'
import { useRef } from 'react'
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
          <OrbitControls/>
          <Stars/>
          <ambientLight intensity={0.5}/>
          <spotLight
            position={[10,15,10]}
            angle={0.3}
          />
          <Box />
        </Canvas>
      </div>
    </div>
  );
}

const Box = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      
      <boxBufferGeometry attach="geometry"/>
      <meshLambertMaterial attach="material" color="hotpink" />

    </mesh>
  );
}

export default Home
