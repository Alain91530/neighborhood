import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MapStyle from '../data/MapStyle';
import '../styles/App.css';



export const MyMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDB59_aZ7Ln3BKuH51US0pyaM5vbqkKhrI',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,

)((props) => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 43.591236, lng: 3.258363 }}
    defaultOptions={{ styles: MapStyle}}
  >
    {
      props.placesOfInterest.map(point => (
        <Marker
          key={point.id}
          position={point.position}
          animation={ window.google.maps.Animation.DROP}
        />
      ))
    }

  </GoogleMap>
));


