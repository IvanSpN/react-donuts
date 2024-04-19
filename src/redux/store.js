import { configureStore } from '@reduxjs/toolkit';
import filter from './filterSlice';
import donuts from './donutsSlice';
import cart from './cartSlice';

export const store = configureStore({
  reducer: {
    filter,
    donuts,
    cart,
  },
});
