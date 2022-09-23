import type { NextPage } from 'next'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CSS from 'csstype'
import Sphere from '../components/sphere'
import { EffectComposer, Vignette, DepthOfField} from '@react-three/postprocessing'

const Home: NextPage = () => {
  return (
    <div>
      <div>
        <div style={{ marginTop: '10rem', zIndex: '1', background: 'transparent', backdropFilter: 'blur(2px)'}}>
          <h1>I&#39;m dvub, a developer;</h1>
          <h1>Welcome.</h1>
          <hr/>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu odio ut sem nulla pharetra diam sit amet nisl. Senectus et netus et malesuada fames. Tristique magna sit amet purus gravida. Tempor nec feugiat nisl pretium fusce id velit ut. At augue eget arcu dictum varius duis at consectetur. Diam vulputate ut pharetra sit amet aliquam id. Tellus pellentesque eu tincidunt tortor aliquam. Nullam vehicula ipsum a arcu cursus. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Augue ut lectus arcu bibendum at varius. Enim diam vulputate ut pharetra sit amet. Sit amet nulla facilisi morbi tempus iaculis. Aenean euismod elementum nisi quis eleifend quam adipiscing. Dui ut ornare lectus sit amet est placerat.

          Tortor pretium viverra suspendisse potenti nullam ac tortor. Proin nibh nisl condimentum id. Nisl vel pretium lectus quam id leo in vitae turpis. Porta lorem mollis aliquam ut porttitor leo a diam. Fermentum odio eu feugiat pretium nibh. Sed libero enim sed faucibus. Lectus mauris ultrices eros in. Donec ac odio tempor orci dapibus ultrices in. Arcu cursus vitae congue mauris rhoncus aenean. Odio morbi quis commodo odio aenean sed adipiscing diam. Nisi quis eleifend quam adipiscing vitae proin. Elementum sagittis vitae et leo duis ut diam.
          </p>

        </div>
        <Canvas style={{position: 'absolute', top: '0', left: '0', zIndex: '-1'}} camera={{ position: [0, 0, -30] }}>
          <Sphere />
          <EffectComposer>
            <DepthOfField focusDistance={12} focalLength={0.02} bokehScale={2.5} height={480} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}

export default Home
