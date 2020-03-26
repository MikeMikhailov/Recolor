import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Slider, Select } from 'antd';
import { colorLightnessValues } from '../helpers/paletteGenerator';
import '../scss/Navbar.scss';

const { Option } = Select;
const { Header } = Layout;
const marks = colorLightnessValues.reduce((accum, next) => ({ ...accum, [next]: `${next}` }), {});

function Navbar({ setLightness, setColorCoding }) {
  return (
    <Header className="header">
      <div className="header__nav header__nav_left">
        <h2 className="header__title">Recolor</h2>
        <Slider
          className="header__slider"
          min={colorLightnessValues[0]}
          max={colorLightnessValues[colorLightnessValues.length - 1]}
          marks={marks}
          step={null}
          defaultValue={500}
          tipFormatter={null}
          onChange={setLightness}
          dropdownMatchSelectWidth={false}
        />
      </div>
      <div className="header__nav header__nav_right">
        <Select className="header__selector" defaultValue="hex" onChange={setColorCoding}>
          <Option value="hex">HEX — #ffffff</Option>
          <Option value="rgb">RGB — rgb(255,255,255)</Option>
          <Option value="rgba">RGBA — rgba(255,255,255,1)</Option>
        </Select>
      </div>
    </Header>
  );
}

Navbar.propTypes = {
  setLightness: PropTypes.func.isRequired,
  setColorCoding: PropTypes.func.isRequired,
};

export default Navbar;
