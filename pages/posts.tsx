import fs from 'fs'
import { FC } from 'react'
import { Metadata } from '../types/metada';
import Navbar from '../components/navbar'
import Link from 'next/link'

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


interface PostInfo {
    metadata: Metadata;
    fileName: string;
}

interface Props {
    PostInfos: Array<PostInfo>
}

const Posts: FC<Props> = (props) => {
    
    const postInfos = props.PostInfos;

    const listItems = postInfos.map((d) => {

        const { title, description, date } = d.metadata;

        return (
            <Link key={title} href={`posts/${d.fileName}`}>
                <li>
                    <h2>{title}</h2>
                    {description}<br/>
                    {date}
                </li>
            </Link>
        );
    });
    return (
        <div>
            <Navbar></Navbar>
            <h1>Posts</h1>
            <ul>
                {listItems}
            </ul>
        </div>
    );
}

export default Posts