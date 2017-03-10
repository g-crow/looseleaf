import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Looseleaf -- HOME!</h1>
        <ul role="nav">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/artboard">Artboard</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/goals">Goals</Link></li>
          <li><Link to="/todo">Todo</Link></li>
          <li><Link to="/journal">Journal</Link></li>
          <li><Link to="/notepad">Notepad</Link></li>
        </ul>
      </div>
    )
  }
})