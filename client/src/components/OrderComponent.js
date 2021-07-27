import React from 'react';
import {Card,Spinner, Row, Col, Container, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Order = (props) => {

  const Empty = () => {
    return(<Row className="justify-content-center">
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                <Card.Title className="title-strong">No Orders Yet.</Card.Title>
              </Card.Body>
            </Card>
          </Col>  
        </Row>)
  }

  if(props.order.isLoading) {
    return(
      <div >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
  )}
  else if(props.order.orders === undefined){
    return(
      <>
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
        <Row className="justify-content-center">
          <Col align="center">
          <Alert variant="warning">
            No Orders Yet!
          </Alert>
          </Col>
        </Row>
        </Container>
      </>
    )
  }
  else{
    const OrderItems = props.order.orders.map((order) => {
      return(
        <Row key={order._id}>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>Order Id - <Link to={"/orders/" + order._id}>{order._id}</Link></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Status: {order.status}</Card.Subtitle>
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
                <Card.Title className="title-strong">My Orders</Card.Title>
              </Card.Body>
            </Card>
          </Col>  
        </Row>
        {props.order.orders.length === 0 ? <Empty /> : <></>}
        {OrderItems}
      </Container>
      </>
    )  
  }  
}


export default Order;