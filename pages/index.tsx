/* eslint-disable react/no-unknown-property */
import type { NextPage } from 'next'
import { Canvas, RootState, useFrame } from '@react-three/fiber'
import Sphere from '../components/sphere'
import { Container, Col, Row } from 'react-bootstrap'
import Head from 'next/head'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import { Metadata } from '../types/metadata'
import useMouse from '@react-hook/mouse-position'
import { Clock } from 'three'
// todos: 
// work on readme

const Display = (props: {
  title: string,
  mouse: {
    x: number | null,
    y: number | null
  }
}) => {
  /*
  return (
    <div className='border' style={{ position: 'absolute', left: props.mouse.x+'px', top: props.mouse.y+'px' }}>
      <p>{props.title}</p>
    </div>
  );
  */

}
const FrameLimiter = (props: {fps: number}) => {
  const [clock] = useState(new Clock());

  useFrame((state: RootState) => {
    state.ready = false;
    const timeUntilNextFrame = (1000 / props.fps) - clock.getDelta();

    setTimeout(() => {
      state.ready = true;
      state.invalidate();
    }, Math.max(0, timeUntilNextFrame));

  });
  return <></>;
};
const Home: NextPage = () => {
  const ref = useRef(null)
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
    fps: 30,
  })

  // use state here to display title and other information about a post that the user is hovering over
  const [postInfo, setPostInfo] = useState('');

  // api call to get metadatas for posts
  const [metas, setMetas] = useState<Metadata[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/metas')
      .then((res) => res.json())
      .then((data) => {
        setMetas(data);
        setLoading(false);
      });
  }, []
  );
  return (
    <div ref={ref}>
      <Head>
        <title>dvub</title>
      </Head>
      <div>
        <Container>
          <Row xs={1} md={2}>
            <Col>
              <div>
                <h1 className='animate'>I&#39;m dvub, a</h1>
                <h1 className='mono animate' style={{ animationDelay: '0.125s', maxWidth: '100%' }}>
                  new developer();
                </h1>
                <h1 style={{ animationDelay: '0.25s' }} className='animate'>Welcome.</h1>
                <hr style={{ animationDelay: '0.375s' }} className='animate' />
                <div className='animate' style={{ animationDelay: '0.5s', maxWidth: '100%' }}>
                  <p>
                    I&#39;m a student who enjoys building projects and just <b>making cool stuff</b>. I also love <b>opportunities to learn</b> new and interesting things. One day I hope to be a <b>professional developer</b> and make an <b>impact on the world</b> using technology.
                    <br />
                    If you want to read about some of my projects, you can look <a href='posts'>here.</a>
                  </p>
                </div>
              </div>
            </Col>
            {!isLoading &&
              <Col>
                <Display title={postInfo} mouse={mouse} />
                <div style={{ textAlign: 'center', animationDelay: '0.75s' }} className='animate'>

                  <Canvas
                    camera={{ position: [-35, 0, 0] }}
                    style={{ height: '25rem' }}
                  >
                    <FrameLimiter />
                    <OrbitControls />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Sphere handleOnPointerOver={setPostInfo} metas={metas} />
                  </Canvas>
                  <p>(FIX THE TEXT HERE)</p>
                </div>
              </Col>
            }
            {isLoading &&
              <p>Loading</p>
            }
          </Row>
        </Container>


      </div>
    </div>
  );
}

export default Home
