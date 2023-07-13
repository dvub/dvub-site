import React, {
  FC,
  FormEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import type { Metadata } from "../types/metadata";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import PostCard from "./PostCard";
import { useMetas } from "../utils/metas";
import { Comments } from "./Comments";
import { CommentForm } from "./CommentForm";

const Layout = (props: { children: ReactNode; meta: Metadata }) => {
  const { children, meta } = props; // children is the markdown content
  const { title, author, date, authorLink, description, tags, fileName } = meta; // metadata of post

  const { metas, isError, isLoading } = useMetas(); // swr is fucking epic
  const tagDisplay = tags ? tags.join(", ") : ""; // i forgot why i had to do this tbh
  const listItems = isLoading
    ? "Loading"
    : metas.map((d: Metadata) => {
        const { title } = d;
        // a wrapper div to add some margins
        return <PostCard meta={d} key={title} />;
      });

  const t = `${title} | Blog`; // for some reason, if this is inline in the <title>, it thinks you're rendering multiple titles
  // so fuck that

  return (
    <div style={{ marginBottom: "10rem" }}>
      <Head>
        <title>{t}</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/dracula-prism/dist/css/dracula-prism.css"
        />
        <meta name="description" content={description} />
        <meta name="author" content="dvub" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={tags.join(", ")}></meta>
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
              <div>{children}</div>
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
                <h2>Comments</h2>
                <CommentForm fileName={fileName} />
                <Comments fileName={fileName} />
              </Row>
              <br />
              <Row>
                <h2>Other Posts</h2>
                <Container>
                  <Col>{listItems}</Col>
                </Container>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
