import type { NextPage } from 'next'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CSS from 'csstype'
import Sphere from '../components/sphere'
import { EffectComposer, Vignette, DepthOfField } from '@react-three/postprocessing'
import { Container, Col, Row } from 'react-bootstrap'

// todo: absolute position of sphere on right side of screen
// fix camera positioning on thinner views (super weird)

// work on readme

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
                I&#39;m a student who enjoys building projects and just <b>making cool stuff</b>. 
                I also love <b>opportunities to learn</b> new and interesting things. 
                One day I hope to be a <b>professional developer</b> and make an <b>impact on the world</b> using technology.
                <br/>
                If you want to read about some of my projects, you can look <a href='posts'>here.</a>
              </p>
            </div>
          </Col>
          <Col >
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
