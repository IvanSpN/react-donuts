import React from 'react';
import ReactDOM from 'react-dom/client';
import { createContext } from 'react';

import '../src/styles/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

export const SearchContext = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
