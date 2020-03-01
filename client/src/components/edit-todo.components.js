import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props){
        super(props);
        this.state = {
            todoDescription: '',
            todoResponsible: '',
            todoPriority: '',
            todoCompleted: false
        }
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_BACKEND_URL + '/todo/find/' + this.props.match.params.id)
        .then( res => {
            this.setState({
                todoDescription: res.data.todoDescription,
                todoResponsible: res.data.todoResponsible,
                todoPriority: res.data.todoPriority,
                todoCompleted: res.data.todoCompleted
            })
        })
        .catch(err => console.log(err))
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

    onChangeTodoCompleted(e){
        this.setState({
            todoCompleted: !this.state.todoCompleted
        })
    }

    onSubmit(e){
        e.preventDefault();

        //existing todo with changes
        const newTodo = {
            todoDescription: this.state.todoDescription,
            todoResponsible: this.state.todoResponsible,
            todoPriority: this.state.todoPriority,
            todoCompleted: this.state.todoCompleted
        }

        //submit to backend
        axios.post(process.env.REACT_APP_BACKEND_URL + "/todo/update/" + this.props.match.params.id, newTodo)
        .then( res => console.log(res))
        .catch( err =>  console.log(err))

        //route back to todos
        this.props.history.push('/todos')

    }

    render(){
        return (
            <div className="container" style={{marginTop: 20}}>
                <h3>Edit Todo</h3>
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
                    <Form.Group>
                        <Form.Check type="checkbox" name="completedCheckbox" id="completedCheckbox" label="Completed" checked={this.state.todoCompleted} onChange={this.onChangeTodoCompleted}></Form.Check>
                    </Form.Group>
                    <Button variant="primary" type="submit" value="Submit Todo">Submit Todo</Button>
                </Form>
            </div>
        )
    }
}