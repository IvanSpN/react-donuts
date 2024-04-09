import React from 'react';
import ReactDOM from 'react-dom/client';
import { createContext } from 'react';

import '../src/styles/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../src/redux/store';
import { Provider } from 'react-redux';

export const SearchContext = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
