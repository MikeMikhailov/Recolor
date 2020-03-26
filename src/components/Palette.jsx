import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import '../scss/Palette.scss';

function Palette({ colors }) {
  const [lightness, setLightness] = useState(500);
  const [colorCoding, setColorCoding] = useState('hex');
  const colorBoxes = colors[lightness].map((colorObj) => (
    <ColorBox name={colorObj.name} background={colorObj[colorCoding]} key={colorObj.hex} />
  ));
  return (
    <div className="palette">
      {/* Navbar goes here */}
      <Navbar setLightness={setLightness} setColorCoding={setColorCoding} />
      <div className="palette__colors-wrap">
        <div className="palette__colors-grid">{colorBoxes}</div>
      </div>
      {/* Footer goes here */}
    </div>
  );
}

Palette.propTypes = {
  paletteName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  colors: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        hex: PropTypes.string,
        rgb: PropTypes.string,
        rgba: PropTypes.string,
      }),
    ),
  ).isRequired,
};

export default Palette;
