import React from 'react';
import { withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/Print';
import WarningIcon from '@material-ui/icons/Warning';
import { getDistance, convertDistance } from 'geolib';
import emailjs from 'emailjs-com';
import LeftPanel from './LeftPanel.js';
import RightPanel from './RightPanel.js';
import DescriptionPanel from './DescriptionPanel.js';

import './ResourcePage.css';

class ReportIssueModal extends React.Component {
  render() {
    const { submitIssue } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        centered
        dialogClassName="issue-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Report an Issue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitIssue}>
            <Form.Group controlId="formBasicTextarea">
              <Form.Control
                size="lg"
                as="textarea"
                required
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

class ResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      description: '',
      location: '',
      services: [],
      distance: 0,
      targetLat: null,
      targetLong: null,
      tags: [],
      searchError: null,
      showModal: false,
    };
  }

  componentDidMount = () => {
    fetch(`/api/v1/data/resources/${this.props.match.params.uuid}`)
      .then(res => res.json())
      .then(result => {
        const {
          lat,
          long
        } = this.props.match.params;

        let distanceInMiles = convertDistance(getDistance(
          { latitude: parseFloat(lat), longitude: parseFloat(long) },
          { latitude: result.location.geo.coordinates[1], longitude: result.location.geo.coordinates[0] },
        ), 'mi');
        distanceInMiles = Math.round(distanceInMiles * 100) / 100;
        this.setState({
          name: result.name,
          phone:  result.contact.phone,
          description: result.description,
          location: result.location,
          services: result.services,
          distance: distanceInMiles,
          targetLat: result.location.geo.coordinates[1],
          targetLong: result.location.geo.coordinates[0],
          tags: result.tags,
          searchError: null,
        })
      })
      .catch((error) => this.setState({searchError: error}));
  }

  submitIssue = event => {
    event.preventDefault();
    const msg = event.target.elements.formBasicTextarea.value;
    const templateParams = {
      url: window.location.href,
      message: msg,
    }

    emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_ISSUE_TEMPLATE_ID, templateParams, process.env.REACT_APP_EMAILJS_USER_ID)
      .then(result => {
        alert('Email sent. We\'ll look into the issue.', result.text);
      },
      error => {
        alert( 'An error occured. Please try again.', error.text)
      })
    this.setState({ showModal: false });
  }

  render() {
    const {
      name,
      phone,
      description,
      location,
      services,
      distance,
      targetLat,
      targetLong,
      tags,
      searchError,
      showModal,
    } = this.state;

    return (
      <div className="ResourcePage">
        <ReportIssueModal
          show={showModal}
          onSubmit={this.submitIssue}
          onHide={() => this.setState({ showModal: false})}
        />
        {searchError &&
          <p style={{'textAlign': 'center'}}>Something unexpected happened. <a href="/">Click here</a> to return to the homepage.</p>
        }
        {!searchError && targetLat && targetLong &&
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <h1 className="title">{name}</h1>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <div className="right-icons">
                  <span className="phone">
                    <PhoneIcon/> {phone}
                  </span>
                  <span className="print" onClick={() => window.print()}>
                    <PrintIcon/> Print Page
                  </span>
                  <span className="error" onClick={() => this.setState({ showModal: true })}>
                    <WarningIcon/> Report an Issue
                  </span>
                </div>
              </Col>
            </Row>
            <Row style={{flex: '1'}}>
              <Col id="left-panel-col" xs={12} sm={12} md={6} lg={6}>
                <LeftPanel
                  name={name}
                  location={location}
                  distance={distance}
                  targetLat={targetLat}
                  targetLong={targetLong}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <RightPanel
                  phone={phone}
                  description={description}
                  services={services}
                />
                <hr style={{visibility: "hidden"}} />
                <DescriptionPanel tags={tags} />
              </Col>
            </Row>
          </Container>
        }
      </div>
    );
  }
}

export default withRouter(ResourcePage);
