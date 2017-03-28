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
      asc: 1,
      message: "To-do item...",
      displayList: true,
      displayButton: true
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
    url: config.serverRoute + '/currentTodos/' + self.props.username
  }).done(function(data) {
    console.log('All the data', [])
    self.setState({list: data, displayList: true, displayButton: false}  );
  })
}


blankEntry () {
  this.state.message === "To-do item..." ? this.setState( {message: "Be clenched, curious."} ) : this.setState( {message:  "To-do item..."} )
}

hideToDoOnClick(){
  this.setState( {displayList: false, displayButton: true} )
}

createTodoEvent(){

  if (this.state.entry === "") {
    this.blankEntry();
  } else {
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
}

  render() {
    if(!this.props.username)
      return (
        <div>
          Loading...
        </div>)
      return (
        <div id="todo">
            <div><h1 id="Thead">Tasks</h1></div>
          <input type="text" placeholder={this.state.message} value={this.state.entry} onChange={this.entryChange.bind(this)} />
          <button className="button glyphy" id="createTodo" value="Add task" onClick={this.createTodoEvent.bind(this)} ><Glyphicon glyph="plus" /></button>
          <button className="button glyphy" type='submit' onClick={()=>this.setState({asc: this.state.asc * -1})}><Glyphicon glyph="sort" /></button>
          {this.state.displayButton === true ? <button className="glyphy button" onClick={this.updateCurrentTodo.bind(this)} > <Glyphicon glyph="menu-up" /> </button> :
          <button className="button glyphy" onClick={this.hideToDoOnClick.bind(this)} > <Glyphicon glyph="menu-down" /> </button> }
          <div>
            {this.state.displayList === true ?<span id="todoItems">{this.createList()}</span> : ""}
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
