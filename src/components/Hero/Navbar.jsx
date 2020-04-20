import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { halfTransparent } from '../../constants/globalColors';

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: space-between;
  min-width: 325px;
  width: 60%;
`;

const Logo = styled(Link)`
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
  &:hover {
    color: #ffffff;
  }
`;

const CreatePaletteLink = styled(Link)`
  color: ${halfTransparent};
  font-size: 1.25rem;
  font-weight: 500;
  &:hover {
    color: #ffffff;
  }
`;

function Navbar() {
  return (
    <Container>
      <Logo to="/">Recolor</Logo>
      <CreatePaletteLink to="/palette/new">Create new palette</CreatePaletteLink>
    </Container>
  );
}

export default Navbar;
