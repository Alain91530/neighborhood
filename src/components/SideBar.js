import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';  // eslint-disable-line no-unused-vars

import SearchPlace from './SearchPlace';  // eslint-disable-line no-unused-vars
import ListPlaces from './ListPlaces';    // eslint-disable-line no-unused-vars
import ShowPlace from './ShowPlace';      // eslint-disable-line no-unused-vars



class SideBar extends Component {

  render() {
    const { places, pics, listElementClicked, updateQuery } =this.props;

    return(
      <aside className= "sidebar">
        <h4 className = "sidebar-title"> Search a place or a monument</h4>
        <SearchPlace
          updateQuery = { updateQuery }
        />
        <ListPlaces
          places= {places}
          listElementClicked = { listElementClicked }
        />
        <ShowPlace
          pics = {pics}
        />
        {(pics.length>1) && (<div className="pics-link"><Link
          
          to='/pics'>More photos</Link></div>)}

      </aside>
    );
  }
}

export default SideBar;