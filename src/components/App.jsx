import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import Loading from './Loading';

const Hero = React.lazy(() => import('./Hero/Hero'));
const Palette = React.lazy(() => import('./Palette/Palette'));
const NewPaletteForm = React.lazy(() => import('./NewPaletteForm/NewPaletteForm'));

function App() {
  return (
    <>
      <Normalize />
      <Router>
        <Switch>
          <Route path="/palette/new" exact>
            <Suspense fallback={<Loading />}>
              <NewPaletteForm />
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
    </>
  );
}

export default App;
