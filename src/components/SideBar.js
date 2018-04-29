import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import SearchPlace from './SearchPlace';

class SideBar extends Component {

  render() {
    return(
      <aside className= "sidebar">
        <h2>Menu</h2>
        <SearchPlace />
      </aside>
    );
  }
}

export default SideBar;