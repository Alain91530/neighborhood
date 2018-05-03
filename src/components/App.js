

import React, { Component } from 'react';         // eslint-disable-line no-unused-vars
import escapeRegExp from 'escape-string-regexp';
import { BrowserRouter, Route } from 'react-router-dom'; // eslint-disable-line no-unused-vars

import {MyMap} from './MyMap';                          // eslint-disable-line no-unused-vars
import {searchPicByPosition, getPic} from '../utils/FlickrAPI'; // eslint-disable-line no-unused-vars
import SideBar from './SideBar';                  // eslint-disable-line no-unused-vars
import Header from './Header';                    // eslint-disable-line no-unused-vars
import Footer from './Footer';                    // eslint-disable-line no-unused-vars

import Places from '../data/places';
import Translation from '../data/translation';

import '../styles/App.css';
import PicsPage from './PicsPage';

class App extends Component {

  state = {
    mapCenter: { lat: 43.591236, lng: 3.258363 },
    zoom: 9,
    pointsOfInterest : [],
    searchedPoints:[],
    query : '',
    selectedId: -1,
    mouseOverId: -1,
    picUrls: []
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

  infoBoxClosed=() => {
    this.setState({mapCenter: { lat: 43.591236, lng: 3.258363 }});
    this.setState({zoom: 9});
    this.setState({selectedId: -1});
    this.setState({picUrls:''});
  }

  markerClicked=(point) => {
    searchPicByPosition(point)
      .then((resp) => {
        let picUrls = getPic(resp.photos.photo);
        this.setState({picUrls: picUrls})
      })
      .catch ((error) => {console.log(error)})
    this.setState({mapCenter: point.position});
    this.setState({zoom: 15});
    this.setState({mouseOverId: -1});
    this.setState({selectedId: point.id});
    
  }

  markerOut=() => {
    this.setState({mouseOverId: -1});
  }

  markerOver=(point) => {
    this.setState({mouseOverId: point.id});
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
    const mouseOverId = this.state.mouseOverId;
    const mapCenter = this.state.mapCenter;
    const zoom= this.state.zoom;
    const picUrls = this.state.picUrls;

    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' render = {() => (
            <div>
              <Header
              />
              <div className="container">
                <SideBar
                  placesToList = { searchedPoints }
                  picUrls = {picUrls}
                  updateQuery = { this.updateQuery }
                  listElementClicked = { this.markerClicked }
                />

                <div className="map-container">
                  <MyMap
                    mapCenter = { mapCenter }
                    zoom = { zoom }
                    placesOfInterest={ searchedPoints }
                    selectedId={ selectedId }
                    picUrls = {picUrls}
                    mouseOverId = { mouseOverId}
                    markerClicked={this.markerClicked}
                    markerOver={this.markerOver}
                    markerOut={this.markerOut}
                    infoBoxClosed={this.infoBoxClosed}
                  />
                </div>
              </div>
        
              <Footer />
            </div>
          )}/>
          <Route path='/pics' render= {() => (
            <div className="pics-container">

              <PicsPage
                picUrls = {picUrls}
                searchedPoints = {searchedPoints}
              />
            </div>
          )} />
        </div>

      </BrowserRouter>
    );
  }
}

export default App;
