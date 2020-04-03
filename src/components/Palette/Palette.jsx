import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import generatePalette from '../../helpers/paletteGenerator';
import seedColors from '../../helpers/seedColors';

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
  grid-auto-rows: minmax(11.25vh, 22.5vh);
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

const Footer = styled(Layout.Footer)`
  align-items: center;
  display: flex;
  height: 5vh;
  justify-content: flex-end;
  padding: 0 24px;
`;

const PaletteName = styled.h3`
  color: #363636;
  margin: 0;
`;

function Palette() {
  const [lightness, setLightness] = useState(500);
  const [colorCoding, setColorCoding] = useState('hex');
  const { id } = useParams();
  const { name, emoji, colors } = generatePalette(seedColors.find((palette) => palette.id === id));

  const colorsCount = colors[lightness].length;

  const colorBoxes = colors[lightness].map((colorObj) => (
    <ColorBox name={colorObj.name} background={colorObj[colorCoding]} key={colorObj.hex} />
  ));

  return (
    <Container>
      <Navbar setLightness={setLightness} setColorCoding={setColorCoding} />
      <ColorBoxesWrap>
        <ColorBoxesGrid colorsCount={colorsCount}>
          {colorBoxes}
        </ColorBoxesGrid>
      </ColorBoxesWrap>
      <Footer>
        <PaletteName>{`${name} ${emoji}`}</PaletteName>
      </Footer>
    </Container>
  );
}

export default Palette;