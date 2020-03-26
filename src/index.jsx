import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import 'antd/dist/antd.css';
import App from './components/App';

render(<App />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept();
}
