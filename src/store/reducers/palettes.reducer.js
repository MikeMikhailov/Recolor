import { ADD_PALETTE, DELETE_PALETTE } from '../actionTypes';
import defaultPalettes from '../../constants/seedColors';

export default (state = defaultPalettes, action) => {
  switch (action.type) {
    case ADD_PALETTE:
      return [...state, action.palette];
    case DELETE_PALETTE:
      return [...state.filter((palette) => palette.id !== action.paletteId)];
    default:
      return [...state];
  }
};
