import React, { useEffect, useState } from 'react';
import axios from "axios";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Container, Row, Col, Form, Card, Button, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {

  const [urls, setUrlList] = useState<any[]>([]);
  useEffect(() => {
    axios.get('http://localhost:5000/urls')
      .then(res => setUrlList(res.data))
      .catch(err => toast.error(err));
  }, []);
  
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
        <Row className='mt-5'>
          <Col>
            <ListGroup>
              {urls.map((url, index) => (
                <div key={index}>
                  <ListGroup.Item>
                    <span className='long-link'>{url.longurl}</span>
                    <span>
                      <span className="short-link">
                        <a href={`https://shrtco.de/${url.shorturl}`} target="_blank" rel="noopener noreferrer">
                        {`https://shrtco.de/${url.shorturl}`}
                        </a>
                      </span>
                      <span className="copy">
                        <CopyToClipboard
                          id={`cp-${index}`}
                          text={`https://shrtco.de/${url.shorturl}`}>
                          <button
                            className={`btn btn-primary mb-2 text-right`}
                            onClick={() => toast.success('Copied') }
                          >
                          Copy
                          </button>
                        </CopyToClipboard>
                      </span>                
                    </span>
                  </ListGroup.Item>
                </div>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default App;
