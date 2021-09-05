import React, { useState } from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import Marker from './Marker';

export class GMap extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDn0GOiOz_vsprzRg7FMoT8moIjA8XPZck'
})(GMap)