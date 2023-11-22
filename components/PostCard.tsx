import Link from 'next/link';
import { FC } from 'react';
import { Card } from 'react-bootstrap';
import Metadata from '../types/metadata';

interface Props {
	meta: Metadata;
}

const PostCard: FC<Props> = (props) => {
	const { title, description, date, tags, fileName } = props.meta;

	let tagDisplay = tags ? tags.join(', ') : '';
	const styledTags = (
		<span
			style={{
				border: '4px solid #DADADA',
				backgroundColor: '#DADADA',
				borderRadius: '5px',
				fontFamily: 'JetBrains Mono',
				fontWeight: '700',
			}}
		>
			{tagDisplay}
		</span>
	);

	return (
		<div className='border'>
			<Link href={`/blog/${fileName}`} style={{ textDecoration: 'none' }}>
				<Card style={{ border: 'transparent' }}>
					<div style={{ height: '10rem', overflow: 'hidden' }}>
						<Card.Body>
							<Card.Title
								className='mono'
								style={{
									fontWeight: '700',
									fontSize: '24px',
								}}
							>
								{title}
							</Card.Title>

							<Card.Text style={{ fontSize: '14px' }}>
								{description}
							</Card.Text>
						</Card.Body>
					</div>
					<div style={{ height: '4rem' }}>
						<Card.Footer
							style={{
								backgroundColor: 'transparent',
								border: 'transparent',
								fontSize: '15px',
							}}
						>
							{date} · {styledTags}
						</Card.Footer>
					</div>
				</Card>
			</Link>
		</div>
	);
};

export default PostCard;
