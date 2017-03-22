import React, { Component } from 'react';
import {browserHistory} from 'react-router';

class Home extends Component {

  componentWillMount() {
    if(this.props.notLoggedIn()){
      browserHistory.push('/login')
    }
    browserHistory.push('/artboard')
  }

  render() {
    return (
      <h1>hommmeeee...</h1>
    )
  }
}

export default Home;
