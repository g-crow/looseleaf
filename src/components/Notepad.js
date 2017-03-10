import React, { Component } from 'react';

class Notepad extends Component {
  render() {
    return (
        <form>
       		<textarea placeholder="Notes" />
       	</form>
    );
  }
}

export default Notepad;