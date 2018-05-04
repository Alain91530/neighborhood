import React, { Component } from 'react';         // eslint-disable-line no-unused-vars

import {MyMap} from './MyMap';                    // eslint-disable-line no-unused-vars
import {searchPicByPosition, getPic} from '../utils/FlickrAPI'; // eslint-disable-line no-unused-vars
import SideBar from './SideBar';                  // eslint-disable-line no-unused-vars
import Header from './Header';                    // eslint-disable-line no-unused-vars
import Footer from './Footer';                    // eslint-disable-line no-unused-vars

import Places from '../data/places';              // eslint-disable-line no-unused-vars
import Translation from '../data/translation';    // eslint-disable-line no-unused-vars

import '../styles/App.css';

class PicsPage extends Component {

  render() {

    const { selectedId, searchedPoints } = this.props;
    let pageTitle=searchedPoints.filter( point => (selectedId===point.id))[0];
    let picUrls = this.props.picUrls;
    picUrls = picUrls.slice(0, Math.min(10,picUrls.length));

    return (
      <div>
        <Header />
        <div className="pics-container">
          <h2 className="pics-title">Photos about {pageTitle.translatedTitle} on Flickr</h2>
          {picUrls.map((url) =>
            <img className="pic-of-place" src={url} alt="" />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default PicsPage;