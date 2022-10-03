import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
const Footer = () => {
    return (
        <div>
            <Container className='container'>
                <Row>
                    <Col>
                        dvub
                    </Col>
                    <Col>
                    <a href='https://github.com/dvub?tab=repositories'>
                        <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width={64} height={64} alt=''/>
                    </a>
                    
                    </Col>
                    <Col>
                        v1.0.0
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Footer;