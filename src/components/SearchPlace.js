import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchPlace extends Component {

  static propTypes = {
    updateQuery: PropTypes.func.isRequired
  }


  render() {
    const { updateQuery } = this.props;
    let query;

    return (
      <div>
        <input
          className='search-place'
          type='text'
          placeholder='Search for a place'
          value={query}
          onChange = {(event) => updateQuery(event.target.value)}
        />
      </div>
    );
  }
}

export default SearchPlace;


