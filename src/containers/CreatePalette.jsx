import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Drawer from '../components/CreatePalette/Drawer.jsx';
import Navbar from '../components/CreatePalette/Navbar.jsx';
import Palette from '../components/CreatePalette/Palette.jsx';
import Modals from '../components/CreatePalette/Modals.jsx';
import defaultPalettes from '../constants/seedColors';
import { addPalette } from '../store/actions/palettes.actions';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: flex-start;
  width: 100vw;
`;

const PaletteContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
`;

function CreatePalette() {
  const [drawerUnfolded, setDrawerUnfolded] = useState(true);
  const [newPalette, setNewPalette] = useState({
    name: '',
    id: '',
    emoji: '',
    colors: defaultPalettes[0].colors,
  });

  // Defines if user has started the palette saving process (clicked Save Palette)
  const [savingProgress, setSavingProgress] = useState(false);
  const paletteNames = useSelector((state) => state.palettes).map((palette) => palette.name);
  const dispatch = useDispatch();
  const history = useHistory();

  const createPalette = () => {
    const newPaletteId = newPalette.name.toLowerCase().replace(/\s/, '-');
    setNewPalette({ ...newPalette, id: newPaletteId });
    dispatch(addPalette(newPalette));
    history.push('/');
  };

  return (
    <>
      {savingProgress && (
        <Modals
          paletteNames={paletteNames}
          newPalette={newPalette}
          setNewPalette={setNewPalette}
          cancelSavingProgress={() => setSavingProgress(false)}
          createPalette={createPalette}
        />
      )}
      <Container>
        <Drawer
          unfolded={drawerUnfolded}
          setPaletteColors={(colors) => setNewPalette({ ...newPalette, colors })}
          paletteColors={newPalette.colors}
        />
        <PaletteContainer>
          <Navbar
            setDrawerUnfolded={() => setDrawerUnfolded(!drawerUnfolded)}
            startSavingProgress={() => setSavingProgress(true)}
            drawerUnfolded={drawerUnfolded}
            paletteColors={newPalette.colors}
          />
          <Palette
            paletteColors={newPalette.colors}
            setPaletteColors={(colors) => setNewPalette({ ...newPalette, colors })}
          />
        </PaletteContainer>
      </Container>
    </>
  );
}

export default CreatePalette;
