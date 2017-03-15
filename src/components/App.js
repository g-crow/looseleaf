import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Looseleaf</h1>
        <nav>
          <ul role="nav">
            <li><Link to="/login" activeClassName="active">Login</Link></li>
            <li><Link to="/logout" activeClassName="active">Logout</Link></li>
            <li><Link to="/signup" activeClassName="active">Sign Up</Link></li>
            <li><Link to="/artboard" activeClassName="active">Artboard</Link></li>
            <li><Link to="/calendar" activeClassName="active">Calendar</Link></li>
            <li><Link to="/goals" activeClassName="active">Goals</Link></li>
            <li><Link to="/todo" activeClassName="active">Todo</Link></li>
            <li><Link to="/journal" activeClassName="active">Journal</Link></li>
            <li><Link to="/notepad" activeClassName="active">Notepad</Link></li>
          </ul>
      </nav>

      {this.props.children}
      </div>
    )
  }
})
