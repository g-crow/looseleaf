 import React, { Component } from 'react';
import $ from 'jquery';
var config = require('../../config');

class Journal extends Component {
 constructor(props) {
   super(props)
   this.state = {
     entry: '',
     date: Date.now(),
     list: [],
     listToDisplay: [],
     displayList: true,
     message: "Today something happened...",
     displayButton: true
   };
 }

 componentWillMount(){
   if(this.props.username){
     this.updateJournalHistory();
   }
 }

 componentWillReceiveProps(nextProps){
   if(this.props.username !== nextProps.username){
     this.updateJournalHistory(nextProps.username);
   }
 }

 entryChange(e) {
   this.setState( {entry: e.target.value} )
 }


   updateJournalHistory(username){
     var self = this;
     username = username || self.props.username
     $.ajax ({
       method: 'GET',
       url: config.serverRoute + '/JournalHistory/' + username
     }).done(function(data) {
       self.setState( {list: data} );
     })
   }

   updateJournalHistoryOnClick(username){
     var self = this;
     username = username || self.props.username
     $.ajax ({
       method: 'GET',
       url: config.serverRoute + '/JournalHistory/' + username
     }).done(function(data) {
       self.setState( {listToDisplay: self.state.list, displayList: true, displayButton: false} );
     })
   }

   hideJournalHistoryOnClick(){
     this.setState( {displayList: false, displayButton: true} )
   }


createJournalHistory(){
 var list = this.state.listToDisplay;
 return list.map(function(entry){
   return (<li> {entry.entry} <br/>
   <br/></li>)
 })
}


blankEntry () {
  this.state.message === "Today something happened..." ? this.setState( {message: "Do not be too timid and squeamish about your actions."} ) : this.setState( {message:  "Today something happened..."} )
}

createJournalEntry(){
if (this.state.entry === "") {
  this.blankEntry();
} else {

 var data = Object.assign({username: this.props.username}, this.state)
 $.ajax ({
   method: 'POST',
   url: config.serverRoute + '/createjournalentry',
   data: JSON.stringify(data),
   contentType: 'application/json'
 }).done(() => {
   this.setState({ entry: ''});
   this.updateJournalHistory();
 })
}

}

  getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd}

  if(mm<10) {
      mm='0'+mm}

  today = mm+'/'+dd+'/'+yyyy;
  return today
  }

   render() {

     if (!this.props.username)
     return (
       <div>Loading...</div>
     )
     return (
       <div className="paper-content">
         <div><h1>Journal Space [{this.getDate()}]</h1>
        </div>
         <div>
           {this.state.displayList === true ? <ul id="journalHistory">{ this.createJournalHistory() }</ul> : ""}
         </div>
         <form>
                 <textarea placeholder={this.state.message} value={this.state.entry} onChange={this.entryChange.bind(this)} />
                 <div className="buttons">
             <input type="button" className="button" id="createJournalEntry" value="Add Journal Entry" onClick={this.createJournalEntry.bind(this)} />
                 {this.state.displayButton === true ? <input type="button" className="button" value="View Journal History" onClick={this.updateJournalHistoryOnClick.bind(this)} /> :
                 <input type="button" className="button" value="Hide Journal History" onClick={this.hideJournalHistoryOnClick.bind(this)} /> }
           </div>
         </form>
       </div>
     );
   }
}



export default Journal;
