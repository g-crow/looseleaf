import React, {Component} from 'react';
import $ from 'jquery';
import {browserHistory} from 'react-router'
var config = require('../../config');

class Login extends Component{

  constructor(props) {
    super(props)
    this.state = {
        username: '',
        password: ''
    };
  }

  usernameChange(e) {
    this.setState( {username: e.target.value} )
  };
  passwordChange(e) {
    this.setState( {password: e.target.value} )
  };

   validateUser(){
     var self = this;
    $.ajax ({
      method: 'POST',
      url: config.serverRoute + '/authenticate',
      data: JSON.stringify(this.state),
      contentType: 'application/json'
    }).done(function(success) {
        self.props.login(success.token, self.state.username)
        browserHistory.push('/Artboard')
      })
    }

  render(){
    return(
      <div id="login">
          <form>
      			<input type="text" className="username" placeholder="Enter username"
            value={this.state.username} onChange={this.usernameChange.bind(this)} />
      			<input type="password" className="password" placeholder="Enter password"
            value={this.state.password} onChange={this.passwordChange.bind(this)} />
      			<input type="button" className="login" value="Login" onClick={this.validateUser.bind(this)} />
      		</form>

      		<div className="underForm">Sign Up Here</div>
      </div>
    );
  }
}
export default Login;
