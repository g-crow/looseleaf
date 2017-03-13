import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../Config');

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // user: username,
      entries: '',
      date: Date.now(),
      current: true,
    };
  }

entryChange(e) {
  this.setState( {entries: e.target.value} )
}

createList = function(){
  
}

updateCurrentTodo(){
  $.ajax ({
    method: 'GET',
    url: config.serverRoute + '/currentTodos'
  }).done(function(data) {

  })
}

createTodoEvent(){
  $.ajax ({
    method: 'POST',
    url: config.serverRoute + '/createtodo',
    data: JSON.stringify(this.state),
    contentType: 'application/json'
  });
}

    render() {
      return (
        <div>
          <form>
          	<ul className="todo">
          		<li> <input type="text" placeholder="to do item" value={this.state.entries} onChange={this.entryChange.bind(this)} /> </li>
          	</ul>
            <input type="button" className="textInput" id="createTodo" value="Add task" onClick={this.createTodoEvent.bind(this)} />
          </form>
          <div>
            <ol id="todoItem">  {}</ol>
          </div>
        </div>
      );
    }
  }


  export default Todo;
