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

    // adding a rounded border with a background color
    // span will keep the text inline
    const styledTags = (
        <span style={{ border: '5px solid #AAAAAA', backgroundColor: '#AAAAAA', borderRadius: '25px' }}>
            {tagDisplay}
        </span>
    );
    
    return (
        // /posts (slash at the front) for absolute path
        <Link href={`/posts/${fileName}`}>
            <Card>
                <div style={{height: '8rem', overflow: 'hidden',}}>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {description}
                        </Card.Text>
                    </Card.Body>
                </div>
                <div style={{height:'2.5rem'}}>
                    <Card.Footer>
                        {date} · {styledTags}
                    </Card.Footer>
                </div>
            </Card>
        </Link>
    );
}

export default PostCard;