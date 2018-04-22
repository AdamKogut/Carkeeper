import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

//import './GoogleMap.css';

export class GoogleMap extends Component {
  renderMarkers = () => {
    let arr = [];
    for (let i in this.props.addresses) {
      arr.push(
        <Marker
          title={this.props.addresses[i].address}
          position={{ lat: this.props.addresses[i].lat, lng: this.props.addresses[i].lng }}
        />
      )
    }
    return arr;
  }

  render() {
    return (
      <Map google={this.props.google} zoom={14} style={{ width: '92.5%', height: '200px', position: 'relative' }} initialCenter={{ lat: this.props.addresses[0].lat, lng: this.props.addresses[0].lng }}>
        {this.renderMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDCc_iTN4KNj7Fr3yNI7gCHSzDG8AyWQ0Q'
})(GoogleMap)
