import React from 'react';
import seedColors from '../helpers/seedColors';
import generatePalette from '../helpers/paletteGenerator';
import Palette from './Palette';

function App() {
  const { paletteName, id, emoji, colors } = generatePalette(seedColors[1], 'hex');
  return <Palette paletteName={paletteName} id={id} emoji={emoji} colors={colors} />;
}

export default App;
