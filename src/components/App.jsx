import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import Loading from './Loading';

const PaletteList = React.lazy(() => import('./PaletteList'));
const Palette = React.lazy(() => import('./Palette'));

function App() {
  return (
    <>
      <Normalize />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Suspense fallback={<Loading />}>
              <PaletteList />
            </Suspense>
          </Route>
          <Route path="/palette/:id" exact>
            <Suspense fallback={<Loading />}>
              <Palette />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
