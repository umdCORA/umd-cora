import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
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
import cora_logo from './assests/cora_logo.png'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignInModal: false,
      showSignOutModal: false,
      showCreateAccountModal: false,
      showResetPasswordModal: false,
      userLoggedIn: false,
      userName: '',
      password: '',
      email: '',
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    //console.log(this.state);

    fetch("/api/v1/data/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": this.state.userName,
        "password": this.state.password
      }),
      redirect: "follow"
    }).then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    // console.log(response);
    this.setState({
      showSignInModal: false,
      showResetPasswordModal: false,
      userLoggedIn: true,
      password: '',
      email: '',
    });
  }


  handleCreateAccount = (event) => {
    event.preventDefault();
    //console.log(this.state);

    fetch("/api/v1/data/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": this.state.userName,
        "email": this.state.email,
        "password": this.state.password
      }),
      redirect: "follow"
    }).then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    // console.log(response);
    this.setState({
      showSignInModal: true,
      showResetPasswordModal: false,
      showCreateAccountModal: false,
      userLoggedIn: false,
      userName: '',
      password: '',
      email: '',
    });
  }


  renderResetPasswordModal = () => {
    const { showResetPasswordModal } = this.state;
    return (
      <Modal
        show={showResetPasswordModal}
        onHide={() => this.setState({showResetPasswordModal: false})}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Modal.Title>Reset Password</Modal.Title>
          <Form onSubmit={this.handleResetPassword}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginLeft: 0, marginTop: 0}}>Send Request</Button>
            <Form.Text>You will shortly receive an email to reset your password</Form.Text>
            <br />
            <Button variant="primary" onClick={() => this.setState({showResetPasswordModal: false, showSignInModal: true})}>Return to Sign In</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  renderSignInModal = () => {
    const { showSignInModal } = this.state;
    return (
      <Modal
        show={showSignInModal}
        onHide={() => this.setState({showSignInModal: false})}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Modal.Title>Welcome Back!</Modal.Title>
          <Form onSubmit={this.handleLogin}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  this.setState({userName: e.target.value});
                  // console.log(this.state);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  this.setState({password: e.target.value});
                  // console.log(this.state);
                }}
              />
            </Form.Group>
            <Form.Check label="Remember my sign in" />
            <Button variant="primary" type="submit">Sign In</Button>
            <Form.Text className="fake-link" onClick={() => this.setState({showSignInModal: false, showResetPasswordModal: true})}>Forgot your password?</Form.Text>
            <Form.Text className="fake-link" onClick={() => this.setState({showSignInModal: false, showCreateAccountModal: true})}>Create an Account</Form.Text>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  renderSignOutModal = () => {
    const { showSignOutModal } = this.state;

    return (
        <Modal show={showSignOutModal} onHide={() => this.setState({showSignOutModal: false})}>
          <Modal.Header closeButton>
            <Modal.Title>Sign out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Signed out successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({showSignOutModal: false, showSignInModal: true})}>
              Sign in as another user
            </Button>
            <Button variant="danger" onClick={() => this.setState({showSignOutModal: false})}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }

  renderCreateAccountModal = () => {
    const { showCreateAccountModal } = this.state;
    return (
      <Modal
        show={showCreateAccountModal}
        onHide={() => this.setState({showCreateAccountModal: false})}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Modal.Title>Create an Account</Modal.Title>
          <Form onSubmit={this.handleCreateAccount}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  this.setState({userName: e.target.value});
                  // console.log(this.state);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => {
                  this.setState({email: e.target.value});
                  // console.log(this.state);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  this.setState({password: e.target.value});
                  // console.log(this.state);
                }}
              />
            </Form.Group>
            <Form.Check label="Sign up for our newsletter to receive updates from CORA" />
            <Button variant="primary" type="submit">Sign Up!</Button>
            <Form.Text className="fake-link" onClick={() => this.setState({showCreateAccountModal:false, showSignInModal: true})}>I already have an account</Form.Text>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  render(){
    const {
      userLoggedIn,
    } = this.state;

    // resource-page should have pill on Find Resource tab
    const activeKey = window.location.pathname.includes('resource-page') ? '/' : window.location.pathname;
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
            </Nav>
            {!userLoggedIn &&
              <div className="signed-out-content">
                <Button variant="outline-dark" style={{marginRight: 10}} onClick={() => this.setState({showSignInModal: true})}>Sign In</Button>
                <Button variant="outline-dark" onClick={() => this.setState({showCreateAccountModal: true})}>Create Account</Button>
              </div>
            }
            {userLoggedIn &&
              <div className="signed-in-content">
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>Signed in as: {this.state.userName.split()[0][0].toUpperCase() + this.state.userName.split()[0].substr(1).toLowerCase()}</Navbar.Text>
                </Navbar.Collapse>
                <Button variant="outline-dark" onClick={() => this.setState({userLoggedIn: false, showSignOutModal: true})}>Sign Out</Button>
              </div>
            }
            </Navbar.Collapse>
          </Navbar>
          <div id="body-wrapper">
            <Switch>
              <Route path="/how-to-use-corabase">
                <HowToUseCORABase></HowToUseCORABase>
              </Route>
              <Route path="/join-a-research-study">
                <ResearchStudy></ResearchStudy>
              </Route>
              <Route path="/about-us">
                <AboutUs></AboutUs>
              </Route>
              <Route path="/resource-page/:uuid/:lat/:long" component={ResourcePage}/>
              <Route path="/" component={FindResource}/>
            </Switch>
          </div>
          <Navbar id="footer" className="mr-auto">
            <Navbar.Brand><Image id="cora_logo" src={cora_logo}></Image></Navbar.Brand>
            <Navbar className="ml-auto flex-column">
              <Navbar.Text>CORA FAQ |</Navbar.Text>
              <Navbar.Text>Contact |</Navbar.Text>
              <Navbar.Text>Joining Us</Navbar.Text>
            </Navbar>
          </Navbar>
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
