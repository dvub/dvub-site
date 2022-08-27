
// page to display posts using boostrap's cards components
// using getStaticProps to get all mdx files from posts/ directory

import { Metadata } from '../types/metadata';
import Link from 'next/link'
import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

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
        // destructuring
        const { title, description, date, tags, fileName } = d;

        const tagDisplay = tags ? tags.join(', ') : '';

        // adding a rounded border with a background color
        // span will keep the text inline
        const styledTags = (
            <span style={{ border: '5px solid #AAAAAA', backgroundColor: '#AAAAAA', borderRadius: '25px' }}>
                {tagDisplay}
            </span>
        );

        return (
            <Col key={title}>
                <Link href={`posts/${fileName}`}>
                    <Card style={{ width: '18rem', height: '14rem', overflow: 'hidden' }}>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>
                                {description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            {date} · {styledTags}
                        </Card.Footer>
                    </Card>
                </Link>
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