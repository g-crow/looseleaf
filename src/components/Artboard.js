import React, { Component } from 'react';
// import { Resizable, ResizableBox } from 'react-resizable';
//import {Responsive, WidthProvider} from 'react-grid-layout';
//const ReactGridLayout = WidthProvider(Responsive);
var ReactGridLayout = require('react-grid-layout');
import Goals from './Goals';
import Journal from './Journal';
import Notepad from './Notepad';
import Todo from './Todo';
import Calendar from './Calendar';
import $ from 'jquery';
import {browserHistory} from 'react-router';
var config = require('../../config');
import { Glyphicon } from 'react-bootstrap';

class Artboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      layouts: [],
      removeGoals: false
    };
  }

  componentWillMount() {
    var self = this
    if(this.props.notLoggedIn()){
      browserHistory.push('/login')
    }
  }

  isThereALayout(){
    var self = this
    if (self.state.layouts.length === 0 && this.props.username) {
      $.ajax ({
        method: 'GET',
        url: config.serverRoute + '/getlayout/' + this.props.username
      }).done(function(data) {
        self.setState( {layouts: data || [
          {i: '1', x: 0, y: 0, w: 3, h: 3,},
          {i: '2', x: 3, y: 0, w: 3, h: 3,},
          {i: '3', x: 6, y: 0, w: 3, h: 9,},
          {i: '4', x: 0, y: 3, w: 6, h: 3,},
          {i: '5', x: 0, y: 6, w: 6, h: 3,}
        ]} );
      })
    }
  }

  onClickAddItem(){
    this.setState( {removeGoals: false} )
  }

  onLayoutChange(layout){

    console.log('Changing the layout',this.state)
    $.ajax ({
      method: 'PUT',
      url: config.serverRoute + '/savelayout',
      data: JSON.stringify({
          username: this.props.username,
          layouts: layout
        }),
      contentType: 'application/json'
    });
  }

removeGoals(){
  this.state.layouts.splice(0,1);
  this.state.removeGoals === false ? this.setState( {removeGoals: true} ) :
  this.setState( {removeGoals: true} )
  this.onLayoutChange(this.state.layouts);

}


  render() {
    var layouts = this.state.layouts
    this.isThereALayout();
    if (this.state.layouts.length === 0)
    {
      return ( <div>Loading...</div>)
    }
    if (this.state.layouts.length === 4)
    {
      this.setState( {removeGoals: true} )
    }
    return (

  <div>
    <button className="glyphy button addRemove" id="addComp" onClick={this.onClickAddItem.bind(this)}><Glyphicon glyph="plus" /></button>
    	<div id="artboard">
        <ReactGridLayout className="layout" layout={layouts} onLayoutChange={this.onLayoutChange.bind(this)}
          cols={12} rowHeight={30} width={1200}>
          {this.state.removeGoals === false ? <div key={"1"} className="comps"
            id="goals"><button className="glyphy button addRemove" id="removeComp"
              onClick={this.removeGoals.bind(this)} > <Glyphicon glyph="remove-circle" />
        </button><Goals username={this.props.realUsername}/></div> : <div></div>}
          <div key={"3"} className="comps" id="journal"><Journal username={this.props.realUsername}/></div>
          <div key={"5"} className="comps" id="notepad"><Notepad username={this.props.realUsername}/></div>
          <div key={"2"} className="comps" id="todo"><Todo username={this.props.realUsername}/></div>
          <div key={"4"} className="comps" id="calendar"><Calendar username={this.props.realUsername}/></div>
        </ReactGridLayout>
    	</div>
  </div>
    );
  }
}

export default Artboard;
