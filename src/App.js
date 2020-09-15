import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Home from './components/Home/Home';

import './App.css';

function App() {
  return (
    <div className="App">
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="#">General Opioid Information and Statistics</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#">Donate and Join CORA</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#">Research Portion</Nav.Link>
        </Nav.Item>
      </Nav>
      <Home/>
    </div>
  );
}

export default App;
