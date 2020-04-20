import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { halfTransparent } from '../../constants/globalColors';

const Container = styled.div`
  align-items: center;
  background-color: #000000;
  display: flex;
  justify-content: center;
`;

const GoBackButton = styled.button`
  background-color: transparent;
  border-radius: 5px;
  border: 2px solid ${halfTransparent};
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 30px;
  text-transform: uppercase;
  transition-duration: 200ms;
  ${Container}:hover & {
    border-color: #ffffff;
  }
  &:focus {
    outline: none;
  }
  ${Container}:active & {
    transform: scale(0.95);
  }
`;

const GoBackIcon = styled(ArrowLeftOutlined)`
  margin-right: 10px;
`;

function GoBackBox({ paletteId }) {
  const history = useHistory();
  return (
    <Container onClick={() => history.push(`/palette/${paletteId}`)}>
      <GoBackButton>
        <GoBackIcon />
        Go Back
      </GoBackButton>
    </Container>
  );
}

GoBackBox.propTypes = {
  paletteId: PropTypes.string.isRequired,
};

export default GoBackBox;
