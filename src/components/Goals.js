import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');

class Goals extends Component {
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

comp
  updateGoals(){
    var self = this
    $.ajax ({
      method: 'GET',
      url: config.serverRoute + '/goals/' + self.props.username()
    }).done(function(data) {
      self.setState( {list: data} );
      console.log( {list: data } );
    })
  }


  createGoalList(){
    var list = this.state.list;
    return list.map(function(entry){
      return (<li> {entry.entry} </li>)
    })
  }



  createGoalEvent(){
    console.log(this.state)
    $.ajax ({
      method: 'POST',
      url: config.serverRoute + '/creategoal',
      data: JSON.stringify(this.state),
      contentType: 'application/json'
    }).done(this.setState({ entry:'' }));
  }

  render() {
    return (
      <div id="goals">
        <div>
          <ul id="goalItem">{ this.createGoalList() }</ul>
        </div>
        <form>
        	<textarea placeholder="goal item" value={this.state.entry} onChange={this.entryChange.bind(this)} />
        	<div class="buttons">
            <input type="button" className="button" id="createGoal" value="Add goal" onClick={this.createGoalEvent.bind(this)} />
            <input type="button" className="button" id="listGoals" value="List Goals" onClick={this.updateGoals.bind(this)} />
          </div>
        </form>
      </div>
    );
  }
}

export default Goals;
