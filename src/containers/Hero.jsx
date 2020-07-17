import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import transition from 'styled-transition-group';
import Navbar from '../components/Hero/Navbar';
import MiniPalette from '../components/Hero/MiniPalette';
import { deletePalette } from '../store/actions/palettes.actions';
import backgroundImage from '../constants/background.svg';

const Container = styled.div`
  align-items: center;
  background-color: #3c40c6;
  background-image: url(${backgroundImage});
  background-attachment: fixed;
  /* background by SVGBackgrounds.com */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  padding-bottom: 50px;
  width: 100vw;
`;

const PalettesContainer = styled(TransitionGroup)`
  column-gap: 50px;
  display: grid;
  grid-auto-rows: 200px;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  min-width: 325px;
  row-gap: 35px;
  width: 60%;
`;

const Fade = transition.div.attrs({
  unmountOnExit: true,
  timeout: 500,
})`
&:exit {
  opacity: 1;
}
&:exit-active {
  opacity: 0.01;
  transition: opacity 500ms ease-in;
}
`;

function Hero() {
  const palettes = useSelector((state) => state.palettes);
  const dispatch = useDispatch();
  return (
    <Container>
      <Navbar />
      <PalettesContainer>
        {palettes.map(({ id, name, colors, emoji }) => (
          <Fade key={id}>
            <MiniPalette
              name={name}
              emoji={emoji}
              colors={colors}
              id={id}
              deletePalette={() => dispatch(deletePalette(id))}
            />
          </Fade>
        ))}
      </PalettesContainer>
    </Container>
  );
}

export default Hero;
