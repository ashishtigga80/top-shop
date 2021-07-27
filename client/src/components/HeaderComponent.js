import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Error from './ErrorComponent';

const Header = (props) => {
  
  const Usernav = () => {
    if(!props.user.islogin){
      return(
        <><NavItem><NavLink className="nav-link" to="/login">Login</NavLink></NavItem>
          <NavItem><NavLink className="nav-link" to="/signup">Signup</NavLink></NavItem></>)
    }else{
      return(
        <><Navbar.Text>
            Hi, {props.user.user.firstname}
          </Navbar.Text>
          <NavItem><NavLink className="nav-link" to="/cart">My Cart</NavLink></NavItem>
          <NavItem><NavLink className="nav-link" to="/orders">My Orders</NavLink></NavItem>
          <NavItem><NavLink className="nav-link" to="/logout">Logout</NavLink></NavItem>
        </>
      )
    }
  }

  return(
      <>
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
      <Error error = {props.error}/>
      </>
  );
}


export default Header;