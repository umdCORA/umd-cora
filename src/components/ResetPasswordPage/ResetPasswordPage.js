import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './ResetPasswordPage.css';

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showConfirmPassword: false,
      resetPasswordSucceeded: false,
      resetPasswordErrorMsg: '',
    };
    this.formRef = React.createRef();
  }

  handleResetPassword = (event) => {
    event.preventDefault();
    const username = event.target.elements.formBasicUsername.value;
    const token = event.target.elements.formBasicToken.value;
    const password = event.target.elements.formBasicPassword.value;
    const passwordConfirmation = event.target.elements.formBasicPasswordConfirmation.value;
    if (username && token && password && passwordConfirmation && password === passwordConfirmation) {
      fetch("/api/v1/data/users/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": username,
          "resetToken": token,
          "newPassword": password,
        }),
        redirect: "follow"
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              resetPasswordSucceeded: true,
              resetPasswordErrorMsg: '',
            });
          } else if (res.status === 404) {
            this.setState({
              resetPasswordSucceeded: false,
              resetPasswordErrorMsg: 'Either the username you entered doesn\'t exist or the token you entered is incorrect. Please choose a different username or enter a different token.'
            });
          } else {
            this.setState({
              resetPasswordSucceeded: false,
              resetPasswordErrorMsg: 'Something unexpected happened. Please try again.'
            });
          }
        })
        //TODO do we need to create a better error handle?
        .catch(error => console.log('error', error));
    } else if (password !== passwordConfirmation) {
      this.setState({
        resetPasswordSucceeded: false,
        resetPasswordErrorMsg: 'Passwords do not match. Please try again.'
      })
    }
  }
  render() {
    const {
      showPassword,
      showConfirmPassword,
      resetPasswordSucceeded,
      resetPasswordErrorMsg,
    } = this.state;

    return (
      <Container className="ResetPasswordPage">
          <h1 className="center-title">Reset Password</h1>
          <Form onSubmit={this.handleResetPassword} ref={this.formRef}>
            {resetPasswordSucceeded && <Form.Label style={{color: '#7283e1'}}>Password Reset Succeeded!</Form.Label>}
            {resetPasswordErrorMsg && <Form.Label style={{color: 'red'}}>{resetPasswordErrorMsg}</Form.Label>}
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicToken">
              <Form.Label>Token</Form.Label>
              <Form.Control
                autoComplete="off"
                type="text"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password <span className="fake-link" onClick={() => this.setState({showPassword: !showPassword})}>{showPassword ? '(hide)' : '(show)'}</span></Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPasswordConfirmation">
              <Form.Label>Confirm Password <span className="fake-link" onClick={() => this.setState({showConfirmPassword: !showConfirmPassword})}>{showConfirmPassword ? '(hide)' : '(show)'}</span></Form.Label>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Reset Password</Button>
          </Form>
      </Container>
    );
  }
}

export default withRouter(ResetPasswordPage);
