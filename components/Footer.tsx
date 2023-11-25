import { Container, Row, Col } from 'react-bootstrap';
import CSS from 'csstype';

const Footer = () => {
	const linkStyle: CSS.Properties = {
		textDecoration: 'none',
		color: 'black',
	};

	return (
		<div style={{ fontSize: '14px' }}>
			<Container>
				<Row>
					<Col>
						<a href='https://github.com/dvub' style={linkStyle}>
							dvub
						</a>
					</Col>
					<Col>
						<a
							href='https://github.com/dvub/personal_website'
							style={linkStyle}
						>
							repository
						</a>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default Footer;
