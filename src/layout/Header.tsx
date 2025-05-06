import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-primary">
            <Container fluid className="d-flex justify-content-between">
                <Navbar.Brand href="/">
                    <i className="bi bi-card-list me-2"></i>
                    Recipe app
                </Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                    <Nav.Link as={Link} to={'/contact'}>Contact</Nav.Link>
                    <Nav.Link as={Link} to={'/about'}>About</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
