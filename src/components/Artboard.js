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
    if(!document.cookie){
      browserHistory.push('/login')
    } /*else {
      this.setState
    }*/
  }

  render() {
    return (
    	<div id="artboard">
          <Goals />
          <Journal />
          <Notepad />
          <Todo />
          <Calendar />
    	</div>
    );
  }
}

export default Artboard;
