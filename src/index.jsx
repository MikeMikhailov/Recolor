import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import 'antd/dist/antd.css';

render(<App />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept();
}
