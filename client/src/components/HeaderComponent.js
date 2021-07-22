import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const Usernav = () => {
    if(!props.user.islogin){
      return(
        <><NavItem><NavLink className="nav-link" to="/login">Login</NavLink></NavItem>
          <NavItem><NavLink className="nav-link" to="/signup">Signup</NavLink></NavItem></>)
    }else{
      return(
        <><NavItem><NavLink className="nav-link" to="/cart">My Cart</NavLink></NavItem>
          <NavItem><NavLink className="nav-link" to="/orders">My Orders</NavLink></NavItem>
          <Navbar.Text>
            Hi, {props.user.user.firstname}
          </Navbar.Text>
        </>
      )
    }
  }
  return(
      <Navbar collapseOnSelect expand='sm' bg="dark" variant="dark">
          <Navbar.Brand to="/home">
            Shopinit
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavItem><NavLink className="nav-link" to="/home">Home</NavLink></NavItem>
              
              <NavItem><NavLink className="nav-link" to="/products">Products</NavLink></NavItem>
              
            </Nav>
            <Nav>
              <Usernav />
            </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
}


export default Header;