import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { DeleteFilled } from '@ant-design/icons';
import { primaryTextColor, dangerColor } from '../../constants/globalColors';

const Container = styled.div`
  align-items: stretch;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 25px 57px -37px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  padding: 10px;
  padding-bottom: 0px;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
`;

const DeleteButton = styled.button`
  background-color: ${dangerColor};
  border-bottom-left-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  height: 40px;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition-duration: 200ms;
  width: 40px;
  z-index: 1;
  ${Container}:hover & {
    opacity: 1;
  }
`;

const ColorsBorder = styled.div`
  border-radius: 5px;
  cursor: pointer;
  height: 80%;
  overflow: hidden;
  width: 100%;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
`;

const ColorsContainer = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(5, 1fr);
  height: 100%;
  transition-duration: 200ms;
  width: 100%;
  ${ColorsBorder}:hover & {
    transform: scale(1.1);
  }
`;

const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  height: 20%;
  justify-content: space-between;
  width: 100%;
`;

const Info = styled.p`
  color: ${primaryTextColor};
  font-size: ${(props) => (props.emoji ? '1.5rem' : '1rem')};
  margin: 0;
`;

function MiniPalette({ name, emoji, colors, id, deletePalette }) {
  const history = useHistory();
  return (
    <Container>
      <DeleteButton onClick={deletePalette}>
        <DeleteFilled />
      </DeleteButton>
      <ColorsBorder onClick={() => history.push(`/palette/${id}`)}>
        <ColorsContainer>
          {colors.map(({ color }) => {
            return <div style={{ backgroundColor: color }} key={color} />;
          })}
        </ColorsContainer>
      </ColorsBorder>
      <InfoContainer>
        <Info>{name}</Info>
        <Info emoji>{emoji}</Info>
      </InfoContainer>
    </Container>
  );
}

MiniPalette.propTypes = {
  name: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
  id: PropTypes.string.isRequired,
  deletePalette: PropTypes.func.isRequired,
};

export default MiniPalette;
