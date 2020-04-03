import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import Loading from './Loading';

const PaletteList = React.lazy(() => import('./Hero/PaletteList'));
const Palette = React.lazy(() => import('./Palette/Palette'));

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
    </>
  );
}

export default App;
