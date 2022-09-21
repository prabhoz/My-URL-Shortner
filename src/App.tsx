import React, { useEffect, useState } from 'react';
import axios from "axios";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Container, Row, Col, Form, Card, Button, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {

  const [urls, setUrlList] = useState<any[]>([]);
  const [longUrl, setUrl] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/urls')
      .then(res => setUrlList(res.data))
      .catch(err => toast.error(err));
  }, []);
  
  const shortenUrl = async () => {
    try {
      if (longUrl === "") {
        toast.error('Please, provide a valid url')
      } else {
        const res = await axios(
          `https://api.shrtco.de/v2/shorten?url=${longUrl}`
        )
        if (res.data.ok) {
          const urlobj = {
            longurl: res.data.result.original_link,
            shorturl: res.data.result.code
          };
          const response = await axios.post("http://localhost:5000/urls", urlobj);
          if (response.status === 201) {
            setUrlList([...urls, urlobj])
            setUrl('')
            toast.success(`Your shorten link is ${res.data.result.full_short_link}`)
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) 
        toast.error('Unable to shorten that link. It is not a valid url.')
      else
        toast.error('Woops. Something went wrong. Please try again.')
    }
  }

  return (
    <div className="App">
      <Container className='main-area pt-5'>
        <Card className='rounded'>
          <h5 className="card-header text-center">
            Welcome to the URL Shortner
          </h5>
          <Card.Body className='text-center'>
            <Form noValidate>
              <Row>
                <Col xs={12} sm={9}>
                  <Form.Control type="text"
                    onChange={e => setUrl(e.target.value)}
                    value={longUrl}
                    placeholder="Shorten your link" />
                </Col>
                <Col xs={12} sm={3}>
                  <Button variant="primary" onClick={shortenUrl}>Shorten</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
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
