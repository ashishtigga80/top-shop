import React from 'react';
import {Card,Spinner,Button,  Row, Col, Container, InputGroup, FormControl} from 'react-bootstrap';
import Header from './HeaderComponent';
import { Link } from 'react-router-dom';

const Cart = (props) => {

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
                <Link to="/cart/checkout"><Button variant="outline-dark">Checkout</Button></Link>
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
                    <Card.Text>Quantity</Card.Text>
                  </Col>
                </Row>
                <Row className="Row-padding">
                  <Col md={2}>
                    <InputGroup size="sm">
                      <Link to={'/products/updatecart/' + product.productId + '?quantity=' + (product.quantity-1)}><Button variant="outline-dark" id="button-addon1">
                        -
                      </Button></Link>
                      <FormControl
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        placeholder={product.quantity}
                        disabled
                      />
                      <Link to={'/products/updatecart/' + product.productId + '?quantity=' + (product.quantity+1)}><Button variant="outline-dark" id="button-addon2">
                        +
                      </Button></Link>
                    </InputGroup>
                  </Col>
                </Row>
                <Link to={"/products/deletefromcart/" + product.productId}><Button variant="outline-dark">Delete</Button></Link>
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
                <Card.Title className="title-strong">My Cart</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Cart Total: ₹{props.cart.cart.cartTotal}</Card.Subtitle>
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


export default Cart;