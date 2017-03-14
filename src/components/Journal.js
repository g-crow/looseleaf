import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../Config');


class Journal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: config.usernamePlaceholder,
      entry: '',
      date: Date.now(),
      current: true,
      list: []
    };
  }


entryChange(e) {
  this.setState( {entry: e.target.value} )
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
    url: config.serverRoute + '/JournalHistory/' + self.state.user
  }).done(function(data) {
    self.setState( {list: data} );
    console.log(self.state.list);
  })
}

createJournalEntry(){
  $.ajax ({
    method: 'POST',
    url: config.serverRoute + '/createjournalentry',
    data: JSON.stringify(this.state),
    contentType: 'application/json'
  });
}


    render() {
      return (
        <div>
          <div>
            <ul id="journalHistory">{ this.createJournalHistory() }</ul>
          </div>
          <form>
			<textarea placeholder="Journal space!" value={this.state.entry} onChange={this.entryChange.bind(this)} />
			<br />
    		<input type="button" className="textInput" id="createJournalEntry" value="Add Journal Entry" onClick={this.createJournalEntry.bind(this)} />
    		<br />
            <input type="button" className="placeholderButton" id="listTasks" value="List Journal History" onClick={this.updateJournalHistory.bind(this)} />
          </form>
        </div>
      );
    }
  }

export default Journal;