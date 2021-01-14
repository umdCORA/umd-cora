import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Button from 'react-bootstrap/Button';

import './LeftPanel.css';

const formatAddressString = (address, city, state, zipcode) => `${address} ${city}, ${state}, ${zipcode}`;

class LeftPanel extends React.Component {
  render() {
    const {
      name,
      location,
      distance,
      targetLat,
      targetLong,
    } = this.props;
    const {
      address,
      city,
      state,
      zipcode,
    } = location;

    const mapStyle = {
      position: 'relative',
      height: '250px',
      width: '600px',
    };

    return (
      <div className="LeftPanel">
        <h1 className="title">{name}</h1>
        <div className="map-header">
          <h2 style={{fontWeight: 'bold'}}>Location</h2>
          <h2>{distance} Miles</h2>
        </div>
        <Map
          google={this.props.google}
          initialCenter={{
            lat: targetLat,
            lng: targetLong
          }}
          containerStyle={mapStyle}
        >
          <Marker />
        </Map>
        <div className="address-blurb">
          {formatAddressString(address, city, state, zipcode) }
          <Button
            className="shadow-none"
            href={`https://www.google.com/maps/dir/?api=1&destination=${targetLat},${targetLong}`}
            target="_blank"
            style={{backgroundColor: '#8D9DF9', borderColor: '#8D9DF9', float: 'right'}}
          >
            Directions
          </Button>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(LeftPanel);
