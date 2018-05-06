import React, { Component } from 'react';         // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars

import {MyMap} from './MyMap';                    // eslint-disable-line no-unused-vars
import {searchPicByPosition, getPic} from '../utils/FlickrAPI'; // eslint-disable-line no-unused-vars
import SideBar from './SideBar';                  // eslint-disable-line no-unused-vars
import Header from './Header';                    // eslint-disable-line no-unused-vars
import Footer from './Footer';                    // eslint-disable-line no-unused-vars

import Places from '../data/places';              // eslint-disable-line no-unused-vars
import Translation from '../data/translation';    // eslint-disable-line no-unused-vars

import '../styles/App.css';

class PicsPage extends Component {

  componentWillUnmount() {
    this.props.resetQuery();
  }

  render() {

    const { selectedId, searchedPoints } = this.props;
    let pageTitle=searchedPoints.filter( point => (selectedId===point.id))[0];
    let pics = this.props.pics;
    pics = pics.slice(0, Math.min(8,pics.length));

    return (
      <div>
        <Header />
        <Link to =  '/' className = "back-to-map">
          <p>Back to map</p>
        </Link>

        <div className="pics-container">
          <h2 className="pics-title">Photos about {pageTitle.translatedTitle} on Flickr</h2>
          {pics.map((pic) =>
            <img
              className="pic-of-place"
              key={pic.key}
              src={pic.url}
              alt={pic.alt}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default PicsPage;