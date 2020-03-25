import React from 'react';
import seedColors from '../helpers/seedColors';
import Palette from './Palette';

function App() {
  const { paletteName, id, emoji, colors } = seedColors[1];
  return <Palette paletteName={paletteName} id={id} emoji={emoji} colors={colors} />;
}

export default App;
