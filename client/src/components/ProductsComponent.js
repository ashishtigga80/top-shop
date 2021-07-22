import React from 'react';
import {Container, Col, Row, Spinner, Card} from 'react-bootstrap';
import Header from './HeaderComponent';

const Products = (props) => {
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
      <Header />
      <Container>
        <Row>
          {products}
        </Row>
      </Container>
      </>
    )
  }    
}

export default Products;