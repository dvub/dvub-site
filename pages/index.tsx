import type { NextPage } from 'next'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CSS from 'csstype'
import Sphere from '../components/sphere'
import { EffectComposer, Vignette, DepthOfField } from '@react-three/postprocessing'
import { Container, Col, Row } from 'react-bootstrap'

// todo: absolute position of sphere on right side of screen
// fix camera positioning on thinner views (super weird)

const Home: NextPage = () => {
  return (
    <div>
      <div>
        <Container>
          <Row>
          <Col>
            <div>
              <h1>I&#39;m dvub, a</h1>
              <h1 className='mono'>
                  new developer();
                </h1>
              <h1>Welcome.</h1>
              <hr />
              <p>
                I&#39;m a student who enjoys building projects and just making cool stuff. I also love opportunities to learn new and interesting things. One day I hope to be a professional developer and make an impact in the world using technology.
              </p>
            </div>
          </Col>
          <Col>
            <Canvas camera={{ position: [-35, 0, 0]}}>
              <Sphere />
            </Canvas>
          </Col>
          </Row>
        </Container>


      </div>
    </div>
  );
}

export default Home
