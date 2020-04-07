import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const Container = styled.div`
  width: 20vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: ${(props) => (props.unfolded ? '0vw' : '-20vw')};
  transition-duration: 200ms;
  background-color: red;
`;

function Drawer({ unfolded }) {
  return (
    <Container unfolded={unfolded} />
  )
}

Drawer.propTypes = {
  unfolded: PropTypes.bool,
}

Drawer.defaultProps = {
  unfolded: false
}

export default Drawer
