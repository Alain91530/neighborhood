

import React, { Component } from 'react';         // eslint-disable-line no-unused-vars
import escapeRegExp from 'escape-string-regexp';

import {MyMap} from './MyMap';                    // eslint-disable-line no-unused-vars
import SideBar from './SideBar';                  // eslint-disable-line no-unused-vars
import Header from './Header';                    // eslint-disable-line no-unused-vars

import Places from '../data/places';

import '../styles/App.css';

class App extends Component {

  state = {
    pointsOfInterest : [],
    searchedPoints:[],
    query : ''
  }

  componentDidMount() {
    // Get the json file containing the places of interest
    // Source of data wikipedia kml file converted to json
    let myPlaces= Places;
    // Add an id to be used as a key by react to avoid warning
    // when using .map.
    for (let i=0; i<myPlaces.length; i++) {
      myPlaces[i].id=i;
    }
    // Update the state to render the markers
    this.setState({pointsOfInterest: myPlaces});
    this.setState({searchedPoints: myPlaces});
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
      searchedPoints = pointsOfInterest.filter( point => match.test( point.title ) );
    }
    else {
      searchedPoints = pointsOfInterest;
    }

    this.setState({searchedPoints});

  }

  render() {

    const pointsOfInterest = this.state.pointsOfInterest;
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
