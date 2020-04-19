import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../components/Palette/Navbar.jsx';
import ColorBoxesGrid from '../components/Palette/ColorBoxesGrid.jsx';
import Footer from '../components/Palette/Footer.jsx';
import generatePalette from '../services/paletteGenerator';

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100vw;
`;

function Palette({ singleColor }) {
  const [lightness, setLightness] = useState(500);
  const [colorCoding, setColorCoding] = useState('hex');
  const palettes = useSelector((state) => state.palettes);
  const { paletteId, colorId } = useParams();
  const { name, emoji, colors: paletteColors } = generatePalette(
    palettes.find((palette) => palette.id === paletteId),
  );

  return (
    <Container>
      <Navbar
        lightness={lightness}
        setLightness={setLightness}
        setColorCoding={setColorCoding}
        singleColor={singleColor}
      />
      <ColorBoxesGrid
        singleColor={singleColor}
        lightness={lightness}
        colorCoding={colorCoding}
        colorId={singleColor ? colorId : undefined}
        paletteColors={paletteColors}
        paletteId={paletteId}
      />
      <Footer name={name} emoji={emoji} />
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
