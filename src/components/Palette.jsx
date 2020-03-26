import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import '../scss/Palette.scss';

function Palette({ colors }) {
  const [lightness, setLightness] = useState(500);
  const colorBoxes = colors[lightness].map((colorObj) => (
    <ColorBox name={colorObj.name} background={colorObj.hex} key={colorObj.hex} />
  ));
  return (
    <div className="palette">
      <Layout>
        {/* Navbar goes here */}
        <Navbar setLightness={setLightness} />
        <div className="palette__colors-wrap">{colorBoxes}</div>
        {/* Footer goes here */}
      </Layout>
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
