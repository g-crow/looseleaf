import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import $ from 'jquery';

$("#logout").on('click', function(event){
  document.cookie = "";
  browserHistory.push('/login');
})

class Logout extends Component{

  render() {
    return (
      <div>
        <form>
          <input type="button" className="Logout" id="logout" value="Logout" />
        </form>
    </div>
    )
  }
}
export default Logout;
