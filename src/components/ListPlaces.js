import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

class ListPlaces extends Component {

  render() {
    const places=this.props.places;
    let placesListed=[];
    console.log(Math.min(11,places.length))
    for (let i=0; i<Math.min(21,places.length); i++) {
      placesListed[i] = places[i];
    }

    return (
      <ul className="list-of-places">
        {placesListed.map(place => (
          <li className="place-listed">
            <p>{place.title}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default ListPlaces;