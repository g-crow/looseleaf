import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from './components/App';
import { Router, Route, browserHistory } from 'react-router';
import Artboard from './components/Artboard';
import Signup from './components/Signup';
import Login from './components/Login';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/artboard" component={Artboard} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Route>
  </Router>
), document.getElementById('root'))
