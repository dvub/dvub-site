import React, { FC, ReactNode, useEffect, useState } from "react";
import type { Metadata } from "../types/metadata";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import PostCard from "./PostCard";

interface Props {
  children: ReactNode;
  meta: Metadata;
}

const Layout: FC<Props> = (props) => {
  const { children, meta } = props;
  const { title, author, date, authorLink, description, tags } = meta; // metadata of post
  const postCount = 3; // the number of posts to display on the sidebar
  const [metas, setMetas] = useState<Metadata[]>([]);
  const [isLoading, setLoading] = useState(false); // set loading text for fetching data -- in this case, posts
  const [commentState, setCommentState] = useState({
    name: "",
    comment: "",
  });
  const onFormUpdate = (e: React.FormEvent<HTMLInputElement>) => {
    setCommentState({
      ...commentState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const onFormSubmit = () => {
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/metas")
      .then((res) => res.json())
      .then((data) => {
        setMetas(data.slice(0, postCount)); // here, we use slice() to limit the number of posts displayed
        setLoading(false);
      });
  }, []);
  const tagDisplay = tags ? tags.join(", ") : ""; // i forgot why i had to do this tbh

  const listItems = isLoading ? "Loading" : metas.map((d) => {
    const { title } = d;
    // a wrapper div to add some margins
    return (
      <div style={{ margin: "1rem" }}>
        <PostCard meta={d} key={title} />
      </div>
    );
  });

  return (
    <div style={{ marginBottom: "10rem" }}>
      <Head>
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/dracula-prism/dist/css/dracula-prism.css"
        />
      </Head>
      {/* the main content of the page is split vertically, with the post on the left and comments/posts on the right */}
      <Container>
        <Row xs={1} md={1} lg={2}>
          <Col>
            <div>
              {/* title, author, date, etc */}
              <header>
                <h1>{title}</h1>
                <a href={authorLink}>{author}</a> · {date} · {tagDisplay}
                <br />

                <i>{description}</i>
              </header>
              <hr />
              {/* props.children will render the standard md content*/}
              <div>
                {children}
              </div>
              thanks for reading,
              <br />
              <i>~dvub</i>
              <hr />
            </div>
          </Col>
          <Col>
            {/* this is another container to split the comments and posts horizontally */}
            <Container>
              <Row>
                <h2>Other Posts</h2>
                <Container>
                  <Col>
                    {listItems}
                  </Col>
                </Container>
              </Row>
              <Row>
                <h2>Comments</h2>
                <form>
                  <p>
                    Write your own... NOTE: Comments are actively moderated.
                  </p>
                  <label>Your Name</label>
                  <br />
                  <input
                    type="text"
                    required
                    name="name"
                    id="name"
                    value={commentState.name}
                    placeholder="..."
                    onChange={onFormUpdate}
                    maxLength={30}
                  >
                  </input>
                  <br />
                  <label>Comment</label>
                  <br />
                  <input
                    type="text"
                    required
                    name="comment"
                    id="comment"
                    placeholder="..."
                    value={commentState.comment}
                    onChange={onFormUpdate}
                    maxLength={200}
                    style={{
                      minWidth: "100%",
                      minHeight: "10rem",
                    }}
                  >
                  </input>
                </form>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
