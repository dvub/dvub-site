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
      <div>
        <div style={{marginTop: '10rem'}}>
          <h1 style={{
            animation: 'fadein 2s', 
            backgroundColor: 'transparent', 
            }}>Welcome</h1>
          <p style={{backgroundColor: 'transparent', animation: 'fadein 2s'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet. Morbi enim nunc faucibus a pellentesque sit amet porttitor eget. Ornare arcu odio ut sem nulla. Pellentesque sit amet porttitor eget dolor morbi non. Aliquam eleifend mi in nulla. Nibh mauris cursus mattis molestie a iaculis at. Quis varius quam quisque id diam vel. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Mi proin sed libero enim sed faucibus turpis in. Feugiat scelerisque varius morbi enim nunc faucibus.
          </p>
        </div>

        <Canvas style={canvasStyle} camera={{ position: [0, 0, -30] }}>

          <OrbitControls />
          <Sphere />
          <EffectComposer>
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>

      </div>
    </div>
  );
}

export default Home
