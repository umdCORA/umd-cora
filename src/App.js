import React from 'react';
import emailjs from 'emailjs-com';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Navbar, Image } from 'react-bootstrap';
import FindResource from './components/FindResource/FindResource';
import AboutUs from './components/AboutUs/AboutUs';
import ResearchStudy from './components/ResearchStudy/ResearchStudy';
import HowToUseCORABase from './components/HowToUseCORABase/HowToUseCORABase';
import ResourcePage from'./components/ResourcePage/ResourcePage';
import ResetPasswordPage from './components/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import cora_logo from './assets/cora_logo.png'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignInModal: false,
      showSignOutModal: false,
      showCreateAccountModal: false,
      showResetPasswordModal: false,
      username: '',
      loginErrorMsg: '',
      createAccountErrorMsg: '',
      resetPasswordErrorMsg: '',
      showPassword: false,
      showConfirmPassword: false,
    }
  }

  componentDidMount = () => {
    // persistent login based on https://stackoverflow.com/questions/47928055/multiple-tabs-same-session-clear-the-session-when-all-tabs-are-gone
    window.addEventListener('beforeunload', () => {
      if (!localStorage.getItem('persist-sign-in')) {
        localStorage.removeItem('username');
      }
    });

    const username = localStorage.getItem('username');
    const sessionUsername = sessionStorage.getItem('username');
    if (!username) {
      if (sessionUsername) {
        localStorage.setItem('username', sessionUsername);
        this.setState({username: sessionUsername});
      }
    } else {
      sessionStorage.setItem('username', username);
      this.setState({ username });
    }

    window.addEventListener('storage', (event) => {
      if (event.key === 'username' && event.newValue) {
        sessionStorage.setItem('username', event.newValue);
        this.setState({ username: event.newValue });
      } else if (event.key === 'logout' && event.newValue) {
        this.setState({ username: '' });
        sessionStorage.clear();
        localStorage.clear();
      }
    });
  }

  componenWillUnmount = () => {
    window.removeEventListener('beforeunload');
    window.removeEventListener('storage');
  }

  handleSignIn = (event) => {
    event.preventDefault();
    const username = event.target.elements.formBasicUsername.value;
    const password = event.target.elements.formBasicPassword.value;
    const persistSignIn = event.target.elements.formBasicCheck.checked;

    if(username && password) {
      fetch("/api/v1/data/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": username,
          "password": password,
        }),
        redirect: "follow"
      })
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem('username', username);
            if (persistSignIn) {
              localStorage.setItem('persist-sign-in', true);
            }
            localStorage.removeItem('logout');
            sessionStorage.setItem('username', username);

            this.setState({
              showSignInModal: false,
              showResetPasswordModal: false,
              username,
              loginErrorMsg: '',
            });
          } else if (res.status === 403) {
            this.setState({ loginErrorMsg: 'Invalid login credentials. Please try again.' });
          } else {
            this.setState({ loginErrorMsg: 'Something unexpected happened. Please try again.' });
          }
        })
        //TODO do we need to create a better error handle?
        .catch(error => console.log('error', error));
    }
  }

  renderSignInModal = () => {
    const {
      showSignInModal,
      loginErrorMsg,
      showPassword,
    } = this.state;

    return (
      <Modal
        show={showSignInModal}
        onShow={() => this.setState({
          loginErrorMsg: '',
          showPassword: false,
        })}
        onHide={() => this.setState({showSignInModal: false})}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Modal.Title>Welcome Back!</Modal.Title>
          <Form onSubmit={this.handleSignIn}>
            { loginErrorMsg && <Form.Label style={{color: "red"}}>{loginErrorMsg}</Form.Label> }
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
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
            <Form.Group controlId="formBasicCheck">
              <Form.Check
                type="checkbox"
                label="Remember my sign in"
              />
            </Form.Group>
            <Button variant="primary" type="submit">Sign In</Button>
            <Form.Text
              className="fake-link"
              onClick={() => this.setState({showSignInModal: false, showResetPasswordModal: true})}
            >
              Forgot your password?
            </Form.Text>
            <Form.Text
              className="fake-link"
              onClick={() => this.setState({showSignInModal: false, showCreateAccountModal: true})}
            >
              Create an Account
            </Form.Text>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  handleCreateAccount = (event) => {
    event.preventDefault();
    const username = event.target.elements.formBasicUsername.value;
    const email = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;
    const passwordConfirmation = event.target.elements.formBasicPasswordConfirmation.value;

    if (username && email && password && password === passwordConfirmation) {
      fetch("/api/v1/data/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": username,
          "email": email,
          "password": password,
        }),
        redirect: "follow"
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              showSignInModal: true,
              showResetPasswordModal: false,
              showCreateAccountModal: false,
              createAccountErrorMsg: '',
            });
          } else if (res.status === 403) {
            this.setState({ createAccountErrorMsg: 'Either the username or the email address you have entered has already been taken. Please choose a different username or email address.' });
          } else {
            this.setState({ createAccountErrorMsg: 'Something unexpected happened. Please try again.' });
          }
        })
        //TODO do we need to create a better error handle?
        .catch(error => console.log('error', error));
    } else if (password !== passwordConfirmation) {
      this.setState({ createAccountErrorMsg: 'Passwords do not match. Please try again.' })
    }
  }

  renderCreateAccountModal = () => {
    const {
      showCreateAccountModal,
      createAccountErrorMsg,
      showPassword,
      showConfirmPassword,
    } = this.state;

    return (
      <Modal
        show={showCreateAccountModal}
        onShow={() => this.setState({
          createAccountErrorMsg: '',
          showPassword: false,
          showConfirmPassword: false,
        })}
        onHide={() => this.setState({showCreateAccountModal: false})}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Modal.Title>Create an Account</Modal.Title>
          <Form onSubmit={this.handleCreateAccount}>
            {createAccountErrorMsg && <Form.Label style={{color: 'red'}}>{createAccountErrorMsg}</Form.Label>}
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
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
            {/*TODO add newsletter fxnality*/}
            {/*<Form.Check label="Sign up for our newsletter to receive updates from CORA" />*/}
            <Button variant="primary" type="submit">Sign Up!</Button>
            <Form.Text className="fake-link" onClick={() => this.setState({showCreateAccountModal:false, showSignInModal: true})}>I already have an account</Form.Text>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  handleResetPasswordSubmission = (event) => {
    event.preventDefault();
    const username = event.target.elements.formBasicUsername.value;
    fetch("/api/v1/data/users/generateUUID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": username,
      }),
      redirect: "follow"
    })
      .then(res => {
        if (res.status === 200) {
          return res.text();
        } else if (res.status === 404) {
          this.setState({ resetPasswordErrorMsg: 'Username not found. Please try again.' });
          throw new Error('Username not found');
        } else {
          this.setState({ resetPasswordErrorMsg: 'Something unexpected happened. Please try again.' });
          throw new Error('Something unexpected happened');
        }
      })
      .then(data => {
        const templateParams = {
          username,
          url: `${window.location.origin}/reset-password`,
          uuid: data,
        }
        this.setState({ showResetPasswordModal: false });
        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_RESET_TEMPLATE_ID, templateParams, process.env.REACT_APP_EMAILJS_USER_ID)
          .then(() => {
            alert('We have emailed your password reset link!');
          },
          error => {
            alert( 'An error occured. Please try again.', error.text)
          })
      })
      .catch(error => console.error(error.message))
  }

  renderResetPasswordModal = () => {
    const { showResetPasswordModal, resetPasswordErrorMsg } = this.state;

    return (
      <Modal
        show={showResetPasswordModal}
        onShow={() => this.setState({ resetPasswordErrorMsg: ''})}
        onHide={() => this.setState({showResetPasswordModal: false})}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Modal.Title>Reset Password</Modal.Title>
          <Form onSubmit={this.handleResetPasswordSubmission}>
            { resetPasswordErrorMsg && <Form.Label style={{color: "red"}}>{resetPasswordErrorMsg}</Form.Label> }
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" required/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginLeft: 0, marginTop: 0}}>Send Request</Button>
            <br />
            <Button variant="primary" onClick={() => this.setState({showResetPasswordModal: false, showSignInModal: true})}>Return to Sign In</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  handleSignOut = () => {
    localStorage.setItem('logout', true);
    localStorage.removeItem('persist-sign-in');
    sessionStorage.clear();

    this.setState({
      showSignOutModal: true,
      username: '',
    });
  }

  renderSignOutModal = () => {
    const { showSignOutModal } = this.state;

    return (
        <Modal
          show={showSignOutModal}
          onHide={() => this.setState({showSignOutModal: false})}
          dialogClassName="signout-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Signed out successfully!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.setState({showSignOutModal: false, showSignInModal: true})}
            >
              Sign in as another user
            </Button>
            <Button
              variant="danger"
              onClick={() => this.setState({showSignOutModal: false})}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }

  render(){
    const {
      username,
    } = this.state;

    // resource-page should have pill on Find Resource tab
    const activeKey = window.location.pathname.includes('resource-page') ? '/' : window.location.pathname;
    const usernameInStorage = localStorage.getItem('username') || sessionStorage.getItem('username');

    return (
      <Router>
        <div className="App">
          {this.renderResetPasswordModal()}
          {this.renderSignInModal()}
          {this.renderSignOutModal()}
          {this.renderCreateAccountModal()}
          <Navbar id="main-navbar" expand="lg">
            <Navbar.Brand href="/"><Image id="cora_logo" src={cora_logo}></Image></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav variant="pills" defaultActiveKey="/" activeKey={activeKey} className="mr-auto">
                <Nav.Link href="/">Find a Resource</Nav.Link>
                <Nav.Link href="/how-to-use-corabase">How to Use CORAbase</Nav.Link>
                <Nav.Link href="/join-a-research-study">Join a Research Study</Nav.Link>
                <Nav.Link href="/about-us">About Us</Nav.Link>
                {username && <Nav.Link href={`/account`}>My Account</Nav.Link>}
              </Nav>
              {!username &&
                <div className="signed-out-content">
                  <Button variant="outline-dark" onClick={() => this.setState({showSignInModal: true})}>Sign In</Button>
                  <Button variant="outline-dark" onClick={() => this.setState({showCreateAccountModal: true})}>Create Account</Button>
                </div>
              }
              {username &&
                <div className="signed-in-content">
                  <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{verticalAlign: 'middle'}}>Signed in as: <span className="bold-username">{username}</span></Navbar.Text>
                    <Button variant="outline-dark" onClick={() => this.handleSignOut()}>Sign Out</Button>
                  </Navbar.Collapse>
                </div>
              }
            </Navbar.Collapse>
          </Navbar>
          <div id="body-wrapper">
            <Switch>
              <Route exact path="/" component={FindResource}/>
              <Route path="/how-to-use-corabase" component={HowToUseCORABase}/>
              <Route path="/join-a-research-study" component={ResearchStudy}/>
              <Route path="/about-us" component={AboutUs}/>
              <Route path="/reset-password" component={ResetPasswordPage}/>
              <Route path="/resource-page/:uuid" component={ResourcePage}/>
              <Route path="/account" render={() => usernameInStorage ? <ProfilePage/> : <Redirect to="/"/>}/>
              <Route path="*" render={() => <Redirect to="/"/>}/>
            </Switch>
          </div>
          <Navbar id="footer" className="mr-auto">
            <Navbar.Brand><Image id="cora_logo" src={cora_logo}></Image></Navbar.Brand>
            <Navbar className="ml-auto flex-column">
              <Nav.Link href="https://coraumd.wixsite.com/cora/faq-for-partners">CORA FAQ |</Nav.Link>
              <Nav.Link href="https://coraumd.wixsite.com/cora/contact">Contact |</Nav.Link>
              <Nav.Link href="https://coraumd.wixsite.com/cora/community-partners">Joining Us</Nav.Link>
            </Navbar>
          </Navbar>
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
