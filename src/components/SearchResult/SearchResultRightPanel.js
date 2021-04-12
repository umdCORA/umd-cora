import React from 'react';
import Card from 'react-bootstrap/Card';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import './SearchResultRightPanel.css';

const formatAddressString = (address, city, state, zipcode) => `${address} ${city}, ${state}, ${zipcode}`;

class SearchResultRightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      bookmarks: new Set(),
    };
  }

  componentDidMount = () => {
    const email = localStorage.getItem('email');
    this.fetchBookmarksFromEmail(email);
    this.setState({ email }); 

    window.addEventListener('storage', (event) => {
      if (event.key === 'bookmarks') {
        if (event.newValue) {
          this.setState({ bookmarks: new Set(event.newValue.split(',')) });
        } else {
          this.setState({ bookmarks: new Set() });
        }
      } else if (event.key === 'email') {
        this.setState({ email: event.newValue }); 
        this.fetchBookmarksFromEmail(event.newValue);
      } else if (event.key === 'logout') {
        this.setState({ email: null, bookmarks: new Set() });
      }
    });
  }

  componentDidUpdate = () => {
    const {
      email,
    } = this.state;
    const storageEmail = localStorage.getItem('email');

    // user logged out on results page
    if (email && !storageEmail) {
      this.setState({ email: null, bookmarks: new Set() });
    // user logged in on results page
    } else if (!email && storageEmail) {
      this.setState({ email: storageEmail });
      this.fetchBookmarksFromEmail(storageEmail);
    }
  }

  fetchBookmarksFromEmail = email => {
    if (email) {
      fetch("/api/v1/data/users/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
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

  renderCard = (result, index)  => {
    const {
      location,
      contact,
      name,
      tags,
      _id,
    } = result;
    const {
      address,
      city,
      state,
      zipcode,
      distance,
    } = location;
    const {
      phone,
    } = contact
    const {
      email,
      bookmarks,
    } = this.state;

    const distanceInMiles = Math.round(distance * 100) / 100;
    const bookmarkIconStyle = {
      position: 'relative',
      fontSize: 50,
      float: 'right',
      top: '50px',
      marginTop: '-50px',
      cursor: 'pointer',
      color: '#8D9DF9',
    };

    const addBookmark = () => {
      fetch("/api/v1/data/users/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
          "postID": _id,
        }),
        redirect: "follow"
      })
        .then(res => {
          if (res.status === 200) {
            // assigning a new set and adding the id to there so we don't modify react state directly
            const newBookmarks = new Set(bookmarks);
            newBookmarks.add(_id);
            // store bookmarks in localStorage to manage bookmarks on multiple instances of the app
            localStorage.setItem('bookmarks', Array.from(newBookmarks));
            this.setState({ bookmarks: newBookmarks });
          }
        })
    }

    const removeBookmark = () => {
      fetch("/api/v1/data/users/unbookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
          "postID": _id,
        }),
        redirect: "follow"
      })
        .then(res => {
          if (res.status === 200) {
            // assigning a new set and adding the id to there so we don't modify react state directly
            const newBookmarks = new Set(bookmarks);
            newBookmarks.delete(_id);
            // store bookmarks in localStorage to manage bookmarks on multiple instances of the app
            localStorage.setItem('bookmarks', Array.from(newBookmarks));
            this.setState({ bookmarks: newBookmarks });
          }
        })
    }

    return (
      <Card id="result-card" key={index}>
        <Card.Header id="result-card-header">
          <span className="header-title">{name}</span>
          <span className="header-mile">{distanceInMiles} mi</span>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Address: {formatAddressString(address, city, state, zipcode)}
            <br/>
            Email: {contact.email}
            <br/>
            Phone: {phone}
          </Card.Text>
          <Card.Text>
            Services: {tags.join(", ")}
          </Card.Text>
          <Card.Text>
              <a href={`/resource-page/${_id}`} target="_blank" rel="noopener noreferrer">Click here for more information</a>
          </Card.Text>
          {email && bookmarks.has(_id) &&
            <BookmarkIcon
              style={bookmarkIconStyle}
              onClick={() => removeBookmark()}
           />
          }
          {email && !bookmarks.has(_id) &&
            <BookmarkBorderIcon
              style={bookmarkIconStyle}
              onClick={() => addBookmark()}
           />
          }
        </Card.Body>
      </Card>
    );
  }

  render() {
    const {
      searchResults,
    } = this.props;
    
    return (
      <div className="search-result-right-panel">
        {searchResults && searchResults.map((result, index) => this.renderCard(result, index + 1))}
      </div>
    );
  }
}

export default SearchResultRightPanel;
