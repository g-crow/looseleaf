import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');

class Goals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      date: Date.now(),
      current: true,
      list: [],
      asc: 1,
      message: "I aspire to..."
    };
  }

  componentWillMount(){
    if(this.props.username){
      this.updateGoals();
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.username !== nextProps.username){
      this.updateGoals(nextProps.username);
    }
  }

  entryChange(e) {
    this.setState( {entry: e.target.value} )
  }

  createGoalList(){
    const sortByDate = (a,b) =>
        this.state.asc * (new Date(b.date)-new Date(a.date))
    var list = this.state.list;
    return list
      .sort(sortByDate)
      .filter(entry => entry.current)
      .map((entry) => <GoalItem key={entry._id} entry={entry}
      updateGoals={this.updateGoals.bind(this)}/> )
  }

  updateGoals(username){
    var self = this;
    username = username || self.props.username
    $.ajax ({
      method: 'GET',
      url: config.serverRoute + '/currentgoals/' + username
    }).done(function(data) {
      self.setState( {list: data} );
    })
  }

  blankEntry () {
    this.state.message === "I aspire to..." ? this.setState( {message: "Tell me, what is it you plan to do with your one wild and precious life?" } ) : this.setState( {message:  "I aspire to..."} )
  }

  createGoalEvent(e){
    e.preventDefault()

    if (this.state.entry === ""){
      this.blankEntry();
    } else {

    var data = Object.assign({username: this.props.username}, this.state)
    $.ajax ({
      method: 'POST',
      url: config.serverRoute + '/creategoal',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(()=>{
      this.setState({ entry:'' });
      this.updateGoals();
    })
  }
}

  render() {
    return (
      <div id="goals">
        <div><h1>Goals</h1></div>
        <textarea placeholder={this.state.message}  className='immobile' value={this.state.entry} onChange={this.entryChange.bind(this)} />
        <input type="button" className="button immobile" id="createGoal" value="Add goal" onClick={this.createGoalEvent.bind(this)} />
        <div>
          <ul id="goalItem">{ this.createGoalList() }</ul>
        </div>
      </div>
    );
  }
}

class GoalItem extends Component {

  goalComplete(e){
    console.log("goal complete");
    $.ajax ({
      method: 'PUT',
      url: config.serverRoute + '/goalComplete/' + this.props.entry._id
    }).done(()=>this.props.updateGoals())
  }

  render(){
    return (
      <span id="goalItems">
        <input type="checkbox" name="goalitem"
          onClick={this.goalComplete.bind(this)}/> {this.props.entry.entry}
        <br />
      </span>)
  }
}
export default Goals;
