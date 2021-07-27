import React from 'react';
import {Container, Col, Row, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';

const Products = (props) => {
  if(props.products.isLoading) {
    return(<Loading />
  )}
  else{
    const products = props.products.products.map((product) => {
      return(
        <Col sm={3} key={product._id} className='Col-padding'>
          <Card border="dark">
            <Card.Body>
              <Card.Title><Link to={'/products/' + product._id}>{product.name}</Link></Card.Title>
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