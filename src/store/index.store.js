import { createStore } from 'redux';
import rootReducer from './reducers/index.reducer';
import { loadState } from '../services/localStorage';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    loadState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store;
}
