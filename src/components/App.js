import React, {Component} from 'react'
import { Link } from 'react-router'

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      token : '',
      username: '',
      cookieLoaded: false
    }
  }

  componentDidMount(){
    console.log('cccooookie', document.cookie)
    if(document.cookie){
      var stateUpdate = JSON.parse(document.cookie)
      stateUpdate.cookieLoaded = true;
      this.setState(stateUpdate)
    } else {
      this.setState({cookieLoaded: true})
    }
  }

  login(token, username){
    document.cookie = JSON.stringify({token, username})
    this.setState({token, username})
  }

  logout(){
    document.cookie = ''
    this.setState({token:'', username:''})
  }

  notLoggedIn(){
    return !this.state.token && this.state.cookieLoaded
  }

  giveUsername(){
    return this.state.username
  }

  render() {
    const childProps = {...this.state, login: this.login.bind(this), logout: this.logout.bind(this), notLoggedIn: this.notLoggedIn.bind(this), username: this.giveUsername.bind(this) }
    return (
      <div>
        <h1>Looseleaf</h1>
        <nav>
          <ul role="nav">
            {!this.state.token ? <li><Link to="/login" activeClassName="active">Login</Link></li>
                               : <li><Link to="/login" onClick={this.logout.bind(this)} activeClassName="active">Logout</Link></li>}
            {!this.state.token ? <li><Link to="/signup" activeClassName="active">Sign Up</Link></li> : ""}
            <li><Link to="/artboard" activeClassName="active">Artboard</Link></li>
          </ul>
      </nav>

      {this.props.children && React.cloneElement(this.props.children, childProps)}
      </div>
    )
  }
}
