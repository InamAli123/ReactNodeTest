import React,{Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import {Form,FormControl,Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
const Header = (props) => {

const logout = () => {
	document.cookie = "token=; Max-Age=0; path=/";
    props.history.push('/signin');
    //alert('hello');
}

  return (
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">Student Portal</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      
        
    </Nav>
    <Nav>
       <Nav.Link as={NavLink} to="/">Home</Nav.Link>
    <Nav.Link as={NavLink} to="/students">Students</Nav.Link>
    <Nav.Link as={NavLink} to="/add-student">Add Student</Nav.Link>
      <Nav.Link as={NavLink} exact to='/logout'>Logout</Nav.Link>
        

    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
export default Header;
