import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchPlace extends Component {

  static propTypes = {
    updateQuery: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
  }


  render() {
    const { updateQuery, query } = this.props;

    return (
      <div>
        <input
          className='search-place'
          type='text'
          placeholder='Place or name, ex church, Aniane'
          title="Search a monument"
          value={query}
          onChange = {(event) => updateQuery(event.target.value)}
        />
      </div>
    );
  }
}

export default SearchPlace;


