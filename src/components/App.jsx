import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Palette from './Palette';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <h1>Palette list goes here</h1>
          <Link to="/palette/flat-ui-colors-aussie">Link</Link>
        </Route>
        <Route path="/palette/:id" exact>
          <Palette />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
