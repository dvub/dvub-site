
// page to display posts using boostrap's cards components
// using getStaticProps to get all mdx files from posts/ directory

import { Metadata } from '../types/metadata';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PostCard  from '../components/postCard'
// <-----------------------> //

const Posts = () => {

    // https://nextjs.org/docs/basic-features/data-fetching/client-side

    const [metas, setMetas] = useState<Metadata[]>([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/metas')
          .then((res) => res.json())
          .then((data) => {
            setMetas(data)
            setLoading(false)
          })
      }, [])

    const listItems = isLoading ? 'Loading': metas.map((d) => {


        const { title } = d;

        return (
            <Col key={title}>
                <PostCard meta={d}></PostCard>
            </Col>
        );
    });

    return (
        <div>
            <div>
                <h1>Posts</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor aliquam nulla facilisi cras fermentum odio.
                </p>
            </div>
            <hr/>
            {/* putting rows into a container with margin */}
            <div style={{margin: '1rem'}}>
                <Container>
                    <Row xs={1} md={2} lg={2} xl={3}>
                        {listItems}
                    </Row>
                </Container>
            </div>
            <hr/>
        </div>
    );
}

export default Posts