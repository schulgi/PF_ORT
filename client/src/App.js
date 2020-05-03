import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import Navbar from './components/IndexPage/Navbar/Navbar';
import Banner from './components/IndexPage/Banner/Banner';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
      <div className="App">
        <Navbar/>
        <Banner/>
      </div>
  );
}

export default App;
