import React from 'react';
import {Card,Spinner,Button,  Row, Col, Container, Form, Alert} from 'react-bootstrap';
import { history } from '../App';


const Checkout = (props) => {

  if(props.cart.isLoading) {
    return(<div >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>)
    }
  else if(props.cart.cart.products.length === 0){
    return(
      <Row className="justify-content-center">
        <Col align="center">
          <Alert variant="warning">
            No Items in cart to checkout.
          </Alert>
        </Col>
      </Row>)
  }
  else{

      const handleSubmit = async (event) => {
        event.preventDefault();
        const shippingdetails = {
          firstname: event.target.firstname.value,
          lastname: event.target.lastname.value,
          email: event.target.email.value,
          contactno: event.target.contactno.value,
          address: {
            street: event.target.street.value,
            line1: event.target.line1.value,
            city: event.target.city.value,
            pincode: event.target.pincode.value,
            state: event.target.state.value,
            country: event.target.country.value,
          }
        }
        await props.shippingDetails(shippingdetails);
        history.push('/cart/checkout/pay');
      }

      const AddressForm = () => {
      return(
      <Form onSubmit={handleSubmit}>
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
        <Row className="justify-content-center">
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">Total: ₹{props.cart.cart.cartTotal}</Card.Subtitle>
                  <Button variant="outline-success" type="submit">Pay and Confirm</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
      )
    }

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
        {CartItems}
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
      </Container>
      </>
    )  
  }  
}


export default Checkout;