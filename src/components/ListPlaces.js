import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import ShowPlace from './ShowPlace';


class ListPlaces extends Component {

  static propTypes = {
    places: PropTypes.array.isRequired
  }
  render() {
    const places=this.props.places;
    let placesListed=[];
    for (let i=0; i<Math.min(11,places.length); i++) {
      placesListed[i] = places[i];
    }

    return (
      <ul className="list-of-places">
        {placesListed.map(place => (
          <li
            key= {place.id} className="place-listed"
            onClick = { () => this.props.listElementClicked(place)}
          >
            <p>{place.translatedTitle}</p>
          </li>
        ))}
      </ul>

    );
  }
}

export default ListPlaces;