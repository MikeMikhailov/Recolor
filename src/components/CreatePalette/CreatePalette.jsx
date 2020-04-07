import React, { useState } from 'react';
import styled from 'styled-components';
import Drawer from './Drawer';
import Navbar from './Navbar';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PaletteContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  background-color: blue;
`;

function NewPaletteForm() {
  const [unfolded, setUnfolded] = useState(false);
  return (
    <Container>
      <Drawer unfolded={unfolded} />
      <PaletteContainer>
        <Navbar setUnfolded={() => setUnfolded(!unfolded)} unfolded={unfolded} />
      </PaletteContainer>
    </Container>
  );
}

export default NewPaletteForm;
