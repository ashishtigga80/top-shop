import React from 'react';
import { slideInDown } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import {Row, Col, Container, Alert} from 'react-bootstrap';

const SlideInDownAnimation = keyframes`${slideInDown}`;
const SlideInDownDiv = styled.div`
  animation: 0.2s ${SlideInDownAnimation};
`;

const Error = (props) => {
  if(props.error.message !== '') {
    return(
      <SlideInDownDiv>
        <Row className="justify-content-center">
          <Col align="center" md={6}>
            <Alert variant="danger">
              {props.error.message}
            </Alert>
          </Col>
        </Row>
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