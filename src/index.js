import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from './components/App';
import { Router, Route, browserHistory } from 'react-router';
import Artboard from './components/Artboard';
import Signup from './components/Signup';
import Login from './components/Login';
import MyFirstGrid from './components/MyFirstGrid';
import AddRemove from './components/AddRemove';
// import Calendar from './components/Calendar';
// import Goals from './components/Goals';
// import Journal from './components/Journal';
// import Notepad from './components/Notepad';
// import Todo from './components/Todo';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/artboard" component={Artboard} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/myFirstGrid" component={MyFirstGrid} />
      <Route path="/AddRemove" component={AddRemove} />      
    </Route>
  </Router>
), document.getElementById('root'))
/*
<Route path="/calendar" component={Calendar} />
<Route path="/goals" component={Goals} />
<Route path="/journal" component={Journal} />
<Route path="/notepad" component={Notepad} />
<Route path="/todo" component={Todo} /> */
