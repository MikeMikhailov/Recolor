import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Slider, Select, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Header, Navigation } from '../General/Navbar';
import { colorLightnessValues } from '../../services/paletteGenerator';
import { primaryTextColor } from '../../constants/globalColors';

const { Option } = Select;
const marks = colorLightnessValues.reduce((accum, next) => ({ ...accum, [next]: `${next}` }), {});

const openNotification = (placement) => {
  notification.info({
    message: 'Color Coding Changed',
    duration: 1,
    placement,
  });
};

const LogoLink = styled.div`
  color: ${primaryTextColor};
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5rem;
`;

const BackIcon = styled(ArrowLeftOutlined)`
  margin-right: 10px;
`;

const LightnessSlider = styled(Slider)`
  width: 50vw;
  @media (min-width: 1200px) {
    width: 30vw;
  }
`;

function Navbar({ lightness, setLightness, setColorCoding, singleColor }) {
  const history = useHistory();
  const { paletteId, colorId } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () => window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, []);
  const lightnessController =
    windowWidth > 750 ? (
      <LightnessSlider
        min={colorLightnessValues[0]}
        max={colorLightnessValues[colorLightnessValues.length - 1]}
        marks={marks}
        step={null}
        defaultValue={lightness}
        tipFormatter={null}
        onChange={setLightness}
        dropdownMatchSelectWidth={false}
      />
    ) : (
      <Select defaultValue={500} onChange={setLightness}>
        {colorLightnessValues.map((value) => (
          <Option value={value} key={value}>{value}</Option>
        ))}
      </Select>
    );
  const backPath = colorId !== undefined ? `/palette/${paletteId}` : '/';
  return (
    <Header>
      <Navigation>
        <LogoLink onClick={() => history.push(backPath)}>
          <BackIcon />
          Recolor
        </LogoLink>
      </Navigation>
      <Navigation>{!singleColor ? lightnessController : null}</Navigation>
      <Navigation>
        <Select
          defaultValue="hex"
          onChange={(value) => {
            setColorCoding(value);
            openNotification('bottomLeft');
          }}
        >
          <Option value="hex">HEX</Option>
          <Option value="rgb">RGB</Option>
          <Option value="rgba">RGBA</Option>
        </Select>
      </Navigation>
    </Header>
  );
}

Navbar.propTypes = {
  lightness: PropTypes.number.isRequired,
  setLightness: PropTypes.func.isRequired,
  setColorCoding: PropTypes.func.isRequired,
  singleColor: PropTypes.bool.isRequired,
};

export default Navbar;
