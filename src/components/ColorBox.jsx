import React from 'react';
import PropTypes from 'prop-types'

function ColorBox({ background, name }) {
  return (
    <div className="palette__color-box" style={{backgroundColor: background}}>
      <span>{name}</span>
      <span>More</span>
    </div>
  )
}

ColorBox.propTypes = {
  background: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default ColorBox
