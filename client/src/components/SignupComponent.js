import React  from 'react';
import {Container, Card, Row, Col, Form, Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Error from './ErrorComponent';

const Signup = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signup(event.target.firstname.value, event.target.lastname.value, event.target.email.value, event.target.password.value)

  }
  return(
      <>
      
      <Container>
        <Error error = {props.error}/>
        <Row className="justify-content-center">
          <Col md={6} className="Col-padding">
            <Card border="dark">
              <Card.Header>Signup to Shopinit</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3 " >
                        <Form.Label htmlFor="firstname">Firstname</Form.Label >
                        <Form.Control id="firstname" name="firstname" type="text" placeholder="Enter firstname" required/>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" >
                        <Form.Label htmlFor="lastname">Lastname</Form.Label >
                        <Form.Control id="lastname" name="lastname" type="text" placeholder="Enter lastname" required/>
                      </Form.Group> 
                   </Col>
                  </Row>
                  <Form.Group className="mb-3" >
                    <Form.Label htmlFor="email">Email address</Form.Label >
                    <Form.Control id="email" name="email" type="email" placeholder="Enter email" required/>
                  </Form.Group>

                  <Form.Group className="mb-3" >
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control id="password" name="password" type="password" placeholder="Password" required/>
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </>
  );
}


export default withRouter(Signup);