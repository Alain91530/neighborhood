import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'
import MapStyle from '../data/MapStyle';
import '../styles/App.css';



export const MyMap = compose(

  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDB59_aZ7Ln3BKuH51US0pyaM5vbqkKhrI',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div className="map" style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,

)((props) => (
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{ lat: 43.591236, lng: 3.258363 }}
    defaultOptions={{ styles: MapStyle}}
  > { props.placesOfInterest.map(point => (
      <Marker
        key={point.id}
        position={point.position}
        animation={ window.google.maps.Animation.DROP}
        icon='icons/monument-historique.png'
        >
        <InfoBox>
          <div className="info-point" tabIndex='0'>
          <div >
            <p>{ point.translatedTitle }</p>
          </div>
          </div>
        </InfoBox>
      </Marker>
    ))
    }
  </GoogleMap>
));


