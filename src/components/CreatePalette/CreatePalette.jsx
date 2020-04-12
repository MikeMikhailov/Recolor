import React, { useState } from 'react';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Drawer from './Drawer';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
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
  display: grid;
  grid-auto-rows: 23.75vh;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const EmptyPaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 95vh;
`;

const EmptyPaletteHeading = styled.h1`
  font-size: 10rem;
  color: ${secondaryTextColor};
  margin-top: 0px;
`;

const EmptyPaletteSubheading = styled.h1`
  font-size: 2rem;
  color: ${secondaryTextColor};
  margin-top: 0px;
  margin-bottom: 0px;
`;

const SortableColorBox = SortableElement(({ name, backgroundColor, deleteColor }) => (
  <ColorBox name={name} backgroundColor={backgroundColor} deleteColor={deleteColor} />
));

const SortableColorBoxesGrid = SortableContainer(({ items: paletteColors, deleteColor }) => {
  return (
    <ColorBoxesGrid>
      {paletteColors.map((colorObj, index) => (
        <SortableColorBox
          index={index}
          key={colorObj.color}
          name={colorObj.name}
          backgroundColor={colorObj.color}
          deleteColor={deleteColor}
        />
      ))}
    </ColorBoxesGrid>
  );
});

function CreatePalette() {
  const [drawerUnfolded, setDrawerUnfolded] = useState(false);
  const [paletteColors, setPaletteColors] = useState(palettes[0].colors);

  const reorderColors = ({ oldIndex, newIndex }) => {
    const newPaletteColors = [...paletteColors];
    newPaletteColors.splice(newIndex, 0, newPaletteColors.splice(oldIndex, 1)[0])
    setPaletteColors(newPaletteColors);
  };

  const deleteColor = (color) => {
    setPaletteColors(paletteColors.filter((colorObj) => colorObj.color !== color));
  }

  const PaletteContent =
    paletteColors.length > 0 ? (
      <SortableColorBoxesGrid items={paletteColors} axis="xy" onSortEnd={reorderColors} deleteColor={deleteColor} />
    ) : (
      <EmptyPaletteContainer>
        <EmptyPaletteHeading>\(^Д^)/</EmptyPaletteHeading>
        <EmptyPaletteSubheading>Wow! Such Empty</EmptyPaletteSubheading>
      </EmptyPaletteContainer>
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
        {PaletteContent}
      </PaletteContainer>
    </Container>
  );
}

export default CreatePalette;
