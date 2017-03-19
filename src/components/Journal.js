import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');

class Journal extends Component {
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
  this.setState( {username:un} )
}

createJournalHistory(){
  var list = this.state.list;
  return list.map(function(entry){
    return (<li> {entry.entry} </li>)
  })
}

updateJournalHistory(){
  var self = this;
  $.ajax ({
    method: 'GET',
    url: config.serverRoute + '/JournalHistory/' + self.props.username()
  }).done(function(data) {
    self.setState( {list: data} );
  })
}

createJournalEntry(){
  $.ajax ({
    method: 'POST',
    url: config.serverRoute + '/createjournalentry',
    data: JSON.stringify(this.state),
    contentType: 'application/json'
  }).done(this.setState({ entry:'' }));
}

    render() {
      return (
        <div className="paper-content">
          <div>
            <ul id="journalHistory">{ this.createJournalHistory() }</ul>
          </div>
          <form>
      			<textarea placeholder="Journal space!" value={this.state.entry} onChange={this.entryChange.bind(this)} />
      			<br />
        		<input type="button" className="button" id="createJournalEntry" value="Add Journal Entry" onClick={this.createJournalEntry.bind(this)} />
        		<br />
            <input type="button" className="button" id="listTasks" value="List Journal History" onClick={this.updateJournalHistory.bind(this)} />
          </form>
        </div>
      );
    }
  }

export default Journal;
