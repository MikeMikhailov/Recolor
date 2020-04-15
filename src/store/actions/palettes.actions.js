import { ADD_PALETTE, DELETE_PALETTE } from '../actionTypes'

export const addPalette = (palette) => {
  return {
    type: ADD_PALETTE,
    palette
  }
}

export const deletePalette = (paletteId) => {
  return {
    type: DELETE_PALETTE,
    paletteId
  }
}
