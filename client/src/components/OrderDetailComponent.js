import React from 'react';
import {Container, Button, Row, Spinner, Card, Col} from 'react-bootstrap';
import Header from './HeaderComponent';
import { useParams, Link } from "react-router-dom";
import dateFormat from 'dateformat';

const OrderDetail = (props) => {
  var { id } = useParams();
  if(props.order.isLoading) {
    return(
      <div >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
  )}
  else{
    var order = props.order.orders.find(x => x._id === id)

    const OrderItems = order.products.map((product) => {
      return(
        <Row key={product._id}>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Price: ₹{product.price}</Card.Subtitle>
                <Row className="Row-padding">
                  <Col md={2}>
                    <Card.Text>Quantity - {product.quantity}</Card.Text>
                  </Col>
                </Row>
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
                <Card.Title>Order Id: {order._id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Status: {order.status}</Card.Subtitle>
                <Card.Text>Order Date: {dateFormat(order.date, "dd/mm/yy")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                <Card.Title>Payment Details</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Payment Reference Id: {order.paymentId}</Card.Subtitle>
                <Card.Text>₹{order.totalamount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12}>
            <Card border="dark">
              <Card.Body>
                <Card.Title>Shipping Details</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{order.firstname} {order.lastname}</Card.Subtitle>
                <Row className="Row-padding">
                  <Col>
                    <Card.Text><p>{order.address.line1}, {order.address.street}, {order.address.city}</p></Card.Text>
                    <Card.Text><p>{order.address.state}, {order.address.country}, {order.address.pincode}</p></Card.Text>
                  </Col>
                </Row>
                <Row className="Row-padding">
                  <Col>
                    <Card.Text>Email: {order.email}, ContactNo.: {order.contactno}</Card.Text>
                  </Col>
                </Row>
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

export default OrderDetail;