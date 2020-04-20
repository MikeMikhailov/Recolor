import { combineReducers } from 'redux';
import palettes from './palettes.reducer';
import showErrors from './errors.reducer';

const rootReducer = combineReducers({ palettes, showErrors });

export default rootReducer;
