import { Container, Col, Row } from 'react-bootstrap';
import Head from 'next/head';
import Scene from '../components/directory/Scene';
import { InfoCircle, Type } from 'react-bootstrap-icons';
import { isMobile } from 'react-device-detect';
import { TypeWrite } from '../components/TypeWrite';
import Metadata from '../types/metadata';

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

export default function Home(props: { metas: Metadata[] }) {
	return (
		<div>
			<Head>
				<title>Home | Dvub</title>
				<meta
					name='description'
					content="I'm dvub, and this is my site. Welcome! Look around, relax and learn something new!"
				/>
				<meta name='author' content='dvub' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
			</Head>
			<div>
				<Container>
					<Row xs={1} md={2}>
						<Col>
							<div>
								<h1 className='animate'>I&#39;m dvub, a</h1>
								<h1
									className='mono animate'
									style={{
										animationDelay: '0.125s',
										maxWidth: '100%',
									}}
								>
									<TypeWrite text={'new developer();'} />
								</h1>
								<h1
									style={{ animationDelay: '0.25s' }}
									className='animate'
								>
									Welcome.
								</h1>
								<hr
									style={{ animationDelay: '0.375s' }}
									className='animate'
								/>
								<div
									className='animate'
									style={{
										animationDelay: '0.5s',
										maxWidth: '100%',
									}}
								>
									<p className='border'>
										I&#39;m a student who enjoys building
										projects and just{' '}
										<b>making cool stuff</b>. I also love{' '}
										<b>opportunities to learn</b> new and
										interesting things. One day I hope to be
										a <b>professional developer</b> and make
										an <b>impact on the world</b> using
										technology.
										<br />
										If you want to read about some of my
										projects, you can look{' '}
										<a href='blog'>here.</a>
									</p>
								</div>
							</div>
						</Col>

						<Col
							style={{ animationDelay: '0.75s' }}
							className='animate'
						>
							<div>
								<div
									style={{
										borderRadius: '10px',
										border: '2px solid white',
										boxShadow:
											'5px 5px 10px rgba(0,0,0,0.5)',
									}}
								>
									<Scene metas={props.metas} fps={1000} />
								</div>
								<hr />
								<div className='border'>
									<h1 className='mono'>directory.get();</h1>

									<p>
										<InfoCircle /> Welcome to the directory!
										Here, you can view posts in an
										interactive 3D space! You can navigate
										the directory by clicking and dragging
										with the mouse! You can hover each node
										to view the title of the post and click
										on a node to visit that post.
									</p>
								</div>
							</div>
						</Col>

						{isMobile && (
							<Col
								style={{ animationDelay: '0.75s' }}
								className='animate'
							>
								It looks like you&apos;re viewing this page on a
								mobile device. Some features of this page are{' '}
								<b>not intended</b> for mobile users and as
								such, <b>will not function properly</b>. For the
								full experience, please visit this page on a
								desktop or laptop browser.
								<br />
								<em>~the website wizard</em>
							</Col>
						)}
					</Row>
				</Container>
			</div>
		</div>
	);
}
