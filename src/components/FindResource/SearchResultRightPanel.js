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
      username: null,
      bookmarks: new Set(),
    };
  }

  componentDidMount = () => {
    const username = localStorage.getItem('username');

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

  componentDidUpdate = () => {
    const {
      username,
    } = this.state;
    const storageUsername = localStorage.getItem('username');

    // user logged out on results page
    if (username && !storageUsername) {
      this.setState({ username: null });
    // user logged in on results page
    } else if (!username && storageUsername) {
      this.setState({ username: storageUsername });
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
      email
    } = contact
    const {
      username,
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
          "username": username,
          "postID": _id,
        }),
        redirect: "follow"
      })
        .then(res => {
          if (res.status === 200) {
            // assigning a new set and adding the id to there so we don't modify react state directly
            const newBookmarks = new Set(bookmarks);
            newBookmarks.add(_id);
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
          "username": username,
          "postID": _id,
        }),
        redirect: "follow"
      })
        .then(res => {
          if (res.status === 200) {
            // assigning a new set and adding the id to there so we don't modify react state directly
            const newBookmarks = new Set(bookmarks);
            newBookmarks.delete(_id);
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
            Email: {email}
            <br/>
            Phone: {phone}
          </Card.Text>
          <Card.Text>
            Services: {tags.join(", ")}
          </Card.Text>
          <Card.Text>
              <a href={`/resource-page/${_id}`} target="_blank" rel="noopener noreferrer">Click here for more information</a>
          </Card.Text>
          {username && bookmarks.has(_id) &&
            <BookmarkIcon
              style={bookmarkIconStyle}
              onClick={() => removeBookmark()}
           />
          }
          {username && !bookmarks.has(_id) &&
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
