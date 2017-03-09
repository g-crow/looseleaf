import React, {Component} from 'react';
import $ from 'jquery';

class Signup extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    };
  }

  firstNameChange(e) {
    this.setState( {firstName: e.target.value} )
  };
   lastNameChange(e) {
    this.setState( {lastName: e.target.value} )
  };
   usernameChange(e) {
    this.setState( {username: e.target.value} )
  };
  passwordChange(e) {
    this.setState( {password: e.target.value} )
  };
   emailChange(e) {
    this.setState( {email: e.target.value} )
  };

  confirmPassword(e){
    this.setState ( {confirmPass: e.target.value} )
  }

  // validateForm(){

  // }

  createUserEvent(){
    $.ajax ({
      method: 'POST',
      url: 'http://localhost:3002/api/createuser', 
      data: JSON.stringify(this.state), 
      contentType: 'application/json'
    });
  }

  render() {
    return (
      <div>
          <form>
      			<input type="text" className="textInput" id="firstName" placeholder="First name" value={this.state.firstName} onChange={this.firstNameChange.bind(this)} />
      			<input type="text" className="textInput" id="lastName" placeholder="Last name" value={this.state.lastName} onChange={this.lastNameChange.bind(this)} />
      			<input type="text" className="textInput" id="username" placeholder="Username" value={this.state.username} onChange={this.usernameChange.bind(this)} />
      			<input type="password" className="textInput" id="password" placeholder="Password" value={this.state.password} onChange={this.passwordChange.bind(this)} />
      			<input type="password" className="textInput" id="confirmPassword" placeholder="Confirm password" value={this.state.confirmPass} onChange={this.confirmPassword.bind(this)} />
      			<input type="email" className="textInput" id="emailInput" placeholder="Email address" value={this.state.email} onChange={this.emailChange.bind(this)} />
            <input type="button" className="textInput" id="createAccount" value="Create account" onClick={this.createUserEvent.bind(this)} />
      		</form>
    		<div className="underForm">Already have an account?</div>
      </div>
	  );
  }
}

export default Signup;
