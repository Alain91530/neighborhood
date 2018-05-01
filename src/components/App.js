

import React, { Component } from 'react';         // eslint-disable-line no-unused-vars
import escapeRegExp from 'escape-string-regexp';

import {MyMap} from './MyMap';                    // eslint-disable-line no-unused-vars
import SideBar from './SideBar';                  // eslint-disable-line no-unused-vars
import Header from './Header';                    // eslint-disable-line no-unused-vars

import Places from '../data/places';
import Translation from '../data/translation';

import '../styles/App.css';

class App extends Component {

  state = {
    mapCenter: { lat: 43.591236, lng: 3.258363 },
    zoom: 9,
    pointsOfInterest : [],
    searchedPoints:[],
    query : '',
    selectedId: -1
  }

  componentDidMount() {
    // Get the json files containing the places of interest
    // and translation then construct one array with translation
    // French title is keeped to search wikimedia.
    // Source of data wikipedia kml file created with open data
    // project of french government mérimée(historical monuments of
    // France). Json convetion and translation by Alain Cadenat

    let myPlaces= Places;
    const translatedPlaces= Translation;
    for (let i=0;i<myPlaces.length; i++) {
      myPlaces[i].translatedTitle = translatedPlaces[i].translatedTitle;
    }

    // Update the state to render the markers
    this.setState({pointsOfInterest: myPlaces});
    this.setState({searchedPoints: myPlaces});
  }

  markerClicked=(point) => {
    console.log(point);
    this.setState({selectedId: point.id})
  }

  updateQuery = (query) => {
    let searchedPoints = this.state.searchedPoints;
    const pointsOfInterest = this.state.pointsOfInterest;
    /*
    * No need to search for places if query is empty (after backspacing or
     * deleting), but we need to set the new state
     */

    // Update the query
    this.setState({query});
    if ( query ) {
      const match = new RegExp( escapeRegExp( query ), 'i' );
      searchedPoints = pointsOfInterest.filter( point => match.test( point.translatedTitle ) );
    }
    else {
      searchedPoints = pointsOfInterest;
    }

    this.setState({searchedPoints});

  }

  render() {

    const searchedPoints = this.state.searchedPoints;
    const selectedId = this.state.selectedId;
    const mapCenter = this.state.mapCenter;
    const zoom= this.state.zoom;

    return (

      <div>
        <Header />
        <div className="container">
          <SideBar
            placesToList = { searchedPoints }
            updateQuery = { this.updateQuery }
          />
          <div className="map-container">
            <MyMap
              mapCenter = { mapCenter }
              zoom = { zoom }
              placesOfInterest={ searchedPoints }
              selectedId={ selectedId }
              markerClicked={this.markerClicked}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
