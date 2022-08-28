
// page to display posts using boostrap's cards components
// using getStaticProps to get all mdx files from posts/ directory

import { Metadata } from '../types/metadata';
import Link from 'next/link'
import Card from 'react-bootstrap/Card';
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
            {/* putting rows into a container with margin */}
            <Container style={{ margin: '2rem' }}>
                <Row xs={'auto'}>
                    {listItems}
                </Row>
            </Container>
        </div>
    );
}

export default Posts