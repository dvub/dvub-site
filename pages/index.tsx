/* eslint-disable react/no-unknown-property */
import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import Sphere from '../components/sphere'
import { Container, Col, Row } from 'react-bootstrap'
import Head from 'next/head'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { Metadata } from '../types/metadata'
// todos: 
// work on readme

const Home: NextPage = () => {

  const [title, setTitle] = useState('');
  const [metas, setMetas] = useState<Metadata[]>([]);
  const [isLoading, setLoading] = useState(false);

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
    <div >
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
            <Col>
              <p>{title}</p>
              <div style={{ textAlign: 'center', animationDelay: '0.75s' }} className='animate'>

                <Canvas
                  className='border'
                  camera={{ position: [-35, 0, 0] }}
                  style={{ height: '25rem' }}
                >
                  <OrbitControls />
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  <Sphere handleOnPointerOver={setTitle} metas={metas}/>
                </Canvas>
                <p>(hover over me)</p>
              </div>
            </Col>
          </Row>
        </Container>


      </div>
    </div>
  );
}

export default Home
