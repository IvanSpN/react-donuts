import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
