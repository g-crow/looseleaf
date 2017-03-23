import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');

class Notepad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      date: Date.now(),
      list: [],
      displayList: true,
      asc: 1,
      message: "For future reference...",
      showButton: true
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


updateCurrentNotes(username){
  var self = this;
  username = username || self.props.username
  $.ajax ({
    method: 'GET',
    url: config.serverRoute + '/currentNote/' + self.props.username
  }).done(function(data) {
    self.setState( {list: data, displayList: true, showButton: false });
  })
}


createNoteList(){
  var list = this.state.list;
  return list.sort((a,b)=> this.state.asc* (new Date(b.date)-new Date(a.date)))
  .map(function(entry){
    return (<li> {entry.entry} </li>)
  })
}


    hideNotesHistoryOnClick(){
      this.setState( {displayList: false, showButton: true} )
    }

    blankEntry () {
      this.state.message === "For future reference..." ? this.setState( {message: "To pay attention, this is our endless and proper work." }) : this.setState( {message:  "For future reference..."} )
    }

createNoteEvent(){
if (this.state.entry === "" ){
  this.blankEntry();
} else {

    var data = Object.assign({username: this.props.username}, this.state)
    $.ajax ({
      method: 'POST',
      url: config.serverRoute + '/createnote',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(()=>{
      this.setState({ entry:'' });
      this.updateCurrentNotes();
  })
  }
}

    render() {
      if(!this.props.username)
        return (
          <div>
            Loading...
          </div>)
      return (
        <div id="notepad" className="paper-content">
          <div><h1>Notepad</h1></div>
          <form>
			        <textarea placeholder={this.state.message} value={this.state.entry}
                onChange={this.entryChange.bind(this)} />
			        <div className="buttons">
    		           <input type="button" className="button" id="createNote"
                     value="Add Notes" onClick={this.createNoteEvent.bind(this)} />
                   {this.state.showButton === true ? <input type="button" className="button" id="listTasks"
                     value="Show Notes"
                     onClick={this.updateCurrentNotes.bind(this)} /> :
                    <input type="button" className="button" value="Hide Notes" onClick={this.hideNotesHistoryOnClick.bind(this)} />}
              </div>
          </form>
          <div>
            {this.state.displayList === true ? <ul id="noteItem">{ this.createNoteList() }</ul> : ""}
          </div>
        </div>
      );
    }
  }

export default Notepad;
