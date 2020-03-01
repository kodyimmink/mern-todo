import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

//Todo Component
const Todo = props => (
    <tr>
        <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoDescription}</td>
        <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoResponsible}</td>
        <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoPriority}</td>
        <td>
            <Link className="btn btn-warning btn-sm" to={"/edit/" + props.todo._id}>Edit</Link>
            {" | "}
            <Button variant="danger" size="sm" onClick={() => {props.deleteTodo(props.todo._id)}}>Delete</Button>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props){
        super(props)
        this.state = {
            todos: []
        }

        this.todoList = this.todoList.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    //populate todo list
    todoList(){
        return this.state.todos.map( (currentTodo) => {
            return <Todo todo={currentTodo} deleteTodo={this.deleteTodo} key={currentTodo._id} />;
        })
    }

    deleteTodo(id){
        axios.delete(process.env.REACT_APP_BACKEND_URL + "/todo/delete/" + id)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }


    //get all todos
    componentDidMount(){
        this.cancelTokenSource = axios.CancelToken.source();
        axios.get(process.env.REACT_APP_BACKEND_URL + "/todo/list", {
            cancelToken: this.cancelTokenSource.token
        })
        .then( res => {
            this.setState({
                todos: res.data
            })
        })
        .catch(err => console.log(err))
    }

    //update todos list on todo change
    componentDidUpdate() {
        this.cancelTokenSource = axios.CancelToken.source();
        axios.get(process.env.REACT_APP_BACKEND_URL + "/todo/list", {
            cancelToken: this.cancelTokenSource.token
        })
        .then( res => {
            this.setState({
                todos: res.data
            })
        })
        .catch(err => console.log(err))
      }
    
      componentWillUnmount() {
        this.cancelTokenSource && this.cancelTokenSource.cancel();
      }

    render(){
        return (
            <div className="container" style={{marginTop: 20}}>
                <h3>Todo List</h3>
                <Table striped hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </Table>
            </div>
        )
    }
}