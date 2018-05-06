
/**
 * @description import React and router
 */
import React, { Component } from 'react';         // eslint-disable-line no-unused-vars
import { BrowserRouter, Route } from 'react-router-dom'; // eslint-disable-line no-unused-vars

/**
 * @description import components
 */
import {MyMap} from './MyMap';                    // eslint-disable-line no-unused-vars
import SideBar from './SideBar';                  // eslint-disable-line no-unused-vars
import Header from './Header';                    // eslint-disable-line no-unused-vars
import Footer from './Footer';                    // eslint-disable-line no-unused-vars
import PicsPage from './PicsPage';                // eslint-disable-line no-unused-vars

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
import {searchPicByPosition, getPics} from '../utils/FlickrAPI'; // eslint-disable-line no-unused-vars

/**
 * @description import css file for the app
 */
import '../styles/App.css';

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
 * @description callback to close the Infobox and re-zoom and center the map
 */
  infoBoxClosed=() => {
    this.setState({
      mapCenter: { lat: 43.591236, lng: 3.258363 },
      zoom: 9,
      selectedId: -1,
      pics:[]});
  }

  /**
   * @description callback to open the infoboxwhen marker or list is clicked
   */
  markerClicked=(point) => {
    // Get the first pic and render it as quick as possible
    searchPicByPosition(point)
      .then((response) => {
        if (response.photos.total!=='0') {
          let pics = getPics(response.photos.photo, 1);
          Promise.all(pics)
            .then(response => {
              let firstPic = response.map((resp, index) =>(
                {key: index,
                  url: resp,
                  alt: 'Flickr\'s photo around '+this.state.searchedPoints[this.state.selectedId].translatedTitle}));
              this.setState({pics: firstPic});
            });}
        else this.setState({pics: [{url: 'icons/no_pic.jpg', key: 0, alt: 'no photo available'}]})
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
                  alt: 'Flickr\'s photo around '+this.state.searchedPoints[this.state.selectedId].translatedTitle}));
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
   * @description callback to change the marker on pointer out
   */
  markerOut=() => {
    this.setState({mouseOverId: -1});
  }

  markerOver=(point) => {
    this.setState({mouseOverId: point.id});
  }

  /**
   * @description callback to update the list according to query
   */
  updateQuery = (query) => {
    let searchedPoints = this.state.searchedPoints;
    const pointsOfInterest = this.state.pointsOfInterest;
    /**
     * No need to search for places if query is empty (after backspacing or
     * deleting), but we need to set the new state
     */
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
      <BrowserRouter>
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
              />
            </div>
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
