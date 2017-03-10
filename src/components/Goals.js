import React, { Component } from 'react';

class Goals extends Component {
  render() {
    return (
        <form>
        	<ul className="goals">
        		<li> <textarea placeholder="goal 1" /> </li>
        	</ul>
        </form>
    );
  }
}

export default Goals;