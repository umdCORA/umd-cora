import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Home.css';

function Home() {
  return (
    <div className="Home">
      <Card className="container">
        <Card.Body>
          <h1>Find a treatment facility near you</h1>
        </Card.Body>
        <Form id="searchForm">
          <Form.Group controlId="searchTerm">
            <Form.Control size="lg" type="text" placeholder="City or zip code" />
          </Form.Group>
          <Button variant="primary" type="submit">Search</Button>
        </Form>
      </Card>
    </div>
  )
}

export default Home;
