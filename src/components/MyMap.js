import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'
import MapStyle from '../data/MapStyle';
import ShowPlace from './ShowPlace'
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
  return (

    <GoogleMap
      aria-label="Herault's google map"
      zoom={props.zoom}
      center={props.mapCenter}
      defaultOptions={{ styles: MapStyle}}
      mapTypeId='terrain'
      onTilesLoaded={()=>{
        let map = document.querySelector('iframe');
        map.setAttribute('title','Herault\'s google map')
        console.log(map);
      }}
    > { props.placesOfInterest.map(point => {
        let markerUrl='icons/monument-historique.png';
        if (point.id===props.selectedId) markerUrl='icons/monument-historique-selected.png';
        if (point.id===props.mouseOverId)  markerUrl='icons/monument-historique-hover.png';
        return (
          <Marker
            key={point.id}
            position = {point.position}
            icon = {markerUrl}
            onClick = { () => props.markerClicked(point)}
            onMouseOver = { () => props.markerOver(point)}
            onMouseOut = { () => props.markerOut()}
            title= { point.title }
          >
            {(point.id===props.selectedId) &&  (
              <InfoBox
                onCloseClick={ () => props.infoBoxClosed()} >
                <div className="info-point" tabIndex='0'>
                  <div className="info-title" >
                    <p>{ point.translatedTitle }</p>
                    <ShowPlace
                      pics = {props.pics} />
                  </div>
                </div>
              </InfoBox>)}

          </Marker>
        )})
      }
    </GoogleMap>
  )});


