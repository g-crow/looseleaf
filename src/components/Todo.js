import React, { Component } from 'react';

class Todo extends Component {
  render() {
    return (
        <form>
        	<ul className="todo">
        		<li> <input type="text" placeholder="to do item 1" /> </li>
        	</ul>
        </form>
    );
  }
}

export default Todo;