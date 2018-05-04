import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

class ShowPlace extends Component {

  static propTypes = {
    picUrls: PropTypes.array.isRequired
  }

  render () {
    const picUrls=this.props.picUrls;

    return (

      <div className="pic-container">
        {(picUrls.length!==0) && (<img className="pic-of-place" src={picUrls[0]} alt="" />)}
      </div>
    );
  }
}

export default ShowPlace;