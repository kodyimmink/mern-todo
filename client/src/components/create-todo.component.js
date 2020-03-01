import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default class CreateTodo extends Component {
    
    constructor(props){
        super(props)

        //state
        this.state ={
            todoDescription: "",
            todoResponsible: "",
            todoPriority: "",
            todoCompleted: false
        }

        //bind this
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //state change handlers
    onChangeTodoDescription(e){
        this.setState({
            todoDescription: e.target.value
        })
    }

    onChangeTodoResponsible(e){
        this.setState({
            todoResponsible: e.target.value
        })
    }

    onChangeTodoPriority(e){
        this.setState({
            todoPriority: e.target.value
        })
    }

    //submit todo and reset state to default
    onSubmit(e){
        e.preventDefault();

        //new todo
        const newTodo = {
            todoDescription: this.state.todoDescription,
            todoResponsible: this.state.todoResponsible,
            todoPriority: this.state.todoPriority,
            todoCompleted: this.state.todoCompleted
        }

        //submit to backend
        axios.post(process.env.REACT_APP_BACKEND_URL + "/todo/create", newTodo)
        .then( res => console.log(res))
        .catch( err =>  console.log(err))

        this.setState({
            todoDescription: "",
            todoResponsible: "",
            todoPriority: "",
            todoCompleted: false
        })
    }

    render(){
        return (
            <div className="container" style={{marginTop: 20}}>
                <h3>Create New Todo</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" value={this.state.todoDescription} onChange={this.onChangeTodoDescription}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Responsible:</Form.Label>
                        <Form.Control type="text" value={this.state.todoResponsible} onChange={this.onChangeTodoResponsible}></Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Check type="radio" name="priorityOptions" id="priorityLow" label="Low" value="Low" checked={this.state.todoPriority === "Low"} onChange={this.onChangeTodoPriority}/>
                        <Form.Check type="radio" name="priorityOptions" id="priorityMedium" label="Medium" value="Medium" checked={this.state.todoPriority === "Medium"} onChange={this.onChangeTodoPriority}/>
                        <Form.Check type="radio" name="priorityOptions" id="priorityHigh" label="High" value="High" checked={this.state.todoPriority === "High"} onChange={this.onChangeTodoPriority}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" value="Submit Todo">Submit Todo</Button>
                </Form>
            </div>
        )
    }
}