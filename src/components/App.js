

import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import {MyMap} from './MyMap';
import SideBar from './SideBar';
import Header from './Header';
import '../styles/App.css';
import Places from '../data/places';




class App extends Component {

  state = {
    pointsOfInterest : []
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
  }
  render() {

    const pointsOfInterest = this.state.pointsOfInterest;

    return (

      <div>
        <Header />
        <div className="container">
          <SideBar />

          <div className="map-container">
            <MyMap
              placesOfInterest={pointsOfInterest}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
