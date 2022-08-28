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

    const sideMargin = '12rem';
    const bodyStyle: CSS.Properties = {
        textAlign: 'left',
        marginLeft: sideMargin,
        marginRight: sideMargin,
        marginTop: '2rem',
    }

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
                <header style={bodyStyle}>
                    <h1>{title}</h1>
                    <a href={authorLink}>{author}</a> · {date} · {tagDisplay}
                    <br /><br />
                    {description}
                </header>

                {/* props.children will render the standard md content*/}
                <div style={bodyStyle}>
                    {children}
                </div>

                {/*footer goes here */}
                <footer>
                    <Container style={{ margin: '2rem' }}>
                        <Row xs={'auto'}>
                            {listItems}
                        </Row>
                    </Container>
                </footer>
            </div>
        </div>
    );
}

export default Layout