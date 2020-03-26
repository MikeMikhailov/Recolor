import React from 'react';
import PropTypes from 'prop-types';
import ColorBox from './ColorBox';
import '../scss/Palette.scss';

function Palette({ colors }) {
  const colorBoxes = colors[500].map((colorObj) => (
    <ColorBox name={colorObj.name} background={colorObj.hex} key={colorObj.hex} />
  ));
  return (
    <div className="palette">
      {/* Navbar goes here */}
      <div className="palette__colors-wrap">{colorBoxes}</div>
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
