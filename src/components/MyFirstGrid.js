import React, {Component} from 'react'
import ReactGridLayout from 'react-grid-layout'
import { Resizable, ResizableBox } from 'react-resizable';
// import {Responsive, WidthProvider} from 'react-grid-layout';

export default class MyFirstGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {
      width: 200,
      height: 200,
      message: ""
    };
  }

  onResize = (event, {element, size}) => {
    this.setState({width: size.width, height: size.height});
  };

  onClick = () => {
    this.setState({width: 100, height: 100, message: "you're cool"});
  };

  render() {
  return (

    <div>

    <div>
        <button onClick={this.onClick} style={{'marginBottom': '10px'}}>Reset first element's width/height</button>
    </div>

    <div>
    <Resizable className="box" className="tester1" height={this.state.height} width={this.state.width} onResize={this.onResize}>
            <div className="box" style={{width: this.state.width + 'px', height: this.state.height + 'px'}}>
              <span className="text">{this.state.message}</span>
            </div>
          </Resizable>

      </div>

      </div>
  )
}
}
