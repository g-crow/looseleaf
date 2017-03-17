import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      entry: '',
      date: Date.now(),
      current: true,
      list: []
    };
  }

entryChange(e) {
  this.setState( {entry: e.target.value} )
  var un = this.props.username()
  this.setState( {username: un})
}

createList(){
  var list = this.state.list;
  return list.map(function(entry){
    return (<li> {entry.entry} </li>)
  })
}

updateCurrentTodo(){
  var self = this;
  $.ajax ({
    method: 'GET',
    url: config.serverRoute + '/currentTodos/' + self.props.username()
  }).done(function(data) {
    self.setState( {list: data} );
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
        <div id="todo">
          <div>
            <ol id="todoItem">{ this.createList() }</ol>
          </div>
          <form>
          	<input type="text" placeholder="to do item" value={this.state.entry} onChange={this.entryChange.bind(this)} />
            <input type="button" className="textInput" id="createTodo" value="Add task" onClick={this.createTodoEvent.bind(this)} />
            <input type="button" className="placeholderButton" id="listTasks" value="List Tasks" onClick={this.updateCurrentTodo.bind(this)} />
          </form>
        </div>
      );
    }
  }


  export default Todo;
