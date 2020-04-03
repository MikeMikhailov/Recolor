import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
  padding-bottom: 0px;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 25px 57px -37px rgba(0, 0, 0, 0.75);
  cursor: pointer;
`;

const ColorsBorder = styled.div`
  height: 80%;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
`;

const ColorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 1fr;
  width: 100%;
  height: 100%;
  transition-duration: 200ms;
  ${Container}:hover & {
    transform: scale(1.1);
  }
`;

const Color = styled.div`
  background-color: ${(props) => props.backgroundColor};
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
`;

const Info = styled.p`
  font-size: ${(props) => (props.emoji ? '1.5rem' : '1rem')};
  color: #363636;
  margin: 0;
`;

function MiniPalette({ name, emoji, colors, id }) {
  const history = useHistory();
  return (
    <Container onClick={() => history.push(`/palette/${id}`)}>
      <ColorsBorder>
        <ColorsContainer>
          {colors.map(({ color }) => {
            return <Color backgroundColor={color} />;
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
};

export default MiniPalette;
