import React from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import palettes from '../helpers/seedColors';

function PaletteList() {
  return (
    <div>
      {palettes.map((palette) => (
        <Link to={`/palette/${palette.id}`} key={palette.id}>
          <MiniPalette name={palette.paletteName} />
        </Link>
      ))}
    </div>
  );
}

export default PaletteList;
