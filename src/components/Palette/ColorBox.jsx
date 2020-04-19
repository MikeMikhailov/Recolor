import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import chroma from 'chroma-js';
import Modal from './Modal.jsx';
import { halfTransparent, quaterTransparent, primaryTextColor } from '../../constants/globalColors';

const Container = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.backgroundColor,
  },
}))`
  position: relative;
`;

const CopyArea = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 90%;
  justify-content: center;
  width: 100%;
`;

const CopyButton = styled.button`
  background-color: transparent;
  border: 2px solid ${halfTransparent};
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  opacity: 0;
  padding: 10px 30px;
  transition-duration: 200ms;
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
  ${CopyArea}:hover & {
    opacity: 1;
  }
  ${CopyArea}:active & {
    transform: scale(0.95);
  }
`;

const ContentContainer = styled.div`
  align-items: flex-end;
  display: flex;
  height: 10%;
  justify-content: space-between;
  padding: 0 0 0 5px;
  width: 100%;
  & span {
    color: ${(props) =>
      chroma.contrast(props.backgroundColor, '#ffffff') >
      chroma.contrast(props.backgroundColor, primaryTextColor)
        ? '#ffffff'
        : primaryTextColor};
    font-size: 1rem;
    text-transform: uppercase;
    line-height: 1.5rem;
  }
`;

const MoreButton = styled.button`
  background-color: ${halfTransparent};
  border: none;
  height: 1.5rem;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  transition-duration: 150ms;
  &:hover {
    background-color: ${quaterTransparent};
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.95);
  }
`;

function ColorBox({ backgroundColor, name, colorId, singleColor }) {
  const [copied, setCopied] = useState(false);
  const { paletteId } = useParams();
  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 750);
  };
  return (
    <Container backgroundColor={backgroundColor}>
      {copied ? <Modal backgroundColor={backgroundColor} /> : ''}
      <CopyToClipboard text={backgroundColor} onCopy={copyToClipboard}>
        <CopyArea>
          <CopyButton type="button">Copy</CopyButton>
        </CopyArea>
      </CopyToClipboard>
      <ContentContainer backgroundColor={backgroundColor}>
        <span>{name}</span>
        {!singleColor ? (
          <Link to={`/palette/${paletteId}/${colorId}`}>
            <MoreButton type="button">More</MoreButton>
          </Link>
        ) : null}
      </ContentContainer>
    </Container>
  );
}

ColorBox.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  colorId: PropTypes.string.isRequired,
  singleColor: PropTypes.bool.isRequired,
};

export default ColorBox;
