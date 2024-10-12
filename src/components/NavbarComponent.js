import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import DeleteAccount from './DeleteAccount';

function NavbarComponent() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" sticky='top' style={{ background: '#244e79' }} >
          <Container fluid style={{ background: '#244e79' }}>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Brand style={{ marginLeft: '-420px', marginTop: '-10px' }} href="#">Personal Storage Service</Navbar.Brand>

            <Form className="d-flex align-items-end justify-content-end flex-row "
              style={{ flexGrow: '0' }}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{ width: '400px', gap: '0' }}
              />
              <Button variant="outline-success"
                style={{ width: '150px', margin: '2px' }}>Search</Button>
            </Form>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Hello, Mohy elden!
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-1" style={{ lineHeight: "2" }}>
                  <div>
                    <Nav.Link as={Link} to="/Home">Home</Nav.Link>
                    <Nav.Link as={Link} href="#action2">Edit Profile</Nav.Link>
                  </div>
                  <div>
                    <Nav.Link as={Logout} to="/Login" >Logout</Nav.Link>
                    <Nav.Link as={DeleteAccount} to="/Login" style={{ marginTop: "30px" }}>Delete Account</Nav.Link>
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container >
        </Navbar >
      ))
      }
    </>
  );
}

export default NavbarComponent;
