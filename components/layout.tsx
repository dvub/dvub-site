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
    const { title, author, date, authorLink } = meta;


    const bodyStyle: CSS.Properties = {
        textAlign: 'left',
    }
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="stylesheet" href="https://unpkg.com/dracula-prism/dist/css/dracula-prism.css"/>
            </Head>

            <div> 
                {/* title, author, date, etc */}
                <header style={{textAlign: 'center'}}>
                    <h1>{title}</h1>
                    By: <a href={authorLink}>{author}</a>
                    <br/>
                    Date: {date}
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