import React from 'react';
import PropTypes from 'prop-types';

function MiniPalette({ name }) {
  return (
    <div className="mini-palette">
      <h1>{name}</h1>
    </div>
  );
}

MiniPalette.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MiniPalette;
