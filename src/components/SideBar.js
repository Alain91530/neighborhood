import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';  // eslint-disable-line no-unused-vars

import SearchPlace from './SearchPlace';  // eslint-disable-line no-unused-vars
import ListPlaces from './ListPlaces';    // eslint-disable-line no-unused-vars
import ShowPlace from './ShowPlace';      // eslint-disable-line no-unused-vars



class SideBar extends Component {

  render() {
    const { places, picUrls, listElementClicked, updateQuery } =this.props;

    return(
      <aside className= "sidebar">
        <h2>Menu</h2>
        <SearchPlace
          updateQuery = { updateQuery }
        />
        <ListPlaces
          places= {places}
          listElementClicked = { listElementClicked }
        />
        <ShowPlace
          picUrls = {picUrls}
        />
        {(picUrls.length>1) && (<Link
          className="pics-link"
          to='/pics'>>More photos</Link>)}

      </aside>
    );
  }
}

export default SideBar;