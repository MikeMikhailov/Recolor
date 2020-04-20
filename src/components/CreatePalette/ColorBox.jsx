import React from 'react';
import PropTypes from 'prop-types';
import { DeleteFilled } from '@ant-design/icons';
import styled from 'styled-components';
import chroma from 'chroma-js';
import { primaryTextColor } from '../../constants/globalColors';

const Container = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.backgroundColor,
  },
}))`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  & > span {
    color: ${(props) =>
      chroma.contrast(props.backgroundColor, '#ffffff') >
      chroma.contrast(props.backgroundColor, primaryTextColor)
        ? '#ffffff'
        : primaryTextColor};
    font-size: 1rem;
    text-transform: uppercase;
    line-height: 1rem;
  }

  & > * {
    user-select: none;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${primaryTextColor};
  cursor: pointer;
  font-size: 1rem;
  margin: 0;
  padding: 0;
  transition-duration: 150ms;
  ${Container}:hover & {
    color: #ffffff;
    transform: scale(1.2);
  }
`;

function ColorBox({ backgroundColor, name, deleteColor }) {
  return (
    <Container backgroundColor={backgroundColor}>
      <span>{name}</span>
      <DeleteButton onClick={() => deleteColor(backgroundColor)}>
        <DeleteFilled />
      </DeleteButton>
    </Container>
  );
}

ColorBox.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deleteColor: PropTypes.func.isRequired,
};

export default ColorBox;
