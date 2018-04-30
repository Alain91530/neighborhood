import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

class ListPlaces extends Component {

  render() {
    const places=this.props.places;
    let placesListed=[];
    for (let i=0; i<Math.min(21,places.length); i++) {
      placesListed[i] = places[i];
    }

    return (
      <ul className="list-of-places">
        {placesListed.map(place => (
          <li key= {place.id} className="place-listed">
            <p>{place.title}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default ListPlaces;