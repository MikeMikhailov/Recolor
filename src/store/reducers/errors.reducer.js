import { HIDE_SAVE_ERROR } from '../actionTypes';

export default (state = true, action) => {
  switch (action.type) {
    case HIDE_SAVE_ERROR:
      return false;
    default:
      return state;
  }
};
