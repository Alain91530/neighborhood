import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

class ShowPlace extends Component {

  static propTypes = {
    pics: PropTypes.array.isRequired
  }

  render () {
    const pics=this.props.pics;

    return (

      <div className="pic-container">
        {(pics.length!==0) && (<img className="pic-of-place" src={pics[0].url} alt={pics[0].alt} />)}
      </div>
    );
  }
}

export default ShowPlace;