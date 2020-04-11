import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import generatePalette from '../../helpers/paletteGenerator';
import seedColors from '../../helpers/seedColors';
import { primaryTextColor, halfTransparent } from '../../styles/globalColors';

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100vw;
`;

const ColorBoxesWrap = styled.div`
  min-height: 90vh;
  width: 100%;
`;

const ColorBoxesGrid = styled.div`
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

const Footer = styled.div`
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

const GoBackBox = styled.div`
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoBackButton = styled.button`
  background-color: transparent;
  border: 2px solid ${halfTransparent};
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  padding: 10px 30px;
  font-weight: bold;
  transition-duration: 200ms;
  text-transform: uppercase;
  ${GoBackBox}:hover & {
    border-color: #ffffff;
  }
  &:focus {
    outline: none;
  }
  ${GoBackBox}:active & {
    transform: scale(0.95);
  }
`;

const GoBackIcon = styled(ArrowLeftOutlined)`
  margin-right: 10px;
`;

function Palette({ singleColor }) {
  const [lightness, setLightness] = useState(500);
  const [colorCoding, setColorCoding] = useState('hex');
  const { paletteId, colorId } = useParams();
  const history = useHistory();
  const { name, emoji, colors } = generatePalette(
    seedColors.find((palette) => palette.id === paletteId),
  );

  let colorBoxes;

  if (!singleColor) {
    colorBoxes = colors[lightness].map((colorObj) => (
      <ColorBox
        name={colorObj.name}
        backgroundColor={colorObj[colorCoding]}
        colorId={colorObj.id}
        key={colorObj.id}
        singleColor={singleColor}
      />
    ));
  } else {
    colorBoxes = Object.values(colors).reduce((accum, next, i) => {
      const foundColorObj = next.find((colorObj) => colorObj.id === colorId);
      accum.push(
        <ColorBox
          name={foundColorObj.name}
          backgroundColor={foundColorObj[colorCoding]}
          colorId={foundColorObj.id}
          key={Object.entries(colors)[i][0]}
          singleColor={singleColor}
        />,
      );
      return accum;
    }, []);
    colorBoxes.push(
      <GoBackBox onClick={() => history.push(`/palette/${paletteId}`)} key={1000}>
        <GoBackButton>
          <GoBackIcon />
          Go Back
        </GoBackButton>
      </GoBackBox>,
    );
  }

  const colorsCount = colorBoxes.length;

  return (
    <Container>
      <Navbar
        setLightness={setLightness}
        setColorCoding={setColorCoding}
        singleColor={singleColor}
        lightness={lightness}
      />
      <ColorBoxesWrap>
        <ColorBoxesGrid colorsCount={colorsCount}>{colorBoxes}</ColorBoxesGrid>
      </ColorBoxesWrap>
      <Footer>
        <PaletteName>{`${name} ${emoji}`}</PaletteName>
      </Footer>
    </Container>
  );
}

Palette.propTypes = {
  singleColor: PropTypes.bool,
};

Palette.defaultProps = {
  singleColor: false,
};

export default Palette;
