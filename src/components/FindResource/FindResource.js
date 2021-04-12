import React from 'react';
import { withRouter } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import SearchResult from '../SearchResult/SearchResult';
import Select from 'react-select'
import AutocompleteSearchBox from '../AutocompleteSearchBox/AutocompleteSearchBox';

import './FindResource.css';

class FindResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      lat: null,
      long: null,
      showNarrowSearch: false,
      showSearchResults: false,
      narrowSearchOptions: {
        transportationSelection: false,
        distanceInMilesSelection: 25,
      },
      searchResults: null,
      searchErrorMsg: '',
      searchResultError: null,
      isLoading: false,
    }
  }

  handleNarrowSearchChange = (category, event) => {
    const { narrowSearchOptions } = this.state;
    narrowSearchOptions[category] = event == null ? [] : event.map(x => x.value);
    this.setState(narrowSearchOptions);
  }

  handleTransportationChange = event => {
    const { narrowSearchOptions } = this.state;

    const temp = narrowSearchOptions;
    if (event.currentTarget.checked) {
      temp.transportationSelection = true;
    } else {
      temp.transportationSelection = false;
    }

    this.setState({ narrowSearchOptions: temp });
  }

  handleMileDropdownChange = event => {
    const { narrowSearchOptions } = this.state;

    this.setState({
      narrowSearchOptions: {
        ...narrowSearchOptions,
        distanceInMilesSelection: parseInt(event.target.value)
      }
    });
  }

  renderNarrowSearch = (isModal, narrowSearchOptions, handleNarrowSearchChange, handleTransportationChange, handleMileDropdownChange) => {

    //Below are the options and default values (what is already stored in state)
    const recoveryOptions = [
      { value: 'Medicated Assisted Treatment', label: 'Medicated Assisted Treatment' },
      { value: 'Inpatient Rehabilitation', label: 'Inpatient Rehabilitation' },
      { value: 'Outpatient Rehabilitation', label: 'Outpatient Rehabilitation' },
      { value: 'Gender-Specific Treatment', label: 'Gender-Specific Treatment' },
      { value: 'Intervention Specialists', label: 'Intervention Specialists' },
      { value: 'Recovery Residences', label: 'Recovery Residences' },
    ]
    const recoveryDefaults = narrowSearchOptions['Recovery'] ? narrowSearchOptions['Recovery'].map(recovery => {
      return {value: recovery, label: recovery};
    }) : [];

    const mentalHealthOptions = [
      { value: 'Counseling/Therapy', label: 'Counseling/Therapy' },
      { value: 'Support Groups', label: 'Support Groups' },
    ]
    const mentalDefaults = narrowSearchOptions['Mental Health Resources'] ? narrowSearchOptions['Mental Health Resources'].map(mental => {
      return {value: mental, label: mental};
    }) : [];

    const payOptions = [
      { value: 'Sliding Scale', label: 'Sliding Scale' },
      { value: 'Free', label: 'Free' },
      { value: 'Paid', label: 'Paid' },
    ]
    const payDefaults = narrowSearchOptions['Payment'] ? narrowSearchOptions['Payment'].map(payment => {
      return {value: payment, label: payment};
    }) : [];

    const harmReductionOptions = [
      { value: 'Overdose Response', label: 'Overdose Response' },
      { value: 'Needle Exchange Programs', label: 'Needle Exchange Programs' },
      { value: 'Vaccine and Prophylaxis Clinics', label: 'Vaccine and Prophylaxis Clinics' },
      { value: 'Pregnancy Support', label: 'Pregnancy Support' },
    ]
    const harmDefaults = narrowSearchOptions['Harm Reduction'] ? narrowSearchOptions['Harm Reduction'].map(harm => {
      return {value: harm, label: harm};
    }) : [];

    return (
      <Card className="narrow-search-card">
        <Card.Body className="narrow-search-field-card" style={{'marginTop': '10px'}}>
          <Container>
            <Row>
              <Col xl={6}>Recovery:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={recoveryOptions} defaultValue={recoveryDefaults} onChange={e => handleNarrowSearchChange('Recovery', e)} /></Col>
            </Row>
            <Row>
              <Col xl={6}>Mental Health Resources:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={mentalHealthOptions} defaultValue={mentalDefaults} onChange={e => handleNarrowSearchChange('Mental Health Resources', e)} /></Col>
            </Row>
            <Row>
              <Col xl={6}>Payment:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={payOptions} defaultValue={payDefaults} onChange={e => handleNarrowSearchChange('Payment', e)} /></Col>
            </Row>
            <Row>
              <Col xl={6}>Harm Reduction:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={harmReductionOptions} defaultValue={harmDefaults} onChange={e => handleNarrowSearchChange('Harm Reduction', e)} /></Col>
            </Row>
            <Row style={{'marginTop': '1rem'}}>
              <Col xs xl={6}>Free Transportation Available:</Col>
              <Col xs="auto">
                <Form>
                  <Form.Group style={{'marginBottom': '0.5rem'}} controlId="transportationForm">
                    <Form.Check
                      style={{'zIndex': '0'}}
                      type="checkbox"
                      checked={narrowSearchOptions.transportationSelection}
                      onChange={handleTransportationChange}
                      label=""
                      custom  
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col xs xl={6}>Distance in Miles:</Col>
              <Col xs="auto">
                <Form>
                  <Form.Group controlId="distanceForm">
                    <Form.Control
                      className="shadow-none"
                      as="select"
                      value={narrowSearchOptions.distanceInMilesSelection}
                      onChange={handleMileDropdownChange}
                      custom
                    >
                      <option>5</option>
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }

  handleSearch = (narrowSearchOptions, query, lat, lng, isValidSearch) => {
    const {
      distanceInMilesSelection,
    } = narrowSearchOptions;

    if (isValidSearch) {
      let allTags = [];
      for (const [key, value] of Object.entries(narrowSearchOptions)) {
        if (key === 'transportationSelection') {
          if (value) {
            allTags.push('Transportation');
          }
        } else if (key !== 'distanceInMilesSelection') {
          allTags = allTags.concat(value);
        }
      }

      if (query && lat && lng) {
        this.setState({
          query,
          lat,
          long: lng,
          showSearchResults: true,
          searchErrorMsg: '',
          isLoading: true,
        }, () => {
          fetch(`/api/v1/data/resources?lat=${lat}&long=${lng}&radius=${distanceInMilesSelection}&tags=${allTags.toString()}`)
            .then(res => res.json())
            .then(results => this.setState({narrowSearchOptions, searchResults: results, searchResultError: null, isLoading: false}))
            .catch((error) => this.setState({searchResultError: error}))
        });
      }
    } else {
      this.setState({ searchErrorMsg: 'Please enter a valid address.' }); 
    }
  }

  handleQueryChange = (query) => this.setState({ query });

  render(){
    const {
      showNarrowSearch,
      showSearchResults,
      narrowSearchOptions,
      query,
      lat,
      long,
      searchResults,
      searchErrorMsg,
      searchResultError,
      isLoading,
    } = this.state;

    return (
      <div className="FindResource">
        {!showSearchResults &&
          <Container fluid className="top-container">
            <Row className="justify-content-md-center">
              <Col xs={12} sm={12} md={6} lg={6}>
                <h3 className="home-main-text">Harm reduction is a public health strategy that reduces the harms associated with drug use and ineffective drug policies. Search for harm reduction resources here!</h3>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12} sm={12} md={6} lg={6} style={{'marginTop': '20px', 'float': 'left'}}>
                {searchErrorMsg && <div style={{color: 'red'}}>{searchErrorMsg}</div>}
                <AutocompleteSearchBox
                  query={query}
                  narrowSearchOptions={narrowSearchOptions}
                  onQueryChange={this.handleQueryChange}
                  onSearch={this.handleSearch}
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12} sm={12} md={6} lg={6} className="narrow-search-button-col">
                <Button className="justify-content-md-start shadow-none" id="narrow-search-button" onClick={() => this.setState({showNarrowSearch: !this.state.showNarrowSearch})}>Narrow Search &gt;&gt;</Button>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12} sm={12} md={6} lg={6}>
                {showNarrowSearch && this.renderNarrowSearch(false, narrowSearchOptions, this.handleNarrowSearchChange, this.handleTransportationChange, this.handleMileDropdownChange)}
              </Col>
            </Row>
          </Container>
        }
        {!showSearchResults &&
          <Card className="container" id="card-home-blurb-container">
            <Card.Body>
              <div className="card-main-text">
            Welcome to the Maryland Harm Reduction Database, a confidential and anonymous source of information and resources for persons seeking opioid-related resources in Maryland. We are the state&apos;s most comprehensive database of resources for opioid-use/addiction treatment, prevention, overdose response, and resources. Any questions can be directed to <a href="mailto:MDharmreduction@gmail.com">MDharmreduction@gmail.com</a>.
              </div>
              <div className="card-note-text">
                PLEASE NOTE: Your personal information and the search criteria you enter into the Locator is secure and anonymous. MHRD does not collect or maintain any information you provide.
              </div>
                <Nav.Link href="/how-to-use-mhrd" style={{padding: '0px', paddingBottom: '0.5rem'}}><Button id="learn-mhrd-button"><b>Learn More About MHRD</b></Button></Nav.Link>
                <div className="small-text">
                  If you are looking for a professional counselor or therapist, check out <a href='psychologytoday.com/'>psychologytoday.com</a>. They provide a database of certified mental health specialists near you.
                </div>
            </Card.Body>
          </Card>
        }
        {showSearchResults &&
          <SearchResult
            query={query}
            narrowSearchOptions={Object.assign({}, narrowSearchOptions)}
            lat={lat}
            long={long}
            searchResults={searchResults}
            searchResultError={searchResultError}
            isLoading={isLoading}
            renderNarrowSearch={this.renderNarrowSearch}
            handleSearch={this.handleSearch}
          />
        }
      </div>
    )
  }
}

export default withRouter(FindResource);
