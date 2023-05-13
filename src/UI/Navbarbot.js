import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar  fixed="top" style={{backgroundColor:"rgb(123,145,86,1)", borderRadius: "7px"}} expand="lg" variant="dark">
      <Container >
        <Navbar.Brand href="#home" style={{ color: "white" }}>EcoloBot</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavBar;