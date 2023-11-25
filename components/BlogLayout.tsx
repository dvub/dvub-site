import React, {
	FC,
	FormEventHandler,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import type Metadata from '../types/metadata';
import Head from 'next/head';
import { Col, Container, Row } from 'react-bootstrap';
import PostCard from './PostCard';

import { Comments } from './comments/Comments';
import { CommentForm } from './comments/CommentForm';
import useSWR from 'swr';

// source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array: Metadata[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
}

const BlogLayout = (props: { children: ReactNode; meta: Metadata }) => {
	// source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

	/* Randomize array in-place using Durstenfeld shuffle algorithm */
	function shuffleArray(array: Metadata[]) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}

		return array;
	}

	const { children, meta } = props; // children is the markdown content
	const { title, author, date, authorLink, description, tags, fileName } =
		meta; // metadata of CURRENT post

	const fetcher = (args: string) => fetch(args).then((res) => res.json());
	const {
		data: metas,
		error: isError,
		isLoading,
	} = useSWR(`/api/metas`, fetcher); // swr is fucking epic
	const tagDisplay = tags ? tags.join(', ') : ''; // i forgot why i had to do this tbh

	// this filters and shuffles the array of metadata

	const listItems = isLoading
		? 'Loading'
		: shuffleArray(metas)
				.filter((d: Metadata) => d.fileName !== fileName)
				.slice(0, 3)
				.map((d: Metadata) => {
					const { title } = d;
					// a wrapper div to add some margins
					return <PostCard meta={d} key={title} />;
				});

	const t = `${title} | Blog`; // for some reason, if this is inline in the <title>, it thinks you're rendering multiple titles
	// so fuck that

	return (
		<div style={{ marginBottom: '10rem' }}>
			<Head>
				<title>{t}</title>
				<link
					rel='stylesheet'
					href='https://unpkg.com/dracula-prism/dist/css/dracula-prism.css'
				/>
				<meta name='description' content={description} />
				<meta name='author' content='dvub' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<meta name='keywords' content={tags.join(', ')}></meta>
			</Head>
			{/* the main content of the page is split vertically, with the post on the left and comments/posts on the right */}
			<Container>
				<Row xs={1} md={1} lg={2}>
					<Col>
						<div>
							{/* title, author, date, etc */}
							<header>
								<h1>{title}</h1>
								<a href={authorLink}>{author}</a> · {date} ·{' '}
								{tagDisplay}
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
								<h2>Other Posts</h2>
								<Container>
									<Col>{listItems}</Col>
								</Container>
							</Row>
							<Row>
								<h2>Comments</h2>
								<CommentForm fileName={fileName} />
								<Comments fileName={fileName} />
							</Row>
							<br />
						</Container>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default BlogLayout;
