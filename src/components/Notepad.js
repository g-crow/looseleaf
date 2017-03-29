import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');
import { Glyphicon } from 'react-bootstrap';

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
      showButton: false
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

  // removeComponent(){
  //   console.log(this.props.layouts)
  // }

    render() {
      if(!this.props.username)
        return (
          <div>
            Loading...
          </div>)
      return (

        <div id="notepad" >
            <div><h1 id="Nhead">Notepad</h1></div>

              <div>
            <textarea placeholder={this.state.message} value={this.state.entry}
                onChange={this.entryChange.bind(this)} />
			      <div className="buttons">

    		        <button className="button" id="createNote"
                value="Add Notes" className="glyphy button" onClick={this.createNoteEvent.bind(this)} ><Glyphicon glyph="plus" /></button>

                {this.state.showButton === true ? <button className="glyphy button"
                     onClick={this.updateCurrentNotes.bind(this)}> <Glyphicon glyph="menu-up" /> </button> :
                    <button className="button glyphy" onClick={this.hideNotesHistoryOnClick.bind(this)} ><Glyphicon glyph="menu-down" /></button>}

                  {/* <button className="glyphy button removeComp" onClick={this.removeComponent.bind(this)} > <Glyphicon glyph="remove-circle" /> </button> */}

                  </div>
              </div>
          <div>
            {this.state.displayList === true ? <ul id="noteItem">{ this.createNoteList() }</ul> : ""}
          </div>
        </div>
      );
    }
  }

export default Notepad;
