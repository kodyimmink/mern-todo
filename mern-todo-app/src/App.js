import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from './components/navigation-bar.component';
import HomePage from './components/home-page.component';
import TodosList from './components/todos-list.components';
import CreateTodo from './components/create-todo.component';
import EditTodo from './components/edit-todo.components';

export default function App() {
  return (
    <div>
      <Router>
        <NavigationBar />
        <Route path="/" exact component={HomePage} />
        <Route path="/todos" exact component={TodosList} />
        <Route path="/create" component={CreateTodo} />
        <Route path="/edit/:id" component={EditTodo} />
      </Router>
    </div>
  );
}
