import CSS from 'csstype'
import React, { ReactNode, FC } from 'react'
import type { Metadata } from '../types/metada'
import Link from 'next/link'
import Head from 'next/head'

interface Props {
    children: ReactNode;
    meta: Metadata;
}
const Layout: FC<Props> = (props) => {

    const { children, meta } = props;
    const { title, author, date, authorLink, description } = meta;



    const sideMargin = '12rem';
    const bodyStyle: CSS.Properties = {
        textAlign: 'left',
        marginLeft: sideMargin,
        marginRight: sideMargin,
        marginTop: '2rem',
    }
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="stylesheet" href="https://unpkg.com/dracula-prism/dist/css/dracula-prism.css" />
            </Head>

            <div>
                {/* title, author, date, etc */}
                <header style={bodyStyle}>
                    <h1>{title}</h1>
                    By: <a href={authorLink}>{author}</a>
                    <br />
                    Date: {date}
                    <br/>
                    {description}
                </header>

                {/* props.children will render the standard md content*/}
                <div style={bodyStyle}>

                    <Link href='../posts'>Back to posts</Link>

                    {children}
                </div>

                {/*footer goes here */}
                <footer>

                </footer>
            </div>
        </>
    );
}

export default Layout