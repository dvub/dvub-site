import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const CustomNavBar = () => {

    return (
        <div>
            <Navbar sticky='top' expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="../">Home</Nav.Link>
                            <Nav.Link href="../about">About</Nav.Link>
                            <Nav.Link href="../posts">Posts</Nav.Link>
                            <Nav.Link href="https://github.com/dvub?tab=repositories">Projects</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );

}


export default CustomNavBar