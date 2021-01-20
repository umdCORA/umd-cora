import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/Print';
import WarningIcon from '@material-ui/icons/Warning';
import emailjs from 'emailjs-com';

import './RightPanel.css';

class ReportIssueModal extends React.Component {
  render() {
    const { msg, onMsgChange } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        centered
        dialogClassName="issue-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Report an Issue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              size="lg"
              as="textarea"
              value={msg}
              onChange={e => onMsgChange(e.target.value)}
          />
          </Form.Group>
          </Form>
          <Button onClick={() => this.props.onSubmit(msg)}>Submit</Button>
        </Modal.Body>
      </Modal>
    );
  }
}

class RightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      issueMsg: '',
    };
  }

  submitIssue = msg => {
    const templateParams = {
      url: window.location.href,
      message: msg,
    }

    emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, templateParams, process.env.REACT_APP_EMAILJS_USER_ID)
      .then(result => {
        alert('Email sent. We\'ll look into the issue.', result.text);
      },
      error => {
        alert( 'An error occured. Please try again.', error.text)
      })
    this.setState({ showModal: false, issueMsg: ''});
  }

  updateIssueMsg = msg => this.setState({ issueMsg: msg });

  render() {
    const {
      phone,
      description,
      services,
    } = this.props;
    const { showModal, issueMsg } = this.state;

    return (
      <div className="RightPanel">
        <div className="right-icons">
          <span className="phone">
            <PhoneIcon/> {phone}
          </span> 
          <span className="print" onClick={() => window.print()}>
            <PrintIcon/> Print Page
          </span>
          <span className="error" onClick={() => this.setState({ showModal: true })}>
            <WarningIcon/> Report an Issue
          </span>
        </div>
        <div className="summary">
          <h2 className="summary-title">Summary</h2>
          <div className="summary-blurb">
            {description}
            <br/>
            Services offered: {services.join(", ")}
          </div>
        </div>
        <ReportIssueModal
          show={showModal}
          onSubmit={this.submitIssue}
          onMsgChange={this.updateIssueMsg}
          msg={issueMsg}
          onHide={() => this.setState({ showModal: false})}
        />
      </div>
    );
  }
}

export default RightPanel;
