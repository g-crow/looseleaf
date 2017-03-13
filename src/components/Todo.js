import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../Config');

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: config.usernamePlaceholder,
      entries: '',
      date: Date.now(),
      current: true,
      list: []
    };
  }

entryChange(e) {
  this.setState( {entries: e.target.value} )
}

createList(){
  var list = this.state.list;
  return list.map(function(entry){
    return (<li> {entry.entries} </li>)
  })
}

updateCurrentTodo(){
  var self = this;
  $.ajax ({
    method: 'GET',
    url: config.serverRoute + '/currentTodos/' + self.state.user
  }).done(function(data) {
    self.setState( {list: data} );
    console.log(self.state.list);
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
            <input type="button" className="placeholderButton" id="listTasks" value="List Tasks" onClick={this.updateCurrentTodo.bind(this)} />
          </form>
          <div>
            <ol id="todoItem">  { this.createList() }</ol>
          </div>
        </div>
      );
    }
  }


  export default Todo;
