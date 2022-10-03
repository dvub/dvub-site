import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
const Footer = () => {
    return (
        <div>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col>dvub</Col>
                    <Col>
                        <div>
                            <a href='https://github.com/dvub'>
                                <Image
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                                    width={32}
                                    height={32}
                                    alt='Github Icon'
                                />
                            </a>

                        </div>
                    </Col>
                    <Col>v1.0.0</Col>
                    <Col><a href=''>Changelog</a></Col>
                </Row>
            </Container>
        </div>
    );
}
export default Footer;