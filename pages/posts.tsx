
// page to display posts using boostrap's cards components
// using getStaticProps to get all mdx files from posts/ directory

import fs from 'fs'
import { FC } from 'react'
import { Metadata } from '../types/metada';
import Link from 'next/link'
import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from 'react-bootstrap';

// <-----------------------> //

/*
* getStaticProps() to get metadata of posts
* code adapted from: 
* https://github.com/mdx-js/mdx/discussions/1351#:~:text=export%20async%20function%20articlesWithMetadata,()%3B%0A%7D
*/
export async function getStaticProps() {

    const postInfos: Array<PostInfo> = [];
    const postFiles = fs.readdirSync('./pages/posts/');

    for (let post of postFiles) {
        try {

            const fileName = post.substring(0, post.length - 4);
            const { meta } = await import(`./posts/${post}`); // dynamic imports

            postInfos.push({ metadata: meta, fileName: fileName });

        } catch (error) {
            console.log(error);
        }
    }
    return {
        props: {
            PostInfos: postInfos
        },
    }
}

// <-----------------------> //

const Posts: FC<Props> = (props) => {

    const postInfos = props.PostInfos;

    const listItems = postInfos.map((d) => {


        // destructuring
        const { title, description, date, tags } = d.metadata;

        // if tags is still fetching when we call .join(), it will be undefined, thus not working

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
                <Link href={`posts/${d.fileName}`}>
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

interface PostInfo {
    metadata: Metadata;
    fileName: string;
}

interface Props {
    PostInfos: Array<PostInfo>
}

export default Posts