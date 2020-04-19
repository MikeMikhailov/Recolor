import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ColorBox from './ColorBox.jsx';
import GoBackBox from './GoBackBox.jsx';

const Wrap = styled.div`
  min-height: 90vh;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 11.25vh;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  @media (min-width: 500px) {
    grid-auto-rows: minmax(22.5vh, ${(props) => `${90 / Math.ceil(props.colorsCount / 2)}vh`});
  }
  @media (min-width: 750px) {
    grid-auto-rows: minmax(22.5vh, ${(props) => `${90 / Math.ceil(props.colorsCount / 3)}vh`});
  }
  @media (min-width: 1000px) {
    grid-auto-rows: minmax(22.5vh, ${(props) => `${90 / Math.ceil(props.colorsCount / 4)}vh`});
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(22.5vh, ${(props) => `${90 / Math.ceil(props.colorsCount / 5)}vh`});
  }
`;

function ColorBoxesGrid({
  singleColor,
  lightness,
  colorCoding,
  colorId,
  paletteColors,
  paletteId,
}) {
  let colorBoxes;

  if (!singleColor) {
    colorBoxes = paletteColors[lightness].map((colorObj) => (
      <ColorBox
        name={colorObj.name}
        backgroundColor={colorObj[colorCoding]}
        colorId={colorObj.id}
        key={colorObj.id}
        singleColor={singleColor}
      />
    ));
  } else {
    colorBoxes = Object.values(paletteColors).reduce((accum, next, i) => {
      const foundColorObj = next.find((colorObj) => colorObj.id === colorId);
      accum.push(
        <ColorBox
          name={foundColorObj.name}
          backgroundColor={foundColorObj[colorCoding]}
          colorId={foundColorObj.id}
          key={Object.entries(paletteColors)[i][0]}
          singleColor={singleColor}
        />,
      );
      return accum;
    }, []);
    colorBoxes.push(<GoBackBox paletteId={paletteId} key={1000} />);
  }

  const colorsCount = colorBoxes.length;

  return (
    <Wrap>
      <Grid colorsCount={colorsCount}>{colorBoxes}</Grid>
    </Wrap>
  );
}

ColorBoxesGrid.propTypes = {
  singleColor: PropTypes.bool,
  lightness: PropTypes.number.isRequired,
  colorCoding: PropTypes.string.isRequired,
  colorId: PropTypes.string,
  paletteColors: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        hex: PropTypes.string.isRequired,
        rgb: PropTypes.string.isRequired,
        rgba: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
  paletteId: PropTypes.string.isRequired,
};

ColorBoxesGrid.defaultProps = {
  singleColor: false,
  colorId: '',
};

export default ColorBoxesGrid;
