import React from 'react';
import PropTypes from 'prop-types'
import { Layout, Slider } from 'antd';
import { colorLightnessValues } from '../helpers/paletteGenerator';
import '../scss/Navbar.scss';

const { Header } = Layout;
const marks = colorLightnessValues.reduce((accum, next) => ({ ...accum, [next]: `${next}` }), {});

function Navbar({ setLightness }) {
  return (
    <Header className="header">
      <h2 className="header__title">Recolor</h2>
      <Slider
        className="header__slider"
        min={50}
        max={900}
        marks={marks}
        step={null}
        defaultValue={500}
        tipFormatter={null}
        onChange={setLightness}
      />
    </Header>
  );
}

Navbar.propTypes = {
  setLightness: PropTypes.func.isRequired,
}

export default Navbar;
