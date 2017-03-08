import react;

class Signup extends Component {
  render() {
    return (
      <div>
          <form>
      			<input type="text" class="textInput" id="firstName" placeholder="First name">
      			<input type="text" class="textInput" id="lastName" placeholder="Last name">
      			<input type="text" class="textInput" id="username" placeholder="Username">
      			<input type="password" class="textInput" id="password" placeholder="Password">
      			<input type="password" class="textInput" id="confirmPassword" placeholder="Confirm password">
      			<input type="email" class="textInput" id="emailInput" placeholder="Email address">
            <input type="button" class="textInput" id="createAccount" value="Create account">
      		</form>
    		<div class="underForm">Already have an account?</div>
      </div>
	  );
  }
}

export default Signup;
