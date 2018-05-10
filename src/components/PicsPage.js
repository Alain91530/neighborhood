/**
 * @description import React and React Router
 */

import React, { Component } from 'react';         // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars

/**
 * @description import components
 */
import {MyMap} from './MyMap';                    // eslint-disable-line no-unused-vars
import {searchPicByPosition, getPic} from '../utils/FlickrAPI'; // eslint-disable-line no-unused-vars
import SideBar from './SideBar';                  // eslint-disable-line no-unused-vars
import Header from './Header';                    // eslint-disable-line no-unused-vars
import Footer from './Footer';                    // eslint-disable-line no-unused-vars

/**
 * @description import css file
 */
import '../styles/App.css';

/**
 * @description Compoent to render the page with pics from Flickr
 */
class PicsPage extends Component {

  /**
   * @description Reset the query to render the default map 
   */
  componentWillUnmount() {
    this.props.resetQuery();
  }

  /**
   * @description render the page
   */
  render() {

    const { selectedId, searchedPoints } = this.props;
    let pics = this.props.pics;
    let pageTitle;
    /**
     * Handle the error case of no place selectec when user click the
     * back arrow of the browser, and set a defaul title and no pic image
     */
    if (selectedId!==-1) {
      pageTitle=searchedPoints.filter( point => (selectedId===point.id))[0];
      pics = pics.slice(0, Math.min(8,pics.length));
    }
    else {
      pageTitle = {translatedTitle: 'no place selected'};
      pics =[{key: 0, url:'icons/no_pic.jpg', alt:'No photo available'}];
    }

    return (
      <div className="pics-page">
        <Header />
        <Link to =  '/' className = "back-to-map">
          <p>Back to map</p>
        </Link>

        <div className="pics-container">
          <h2 className="pics-title">Flickr's photos about: {pageTitle.translatedTitle}</h2>
          {pics.map((pic) =>
            <img
              tabindex="1"
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