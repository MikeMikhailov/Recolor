import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Normalize } from 'styled-normalize';
import { notification, Button } from 'antd';
import Loading from './General/Loading.jsx';
import configureStore from '../store/index.store';
import hideSaveError from '../store/actions/errors.actions';
import { saveState } from '../services/localStorage';

const store = configureStore();

const Hero = React.lazy(() => import('../containers/Hero'));
const Palette = React.lazy(() => import('../containers/Palette'));
const CreatePalette = React.lazy(() => import('../containers/CreatePalette'));

function App() {
  const state = store.getState();
  const handleHideSaveError = (storeUnsubscribe) => {
    notification.close('saveError');
    storeUnsubscribe();
    store.dispatch(hideSaveError());
  };
  // We are subscribing to store, so that if there is a localstorage save error
  // we are displaying a notification with a possibility to hide further ones
  const unsubscribe = store.subscribe(() => {
    const saveStatus = saveState(store.getState());
    if (!saveStatus && state.showErrors) {
      notification.close('saveError');
      notification.error({
        message: "Couldn't save changes",
        duration: 3,
        placement: 'bottomLeft',
        description:
          "Your local storage is probably disabled. Changes wouldn't persist between sessions",
        btn: (
          <Button type="link" onClick={() => handleHideSaveError(unsubscribe)}>
            Don&apos;t show again
          </Button>
        ),
        key: 'saveError',
      });
    }
  });

  return (
    <Provider store={store}>
      <Normalize />
      <Router>
        <Switch>
          <Route path="/palette/new" exact>
            <Suspense fallback={<Loading />}>
              <CreatePalette />
            </Suspense>
          </Route>
          <Route path="/" exact>
            <Suspense fallback={<Loading />}>
              <Hero />
            </Suspense>
          </Route>
          <Route path="/palette/:paletteId" exact>
            <Suspense fallback={<Loading />}>
              <Palette />
            </Suspense>
          </Route>
          <Route path="/palette/:paletteId/:colorId" exact>
            <Suspense fallback={<Loading />}>
              <Palette singleColor />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
