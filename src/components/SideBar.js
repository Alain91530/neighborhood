import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
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
          picUrl = {this.props.picUrl}
        />
      </aside>
    );
  }
}

export default SideBar;