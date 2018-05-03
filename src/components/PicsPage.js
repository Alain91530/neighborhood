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



  render() {

    let picUrls = this.props.picUrls;
    let Urls = picUrls.slice(0, Math.min(11,picUrls.length));
    console.log(Urls)
    return (
    
      <div>
        <Header />
        <div className="pics-container">
          <h2>Photos around</h2>
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