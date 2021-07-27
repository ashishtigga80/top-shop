import React from 'react';
import {Container, Button, Row, Card, Col} from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import Loading from './LoadingComponent';

const ProductDetail = (props) => {

  var { id } = useParams();

  const AddtoCart = (productId) => {
      props.addtoCart(productId)
  }

  if(props.products.isLoading) {
    return(<Loading />
  )}
  else{
    
    var product = props.products.products.find(x => x._id === id)

    return(
      <>
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <Card >
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">₹{product.price}</Card.Subtitle>
                <Card.Text>{product.description}
                </Card.Text>
                <Button variant="outline-dark" onClick={() => AddtoCart(product._id)}>Add to Cart</Button>{' '}
                <Link to="/cart"><Button variant="outline-dark">View Cart</Button></Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </>
    )
  }    
}

export default ProductDetail;