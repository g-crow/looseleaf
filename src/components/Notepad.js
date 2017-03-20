import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');

class Notepad extends Component {
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
    this.updateCurrentNotes();
  }
}

componentWillReceiveProps(nextProps){
  if(this.props.username !== nextProps.username){
    this.updateCurrentNotes(nextProps.username);
  }
}

entryChange(e) {
  this.setState( {entry: e.target.value} )
}

createNoteList(){
  var list = this.state.list;
  return list.sort((a,b)=> this.state.asc* (new Date(b.date)-new Date(a.date)))
  .map(function(entry){
    return (<li> {entry.entry} </li>)
  })
}

updateCurrentNotes(username){
  var self = this;
  username = username || self.props.username
  $.ajax ({
    method: 'GET',
    url: config.serverRoute + '/currentNote/' + username
  }).done(function(data) {
    self.setState( {list: data} );
  })
}

createNoteEvent(){
  var data = Object.assign({username: this.props.username}, this.state)
  $.ajax ({
    method: 'POST',
    url: config.serverRoute + '/createnote',
    data: JSON.stringify(this.state),
    contentType: 'application/json'
  }).done(()=>{
    this.setState({ entry:'' });
})
}

    render() {
      return (
        <div id="notepad">
          <div>
            <ul id="noteItem">{ this.createNoteList() }</ul>
          </div>
          <form>
			        <textarea placeholder="A place for notes!" value={this.state.entry} onChange={this.entryChange.bind(this)} />
			        <div className="buttons">
    		           <input type="button" className="button" id="createNote" value="Add Notes" onClick={this.createNoteEvent.bind(this)} />
                   <input type="button" className="button" id="listTasks" value="List Notes History" onClick={this.updateCurrentNotes.bind(this)} />
              </div>
          </form>
        </div>
      );
    }
  }

export default Notepad;
