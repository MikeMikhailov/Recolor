import React from 'react';
import PropTypes from 'prop-types';
import ColorBox from './ColorBox';
import '../scss/Palette.scss';

function Palette({ colors }) {
  const colorBoxes = colors.map((colorObj) => (
    <ColorBox name={colorObj.name} background={colorObj.color} key={colorObj.color} />
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
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
    }),
  ),
};

export default Palette;
