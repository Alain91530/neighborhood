/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */

class SearchPlace extends Component {

  static propTypes = {
    updateQuery: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
  }


  render() {
    const { updateQuery, query, ariaHidden} = this.props;
    return (
      <div
        id="place-search"
        title= "Place searching menu"
        aria-hidden = {ariaHidden}>
        <input
          className='search-place'
          type='text'
          placeholder='Search a place by name or monument'
          title="Search a monument"
          value={query}
          onChange = {(event) => updateQuery(event.target.value)}
        />
      </div>
    );
  }
}

export default SearchPlace;


