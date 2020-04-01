import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import MiniPalette from './MiniPalette';
import palettes from '../../helpers/seedColors';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #3c40c6;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const PalettesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-auto-rows: 200px;
  column-gap: 50px;
  row-gap: 35px;
  width: 60%;
`;

function PaletteList() {
  return (
    <Container>
      <Navbar />
      <PalettesContainer>
        {palettes.map(({ id, name, colors, emoji }) => (
          <MiniPalette name={name} emoji={emoji} colors={colors} id={id} key={id} />
        ))}
      </PalettesContainer>
    </Container>
  );
}

export default PaletteList;
