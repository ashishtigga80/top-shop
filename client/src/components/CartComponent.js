import React from 'react';
import {Card,Spinner,Button,  Row, Col, Container, InputGroup, FormControl} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = (props) => {

  const DeletefromCart = (productId) => {
    props.deletefromCart(productId)
  }

  const UpdateCart = (productId, quantity) => {
    if(quantity === 0 ){
      props.deletefromCart(productId)
    }else{
      props.updateCart(productId, quantity)
    }
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
                <Link to="/cart/checkout"><Button variant="outline-dark">Checkout</Button></Link>
              </Card.Body>
            </Card>
          </Col>  
        </Row>
      )
    }
  }

  const Empty = () => {
    return(<Row className="justify-content-center">
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                <Card.Title className="title-strong">No items in Cart.</Card.Title>
              </Card.Body>
            </Card>
          </Col>  
        </Row>)
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
                      <Button variant="outline-dark" id="button-addon1" onClick={() => UpdateCart(product.productId, product.quantity-1)}>
                        -
                      </Button>
                      <FormControl
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        placeholder={product.quantity}
                        disabled
                      />
                      <Button variant="outline-dark" id="button-addon2" onClick={() => UpdateCart(product.productId, product.quantity+1)}>
                        +
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
                <Button variant="outline-dark" onClick={() => DeletefromCart(product.productId)}>Delete</Button>
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
                <Card.Title className="title-strong">My Cart</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Cart Total: ₹{props.cart.cart.cartTotal}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>  
        </Row>
        {props.cart.cart.products.length === 0 ? <Empty /> : <></>}
        {CartItems}
        <Checkout />
      </Container>
      </>
    )  
  }  
}


export default Cart;