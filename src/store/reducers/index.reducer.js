import { combineReducers } from 'redux';
import palettes from './palettes.reducer';

const rootReducer = combineReducers({ palettes });

export default rootReducer;
