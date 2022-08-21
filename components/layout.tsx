import CSS from 'csstype'
import React, { ReactNode, FC } from 'react';
import type { Metadata } from '../types/metada'



interface Props {
    children: ReactNode;
    meta: Metadata;
}
const Layout: FC<Props> = (props) => {

    const { children, meta } = props;
    const { title, author, date, authorLink } = meta;

    return (
        <div style={{textAlign: 'center'}}>
            {/* title, author, date, etc */}
            <header>
                <h1>{title}</h1>
                By: <a href={authorLink}>{author}</a>
                <br/>
                Date: {date}
            </header>

            {/* props.children will render the standard md content*/}
            <div style={{display: 'inline-block',textAlign: 'left'}}>
                {children}    
            </div>

            {/*footer goes here */}
            <footer>

            </footer>
        </div>
    );
}

export default Layout