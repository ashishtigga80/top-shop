import {Spinner, Row, Col, Container} from 'react-bootstrap';

const Loading = () => {
  return(
    <Container className="mt-5">
      <Row>
        <Col align="center" md={12}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      </Row>  
    </Container>)
} 

export default Loading;