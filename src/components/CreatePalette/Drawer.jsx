import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { Button, Input, Form, Drawer as Container } from 'antd.macro';
import { primaryColor } from '../../constants/globalColors';

const StyledContainer = styled(Container)`
  & .ant-drawer-body > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ColorForm = styled(Form)`
  width: 100%;
`;

const ColorPicker = styled(ChromePicker)`
  border: 1px solid #e2e2e2;
  box-shadow: none !important;
  transition-duration: 300ms;
  width: 100% !important;
  &:hover {
    border-color: ${primaryColor};
  }
  &:focus-within {
    border-color: ${primaryColor};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
  }
`;
function Drawer({ unfolded, closeDrawer, setPaletteColors, paletteColors }) {
  const [color, setColor] = useState('#ffffff');
  const [name, setName] = useState('');

  const [form] = Form.useForm();
  const [errors, setErrors] = useState({ color: null, name: null });

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
    <StyledContainer
      title="Design your palette"
      placement="left"
      closable
      onClose={closeDrawer}
      visible={unfolded}
      width="325px"
      bodyStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
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
            {paletteColors.length === 20 ? 'Max 20 colors in palette' : 'Submit'}
          </Button>
        </Form.Item>
      </ColorForm>
    </StyledContainer>
  );
}

Drawer.propTypes = {
  unfolded: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  setPaletteColors: PropTypes.func.isRequired,
  paletteColors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
    }),
  ).isRequired,
};

export default Drawer;
