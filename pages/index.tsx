/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import { Container, Col, Row } from "react-bootstrap";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Metadata } from "../types/metadata";
import Scene from "../components/Scene";
import Loading from "../components/Loading";
import { InfoCircle, Type } from "react-bootstrap-icons";
import { isMobile } from 'react-device-detect';
import { TypeWrite } from "../components/TypeWrite";
const Home: NextPage = () => {

  

  // api call to get metadatas for posts
  const [metas, setMetas] = useState<Metadata[]>([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/metas")
      .then((res) => res.json())
      .then((data) => {
        setMetas(data);
        setLoading(false);
      });
  }, []);



  return (
    <div>
      <Head>
        <title>dvub</title>
      </Head>
      <div>
        <Container>
          <Row xs={1} md={2}>
            <Col>
              <div>
                
                <h1 className="animate">I&#39;m dvub, a</h1>
                <h1
                  className="mono animate"
                  style={{ animationDelay: "0.125s", maxWidth: "100%" }}
                >
                  <TypeWrite text={"new developer();"}/>
                </h1>
                <h1 style={{ animationDelay: "0.25s" }} className="animate">
                  Welcome.
                </h1>
                <hr style={{ animationDelay: "0.375s" }} className="animate" />
                <div
                  className="animate"
                  style={{ animationDelay: "0.5s", maxWidth: "100%" }}
                >
                  <p>
                    I&#39;m a student who enjoys building projects and just{" "}
                    <b>making cool stuff</b>. I also love{" "}
                    <b>opportunities to learn</b> new and interesting things.
                    One day I hope to be a <b>professional developer</b> and
                    make an <b>impact on the world</b> using technology.
                    <br />
                    If you want to read about some of my projects, you can look{" "}
                    <a href="posts">here.</a>
                  </p>
                </div>
              </div>
            </Col>
            {!isMobile && !isLoading && (
              <Col style={{ animationDelay: "0.75s"}} className="animate">
                <div 
                  style={
                    {borderRadius: '10px', 
                    border: '2px solid white', 
                    boxShadow: '5px 5px 10px rgba(0,0,0,0.5)'}
                  }>
                  <Scene metas={metas} fps={1000} />
                </div>

                <hr />
                <div>
                  <h1 className="mono">directory.get();</h1>
                  <InfoCircle />
                  <p>
                    Welcome to the directory!
                    Here, you can view posts in an interactive 3D space!
                    You can navigate the directory by clicking and dragging with the mouse!
                    You can hover each node to view the title of the post and click on a node to visit that post.

                  </p>
                </div>
              </Col>
            )}
            {isMobile && (
              <Col style={{ animationDelay: "0.75s" }} className="animate">
                It looks like you&apos;re viewing this page on a mobile device. Some features of this page are <b>not intended</b> for mobile users and as such, <b>will not function properly</b>.
                For the full experience, please visit this page on a desktop or laptop browser.
                <br />
                <em>~the website wizard</em>
              </Col>
            )}
            {isLoading && !isMobile && <Loading/>}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
