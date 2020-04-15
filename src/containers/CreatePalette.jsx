import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Drawer from '../components/CreatePalette/Drawer';
import Navbar from '../components/CreatePalette/Navbar';
import Palette from '../components/CreatePalette/Palette';
import defaultPalettes from '../constants/seedColors';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
`;

const PaletteContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
`;

function CreatePalette() {
  const [drawerUnfolded, setDrawerUnfolded] = useState(true);
  const [paletteColors, setPaletteColors] = useState(defaultPalettes[0].colors);
  const [newPalette, setNewPalette] = useState({name: '', id: '', emoji: ''});

  // Defines if user has started the palette saving process (clicked Save Palette)
  const [savingProgress, setSavingProgress] = useState(false);
  const palettes = useSelector((state) => state.palettes);

  return (
    <Container>
      <Drawer
        unfolded={drawerUnfolded}
        setPaletteColors={setPaletteColors}
        paletteColors={paletteColors}
      />
      <PaletteContainer>
        <Navbar
          setDrawerUnfolded={() => setDrawerUnfolded(!drawerUnfolded)}
          setSavingProgress={() => setSavingProgress(true)}
          drawerUnfolded={drawerUnfolded}
        />
        <Palette paletteColors={paletteColors} setPaletteColors={setPaletteColors} />
      </PaletteContainer>
    </Container>
  );
}

export default CreatePalette;
