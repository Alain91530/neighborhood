import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';


class ListPlaces extends Component {

  static propTypes = {
    places: PropTypes.array.isRequired,
    listElementClicked: PropTypes.func.isRequired
  }

  scrollList() {
    const firstPlace = Array.from(document.getElementsByClassName('place-listed'));
    const placeSelected = Array.from(document.getElementsByClassName('selected'));
    if (firstPlace.length) firstPlace[0].scrollIntoView();
    if (placeSelected.length) placeSelected[0].scrollIntoView();
  }

  componentDidMount() {
    this.scrollList();
  }

  componentDidUpdate() {
    this.scrollList();
  }

  render() {
    const { places, listElementClicked, selectedId } = this.props;
    let placesListed=[];
    for (let i=0; i<places.length; i++) {
      placesListed[i] = places[i];
    }

    return (
      <ul className="list-of-places"
        title= "Places of interest"
        tabIndex= {this.props.tabIndex}
        aria-label = 'Places of interest'
        aria-hidden = {this.props.ariaHidden}>
        {placesListed.map(place => {
          let placeClass='';
          (place.id===selectedId) ? placeClass = 'place-listed selected' : placeClass= 'place-listed';
          return(
            <li
            title= "Places of interest"
            tabIndex= {this.props.tabIndex}
            aria-hidden = {this.props.ariaHidden}
              key= {place.id}
              className={placeClass}
              onClick = { () => listElementClicked(place)}
            >
              <p>{place.translatedTitle}</p>
            </li>
          );})}
      </ul>

    );
  }
}

export default ListPlaces;