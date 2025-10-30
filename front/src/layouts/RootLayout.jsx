import { Outlet, Link } from "react-router";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout() {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        🌐 Tripa_Ippsi
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">
                                Accueil
                            </Nav.Link>
                            <Nav.Link as={Link} to="/recherche">
                                Recherche
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Contenu des pages */}
            <Container className="mt-4">
                <Outlet />
            </Container>
        </>
    );
}
