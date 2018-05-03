import React, { Component } from 'react';         // eslint-disable-line no-unused-vars

import {MyMap} from './MyMap';                          // eslint-disable-line no-unused-vars
import {searchPicByPosition, getPic} from '../utils/FlickrAPI'; // eslint-disable-line no-unused-vars
import SideBar from './SideBar';                  // eslint-disable-line no-unused-vars
import Header from './Header';                    // eslint-disable-line no-unused-vars
import Footer from './Footer';                    // eslint-disable-line no-unused-vars

import Places from '../data/places';
import Translation from '../data/translation';

import '../styles/App.css';

class PicsPage extends Component {

    state = {
      pointsOfInterest : [],
      searchedPoints:[],
      query : '',
      selectedId: -1,
      picUrls: []
    }

    render() {

      const searchedPoints = this.state.searchedPoints;

      const picUrls = this.state.picUrls;
    
      return (
    
        <div>
          <Header />
          <div className="container">
            <SideBar
              placesToList = { searchedPoints }
              picUrls = {picUrls}
              updateQuery = { this.updateQuery }
              listElementClicked = { this.markerClicked }
            />
            <div className="pics-container">
<h2>Photos around</h2>
            </div>
            <Footer />
          </div>
        </div>
      );
    }
}

export default PicsPage;