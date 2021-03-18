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
import emailjs from 'emailjs-com';
import LeftPanel from './LeftPanel.js';
import RightPanel from './RightPanel.js';
import DescriptionPanel from './DescriptionPanel.js';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

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
      website: '',
      description: '',
      location: '',
      services: [],
      targetLat: null,
      targetLong: null,
      tags: [],
      searchError: null,
      showModal: false,
      username: null,
      bookmarks: new Set(),
    };
  }

  componentDidMount = () => {
    fetch(`/api/v1/data/resources/${this.props.match.params.uuid}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          name: result.name,
          phone:  result.contact.phone,
          website: result.contact.website,
          description: result.description,
          location: result.location,
          services: result.services,
          targetLat: result.location.geo.coordinates[1],
          targetLong: result.location.geo.coordinates[0],
          tags: result.tags,
          searchError: null,
        })
      })
      .catch((error) => this.setState({searchError: error}));

    const username = localStorage.getItem('username');
    this.fetchBookmarksFromUsername(username);

    window.addEventListener('storage', (event) => {
      if (event.key === 'bookmarks') {
        if (event.newValue) {
          this.setState({ bookmarks: new Set(event.newValue.split(',')) });
        } else {
          this.setState({ bookmarks: new Set() });
        }
      } else if (event.key === 'username') {
        this.setState({ username: event.newValue }); 
        this.fetchBookmarksFromUsername(event.newValue);
      } else if (event.key === 'logout') {
        this.setState({ username: null, bookmarks: new Set() });
      }
    });
  }

  componentDidUpdate = () => {
    const {
      username,
    } = this.state;
    const storageUsername = localStorage.getItem('username');

    // user logged out on resource page
    if (username && !storageUsername) {
      this.setState({ username: null });
    // user logged in on resource page
    } else if (!username && storageUsername) {
      this.setState({ username: storageUsername });
      this.fetchBookmarksFromUsername(storageUsername);
    }
  }

  fetchBookmarksFromUsername = username => {
    if (username) {
      this.setState({ username });
      fetch("/api/v1/data/users/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": username,
        }),
        redirect: "follow"
      })
        .then(res => res.json())
        .then(data => {
          const {
            bookmarked,
          } = data.meta;

          this.setState({ bookmarks: new Set(bookmarked) });
        })
    }
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

  addBookmark = () => {
    const {
      username,
      bookmarks,
    } = this.state;
    fetch("/api/v1/data/users/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": username,
        "postID": this.props.match.params.uuid,
      }),
      redirect: "follow"
    })
      .then(res => {
        if (res.status === 200) {
          // assigning a new set and adding the id to there so we don't modify react state directly
          const newBookmarks = new Set(bookmarks);
          newBookmarks.add(this.props.match.params.uuid);

          // store bookmarks in localStorage to manage bookmarks on multiple instances of the app
          localStorage.setItem('bookmarks', Array.from(newBookmarks));
          this.setState({ bookmarks: newBookmarks });
        }
      })
  }

  removeBookmark = () => {
    const {
      username,
      bookmarks,
    } = this.state;

    fetch("/api/v1/data/users/unbookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": username,
        "postID": this.props.match.params.uuid,
      }),
      redirect: "follow"
    })
      .then(res => {
        if (res.status === 200) {
          // assigning a new set and adding the id to there so we don't modify react state directly
          const newBookmarks = new Set(bookmarks);
          newBookmarks.delete(this.props.match.params.uuid);

          // store bookmarks in localStorage to manage bookmarks on multiple instances of the app
          localStorage.setItem('bookmarks', newBookmarks);
          this.setState({ bookmarks: newBookmarks });
        }
      })
  }

  render() {
    const {
      name,
      phone,
      website,
      description,
      location,
      services,
      targetLat,
      targetLong,
      tags,
      searchError,
      showModal,
      username,
      bookmarks,
    } = this.state;

    const bookmarkIconStyle = {
      cursor: 'pointer',
      color: '#8D9DF9',
    };

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
            <Row style={{flexDirection: 'row-reverse'}}>
              <Col xs="auto" sm="auto" md="auto" lg="auto">
                <div className="right-icons">
                  {username && bookmarks.has(this.props.match.params.uuid) &&
                    <span className="bookmark" onClick={() => this.removeBookmark()}>
                      <BookmarkIcon style={bookmarkIconStyle}/> Unbookmark me
                    </span>
                  }
                  {username && !bookmarks.has(this.props.match.params.uuid) &&
                    <span className="bookmark" onClick={() => this.addBookmark()}>
                      <BookmarkBorderIcon style={bookmarkIconStyle}/> Bookmark me
                    </span>
                  }
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
              <Col xs sm md lg>
                <h1 className="title">{name}</h1>
                {website && <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>}
              </Col>
            </Row>
            <Row style={{flexGrow: '1'}}>
              <Col id="left-panel-col" xs={12} sm={12} md={6} lg={6}>
                <LeftPanel
                  name={name}
                  location={location}
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
