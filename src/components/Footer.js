/**
 * @description FEND Project 8 : Neighborhood
 * @description Footer component
 * @author Alain Cadenat
 * @version 1.0
 */
/**
 * @description import React and Component
 */
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

/**
 * @description component to render a fixed footer
 */
class Footer extends Component {

  render() {
    return(
      <footer className="footer">
        <p className="footer-text">Developpé par A. Cadenat. Données: Gouvernement français projet open data 
         Monuments Historiques Mérimée. Photos fournies par Flickr</p>
      </footer>
    );
  }
}

export default Footer;