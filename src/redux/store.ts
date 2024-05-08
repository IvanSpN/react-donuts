import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filter from '../redux/filter/slice';
import donuts from '../redux/donuts/slice';
import cart from './cart/slice';

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
