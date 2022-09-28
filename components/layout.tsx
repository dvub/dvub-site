import CSS from 'csstype'
import React, { ReactNode, FC, useState, useEffect } from 'react'
import type { Metadata } from '../types/metadata'
import Link from 'next/link'
import Head from 'next/head'
import { Col, Container, Row } from 'react-bootstrap'
import PostCard from './postCard'


interface Props {
    children: ReactNode;
    meta: Metadata;
}

const Layout: FC<Props> = (props) => {

    const { children, meta } = props;
    const { title, author, date, authorLink, description, tags } = meta;


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
    }, []);

    const listItems = isLoading ? 'Loading' : metas.map((d) => {

        const { title } = d;

        return (
            <Col key={title}>
                <PostCard meta={d}></PostCard>
            </Col>
        );
    });

    const tagDisplay = tags ? tags.join(', ') : '';

    return (
        <div>

            <Head>
                <title>{title}</title>
                <link rel="stylesheet" href="https://unpkg.com/dracula-prism/dist/css/dracula-prism.css" />
            </Head>

            <div>

                {/* title, author, date, etc */}
                <header>
                    <h1>{title}</h1>
                    <a href={authorLink}>{author}</a> · {date} · {tagDisplay}
                    <br /><br />
                    {description}
                </header>
                <hr />

                {/* props.children will render the standard md content*/}
                <div>
                    {children}
                </div>
                <hr />
                {/*footer goes here */}
                <footer>

                    <div>
                        <h2>Other Posts</h2>
                        Placeholder text goes here
                    </div>
                    <Container style={{ marginTop: '2rem' }}>
                        <Row xs={1} md={2} lg={2} xl={3}>
                            {listItems}
                        </Row>
                    </Container>
                    Maybe put a link here for all posts, idk
                </footer>

            </div>
        </div>
    );
}

export default Layout