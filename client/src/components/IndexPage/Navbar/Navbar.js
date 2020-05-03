import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
//npm install react-bootstrap-validation --save
//npm i --save react-bootstrap
//https://react-bootstrap.netlify.app/

const navbar = props => (
      <div className="App">
          <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
              <ReactBootStrap.Navbar.Brand href="#home"></ReactBootStrap.Navbar.Brand>
              <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                  <ReactBootStrap.Nav className="mr-auto"></ReactBootStrap.Nav>
                   <ReactBootStrap.Nav>
                      <ReactBootStrap.Nav.Link href="">Log in</ReactBootStrap.Nav.Link>
                      <ReactBootStrap.Nav.Link eventKey={2} href="#memes">Registrarse</ReactBootStrap.Nav.Link>
                   </ReactBootStrap.Nav>
                 </ReactBootStrap.Navbar.Collapse>
          </ReactBootStrap.Navbar>
      </div>
);
  
  export default navbar;
  