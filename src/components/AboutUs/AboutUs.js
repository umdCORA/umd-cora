import React from 'react';
import { Card, Container, Row, Col, CardDeck, Jumbotron } from 'react-bootstrap';
import kevin_tu_profile_pic from './../../assests/kevin_tu_profile_pic.jpeg';
import annie_feng_profile_pic from './../../assests/annie_feng_profile_pic.png';
import anna_feng_profile_pic from './../../assests/anna_feng_profile_pic.png';
import michael_li_profile_pic from './../../assests/michael_li_profile_pic.jpg';
import anthony_cortez_profile_pic from './../../assests/anthony_cortez_profile_pic.jpg';
import jason_lavis_profile_pic from './../../assests/jason_lavis_profile_pic.png';

import './AboutUs.css';

function AboutUs() {
    var about_us_input = [
      {
        "name_one": "Kevin Tu",
        "title_one": "CORA President",
        "bio_one": "I like to meme it up.",
        "image_one": kevin_tu_profile_pic,
        "name_two": "Annie Feng",
        "title_two": "CORA Treasurer Officer",
        "bio_two": "I also like to meme it up.",
        "image_two": annie_feng_profile_pic
      },
      {
        "name_one": "Anna Feng",
        "title_one": "CORA Officer",
        "bio_one": "In my free time, I like to ponder questions like \"What even are colors?\".",
        "image_one": anna_feng_profile_pic,
        "name_two": "Michael Li",
        "title_two": "CORA Developer",
        "bio_two": "Memes Memes Memes",
        "image_two": michael_li_profile_pic
      },
      {
        "name_one": "Jason Lavis",
        "title_one": "CORA Developer",
        "bio_one": "The memes never stop!",
        "image_one": jason_lavis_profile_pic,
        "name_two": "Anthony Cortez",
        "title_two": "CORA Developer",
        "bio_two": "You might think I'm outdoorsy by this picture but really this was the only time last year I was outside.",
        "image_two": anthony_cortez_profile_pic
      }
    ];
  
    return (
      <div>
        <div className="header">
          <Jumbotron>
            <h1 className="text-center">Our Team</h1>
          </Jumbotron>
        </div>
        <div className="team_card_holder">
          {about_us_input.map((row, index) => (
            <CardDeck key={index} className="mb-2">
              <Card style={{ width: '35rem' }}>
                <Container>
                  <Row>
                    <Col xs={4}>
                      <Card.Img src={row.image_one} fluid="true" />
                    </Col>
                    <Col>
                      <Card.Body className="mb-1">
                        <Card.Title className="mb-3"> {row.name_one} </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"> {row.title_one} </Card.Subtitle>
                        <Card.Text>
                          {row.bio_one}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Container>
              </Card>
              <Card style={{ width: '35rem' }}>
                <Container>
                  <Row>
                    <Col xs={4}>
                      <Card.Img src={row.image_two} />
                    </Col>
                    <Col>
                      <Card.Body className="mb-1">
                        <Card.Title className="mb-3"> {row.name_two} </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"> {row.title_two} </Card.Subtitle>
                        <Card.Text>
                          {row.bio_two}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Container>
              </Card>
            </CardDeck>
        ))}
        </div>
      </div>
    )
  }

  export default AboutUs;