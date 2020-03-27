import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import generatePalette from '../helpers/paletteGenerator';
import seedColors from '../helpers/seedColors';
import '../scss/Palette.scss';

const { Footer } = Layout;

function Palette() {
  const [lightness, setLightness] = useState(500);
  const [colorCoding, setColorCoding] = useState('hex');
  const { id } = useParams();
  const { paletteName, emoji, colors } = generatePalette(
    seedColors.find((palette) => palette.id === id),
  );

  const colorBoxes = colors[lightness].map((colorObj) => (
    <ColorBox name={colorObj.name} background={colorObj[colorCoding]} key={colorObj.hex} />
  ));

  return (
    <div className="palette">
      <Navbar setLightness={setLightness} setColorCoding={setColorCoding} />
      <div className="palette__colors-wrap">
        <div className="palette__colors-grid">{colorBoxes}</div>
      </div>
      <Footer className="palette__footer">
        <h3 className="palette__name">{`${paletteName} ${emoji}`}</h3>
      </Footer>
    </div>
  );
}

export default Palette;
