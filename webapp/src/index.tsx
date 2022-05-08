import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './css/recurve.min.css';
import './css/index.css';
import App from './App';
import { store } from './app/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
