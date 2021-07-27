import React from 'react';
import {Alert, Row, Col, Container, Spinner} from 'react-bootstrap';

const Home = (props) => {

  if(props.user.userloading){
    return(
      <div >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }
  else{
    return(
      <>
       
      <Container>
        <Row>
          <Col>
            <Alert variant='info' >
              Welcome to Shopinit. Your one-stop destination for safe and easy shopping.
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed sodales felis, a pulvinar diam. Aliquam euismod massa arcu, in finibus est feugiat eu. Morbi viverra, arcu finibus blandit auctor, neque nunc pulvinar velit, auctor hendrerit nisl nibh eget velit. Donec in magna ac risus imperdiet molestie. In ut rutrum lectus. Donec nec gravida metus, non suscipit metus. Morbi sed augue felis. Phasellus luctus, mi in molestie vestibulum, libero ipsum pharetra odio, in aliquam diam nibh ac enim. Suspendisse potenti. Donec finibus quam non urna interdum laoreet. Mauris elit felis, lacinia a quam ornare, elementum tristique erat. Donec ut auctor sapien.</p>
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}


export default Home;