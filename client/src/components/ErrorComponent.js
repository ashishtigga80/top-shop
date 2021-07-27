import React from 'react';
import { slideInDown } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import {Row, Col, Container, Alert} from 'react-bootstrap';

const SlideInDownAnimation = keyframes`${slideInDown}`;
const SlideInDownDiv = styled.div`
  animation: 1s ${SlideInDownAnimation};
`;

const Error = (props) => {
  if(props.error.message !== '') {
    return(
      <SlideInDownDiv>
        <Container>
          <Row className="justify-content-center">
            <Col align="center" md={12}>
              <Alert variant="danger">
                {props.error.message}
              </Alert>
            </Col>
          </Row>
        </Container>
     </SlideInDownDiv>
    )
  }
  else{
    return(
      <>
      </>
    )  
  }  
}


export default Error;