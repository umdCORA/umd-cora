import React from 'react';
import Card from 'react-bootstrap/Card';

import './SearchResultRightPanel.css';

class SearchResultRightPanel extends React.Component {

  renderCard = number  => {
    return(
      <Card id="result-card">
        <Card.Header id="result-card-header">
          <span className="header-title">{`Resource ${number}`}</span>
          <span className="header-mile">5.4 mi</span>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Address:
            <br/>
            Email:
            <br/>
            Phone:
          </Card.Text>
          <Card.Text>
            Services:
          </Card.Text>
          <Card.Text>
            <b>Click the card for more information</b>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return (
      <div className="search-result-right-panel">
        {this.renderCard(1)}
        {this.renderCard(2)}
        {this.renderCard(3)}
      </div>
    );
  }
}

export default SearchResultRightPanel;
