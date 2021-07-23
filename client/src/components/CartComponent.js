import React, {useEffect} from 'react';
import {Card,Spinner,  Row, Col, Container} from 'react-bootstrap';
import Header from './HeaderComponent';

const Cart = (props) => {

  useEffect(() => {
    props.fetchCart();
  });

  if(props.products.isLoading) {
    return(
      <div >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
  )}
  else{
    const products = props.products.products.map((product) => {
      return(
        <Col sm={3} key={product._id} className='Col-padding'>
          <Card border="dark">
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle>
                ₹{product.price}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return(
      <>
      <Header user = {props.user}/>  
      <Container>
        <Row>
          {products}
        </Row>
      </Container>
      </>
    )
  }  
}


export default Cart;