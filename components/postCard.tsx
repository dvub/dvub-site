import Link from "next/link";
import { FC } from "react";
import { Card } from "react-bootstrap";
import { Metadata } from "../types/metadata";
import CSS from 'csstype'

interface Props {
    meta: Metadata;
}

const PostCard: FC<Props> = (props) => {


    const { title, description, date, tags, fileName } = props.meta;

    let tagDisplay = tags ? tags.join(', ') : '';
    const styledTags = (
        <span style={{ border: '4px solid #DADADA', backgroundColor: '#DADADA', borderRadius: '5px' }}>
            {tagDisplay}
        </span>
    );

    return (
        // /posts (slash at the front) for absolute path
        <Link href={`/posts/${fileName}`}>
            <Card style={{ border: 'transparent' }}>
                <div style={{ height: '10rem', overflow: 'hidden', }}>
                    <Card.Body>
                        <Card.Title className='mono'><h4><b>{title}</b></h4></Card.Title>
                        <Card.Text style={{ fontSize: '14px' }}>
                            {description}
                        </Card.Text>
                    </Card.Body>
                </div>
                <div style={{ height: '4rem' }}>
                    <Card.Footer style={{ backgroundColor: 'transparent', border: 'transparent', fontSize: '15px' }}>
                        {date} · {styledTags}
                    </Card.Footer>
                </div>
            </Card>
        </Link>
    );
}

export default PostCard;