import React, { ReactNode, FC, useState, useEffect } from 'react'
import type { Metadata } from '../types/metadata'
import Head from 'next/head'
import { Col } from 'react-bootstrap'
import PostCard from './PostCard'

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
        <div style={{ maxWidth: '40rem', marginBottom: '10rem' }}>

            <Head>
                <title>{title}</title>
                <link rel="stylesheet" href="https://unpkg.com/dracula-prism/dist/css/dracula-prism.css" />
            </Head>

            <div>
                {/* title, author, date, etc */}
                <header>
                    <h1>{title}</h1>
                    <a href={authorLink}>{author}</a> · {date} · {tagDisplay}
                    <br />
                    <i>{description}</i>
                </header>
                <hr />
                {/* props.children will render the standard md content*/}
                <div>
                    {children}
                </div>
                thanks for reading,
                <br />
                <i>~dvub</i>
                <hr />
            </div>
        </div>
    );
}

export default Layout