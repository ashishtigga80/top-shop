import React from 'react';
import {Card,Spinner,Button,  Row, Col, Container} from 'react-bootstrap';
import Header from './HeaderComponent';
import { Link } from 'react-router-dom';

const Order = (props) => {

  if(props.order.isLoading) {
    return(
      <div >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
  )}
  else{
    const OrderItems = props.order.orders.map((order) => {
      return(
        <Row key={order._id}>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>{order._id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Status: {order.status}</Card.Subtitle>
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
                <Card.Title className="title-strong">My Orders</Card.Title>
              </Card.Body>
            </Card>
          </Col>  
        </Row>
        {OrderItems}
      </Container>
      </>
    )  
  }  
}


export default Order;