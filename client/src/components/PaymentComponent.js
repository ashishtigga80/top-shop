import React from 'react';
import {Card,  Row, Col, Container} from 'react-bootstrap';
import Stripe from './Stripe'

const Payment = (props) => {

  const Checkout = () => {
      return(
        <Row className="justify-content-center">
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Total: ₹{props.cart.cart.cartTotal}</Card.Subtitle>
                <Stripe amount = {props.cart.cart.cartTotal} user = {props.user.user._id} checkout={props.checkout} shippingdetails = {props.cart.shippingdetails}/>
              </Card.Body>
            </Card>
          </Col>  
        </Row>
      )
    }

    return(
      <>
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                <Card.Title className="title-strong">Payment Method:</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Total: ₹{props.cart.cart.cartTotal}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>  
        </Row>
        <Row className="justify-content-center">
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                <Checkout />
              </Card.Body>
            </Card>
          </Col>  
        </Row>
      </Container>
      </>
    )  
  }  



export default Payment;