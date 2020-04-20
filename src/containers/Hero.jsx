import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../components/Hero/Navbar.jsx';
import MiniPalette from '../components/Hero/MiniPalette.jsx';
import deletePalette from '../store/actions/palettes.actions';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #3c40c6;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding-bottom: 50px;
`;

const PalettesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  grid-auto-rows: 200px;
  column-gap: 50px;
  row-gap: 35px;
  width: 60%;
  min-width: 325px;
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
