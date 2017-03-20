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
import {browserHistory} from 'react-router'
var config = require('../../config');

class Artboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      access: false
    };
  }

  componentWillMount() {
    if(this.props.notLoggedIn()){
      browserHistory.push('/login')
    }
  }

  saveLayoutEvent() {
    $.ajax ({
      method: 'PUT',
      url: config.serverRoute + '/savelayout',
      data: JSON.stringify(this.state),
      contentType: 'application/json'
    });
  }

  onLayoutChange(layout){
    console.log('NEW LAYOUT', layout)
  }

  render() {
    var layouts = [
      {i: '1', x: 0, y: 0, w: 3, h: 3},
      {i: '2', x: 3, y: 0, w: 3, h: 3},
      {i: '3', x: 6, y: 0, w: 3, h: 9},
      {i: '4', x: 0, y: 3, w: 6, h: 3},
      {i: '5', x: 0, y: 6, w: 6, h: 3 }
    ];
    return (
    	<div id="artboard">
        <ReactGridLayout className="layout" layout={layouts} onLayoutChange={this.onLayoutChange}
          cols={12} rowHeight={30} width={1200}>
          <div key={"1"} className="comps" id="goals"><Goals username={this.props.realUsername}/></div>
          <div key={"3"} className="comps" className="paper" id="journal"><Journal username={this.props.realUsername}/></div>
          <div key={"4"} className="comps" id="notepad"><Notepad username={this.props.realUsername}/></div>
          <div key={"2"} className="comps" id="todo"><Todo username={this.props.realUsername}/></div>
          <div key={"5"} className="comps" id="calendar"><Calendar username={this.props.realUsername}/></div>
        </ReactGridLayout>
    	</div>
    );
  }
}

export default Artboard;
