import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../Config');

class Calendar extends Component {
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

createList(){
  var list = this.state.list;
  return list.map(function(entry){
    return (<li> {entry.entry} </li>)
  })
}

updateCurrentCalendar(){
  var self = this;
  $.ajax ({
    method: 'GET',
    url: config.serverRoute + '/currentCalendar/' + self.state.user
  }).done(function(data) {
    self.setState( {list: data} );
    console.log(self.state.list);
  })
}

createCalendarEvent(){
  $.ajax ({
    method: 'POST',
    url: config.serverRoute + '/createcalendarevent',
    data: JSON.stringify(this.state),
    contentType: 'application/json'
  });
}

    render() {
      return (
        <div>
          <div>
            <ul id="calendarItem">{ this.createList() }</ul>
          </div>
          <form>
          	<input type="text" placeholder="What's coming up?" value={this.state.entry} onChange={this.entryChange.bind(this)} />
            <input type="button" className="textInput" id="createTodo" value="Add New Calendar Item" onClick={this.createCalendarEvent.bind(this)} />
            <input type="button" className="placeholderButton" id="listTasks" value="List Upcoming Calendar Items" onClick={this.updateCurrentCalendar.bind(this)} />
          </form>
        </div>
      );
    }
  }


  export default Calendar;
