import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import CSS from 'csstype'
// todo:
// use head to add titles to pages other than posts

const Home: NextPage = () => {
  const canvasStyle: CSS.Properties = {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-100',
  }
  const contentStyle: CSS.Properties = {
    marginTop: '50%',
    position: 'relative',
    zIndex: '100',
  }
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
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
        <div style={contentStyle}>
          <h1>Welcome</h1>
          <p>
            more stuff will show up later
          </p>
        </div>
      </div>
    </div>
  );
}

const Box = () => {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry"/>
      <meshLambertMaterial attach="material" color="hotpink" />

    </mesh>
  );
}

export default Home
