
// page to display posts using boostrap's cards components
// using getStaticProps to get all mdx files from posts/ directory

import { Metadata } from '../types/metadata';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PostCard from '../components/postCard'
// <-----------------------> //

const Posts = () => {

    // https://nextjs.org/docs/basic-features/data-fetching/client-side

    const offset = 0.5;

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

    const listItems = isLoading ? '' : metas.map((d, i) => {
        return (
            <Col key={i} className='animate' style={{ animationDelay: `${(i * 0.125) + 1.5}s` }}>
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
            <h1 className='animate'>
                Posts
            </h1>
            <div className='animate' style={{ animationDelay: '0.5s' }}>
                <p style={{ maxWidth: '40rem' }}>
                    Here you can find posts about <b>projects</b> that I&apos;ve worked on or am currently working on. These posts serve as means for me to <b>document and share my progress</b> as a developer.
                </p>
            </div>
            <hr />
            {/* putting rows into a container with margin */}
            <div style={{ margin: '1rem' }}>
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