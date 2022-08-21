import type { NextPage } from 'next'
import fs from 'fs'
import { FC } from 'react'
import { Metadata } from '../types/metada';

/*
* getStaticProps() to get metadata of posts
* code adapted from: 
* https://github.com/mdx-js/mdx/discussions/1351#:~:text=export%20async%20function%20articlesWithMetadata,()%3B%0A%7D
*/
export async function getStaticProps() {

    const metas = [];
    const postFiles = fs.readdirSync('./pages/posts/');
    for (let post of postFiles) {
        try {
            const { meta } = await import(`./posts/${post}`); // dynamic imports
            metas.push(meta);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        props: {
            metas: metas
        },
    }
}

interface Props {
    metas: Array<Metadata>,
}

const Posts: FC<Props> = (props) => {
    
    const metadatas = props.metas;
    const listItems = metadatas.map((d) => {
        return <li key={d.title}>
            {d.title}
        </li>
    });
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {listItems}
            </ul>
        </div>
    );
}

export default Posts