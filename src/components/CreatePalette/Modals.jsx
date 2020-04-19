import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Input, Modal } from 'antd';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 2;
  background-color: hsla(0, 0%, 0%, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Modals({ paletteNames, newPalette, setNewPalette, cancelSavingProgress, createPalette }) {
  const [namingError, setNamingError] = useState(null);

  const handleNaming = (name) => {
    if (
      paletteNames.find((paletteName) => paletteName.toLowerCase() === name.toLowerCase())
    ) {
      setNamingError('The palette name should be unique!');
    } else {
      setNamingError(null);
    }
    setNewPalette({...newPalette, name, id: name.toLowerCase().replace(/\s/, '-') })
  };

  const closeModal = (e) => {
    // Check if e isn't passed (on modal close) or user's clicking the object, that
    // we specified the onClick on (on emoji-mart close)
    if (!e || e.target === e.currentTarget) {
      cancelSavingProgress();
      setNewPalette({ colors: newPalette.colors, name: '', id: '', emoji: '' });
    }
  };

  return (
    <Container onClick={closeModal}>
      {!newPalette.emoji && (
        <Picker onSelect={(emojiObj) => setNewPalette({ ...newPalette, emoji: emojiObj.native })} />
      )}
      {newPalette.emoji && (
        <Modal
          title="Almost done!"
          visible
          mask={false}
          onOk={createPalette}
          onCancel={() => closeModal()}
        >
          <p>Just name your palette and you are good to go!</p>
          <Form onValuesChange={(changedValues) => handleNaming(changedValues.name)}>
            <Form.Item
              validateStatus={namingError && 'error'}
              help={namingError}
              name="name"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Please input your palette name!',
                },
              ]}
            >
              <Input placeholder="Enter your palette name:" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Container>
  );
}

Modals.propTypes = {
  paletteNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  newPalette: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    emoji: PropTypes.string,
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        color: PropTypes.string,
      }),
    ),
  }).isRequired,
  setNewPalette: PropTypes.func.isRequired,
  cancelSavingProgress: PropTypes.func.isRequired,
  createPalette: PropTypes.func.isRequired,
};

export default Modals;
