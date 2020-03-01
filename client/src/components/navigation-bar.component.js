import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../logo.svg'

class NavigationBar extends Component {
    render(){
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} width="auto" height="35" alt="MERN Todo App Home"/>
                    MERN Stack Todo App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/todos">Todo List</Nav.Link> 
                            <Nav.Link as={Link} to="/create">New Todo</Nav.Link> 
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(NavigationBar);