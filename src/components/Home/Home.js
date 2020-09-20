import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    }
  }

  handleSearchChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(res => getLatLng(res[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(e => console.error(e));
  };

  renderAutoCompleteSearch = () => {
    return(
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleSearchChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={suggestion.description}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }

  render(){
    return (
      <div className="Home">
        <Card className="container" id="card-container">
          <Card.Body>
            <h3>Millions of Americans Have an Opiod-Use Disorder and Even More Misuse Them. <br/> Help is available.</h3>
          </Card.Body>
          <Form id="searchForm">
            {this.renderAutoCompleteSearch()}
          </Form>
        </Card>
      </div>
    )
  }
}

export default Home;
