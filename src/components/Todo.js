import React, { Component } from 'react';
import $ from 'jquery';
import { Glyphicon } from 'react-bootstrap';
var config = require('../../config');

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      date: Date.now(),
      list: [],
      asc: 1
    };
  }

componentWillMount(){
  if(this.props.username){
    this.updateCurrentTodo();
  }
}
componentWillReceiveProps(nextProps){
  if(this.props.username !== nextProps.username){
    this.updateCurrentTodo(nextProps.username);
  }
}

entryChange(e) {
  this.setState( {entry: e.target.value} )
}

createList(){
  const sortByDate = (a,b) =>
      this.state.asc * (new Date(b.date)-new Date(a.date))
  var list = this.state.list;
    return list
      .sort(sortByDate)
      .filter(entry => entry.current)
      .map((entry) => <TodoItem key={entry._id} entry={entry} updateCurrentTodo={this.updateCurrentTodo.bind(this)}/> )
}

updateCurrentTodo(username){
  var self = this;
  username = username || self.props.username
  console.log('updating todos for ' + username)
  $.ajax ({
    method: 'GET',
    url: config.serverRoute + '/currentTodos/' + username
  }).done(function(data) {
    console.log('All the data', [])
    self.setState({list: data} );
  })
}

createTodoEvent(){
  var data = Object.assign({username: this.props.username}, this.state)
  $.ajax ({
    method: 'POST',
    url: config.serverRoute + '/createtodo',
    data: JSON.stringify(data),
    contentType: 'application/json'
  }).done(()=>{
    this.setState({ entry:'' });
    this.updateCurrentTodo();
  }) //clear form after entry
}

  render() {
    if(!this.props.username)
      return (
        <div>
          Loading...
        </div>)
      return (
        <div id="todo">
          <input type="text" placeholder="to do item" value={this.state.entry} onChange={this.entryChange.bind(this)} />
          <input type="submit" className="button" id="createTodo" value="Add task" onClick={this.createTodoEvent.bind(this)} />
          <button className="button" className="glyphy" type='submit' onClick={()=>this.setState({asc: this.state.asc * -1})}><Glyphicon glyph="sort" /></button>
          <div>
            <span id="todoItems">{this.createList()}</span>
          </div>
        </div>
      );
    }
  }

  class TodoItem extends Component {

    taskComplete(e){
      console.log("task complete");
      $.ajax ({
        method: 'PUT',
        url: config.serverRoute + '/taskComplete/' + this.props.entry._id
      }).done(()=>this.props.updateCurrentTodo())
    }

    render(){
      return (
        <span id="todoItems">
          <input type="checkbox" name="todoitem"  onClick={this.taskComplete.bind(this)}/> {this.props.entry.entry}
          <br />
        </span>)
    }
  }

  export default Todo;
