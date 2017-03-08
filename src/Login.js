import react;

class Login extends Component{
  render(){
    return(
      <div>
          <form>
      			<input type="text" class="username" placeholder="Enter username">
      			<input type="password" class="password" placeholder="Enter password">
      			<input type="button" class="login" value="Login">
      		</form>

      		<div class="underForm">Sign Up Here</div>
      </div>
    );
  }
}
export default Login;
