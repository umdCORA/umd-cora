import React from 'react';
import { withRouter } from "react-router-dom";
import { Card, Container, Row, Col, CardDeck, Jumbotron } from 'react-bootstrap';
import kevin_tu_profile_pic from './../../assets/kevin_tu_profile_pic.png';
import annie_feng_profile_pic from './../../assets/annie_feng_profile_pic.png';
import anna_feng_profile_pic from './../../assets/anna_feng_profile_pic.png';
import michael_li_profile_pic from './../../assets/michael_li_profile_pic.jpg';
import anthony_cortez_profile_pic from './../../assets/anthony_cortez_profile_pic.jpg';
import jason_lavis_profile_pic from './../../assets/jason_lavis_profile_pic.jpg';
import arden_zhang_profile_pic from './../../assets/arden_zhang_profile_pic.jpg';
import yash_profile_pic from './../../assets/yash_profile_pic.jpg';
import martin_jauquet_profile_pic from './../../assets/martin_jauquet_profile_pic.jpg';

import './AboutUs.css';

function AboutUs() {
    var about_us_input = [
      {
        "name_one": "Kevin Tu",
        "title_one": "CORA Founder and President",
        "bio_one": "I started CORA out of my passion to help others. I make sure everything works and is helpful for everyone.",
        "image_one": kevin_tu_profile_pic,
        "name_two": "Annie Feng",
        "title_two": "CORA Treasurer",
        "bio_two": "I'm the treasurer so I essentially make sure we have the funds to keep printing out cute stickers of our mascot, Flappy!",
        "image_two": annie_feng_profile_pic
      },
      {
        "name_one": "Anna Feng",
        "title_one": "CORA Chief Technology Officer",
        "bio_one": "I guide our techy CORA projects and the development team's work on CORAbase.",
        "image_one": anna_feng_profile_pic,
        "name_two": "Michael Li",
        "title_two": "CORA Developer",
        "bio_two": "Cellist by day and coder by night though you'll probably find me taking a nap somewhere. Currently a Junior majoring in Computer Science, Math, and Cello Performance at UMD.",
        "image_two": michael_li_profile_pic
      },
      {
        "name_one": "Jason Lavis",
        "title_one": "CORA Developer",
        "bio_one": "When I am not fishing or sailing, I'm most likely playing video games. Currently a Sophomore studying Computer Science at UMD.",
        "image_one": jason_lavis_profile_pic,
        "name_two": "Anthony Cortez",
        "title_two": "CORA Developer",
        "bio_two": "I graduated from UVA CS in 2018, interned at Amazon, and currently work at Palantir Technologies. When not coding, I love getting outdoors to hike.",
        "image_two": anthony_cortez_profile_pic
      },
      {
        "name_one": "Arden Zhang",
        "title_one": "CORA Developer",
        "bio_one": "Arden is an undergraduate computer science and math major at UMD.",
        "image_one": arden_zhang_profile_pic,
        "name_two": "Yash Kapoor",
        "title_two": "CORA Developer",
        "bio_two": "I'm a junior Computer Engineering student at UMD. I love trying new things and have recently picked up my first instrument.",
        "image_two": yash_profile_pic
      },
      {
        "name_one": "Martin Jauquet",
        "title_one": "CORA Developer",
        "bio_one": "I'm a sophomore Computer Science Student at UMD. I love spending time with my family and visiting new places whenever I have the chance.",
        "image_one": martin_jauquet_profile_pic
      }
    ];
  
    return (
      <div className="aboutUs">
        <div className="header">
          <Jumbotron>
            <h1 className="text-center">Our Team</h1>
          </Jumbotron>
        </div>
        <div className="team_card_holder">
          {about_us_input.map((row, index) => (
            <CardDeck key={index} className="mb-2">
              <Card>
                <Container>
                  <Row>
                    <Col xs={4}>
                      <Card.Img className="scaleImage" src={row.image_one} fluid="true" />
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
              <Card className={row.name_two === undefined ? "hideCard" : ""}>
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

  export default withRouter(AboutUs);
