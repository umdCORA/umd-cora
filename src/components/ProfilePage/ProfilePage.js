import React from 'react';
import { withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './ProfilePage.css';

class BookmarkCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      addressText: '',
      summary: '',
      bookmarkErrorMsg: '',
    };
  }

  componentDidMount = () => {
    const {
      description,
      location,
      name
    } = this.props;
    const {
      address,
      city,
      state,
      zipcode,
    } = location;

    this.setState({
      name: name,
      addressText: `${address}, ${city}, ${state}, ${zipcode}`,
      summary: description,
    })
  }

  handleRemoveBookmark = () => {
    const {
      uuid,
      username,
      fetchUserInfo,
    } = this.props; 

    fetch("/api/v1/data/users/unbookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": username,
        "postID": uuid,
      }),
      redirect: "follow"
    })
      .then(res => {
        if (res.status !== 200) {
          this.setState({bookmarkErrorMsg: 'Something happened while trying to delete this bookmark. Please try again'}); 
        } else {
          this.setState({bookmarkErrorMsg: ''});
        }
      });

    fetchUserInfo();
  }

  render() {
    const {
      name,
      addressText,
      summary,
      bookmarkErrorMsg,
    } = this.state;
    const { uuid } = this.props;

    return (
      <div>
        <Card className="container" id="bookmark-card">
          <Card.Body>
            {bookmarkErrorMsg && <div style={{color: 'red'}}>{bookmarkErrorMsg}</div>}
            <h4 className="bookmark-title">{name} </h4>
            <div className="bookmark-address">{addressText}</div>
            <div>{summary}</div>
            <a href={`/resource-page/${uuid}`} target="_blank" rel="noopener noreferrer">Click here for more information</a>
            <Button className="bookmark-button" onClick={() => this.handleRemoveBookmark()}>Remove</Button>

          </Card.Body>
        </Card>
      </div>
    );
  }
}

class ProfilePage extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      username: '',
      email: '',
      bookmarks: [],
      profilePageErrorMsg: '',
    };
  }

  componentDidMount = () => {
    this.fetchUserInfo();
  }

  fetchUserInfo = () => {
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : sessionStorage.getItem('username');
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
      .then(data =>{
        this.fetchBookmarks(data.meta.bookmarked);
        this.setState({username, email: data.email, profilePageErrorMsg: ''})
      })
      .catch(() => this.setState({profilePageErrorMsg: 'Something unexpected happened. Please reload the page.'}));
  }

  fetchBookmarks = (bookmarkUUIDs) => {
    if (bookmarkUUIDs.length >= 1) {
      fetch(`/api/v1/data/users/getbookmarks?bookmarks=${bookmarkUUIDs}`)
        .then(res => res.json())
        .then(data => this.setState({bookmarks: data, profilePageErrorMsg: ''}))
        .catch(() => this.setState({profilePageErrorMsg: 'Something unexpected happened. Please reload the page.'}));
    } else {
      this.setState({bookmarks: [], profilePageErrorMsg: ''});
    }
  }

  render() {
    const {
      username,
      email,
      bookmarks,
      profilePageErrorMsg,
    } = this.state;

    return (
      <Container fluid className="ProfilePage">
        <Row className="user-info-row">
          <Col>
            <Card className="container" id="user-info-card">
              <Card.Body>
                <h1 className="user-info-title"> Welcome, {username} </h1>
                <span className="email-text">{email}</span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="bookmark-content-row">
          <Col>
            <h4 className="bookmark-content-title">My Bookmarks</h4>
            {profilePageErrorMsg && <div style={{color: 'red'}}>{profilePageErrorMsg}</div>}
            {bookmarks.length === 0 && <div>No bookmarks to display. You can bookmark resources on the Find a Resource results page.</div>}
            {bookmarks.map(bookmark => <BookmarkCard location={bookmark.location} name={bookmark.name} description={bookmark.description} username={username} key={bookmark._id} uuid={bookmark._id} fetchUserInfo={this.fetchUserInfo}/>)}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ProfilePage);
