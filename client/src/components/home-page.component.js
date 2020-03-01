import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Nav } from 'react-bootstrap';

export default class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return (
            <div className="container" style={{marginTop: 20}}>
            <h3>Home</h3>
                <Jumbotron className="bg-dark">
                    <h4 className="text-light" style={{textAlign: "center"}}>A simple Todo Web App built to familiarize myself with the MERN Stack</h4>
                    <br/>
                    <div className="form-inline justify-content-center">
                        <Nav.Link className="btn btn-primary m-1" as={Link} to="/todos">Todo List</Nav.Link>
                        <Nav.Link className="btn btn-primary m-1" as={Link} to="/create">New Todo</Nav.Link>
                    </div>
                </Jumbotron>
            </div>
        )
    }
}