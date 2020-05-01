import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';

const banner = props => (
    <div className="App">
        <ReactBootStrap.Jumbotron>
            <h1>El mejor abogado para vos, al mejor precio.</h1>
            <p>
              Comenza a resolver tus dudas legales ahora.
            </p>
            <p>
                <ReactBootStrap.Button variant="info">Aprende más</ReactBootStrap.Button>
            </p>
        </ReactBootStrap.Jumbotron>
    </div>
);

export default banner;