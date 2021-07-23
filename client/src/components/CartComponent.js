import React, {useEffect} from 'react';
import {Card,Spinner,Button,  Row, Col, Container, InputGroup, FormControl} from 'react-bootstrap';
import Header from './HeaderComponent';

const Cart = (props) => {

  useEffect(() => {
    props.fetchCart();
  },[]);

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
        <Col key={product._id}md={12}>
          <Card>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Price: ₹{product.price}</Card.Subtitle>
              <Row>
                <Col md={2}>
                  <Card.Text>Quantity</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <InputGroup size="sm">
                    <Button variant="outline-dark" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      placeholder={product.quantity}
                      disabled
                    />
                    <Button variant="outline-dark" id="button-addon2">
                      +
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>)
    })
    return(
      <>
      <Header user = {props.user}/>  
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                <Card.Title className="title-strong">My Cart</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Cart Total: ₹{props.cart.cart.cartTotal}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>  
          {CartItems}
        </Row>
      </Container>
      </>
    )  
  }  
}


export default Cart;