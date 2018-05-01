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

)((props) => {
  console.log(props)
  return (
    <GoogleMap
      zoom={props.zoom}
      center={props.mapCenter}
      defaultOptions={{ styles: MapStyle}}
    > { props.placesOfInterest.map(point => {
        let markerUrl='icons/monument-historique.png';
        if (point.id===props.selectedId) markerUrl='icons/monument-historique-selected.png';
        if (point.id===props.mouseOverId)  markerUrl='icons/monument-historique-hover.png';
        return (
          <Marker
            key={point.id}
            position = {point.position}
            animation = { window.google.maps.Animation.DROP}
            icon = {markerUrl}
            onClick = { () => props.markerClicked(point)}
            onMouseOver = { () => props.markerOver(point)}
            onMouseOut = { () => props.markerOut()}
          >
            {(point.id===props.selectedId) &&  (
              <InfoBox
                onCloseClick={ () => props.infoBoxClosed()} >
                <div className="info-point" tabIndex='0'>
                  <div className="info-title" >
                    <p>{ point.translatedTitle }</p>
                  </div>
                </div>
              </InfoBox>)}

          </Marker>
        )})
      }
    </GoogleMap>
  )});


