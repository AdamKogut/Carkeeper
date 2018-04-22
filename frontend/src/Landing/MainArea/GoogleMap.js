import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
//import './GoogleMap.css';

export class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
  }

  renderMarkers = () => {
    // console.log(this.props)
    let arr = [];
    for (let i in this.props.addresses) {
      arr.push(
        <Marker
          title={this.props.addresses[i].address}
          position={{ lat: this.props.addresses[i].lat, lng: this.props.addresses[i].long }}
          key={i}
        />
      )
    }
    return arr;
  }

  render() {
    // console.log(this.props.google)
    if (this.props.addresses[0].lat != null) {
      return (
        <Map google={this.props.google}
          zoom={14}
          style={{ height: '60vh', width:'calc(100% - 50px)', position: 'relative' }}
          initialCenter={{ lat: this.props.addresses[0].lat, lng: this.props.addresses[0].long }}
        >
          {this.renderMarkers()}
        </Map>
      );
    } else {
      return null;
    }
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDaTmBqdniE53unpNDnNQGuk1yz0gBpwy4'
})(GoogleMap)
