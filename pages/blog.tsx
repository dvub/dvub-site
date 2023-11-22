// page to display posts using boostrap's cards components
// using getStaticProps to get all mdx files from posts/ directory

import Metadata from '../types/metadata';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Head from 'next/head';
import Loading from '../components/directory/Loading';
// <-----------------------> //
export const getStaticProps = async (context: any) => {
	const endpoint = process.env.META_ENDPOINT;

	const result = await fetch(`${endpoint}/api/metas`);
	let metas = await result.json();
	return {
		props: {
			metas: metas,
		},
	};
};

export default function Posts(props: { metas: Metadata[] }) {
	// https://nextjs.org/docs/basic-features/data-fetching/client-side

	const listItems = props.metas.map((d: Metadata, i: number) => {
		return (
			<Col
				key={i}
				className='animate'
				style={{ animationDelay: `${i * 0.125 + 0.375}s` }}
			>
				<PostCard meta={d} />
			</Col>
		);
	});
	// placeholder grid items for testing style, animtions, etc
	/*
    const listItems = new Array(9).fill(null!).map((d, i) => {
        return (
            <Col key={i} className='animate' style={{animationDelay: `${i * 0.125}s`}}>
                <PostCard meta={{title: 'Placeholder'}}/>
            </Col>
        );
    });
    */
	return (
		<div>
			<Head>
				<title>Blog | Dvub</title>
				<meta
					name='description'
					content='Check out some of my blogs! I write about tech, coding, and life, and basically anything that interests me.'
				/>
				<meta name='author' content='dvub' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
			</Head>
			<h1 className='animate'>Blog</h1>
			<div className='animate' style={{ animationDelay: '0.125s' }}>
				<p style={{ maxWidth: '40rem' }}>
					Here you can find posts about <b>projects</b> that I&apos;ve
					worked on or am currently working on. These posts serve as
					means for me to <b>document and share my progress</b> as a
					developer.
				</p>
			</div>
			<hr className='animate' style={{ animationDelay: '0.25s' }} />
			{/* putting rows into a container with margin */}
			<div>
				<Container>
					<Row xs={1} md={2} lg={2} xl={3}>
						{listItems}
					</Row>
				</Container>
			</div>
		</div>
	);
}
