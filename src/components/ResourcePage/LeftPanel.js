import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Button from 'react-bootstrap/Button';

import './LeftPanel.css';

const formatAddressString = (address, city, state, zipcode) => `${address} ${city}, ${state}, ${zipcode}`;

class LeftPanel extends React.Component {

  render() {
    const {
      location,
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
      minHeight: '250px',
      maxHeight: '1000px',
      flexGrow: '1',
      overflow: 'visible',
      width: '100%',
    };

    return (
      <div className="LeftPanel">
        <h2 style={{fontWeight: 'bold', marginBottom: '0px'}}>Location</h2>
        <div className="address" style={{display: 'flex'}}>
          <span className="address-blurb" style={{flexGrow: 1, alignSelf: 'center'}}>{formatAddressString(address, city, state, zipcode)}</span>
          <Button
            className="shadow-none"
            href={`https://www.google.com/maps/dir/?api=1&destination=${targetLat},${targetLong}`}
            target="_blank"
            style={{backgroundColor: '#8D9DF9', borderColor: '#8D9DF9', marginBottom: '0.5rem'}}
          >
            Directions
          </Button>
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
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(LeftPanel);
