import React, { Component } from 'react';

class SearchPlace extends Component {

    state = {
      query: ''
    }

    render() {
      let query;
      return (        <div>
        <h1>Test 1</h1>
        <input
          className='search-place'
          type='text'
          placeholder='Search for a place'
          value={query}
          onChange = {(event) => this.props.updateQuery(event.target.value)}
        />
      </div>
      );
    }
}

export default SearchPlace;


