import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Link } from 'react-router-dom';
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
          <div className="autocomplete-bar offset-md-2">
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
        <Card id="card-search-container">
          <Card.Body className="offset-md-2">
            <h3 className="home-main-text">Millions of Americans Have an Opiod-Use Disorder and Even More Misuse Them. <br/> Help is available.</h3>
          </Card.Body>
          <Form id="searchForm">
            {this.renderAutoCompleteSearch()}
          </Form>
        </Card>
        <Card className="container" id="card-home-blurb-container">
          <Card.Body>
            <div className="card-main-text">
              Welcome to CORAbase, a confidential and anonymous source of information and resources for persons seeking opioid-related resources in the United States or U.S. Territories. We are the nation’s most comprehensive database of resources for opioid-use/addiction treatment, prevention, overdose response, and <b>resources in rural areas.</b>
            </div>
            <div className="card-note-text">
              PLEASE NOTE: Your personal information and the search criteria you enter into the Locator is secure and anonymous. CORA does not collect or maintain any information you provide.
            </div>
            <Link to="/general-info">
              <Button id="learn-cora-button"><b>Learn More About Corabase</b></Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Home;
