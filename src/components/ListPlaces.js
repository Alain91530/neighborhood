import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';


class ListPlaces extends Component {

  static propTypes = {
    places: PropTypes.array.isRequired,
    listElementClicked: PropTypes.func.isRequired
  }

  render() {
    const { places, listElementClicked, selectedId } = this.props;
    let placesListed=[];

    for (let i=0; i<places.length; i++) {
      placesListed[i] = places[i];
    }

    return (
      <ul className="list-of-places">
        {placesListed.map(place => {
          let placeClass='';
          (place.id===selectedId) ? placeClass = 'place-listed selected' : placeClass= 'place-listed';
          return(
          <li
            key= {place.id}
             className={placeClass}
            onClick = { () => listElementClicked(place)}
          >
            <p>{place.translatedTitle}</p>
          </li>
        )})}
      </ul>

    );
  }
}

export default ListPlaces;