import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import App from './app';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
