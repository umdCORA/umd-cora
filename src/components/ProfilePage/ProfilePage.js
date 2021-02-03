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
    const { uuid } = this.props;

    fetch(`/api/v1/data/resources/${uuid}`)
      .then(res => res.json())
      .then(data => {
        const {
          address,
          city,
          state,
          zipcode,
        } = data.location;
        this.setState({
          name: data.name,
          addressText: `${address}, ${city}, ${state}, ${zipcode}`,
          summary: data.description,
        })
      })
      .catch((error) => console.log(error));
  }

  handleRemoveBookmark = () => {
    const {
      uuid,
      username,
      fetchNewBookmarks,
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

    fetchNewBookmarks();
  }

  render() {
    const {
      name,
      addressText,
      summary,
      bookmarkErrorMsg,
    } = this.state;

    return (
      <div>
        {name && addressText && summary &&
          <Card className="container" id="bookmark-card">
            <Card.Body>
              {bookmarkErrorMsg && <div style={{color: 'red'}}>{bookmarkErrorMsg}</div>}
              <h4 className="bookmark-title">{name} </h4>
              <div className="bookmark-address">{addressText}</div>
              <div>{summary}</div>
              <Button className="bookmark-button" onClick={() => this.handleRemoveBookmark()}>Remove</Button>

            </Card.Body>
          </Card>
        }
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
    this.fetchNewBookmarks();
  }

  fetchNewBookmarks = () => {
    const username = localStorage.getItem('username');
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
      .then(data => this.setState({username, email: data.email, bookmarks: data.meta.bookmarked, profilePageErrorMsg: ''}))
      .catch(() => this.setState({profilePageErrorMsg: 'Something unexpected happened. Please reload the page.'}));
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
            {bookmarks.map(uuid => <BookmarkCard uuid={uuid} username={username} key={uuid} fetchNewBookmarks={this.fetchNewBookmarks}/>)}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ProfilePage);
