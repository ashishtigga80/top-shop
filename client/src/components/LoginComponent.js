import React  from 'react';
import {Container, Card, Row, Col, Form, Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

const Login = (props) => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.login(event.target.email.value, event.target.password.value)

  }
  return(
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="Col-padding">
            <Card border="dark">
              <Card.Header>Login to Shopinit</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
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
  );
}


export default withRouter(Login);