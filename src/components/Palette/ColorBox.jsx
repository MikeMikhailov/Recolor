import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import PaletteModal from './Modal';

const Container = styled.div`
  position: relative;
  background-color: ${(props) => props.backgroundColor};
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
  border: 2px solid #ffffff6f;
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
    color: #ffffff;
    font-size: 1rem;
    text-transform: uppercase;
    line-height: 1.5rem;
  }
`;

const MoreButton = styled.button`
  background-color: #ffffff6f;
  border: none;
  height: 1.5rem;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  transition-duration: 150ms;
  &:hover {
    background-color: #ffffffbd;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.95);
  }
`;

function ColorBox({ background: backgroundColor, name }) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 750);
  };

  return (
    <Container backgroundColor={backgroundColor}>
      {copied ? <PaletteModal backgroundColor={backgroundColor} /> : ''}
      <CopyToClipboard text={backgroundColor} onCopy={copyToClipboard}>
        <CopyArea>
          <CopyButton type="button">Copy</CopyButton>
        </CopyArea>
      </CopyToClipboard>
      <ContentContainer>
        <span>{name}</span>
        <MoreButton type="button">More</MoreButton>
      </ContentContainer>
    </Container>
  );
}

ColorBox.propTypes = {
  background: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ColorBox;
