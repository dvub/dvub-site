import fs from 'fs'
import { FC } from 'react'
import { Metadata } from '../types/metada';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
            <Link href={`posts/${d.fileName}`} key={title}>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle>{date}</Card.Subtitle> 
                        <Card.Text>
                            {description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        );
    });
    return (
        <div>
            <ul>
                {listItems}
            </ul>
        </div>
    );
}

export default Posts