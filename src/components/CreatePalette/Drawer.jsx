import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { ChromePicker as ColorPicker } from 'react-color';
import { Button, Input, Form } from 'antd';
import { primaryTextColor } from '../../styles/globalColors';

const unfoldDrawer = keyframes`
  from {
    margin-left: -20vw;
  }
  to {
    margin-left: 0vw;
  }
`;

const foldDrawer = keyframes`
  from {
    margin-left: 0vw;
  }
  to {
    margin-left: -20vw;
  }
`;

const Container = styled.div`
  animation: ${(props) => (props.unfolded ? unfoldDrawer : foldDrawer)} 200ms ease-in-out 0s 1
    normal forwards;
  width: 20vw;
  box-shadow: 15px 0px 35px -5px rgba(0, 0, 0, 0.15);
  z-index: 2;
  min-width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  transition-duration: 200ms;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Heading = styled.h3`
  color: ${primaryTextColor};
  font-size: 2rem;
  line-height: 2rem;
  text-align: center;
`;

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ColorForm = styled(Form)`
  width: 100%;
`;

function Drawer({ unfolded, setPaletteColors, paletteColors }) {
  // Two-way animation mechanism
  // 1) Component renders empty
  // 2) Client toggles the menu, sets unfolded to true
  // 3) unfolded sets isRendering to true; starts playing unfoldDrawer; component renders
  // 4) Client toggles the menu, sets unfolded to false; with isRendering still true
  // 5) Unfolded starts playing foldDrawer, onAnimationEnd sets isRendering to false
  // 6) Component renders empty

  const [color, setColor] = useState('#ffffff');
  const [colorName, setColorName] = useState('');
  const [isRendersing, setRendering] = useState(unfolded);
  const [form] = Form.useForm();

  useEffect(() => {
    if (unfolded) {
      setRendering(true);
    }
  }, [unfolded]);

  const onAnimationEnd = () => {
    if (!unfolded) {
      setRendering(false);
    }
  };

  const handleSubmit = () => {
    setPaletteColors([...paletteColors, { name: colorName, color }]);
    setColor('#ffffff');
    setColorName('');
    form.resetFields();
  };

  const setRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, '0')}`;
    setColor(randomColor);
  };

  return (
    isRendersing && (
      <Container onAnimationEnd={onAnimationEnd} unfolded={unfolded}>
        <Heading>Design your palette</Heading>
        <ActionsContainer>
          <Button danger onClick={() => setPaletteColors([])}>
            Clear Palette
          </Button>
          <Button onClick={setRandomColor}>Random Color</Button>
        </ActionsContainer>
        <ColorPicker color={color} onChange={(e) => setColor(e.hex.toUpperCase())} />
        <ColorForm
          layout="vertical"
          onValuesChange={(changedValues) => setColorName(changedValues.colorName)}
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label="Color Name"
            name="colorName"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input your color name!',
              },
              () => ({
                validator(rule, value) {
                  if (paletteColors.filter((colorObj) => colorObj.name.toLowerCase() === value.toLowerCase()).length === 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The color name you entered already exists!'));
                },
              }),
              () => ({
                validator() {
                  if (paletteColors.filter((colorObj) => colorObj.color.toLowerCase() === color.toLowerCase()).length === 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The color you entered already exists!'));
                },
              })
            ]}
          >
            <Input placeholder="Enter your color name:" value={colorName} disabled={paletteColors.length === 20} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={paletteColors.length === 20}>
              Submit
            </Button>
          </Form.Item>
        </ColorForm>
      </Container>
    )
  );
}

Drawer.propTypes = {
  unfolded: PropTypes.bool.isRequired,
  setPaletteColors: PropTypes.func.isRequired,
  paletteColors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
    }),
  ).isRequired,
};

export default Drawer;
