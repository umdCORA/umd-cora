import React, { useState } from 'react';
import './HowToUseCORABase.css';
import { Button, ButtonGroup, Card, Container, Row, Col } from 'react-bootstrap';

function HowToUseCORABase() {
    const [state, setState] = useState({
      yPosition: 25,
      title: "Search For Resources"
    });
    
    const styles = { 
      transform: `translateY(${state.yPosition}px)` 
    };

    return (
        <div className="faq">
          <Container fluid className="vh-100 d-flex flex-column">
          <Row className="h-100">
          <Col className="faqColumn">
          <div className="line faqButtons">
            <span style={styles} className="circle">
            </span>
            <ButtonGroup vertical>
              <Button className="titleButtons" onClick={() => setState({yPosition: 25, title: "Search For Resources"})}>Search For Resources</Button>

              <Button id="advanced-search" className="titleButtons" onClick={() => setState({yPosition: 80, title: "Advanced Search"})}>Advanced Search</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 115, title: "Prevention"})}>Prevention</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 150, title: "Overdose Response"})}>Overdose Response</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 185, title: "Treatment"})}>Treatment</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 220, title: "Recovery"})}>Recovery</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 255, title: "Harm Reduction"})}>Harm Reduction</Button>

              <Button id="my-account" className="titleButtons" onClick={() => setState({yPosition: 315, title: "What is My Account?"})}>What is My Account?</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 350, title: "Bookmarks"})}>Bookmarks</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 385, title: "Suggest a Resource"})}>Suggest a Resource</Button>
              <Button className="subButtons" onClick={() => setState({yPosition: 420, title: "Report a Resource"})}>Report a Resource</Button>

              <Button id="print-resources" className="titleButtons" onClick={() => setState({yPosition: 475, title: "Printing your Resources"})}>Printing your Resources</Button>
              <Button id="research-studies" className="titleButtons" onClick={() => setState({yPosition: 530, title: "Research Studies"})}>Research Studies</Button>
              <Button id="what-is-cora" className="titleButtons" onClick={() => setState({yPosition: 585, title: "What is CORA?"})}>What is CORA?</Button>
            </ButtonGroup>
          </div>
          </Col>
          <Col className="faqCardColumn">
            <div>
              <Card className="faqCard">
                <Card.Body className="d-flex align-items-start flex-column">
                  <Card.Title className="p-2 faqTitle">{state.title}</Card.Title>
                  <Card.Text className="p-2">
                      Word word word and more word :)
                  </Card.Text>
                  <Button className="mt-auto p-2 resources-button">Fun link to more resources</Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
          </Row>
          </Container>
        </div>
    )
}

export default HowToUseCORABase;