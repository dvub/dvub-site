import type { NextPage } from 'next'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CSS from 'csstype'
import Sphere from '../components/sphere'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

const Home: NextPage = () => {
  const canvasStyle: CSS.Properties = {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '0',
  }
  return (
    <div>
      <div>
        <div style={{ marginTop: '10rem', zIndex: '1' }}>
          <h1 style={{
            animation: 'fadein 2s',
            backgroundColor: 'transparent',
          }}>Welcome</h1>
          <p style={{ backgroundColor: 'transparent', animation: 'fadein 2s' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor condimentum lacinia quis vel eros donec. Pellentesque diam volutpat commodo sed egestas egestas. Cursus vitae congue mauris rhoncus aenean vel. Dictum at tempor commodo ullamcorper a lacus vestibulum. Nec feugiat in fermentum posuere urna nec tincidunt. Accumsan in nisl nisi scelerisque. Hendrerit gravida rutrum quisque non tellus orci ac auctor augue. Auctor eu augue ut lectus. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Pellentesque id nibh tortor id aliquet lectus proin. Et molestie ac feugiat sed lectus vestibulum. Interdum velit laoreet id donec. Ipsum dolor sit amet consectetur adipiscing elit. Lectus magna fringilla urna porttitor rhoncus dolor purus non.
            Erat nam at lectus urna duis. At urna condimentum mattis pellentesque id. Cursus euismod quis viverra nibh cras. Auctor augue mauris augue neque gravida in fermentum. Augue lacus viverra vitae congue eu. At elementum eu facilisis sed odio morbi. Laoreet id donec ultrices tincidunt. Laoreet sit amet cursus sit amet dictum sit amet justo. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. In aliquam sem fringilla ut morbi tincidunt augue interdum. Purus non enim praesent elementum facilisis leo. Pharetra convallis posuere morbi leo urna. Tortor pretium viverra suspendisse potenti nullam ac tortor. Quam viverra orci sagittis eu. Justo nec ultrices dui sapien eget.
          </p>
        </div>
        <Canvas style={canvasStyle} camera={{ position: [0, 0, -40] }}>
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
