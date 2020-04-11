import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { halfTransparent } from '../../styles/globalColors';

const Container = styled.div`
  width: 60%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  color: white;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

const CreatePaletteLink = styled(Link)`
  font-size: 1.25rem;
  color: white;
  font-weight: 500;
  color: ${halfTransparent};
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
