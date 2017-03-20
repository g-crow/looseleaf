import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      date: Date.now(),
      current: true,
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

taskComplete(e){
  console.log("task complete");
  this.setState( {entry : e.target.value, current : false })
  $.ajax ({
    method: 'PUT',
    url: config.serverRoute + '/taskComplete/' + this.username
  }).done(function(data) {
    self.setState({current:false} );
  })
}
createList(){
  var list = this.state.list;
  // if current = true {
    return list.sort((a,b)=> this.state.asc* (new Date(b.date)-new Date(a.date)))
    .map(function(entry){
      return (
        <span id="todoItems">
            <input type="checkbox" name="todoitem" value={entry.entry} onChange={this.taskComplete.bind(this)} /> {entry.entry}
            <br />
        </span>)
    })
  // }
}

updateCurrentTodo(username){
  var self = this;
  username = username || self.props.username
  console.log('updating todos for ' + username)
  $.ajax ({
    method: 'GET',
    url: config.serverRoute + '/currentTodos/' + username
  }).done(function(data) {
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
        return (<div id="todo">
          <form>
            <input type="text" placeholder="to do item" value={this.state.entry} onChange={this.entryChange.bind(this)} />
              <input type="submit" className="button" id="createTodo" value="Add task" onClick={this.createTodoEvent.bind(this)} />
          </form>
          <button className="button" onClick={()=>this.setState({asc: this.state.asc * -1})}>Reverse order</button>
          <div>
              <span id="todoItems">{this.createList()}</span>
          </div>
        </div>
      );
    }
  }


  export default Todo;
