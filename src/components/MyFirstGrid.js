import React, {Component} from 'react'
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
// var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;

class MyFirstGrid extends Component {
  render() {
    var layouts;
    return (
      <ResponsiveReactGridLayout className="layout" layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        <div key={"1"}>1</div>
        <div key={"2"}>2</div>
        <div key={"3"}>3</div>
      </ResponsiveReactGridLayout>
    )
  }
};
export default MyFirstGrid;
