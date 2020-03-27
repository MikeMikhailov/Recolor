import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PaletteList from './PaletteList';

import Palette from './Palette';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <PaletteList />
        </Route>
        <Route path="/palette/:id" exact>
          <Palette />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
