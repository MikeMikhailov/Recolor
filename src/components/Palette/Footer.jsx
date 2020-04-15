import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { primaryTextColor } from '../../constants/globalColors';

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 5vh;
  justify-content: flex-end;
  padding: 0 50px;
`;

const PaletteName = styled.h3`
  color: ${primaryTextColor};
  margin: 0;
  font-size: 1.5rem;
`;

function Footer({ name, emoji }) {
  return (
    <Container>
      <PaletteName>{`${name} ${emoji}`}</PaletteName>
    </Container>
  );
}

Footer.propTypes = {
  name: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
};

export default Footer;
