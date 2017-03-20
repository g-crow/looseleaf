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
    };
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
  var list = this.state.list;
  return list.map(function(entry){
    return (<span id="todoItems">
              <input type="checkbox" name="todoitem" value="incomplete" /> {entry.entry}
              <br />
          </span>)
  })
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
        if(!this.props.username) return <div>Loading...</div>
        return (<div id="todo">
          <div>
                <span id="todoItems">{this.createList()}</span>
          </div>
          <form>
          	<input type="text" placeholder="to do item" value={this.state.entry} onChange={this.entryChange.bind(this)} />
            <div className="buttons">
              <input type="button" className="button" id="createTodo" value="Add task" onClick={this.createTodoEvent.bind(this)} />
            </div>
          </form>
        </div>
      );
    }
  }


  export default Todo;
