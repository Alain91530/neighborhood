import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';  // eslint-disable-line no-unused-vars

import SearchPlace from './SearchPlace';  // eslint-disable-line no-unused-vars
import ListPlaces from './ListPlaces';    // eslint-disable-line no-unused-vars
import ShowPlace from './ShowPlace';      // eslint-disable-line no-unused-vars



class SideBar extends Component {

  state = { menuOn: false }

  toggleMenu = () => {
    const menuOn = this.state.menuOn;
    this.setState({ menuOn: !menuOn});
  }

  render() {
    const { places, pics, listElementClicked, updateQuery, query, selectedId } =this.props;
    let classMenu='';
    (this.state.menuOn) ? classMenu='sidebar menu-open' : classMenu='sidebar menu-closed';
    return(
      <aside className= {classMenu}>
        <div
          onClick={ this.toggleMenu }
          className="menu-icon"></div>
        <h4 className = "sidebar-title"> Search a place or a monument</h4>
        <SearchPlace
          query = { query}
          updateQuery = { updateQuery }
        />
        <ListPlaces
          places= {places}
          listElementClicked = { listElementClicked }
          selectedId = { selectedId }
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