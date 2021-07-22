import React, { Component } from 'react';
import {Container, Card, Row, Col, Form, Button} from 'react-bootstrap';

class Login extends Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.login(event.target.username.value, event.target.password.value)
  }
  
  render(){
    return(
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="Col-padding">
            <Card border="dark">
              <Card.Header>Login to Shopinit</Card.Header>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" >
                    <Form.Label htmlFor="username">Email address</Form.Label >
                    <Form.Control id="username" name="username" type="email" placeholder="Enter email" required/>
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
}

export default Login;