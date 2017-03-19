import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');

class Notepad extends Component {
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

createNoteList(){
  var list = this.state.list;
  return list.map(function(entry){
    return (<li> {entry.entry} </li>)
  })
}

updateCurrentNotes(){
  var self = this;
  $.ajax ({
    method: 'GET',
    url: config.serverRoute + '/currentNote/' + self.props.username()
  }).done(function(data) {
    self.setState( {list: data} );
  })
}

createNoteEvent(){
  $.ajax ({
    method: 'POST',
    url: config.serverRoute + '/createnote',
    data: JSON.stringify(this.state),
    contentType: 'application/json'
  }).done(this.setState({ entry:'' }));
}

    render() {
      return (
        <div id="notepad">
          <div>
            <ul id="noteItem">{ this.createNoteList() }</ul>
          </div>
          <form>
			<textarea placeholder="A place for notes!" value={this.state.entry} onChange={this.entryChange.bind(this)} />
			<br />
    		<input type="button" className="button" id="createNote" value="Add Notes" onClick={this.createNoteEvent.bind(this)} />
    		<br />
            <input type="button" className="button" id="listTasks" value="List Notes History" onClick={this.updateCurrentNotes.bind(this)} />
          </form>
        </div>
      );
    }
  }

export default Notepad;
