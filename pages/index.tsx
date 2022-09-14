import type { NextPage } from 'next'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CSS from 'csstype'
import Sphere from '../components/sphere'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
// todo:
// use head to add titles to pages other than posts
// todo sphere: randomize rotation for each point
// add slight random position offset ?
// add lerp to random points, back to sphere, and so on
// change color, maybe change sprite?



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


        <Canvas style={canvasStyle} camera={{ position: [0, 0, -50] }}>

          <OrbitControls />
          <Sphere />

          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>

      </div>
    </div>
  );
}

export default Home
