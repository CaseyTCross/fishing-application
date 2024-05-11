import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navigation.css";

function Navigation() {
  return (
    <Navbar expand="md" className="navigation-navbar">
      <Container>
        <Nav className="justify-content-between w-100">
          <Nav.Item>
            <Nav.Link className="nav-links" href="/">
              Recent
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-links" href="/allfish">
              All Fish
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-links" href="/toprecords">
              Top Records
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-links" href="/personalrecords">
              Personal Records
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-links" href="/addfish">
              Add Fish
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
