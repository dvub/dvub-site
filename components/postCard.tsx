import Link from "next/link";
import { FC } from "react";
import { Card } from "react-bootstrap";
import { Metadata } from "../types/metadata";


interface Props {
    meta: Metadata;
}

const PostCard: FC<Props> = (props) => {


    const { title, description, date, tags, fileName } = props.meta;

    const tagDisplay = tags ? tags.join(', ') : '';

    // adding a rounded border with a background color
    // span will keep the text inline
    const styledTags = (
        <span style={{ border: '5px solid #AAAAAA', backgroundColor: '#AAAAAA', borderRadius: '25px' }}>
            {tagDisplay}
        </span>
    );

    return (
        <Link href={`posts/${fileName}`}>
            <Card style={{ width: '18rem', height: '14rem', overflow: 'hidden' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {date} · {styledTags}
                </Card.Footer>
            </Card>
        </Link>
    );
}

export default PostCard;