/**
 * @description FEND Project 8 : Neighborhood
 * @author Alain Cadenat
 * @version 1.0
 */
/* eslint-disable */
/**
 * @description import React and router
 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/**
 * @description import components
 */
import {MyMap} from './MyMap';
import SideBar from './SideBar';
import Header from './Header';
import Footer from './Footer';
import PicsPage from './PicsPage';

/**
 * @description import json data
 */
import Places from '../data/places';
import Translation from '../data/translation';

/**
 * @description import regexp
 */
import escapeRegExp from 'escape-string-regexp';

/**
 * @description import helper for flikr API
 */
import {searchPicByPosition, getPics} from '../utils/FlickrAPI';

/**
 * @description import css file for the app
 */
import '../styles/App.css';
/* eslint-enable */
/**
 * @description main component
 */
class App extends Component {

/**
 * @description set the default state
 * @type { mapCenter: Object }
 * @type { zoom: Number }
 * @type { pointsOfInterest: Array }
 * @type { searchedPoints: Array }
 * @type { query: String}
 * @type { selectedId: Number}
 * @type { mouseOverId: Number}
 * @type { pics: Array }
 */
  state = {
    mapCenter: { lat: 43.591236, lng: 3.258363 },
    zoom: 9,
    pointsOfInterest : [],
    searchedPoints:[],
    query : '',
    selectedId: -1,
    mouseOverId: -1,
    pics: []
  }
  /**
  * @description Get the json files containing the places of interest
  * @description French title is kept to search Flickr for better results.

  */
  componentDidMount() {
    /**
 * @attribution
 */
    /** Source of data wikipedia kml file created with open data
     *  project of french government mérimée(historical monuments of
     *  France). Json convertion and translation by Alain Cadenat
     */

    let myPlaces= Places;
    const translatedPlaces= Translation;
    for (let i=0;i<myPlaces.length; i++) {
      myPlaces[i].translatedTitle = translatedPlaces[i].translatedTitle;
      myPlaces[i].id = i;
    }
    this.setState({
      pointsOfInterest: myPlaces,
      searchedPoints: myPlaces});
  }

  /**
 * @callback close the Infobox and re-zoom and center the map
 */
  infoBoxClosed=() => {
    this.setState({
      mapCenter: { lat: 43.591236, lng: 3.258363 },
      zoom: 9,
      selectedId: -1,
      pics:[]});
  }

  /**
   * @callback open the infobox when marker or list is clicked
   */
  markerClicked=(point) => {
    // Get the first pic and render it as quick as possible
    this.setState({pics: [{url: 'icons/image-loading.png',key: 0, alt: ''}]});
    searchPicByPosition(point)
      .then((response) => {
        if (response.photos.total!=='0') {
          let pics = getPics(response.photos.photo, 1);
          Promise.all(pics)
            .then(response => {
              let firstPic = response.map((resp, index) =>(
                {key: index,
                  url: resp,
                  alt: 'Flickr\'s photo around '+this.state.pointsOfInterest[point.id].translatedTitle}));
              this.setState({pics: firstPic});
            });}
        else this.setState({pics: [{url: 'icons/no_pic.jpg', key: 0, alt: 'no photo available'}]});
      })
      .catch ((error) => {console.log(error);});


    // Check and get the other pics to prepare works for PicsPage
    searchPicByPosition(point)
      .then((response) => {
        if (response.photos.total>1) {

          let pics = getPics(response.photos.photo, 9);
          Promise.all(pics)
            .then(response => {
              let firstPics = response.map((resp, index) =>(
                {key: index,
                  url: resp,
                  alt: 'Flickr\'s photo around '+this.state.pointsOfInterest[point.id].translatedTitle}));
              this.setState({pics: firstPics});
            });}
      })
      .catch ((error) => {console.log(error);});
    this.setState({
      mapCenter: point.position,
      zoom: 15,
      mouseOverId: -1,
      selectedId: point.id});
  }

  /**
   * @callback change the marker on pointer out
   */
  markerOut=() => {
    this.setState({mouseOverId: -1});
  }

  /**
  * @callback change the marker on pointer over
  */
  markerOver=(point) => {
    this.setState({mouseOverId: point.id});
  }
  /**
  * @callback reset the query
  */
  resetQuery =() => {
    this.updateQuery('');
  }

  /**
   * @callback to update the list according to query
   */
  updateQuery = (query) => {
    let searchedPoints = this.state.searchedPoints;
    const pointsOfInterest = this.state.pointsOfInterest;
    /**
     * No need to search for places if query is empty (after backspacing or
     * deleting), but we need to set the new state
     */
    if (this.state.selectedId!==-1) this.infoBoxClosed();
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

  /**
   * @description render app component
   * uses the react router to allow pages change
   */
  render() {
    const { searchedPoints,
      selectedId,
      mouseOverId,
      mapCenter,
      zoom,
      pics,
      query } = this.state;

    return (
      <Router>
        <div>
          <Route exact path='/' render = {() => (
            <div>
              <Header
              />
              <div className="container">
                <SideBar
                  places = { searchedPoints }
                  pics = {pics}
                  query = {query}
                  selectedId= { selectedId }
                  updateQuery = { this.updateQuery }
                  listElementClicked = { this.markerClicked }
                />

                <div className="map-container">
                  <MyMap
                    mapCenter = { mapCenter }
                    zoom = { zoom }
                    placesOfInterest={ searchedPoints }
                    selectedId={ selectedId }
                    pics = {pics}
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
                pics = { pics }
                searchedPoints = { searchedPoints }
                selectedId ={ selectedId }
                resetQuery = {this.resetQuery}
              />
            </div>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
