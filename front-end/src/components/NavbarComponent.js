import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logout from './Logout';
import DeleteAccount from './DeleteAccount';
import useAuth from "../hooks/useAuth";
import { Button } from 'react-bootstrap';

function NavbarComponent() {
  const { auth } = useAuth();
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className=" mb-3" sticky='top' style={{ background: '#244e79' }} >
          <Container fluid style={{ background: '#244e79', 'justify-content': 'flex-start', gap: '20px' }}>
            <Navbar.Toggle style={{ marginRight: '0px' }} aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Brand style={{ width: '200px', marginTop: '-10px' }} href="#">Personal Storage Service</Navbar.Brand>
            <Navbar.Offcanvas
              style={{ marginRight: '0px', whiteSpace: 'nowrap' }}
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Hello, {auth.userName}!
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body id={`offcanvasNavbarLabel-expand-${expand}`}>
                Email: <br />
                {auth.email}
              </Offcanvas.Body>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-1" style={{ display: "flex", gap: "470px" }}>
                  <div>
                  </div>
                  <div style={{ display: "flex", gap: "30px" }}>
                    <Nav.Link as={Logout} to="/Login" >Logout</Nav.Link>
                    {
                      auth.userName === 'example' ?
                        <Button variant="danger" disabled={true}
                          title="You cannot delete this example account"
                        >Delete Account</Button> :
                        <Nav.Link as={DeleteAccount} to="/Login"
                          style={{ marginTop: "30px" }}>
                          Delete Account</Nav.Link>
                    }
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
