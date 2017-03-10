import React, { Component } from 'react';
import Goals from './Goals';
import Journal from './Journal';
import Notepad from './Notepad';
import Todo from './Todo';

class Artboard extends Component {
  render() {
    return (
    	<div>
    		<Goals></Goals>
    		<Journal></Journal>
    		<Notepad></Notepad>
    		<Todo></Todo>
    	</div>
       
    );
  }
}

export default Artboard;