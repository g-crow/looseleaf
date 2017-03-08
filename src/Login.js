import react;

class Signup extends Component {
  render() {
    return (
      <div>
        <form>
    			<input type="text" class="username" placeholder="Enter username">
    			<input type="password" class="password" placeholder="Enter password">
    			<input type="button" class="login" value="Login">
    		</form>
    		<div class="underForm">Don't have an account? Sign up <a href="./signup.html">here!</a></div>
      </div>
    )
  }
}

export default Login;
