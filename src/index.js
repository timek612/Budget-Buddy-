import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import axios from 'axios';

import store from './redux/store';

import App from './components/App/App';





ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
