import React from 'react';
import {Card,Spinner,Button,  Row, Col, Container, Form} from 'react-bootstrap';
import Header from './HeaderComponent';
import { Link } from 'react-router-dom';
import Stripe from './Stripe'

const Checkout = (props) => {

  const AddressForm = () => {
    return(
    <Form>
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="firstname">Firstname</Form.Label >
            <Form.Control id="firstname" name="firstname" type="text" placeholder="Enter firstname" required/>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="lastname">Lastname</Form.Label >
            <Form.Control id="lastname" name="lastname" type="text" placeholder="Enter lastname" required/>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="email">Email</Form.Label >
            <Form.Control id="email" name="email" type="email" placeholder="Enter email" required/>
          </Form.Group>
        </Col>
      </Row>
      <Row >
        <Col md={4}>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="contactno">Contact No.</Form.Label >
            <Form.Control id="contactno" name="contactno" type="text" placeholder="Enter Mobile no." required/>
          </Form.Group>
        </Col>
      </Row>
      <Row >
        <Col md={4}>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="street">Street</Form.Label >
            <Form.Control id="street" name="street" type="text" placeholder="Street" required/>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="line1">Line 1</Form.Label >
            <Form.Control id="line1" name="line1" type="text" placeholder="Line1" required/>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="city">City</Form.Label >
            <Form.Control id="city" name="city" type="text" placeholder="City" required/>
          </Form.Group>
        </Col>
      </Row>
      <Row >
        <Col md={4}>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="pincode">Pincode</Form.Label >
            <Form.Control id="pincode" name="pincode" type="text" placeholder="Pincode" required/>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="state">State</Form.Label >
            <Form.Control id="state" name="state" type="text" placeholder="State" required/>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="country">Country</Form.Label >
            <Form.Control id="country" name="country" type="text" placeholder="Country" required/>
          </Form.Group>
        </Col>
      </Row>
    </Form>)
  }


  const Checkout = () => {
    if(props.cart.cart.products.length === 0){
      return(<div></div>)
    }
    else{
      return(
        <Row className="justify-content-center">
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Total: ₹{props.cart.cart.cartTotal}</Card.Subtitle>
                <Stripe amount = {props.cart.cart.cartTotal} user = {props.user.user._id} checkout={props.checkout}/>
              </Card.Body>
            </Card>
          </Col>  
        </Row>
      )
    }
  }


  
  
  if(props.cart.isLoading) {
    return(
      <div >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
  )}
  else{
    const CartItems = props.cart.cart.products.map((product) => {
      return(
        <Row key={product._id}>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Price: ₹{product.price}</Card.Subtitle>
                <Row className="Row-padding">
                  <Col md={2}>
                    <Card.Text><i> Quantity</i> - {product.quantity}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>)
    })
    return(
      <>
      <Header user = {props.user}/>  
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                <Card.Title className="title-strong">Checkout</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Total: ₹{props.cart.cart.cartTotal}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>  
        </Row>
        <Row className="justify-content-center">
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                <Card.Title className="title-strong">Address and Contact.No</Card.Title>
                <AddressForm />
              </Card.Body>
            </Card>
          </Col>  
        </Row>
        {CartItems}
        <Checkout />
      </Container>
      </>
    )  
  }  
}


export default Checkout;