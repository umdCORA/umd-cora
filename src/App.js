import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Home from './components/Home/Home';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav className="justify-content-center" activeKey="/home">
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
      </div>
    </Router>
  );
}

export default App;
