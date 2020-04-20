import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../components/Hero/Navbar.jsx';
import MiniPalette from '../components/Hero/MiniPalette.jsx';
import deletePalette from '../store/actions/palettes.actions';

const Container = styled.div`
  align-items: center;
  background-color: #3c40c6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  padding-bottom: 50px;
  width: 100vw;
`;

const PalettesContainer = styled.div`
  column-gap: 50px;
  display: grid;
  grid-auto-rows: 200px;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  min-width: 325px;
  row-gap: 35px;
  width: 60%;
`;

function Hero() {
  const palettes = useSelector((state) => state.palettes);
  const dispatch = useDispatch();
  return (
    <Container>
      <Navbar />
      <PalettesContainer>
        {palettes.map(({ id, name, colors, emoji }) => (
          <MiniPalette
            name={name}
            emoji={emoji}
            colors={colors}
            id={id}
            key={id}
            deletePalette={() => dispatch(deletePalette(id))}
          />
        ))}
      </PalettesContainer>
    </Container>
  );
}

export default Hero;
