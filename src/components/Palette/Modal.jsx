import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const showModalMessage = keyframes`
  from {
    transform: scale(1.2);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const scaleModalBackground = keyframes`
from {
  transform: scale(1);
}

to {
  transform: scale(50);
}
`;

const ModalBackground = styled.div`
  animation: ${scaleModalBackground} 400ms ease-in-out 0ms 1 normal forwards;
  background-color: ${(props) => props.backgroundColor};
  height: 100%;
  position: absolute;
  transform: scale(50);
  width: 100%;
  z-index: 1;
`;

const ModalMessage = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2;
  animation: ${showModalMessage} 200ms ease-in-out 100ms 1 normal forwards;
  & h1 {
    background-color: #ffffff6f;
    color: #ffffff;
    font-size: 8rem;
    margin-bottom: 0;
    text-align: center;
    text-shadow: 2px 2px 0px #000000;
    width: 100%;
  }
  & h3 {
    color: #ffffff;
    font-size: 4rem;
    margin: 1em 0 0;
    text-shadow: 1px 1px 0px #000000;
  }
`;

function Modal({ backgroundColor }) {
  return (
    <>
      <ModalBackground backgroundColor={backgroundColor} />
      <ModalMessage>
        <h1>PASTE ME!</h1>
        <h3>{backgroundColor}</h3>
      </ModalMessage>
    </>
  );
}

Modal.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

export default Modal;
