import CSS from 'csstype'

interface Props {
    children: string; // this might be wrong ...?
    meta: Meta;
}
interface Meta {
    title: string;
    author: string;
    authorLink: string;
    date: string;
}
const Layout = (props: Props) => {

    const style: CSS.Properties = {
        textAlign: 'center',
    }

    return (
        <div>
            {/* title, author, date, etc */}
            <header style={style}>
                <h1>{props.meta.title}</h1>
                By: <a href="https://github.com/dvub">{props.meta.author}</a>
                <br/>
                Date: {props.meta.date}
            </header>

            {/* props.children will render the standard md content*/}
            <div>
                {props.children}    
            </div>

            {/*footer goes here */}

            <footer>

                <a href="#top">back to top</a>
            </footer>
        </div>
    );
}

export default Layout