import React from 'react';
import axios from "axios";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Container, Row, Col, Form, Card, Button, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Container className='main-area pt-5'>
        <Row>
          <Col>
            <h5 className="card-header text-center">
              Welcome to the URL Shortner
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
