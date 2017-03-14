import React, { Component } from 'react';
import Goals from './Goals';
import Journal from './Journal';
import Notepad from './Notepad';
import Todo from './Todo';
import Calendar from './Calendar';
import $ from 'jquery';
import {browserHistory} from 'react-router'
var config = require('../../Config');

class Artboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      access: false
    };
  }

  componentWillMount() {
   
   $.ajax ({
      method: 'GET',
      url: config.serverRoute + '/verification',
      error: function(error){
          console.log('eeeerrrrorooor')
          browserHistory.push('/login')
        },
      success: function(success) {
        this.setState( {access: true} )
      }
      }).done(function(data){
        console.log('we rock harder than granite', data)
      })
} 


  render() {
    return (
    	<div id="artboard">
          <Goals></Goals>
          <Journal></Journal>
          <Notepad></Notepad>
          <Todo></Todo>
          <Calendar></Calendar>
    	</div>

    );
  }
}

export default Artboard;
