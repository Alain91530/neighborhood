import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

class ShowPlace extends Component {
    
  render () {
    const picUrl=this.props.picUrl;

    return (
      
      <div className="pic-container">
        {( this.props.picUrl.length!=0) && (<img className="pic-of-place" src={picUrl} alt="" />)}
      </div>
    );
  }
}

export default ShowPlace;