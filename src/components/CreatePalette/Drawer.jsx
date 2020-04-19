import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { ChromePicker } from 'react-color';
import { Button, Input, Form } from 'antd';
import { primaryTextColor } from '../../constants/globalColors';

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
  z-index: 1;
  min-width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
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

const ColorPicker = styled(ChromePicker)`
  width: 100% !important;
  box-shadow: none !important;
  border: 1px solid #e2e2e2;
  transition: all 300ms;
  &:hover {
    border-color: #40a9ff;
  }
  &:focus-within {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
  }
`;
function Drawer({ unfolded, setPaletteColors, paletteColors }) {
  // Two-way animation mechanism
  // 1) Component renders empty
  // 2) Client toggles the menu, sets unfolded to true
  // 3) unfolded sets isRendering to true; starts playing unfoldDrawer; component renders
  // 4) Client toggles the menu, sets unfolded to false; with isRendering still true
  // 5) Unfolded starts playing foldDrawer, onAnimationEnd sets isRendering to false
  // 6) Component renders empty

  const [isRendersing, setRendering] = useState(unfolded);

  const [color, setColor] = useState('#ffffff');
  const [name, setName] = useState('');

  const [form] = Form.useForm();
  const [errors, setErrors] = useState({ color: null, name: null });

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

  const handlePaletteReset = () => {
    setPaletteColors([]);
    setErrors({ color: null, name: null });
  };

  const setRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, '0')}`;
    setColor(randomColor);
  };

  const dataValidationAndHandle = (field, value) => {
    if (paletteColors.find((colorObj) => colorObj[field].toLowerCase() === value.toLowerCase())) {
      setErrors({ ...errors, [field]: `The ${field.toLowerCase()} should be unique!` });
    } else {
      setErrors({ ...errors, [field]: null });
    }
    if (field === 'color') {
      setColor(value.toUpperCase());
    } else {
      setName(value);
    }
  };

  const handleSubmit = () => {
    if (Object.values(errors).filter((val) => val !== null).length === 0) {
      setPaletteColors([...paletteColors, { name, color }]);
      setColor('#ffffff');
      setName('');
      form.resetFields();
    }
  };

  return (
    isRendersing && (
      <Container onAnimationEnd={onAnimationEnd} unfolded={unfolded}>
        <Heading>Design your palette</Heading>
        <ActionsContainer>
          <Button danger onClick={handlePaletteReset}>
            Clear Palette
          </Button>
          <Button onClick={setRandomColor}>Random Color</Button>
        </ActionsContainer>

        <ColorForm
          layout="vertical"
          onValuesChange={(changedValues) => dataValidationAndHandle('name', changedValues.name)}
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item validateStatus={errors.color && 'error'} help={errors.color}>
            <ColorPicker
              color={color}
              onChange={(e) => dataValidationAndHandle('color', e.hex)}
              disableAlpha
            />
          </Form.Item>
          <Form.Item
            label="Color Name"
            name="name"
            validateStatus={errors.name && 'error'}
            help={errors.name}
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input your color name!',
              },
            ]}
          >
            <Input
              placeholder="Enter your color name:"
              value={name}
              disabled={paletteColors.length === 20}
            />
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
