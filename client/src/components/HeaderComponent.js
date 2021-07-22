import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

const Header = () => {
  return(
      <Navbar collapseOnSelect fxied='top' expand='sm' bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            Shopinit
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
}


export default Header;