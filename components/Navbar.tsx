import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BlogLayout from './BlogLayout';

const NavBar = () => {
	return (
		<div>
			<Navbar className='navbar-custom' sticky='top' expand='lg'>
				<Container>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link href='../'>Home</Nav.Link>
							<Nav.Link href='../about'>About</Nav.Link>
							<Nav.Link href='../blog'>Blog</Nav.Link>
							<Nav.Link href='https://github.com/dvub?tab=repositories'>
								Projects
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default NavBar;
