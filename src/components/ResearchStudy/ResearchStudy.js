import React from 'react';
import { withRouter } from "react-router-dom";
//import { Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import { Card, Container, Row } from 'react-bootstrap';
import './ResearchStudy.css';
/*
function ResearchStudyModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Research Topic ##
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Wowie even more information!
          </p>
          <p>
            Pictures, graphics, sciency
          </p>
          <p>
            Links to more thingys
          </p>
        </Modal.Body>
        <Modal.Footer className="research_modal">
          <Button className="join-study-button"><b>Sign Up Here</b></Button>
        </Modal.Footer>
      </Modal>
    );
}*/

function ResearchStudy() {
    //const [modalShow, setModalShow] = React.useState(false);
    return (
      <div className="research_study">
          <Container className="research_container">
            <Row>
              <div className="coming_soon_title">
                <Card className="research_card">
                  <Card.Body className="mb-1">
                    <Card.Title className="mb-3 research_card_title">Thank you for your interest, Research Studies are coming soon! Please check back later!</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Row>
          </Container>
      </div>
    );
    /* Commenting these modals so we can use them later
    return (
        <div className="research_study">
            <Container className="research_container">
              <Row>
                <div className="research_title">
                  MHRD conducts opioid-related research that public services can use to improve their services. Data from MHRD’s research is published and made publically available. Participants of our studies are compensated or have a chance at being compensated.
                </div>
              </Row>
              
              <Row>
                <Col>
                  <Card className="research_card">
                    <Card.Body className="mb-1">
                      <Card.Title className="mb-3 research_card_title"> Research Title 1 </Card.Title>
                      <Card.Text className="research_card_text">
                        Brief Description:
                      </Card.Text>
                      <Card.Text className="research_card_text">
                        Purpose:
                      </Card.Text>
                      <Card.Text className="research_card_text">
                        Compensation:
                      </Card.Text>
                      <Button className="join-study-button" onClick={() => setModalShow(true)}><b>Join Study</b></Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="research_card">
                    <Card.Body className="mb-1">
                      <Card.Title className="mb-3 research_card_title"> Research Title 2 </Card.Title>
                      <Card.Text className="research_card_text">
                        Brief Description:
                      </Card.Text>
                      <Card.Text className="research_card_text">
                        Purpose:
                      </Card.Text>
                      <Card.Text className="research_card_text">
                        Compensation:
                      </Card.Text>
                      <Button className="join-study-button" onClick={() => setModalShow(true)}><b>Join Study</b></Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className="research_card">
                    <Card.Body className="mb-1">
                      <Card.Title className="mb-3 research_card_title"> Research Title 3 </Card.Title>
                      <Card.Text className="research_card_text">
                        Brief Description:
                      </Card.Text>
                      <Card.Text className="research_card_text">
                        Purpose:
                      </Card.Text>
                      <Card.Text className="research_card_text">
                        Compensation:
                      </Card.Text>
                      <Button className="join-study-button" onClick={() => setModalShow(true)}><b>Join Study</b></Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="research_card">
                    <Card.Body className="mb-1">
                      <Card.Title className="mb-3 research_card_title"> Research Title 4 </Card.Title>
                      <Card.Text className="research_card_text">
                        Brief Description:
                      </Card.Text>
                      <Card.Text className="research_card_text">
                        Purpose:
                      </Card.Text>
                      <Card.Text className="research_card_text">
                        Compensation:
                      </Card.Text>
                      <Button className="join-study-button" onClick={() => setModalShow(true)}><b>Join Study</b></Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
            <ResearchStudyModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
        </div>
    )*/
}

export default withRouter(ResearchStudy);
