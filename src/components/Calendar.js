import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');

class Calendar extends Component {
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
  this.setState( {username: un} )
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
    url: config.serverRoute + '/currentCalendar/' + self.props.username()
  }).done(function(data) {
    self.setState( {list: data} );
  })
}

createCalendarEvent(){
  $.ajax ({
    method: 'POST',
    url: config.serverRoute + '/createcalendarevent',
    data: JSON.stringify(this.state),
    contentType: 'application/json'
  }).done(this.setState({ entry:'' }));
}

    render() {
      return (
        <div>
          <div>
            <ul id="calendarItem">{ this.createList() }</ul>
          </div>
          <form>
          	<input type="text" placeholder="What's coming up?" value={this.state.entry} onChange={this.entryChange.bind(this)} />
            <input type="button" className="button" id="createTodo" value="Add New Calendar Item" onClick={this.createCalendarEvent.bind(this)} />
            <input type="button" className="button" id="listTasks" value="List Upcoming Calendar Items" onClick={this.updateCurrentCalendar.bind(this)} />
          </form>
        </div>
      );
    }
  }


  export default Calendar;
