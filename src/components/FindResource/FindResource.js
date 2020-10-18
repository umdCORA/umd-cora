import React from 'react';
import SearchBar from 'material-ui-search-bar';
import SearchIcon from '@material-ui/icons/Search';
import Script from 'react-load-script';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import SearchResultLeftPanel from '../SearchResultLeftPanel/SearchResultLeftPanel';
import SearchResultRightPanel from '../SearchResultRightPanel/SearchResultRightPanel';

import './FindResource.css';

class FindResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      showNarrowSearch: false,
      showSearchResults: false,
      narrowSearchOptions: {
        resourceTypeSelection: [],
        distanceInMilesSelection: 5,
        transportationSelection: [],
        demographicSelection: [],
      }
    }
  }

  renderResourceTypeButton = (text) => {
    const { narrowSearchOptions } = this.state;
    const {resourceTypeSelection } = narrowSearchOptions;

    const buttonStyle = {
      'backgroundColor': resourceTypeSelection.includes(text) ? '#8D9DF9' : '#DEDEDE',
      'color': resourceTypeSelection.includes(text) ? 'white' : 'black'
    }

    const handleResourceTypeButtonClick = () => {
      const { narrowSearchOptions } = this.state;
      const { resourceTypeSelection } = narrowSearchOptions;

      const updatedResourceTypes = resourceTypeSelection.includes(text) ? narrowSearchOptions.resourceTypeSelection.filter(type => type !== text) : narrowSearchOptions.resourceTypeSelection.concat(text)

      this.setState({
        narrowSearchOptions: {
          ...narrowSearchOptions,
          resourceTypeSelection: updatedResourceTypes
        }
      });
    }

    return (
      <Button className="shadow-none" id="pill-button" onClick={handleResourceTypeButtonClick} style={buttonStyle}>{text}</Button>
    );
  }

  renderTransportationButton = (text) => {
    const { narrowSearchOptions } = this.state;
    const { transportationSelection } = narrowSearchOptions;

    const buttonStyle = {
      'backgroundColor': transportationSelection.includes(text) ? '#8D9DF9' : '#DEDEDE',
      'color': transportationSelection.includes(text) ? 'white' : 'black'
    }

    const handleTransportationButtonClick = () => {
      const updatedTransportationSelection = transportationSelection.includes(text) ? transportationSelection.filter(type => type !== text) : transportationSelection.concat(text)
      this.setState({
        narrowSearchOptions: {
          ...narrowSearchOptions,
          transportationSelection: updatedTransportationSelection
        }
      });
    }

    return (
      <Button className="shadow-none" id="pill-button" onClick={handleTransportationButtonClick} style={buttonStyle}>{text}</Button>
    );
  }

  renderDemographicButton = (text) => {
    const { narrowSearchOptions } = this.state;
    const { demographicSelection } = narrowSearchOptions;

    const buttonStyle = {
      'backgroundColor': demographicSelection.includes(text) ? '#8D9DF9' : '#DEDEDE',
      'color': narrowSearchOptions.demographicSelection.includes(text) ? 'white' : 'black'
    }

    const handleDemographicButtonClick = () => {
      const updatedDemographicSelection = demographicSelection.includes(text) ? demographicSelection.filter(type => type !== text) : demographicSelection.concat(text)
      this.setState({
        narrowSearchOptions: {
          ...narrowSearchOptions,
          demographicSelection: updatedDemographicSelection
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
          <div className="narrow-search-field-title"> Resource Type:<br/>(select multiple bubbles)</div>
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

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ['(cities)'],
      componentRestrictions: { country: 'usa' }
    };

    // Initialize Google Autocomplete
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete( document.getElementById('autocomplete'), options );

    // Avoid paying for data that you don't need by restricting the
    // set of place fields that are returned to just the address
    // components and formatted address
    this.autocomplete.setFields(['address_components', 'formatted_address']);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect = () => {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState({query: addressObject.formatted_address});
    }
  }

  handleSearch = () => {
    const { query } = this.state;
    if(query) {
      this.setState({ showSearchResults: true });
    }
  }

  render(){
    const {
      showNarrowSearch,
      showSearchResults,
      narrowSearchOptions,
      query,
    } = this.state;

    return (
      <div className="FindResource">
        {!showSearchResults &&
          <Container fluid className="top-container">
            <Row className="justify-content-md-center">
              <Col className="col-8">
                <h3 className="home-main-text">Millions of Americans Have an Opiod-Use Disorder and Even More Misuse Them. <br/> Help is available.</h3>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col className="col-8" style={{'marginTop': '20px', 'float': 'left'}}>
                <Script 
                  url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
                  onLoad={this.handleScriptLoad}        
                />  
                {
                  // wasn't able to get search icon to work so I'm replacing the close icon as the search icon
                  // onChange reset query since we don't want to query for an invalid location
                }
                <SearchBar
                  id="autocomplete"
                  placeholder="Find Resources in Prince Frederick, Calvert County, MD 20678, USA"
                  value={this.state.query}
                  closeIcon={<SearchIcon style={{ color: 'grey'}} />}
                  onChange={() => this.setState({query: ''})}
                  onCancelSearch={this.handleSearch}
                  style={{ width: '90%' }}
                />
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
        }
        {!showSearchResults &&
          <Card className="container" id="card-home-blurb-container">
            <Card.Body>
              <div className="card-main-text">
                Welcome to CORAbase, a confidential and anonymous source of information and resources for persons seeking opioid-related resources in the United States or U.S. Territories. We are the nation’s most comprehensive database of resources for opioid-use/addiction treatment, prevention, overdose response, and <b>resources in rural areas.</b>
              </div>
              <div className="card-note-text">
                PLEASE NOTE: Your personal information and the search criteria you enter into the Locator is secure and anonymous. CORA does not collect or maintain any information you provide.
              </div>
                <Nav.Link href="/general-info"><Button id="learn-cora-button"><b>Learn More About Corabase</b></Button></Nav.Link>
            </Card.Body>
          </Card>
        }
        {showSearchResults &&
          <div className="results-container">
            <div className="left-panel">
              <SearchResultLeftPanel
                address={query}
                narrowSearchOptions={narrowSearchOptions}
              />
            </div>
            <div className="right-panel">
              <SearchResultRightPanel/>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default FindResource;
