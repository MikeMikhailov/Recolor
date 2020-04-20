export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('palettes');
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('palettes', serializedState);
    return true;
  } catch (error) {
    return false;
  }
};
