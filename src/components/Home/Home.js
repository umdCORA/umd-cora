import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      showNarrowSearch: false,
      narrowSearchItemButtonBackgroundColor: '#DEDEDE',
      narrowSearchItemButtonTextColor: 'black',
      narrowSearchOptions: {
        resourceTypes: [],
        distanceInMiles: 5,
        transporation: '',
        Demographic: '',
      }
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

  renderResourceTypeButton = (text) => {
    const { narrowSearchOptions } = this.state;
    const {resourceTypes } = narrowSearchOptions;

    const buttonStyle = {
      'backgroundColor': resourceTypes.includes(text.toLowerCase()) ? '#8D9DF9' : '#DEDEDE',
      'color': resourceTypes.includes(text.toLowerCase()) ? 'white' : 'black'
    }

    const handleResourceTypeButtonClick = () => {
      const { narrowSearchOptions } = this.state;
      const { resourceTypes } = narrowSearchOptions;

      const updatedResourceTypes = resourceTypes.includes(text.toLowerCase()) ? narrowSearchOptions.resourceTypes.filter(type => type !== text.toLowerCase()) : narrowSearchOptions.resourceTypes.concat(text.toLowerCase())

      this.setState({
        narrowSearchOptions: {
          ...narrowSearchOptions,
          resourceTypes: updatedResourceTypes
        }
      });
    }

    return (
      <Button className="shadow-none" id="pill-button" onClick={handleResourceTypeButtonClick} style={buttonStyle}>{text}</Button>
    );
  }

  renderTransportationButton = (text) => {
    const { narrowSearchOptions } = this.state;

    const buttonStyle = {
      'backgroundColor': narrowSearchOptions.transportation === text.toLowerCase() ? '#8D9DF9' : '#DEDEDE',
      'color': narrowSearchOptions.transportation === text.toLowerCase() ? 'white' : 'black'
    }

    const handleTransportationButtonClick = () => {
      this.setState({
        narrowSearchOptions: {
          ...narrowSearchOptions,
          transportation: text.toLowerCase()
        }
      });
    }

    return (
      <Button className="shadow-none" id="pill-button" onClick={handleTransportationButtonClick} style={buttonStyle}>{text}</Button>
    );
  }

  renderDemographicButton = (text) => {
    const { narrowSearchOptions } = this.state;

    const buttonStyle = {
      'backgroundColor': narrowSearchOptions.transportation === text.toLowerCase() ? '#8D9DF9' : '#DEDEDE',
      'color': narrowSearchOptions.transportation === text.toLowerCase() ? 'white' : 'black'
    }

    const handleDemographicButtonClick = () => {
      this.setState({
        narrowSearchOptions: {
          ...narrowSearchOptions,
          transportation: text.toLowerCase()
        }
      });
    }
    return (
      <Button className="shadow-none" id="pill-button" onClick={handleDemographicButtonClick} style={buttonStyle}>{text}</Button>
    );
  }
  
  handleMileDropdownChange = event => {
    const { narrowSearchOptions } = this.state;

    this.setState({
      narrowSearchOptions: {
        ...narrowSearchOptions,
        distanceInMiles: parseInt(event.target.value)
      }
    });
  }

  renderNarrowSearch = () => {
    const { narrowSearchOptions } = this.state;
    const { distanceInMiles } = narrowSearchOptions;
    return (
      <Card className="narrow-search-card">
        <Card.Body className="narrow-search-field-card" style={{'marginTop': '10px'}}>
          <div className="narrow-search-field-title"> Resource Type:(select multiple bubbles)</div>
          <div>
            <div style={{'marginBottom': '20px'}}>
              {this.renderResourceTypeButton('Prevention')}
              {this.renderResourceTypeButton('Awareness')}
              {this.renderResourceTypeButton('Advocacy')}
            </div>
            <div style={{'marginBottom': '20px'}}>
              {this.renderResourceTypeButton('Harm Reduction')}
              {this.renderResourceTypeButton('Naloxone Distributor')}
              {this.renderResourceTypeButton('Overdose Response Center')}
            </div>
            <div>
              {this.renderResourceTypeButton('Recovery')}
              {this.renderResourceTypeButton('Support Groups')}
              {this.renderResourceTypeButton('Grief/Loss')}
            </div>
          </div>
        </Card.Body>
        <Card.Body className="narrow-search-field-card">
          <div style={{'flexDirection': 'column'}}>
            <div style={{'display': 'flex'}}>
              <div className="narrow-search-field-title">Distance in Miles</div>
              <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Control as="select" value={distanceInMiles} onChange={this.handleMileDropdownChange} custom>
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <div style={{'display': 'flex'}}>
              <div className="narrow-search-field-title">Transportation</div>
              <div>
                {this.renderTransportationButton('Bus')}
                {this.renderTransportationButton('Metro')}
                {this.renderTransportationButton('Center-Provided')}
              </div>
            </div>
          </div>
        </Card.Body>
        <Card.Body className="narrow-search-field-card">
          <div className="narrow-search-field-title">Demographic:</div>
          <div>
            {this.renderDemographicButton('Male')}
            {this.renderDemographicButton('Female')}
            {this.renderDemographicButton('Teen')}
            {this.renderDemographicButton('Homeless')}
            {this.renderDemographicButton('LGBTQ')}
            {this.renderDemographicButton('Veteran')}
          </div>
        </Card.Body>
      </Card>
    );
  }

  render(){
    const { showNarrowSearch } = this.state;
    return (
      <div className="Home">
        <Container fluid className="top-container">
          <Row className="justify-content-md-center">
            <Col className="col-8">
              <h3 className="home-main-text">Millions of Americans Have an Opiod-Use Disorder and Even More Misuse Them. <br/> Help is available.</h3>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="col-8">
              {this.renderAutoCompleteSearch()}
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="col-8 narrow-search-button-col">
              <Button className="justify-content-md-start shadow-none" id="narrow-search-button" onClick={() => this.setState({showNarrowSearch: !this.state.showNarrowSearch})}>Narrow Search >></Button>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="col-8">
              {showNarrowSearch && this.renderNarrowSearch()}
            </Col>
          </Row>
        </Container>
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
