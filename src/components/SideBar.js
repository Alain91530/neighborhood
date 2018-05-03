import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { BrowserRouter, Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars

import SearchPlace from './SearchPlace';
import ListPlaces from './ListPlaces';
import ShowPlace from './ShowPlace';


class SideBar extends Component {

  render() {
    const places=this.props.placesToList;

    return(
      <aside className= "sidebar">
        <h2>Menu</h2>
        <SearchPlace 
          updateQuery = { this.props.updateQuery }
        />
        <ListPlaces
          places= {places}
          listElementClicked = {this.props.listElementClicked}
        />
        <ShowPlace
          picUrls = {this.props.picUrls}
        />
        {(this.props.picUrls.length>1) && (<Link to='/pics'>>More photos</Link>)}

      </aside>
    );
  }
}

export default SideBar;