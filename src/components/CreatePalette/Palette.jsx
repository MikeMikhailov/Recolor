import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import ColorBox from './ColorBox.jsx';
import { secondaryTextColor } from '../../constants/globalColors';

const ColorBoxesGrid = styled.div`
  display: grid;
  grid-auto-rows: 11.875vh;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  @media (min-width: 500px) {
    grid-auto-rows: 23.75vh;
  }
  @media (min-width: 1500px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const EmptyPaletteContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 95vh;
  justify-content: center;
`;

const EmptyPaletteHeading = styled.h1`
  color: ${secondaryTextColor};
  font-size: 10rem;
  margin-top: 0px;
`;

const EmptyPaletteSubheading = styled.h1`
  color: ${secondaryTextColor};
  font-size: 2rem;
  margin-bottom: 0px;
  margin-top: 0px;
`;

const SortableColorBox = SortableElement(({ name, backgroundColor, deleteColor }) => (
  <ColorBox name={name} backgroundColor={backgroundColor} deleteColor={deleteColor} />
));

const SortableColorBoxesGrid = SortableContainer(({ paletteColors, deleteColor }) => {
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

function Palette({ paletteColors, setPaletteColors }) {
  const reorderColors = ({ oldIndex, newIndex }) => {
    const newPaletteColors = [...paletteColors];
    newPaletteColors.splice(newIndex, 0, newPaletteColors.splice(oldIndex, 1)[0]);
    setPaletteColors(newPaletteColors);
  };

  const deleteColor = (color) => {
    setPaletteColors(paletteColors.filter((colorObj) => colorObj.color !== color));
  };

  const PaletteContent =
    paletteColors.length > 0 ? (
      <SortableColorBoxesGrid
        paletteColors={paletteColors}
        axis="xy"
        onSortEnd={reorderColors}
        deleteColor={deleteColor}
      />
    ) : (
      <EmptyPaletteContainer>
        <EmptyPaletteHeading>\(^Д^)/</EmptyPaletteHeading>
        <EmptyPaletteSubheading>Wow! Such Empty</EmptyPaletteSubheading>
      </EmptyPaletteContainer>
    );

  return <>{PaletteContent}</>;
}

Palette.propTypes = {
  paletteColors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ),
  setPaletteColors: PropTypes.func.isRequired,
};

Palette.defaultProps = {
  paletteColors: [],
};

export default Palette;
