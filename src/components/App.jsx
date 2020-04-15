import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import configureStore from '../store/index.store';
import Loading from './General/Loading';

const store = configureStore();

const Hero = React.lazy(() => import('../containers/Hero'));
const Palette = React.lazy(() => import('../containers/Palette'));
const CreatePalette = React.lazy(() => import('../containers/CreatePalette'));

function App() {
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
