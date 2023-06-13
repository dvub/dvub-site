// page to display posts using boostrap's cards components
// using getStaticProps to get all mdx files from posts/ directory

import { Metadata } from '../types/metadata';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Head from 'next/head';
import Loading from '../components/Loading';
// <-----------------------> //

const Posts = () => {

    // https://nextjs.org/docs/basic-features/data-fetching/client-side

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
    const listItems = isLoading ? <Loading/> : metas.map((d, i) => {
        return (
            <Col key={i} className='animate' style={{ animationDelay: `${(i * 0.125) + 0.375}s`, marginTop: '1rem' }}>
                <PostCard meta={d} />
            </Col>
        );
    });
    // placeholder grid items for testing style, animtions, etc
    /*
    const listItems = new Array(9).fill(null!).map((d, i) => {
        return (
            <Col key={i} className='animate' style={{animationDelay: `${i * 0.125}s`}}>
                <PostCard meta={{title: 'Placeholder'}}/>
            </Col>
        );
    });
    */
    return (
        <div>
            <Head>
                <title>Posts</title>
            </Head>
            <h1 className='animate'>
                Posts
            </h1>
            <div className='animate' style={{ animationDelay: '0.125s' }}>
                <p style={{ maxWidth: '40rem' }}>
                    Here you can find posts about <b>projects</b> that I&apos;ve worked on or am currently working on. These posts serve as means for me to <b>document and share my progress</b> as a developer.
                </p>
            </div>
            <hr className='animate' style={{ animationDelay: '0.25s' }} />
            {/* putting rows into a container with margin */}
            <div>
                <Container>
                    <Row xs={1} md={2} lg={2} xl={3}>
                        {listItems}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Posts