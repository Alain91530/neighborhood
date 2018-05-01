

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
    pointsOfInterest : [],
    searchedPoints:[],
    query : ''
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
    this.setState({pointsOfInterest: [myPlaces[0]]});
    this.setState({searchedPoints: [myPlaces[0]]});
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
              placesOfInterest={ searchedPoints }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
