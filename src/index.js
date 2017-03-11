import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import App from './components/App'
import { Router, Route, hashHistory } from 'react-router'
import Artboard from './components/Artboard'
import Calendar from './components/Calendar'
import Goals from './components/Goals'
import Journal from './components/Journal'
import Login from './components/Login'
import Notepad from './components/Notepad'
import Signup from './components/Signup'
import Todo from './components/Todo'


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/artboard" component={Artboard} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/goals" component={Goals} />
      <Route path="/journal" component={Journal} />
      <Route path="/login" component={Login} />
      <Route path="/notepad" component={Notepad} />
      <Route path="/signup" component={Signup} />
      <Route path="/todo" component={Todo} />
    </Route>
  </Router>
), document.getElementById('root'))
