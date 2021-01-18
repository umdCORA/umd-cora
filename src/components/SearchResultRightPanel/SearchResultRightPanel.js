import React from 'react';
import Card from 'react-bootstrap/Card';

import './SearchResultRightPanel.css';

const formatAddressString = (address, city, state, zipcode) => `${address} ${city}, ${state}, ${zipcode}`;

class SearchResultRightPanel extends React.Component {

  renderCard = (result, index)  => {
    const {
      lat,
      long,
    } = this.props
    const {
      location,
      contact,
      name,
      tags,
      _id,
    } = result;
    const {
      address,
      city,
      state,
      zipcode,
      distance,
    } = location;
    const {
      phone,
      email
    } = contact

    const distanceInMiles = Math.round(distance * 100) / 100;
    return (
      <Card id="result-card" key={index}>
        <Card.Header id="result-card-header">
          <span className="header-title">{name}</span>
          <span className="header-mile">{distanceInMiles} mi</span>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Address: {formatAddressString(address, city, state, zipcode)}
            <br/>
            Email: {email}
            <br/>
            Phone: {phone}
          </Card.Text>
          <Card.Text>
            Services: {tags.join(", ")}
          </Card.Text>
          <Card.Text>
              <a href={`/resource-page/${_id}/${lat}/${long}`} target="_blank" rel="noopener noreferrer">Click the card for more information</a>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  render() {
    const {
      searchResults,
    } = this.props;
    
    return (
      <div className="search-result-right-panel">
        {searchResults && searchResults.map((result, index) => this.renderCard(result, index + 1))}
      </div>
    );
  }
}

export default SearchResultRightPanel;
