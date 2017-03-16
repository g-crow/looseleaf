import React, { Component } from 'react';
import Goals from './Goals';
import Journal from './Journal';
import Notepad from './Notepad';
import Todo from './Todo';
import Calendar from './Calendar';
// import $ from 'jquery';
import {browserHistory} from 'react-router'
// var config = require('../../Config');

class Artboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      access: false
    };
  }

  componentWillMount() {
    if(this.props.notLoggedIn()){
      browserHistory.push('/login')
    }
  }

  render() {
    return (
    	<div id="artboard">
          <Goals username={this.props.username.bind(this)}/>
          <Journal username={this.props.username.bind(this)}/>
          <Notepad username={this.props.username.bind(this)}/>
          <Todo username={this.props.username.bind(this)}/>
          <Calendar username={this.props.username.bind(this)}/>
    	</div>
    );
  }
}

export default Artboard;
