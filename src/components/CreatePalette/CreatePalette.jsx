import React, { useState } from 'react';
import styled from 'styled-components';
import Drawer from './Drawer';
import Navbar from './Navbar';
import palettes from '../../helpers/seedColors';
import { secondaryTextColor } from '../../styles/globalColors';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
`;

const PaletteContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
`;

const ColorBoxesGrid = styled.div`
  ${(props) =>
    props.paletteColorsLength > 0 ?
    `
    display: grid;
    grid-auto-rows: 23.75vh;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    ` : `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 95vh;
    `}
`;

const EmptyPaletteHeading = styled.h1`
  font-size: 5rem;
  color: ${secondaryTextColor};
`;

const EmptyPaletteSubeading = styled.h1`
  font-size: 3rem;
  color: ${secondaryTextColor};
`;

function CreatePalette() {
  const [drawerUnfolded, setDrawerUnfolded] = useState(false);
  const [paletteColors, setPaletteColors] = useState(palettes[0].colors);

  const paletteContent =
    paletteColors.length > 0 ? (
      paletteColors.map((colorObj) => (
        <div style={{ backgroundColor: colorObj.color }} key={colorObj.color}>
          {colorObj.name}
        </div>
      ))
    ) : (
      <>
        <EmptyPaletteHeading>\(^Д^)/</EmptyPaletteHeading>
        <EmptyPaletteSubeading>Wow! Such Empty</EmptyPaletteSubeading>
      </>
    );
  return (
    <Container>
      <Drawer
        unfolded={drawerUnfolded}
        setPaletteColors={setPaletteColors}
        paletteColors={paletteColors}
      />
      <PaletteContainer>
        <Navbar
          setDrawerUnfolded={() => setDrawerUnfolded(!drawerUnfolded)}
          drawerUnfolded={drawerUnfolded}
        />
        <ColorBoxesGrid paletteColorsLength={paletteColors.length}>{paletteContent}</ColorBoxesGrid>
      </PaletteContainer>
    </Container>
  );
}

export default CreatePalette;
