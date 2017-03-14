import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../Config');

class Goals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: config.usernamePlaceholder,
      entries: '',
      date: Date.now(),
      current: true,
      list: []
    };
  }

  entryChange(e) {
    this.setState( {entries: e.target.value} )
  }

  createGoalList(){
    var list = this.state.list;
    return list.map(function(entry){
      return (<li> {entry.entries} </li>)
    })
  }

  updateGoals(){
    var self = this;
    $.ajax ({
      method: 'GET',
      url: config.serverRoute + '/goals/' + self.state.user
    }).done(function(data) {
      self.setState( {list: data} );
      console.log(self.state.list);
    })
  }

  createGoalEvent(){
    $.ajax ({
      method: 'POST',
      url: config.serverRoute + '/creategoal',
      data: JSON.stringify(this.state),
      contentType: 'application/json'
    });
  }

  render() {
    return (
      <div>
        <div>
          <ul id="todoItem">{ this.createGoalList() }</ul>
        </div>
        <form>
        	<ul className="goals">
        		<li> <textarea placeholder="goal item" value={this.state.entries} onChange={this.entryChange.bind(this)} /> </li>
        	</ul>
          <input type="button" className="textInput" id="createGoal" value="Add goal" onClick={this.createGoalEvent.bind(this)} />
          <input type="button" className="placeholderButton" id="listGoals" value="List Goals" onClick={this.updateGoals.bind(this)} />
        </form>
      </div>
    );
  }
}

export default Goals;
