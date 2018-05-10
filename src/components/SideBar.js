import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';  // eslint-disable-line no-unused-vars

import SearchPlace from './SearchPlace';  // eslint-disable-line no-unused-vars
import ListPlaces from './ListPlaces';    // eslint-disable-line no-unused-vars
import ShowPlace from './ShowPlace';      // eslint-disable-line no-unused-vars



class SideBar extends Component {

  state = { menuOn: false }

  /**
   * @callback Change the state of the menu hidden or not
   */
  toggleMenu = () => {
    const menuOn = this.state.menuOn;
    this.setState({ menuOn: !menuOn});
  }

  render() {
    const { menuOn } = this.state;
    const { places, pics, listElementClicked, updateQuery, query, selectedId } = this.props;

    /**
     * handle focus for the hidden menu sidebar
     */
    let classMenu='';
    let tabIndex ='';
    (menuOn) ? classMenu='sidebar menu-open' : classMenu='sidebar menu-closed';
    (menuOn) ? tabIndex='0': tabIndex='-1';

    /**
     * render the menu sidebar
     */
    return(
      <aside
        className= {classMenu}>
        <button
          onClick={ this.toggleMenu }
          className="menu-icon"
        >
          toggle menu
        </button>
        <h2 className = "sidebar-title"> Search a place or a monument</h2>
        <SearchPlace
          ariaHidden = { !menuOn }
          query = { query}
          updateQuery = { updateQuery }
          tabIndex = { tabIndex }
        />
        <ListPlaces
          ariaHidden = { !menuOn }
          tabIndex =  { tabIndex }
          query = { query}
          places= {places}
          listElementClicked = { listElementClicked }
          selectedId = { selectedId }
        />
        <ShowPlace
          pics = {pics}
        />
        {(pics.length>1) && (<Link
          className="pics-link"
          to='/pics'> See more photos...</Link>
        )}

      </aside>
    );
  }
}

export default SideBar;