import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Home from './components/Home/Home';
import { Navbar, Image } from 'react-bootstrap';
import cora_logo from './assests/cora_logo.png'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="primary" variant="primary">
          <Nav className="justify-content-center" activeKey="/home">
            <Image id="cora_logo" src={cora_logo}></Image>
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/general-info">General Opioid Information and Statistics</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/donate">Donate and Join CORA</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/research">Research Portion</Nav.Link>
            </Nav.Item>
          </Nav> 
        </Navbar>
      </div>
      <Switch>
        <Route path="/general-info">
          <div>info</div>
        </Route>
        <Route path="/donate">
          <div>donate</div>
        </Route>
        <Route path="/research">
          <div>research</div>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
