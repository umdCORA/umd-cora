import React from 'react';
import { withRouter } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SearchResultLeftPanel from './SearchResultLeftPanel';
import SearchResultRightPanel from './SearchResultRightPanel';
import './SearchResult.css';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalNarrowSearchOptions: props.narrowSearchOptions,
      showNarrowSearchModal: false,
    };
  }

  handleNarrowSearch = () => {
    const { modalNarrowSearchOptions } = this.state;
    const { handleSearch } = this.props;
    const {
      query,
      lat,
      long,
    } = this.props;

    handleSearch(modalNarrowSearchOptions, query, lat, long, true);
    this.setState({ showNarrowSearchModal: false });
  }

  handleNarrowSearchChange = (category, event) => {
    const { modalNarrowSearchOptions } = this.state;

    modalNarrowSearchOptions[category] = event == null ? [] : event.map(x => x.value);
    this.setState(modalNarrowSearchOptions);
  }

  handleTransportationChange = event => {
    const { modalNarrowSearchOptions } = this.state;

    const temp = modalNarrowSearchOptions;
    if (event.currentTarget.checked) {
      temp.transportationSelection = true;
    } else {
      temp.transportationSelection = false;
    }

    this.setState({ modalNarrowSearchOptions: temp });
  }

  handleMileDropdownChange = event => {
    const { modalNarrowSearchOptions } = this.state;

    this.setState({
      modalNarrowSearchOptions: {
        ...modalNarrowSearchOptions,
        distanceInMilesSelection: parseInt(event.target.value)
      }
    });
  }

  renderNarrowSearchModal = () => {
    const {
      narrowSearchOptions,
      renderNarrowSearch,
    } = this.props;
    const {
      showNarrowSearchModal,
      modalNarrowSearchOptions
    } = this.state;

    return (
      <Modal
        show={showNarrowSearchModal}
        size="lg"
        onHide={() => this.setState({showNarrowSearchModal: false, modalNarrowSearchOptions: Object.assign({}, narrowSearchOptions)})}
        className="narrow-search-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{color: 'white'}}> Narrow Search </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderNarrowSearch(true, modalNarrowSearchOptions, this.handleNarrowSearchChange, this.handleTransportationChange, this.handleMileDropdownChange)}
        </Modal.Body>
        <Modal.Footer>
          <Button id="narrow-search-button" onClick={() => this.handleNarrowSearch()}>Search</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const {
      query,
      narrowSearchOptions,
      lat,
      long,
      searchResults,
      searchResultError,
      isLoading,
    } = this.props;

    const { showNarrowSearchModal } = this.state;

    let rightPanel;
    if(!searchResultError) {
      if(searchResults?.length) {
        rightPanel =
          <SearchResultRightPanel
            lat={lat}
            long={long}
            searchResults={searchResults}
          />;
      } else if (isLoading) {
        rightPanel = <div><ClipLoader color={'#8D9DF9'} size={150}/><div>Loading results...</div></div>
      } else {
        rightPanel = <p>No results match the search criteria. <a href="/">Click here</a> to return to the homepage.</p>;
      }
    } else {
      rightPanel = <p>Something unexpected happened. <a href="/">Click here</a> to return to the homepage.</p>;
    }

    return (
      <Container fluid id="result-container">
        <Row style={{flexGrow: '1'}}>
          <Col xs={12} sm={12} md={4} lg={4} style={{paddingLeft: '0px', paddingRight: '0px'}}>
            <div className="left-panel">
              <SearchResultLeftPanel
                address={query}
                narrowSearchOptions={narrowSearchOptions}
              />
              <Button className="shadow-none" id="narrow-search-button" onClick={() => this.setState({showNarrowSearchModal: true})}>Narrow Search</Button>
              {showNarrowSearchModal && this.renderNarrowSearchModal()}
            </div>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} style={{paddingLeft: '0px', paddingRight: '0px'}}>
            <div className="right-panel">
              {rightPanel}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SearchResult);
