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

  componentDidMount(){
    fetch('http://localhost:5000/api/account/signin')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
    });
  }

}



export default App;
