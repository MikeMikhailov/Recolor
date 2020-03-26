import React from 'react';
import PropTypes from 'prop-types';
import '../scss/ColorBox.scss'

function ColorBox({ background: backgroundColor, name }) {
  const formattedName = name.split('').reduce((accum, current, i) => {
    let nextAccum = accum;
    if(i === 0) {
      nextAccum += current.toUpperCase();
    } else if(current.toUpperCase() === current && i !== 0) {
      nextAccum += ' ';
      nextAccum += current;
    } else {
      nextAccum += current;
    }
    return nextAccum;
  },);
  return (
    <div className="color-box" style={{ backgroundColor }}>
      <div className="color-box__copy-container">
        <button className="color-box__copy-btn" type="button">
          Copy
        </button>
      </div>
      <div className="color-box__content-container">
        <span className="color-box__name">{formattedName}</span>
        <button className="color-box__more-btn" type="button">
          MORE
        </button>
      </div>
    </div>
  );
}

ColorBox.propTypes = {
  background: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ColorBox;
